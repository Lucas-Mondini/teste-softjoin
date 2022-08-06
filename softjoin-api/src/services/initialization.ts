import { AppDataSource } from "../data-source";
import 'dotenv/config';
import {Category, CategoryEnum} from "../model/product/category";

async function initializeCategories() {
    console.log("trying to find categories");
    const category = await AppDataSource.getRepository(Category).find();
    if(category.length > 0) {
        console.log(`${category.length} categories found, proceding with initialization`)
        return 0
    }

    console.log("no category found, creating default categories")
    
    const categories = [
        new Category(CategoryEnum.E),
        new Category(CategoryEnum.L),
        new Category(CategoryEnum.I),
        new Category(CategoryEnum.M)
    ]
    await AppDataSource.getRepository(Category).save(categories);
}

export default async function () {
    await initializeCategories();
}