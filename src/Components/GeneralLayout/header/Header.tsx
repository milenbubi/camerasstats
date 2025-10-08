import { Sheet, GlobalStyles } from "@mui/joy";
import HamburgerMenu from "./HamburgerMenu";
import HomePageButton from "./HomePageButton";
import { layoutConfig } from "../configLayout";



function Header() {
  return (
    <Sheet
      sx={{
        display: { xs: "flex", md: "none" },
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        width: "100vw",
        height: "var(--Header-height)",
        zIndex: 9995,
        p: 2,
        gap: 1,
        borderBottom: "2px solid",
        borderColor: "background.level1",
        boxShadow: t => t.shadow.xl,
        background: t => t.palette.mode === "dark" ? "#0e1012" : "#fbfcfe"
      }}
    >
      <GlobalStyles
        styles={theme => ({
          ":root": {
            "--Header-height": "0px",
            [theme.breakpoints.down("md")]: {
              "--Header-height": layoutConfig.HeaderHeight,
            }
          }
        })}
      />

      <HamburgerMenu />
      <HomePageButton />

    </Sheet>
  );
}



export default Header;