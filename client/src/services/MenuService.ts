import { API } from '../libs/api';
import { MealType, MenuDay } from '../models';

const fetchData = async (startDay: string): Promise<MenuDay[]> => {
    let result = await API.fetchMenuAsync(startDay);

    if (!result.some((x) => x.day === startDay) || result.every((x) => x.dinner.description === '' && x.lunch.description === '')) {
        result = createEmptyData(startDay);
    }
    return result;
};

const createEmptyData = (selectedMonday: string): MenuDay[] => {
    const monday = new Date(selectedMonday);
    const emptyWeek: MenuDay[] = [];

    for (let i = 0; i < 7; i++) {
        const currentDay = new Date(monday);
        currentDay.setDate(monday.getDate() + i);

        const formattedDate = currentDay.toLocaleDateString('en-CA'); // Format: YYYY-MM-DD

        emptyWeek.push({
            isNew: true,
            day: formattedDate,
            lunch: { description: 'Ще не заповнено', type: MealType.Lunch, products: [] },
            dinner: { description: 'Ще не заповнено', type: MealType.Dinner, products: [] },
        });
    }

    return emptyWeek;
};

const updateMenuDay = async (menuDay: MenuDay): Promise<any[]> => {
    return API.updateDayMenuAsync(menuDay);
};

const copyMenu = async (
    copyToWeekFromDate: string,
    weekMap: Record<string, string[]>,
    dayMap: Record<string, MenuDay>,
): Promise<MenuDay[]> => {
    const targetMonday = new Date(copyToWeekFromDate);

    // Determine the Monday of the previous week
    const previousMonday = new Date(copyToWeekFromDate);
    previousMonday.setDate(targetMonday.getDate() - 7);
    const previousMondayKey = previousMonday.toLocaleDateString('en-CA');

    // Check if previous week exists in the store
    const previousWeekDays = weekMap[previousMondayKey];
    if (!previousWeekDays || previousWeekDays.length === 0) {
        throw new Error('No previous week menu data found in the store.');
    }

    // Generate the new week's menu by copying the previous week's data
    const newWeek = previousWeekDays.map((day, index) => {
        const newDay = new Date(targetMonday);
        newDay.setDate(targetMonday.getDate() + index); // Adjust to the target week's day

        const sourceDayMenu = dayMap[day];
        if (!sourceDayMenu) {
            throw new Error(`No data found for day ${day} in dayMap.`);
        }

        return {
            ...sourceDayMenu,
            day: newDay.toLocaleDateString('en-CA'), // Update to the target week's date
        };
    });

    await API.addWeekMenuAsync(newWeek);

    return newWeek;
};

export const MenuService = {
    fetchData,
    copyMenu,
    updateMenuDay
};
