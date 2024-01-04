import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import Plotly from 'plotly.js-dist-min'
import html2canvas from "html2canvas";

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

const downloadTimeseriesImage = async () => {
    const element = document.getElementById('timeseries');
    const canvas = await html2canvas(element, {scale: 2, allowTaint: true, useCORS: true});
    
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    
    if (typeof link.download === 'string') {
        link.href = data;
        link.download = 'climate-pulse-air-temperature-absolute-20231216.png';
    
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(data);
    }
};

const TimeSeriesImageDownload = () => (
    <Dropdown.Item
        text='Image'
        description='PNG'
        onClick={downloadTimeseriesImage}
        //     () => Plotly.downloadImage(
        //     document.getElementById('timeseries'),
        //     {
        //         format: 'png',
        //         filename: 'climate-pulse-air-temperature-absolute-20231216'
        //     }
        // )}
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