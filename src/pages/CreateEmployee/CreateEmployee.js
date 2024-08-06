import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './CreateEmployee.scss';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from "react-redux";
import {addEmployee, setEmployees} from "../../features/employee/employeeSlice";
import {DatePicker} from "react-date-picker";
import {format} from 'date-fns';
import {toZonedTime} from 'date-fns-tz';
import {useEffect, useState} from "react";
import PopUp from "../../components/PopUp/PopUp";
import SimpleDropdown from 'simple-dropdown-library';


function CreateEmployee() {
    const employees = useSelector((state) => state.employeeSlice.employees);
    const {control, register, setValue, handleSubmit, formState: {errors}} = useForm();
    const [displayPopUp, setDisplayPopUp] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = data => {
        const timeZone = 'Europe/Paris';

        const startDateUtc = toZonedTime(data.StartDate, timeZone);
        const dateOfBirthUtc = toZonedTime(data.DateofBirth, timeZone);
        const state = document.querySelector('select[name="State"]').value;
        const departement = document.querySelector('select[name="Department"]').value;

        let cleanData = {
            ...data,
            Department: departement,
            State: state,
            DateofBirth: format(dateOfBirthUtc, 'yyyy-MM-dd'),
            StartDate: format(startDateUtc, 'yyyy-MM-dd'),
        };

        dispatch(addEmployee({data: cleanData}));

        setDisplayPopUp(true);
    };

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

    return (
        <div id="CreateEmployee" className="content">

            {displayPopUp && (
                <PopUp
                    setDisplayPopUp={setDisplayPopUp}
                />
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <legend>Personnal informations</legend>
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
                        <label htmlFor="StartDate">Start date</label>
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
                        <label htmlFor="DateofBirth">Date of birth</label>
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
                </fieldset>

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
                        <SimpleDropdown
                            listeAttributsSelect={{
                                name: "State",
                                id: "State",
                                required: true,
                            }}
                            listeOptions={{
                                "AL": "Alabama",
                                "AK": "Alaska",
                                "AS": "American Samoa",
                                "AZ": "Arizona",
                                "AR": "Arkansas",
                                "CA": "California",
                                "CO": "Colorado",
                                "CT": "Connecticut",
                                "DE": "Delaware",
                                "DC": "District Of Columbia",
                                "FM": "Federated States Of Micronesia",
                                "FL": "Florida",
                                "GA": "Georgia",
                                "GU": "Guam",
                                "HI": "Hawaii",
                                "ID": "Idaho",
                                "IL": "Illinois",
                                "IN": "Indiana",
                                "IA": "Iowa",
                                "KS": "Kansas",
                                "KY": "Kentucky",
                                "LA": "Louisiana",
                                "ME": "Maine",
                                "MH": "Marshall Islands",
                                "MD": "Maryland",
                                "MA": "Massachusetts",
                                "MI": "Michigan",
                                "MN": "Minnesota",
                                "MS": "Mississippi",
                                "MO": "Missouri",
                                "MT": "Montana",
                                "NE": "Nebraska",
                                "NV": "Nevada",
                                "NH": "New Hampshire",
                                "NJ": "New Jersey",
                                "NM": "New Mexico",
                                "NY": "New York",
                                "NC": "North Carolina",
                                "ND": "North Dakota",
                                "MP": "Northern Mariana Islands",
                                "OH": "Ohio",
                                "OK": "Oklahoma",
                                "OR": "Oregon",
                                "PW": "Palau",
                                "PA": "Pennsylvania",
                                "PR": "Puerto Rico",
                                "RI": "Rhode Island",
                                "SC": "South Carolina",
                                "SD": "South Dakota",
                                "TN": "Tennessee",
                                "TX": "Texas",
                                "UT": "Utah",
                                "VT": "Vermont",
                                "VI": "Virgin Islands",
                                "VA": "Virginia",
                                "WA": "Washington",
                                "WV": "West Virginia",
                                "WI": "Wisconsin",
                                "WY": "Wyoming",
                            }}
                            defaultValue="OR"
                        />
                        {errors.State && <span className="error">Ce champs est requis</span>}
                    </div>

                    <div>
                        <label htmlFor="ZipCode">ZipCode</label>
                        <input id="ZipCode" type={"number"} min={0} {...register('ZipCode', {required: true})} />
                        {errors.ZipCode && <span className="error">Ce champs est requis</span>}
                    </div>
                </fieldset>

                <fieldset>
                    <div>
                        <label htmlFor="Department">Departement</label>
                        <SimpleDropdown
                            listeAttributsSelect={{
                                name: "Department",
                                id: "Department",
                                required: true,
                            }}
                            listeOptions={{
                                "Sales": "Sales",
                                "Marketing": "Marketing",
                                "Engineering": "Engineering",
                                "Human": "Human Resources",
                                "Legal": "Legal",
                            }}
                            defaultValue="Human"
                        />
                        {errors.Department && <span className="error">Ce champs est requis</span>}
                    </div>

                    <button>&#128190; Save</button>
                </fieldset>
            </form>
        </div>
    );
}

export default CreateEmployee;
