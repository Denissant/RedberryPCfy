function TextInput(props) {
    const error = props.errors[props.name]?.message || props.errors[props.name]?.type === 'required';

    const isOptional = props?.isOptional;

    let conditionalProps = {};

    if (props.formatter) {
        conditionalProps.onChange = event => {
            const formattedValue = props.formatter(event.target.value);
            props.setValue(props.name, formattedValue);
        }
    }

    return (
        <div className={"input__wrapper" + (error ? ' invalid ' : ' ') + (props?.className || '')}>
            <label htmlFor={props.name}>{props.label}</label>
            <input
                {...props.register(props.name, {required: !isOptional, validate: props.validate})}
                id={props.name}
                placeholder={props.placeholder}
                {...conditionalProps}
            />
            <span className="hint">{typeof error === 'string' ? error : props.hint}</span>
        </div>
    );
}

export default TextInput