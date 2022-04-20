import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { NavLink, Route, Router, Routes } from 'react-router-dom'
import type { IProduct } from './type/product'
import axios from 'axios'
import ListProduct from './product/ListProduct'
import AddProduct from './product/AddProduct'
import EditProduct from './product/EditProduct'
import { notification, } from 'antd';
function App() {
  const [count,setcount]=useState(0)
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get("http://localhost:3001/products");
      setProducts(data)
    }
    getProduct()
  }, [])
  const onHandlerAdd =  async (product:IProduct)=>{
    const {data}=  await axios.post("http://localhost:3001/products",product);
setProducts([...products,data])
  }
  const onHandlerUpdate = async (product:IProduct)=>{
    const {data} = await axios.put("http://localhost:3001/products/"+product.id,product);
    setProducts(products.map(item=>item.id==data.id?data:item))
  }
  const onHamdlerRemove= (id:number)=>{
    axios.delete("http://localhost:3001/products/"+id)
    setProducts(products.filter(item=>item.id!==id))
  }

  // 
   
  return (
    
    <div className="App">
      <main>
        <Routes >
          <Route path='/home' element={<ListProduct products={products} onRemove={onHamdlerRemove} />} />
          <Route path='/add' element={< AddProduct onAdd={onHandlerAdd} />}/>
          <Route path="/edit/:id" element={< EditProduct onUpdate={onHandlerUpdate}/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App
