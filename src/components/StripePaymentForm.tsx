// components/StripePaymentForm.js
'use client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';
import { useEffect, useState } from 'react';
import axios from 'axios';

const stripePromise = loadStripe(
  'pk_test_51LCjUmGXzbc60gITz8yj4uHqkougbdm9OfES09TPBSSecYthkmjdteUAxoDJLOLozcd2LcZxkrQeyIK0x5vjO7Ie00S1fLfs2x',
);
const StripePaymentForm = ({ open, handleClose, chapter }: any) => {
  //useEffect gọi api lấy clientSecret kèm data {amount, chapterId}

  const [clientSecret, setClientSecret] = useState('');
  useEffect(() => {
    if (chapter?.id) {
      axios
        .post('http://localhost:3001/payment/createIntent', {
          amount: chapter?.price,
          description: JSON.stringify({
            chapterId: chapter?.id,
            productId: chapter?.productId,
          }),
        })
        .then(function (response) {
          console.log(response.data);
          setClientSecret(response.data.paymentIntent.client_secret);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [chapter]);

  return (
    <>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
          }}
        >
          <CheckoutForm
            open={open}
            handleClose={handleClose}
            chapter={chapter}
          />
        </Elements>
      )}
    </>
  );
};

export default StripePaymentForm;
