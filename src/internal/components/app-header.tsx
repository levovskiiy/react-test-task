import { Button } from '@/internal/components/ui';
import { useCartStore } from '@/internal/presentation/cart/cart.context.ts';
import { ShoppingCart } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router';

export const AppHeader = observer(() => {
    const cartStore = useCartStore();

    return (
        <header className="flex justify-between items-center p-4 border-b">
            <Link to="/" className="heading-1">
                Product Store
            </Link>
            <Button variant="ghost" asChild>
                <Link to="/cart">
                    <ShoppingCart/>
                    Cart {cartStore.count}
                </Link>
            </Button>
        </header>
    );
});
