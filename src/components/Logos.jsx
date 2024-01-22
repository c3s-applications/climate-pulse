import React from 'react'
import { Image } from 'semantic-ui-react'

const Logo = ({ organisation, mode = 'positive', ...props }) => (
    <Image src={`logos/${organisation}-${mode}.png`} {...props} />
)

export const ClimatePulseLogo = (props) => (
    <Image
        src='logos/climate-pulse-negative.webp'
        href='./'
        {...props}
    />
)

export const C3SLogo = (props) => (
    <Logo organisation='c3s' href='https://climate.copernicus.eu/' {...props}/>
)

export const ECMWFLogo = (props) => (
    <Logo organisation='ecmwf' href='https://www.ecmwf.int/' {...props}/>
)

export const CopernicusLogo = (props) => (
    <Logo organisation='copernicus' href='https://www.copernicus.eu/en' {...props}/>
)

export const EULogo = (props) => (
    <Logo organisation='eu' href='https://www.copernicus.eu/en' {...props}/>
)