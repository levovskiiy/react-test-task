import { CartRepository } from '@/internal/data';
import { AddToCartUseCase, type ICartRepository } from '@/internal/domain';
import { CartModuleContext } from '@/internal/presentation/cart/cart.context.ts';
import { CartStore } from '@/internal/presentation/cart/cart.store.ts';
import { type PropsWithChildren, useRef } from 'react';

export function CartModuleProvider({ children }: PropsWithChildren) {
    const repository = useRef<ICartRepository>(new CartRepository());
    const addToCart = useRef<AddToCartUseCase>(new AddToCartUseCase(repository.current));
    const cartStore = useRef<CartStore>(new CartStore(addToCart.current));

    return (
        <CartModuleContext.Provider value={{
            cartStore: cartStore.current,
            addToCart: addToCart.current,
        }}>
            {children}
        </CartModuleContext.Provider>
    );
}
