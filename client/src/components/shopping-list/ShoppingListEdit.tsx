import React, { useEffect, useState } from 'react';
import { Paper, styled } from '@mui/material';
import { ShoppingList } from '../../models';
import SaveChangesSection from '../transactions-details/SaveChangesSection';
import { useAppDispatch } from '../../store';
import ErrorSnackbar from '../transactions-details/ErrorSnackbar';
import { updateShoppingList } from '../../store/shoppingSlice';
import ProductList from '../ProductList';

const StyledPaper = styled(Paper)`
    width: 100%;
    max-width: 600px;
    box-shadow: unset;
`;

interface ShoppingListEditProps {
    shoppingList: ShoppingList;
    onUpdate: () => void;
}

const ShoppingListEdit: React.FC<ShoppingListEditProps> = ({ shoppingList, onUpdate }) => {
    const dispatch = useAppDispatch();
    const [shoppingListCopy, setShoppingListCopy] = useState(shoppingList.data);
    const [changesDetected, setChangesDetected] = useState(false);
    const [updateInProgress, setUpdateInProgress] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [hasErrors, setHasErrors] = useState(false);

    useEffect(() => {
        setShoppingListCopy(shoppingList.data);
    }, [shoppingList]);

    useEffect(() => {
        setChangesDetected(JSON.stringify(shoppingList.data) !== JSON.stringify(shoppingListCopy));
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }, [shoppingListCopy, shoppingList]);

    const handleSaveChanges = () => {
        if (shoppingListCopy) {
            setUpdateInProgress(true);
            const originalShoppingList = { ...shoppingListCopy };

            const updatedShoppingList = {
                day: shoppingList.day,
                data: [...shoppingListCopy],
            };

            dispatch(updateShoppingList(updatedShoppingList))
                .unwrap()
                .then(() => {
                    setUpdateInProgress(false);
                    setChangesDetected(false);
                    setTimeout(() => {
                        onUpdate();
                    }, 1);
                })
                .catch(() => {
                    setShoppingListCopy(originalShoppingList);
                    setUpdateInProgress(false);
                    setErrorMessage('Упс! Щось пішло не так з оновленням! Спробуйте пізніше!');
                });
        }
    };

    return (
        <StyledPaper elevation={3}>
            <ProductList
                products={shoppingListCopy}
                onUpdate={(updatedProducts) => setShoppingListCopy(updatedProducts)}
                onSetError={setHasErrors}
            />
            <SaveChangesSection
                changesDetected={changesDetected && !hasErrors}
                updateInProgress={updateInProgress}
                handleSaveChanges={handleSaveChanges}
            />
            <ErrorSnackbar errorMessage={errorMessage} onClose={() => setErrorMessage(null)} />
        </StyledPaper>
    );
};

export default ShoppingListEdit;
