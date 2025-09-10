
import './App.css';
import Confetti from './Confetti';
import MusicPlayer from './MusicPlayer';
import React, { useState } from 'react';


function SobreAnimado({ onAbrir }) {
  // Animación simple de sobre con sello de corazón
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',background:'linear-gradient(120deg,#fbeee6 60%,#f8eaea 100%)'}}>
      <button
        onClick={onAbrir}
        aria-label="Abrir carta de cumpleaños"
        style={{
          background:'none',
          border:'none',
          cursor:'pointer',
          outline:'none',
          display:'flex',
          flexDirection:'column',
          alignItems:'center',
          gap:'18px'
        }}
      >
        <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{filter:'drop-shadow(0 4px 16px #e5737344)'}}>
          <rect x="10" y="30" width="160" height="80" rx="12" fill="#fff8f0" stroke="#e57373" strokeWidth="3"/>
          <polygon points="10,30 90,90 170,30" fill="#ffe0e0" stroke="#e57373" strokeWidth="3"/>
          <polygon points="10,110 90,60 170,110" fill="#fff" stroke="#e57373" strokeWidth="3"/>
          <circle cx="90" cy="60" r="18" fill="#e57373" stroke="#fff" strokeWidth="3"/>
          <path d="M90 70 Q95 60 90 55 Q85 60 90 70 Z" fill="#fff"/>
          <path d="M90 65 Q92 62 90 60 Q88 62 90 65 Z" fill="#fff"/>
          <text x="90" y="65" textAnchor="middle" fontSize="28" fontFamily="Arial" fill="#fff">❤</text>
        </svg>
        <span style={{fontSize:'1.2em',color:'#e57373',fontWeight:'bold',letterSpacing:'1px'}}>Haz clic para abrir tu carta</span>
      </button>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sobreAbierto, setSobreAbierto] = useState(false);

  const handleSurprise = () => {
    setShowMessage(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  // Imagenes de fondo para el efecto espejo infinito y aleatorio
  const fondoImagenes = [
    '/images/imagen1.jpg','/images/imagen2.jpg','/images/imagen3.jpg','/images/imagen4.jpg',
    '/images/imagen5.jpg','/images/imagen6.jpg','/images/imagen7.jpg','/images/imagen8.jpg',
    '/images/imagen9.jpg','/images/imagen10.jpg','/images/imagen11.jpg','/images/imagen12.jpg',
    '/images/imagen13.jpg','/images/imagen14.jpg','/images/imagen15.jpg','/images/imagen16.jpg'
  ];


  // Opción 10: Cambiar el orden aleatorio de las imágenes de fondo cada cierto tiempo
  const [fondoEspejo, setFondoEspejo] = useState(() => {
    function mezclarArray(array) {
      const arr = array.slice();
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    const fondoAleatorio = mezclarArray(fondoImagenes);
    return [...fondoAleatorio, ...fondoAleatorio.slice().reverse()];
  });

  // Cambia el fondo cada 30 segundos
  React.useEffect(() => {
    const interval = setInterval(() => {
      function mezclarArray(array) {
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      }
      const fondoAleatorio = mezclarArray(fondoImagenes);
      setFondoEspejo([...fondoAleatorio, ...fondoAleatorio.slice().reverse()]);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!sobreAbierto) {
    return <SobreAnimado onAbrir={() => setSobreAbierto(true)} />;
  }

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div style={{position:'fixed',top:10,right:10,zIndex:30,display:'flex',flexDirection:'column',gap:'10px',alignItems:'flex-end'}}>
        <button
          className="darkmode-btn"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
        >
          {darkMode ? '🌞 Claro' : '🌙 Oscuro'}
        </button>
        <MusicPlayer />
      </div>
      {showConfetti && <Confetti />}
      <div className="marco">
        <div className="fondo" style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',zIndex:1,overflow:'hidden',pointerEvents:'none',display:'flex',flexWrap:'nowrap'}}>
          {fondoEspejo.map((src, idx) => {
            // Parallax: velocidad diferente según la capa
            const mitad = Math.floor(fondoEspejo.length / 2);
            const esIzq = idx < mitad;
            // Velocidad: más cerca = más rápido
            const parallax = 24 + (idx % 4) * 8; // 24s, 32s, 40s, 48s
            return (
              <img
                key={idx}
                src={src}
                alt={`Gatito fondo ${idx+1}`}
                tabIndex={-1}
                style={{
                  width: '18vw',
                  height: '100vh',
                  objectFit: 'cover',
                  flexShrink: 0,
                  animation: `${esIzq ? 'desplazarFondo' : 'desplazarFondoRev'} ${parallax}s linear infinite`,
                  animationDelay: `${(idx / fondoEspejo.length) * parallax}s`,
                  transform: idx % 2 === 0 ? 'scaleX(1)' : 'scaleX(-1)',
                  opacity: 0.82,
                  transition: 'opacity 0.7s, filter 0.7s, transform 0.7s'
                }}
              />
            );
          })}
        </div>

        <div className="contenido" style={{position:'relative',zIndex:3}}>
          <header>
            <h1 className="animated-title">Feliz cumpleaños princesita</h1>
          </header>
          <main>
            <section className="seccion">
              <p className="animated-text">Querida Luz, mi estimada de cabellos lindos, y una mirada penetrante:</p>
              <p className="animated-text">Hay días en los que el mundo parece girar más lento, y en esos instantes —entre el café de la mañana y el susurro de la noche— es cuando más te recuerdo, y me alegro de haberte conocido. Quizas no el recuerdo ams cercano, ni el mas recordado, pero uno que si me hace sonreir, asi como tu me hiciste llegar a hacer sonreir mucho, te quiero bastente.</p>
              <p className="animated-text">Te quiero. Por lo buena persona que eres, sincera, un poquito loquis,Celebro tu existencia y mas en este dia, que es tu dia especial, cuando naciste, esas sonrisas tuyas y ojitos que parecen brillar continuamente: cuando te ríes sin reparo, inclusive cuando te enojas, asi como la primera vez que te vi que hice un pequeño chiste, creo q me pase un poco. Eres <strong>Especial</strong>, en mayúsculas y a todo volumen.</p>
              <p className="animated-text">Y sí, lo admito: He llegado a anhelar volverte a ver, aunque no sabria como reaccionar. Quiero cocinarte tu comida favorita mientras me cuentas cómo te fue hoy, verte como lo que eres, alguien sin filtros, un poco risueña, y realmente buena.</p>
              <p className="animated-text"><strong>Feliz cumpleaños nuevamente</strong>, pues porque de igual manera, siempre estare presente si en algun momento lo necesitas, por eso te digo esto, es un dia para ti, celebrarte, a pesar de que ahora ambos estemos en el Blue Side, o lado azul como esa cancion jsjsjsjs.</p>
              <p className="animated-text">Y aunque sé que la vida es impredecible, hoy elijo regalarte esto, y desearte un buen dia. Decido ser honesto, y con una gran sonrisa desearte lo mejor, otro año mas de vida, y eso es algo para celebrar, no sabre si te vere en algun momento, pero no niego que de ir a los aviadores siempre pienso en como seria encontrarte de imprevisto.</p>
              <p className="animated-text"><strong>Así que aquí estoy, Luz:</strong><br />
              Con las manos extendidas y queriendo alegrarte el corazon.<br />
              Cuando decidas ver esto, espero sorprenderte, y realmente alegrarte, te estas pasasndo con los chistes de suicidio sabes, no quisiera que murieras, o te pasara algo, no te mereces ninguna tragedia, puras alegrias.</p>
              <p className="animated-text">Hasta entonces, seguiré atesorando cada momento que vivi contigo tuyo como si fuera un tesoro, y es lo que es. Es tu dia especial, se que no ha sido la mejor epoca, ni el mejor mes, pero este dia es de gran conmemoracion, porque naciste.</p>
              <p className="signature animated-text">Con todo lo que soy y deseando lo mejor para ti este dia,<br />Gus</p>
            </section>
            <button
              className="surprise-btn"
              onClick={handleSurprise}
              aria-label="Mostrar mensaje sorpresa"
              style={{margin:'30px auto',display:'block'}}
            >
              🎁 Mensaje Sorpresa
            </button>
            {showMessage && (
              <div
                className="sorpresa-mensaje-contenido"
                style={{
                  margin: '0 auto',
                  maxWidth: 600,
                  padding: '32px 18px 24px 18px',
                  background: 'rgba(255,255,255,0.97)',
                  borderRadius: '22px',
                  boxShadow: '0 8px 32px 0 rgba(231,115,115,0.18)',
                  position: 'relative',
                  fontSize: '1.09em',
                  lineHeight: 1.7,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '22px',
                  marginTop: '10px',
                  marginBottom: '10px',
                  border: '2px solid #e57373',
                  transition: 'all 0.4s'
                }}
                aria-label="Mensaje especial para Luzmar"
              >
                <button
                  onClick={() => setShowMessage(false)}
                  aria-label="Cerrar mensaje sorpresa"
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: '#e57373',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    fontSize: 20,
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px 0 rgba(231,115,115,0.15)',
                    zIndex: 2
                  }}
                  tabIndex={0}
                >
                  ×
                </button>
                <div style={{textAlign:'center'}}>
                  <h2 style={{margin:'0 0 8px 0', fontSize:'2em', color:'#e57373', fontWeight:'bold', letterSpacing:'1px', textShadow:'0 2px 12px #fff'}}>
                    ¡Te quiero mucho, Luz! 🎉
                  </h2>
                  <div style={{fontSize:'1.1em', color:'#b85c5c', fontWeight:'bold', marginBottom:'6px'}}>Gracias por existir y por cada momento especial.</div>
                  <div style={{fontSize:'1.1em', color:'#e57373', fontWeight:'bold'}}>¡Feliz cumpleaños!</div>
                </div>
                <div style={{margin:'0 auto', maxWidth:520}}>
                  <p style={{marginBottom:'12px'}}>
                    Gracias por tu existencia, es un día importante para dejar en claro, que más que una simple persona sí eres, más que solo una chica. Sé que quizás no sean las palabras más creíbles, ni las que te parezcan más honestas, sí, me equivoqué, sí, fallé, te fallé, y eso lo tengo presente, mas no busco recordarte nada de eso en este día, sino más bien, celebrarlo, puesto que es tu día. Quería desearte un feliz cumpleaños, con esto, tómalo como lo que es, algo sincero, para ti, te agradezco por todo, por ser tú, por vivir, por existir, te lo mereces, y que sepas que te quiero. Eres alguien que sobresaldrá, a pesar de la circunstancia, a pesar de lo que ha pasado, has seguido creciendo. Simplemente, gracias <span style={{color:'#e57373', fontWeight:'bold'}}>Luzmar</span>, (Siempre diré que tu nombre completo me parece precioso aunque a ti no te guste, sabes).
                  </p>
                  <p style={{marginBottom:'12px'}}>
                    <strong>GRACIAS A TI</strong><br/>
                    Hoy puedo estar conmigo. He deseado<br/>
                    para ti todo el bien y me acompaña<br/>
                    la bondad del amor. A ti te debo<br/>
                    gozar en soledad la compañía<br/>
                    más difícil del hombre,<br/>
                    la que consigo mismo tiene.<br/>
                    Le has dado a mi semblante sin saberlo<br/>
                    una <span style={{color:'#e57373', fontWeight:'bold'}}>luz</span> interior que me hace fuerte,<br/>
                    para vencer mayores soledades.
                  </p>
                </div>
                <div style={{
                  marginTop: '0',
                  marginBottom: '0',
                  padding: '18px 20px',
                  background: 'linear-gradient(120deg, #fbeee6 60%, #f8eaea 100%)',
                  borderRadius: '16px',
                  boxShadow: '0 4px 18px 0 #e5737322',
                  border: '1.5px solid #e57373',
                  color: '#7a3b3b',
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.08em',
                  fontStyle: 'italic',
                  lineHeight: 1.7
                }}>
                  <div style={{marginBottom: '12px', textAlign: 'center'}}>
                    <span style={{fontSize: '1.2em', color: '#b85c5c', fontWeight: 'bold', fontStyle: 'italic'}}>
                      “Perdón es el acto de la valentía suprema, porque quien perdona se libera a sí mismo.”
                    </span><br/>
                    <span style={{fontWeight:'bold', color:'#e57373'}}>— Paulo Coelho</span>
                  </div>
                  <div style={{marginBottom: '18px', textAlign: 'center', fontStyle: 'normal', color: '#a05c5c', fontSize: '1em'}}>
                    Quiero pedirte <span style={{fontWeight:'bold', color:'#e57373'}}>perdón</span>, de corazón, por mis errores y por cualquier dolor que te haya causado.<br/>
                    Reconozco mis fallas y deseo que algún día puedas perdonarme, porque tu paz y felicidad son importantes para mí.
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.7)',
                    borderRadius: '10px',
                    padding: '12px 10px',
                    margin: '0 auto',
                    maxWidth: 420,
                    boxShadow: '0 2px 8px 0 #e5737311',
                    color: '#7a3b3b',
                    fontStyle: 'italic',
                    fontSize: '1em',
                    borderLeft: '4px solid #e57373'
                  }}>
                    <p style={{marginBottom: '8px'}}>
                      Asomaba a sus ojos una lágrima<br/>
                      y a mis labios una frase de perdón...<br/>
                      Habló el orgullo y se enjugó su llanto,<br/>
                      y la frase en mis labios expiró.<br/>
                    </p>
                    <p style={{marginBottom: '8px'}}>
                      Yo voy por un camino, ella por otro;<br/>
                      pero al pensar en nuestro mutuo amor,<br/>
                      yo digo aún: ¿por qué callé aquél día?<br/>
                      y ella dirá. ¿Por qué no lloré yo?<br/>
                    </p>
                    <p style={{marginBottom: '8px'}}>
                      Es cuestión de palabras,<br/>
                      y, no obstante,<br/>
                      ni tu ni yo jamás,<br/>
                      después de lo pasado convendremos<br/>
                      en quién la culpa está
                    </p>
                    <p style={{marginBottom: 0}}>
                      ¡Lástima que el amor un diccionario<br/>
                      no tenga donde hallar<br/>
                      cuando el orgullo es simplemente orgullo<br/>
                      y cuando es dignidad<br/>
                      <span style={{fontWeight:'bold', color:'#e57373'}}>— Gustavo Adolfo Bécquer</span>
                    </p>
                  </div>
                </div>
                <div style={{
                  marginTop: '0',
                  marginBottom: '0',
                  padding: '16px 18px',
                  background: 'linear-gradient(120deg, #e3f0ff 60%, #f8faff 100%)',
                  borderRadius: '14px',
                  boxShadow: '0 2px 12px 0 #7ec8e32a',
                  border: '1.5px solid #7ec8e3',
                  color: '#2a4a6b',
                  fontFamily: 'Georgia, serif',
                  fontSize: '1.05em',
                  lineHeight: 1.7
                }}>
                  <div style={{fontWeight:'bold', color:'#3b5998', fontSize:'1.1em', marginBottom:'10px', textAlign:'center'}}>
                    Frases bonitas de BTS
                  </div>
                  <ul style={{paddingLeft:'18px', margin:0}}>
                    <li style={{marginBottom:'8px'}}>
                      “Cause I, I’m in the stars tonight”<br/>
                      <span style={{color:'#7ec8e3', fontWeight:'bold'}}>— Dynamite</span>
                    </li>
                    <li style={{marginBottom:'8px'}}>
                      “You can’t stop me loving myself”<br/>
                      <span style={{color:'#7ec8e3', fontWeight:'bold'}}>— IDOL</span>
                    </li>
                    <li style={{marginBottom:'8px'}}>
                      “Even if you’re in pain, you can smile for me”<br/>
                      <span style={{color:'#7ec8e3', fontWeight:'bold'}}>— Magic Shop</span>
                    </li>
                    <li style={{marginBottom:'8px'}}>
                      “Maybe I can never fly like those flower petals over there, but I will try to reach you with my little steps”<br/>
                      <span style={{color:'#7ec8e3', fontWeight:'bold'}}>— Spring Day</span>
                    </li>
                    <li style={{marginBottom:'8px'}}>
                      “In the dark night (don’t be lonely), like the stars (we shine), don’t disappear, because you’re a great existence”<br/>
                      <span style={{color:'#7ec8e3', fontWeight:'bold'}}>— Mikrokosmos</span>
                    </li>
                    <li style={{marginBottom:'8px'}}>
                      “If you can’t fly, then run. Today we will survive.”<br/>
                      <span style={{color:'#7ec8e3', fontWeight:'bold'}}>— Not Today</span>
                    </li>
                    <li style={{marginBottom:'8px'}}>
                      “You’re my light, you’re my star, you’re my sky”<br/>
                      <span style={{color:'#7ec8e3', fontWeight:'bold'}}>— Magic Shop</span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 4000);
                  }}
                  style={{
                    marginTop: 18,
                    background: '#fff',
                    color: '#e57373',
                    border: '2px solid #e57373',
                    borderRadius: 8,
                    padding: '8px 18px',
                    fontWeight: 'bold',
                    fontSize: '1em',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px 0 rgba(231,115,115,0.10)'
                  }}
                  aria-label="Celebrar con confeti"
                  tabIndex={0}
                >
                  🎉 ¡Celebrar de nuevo!
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; 2025 Suggus1899. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
