import { format } from 'date-fns/format';
import { MealType, MenuOwner, Owner } from '../models';

export function convertDayOfWeekToDisplayValue(day: string): string {
    const dayOfWeek = format(new  Date(day), 'EEEE');
    switch (dayOfWeek) {
        case 'Monday':
            return 'Понеділок';
        case 'Tuesday':
            return 'Вівторок';
        case 'Wednesday':
            return 'Середа';
        case 'Thursday':
            return 'Четвер';
        case 'Friday':
            return "П'ятниця";
        case 'Saturday':
            return 'Субота';
        case 'Sunday':
            return 'Неділя';
        default: {
            throw new Error(`Unsupported day of week: ${dayOfWeek}`);
        }
    }
}

export function convertOwnerToDisplayValue(owner: Owner): string {
    return owner === Owner.Oleksii ? 'Льоша і Ліза' : 'Діма і Аня';
}

function convertMealTypeToDisplayValue(mealType: MealType): string {
    switch (mealType) {
        case MealType.Lunch:
            return 'Обід';
        case MealType.Dinner:
            return 'Вечеря';
        default:
            throw new Error(`Unsupported MealType: ${mealType}`);
    }
}

export function convert<T>(value: T): string {
    if (Object.values(Owner).includes(value as any)) {
        return convertOwnerToDisplayValue(value as Owner); 
    } else if (Object.values(MealType).includes(value as any)) {
        return convertMealTypeToDisplayValue(value as MealType);
    }

    throw new Error(`Unsupported value: ${value}`);
}

function convertToMealOwnerRow(menuOwner: MenuOwner) {
    if (menuOwner === 'Liza') {
        return 'Шеф-кухар: Ліза, Помічник: Льоша';
    } else {
        return 'Шеф-кухар: Аня, Помічник: Діма';
    }
}

function formatDateRange(monday: string): string {
    const mondayDate = new Date(monday);
    const sunday = new Date(monday);
    sunday.setDate(mondayDate.getDate() + 6); // Add 6 days to get Sunday
    return `${format(mondayDate, 'dd.MM.yyyy')} - ${format(sunday, 'dd.MM.yyyy')}`;
}

export const Translations = {
    convert,
    convertToMealOwnerRow,
    formatDateRange
};
