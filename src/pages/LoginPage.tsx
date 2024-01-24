/** @format */
import { useState } from "react";
import "../assets/styles/pages/LoginPage.scss";
import { useMutation } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SpinnerComponent from "../components/SpinnerComponent";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPass, setIsShowPass] = useState(false);
  const [error, setError] = useState<any>("");

  const navigete = useNavigate();

  const loginMutation = useMutation(async () => {
    const res = await axios.post("https://fakestoreapi.com/auth/login", {
      username,
      password,
    });
    return res.data;
  });

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Missing username or password");
      setTimeout(() => setError(""), 3000);
    } else {
      loginMutation.mutate();
    }
  };

  if (loginMutation.isLoading) {
    return <SpinnerComponent />;
  }

  if (loginMutation.isError) {
    setTimeout(() => setError(""), 3000);
    return setError("Incorect username or password");
  }

  if (loginMutation.isSuccess) {
    navigete("/");
    localStorage.setItem("Usertoken", JSON.stringify(loginMutation.data));
  }

  return (
    <div className='loginPage'>
      <div className='loginForm'>
        <form onSubmit={handleLogin}>
          <div className='formHeader'>
            <h2>Login Form</h2>
          </div>
          <div className='formBody'>
            <input
              type='text'
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='loginFormInput'
            />
            {!isShowPass ? (
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='loginFormInput'
              />
            ) : (
              <input
                type='text'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='loginFormInput'
              />
            )}

            <div className='checkShowPassword'>
              <input
                type='checkbox'
                id='showPassword'
                onClick={() => setIsShowPass(!isShowPass)}
              />
              <label htmlFor='showPassword'>Show password</label>
            </div>

            <span className='error'>{error}</span>
          </div>

          <div className='formFooter'>
            <button className='btnLogin' type='submit'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginPage;
