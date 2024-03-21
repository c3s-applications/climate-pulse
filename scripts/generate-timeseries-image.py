import calendar
import os
from argparse import ArgumentParser
from datetime import datetime, timedelta
import pandas as pd
import plotly.graph_objects as go

# ------------------------------------------------------------------------------------------------ #
# Globals
# ------------------------------------------------------------------------------------------------ #

DEFAULT_COLOR = "#e6e6e6"  # DO NOT CHANGE THIS - FRONTEND HIGHLIGHTING DEPENDS ON IT!!
C3S_RED = "#941333"
DEFAULT_LINEWIDTH = 1
LATEST_LINEWIDTH = 3
HIGHLIGHT_DELTA = 2
FONTSIZE = 15

VARIABLES = {
    "2t": "surface air temperature",
    "sst": "sea surface temperature",
}

DOMAINS = {
    "2t": dict(name="global", title="global"),
    "sst": dict(name="60S-60N_ocean", title="60°S–60°N"),
}

LOGOLINE = os.environ.get('LOGOLINE', os.path.abspath('./logoline.png'))
LOGO_C3S_COMPACT = os.environ.get('LOGO_C3S_COMPACT', os.path.abspath('./c3s_logo_compact.png'))

# ------------------------------------------------------------------------------------------------ #
# Helper functions
# ------------------------------------------------------------------------------------------------ #

def get_year_data(df, year, var_name="temp"):
    data = df[df.index.year == year][var_name].values
    return data


def day_of_year(n_days, year):
    start = datetime(2000, 1, 1, 12)
    if year % 4 == 0:
        return [start+timedelta(i) for i in range(n_days)]
    else:
        return [start+timedelta(i+(1 if i >= 59 else 0)) for i in range(n_days)]

# ------------------------------------------------------------------------------------------------ #
# Main plotting function
# ------------------------------------------------------------------------------------------------ #

