import {bytesToSizeString, truncate} from "../utils.js";


function ImageForm(props) {

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
                className={"image__dropzone" + (props.errors?.image ? ' image__dropzone--invalid' : '')}
                onDragOver={(e) => e.preventDefault()}
            >
                <div className={"image__warning" + (props.errors?.image ? ' image__warning--visible' : '')} />
                <span className={"image__hint" + (props.errors?.image ? ' image__hint--invalid' : '')}>
                    ჩააგდე ან ატვირთე ლეპტოპის ფოტო
                </span>
                <label
                    className={"image__submit" + (props.errors?.image ? ' image__submit--invalid' : '')}
                    htmlFor="image"
                >
                    ატვირთე
                </label>
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
                <label className="image__resubmit" htmlFor="image">თავიდან ატვირთე</label>
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