import { useMemo } from "react";
import type { SelectProps, } from "@mui/material/Select";
import { useChan180Colors } from "@ffilip/mui-react-utils";
import { DateTimePickerSlotProps } from "@mui/x-date-pickers";



export function useDTSlotProps() {
  const { bgrC } = useChan180Colors();


  const slotProps = useMemo(() => {
    const dtSelectSlotProps: SelectProps["slotProps"] = {
      root: {
        sx: {
          mr: 3,
          width: 160,
          maxWidth: 160,
          height: 40,
          background: bgrC
        }
      }
    };

    const dtPickerSlotProps: DateTimePickerSlotProps<false> = {
      textField:
      {
        error: false,
        size: "small",
        sx: {
          background: bgrC,
          borderRadius: "6px",
          width: 250,
          "& .MuiPickersSectionList-root": {
            fontSize: 15
          },
          "& .MuiFormLabel-root": {
            fontSize: 15,
            "&.Mui-focused": {
              fontSize: 16
            }
          }
        }
      }
    };

    return { dtSelectSlotProps, dtPickerSlotProps };
  }, [bgrC]);


  return slotProps;
}