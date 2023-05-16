"use client";
import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "Çavdar",
    data: [
      {
        x: new Date("2021-10-10"),
        y: 112,
      },
      {
        x: new Date("2021-10-20"),
        y: 100,
      },
      {
        x: new Date("2021-11-10"),
        y: 150,
      },
      {
        x: new Date("2021-12-10"),
        y: 82,
      },
      {
        x: new Date("2022-01-10"),
        y: 32,
      },
      {
        x: new Date("2022-02-10"),
        y: 95,
      },
      {
        x: new Date("2023-01-01"),
        y: 120,
      },
    ],
  },
];
const MyResponsiveLine = () => (
  <ResponsiveLine
    data={data}
    colors={{ scheme: "category10" }}
    margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
    xScale={{
      format: "%Y-%m-%d",
      precision: "day",
      type: "time",
      useUTC: true,
    }}
    xFormat={function (e) {
      return new Date(e).toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
    }}
    yScale={{
      type: "linear",
    }}
    yFormat={function (e) {
      return e + " TL";
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      format: function (value) {
        return new Date(value).toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
      },
      legend: "Tarih",
      legendPosition: "middle",
      legendOffset: 40,
      tickValues: 3,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      tickValues: 10,
      legend: "Fiyat",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    theme={{
      axis: {
        legend: {
          text: {
            fontSize: 16,
            fontWeight: 600,
            fill: "hsl(var(--destructive))",
          },
        },
      },
    }}
  />
);

export default MyResponsiveLine;
