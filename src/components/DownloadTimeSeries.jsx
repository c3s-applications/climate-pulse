import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import Plotly from 'plotly.js-dist-min'

const TimeSeriesDataDownload = () => (
    <Dropdown.Item
        text='Data'
        description='CSV'
        onClick={
            () => window.open(
                'era5_daily_series_2t_global_1940-2023.csv', '_blank'
            )
        }
    />
)

const TimeSeriesImageDownload = () => (
    <Dropdown.Item
        text='Image'
        description='PNG'
        onClick={() => Plotly.downloadImage(
            document.getElementById('timeseries'),
            {
                format: 'png',
                filename: 'climate-pulse-air-temperature-absolute-20231216'
            }
        )}
    />
)

function DownloadTimeSeries() {
    const trigger = (
        <span>
            <Icon name='download' /> Download
        </span>
    )

    return (
        <Dropdown selection trigger={trigger}>
            <Dropdown.Menu>
                <TimeSeriesImageDownload />
                <TimeSeriesDataDownload />
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DownloadTimeSeries