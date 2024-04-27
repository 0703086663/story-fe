import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className="min-h-[calc(100vh-120px)]"
    >
      <Container maxWidth="md">
        <Grid
          container
          spacing={2}
          className="flex flex-col lg:flex-row justify-center items-center gap-4"
        >
          <Grid
            xs={6}
            className="lg:order-1 flex flex-col justify-center items-center"
          >
            <Typography variant="h1">404</Typography>
            <Typography variant="h6" className="text-center">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Link href="/">
              <Button variant="contained" sx={{ mt: 3, mb: 2 }}>
                Back Home
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NotFound;
