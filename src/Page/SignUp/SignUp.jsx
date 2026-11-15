
import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

function SignUp() {

    // التحكم في إظهار وإخفاء كلمات المرور
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // تخزين بيانات الفورم
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    // تخزين رسائل الخطأ
    const [errors, setErrors] = useState({});

    // رسالة نجاح تجريبية
    const [success, setSuccess] = useState("");

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

    // التحقق من البيانات عند الضغط على Create Account
    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Please enter your full name";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Please enter your email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))//Regular Expression أو Regex.
        {
            
            newErrors.email = "Please enter a valid email";
        }

        if (!formData.password) {
            newErrors.password = "Please enter your password";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        // لو مفيش أخطاء
        //دي بتجيب أسماء الـ Properties الموجودة في الـ Object.
        if (Object.keys(newErrors).length === 0) {

            localStorage.setItem("userData",JSON.stringify(formData))
            setSuccess("Your information is valid!");
        }
    };

    return (
        <div className="SignupPage">

            <div className="Flower flower-one">✿</div>
            <div className="Flower flower-two">❀</div>
            <div className="Flower flower-three">✿</div>
            <div className="Flower flower-four">❀</div>
            <div className="Flower flower-five">✿</div>

            <div className="SignupCard">

                <div className="SignupHeader">
                    <h1>GCX</h1>
                    <h2>Create Account</h2>
                    <p>Join us and start your shopping journey</p>
                </div>

                <form className="SignupForm" onSubmit={handleSubmit}>

                    <div className="SignupInput">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                        />
                        {errors.fullName && <small className="ErrorMessage">{errors.fullName}</small>}
                    </div>

                    <div className="SignupInput">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                        {errors.email && <small className="ErrorMessage">{errors.email}</small>}
                    </div>

                    <div className="SignupInput">
                        <label>Password</label>

                        <div className="PasswordWrapper">
                            <input
                                //إظهار وإخفاء كلمة المرور
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

                        {errors.password && <small className="ErrorMessage">{errors.password}</small>}
                    </div>

                    <div className="SignupInput">
                        <label>Confirm Password</label>

                        <div className="PasswordWrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                            />

                            <i
                                className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            ></i>
                        </div>

                        {errors.confirmPassword && <small className="ErrorMessage">{errors.confirmPassword}</small>}
                    </div>

                    {success && <p className="SuccessMessage">{success}</p>}

                    <button type="submit" className="SignupBtn">
                        Create Account
                    </button>

                    <div className="SignupDivider">
                        <span></span>
                        <p>OR</p>
                        <span></span>
                    </div>

                    <button type="button" className="GoogleBtn">
                        <i className="fa-brands fa-google"></i>
                        Continue with Google
                    </button>

                </form>

                <div className="SignupFooter">
                    <p>
                        Already have an account?
                        <Link to="/login"> Login</Link>
                    </p>
                </div>

            </div>

        </div>
    );
}

export default SignUp;
