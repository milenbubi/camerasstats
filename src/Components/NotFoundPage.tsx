import { Sheet, Stack, Typography, Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { routes } from "../Network/routes";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Sheet
      variant="outlined"
      sx={{
        height: 1,
        width:1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: { xs: 2, sm: 4 }, // padding за мобилни и десктоп
        backgroundColor: "background.body",
      }}
    >
      <Stack
        spacing={3}
        sx={{
          textAlign: "center",
          maxWidth: 400,
          width: "100%",
        }}
      >
        {/* <Typography level="h4" sx={{ fontWeight: "bold", color: "danger.500" }}>
          404
        </Typography> */}
        <Typography level="h2" sx={{ fontWeight: 600 }}>
          Страницата не е намерена
        </Typography>
        <Typography level="body-sm" sx={{ color: "text.secondary" }}>
          Може би линкът е стар или страницата е преместена. Върни се на главната страница.
        </Typography>
        <Button
          variant="solid"
          color="primary"
          onClick={() => navigate(routes.home.path)}
          sx={{ alignSelf: "center", px: 4 }}
        >
          Начална страница
        </Button>
      </Stack>
    </Sheet>
  );
}

export default NotFoundPage;
