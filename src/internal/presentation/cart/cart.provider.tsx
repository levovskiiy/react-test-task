import { CartRepository } from '@/internal/data';
import { AddToCartUseCase, DeleteCartItemUseCase, type ICartRepository, LoadCartUseCase } from '@/internal/domain';
import { CartModuleContext } from '@/internal/presentation/cart/cart.context.ts';
import { CartStore } from '@/internal/presentation/cart/cart.store.ts';
import { type PropsWithChildren, useEffect, useRef } from 'react';

export function CartModuleProvider({ children }: PropsWithChildren) {
    const repository = useRef<ICartRepository>(new CartRepository());
    const addToCart = useRef<AddToCartUseCase>(new AddToCartUseCase(repository.current));
    const loadCart = useRef<LoadCartUseCase>(new LoadCartUseCase(repository.current));
    const deleteCartItem = useRef<DeleteCartItemUseCase>(new DeleteCartItemUseCase(repository.current));
    const cartStore = useRef<CartStore>(new CartStore(
        addToCart.current,
        deleteCartItem.current,
        loadCart.current,
    ));

    useEffect(() => {
        cartStore.current.loadItems();
    }, []);

    return (
        <CartModuleContext.Provider value={{
            cartStore: cartStore.current,
            addToCart: addToCart.current,
        }}>
            {children}
        </CartModuleContext.Provider>
    );
}
