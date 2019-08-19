import React from 'react';
import './menu-item.styles.scss';
import { withRouter } from 'react-router-dom';

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => {
	return (
		<div 
			className={`menu-item ${size}`} 
			onClick={()=>history.push(`${match.path}/${linkUrl}`)}
		>
			<div 
				style={{backgroundImage: `url(${imageUrl})`}} 
				className='background-image'
			/>
			<div className='content'>
				<h1 className='title'>{title.toUpperCase()}</h1>
			</div>
		</div>
	)
}

export default withRouter(MenuItem);