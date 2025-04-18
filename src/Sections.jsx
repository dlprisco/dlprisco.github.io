import React, { useRef, useEffect, useState } from "react";
import "./Sections.css";
import myImage from "./assets/myImage.jpg";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Sections() {

  return (
    <div className="sections-container">
      {/* Sección 1 */}
     <section>
                 <div>
            <img src={myImage} alt="Mi Imagen de Perfil" loading="lazy" />
          </div>
      </section>
      <section className="section-one">
        <h2 className="section-title">About Me</h2>
        <div className="header-container">

          <div className="subsections-description">
            <div className="grey-border-section">
              <p>Venezuela, San Cristóbal 2001 🔥</p>
              <p>Nací en San Cristóbal y tengo 24 años. Me interesa seguir estudiando ingeniería informática y telecomunicaciones.</p>
            </div>
            <div className="grey-border-section">
              <p>Enfoque 🎯</p>
              <p>Me gustaría especializarme en desarrollo web, blockchain y animaciones 3D en videojuegos.</p>
            </div>
            <div className="grey-border-section">
              <h5>👍 Aspectos Positivos</h5>
              <ul>
                <li>👪 Trabajo en equipo fácilmente</li>
                <li>🏅 Ambiente 100% remoto</li>
                <li>📌 Compilar, ejecutar y probar código</li>
                <li>🍉 Uso herramientas como Chat-GPT</li>
                <li>💢 Administrador de redes sociales</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2 */}
      <section className="section-t">
        <div className="title-container">
          <ul className="suggestion-list">
            <li className="suggestion">
              <h4 className="text">Q&A support</h4>
              <img className="imgembed" src="https://es.stackoverflow.com/users/flair/327285.png"
                alt="Perfil en Stack Overflow" />
            </li>
            <li className="suggestion">
              <h5>Social Networks 👨‍💻</h5>
              <p><i class="bi bi-youtube"></i><a href="https://www.youtube.com/@dlprisco">@dlprisco</a></p>
              <p><i class="bi bi-facebook"></i><a href="https://www.facebook.com/profile.php?id=100092658256294">prisco</a></p>
              <p><i class="bi bi-instagram"></i><a href="https://www.instagram.com/prisco_pris">@prisco_pris</a></p>
              <p><i class="bi bi-twitter-x"></i><a href="https://www.twitter.com/prisco_pris">@prisco_pris</a></p>
              <p><i class="bi bi-tiktok"></i><a href="https://www.tiktok.com/@prisco_pris">@prisco_pris</a></p>
            </li>
            <li className="suggestion">
              <h5>Problemas de código y algoritmos 👾</h5>
              <p><a href="https://leetcode.com/u/prisco/">LeetCode</a></p>
              <p><a href="https://www.hackerrank.com/profile/jellous">HackerRank</a></p>
              <p><a href="https://www.codewars.com/users/hexorhex">CodeWars</a></p>
            </li>
            <li className="suggestion">
              <h5>Aprendizaje 🌴</h5>
              <p><a href="https://codecademy.com">codecademy</a></p>
              <p><a href="https://udemy.com">Udemy</a></p>
              <p><a href="https://coursera.com">Coursera.org</a></p>
              <p>and more others ...</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Sections;
