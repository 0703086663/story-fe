'use client';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';

async function fetchChapterDetails(chapterId: number) {
  return {
    id: chapterId,
    name: 'Đây là tên chapter 1',
    content: `This is the content of ChapterThis is the content of ChapterTcontent of ChapterThis is the content of ChapterTcontent of ChapterThis is the content of ChapterTcontent of ChapterThis is the content of ChapterTcontent of ChapterThis is the content of ChapterTcontent of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of Chapter ${chapterId}.`,
  };
}

export default function ChapterDetailsPage({
  params,
}: {
  params: { id: number };
}) {
  const chapterId = 1;
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    async function fetchChapter() {
      if (chapterId) {
        const chapterData = await fetchChapterDetails(chapterId);
        setChapter(chapterData);
      }
    }

    fetchChapter();
  }, [chapterId]);

  console.log(params);
  return (
    <main className="relative mt-28 px-[30px] flex flex-col items-center justify-center">
      <div className="w-full lg:max-w-[1200px] lg:px-6 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-6 text-center">{chapter?.name}</h1>
        <div className="hidden lg:flex justify-center gap-2 lg:sticky lg:top-[90px]">
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
            className="lg:bg-white lg:hover:bg-white"
          >
            Settings
          </Button>

          <Button variant="contained">Next</Button>
        </div>

        <div>
          <p className="text-gray-700 py-5 leading-10 tracking-wider">
            {chapter?.content}
          </p>
        </div>
      </div>

      <div className="lg:hidden w-full flex justify-between gap-2 fixed bottom-[10px] px-[30px]">
        {Number(params.id) !== 0 && (
          <Button variant="contained" className="bg-gray-400 hover:bg-gray-600">
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
  );
}
