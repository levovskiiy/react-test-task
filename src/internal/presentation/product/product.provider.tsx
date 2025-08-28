import { type PropsWithChildren, useRef } from 'react';
import { ProductRepository } from '@/internal/data';
import { GetProductListUseCase, GetProductUseCase, type IProductRepository } from '@/internal/domain';
import { ProductModuleContext } from './product.context.ts';

export function ProductModuleProvider({ children }: PropsWithChildren) {
    const repository = useRef<IProductRepository>(new ProductRepository());
    const getProduct = useRef<GetProductUseCase>(new GetProductUseCase(repository.current));
    const getProductList = useRef<GetProductListUseCase>(new GetProductListUseCase(repository.current));

    return (
        <ProductModuleContext.Provider value={{
            getProduct: getProduct.current,
            getProductList: getProductList.current,
        }}>
            {children}
        </ProductModuleContext.Provider>
    );
}
