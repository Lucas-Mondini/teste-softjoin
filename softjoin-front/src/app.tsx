import React, { EffectCallback, useCallback, useEffect, useState } from "react";

import ProductComponent from './components/product'
import ProductAPI from "./api/products";
import { Product } from "./types/product";
import ProductsContainer from "./components/productsContainer";
import DetailComponent from "./components/detailScreen";

function App() {
    const [selected, setSelected] = useState<Product>();
    const [data, setData] = useState<any[]>([]);
    
    let canCallback = false;
    useEffect(() => {
        canCallback = true;
    }, [selected])
    const selectCallback = useCallback((callback: Function) => {
        if(canCallback) {
            callback();
            canCallback = false;
        }
    }, [selected])

    new ProductAPI().index().then((products: Array<Product>) => {
        setData(products);
    })
    return (
        <>
        <div className="container">
            <ProductsContainer data={data} setSelected={setSelected}/>
            <DetailComponent product={selected} selectCallback={selectCallback} setSelected={setSelected}/>
        </div>
        </>
    );
  }

export default App;