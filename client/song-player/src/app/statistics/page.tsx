"use client";
import { useGetStatisticsQuery } from "@/lib/services/api";
import Spinner from "@/common/components/Spinner";
import StatTable from "@/common/components/StatTable";
import Stats from "@/common/components/Stats";
import toast from "react-hot-toast";

const Statistics = () => {
  const { data: stats, isLoading, error } = useGetStatisticsQuery("");

  if (error) {
    toast.error("Something went wrong");
  }

  return (
    <div className="section-padding">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {stats && (
            <>
              <Stats />
              <StatTable data={stats.albumStats} title="Album" />
              <StatTable data={stats.genreCounts} title="Genre" />
              <StatTable data={stats.artistStats} title="Artist" />
            </>
          )}{" "}
        </>
      )}
    </div>
  );
};

export default Statistics;
