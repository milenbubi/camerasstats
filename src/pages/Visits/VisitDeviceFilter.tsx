import { Box, Chip, Typography } from "@mui/joy";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import Iconify from "../../Components/Iconify";
import { useChan180Colors } from "../../Utils/colorUtils";
import { useDidUpdateEffect } from "../../Utils/reactHooks";
import { ALL_DEVICES, DEVICE_NAMES, isDeviceName, ALL_DEVICE_NAME, DEVICE_NAMES_EXCEPT_ALL, DeviceName } from "../../Utils/statsUtils";

interface IProps {
  /**
 * The initial list of devices to apply as a filter. When omitted, all available devices are used by default.
 */
  initialDevices?: DeviceName[];
  onFilterChanged(devices: DeviceName[]): void;
  setInitialFilters(devices: DeviceName[]): void;
}



function VisitDeviceFilter({ initialDevices, onFilterChanged, setInitialFilters }: IProps) {
  const { isDark } = useChan180Colors();
  const [selected, setSelected] = useState(initialDevices || [...DEVICE_NAMES]);


  useEffect(() => {
    setInitialFilters(selected)
  }, []);


  useDidUpdateEffect(() => {
    onFilterChanged(selected);
  }, [selected]);


  const handleChipClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.dataset.name;

    if (!isDeviceName(name)) {
      return;
    }

    setSelected(prev => {
      // If "All Devices" is clicked
      if (name === ALL_DEVICE_NAME) {
        // If all devices are currently selected, deselect everything
        // Otherwise, select all devices
        return prev.length === DEVICE_NAMES.length ? [] : [...DEVICE_NAMES];
      }


      // If the clicked device is already selected,
      // remove it along with "All Devices" (to keep the state consistent)
      if (prev.includes(name)) {
        return prev.filter(n => n !== ALL_DEVICE_NAME && n !== name);
      }

      // Otherwise, add the clicked device to the selection
      let next = [...prev, name];

      // Check if all devices are now selected
      const allSelected = DEVICE_NAMES_EXCEPT_ALL.every(n => next.includes(n));

      // If all are selected and "All Devices" is not yet included, add it
      if (allSelected && !next.includes(ALL_DEVICE_NAME)) {
        next.push(ALL_DEVICE_NAME);
      }

      return next;
    });
  }, []);


  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: { xs: "center", lg: "flex-start" } }}>

        <Typography level="title-lg" sx={{ mb: 1.5 }}>
          {"Devices"}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2 }}>
          {ALL_DEVICES.map((device, index) => {
            const { icon, name } = device;
            const checked = selected.includes(name);

            return (
              <Chip
                key={index}
                onClick={handleChipClick}
                color={checked ? (isDark ? "warning" : "success") : "neutral"}
                variant={checked ? "solid" : "outlined"}
                slotProps={{ action: { "data-name": name } }}
                sx={{ overflow: "hidden", px: { xs: 1.5, sm: 2.2 }, py: "6px" }}
                startDecorator={<Iconify icon={icon} sx={{ opacity: checked ? 1 : 0.68 }} />}
              >
                <Typography
                  level="title-sm"
                  sx={{ fontWeight: 600, ml: 1, color: "inherit" }}
                  children={name}
                />
              </Chip>
            );
          })}
        </Box>

      </Box>
    </Box>
  );
}



export default VisitDeviceFilter;