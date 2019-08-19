import React from 'react';

import './dropdown.styles.scss';

const DropList = ({ list, animateOut, toggle, maxHeight, handleSelection, adjustY, triggerRect: {x, y, width, height}}) => {

	const handleSelect = (item) => {
		handleSelection(item)
		toggle()
	}

	let animate = animateOut ? 'fade-out' : 'fade-in'

	const renderDropDown = () => {
		return (
			<div 
				className={`drop-down ${animate}`} 
				style={{width: `${width}px`, height: `auto`, maxHeight: `${maxHeight}`, top: `${y + height + (adjustY || 0)}px`, left: `${x}px`}}
			>
				<div className='scroll-list'>
					{	
						list &&
						list.map((item, i) => {
							return (
								<div  
									className='item'
									key={i}
									onClick={()=>handleSelect(item)}
								>
									<span>{item}</span>
								</div>
							)
						})
					}
				</div>
			</div>
		);
	}
	
	return (
		<div>
			<div
	            className='back-overlay'
	            onClick={toggle}
	        >
				{renderDropDown()}
			</div>
		</div>
		
	);
	
}

export default DropList;