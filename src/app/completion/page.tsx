'use client';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
const stripePromise = loadStripe(
  'pk_test_51LCjUmGXzbc60gITz8yj4uHqkougbdm9OfES09TPBSSecYthkmjdteUAxoDJLOLozcd2LcZxkrQeyIK0x5vjO7Ie00S1fLfs2x',
);

function Completion() {
  const [messageBody, setMessageBody] = useState('');

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async stripe => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const data = await stripe.retrievePaymentIntent(clientSecret);
      console.log('retrievePaymentIntent', data);

      // trang cam on, gửi lên api {amount,chapterId:description }

      //   setMessageBody(
      //     error ? (
      //       `> ${error.message}`
      //     ) : (
      //       <>
      //         &gt; Payment {paymentIntent.status}:{' '}
      //         <a
      //           href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
      //           target="_blank"
      //           rel="noreferrer"
      //         >
      //           {paymentIntent.id}
      //         </a>
      //       </>
      //     ),
      //   );
    });
  }, [stripePromise]);

  return (
    <>
      <h1>Thank you!</h1>
      <a href="/">home</a>
      <div
        id="messages"
        role="alert"
        style={messageBody ? { display: 'block' } : {}}
      >
        {messageBody}
      </div>
    </>
  );
}

export default Completion;
