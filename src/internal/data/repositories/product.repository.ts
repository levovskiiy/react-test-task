import { storage } from '@/internal/data/storage';
import type { IProductRepository, Product } from '@/internal/domain';

export class ProductRepository implements IProductRepository {
    public async get(id: number): Promise<Product> {
        const products = await storage.getItem<Product[]>('products') ?? [];

        const existing = products.find((it) => it.id === id);
        if (!existing) {
            throw new Error('Not found');
        }

        return existing;
    }

    public async getAll(): Promise<Product[]> {
        return await storage.getItem<Product[]>('products') ?? [];
    }

}
