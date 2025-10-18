import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './nav.css';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-inner">
        {/* Brand / Logo */}
        <Link to="/" className="brand" aria-label="NutriMama Home">
          <div className="logo" aria-hidden>NM</div>
          <div>
            <div style={{ fontWeight: 700 }}>NutriMama</div>
            <div style={{ fontSize: 12, color: '#7b7f92' }}>Pregnancy & Wellness</div>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links" role="menubar">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'navlink-active' : undefined)}>
            Home
          </NavLink>
          <NavLink to="/nutrition" className={({ isActive }) => (isActive ? 'navlink-active' : undefined)}>
            Nutrition
          </NavLink>
          <NavLink to="/pregnancy" className={({ isActive }) => (isActive ? 'navlink-active' : undefined)}>
            Pregnancy Tips
          </NavLink>
          <NavLink to="/symptom" className={({ isActive }) => (isActive ? 'navlink-active' : undefined)}>
            Symptom Checker
          </NavLink>
          <NavLink to="/doctors" className={({ isActive }) => (isActive ? 'navlink-active' : undefined)}>
            Find Doctors
          </NavLink>
        </div>

        {/* CTA Button */}
        <div className="row">
          <button
            className="btn-primary pulse"
            onClick={() => navigate('/')}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
