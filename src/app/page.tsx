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
import Image from 'next/image';

export default function Home() {
  return (
    <main className="mx-[200px] flex min-h-screen flex-col items-center justify-between p-24">
      {/* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div> */}

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(val => {
            return (
              <div className={`relative`} key={1}>
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
