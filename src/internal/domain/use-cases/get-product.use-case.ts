import { type IProductRepository, Product } from '@/internal/domain';

export class GetProductUseCase {
    constructor(private repo: IProductRepository) {
    }

    public execute(id: number): Promise<Product> {
        return this.repo.get(id);
    }
}
