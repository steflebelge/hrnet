import './CreateEmployee.scss';
import {useForm} from 'react-hook-form';

function CreateEmployee() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = data => console.log(data);

    return (
        <div id="CreateEmployee">
            <form onSubmit={handleSubmit(onSubmit)}>
                <span>
                    <div>
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName" {...register('firstName', {required: true})} />
                        {errors.firstName && <span className="error">Ce champs est requis</span>}
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName" {...register('lastName', {required: true})} />
                        {errors.lastName && <span className="error">Ce champs est requis</span>}
                    </div>
                    <div>
                        <label htmlFor="birthDate">Date of Birth</label>
                        <input id="birthDate" type="date" {...register('birthDate', {required: true})} />
                        {errors.birthDate && <span className="error">Ce champs est requis</span>}
                    </div>
                    <div>
                        <label htmlFor="startDate">Start Date</label>
                        <input id="startDate" type="date" {...register('startDate', {required: true})} />
                        {errors.startDate && <span className="error">Ce champs est requis</span>}
                    </div>
                </span>

                <fieldset>
                    <legend>Address</legend>
                    <div>
                        <label htmlFor="street">Street</label>
                        <input id="street" {...register('street', {required: true})} />
                        {errors.street && <span className="error">Ce champs est requis</span>}
                    </div>

                    <div>
                        <label htmlFor="city">City</label>
                        <input id="city" {...register('city', {required: true})} />
                        {errors.city && <span className="error">Ce champs est requis</span>}
                    </div>

                    <div>
                        <label htmlFor="state">State</label>
                        <select id="state" {...register('state', {required: true})}>
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
                        {errors.state && <span className="error">Ce champs est requis</span>}
                    </div>

                    <div>
                        <label htmlFor="zipCode">ZipCode</label>
                        <input id="zipCode" type={"number"} min={0} {...register('zipCode', {required: true})} />
                        {errors.zipCode && <span className="error">Ce champs est requis</span>}
                    </div>
                </fieldset>

                <div>
                    <label htmlFor="departement">Departement</label>
                    <select id="departement" {...register('departement', {required: true})}>
                        <option value={"Sales"}>Sales</option>
                        <option value={"Marketing"}>Marketing</option>
                        <option value={"Engineering"}>Engineering</option>
                        <option value={"Human"}>Human Resources</option>
                        <option value={"Legal"}>Legal</option>
                    </select>
                    {errors.departement && <span className="error">Ce champs est requis</span>}
                </div>

                <button>&#128190; Enregistrer</button>
            </form>
        </div>
    );
}

export default CreateEmployee;
