"use client";

import { useDeleteSongMutation } from "@/lib/services/api";
import { Song } from "../types/songs";
import { FaPen, FaEye, FaTrash } from "react-icons/fa";
import Link from "next/link";
import Pagination from "./Pagination";
import Image from "next/image";

interface SongListProps {
  count: number;
  songs: Song[];
}

const Table: React.FC<SongListProps> = (props) => {
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
        <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead className="text-white">
            {props.songs?.map((song: Song) => {
              return (
                <tr
                  key={song._id}
                  className="bg-primary flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
                >
                  <th className="p-3 text-left max-sm:h-[115px] w-[110px]">
                    Cover
                  </th>
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
            {props.songs?.map((song: Song) => {
              return (
                <tr
                  key={song._id}
                  className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                >
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    <Image
                      className="rounded-full object-cover w-[100px] h-[100px]"
                      src={song.image}
                      alt={song.title}
                      width={100}
                      height={100}
                    />
                  </td>
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
                  <td className=" flex items-center h-full gap-6 border-grey-light border hover:bg-gray-100 p-3  hover:font-medium cursor-pointer">
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
        <Pagination count={props.count} />
      </div>
    </div>
  );
};

export default Table;
