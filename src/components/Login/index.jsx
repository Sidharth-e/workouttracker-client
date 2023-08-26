import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import apiService from "../API/API";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.loginUser(data);
      window.location = "/";
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h2 className={styles.heading}>Login to Your Account</h2>
              <input
                type="email"
                placeholder="Email"
                name="email"
                autoComplete="username"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="current-password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.green_btn}>
                Sign In
              </button>
            </form>
          </div>
          <div className={styles.right}>
            <h1 className={styles.heading}>New Here ?</h1>
            <Link to="/signup">
              <button type="button" className={styles.white_btn}>
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
