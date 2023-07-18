import React from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  const handleDeleteCookie = () => {
    deleteCookie('token');
  };

  function logout() {
    localStorage.removeItem("currentUser");
    //remove cookie named token
    handleDeleteCookie();
    window.location.href = "/login";
  }
  const location = useLocation();

  if (location.pathname === '/') {
    return null; // Hide the Navbar on the "/" path
  }

  return (
    <div>
      <nav class="navbar navbar-expand-md navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand mt-2 mt-lg-0" href="/">
            <img
              src="https://i.ibb.co/SBnVMJh/it-default-23-1.png"
              height="50"
              alt="Hotel Marittima"
              loading="lazy"
            />
          </a>

          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarButtonsExample"
            aria-controls="navbarButtonsExample"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>

          <div class="collapse navbar-collapse justify-content-center" id="navbarButtonsExample">
            {/*<ul class="navbar-nav me-auto">
              <li class="nav-item ms-auto">
                <a class="nav-link" href="/bookings">Prenotazioni</a>
              </li>
            </ul>*/}

            <div class="d-flex align-items-center">
              {user ? (
                <>
                  <div class="dropdown">
                    <button
                      class="btn btn-primary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="fa fa-user me-2"></i> {user.nome}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <li><a class="dropdown-item" href="/profile">Profilo</a></li>
                      {user.isAdmin ? (<li><a class="dropdown-item" href="/admin">Pannello Admin</a></li>):(null)}
                      <li><a class="dropdown-item" onClick={logout} href="">Log Out</a></li>

                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login" class="btn btn-link px-3 me-2">
                    Login
                  </Link>
                  <Link to="/register" class="btn btn-link px-3 me-2">
                    Sign Up
                  </Link>
                </>)}

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
