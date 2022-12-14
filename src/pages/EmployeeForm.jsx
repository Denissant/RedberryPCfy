import BackButton from "../components/Back.jsx";
import TextInput from "../components/TextInput.jsx";
import {useForm, Controller} from "react-hook-form";
import Select from "react-select";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchAndFormat, findById} from "../utils.js";
import validators from "../inputValidators.js";

function EmployeeForm() {
    const navigate = useNavigate();


    // fetch data for select fields
    const [teamOptions, setTeamOptions] = useState([]);
    const [positionOptions, setPositionOptions] = useState([]);

    useEffect(() => {
        async function fetchData() {
            setTeamOptions(await fetchAndFormat('teams'));

            const positionOptionsRequest = await fetch('https://pcfy.redberryinternship.ge/api/positions');
            let positionsData = await positionOptionsRequest.json();
            positionsData = positionsData.data.reduce( (previousValue, currentValue) => {
                if (!previousValue[currentValue.team_id]) previousValue[currentValue.team_id] = [];
                previousValue[currentValue.team_id].push({value: currentValue.id, label: currentValue.name});
                return previousValue;
            }, {});

            setPositionOptions(positionsData);
        }

        fetchData();

        document.body.style.backgroundColor = '#F6F6F6';
    }, []);


    // initialize form, load cached values from local storage
    const previousValues = JSON.parse(localStorage.getItem('employeeForm'));
    const { register, handleSubmit, watch, control, getValues, setValue, formState: {errors} } = useForm({
        defaultValues: previousValues
    });
    localStorage.setItem('employeeForm', JSON.stringify(watch()));


    const phoneNumberFormatter = string => string.replace(/(\d{3})/g,"$& ").replace(/\s\s+/g, ' ').replace(/ $/, '');

    const [selectedTeam, setSelectedTeam] = useState(previousValues?.team);

    const onSubmit = () => navigate('/new/laptop');

    return (
        <main className="employee">
            <BackButton />
            <nav className="formnav">
                <span className="formnav__title formnav__title--current">???????????????????????????????????? ????????????</span>
                <span className="formnav__page">1/2</span>
                <span
                    onClick={handleSubmit(onSubmit)}
                    className="formnav__title formnav__title--laptop formnav__title--next"
                >
                    ???????????????????????? ??????????????????????????????????????????
                </span>
            </nav>

            <form className="employee__form" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <div className="employee__nameinputs">
                    <TextInput
                        name="name"
                        label="??????????????????"
                        placeholder="???????????????"
                        hint="????????????????????? 2 ?????????????????????, ????????????????????? ??????????????????"
                        validate={{lessThanTwo: validators.lessThanTwo, georgian: validators.georgian}}
                        errors={errors}
                        register={register}
                    />
                    <TextInput
                        name="lastname"
                        label="???????????????"
                        placeholder="??????????????????????????????"
                        hint="????????????????????? 2 ?????????????????????, ????????????????????? ??????????????????"
                        validate={{lessThanTwo: validators.lessThanTwo, georgian: validators.georgian}}
                        errors={errors}
                        register={register}
                    />
                </div>

                <Controller
                    control={control}
                    rules={{required: true}}
                    name="team"
                    render={({ field: { onChange, ref } }) => (
                        <Select
                            options={teamOptions}
                            isSearchable={false}
                            value={findById(teamOptions, selectedTeam)}
                            name="team"
                            placeholder="????????????"
                            className={"dropdown" + (errors?.team ? ' dropdown--invalid' : '')}
                            classNamePrefix='dropdown'
                            inputRef={ref}
                            onChange={val => {
                                setSelectedTeam(val.value)
                                return onChange(val.value);
                            }}
                        />
                    )}
                />

                <Controller
                    control={control}
                    rules={{
                        required: true,
                        validate: () => positionOptions[getValues('team')].find( position => position.value === getValues('position')) || false
                    }}
                    name="position"
                    render={({ field: { onChange, ref } }) => (
                        <Select
                            isDisabled={!Boolean(selectedTeam)}
                            options={selectedTeam ? positionOptions[selectedTeam] : []}
                            isSearchable={false}
                            value={findById(positionOptions[selectedTeam] ? positionOptions[selectedTeam] : [], getValues('position'))}
                            name="position"
                            placeholder="?????????????????????"
                            className={"dropdown" + (errors?.position ? ' dropdown--invalid' : '')}
                            classNamePrefix='dropdown'
                            inputRef={ref}
                            onChange={val => onChange(val.value)}
                        />
                    )}
                />

                <TextInput
                    name="email"
                    label="???????????????"
                    placeholder="grish666@redberry.ge"
                    hint="???????????? ???????????????????????????????????? @redberry.ge-??????"
                    validate={validators.email}
                    errors={errors}
                    register={register}
                />
                <TextInput
                    name="phone"
                    label="??????????????????????????? ??????????????????"
                    placeholder="+995 598 00 07 01"
                    hint="????????????????????? ?????????-?????????????????? ?????????????????????"
                    validate={validators.phone}
                    formatter={phoneNumberFormatter}
                    setValue={setValue}
                    errors={errors}
                    register={register}
                />

                <input type="submit" value="?????????????????????" className="employee__submit" />

            </form>

            <picture className="redberry__logo--wrapper">
                <img src="/assets/redberry_circle_logo.png" className="redberry__logo" alt="Redberry Logo" />
            </picture>

        </main>
    )
}

export default EmployeeForm