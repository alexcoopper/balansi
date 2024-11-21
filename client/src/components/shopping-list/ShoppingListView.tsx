import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, Paper, styled as styledMU } from '@mui/material';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import EmptyDataNotice from '../EmptyDataNotice';
import { MenuDay, ShoppingItem, ShoppingList } from '../../models';
import { useAppDispatch } from '../../store';
import { copyShoppingList } from '../../store/shoppingSlice';
import FilterButtons, { FilterType } from './FilterButtons';
import './ShoppingListView.css'; // Add a CSS file for animations

const StyledPaper = styledMU(Paper)`
    width: 100%;
    max-width: 600px;
    box-shadow: unset;
    padding: unset;
    position: relative;
`;

interface ShoppingListViewProps {
    shoppingList: ShoppingList;
    menuList: MenuDay[];
    onUpdate: (updatedShoppingList: ShoppingList) => void;
}

const ShoppingListView: React.FC<ShoppingListViewProps> = ({ shoppingList, menuList, onUpdate }) => {
    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState(FilterType.AsIs);
    const [filteredShoppingList, setFilteredShoppingList] = useState(shoppingList.data);

    const reorderList = (list: ShoppingItem[]) => {
        let updatedList = [...list];

        if (filter === FilterType.Smart) {
            // Move bought items to the end
            updatedList = updatedList.sort((a, b) => Number(a.bought) - Number(b.bought));
        } else if (filter === FilterType.Abc) {
            updatedList = updatedList.sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredShoppingList(updatedList);
    }

    useEffect(() => {
        reorderList([...shoppingList.data]);
    }, [filter, shoppingList.data, menuList]);

    const handleFilterChange = (newFilter: FilterType) => {
        setFilter(newFilter);
    };

    const handleToggle = (name: string) => {
        setTimeout(() => {
            const updatedShoppingListItems = shoppingList.data.map((item) =>
                item.name === name ? { ...item, bought: !item.bought } : item,
            );
    
            reorderList(updatedShoppingListItems);
            onUpdate({
                day: shoppingList.day,
                data: [...updatedShoppingListItems],
            });    
        }, filter === FilterType.Smart ? 300 : 0);
    };

    const handleCopyPreviousMenu = () => {
        dispatch(copyShoppingList(shoppingList.day));
    };

    return (
        <StyledPaper elevation={3}>
            {shoppingList.data.length === 0 && (
                <EmptyDataNotice
                    mainMessage="Наразі цей список пустий, додайте зміни."
                    copyMessage="Ви можете скопіювати попередній список"
                    onCopyPreviousMenu={handleCopyPreviousMenu}
                />
            )}
            {shoppingList.data.length > 0 && (
                <FilterButtons filter={filter} onFilterChange={handleFilterChange} />
            )}

            <List>
                <TransitionGroup>
                    {filteredShoppingList.map((item) => (
                        <CSSTransition
                            key={item.name}
                            timeout={400}
                            classNames="shopping-item"
                        >
                            <ListItem
                                component="li"
                                sx={{
                                    textDecoration: item.bought ? 'line-through' : 'none',
                                    color: item.bought ? 'gray' : 'inherit',
                                    cursor: 'pointer',
                                    padding: 'unset',
                                }}
                                onClick={() => handleToggle(item.name)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={item.bought}
                                        inputProps={{ 'aria-labelledby': `checkbox-list-label-${item.name}` }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={`checkbox-list-label-${item.name}`} primary={item.name} secondary={item.meals?.join(', ')} />
                            </ListItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </List>
        </StyledPaper>
    );
};

export default ShoppingListView;
