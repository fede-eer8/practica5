export class Product {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    imageStoragePath: string;
    imageUrl: string;
    discount: number;

    constructor(options: any) {
        this.id = options.id;
        this.name = options.name;
        this.price = options.price;
        this.category = options.category;
        this.description = options.description;
        this.imageStoragePath = options.imageStoragePath;
        this.imageUrl = options.imageUrl;
        this.discount = options.discount
    }
}
