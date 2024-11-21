import { MealType, MenuDay, MenuOwner, ShoppingList } from "../models";

// this constant is used to determine if the application should use mock data or not
const USE_MOCK_DATA = true;

export const shouldUseMockData = () => {
    return process.env.NODE_ENV === 'development' && USE_MOCK_DATA
}

const transactionsMock = [
    ["11/2/2024 15:43:01", "Епіцентр", "525.70", "Oleksii", "Outcome", "", "", "525.70", "FALSE", "FALSE", 'test1', 'test2', '', '', '1', 'FALSE'],
    ["11/2/2024 15:15:15", "АВРОРА", "391.00", "Oleksii", "Outcome", "", "", "391.00", "FALSE", "FALSE", 'test1', 'test2', '', '', '1', 'TRUE'],
    ["11/2/2024 15:10:04", "Від: 52396401******17", "20,000.00", "Dmytro", "Income", "", "", "0.00", "TRUE", "FALSE"],
    ["11/2/2024 15:09:18", "АНЦ", "542.56", "Oleksii", "Outcome", "", "", "542.56", "FALSE", "TRUE"],
    ["11/2/2024 15:07:00", "АНЦ", "284.24", "Oleksii", "Outcome", "", "", "284.24", "FALSE", "FALSE"],
    ["11/2/2024 15:06:35", "АНЦ", "534.62", "Dmytro", "Outcome", "", "", "534.62", "FALSE", "FALSE"],
    ["11/2/2024 14:16:15", "АТБ", "1,303.00", "Dmytro", "Outcome", "", "", "1303.00", "FALSE", "FALSE"],
    ["11/2/2024 13:52:16", "TRANSKARPATIAN RITEIL", "91.30", "Oleksii", "Outcome", "", "", "91.30", "FALSE", "FALSE"],
    ["11/1/2024 17:15:28", "ALMA", "904.25", "Dmytro", "Outcome", "", "", "904.25", "FALSE", "FALSE"],
    ["11/1/2024 17:15:13", "ALMA", "1,118.70", "Oleksii", "Outcome", "", "", "1118.70", "FALSE", "FALSE"],
    ["10/31/2024 9:26:29", "OKKO", "1,272.80", "Oleksii", "Outcome", "", "", "1272.80", "FALSE", "FALSE"],
    ["10/31/2024 9:14:07", "Епіцентр", "596.00", "Dmytro", "Outcome", "", "", "596.00", "FALSE", "FALSE"],
    ["10/31/2024 9:13:21", "Епіцентр", "320.01", "Oleksii", "Outcome", "", "", "320.01", "FALSE", "FALSE"],
    ["10/30/2024 18:42:17", "АТБ", "778.23", "Dmytro", "Outcome", "", "", "778.23", "FALSE", "FALSE"],
    ["10/30/2024 16:16:51", "Vodafone +380501597114", "260.00", "Oleksii", "Outcome", "", "", "260.00", "FALSE", "FALSE"],
    ["10/30/2024 16:16:47", "Виведення кешбеку 470.48₴", "378.73", "Oleksii", "Income", "", "", "0.00", "FALSE", "FALSE"],
    ["10/29/2024 17:39:53", "АТБ", "2,055.20", "Oleksii", "Outcome", "", "", "2055.20", "FALSE", "FALSE"],
    ["10/28/2024 17:03:07", "АНЦ", "212.02", "Oleksii", "Outcome", "", "", "212.02", "FALSE", "FALSE"],
    ["10/28/2024 10:43:17", "KlinikaAdamar", "1,100.00", "Oleksii", "Outcome", "", "", "1100.00", "FALSE", "FALSE"],
    ["10/27/2024 18:54:42", "Олександр З.", "935.00", "Oleksii", "Outcome", "", "", "935.00", "FALSE", "FALSE"]
  ];

const menuDataMock: MenuDay[] = [
    {
        day: '2024-11-18',
        lunch: { description: 'Caesar Salad', owner: MenuOwner.Liza, type: MealType.Lunch, products: [] },
        dinner: { description: 'Grilled Chicken', owner: MenuOwner.Anna, type: MealType.Dinner, products: [] },
    },
    {
        day: '2024-11-19',
        lunch: { description: 'Pasta', owner: MenuOwner.Liza, type: MealType.Lunch, products: [] },
        dinner: { description: 'Garlic Bread', owner: MenuOwner.Anna, type: MealType.Dinner, products: [] },
    },
    {
        day: '2024-11-20',
        lunch: { description: 'Steak', owner: MenuOwner.Anna, type: MealType.Lunch, products: [] },
        dinner: { description: 'Mashed Potatoes', owner: MenuOwner.Liza, type: MealType.Dinner, products: [] },
    },
    {
        day: '2024-11-21',
        lunch: { description: 'Pizza', owner: MenuOwner.Liza, type: MealType.Lunch, products: [] },
        dinner: { description: 'Wings', owner: MenuOwner.Anna, type: MealType.Dinner, products: [] },
    },
    {
        day: '2024-11-22',
        lunch: { description: 'Fish Tacos', owner: MenuOwner.Anna, type: MealType.Lunch, products: [] },
        dinner: { description: 'Coleslaw', owner: MenuOwner.Liza, type: MealType.Dinner, products: [] },
    },
    {
        day: '2024-11-23',
        lunch: { description: 'Burgers', owner: MenuOwner.Anna, type: MealType.Lunch, products: [] },
        dinner: { description: 'Fries', owner: MenuOwner.Liza, type: MealType.Dinner, products: [] },
    },
    {
        day: '2024-11-24',
        lunch: { description: 'Roast Chicken', owner: MenuOwner.Anna, type: MealType.Lunch, products: [] },
        dinner: { description: 'Vegetables', owner: MenuOwner.Liza, type: MealType.Dinner, products: [] },
    },
];

const shoppingListDataMock: ShoppingList = {
    day: '2024-11-18',
    data: [
        { name: 'Молоко1', bought: false },
        { name: 'хліб2', bought: true },
        { name: 'Яйця3', bought: false },
        { name: 'Сир4', bought: true },
    ],
};

export const ApiMocks = {
    transactionsMock,
    menuDataMock,
    shoppingListDataMock
};
