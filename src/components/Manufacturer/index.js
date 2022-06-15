import React, { useState,useEffect } from 'react';
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';
import style from "./Manufacturer.module.css";
import { useForm } from "react-hook-form";
import abiRoot from "../../contracts/MTRootHash.json";
import abiVerify from "../../contracts/MerkleProof.json";

function Manufacturer(){
    //id
    const uuidv4 = require("uuid/v4")
    uuidv4()

    // kết nối metamask
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    const [account,setAccount] = useState(null);
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
    });
    if(window.ethereum){
        try {
            useEffect(() => {
                const loadProvider = async () => {
                    const provider = await detectEthereumProvider();
                    if (provider) {
                        setWeb3Api({
                            web3: new Web3(provider),
                            provider,
                        })
                    } else {
                        console.error("please Install Metamask")
                    }
                }
                loadProvider()
            },[]);
    //Lấy địa chỉ ví
            useEffect (() => {
                const getAccount = async () => {
                    const accounts = await web3Api.web3.eth.getAccounts();
                    setAccount(accounts[0]);
                }
                web3Api.web3 && getAccount()
            },[web3Api.web3]);
        } catch {
            console.log("Error connecting...");
        }
    } else {
        alert("Metamask is not detected!");
    }

    const [arrayProduct, setArrayProduct] = useState([]);
    const [arrayData, setArray] = useState([]);
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        const datass = web3.utils.soliditySha3(data);
        console.log(datass);
        setArrayProduct(oldArray => [...oldArray, data]);
        setArray(oldhashArray => [...oldhashArray, datass]);    
    }

    //cây merkle
    const {MerkleTree} = require('merkletreejs');
    const keccak256 = require('keccak256');
    const leaves = arrayData.map(v => keccak256(v));
    const tree = new MerkleTree(leaves, keccak256,{ sort: true })
    MerkleTree.print(tree);
    
    //root, leaf, proof
    const root = tree.getHexRoot();
    const info = window.localStorage.getItem("info");
    const leaf = keccak256(info);
    const proof = tree.getHexProof(leaf);

    //set root
    const [currentBlock, setCurrrentBlock] = useState();
    const contractRoot = new web3.eth.Contract(abiRoot.abi,"0x2a8134E8fA7AC4209005d0e5214da68D520e0634");
    const setRoot = async() => {
        const gas = await contractRoot.methods.setMTRoot(root).estimateGas();
        const setRootSM = await contractRoot.methods.setMTRoot(root).send({from: account, gas},function(error, gl){
            if(!error){
                const blockCurrent = web3.eth.getBlockNumber();
                for (var i=blockCurrent; i >= 0; i++){
                    gl = web3.eth.getBlock(i+1);
                }
                setCurrrentBlock(gl);
            } else {
                console.error(error);
            }
        });
    }

    //setItem local Storage
    useEffect(() => {
        window.localStorage.setItem("idBlock",currentBlock);
        window.localStorage.setItem("proof", proof);
        window.localStorage.setItem("root", root);
        window.localStorage.setItem("result", rsVerify);
    })

    //Verify
    const [rsVerify, setRsVerify] = useState(null);
    const contractVerify = new web3.eth.Contract(abiVerify.abi, "0x745749D2037813A0dcb80e870E2449C20df9996c");
    useEffect(() => {
        async function Verify() {
            const verified = await contractVerify.methods.verify(root, leaf, proof).call();
            setRsVerify(verified);
        }
        Verify()
    });

    return (
        <div className={style.container}>
            <div className={style.account}>
                <p className={style.test1}>
                    <span className={style.ellipsis}>{account ? account: ""}</span>
                    <span className={style.indent}>{account ? account: ""}</span>
                </p>
                <button className={style.btn_account} onClick={() => web3Api.provider.request({method:"eth_requestAccounts"})}>
                    Connect Wallets
                </button>
            </div>
            <form onSubmit = { account === "0xb5Fe939bD24eb8d2045191d5145FcA83b079F78C" ? handleSubmit(onSubmit):"" }>
                <div className={style.form_container}>
                    <div  className={style.form_title}>
                        <a>Thêm sản phẩm</a>
                    </div>
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
                                    <p>Hình ảnh sản phẩm</p>
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
                            <button type='submit' className={style.add_device_button} 
                                onClick = {setRoot}>
                                Thêm sản phẩm
                            </button>
                            
                        </div>
                    </div>
                </div>           
            </form> 
            <div >
                <table className={style.table_device}>
                    <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Ngày sản xuất</th>
                        <th>Ngày đăng</th>
                        <th>Hính ảnh</th>
                        <th>Thông tin sản phẩm</th>
                    </tr>
                    </thead>
                    <tbody>
                        {arrayProduct.map(item => {
                        return (
                            <tr key={uuidv4 }>
                                <td>{ item.nameProduct }</td>
                                <td>{ item.date }</td>
                                <td>{ item.uploadDate }</td>    
                                <td>{ item.urlImg }</td>
                                <td>{ item.infoProduct }</td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default Manufacturer;