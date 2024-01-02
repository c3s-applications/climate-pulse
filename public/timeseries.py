import plotly.graph_objects as go
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from dash import html

C3S_RED = "#941333"

df = pd.read_csv("era5_daily_series_2t_global_1940-2023.csv")

fig = go.Figure()

default_linewidth = 0.5
highlighted_linewidth_delta = 2

def get_year_data(year):
    data = df[df['date'].str.contains(str(year))==True].temp.values
    if len(data) == 366:
        data = np.delete(data, [59])
    return data

def day_of_year(n_days):
    start = datetime(2001, 1, 1, 12)
    return [start+timedelta(i) for i in range(n_days)]

def get_hovertemplate(year):
    return (
        f"<b>{year} - %{{x|%B %-d}}</b><br>"
        "Temperature: %{y}°C<br>"
        "1991-2020 average: %{customdata[0]:.2f}°C<br>"
        "Anomaly: %{customdata[1]:.2f}°C<extra></extra>"
    )

data_mean = np.mean([get_year_data(year) for year in range(1991, 2021)], axis=0)

blob = None
current_decade = "1930s"
for year in range(1940, 2024):
    this_decade = str(year)[:-1] + "0s"
    new = this_decade != current_decade
    
    if new:
        current_decade = this_decade
    
    new = year == 1940
    
    color = "#e6e6e6"
    line_width = 1
    if year == 2023:
        color = C3S_RED
        line_width = 2

    data = get_year_data(year)
    customdata = data - data_mean[:len(data)]
    customdata = np.dstack([data_mean[:len(customdata)], customdata])
    customdata = customdata[0]
    
    hovertemplate = get_hovertemplate(year)

    if year == 2023:
        trace = go.Scatter(
            x=day_of_year(len(data)), y=data, line_color=color, line_width=line_width,
            showlegend=True, name="2023", legendgroup="latest",
            customdata=customdata,
            hovertemplate=hovertemplate,
        )
        blob = go.Scatter(
            x=[day_of_year(len(data))[-1]], y=[data[-1]], line_color=color, line_width=line_width,
            showlegend=False, name="14 Dec 2023", text=f"<b>14 Dec 2023<br>{data[-1]}°C</b>",
            mode="markers+text", textposition="bottom center", textfont=dict(color=color),
            marker={"size": 9}, legendgroup="latest", hoverinfo="skip",
        )
    else:
        trace = go.Scatter(
            x=day_of_year(len(data)), y=data, line_color=color, line_width=line_width,
            legendgroup="1940-2022", showlegend=new, name="1940-2022",
            customdata=customdata,
            hovertemplate=hovertemplate,
        )
        trace.hoverlabel=dict(bgcolor="darkslategrey")
    fig.add_trace(trace)


# data_2016 = get_year_data(2016)
# customdata = data_2016 - data_mean[:len(data_2016)]
# customdata = np.dstack([data_mean[:len(customdata)], customdata])
# customdata = customdata[0]
# color = "gold"
# line_width = 2
# trace = go.Scatter(x=day_of_year(len(data_2016)), y=data_2016, name="2016", line_color=color, line_width=line_width, visible="legendonly", customdata=customdata, hovertemplate=get_hovertemplate(2016))
# fig.add_trace(trace)

# data_2020 = get_year_data(2020)
# customdata = data_2020 - data_mean[:len(data_2020)]
# customdata = np.dstack([data_mean[:len(customdata)], customdata])
# customdata = customdata[0]
# color = "darkorange"
# line_width = 2
# trace = go.Scatter(x=day_of_year(len(data_2020)), y=data_2020, name="2020", line_color=color, line_width=line_width, visible="legendonly", customdata=customdata, hovertemplate=get_hovertemplate(2020))
# fig.add_trace(trace)

color = "darkgrey"
line_width = 2
trace = go.Scatter(x=day_of_year(len(data_mean)), y=data_mean, name="1991-2020 average", line_color=color, line_width=line_width, line_dash="dash", line_shape="spline", hovertemplate=(
    "<b>1991-2020 average - %{x|%B %-d}</b><br>"
    "Temperature: %{y:.2f}°C<extra></extra>"
))
fig.add_trace(trace)

if blob is not None:
    fig.add_trace(blob)

fig.update_layout(
    # images=[
    #     dict(
    #         source="c3s.webp",
    #         xref="paper", yref="paper",
    #         x=1, y=0.985,
    #         sizex=0.2, sizey=0.2,
    #         xanchor="right", yanchor="bottom"
    #     ),
    # ],
    title={
        'text': (
            "<b>Daily global surface air temperature</b><br>"
            "<sup>Data: ERA5 1940-2023 ● Credit: Copernicus Climate Change Service & ECMWF</sup>"
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
        title="temperature (°C)"
    ),
    xaxis=dict(
        showgrid=False,
        dtick="M1",
        tickformat="%b",
        ticklabelmode="period",
    ),
    margin=dict(
        l=10, r=10, b=50, t=75,
    ),
    datarevision=0,
    height=527,
)

with open("time-series.json", "w") as f:
    f.write(fig.to_json())