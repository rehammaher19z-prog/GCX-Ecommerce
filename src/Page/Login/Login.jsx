
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

    // التحكم في إظهار وإخفاء كلمة المرور
    const [showPassword, setShowPassword] = useState(false);

    // تخزين بيانات تسجيل الدخول
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // تخزين رسائل الخطأ
    const [errors, setErrors] = useState({});

    // رسالة النجاح
    const [success, setSuccess] = useState("");

    // الانتقال بين الصفحات
    const navigate = useNavigate();

    // استقبال البيانات من الـ Inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // إزالة رسالة الخطأ عند تعديل الحقل
        setErrors({
            ...errors,
            [name]: ""
        });

        setSuccess("");
    };

    // التحقق من البيانات عند الضغط على Login
    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};

        // التحقق من الإيميل
        if (!formData.email.trim()) {
            newErrors.email = "Please enter your email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }

        // التحقق من الباسورد
        if (!formData.password) {
            newErrors.password = "Please enter your password";
        }

        setErrors(newErrors);

        // لو مفيش أخطاء في المدخلات
        if (Object.keys(newErrors).length === 0) {

            // جلب بيانات المستخدم من localStorage
            //ده السطر اللي بيربط صفحة Login بصفحة Sign Up.
            const savedUser = localStorage.getItem("userData");

            // التأكد إن فيه مستخدم مسجل بالفعل
            if (!savedUser) {
                setErrors({
                    email: "No registered account found"
                });
                return;
            }

            // تحويل البيانات من String إلى Object
            const userData = JSON.parse(savedUser);

            // مقارنة بيانات Login ببيانات Sign Up
            if (
                formData.email.trim().toLowerCase() === userData.email.toLowerCase() &&
                formData.password === userData.password
            ) {
                setSuccess("Login successful!");

                // الانتقال إلى الصفحة الرئيسية
                navigate("/");
            } else {
                setErrors({
                    email: "Invalid email or password",
                    password: "Invalid email or password"
                });
            }
        }
    };

    return (
        <div className="LoginPage">

            {/* الزهور في الخلفية */}
            <div className="Flower flower-one">✿</div>
            <div className="Flower flower-two">❀</div>
            <div className="Flower flower-three">✿</div>
            <div className="Flower flower-four">❀</div>
            <div className="Flower flower-five">✿</div>
            <div className="Flower flower-six">❀</div>
            <div className="Flower flower-seven">✿</div>
            <div className="Flower flower-eight">❀</div>
            <div className="Flower flower-nine">✿</div>

            <div className="LoginCard">

                <div className="LoginHeader">
                    <h1>GCX</h1>
                    <h2>Welcome Back!</h2>
                    <p>Login to continue your shopping journey</p>
                </div>

                <form className="LoginForm" onSubmit={handleSubmit}>

                    {/* Email */}
                    <div className="LoginInput">
                        <label>Email Address</label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />

                        {errors.email && (
                            <small className="ErrorMessage">
                                {errors.email}
                            </small>
                        )}
                    </div>

                    {/* Password */}
                    <div className="LoginInput">
                        <label>Password</label>

                        <div className="PasswordWrapper">

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />

                            <i
                                className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>

                        </div>

                        {errors.password && (
                            <small className="ErrorMessage">
                                {errors.password}
                            </small>
                        )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="LoginOptions">

                        <label>
                            <input type="checkbox" />
                            Remember Me
                        </label>

                        <Link to="/forgot-password">
                            Forgot Password?
                        </Link>

                    </div>

                    {/* Success Message */}
                    {success && (
                        <p className="SuccessMessage">
                            {success}
                        </p>
                    )}

                    <button type="submit" className="LoginBtn">
                        Login
                    </button>

                    {/* Divider */}
                    <div className="LoginDivider">
                        <span></span>
                        <p>OR</p>
                        <span></span>
                    </div>

                    {/* Google Button */}
                    <button type="button" className="GoogleBtn">
                        <i className="fa-brands fa-google"></i>
                        Continue with Google
                    </button>

                </form>

                <div className="LoginFooter">
                    <p>
                        Don't have an account?
                        <Link to="/signup"> Sign Up</Link>
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Login;
