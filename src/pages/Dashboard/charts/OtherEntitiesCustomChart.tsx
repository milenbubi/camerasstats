import { useMemo } from "react";
import { Sheet } from "@mui/joy";
import { useMediaQuery } from "@mui/material";
import { Centered } from "@ffilip/mui-react-utils/components";
import { useChan180Colors } from "@ffilip/mui-react-utils/mui";
import { getRandomPastelColors } from "@ffilip/chan180-utils/colors";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, BarShapeProps } from "recharts";
import { IEntityVisit } from "../../../Utils/models";
import { useChartPalette } from "../helpers/chartPalette";

interface IProps {
  data: IEntityVisit[];
}

const MAX_ITEM_COUNTS = 8;


const getPath = (x: number, y: number, width: number, height: number) => (
  `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`
);


const TriangleBar = ({ fill, x, y, width, height }: BarShapeProps) => (
  <path d={getPath(Number(x), Number(y), Number(width), Number(height))} stroke="none" fill={fill} />
);



function SingleEntity({ data }: IProps) {
  const { labelC } = useChan180Colors();
  const isSmall = useMediaQuery("(max-width:920px)");
  const { axisTextColor, gridColor } = useChartPalette();
  const colors = useMemo(() => getRandomPastelColors(MAX_ITEM_COUNTS), [data]);


  const filteredData = useMemo(() => {
    return data
      .slice(0, MAX_ITEM_COUNTS)
      .map((x, index) => ({
        ...x,
        fill: colors[index % colors.length]
      }))
  }, [data]);


  const xAxisHeight = useMemo(() => {
    const longestNameLenght = filteredData
      .reduce((prev, curr) => curr.name.length > prev.length ? curr.name : prev, "")
      .length;

    return longestNameLenght * 8;
  }, [isSmall, filteredData]);


  return (
    <Sheet
      variant="outlined"
      sx={{
        padding: "12px 8px 4px",
        borderRadius: "lg",
        display: "flex",
        flex: 1,
        flexDirection: "column"
      }}
    >

      <BarChart style={{ aspectRatio: isSmall ? 3 : 1 }}
        responsive
        data={filteredData}
        margin={{
          top: 20,
          right: 0,
          left: 0,
          bottom: 5
        }}
      >

        <CartesianGrid vertical={false} strokeDasharray="3 3" />

        <XAxis dataKey="name"
          height={xAxisHeight}
          tickLine={false}
          angle={isSmall ? -40 : -40}
          tick={{
            fill: axisTextColor,
            fontSize: isSmall ? 11 : filteredData.length > 5 ? 10 : 15,
            fontWeight: 600,
            textAnchor: "end"
          }}
        />

        <YAxis
          width="auto"
          tickLine={false}
          allowDecimals={false}
          domain={[0, dataMax => Math.ceil(dataMax * (isSmall ? 1.15 : 1.08))]}
          axisLine={{ stroke: gridColor }}
          tick={{
            fill: axisTextColor,
            fontSize: isSmall ? 11 : 13,
            fontWeight: 600,
            textAnchor: "end"
          }}
        />

        <Bar
          dataKey="visits"
          shape={TriangleBar}
          label={{ position: "top", fontWeight: 600, fontSize: isSmall ? 13 : 15, fill: labelC }}
        />

      </BarChart>
    </Sheet>
  );
}



function OtherEntitiesCustomChart({ data }: IProps) {
  const isSmall = useMediaQuery("(max-width:720px)");

  return (
    <Centered sx={{ width: 1, gap: 2, flexDirection: isSmall ? "column" : "row", alignItems: "stretch" }} className="noRechartsSvgOutline">
      <SingleEntity data={data} />
      <SingleEntity data={data} />
      <SingleEntity data={data} />
    </Centered>
  );
}



export default OtherEntitiesCustomChart;