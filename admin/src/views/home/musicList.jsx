import { useEffect, useState } from "react";
import axios from "../../config/axios";
import {
  MagnifyingGlassIcon,
  MusicalNoteIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import Player from "../../components/musicPlayer";

const MusicList = (props) => {
  const [musicList, setMusicList] = useState([]);
  const [fetchedList, setFetchedList] = useState([]);
  const [genreList, setGenreList] = useState(["mix"]);
  const [genre, setGenre] = useState("mix");
  const [loading, setLoading] = useState(false);
  const [selectedMusic, setMusic] = useState("");

  const token = localStorage.getItem("authToken") || "";

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const handleMusicSelection = (music) => {
    setMusic(music.url);
  };

  const handleSearch = (value) => {
    const filtered = fetchedList.filter((item) =>
      item.fileName.includes(value)
    );
    setMusicList(filtered);
  };
  const apiCall = () => {
    setLoading(true);
    axios
      .get(`v1/media/all/${genre}?token=${token}`)
      .then((res) => {
        if (res.status === 200) {
          setMusicList(res.data.musics);
          setFetchedList(res.data.musics);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const getGenres = () => {
    axios
      .get(`v1/media/genres?token=${token}`)
      .then((res) => {
        if (res.status === 200) {
          setGenreList(res.data.genres);
          if (res.data.genres && res.data.genres.length > 0)
            setGenre(res.data.genres[0]);
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    apiCall();
    //eslint-disable-next-line
  }, [genre]);

  const calculateSize = (totalBytes) => {
    if (totalBytes < 1000000) {
      return Math.floor(totalBytes / 1000) + " KB";
    } else {
      return Math.floor(totalBytes / 1000000) + " MB";
    }
  };

  const renderEmptyState = () => {
    return (
      <div className='text-center m-10 border border-dashed rounded-md border-gray-400 p-10'>
        <MusicalNoteIcon className='mx-auto h-12 w-12 text-gray-400' />
        <h3 className='mt-2 text-sm font-semibold text-gray-900'>No musics</h3>
        <p className='mt-1 text-sm text-gray-500'>
          Get started by uploading a new music or change genre.
        </p>
        <div className='mt-6'>
          <button
            type='button'
            onClick={() => props.handlePageChange(true)}
            className='inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            <PlusIcon className='-ml-0.5 mr-1.5 h-5 w-5' aria-hidden='true' />
            Upload Music
          </button>
        </div>
      </div>
    );
  };

  const renderMusicList = () => {
    return musicList.map((music, i) => {
      return (
        <div
          key={i}
          className='w-full p-2 rounded-md border bg-white drop-shadow-sm border-gray-100 flex items-center mb-2'>
          <img
            src={
              "https://res.cloudinary.com/dou11jh0x/image/upload/v1679791174/assets/b18ee78cc15841e086d737019792eebf_hmhva3.jpg"
            }
            className='w-6 h-6 rounded-full  m-2 drop-shadow-sm'
            alt='img'
          />
          <div className='flex justify-center items-center mx-auto'>
            <span className='text-base text-gray-800 font-semibold '>
              {music.fileName}
            </span>
            <span className='text-base text-gray-800 font-semibold ml-2'>
              (Size: {calculateSize(music.size)})
            </span>
          </div>
          <button
            onClick={() => {
              handleMusicSelection(music);
            }}
            className='ml-auto py-1.5 px-2 rounded-md bg-red-300 text-white font-semibold text-sm'>
            Play
          </button>
        </div>
      );
    });
  };

  const loadinView = () => {
    return (
      <div className='w-full p-4 flex justify-center items-center'>
        <div className='w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400'></div>
      </div>
    );
  };

  const renderMusic = () => {
    if (loading) {
      return loadinView();
    } else {
      if (musicList.length > 0) {
        return renderMusicList();
      } else return renderEmptyState();
    }
  };

  return (
    <>
      <div className='w-2/3 mx-auto p-2 mt-10 '>
        <div className='flex items-center rounded-md drop-shadow-md bg-white p-4'>
          <div className='mr-4 w-full'>
            <label
              htmlFor='search'
              className='block text-sm font-medium leading-6 text-gray-900'>
              Quick search
            </label>
            <div className='relative mt-2 flex items-center'>
              <input
                type='text'
                name='search'
                disabled={fetchedList.length < 1}
                id='search'
                onChange={(e) => handleSearch(e.target.value)}
                className={classNames(
                  "block w-full rounded-md border-0 py-1.5 pr-14 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                  fetchedList.length < 1
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white cursor-text"
                )}
              />
              <div className='absolute inset-y-0 right-0 flex py-1.5 pr-1.5'>
                <kbd className='inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400'>
                  <MagnifyingGlassIcon className='w-4 h-4' />
                </kbd>
              </div>
            </div>
          </div>
          <div className='ml-auto w-full flex'>
            <div className='mr-2 w-full'>
              <label
                htmlFor='location'
                className='block text-sm font-medium leading-6 text-gray-900'>
                Genre
              </label>
              <select
                id='location'
                name='location'
                value={genre.toLowerCase()}
                onChange={(e) => {
                  setGenre(e.target.value);
                }}
                className={classNames(
                  "mt-2 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6",
                  genreList.length < 1
                    ? "bg-gray-100 cursor-not-allowed"
                    : "bg-white cursor-pointer"
                )}>
                {genreList.map((item, i) => {
                  return (
                    <option key={i} value={item.toLowerCase()}>
                      {item.toUpperCase()}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              type='button'
              onClick={() => props.handlePageChange(true)}
              className=' w-[200px] mt-auto py-1 mb-[2px] px-2 rounded-md bg-lime-700 text-white text-base font-semibold text-center'>
              Upload Music
            </button>
          </div>
        </div>
        <div className=' rounded-md drop-shadow-sm mt-4 bg-gray-50 p-4'>
          {renderMusic()}
        </div>
      </div>
      <div className='fixed bottom-0 left-0 w-full'>
        <Player src={selectedMusic} />
      </div>
    </>
  );
};

export default MusicList;
