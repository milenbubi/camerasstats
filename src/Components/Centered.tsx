import { forwardRef, Ref } from "react";
import { Stack, StackProps } from "@mui/material";


function Centered({ children, ...stackProps }: StackProps, ref: Ref<HTMLDivElement>) {
  return (
    <Stack
      ref={ref}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      {...stackProps}
    >
      {children}
    </Stack>
  );
}


export default forwardRef<HTMLDivElement, StackProps>(Centered);