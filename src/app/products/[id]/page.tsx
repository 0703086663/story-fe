'use client';
import {
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
import StripePaymentForm from '@/components/StripePaymentForm';
import Image from 'next/image';
import Rating from '@mui/material/Rating';

enum Status {
  PROGRESS = 'PROGRESS',
  DONE = 'DONE',
}

export default function StoryDetails({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openPopup, setOpenPopup] = useState(false);
  const [chapter, setChapter] = useState();

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
      price: 50,
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
      price: 50,
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
  const handleRowClick = row => {
    if (row.price > 0) {
      setChapter({ ...row, productId: params?.id });
      setOpenPopup(true);
    } else {
      router.push(`/chapters/${row.id}`);
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
    authorName: 'Author Name',
    status: 'PROGRESS',
    viewCount: 4629,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id aliquam felis. Cras tincidunt purus in lectus condimentum eleifend.',
    price: {
      formatted_with_symbol: '$19.99',
    },
    image: 'https://i.ytimg.com/vi/lBTlcjrCcVQ/maxresdefault.jpg',
    rating: 4,
    createdAt: '01/01/2015',
    categories: [
      { name: 'Fiction' },
      { name: 'Love' },
      { name: 'Story' },
      { name: 'Action' },
    ],
  };

  return (
    <main className="relative mt-28 px-[30px] flex justify-center">
      <div className="w-full lg:max-w-[1200px] lg:px-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative w-full md:max-w-[250px] rounded shadow-md">
            <Image
              className="object-cover w-full h-full rounded"
              src={product.image}
              height={500}
              width={500}
              alt="Product"
            />
          </div>
          <div className="md:w-full">
            <div className="px-5 pb-0 lg:pt-5 rounded-md">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold mb-2 text-center">
                  {product.name}
                </h1>
                <Rating
                  name="simple-controlled"
                  value={product.rating}
                  size="small"
                  // onChange={(event, newValue) => {
                  //   setValue(newValue);
                  // }}
                />
                <p className="text-sm">
                  <b className="font-bold">{product.rating}</b>/5 trên tổng số{' '}
                  <b className="font-bold">369</b> lượt đánh giá
                </p>
              </div>
              {/* <p className="text-2xl text-blue-500 font-bold mb-4">
                {product.price.formatted_with_symbol}
              </p>
              <div className="flex gap-4 mb-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
                  Add to Cart
                </button>
              </div> */}
              <table className="text-gray-600 mt-4">
                <tbody className="[&>tr>td]:w-[100px] [&>tr>th]:text-left">
                  <tr>
                    <td>Author:</td>
                    <th>{product.authorName}</th>
                  </tr>
                  <tr>
                    <td>Status:</td>
                    <th>
                      <span
                        className={`${product.status === Status.DONE ? 'text-green-500' : 'text-yellow-500'}`}
                      >
                        {product.status}
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <td>Published:</td>
                    <th>{product.createdAt}</th>
                  </tr>
                  <tr>
                    <td>viewCount:</td>
                    <th>{product.viewCount}</th>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.categories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 rounded-full px-2 py-1 text-sm cursor-pointer hover:bg-gray-300"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mt-4">{product.description}</p>
            </div>
          </div>
        </div>
        <div className="w-full mb-10 mt-10">
          <Divider />
        </div>
        <div>
          <TableContainer sx={{ boxShadow: 'none' }} component={Paper}>
            <Typography variant="h6">Chapters (6)</Typography>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className="[&>*]:font-bold">
                  <TableCell>Tên</TableCell>
                  <TableCell>Tác giả</TableCell>
                  <TableCell>Phân loại</TableCell>
                  <TableCell>Ngày đăng</TableCell>
                  <TableCell>Giá</TableCell>
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
                  <TableRow
                    key={index}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleRowClick(row)}
                  >
                    <TableCell component="th" scope="row">
                      {row?.name}
                    </TableCell>
                    <TableCell>{row?.author}</TableCell>
                    <TableCell>{row?.genre}</TableCell>
                    <TableCell>{row?.publishDate}</TableCell>
                    <TableCell
                      className={`${row?.price > 0 ? 'text-red-600' : ''}`}
                    >
                      {row?.price > 0 ? row?.price : ''}
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
        <div className="relative">
          <Typography
            variant="h6"
            className="text-gray-600 mb-4 font-bold mt-10"
          >
            Truyện liên quan
          </Typography>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(val => {
              return (
                <Link
                  className={`relative group`}
                  key={val}
                  href={`/products/${val}`}
                >
                  <div className="max-w-full">
                    <div className="flex items-center relative rounded overflow-hidden shadow">
                      <Image
                        src={
                          'https://i.ytimg.com/vi/lBTlcjrCcVQ/maxresdefault.jpg'
                        }
                        width={500}
                        height={500}
                        alt=""
                        className="object-contain group-hover:scale-110 transition-all duration-300"
                        draggable={false}
                      />

                      <div className="text-center text-sm text-white w-[170px] left-[-45px] top-[60px] absolute origin-top-left rotate-[-33.19deg] bg-red-500 shadow-md">
                        product.status
                      </div>

                      <button
                        title="Add to favorite list"
                        type="button"
                        data-id="1"
                        className="btn-add-to-favorite text-xl transition-all duration-300 appearance-none text-[#333333] bg-transparent absolute top-2 right-2 z-[3]"
                      >
                        <svg
                          width="1em"
                          height="1em"
                          viewBox="0 -1 14 19"
                          fill="none"
                          className="transition-all duration-300 hover:scale-125 hover:fill-red-500"
                        >
                          <g stroke="none" strokeWidth="1" fillRule="evenodd">
                            <g
                              transform="translate(-261.000000, -362.000000)"
                              stroke="#000000"
                              fillRule="nonzero"
                            >
                              <path
                                d="M271.80561,362.005196 C267.830207,361.835631 268.000988,365.87286 268.000988,365.87286 C268.000988,365.87286 268.170414,361.835631 264.194334,362.005196 C262.491268,362.077112 259.26676,364.111232 262.159871,368.422273 C262.659564,369.166072 264.62098,372.025314 268.04412,377 C269.520156,375.024601 273.091211,369.537971 273.840072,368.422273 C276.733861,364.111232 273.50732,362.077112 271.80561,362.005196 Z"
                                stroke="currentColor"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </button>
                    </div>
                    <div className="text-black py-2 flex justify-between items-center">
                      <span>product.name</span>
                      <span className="text-gray-400 text-xs lg:text-sm">
                        product.chapters.length chapters
                      </span>
                    </div>
                    <div className="text-gray-400 [&>span]:text-xs lg:[&>span]:text-sm font-normal leading-[18.20px] select-none flex justify-between items-center">
                      <span>product.authorName</span>
                      <span>product.rates ★</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <StripePaymentForm
          open={openPopup}
          handleClose={handleClosePopup}
          chapter={chapter}
        />
      </div>
    </main>
  );
}
