import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, color, inverted, ...otherProps }) => (
	<button 
		className={`custom-button ${inverted ? 'inverted' : ''} ${isGoogleSignIn ? 'google-sign-in' : ''}`} 
		style={{backgroundColor: color || null}}
		{...otherProps} 
	>
		{children}
	</button>
)

export default CustomButton;