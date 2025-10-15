import type { SelectProps } from "@mui/joy/Select";
import { DateTimePickerSlotProps } from "@mui/x-date-pickers";
import { PeriodLengthInDays } from "./dtPeriods";

type DateTimeFilterSlotProps = SelectProps<PeriodLengthInDays, false>["slotProps"];


export const dtSelectSlotProps: DateTimeFilterSlotProps = {
  listbox: {
    sx: {
      border: t => `1px solid ${t.palette.neutral[500]}`,
      borderRadius: "8px"
    }
  }
};


export const dtPickerSlotProps: DateTimePickerSlotProps<false> = {
  textField:
  {
    error: false,
    size: "small",
    sx: {
      maxWidth: 250,
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