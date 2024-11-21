import { format, toZonedTime } from 'date-fns-tz';

export const getCurrentDayInKyiv = (): string => {
    const kyivTimeZone = 'Europe/Kyiv';
    const nowInKyiv = toZonedTime(new Date(), kyivTimeZone);
    return format(nowInKyiv, 'EEEE');
};

export function getMondayOfWeek(date: Date): string {
    const day = date.getDay();
    const difference = day === 0 ? -6 : 1 - day; // Adjust when day is Sunday
    const monday = new Date(date);
    monday.setDate(date.getDate() + difference);
    return monday.toLocaleDateString('en-CA');
}
