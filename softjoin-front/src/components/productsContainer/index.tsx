import React, { useEffect, useState } from "react";

import ProductComponent from '../product'
import ProductAPI from "../../api/products";
import { Product } from '../../types/product'
import Styled from 'styled-components'
import colors from '../colors'

const Div = Styled.div`
    width: 100%;
    flex: 3;
    margin: 0, 10%;
    background-color: ${colors.primary};
`
const Table = Styled.table`
    width: 100%;
    border-collapse: collapse;
    >tr {
        cursor: pointer;
        :hover {
            background-color: ${colors.tertiary};
        }
        :active {
            background-color: ${colors.secondary};
        }
        :nth-child(odd) {
            background-color: ${colors.quaternary};
            :hover {
                background-color: ${colors.tertiary};
            }
            :active {
                background-color: ${colors.secondary};
            }
        }
    }
`

const Tr = Styled.tr`
    background-color: ${colors.primary};
`
const Th = Styled.th`
    background-color: ${colors.quinary};
`

new ProductAPI().index()
export default ({ data, setSelected }: { data: Product[], setSelected: Function }) => {
    data.sort((i, j)=> i.id - j.id);
    return (
        <Div>
            <Table>
                <Tr>
                    <Th>id</Th>
                    <Th>Nome</Th>
                    <Th>Categoria</Th>
                    <Th>Preço</Th>
                </Tr>
                {
                    data.map((product :Product) => {
                        return (
                            <ProductComponent product={product} setSelected={setSelected}/>)
                    })
                }
            </Table>
        </Div>
    );
}