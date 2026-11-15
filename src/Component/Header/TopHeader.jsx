
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../img/logo.png';
import './Header.css';
import CartContext from '../Context/CartContext';
import FavContext from '../Context/FavContext';
import FavInCart from '../../Page/FavITem/Favitemincart';
import SearchBox from './SearchBox'

export default function TopHeader() {

    const { FavItems } = useContext(FavContext);
    const { cartItems } = useContext(CartContext);

    const [showFavorite, setShowFavorite] = useState(false);

    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        document.documentElement.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <>
            <div className="Top">

                <div className="container">

                    <Link to="/">
                        <img src={Logo} alt="logo" />
                    </Link>

                  <SearchBox/>
                    

                    <div className="Icon">

                        <button
                            className="Theme"
                            type="button"
                            onClick={() => setDarkMode(!darkMode)}
                            aria-label="Toggle dark mode"
                        >
                            <i className={`fa-solid ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
                        </button>

                        <button
                            className="Fav"
                            aria-label="Favorites"
                            onClick={() => setShowFavorite(true)}
                        >
                            <i className="fa-regular fa-heart"></i>
                            <span className="count">{FavItems.length}</span>
                        </button>

                        <button className="Cart" aria-label="Shopping cart">
                            <Link to="/cart">
                                <i style={{ color: "white" }} className="fa-solid fa-cart-shopping"></i>
                                <span className="count">{cartItems.length}</span>
                            </Link>
                        </button>

                    </div>

                </div>

            </div>

            {showFavorite && (
                <FavInCart
                    onClose={() => setShowFavorite(false)}
                />
            )}

        </>
    );
}
