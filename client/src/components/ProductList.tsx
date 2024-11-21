import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, IconButton, TextField, Box, styled as styledMU } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';
import { ShoppingItem } from '../models';

const StyledTextField = styledMU(TextField)(({ theme }) => ({
    '& .MuiFormHelperText-root': {
        position: 'absolute',
        top: '0',
        transform: 'translateY(-50%)',
        whiteSpace: 'nowrap',
        backgroundColor: 'white', // Optional: to prevent overlap with background
        padding: '0 4px',         // Optional: for spacing
        borderRadius: '4px',      // Optional: for aesthetics
        color: theme.palette.error.main, // Match error color
    },
    position: 'relative',
}));

const StyledBox = styled(Box)`
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 4px;
    padding-bottom: 70px;
`;

interface ProductListProps {
    products: ShoppingItem[];
    onUpdate: (updatedProducts: ShoppingItem[]) => void;
    onSetError: (hasErrors: boolean) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onUpdate, onSetError }) => {
    const [productList, setProductList] = useState<ShoppingItem[]>(products);
    const [newItem, setNewItem] = useState('');
    const [isErrorItems, setIsErrorItems] = useState<Set<number>>(new Set());

    useEffect(() => {
        setProductList(products);
    }, [products]);

    const checkForDuplicates = (index: number, newValue: string) => {
        const isDuplicate = productList.some((el, i) => i !== index && el.name === newValue);
        setIsErrorItems((prev) => {
            const newErrorItems = new Set(prev);
            if (isDuplicate) {
                newErrorItems.add(index);
            } else {
                newErrorItems.delete(index);
            }
            onSetError(newErrorItems.size > 0);
            return newErrorItems;
        });
    };

    const handleDelete = (index: number) => {
        const updatedProducts = productList.filter((_, i) => i !== index);
        setProductList(updatedProducts);
        onUpdate(updatedProducts);
    };

    const handleAddItem = () => {
        if (newItem.trim()) {
            const updatedProducts = [...productList, { name: newItem.trim(), bought: false }];
            setProductList(updatedProducts);
            onUpdate(updatedProducts);
            setNewItem('');
        }
    };

    const handleChangeItem = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const newValue = e.target.value;
        checkForDuplicates(index, newValue);

        const updatedProducts = productList.map((el, i) =>
            i === index ? { ...el, name: newValue } : el,
        );
        setProductList(updatedProducts);
        onUpdate(updatedProducts);
    };

    const handleNewItemEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        checkForDuplicates(-1, newValue);
        setNewItem(newValue);
    };

    return (
        <>
            <List sx={{ paddingBottom: 'unset' }}>
                {productList.map((item, index) => (
                    <ListItem key={index} component="li" sx={{ padding: 'unset' }}>
                        <ListItemText
                            primary={
                                <StyledTextField
                                    fullWidth
                                    variant="outlined"
                                    value={item.name}
                                    error={isErrorItems.has(index)}
                                    helperText={isErrorItems.has(index) ? 'Такий продукт вже є у списку' : ''}
                                    onChange={(e) => handleChangeItem(e, index)}
                                />
                            }
                        />
                        <ListItemIcon sx={{ justifyContent: 'center' }}>
                            <IconButton
                                edge="end"
                                onClick={() => handleDelete(index)}
                                disabled={isErrorItems.has(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemIcon>
                    </ListItem>
                ))}
            </List>
            <StyledBox>
                <StyledTextField
                    fullWidth
                    placeholder="Додати новий продукт"
                    value={newItem}
                    onChange={handleNewItemEdit}
                    error={isErrorItems.has(-1)}
                    helperText={isErrorItems.has(-1) ? 'Такий продукт вже є у списку' : ''}
                />
                <IconButton
                    edge="end"
                    onClick={handleAddItem}
                    sx={{ paddingLeft: '18px', paddingRight: '22px' }}
                    disabled={isErrorItems.has(-1)}
                >
                    <AddIcon />
                </IconButton>
            </StyledBox>
        </>
    );
};

export default ProductList;
