import {useState} from 'react';
const SignUp=()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleLogin = () => {
      if(!email || !password || !confirmPassword){
        alert("Enter all the details!")
        return
      }
      // API request logic
  
      
  
    };
  
    return (
      <div className="flex flex-col justify-center bg-lavender w-3/5 h-screen leading-8 text-grey text-center py-5 rounded">
        <h1 className="text-3xl font-bold my-5">SignUp  </h1>
        <div className="mx-auto w-3/6 flex flex-col justify-center">
            <div className="flex align-start">
                <label className="block text-grey text-md font-bold mb-2">
                    Email
                </label>
            </div>
          <input
            className="shadow rounded py-2 px-3 text-grey mb-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mx-auto w-3/6 flex flex-col justify-center">
            <div className="flex align-start">
                <label className="block text-grey text-md font-bold mb-2">
                    Password:
                </label>
            </div>
          <input
            className=" shadow   border rounded py-2 px-3 text-grey-darker mb-4"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mx-auto w-3/6 flex flex-col justify-center">
            <div className="flex align-start">
                <label className="block text-grey text-md font-bold mb-2">
                    Confirm Password:
                </label>
            </div>
          <input
            className=" shadow   border rounded py-2 px-3 text-grey-darker mb-4"
            type="password"
            value={password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="w-3/6 mx-auto">
          <button
            className="w-2/6 bg-buttonBlue text-white font-bold py-1 px-4  rounded"
            type="button"
            onClick={handleLogin}
          >
            SignUp
          </button>
        </div>
      </div>
    );
}

export default SignUp;