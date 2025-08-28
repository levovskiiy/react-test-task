import { Product } from '@/internal/domain';

export interface IProductRepository {
    get(id: number): Promise<Product>;

    getAll(): Promise<Product[]>;
}
