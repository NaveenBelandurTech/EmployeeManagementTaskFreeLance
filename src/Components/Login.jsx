import { useRef, useState } from "react";
import Validation from "../utils/validation";
import { Auth } from "../utils/constant";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const Password = useRef();
  const Email = useRef();
  const [hide, setHide] = useState(false);
  const [error, setError] = useState("");

  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleClick = () => {
    const username = "Default";
    const isValid = Validation(
      username,
      Password.current.value,
      Email.current.value,
    );
    setError(isValid);
    signInWithEmailAndPassword(
      Auth,
      Email.current.value,
      Password.current.value,
    )
      .then((userCredential) => {
        const user = userCredential.user.uid;
        const email = userCredential.user.email;
        const formData = { user, email };
        Dispatch(addUser(formData));
        toast.success("Login SuccessFully");
        Navigate("/Employee");
        if (user) {
          Password.current.value = "";
          Email.current.value = "";
        }
      })

      .catch((error) => {
        console.log(error, "error");
        const errorCode = error.code;
        const errorMessage = error.message;
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
            Login
          </h2>

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
              className="text-sm cursor-pointer flex justify-end"
              onClick={() => setHide(!hide)}
            >
              {hide ? "Hide" : "Show"} Password
            </span>

            {error && <span className="text-md text-red-500">{error}</span>}
          </div>

          <button
            onClick={handleClick}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 cursor-pointer transition duration-200"
          >
            Login
          </button>
          <div className="flex justify-start">
            <p>
              New User{" "}
              <Link className="text-blue-400 cursor-pointer" to="/Register">
                Register
              </Link>{" "}
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
