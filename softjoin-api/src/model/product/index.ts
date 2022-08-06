import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AppDataSource } from "../../data-source";
import { In } from "typeorm";
import {Category} from "./category";


@Entity()
class ProductModel {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column({nullable: false})
    name: string;

    @Column()
    description: string;
    
    @ManyToOne(()=> Category, (category)=>category.products)
    category: Category;

    @Column({nullable: false})
    price: Number;

    @CreateDateColumn()
    created_at: Date;

    private constructor(name: string, description: string, category: Category, price: number) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
    }

    static New = async (name: string, description: string, category: Category, price: number) => {
        const found = await AppDataSource.getRepository(ProductModel).find({where: {name: name}, relations: ["category"]})
        for (const i of found) {
            if(i.category.id == category.id)
                throw "Cannot have the same name and category"
        }
        if(name === "")
            throw "Name cannot be empty"

        return new ProductModel(name, description, category, price);
    }

    async updateFields(
                    id: number,
                    name: string | null | undefined,
                    description: string | null | undefined,
                    category: Category | null | undefined,
                    price: number | null | undefined
                ) {
        const found = await AppDataSource.getRepository(ProductModel).find({where: {name: (name ? name : this.name)}, relations: ["category"]})
        for (const i of found) {
            if(i.category.id == (category? category.id : this.category) && i.id != id)
                throw "Cannot have the same name and category"
        }
        this.name = name || this.name;
        this.description = description || "";
        this.category = category || this.category;
        this.price = price || this.price;
    }
}
export {
    ProductModel as Product
}