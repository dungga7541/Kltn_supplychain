import React, { useState,useEffect } from 'react';
import user from './User.module.css'
import UploadFile from "../DragDrop/UploadFile.js";
import TimeLine from "../TimeLine/TimeLine.js";
import Button from '@mui/material/Button';
import Card from '../Card/Card';
import dataUser from "../../data/dataUser.json";
import Web3 from "web3";

const User = () => {
  //web3
  const web3 = new Web3(Web3.givenProvider || "HTTP://127.0.0.1:8545");
  const [count, setCount] = useState(0);
  const [infoUser, setInfoUser] = useState({
    nameProduct: dataUser[0].nameProduct,
    date: dataUser[0].date,
    expDate: dataUser[0].expDate,
    urlImg:dataUser[0].urlImg,
    uploadDate:dataUser[0].uploadDate,
    infoProduct:dataUser[0].infoProduct
  });

  //chuyển leaf
  useEffect(() => {
    window.localStorage.setItem("info",leafss);
  })
  const leafss = web3.utils.soliditySha3(infoUser);

  //lấy kết quả
  const result = localStorage.getItem("result");
  const [rsVerify, setRsVerify] = useState(result);

  const [info, setInfo] = useState({
    "nameProduct": "",
    "date": "",
    "expDate": "",
    "result": null,
    "urlImg":"",
    "uploadDate":"",
    "infoProduct":""
  });

  //show info
  const handleShow = () => {
    if (rsVerify === "true") {
      const calcvalue = {
        nameProduct: dataUser[0].nameProduct,
        date: dataUser[0].date,
        expDate: dataUser[0].expDate,
        result: true,
        urlImg:dataUser[0].urlImg,
        uploadDate:dataUser[0].uploadDate,
        infoProduct:dataUser[0].infoProduct
    }
    setInfo ({
      ...calcvalue
    });
  } else {
    const calcvalues = {
      "nameProduct": "",
      "date": "",
      "expDate": "",
      "result": false,
      
      "imgUrl":"",
      "uploadDate":"",
      "infoProduct":""
    };
    setInfo({
      ...calcvalues
    })
  }
}

return (
    <div className={user.container}>
      <div className={user.top_container}>
        <div className={user.left_container} onClick={() => setCount(count + 1)}>
          <UploadFile/>
        </div>
        <div className={user.btn_verify} onClick={() => setCount(count + 1)}><Button variant="contained" onClick={handleShow}>Xác thực</Button></div>
        <div className={user.right_container}>
          {info.result == null?"": <Card infos={info}/>}
        </div>
      </div>
      <div className={user.bottom_container}>
        <TimeLine counts={count} />
      </div>
    </div>
  );
}

export default User;