def create_image(var_name='2t', anomalies=False, image_format='png'):

    csv_file = f"era5_daily_series_{var_name}_{DOMAINS[var_name]['name']}.csv"
    df = pd.read_csv(csv_file, comment="#", index_col=0, parse_dates=True).round(2)
    start_year = int(df.index.year[0])
    end_year = int(df.index.year[-1])
    data_col = 'ano_91-20' if anomalies else var_name
    data_reference = get_year_data(df, 2000, "clim_91-20")
    
    fig = go.Figure()

    # -------------------------------------------------------------------------------------------- #
    # Traces for all years except last two years 
    # -------------------------------------------------------------------------------------------- #

    show_legend = True
    for year in range(start_year, end_year-1):
        data = get_year_data(df, year, var_name=data_col)
        trace = go.Scatter(
            x=day_of_year(len(data), year),
            y=data,
            line_color=DEFAULT_COLOR,
            line_width=DEFAULT_LINEWIDTH,
            showlegend=show_legend,
            name=f"{start_year}–{end_year-2}",
            mode="lines",
            legendrank=999,
        )
        fig.add_trace(trace)
        show_legend = False

    # -------------------------------------------------------------------------------------------- #
    # Trace for reference period
    # -------------------------------------------------------------------------------------------- #

    trace_reference = go.Scatter(
        x=day_of_year(len(data_reference), year=2000),
        y=data_reference if not anomalies else [0]*len(data_reference),
        name="1991–2020 average",
        line_color="darkgrey",
        line_width=2,
        line_dash="5px 5px 5px 5px",
        line_shape="spline",
        legendrank=1001,
    )
    fig.add_trace(trace_reference)

    # -------------------------------------------------------------------------------------------- #
    # Trace for previous year (currently 2023)
    # -------------------------------------------------------------------------------------------- #

    year = end_year - 1 
    data = get_year_data(df, year, var_name=data_col)
    trace_prev_year = go.Scatter(
        x=day_of_year(len(data), year),
        y=data,
        name=str(year),
        line_color="#F07736",
        line_width=2,
        showlegend=True,
        mode="lines",
        legendrank=1,
    )
    fig.add_trace(trace_prev_year)

    # -------------------------------------------------------------------------------------------- #
    # Trace for curent year (currently 2024)
    # -------------------------------------------------------------------------------------------- #

    year = end_year
    data = get_year_data(df, end_year, var_name=data_col)
    latest_date = day_of_year(len(data), year)[-1]
    latest_date_label = latest_date.strftime(rf'{year}-%m-%d')
    float_format = '+.2f' if anomalies else '.2f'
    latest_date_annot = f"{latest_date:%-d %b} {year}<br><b>{data[-1]:{float_format}}°C</b>"

    trace_end_year = go.Scatter(
        x=day_of_year(len(data), year),
        y=data,
        name=str(year),
        line_color=C3S_RED,
        line_width=LATEST_LINEWIDTH,
        showlegend=True,
        mode="lines",
        legendrank=0,
    )
    fig.add_trace(trace_end_year)

    trace_marker = go.Scatter(
        x=[latest_date],
        y=[data[-1]],
        showlegend=False,
        mode="markers",
        marker=dict(size=10, color=C3S_RED),
    )
    fig.add_trace(trace_marker)

    # ---------------------------------------------------------------------------------------- #
    # Titles
    # ---------------------------------------------------------------------------------------- #

    # Main title
    if var_name == '2t' and DOMAINS[var_name] == 'global':
        main_title = f"<b>Daily global {VARIABLES[var_name]} {'anomaly' if anomalies else ''}"
    else:
        main_title = f"<b>Daily {VARIABLES[var_name]} {'anomaly ' if anomalies else ''}"
        main_title += f"for {DOMAINS[var_name]['title']}"

    # Subtitle
    subtitle = f'Data: ERA5 {start_year}–{end_year}  •  '
    if anomalies:
        subtitle += 'Reference period: 1991–2020  •  '
    subtitle += 'Credit: C3S/ECMWF'

    # ---------------------------------------------------------------------------------------- #
    # Layout components
    # ---------------------------------------------------------------------------------------- #

    title = dict(
        text=main_title,
        y=0.94, x=0.071,
        xanchor='left', yanchor='bottom',
        font=dict(size=FONTSIZE+7),
    )

    annotation_subtitle = dict(
        text=subtitle,
        x=0,
        y=1.1,
        xref="paper",
        yref="paper",
        xanchor="left", yanchor="bottom",
        align="left",
        font=dict(size=FONTSIZE),
        showarrow=False,
    )

    annotation_latest_value = dict(
        text=latest_date_annot,
        x=latest_date,
        y=data[-1],
        ax=15 if anomalies else -5,
        ay=-30,
        xanchor='center',
        yanchor="bottom",
        align="center",
        showarrow=True,
        arrowcolor=C3S_RED,
        font=dict(color=C3S_RED, size=16),
        standoff=7,
        borderpad=5,
    )

    if var_name == 'sst':
        annotation_latest_value |= dict(
            showarrow=False,
            xshift=15,
            yshift=5,        
        )

    annotation_url = dict(
        text='https://pulse.climate.copernicus.eu',
        x=1,
        y=0.01,
        xref="paper", yref="paper",
        xanchor="right", yanchor="bottom",
        align="right",
        font=dict(size=FONTSIZE, color='darkgrey'),
        showarrow=False,
        bgcolor='white',
    )

    xaxis = dict(
        showgrid=False,
        tickmode="array",
        tickvals=[f"2000-{i:02d}-15" for i in range(1, 13)],
        ticktext=list(calendar.month_abbr)[1:],
        ticklabelmode="period",
        range=["1999-12-25", "2000-12-31"],
        tickfont=dict(size=FONTSIZE+2),
    )

    yaxis=dict(
        showgrid=True,
        gridcolor="#e6e6e6",
        title=dict(
            text=f"Temperature {'anomaly ' if anomalies else ''}(°C)",
            standoff=2,
        ),
        tickfont=dict(size=FONTSIZE),
        titlefont=dict(size=FONTSIZE+2),
        tickformat='.1f' if anomalies or var_name == 'sst' else '.0f',
    )

    legend = dict(
        x=0, y=1.02,
        orientation="h",
        yanchor="bottom",
        xanchor="left",
        font=dict(size=FONTSIZE-1),
    )

    logoline = dict(
        x=0.5, y=-0.07,
        sizex=0.8, sizey=0.2,
        xref="paper", yref="paper",
        xanchor="center", yanchor="top",
        source=LOGOLINE,
    )

    logo_c3s = dict(
        x=1, y=1.22,
        sizex=0.8, sizey=0.17,
        xref="paper", yref="paper",
        xanchor="right", yanchor="top",
        source=LOGO_C3S_COMPACT,
    )

    # ---------------------------------------------------------------------------------------- #
    # Update layout
    # ---------------------------------------------------------------------------------------- #

    layout = dict(
        font_family="Lato",
        plot_bgcolor="white",
        title=title,
        xaxis=xaxis,
        yaxis=yaxis,
        annotations=[
            annotation_subtitle,
            annotation_latest_value,
            annotation_url,
        ],
        images=[
            logoline,
            logo_c3s,
        ],
        legend=legend,
        margin=dict(l=70, r=30, b=100, t=120),
        width=1000,
        height=670,
    )

    fig.update_layout(layout)

    # ---------------------------------------------------------------------------------------- #
    # Save image to file
    # ---------------------------------------------------------------------------------------- #

    suffix = f"_{'anomaly_' if anomalies else ''}{latest_date_label}"
    filename = csv_file.replace('.csv', f'{suffix}.{image_format}')
    fig.write_image(filename, scale=2)
    print(f'Image saved to {filename}')

# ------------------------------------------------------------------------------------------------ #
# Command-line argument parser
# ------------------------------------------------------------------------------------------------ #

def parse_arguments():

    parser = ArgumentParser(description='Create image of daily time series for Climate Pulse')

    # Optional arguments with parameters
    parser.add_argument(
        '-v', '--varname',
        type=str,
        choices=['2t', 'sst'],
        default='2t',
        help='Variable name (default: 2t)',
    )

    parser.add_argument(
        '-f', '--format',
        type=str,
        choices=['png', 'pdf'],
        default='png',
        help='Image format (default: png)',
    )

    parser.add_argument(
        '-a', '--anomalies',
        action='store_true',
        default=False,
        help='Plot anomalies (default: False)',
    )

    return vars(parser.parse_args())

# ---------------------------------------------------------------------------- #
# Create image based on command-line arguments
# ---------------------------------------------------------------------------- #

if __name__ == "__main__":

    args = parse_arguments()
    var_name = args['varname']
    image_format = args['format']
    anomalies = args['anomalies']

    create_image(var_name=var_name, image_format=image_format, anomalies=anomalies)
