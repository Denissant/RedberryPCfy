function RadioInput(props) {
    const error = props.errors[props.name];

    const radioInputs = props.options.map( (option, index) => {
        return (
            <label key={index} className="radio__label">
                <input
                    {...props.register(props.name, {required: true})}
                    type="radio"
                    value={option.value}
                    className="inputblock__radio"
                />
                {option.label}
            </label>
        )
    });

    return (
        <div className={"inputblock inputblock--radio" + (props?.className || '')}>
            <span
                className={"inputblock__label" + (error ? ' inputblock__label--invalid' : '')}
            >
                {props.label}
            </span>
            <div className={"radio__warning" + (error ? ' radio__warning--visible' : '')} />
            <div className="inputblock__radiowrapper">
                {radioInputs}
            </div>
        </div>
    );
}

export default RadioInput