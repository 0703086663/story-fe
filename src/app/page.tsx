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

export default function Home() {
  return (
    <main className="relative mt-28 px-[30px] flex justify-center">
      <div className="w-full lg:max-w-[1200px] lg:px-6">
        <div className="border-b border-solid border-gray-300 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(val => {
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
                      <Link href="#" className="text-gray-500 hover:text-black">
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
                      <Link href="#" className="text-gray-500 hover:text-black">
                        Test
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="max-w-full overflow-y-auto lg:order-1">
            <TableContainer
              sx={{ width: 650, boxShadow: 'none' }}
              component={Paper}
            >
              <Typography variant="h6">Truyện Hot</Typography>
              <Table aria-label="simple table">
                <TableBody>
                  {[1, 1, 1, 1, 1, 1].map((row, index) => (
                    <TableRow key={index}>
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
    </main>
  );
}
