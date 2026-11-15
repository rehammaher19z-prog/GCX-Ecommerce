import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./ProductDetails.css";

import SlidProduct from "../Component/SlideProducts/SlidProduct";
import ProdcutDetailsLoading from "./ProdcutDetailsLoading";
import SlideProductLoading from "../Component/SlideProducts/SlideProductLoading";
import CartContext from "../Component/Context/CartContext"
import PageTransition from "../Component/PageTransition";

export default function ProductDetails(  ) {
    const [pro, setpro] = useState(null);
    const [Loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [selectedImage, setSelectedImage] = useState("");

    const [relatedpro, setrelatedpro] = useState([]);
    const [LoadingRelated, setLoadingRelated] = useState(true);

  const { cartItems, addTocart } = useContext(CartContext)


const isAdded = cartItems.some(
    (product) => product.id === pro?.id
);


    const { id } = useParams();

    // Fetch Product Details
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(false);
            setpro(null);
            setSelectedImage("");

            try {
                const res = await fetch(
                    `https://dummyjson.com/products/${id}`
                );

                if (!res.ok) {
                    throw new Error("Product not found");
                }

                const data = await res.json();

                setpro(data);
                setSelectedImage(data.images[0]);
            } catch (error) {
                console.log(error);
                setError(true);
                setpro(null);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Fetch Related Products
    useEffect(() => {
        if (!pro) return;

        const fetchRelatedProducts = async () => {
            setLoadingRelated(true);
            setrelatedpro([]);

            try {
                const res = await fetch(
                    `https://dummyjson.com/products/category/${pro.category}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch related products");
                }

                const data = await res.json();

                // Remove current product from related products
                const filteredProducts = data.products.filter(
                    (item) => item.id !== pro.id
                );

                setrelatedpro(filteredProducts);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingRelated(false);
            }
        };

        fetchRelatedProducts();
    }, [pro?.category, pro?.id]);

    // Loading
    if (Loading) {
        return <ProdcutDetailsLoading />;
    }

    // Error
    if (error || !pro) {
        return <p className="product_error">Product not found</p>;
    }

    return (
        <PageTransition>
            <div className="item_details">
                <div className="container">

                    {/* Product Images */}

                    <div className="img_item">

                    

                        <div className="small_img">
                            {pro.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={pro.title}
                                    onClick={() => setSelectedImage(img)}
                                    className={
                                        selectedImage === img
                                            ? "active"
                                            : ""
                                    }
                                />
                            ))}
                        </div>


                         <div className="big_imag">
                            <img
                                src={selectedImage}
                                alt={pro.title}
                            />
                        </div>

                    </div>

                    {/* Product Information */}

                    <div className="deatils_item">

                        <h1 className="name">
                            {pro.title}
                        </h1>

                        <div className="stars">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-regular fa-star"></i>
                        </div>

                        <div className="price">
                            ${pro.price}
                        </div>

                        <h5>
                            Availability:
                            <span>{pro.availabilityStatus}</span>
                        </h5>

                        <p>{pro.description}</p>

                        <p>
                            Rating: {pro.rating} / 5
                        </p>

                        <p>
                            Brand: {pro.brand || "Not specified"}
                        </p>

                        <p>
                            Category: {pro.category}
                        </p>

                        <span>
                            Stock: {pro.stock}
                        </span>

<button
    className={`Btn ${isAdded ? "added" : ""}`}
    onClick={() => addTocart(pro)}
>
    Add To Cart
    <i className="fa-solid fa-cart-shopping"></i>
</button>

                    </div>

                </div>
            </div>

            {/* Related Products */}

            {LoadingRelated ? (
                <SlideProductLoading />
            ) : (
                relatedpro.length > 0 && (
                    <SlidProduct
                        key={pro.category}
                        title={pro.category}
                        data={relatedpro}
                    />
                )
            )}
        </PageTransition>
    );
}