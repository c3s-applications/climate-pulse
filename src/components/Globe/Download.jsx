import React, { useState } from 'react'
import { Button, Dropdown, Modal, Icon } from 'semantic-ui-react'
import html2canvas from "html2canvas";

const CdsUrl = 'https://cds.climate.copernicus.eu/cdsapp#!/dataset/'
const era5HourlyURL = CdsUrl + 'reanalysis-era5-single-levels'
const era5MonthlyURL = CdsUrl + 'reanalysis-era5-single-levels-monthly-means'

function GlobeDataDownload() {
    const [open, setOpen] = useState(false);

    return (
        <Modal
            closeIcon
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='fullscreen'
            trigger={<Dropdown.Item text='Data' description='GRIB/NetCDF' />}
        >
            <Modal.Header>
                ERA5 reanalysis in the Copernicus Climate Data Store (CDS)
            </Modal.Header>
            <Modal.Content>
                ERA5 gridded reanalysis data is available through the Copernicus
                Climate Change Service (C3S) Climate Data Store (CDS), from 1940
                to present (with a five-day delay).
                <br></br><br></br>
                The CDS provides ERA5 datasets on monthly and hourly
                aggregations for a wide range of variables.
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color='purple'
                    onClick={() => window.open(era5HourlyURL, '_blank').focus()}
                >
                ERA5 hourly
                </Button>
                <Button
                    color='purple'
                    onClick={() => window.open(era5MonthlyURL, '_blank').focus()}
                >
                ERA5 monthly
                </Button>
                {/* <Button onClick={() => setOpen(false)}>
                Back
                </Button> */}
            </Modal.Actions>
        </Modal>
    )
}

function GlobeImageDownload() {

    const downloadGlobeImage = async () => {
        const element = document.getElementById('globeContainer');
        const canvas = await html2canvas(element, {allowTaint: true, useCORS: true});
        
        const data = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        
        if (typeof link.download === 'string') {
            link.href = data;
            link.download = 'globe.png';
        
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(data);
        }
    };

    return (
        <Dropdown.Item
            text='Image'
            disabled
            description='Coming soon!'
            // description='PNG'
            onClick={() => downloadGlobeImage()}
        />
    )
}

function DownloadGlobe() {
    const trigger = (
        <span>
            <Icon name='download' /> Download
        </span>
    )

    return (
        <Dropdown selection trigger={trigger}>
            <Dropdown.Menu>
                <GlobeImageDownload />
                <GlobeDataDownload />
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DownloadGlobe