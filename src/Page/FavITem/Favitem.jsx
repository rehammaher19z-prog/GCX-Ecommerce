
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import FavContext from "../../Component/Context/FavContext";
import CartContext from "../../Component/Context/CartContext";
import './favitem.css'
import ButtonIsRed from "../../Component/ButtonIsRed/ButtonIsRed";
function Favitem({ item }) {

    const { removeFromFav } = useContext(FavContext);

const { addTocart, cartItems } = useContext(CartContext);

const isAdded = cartItems.some(
    product => product.id === item.id
);

    const navigate = useNavigate();

    return (
  <div className="FavItem">

            <img src={item.thumbnail} alt={item.title} />

            <div className="FavItemInfo">
                <h4>{item.title}</h4>
                <p>${item.price}</p>
            </div>

            <div className="FavItemActions">

<ButtonIsRed
    isAdded={isAdded}
    onClick={() => {
        addTocart(item);
        navigate("/cart");
    }}
    icon="fa-solid fa-cart-shopping"
>
    Add To Cart
</ButtonIsRed>
                

                <button onClick={() => navigate(`/products/${item.id}`)}>
                    View Details
                </button>

                <button onClick={() => removeFromFav(item.id)}>
                    <i className="fa-solid fa-trash"></i>
                </button>

            </div>

        </div>
    );
}

export default Favitem;
