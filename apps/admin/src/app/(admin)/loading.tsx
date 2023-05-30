import React from "react";
import { Skeleton } from "ui";

const Loading = () => {
  return (
    <section className="space-y-5">
      <Skeleton className="h-24 rounded-md border border-border p-5 shadow-sm" />
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32"></Skeleton>
          <Skeleton className="h-32"></Skeleton>
          <Skeleton className="h-32"></Skeleton>
          <Skeleton className="h-32"></Skeleton>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
          <Skeleton className="col-span-5 h-60"></Skeleton>
          <div className="col-span-5 flex flex-col gap-4 xl:col-span-2">
            <Skeleton className="h-32"></Skeleton>
            <div className="grid w-full grid-cols-2 gap-4">
              <Skeleton className="h-24"></Skeleton>
              <Skeleton className="h-24"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
