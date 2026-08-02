//© Zero - Código libre no comercial

// Inicializar la UI
setTimeout(() => {
  // Mostrar texto con efecto typing
  showDedicationText();
  // Mostrar petalos flotando
  startFloatingObjects();
  // Mostrar cuenta regresiva
  showCountdown();
  // Iniciar música de fondo
  playBackgroundMusic();
}, 2500); // Dar algo de tiempo para que la flor empiece a crecer

// Efecto máquina de escribir para el texto de dedicatoria (seguidores)
function getURLParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function showDedicationText() { //seguidores
  let text = getURLParam('text');
  if (!text) {
    text = `Para mi Yadi:\n\nDesde el primer momento supe que eras tú. Tu sonrisa, tu voz, tu forma de ser… todo en ti me hace sentir en casa.\n\nGracias por acompañarme en cada paso, por entenderme incluso en silencio, y por llenar mis días de amor.\n\nTe amo más de lo que las palabras pueden expresar.`;
  } else {
    text = decodeURIComponent(text).replace(/\\n/g, '\n');
  }
  const container = document.getElementById('dedication-text');
  container.classList.add('typing');
  let i = 0;
  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i);
      i++;
      setTimeout(type, text[i - 2] === '\n' ? 350 : 45);
    } else {
      // Al terminar el typing, mostrar la firma animada
      setTimeout(showSignature, 600);
    }
  }
  type();
}

// Firma manuscrita animada
function showSignature() {
  // Cambia para buscar la firma dentro del contenedor de dedicatoria
  const dedication = document.getElementById('dedication-text');
  let signature = dedication.querySelector('#signature');
  if (!signature) {
    signature = document.createElement('div');
    signature.id = 'signature';
    signature.className = 'signature';
    dedication.appendChild(signature);
  }
  let firma = getURLParam('firma');
  signature.textContent = firma ? decodeURIComponent(firma) : "Con amor, Tu negro";
  signature.classList.add('visible');

  // Mostrar las fotos polaroid un momento después de que aparezca la firma
  setTimeout(showPolaroids, 1500);
}



