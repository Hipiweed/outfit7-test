export const EVENT_TYPE = {
    CROSSPROMO: "CROSSPROMO",
    LIVEOPS: "LIVEOPS",
    APP: "APP",
    ADS: "ADS"
} as const

type ObjectValues<T> = T[keyof T];

 export type EventType = ObjectValues<typeof EVENT_TYPE>

 export type CreateEvent = {
    name: string
    description: string;
    type: EventType;
    priority: number;
 }
