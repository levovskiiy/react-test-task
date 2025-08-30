import { type PropsWithChildren, useEffect, useRef } from 'react';
import { CartRepository } from '@/internal/data';
import { AddToCartUseCase, DeleteCartItemUseCase, type ICartRepository, LoadCartUseCase } from '@/internal/domain';
import { CartModuleContext } from './cart.context';
import { CartStore } from './cart.store.ts';

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
