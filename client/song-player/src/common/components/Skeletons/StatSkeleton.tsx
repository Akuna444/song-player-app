const StatSkeleton = () => {
  return (
    <div className="relative overflow-x-auto animate-pulse">
      <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead className="text-white">
          <tr className="bg-gray-300 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
            <th className="p-3 text-left w-[110px]">
              <div className="h-4 bg-gray-200 rounded"></div>
            </th>
            <th className="p-3 text-left w-[110px]">
              <div className="h-4 bg-gray-200 rounded"></div>
            </th>
            <th className="p-3 text-left w-[110px]">
              <div className="h-4 bg-gray-200 rounded"></div>
            </th>
            <th className="p-3 text-left w-[110px]">
              <div className="h-4 bg-gray-200 rounded"></div>
            </th>
            <th className="p-3 text-left w-[110px]">
              <div className="h-4 bg-gray-200 rounded"></div>
            </th>
          </tr>
        </thead>
        <tbody className="flex-1 sm:flex-none">
          <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
            <td className="border-grey-light border hover:bg-gray-100 p-3">
              <div className="h-4 bg-gray-200 rounded"></div>
            </td>
            <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
              <div className="h-4 bg-gray-200 rounded"></div>
            </td>
            <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
              <div className="h-4 bg-gray-200 rounded"></div>
            </td>
            <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
              <div className="h-4 bg-gray-200 rounded"></div>
            </td>
            <td className=" flex gap-6 border-grey-light border hover:bg-gray-100 p-3  hover:font-medium cursor-pointer">
              <div className="h-4 bg-gray-200 rounded"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StatSkeleton;
