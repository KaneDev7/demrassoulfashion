

function Product_item ({produit} ){

    return <li> 
            <div className="image">  <img src={require(`./images/${produit.imgSrc}`)} alt='' /> </div>
            <div className="desription"> <p> {produit.description} </p> </div>
         </li>
}
export default Product_item