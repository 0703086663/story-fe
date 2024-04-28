'use client';

import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import React from 'react';
import Header from '@/components/Header/Header';

export default function Home() {
  const router = useRouter();
  const [token, setToken] = React.useState('');

  React.useLayoutEffect(() => {
    setToken(localStorage.getItem('authToken') || '');
  }, []);

  return (
    <>
      <Header token={token} />
      <main className="relative mt-28 px-[30px] flex justify-center">
        <div className="w-full lg:max-w-[1200px] lg:px-6">
          <div className="border-b border-solid border-gray-300 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link className={`relative group`} href="#">
                <div className="max-w-full flex flex-col items-center">
                  <div className="flex items-center relative rounded">
                    <div className="book-3d relative min-w-[180px] min-h-[270px] md:max-w-[250px] lg:group-hover:scale-105 transition-all duration-300">
                      <Image
                        className="object-cover w-full h-full align-middle min-w-[180px] min-h-[270px] md:max-w-[250px]"
                        src={
                          'https://truyenhdx.com/wp-content/uploads/2024/03/me-ke-hao-phong-rai-tien-truc-tuyen-1710257610.jpg'
                        }
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

                  <div className="mt-3 w-full">
                    <div className="text-black py-2 flex flex-wrap justify-between items-center">
                      <span>Naruto</span>
                      <span className="text-gray-400 text-xs lg:text-sm">
                        4 ★
                      </span>
                    </div>
                    <div className="text-gray-400 [&>span]:text-xs lg:[&>span]:text-sm flex flex-wrap justify-between items-center">
                      <span>Edogawa Conan</span>
                      <span>9999 chapters</span>
                    </div>
                  </div>
                </div>
              </Link>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(val => {
                return (
                  <Link
                    className={`relative group`}
                    key={val}
                    href={`/products/${val}`}
                  >
                    <div className="max-w-full flex flex-col items-center">
                      <div className="flex items-center relative rounded">
                        {/* <Image
                          src={
                            'https://truyenhdx.com/wp-content/uploads/2024/03/me-ke-hao-phong-rai-tien-truc-tuyen-1710257610.jpg'
                          }
                          width={500}
                          height={500}
                          alt=""
                          className="object-contain lg:group-hover:scale-105 transition-all duration-300"
                          draggable={false}
                        /> */}
                        <div className="book-3d relative min-w-[180px] min-h-[270px] md:max-w-[250px] lg:group-hover:scale-105 transition-all duration-300">
                          <Image
                            className="object-cover w-full h-full align-middle min-w-[180px] min-h-[270px] md:max-w-[250px]"
                            src={
                              'https://truyenhdx.com/wp-content/uploads/2024/03/me-ke-hao-phong-rai-tien-truc-tuyen-1710257610.jpg'
                            }
                            height={270}
                            width={180}
                            alt="Product"
                            draggable={false}
                          />
                        </div>
                        {/* <div className="text-center text-sm text-white w-[170px] left-[-45px] top-[60px] absolute origin-top-left rotate-[-33.19deg] bg-red-500 shadow-md">
                          product.status
                        </div> */}

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
                          <span>product.name</span>
                          <span className="text-gray-400 text-xs lg:text-sm">
                            product.rates ★
                          </span>
                        </div>
                        <div className="text-gray-400 [&>span]:text-xs lg:[&>span]:text-sm flex flex-wrap justify-between items-center">
                          <span>product.authorName</span>
                          <span>product.chapters.length chapters</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="pt-10 flex flex-wrap gap-5 justify-between">
            <div className="grid grid-cols-2 gap-4 w-full min-w-[230px] xl:min-w-[250px] lg:w-auto lg:order-2 lg:grid-cols-1">
              <div
                className="w-full rounded-lg border border-transparent px-5 py-4 bg-gray-200"
                rel="noopener noreferrer"
              >
                <h2 className="mb-3 text-md lg:text-xl font-semibold">
                  Truyện yêu thích
                </h2>
                <ul className="">
                  {['cac', 'cac'].map((v, idx) => {
                    return (
                      <li key={idx} className="py-1">
                        <Link
                          href="#"
                          className="text-gray-500 hover:text-black"
                        >
                          Test
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div
                className="w-full rounded-lg border border-transparent px-5 py-4 bg-gray-200"
                rel="noopener noreferrer"
              >
                <h2 className="mb-3 text-md lg:text-xl font-semibold">
                  Thể loại truyện
                </h2>
                <ul className="">
                  {['cac', 'cac', 'cac', 'cac', 'cac', 'cac'].map((v, idx) => {
                    return (
                      <li key={idx} className="py-1">
                        <Link
                          href="#"
                          className="text-gray-500 hover:text-black"
                        >
                          Test
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="max-w-full lg:order-1">
              <Typography variant="h6">Truyện Hot</Typography>
              <div className="overflow-y-auto">
                <TableContainer
                  sx={{ width: 650, boxShadow: 'none' }}
                  component={Paper}
                >
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
                      {[
                        { id: 1 },
                        { id: 2 },
                        { id: 3 },
                        { id: 4 },
                        { id: 5 },
                        { id: 6 },
                      ].map((row, index) => (
                        <TableRow
                          key={index}
                          className="hover:bg-gray-100 cursor-pointer [&>*]:text-left"
                          onClick={() => router.push(`/products/${row.id}`)}
                        >
                          <TableCell component="th" scope="row">
                            cac
                          </TableCell>
                          <TableCell align="right">cac</TableCell>
                          <TableCell align="right">cac</TableCell>
                          <TableCell align="right">cac</TableCell>
                          <TableCell align="right">cac</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
