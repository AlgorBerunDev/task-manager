export enum TimePeriod {
  Year = "year",
  Month = "month",
  Week = "week",
  Day = "day",
  Hour = "hour",
  Minute = "minute",
}
export type TimePeriodKey = keyof typeof TimePeriod;
export type TimePeriodValue = (typeof TimePeriod)[TimePeriodKey];

export enum TimePeriodFormat {
  Year = "%Y",
  Month = "%Y-%m",
  Week = "%Y-%m %V Week",
  Day = "%Y-%m-%d",
  Hour = "%Y-%m-%d %H:00",
  Minute = "%Y-%m-%d %H:%M",
}

export function getKeyTimePeriodKeyByValue(timePeriodValue: string): string {
  const [key]: any = Object.entries(TimePeriod).find(([_key, value]) => value === timePeriodValue);

  return key;
}

export function getFormatDateByTimePeriod(timePeriod: TimePeriodValue): string {
  const timePeriodKey = getKeyTimePeriodKeyByValue(timePeriod);

  return (TimePeriodFormat as any)[timePeriodKey];
}
