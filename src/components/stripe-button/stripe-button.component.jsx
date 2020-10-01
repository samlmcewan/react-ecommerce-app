import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const onToken = (token) => {
	console.log(token);
	alert('Payment Successful');
};

const StripeCheckoutButton = ({ price }) => {
	const priceForStripe = price * 100;
	const publishableKey =
		'pk_test_51HXRa8BdHKJF4ajruMi0ws0tEfFjuGxzGM0HxjWZ4JQck7aZ6CGC4AoqgqYFtEMW2Gd81LswgFGUJfq5AhQkuX7800KVQEZL4R';
	return (
		<StripeCheckout
			label="PAY NOW"
			name="CRINKLE CLOTHING"
			billingAddress
			shippingAddress
			image="https://svgshare.com/i/CUz.svg"
			description={`Your total is £${price}`}
			amount={priceForStripe}
			panelLabel="Pay Now"
			token={onToken}
			stripeKey={publishableKey}
			currency="GBP"
		/>
	);
};

export default StripeCheckoutButton;
