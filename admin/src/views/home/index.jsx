/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import axios from "../../config/axios";
import { Fragment, useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import SelectedItems from "./selectedItems";
import { useNavigate } from "react-router-dom";
import isTokenExpired from "../../config/validateToken";
import MusicList from "./musicList";

export default function Home() {
  const [genre, setGenre] = useState("");
  const [isUpload, setUploadPage] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenExpired()) {
      console.log(isTokenExpired());
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  const handleFileChange = (e) => {
    setFileList([...fileList, ...e.target.files]);
  };

  const handleRemove = (index) => {
    setFileList(fileList.filter((item, i) => index !== i));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // 👇 Create new FormData object and append files
    let data = new FormData();
    data.append("genre", genre);
    fileList.forEach((file) => {
      data.append("files", file, file.name);
    });
    axios
      .post("v1/media/upload", data)
      .then((res) => {
        alert("Success");
        setFileList([]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          alert("try again");
        } else {
          alert("Please Try Again");
        }
      });
  };

  const renderUploadView = () => {
    return (
      <div>
        {loading && (
          <div className='border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto mt-16'>
            <div className='animate-pulse flex space-x-4'>
              <div className='rounded-full bg-slate-200 h-10 w-10'></div>
              <div className='flex-1 space-y-6 py-1'>
                <div className='h-2 bg-slate-200 rounded'></div>
                <div className='space-y-3'>
                  <div className='grid grid-cols-3 gap-4'>
                    <div className='h-2 bg-slate-200 rounded col-span-2'></div>
                    <div className='h-2 bg-slate-200 rounded col-span-1'></div>
                  </div>
                  <div className='h-2 bg-slate-200 rounded'></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!loading && (
          <div className='w-2/3 mx-auto p-2 rounded-md drop-shadow-md bg-white'>
            <main className='py-10'>
              <div className='px-4 sm:px-6 lg:px-8'>
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className='my-2 '>
                    <label
                      htmlFor='genre'
                      className='block text-sm text-left font-medium leading-6 text-gray-900'>
                      Genre
                    </label>
                    <div className='mt-2 flex items-center'>
                      <input
                        id='genre'
                        name='genre'
                        type='text'
                        autoComplete='name'
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                        className='block mr-4 w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                      <div
                        className='ml-auto w-full flex items-center justify-center
                      '>
                        <button
                          type='submit'
                          className='w-full mr-2 py-1.5 px-2 rounded-md bg-indigo-700 text-white text-base font-semibold text-center'>
                          Upload
                        </button>
                        <button
                          type='button'
                          onClick={() => setUploadPage(false)}
                          className='w-full py-1.5 px-2 rounded-md bg-lime-700 text-white text-base font-semibold text-center'>
                          Music List
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-full'>
                    <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                      <div className='text-center'>
                        <PhotoIcon
                          className='mx-auto h-12 w-12 text-gray-300'
                          aria-hidden='true'
                        />
                        <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                          <label
                            htmlFor='file-upload'
                            className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600   hover:text-indigo-500'>
                            <span>Upload a file</span>
                            <input
                              id='file-upload'
                              name='file-upload'
                              type='file'
                              className='sr-only'
                              onChange={handleFileChange}
                              accept='audio/mp3,audio/*;capture=microphone'
                              multiple
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <SelectedItems items={fileList} handleRemove={handleRemove} />
              </div>
            </main>
          </div>
        )}
      </div>
    );
  };

  const renderView = () => {
    if (isUpload) return renderUploadView();
    else return <MusicList handlePageChange={(val) => setUploadPage(val)} />;
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}

      {renderView()}
    </>
  );
}
