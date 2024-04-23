import React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        Story
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  return (
    <div className="max-h-[90px]">
      <Copyright sx={{ mt: 4, mb: 4 }} />
    </div>
  );
};

export default Footer;
