import plotly.graph_objects as go
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

DEFAULT_COLOR = "#e6e6e6"  # DO NOT CHANGE THIS - FRONTEND HIGHLIGHTING DEPENDS ON IT!!
C3S_RED = "#941333"

DEFAULT_LINEWIDTH = 1
LATEST_LINEWIDTH = 2
HIGHLIGHT_DELTA = 2

VARIABLES = {
    "sst": "sea surface temperature",
    "temp": "surface air temperature",
}

DOMAINS = {
    "sst": "60°S - 60°N",
    "temp": "Global",
}

def get_year_data(df, year, var_name="temp"):
    data = df[df['date'].str.contains(str(year))==True][var_name].values
    if len(data) == 366:
        data = np.delete(data, [59])
    return data

def day_of_year(n_days):
    start = datetime(2001, 1, 1, 12)
    return [start+timedelta(i) for i in range(n_days)]

def generate_hovertemplate(year, anomalies=False):
    if anomalies:
        hovertemplate = (
            f"<b>{year} - %{{x|%B %-d}}</b><br>"
            "Anomaly: %{y:+.2g}°C<br>"
            "1991-2020 average: %{customdata[0]:.2f}°C<extra></extra>"
        )
    else:
        hovertemplate = (
            f"<b>{year} - %{{x|%B %-d}}</b><br>"
            "Temperature: %{y:.2f}°C<br>"
            "1991-2020 average: %{customdata[0]:.2f}°C<br>"
            "Anomaly: %{customdata[1]:.2f}°C<extra></extra>"
        )
    return hovertemplate

def data_mean(df, start_year=1991, end_year=2020, var_name="temp"):
    return np.mean(
        [get_year_data(df, year, var_name) for year in range(start_year, end_year+1)],
        axis=0
    )


def timeseries(
        csv_file,
        var_name,
        target="time-series-json",
        anomalies=False,
):
    df = pd.read_csv(csv_file, comment="#")
    start_year = int(df.iloc[0].date[:4])
    end_year = int(df.iloc[-1].date[:4])
    
    reference_mean = data_mean(df, var_name=var_name)
    
    fig = go.Figure()
    
    first = True
    latest_marker = None
    for year in range(start_year, end_year+1):
        data = get_year_data(df, year, var_name=var_name)
        
        if anomalies:
            data -= reference_mean[:len(data)]
        
        customdata = data - reference_mean[:len(data)]
        customdata = np.dstack([reference_mean[:len(customdata)], customdata])
        customdata = customdata[0]
        
        hovertemplate = generate_hovertemplate(year, anomalies=anomalies)
        
        if year == end_year:
            color = C3S_RED
            line_width = LATEST_LINEWIDTH
            legendgroup = 'latest'
            name = str(year)
            latest_date = day_of_year(len(data))[-1]
            if anomalies:
                text = f"<b>{latest_date:%-d %b} {year}<br>{data[-1]:+.2f}°C</b>"
            else:
                text = f"<b>{latest_date:%-d %b} {year}<br>{data[-1]:.2f}°C</b>"
            if len(data) < 250:
                textposition = "middle right"
            elif len(data) < 328:
                textposition = "bottom center"
            else:
                textposition = "middle left"
            latest_marker = go.Scatter(
                x=[latest_date],
                y=[data[-1]],
                line_color=color,
                line_width=line_width,
                showlegend=False,
                name=f"{latest_date:%-d %b} {year}",
                text=text,
                mode="markers+text",
                textposition=textposition,
                textfont=dict(color=color),
                marker={"size": 9},
                legendgroup="latest",
                hoverinfo="skip",
        )
        else:
            color = DEFAULT_COLOR
            line_width = DEFAULT_LINEWIDTH
            legendgroup = f"{start_year}-{end_year-1}"
            name = legendgroup
        
        trace = go.Scatter(
            x=day_of_year(len(data)),
            y=data,
            line_color=color,
            line_width=line_width,
            legendgroup=legendgroup,
            showlegend=first or year==end_year,
            name=name,
            mode="lines",
            customdata=customdata,
            hovertemplate=hovertemplate,
        )
        if year != end_year:
            trace.hoverlabel=dict(bgcolor="darkslategrey")
        fig.add_trace(trace)
        
        if first:
            first = False
    
    reference_trace = go.Scatter(
        x=day_of_year(len(reference_mean)),
        y=reference_mean if not anomalies else [0]*len(reference_mean),
        name="1991-2020 average",
        line_color="darkgrey",
        line_width=2,
        line_dash="dash",
        line_shape="spline",
        hovertemplate=(
            "<b>1991-2020 average - %{x|%B %-d}</b><br>"
            "Temperature: %{y:.2f}°C<extra></extra>"
        )
    )
    fig.add_trace(reference_trace)
    
    if latest_marker is not None:
        fig.add_trace(latest_marker)

    fig.update_layout(
        images=[
            dict(
                source="logos/c3s-positive.png",
                xref="paper", yref="paper",
                x=1, y=0.985,
                sizex=0.2, sizey=0.2,
                xanchor="right", yanchor="bottom"
            ),
        ],
        title={
            'text': (
                f"<b>Daily {VARIABLES[var_name]} {'anomaly ' if anomalies else ''}({DOMAINS[var_name]})</b><br>"
                "<sup>Data: ERA5 1940-2023 ● Credit: C3S/ECMWF</sup>"
            ),
            'y': 0.93,
            'x': 0.08,
            'xanchor': 'left',
            'yanchor': 'top'
        },
        font_family="Lato",
        autosize=True,
        legend=dict(
            orientation="h",
            yanchor="top",
            y=-0.1,
            xanchor="left",
        ),
        plot_bgcolor="white",
        hovermode="closest",
        # hoverdistance=-1,
        hoverlabel=dict(font=dict(size=12, family="Lato")),
        yaxis=dict(
            showgrid=True,
            gridcolor="#e6e6e6",
            title=f"temperature {'anomaly ' if anomalies else ''}(°C)"
        ),
        xaxis=dict(
            showgrid=False,
            dtick="M1",
            tickformat="%b",
            ticklabelmode="period",
            range=["2000-12-25", "2001-12-31"],
        ),
        margin=dict(
            l=10, r=10, b=50, t=75,
        ),
        datarevision=0,
        height=527,
    )

    with open(target, "w") as f:
        f.write(fig.to_json())

if __name__ == "__main__":
    csv_file = "era5_daily_series_2t_global_1940-2024.csv"
    var_name = "temp"
    timeseries(csv_file, var_name, target="time-series-air-temperature-absolute.json", anomalies=False)
    timeseries(csv_file, var_name, target="time-series-air-temperature-anomalies.json", anomalies=True)
    
    csv_file = "era5_daily_series_sst_60S-60N_1979-2024.csv"
    var_name = "sst"
    timeseries(csv_file, var_name, target="time-series-sea-temperature-absolute.json", anomalies=False)
    timeseries(csv_file, var_name, target="time-series-sea-temperature-anomalies.json", anomalies=True)