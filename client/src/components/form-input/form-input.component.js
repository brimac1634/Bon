import React from 'react';

import Trigger from '../dropdown/dropdown-trigger.component';
import Controller from '../dropdown/dropdown-controller.component';
import Dropdown from '../dropdown/dropdown.component';

import './form-input.styles.scss';

const FormInput = ({ dropList, list, area, handleChange, label, ...otherProps }) => {

	const renderDropList = () => (
		<div className='custom-select' { ...otherProps } >
			<Controller>
				<Trigger>
					<div className='form-input drop-list'>
						<span className='down-arrow'>&#8595;</span>
					</div>
				</Trigger>
				<Dropdown dropList listHeight='100'>
					{
						list.map(item => (
							<div className='item'>{ item }</div>
						))
					}
				</Dropdown>
			</Controller>
		</div>
	)

	const renderInput = () => (
		area
		?	<textarea 
				className='form-input form-area' 
				onChange={handleChange} 
				{ ...otherProps }
			/>
		: 	<input 
				className='form-input' 
				onChange={handleChange} 
				{ ...otherProps }
			/>
	)

	return (
		<div className='group'>
			{
				dropList
				? 	renderDropList()
				: 	renderInput()
			}
			{
				label ? 
				(<label 
					className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}
				>
					{label}
				</label>)
				: null
			}
		</div>
	)
	
}

export default FormInput;