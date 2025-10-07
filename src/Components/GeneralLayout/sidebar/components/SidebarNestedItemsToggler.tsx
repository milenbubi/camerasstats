import Box from "@mui/joy/Box";
import { Dispatch, Fragment, PropsWithChildren, ReactNode, SetStateAction, useState } from "react";

interface IProps {
  defaultExpanded?: boolean;
  renderToggle: (params: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }) => ReactNode;
}



function SidebarNestedItemsToggler({ defaultExpanded = false, renderToggle, children }: PropsWithChildren<IProps>) {
  const [open, setOpen] = useState(defaultExpanded);


  return (
    <Fragment>
      {renderToggle({ open, setOpen })}

      <Box
        sx={[
          {
            display: "grid",
            transition: "0.3s ease",
            "& > *": {
              overflow: "hidden"
            }
          },
          open ? { gridTemplateRows: "1fr" } : { gridTemplateRows: "0fr" }
        ]}
      >
        {children}
      </Box>

    </Fragment>
  );
}



export default SidebarNestedItemsToggler;