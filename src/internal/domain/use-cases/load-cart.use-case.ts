import { CartItem, type ICartRepository } from '@/internal/domain';

export class LoadCartUseCase {
    constructor(private repo: ICartRepository) {
    }

    public execute(): Promise<CartItem[]> {
        return this.repo.load();
    }
}
