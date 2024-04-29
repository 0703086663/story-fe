'use client';
import { Box, Button, Container, Link, Typography } from '@mui/material';
import { loadStripe, Stripe, PaymentIntent } from '@stripe/stripe-js';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(
  'pk_test_51LCjUmGXzbc60gITz8yj4uHqkougbdm9OfES09TPBSSecYthkmjdteUAxoDJLOLozcd2LcZxkrQeyIK0x5vjO7Ie00S1fLfs2x',
);

function Completion(): JSX.Element {
  const [productId, setProductId] = useState<string | undefined>();

  const [paymentIntentFetched, setPaymentIntentFetched] = useState(false);
  useEffect(() => {
    let isMounted = true;

    const fetchPaymentIntent = async () => {
      if (!stripePromise || paymentIntentFetched) return;

      const stripe = await stripePromise;
      const url = new URL(window.location.href);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');

      if (!clientSecret || !stripe || !isMounted) return;

      const { paymentIntent }: { paymentIntent?: PaymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      if (paymentIntent && isMounted) {
        axios.post('http://localhost:3001/payment', {
          userId: JSON.parse(localStorage.getItem('authToken') || '').id,
          amount: paymentIntent?.amount,
          chapters: [{ id: JSON.parse(paymentIntent?.description || '').chapterId }],
        });

        setProductId(JSON.parse(paymentIntent?.description || '').productId);
        setPaymentIntentFetched(true);
      }
    };

    fetchPaymentIntent();

    return () => {
      isMounted = false;
    };
  }, [paymentIntentFetched]);


  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="min-h-[calc(100vh-120px)]"
      >
        <Container maxWidth="md" className="flex flex-col items-center">
          <img
            src="https://www.smartpractice.com/Images/Products/ASI/PhotoLg/124706.jpg"
            alt=""
            width={500}
            height={250}
          />
          <Link href={`/products/${productId}`}>
            <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
              Back to product page
            </Button>
          </Link>
        </Container>
      </Box>
    </>
  );
}

export default Completion;
