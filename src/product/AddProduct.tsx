import React from 'react'
import { IProduct } from '../type/product'
import {useForm,SubmitHandler} from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
type ProductAddProps={
    onAdd:(product:typeInpust)=>void;
}
type typeInpust ={
    name:string,
    price:number
}
const AddProduct = (props:ProductAddProps) => {
  const schema = yup.object({
name:yup.string().required(),
price:yup.number().required(),

  }).required()
    const {register,handleSubmit,formState:{errors}}=useForm<typeInpust>({resolver:yupResolver(schema)});
    const navigate = useNavigate();
    const onSubmit:SubmitHandler<typeInpust>=data=>{
        props.onAdd(data);
        navigate("/home");
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
</form>
</div>
  )
}

export default AddProduct