'use client';
import {
  PaymentElement,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import {
  Autocomplete,
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

export default function CreateForm({
  open,
  handleClose,
  setRefresh,
  products,
}: any) {
  const [productValue, setProductValue] = React.useState<number>();

  React.useLayoutEffect(() => {
    axios.get('http://localhost:3001/product').then(function (response) {
      setProductValue(response.data);
    });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    axios
      .post('http://localhost:3001/chapter', {
        productId: productValue,
        chapterName: data.get(`chapterName`),
        price: data.get(`price`),
        content: data.get(`content`),
        chapterNumber: data.get(`chapterNumber`),
      })
      .then(function (response) {
        setRefresh(true);
        handleClose();
      })
      .catch(function (error) {});
  };
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': { width: '80%', padding: 5 },
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
        <Autocomplete
          disablePortal
          id="categories"
          fullWidth
          options={products}
          getOptionLabel={option => option.name}
          renderInput={params => (
            <TextField {...params} label="Categories" id="id" />
          )}
          onChange={(e, val) => setProductValue(val.id)}
          renderOption={(props, option) => (
            <div {...props}>
              <h3>{option?.name}</h3>
            </div>
          )}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="chapterNumber"
          label="Chapter Number"
          name="chapterNumber"
          type="number"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="price"
          label="Price"
          name="price"
          type="number"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="chapterName"
          label="Chapter Name"
          name="chapterName"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          name="content"
          label="Content"
          id="content"
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
