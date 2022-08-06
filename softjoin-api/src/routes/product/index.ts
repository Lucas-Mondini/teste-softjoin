import ProductView from "../../view/product";
import RouterConstructor from "../RouterConstructor";
const productRouter = RouterConstructor.getCRUD(new ProductView());

export default productRouter;