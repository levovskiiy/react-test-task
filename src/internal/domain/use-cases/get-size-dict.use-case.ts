import type { IProductRepository, ProductSize } from '@/internal/domain';

export class GetSizeDictUseCase {
    constructor(private repo: IProductRepository) {
    }

    public execute(): Promise<ProductSize[]> {
        return this.repo.getSizeDict();
    }
}
