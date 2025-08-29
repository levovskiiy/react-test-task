import { ImageSlider } from '@/internal/components/ui/image-slider.tsx';
import { Separator } from '@/internal/components/ui/separator.tsx';
import { useCartModule } from '@/internal/presentation/cart';
import { useProductModule } from '@/internal/presentation/product';
import { ProductCardViewModel } from '@/pages/product/card/product-card.view-model.ts';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router';

export const ProductCard = observer(() => {
    const productModule = useProductModule();
    const cartModule = useCartModule();
    const params = useParams<{ id: string }>();
    const productCardViewModel = useLocalObservable(() => new ProductCardViewModel(
        productModule.getProduct,
        cartModule.addToCart,
    ));

    useEffect(() => {
        productCardViewModel.load(Number(params.id));
    }, [ params, productCardViewModel ]);

    if (productCardViewModel.loading) {
        return 'loading...';
    }

    return (
        <div className="h-[calc(100vh-100px)] grid grid-cols-2 items-center gap-4">
            <ImageSlider
                images={productCardViewModel.variantImages}
                className="flex-1"
            />
            <section className="flex flex-col gap-4 flex-1">
                <h1 className="text-2xl text-center">{productCardViewModel.product?.name}</h1>
                <Separator/>
                <div className="flex gap-4"></div>
            </section>
        </div>
    );
});
