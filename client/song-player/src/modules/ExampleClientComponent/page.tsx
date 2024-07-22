"use client";

import { useGetSongsQuery } from "@/lib/services/api";
import Image from "next/image";
import React from "react";
import ExampleCounter from "./components/Counter";

const ExampleClientComponent = () => {
  const { data, isLoading, isError } = useGetSongsQuery("");
  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ExampleCounter />
    </main>
  );
};

export default ExampleClientComponent;
