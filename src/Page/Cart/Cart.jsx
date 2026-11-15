
import { useContext } from 'react';
import './Cart.css';
import CartContext from '../../Component/Context/CartContext';
import CartItem from './CartITem/CartItem';
import { Link } from 'react-router-dom';

function Cart() {

    const { cartItems } = useContext(CartContext);




// reduce بتعمل loop على كل عنصر في الـ Array.
// في كل مرة بتاخد الـ total (الإجمالي السابق) والـ item (العنصر الحالي).
// بننفذ العملية المطلوبة على العنصر الحالي، ونضيف نتيجتها للـ total.
// بعد كده بتستخدم الـ total الجديد في العنصر اللي بعده.
// وفي النهاية بترجع نتيجة واحدة نهائية بدل الـ Array كلها.
// الرقم 0 هو قيمة البداية للـ total.

const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
}, 0);

    return (
        <section className="cart-hero">

            {cartItems.length === 0 ?

   
<div className="NotFound">

    <div className="flowers-background">
        {Array.from({ length: 35 }, (_, index) => (
            <span key={index}>
                {["🌸", "🌷", "🌼", "🌺", "🌻", "🌹", "💐"][
                    index % 7
                ]}
            </span>
        ))}
    </div>

    <div className="empty-cart-card">

        <div className="empty-cart-icon">
            <i className="fa-solid fa-bag-shopping"></i>
        </div>

        <h2>Your Cart is Empty!</h2>

        <p>
            Looks like you haven't added anything to your cart yet.
            Let's find something you'll love!
        </p>

        <Link to="/" className="home-btn">
            Go to Home
            <i className="fa-solid fa-arrow-right"></i>
        </Link>

    </div>

</div>

                :

                <div className="cart-hero-content">

                    <div className='Content'>
                        <h4>
                            <i
                                style={{ marginRight: "6px" }}
                                className="fa-solid fa-bag-shopping"
                            ></i>
                            Your Cart ({cartItems.length})
                        </h4>

                        <Link to="/">
                            <button style={{
                                backgroundColor: "var(--primary-color)",
                                padding: "10px 15px",
                                color: "white",
                                cursor: "pointer",
                                borderRadius: "10px"
                            }}>
                                Continue Shopping
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>
                        </Link>
                    </div>

                   
<div className='ProductCart'>

    {/* Products List */}
    <div className="CartItemsList">
        {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
        ))}
    </div>

    {/* Order Summary */}
    <div className='OrderSummary'>

        <h3>Order Summary</h3>

        <div className="SummaryRow">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="SummaryRow">
            <span>Shipping</span>
            <span>$10.00</span>
        </div>

        <div className="SummaryRow">
            <span>Discount</span>
            <span>$0.00</span>
        </div>

        <hr />

        <div className="SummaryTotal">
            <span>Total</span>
            <span>${(subtotal + 10).toFixed(2)}</span>
        </div>

        <button className="CheckoutBtn">
            Proceed to Checkout
            <i className="fa-solid fa-arrow-right"></i>
        </button>

        <button className="CouponBtn">
            <i className="fa-solid fa-tag"></i>
            Apply Coupon
        </button>

    </div>

</div>


                </div>

            }

        </section>
    );
}

export default Cart;
