"use client";

import { useParams } from "next/navigation";
import { useGetSongQuery } from "@/lib/services/api";
import Spinner from "@/common/components/Spinner";
import Image from "next/image";
import { FaPen } from "react-icons/fa";
import Link from "next/link";

const Detail = () => {
  const { id } = useParams();
  const { data: song, error, isLoading } = useGetSongQuery(id);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="max-w-sm mx-auto section-padding bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <Image
              width={400}
              height={400}
              className="rounded-t-lg"
              src={song.image}
              alt={song.title}
            />
          </a>
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Title: {song.title}
            </h5>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Artist: {song.artist}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Album: {song.album}
            </p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Genre: {song.genre}
            </p>
            <Link
              href={`/edit/${song._id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg hover:bg-primaryHover focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit &nbsp;
              <FaPen />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
