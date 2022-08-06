import { Controller } from "..";
import { Product } from "../../model/product";
import { Request } from "express";
import { AppDataSource } from "../../data-source";
import { Category } from "../../model/product/category";

export default class ProductController extends Controller {
    constructor() {
        super(Product, ["category"]);
    }

    //@ts-ignore
    Create = async (req: Request) => { 
        try {
        const {name, description, category, price} = req.body;
        const product = await Product.New(
            name.trim(),
            description.trim(),
            await AppDataSource.getRepository(Category).findOneByOrFail({initial: category}),
            Number(price)
        );
        await AppDataSource.getRepository(Product).save(product);
        return {status: 200, value: product}
        } catch (e : any) {
            return {status: 500, value: {
                message: {
                    "something went wrong" : (e.detail || e.message || e)
                }}};
        }
        
    }
    //@ts-ignore
    Update = async (req: Request) => {
        try {
            const {id, name, description, category, price} = req.body;
            const product = await AppDataSource.getRepository(Product).findOneByOrFail({id: id});
            await product.updateFields(
                id,
                name.trim(),
                description.trim(),
                category ? await AppDataSource.getRepository(Category).findOneByOrFail({initial: category}) : null,
                Number(price)
            )
            await AppDataSource.getRepository(Product).save(product);
            return {status: 200, value: product}
            } catch (e : any) {
                return {status: 500, value: {
                    message: {
                        "something went wrong" : (e.detail || e.message || e)
                    }}};
            }

    }
}