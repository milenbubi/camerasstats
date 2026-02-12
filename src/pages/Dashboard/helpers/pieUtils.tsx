import { useEffect, useMemo, useState } from "react";
import { getRandomPastelColors } from "@ffilip/chan180-utils/colors";
import { IEntityVisit } from "../../../Utils/models";

const NAME_MAX_LENGTH = 14;
const DEFAULT_PIE_INDEX = 0;
const MAX_PIE_ITEMS_COUNT = 12;


export function truncatePieText(text = "", isMoreTruncated?: boolean) {
  const maxLength = isMoreTruncated
    ? NAME_MAX_LENGTH - 2
    : NAME_MAX_LENGTH;

  return text.length > maxLength
    ? text.slice(0, maxLength) + "…"
    : text;
}



export function usePieData(data: IEntityVisit[]) {
  const exceedsPieItemLimit = data.length > MAX_PIE_ITEMS_COUNT;

  const [activeIndex, setActiveIndex] = useState(DEFAULT_PIE_INDEX);
  const randomColors = useMemo(() => getRandomPastelColors(exceedsPieItemLimit ? MAX_PIE_ITEMS_COUNT : data.length), [data]);


  const pieData = useMemo(() => {
    const croppedData = exceedsPieItemLimit
      ? data.slice(0, MAX_PIE_ITEMS_COUNT)
      : data;

    return croppedData.map((cd, i) => ({
      ...cd,
      fill: randomColors[i % randomColors.length]
    }));
  }, [data]);

  useEffect(() => {
    setActiveIndex(DEFAULT_PIE_INDEX);
  }, [data]);


  return {
    pieData,
    activeIndex,
    setActiveIndex
  };
}