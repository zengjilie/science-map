import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import data from './10_data.json' assert {type: 'json'}; //https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules/

//Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);

//Renderer
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#app') });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//Camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 10);

// lights

const dirLight1 = new THREE.DirectionalLight(0xffffff);
dirLight1.position.set(1, 1, 1);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0xffffff);
dirLight2.position.set(- 1, - 1, - 1);
scene.add(dirLight2);

const ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

//Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.listenToKeyEvents(window); // optional
//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;

controls.screenSpacePanning = false;

controls.minDistance = 60;
controls.maxDistance = 500;

controls.maxPolarAngle = Math.PI;

//Objects
data.data.forEach(e => {
    const geometry = new THREE.SphereGeometry(0.2, 32, 16);
    const material = new THREE.MeshPhongMaterial({ color: e.color, flatShading: true });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = e.comp1;
    mesh.position.y = e.comp2;
    mesh.position.z = e.comp3;
    scene.add(mesh);
})

// const geometry = new THREE.SphereGeometry(15, 32, 16);
// const material = new THREE.MeshPhongMaterial({ color: '049ef4', flatShading: true });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.x = 1;
// mesh.position.y = 1;
// mesh.position.z = 1;
// scene.add(mesh);

console.log(scene);



//Animate
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();