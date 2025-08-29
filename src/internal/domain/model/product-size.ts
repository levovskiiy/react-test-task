import { ProductSizeLabel } from '@/internal/domain/enums';

export class ProductSize {
    constructor(
        public id: number,
        public label: ProductSizeLabel,
        public number: number,
    ) {
    }
}
