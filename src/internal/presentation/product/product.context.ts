import { GetProductListUseCase, GetProductUseCase } from '@/internal/domain';
import { createContext, useContext } from 'react';

interface ProductModule {
    getProduct: GetProductUseCase;
    getProductList: GetProductListUseCase;
}

export const ProductModuleContext = createContext<ProductModule>({} as ProductModule);

export function useProductModule() {
    return useContext(ProductModuleContext);
}
