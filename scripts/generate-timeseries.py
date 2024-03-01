import plotly.graph_objects as go
import numpy as np
import pandas as pd
from datetime import datetime, timedelta

DEFAULT_COLOR = "#e6e6e6"  # DO NOT CHANGE THIS - FRONTEND HIGHLIGHTING DEPENDS ON IT!!
C3S_RED = "#941333"

DEFAULT_LINEWIDTH = 1
LATEST_LINEWIDTH = 2
HIGHLIGHT_DELTA = 2

FONTSIZE = 15

VARIABLES = {
    "sst": "sea surface temperature",
    "2t": "surface air temperature",
}

DOMAINS = {
    "sst": "60°S - 60°N",
    "2t": "global",
}

def get_year_data(df, year, var_name="temp"):
    data = df[df['date'].str.contains(str(year))==True][var_name].values
    return data

def day_of_year(n_days, year):
    start = datetime(2000, 1, 1, 12)
    if year % 4 == 0:
        print(year)
        return [start+timedelta(i) for i in range(n_days)]
    else:
        return [start+timedelta(i+(1 if i >= 59 else 0)) for i in range(n_days)]

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
        data_col=None,
        target="time-series-json",
        anomalies=False,
        write_png=True,
):
    df = pd.read_csv(csv_file, comment="#").round(2)
    start_year = int(df.iloc[0].date[:4])
    end_year = int(df.iloc[-1].date[:4])
    
    data_col = data_col or var_name
    
    reference_mean = get_year_data(df, 2000, "clim_91-20")
    
    fig = go.Figure()
    
    first = True
    latest_marker = None
    for year in range(start_year, end_year+1):
        data = get_year_data(df, year, var_name=data_col)
        
        # if anomalies:
        #     data -= reference_mean[:len(data)]
        
        customdata = get_year_data(df, year, var_name="ano_91-20")
        customdata = np.dstack([reference_mean[:len(customdata)], customdata])
        customdata = customdata[0]
        
        hovertemplate = generate_hovertemplate(year, anomalies=anomalies)
        
        if year == end_year:
            color = C3S_RED
            line_width = LATEST_LINEWIDTH
            legendgroup = 'latest'
            name = str(year)
            latest_date = day_of_year(len(data), year)[-1]
            if anomalies:
                text = f"{latest_date:%-d %b} {year}<br><b>{data[-1]:+.2f}°C</b>"
            else:
                text = f"{latest_date:%-d %b} {year}<br><b>{data[-1]:.2f}°C</b>"
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
                textfont=dict(color=color, size=16),
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
            x=day_of_year(len(data), year),
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
        x=day_of_year(len(reference_mean), year=2000),
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
        font_family="Lato",
        autosize=True,
        legend=dict(
            orientation="h",
            yanchor="bottom",
            y=1.02,
            xanchor="left",
            font=dict(size=FONTSIZE-2),
            traceorder="reversed",
        ),
        plot_bgcolor="white",
        hovermode="closest",
        hoverlabel=dict(font=dict(size=12, family="Lato")),
        yaxis=dict(
            showgrid=True,
            gridcolor="#e6e6e6",
            title=dict(
                text=f"Temperature {'anomaly ' if anomalies else ''}(°C)",
            ),
            tickfont=dict(size=FONTSIZE),
            titlefont=dict(size=FONTSIZE+2),
        ),
        xaxis=dict(
            showgrid=False,
            tickmode="array",
            tickvals=[f"2000-{i:02d}-15" for i in range(1, 13)],
            ticktext=["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
            ticklabelmode="period",
            range=["1999-12-25", "2000-12-31"],
            tickfont=dict(size=FONTSIZE),
        ),
        margin=dict(l=0, r=0, b=50, t=40,),
        datarevision=0,
        height=594,
    )

    with open(target, "w") as f:
        f.write(fig.to_json())
    
    if write_png:
        data = get_year_data(df, end_year-1, var_name=data_col)
        trace = go.Scatter(
            x=day_of_year(len(data), end_year-1),
            y=data,
            line_color="#F07736",
            line_width=2,
            showlegend=True,
            name=str(end_year-1),
            mode="lines",
        )
        fig.add_trace(trace)
        
        data = get_year_data(df, end_year, var_name=data_col)
        
        filename = f"{csv_file.split('.')[0]}_{'anomaly_' if anomalies else ''}{end_year}-{latest_date:%m-%d}.png"
        fig.add_annotation(
            x=-0.015, y=1.04,
            xref="paper",
            yref="paper",
            xanchor="left",
            yanchor="bottom",
            text=(
                f"ERA5 {start_year}-{end_year} ({DOMAINS[var_name]} {'mean' if not anomalies else 'anomaly'})<br>"
                "Data ERA5 ● Credit: C3S/ECMWF"
            ),
            align="left",
            font=dict(size=FONTSIZE),
            showarrow=False,
        )
        fig.update_layout(
            title={
                'text': (
                    f"<b>{VARIABLES[var_name].capitalize()}"
                ),
                'font': dict(size=FONTSIZE+5),
                'y': 0.95,
                'x': 0.042,
                'xanchor': 'left',
                'yanchor': 'bottom'
                
        },
        legend=dict(
            orientation="h",
            yanchor="bottom",
            y=0.98,
            xanchor="left",
            font=dict(size=FONTSIZE-2),
        ),
        margin=dict(l=10, r=10, b=50, t=100,),
        width=1000,
        height=650,
        )
        fig.write_image(filename)


if __name__ == "__main__":
    csv_file = "era5_daily_series_2t_global.csv"
    timeseries(csv_file, "2t", target="time-series-air-temperature-absolute.json")
    timeseries(csv_file, "2t", "ano_91-20", target="time-series-air-temperature-anomaly.json", anomalies=True)
    
    csv_file = "era5_daily_series_sst_60S-60N.csv"
    timeseries(csv_file, "sst", target="time-series-sea-temperature-absolute.json", anomalies=False)
    timeseries(csv_file, "sst", "ano_91-20", target="time-series-sea-temperature-anomaly.json", anomalies=True)