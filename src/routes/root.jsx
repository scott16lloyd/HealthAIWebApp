import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function root() {
  return (
    <>
      <div>
        <h1>root.jsx</h1>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/DocBot">DocBot</Link>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
}

export default root;
