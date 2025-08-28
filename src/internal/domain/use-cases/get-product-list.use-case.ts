import { type IProductRepository, Product } from '@/internal/domain';

export class GetProductListUseCase {
    constructor(private repo: IProductRepository) {
    }

    public execute(): Promise<Product[]> {
        return this.repo.getAll();
    }
}
