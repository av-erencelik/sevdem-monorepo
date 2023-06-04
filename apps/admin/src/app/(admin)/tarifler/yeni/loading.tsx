import React from "react";
import { Separator, Skeleton } from "ui";

const Loading = () => {
  return (
    <div className="space-y-6 rounded-lg border border-border p-10 pb-16 shadow-sm">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Yeni Tarif</h2>
        <p className="text-muted-foreground">Eklediğin malzemelerle yeni bir tarif oluştur</p>
      </div>
      <Separator className="my-6" />
      <Skeleton className="h-[800px]" />
    </div>
  );
};

export default Loading;
