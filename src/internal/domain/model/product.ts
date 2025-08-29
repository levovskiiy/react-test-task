import type { ProductColor } from './product-color.ts';

export class Product {

    constructor(
        public id: number,
        public name: string,
        public colors: ProductColor[],
    ) {
    }
}

