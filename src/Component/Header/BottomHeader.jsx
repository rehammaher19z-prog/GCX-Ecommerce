
import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

export default function BottomHeader() {

    let [catagorgis, setgatagoris] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/products/categories")
            .then(res => res.json())
            .then((data) => setgatagoris(data));

    }, []);

 const navLinks = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "Categories",
        path: "/categories"
    },
    // {
    //     title: "About",
    //     path: "/about"
    // },
    // {
    //     title: "Contact",
    //     path: "/contact"
    // }
];

    let { pathname } = useLocation();

    const [categoryMenu, setCategoryMenu] = useState({
        pathname: null,
        open: false,
    });

    const isCategoryMenuOpen =
        categoryMenu.pathname === pathname && categoryMenu.open;

    return (
        <div className="bottom_header">
            <div className="container">

                <nav className="nav">

                    <div className="category_nav">

                        <div
                            className="category_btn"
                            onClick={() =>
                                setCategoryMenu((current) => ({
                                    pathname,
                                    open:
                                        current.pathname === pathname
                                            ? !current.open
                                            : true,
                                }))
                            }
                        >
                            <i className="fa-solid fa-bars"></i>
                            <p>Browse Category</p>
                            <i className="fa-solid fa-angle-down"></i>
                        </div>

                        <div className={`category_nav_list ${isCategoryMenuOpen ? "active" : ""}`}>
                            {catagorgis.map((catago) => (
                                <Link
                                    key={catago.slug}
                                    to={`/category/${catago.slug}`}
                                >
                                    {catago.name}
                                </Link>
                            ))}
                        </div>

                    </div>

                    <div className="nav_links">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.path === "/"}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                {link.title}
                            </NavLink>
                        ))}
                    </div>

                </nav>

                <div className="login_signup btns">
                    <Link to="/Login" className="btn">
                        Login <i className="fa-solid fa-right-to-bracket"></i>
                    </Link>

                    <Link to="/signup" className="btn">
                        Sign up <i className="fa-solid fa-user-plus"></i>
                    </Link>
                </div>

            </div>
        </div>
    );
}
