import { blueGrey } from "@mui/material/colors";
import { SyntheticEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { hexToRgba } from "@ffilip/chan180-utils/colors";
import { Centered } from "@ffilip/mui-react-utils/components";
import { SxProps, Tab, tabClasses, Tabs, Theme } from "@mui/material";
import { ITabPanelItem, indexToTabParam, tabParamToIndex } from "./utils";

interface IProps<TValue> {
  tabIndex: number;
  sx?: SxProps<Theme>;
  searchParamName?: string;
  items: ITabPanelItem<TValue>[];
  onTabChange: (index: number, value: TValue) => void;
}


function C180Tabs<TValue>({ tabIndex, sx, items, searchParamName, onTabChange }: IProps<TValue>) {
  const [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    if (searchParamName) {
      const param = searchParams.get(searchParamName);
      const newTabIndex = tabParamToIndex(param, items);

      if (tabIndex === newTabIndex) {
        return;
      }

      onTabChange(newTabIndex, items[newTabIndex].value);

      // Set to first tab, if "searchParamName" is invalid
      if (items.every(i => i.paramName !== param)) {
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
      onTabChange(newTabIndex, items[newTabIndex].value);
    }
  };


  if (tabIndex < 0 || items.length === 0) {  // Render nothing while search params set the correct tabIndex
    return null;
  }


  return (
    <Centered sx={{ ...sx }}>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        variant="scrollable"
        allowScrollButtonsMobile={true}
        sx={{
          minHeight: 0,
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          "& .MuiTabs-indicator": {
            height: 2,
            borderRadius: "2px"
          },
          "& .MuiTabScrollButton-root svg": {
            fontSize: 26
          },
          "& .MuiTab-root": {
            py: "9px",
            px: { xs: "24px", md: "12px" },
            fontSize: { xs: 14, md: 16 },
            minHeight: 0,
            fontWeight: 1000,
            textTransform: "none",
            [`&:not(.${tabClasses.selected})`]: {
              fontWeight: 600,
              opacity: 0.9
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