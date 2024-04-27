'use client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
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
import React, {  useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import StripePaymentForm from '@/components/StripePaymentForm';
import Header from '@/components/Header/Header';
import AddIcon from '@mui/icons-material/Add';
import CreateForm from './create';
import axios from 'axios';
import { formatDatetime } from '@/utils/format';

export default function Products({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openPopup, setOpenPopup] = useState(false);
  const [rows, setRows] = useState<any>([]);

  const [token, setToken] = React.useState('');

  React.useLayoutEffect(() => {
    setToken(localStorage.getItem('authToken') || '');
    axios.get('http://localhost:3001/product').then(function (response) {
      setRows(response.data);
    });
  }, []);

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
      <div className="mx-auto max-w-4xl px-8 py-24">
        <div>
          <TableContainer sx={{ boxShadow: 'none' }} component={Paper}>
            <div className="flex justify-between">
              <Typography variant="h6">Stories Management</Typography>
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
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>description</TableCell>
                  <TableCell>Public Date</TableCell>
                  <TableCell>Views number</TableCell>
                  <TableCell>Image</TableCell>
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
                    <TableCell>{row?.authorName}</TableCell>
                    <TableCell>{row?.description}</TableCell>
                    <TableCell>{formatDatetime(row?.createdAt)}</TableCell>
                    <TableCell>{row?.viewCount}</TableCell>
                    <TableCell>
                      <img src={row.image} height={100} width={300} alt="" />
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
                    count={50}
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
      </div>
      <CreateForm open={openPopup} handleClose={handleClosePopup} />
    </>
  );
}
