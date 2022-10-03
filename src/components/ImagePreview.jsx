function ImagePreview(props) {
    return (
        <>
            <img
                className="imagepreview"
                src={props.previewURL}
                alt="Uploaded image preview"
            />
            <div className="preview">
                <img className="preview__image" src="/assets/success.svg" alt="success" />
                <span className="preview__label">{props.label + ','}</span>
                <span className="preview__size">{props.size}</span>
            </div>
        </>
    )
}


export default ImagePreview