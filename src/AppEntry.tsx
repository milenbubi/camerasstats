import { Box, Button, Stack, Typography } from "@mui/material";
import { useAdminScrollbar } from "./Utils/theme";
import { useContextTheme } from "./Theme/ThemeContext";



function AppEntry() {
  const adminscrollbar = useAdminScrollbar();
  const { themeMode, toggleThemeMode } = useContextTheme();


  return (
    <Stack
      className={adminscrollbar}
      sx={{ gap: 4, height: 1, py: 2, alignItems: "center", overflowY: "auto", position: "relative", px: { xs: 1, sm: 2 } }}
    >
      <Typography variant="h1" align="center">
        {"Cameras Stats"}
        <Box>
          <Typography variant="h3" align="center" sx={{ mt: 4 }}>Текуща тема: {themeMode}</Typography>
          <Button variant="contained" onClick={toggleThemeMode}>
            {"Смени тема"}
          </Button>
        </Box>
      </Typography>
    </Stack>
  );
}



export default AppEntry;