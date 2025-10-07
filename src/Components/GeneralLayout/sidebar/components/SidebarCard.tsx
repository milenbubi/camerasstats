import { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Button, Card, LinearProgress, Typography, Stack, List, ListItem, Box } from "@mui/joy";
import Iconify from "../../../Iconify";
import { routes } from "../../../../Network/routes";

const Tasks = {
  completed: 2,
  total: 3
};



function SidebarCard() {
  const [open, setOpen] = useState(true);


  if (!open) {
    return null;
  }


  return (
    <Card
      // invertedColors
      //  color="neutral"
      variant="soft"
      size="sm"
      sx={{
        pt: "4px",
        boxShadow: "none", gap: "3px",
        bgcolor: t => t.palette.mode === "dark" ? "warning.800" : "warning.100",
      }}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography level="title-sm">
          {"Project progress"}
        </Typography>

        <IconButton onClick={() => setOpen(false)}>
          <Iconify icon="material-symbols:close-rounded" />
        </IconButton>
      </Stack>

      <Box>
        <Typography level="body-xs">
          {`Completed ${Tasks.completed} of ${Tasks.total} features:`}
        </Typography>
        <List size="sm" sx={{ "--ListItem-minHeight": "0px", pl: 0, py: 0 }}>
          <ListItem sx={{ pt: "2px" }}>
            <Iconify icon="icon-park-outline:dot" width={16} sx={{ opacity: 0.9 }} />
            <Typography level="body-sm">{"Dashboard"}</Typography>
          </ListItem>
          <ListItem sx={{ py: 0 }}>
            <Iconify icon="icon-park-outline:dot" width={16} sx={{ opacity: 0.9 }} />
            <Typography level="body-sm"> {"Visit Stats"}</Typography>
          </ListItem>
        </List>
      </Box>

      <LinearProgress
        value={(Tasks.completed / Tasks.total) * 100}
        variant="outlined"
        sx={{
          m: "10px 8px",
          borderColor: t => t.palette.mode === "dark" ? "success.600" : "warning.400",
          color: t => t.palette.mode === "dark" ? "success.400" : "success.500"
        }}
        determinate
      />

      <Button
        component={Link}
        to={routes.dashboard.path}
        size="sm"
        variant="solid"
      >
        {"Open charts"}
      </Button>
    </Card>
  );
}



export default SidebarCard;