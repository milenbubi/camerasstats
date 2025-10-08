import { PropsWithChildren } from "react";
import __MUI7ThemeProvider from "./__MUI7ThemeProvider";



function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <__MUI7ThemeProvider>
      {children}
    </__MUI7ThemeProvider>
  );
}



export { ThemeProvider };