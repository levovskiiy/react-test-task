import { productRoutes } from '@/pages/product';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
    ...productRoutes,
]);
