import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Product} from "..";

enum CategoryEnum {
    E = 1,
    L,
    M,
    I
}

@Entity()
class CategoryModel {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column({nullable: false, unique: true})
    readonly name: String;

    @Column({nullable: false, unique: true})
    readonly initial: String;
    


    @OneToMany(()=>Product, (product) => product.category)
    products: Product[];

    constructor(category: CategoryEnum) {
        switch(category) {
            default:
            case CategoryEnum.E:
                this.name       = "Eletrodoméstico"
                this.initial    = "E"
                break;
            case CategoryEnum.L:
                this.name       = "Limpeza"
                this.initial    = "L"
                break;
            case CategoryEnum.M:
                this.name       = "Móveis"
                this.initial    = "M"
                break;
            case CategoryEnum.I:
                this.name       = "Informática"
                this.initial    = "I"
                break;
        }
    }
}
export {
    CategoryModel as Category,
    CategoryEnum
}

//categorie	Lista de opções, obrigatório. (E = Eletrodoméstico | L = Limpeza | M = Móveis | I = Informática)