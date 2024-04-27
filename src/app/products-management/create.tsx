'use client';
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
import React, { Fragment } from 'react';

export default function CreateForm({ open, handleClose }: any) {
  const [selectedValue, setSelectedValue] = React.useState('clone');
  const [crawlUrl, setCrawlUrl] = React.useState('from-truyenhd');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeCrawl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrawlUrl(event.target.value);
  };

  const handleSubmit = async e => {};

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': { width: '80%', padding: 5, maxHeight: 435 },
      }}
      maxWidth="md"
      open={open}
      onClose={handleClose}
    >
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Types</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          <FormControlLabel
            control={
              <Radio
                checked={selectedValue === 'clone'}
                onChange={handleChange}
                value="clone"
              />
            }
            label="Clone"
          />
          <FormControlLabel
            control={
              <Radio
                checked={selectedValue === 'new'}
                onChange={handleChange}
                value="new"
              />
            }
            label="New"
          />
        </RadioGroup>
      </FormControl>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        {selectedValue === 'clone' ? (
          <Fragment>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Crawl Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  control={
                    <Radio
                      checked={crawlUrl === 'from-truyenhd'}
                      onChange={handleChangeCrawl}
                      value="from-truyenhd"
                    />
                  }
                  label="truyenhd"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={crawlUrl === 'from-truyenfull'}
                      onChange={handleChangeCrawl}
                      value="from-truyenfull"
                    />
                  }
                  label="truyenfull"
                />
                <FormControlLabel
                  control={
                    <Radio
                      checked={crawlUrl === 'from-china'}
                      onChange={handleChangeCrawl}
                      value="from-china"
                    />
                  }
                  label="jjwxc"
                />
              </RadioGroup>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="link"
              label="A link which you want to crawl"
              name="crawl"
              autoFocus
            />
          </Fragment>
        ) : (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
             {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                defaultValue={defaultCategory || null}
                onChange={(event, newValue: any) => {
                  formik.setFieldValue('categoryId', newValue?.id || '')
                }}
                options={category ? category : []}
                getOptionLabel={(option) => option?.name}
                sx={{ width: '100%', paddingBottom: 1 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    variant="outlined"
                    name="categoryId"
                  />
                )}
              /> */}
          </>
        )}
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
          Submit
        </Button>
      </Box>

      {/* <form
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
      </form> */}
    </Dialog>
  );
}
