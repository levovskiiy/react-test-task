import { CartItem } from '@/internal/domain';

export interface ICartRepository {
    add(item: CartItem): Promise<CartItem>;

    remove(productId: number): Promise<void>;

    load(): Promise<CartItem[]>;
}
