import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Iconify from "../Components/Iconify";
import { useContextTheme } from "../Contexts/theme";



function ChangeThemeButton({ onClick, sx, ...other }: IconButtonProps) {
  const { isThemeDark, toggleThemeMode } = useContextTheme();


  return (
    <IconButton
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