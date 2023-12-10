import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Header from "../../components/Header/Header";
import apiService from "../../service/API";
// import Footer from '../Footer/Footer'

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    height: "",
    weight: "",
    password: "",
    gender: "male",
    healthGoal: "weightloss",
    activityLevel: "sedentary",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    if (
      input.name === "gender" ||
      input.name === "healthGoal" ||
      input.name === "activityLevel"
    ) {
      setData({ ...data, [input.name]: input.value });
    } else {
      setData({ ...data, [input.name]: input.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const { confirmPassword, ...postData } = data;
      await apiService.signup(postData);
      navigate('/login'); // Assuming you're using Gatsby for routing
      console.log('Signup successful');
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
    <Header/>
    <div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div className={styles.input_container}>
          <input
              type="text"
              placeholder="First Name"
              name="firstName"
              autoComplete="given-name"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              autoComplete="family-name"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.input_container}>
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
            <div className={styles.radiobutton}>
              <label className={styles.radio_label}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={data.gender === "male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label className={styles.radio_label}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={data.gender === "female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>
            <div className={styles.input_container}>
            <input
              type="number"
              placeholder="age"
              name="age"
              onChange={handleChange}
              value={data.age}
              required
              className={styles.age}
            />
            <input
              type="number"
              placeholder="Height in cm"
              name="height"
              onChange={handleChange}
              value={data.height}
              required
              className={styles.height}
            />
            <input
              type="number"
              placeholder="Weight in kg"
              name="weight"
              onChange={handleChange}
              value={data.weight}
              required
              className={styles.weight}
            />
            </div>
            <div className={styles.input_container}>
                          <select
              name="healthGoal"
              onChange={handleChange}
              value={data.healthGoal}
              required
              className={styles.input}
            >
              <option value="weightloss">Weight Loss</option>
              <option value="weightgain">Weight Gain</option>
              <option value="maintain">Maintain Weight</option>
            </select>
            <select
              name="activityLevel"
              onChange={handleChange}
              value={data.activityLevel}
              required
              className={styles.input}
            >
              <option value="sedentary">Sedentary</option>
              <option value="lightly_active">Lightly Active</option>
              <option value="moderately_active">Moderately Active</option>
              <option value="very_active">Very Active</option>
              <option value="super_active">Super Active</option>
            </select>
            </div>
            <div className={styles.input_container}>
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
             <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          autoComplete="new-password" // Use 'new-password' for avoiding browser autofill
          onChange={handleChange}
          value={data.confirmPassword}
          required
          className={styles.input}
        />
            {error && <div className={styles.error_msg}>{error}</div>}
            </div>
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
				</div>
			</div>
		</div>
    {/* <Footer/> */}
    </>
  );
};

export default Signup;
