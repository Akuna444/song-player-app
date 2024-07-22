import { Song } from "../types/songs";

interface SongListProps {
  songs: Song[];
}

const Table: React.FC<SongListProps> = ({ songs }) => {
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead className="text-white">
            {songs?.map((song: Song) => {
              return (
                <tr
                  key={song._id}
                  className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
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
                  <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                    Delete
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
