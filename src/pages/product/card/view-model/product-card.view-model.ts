import {
    CartItem,
    GetProductUseCase,
    GetSizeDictUseCase,
    Product,
    ProductSize,
    ProductColor,
} from '@/internal/domain';
import { transformToMap } from '@/internal/lib';
import type { CartStore } from '@/internal/presentation/cart/cart.store.ts';
import { makeAutoObservable, runInAction } from 'mobx';

export class ProductCardViewModel {
    public product: Product | null = null;
    public loading: boolean = false;
    public selectedSize: string = '';
    public selectedColor = '';

    private sizeDict: ProductSize[] = [];

    public get productColorMap(): Record<PropertyKey, ProductColor> {
        return transformToMap(this.product?.colors ?? [], (it) => it.id);
    }

    public get productColorSizeMap(): Record<PropertyKey, ProductSize> {
        return transformToMap(this.sizeDict, (it) => it.id);
    }

    public get currentColor(): ProductColor | undefined {
        return this.productColorMap[this.selectedColor];
    }

    public get currentSize(): ProductSize | undefined {
        return this.productColorSizeMap[this.selectedSize];
    }

    public get colorImages(): string[] {
        return this.currentColor?.images ?? [];
    }

    public get colorDescription(): string {
        return this.currentColor?.description ?? '';
    }

    public get price() {
        return this.currentColor?.price ?? 0;
    }

    public get canAddToCart(): boolean {
        if (!this.currentSize || !this.currentColor) {
            return false;
        }

        const hasParams = !!(this.currentColor && this.currentSize);
        const containInCart = this.product && this._cartStore.contains(this.currentSize.id, this.currentColor.id);

        return hasParams && !containInCart;
    }

    public get colorSelectOptions() {
        return (this.product?.colors ?? []).map((it) => ({
            id: it.id,
            label: it.name,
        }));
    }

    public get sizeSelectOptions() {
        const productSizes = this.currentColor?.sizes ?? [];
        const sizes = new Set(productSizes);

        return this.sizeDict.map((it) => ({
            id: it.id,
            label: `${it.number} (${it.label})`,
            disabled: !sizes.has(it.id),
        }));
    }

    constructor(
        private _getProduct: GetProductUseCase,
        private _getSizeDict: GetSizeDictUseCase,
        private _cartStore: CartStore,
    ) {
        makeAutoObservable(this);
    }

    public load = async (id: number) => {
        this.loading = true;

        const [ product, sizeDict ] = await Promise.all([
            this._getProduct.execute(id),
            this._getSizeDict.execute(),
        ]);

        runInAction(() => {
            this.product = product;
            this.sizeDict = sizeDict;
            this.loading = false;
            this.selectedColor = product.colors[0].id.toString();
        });
    };

    public addToCard = async () => {
        if (!this.product || !this.currentColor || !this.currentSize || !this.canAddToCart) {
            return;
        }

        const newCartItem = new CartItem(this.product, this.currentColor, this.currentSize);
        await this._cartStore.addItem(newCartItem);
    };

    public onChangeColor = (value: string) => {
        this.selectedColor = value;

        if (!this.currentColor?.sizes?.includes(Number(this.selectedSize))) {
            this.selectedSize = '';
        }
    };

    public onChangeSize = (value: string) => {
        this.selectedSize = value;
    };
}
