import type { ICartRepository } from '@/internal/domain';

export class DeleteCartItemUseCase {
    constructor(private repo: ICartRepository) {
    }

    public async execute(productID: number): Promise<void> {
        await this.repo.remove(productID);
    }
}
