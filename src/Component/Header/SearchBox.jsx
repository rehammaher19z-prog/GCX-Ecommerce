
import "./Header.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox() {

    const [searchTerm, setSearchTerm] = useState("");

    const [Suggestions, setSuggestions] = useState({
        categories: [],
        products: []
    });

    const navigate = useNavigate();

    // البحث عند الضغط على Enter أو زر Search
    const handleSearch = (e) => {
        e.preventDefault();

        if (searchTerm.trim()) {
            navigate(
                `/search?queryParams=${encodeURIComponent(searchTerm.trim())}`
            );

            setSearchTerm("");
            setSuggestions({ categories: [], products: [] });
        }
    };

    // جلب اقتراحات البحث
    useEffect(() => {

        const fetchSuggestions = async () => {
            try {
                const term = searchTerm.trim().toLowerCase();

                const [categoriesRes, productsRes] = await Promise.all([
                    fetch("https://dummyjson.com/products/category-list"),
                    fetch("https://dummyjson.com/products?limit=0")
                ]);

                const categories = await categoriesRes.json();
                const productsData = await productsRes.json();

                // البحث عن Categories تبدأ بنفس الكلمة
                const matchedCategories = categories.filter((category) =>
                    category.toLowerCase().startsWith(term)
                );

                // البحث عن Products تبدأ أسماؤها بنفس الكلمة
                const matchedProducts = (productsData.products || []).filter(
                    (product) =>
                        product.title.toLowerCase().startsWith(term)
                );

                setSuggestions({
                    categories: matchedCategories.slice(0, 5),
                    products: matchedProducts.slice(0, 5)
                });

            } catch (error) {
                console.error("Error fetching suggestions:", error);

                setSuggestions({
                    categories: [],
                    products: []
                });
            }
        };

        const delayDebounceFn = setTimeout(() => {

            if (searchTerm.trim()) {
                fetchSuggestions();
            } else {
                setSuggestions({
                    categories: [],
                    products: []
                });
            }

        }, 300);

        return () => clearTimeout(delayDebounceFn);

    }, [searchTerm]);

    // عند اختيار Category
    const handleCategoryClick = (category) => {

        navigate(
            `/search?queryParams=${encodeURIComponent(category)}`
        );

        setSearchTerm("");
        setSuggestions({ categories: [], products: [] });
    };

    // عند اختيار Product
    const handleProductClick = (product) => {

        navigate(
            `/search?queryParams=${encodeURIComponent(product.title)}`
        );

        setSearchTerm("");
        setSuggestions({ categories: [], products: [] });
    };

    return (
        <>

            <form className="search-box" onSubmit={handleSearch}>

                <input
                    required
                    name="search"
                    type="text"
                    placeholder="Search For Product"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button type="submit" aria-label="Search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>

            </form>

            {/* Suggestions */}
            {(Suggestions.categories.length > 0 ||
                Suggestions.products.length > 0) && (

                <div className="suggestions">

                    {/* Categories Suggestions */}
                    {Suggestions.categories.length > 0 && (
                        <>
                            <h4>Categories</h4>

                            {Suggestions.categories.map((category) => (
                                <div
                                    key={category}
                                    className="suggestion-item"
                                    onClick={() => handleCategoryClick(category)}
                                >
                                    <i className="fa-solid fa-layer-group"></i>
                                    <span>{category}</span>
                                </div>
                            ))}
                        </>
                    )}

                    {/* Products Suggestions */}
                    {Suggestions.products.length > 0 && (
                        <>
                            <h4>Products</h4>

                            {Suggestions.products.map((product) => (
                                <div
                                    key={product.id}
                                    className="suggestion-item"
                                    onClick={() => handleProductClick(product)}
                                >
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <span>{product.title}</span>
                                    <span>{ product.category }</span>

                                </div>
                            ))}
                        </>
                    )}

                </div>
            )}

        </>
    );
}

export default SearchBox;
