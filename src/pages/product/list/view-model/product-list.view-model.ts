import { GetProductListUseCase, Product } from '@/internal/domain';
import { makeAutoObservable, runInAction } from 'mobx';

export class ProductListViewModel {
    public items: Product[] = [];
    public loading: boolean = false;

    constructor(private _getProducts: GetProductListUseCase) {
        makeAutoObservable(this);
    }

    public loadList = async () => {
        this.loading = true;

        console.log(this._getProducts);
        const result = await this._getProducts.execute();
        runInAction(() => {
            this.loading = false;
            this.items = result;
        });
    };
}
