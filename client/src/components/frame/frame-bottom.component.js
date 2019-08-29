import React, { Component } from 'react';

import './frame.styles.scss';

class FrameBottom extends Component {
	state = {
		isAtBottom: false
	}

	componentDidMount() {
		window.addEventListener('scroll', this.checkWindowScroll)
	}

	checkWindowScroll = () => {
		const isAtBottom = window.pageYOffset + window.innerHeight === document.body.scrollHeight
		this.setState({ isAtBottom })
	}

	render() {
		const { isAtBottom } = this.state;
		const isVisible = isAtBottom ? 'no-scroll' : null;
		return (
			<div className='bar bottom-bar'>
				<span className={`scroll ${isVisible} bob`}>&#8595;</span>
				<span className={`scroll ${isVisible}`}>scroll</span>
				<span className={`scroll ${isVisible} bob`}>&#8595;</span>
			</div>
		)
	}
}

export default FrameBottom;