import { useMemo } from "react";
import { useMediaQuery } from "@mui/material";
import { Box, Typography, Sheet } from "@mui/joy";
import { isMobile } from "@ffilip/chan180-utils/env";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList } from "recharts";
import { IEntityVisit } from "../../../Utils/models";
import { useChartPalette } from "../helpers/chartPalette";
import C180ChartTooltip from "../components/C180ChartTooltip";

interface IProps {
  data: IEntityVisit[];
  totalVisits: number;
}



function DevicesChart({ data, totalVisits }: IProps) {
  const isSmall = useMediaQuery("(max-width:720px)");
  const isDeviceMobile = useMemo(() => isMobile(), []);
  const { axisTextColor, barColor, gridColor, labelColor } = useChartPalette();
  const isAngleEnabled = useMemo(() => isSmall && data.length > 5, [isSmall, data]);


  const xAxisHeight = useMemo(() => {
    if (!isAngleEnabled) {
      return isSmall ? 22 : 26;
    }

    const longestNameLenght = data
      .reduce((prev, curr) => curr.name.length > prev.length ? curr.name : prev, "")
      .length;

    return longestNameLenght * 4.2;
  }, [isSmall, data]);


  return (
    <Sheet
      variant="outlined"
      className="noRechartsSvgOutline"
      sx={{
        padding: `12px 8px ${totalVisits ? 4 : 12}px`,
        borderRadius: "md",
        height: totalVisits ? 240 : "auto",
        display: "flex",
        flexDirection: "column",
        width: 1
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
        <Box sx={{ flex: 1, minHeight: 4, mt: 1 }}>
          <ResponsiveContainer initialDimension={{ width: 1, height: 1 }}>
            <BarChart data={data.length ? data : undefined} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={gridColor} vertical={false} />
              <XAxis
                height={xAxisHeight}
                dataKey="name"
                stroke={axisTextColor}
                tickLine={false}
                axisLine={{ stroke: gridColor }}
                angle={isAngleEnabled ? -20 : 0}
                tickMargin={isAngleEnabled ? 6 : 2}
                interval={0}
                tick={{
                  fill: axisTextColor,
                  fontSize: isSmall ? 11 : 14,
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
                tickCount={8}
                domain={[0, dataMax => Math.ceil(dataMax * (isSmall ? 1.08 : 1.11))]}
              />

              {!isDeviceMobile && <C180ChartTooltip />}

              <Bar
                animationDuration={400}
                dataKey="visits"
                fill={barColor}
                radius={[10, 10, 0, 0]}
              >
                <LabelList
                  dataKey="visits"
                  position="top"
                  fontWeight={600}
                  fontSize={isSmall ? 13 : 17}
                  offset={isSmall ? 6 : 8}
                  fill={labelColor}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Sheet>
  );
}



export default DevicesChart;