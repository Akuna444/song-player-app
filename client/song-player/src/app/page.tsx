"use client";
import Table from "@/common/components/Table";
import fetcher from "@/common/utils/fetcher";
import ExampleClientComponent from "@/modules/ExampleClientComponent/page";
import { useGetSongsQuery } from "@/lib/services/api";

export default function Home() {
  const { data: songs, error, isLoading } = useGetSongsQuery("");

  return (
    <div className="section-padding">
      <Table songs={songs} />
      <ExampleClientComponent />{" "}
    </div>
  );
}
