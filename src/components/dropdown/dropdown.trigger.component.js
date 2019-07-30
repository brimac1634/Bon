import React, {Component} from 'react';

class Trigger extends Component {
	constructor(props) {
		super(props);
		this.selectedElement = React.createRef()
	}

	getRectandToggle = () => {
		const { toggle, setPositition } = this.props;
		const rect = this.selectedElement.current.getBoundingClientRect()
		setPositition(rect);
		toggle()
	}

	render() {
		const { children } = this.props;
		const childrenWithProps = React.Children.map(children, child => {
	      	 return React.cloneElement(child, { onClick: this.getRectandToggle, ref: this.selectedElement })      
	    });

		return (
			<div>
				{childrenWithProps}
			</div>
		);
	}
}
export default Trigger;