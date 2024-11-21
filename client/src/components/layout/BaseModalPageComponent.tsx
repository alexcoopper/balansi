import React from 'react';
import ModalHeader from './ModalHeader';

interface BasePageComponentProps {
    children: React.ReactNode;
}

const BaseModalPageComponent: React.FC<BasePageComponentProps> = ({ children }) => {
    return (
        <>
            <ModalHeader />
            <div>
                {children}
            </div>
        </>
    );
};

export default BaseModalPageComponent;
