export type Place = "News" | "Bulgaria" | "Horgos" | "Djala" | "Kelebia" | "Turkiye";


export const ALL_DEVICE_NAME = "ALL";

interface IDevice {
  name: string;
  icon: string;
}

export const ALL_DEVICES = [
  { name: ALL_DEVICE_NAME, icon: "ix:tasks-all" },
  { name: "Mobile", icon: "fa:mobile" },
  { name: "Desktop", icon: "fontisto:world-o" },
  { name: "Bot", icon: "icon-park-outline:google-ads" },
  { name: "API Client", icon: "ic:baseline-api" },
  { name: "Server", icon: "proicons:server" },
  { name: "TV", icon: "streamline-logos:youtube-tv-logo-solid" },
  { name: "Car Media", icon: "fa-solid:car" },
  { name: "Unknown", icon: "fluent-mdl2:unknown-solid" }
] as const satisfies readonly IDevice[];


export type DeviceName = typeof ALL_DEVICES[number]["name"];


export const DEVICE_NAMES: DeviceName[] = ALL_DEVICES.map(d => d.name);
export const DEVICE_NAMES_EXCEPT_ALL = DEVICE_NAMES.filter(n => n !== ALL_DEVICE_NAME);


export function isDeviceName(name: any): name is DeviceName {
  return DEVICE_NAMES.includes(name);
}