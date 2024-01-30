import React, { useEffect, useState } from 'react'
import { Container, TabPane, Tab, Segment, Accordion, AccordionTitle, AccordionContent, Icon } from 'semantic-ui-react'

const MethodologyContent = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
  }

  return (<Accordion fluid style={{fontSize: '1.1rem'}}>
    <AccordionTitle
      active={activeIndex === 0}
      index={0}
      onClick={handleClick}
    >
      <Icon name='dropdown'/>
      <span style={{color: "#941333"}}><b>Where do the data come from?</b></span>
    </AccordionTitle>
    <AccordionContent active={activeIndex === 0}>
      <p>
        The data displayed on this webpage is from the ERA5 climate reanalysis, 
        a global dataset produced by the European Centre for Medium-Range
        Weather Forecasts (ECMWF) for the Copernicus Climate Change Service
        (C3S) using ECMWF’s Integrated Forecast System (IFS) numerical weather
        prediction model. ERA5 provides hourly estimates of many atmospheric,
        land-surface and sea-state variables from 1 January 1940 up to 2 days
        behind real-time. The data is originally produced on a global grid with
        a horizontal resolution of about 31 km and regridded to a regular 0.25°×
        0.25° latitude-longitude grid for public release. A detailed description
        of the ERA5 model and observations can be found
        in <a href='https://rmets.onlinelibrary.wiley.com/doi/10.1002/qj.3803' target='_blank'>
        Hersbach et al. (2020)</a>.
      </p>
    </AccordionContent>

    <AccordionTitle
      active={activeIndex === 1}
      index={1}
      onClick={handleClick}
    >
      <Icon name='dropdown' />
      <span style={{color: "#941333"}}><b>What is a climate reanalysis?</b></span>
    </AccordionTitle>
    <AccordionContent active={activeIndex === 1}>
      <p>
        A reanalysis is produced by combining the output from a numerical
        weather prediction model (ECMWF’s IFS model in the case of ERA5) with
        observations of the Earth system from across the world (including those
        coming from satellites, weather stations, and other instruments in the
        atmosphere, ocean and on land) through a complex mathematical technique
        known as data assimilation. The result is a globally complete and
        temporally consistent dataset spanning more than 80 years, enabling us
        to assess long-term changes in Earth’s climate. 
      </p>
    </AccordionContent>

    <AccordionTitle
      active={activeIndex === 2}
      index={2}
      onClick={handleClick}
    >
      <Icon name='dropdown' />
      <span style={{color: "#941333"}}><b>What is surface air temperature?</b></span>
    </AccordionTitle>
    <AccordionContent active={activeIndex === 2}>
      <p>
      The surface air temperature corresponds to the temperature of the air at
      2m above the Earth’s surface. This is the standard height at which the air
      temperature is measured at weather stations. It is important to
      distinguish this temperature from the ground surface temperature, which
      can be measured from satellite. Differences between the two temperatures
      can exceed 20°C depending on the time of day and weather. Over the ocean,
      this temperature is often called marine air temperature; it is different
      from the sea surface temperature (see below) although it is strongly
      influenced by it. In ERA5, the 2m temperature field is produced using an
      Optimal Interpolation (OI) technique, which combines a short-term model
      forecast (known as background field) with surface station observations.
      </p>
    </AccordionContent>

    <AccordionTitle
      active={activeIndex === 4}
      index={4}
      onClick={handleClick}
    >
      <Icon name='dropdown' />
      <span style={{color: "#941333"}}><b>What is sea surface temperature?</b></span>
    </AccordionTitle>
    <AccordionContent active={activeIndex === 4}>
      <p>
        The sea surface temperature (SST) corresponds to the temperature of the
        water at a depth of about 10m, known
        as <a href='https://www.ghrsst.org/ghrsst-data-services/for-sst-data-users/products/' target='_blank'>
        foundation temperature </a>. In ERA5,
        the SST data is not produced by the model but is rather based on
        external global SST products. Daily SST data from
        the <a href='https://ghrsst-pp.metoffice.gov.uk/ostia-website/index.html' target='_blank'>
        Operational Sea Surface Temperature and Ice Analysis (OSTIA)</a> produced
        by the UK Met Office is used from September 2007 onward. SST data from
        the <a href='https://www.metoffice.gov.uk/hadobs/hadisst2/' target='_blank'>
        HadISST2.1.0.0</a> dataset produced by the Met Office Hadley Centre is used
        before September 2007. Further details can be found in
        the <a href='https://rmets.onlinelibrary.wiley.com/doi/10.1002/qj.3803' target='_blank'>
        Hersbach et al. (2020)</a> paper. Although SST data is available for the full ERA5
        dataset (1940 to present), only data from January 1979 onward is used
        for Climate Pulse: this is the period for which the data is more
        reliable due to the availability of satellite observations. 
      </p>
    </AccordionContent>

    <AccordionTitle
      active={activeIndex === 5}
      index={5}
      onClick={handleClick}
    >
      <Icon name='dropdown' />
      <span style={{color: "#941333"}}><b>How are daily averages calculated?</b></span>
    </AccordionTitle>
    <AccordionContent active={activeIndex === 5}>
      <p>
      For surface air temperature, daily averages are calculated from hourly
      averages from 00 to 23 UTC. For all days up to 3 days behind real time,
      the hourly data is taken from the ERA5 analysis fields, which are obtained
      by combining model output and observations. For the last day in the time
      series (2 days behind real time), the hourly data is taken from the ERA5
      analysis for 00 to 21 UTC and from the ERA5 short-term forecast for 22 and
      23 UTC. Therefore, in case, the data is preliminary. It will be updated
      once ERA5 analysis data for the full day become available. For SST, given
      that the SST products used in ERA5 already provide daily data, the SST
      data at 12 UTC in the ERA5 archive is used.
      </p>
    </AccordionContent>

    <AccordionTitle
      active={activeIndex === 6}
      index={6}
      onClick={handleClick}
    >
      <Icon name='dropdown' />
      <span style={{color: "#941333"}}><b>What are anomalies?</b></span>
    </AccordionTitle>
    <AccordionContent active={activeIndex === 6}>
      <p>
      The term anomaly refers to the difference between the absolute value of a
      variable (e.g. temperature) on a given day, month, or year and a long-term
      average for the same day, same month of the year or for the year as a
      whole. Here, as in other <a href='https://climate.copernicus.eu/climate-intelligence' target='_blank'>C3S climate reports</a>,
      this long-term average
      corresponds to the average for the 30-year period 1991–2020, the modern
      standard reference period used by the World Meteorological Organization.
      For daily data, the 30-year climatology is smoothed using a lowpass filter
      to remove sub-monthly variability.
      </p>
    </AccordionContent>

    <AccordionTitle
      active={activeIndex === 7}
      index={7}
      onClick={handleClick}
    >
      <Icon name='dropdown' />
      <span style={{color: "#941333"}}><b>Which ERA5 data is used?</b></span>
    </AccordionTitle>
    <AccordionContent active={activeIndex === 7}>
      <p>
      The ERA5 data used here include preliminary data (known as ERA5T) from the
      last three months and final data (for data older than three months). In
      case a serious issue is detected in the initial-release data, ERA5 may be
      re-run. In such instance, the initial and the final versions of the data
      will be different. However, this rarely happens and most of the time the
      two versions are identical. 
      </p>
    </AccordionContent>

    <AccordionTitle
      active={activeIndex === 8}
      index={8}
      onClick={handleClick}
    >
      <Icon name='dropdown' />
      <span style={{color: "#941333"}}><b>What period is covered by the data?</b></span>
    </AccordionTitle>
    <AccordionContent active={activeIndex === 8}>
      <p>
      The ERA5 dataset provides data from January 1940 onward. For the initia
       beta release of Climate Pulse, only a subset of the data is being used,
       depending on the variable and/or the temporal sampling. 
      </p>
      <p>
      Daily time series:
      <ul style={{marginTop: 0}}>
        <li>Surface air temperature: from 1 January 1940</li>
        <li>Sea surface temperature: from 1 January 1979</li>
      </ul>
      </p>
      <p>
      Maps:
      <ul style={{marginTop: 0}}>
        <li>Daily: from 1 January 2023</li>
        <li>Monthly: from January 1979</li>
        <li>Annual: from 1979</li>
      </ul>
      </p>
    </AccordionContent>

    <AccordionTitle
      active={activeIndex === 9}
      index={9}
      onClick={handleClick}
    >
      <Icon name='dropdown' />
      <span style={{color: "#941333"}}><b>Where can I find ERA5 data?</b></span>
    </AccordionTitle>
    <AccordionContent active={activeIndex === 9}>
      <p>
      All gridded ERA5 data can be accessed freely from
      the <a href='https://cds.climate.copernicus.eu/cdsapp#!/home' target='_blank'>
      C3S Climate Data Store (CDS)</a> as <a href='https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels' target='_blank'>
      hourly</a> and <a href='https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels-monthly-means' target='_blank'>
      monthly</a> products. No daily ERA5 product is currently available. The hourly product is updated in the CDS with a 6-day delay behind real-time. The gridded ERA5 data between 2 and 5 days behind real-time  is not publicly available. The hourly and monthly ERA5 datasets only provide absolute values. For anomalies, see the section ‘Where can I download ERA5 anomalies?’ 
      </p>
    </AccordionContent>

    <AccordionTitle
      active={activeIndex === 10}
      index={10}
      onClick={handleClick}
    >
      <Icon name='dropdown' />
      <span style={{color: "#941333"}}><b>Where can I download ERA5 anomalies?</b></span>
    </AccordionTitle>
    <AccordionContent active={activeIndex === 10}>
      <p>
        Precalculated monthly gridded anomalies for surface air temperature from
        January 1979 onward are available in the Climate Data Store, as part of
        the <a href='https://cds.climate.copernicus.eu/cdsapp#!/dataset/ecv-for-climate-change' target='_blank'>
        dataset</a> underpinning
        the <a href='https://climate.copernicus.eu/climate-bulletins' target='_blank'>
        C3S monthly climate bulletins</a>. For the time being, monthly temperature anomalies for the period 1940–1978 as well as other gridded anomalies (for SST and for daily or annual data) are not available in the C3S Climate Data Store (CDS).
      </p>
    </AccordionContent>

    <AccordionTitle
      active={activeIndex === 11}
      index={11}
      onClick={handleClick}
    >
      <Icon name='dropdown' />
      <span style={{color: "#941333"}}><b>How are the graphics produced?</b></span>
    </AccordionTitle>
    <AccordionContent active={activeIndex === 11}>
      <p>
      The interactive time series chart is produced
      using <a href='https://plotly.com/python/' target='_blank'>Plotly</a>.
      The maps are produced in PNG format using
      the <a href='https://matplotlib.org/' target='_blank'>
      matplotlib</a> and <a href='https://scitools.org.uk/cartopy/docs/latest/' target='_blank'>
      cartopy</a> Python packages
      and wrapped around an interactive globe
      using <a href='https://github.com/vasturiano/react-globe.gl' target='_blank'>
      react-globe.gl</a>. Note that
      this wrapping procedure may degrade the visual quality of the maps near
      the poles.
      </p>
    </AccordionContent>
  </Accordion>
    )
}


