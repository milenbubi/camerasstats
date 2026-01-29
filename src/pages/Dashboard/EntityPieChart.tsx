import { Typography, Sheet, Stack } from "@mui/joy";
import { useEffect, useMemo, useState } from "react";
import { Centered } from "@ffilip/mui-react-utils/components";
import { useResizeObserver } from "@ffilip/mui-react-utils/document";
import { getRandomPastelColors } from "@ffilip/chan180-utils/helpers";
import { PieChart, Pie, Tooltip, Sector, PieSectorShapeProps } from "recharts";
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

const MAX_ITEM_COUNTS = 12;
const DEFAULT_INDEX = 0;
const NAME_MAX_LENGTH = 14;


const truncateText = (text = "", isSmallPie?: boolean) => {
  const maxLength = isSmallPie ? NAME_MAX_LENGTH - 2 : NAME_MAX_LENGTH;
  return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
};


const renderActiveShape = (p: PieSectorShapeProps) => {
  if (!p.isActive) {
    return <Sector {...p} />;
  }

  return (
    <g>
      <Sector {...p} innerRadius={p.innerRadius - 1} outerRadius={p.outerRadius + 1} />
      <Sector {...p} innerRadius={p.outerRadius + 5} outerRadius={p.outerRadius + 9} />
    </g>
  );
};



function SingleEntityPie({ data, title, labelColor }: ISingleEntityPie) {
  const [activeIndex, setActiveIndex] = useState(DEFAULT_INDEX);
  const { width, htmlElementRef } = useResizeObserver<HTMLDivElement>();
  const isSmallPie = useMemo(() => width < 225, [width]);
  const fontSize = useMemo(() => Math.floor(width / (isSmallPie ? 11 : 12.5)), [width]);


  const pieData = useMemo(() => {
    const randomColors = getRandomPastelColors(MAX_ITEM_COUNTS);
    const croppedData = (data.length <= MAX_ITEM_COUNTS) ? data : data.slice(0, MAX_ITEM_COUNTS);

    return croppedData.map((cd, i) => ({
      name: truncateText(cd.name, isSmallPie),
      value: cd.visits,
      fill: randomColors[i % randomColors.length],
    }));
  }, [data, isSmallPie]);


  useEffect(() => {
    setActiveIndex(DEFAULT_INDEX);
  }, [pieData]);


  return (
    <Stack ref={htmlElementRef} sx={{ flex: 1, gap: 1 }}>
      <Typography level="title-lg" textAlign="center" sx={{ fontSize: { xs: 12, sm: 18 } }}>
        {title}
      </Typography>

      <Stack sx={{ width: 1, position: "relative", flex: 1, justifyContent: "center" }}>
        <Centered
          sx={{
            position: "absolute",
            inset: 0,
            flexDirection: "column",
            gap: fontSize / 2 + "px",
            pt: fontSize + "px"
          }}
        >
          <Typography sx={{ fontSize, lineHeight: 1, fontWeight: 600, color: labelColor, zIndex: 10, cursor: "default" }}>
            {pieData[activeIndex]?.name}
          </Typography>
          <Typography sx={{ fontSize: fontSize + 1, lineHeight: 1, fontWeight: 600, color: labelColor, zIndex: 10, cursor: "default" }}>
            {pieData[activeIndex]?.value}
          </Typography>
        </Centered>

        <PieChart style={{ width: "100%", aspectRatio: 1 }}>
          <Pie
            onMouseEnter={(_, index) => setActiveIndex(index)}
            shape={props => renderActiveShape({ ...props, isActive: activeIndex === props.index })}
            data={pieData}
            dataKey="value"
            nameKey="name"
            isAnimationActive={true}
            animationEasing="ease"
            animationDuration={400}
            animationBegin={0}
            outerRadius="90%"
            innerRadius="75%"
            paddingAngle={3}
            cornerRadius={5}
            stroke="none"
            style={{ minWidth: 330 }}
          />

          <Tooltip content={() => null} defaultIndex={DEFAULT_INDEX} />
        </PieChart>
      </Stack>

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
        width: 1,
        pt: "12px", px: { xs: 1, sm: 1, xl: 1 },
        gap: { xs: 1, sm: 1, md: 2, xl: 1 },
        borderRadius: "md",
        display: "flex",
      }}
    >

      {totalVisits === 0 && (
        <Typography
          level="h4"
          sx={{
            width: 1, height: 110,
            fontWeight: 600, color: barColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          children={"No Records"}
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