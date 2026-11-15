
import { useContext } from 'react';
import './Cartitem.css';
import CartContext from '../../../Component/Context/CartContext';


function CartItem({ item }) {


    const { updateQuantity, removeFromCart } = useContext(CartContext);

    return (
        <div className="Item">

            <img src={item.thumbnail} alt={item.title} />

            <div>
                <p>{item.title}</p>
                <h4>${item.price}</h4>
            </div>

            <div>
                <button
                    onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                    }
                >
                    -
                </button>

                <span>{item.quantity}</span>

                <button
                    onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                    }
                >
                    +
                </button>
            </div>

            <p>
                ${(item.price * item.quantity).toFixed(2)}
            </p>

        <button onClick={() => removeFromCart(item.id)}>
    <i className="fa-solid fa-trash"></i>
            </button>
            

        </div>
    );
}

export default CartItem;
