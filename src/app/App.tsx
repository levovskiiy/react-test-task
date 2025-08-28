import { router } from '@/app/router.ts';
import { CartModuleProvider } from '@/internal/presentation/cart';
import React from 'react';
import { RouterProvider } from 'react-router';

const App: React.FC = () => {
    return (
        <CartModuleProvider>
            <RouterProvider router={router}/>
        </CartModuleProvider>
    );
};

export default App;
