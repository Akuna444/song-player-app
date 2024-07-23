"use client";

interface Stat {
  _id: string;
  count: number;
  songs?: number;
}
interface SongListProps {
  data: Stat[];
  title: string;
}

const StatTable: React.FC<SongListProps> = ({ data, title }) => {
  console.log(data, "daa");
  return (
    <div>
      <div className="relative overflow-x-auto">
        <h2 className="font-bold">{title} Statistics</h2>
        {data?.length === 0 && <h3>No Data Available</h3>}
        <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
          <thead className="text-white">
            {data?.map((stat) => {
              return (
                <tr
                  key={stat._id}
                  className="bg-primary flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0"
                >
                  <th className="p-3 text-left w-[110px]">{title}</th>
                  <th className="p-3 text-left w-[110px]">Count</th>
                </tr>
              );
            })}
          </thead>
          <tbody className="flex-1 sm:flex-none">
            {data?.map((stat) => {
              return (
                <tr
                  key={stat._id}
                  className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
                >
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    {stat._id}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    {stat.count || stat.songs}
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

export default StatTable;
