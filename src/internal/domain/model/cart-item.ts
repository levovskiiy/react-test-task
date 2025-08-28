export class CartItem {
    constructor(
        public productId: number,
        public variantId: number,
        public name: string,
        public price: number,
    ) {
    }
}
