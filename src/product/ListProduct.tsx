import React from 'react'
import { Link } from 'react-router-dom';
import { IProduct } from '../type/product'
type typeProducts = {
    products:IProduct[];
    onRemove:(id:number)=>void
}
const ListProduct = (props:typeProducts) => {
    
  return (
    <div>
        <Link to="/add">Them moi</Link>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
      {props.products.map((item,index)=>{
          return(
            <tr>
            <th scope="row" key={index}>{index++}</th>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>
                <button onClick={()=>props.onRemove(item.id)}> xoa</button>
                <button><Link to={`/edit/${item.id}`}>Sua</Link></button>
            </td>
          </tr>
          )
      
      })}
    
   
  </tbody>
</table>

    </div>
  )
}

export default ListProduct