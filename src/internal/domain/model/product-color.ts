export class ProductColor {

    constructor(
        public id: number,
        public name: string,
        public images: string[],
        public price: string,
        public description: string,
        public sizes: number[],
    ) {
    }
}
