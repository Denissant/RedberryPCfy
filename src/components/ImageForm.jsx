import {bytesToSizeString, truncate} from "../utils.js";


function ImageForm(props) {
    if (props.errors?.image) window.scrollTo(0,0)

    const applyImagePreview = (event, file=null) => {
        if (!file) file = event.target.files[0];
        const url = URL.createObjectURL(file);
        props.setImagePreviewData({
            url,
            label: truncate(file.name, 20),
            size: bytesToSizeString(file.size)
        });
        props.setValue('image', file);
    }

    const drop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.items ? e.dataTransfer.items[0].getAsFile() : e.dataTransfer.files[0];
        applyImagePreview(e, file);
    }

    if (!props.imagePreviewData) {  // no preview, display file dropzone
        return (
            <div
                onDrop={drop}
                className={"file__dropzone" + (props.errors?.image ? ' invalid' : '')}
                onDragOver={(e) => e.preventDefault()}
            >
                <div className="image__warning" />
                <span className="dropzone__hint">ჩააგდე ან ატვირთე ლეპტოპის ფოტო</span>
                <label className="image__upload__button" htmlFor="image">ატვირთე</label>
                <input
                    {...props.register('image', {validate: () => props.getValues('image') instanceof File})}
                    id="image"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={applyImagePreview}
                />
            </div>
        );
    } else {
        return (  // display only upload button
            <>
                <label className="image__reupload__button" htmlFor="image">თავიდან ატვირთე</label>
                <input
                    className=""
                    {...props.register('image', {validate: () => props.getValues('image') instanceof File})}
                    id="image"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={applyImagePreview}
                />
            </>
        );
    }
}

export default ImageForm