import React, { Component } from 'react';

import './hover-zoom.styles.scss';

class HoverZoom extends Component {
	state = {
		backgroundPosition: '0% 0%'
	}

	handleMouseMove = e => {
	    const { left, top, width, height } = e.target.getBoundingClientRect()
	    const x = (e.pageX - left) / width * 100
	    const y = (e.pageY - top) / height * 100
	    this.setState({ backgroundPosition: `${x}% ${y}%` })
	}

	render() {
		const { src, alt } = this.props;
		return (
			<figure 
				className='hover-zoom fade-in' 
				onMouseMove={this.handleMouseMove} 
				style={{ ...this.state, backgroundImage: `url(${src})`}}
			>
				<img src={src} alt={alt} />
		    </figure>
		)
	}
    
}

export default HoverZoom;