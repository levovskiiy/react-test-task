import { storage } from '@/internal/data/storage';
import { CartItem, type ICartRepository } from '@/internal/domain';

export class CartRepository implements ICartRepository {
    public async add(item: CartItem): Promise<CartItem> {
        const cart = await storage.getItem<CartItem[]>('cart') ?? [];
        cart.push(item);
        await storage.setItem('cart', cart);
        return new CartItem(item.productId, item.variantId, item.name, item.price);
    }

    public async remove(productId: number): Promise<void> {
        const cart = await storage.getItem<CartItem[]>('cart') ?? [];

        if (cart.findIndex((it) => it.productId === productId) < 0) {
            throw new Error('Not found cart item');
        }

        const filtered = cart.filter((it) => it.productId !== productId);
        await storage.setItem('cart', filtered);
    }

}
