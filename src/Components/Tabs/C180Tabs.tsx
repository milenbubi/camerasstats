import { blueGrey } from "@mui/material/colors";
import { SyntheticEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { hexToRgba } from "@ffilip/chan180-utils/helpers";
import { Centered } from "@ffilip/mui-react-utils/components";
import { SxProps, Tab, tabClasses, Tabs, Theme } from "@mui/material";
import { ITabPanelItem, indexToTabParam, tabParamToIndex } from "./utils";

interface IProps {
  tabIndex: number;
  items: ITabPanelItem[];
  searchParamName?: string;
  sx?: SxProps<Theme>;
  onTabChange: (index: number, value?: string) => void;
}



function C180Tabs({ tabIndex, items, searchParamName, sx, onTabChange }: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    if (searchParamName) {
      const param = searchParams.get(searchParamName);
      const newTabIndex = tabParamToIndex(param, items);
      onTabChange(newTabIndex);

      // Set to first tab, if "searchParamName" is invalid
      if (searchParamName && param && items.every(i => i.paramName !== param)) {
        setSearchParams(
          p => {
            p.set(searchParamName, indexToTabParam(newTabIndex, items));
            return p;
          },
          { replace: true }
        );
      }
    }
  }, [searchParams]);


  const handleChange = (event: SyntheticEvent, newTabIndex: number) => {
    if (searchParamName) {
      setSearchParams(p => {
        p.set(searchParamName, indexToTabParam(newTabIndex, items));
        return p;
      });
    }
    else {
      onTabChange(newTabIndex);
    }
  };


  if (tabIndex < 0) {  // Render nothing while search params set the correct tabIndex
    return null;
  }


  return (
    <Centered sx={{ ...sx }}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        variant="scrollable"
        allowScrollButtonsMobile={false}
        sx={{
          minHeight: 0,
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          "& .MuiTabs-indicator": {
            height: 2,
            borderRadius: "2px"
          },
          "& .MuiTab-root": {
            py: "9px",
            px: { xs: "9px", md: "14px" },
            fontSize: { xs: 14, md: 16 },
            minHeight: 0,
            fontWeight: 600,
            textTransform: "none",
            [`&:not(.${tabClasses.selected})`]: {
              color: t => t.palette.text.disabled,
            },
            [`&.${tabClasses.selected}`]: {
              pointerEvents: "none",
              background: hexToRgba(blueGrey[100], 0.07)
            },
            "&:hover": {
              background: hexToRgba(blueGrey[500], 0.2)
            },
            "&:not(:last-of-type)": {
              mr: { sm: 1 }
            }
          }
        }}
      >
        {items.map((item, index) => <Tab key={index} label={item.title} />)}
      </Tabs>
    </Centered>
  );
}



export default C180Tabs;