"use client";
import toast from "react-hot-toast";
import StatSkeleton from "./Skeletons/StatSkeleton";
import StatCard from "./StatCard";
import { useGetStatisticsQuery } from "@/lib/services/api";
const Stats = () => {
  const { data: stats, isLoading, error } = useGetStatisticsQuery("");
  if(error){
    toast.error("Something went wrong")
  }
  return (
    <>
      {isLoading ? (
        <>
          <StatSkeleton />
        </>
      ) : (
        <>
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-5 my-5">
              <StatCard title={"Total Albums"} count={stats.totalAlbums} />
              <StatCard title={"Total Artist"} count={stats.totalArtists} />
              <StatCard title={"Total Generes"} count={stats.totalGenres} />
              <StatCard title={"Total Song"} count={stats.totalSongs} />{" "}
            </div>
          )}{" "}
        </>
      )}
    </>
  );
};

export default Stats;
