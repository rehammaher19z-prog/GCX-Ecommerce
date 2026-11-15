
import { createContext, useEffect, useState } from "react"

// 1. createContext
// بنستخدم createContext لإنشاء مساحة مشتركة نقدر نشارك من خلالها البيانات
// بين Components مختلفة من غير ما نحتاج نبعت Props من Component للتاني.

const CartContext = createContext()


// 2. CartProvider
// ده Component مسؤول عن توفير بيانات الكارت لكل الـ Components الموجودة جواه.
// children معناها الـ Components اللي بنحطها داخل CartProvider.
// أي Component موجود داخل CartProvider يقدر يوصل للبيانات الموجودة في Context.

export function CartProvider({ children }) {

//removeFromCart
    const removeFromCart = (id) => {
    setcartitems(previtems =>
        previtems.filter(item => item.id !== id)
    );
};

    // 3. useState
    // cartItems: المتغير اللي بيحتفظ بالمنتجات الموجودة في الكارت.
    // setcartitems: الدالة اللي بنستخدمها لتحديث المنتجات الموجودة في الكارت.
    //
    // استخدمنا Function داخل useState علشان نقرأ البيانات من localStorage
    // مرة واحدة عند بداية تشغيل الـ Component (Lazy Initialization).

    const [cartItems, setcartitems] = useState(() => {

        // getItem: بنستخدمها لاسترجاع البيانات المحفوظة في localStorage
        // باسم CartItems.
        // البيانات بترجع على هيئة String.

        const SaveItems = localStorage.getItem('CartItems')


        // JSON.parse: بتحول البيانات من String إلى Array أو Objects
        // علشان نقدر نتعامل معاها في JavaScript.
        //
        // map: بنمر على كل المنتجات المحفوظة علشان نتأكد إن كل منتج
        // عنده quantity.
        //
        // ...item: بننسخ كل بيانات المنتج القديمة زي id و title و price.
        //
        // quantity: item.quantity || 1
        // لو المنتج عنده quantity محفوظة بالفعل بنحتفظ بيها.
        // ولو مفيش quantity بنبدأ بواحد.
        //
        // لو مفيش بيانات محفوظة في localStorage بنرجع Array فاضية [].

        return SaveItems
            ? JSON.parse(SaveItems).map(item => ({
                ...item,
                quantity: item.quantity || 1
            }))
            : []
    })


    // 4. addTocart
    // Function مسؤولة عن إضافة منتج جديد للكارت.
    // item هو المنتج اللي المستخدم ضغط عليه Add to Cart.

    const addTocart = (item) => {

        // بنستخدم setcartitems علشان نحدث الـ State.
        // previtems معناها المنتجات الموجودة بالفعل في الكارت قبل التحديث.
        // بنستخدمها علشان نعتمد على أحدث قيمة موجودة من الـ State.

        setcartitems((previtems) => {


            // find: بتدور داخل Array على أول منتج يحقق الشرط.
            // هنا بنشوف هل المنتج موجود بالفعل في الكارت عن طريق id.
            //
            // product.id === item.id
            // يعني هل ID المنتج الموجود في الكارت بيساوي ID المنتج الجديد؟

            const existingItem = previtems.find(
                product => product.id === item.id
            )


            // if: لو المنتج موجود بالفعل في الكارت.

            if (existingItem) {

                // map: بنمر على كل المنتجات الموجودة في الكارت.
                //
                // لو لقينا المنتج المطلوب:
                // بنستخدم Spread Operator (...product) للاحتفاظ بكل بياناته.
                // وبنزود quantity واحدة.
                //
                // لو المنتج مش هو المطلوب بنرجعه زي ما هو.

                return previtems.map(product =>
                    product.id === item.id
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                )
            }


            // لو المنتج مش موجود بالفعل في الكارت:
            // ...previtems بنحتفظ بكل المنتجات القديمة.
            // ...item بننسخ بيانات المنتج الجديد.
            // quantity: 1 بنحدد إن الكمية الابتدائية للمنتج الجديد هي واحدة.

            return [...previtems, { ...item, quantity: 1 }]
        })
    }


    // 5. updateQuantity
    // Function مسؤولة عن تعديل كمية منتج معين داخل الكارت.
    //
    // id: رقم المنتج اللي عايزين نعدل كميته.
    // newQuantity: الكمية الجديدة اللي عايزين نحطها للمنتج.

    const updateQuantity = (id, newQuantity) => {

        // بنستخدم setcartitems لتحديث المنتجات.
        // previtems هي المنتجات الموجودة قبل التعديل.
        // map بنستخدمها للمرور على كل المنتجات.

        setcartitems((previtems) =>

            previtems.map(item =>

                // بنقارن ID كل منتج بالـ ID اللي وصل للـ Function.
                //
                // لو الـ ID متطابق:
                // بنرجع نسخة من المنتج باستخدام ...item
                // وبنغير quantity للكمية الجديدة.
                //
                // Math.max(1, newQuantity):
                // بترجع أكبر قيمة بين 1 والكمية الجديدة.
                // استخدمناها علشان نمنع إن الكمية تقل عن 1.
                //
                // لو المنتج مش هو المطلوب بنرجعه زي ما هو.

                item.id === id
                    ? { ...item, quantity: Math.max(1, newQuantity) }
                    : item
            )
        )
    }


    // 6. useEffect + localStorage
    // useEffect مسؤولة عن تنفيذ كود معين لما قيمة cartItems تتغير.
    //
    // JSON.stringify:
    // بتحول Array والـ Objects إلى String
    // علشان localStorage تقدر تحفظهم.
    //
    // setItem:
    // بتحفظ بيانات الكارت باسم CartItems.
    //
    // [cartItems]:
    // دي Dependency Array، معناها إن useEffect تشتغل
    // كل ما cartItems تتغير.
    //
    // بالتالي لما نضيف منتج أو نغير الكمية،
    // البيانات الجديدة بتتحفظ تلقائيًا في localStorage.
    //
    // وده بيخلينا نقدر نسترجع المنتجات والكميات بعد عمل Refresh.

    useEffect(() => {
        localStorage.setItem('CartItems', JSON.stringify(cartItems))
    }, [cartItems])


    // 7. CartContext.Provider
    // Provider مسؤول عن توفير البيانات والـ Functions
    // للـ Components الموجودة داخل CartProvider.
    //
    // value بنحدد فيها الحاجات اللي عايزين نشاركها:
    //
    // cartItems: المنتجات الموجودة في الكارت.
    // addTocart: Function لإضافة المنتجات للكارت.
    // updateQuantity: Function لتعديل كمية المنتجات.
    //
    // children هي الـ Components الموجودة داخل CartProvider
    // زي <App />.

    return (
        <CartContext.Provider value={{
            cartItems,
            addTocart,
            updateQuantity,
            removeFromCart
        }}>

            {children}

        </CartContext.Provider>
    )
}


// 8. Export
// بنعمل Export للـ CartContext علشان نقدر نستوردها
// ونستخدم useContext في Components تانية محتاجة تتعامل مع الكارت.

export default CartContext
