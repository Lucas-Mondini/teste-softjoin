import View from "..";
import { Controller } from "../../controller";
import ProductController from "../../controller/product";

export default class ProductView extends View {
    constructor() {
        super();
        this.controllerObject = new ProductController();
    }
}