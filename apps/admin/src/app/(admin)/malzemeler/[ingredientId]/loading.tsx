import React from "react";
import { Separator, Skeleton } from "ui";

const Loading = () => {
  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-sm">
      <Skeleton className="h-[800px]" />
    </div>
  );
};

export default Loading;
