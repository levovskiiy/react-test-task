import { AddToCartUseCase, CartItem } from '@/internal/domain';
import { makeAutoObservable, runInAction } from 'mobx';

export class CartStore {
    public items: CartItem[] = [];

    public get hasItems(): boolean {
        return this.items.length > 0;
    }

    public get totalPrice(): number {
        return this.items.reduce((acc, product) => acc + product.price, 0);
    }

    public get count(): number {
        return this.items.length;
    }

    constructor(private _addToCart: AddToCartUseCase) {
        makeAutoObservable(this);
    }

    public addItem = async (value: CartItem): Promise<void> => {
        const added = await this._addToCart.execute(value);
        runInAction(() => {
            this.items.push(added);
        });
    };

    public contains = (productID: number): boolean => {
        return this.items.some((it) => it.productId === productID);
    };

    public remove = (productID: number): void => {
        this.items = this.items.filter((it) => it.productId !== productID);
    };

    public addMore = (values: CartItem[]): void => {
        this.items.push(...values);
    };
}
