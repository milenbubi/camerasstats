import { PaletteMode } from "@mui/material/styles";
import { useEffect, PropsWithChildren } from "react";
import { CssVarsProvider as JoyCssVarsProvider, useColorScheme as useJoyColorScheme } from "@mui/joy/styles";
import { joyTheme } from "../../Theme/joyTheme";

interface IProps {
  themeMode: PaletteMode;
}



function JoyColorSchemeConfigurator({ themeMode }: IProps) {
  const { setMode: setJoyMode } = useJoyColorScheme();

  useEffect(() => {
    setJoyMode(themeMode);
  }, [themeMode]);

  return null;
}



function __JoyThemeProvider({ themeMode, children }: PropsWithChildren<IProps>) {
  return (
    <JoyCssVarsProvider theme={joyTheme}>
      {children}
      <JoyColorSchemeConfigurator themeMode={themeMode} />
    </JoyCssVarsProvider>
  );
}



export default __JoyThemeProvider;