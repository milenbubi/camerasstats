import { DateTimePickerSlotProps } from "@mui/x-date-pickers";


export const dtSlotProps: DateTimePickerSlotProps<false> = {
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
}