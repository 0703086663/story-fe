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

export default function Home() {
  return (
    <main className="mx-[200px] flex min-h-screen flex-col items-center justify-between p-24">
      <div
        className="relative  flex place-items-center before:absolute before:h-[300px] before:w-full 
      before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-trans
      parent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:tra
      nslate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content
      -[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 bef
      ore:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:be
      fore:w-[480px] sm:after:w-[240px] before:lg:h-[360px]"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(val => {
            return (
              <Link
                className={`relative bg-red-100`}
                key={val}
                href={`/products/${val}`}
              >
                <div className="flex items-center relative bg-stone-50 rounded-3xl shadow overflow-hidden">
                  <img
                    src={'https://i.ytimg.com/vi/lBTlcjrCcVQ/maxresdefault.jpg'}
                    width={500}
                    height={500}
                    alt={'https://i.ytimg.com/vi/lBTlcjrCcVQ/maxresdefault.jpg'}
                    className="object-contain"
                    draggable={false}
                  />

                  <div className="text-center text-sm text-white w-[170px] left-[-45px] top-[60px] absolute origin-top-left rotate-[-33.19deg] bg-red-500 shadow-md">
                    fullcac
                  </div>
                </div>
                <div className="text-black text-base font-normal leading-tight select-none py-2">
                  'product.name
                </div>
                <div className="text-black text-opacity-60 text-sm font-normal leading-[18.20px] select-none">
                  cac
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="w-full mb-10 mt-10">
        <Divider />
      </div>
      <div
        className="flex items-center gap-10 justify-between"
        style={{ height: '400px' }}
      >
        <div>
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
        <div className="flex flex-col ">
          <a
            className="my-5 group rounded-lg border border-transparent px-5 py-4 transition-colors bg-gray-200 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold">Truyện yêu thích</h2>
            {['cac', 'cac'].map(v => {
              return (
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Learn about Next.js in an interactive course
                  with&nbsp;quizzes!
                </p>
              );
            })}
          </a>
          <a
            className=" group rounded-lg border border-transparent px-5 py-4 transition-colors bg-gray-200 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-2xl font-semibold">Thể loại truyện </h2>
            {['cac', 'cac', 'cac', 'cac', 'cac'].map(v => {
              return (
                <p className="m-0 max-w-[30ch] text-sm opacity-50">
                  Learn about Next.js in an interactive course
                  with&nbsp;quizzes!
                </p>
              );
            })}
          </a>
        </div>
      </div>
    </main>
  );
}
