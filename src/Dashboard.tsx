import { Button, Sheet } from "@mui/joy";
import { Stack, Typography, Button as MUIButton, Paper } from "@mui/material";
import Centered from "./Components/Centered";
import { useContextTheme } from "./Theme/ThemeContext";



function Dashboard() {
  const { themeMode, toggleThemeMode } = useContextTheme();


  return (
    <Stack sx={{ gap: 4, py: 2, alignItems: "center", px: { xs: 1, sm: 2 } }}>

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

          <Centered gap={3}>
            <Button variant="solid" onClick={toggleThemeMode}>
              {"Смени тема"}
            </Button>

            <MUIButton variant="contained" onClick={toggleThemeMode}>
              {"Смени тема"}
            </MUIButton>
          </Centered>

          <Centered gap={3}>
            <Button variant="solid" onClick={toggleThemeMode}>
              {"Смени тема"}
            </Button>

            <MUIButton variant="contained" onClick={toggleThemeMode}>
              {"Смени тема"}
            </MUIButton>
          </Centered>

          <Centered gap={3}>
            <Button variant="solid" onClick={toggleThemeMode}>
              {"Смени тема"}
            </Button>

            <MUIButton variant="contained" onClick={toggleThemeMode}>
              {"Смени тема"}
            </MUIButton>
          </Centered>

          <Centered gap={3}>
            <Button variant="solid" onClick={toggleThemeMode}>
              {"Смени тема"}
            </Button>

            <MUIButton variant="contained" onClick={toggleThemeMode}>
              {"Смени тема"}
            </MUIButton>
          </Centered>

          <Centered gap={3}>
            <Button variant="solid" onClick={toggleThemeMode}>
              {"Смени тема"}
            </Button>

            <MUIButton variant="contained" onClick={toggleThemeMode}>
              {"Смени тема"}
            </MUIButton>
          </Centered>

          <Centered gap={3}>
            <Button variant="solid" onClick={toggleThemeMode}>
              {"Смени тема"}
            </Button>

            <MUIButton variant="contained" onClick={toggleThemeMode}>
              {"Смени тема"}
            </MUIButton>
          </Centered>

          <Centered gap={3}>
            <Button variant="solid" onClick={toggleThemeMode}>
              {"Смени тема"}
            </Button>

            <MUIButton variant="contained" onClick={toggleThemeMode}>
              {"Смени тема"}
            </MUIButton>
          </Centered>

          <Centered gap={3}>
            <Button variant="solid" onClick={toggleThemeMode}>
              {"Смени тема"}
            </Button>

            <MUIButton variant="contained" onClick={toggleThemeMode}>
              {"Смени тема"}
            </MUIButton>
          </Centered>

          <Centered gap={3}>
            <Button variant="solid" onClick={toggleThemeMode}>
              {"Смени тема"}
            </Button>

            <MUIButton variant="contained" onClick={toggleThemeMode}>
              {"Смени тема"}
            </MUIButton>
          </Centered>

          <Centered gap={3}>
            <Button variant="solid" onClick={toggleThemeMode}>
              {"Смени тема"}
            </Button>

            <MUIButton variant="contained" onClick={toggleThemeMode}>
              {"Смени тема"}
            </MUIButton>
          </Centered>

          <Centered gap={3}>
            <Button variant="solid" onClick={toggleThemeMode}>
              {"Смени тема"}
            </Button>

            <MUIButton variant="contained" onClick={toggleThemeMode}>
              {"Смени тема"}
            </MUIButton>
          </Centered>
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

    </Stack>

  );
}



export default Dashboard;