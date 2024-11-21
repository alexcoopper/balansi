import React from 'react';
import Header from './Header';

interface BasePageComponentProps {
    children: React.ReactNode;
}

const BasePageComponent: React.FC<BasePageComponentProps> = ({ children }) => {
    return (
        <>
            <Header />
            <div>
                {children}
            </div>
        </>
    );
};

export default BasePageComponent;
