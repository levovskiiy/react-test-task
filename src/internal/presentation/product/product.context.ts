import { GetProductListUseCase, GetProductUseCase, GetSizeDictUseCase } from '@/internal/domain';
import { createContext, useContext } from 'react';

interface ProductModule {
    getProduct: GetProductUseCase;
    getProductList: GetProductListUseCase;
    getSizeDict: GetSizeDictUseCase;
}

export const ProductModuleContext = createContext<ProductModule>({} as ProductModule);

export function useProductModule() {
    return useContext(ProductModuleContext);
}
