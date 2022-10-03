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
        <div className={"inputblock " + (props?.className || '')}>
            <label
                htmlFor={props.name}
                className={"inputblock__label" + (error ? ' inputblock__label--invalid' : '')}
            >
                {props.label}
            </label>
            <input
                className={"inputblock__text" + (error ? ' inputblock__text--invalid' : '')}
                {...props.register(props.name, {required: !isOptional, validate: props.validate})}
                id={props.name}
                placeholder={props.placeholder}
                {...conditionalProps}
            />
            <span
                className={"inputblock__hint" + (error ? ' inputblock__hint--invalid' : '')}
            >
                {typeof error === 'string' ? error : (props.hint || '\u00A0')}  {/* non-breaking space entity */}
            </span>
        </div>
    );
}

export default TextInput