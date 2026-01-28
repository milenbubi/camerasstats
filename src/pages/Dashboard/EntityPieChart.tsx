import { Typography, Sheet, Stack } from "@mui/joy";
import { useEffect, useMemo, useState } from "react";
import { getRandomPastelColors } from "@ffilip/chan180-utils/helpers";
import { PieChart, Pie, Tooltip, Sector, PieSectorDataItem } from "recharts";
import { useChartPalette } from "./helpers/chartPalette";
import { IEntityVisit, IUniqueEntities } from "../../Utils/models";

interface IProps {
  data: IUniqueEntities;
  totalVisits: number;
}

interface ISingleEntityPie {
  data: IEntityVisit[];
  title: string;
  labelColor: string;
}

const MAX_ITEM_COUNTS = 8;
const DEFAULT_INDEX = 0;

const truncate = (text = "", max = 15) => text.length > max ? text.slice(0, max - 1) + "…" : text;



const renderActiveShape = (props: PieSectorDataItem & { isActive?: boolean, labelColor?: string }) => {
  const {
    value, name,
    fill, cx, cy,
    isActive, labelColor,
    innerRadius = 0, outerRadius = 0, startAngle, endAngle, cornerRadius
  } = props;

  if (!isActive) {
    return <Sector {...{ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, cornerRadius }} />;
  }

  const screenW = window.innerWidth;
  const fontSize = Math.min(14, screenW / 45);


  return (
    <g>
      <text x={cx} y={cy} dy={0} textAnchor="middle" fill={labelColor} fontWeight={600} fontSize={fontSize}>
        {truncate(name)}
      </text>
      <text x={cx} y={cy} dy={fontSize * 1.5} textAnchor="middle" fill={labelColor} fontWeight={600} fontSize={fontSize}>
        {value}
      </text>
      <Sector {...{ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, cornerRadius }} />
      <Sector {...{ cx, cy, innerRadius: outerRadius + 4, outerRadius: outerRadius + 7, startAngle, endAngle, fill, cornerRadius }} />
    </g>
  );
};



function SingleEntityPie({ data, title, labelColor }: ISingleEntityPie) {
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX); // 

  const pieData = useMemo(() => {
    const randomColors = getRandomPastelColors(MAX_ITEM_COUNTS);
    const croppedData = (data.length <= MAX_ITEM_COUNTS) ? data : data.slice(0, MAX_ITEM_COUNTS);

    return croppedData.map((cd, i) => ({
      name: cd.name,
      value: cd.visits,
      fill: randomColors[i % randomColors.length],
    }));
  }, [data]);


  useEffect(() => {
    setActiveIndex(DEFAULT_INDEX);
  }, [data]);


  return (
    <Stack sx={{ flex: 1 }}>
      <Typography level="title-lg" textAlign="center" sx={{ mb: "4px", fontSize: { xs: 12, sm: 18 } }}>
        {title}
      </Typography>

      <PieChart style={{ width: "100%", aspectRatio: 1, flex: 1 }}>
        <Pie
          onMouseEnter={(_, index) => setActiveIndex(index)}
          shape={props => renderActiveShape({ ...props, labelColor, isActive: activeIndex === props.index })}
          data={pieData}
          dataKey="value"
          nameKey="name"
          isAnimationActive={true}
          animationEasing="ease"
          animationDuration={400}
          animationBegin={0}
          outerRadius="90%"
          innerRadius="70%"
          paddingAngle={3}
          cornerRadius={3}
        />

        <Tooltip content={() => null} defaultIndex={DEFAULT_INDEX} />
      </PieChart>

    </Stack>
  );
}


function EntityPieCharts({ data, totalVisits }: IProps) {
  const { barColor, labelColor } = useChartPalette();


  return (
    <Sheet
      variant="outlined"
      className="noRechartsSvgOutline"
      sx={{
        gap: { xs: 1, sm: 2 },
        pt: "12px", px: { sm: 2 },
        borderRadius: "lg",
        display: "flex",
        width: 1
      }}
    >

      {totalVisits === 0 && (
        <Typography
          level="h4"
          sx={{
            fontWeight: 600,
            width: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 110,
            color: barColor
          }}
          children={"No visits for the selected period"}
        />
      )}

      {totalVisits > 0 && (
        <>
          <SingleEntityPie data={data.countries} title="Countries" labelColor={labelColor} />
          <SingleEntityPie data={data.cities} title="Cities" labelColor={labelColor} />
          <SingleEntityPie data={data.oses} title="OSes" labelColor={labelColor} />
        </>
      )}

    </Sheet>
  );
}



export default EntityPieCharts;