import { createContext, useContext } from 'react';
import { AddToCartUseCase } from '@/internal/domain';
import type { CartStore } from './cart.store';

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
