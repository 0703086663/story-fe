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
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import StripePaymentForm from '@/components/StripePaymentForm';

export default function StoryDetails({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openPopup, setOpenPopup] = useState(false);

  const rows = [
    {
      id: 1,
      name: 'Chapter 1',
      author: 'Author 1',
      genre: 'Genre 1',
      publishDate: '2022-01-01',
      price: 0,
    },
    {
      id: 2,
      name: 'Chapter 2',
      author: 'Author 2',
      genre: 'Genre 2',
      publishDate: '2022-01-02',
      price: 10,
    },
    {
      id: 3,
      name: 'Chapter 3',
      author: 'Author 3',
      genre: 'Genre 3',
      publishDate: '2022-01-03',
      price: 0,
    },
    {
      id: 4,
      name: 'Chapter 4',
      author: 'Author 4',
      genre: 'Genre 4',
      publishDate: '2022-01-04',
      price: 5,
    },
    {
      id: 5,
      name: 'Chapter 5',
      author: 'Author 5',
      genre: 'Genre 5',
      publishDate: '2022-01-05',
      price: 0,
    },
    {
      id: 6,
      name: 'Chapter 6',
      author: 'Author 6',
      genre: 'Genre 6',
      publishDate: '2022-01-06',
      price: 15,
    },
  ];
  const handleRowClick = (index, price) => {
    if (price > 0) {
      setOpenPopup(true);
    } else {
      router.push(`/chapters/${index}`);
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

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
  // Dummy product data for demonstration
  const product = {
    name: 'Product Name',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id aliquam felis. Cras tincidunt purus in lectus condimentum eleifend.',
    price: {
      formatted_with_symbol: '$19.99',
    },
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDABZ_fYFpuXRYPtqFiftA991O1QloPdDxr8P5iyWVNw&s',
  };

  return (
    <div className="mx-auto max-w-4xl px-8 py-24">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          className="object-contain w-full md:w-1/2 rounded-lg shadow-md max-h-[500px]"
          src={product.image}
          alt="Product"
        />
        <div className="md:w-1/2">
          <Typography variant="h6" className="text-gray-600 mb-4 font-bold">
            Truyện Hot
          </Typography>
          <div className="bg-sky-100 p-5 rounded-md">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-2xl text-blue-500 font-bold mb-4">
              {product.price.formatted_with_symbol}
            </p>
            <div className="flex gap-4 mb-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
                Add to Cart
              </button>
              {/* <Link href="/checkout">
                <a className="text-blue-500 border border-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out">Buy Now</a>
              </Link> */}
            </div>
            <div className="text-gray-600">
              <p>Category: Fiction</p>
              <p>Author: John Doe</p>
              <p>Published: January 1, 2024</p>
            </div>
            <div className="flex items-center mt-4">
              <p className="text-gray-600 mr-2">Rating:</p>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a.75.75 0 0 1 .673.418l1.882 3.815 4.21.613a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L10 14.347l-3.766 1.984a.75.75 0 0 1-1.088-.791l.719-4.192L3.819 7.125a.75.75 0 0 1 .416-1.279l4.21-.613L9.327 2.418A.75.75 0 0 1 10 2zM10 17.25V4.358l-2.615 1.38a.75.75 0 0 1-.688 0L5 4.358v12.892l2.385-1.257a.75.75 0 0 1 .684 0L10 17.25z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a.75.75 0 0 1 .673.418l1.882 3.815 4.21.613a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L10 14.347l-3.766 1.984a.75.75 0 0 1-1.088-.791l.719-4.192L3.819 7.125a.75.75 0 0 1 .416-1.279l4.21-.613L9.327 2.418A.75.75 0 0 1 10 2zM10 17.25V4.358l-2.615 1.38a.75.75 0 0 1-.688 0L5 4.358v12.892l2.385-1.257a.75.75 0 0 1 .684 0L10 17.25z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a.75.75 0 0 1 .673.418l1.882 3.815 4.21.613a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L10 14.347l-3.766 1.984a.75.75 0 0 1-1.088-.791l.719-4.192L3.819 7.125a.75.75 0 0 1 .416-1.279l4.21-.613L9.327 2.418A.75.75 0 0 1 10 2zM10 17.25V4.358l-2.615 1.38a.75.75 0 0 1-.688 0L5 4.358v12.892l2.385-1.257a.75.75 0 0 1 .684 0L10 17.25z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a.75.75 0 0 1 .673.418l1.882 3.815 4.21.613a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L10 14.347l-3.766 1.984a.75.75 0 0 1-1.088-.791l.719-4.192L3.819 7.125a.75.75 0 0 1 .416-1.279l4.21-.613L9.327 2.418A.75.75 0 0 1 10 2zM10 17.25V4.358l-2.615 1.38a.75.75 0 0 1-.688 0L5 4.358v12.892l2.385-1.257a.75.75 0 0 1 .684 0L10 17.25z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a.75.75 0 0 1 .673.418l1.882 3.815 4.21.613a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L10 14.347l-3.766 1.984a.75.75 0 0 1-1.088-.791l.719-4.192L3.819 7.125a.75.75 0 0 1 .416-1.279l4.21-.613L9.327 2.418A.75.75 0 0 1 10 2zM10 17.25V4.358l-2.615 1.38a.75.75 0 0 1-.688 0L5 4.358v12.892l2.385-1.257a.75.75 0 0 1 .684 0L10 17.25z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mb-10 mt-10">
        <Divider />
      </div>
      <div>
        <TableContainer sx={{ boxShadow: 'none' }} component={Paper}>
          <Typography variant="h6">Chapter</Typography>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Public Date</TableCell>
                <TableCell>Price</TableCell>
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
                // <TableRow
                //   key={index}
                //   className="cursor-pointer"
                //   onClick={() => {
                //     router.push(`/chapters/${index}`);
                //   }}
                // >
                //   <TableCell component="th" scope="row">
                //     cac
                //   </TableCell>
                //   <TableCell>cac</TableCell>
                //   <TableCell>cac</TableCell>
                //   <TableCell>cac</TableCell>
                //   <TableCell>cac</TableCell>
                // </TableRow>
                <TableRow
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleRowClick(index, row?.price)}
                  sx={row?.price > 0 && { backgroundColor: 'gray' }}
                >
                  <TableCell component="th" scope="row">
                    {row?.name}
                  </TableCell>
                  <TableCell>{row?.author}</TableCell>
                  <TableCell>{row?.genre}</TableCell>
                  <TableCell>{row?.publishDate}</TableCell>
                  <TableCell>{row?.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  //   colSpan={3}
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
      <Typography variant="h6" className="text-gray-600 mb-4 font-bold mt-10">
        Truyện liên quan
      </Typography>
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(val => {
            return (
              <div className={`relative`} key={1}>
                <div className="flex items-center relative bg-stone-50 rounded-3xl shadow overflow-hidden">
                  <img
                    src={
                      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDABZ_fYFpuXRYPtqFiftA991O1QloPdDxr8P5iyWVNw&s'
                    }
                    // src={'https://i.ytimg.com/vi/lBTlcjrCcVQ/maxresdefault.jpg'}
                    width={500}
                    height={500}
                    alt={'https://i.ytimg.com/vi/lBTlcjrCcVQ/maxresdefault.jpg'}
                    className="object-contain max-h-[200px]"
                    draggable={false}
                  />

                  <div className="text-center text-sm text-white w-[170px] left-[-45px] top-[60px] absolute origin-top-left rotate-[-33.19deg] bg-red-500 shadow-md">
                    full
                  </div>
                </div>
                <div className="text-black text-base font-normal leading-tight select-none py-2">
                  'product.name
                </div>
                <div className="text-black text-opacity-60 text-sm font-normal leading-[18.20px] select-none">
                  cac
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <StripePaymentForm open={openPopup} handleClose={handleClosePopup} />
    </div>
  );
}
