import { useRef, useState } from "react";
import Validation from "../utils/validation";
import { Auth } from "../utils/constant";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Register = () => {
  const Username = useRef();
  const Password = useRef();
  const Email = useRef();
  const [hide, setHide] = useState(false);
  const [error, setError] = useState("");
  const Dispatch = useDispatch();

  const handleClick = () => {
    const isValid = Validation(
      Username.current.value,
      Password.current.value,
      Email.current.value,
    );
    const name = Username.current.value;
    createUserWithEmailAndPassword(
      Auth,
      Email.current.value,
      Password.current.value,
    )
      .then((userCredential) => {
        const user = userCredential.user;
        {
          const userList = user.uid;
          const email = user.email;
          const formData = { userList, email };
          Dispatch(addUser(formData));
        }
        if (user) {
          updateProfile(Auth.currentUser, {
            displayName: Username.current.value,
          }).then((response) => {
            toast.success("Registered SuccessFully ");
            Username.current.value = "";
            Password.current.value = "";
            Email.current.value = "";
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode || errorMessage);
      });
  };

  return (
    <>
      <ToastContainer />
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Register
          </h2>

          <div className="flex flex-col space-y-1">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              maxLength={21}
              ref={Username}
              id="username"
              type="text"
              name="username"
              placeholder="Your User Name"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              id="password"
              ref={Password}
              type={hide ? "text" : "password"}
              name="password"
              placeholder="Your Password"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <span
              className="text-sm cursor-pointer "
              onClick={() => setHide(!hide)}
            >
              {hide ? "Hide" : "Show"} Password
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              id="email"
              ref={Email}
              type="email"
              name="email"
              placeholder="Your Email"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && <span className="text-md text-red-500">{error}</span>}
          </div>

          <button
            onClick={handleClick}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 cursor-pointer transition duration-200"
          >
            Register
          </button>
          <div className="flex justify-start">
            <p>
              Already User{" "}
              <Link className="text-blue-400 cursor-pointer" to="/">
                Login
              </Link>{" "}
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Register;
