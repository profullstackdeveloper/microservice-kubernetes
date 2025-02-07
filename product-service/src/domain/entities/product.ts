export class Product {
    constructor(
        public id: string | null,
        public name: string,
        public description: string,
        public price: number,
        public stock: number
    ) {}
}
