import React from "react";

function Confetti() {
  return (
    <div className="confetti-container" aria-hidden="true">
      {/* Aquí se pueden agregar elementos de confeti animados con CSS */}
      {[...Array(30)].map((_, i) => (
        <div key={i} className="confetti" />
      ))}
    </div>
  );
}

export default Confetti;
