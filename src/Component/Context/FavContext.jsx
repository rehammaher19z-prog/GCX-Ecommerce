
import { createContext, useEffect, useState } from "react";

const FavContext = createContext();

function FavProvider({ children }) {

    // تخزين المنتجات واسترجاعها من localStorage
    const [FavItems, setFavitems] = useState(() => {

        const SaveItems = localStorage.getItem("FavItems");

        return SaveItems ? JSON.parse(SaveItems) : [];
    });

    // إضافة منتج للمفضلة
    const addToFav = (item) => {

        setFavitems((previtems) => {

            const existingItem = previtems.find(
                product => product.id === item.id
            );

            // لو المنتج موجود بالفعل، نرجع القائمة زي ما هي
            if (existingItem) {
                return previtems;
            }

            // لو مش موجود، نضيفه للقائمة
            return [...previtems, item];
        });
    };

    // حذف منتج من المفضلة
    const removeFromFav = (id) => {

        setFavitems(previtems =>
            previtems.filter(item => item.id !== id)
        );
    };

    // حفظ التغييرات في localStorage
    useEffect(() => {
        localStorage.setItem("FavItems", JSON.stringify(FavItems));
    }, [FavItems]);

    return (
        <FavContext.Provider value={{
            FavItems,
            addToFav,
            removeFromFav
        }}>
            {children}
        </FavContext.Provider>
    );
}

export { FavProvider };
export default FavContext;
