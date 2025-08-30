import { Cart } from './ui/Cart';
import type { RouteObject } from 'react-router';

export const cartRoutes: RouteObject[] = [
    {
        path: '/cart',
        Component: Cart,
    }
]
