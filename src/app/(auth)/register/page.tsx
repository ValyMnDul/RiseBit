export default function register(){
    return (
        <form>
            <p className="text-[80px] font-bold text-center">Register</p>
            <div>
                <div>
                    <label htmlFor="firstName" >First Name:</label>
                    <input name="firstName" id="firstName" type="text" className="border-1 rounded" ></input>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name:</label>
                    <input name="lastName" id="lastName" type="text" className="border-1 rounded"></input>
                </div>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" className="border-1 rounded"></input>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" className="border-1 rounded"></input>
            </div>
            <div>
                <label htmlFor="cPassword">Confirm Password:</label>
                <input type="password" id="cPassword" name="cPassword" className="border-1 rounded"></input>
            </div>
            <div>
                <label htmlFor="birth">Date of birth:</label>
                <input type="date" id="birth" name="birth" className="border-1 rounded"></input>
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 mt-4">Submit</button>

        </form>
    )
}