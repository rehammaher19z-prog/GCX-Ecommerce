import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageTransition from "../../Component/PageTransition";
import Product from "../../Component/SlideProducts/Product";
import "./SearchPage.css";

export default function SearchPage() {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search).get("queryParams") || "";

    useEffect(() => {

const FetchResult = async () => {
    setLoading(true);
    setError(false);

    try {
        const categoriesRes = await fetch(
            "https://dummyjson.com/products/category-list"
        );

        if (!categoriesRes.ok) {
            throw new Error("Failed to fetch categories");
        }

        const categories = await categoriesRes.json();

        const matchedCategory = categories.find(
            (category) =>
                category.toLowerCase() === queryParams.trim().toLowerCase()
        );

        let res;

        if (matchedCategory) {
            // لو البحث عن Category
            res = await fetch(
                `https://dummyjson.com/products/category/${encodeURIComponent(matchedCategory)}`
            );
        } else {
            // لو البحث عن اسم منتج
            res = await fetch(
                `https://dummyjson.com/products/search?q=${encodeURIComponent(queryParams)}&limit=100`
            );
        }

        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        setResult(data.products || []);

    } catch (error) {
        console.error("Error fetching search results:", error);
        setResult([]);
        setError(true);

    } finally {
        setLoading(false);
    }
};


        if (queryParams.trim()) {
            FetchResult();
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setResult([]);
            setLoading(false);
        }

    }, [queryParams]);

    return (
        <PageTransition key={queryParams}>
            <div className="SearchPage">

                <div className="Search_Title">
                    <span>Search Results</span>
                    <h2>
                        Results for <strong>"{queryParams}"</strong>
                    </h2>
                    {!loading && !error && result.length > 0 && (
                        <p >We found <strong style={{fontSize:"16px", color:"gold"}}>({result.length})</strong> products for you</p>
                    )}
                </div>

                {loading ? (

                    <div className="Search_Loading">
                        <div className="Loading_Circle"></div>
                        <h3>Searching for products...</h3>
                        <p>Please wait while we find what you need</p>
                    </div>

                ) : error ? (

                    <div className="Not_Found">
                        <div className="NotFound_Images">
                            <img
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"
                                alt="Sneaker"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300"
                                alt="Watch"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300"
                                alt="Bag"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300"
                                alt="Camera"
                            />
                        </div>

                        <h2>Oops! Something went wrong</h2>
                        <p>We couldn't load the products. Please try again.</p>
                    </div>

                ) : result.length > 0 ? (

                    <div className="Search_Products container">
                        {result.map((item) => (
                            <Product key={item.id} item={item} />
                        ))}
                    </div>

                ) : (

                    <div className="Not_Found">
                        <div className="NotFound_Images">
                            <img
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"
                                alt="Sneaker"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300"
                                alt="Watch"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300"
                                alt="Bag"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300"
                                alt="Camera"
                            />
                        </div>

                        <h2>No Products Found!</h2>
                        <p>
                            We couldn't find any products matching
                            <strong> "{queryParams}" </strong>
                        </p>
                        <span>Try searching with another keyword.</span>
                    </div>

                )}

            </div>
        </PageTransition>
    );
}
