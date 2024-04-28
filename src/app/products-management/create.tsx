'use client';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { Fragment, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function CreateForm({
  open,
  handleClose,
  token,
  setRefresh,
}: any) {
  const [selectedValue, setSelectedValue] = React.useState('clone');
  const [crawlUrl, setCrawlUrl] = React.useState('from-truyenhd');
  const [categories, setCategories] = React.useState([]);
  const [categoryValue, setCategoryValue] = React.useState<number>();
  const [crawled, setCrawled] = React.useState<any>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeCrawl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCrawlUrl(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (selectedValue === 'clone') {
      if (!crawled) {
        axios
          .post(`http://localhost:3001/crawler/${crawlUrl}`, {
            uri: data.get('link'),
          })
          .then(function (response) {
            setCrawled(response.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios
          .post('http://localhost:3001/product', {
            categories: categoryValue,
            name: data.get('name'),
            source: 'clone',
            image: data.get('image'),
            description: data.get('description'),
            authorName: data.get('authorName'),
            userId: JSON.parse(token).id,
            status: 'PROGRESS',
          })
          .then(function (response) {
            for (let i = 0; i <= crawled.chapters.length; i++) {
              axios
                .post('http://localhost:3001/chapter', {
                  productId: response.data.id,
                  chapterName: data.get(
                    `chapterName${crawled.chapters[i].chapterNumber}`,
                  ),
                  content: data.get(
                    `content${crawled.chapters[i].chapterNumber}`,
                  ),
                  chapterNumber: data.get(
                    `chapterNumber${crawled.chapters[i].chapterNumber}`,
                  ),
                })
                .then(function (response) {
                  setRefresh(true);
                })
                .catch(function (error) {});
            }
          })
          .catch(function (error) {
            alert(error);
          });
      }
    } else {
      axios
        .post('http://localhost:3001/product', {
          categories: categoryValue,
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
          setRefresh(true);
        })
        .catch(function (error) {
          alert(error);
        });
    }

    setCrawled(null);
  };

  React.useLayoutEffect(() => {
    axios.get('http://localhost:3001/category').then(function (response) {
      setCategories(response.data);
    });
  }, []);

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': { width: '80%', padding: 3 },
      }}
      maxWidth="md"
      scroll={'paper'}
      open={open}
      onClose={handleClose}
    >
      <Box
        component="form"
        defaultValue={crawled}
        onSubmit={handleSubmit}
        noValidate
        // sx={{ mt: 1 }}
      >
        <DialogContent>
          <FormControl fullWidth>
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
                required
                fullWidth
                id="link"
                label="A link which you want to crawl"
                name="link"
                autoFocus
              />
              {crawled && (
                <Grid className="mt-1" container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="name"
                      label="Name"
                      fullWidth
                      name="name"
                      defaultValue={crawled?.name || null}
                      autoComplete="name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Autocomplete
                      disablePortal
                      id="categories"
                      fullWidth
                      multiple
                      options={categories}
                      getOptionLabel={option => option.name}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Categories"
                          id="id"
                          required
                        />
                      )}
                      onChange={(e, val) =>
                        setCategoryValue(val.map(v => ({ id: v.id })))
                      }
                      renderOption={(props, option) => (
                        <div {...props}>
                          <h3>{option?.name}</h3>
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="description"
                      label="Description"
                      defaultValue={crawled?.description || null}
                      fullWidth
                      name="description"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      id="authorName"
                      defaultValue={crawled?.author || null}
                      label="Author Name"
                      name="authorName"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="image"
                      fullWidth
                      value={crawled?.image || null}
                      label="Image"
                      placeholder="Put the image`s link from gg to display for product"
                      name="image"
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography variant="h5">Chapters</Typography>
                  </Grid>
                  {crawled?.chapters.map(v => {
                    return (
                      <Grid container spacing={2} className="m-2">
                        <div className="w-[100%]">
                          <Divider />
                        </div>
                        <Grid item xs={12} md={6}>
                          <TextField
                            required
                            type="number"
                            fullWidth
                            id="chapterNumber"
                            defaultValue={v?.chapterNumber || null}
                            label="Chapter Number"
                            name={`chapterNumber${v?.chapterNumber}`}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            required
                            fullWidth
                            id="chapterName"
                            defaultValue={v?.chapterName || null}
                            label="Chapter Name"
                            name={`chapterName${v?.chapterNumber}`}
                          />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <TextField
                            required
                            fullWidth
                            multiline
                            rows={4}
                            id="content"
                            defaultValue={v?.content || null}
                            label="Content"
                            name={`content${v?.chapterNumber}`}
                          />
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              )}
            </Fragment>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="name"
                  label="Name"
                  fullWidth
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  disablePortal
                  id="categories"
                  fullWidth
                  multiple
                  options={categories}
                  getOptionLabel={option => option.name}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Categories"
                      id="id"
                      required
                    />
                  )}
                  onChange={(e, val) =>
                    setCategoryValue(val.map(v => ({ id: v.id })))
                  }
                  renderOption={(props, option) => (
                    <div {...props}>
                      <h3>{option?.name}</h3>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="source"
                  label="Source"
                  fullWidth
                  name="source"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="description"
                  label="Description"
                  fullWidth
                  name="description"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="authorName"
                  label="Author Name"
                  name="authorName"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="image"
                  fullWidth
                  label="Image"
                  placeholder="Put the image`s link from gg to display for product"
                  name="image"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
