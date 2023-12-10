import "./style.css";
import { useState, useEffect } from "react";
import { FaBars, FaBowlFood,FaDumbbell } from "react-icons/fa6";
import {
  AiOutlineDashboard,
  AiOutlineSearch,
  AiOutlineClose,
  // AiFillSetting,
  AiOutlineLogout,
  AiFillBell,
} from "react-icons/ai";
import { CgGym } from "react-icons/cg";
import Users from "../../../components/AdminDashboardComponents/Users/Users";
import AdminUsers from "../../../components/AdminDashboardComponents/Admin users/Adminusers";
import Addworkout from "../../../components/AdminDashboardComponents/Add Workout/Addworkout";


export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [activePage, setActivePage] = useState("Users");
  const switchPage = (page) => {
    setActivePage(page);
  };
  useEffect(() => {
    const sidebar = document.getElementById("sidebar");
    const searchButton = document.querySelector(
      "#content nav form .form-input button"
    );
    const searchButtonIcon = document.querySelector(
      "#content nav form .form-input button .bx"
    );
    const searchForm = document.querySelector("#content nav form");

    const handleSearchButtonClick = (e) => {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle("show");
        if (searchForm.classList.contains("show")) {
          searchButtonIcon.classList.replace("bx-search", "bx-x");

          setShow("show");
        } else {
          searchButtonIcon.classList.replace("bx-x", "bx-search");

          setShow("");
        }
      }
    };

    searchButton.addEventListener("click", handleSearchButtonClick);

    if (window.innerWidth < 768) {
      sidebar.classList.add("hide");
    } else if (window.innerWidth > 576) {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
      searchForm.classList.remove("show");
    }

    const handleResize = () => {
      if (window.innerWidth > 576) {
        searchButtonIcon.classList.replace("bx-x", "bx-search");
        searchForm.classList.remove("show");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      searchButton.removeEventListener("click", handleSearchButtonClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <section id="sidebar" className={isSidebarOpen ? "hide" : ""}>
        <a href="/#" className="brand">
          <i className="bx">
            {/* <img src={Logo} alt="logo" style={{width:30}}/> */}
            <CgGym size={40}/>

          </i>
          <span className="text">Fitbit Admin</span>
        </a>
        <ul className="side-menu top">
          {/* <li className={activePage === "Dashboard" ? "active" : ""}>
            <a href="/#" onClick={() => switchPage("Dashboard")}>
              <i className="bx">
                <AiOutlineDashboard size={20} />
              </i>
              <span className="text">Dashboard</span>
            </a>
          </li> */}
          <li className={activePage === "Users" ? "active" : ""}>
            <a href="/#" onClick={() => switchPage("Users")}>
              <i className="bx bxs-dashboard">
                <FaDumbbell size={20} />
              </i>
              <span className="text">Users</span>
            </a>
          </li>
          <li className={activePage === "admins" ? "active" : ""}>
            <a href="/#" onClick={() => switchPage("admins")}>
              <i className="bx">
                <FaBowlFood size={20} />
              </i>
              <span className="text">Admins</span>
            </a>
          </li>
          <li className={activePage === "Addworkout" ? "active" : ""}>
            <a href="/#" onClick={() => switchPage("Addworkout")}>
              <i className="bx">
                <AiOutlineDashboard size={20} />
              </i>
              <span className="text">Addworkout</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          {/* <li className={activePage === "settings" ? "active" : ""}>
            <a href="/#" onClick={() => switchPage("settings")}>
              <i className="bx bxs-cog">
                <AiFillSetting size={20} />
              </i>
              <span className="text">Settings</span>
            </a>
          </li> */}
          <li>
            <a href="/#" className="logout" onClick={handleLogout}>
              <i className="bx bxs-log-out-circle">
                <AiOutlineLogout size={20} />
              </i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>
      <section id="content">
        <nav>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <a href="/#" className=" nav-link">
            Categories
          </a>
          <form action="#">
            <div className="form-input">
              <input
                type="search"
                placeholder="Search..."
                onChange={handleSearch}
              />
              <button className="search-btn">
                <i className="bx">
                  {show ? <AiOutlineClose /> : <AiOutlineSearch />}
                </i>
              </button>
            </div>
          </form>
          <input
            type="checkbox"
            id="switch-mode"
            hidden
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <div className="notification">
            <a href="/#">
              <div className="notBtn">
                <span className="num">9</span>
                <i className="bx">
                  <AiFillBell />
                </i>
              </div>
            </a>
          </div>
          <a href="/#" className="profile trigger">
            {/* <RxAvatar size={20}/> */}
            {/* <img></img> */}
          </a>
          {/* <button className="btn" onClick={handleLogout}>
        Logout
      </button> */}
        </nav>
        <main>
        {activePage === "Users" && <Users/>}
        {activePage==="admins"&&<AdminUsers/>}
        {activePage==="Addworkout"&&<Addworkout/>}

        
        {/* {activePage === "Dashboard" && <Dashboard searchvalue={search} />}
        {activePage === "Diet" && <Diet />} */}
          {/* 
          {activePage === "settings" && <Settings />}
          {activePage==="trade" && <Trade/>} */}
        </main>
      </section>
    </>
  );
}
