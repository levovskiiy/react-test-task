import { AddToCartUseCase } from '@/internal/domain';
import type { CartStore } from '@/internal/presentation/cart/cart.store.ts';
import { createContext, useContext } from 'react';

interface CartModule {
    cartStore: CartStore;
    addToCart: AddToCartUseCase;
}

export const CartModuleContext = createContext<CartModule>({} as CartModule);

export function useCartModule() {
    return useContext(CartModuleContext);
}

export function useCartStore() {
    return useContext(CartModuleContext).cartStore;
}
