import { Cart } from '@/pages/cart/ui/Cart.tsx';
import type { RouteObject } from 'react-router';

export const cartRoutes: RouteObject[] = [
    {
        path: '/cart',
        Component: Cart,
    }
]
