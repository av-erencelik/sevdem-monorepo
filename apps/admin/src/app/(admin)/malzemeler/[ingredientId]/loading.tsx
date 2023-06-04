import React from "react";
import { Skeleton } from "ui";

const Loading = () => {
  return (
    <>
      <Skeleton className="mt-6 h-24 w-full p-5" />
      <div className="mt-6 grid grid-cols-4 gap-8">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
      <Skeleton className="mt-6 h-96 w-full p-5" />
      <Skeleton className="mt-6 h-96 w-full p-5" />
    </>
  );
};

export default Loading;
