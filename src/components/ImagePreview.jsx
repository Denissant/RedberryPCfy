function ImagePreview(props) {
    return (
        <>
            <img
                className="image__preview"
                src={props.previewURL}
                alt="uploaded-image-preview"
            />
            <div className="image__preview__info">
                <img src="/assets/success.svg" alt="success" />
                <span className="image__label">{props.label + ','}</span>
                <span className="image__size">{props.size}</span>
            </div>
        </>
    )
}


export default ImagePreview