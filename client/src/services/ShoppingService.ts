import { API } from '../libs/api';
import { ShoppingItem, ShoppingList } from '../models';

const fetchData = async (startDay: string): Promise<ShoppingList> => {
    let result = await API.fetchShoppingListAsync(startDay)

    if (result.day !== startDay || result.data.length === 0) {
        result = {day: startDay, data: []};
    }
    return result;
};

const copyShoppingList = async (
    copyToWeekFromDate: string,
    dataMap: Record<string, ShoppingList>,
): Promise<ShoppingList> => {
    const targetMonday = new Date(copyToWeekFromDate);

    // Determine the Monday of the previous week
    const previousMonday = new Date(copyToWeekFromDate);
    previousMonday.setDate(targetMonday.getDate() - 7);
    const previousMondayKey = previousMonday.toLocaleDateString('en-CA');

    // Check if previous week exists in the store
    let previousWeekShoppingList = dataMap[previousMondayKey];
    if (!previousWeekShoppingList || previousWeekShoppingList.data.length === 0) {
        previousWeekShoppingList = await API.fetchShoppingListAsync(previousMondayKey); 
    }

    const currentList = dataMap[copyToWeekFromDate];

    const newShoppingList = {day: copyToWeekFromDate, data: [...(currentList.data || []), ...previousWeekShoppingList.data.map(x=> ({...x, bought: false}))]};
    
    await API.updateShoppingListAsync(newShoppingList);

    return newShoppingList;
};

const updateShoppingList = async (shoppingList: ShoppingList): Promise<ShoppingList> => {
    await API.updateShoppingListAsync(shoppingList);
    return shoppingList;
};

const addShoppingList = async (
    currentShoppingList: ShoppingList,
    newProducts: ShoppingItem[]
  ): Promise<ShoppingList> => {
    // Create a writable copy of the current data
    const mergedProducts = currentShoppingList.data.map((item) => ({ ...item }));
  
    newProducts.forEach((newProduct) => {
      const existingItemIndex = mergedProducts.findIndex(
        (x) => x.name.toLowerCase() === newProduct.name.toLowerCase()
      );
  
      if (existingItemIndex > -1) {
        // If the item exists, merge the meals property
        const existingItem = mergedProducts[existingItemIndex];
        const existingMeals = existingItem.meals || [];
        const newMeals = newProduct.meals || [];
        mergedProducts[existingItemIndex] = {
          ...existingItem,
          meals: Array.from(new Set([...existingMeals, ...newMeals])), // Merge and deduplicate
        };
      } else {
        // If the item does not exist, add it
        mergedProducts.push({ ...newProduct }); // Ensure a copy of the new product is added
      }
    });
  
    // Update the shopping list with the merged products
    const updatedShoppingList = {
      ...currentShoppingList,
      data: mergedProducts,
    };
  
    // Uncomment to update via API if needed
    await API.updateShoppingListAsync(updatedShoppingList);
  
    return updatedShoppingList;
  };
  

export const ShoppingService = {
    fetchData,
    updateShoppingList,
    copyShoppingList,
    addShoppingList
};
