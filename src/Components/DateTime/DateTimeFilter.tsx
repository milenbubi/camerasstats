import "dayjs/locale/bg";
import dayjs, { Dayjs } from "dayjs";
import { useMergedState } from "@ffilip/mui-react-utils/react";
import { MenuItem, Select, Grid, Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { forwardRef, Ref, useEffect, useImperativeHandle } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { dtPickerSlotProps, dtSelecSx } from "./slotProps";
import { PeriodLengthInDays, usePeriodOptions } from "./dtPeriods";
import { IPeriodBoundaries, calculatePeriodBoundaries } from "./dtPeriodParser";

interface IProps {
  initialFilterPeriod: PeriodLengthInDays;
  excludePeriods?: PeriodLengthInDays[];
  onPeriodChanged(period: IPeriodBoundaries): void;
  onFilterClicked(period: IPeriodBoundaries): void;
  startDateLabel?: string;
  endDateLabel?: string;
  hideFilterButton?: boolean;
  last3MonthsInPicker?: boolean;
}

interface IState {
  dropdownValue: PeriodLengthInDays;
  startDate: Date | null;
  endDate: Date | null;
  filterButtonDisabled: boolean;
  periodStart: number;
  periodEnd: number;
}

export interface DTFilterRefresh {
  refresh(): void;
}



function DateTimeFilter(props: IProps, ref: Ref<DTFilterRefresh>) {
  useImperativeHandle(ref, () => ({ refresh: onFilter }));
  const periodOptions = usePeriodOptions(props.excludePeriods);


  const [state, setState] = useMergedState<IState>(() => {
    const { start, end } = calculatePeriodBoundaries(props.initialFilterPeriod);

    return {
      dropdownValue: props.initialFilterPeriod,
      startDate: null,
      endDate: null,
      filterButtonDisabled: false,
      periodStart: start,
      periodEnd: end
    };
  });


  useEffect(() => {  // On mount: send the initial start/end period values to the parent
    props.onPeriodChanged({ start: state.periodStart, end: state.periodEnd });
  }, []);


  const onPeriodStartChanged = (dayjsDate: Dayjs | null) => {
    const date = dayjsDate?.toDate() || null;

    const periodStart = date?.getTime() || 0;

    const periodEnd =
      state.startDate === null && date !== null && state.endDate === null
        ? new Date().getTime()
        : state.periodEnd;

    let lowerBoundaryDate = date;

    if (date && state.endDate && date.getTime() > state.endDate.getTime()) {
      // if Start is Before End
      lowerBoundaryDate = state.endDate;
    }

    setState(
      ({ endDate }) => ({
        startDate: lowerBoundaryDate,
        periodStart,
        periodEnd,
        dropdownValue: PeriodLengthInDays.Custom,
        filterButtonDisabled: date === null && endDate === null
      }),
      () => { props.onPeriodChanged({ start: periodStart, end: periodEnd }); }
    );
  };


  const onPeriodEndChanged = (dayjsDate: Dayjs | null) => {
    const date = dayjsDate?.toDate() || null;
    const periodEnd = date?.getTime() || 0;

    const periodStart = state.endDate === null && date !== null && state.startDate === null ? 0 : state.periodStart;

    let upperBoundaryDate = date;

    if (date && state.startDate && date.getTime() < state.startDate.getTime()) {
      // if End is before Start
      upperBoundaryDate = state.startDate;
    }

    setState(
      ({ startDate }) => ({
        endDate: upperBoundaryDate,
        periodStart,
        periodEnd,
        dropdownValue: PeriodLengthInDays.Custom,
        filterButtonDisabled: date === null && startDate === null
      }),
      () => { props.onPeriodChanged({ start: periodStart, end: periodEnd }); }
    );
  };


  const onPeriodPickerChange = (selectedPeriod: PeriodLengthInDays | null) => {
    if (selectedPeriod !== null && selectedPeriod !== state.dropdownValue) {
      const { start, end }: IPeriodBoundaries = calculatePeriodBoundaries(selectedPeriod);
      const buttonDisabled: boolean = selectedPeriod === PeriodLengthInDays.Custom;

      setState(
        {
          dropdownValue: selectedPeriod,
          startDate: null,
          endDate: null,
          periodStart: start,
          periodEnd: end,
          filterButtonDisabled: buttonDisabled
        },
        // Load new data, if Picker period is  not "Custom"
        () => { selectedPeriod !== PeriodLengthInDays.Custom && props.onFilterClicked({ start, end }); }
      );
    }
  };


  const onFilter = () => {
    const period = state.dropdownValue;

    if (period !== PeriodLengthInDays.Custom) {  // Refresh datetimes, if Picker period is not "Custom"
      const { start, end }: IPeriodBoundaries = calculatePeriodBoundaries(period);

      setState(
        { periodStart: start, periodEnd: end },
        () => { props.onFilterClicked({ start, end }); }
      );
    }
    else if (state.endDate === null) {  // Refresh current time, if Picker period is "Custom" and end time is Now
      setState(
        { periodEnd: new Date().getTime() },
        () => { props.onFilterClicked({ start: state.periodStart, end: state.periodEnd }); }
      );
    }
    else {
      props.onFilterClicked({ start: state.periodStart, end: state.periodEnd });
    }
  };


  const now = dayjs();
  const allTime = dayjs(0);
  const ago3Months = dayjs().subtract(90, "days");


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en" >
      <Grid container justifyContent="center" spacing={2}>
        <Grid>
          <DateTimePicker
            // format="DD MM YYYY  -  HH : mm"
            ampm={false}
            defaultValue={null}
            value={dayjs(state.startDate)}
            onChange={onPeriodStartChanged}
            minDateTime={props.last3MonthsInPicker ? ago3Months : allTime}
            maxDateTime={dayjs(state.endDate || now)}
            label="From"
            slotProps={dtPickerSlotProps}
          />
        </Grid>

        <Grid>
          <DateTimePicker
            // format="DD MM YYYY  -  HH : mm"
            ampm={false}
            defaultValue={null}
            value={dayjs(state.endDate)}
            onChange={onPeriodEndChanged}
            minDateTime={dayjs(state.startDate || (props.last3MonthsInPicker ? ago3Months : allTime))}
            disableFuture
            label="To"
            slotProps={dtPickerSlotProps}
          />
        </Grid>

        <Grid sx={{ display: "flex", alignItems: "center" }}>
          <Select
            size="small"
            value={state.dropdownValue}
            sx={dtSelecSx}
            onChange={e => onPeriodPickerChange(e.target.value)}
          >
            {periodOptions.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.text}
              </MenuItem>
            ))}
          </Select>

          <Button
            sx={{
              display: props.hideFilterButton ? "none" : "initial",
              background: "#256cc6", color: "#ffffff",
              textTransform: "initial", fontSize: 14, fontWeight: 600,
              letterSpacing: "0.5px"
            }}
            size="small"
            variant="contained"
            disabled={state.filterButtonDisabled}
            children={"Filter"}
            onClick={onFilter}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}



export default forwardRef<DTFilterRefresh, IProps>(DateTimeFilter);