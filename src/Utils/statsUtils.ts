export type Place = "News" | "Bulgaria" | "Horgos" | "Djala" | "Kelebia" | "Turkiye";


export const ALL_DEVICE_NAME = "ALL";

export const ALL_DEVICES = [
  { name: ALL_DEVICE_NAME, icon: "fluent:select-all-on-24-regular" },
  { name: "Mobile", icon: "fa:mobile" },
  { name: "Desktop", icon: "streamline-plump:web-remix" },
  { name: "Bot", icon: "icon-park-outline:google-ads" },
  { name: "API Client", icon: "ic:baseline-api" },
  { name: "TV", icon: "ic:baseline-live-tv" }
] as const;


export type DeviceName = typeof ALL_DEVICES[number]["name"];


export const DEVICE_NAMES: DeviceName[] = ALL_DEVICES.map(d => d.name);
export const DEVICE_NAMES_EXCEPT_ALL = DEVICE_NAMES.filter(n => n !== ALL_DEVICE_NAME);


export function isDeviceName(name: any): name is DeviceName {
  return DEVICE_NAMES.includes(name);
}