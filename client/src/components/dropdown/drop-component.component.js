import React, {Component} from 'react';

import './dropdown.styles.scss';

class DropComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			contentWidth: '',
			contentHeight: '',
		}
		this.content = React.createRef();
	}

	componentDidMount() {
		if (this.content.current.firstChild) {
			const rect = this.content.current.getBoundingClientRect();
			this.setState({
				contentWidth: rect.width,
				contentHeight: rect.height,
			})
		}
	}
	
	render() {
		const { contentWidth, contentHeight } = this.state;
		const { 
			toggle,
			animateOut,
			triggerRect: {
				x,
				y,
				width,
				height
			},
			children
		} = this.props;

		const animationState = animateOut ? 'fade-out' : 'fade-in'

		const childrenWithProps = React.Children.map(children, child => {
	      	 return React.cloneElement(child, { toggleDropdown: toggle })      
	    });

	    const renderDropdown = () => {
	    	return (
	    		<div 
					className={`drop-down ${animationState}`} 
					style={{width: `${contentWidth}px`, height: `${contentHeight}px`, top: `${y + height}px`, left: `${x - contentWidth + width}px`}}
				>
					<div ref={this.content}>
						{childrenWithProps}
					</div>
				</div>
	    	);
	    }

		return (
			<div>
				{renderDropdown()}
			</div>
		);
	}
	
}

export default DropComponent;