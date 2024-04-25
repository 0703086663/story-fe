'use client';
import {
  PaymentElement,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Dialog } from '@mui/material';

export default function CheckoutForm({ open, handleClose }: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsLoading(false);
  };

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': { width: '80%', padding: 5, maxHeight: 435 },
      }}
      maxWidth="xs"
      open={open}
      onClose={handleClose}
    >
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="flex flex-col "
      >
        <PaymentElement id="payment-element" />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading || !stripe || !elements}
          className="mt-3"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pay now'
            )}
          </span>
        </Button>
        {message && <div id="payment-message">{message}</div>}
      </form>
    </Dialog>
  );
}
