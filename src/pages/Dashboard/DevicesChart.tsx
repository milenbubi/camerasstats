import { useMediaQuery } from "@mui/material";
import { Box, Typography, Sheet, colors } from "@mui/joy";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { IDeviceStat } from "../../Utils/models";
import { useChartPalette } from "./chartPalette";

interface IProps {
  data?: IDeviceStat[];
  totalVisits?: number;
}



function DevicesChart({ data, totalVisits = -1 }: IProps) {
  const isSmall = useMediaQuery("(max-width:520px)");
  const { axisTextColor, barColor, bgColor, gridColor, secondaryColor, toolTipBgcolor } = useChartPalette();


  return (
    <Sheet
      variant="outlined"
      sx={{
        padding: "12px 8px 4px",
        borderRadius: "lg",
        height: 300,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        width: "100%",
        maxWidth: 700,
        "svg:focus, g:focus, path:focus": {
          outline: "none"
        }
      }}
    >
      <Typography level="title-lg" textAlign="center">
        {"Traffic by Device"}
      </Typography>

      {totalVisits >= 0 && (
        <Typography level="title-sm" fontStyle="italic" textAlign="center">
          {totalVisits ? `${totalVisits} visits` : "No visits for the selected period"}
        </Typography>
      )}

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
                fontSize: isSmall ? 11 : 15,
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