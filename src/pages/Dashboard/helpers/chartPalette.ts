import { useMemo } from "react";
import { useTheme } from "@mui/joy/styles";
import { colors } from "@mui/material";



export function useChartPalette() {
  const theme = useTheme();


  const chartPalette = useMemo(() => {
    const isDark = theme.palette.mode === "dark";

    return {
      barColor: isDark ? "#a7e9af" : "#d8345f",
      gridColor: theme.palette.divider,
      axisTextColor: theme.palette.text.secondary,
      bgColor: theme.palette.background.surface,
      toolTipBgcolor: theme.palette.background.popup,
      toolTipcolor: isDark ? colors.yellow[600] : colors.blue[900],
      secondaryColor: theme.palette.primary[300],
      areaColor: "#feda2d",
    };
  }, [theme]);


  return chartPalette;
}