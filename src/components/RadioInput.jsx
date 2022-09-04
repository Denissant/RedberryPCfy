function RadioInput(props) {
    const error = props.errors[props.name];

    const radioInputs = props.options.map( (option, index) => {
        return (
            <label key={index}>
                <input
                    {...props.register(props.name, {required: true})}
                    type="radio"
                    value={option.value}
                />
                {option.label}
            </label>
        )
    });

    return (
        <div className={"input__wrapper" + (error ? ' invalid ' : ' ') + (props?.className || '')}>
            <span className="label">{props.label}</span>
            <div className="radio__warning" />
            <div className="radio__wrapper">
                {radioInputs}
            </div>
        </div>
    );
}

export default RadioInput