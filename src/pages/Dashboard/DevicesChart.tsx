import { useMediaQuery } from "@mui/material";
import { Box, Typography, Sheet } from "@mui/joy";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useChartPalette } from "./helpers/chartPalette";
import { IEntityVisit } from "../../Utils/models";
import C180ChartTooltip from "./helpers/C180ChartTooltip";

interface IProps {
  data: IEntityVisit[];
  totalVisits: number;
}



function DevicesChart({ data, totalVisits }: IProps) {
  const isSmall = useMediaQuery("(max-width:720px)");
  const { axisTextColor, barColor, gridColor } = useChartPalette();


  return (
    <Sheet
      variant="outlined"
      className="noRechartsSvgOutline"
      sx={{
        padding: `12px 8px ${totalVisits ? 4 : 12}px`,
        borderRadius: "lg",
        height: totalVisits ? 220 : 220,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: 700
      }}
    >

      <Typography level="title-lg" textAlign="center" sx={{ mb: "4px" }}>
        {"Traffic by Device"}
      </Typography>

      <Typography
        level={totalVisits ? "title-sm" : "h4"}
        sx={{
          fontWeight: 600,
          flex: totalVisits ? 0 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: totalVisits ? "auto" : barColor
        }}
      >
        {totalVisits ? `${totalVisits} visits` : "No visits for the selected period"}
      </Typography>

      {totalVisits > 0 && (
        <Box sx={{ flex: 1, minHeight: 0, mt: 1 }}>
          <ResponsiveContainer initialDimension={{ width: 1, height: 1 }}>
            <BarChart data={data.length ? data : undefined} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={gridColor} vertical={false} />
              <XAxis
                dataKey="name"
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
                width={40}
                stroke={axisTextColor}
                tick={{ fill: axisTextColor }}
                tickLine={false}
                axisLine={{ stroke: gridColor }}
                allowDecimals={false}
                fontSize={12} fontWeight={600}
              />

              <C180ChartTooltip />
              <Bar
                dataKey="visits"
                fill={barColor}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Sheet>
  );
}



export default DevicesChart;