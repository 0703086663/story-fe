'use client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import StripePaymentForm from '@/components/StripePaymentForm';
import Header from '@/components/Header/Header';
import AddIcon from '@mui/icons-material/Add';
import CreateForm from './create';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Categories({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openPopup, setOpenPopup] = useState(false);
  const [rows, setRows] = useState<any>([]);

  const [token, setToken] = React.useState('');
  const [refresh, setRefresh] = React.useState(false);

  React.useLayoutEffect(() => {
    setToken(localStorage.getItem('authToken') || '');
    axios.get('http://localhost:3001/category').then(function (response) {
      setRows(response.data);
      setRefresh(false);
    });
  }, [refresh]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };
  return (
    <>
      <Header token={token} />
      <main className="relative mt-28 px-[30px] flex flex-col items-center justify-center">
        <div className="w-full lg:max-w-[1200px] lg:px-6 flex flex-col justify-center">
          <TableContainer sx={{ boxShadow: 'none' }} component={Paper}>
            <div className="flex justify-between">
              <Typography variant="h6">Categories Management</Typography>
              <Button
                color="primary"
                variant="contained"
                size="small"
                component="a"
                startIcon={<AddIcon />}
                onClick={() => setOpenPopup(true)}
              >
                Create
              </Button>
            </div>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className="[&>*]:font-bold">
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                  : rows
                ).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {row?.name}
                    </TableCell>
                    <TableCell>{row?.description}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          axios.delete(
                            `http://localhost:3001/category/${row.id}`,
                          );
                          setRefresh(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: 'All', value: -1 },
                    ]}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </main>
      <CreateForm
        open={openPopup}
        handleClose={handleClosePopup}
        setRefresh={setRefresh}
      />
    </>
  );
}
