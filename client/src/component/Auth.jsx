import { useState } from 'react';
import axios from "axios"
import './Auth.css';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [teacherUsername, setTeacherUsername] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [plateMode, setPlateMode] = useState(true);
  const navigate = useNavigate();

  const [fetchedPassword, setFetchedPassword] = useState('');

  const handleStudentLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/check-user`, { params: { username: username } })

      const fetchedPassword = response.data.password;
      setFetchedPassword(fetchedPassword);

      if (password === fetchedPassword && response.data.detail.adminID == undefined) {
        navigate(`/dashboard/profile?user=${encodeURIComponent(username)}`);
      }
      else {
        alert("Login Failed, Wrong Pasword")
      }
    }
    catch {
      alert("Login Failed, User doesn't exitst");
    }

    // axios.post(`${import.meta.env.VITE_API_URL}/add-user`, {username: email, password: password})
    // .then(result => console.llog(result))
    // .catch(err => console.log(err))
    // navigate("/dashboard");
  };

  const handleTeacherLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/check-user`, { params: { username: teacherUsername } })

      const fetchedPassword = response.data.password;
      setFetchedPassword(fetchedPassword);

      if (teacherPassword === fetchedPassword) {
        navigate(`/teacher/profile?user=${encodeURIComponent(teacherUsername)}`);
      }
      else {
        alert("Login Failed, Wrong Pasword")
      }
    }
    catch {
      alert("Login Failed, User doesn't exitst");
    }

    // axios.post(`${import.meta.env.VITE_API_URL}/add-user`, {username: email, password: password})
    // .then(result => console.llog(result))
    // .catch(err => console.log(err))
    // navigate("/dashboard");
  };


return (
  <div className="login-form-container-box">
    <div className="login-form-container">
      <div className={plateMode ? "login-form-plate" : "signup-form-plate"}>
        <div className="plate-title">{plateMode ? "Are you Teacher?" : "Are you Student?"}</div>
        <div className="plate-text">{plateMode ? "Welcome back! Log in to access your teaching tools and resources. Inspire and educate with ease!" : "Welcome back! Log in to pick up right where you left off. Your learning journey continues!"}</div>
        <div className="plate-button" onClick={() => { setPlateMode(!plateMode) }}>Login</div>
      </div>

      <div className="signUp-form-box">
        <h2 className="title">Login as Teacher</h2>

        <form onSubmit={handleTeacherLoginSubmit}>
          <div className="inputBox">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Enter your username"
              value={teacherUsername}
              onChange={(e) => setTeacherUsername(e.target.value)}
              required
            />
          </div>

          <div className="inputBox">
            <FaLock className="icon" />
            <input
              type={showPassword ? "text" : "password"} 
              placeholder="Enter your password"
              value={teacherPassword}
              onChange={(e) => setTeacherPassword(e.target.value)}
              required
              autoComplete='current-password'
            />
          </div>
          <div className="show-password-box">
            <input type="checkbox" name="" id="" className="show-password-check-box" onClick={() => setShowPassword(!showPassword)} />
            <div className="show-password-text">Show Password</div>
          </div>

          <button type="submit" className="signUpBtn">
            Login
          </button>

          <div className="links">
            <Link to="/login">Forgot Password?</Link>
          </div>
        </form>
      </div>


      <div className="login-form-box">
        <h2 className="title" onClick={() => setPlateMode(!plateMode)}>Login as Student</h2>

        <form onSubmit={handleStudentLoginSubmit}>
          <div className="inputBox">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="inputBox">
            <FaLock className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete='current-password'
            />
          </div>
          <div className="show-password-box">
            <input type="checkbox" name="" id="" className="show-password-check-box" onClick={() => setShowPassword(!showPassword)} />
            <div className="show-password-text">Show Password</div>
          </div>

          <button type="submit" className="loginBtn">
            Login
          </button>

          <div className="links">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </div>
  </div>
);
};

export default LoginPage;