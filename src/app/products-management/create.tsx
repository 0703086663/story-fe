'use client';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import axios from 'axios';
import React, { Fragment, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function CreateForm({ open, handleClose, token }: any) {
  const [selectedValue, setSelectedValue] = React.useState('clone');
  const [crawlUrl, setCrawlUrl] = React.useState('from-truyenhd');
  const [categories, setCategories] = React.useState([]);
  const [categoryValue, setCategoryValue] = React.useState<number>();
  const [img, setImg] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeCrawl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrawlUrl(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post('http://localhost:3001/product', {
        categories: [{ id: categoryValue }],
        name: data.get('name'),
        source: data.get('source'),
        image: data.get('image'),
        description: data.get('description'),
        authorName: data.get('authorName'),
        userId: JSON.parse(token).id,
        status: 'PROGRESS',
      })
      .then(function (response) {
        handleClose();
        // setRefresh(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  React.useLayoutEffect(() => {
    axios.get('http://localhost:3001/category').then(function (response) {
      setCategories(response.data);
      // setRefresh(false);
    });
  }, []);

  useEffect(() => {
    setImg('');
  }, []);

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': { width: '80%', padding: 5 },
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
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
            </Grid>
            <Grid item xs={6} md={12}>
              <Autocomplete
                disablePortal
                id="categories"
                options={categories}
                getOptionLabel={option => option.name}
                sx={{ width: 300 }}
                renderInput={params => (
                  <TextField {...params} label="Categories" id="id" />
                )}
                onChange={(e, v) => setCategoryValue(v?.id)}
                renderOption={(props, option) => (
                  <div {...props}>
                    <h3>{option?.name}</h3>
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={12} spacing={2}>
              <TextField
                margin="normal"
                sx={{ width: 300 }}
                required
                fullWidth
                id="source"
                label="Source"
                name="source"
              />
              {/* </Grid>
            <Grid item xs={6} md={12}> */}
              <TextField
                margin="normal"
                sx={{ width: 300 }}
                fullWidth
                required
                id="description"
                label="Description"
                name="description"
              />
              <TextField
                margin="normal"
                sx={{ width: 300 }}
                required
                fullWidth
                id="authorName"
                label="Author Name"
                name="authorName"
              />
            </Grid>
            <Grid>
              <div className="flex flex-col items-center ">
                <Button
                  component="label"
                  variant="contained"
                  onChange={(event: any) => {
                    const file = event.target.files[0];
                    const object = URL.createObjectURL(file);
                    setImg(object);
                    // formik.setFieldValue('image', file || {});
                  }}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <input hidden type="file" name="image" id="image" />
                </Button>
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                {img && (
                  <img
                    src={
                      img
                      // preview ||
                      // (!_.isEmpty(formik.getFieldMeta('image').value) &&
                      //   formik.getFieldMeta('image').value) ||
                      // '/noImage.jpg'
                    }
                    alt=""
                    className=" m-2 w-full h-full object-contain mt-2 max-h-[290px]"
                  />
                )}
              </div>
            </Grid>
          </Grid>
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
