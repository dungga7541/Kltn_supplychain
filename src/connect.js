import React from 'react';
import  style from "./manufacturer.module.css";
import { BrowserRouter as Router, Route,Switch,Link } from 'react-router-dom';
import Add from "./AddProduct/Add";
import { Button } from '@mui/material';
import Table from "./Table/Table.js";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { getValue } from '@testing-library/user-event/dist/utils';


function Manufacturer(){
    const {MerkleTree} = require('merkletreejs')

    const [arrayData, setArray] = useState([]);
    const keccak256 = require('keccak256')

        const { register, handleSubmit } = useForm();
        const onSubmit = (data) => {
            setArray(oldArray => [...oldArray, data]);
        }
        const leaves = Object.keys(arrayData).map(v => keccak256(v));
        console.log(leaves);
        const tree = new MerkleTree(leaves, keccak256,{ sort: true })
    // MerkleTree.print(tree)

    const root = tree.getHexRoot();
    console.log(root)
        return (
            <div className={style.container}>          
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.form_container}>
                    <a className={style.form_title}>Form thêm sản phẩm</a>
                    <div className={style.middle_content}>
                            <div className={style.left_form}>
                                <div className={style.left_form_component}>
                                    <div className={style.left_title}>
                                        <p>Tên sản phẩm</p>
                                    </div>
                                    <div className={style.left_input}>
                                        <input {...register("nameProduct")}/>
                                    </div>
                                </div>
                                <div className={style.left_form_component}>
                                    <div className={style.left_title}>
                                        <p>Ngày sản xuất</p>
                                    </div>
                                    <div className={style.left_input}>
                                        <input {...register("date")} />
                                    </div>
                                </div>
                                <div className={style.left_form_component}>
                                    <div className={style.left_title}>
                                        <p>Ngày hết hạn</p>
                                    </div>
                                    <div className={style.left_input}>
                                        <input {...register("expDate")}/>
                                    </div>
                                </div>
                            </div>
                            <div className={style.right_form}>
                                <div className={style.right_form_component}>
                                    <div className={style.right_title}>
                                        <p>Url hình ảnh sản phẩm</p>
                                    </div>
                                    <div className={style.right_input}>
                                        <input {...register("urlImg")}/>
                                    </div>
                                </div>
                                <div className={style.right_form_component}>
                                    <div className={style.right_title}>
                                        <p>Ngày đăng</p>
                                    </div>
                                    <div className={style.right_input}>
                                        <input {...register("uploadDate")}/>
                                    </div>
                                </div>
                                <div className={style.right_form_component}>
                                    <div className={style.right_title}>
                                        <p>Thông tin sản phẩm</p>
                                    </div>
                                    <div className={style.right_input}>
                                        <input {...register("infoProduct")}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.actions}>
                    <div className={style.left_btn}>
                        <button className={style.cancel_button}>Hủy bỏ</button>
                    </div>
                    <div className={style.right_btn}>
                        <button type='submit' className={style.add_device_button} >Thêm thiết bị</button>
                    </div>
                </div>
                
            </div>           
            </form> 
            <div><table>
                <thead>
                <tr>
                    <th>Mã dịch vụ</th>
                    <th>Tên dịch vụ</th>
                    <th>Mô tả</th>
                </tr>
                </thead>
                <tbody>
                    {arrayData.map(item => {
                    return (
                        <tr key={item.nameProduct}>
                        <td>{ item.nameProduct }</td>
                        <td>{ item.expDate }</td>
                        <td>{ item.date }</td>
                        <td>{ item.infoProduct }</td>
                        </tr>
                    );
                    })}
                </tbody>
</table></div>
            </div>
        );
}


export default Manufacturer;