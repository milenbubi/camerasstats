import { useMemo } from "react";
import { Typography, Sheet, Stack } from "@mui/joy";
import { Centered } from "@ffilip/mui-react-utils/components";
import { useResizeObserver } from "@ffilip/mui-react-utils/document";
import { PieChart, Pie, Sector, PieSectorShapeProps } from "recharts";

import { useChartPalette } from "../helpers/chartPalette";
import { truncatePieText, usePieData } from "../helpers/pieUtils";
import { IEntityVisit, IUniqueEntities } from "../../../Utils/models";

interface IProps {
  data: IUniqueEntities;
  totalVisits: number;
}

interface ISingleEntityPieProps {
  data: IEntityVisit[];
  title: string;
  labelColor: string;
}

interface IPieLabelProps {
  name?: string;
  value?: number;
  color: string;
}


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


function PieLabel({ name, value, color }: IPieLabelProps) {
  const { width, htmlElementRef } = useResizeObserver<HTMLDivElement>();
  const isSmallPie = useMemo(() => width < 225, [width]);

  const label = useMemo(() => truncatePieText(name, isSmallPie), [name, isSmallPie]);
  const fontSize = useMemo(() => Math.floor(width / (isSmallPie ? 11 : 12.5)), [width]);

  return (
    <Centered
      ref={htmlElementRef}
      sx={{
        position: "absolute",
        inset: 0,
        flexDirection: "column",
        gap: fontSize / 2 + "px",
        pt: fontSize + "px"
      }}
    >
      <Typography sx={{ fontSize, lineHeight: 1, fontWeight: 600, color, zIndex: 10, cursor: "default" }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: fontSize + 1, lineHeight: 1, fontWeight: 600, color, zIndex: 10, cursor: "default" }}>
        {value}
      </Typography>
    </Centered>
  );
}



function SingleEntityPie({ data, title, labelColor }: ISingleEntityPieProps) {
  const { pieData, activeIndex, setActiveIndex } = usePieData(data);


  return (
    <Stack sx={{ flex: 1, gap: 1 }}>
      <Typography level="title-lg" textAlign="center" sx={{ fontSize: { xs: 12, sm: 18 } }}>
        {title}
      </Typography>

      <Stack sx={{ width: 1, position: "relative", flex: 1, justifyContent: "center" }}>
        <PieLabel name={pieData[activeIndex]?.name} value={pieData[activeIndex]?.visits} color={labelColor} />

        <PieChart style={{ width: "100%", aspectRatio: 1 }}>
          <Pie
            onMouseEnter={(_, index) => setActiveIndex(index)}
            shape={props => renderActiveShape({ ...props, isActive: activeIndex === props.index })}
            data={pieData}
            dataKey="visits"
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
          />
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
        display: "flex"
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