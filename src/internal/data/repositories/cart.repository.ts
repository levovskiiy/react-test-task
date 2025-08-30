import { storage } from '@/internal/data/storage';
import { CartItem, type ICartRepository } from '@/internal/domain';

export class CartRepository implements ICartRepository {
    public async add(item: CartItem): Promise<CartItem> {
        const cart = await storage.getItem<CartItem[]>('cart') ?? [];
        cart.push(item);
        await storage.setItem('cart', cart);
        return JSON.parse(JSON.stringify(item));
    }

    public async remove(productId: number): Promise<void> {
        const cart = await storage.getItem<CartItem[]>('cart') ?? [];

        if (cart.findIndex((it) => it.product.id === productId) < 0) {
            throw new Error('Not found cart item');
        }

        const filtered = cart.filter((it) => it.product.id !== productId);
        await storage.setItem('cart', filtered);
    }

    public async load(): Promise<CartItem[]> {
        return await storage.getItem<CartItem[]>('cart') ?? [];
    }

}
