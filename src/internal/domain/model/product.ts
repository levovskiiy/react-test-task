import type { ProductVariant } from './product-variant.ts';

export class Product {

    constructor(
        public id: number,
        public name: string,
        public colors: ProductVariant[],
    ) {
    }
}

