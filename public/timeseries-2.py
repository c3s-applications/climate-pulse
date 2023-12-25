import plotly.graph_objects as go
import numpy as np
import pandas as pd

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

current_decade = "1930s"
for year in range(1940, 2024):
    this_decade = str(year)[:-1] + "0s"
    new = this_decade != current_decade
    
    if new:
        current_decade = this_decade
    
    color = "#e6e6e6"
    line_width = 1
    if year == 2023:
        color = C3S_RED
        line_width = 2

    data = get_year_data(year)

    trace = go.Scatter(
        x=list(range(len(data))), y=data, line_color=color, line_width=line_width,
        legendgroup=str(year)[:-1] + "0s", showlegend=new, name=current_decade if new else str(year)
    )
    fig.add_trace(trace)


data_2016 = get_year_data(2016)
color = "orange"
line_width = 2
trace = go.Scatter(x=list(range(len(data_2016))), y=data_2016, name="2016", line_color=color, line_width=line_width, visible="legendonly")
fig.add_trace(trace)

data_2020 = get_year_data(2020)
color = "orange"
line_width = 2
trace = go.Scatter(x=list(range(len(data_2020))), y=data_2020, name="2020", line_color=color, line_width=line_width, visible="legendonly")
fig.add_trace(trace)

data_mean = np.mean([get_year_data(year) for year in range(1991, 2021)], axis=0)
color = "darkgrey"
line_width = 2
trace = go.Scatter(x=list(range(len(data_mean))), y=data_mean, name="1991-2020 average", line_color=color, line_width=line_width, line_dash="dash", line_shape="spline")
fig.add_trace(trace)

fig.update_layout(
    autosize=True,
    legend=dict(
        orientation="h",
        yanchor="top",
        y=-0.1,
        xanchor="left",
    ),
    plot_bgcolor="white",
    hovermode="closest",
    hoverdistance=-1,
    yaxis=dict(
        showgrid=True,
        gridcolor="#e6e6e6",
    ),
    margin=dict(
        l=10, r=10, b=50, t=50,
    ),
)

with open("time-series.json", "w") as f:
    f.write(fig.to_json())