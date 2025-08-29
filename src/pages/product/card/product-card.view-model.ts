import { AddToCartUseCase, CartItem, GetProductUseCase, Product, ProductVariant } from '@/internal/domain';
import { makeAutoObservable, runInAction } from 'mobx';

export class ProductCardViewModel {
    public product: Product | null = null;
    public selectedVariant: ProductVariant | null = null;
    public size: number = 0;
    public loading: boolean = false;

    public get variantImages(): string[] {
        return this.selectedVariant?.images ?? [];
    }

    constructor(private _getProduct: GetProductUseCase, private _addToCart: AddToCartUseCase) {
        makeAutoObservable(this);
    }

    public load = async (id: number) => {
        this.loading = true;
        const product = await this._getProduct.execute(id);
        runInAction(() => {
            this.product = product;
            this.loading = false;
            this.selectedVariant = product.colors[0];
        });
    };

    public addToCard = async () => {
        if (!this.selectedVariant) {
            return;
        }

        if (!this.product) {
            return;
        }

        const newCartItem = CartItem.create({
            productId: this.product.id,
            variantId: this.selectedVariant.id,
            name: this.product.name,
            price: 0,
            size: 0,
            color: 0,
        });
        await this._addToCart.execute(newCartItem);
    };
}
