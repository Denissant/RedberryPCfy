import {Link} from "react-router-dom";

function SuccessPage() {
    return (
        <div className="success">
            <div className="success__modal">
                <div className="success__wrapper">
                    <img className="success__confetti" src="/assets/confetti.svg" alt="Confetti" />
                    <h2 className="success_text">ჩანაწერი დამატებულია!</h2>
                </div>
                <div className="success__wrapper">
                    <Link to="/list" className="success__nextbtn">სიაში გადაყვანა</Link>
                    <Link to="/" className="success__homebtn">მთავარი</Link>
                </div>
            </div>
        </div>
    )
}

export default SuccessPage;