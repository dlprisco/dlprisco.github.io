// Nav.js
import React, { useEffect } from 'react';
import './Nav.css';

function Nav() {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      const scrollPos = window.scrollY;
      const revealPoint = 60; // Umbral en px para que la navbar quede fija

      if (scrollPos < revealPoint) {
        // Mientras el scroll sea menor a revealPoint, mueve la navbar proporcionalmente
        navbar.style.top = (-revealPoint + scrollPos) + 'px';
      } else {
        // Cuando supera el umbral, fija la navbar arriba
        navbar.style.top = '0';
      }
    };

    // Agrega el listener al evento scroll
    window.addEventListener('scroll', handleScroll);

    // Limpieza: remueve el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav id="navbar" className="navbar navbar-default navbar-shrink">
        <div className="container">
          <a className="navbar-brand page-scroll" href="#page-top">
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Fondo: Cuadrado gris */}
              <rect x="2" y="2" width="26" height="26" rx="5" fill="#808080" />
              {/* Círculo sin relleno, contorno azul fosforecente */}
              <circle cx="10" cy="10" r="4" fill="none" stroke="#00FFFF" strokeWidth="2" />
              {/* Triángulo sin relleno, contorno azul fosforecente */}
              <polygon points="20,5 27,15 13,15" fill="none" stroke="#00FFFF" strokeWidth="2" />
              {/* Rectángulo rotado sin relleno, contorno azul fosforecente */}
              <rect
                x="7"
                y="18"
                width="6"
                height="4"
                fill="none"
                stroke="#00FFFF"
                strokeWidth="2"
                transform="rotate(15 10 20)"
              />
            </svg>
            Daniel Prisco
          </a>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1"></div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
