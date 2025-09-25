import { Stack, StackProps } from "@mui/material";


function Centered({ children, ...stackProps }: StackProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      {...stackProps}
    >
      {children}
    </Stack>
  );
}


export default Centered;