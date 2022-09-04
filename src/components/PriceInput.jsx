import TextInput from "./TextInput.jsx";

function PriceInput(props) {
    return (
        <>
            <TextInput {...props} />
            <img src="/assets/lari_symbol.svg" className="price__icon" alt="lari-symbol" />
        </>
    )
}


export default PriceInput