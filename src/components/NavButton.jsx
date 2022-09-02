import {useNavigate} from "react-router-dom";

function NavButton(props) {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(props.href)}
            className={props.classNames.join(' ')}
        >
            {props.text}
        </button>
    )
}

export default NavButton