// Controlador de objetos flotantes
function startFloatingObjects() {
  const container = document.getElementById('floating-objects');
  let activeCount = 0;
  const maxActive = 12;

  function spawn() {
    if (activeCount >= maxActive) {
      setTimeout(spawn, 1200);
      return;
    }
    activeCount++;
    let el = document.createElement('div');
    el.className = 'floating-petal';
    el.style.left = `${Math.random() * 90 + 2}%`;
    el.style.top = `105%`;
    el.style.opacity = (0.7 + Math.random() * 0.3).toFixed(2);
    container.appendChild(el);

    const duration = 6000 + Math.random() * 4000;
    const drift = (Math.random() - 0.5) * 60;

    requestAnimationFrame(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`;
      el.style.transform = `translate(${drift}px, -110vh) scale(${(0.8 + Math.random() * 0.5).toFixed(2)}) rotate(${(Math.random() * 360).toFixed(0)}deg)`;
      el.style.opacity = '0.2';
    });

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
      activeCount--;
    }, duration + 500);

    setTimeout(spawn, 600 + Math.random() * 600);
  }
  spawn();
}

// Cuenta regresiva o fecha especial
function showCountdown() {
  const container = document.getElementById('countdown');
  let startParam = getURLParam('start');
  let eventParam = getURLParam('event');
  let startDate = startParam ? new Date(startParam + 'T00:00:00') : new Date('2026-04-26T00:00:00');

  function update() {
    const now = new Date();

    // Calcular el próximo aniversario (cada 26 de mes)
    let eventDate = new Date(now.getFullYear(), now.getMonth(), 26);
    if (now >= eventDate) {
      eventDate.setMonth(eventDate.getMonth() + 1);
    }
    let diff = now - startDate;
    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let eventDiff = eventDate - now;
    let eventDays = Math.max(0, Math.floor(eventDiff / (1000 * 60 * 60 * 24)));
    let eventHours = Math.max(0, Math.floor((eventDiff / (1000 * 60 * 60)) % 24));
    let eventMinutes = Math.max(0, Math.floor((eventDiff / (1000 * 60)) % 60));
    let eventSeconds = Math.max(0, Math.floor((eventDiff / 1000) % 60));

    container.innerHTML =
      `<b>${days}</b> días juntos<br>` +
      `Nuestro aniversario: <b>${eventDays}d ${eventHours}h ${eventMinutes}m ${eventSeconds}s</b>`;
    container.classList.add('visible');
  }
  update();
  setInterval(update, 1000);
}

// --- Música de fondo ---
function playBackgroundMusic() {
  const audio = document.getElementById('bg-music');
  if (!audio) return;

  // --- Opción archivo local por parámetro 'musica' ---
  let musicaParam = getURLParam('musica');
  if (musicaParam) {
    musicaParam = decodeURIComponent(musicaParam).replace(/[^\w\d .\-]/g, '');
    audio.src = 'Music/' + musicaParam;
  } else {
    audio.src = encodeURI("Music/Noel Gallagher's High Flying Birds __ If I Had A Gun... [Sub. Español].mp3");
  }

  audio.onerror = () => {
    if (!audio.dataset.retried) {
      audio.dataset.retried = 'true';
      audio.src = 'Music/song.mp3';
    }
  };

  let btn = document.getElementById('music-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'music-btn';
    btn.textContent = '🎵 Música';
    btn.style.position = 'fixed';
    btn.style.bottom = '18px';
    btn.style.right = '18px';
    btn.style.zIndex = 99;
    btn.style.background = 'rgba(15, 23, 42, 0.85)';
    btn.style.color = '#fff';
    btn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    btn.style.borderRadius = '24px';
    btn.style.padding = '10px 18px';
    btn.style.fontSize = '1.05em';
    btn.style.fontFamily = 'Inter, sans-serif';
    btn.style.cursor = 'pointer';
    btn.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    btn.style.transition = 'transform 0.2s ease, background 0.2s ease';
    document.body.appendChild(btn);
  }

  audio.volume = 0.8;
  audio.loop = true;

  // Intentar reproducir si el navegador lo permite
  audio.play().then(() => {
    btn.textContent = '🔊 Música';
  }).catch(() => {
    btn.textContent = '🎵 Música';
  });

  btn.onclick = () => {
    if (audio.paused) {
      audio.play().then(() => {
        btn.textContent = '🔊 Música';
      }).catch((e) => {
        console.log('Error al reproducir audio:', e);
      });
    } else {
      audio.pause();
      btn.textContent = '🔈 Música';
    }
  };
}

// Intentar reproducir la música lo antes posible (al cargar la página)
window.addEventListener('DOMContentLoaded', () => {
  playBackgroundMusic();
});

// --- Nuevas funciones de mejora ---

// Mostrar fotos Polaroid con desfase para mejor efecto visual
function showPolaroids() {
  const p1 = document.getElementById('polaroid-1');
  const p2 = document.getElementById('polaroid-2');
  if (p1) p1.classList.add('visible');
  setTimeout(() => {
    if (p2) p2.classList.add('visible');
  }, 600);
}

// Crear explosión de pequeños corazoncitos flotantes al hacer clic en los corazones del árbol
function createHeartBurst(x, y) {
  const container = document.getElementById('floating-objects');
  const numHearts = 8;
  const colors = ['#ff4d6d', '#ff758f', '#ff8fa3', '#c1121f', '#ffb3c1'];

  for (let i = 0; i < numHearts; i++) {
    const heart = document.createElement('div');
    heart.className = 'burst-heart';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    heart.style.setProperty('--heart-bg', randomColor);

    container.appendChild(heart);

    const angle = Math.random() * Math.PI * 2;
    const speed = 40 + Math.random() * 80;
    const distanceX = Math.cos(angle) * speed;
    const distanceY = Math.sin(angle) * speed - 60;

    requestAnimationFrame(() => {
      heart.style.transition = 'transform 1s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 1s';
      heart.style.transform = `translate(${distanceX}px, ${distanceY}px) rotate(${Math.random() * 360}deg) scale(0)`;
      heart.style.opacity = '0';
    });

    setTimeout(() => {
      if (heart.parentNode) heart.parentNode.removeChild(heart);
    }, 1100);
  }
}