const Methodology = (
  <TabPane>
      <MethodologyContent />
  </TabPane>
)

const Attribution = (
  <TabPane style={{fontSize: '1.1rem'}}>
    <p>
    All users of Copernicus Products must provide clear and visible attribution
    to the Copernicus programme.
    The <a href='https://climate.copernicus.eu/' target='_blank'>
    Copernicus Climate Change Service (C3S)</a>,
    implemented by
    the <a href='https://www.ecmwf.int/' target='_blank'>
    European Centre for Medium-Range Weather Forecasts (ECMWF)</a> on behalf of
    the European Commission is part of the European Union's space programme. 
    </p>
    <p>
    <h4>Academic citations</h4>
    <i>Buontempo et al 2022. The Copernicus Climate Change Service: Climate Science in Action. Bulletin of the American Meteorological Society 103 (12)</i>
    <br></br>
    DOI: <a href='https://doi.org/10.1175/BAMS-D-21-0315.1' target='_blank'>10.1175/BAMS-D-21-0315.1</a>
    <br></br><br></br>
    <i>Hersbach et al. 2020 The ERA5 global Reanalysis. Quarterly Journal of the Royal Meteorological Society 146 (70)</i>
    <br></br>
    DOI: <a href='https://doi.org/10.1002/qj.3803' target='_blank'>10.1002/qj.3803</a> 
    </p>
    <p>
    <h4>Citing the data </h4>
    <a href='https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels?tab=overview' target='_blank'>
    ERA5 hourly data on single levels from 1940 to present
    </a>
    <br></br>
    DOI: <a href='https://doi.org/10.24381/cds.adbb2d47' target='_blank'>10.24381/cds.adbb2d47</a>
    <br></br><br></br>
    <a href='https://cds.climate.copernicus.eu/cdsapp#!/dataset/reanalysis-era5-single-levels-monthly-means?tab=overview' target='_blank'>
    ERA5 monthly averaged data on single levels from 1940 to present
    </a>
    <br></br>
    DOI: <a href='https://doi.org/10.24381/cds.f17050d7' target='_blank'>10.24381/cds.f17050d7</a>
    </p>
    <p>
    For more information on the Copernicus Climate Change Service – refer to
    the <a href='https://climate.copernicus.eu/' target='_blank'>
    C3S website
    </a> and
    the <a href='https://cds.climate.copernicus.eu/' target='_blank'>
    Climate Data Store
    </a>.
    </p>
  </TabPane>
)

const About = (
  <TabPane>
    <p>
    Climate Pulse provides near-real time updates of global average variables.
    It is developed, maintained and updated daily by the Copernicus Climate
    Change Service/ECMWF.
    </p>
  </TabPane>
)


const panes = [
  { menuItem: 'About', render: () =>  About},
  { menuItem: 'FAQs', render: () =>  Methodology},
  { menuItem: 'Credits', render: () => Attribution },
]

const InformationSegment = () => (
  <Container textAlign='left'>
    <Segment attached color='purple' >
    <Tab menu={{tabular: true, attached: true, widths: [4, 4, 4], style: {fontSize: '1.2rem'}}} panes={panes} />
    </Segment>
  </Container>
)

export default InformationSegment