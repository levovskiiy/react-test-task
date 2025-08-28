import { CartItem } from '@/internal/domain';
import type { ICartRepository } from '@/internal/domain/repositores/cart.repository.ts';

export class AddToCartUseCase {
    constructor(private repo: ICartRepository) {
    }

    public async execute(value: CartItem): Promise<CartItem> {
        return await this.repo.add(value);
    }
}
