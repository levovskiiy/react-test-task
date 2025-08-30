import { router } from '@/app/router.ts';
import { CartModuleProvider } from '@/internal/presentation/cart';
import { RouterProvider } from 'react-router';

import './global.css';

const App = () => {
    return (
        <CartModuleProvider>
            <RouterProvider router={router}/>
        </CartModuleProvider>
    );
};

export default App;
