import { useMemo } from "react";
import { useTheme } from "@mui/joy/styles";



export function useChartPalette() {
  const theme = useTheme();


  const chartPalette = useMemo(() => {
    return {
      barColor: theme.palette.primary[500],
      gridColor: theme.palette.divider,
      axisTextColor: theme.palette.text.secondary,
      bgColor: theme.palette.background.surface,
      toolTipBgcolor: theme.palette.background.popup,
      secondaryColor: theme.palette.primary[300]
    };
  }, [theme]);


  return chartPalette;
}