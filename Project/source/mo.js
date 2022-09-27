import {GLTFLoader} from 'GLTFLoader';
import * as THREE from 'three';
import {OrbitControls} from 'OrbitControls';

let scene = new THREE.Scene();
//scene.scale.set(0.0015,0.0015,0.0015);
//scene.background = new THREE.Color('black');
scene.position.set(0,0,1);
scene.background = new THREE.CubeTextureLoader()
.setPath('source/textures/')
.load([
    'space_ft.png',
    'space_bk.png',
    'space_up.png',
    'space_dn.png',
    'space_rt.png',
    'space_lf.png',
]);

let renderer = new THREE.WebGLRenderer({
    canvas : document.querySelector('#canvas'),
    antialias : true
});

let camera = new THREE.PerspectiveCamera(30, 1);
camera.position.set(0,0,5);

let controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.04;
controls.rotateSpeed = 0.6;
controls.update();

let light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

let loader = new GLTFLoader();
loader.load('source/textures/little_planet_earth_test/scene.gltf', function(gltf){
    scene.add(gltf.scene);
    renderer.render(scene, camera);
});

renderer.outputEncoding = THREE.sRGBEncoding;

function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
    controls.update();
}
animate();