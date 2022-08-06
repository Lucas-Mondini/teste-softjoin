import React from "react"
import ProductAPI from "../../api/products"
import { Product } from "../../types/product"
import formatNumber from "../../utils/format/money"

const ProductComponent = ({ product, setSelected }: { product: Product, setSelected: Function }) => {
    let priceStr = String(product.price);
    const length = priceStr.length;
    priceStr =  priceStr.substring(0, length-2) + "." + priceStr.substring(length-2, priceStr.length)
    priceStr = Number(priceStr).toFixed(2)

    return (
        <>
            <tr className="product" onClick={() => setSelected(product)} >
                <td className="product-props" id="id">{product.id}</td>
                <td className="product-props" id="name">{product.name}</td>
                <td className="category" id="category">{product.categoryInitial}</td>
                <td className="product-props" id="price">{priceStr}</td>
            </tr>
            
        </>)
}
export default ProductComponent;