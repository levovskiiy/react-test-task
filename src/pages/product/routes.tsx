import { ProductModuleProvider } from '@/internal/presentation/product';
import { ProductList } from '@/pages/product/list';
import { Outlet, type RouteObject } from 'react-router';

export const productRoutes: RouteObject[] = [
    {
        path: '/',
        Component: () => {
            return (
                <ProductModuleProvider>
                    <Outlet/>
                </ProductModuleProvider>
            );
        },
        children: [
            {
                index: true,
                Component: ProductList,
            },
        ],
    },
];
