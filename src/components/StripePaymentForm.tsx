// components/StripePaymentForm.js
'use client';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51LCjUmGXzbc60gITz8yj4uHqkougbdm9OfES09TPBSSecYthkmjdteUAxoDJLOLozcd2LcZxkrQeyIK0x5vjO7Ie00S1fLfs2x',
);
const StripePaymentForm = ({ open, handleClose }: any) => {
  //useEffect gọi api lấy clientSecret kèm data {amount, chapterId}
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret:
          'pi_3P99t1GXzbc60gIT0UIKVKfL_secret_LOBStpCFFhgjtzID3QhhUyWGG',
      }}
    >
      <CheckoutForm open={open} handleClose={handleClose} />
    </Elements>
  );
};

export default StripePaymentForm;
