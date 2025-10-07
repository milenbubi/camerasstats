import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Iconify from "../Components/Iconify";
import { useContextTheme } from "../Contexts/ThemeProvider";



function ChangeThemeButton(props: IconButtonProps) {
  const { onClick, sx, ...other } = props;
  const { isThemeDark, toggleThemeMode } = useContextTheme();


  return (
    <IconButton
      data-screenshot="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      {...other}
      onClick={toggleThemeMode}
      sx={[
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
    >
      <Iconify icon={isThemeDark ? "material-symbols:light-mode" : "material-symbols:dark-mode"} />
    </IconButton>
  );
}



export default ChangeThemeButton;