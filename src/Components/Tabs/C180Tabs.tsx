import { SyntheticEvent, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useIsThemeDark } from "@ffilip/mui-react-utils/mui";
import { Centered } from "@ffilip/mui-react-utils/components";
import { darken, lighten, SxProps, Tab, Tabs, Theme } from "@mui/material";
import { ITabPanelItem, indexToTabParam, tabParamToIndex } from "./utils";

interface IProps {
  tabIndex: number;
  items: ITabPanelItem[];
  searchParamName?: string;
  sx?: SxProps<Theme>;
  onTabChange: (index: number, value?: string) => void;
}



function C180Tabs({ tabIndex, items, searchParamName, sx, onTabChange }: IProps) {
  const { isThemeDark } = useIsThemeDark();
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
            py: "10px",
            minHeight: 0,
            borderRadius: 0,
            fontWeight: 600,
            textTransform: "none"
          }
        }}
      >
        {items.map((item, index) => (
          <Tab
            key={index}
            label={item.title}
            sx={{
              px: "14px",
              fontSize: 16,
              borderRadius: "8px",
              "&:hover": {
                background: t => (isThemeDark ? darken : lighten)(t.palette.background.neutral, 0.6)
              }
            }}
          />
        ))}
      </Tabs>
    </Centered>
  );
}



export default C180Tabs;