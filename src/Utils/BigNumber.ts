import Big, { BigSource } from "big.js";

type NumFormatOptions = {
  keepFractions?: boolean;
  fractionDigits?: number;
  hideFractIfInteger?: boolean;
};

Big.NE = -1000;
Big.PE = 1000;



function BN(value?: BigSource | null) {
  if (value === null || value === undefined) {
    return null;
  }

  try {
    return Big(value);
  }
  catch {
    return null;
  }
}



function FormatWithThousandSeparator(value?: BigSource | null, options?: NumFormatOptions) {
  // 3753483
  const num = BN(value);

  if (!num) {
    return "N/A";
  }

  let stringifiedValue: string;

  if (options?.keepFractions) {
    stringifiedValue = num.toString();
  }
  else if (options?.hideFractIfInteger) {
    const [int, fract] = num.toString().split(".");
    stringifiedValue = fract ? num.toString() : int;
  }
  else if (typeof options?.fractionDigits === "number") {
    stringifiedValue = num.toFixed(options.fractionDigits);
  }
  else {
    stringifiedValue = num.toFixed(2);
  }

  const decimalPointIndex = stringifiedValue.indexOf(".");

  return stringifiedValue.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (m, i) =>
    decimalPointIndex < 0 || i < decimalPointIndex ? `${m},` : m,
  );
}



function GetNumberFromThousandSeparatorFormattedString(value: string) {
  const valueWithNoSeparators = value.replace(/,/g, "");
  const num = BN(valueWithNoSeparators);
  return num ? num.toNumber() : null;
}



export {
  BN,
  FormatWithThousandSeparator,
  Big as BnTrusted,
  NumFormatOptions,
  GetNumberFromThousandSeparatorFormattedString
};