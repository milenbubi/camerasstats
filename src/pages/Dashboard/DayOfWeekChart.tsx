import { Typography, Sheet } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { XAxis, YAxis, CartesianGrid, AreaChart, Area, LabelList } from "recharts";

import { IEntityVisit } from "../../Utils/models";
import { useChartPalette } from "./helpers/chartPalette";

interface IProps {
  data: IEntityVisit[];
}



function DayOfWeekChart({ data, }: IProps) {
  const isSmall = useMediaQuery("(max-width:600px)");
  const { axisTextColor, areaColor, labelColor } = useChartPalette();


  return (
    <Sheet
      variant="outlined"
      className="noRechartsSvgOutline"
      sx={{
        padding: "12px 8px 4px",
        borderRadius: "lg",
        width: "100%",
        maxWidth: 700
      }}
    >

      <Typography level="title-lg" textAlign="center">
        {"Visits by Day of Week"}
      </Typography>

      <AreaChart
        style={{ width: '100%', maxWidth: '700px', minHeight: 210, aspectRatio: 2.9 }}
        responsive
        data={data}
        syncId="anyId"
        margin={{
          top: 20,
          right: 30,
          left: 0
        }}
      >

        <CartesianGrid vertical={true} strokeDasharray="3 3" opacity={0.4} />

        <XAxis dataKey="name"
          height={isSmall ? 41 : 28}
          stroke="transparent"
          tickLine={true}
          angle={isSmall ? -25 : 0}
          axisLine={true}
          tick={{
            fill: axisTextColor,
            fontSize: isSmall ? 11 : 13,
            fontWeight: 600,
            textAnchor: "middle"
          }}
          tickMargin={isSmall ? 12 : 3}
        />

        <YAxis
          width={40}
          tickLine={false}
          allowDecimals={false}
          tickCount={4}
          domain={[0, dataMax => Math.ceil(dataMax * (isSmall ? 1.15 : 1.08))]}
          axisLine={{ stroke: "gridColor" }}
          tick={{
            fill: axisTextColor,
            fontSize: 12,
            fontWeight: 600,
            textAnchor: "end"
          }}
        />

        <Area type="monotone" dataKey="visits" stroke="#82ca9d" fill={areaColor}>
          <LabelList
            dataKey="visits"
            position="top"
            fontWeight={600}
            fontSize={isSmall ? 13 : 17}
            offset={8}
            fill={labelColor}
          />
        </Area>

      </AreaChart>
    </Sheet>
  );
}



export default DayOfWeekChart;