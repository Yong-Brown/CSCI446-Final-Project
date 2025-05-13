import { Outlet, Link } from "react-router-dom";
import './App.css';
import React, { useState } from 'react';

// We treat `Layout` as the layout of our application.
// The `<Outlet />` delegates renders to the matching child route, if one exists.
function Layout() {

  const [showWelcome, setShowWelcome] = useState(true);

  // Function to hide the Welcome link
  const hideWelcome = () => {
    setShowWelcome(false);
  };

  // Function to show the Welcome link
  const showWelcomeAgain = () => {
    setShowWelcome(true);
  };

  return (
    <>
      
      <header>
        
          <Link to="/" onClick={showWelcomeAgain}><p>☆The MenuScript☆</p></Link>

      </header>
      
      <div className="welcome">
        {showWelcome && (
          <Link to="/restaurant" onClick={hideWelcome}><p>Welcome!</p></Link>
        )}
      </div>
      <Outlet />
      <footer>
        <p>@2024 Final Project</p>
      </footer>
    </>
  );
}


export default Layout;
