import { useProductModule } from '@/internal/presentation/product';
import { ProductListViewModel } from '@/pages/product/list/product-list.view-model.ts';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

export const ProductList = observer(() => {
    const product = useProductModule();
    const viewModel = useLocalObservable(() => new ProductListViewModel(product.getProductList));

    useEffect(() => {
        viewModel.loadList();
    }, [ viewModel ]);

    return (
        <div>test</div>
    );
});
