import { useMediaQuery } from "@mui/material";
import { Box, Typography, Sheet, colors } from "@mui/joy";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

import { IDeviceStat } from "../../Utils/models";
import { useChartPalette } from "./chartPalette";

interface IProps {
  data: IDeviceStat[];
  title: string;
}



function DevicesChart({ data, title }: IProps) {
  const isSmall = useMediaQuery("(max-width:520px)");
  const { axisTextColor, barColor, bgColor, gridColor, secondaryColor, toolTipBgcolor } = useChartPalette();


  return (
    <Sheet
      variant="outlined"
      sx={{
        py: 2,
        px: 1,
        borderRadius: "lg",
        height: 300,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
        maxWidth: 565,
        "svg:focus, g:focus, path:focus": {
          outline: "none"
        }
      }}
    >
      <Typography level="title-lg" textAlign="center">
        {title}
      </Typography>

      <Box sx={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer initialDimension={{ width: 1, height: 1 }}>
          <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid stroke={gridColor} vertical={false} />
            <XAxis
              dataKey="device"
              stroke={axisTextColor}
              tickLine={false}
              axisLine={{ stroke: gridColor }}
              angle={isSmall ? -20 : 0}
              tickMargin={isSmall ? 6 : 2}
              interval={0}
              tick={{
                fill: axisTextColor,
                fontSize: isSmall ? 11 : 13,
                fontWeight: 600,
                textAnchor: "middle"
              }}
            />
            <YAxis
              stroke={axisTextColor}
              tick={{ fill: axisTextColor }}
              tickLine={false}
              axisLine={{ stroke: gridColor }}
              allowDecimals={false}
              fontSize={12} fontWeight={600}
              width={45}
            />
            <Tooltip
              // Highlight overlay on hovered bar (semi-transparent background)
              cursor={{ opacity: 0.03 }}
              separator=": "
              contentStyle={{
                borderRadius: 8,
                border: `1px solid ${gridColor}`,
                background: toolTipBgcolor
              }}
              itemStyle={{
                fontWeight: 600
              }}
              labelStyle={{
                fontWeight: 600,
                color: colors.yellow[400]
              }}
            />
            <Bar
              dataKey="visits"
              fill={barColor}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Sheet>
  );
}



export default DevicesChart;