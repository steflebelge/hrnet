import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './CreateEmployee.scss';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from "react-redux";
import {addEmployee, setEmployees} from "../../features/employee/employeeSlice";
import {DatePicker} from "react-date-picker";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import {useEffect, useState} from "react";
import PopUp from "../../components/PopUp/PopUp";

function CreateEmployee() {
    const employees = useSelector((state) => state.employeeSlice.employees);
    const {control, register, setValue, handleSubmit, formState: {errors}} = useForm();
    const [displayPopUp, setDisplayPopUp] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = data => {
        const timeZone = 'Europe/Paris';

        const startDateUtc = toZonedTime(data.StartDate, timeZone);
        const dateOfBirthUtc = toZonedTime(data.DateofBirth, timeZone);

        let cleanData = {
            ...data,
            DateofBirth: format(dateOfBirthUtc, 'yyyy-MM-dd'),
            StartDate: format(startDateUtc, 'yyyy-MM-dd'),
        };

        dispatch(addEmployee({data: cleanData}));

        setDisplayPopUp(true);
    };

    function getRandomName() {
        const names = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'jonny dette', 'matt demon', 'Jean paul roux'];
        return names[Math.floor(Math.random() * names.length)];
    }

    function getRandomDate() {
        const start = new Date(1950, 0, 1);
        const end = new Date();
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString().substring(0, 10);
    }

    function randomFillForm() {
        let form = document.querySelector('form');
        let allInputs = form.querySelectorAll('input');
        let allSelects = form.querySelectorAll('select');
        allInputs.forEach(function (inputTmp) {
            if(Array.from(inputTmp.classList).some(cls => cls.startsWith('react')))
                return

            switch (inputTmp.type) {
                case 'text':
                    setValue(inputTmp.getAttribute('id'), getRandomName());
                    break;
                case 'number':
                    setValue(inputTmp.getAttribute('id'), Math.floor(Math.random() * 90000) + 10000);
                    break;
            }
        });

        allSelects.forEach(function (selectTmp) {
            setValue(selectTmp.getAttribute(('id')), selectTmp.options[Math.floor(Math.random() * selectTmp.options.length)].value);
        });
    }

    // Exécuter du code spécifique lorsque les employés sont mis à jour
    useEffect(() => {
        if (employees.length > 0
        && JSON.stringify(employees) !== localStorage.getItem('employees')) {
            localStorage.setItem('employees', JSON.stringify(employees));
        }
    }, [employees]);
    useEffect(() => {
        //si pas d employés, on va chercher dans le localStorage
        if (employees.length === 0) {
            dispatch(setEmployees(JSON.parse(localStorage.getItem('employees'))));
        }
    }, []);

    const stylePopUp = {
        externe: {
              "backgroundColor": "#808080c7",
        },
        interne:{
                "backgroundColor": "white",
        },
        contenu: {
            "color": "green",
        }
    }

    return (
        <div id="CreateEmployee">

            {displayPopUp && (
                <PopUp
                    setDisplayPopUp={setDisplayPopUp}
                    style={stylePopUp}
                />
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <span>
                    <div>
                        <label htmlFor="FirstName">First Name</label>
                        <input id="FirstName" {...register('FirstName', {required: true})} />
                        {errors.FirstName && <span className="error">Ce champs est requis</span>}
                    </div>
                    <div>
                        <label htmlFor="LastName">Last Name</label>
                        <input id="LastName" {...register('LastName', {required: true})} />
                        {errors.LastName && <span className="error">Ce champs est requis</span>}
                    </div>
                    <div>
                        <label htmlFor="StartDate">StartDate</label>
                        <Controller
                            control={control}
                            name="StartDate"
                            render={({field}) => (
                                <DatePicker
                                    required={true}
                                    format="dd-MM-yyyy"
                                    id="StartDate"
                                    onChange={(date) => field.onChange(date)}
                                    value={field.value}
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label htmlFor="DateofBirth">DateofBirth</label>
                        <Controller
                            control={control}
                            name="DateofBirth"
                            render={({field}) => (
                                <DatePicker
                                    required={true}
                                    format="dd-MM-yyyy"
                                    id="DateofBirth"
                                    onChange={(date) => field.onChange(date)}
                                    value={field.value}
                                />
                            )}
                        />
                    </div>
                </span>

                <fieldset>
                    <legend>Address</legend>
                    <div>
                        <label htmlFor="Street">Street</label>
                        <input id="Street" {...register('Street', {required: true})} />
                        {errors.Street && <span className="error">Ce champs est requis</span>}
                    </div>

                    <div>
                        <label htmlFor="City">City</label>
                        <input id="City" {...register('City', {required: true})} />
                        {errors.City && <span className="error">Ce champs est requis</span>}
                    </div>

                    <div>
                        <label htmlFor="State">State</label>
                        <select id="State" {...register('State', {required: true})}>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AS">American Samoa</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FM">Federated States Of Micronesia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="GU">Guam</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MH">Marshall Islands</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="MP">Northern Mariana Islands</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PW">Palau</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="PR">Puerto Rico</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VI">Virgin Islands</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                        {errors.State && <span className="error">Ce champs est requis</span>}
                    </div>

                    <div>
                        <label htmlFor="ZipCode">ZipCode</label>
                        <input id="ZipCode" type={"number"} min={0} {...register('ZipCode', {required: true})} />
                        {errors.ZipCode && <span className="error">Ce champs est requis</span>}
                    </div>
                </fieldset>

                <div>
                    <label htmlFor="Department">Departement</label>
                    <select id="Department" {...register('Department', {required: true})}>
                        <option value={"Sales"}>Sales</option>
                        <option value={"Marketing"}>Marketing</option>
                        <option value={"Engineering"}>Engineering</option>
                        <option value={"Human"}>Human Resources</option>
                        <option value={"Legal"}>Legal</option>
                    </select>
                    {errors.Department && <span className="error">Ce champs est requis</span>}
                </div>

                <button>&#128190; Enregistrer</button>
            </form>
            <button onClick={randomFillForm}>randomfillform</button>
        </div>
    );
}

export default CreateEmployee;
