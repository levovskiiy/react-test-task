import { AddToCartUseCase, CartItem, DeleteCartItemUseCase, LoadCartUseCase } from '@/internal/domain';
import { makeAutoObservable, runInAction } from 'mobx';

export class CartStore {
    public items: CartItem[] = [];

    public get hasItems(): boolean {
        return this.items.length > 0;
    }

    public get totalPrice(): number {
        return this.items.reduce((acc, product) => acc + Number(product.color.price), 0);
    }

    public get count(): number {
        return this.items.length;
    }

    constructor(
        private addToCart: AddToCartUseCase,
        private deleteCartItem: DeleteCartItemUseCase,
        private loadCart: LoadCartUseCase,
    ) {
        makeAutoObservable(this);
    }

    public addItem = async (value: CartItem): Promise<void> => {
        const added = await this.addToCart.execute(value);
        runInAction(() => {
            this.items.push(added);
        });
    };

    public contains = (sizeId: number, colorId: number): boolean => {
        return this.items.some((it) => it.size.id === sizeId && it.color.id === colorId);
    };

    public remove = async (productID: number): Promise<void> => {
        await this.deleteCartItem.execute(productID);
        runInAction(() => {
            this.items = this.items.filter((it) => it.product.id !== productID);
        });
    };

    public loadItems = async (): Promise<void> => {
        const items = await this.loadCart.execute();
        runInAction(() => {
            this.items = items;
        });
    };
}
