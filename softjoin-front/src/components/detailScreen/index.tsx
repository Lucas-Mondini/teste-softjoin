import React, { useState } from "react"
import ProductAPI from "../../api/products"
import { Product } from "../../types/product"

import Styled from 'styled-components'
import colors from '../colors'
import formatNumber from "../../utils/format/money"


const Div = Styled.div`
    width: 100%;
    flex: 1.2;
    background-color: ${colors.quaternary};
    display: inline-flex;
    flex-wrap: wrap;
`

const inputs = `
        padding: 2px;
        height: 30px;
        margin: 2px;
        background: ${colors.primary};
        border: none;
        border-radius: 3px;
        color: ${colors.text};
        ::placeholder {
            color: ${colors.text};
        }
        :disabled {
            background: ${colors.quinary};
        }
        :hover {
            background: ${colors.secondary};
        }
        :active {
            background: ${colors.tertiary};
        }
        ::-webkit-outer-spin-button,
        ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
`

const TextArea = Styled.textarea`
    padding: 2px;
    height: 90px;
    margin: 2px;
    background: ${colors.primary};
    border: none;
    border-radius: 3px;
    color: ${colors.text};
    ::placeholder {
        color: ${colors.text};
    }
    :disabled {
        background: ${colors.quinary};
    }
    :hover {
        background: ${colors.secondary};
    }
    :active {
        background: ${colors.tertiary};
    }
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
`

const Input = Styled.input`
${inputs}
`;

const Select = Styled.select`
${inputs}
`;

const Option = Styled.option`
${inputs}
`;

const Button = Styled.button`
${inputs}
`

const Label = Styled.label`
    text-align: left;
    margin-left: 10px;
`

const Tr = Styled.tr`
   display: flex;
   flex: 1;
   flex-direction: column;
`;

const DetailComponent = ({product, selectCallback, setSelected}: {product: Product | undefined, selectCallback: Function, setSelected: Function}) => {

    const [category, setSelectCategory] = useState<any>(product?.categoryName);
    const [name, setName] = useState<any>(product?.name);
    const [description, setDescription] = useState<any>(product?.description);
    const [price, setPrice] = useState<any>(product?.price);

    const newProduct = async () => {
        let res
        res = await new ProductAPI().create({
            name: name,
            description: description,
            category: category.charAt(0).toUpperCase(),
            price: Number(price.replace('.', ""))
        }).catch(i => {
            alert(JSON.stringify(i.response.data.message));
        });
        if(res.status == 200)
            setSelected(await new ProductAPI().get(res.data.id))
    }
    const updateProduct = async () => {
        let res
        res = await new ProductAPI().update({
            id: product?.id,
            name: name,
            description: description,
            category: category.charAt(0).toUpperCase(),
            price: Number(price.replace('.', ""))
        }).catch(i => {
            alert(JSON.stringify(i.response.data.message));
        });
        if(res.status == 200)
            setSelected()
    }
    const deleteProduct = async () => {
        let res
        res = await new ProductAPI().delete(product?.id).catch(i => {
            alert(JSON.stringify(i.response.data.message));
            res = i.response
        });
        if(res.status == 200)
            setSelected()
    }

    const clearOnChangeState = () => {
        const valuesToClear = [].slice.call(document.querySelectorAll(".clearOnChangeState"))
        valuesToClear.forEach((i: any) => {
            i.value = ""
        })
    }

    const validate = (event: any) => {
        const element = event.target;
        if (Number(element.value < 1)) {
            element.value = "0";
        }
        element.value = formatNumber(Number(element.value));
        setPrice(formatNumber(Number(element.value)))
    }

    function formatDate(date: string | null | undefined){
        var data = date? new Date(date) : new Date(),
            day  = data.getDate().toString(),
            dayF = (day.length == 1) ? '0'+day : day,
            month  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            monthF = (month.length == 1) ? '0'+month : month,
            yearF = data.getFullYear();
        return dayF+"/"+monthF+"/"+yearF;
    }

    selectCallback(()=> {
        clearOnChangeState();
        setSelectCategory(product?.categoryName)
        setName(product?.name)
        setDescription(product?.description)
        setPrice(product?.price)
    })

    let priceStr = ""
    if(product) {
        priceStr = String(product.price);
        const length = priceStr.length;
        priceStr =  priceStr.substring(0, length-2) + "." + priceStr.substring(length-2, priceStr.length)
        priceStr = Number(priceStr).toFixed(2)
    }
    return (
        <>
        <Div>
            <Tr className="product">
                <Label htmlFor="id">id:</Label>
                <td>
                    <Input id="id" className="clearOnChangeState" type={"number"} placeholder={product?.id.toString()} disabled/>
                </td>
                <Label htmlFor="name">name:</Label>
                <td>
                    <Input id="name" className="clearOnChangeState" placeholder={product?.name}
                    value={name} onChange={event => setName(event.target.value)}/>
                </td>
                <Label htmlFor="price">price:</Label>
                <td>
                    <Input id="price" className="clearOnChangeState" type="number" pattern="^\d*(\.\d{0,2})?$" onChange={(e)=> {validate(e)}} placeholder={priceStr}/>
                </td>
                <Label htmlFor="createdAt">created Date:</Label>
                <td>
                    <Input id="createdAt" className="clearOnChangeState" placeholder={formatDate(product?.createdAt)} disabled/>
                </td>
                <Label htmlFor="description">description:</Label>
                <td>
                    <TextArea id="description" className="clearOnChangeState" placeholder={product?.description}
                    value={description} onChange={event => setDescription(event.target.value)}/>
                </td>
                </Tr>
                <Tr>
                <td>
                    <div>
                        <Label htmlFor="category">category:</Label>
                        <Select id="category" className="clearOnChangeState category" value={category} onChange={event => setSelectCategory(event.target.value)} >
                            <Option value="Eletrodoméstico">Eletrodoméstico</Option>
                            <Option value="Limpeza">Limpeza</Option>
                            <Option value="Informática">Informática</Option>
                            <Option value="Móveis">Móveis</Option> 
                        </Select>
                    </div>
                    </td>
                </Tr>
                <Tr>
                    <Button onClick={newProduct}>new</Button>
                    <Button onClick={updateProduct} hidden={product? false : true}>save</Button>
                    <Button onClick={deleteProduct} hidden={product? false : true}>delete</Button>
                </Tr>
            </Div>
        </>)
}
export default DetailComponent;