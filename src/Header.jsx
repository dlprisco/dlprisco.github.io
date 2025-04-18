import React, { useEffect, useRef, useState } from "react";

function Header() {
  const canvasRef = useRef(null);
  const [randomColor, setRandomColor] = useState("#00F0FF");

  useEffect(() => {
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  // Asignamos las dimensiones del canvas
  canvas.width = 500;
  canvas.height = 500;

  let angulo = 0;
  // Velocidades individuales para la rotación de cada cuadrado
  let velocidades = [0.8, -1, 0.2, -0.06, 3];


  function dibujar() {
    // Limpiamos el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Trasladamos el origen al centro del canvas
    ctx.translate(canvas.width / 2, canvas.height / 2);

    // -----------------------------------------------
    // 1. Dibujar el círculo completo en un tono azul claro
    // -----------------------------------------------
    ctx.beginPath();
    ctx.arc(0, 0, 130, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#ADD8E6"; // Tono azul claro
    ctx.stroke();

    // -----------------------------------------------
    // 2. Dibujar arcos en las "esquinas" del círculo
    // -----------------------------------------------
    // Usamos la rotación del primer cuadrado como referencia:
    let baseRotation = angulo * velocidades[4];
    // delta define la amplitud de cada arco (en radianes)
    const delta = 0.5;
    // Se dibujan 4 arcos, uno por cada "esquina"
    for (let k = 0; k < 4; k++) {
      let cornerAngle = baseRotation + Math.PI / 4 + k * (Math.PI / 2);
      ctx.beginPath();
      ctx.arc(0, 0, 130, cornerAngle, cornerAngle + delta);
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#0F4C81"; // Azul metalizado oscuro
      ctx.stroke();
    }

    // -----------------------------------------------
    // 3. Dibujar tres cuadrados con rotación individual
    // -----------------------------------------------
    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.rotate(angulo * velocidades[i]);
      ctx.beginPath();
      let size = (3 - i) * 60; // Tamaño del cuadrado (de mayor a menor)
      ctx.rect(-size / 2, -size / 2, size, size);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#0F4C81"; // Azul metalizado oscuro
      ctx.stroke();
      ctx.restore();
    }

    // Restaura el contexto para el siguiente frame
    ctx.resetTransform();

    // Incrementa el ángulo para la animación
    angulo += 0.02;
    requestAnimationFrame(dibujar);
  }
  setRandomColor(getRandomColor());
  dibujar();
}, []);

  return (
    <header>
      <div className="header-container">
        {/* Sección izquierda: Texto */}
        <div className="intro-text">
          <div className="intro-heading">
            <h1>Hola mi nombre es Daniel Prisco. Soy nuevo en la programación y diseño web.</h1>
          </div>

          <div className="intro-lead-in" style={{ "--random-color": randomColor }}>
      Python • C++ • Java • SQL • JavaScript • CSS • HTML
    </div>
          <div className="opaque-square">
          <p>
          	<span role="img" aria-label="emoticon">🎯</span> me gusta realizar diferentes practicas y resolver acertijos de codigo abierto durante mis tiempos libres. 
          </p>
        </div>
        </div>
        {/* Sección derecha: Canvas con animación */}
        <div className="canvas-section">
          <canvas ref={canvasRef} id="miCanvas"></canvas>
        </div>
      </div>
    </header>
  );
}

export default Header;
