import { Button, Card, CardContent, CardHeader, CardTitle } from '@/internal/components';
import { formatMoney } from '@/internal/lib';
import { useCartStore } from '@/internal/presentation/cart';
import { Trash2 } from 'lucide-react';
import { observer } from 'mobx-react-lite';

export const Cart = observer(() => {
    const cartStore = useCartStore();

    return (
        <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-start py-10 w-full">
            {cartStore.hasItems ? (
                <div className="flex flex-col gap-6 w-full max-w-2xl">
                    {cartStore.items.map((it) => (
                        <Card key={it.product.id} className="shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>{it.product.name}</CardTitle>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => cartStore.remove(it.product.id)}
                                >
                                    <Trash2 className="w-5 h-5 text-red-500"/>
                                </Button>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <p className="text-muted-foreground">Цвет: {it.color.name}</p>
                                <p className="text-muted-foreground">Размер: {it.size.label}</p>
                                <p className="font-semibold">{formatMoney(it.color.price)}</p>
                            </CardContent>
                        </Card>
                    ))}

                    <div className="flex items-center justify-between border-t pt-6">
                        <p className="text-lg font-semibold">Итого: {formatMoney(cartStore.totalPrice)}</p>
                        <Button
                            size="lg"
                            className="rounded-2xl shadow"
                            onClick={() => {
                                alert('Ваш заказ успешно оформлен!');
                            }}
                        >
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            ) : (
                <p className="text-muted-foreground text-2xl">
                    В корзине пока пусто
                </p>
            )}
        </div>
    );
});

