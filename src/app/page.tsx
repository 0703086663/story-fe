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
import { useEffect, useState } from 'react';
import React from 'react';
import Header from '@/components/Header/Header';
import axios from 'axios';
import { formatDatetime } from '@/utils/format';

export default function Home() {
  const router = useRouter();
  const [token, setToken] = React.useState('');
  const [rows, setRows] = useState<any>([]);
  const [favs, setFavs] = useState<any>([]);

  React.useEffect(() => {
    setToken(localStorage.getItem('authToken') || '');
    axios.get('http://localhost:3001/product').then(function (response) {
      setRows(response.data);
    });
  }, []);

  useEffect(() => {
    if (token) {
      fetchFavs();
    }
  }, [token]);

  const fetchFavs = () => {
    axios
      .get('http://localhost:3001/list', {
        params: {
          userId: JSON.parse(token).id,
          classification: 'FAVORITE',
        },
      })
      .then(function (response) {
        setFavs(response.data);
      });
  };

  const addFavorite = (e, id) => {
    e.stopPropagation();
    axios
      .patch('http://localhost:3001/list', {
        userId: JSON.parse(token).id,
        classification: 'FAVORITE',
        products: [
          {
            id,
          },
        ],
      })
      .then(() => {
        fetchFavs();
      });
  };

  console.log(favs);

  return (
    <>
      <Header token={token} />
      <main className="relative mt-28 px-[30px] flex justify-center">
        <div className="w-full lg:max-w-[1200px] lg:px-6">
          <div className="border-b border-solid border-gray-300 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {rows.slice(0, 8).map((val: any) => {
                return (
                  <div
                    className={`relative group cursor-pointer`}
                    key={val.id}
                    onClick={() => {
                      router.push(`/products/${val?.id}`);
                    }}
                  >
                    <div className="max-w-full flex flex-col items-center">
                      <div className="flex items-center relative rounded">
                        <div className="book-3d relative min-w-[180px] min-h-[270px] md:max-w-[250px] lg:group-hover:scale-105 transition-all duration-300">
                          <Image
                            className="object-cover w-full h-full align-middle min-w-[180px] min-h-[270px] md:max-w-[250px]"
                            src={val?.image || ''}
                            height={270}
                            width={180}
                            alt="Product"
                          />
                        </div>
                        <button
                          title="Add to favorite list"
                          type="button"
                          data-id="1"
                          onClick={e => addFavorite(e, val.id)}
                          className="btn-add-to-favorite text-xl transition-all duration-300 appearance-none text-[#333333] bg-transparent absolute top-2 right-0 z-[100]"
                        >
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 -1 14 19"
                            fill="none"
                            className={`transition-all duration-300 hover:scale-125 ${favs[0]?.products.map(v => v.id).includes(val.id) && 'fill-red-500'} hover:fill-red-500`}
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
                          <span>{val?.name}</span>
                          <span className="text-gray-400 text-xs lg:text-sm">
                            {val?.averageRate} ★
                          </span>
                        </div>
                        <div className="text-gray-400 [&>span]:text-xs lg:[&>span]:text-sm flex flex-wrap justify-between items-center">
                          <span>{val?.authorName}</span>
                          <span>{val?.chapterCount} chapters</span>
                        </div>
                      </div>
                    </div>
                  </div>
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
                  {favs[0]?.products.map((row, idx) => {
                    return (
                      <li key={idx} className="py-1">
                        <Link
                          href={`/products/${row.id}`}
                          className="text-gray-500 hover:text-black"
                        >
                          {row.name}
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
                        <TableCell>Ngày đăng</TableCell>
                        <TableCell>Số lượng đọc</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .sort((a, b) => b.viewCount - a.viewCount)
                        .slice(0, 8)
                        .map((row, index) => (
                          <TableRow
                            key={index}
                            className="hover:bg-gray-100 cursor-pointer [&>*]:text-left"
                            onClick={() => router.push(`/products/${row.id}`)}
                          >
                            <TableCell component="th" scope="row">
                              {row.name}
                            </TableCell>
                            <TableCell align="right">
                              {row.authorName}
                            </TableCell>
                            <TableCell align="right">
                              {formatDatetime(row.createdAt)}
                            </TableCell>
                            <TableCell align="right">{row.viewCount}</TableCell>
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
