import { useProductModule } from '@/internal/presentation/product';
import { ProductListViewModel } from '@/pages/product/list/product-list.view-model.ts';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const ProductList = observer(() => {
    const navigate = useNavigate();
    const product = useProductModule();
    const viewModel = useLocalObservable(() => new ProductListViewModel(product.getProductList));

    useEffect(() => {
        viewModel.loadList();
    }, [ viewModel ]);

    return (
        <div className="flex flex-wrap gap-4 mt-20">
            {viewModel.items.map((product) => {
                const firstVariant = product.colors[0];
                const image = firstVariant.images[0];

                return (
                    <div
                        key={product.id}
                        className="w-1/5 flex flex-col items-center gap-4 cursor-pointer transition-all hover:scale-105"
                        onClick={() => {
                            navigate('/product/' + product.id);
                        }}
                    >
                        <img className="h-[400px] w-96 rounded object-cover" src={image}/>
                        <p className="text-lg">{product.name}</p>
                    </div>
                );
            })}
        </div>
    );
});
