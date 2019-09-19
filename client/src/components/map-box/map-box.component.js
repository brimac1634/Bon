import React, { Component } from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import MediaQuery from 'react-responsive';

import { ReactComponent as PinIcon } from '../../assets/pin.svg'

import './map-box.styles.scss';

class MapBox extends Component {
	state = {
		mounted: false,
	    viewport: {
	        width: 450,
	        height: 500,
	        latitude: 22.278514,
	        longitude: 114.179281,
	        zoom: 17
	    }
    };

    componentDidMount () {
		this.setState({ mounted: true })
	}

	handleZoom = increment => {
    	const { viewport, viewport: { zoom } } = this.state;
    	this.setState({
    		viewport: {
    			...viewport,
    			zoom: zoom + increment
    		}
    	})
    }

    render() {
    	const { viewport, mounted } = this.state;
    	return (
    		<div className='map-box'>
    			<MediaQuery maxWidth={963}>
    				{(matches)=>
						<ReactMapGL
						    { ...viewport }
						    scrollZoom={false}
						    width={matches ? window.innerWidth - 40 : 450}
						    height={matches ? 400 : 500}
						    mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
						    onViewportChange={(viewport) => {
						    	if (mounted) this.setState({viewport})
						    }}
						>
							<Marker 
								latitude={22.27845}
								longitude={114.179249} 
								offsetLeft={-20} 
								offsetTop={-40} 
							>
								<div className='tick-container'>
									<PinIcon fill='#1e3c6b' />
								</div>
							</Marker>
						</ReactMapGL>
					}
    			</MediaQuery>
				<div className='zoom'>
					<div onClick={()=>this.handleZoom(1)}>+</div>
					<div onClick={()=>this.handleZoom(-1)}>&#8211;</div>
				</div>
			</div>
    	)
    }
}

export default MapBox;