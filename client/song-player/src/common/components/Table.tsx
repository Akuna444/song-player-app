"use client";

import { useDeleteSongMutation } from "@/lib/services/api";
import { Song } from "../types/songs";
import { FaPen, FaEye, FaTrash } from "react-icons/fa";
import Link from "next/link";

interface SongListProps {
  songs: Song[];
}

const Table: React.FC<SongListProps> = ({ songs }) => {
  const [deleteSong] = useDeleteSongMutation();

  async function deleteSongHandler(id: string) {
    const res = await deleteSong(id);
    if (res) {
      window.location.reload();
    }
  }

  return (
    <div>
      <div className="relative overflow-x-auto">
        <div className="w-full flex justify-end">
          <Link href="/create">
            <button
              type="button"
              className="text-white bg-primary hover:bg-primaryHover focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-primary focus:outline-none dark:focus:ring-blue-800"
            >
              Add New
            </button>{" "}
          </Link>
        </div>
        <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead className="text-white">
            {songs?.map((song: Song) => {
              return (
                <tr
                  key={song._id}
                  className="bg-primary flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
                >
                  <th className="p-3 text-left w-[110px]">Title</th>
                  <th className="p-3 text-left w-[110px]">Artist</th>
                  <th className="p-3 text-left w-[110px]">Album</th>
                  <th className="p-3 text-left w-[110px]">Genre</th>
                  <th className="p-3 text-left w-[110px]">Actions</th>
                </tr>
              );
            })}
          </thead>
          <tbody className="flex-1 sm:flex-none">
            {songs?.map((song: Song) => {
              return (
                <tr
                  key={song._id}
                  className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                >
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    {song.title}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {song.artist}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {song.album}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {song.genre}
                  </td>
                  <td className=" flex gap-6 border-grey-light border hover:bg-gray-100 p-3  hover:font-medium cursor-pointer">
                    <Link href={`/${song._id}`}>
                      <FaEye className="text-green-400 hover:text-green-700" />{" "}
                    </Link>
                    <Link href={`/edit/${song._id}`}>
                      <FaPen className="text-green-500 hover:text-green-700" />{" "}
                    </Link>
                    <FaTrash
                      onClick={() => {
                        deleteSongHandler(song._id);
                      }}
                      className="text-red-400 hover:text-red-700"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
