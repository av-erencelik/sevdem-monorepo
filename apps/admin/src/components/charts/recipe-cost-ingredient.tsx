"use client";
import { ResponsivePie } from "@nivo/pie";

const RecipeCostByIngredientChart = ({ data }: { data: { id: string; value: number; label: string }[] }) => {
  return (
    <div className="h-64">
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 20, bottom: 40, left: 20 }}
        colors={{ scheme: "pastel1" }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        valueFormat={(e) => "₺" + e.toFixed(2)}
        enableArcLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        enableArcLinkLabels={true}
        arcLinkLabel={"label"}
        arcLabelsSkipAngle={10}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
      />
    </div>
  );
};

export default RecipeCostByIngredientChart;
