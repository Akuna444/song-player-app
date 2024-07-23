"use client";
import Table from "@/common/components/Table";
import { useGetSongsQuery } from "@/lib/services/api";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Search from "@/common/components/Search";
import { genres } from "@/constants/genres";
import Stats from "@/common/components/Stats";
import Button from "@/common/components/Button";
import HomeSkeleton from "@/common/components/Skeletons/HomeSkeleton";
import toast from "react-hot-toast";
import { Suspense } from "react";

export default function Home() {
  const [genre, setGenre] = useState<string>("");
  const searchParams = useSearchParams();
  const page = searchParams?.get("page") || 1;
  const q = searchParams?.get("q") || "";

  // @ts-ignore
  const { data, error, isLoading } = useGetSongsQuery({ page, q, genre });

  if (error) {
    toast.error("Failed to fetch");
  }
  return (
    <div className="section-padding">
      {isLoading ? (
        <HomeSkeleton />
      ) : (
        <>
          <Stats />
          <div className="w-full flex justify-center mb-10">
            <Button link="statistics" title="More Stats" />
          </div>

          <div className="w-full flex-col flex md:flex-row gap-4  justify-between">
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Filter by genre
              </label>
              <select
                onChange={(e) => {
                  if (e.target.value === "All") {
                    return setGenre("");
                  }
                  setGenre(e.target.value);
                }}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {genres.map((genre) => {
                  return (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  );
                })}
              </select>
            </div>
            <Suspense>
              <Search />
            </Suspense>
            <Button link="create" title="Add New" />
          </div>
          {data &&
            (data.songs?.length === 0 ? (
              <h3>No Songs Found</h3>
            ) : (
              <Table count={data?.count} songs={data?.songs} />
            ))}
        </>
      )}
      {error && <p>Failed to fetch</p>}
    </div>
  );
}
