
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../Context/CartContext";
import FavContext from "../Context/FavContext";

export default function Product({ item }) {

    const { cartItems, addTocart } = useContext(CartContext);
    const { FavItems, addToFav } = useContext(FavContext);

    console.log(cartItems);

    // التحقق هل المنتج موجود في السلة
    const isAdded = cartItems.some(
        (product) => product.id === item.id
    );

    // التحقق هل المنتج موجود في المفضلة
    const isFavorite = FavItems.some(
        (product) => product.id === item.id
    );

    return (
        <div className={`Product ${isAdded ? 'in-cart' : ''}`}>

            <Link to={`/products/${item.id}`} className="product_link">

                <div className="cart-wrapper">
                    <span className={`cart-tooltip ${isAdded ? "show" : ""}`}>
                        <i className="fa-solid fa-check"></i>
                        Item in Cart
                    </span>
                </div>

                <div className="img_pro">
                    <img src={item.images[0]} alt={item.title} />
                </div>

                <p className="name_product">{item.title}</p>

                <div className="stars">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <span>{item.rating}</span>
                </div>

                <p className="price_product">
                    ${item.price}
                </p>

            </Link>

            <div className="icons">

                {/* Cart Icon */}
                <i
                    onClick={() => addTocart(item)}
                    className={`fa-solid fa-cart-shopping ${isAdded ? "added" : ""}`}
                ></i>

                {/* Favorite Icon */}
                <i
                    onClick={() => addToFav(item)}
                    className={`fa-regular fa-heart ${isFavorite ? "active" : ""}`}
                ></i>

                {/* Share Icon */}
                <i className="fa-solid fa-share-nodes"></i>

            </div>

        </div>
    );
}
