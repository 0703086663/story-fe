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
import React, { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StripePaymentForm from '@/components/StripePaymentForm';
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import Header from '@/components/Header/Header';
import axios from 'axios';
import { formatDatetime } from '@/utils/format';

enum Status {
  PROGRESS = 'PROGRESS',
  DONE = 'DONE',
}

export default function StoryDetails({ params }: { params: { id: number } }) {
  const router = useRouter();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openPopup, setOpenPopup] = useState(false);
  const [chapter, setChapter] = useState();
  const [rows, setRows] = useState<any>([]);
  const [token, setToken] = React.useState('');
  const [product, setProduct] = useState<any>({});
  const [productFamiliar, setProductFamiliar] = useState<any>([]);

  React.useLayoutEffect(() => {
    setToken(localStorage.getItem('authToken') || '');
    axios.get(`http://localhost:3001/chapter`).then(function (response) {
      setRows(response.data.filter(v => v.productId == params.id));
    });
    axios
      .get(`http://localhost:3001/product/${params.id}`)
      .then(function (response) {
        setProduct(response.data);
      });

    axios.get(`http://localhost:3001/product`).then(function (response) {
      setProductFamiliar(response.data);
    });
  }, []);
  const handleRowClick = row => {
    if (row.price > 0) {
      setChapter({ ...row, productId: params?.id });
      setOpenPopup(true);
    } else {
      router.push(`/products/${params?.id}/chapters/${row.chapterNumber}`);
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
  return (
    <Fragment>
      <Header token={token} />
      <main className="relative mt-28 px-[30px] flex justify-center">
        <div className="w-full lg:max-w-[1200px] lg:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="book-3d relative min-w-[210px] min-h-[300px] md:max-w-[250px]">
              <Image
                className="object-cover w-full h-full align-middle min-w-[210px] min-h-[300px] md:max-w-[250px]"
                src={product?.image}
                height={270}
                width={180}
                alt="Product"
                draggable={false}
              />
            </div>
            <div className="md:w-full">
              <div className="px-5 pb-0 lg:pt-5 rounded-md">
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-3xl font-bold mb-2 text-center">
                    {product?.name}
                  </h1>
                  {product?.averageRate && (
                    <Rating
                      name="simple-controlled"
                      value={product.averageRate}
                      size="small"
                      // onChange={(event, newValue) => {
                      //   setValue(newValue);
                      // }}
                    />
                  )}
                  <p className="text-sm">
                    <b className="font-bold">{product?.averageRate}</b>/5 trên
                    tổng số <b className="font-bold">369</b> lượt đánh giá
                  </p>
                </div>
                {/* <p className="text-2xl text-blue-500 font-bold mb-4">
                {product?.price.formatted_with_symbol}
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
                      <th>{product?.authorName}</th>
                    </tr>
                    <tr>
                      <td>Status:</td>
                      <th>
                        <span
                          className={`${product?.status === Status.DONE ? 'text-green-500' : 'text-yellow-500'}`}
                        >
                          {product?.status}
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <td>Published:</td>
                      <th>{product?.createdAt}</th>
                    </tr>
                    <tr>
                      <td>viewCount:</td>
                      <th>{product?.viewCount}</th>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product?.categories?.map((category, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 rounded-full px-2 py-1 text-sm cursor-pointer hover:bg-gray-300"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mt-4">{product?.description}</p>
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
                    <TableCell>Tập</TableCell>
                    <TableCell>Tên</TableCell>
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
                      <TableCell>{row?.chapterNumber}</TableCell>
                      <TableCell component="th" scope="row">
                        {row?.chapterName}
                      </TableCell>
                      <TableCell>{formatDatetime(row?.createdAt)}</TableCell>
                      {/* // TODO */}
                      <TableCell
                        className={`${row?.price > 0 && !row.users.find(v => localStorage.getItem('authToken' || '').id === v) ? 'text-red-600' : ''}`}
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
          <div className="relative">
            <Typography
              variant="h6"
              className="text-gray-600 mb-4 font-bold mt-10"
            >
              Truyện liên quan
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {productFamiliar.slice(0, 4).map(val => {
                return (
                  <Link
                    className={`relative group`}
                    key={val}
                    href={`/products/${val.id}`}
                  >
                    <div className="max-w-full flex flex-col items-center">
                      <div className="flex items-center relative rounded">
                        <div className="book-3d relative min-w-[180px] min-h-[270px] md:max-w-[250px] lg:group-hover:scale-105 transition-all duration-300">
                          <Image
                            className="object-cover w-full h-full align-middle min-w-[180px] min-h-[270px] md:max-w-[250px]"
                            src={val.image}
                            height={270}
                            width={180}
                            alt="Product"
                            draggable={false}
                          />
                        </div>

                        <button
                          title="Add to favorite list"
                          type="button"
                          data-id="1"
                          className="btn-add-to-favorite text-xl transition-all duration-300 appearance-none text-[#333333] bg-transparent absolute top-2 right-0 z-[3]"
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

                      <div className="mt-3 w-full">
                        <div className="text-black py-2 flex flex-wrap justify-between items-center">
                          <span>{val.name}</span>
                          <span className="text-gray-400 text-xs lg:text-sm">
                            {val.averageRate} ★
                          </span>
                        </div>
                        <div className="text-gray-400 [&>span]:text-xs lg:[&>span]:text-sm flex flex-wrap justify-between items-center">
                          <span>{val.authorName}</span>
                          <span>{val.chapterCount} chapters</span>
                        </div>
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
    </Fragment>
  );
}
