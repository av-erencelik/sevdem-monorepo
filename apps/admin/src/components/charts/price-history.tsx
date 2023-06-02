"use client";
import useCheckMobileScreen from "@/lib/hooks/useCheckMobileScreen";
import { ResponsiveLine } from "@nivo/line";
import { Card, CardContent, TypographyH4 } from "ui";

const PriceHistory = ({
  data,
}: {
  data: {
    id: string;
    data: {
      y: number;
      x: Date;
    }[];
  };
}) => {
  const isMobile = useCheckMobileScreen();
  const refactoredData = [data];
  return (
    <div className="mb-3 h-64">
      <TypographyH4 classname="pt-6">Ürün Fiyat Geçmişi</TypographyH4>
      <ResponsiveLine
        data={refactoredData}
        colors={{ scheme: "category10" }}
        margin={{ top: 30, right: 25, bottom: 25, left: 50 }}
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
          return parseFloat(e.toString()).toFixed(2) + " ₺";
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
    </div>
  );
};

export default PriceHistory;
