const formatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    currencySign: 'standard',
    maximumFractionDigits: 2,
});

export function formatMoney(value: number | string): string {
    if (!value) {
        return '-';
    }

    const num = typeof value === 'string' ? parseFloat(value) : value;

    if (!Number.isFinite(num) || Number.isNaN(num)) {
        return '-';
    }

    return formatter.format(num);
}
