import { Button, Card, CardContent, CardFooter, CardHeader } from '@/internal/components';
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 w-full max-w-7xl mx-auto">
            {viewModel.items.map((product) => {
                const firstVariant = product.colors[0];
                const image = firstVariant.images[0];
                const price = Number(firstVariant.price);

                return (
                    <Card
                        key={product.id}
                        className="flex flex-col shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                        onClick={() => navigate('/product/' + product.id)}
                    >
                        <CardHeader className="p-0">
                            <img
                                src={image}
                                alt={product.name}
                                className="h-64 w-full object-cover rounded-t"
                            />
                        </CardHeader>

                        <CardContent className="flex flex-col gap-2 p-4">
                            <p className="text-lg font-semibold">{product.name}</p>
                            <p className="text-muted-foreground">{price} ₽</p>
                        </CardContent>

                        <CardFooter className="p-4 pt-0">
                            <Button
                                variant="secondary"
                                className="w-full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate('/product/' + product.id);
                                }}
                            >
                                Подробнее
                            </Button>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
});
