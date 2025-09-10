import React, { useRef, useState, useEffect } from "react";


// Subtítulos: cada objeto tiene tiempo (segundos) y texto
const subtitles = [
  { t: 0, text: "Lado Azul / Blue Side" },
  { t: 3, text: "Todo cambió entre nosotros, grito solo, azul" },
  { t: 7, text: "모든 게 변해버린 우리 사이 나 홀로 외쳐 blue" },
  { t: 11, text: "Soy pintado por ti, lágrimas azul oscuro se forman, azul" },
  { t: 15, text: "너로 인해 물들어 새파란 눈물이 맺혀 blue" },
  { t: 19, text: "La primavera, el verano, el otoño y el invierno, siempre el mismo sentimiento, azul" },
  { t: 23, text: "봄 여름 가을 겨울 항상 그 느낌 그대로 blue" },
  { t: 27, text: "Quiero volver a esa época en la que no sabía nada, azul" },
  { t: 31, text: "돌아가고 싶어 아무것도 모르던 그때로 blue" },
  // ...continúa agregando los versos con su tiempo aproximado...
  { t: 36, text: "Lado azul, lado azul / Blue side, blue side" },
  { t: 40, text: "Volver al lado azul, lado azul / Back to blue side, blue side" },
  // ...puedes seguir agregando más líneas y tiempos...
];

function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Actualiza el tiempo actual y el subtítulo
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handler = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', handler);
    return () => audio.removeEventListener('timeupdate', handler);
  }, []);

  // Cambia el subtítulo según el tiempo
  useEffect(() => {
    for (let i = subtitles.length - 1; i >= 0; i--) {
      if (currentTime >= subtitles[i].t) {
        setCurrentIdx(i);
        break;
      }
    }
  }, [currentTime]);

  const togglePlay = () => {
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="music-player" style={{flexDirection:'column',alignItems:'center',gap:6}}>
      <audio ref={audioRef} src="/music.mp3" loop />
      <button onClick={togglePlay} aria-label={playing ? "Pausar música" : "Reproducir música"}>
        {playing ? "⏸️ Pausar" : "▶️ Reproducir"}
      </button>
      {playing && (
        <div className="subtitulos-musica" style={{marginTop:8,minHeight:32,maxWidth:320,textAlign:'center',fontSize:'1.08em',color:'#1976d2',background:'#fff8',borderRadius:8,padding:'4px 8px',boxShadow:'0 2px 8px #1976d211',transition:'background 0.3s'}}>
          {subtitles[currentIdx]?.text || ''}
        </div>
      )}
    </div>
  );
}

export default MusicPlayer;
