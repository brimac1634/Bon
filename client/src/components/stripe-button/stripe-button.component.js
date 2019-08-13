import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

import logo from '../../assets/logo.svg';

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey = 'pk_test_hhwx13ZUDvhIwTXf8HvTCj2O00hCc0u00B'

	const onToken = token => console.log('payment successful', token)

	return (
		<StripeCheckout
			label='Pay Now'
			name='Bon Vivant'
			billingAddress
			shippingAddress
			image={logo}
			description={`Your total is HKD$${price}`}
			amount={priceForStripe}
			panelLabel='Pay Now'
			token={onToken}
			stripeKey={publishableKey}
			alipay
		/>
	)
}

export default StripeCheckoutButton;