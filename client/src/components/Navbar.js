import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid w-50">
          <a class="navbar-brand" href="/">
            Hotel Marittima
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
                      <li><a class="dropdown-item" onClick={logout}>Log Out</a></li>
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
