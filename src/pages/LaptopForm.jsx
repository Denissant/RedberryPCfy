import BackButton from "../components/Back.jsx";
import {Link, useNavigate} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import TextInput from "../components/TextInput.jsx";
import {dateStringFormatter, fetchAndFormat} from "../utils.js";
import Select from "react-select";
import ImageForm from "../components/ImageForm.jsx";
import {useEffect, useState} from "react";
import ImagePreview from "../components/ImagePreview.jsx";
import RadioInput from "../components/RadioInput.jsx";
import validators from "../inputValidators.js";
import apiParamsMap from "../apiParamsMap.js";
import {findById} from "../utils.js";


function LaptopForm() {
    const navigate = useNavigate();


    // fetch data for select fields
    const [brandOptions, setBrandOptions] = useState([]);
    const [cpuOptions, setCpuOptions] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setBrandOptions(await fetchAndFormat('brands'));
            setCpuOptions(await fetchAndFormat('cpus'));
        }

        fetchData();

        document.body.style.backgroundColor = '#F6F6F6';
    }, []);


    // initialize form, load cached values from local storage
    const previousValues = JSON.parse(localStorage.getItem('laptopForm'));
    const { register, handleSubmit, watch, control, getValues, setValue, formState: {errors} } = useForm({
        defaultValues: previousValues
    });
    localStorage.setItem('laptopForm', JSON.stringify(watch()));

    const [imagePreviewData, setImagePreviewData] = useState();

    return (
        <main className="laptop">
            <BackButton />
            <nav className="formnav">
                <span
                    onClick={() => navigate('/new/employee')}
                    className="formnav__title formnav__title--next"
                >
                    თანამშრომლის ინფო
                </span>
                <span
                    className="formnav__title formnav__title--laptop formnav__title--current"
                >
                    ლეპტოპის მახასიათებლები
                </span>
                <span className="formnav__page">2/2</span>
            </nav>

            <form className="laptop__form" autoComplete="off" onSubmit={handleSubmit(async () => {
                const formData = new FormData();
                formData.append('token', import.meta.env.VITE_REDBERRY_API_KEY);

                const allFormValues = {...getValues(), ...JSON.parse(localStorage.getItem('employeeForm'))}

                for (let [key, value] of Object.entries(allFormValues)) {
                    if (key === 'date' || key === 'phone') value = value.replace(/\s+/g, '');
                    formData.append(apiParamsMap[key], value);
                }

                const response = await fetch('https://pcfy.redberryinternship.ge/api/laptop/create', {
                    method: 'POST',
                    body: formData
                });

                const message = await response.json();
                if (response.ok) {
                    localStorage.removeItem('employeeForm');
                    localStorage.removeItem('laptopForm');
                    navigate('/success');
                } else {
                    alert('Error')
                    console.log(message)
                }
            })}>

                <div className="laptop__section">
                    {
                        imagePreviewData &&
                        <ImagePreview
                            previewURL={imagePreviewData.url}
                            label={imagePreviewData.label}
                            size={imagePreviewData.size}
                        />
                    }

                    <ImageForm
                        getValues={getValues}
                        setValue={setValue}
                        errors={errors}
                        register={register}
                        imagePreviewData={imagePreviewData}
                        setImagePreviewData={setImagePreviewData}
                    />

                    <div className="laptop__row">
                        <TextInput
                            name="laptopName"
                            label="ლეპტოპის სახელი"
                            placeholder="HP"
                            hint="ლათინური ასოები, ციფრები, !@#$%^&*()_+="
                            validate={{laptopName: validators.laptopName}}
                            errors={errors}
                            register={register}
                        />

                        <Controller
                            control={control}
                            rules={{required: true}}
                            name="brand"
                            render={({ field: { onChange, ref } }) => (
                                <Select
                                    options={brandOptions}
                                    isSearchable={false}
                                    value={findById(brandOptions, getValues('brand'))}
                                    name="brand"
                                    placeholder="ლეპტოპის ბრენდი"
                                    className={"dropdown" + (errors?.brand ? ' invalid' : '')}
                                    classNamePrefix='dropdown'
                                    inputRef={ref}
                                    onChange={val => onChange(val.value)}
                                />
                            )}
                        />
                    </div>

                </div>

                <hr className="laptop__horizontalbreak" />

                <div className="laptop__section">

                    <div className="laptop__row laptop__row--three">

                        <Controller
                            control={control}
                            rules={{required: true}}
                            name="cpu"
                            render={({ field: { onChange, ref } }) => (
                                <Select
                                    options={cpuOptions}
                                    isSearchable={false}
                                    value={cpuOptions.find(item => item.label === getValues('cpu'))}
                                    name="cpu"
                                    placeholder="CPU"
                                    className={"dropdown" + (errors?.cpu ? ' invalid' : '')}
                                    classNamePrefix='dropdown'
                                    inputRef={ref}
                                    onChange={val => onChange(val.label)}
                                />
                            )}
                        />

                        <TextInput
                            name="cpuCores"
                            label="CPU-ს ბირთვი"
                            placeholder="14"
                            hint="მხოლოდ ციფრები"
                            validate={{numbersOnly: validators.numbersOnly}}
                            errors={errors}
                            register={register}
                        />

                        <TextInput
                            name="cpuThreads"
                            label="CPU-ს ნაკადი"
                            placeholder="365"
                            hint="მხოლოდ ციფრები"
                            validate={{numbersOnly: validators.numbersOnly}}
                            errors={errors}
                            register={register}
                        />

                    </div>

                    <div className="laptop__row">

                        <TextInput
                            name="ram"
                            label="ლეპტოპის RAM (GB)"
                            placeholder="16"
                            hint="მხოლოდ ციფრები"
                            validate={{numbersOnly: validators.numbersOnly}}
                            errors={errors}
                            register={register}
                        />

                        <RadioInput
                            name="storage"
                            label="მეხსიერების ტიპი"
                            options={[{label: 'SSD', value: 'SSD'}, {label: 'HDD', value: 'HDD'}]}
                            errors={errors}
                            register={register}
                        />

                    </div>

                </div>

                <hr className="laptop__horizontalbreak" />

                <div className="laptop__section">

                    <div className="laptop__row">

                        <TextInput
                            name="date"
                            label="შეძენის რიცხვი (არჩევითი)"
                            placeholder="თთ / დდ / წწწწ"
                            hint=""
                            isOptional={true}
                            validate={{date: validators.date}}
                            formatter={dateStringFormatter}
                            setValue={setValue}
                            errors={errors}
                            register={register}
                        />
                        <TextInput
                            className="inputblock--price"
                            name="price"
                            label="ლეპტოპის ფასი"
                            placeholder="0000"
                            hint="მხოლოდ ციფრები"
                            validate={{numbersOnly: validators.numbersOnly}}
                            errors={errors}
                            register={register}
                        />

                    </div>

                    <div className="laptop__row">

                        <RadioInput
                            name="state"
                            label="ლეპტოპის მდგომარეობა"
                            options={[{label: 'ახალი', value: 'new'}, {label: 'მეორადი', value: 'used'}]}
                            errors={errors}
                            register={register}
                        />

                    </div>

                    <div className="laptop__submit--wrapper">
                        <Link to={'/new/employee'} className="laptop__back">უკან</Link>
                        <input type="submit" value="დამახსოვრება" className="laptop__submit" />
                    </div>

                </div>


            </form>
            <picture className="redberry__logo--wrapper">
                <img src="/assets/redberry_circle_logo.png" className="redberry__logo" alt="Redberry Logo" />
            </picture>
        </main>
    )
}

export default LaptopForm