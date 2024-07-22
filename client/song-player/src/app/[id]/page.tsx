"use client";

import { useParams } from "next/navigation";
import { useGetSongQuery } from "@/lib/services/api";
import Spinner from "@/common/components/Spinner";

const Detail = () => {
  const { id } = useParams();
  const { data: song, error, isLoading } = useGetSongQuery(id);

  return <div>{isLoading ? <Spinner /> : <div>{song.title}</div>}</div>;
};

export default Detail;
