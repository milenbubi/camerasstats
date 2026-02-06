import { Tooltip } from "recharts";
import { useChartPalette } from "../helpers/chartPalette";



function C180ChartTooltip() {
  const { gridColor, toolTipBgcolor, toolTipcolor } = useChartPalette();


  return (
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
        color: toolTipcolor
      }}
    />
  );
}



export default C180ChartTooltip;