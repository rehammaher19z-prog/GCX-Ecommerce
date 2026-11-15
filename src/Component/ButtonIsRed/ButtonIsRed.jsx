
import "./ButtonIsRed.css";

function ButtonIsRed({ isAdded, onClick, icon, children }) {
    return (
        <button
            className={`ButtonIsRed ${isAdded ? "added" : ""}`}
            onClick={onClick}
        >
            {icon && <i className={icon}></i>}
            {children}
        </button>
    );
}

export default ButtonIsRed;
