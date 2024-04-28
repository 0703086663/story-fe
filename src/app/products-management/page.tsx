'use client';
import {
  Button,
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
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header/Header';
import AddIcon from '@mui/icons-material/Add';
import CreateForm from './create';
import axios from 'axios';
import { formatDatetime } from '@/utils/format';
import Image from 'next/image';

// TODO: Create manually & AI
// Chon categories (multi select) || tao category (neu ko ton tai)
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
      <main className="relative mt-28 px-[30px] flex flex-col items-center justify-center">
        <div className="w-full lg:max-w-[1200px] lg:px-6 flex flex-col justify-center">
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
                <TableRow className="[&>*]:font-bold">
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
        token={token}
      />
    </>
  );
}
