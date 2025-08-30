import { type PropsWithChildren, useRef } from 'react';
import { ProductRepository } from '@/internal/data';
import {
    GetProductListUseCase,
    GetProductUseCase,
    GetSizeDictUseCase,
    type IProductRepository,
} from '@/internal/domain';
import { ProductModuleContext } from './product.context';

export function ProductModuleProvider({ children }: PropsWithChildren) {
    const repository = useRef<IProductRepository>(new ProductRepository());
    const getProduct = useRef<GetProductUseCase>(new GetProductUseCase(repository.current));
    const getProductList = useRef<GetProductListUseCase>(new GetProductListUseCase(repository.current));
    const getSizeDict = useRef<GetSizeDictUseCase>(new GetSizeDictUseCase(repository.current));

    return (
        <ProductModuleContext.Provider value={{
            getProduct: getProduct.current,
            getProductList: getProductList.current,
            getSizeDict: getSizeDict.current,
        }}>
            {children}
        </ProductModuleContext.Provider>
    );
}
