'use client';
import { useEffect, useState } from 'react';

// Example function to fetch chapter details from an API
async function fetchChapterDetails(chapterId) {
  // Implement your logic to fetch chapter details from an API
  // For demonstration, I'm returning a dummy chapter object
  return {
    id: chapterId,
    title: `Chapter ${chapterId} Title`,
    content: `This is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of ChapterThis is the content of Chapter ${chapterId}.`,
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
    <main className="mx-[200px] flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold mb-6">Chapter Details</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">{chapter?.title}</h2>
        <p className="text-gray-700">{chapter?.content}</p>
      </div>
      {/* <button
        // onClick={handleNextChapter}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Next Chapter
      </button> */}
      <div className="flex mt-4 space-x-4">
        {Number(params.id) !== 0 && (
          <button
            //   onClick={handlePreviousChapter}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            //   disabled={currentChapterId === 1}
          >
            Previous Chapter
          </button>
        )}
        <button
          //   onClick={handleNextChapter}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Next Chapter
        </button>
      </div>
    </main>
  );
}
