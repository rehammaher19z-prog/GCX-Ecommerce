
import { useContext } from "react";
import FavContext from "../../Component/Context/FavContext";
import Favitem from "./Favitem";
import "./Favitemincart.css";

function FavInCart({ onClose }) {

    const { FavItems } = useContext(FavContext);

    return (
        <div className="FavOverlay">

            <div className="FavInCart">

                {/* Wishlist Header */}
                <div className="FavHeader">

                    <div className="FavTitle">

                        <h2>My Wishlist</h2>

                        <span className="FavCount">
                            {FavItems.length} Items
                        </span>

                    </div>

                    <div className="FavHeaderActions">

                        <button className="ShareBtn">
                            <i className="fa-solid fa-share-nodes"></i>
                            Share
                        </button>

                        <button
                            className="CloseBtn"
                            onClick={onClose}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                    </div>

                </div>

                {/* Wishlist Products */}
                <div className="FavItemsList">

                    {FavItems.length > 0 ? (

                        FavItems.map(item => (
                            <Favitem
                                key={item.id}
                                item={item}
                            />
                        ))

                    ) : (

                        <div className="EmptyFav">
                            <i className="fa-regular fa-heart"></i>
                            <h3>Your Wishlist Is Empty</h3>
                            <p>Start adding your favorite products!</p>
                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default FavInCart;
