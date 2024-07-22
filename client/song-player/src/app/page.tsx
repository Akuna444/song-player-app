"use client";
import Table from "@/common/components/Table";
import { useGetSongsQuery } from "@/lib/services/api";
import Spinner from "@/common/components/Spinner";

export default function Home() {
  const { data: songs, error, isLoading } = useGetSongsQuery("");


  return (
    <div className="section-padding">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {songs && songs?.length === 0 ? (
            <h3>No Songs Found</h3>
          ) : (
            <Table songs={songs} />
          )}
        </>
      )}
    </div>
  );
}
