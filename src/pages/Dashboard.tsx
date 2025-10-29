import { Button, Sheet } from "@mui/joy";
import { Centered } from "@ffilip/mui-react-utils/components";
import { Stack, Typography, Button as MUIButton, Paper } from "@mui/material";
import { useContextTheme } from "../Contexts/theme";



function Dashboard() {
  const { themeMode, toggleThemeMode } = useContextTheme();


  return (
    <Stack sx={{ gap: 4, alignItems: "center" }}>

      <Typography variant="h1" align="center">
        {"Cameras Stats"}
      </Typography>
      <Typography variant="h3" align="center" sx={{ my: 4 }}>
        {`Текуща тема: ${themeMode}`}
      </Typography>

      <Paper sx={{ p: 7 }}>
        <Sheet variant="outlined" sx={{ p: 4 }}>
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