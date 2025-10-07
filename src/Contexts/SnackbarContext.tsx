import { Alert, ColorPaletteProp, VariantProp } from "@mui/joy";
import { Snackbar, SlideProps, IconButton, Slide } from "@mui/material";
import { createContext, useContext, useState, useCallback, PropsWithChildren } from "react";
import Iconify from "../Components/Iconify";

interface SnackbarContextType {
  showSnack: (message: string, alertSeverity?: ColorPaletteProp, alertStyle?: VariantProp) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({} as SnackbarContextType);

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}



function SnackbarProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const handleClose = useCallback(() => setOpen(false), []);
  const [variant, setVariant] = useState<VariantProp>("solid");
  const [severity, setSeverity] = useState<ColorPaletteProp>("danger");


  const showSnack = useCallback((msg: string, alertSeverity: ColorPaletteProp = "neutral", alertStyle: VariantProp = "solid") => {
    setOpen(true);
    setMessage(msg);
    setVariant(alertStyle);
    setSeverity(alertSeverity);
  }, []);


  return (
    <SnackbarContext.Provider value={{ showSnack }}>

      {children}

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        slots={{ transition: SlideTransition }}
      >

        <Alert
          color={severity}  // "success" | "danger" | "warning" | "neutral" | "primary"
          variant={variant}  // "soft" | "solid" | "outlined" | "plain"
          sx={{ minWidth: 200, py: 0.5, pr: 0, fontWeight: 600 }}
          children={message}
          endDecorator={
            <IconButton
              onClick={handleClose}
              size="small"
              children={<Iconify icon="vaadin:close-small" width={17} sx={{ color: "#ffffff" }} />}
            />
          }
        />
      </Snackbar>

    </SnackbarContext.Provider>
  );
}



function useContextSnack() {
  return useContext(SnackbarContext);
}


export default SnackbarProvider;
export { useContextSnack };