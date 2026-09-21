// Configuración de la escena 3D
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Iluminación
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffd700, 1.5);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// Grupo principal de la Flor
const flowerGroup = new THREE.Group();

// Centro de la flor
const centerGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.3, 32);
const centerMat = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.8 });
const centerMesh = new THREE.Mesh(centerGeo, centerMat);
centerMesh.rotation.x = Math.PI / 2;
flowerGroup.add(centerMesh);

// Pétalos amarillos
const petalGeo = new THREE.ConeGeometry(0.4, 2.2, 16);
const petalMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.2, roughness: 0.3 });

const petalCount = 16;
for (let i = 0; i < petalCount; i++) {
  const angle = (i / petalCount) * Math.PI * 2;
  const petal = new THREE.Mesh(petalGeo, petalMat);
  petal.position.x = Math.cos(angle) * 1.8;
  petal.position.y = Math.sin(angle) * 1.8;
  petal.rotation.z = angle - Math.PI / 2;
  flowerGroup.add(petal);
}

scene.add(flowerGroup);

// Partículas doradas
const particleCount = 400;
const particleGeo = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 12;
}

particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleMat = new THREE.PointsMaterial({ color: 0xffea00, size: 0.08, transparent: true, opacity: 0.8 });
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

camera.position.z = 6;

function animate() {
  requestAnimationFrame(animate);
  flowerGroup.rotation.y += 0.008;
  flowerGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
  particles.rotation.y -= 0.002;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// LISTA DE TUS 10 POEMAS PERSONALIZADOS
const poemas = [
  "No sé qué versión de mí te tocó conocer, pero te juro que con nadie más soy tan yo como cuando estoy contigo.",
  "Si las rosas son hermosas y las estrellas son bellas, más hermosa eres tú que no te comparas con ninguna de ellas.",
  "Te quiero así como eres, con todo lo bueno que no ves. Con todo lo malo que dices tener.",
  "Qué ironía que, aunque nunca me gustó el café, me enamoré del café de tus ojos.",
  "Si no llego al lunes, quiero que sepas que de igual manera te amaré el martes.",
  "Si me preguntas cuántas veces viniste a mi mente, diría solo una vez, porque llegaste y nunca te fuiste.",
  "Y cuando vi tu sonrisa, lo supe. Esa era la sonrisa que quería ver siempre al despertar durante el resto de mi vida.",
  "Si quieres saber cuántas razones tengo para amarte, tendrás que contar mis latidos.",
  "Toda tú eres bella, amada mía; no hay en ti defecto alguno (Cantares 4:7).",
  "Mi amada es, entre las mujeres, como una rosa entre los espinos (Cantares 2:2)."
];

let indiceActual = 0;
const card = document.getElementById('card');

function mostrarSiguientePoema() {
  const tituloNumero = document.getElementById('poema-numero');
  const textoPoema = document.getElementById('poema-texto');
  
  if (tituloNumero && textoPoema) {
    tituloNumero.textContent = `Poema #${indiceActual + 1} de 10`;
    textoPoema.textContent = poemas[indiceActual];
    
    // Avanza en orden del 1 al 10 y luego reinicia
    indiceActual = (indiceActual + 1) % poemas.length;
  }
}

// Abrir carta al tocar la pantalla
window.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' || e.target.closest('.button')) return;
  mostrarSiguientePoema();
  card.classList.add('active');
});

// Cerrar la carta
function cerrarCarta(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  card.classList.remove('active');
}
