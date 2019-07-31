import React, { Component } from 'react';
import './parallax-row.styles.scss';

class ParallaxRow extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offset: 0
		}
	}

	componentDidMount() {
	  	window.addEventListener('scroll', this.parallaxShift);
	}
	componentWillUnmount() {
	 	 window.removeEventListener('scroll', this.parallaxShift);
	}
	parallaxShift = () => {
	  	this.setState({
	    	offset: window.pageYOffset
	  	});
	};

	render() {
		const { children, background } = this.props;
		const { offset } = this.state;
		return (
			<div 
				className='parallax-background' 
				style={{ 
					backgroundImage: background,
					backgroundPositionY: offset / 5
				}}
			>
				<div
			      className='info-container'
			      style={{ bottom: offset }}
			    >
				    {children}
			    </div>
			</div>
		)
	}
}

export default ParallaxRow;