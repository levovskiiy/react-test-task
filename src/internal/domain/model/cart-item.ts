export class CartItem {
    constructor(
        public productId: number,
        public variantId: number,
        public name: string,
        public price: number,
        public size: number,
        public color: number,
    ) {
    }

    public static create(raw: CartItemData) {
        return new CartItem(
            raw.productId,
            raw.variantId,
            raw.name,
            raw.price,
            raw.size,
            raw.color,
        );
    }
}

interface CartItemData {
    productId: number;
    variantId: number;
    name: string;
    price: number;
    size: number;
    color: number;
}
