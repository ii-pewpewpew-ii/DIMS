import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg from "../assets/bg_img.png";

const SignUp = () => {
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password || !confirmPassword) {
      alert("Enter all the details!");
      return;
    }
    // API request logic

    axios
      .post("http://localhost:8080/api/auth/signup", {
        emailid: email,
        password,
        firstname: fname,
        lastname: lname,
        username,
      })
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (localStorage.getItem("jwttoken") && localStorage.getItem("username")) {
    navigate("/gallery");
  }
  return (
    <div className="flex flex-row bg-skinColor">
      <div className="flex flex-col justify-center bg-lavender w-3/5 h-screen leading-8 text-grey text-center py-5 rounded">
        <h1 className="text-3xl font-bold my-5">SignUp </h1>
        <div className="mx-auto lg:w-3/6 w-2/5 flex flex-row justify-center">
          <div className="w-3/6 flex flex-col justify-center mr-6">
            <div className="flex align-start">
              <label className="block text-grey text-md font-bold mb-2">
                First Name:
              </label>
            </div>
            <input
              className="shadow rounded py-2 px-3 text-grey mb-2"
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>
          <div className="w-3/6 flex flex-col justify-center">
            <div className="flex align-start">
              <label className="block text-grey text-md font-bold mb-2">
                Last Name:
              </label>
            </div>
            <input
              className="shadow rounded py-2 px-3 text-grey mb-2"
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-auto w-3/6 flex flex-col justify-center">
          <div className="flex align-start">
            <label className="block text-grey text-md font-bold mb-2">
              Username
            </label>
          </div>
          <input
            className="shadow rounded py-2 px-3 text-grey mb-2"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="w-3/6 mx-auto">
          <button
            className="w-3/6 bg-buttonBlue text-white font-bold py-1 px-2  rounded"
            type="button"
            onClick={handleLogin}
          >
            SignUp
          </button>
        </div>
      </div>
      <div className="mx-auto my-auto">
        <img className="" src={bg} alt="bg"/>
      </div>
    </div>
  );
};

export default SignUp;
