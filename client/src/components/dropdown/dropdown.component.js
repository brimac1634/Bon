import React, {Component} from 'react';
import './dropdown.styles.scss';

class Dropdown extends Component {
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

		const animationState = animateOut ? 'animate-out' : 'animate-in'

		const childrenWithProps = React.Children.map(children, child => {
	      	 return React.cloneElement(child, { toggleDropdown: toggle })      
	    });

	    const renderDropdown = () => {
	    	const { dropList, listHeight } = this.props;
	    	const xPosition = dropList ? x : x - contentWidth + width;
	    	const dropWidth = dropList ? width : contentWidth;
	    	return (
	    		<div 
					className={`drop-down ${animationState}`} 
					style={{width: `${dropWidth}px`, height: `${listHeight || contentHeight}px`, top: `${y + height}px`, left: `${xPosition}px`}}
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

export default Dropdown;