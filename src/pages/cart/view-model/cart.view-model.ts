import { CartItem, GetSizeDictUseCase, ProductSize } from '@/internal/domain';
import { useCartModule } from '@/internal/presentation/cart';
import type { CartStore } from '@/internal/presentation/cart/cart.store.ts';
import { useProductModule } from '@/internal/presentation/product';
import { runInAction } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

export class CartViewModel {
    public sizeDict: ProductSize[] = [];

    public get totalPrice(): number {
        return this.cartStore.totalPrice;
    }

    public get hasItems(): boolean {
        return this.cartStore.hasItems;
    }

    public get items(): CartItem[] {
        return this.cartStore.items;
    }

    constructor(
        private cartStore: CartStore,
        private getSizeDict: GetSizeDictUseCase,
    ) {
    }

    public load = async () => {
        const sizes = await this.getSizeDict.execute();
        runInAction(() => {
            this.sizeDict = sizes;
        });
    };
}

export function useCartViewModel() {
    const cart = useCartModule();
    const product = useProductModule();

    const viewModel = useLocalObservable(() => new CartViewModel(cart.cartStore, product.getSizeDict));

    useEffect(() => {
        viewModel.load();
    }, [ viewModel ]);

    return viewModel;
}
