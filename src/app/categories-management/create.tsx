'use client';
import {
  PaymentElement,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import React from 'react';
import axios from 'axios';

export default function CreateForm({ open, handleClose, setRefresh }: any) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post('http://localhost:3001/category', {
        name: data.get('name'),
        description: data.get('description'),
      })
      .then(function (response) {
        handleClose();
        setRefresh(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': { width: '80%', padding: 5, maxHeight: 435 },
      }}
      maxWidth="md"
      open={open}
      onClose={handleClose}
    >
      <Box
        className="flex flex-col items-center"
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="Name"
          label="Name"
          name="name"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          name="description"
          label="Description"
          id="description"
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Box>
    </Dialog>
  );
}
