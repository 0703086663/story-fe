import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const loading = () => {
  return (
    <div className="min-h-[calc(100vh-120px)] flex justify-center items-center">
      <CircularProgress />
    </div>
  );
};

export default loading;
