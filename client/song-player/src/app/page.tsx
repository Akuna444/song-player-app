"use client";
import Table from "@/common/components/Table";
import { useGetSongsQuery } from "@/lib/services/api";
import Spinner from "@/common/components/Spinner";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Search from "@/common/components/Search";
import { genres } from "@/constants/genres";
import Link from "next/link";

export default function Home() {
  const [genre, setGenre] = useState<string>("");
  const searchParams = useSearchParams();
  const page = searchParams?.get("page") || 1;
  const q = searchParams?.get("q") || "";

  const { data, error, isLoading } = useGetSongsQuery({ page, q, genre });

  return (
    <div className="section-padding">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="w-full flex justify-between">
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
            <Search />
            <Link href="/create">
              <button
                type="button"
                className="text-white bg-primary hover:bg-primaryHover focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-primary focus:outline-none dark:focus:ring-blue-800"
              >
                Add New
              </button>{" "}
            </Link>
          </div>
          {data &&
            (data.songs?.length === 0 ? (
              <h3>No Songs Found</h3>
            ) : (
              <Table count={1} songs={data?.songs} />
            ))}
        </>
      )}
      {error && <p>Failed to fetch</p>}
    </div>
  );
}
