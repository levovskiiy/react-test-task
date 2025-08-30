import { formatMoney } from '@/internal/lib';
import { useCartModule } from '@/internal/presentation/cart';
import { useProductModule } from '@/internal/presentation/product';
import { ProductCardViewModel } from '../view-model/product-card.view-model.ts';
import { ArrowLeft } from 'lucide-react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import {
    ImageSlider,
    Separator,
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem, Button,
} from '@/internal/components/ui';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router';

export const ProductCard = observer(() => {
    const productModule = useProductModule();
    const cartModule = useCartModule();
    const params = useParams<{ id: string }>();

    const viewModel = useLocalObservable(() => new ProductCardViewModel(
        productModule.getProduct,
        productModule.getSizeDict,
        cartModule.cartStore,
    ));

    useEffect(() => {
        viewModel.load(Number(params.id));
    }, [ params, viewModel ]);

    return (
        <div className="flex flex-col gap-6 px-6 py-5 w-full">
            <header className="self-start">
                <Button asChild variant="ghost" className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4"/>
                        <span>К списку товаров</span>
                    </Link>
                </Button>
            </header>

            <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start w-full">
                <div className="w-full">
                    <ImageSlider images={viewModel.colorImages}/>
                </div>

                <section className="flex flex-col gap-6">
                    <h1 className="text-3xl font-bold">{viewModel.product?.name}</h1>
                    <p className="text-muted-foreground">{viewModel.colorDescription}</p>

                    <Separator/>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Select
                                value={viewModel.selectedSize}
                                onValueChange={viewModel.onChangeSize}
                            >
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Размер"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {viewModel.sizeSelectOptions.map((it) => (
                                        <SelectItem
                                            key={it.id}
                                            value={it.id.toString()}
                                            disabled={it.disabled}
                                        >
                                            {it.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select
                                value={viewModel.selectedColor}
                                onValueChange={viewModel.onChangeColor}
                            >
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Цвет"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {viewModel.colorSelectOptions.map((it) => (
                                        <SelectItem key={it.id} value={it.id.toString()}>
                                            {it.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            size="lg"
                            onClick={viewModel.addToCard}
                            disabled={!viewModel.canAddToCart}
                            className="rounded-2xl text-lg font-semibold shadow-md"
                        >
                            {formatMoney(viewModel.price ?? '')}
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
});
