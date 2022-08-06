import API from "..";
import { Product } from '../../types/product';

export default class ProductAPI extends API{
    constructor() {
        super('product')
    }

    private formatServerObj(obj: any) {
        const parsed : Product = {
            id: obj.id,
            name: obj.name,
            description: obj.description,
            categoryId: obj.category.id,
            categoryName: obj.category.name,
            categoryInitial: obj.category.initial,
            price: obj.price,
            createdAt: obj.created_at
        }
        return parsed;
    }
    private formatServerObjArray(obj: Array<any>) {
        const parsed = new Array<Product>();
        for (const i of obj) 
            parsed.push(this.formatServerObj(i))

        return parsed;
    }

    async get (id: number) : Promise<Product> {
        return this.formatServerObj((await super.get(id)).data);
    }

    async index () : Promise<Array<Product>> {
        return this.formatServerObjArray((await super.index()).data);
    }

}
