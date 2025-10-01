import { PaletteMode } from "@mui/material/styles";
import { useEffect, PropsWithChildren } from "react";
import { CssVarsProvider as JoyCssVarsProvider, useColorScheme as useJoyColorScheme } from "@mui/joy/styles";
import { joyTheme } from "./joyTheme";

interface IProps {
  themeMode: PaletteMode;
}



function JoyThemeProvider({ themeMode, children }: PropsWithChildren<IProps>) {
  return (
    <JoyCssVarsProvider theme={joyTheme}>
      {children}
      <JoyColorSchemeConfigurator themeMode={themeMode} />
    </JoyCssVarsProvider>
  );
}



function JoyColorSchemeConfigurator({ themeMode }: IProps) {
  const { setMode: setJoyMode } = useJoyColorScheme();

  useEffect(() => {
    setJoyMode(themeMode);
  }, [themeMode]);

  return null;
}



export default JoyThemeProvider;