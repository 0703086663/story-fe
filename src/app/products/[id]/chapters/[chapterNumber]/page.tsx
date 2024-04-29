'use client';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import React from 'react';
import axios from 'axios';
import Header from '@/components/Header/Header';
import { useRouter } from 'next/navigation';
import _ from 'lodash';
export default function ChapterDetailsPage({
  params,
}: {
  params: { id: number };
}) {
  const router = useRouter();
  const [chapter, setChapter] = useState<any>(null);
  const [token, setToken] = React.useState('');
  const [rows, setRows] = useState<any>([]);

  React.useLayoutEffect(() => {
    setToken(localStorage.getItem('authToken') || '');
    axios
      .get(
        `http://localhost:3001/product/${params?.id}/chapter/${params?.chapterNumber}`,
      )
      .then(function (response) {
        setChapter(response.data);
      });

    axios.get(`http://localhost:3001/chapter`).then(function (response) {
      setRows(_.uniq(response.data.map(v => v.chapterNumber)));
    });
  }, []);
  console.log(rows)


  return (
    <>
      <Header token={token} />
      <main className="relative mt-28 px-[30px] flex flex-col items-center justify-center">
        <div className="w-full lg:max-w-[1200px] lg:px-6 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {chapter?.name}
          </h1>
          <div className="hidden lg:flex justify-center gap-2 lg:sticky lg:top-[90px]">
            {Number(params.id) !== 0 && (
              <Button
                variant="contained"
                className="bg-gray-400 hover:bg-gray-600"
                disabled={chapter?.chapterNumber - 1 === 0}
                onClick={() =>
                  router.push(
                    `/products/${params?.id}/chapters/${chapter?.chapterNumber - 1}`,
                  )
                }
              >
                Previous
              </Button>
            )}
            {/* 
            <Button
              variant="outlined"
              startIcon={<SettingsIcon />}
              className="lg:bg-white lg:hover:bg-white"
            >
              Settings
            </Button> */}

            <Button
              variant="contained"
              disabled={chapter?.chapterNumber + 1 > rows.length}
              onClick={() =>
                router.push(
                  `/products/${params?.id}/chapters/${chapter?.chapterNumber + 1}`,
                )
              }
            >
              Next
            </Button>
          </div>

          <div>
            <p
              className="text-gray-700 py-5 leading-10 tracking-wider"
              dangerouslySetInnerHTML={{ __html: chapter?.content }}
            ></p>
          </div>
        </div>

        <div className="lg:hidden w-full flex justify-between gap-2 fixed bottom-[10px] px-[30px]">
          {Number(params.id) !== 0 && (
            <Button
              variant="contained"
              className="bg-gray-400 hover:bg-gray-600"
            >
              Previous
            </Button>
          )}

          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            className="bg-white hover:bg-white"
          >
            Settings
          </Button>

          <Button variant="contained">Next</Button>
        </div>
      </main>
    </>
  );
}
