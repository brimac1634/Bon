import React from 'react';

import './gallery-item.styles.scss';

const GalleryItem = ({ caption, mediaType, mediaUrl }) => {
	return (
		<div className='gallery-item'>
			<div 
				className='inner-item' 
				style={{backgroundImage: `url(${mediaUrl})`}} 
			/>
			<span className='caption'>{ caption }</span>
		</div>
	)
}

export default GalleryItem;