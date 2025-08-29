import { Root } from '@/app/Root.tsx';
import { NotFound } from '@/pages/404';
import { cartRoutes } from '@/pages/cart/routes.ts';
import { productRoutes } from '@/pages/product';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            ...productRoutes,
            ...cartRoutes,
        ],
    },
    {
        path: '*',
        Component: NotFound,
    },
]);
