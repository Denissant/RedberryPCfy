import {Link} from "react-router-dom";

function SuccessPage() {
    return (
        <div className="success__body">
            <div className="success__wrapper">
                <img className="confetti" src="/assets/confetti.svg" alt="confetti" />
                <h2>ჩანაწერი დამატებულია!</h2>
                <Link to="/list" className="link__button">სიაში გადაყვანა</Link>
                <Link to="/" className="link__text">მთავარი</Link>
            </div>
        </div>
    )
}

export default SuccessPage;