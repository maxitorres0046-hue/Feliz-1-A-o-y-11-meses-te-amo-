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

window.addEventListener('click', () => {
  document.getElementById('card').classList.add('active');
});

function cerrarCarta(event) {
  if (event) event.stopPropagation();
  document.getElementById('card').classList.remove('active');
}
