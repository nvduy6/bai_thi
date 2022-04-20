import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useForm,SubmitHandler} from 'react-hook-form';
import {useNavigate, useParams} from "react-router-dom"
import { IProduct } from '../type/product';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
type ProductEditProps={
    onUpdate:(products:IProduct)=>void;
}
type typeInpust ={
    name:string,
    price:number
}
const EditProduct = (props:ProductEditProps) => {
  const schema = yup.object({
    name:yup.string().required(),
    price:yup.number().required()
  }).required()
const {register,handleSubmit,formState:{errors},reset} =useForm<typeInpust>({resolver:yupResolver(schema)});
const navigate = useNavigate();
const {id} = useParams();
const [product,setProduct]=useState<typeInpust[]>([]);
useEffect(()=>{
    const getProducts = async ()=>{
        const {data} = await axios.get("http://localhost:3001/products/"+id);
        reset(data);
        setProduct(data);
    }
    getProducts()
},[])
const onSubmit:SubmitHandler<typeInpust>=data=>{
    props.onUpdate(data);
    navigate("/home")
}
    return (
    <div><form onSubmit={handleSubmit(onSubmit)}>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
      <input type="text" {...register("name")}   />
      <p>{errors.name?.message}</p>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Price</label>
      <input type="number" {...register("price")} />
      <p>{errors.price?.message}</p>
    </div>
    
    <button type="submit" className="btn btn-primary">Submit</button>
  </form></div>
  )
}

export default EditProduct