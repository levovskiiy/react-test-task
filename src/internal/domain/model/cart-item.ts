import { Product, ProductColor, ProductSize } from '@/internal/domain';

export class CartItem {
    constructor(
        public product: Product,
        public color: ProductColor,
        public size: ProductSize,
    ) {
    }
}
