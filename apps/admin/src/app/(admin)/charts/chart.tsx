"use client";
import useCheckMobileScreen from "@/lib/hooks/useCheckMobileScreen";
import { ResponsiveLine } from "@nivo/line";
import { Card, CardContent, TypographyH4 } from "ui";

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
        x: new Date("2022-10-05"),
        y: 120,
      },
    ],
  },
];
const MyResponsiveLine = () => {
  const isMobile = useCheckMobileScreen();
  return (
    <Card className="h-full">
      <CardContent className="h-72">
        <TypographyH4 classname="px-3 pt-6">Ürün Fiyat Geçmişi</TypographyH4>
        <ResponsiveLine
          data={data}
          colors={{ scheme: "pastel1" }}
          margin={{ top: 30, right: 20, bottom: 25, left: 50 }}
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
            return e + " ₺";
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: function (value) {
              return new Date(value).toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
            },
            tickValues: isMobile ? 3 : 7,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: 10,
            format: function (value) {
              return value + " ₺";
            },
          }}
          pointSize={6}
          pointColor={{ from: "color" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          defs={[
            {
              colors: [
                {
                  color: "inherit",
                  offset: 0,
                },
                {
                  color: "inherit",
                  offset: 100,
                  opacity: 0,
                },
              ],
              id: "gradientA",
              type: "linearGradient",
            },
          ]}
          enableArea={true}
          theme={{
            axis: {
              legend: {
                text: {
                  fontSize: 14,
                  fontWeight: 800,
                  fill: "hsl(var(--secondary-foreground))",
                },
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default MyResponsiveLine;
