const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);

const particleCount = 1500;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {
  const angle = i * 0.1;
  const radius = 0.05 * angle;
  positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5);
  positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
  positions[i * 3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5);
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const material = new THREE.PointsMaterial({ color: 0xffea00, size: 0.08 });
const particles = new THREE.Points(geometry, material);
scene.add(particles);

camera.position.z = 8;
camera.position.y = 3;
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  particles.rotation.y += 0.005;
  renderer.render(scene, camera);
}
animate();

// LISTA DE POEMAS/NOTAS (Puedes agregar o cambiar los que quieras)
const poemas = [
  "Estas flores amarillas son como tú: brillantes, radiantes y llenas de alegría. Gracias por iluminar cada uno de mis días.",
  "Un año y 11 meses juntos, y cada día me enamoro un poco más de ti. Eres mi lugar favorito en el mundo.",
  "No necesito fechas especiales para recordarte lo mucho que te amo, pero hoy celebro nuestra hermosa historia.",
  "Gracias por cada risa, cada abrazo y por estar a mi lado en este camino. Te amo infinitamente."
];

const card = document.getElementById('card');

// Función para mostrar un poema al azar
function mostrarPoemaAleatorio() {
  const textoPoema = card.querySelector('p');
  if (textoPoema) {
    const indice = Math.floor(Math.random() * poemas.length);
    textoPoema.textContent = poemas[indice];
  }
}

// Abrir carta al tocar el fondo
window.addEventListener('click', (e) => {
  // Evita abrir la carta si se tocó el botón de cerrar
  if (e.target.tagName === 'BUTTON' || e.target.closest('.button')) return;
  
  mostrarPoemaAleatorio();
  card.classList.add('active');
});

// Función para cerrar la carta
function cerrarCarta(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation(); // Detiene el evento para que no se reabra
  }
  card.classList.remove('active');
}
