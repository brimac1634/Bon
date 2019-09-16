import React, { Component } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';

import { ReactComponent as Logo } from '../../assets/logo.svg'

import './map-box.styles.scss';

class MapBox extends Component {
	state = {
	    viewport: {
	        width: 450,
	        height: 500,
	        latitude: 22.278514,
	        longitude: 114.179281,
	        zoom: 17
	    }
    };

    render() {
    	const { viewport } = this.state;
    	return (
    		<div className='map-box'>
				<ReactMapGL
				    { ...viewport }
				    mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
				    onViewportChange={(viewport) => this.setState({viewport})}
				>
					<Marker 
						latitude={22.278514}
						longitude={114.17918} 
						offsetLeft={-15} 
						offsetTop={-40} 
					>
						<div className='tick-container'>
							<Logo />
						</div>
					</Marker>
				</ReactMapGL>
			</div>
    	)
    }
}

export default MapBox;