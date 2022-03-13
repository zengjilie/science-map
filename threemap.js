import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import data from './Pro'
//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);

//renderer
const renderer = new THREE.WebGLRenderer({canvas:document.querySelector('#app')});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 1000);


// controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.listenToKeyEvents( window ); // optional
//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;

controls.screenSpacePanning = false;

controls.minDistance = 100;
controls.maxDistance = 500;

controls.maxPolarAngle = Math.PI / 2;

//objects
const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = 50;
mesh.position.y = 50;
mesh.position.z = 50;

scene.add(mesh);
console.log(scene);
//animate

function animate(){
    requestAnimationFrame( animate );
    controls.update();
    renderer.render(scene, camera);
}

animate();