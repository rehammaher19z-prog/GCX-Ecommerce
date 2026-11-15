import { useEffect, useState } from "react";
import Product from "../../Component/SlideProducts/Product";
import SlideProductLoading from "../../Component/SlideProducts/SlideProductLoading";
import "./AllCatagorise.css";

export default function AllProducts() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=0")
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="all_products">
            <div className="container">

                <div className="top_slide">
                    <h2>All Products</h2>
                </div>

                {loading ? (
                    <SlideProductLoading />
                ) : (
                    <div className="products_grid">
                        {products.map((item) => (
                            <Product key={item.id} item={item} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}