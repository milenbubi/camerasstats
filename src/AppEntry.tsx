import { Button, Sheet } from "@mui/joy";
import { useAdminScrollbar } from "./Utils/theme";
import { Stack, Typography, Button as MUIButton, Paper } from "@mui/material";
import Centered from "./Components/Centered";
import { useContextTheme } from "./Theme/ThemeContext";
import { BrowserRouter } from "react-router-dom";



function AppEntry() {
  const adminscrollbar = useAdminScrollbar();
  const { themeMode, toggleThemeMode } = useContextTheme();


  return (
    <BrowserRouter>
    {/* <Stack
      className={adminscrollbar}
      sx={{ gap: 4, height: 1, py: 2, alignItems: "center", overflowY: "auto", position: "relative", px: { xs: 1, sm: 2 } }}
    >

      <Typography variant="h1" align="center">
        {"Cameras Stats"}
      </Typography>
      <Typography variant="h3" align="center" sx={{ my: 4 }}>
        {`Текуща тема: ${themeMode}`}
      </Typography>

      <Paper variant="outlined" sx={{ p: 7 }}>
        <Sheet variant="outlined" sx={{ p: 4, }}>
          <Centered gap={3}>
            <Button variant="solid" onClick={toggleThemeMode}>
              {"Смени тема"}
            </Button>

            <MUIButton variant="contained" onClick={toggleThemeMode}>
              {"Смени тема"}
            </MUIButton>
          </Centered>
        </Sheet>
      </Paper>

      </Stack> */}
      
      </BrowserRouter>
  );
}



export default AppEntry;