
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Product from "../../Component/SlideProducts/Product";
import "./ProductCategories.css";
import ProdcutDetailsLoading from "../ProdcutDetailsLoading";
import PageTransition from "../../Component/PageTransition";

export default function ProductCategories() {

    const { categorySlug } = useParams();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(true);

        axios
         .get(`https://dummyjson.com/products/category/${categorySlug}`)
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [categorySlug]);

    return (
       
        <PageTransition>
            <div className="ProductCategories container">

            <h2>{categorySlug} : ({products.length})</h2>


            {loading ? (
              <ProdcutDetailsLoading/>
            ) : (
                <div className="Products_Grid">

                    {products.map((item) => (
                        <Product
                            key={item.id}
                            item={item}
                        />
                    ))}

                </div>
            )}
            </div>
         </PageTransition>

        
    );
}
