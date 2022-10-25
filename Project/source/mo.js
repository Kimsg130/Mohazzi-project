import {GLTFLoader} from 'GLTFLoader';
import * as THREE from 'three';
import {OrbitControls} from 'OrbitControls';

const scene = new THREE.Scene();
scene.scale.set(0.00015,0.00015,0.00015);
// scene.position.set(0,0,0);
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


//카메라
const camera = new THREE.PerspectiveCamera(30, 1);
//const camera = new THREE.PerspectiveCamera(30, document.querySelector('.canvas').clientWidth / document.querySelector('.canvas').clientHeight);
camera.position.set(0,0,5);


//렌더러
const renderer = new THREE.WebGLRenderer({
    canvas : document.querySelector('#canvas'),
    antialias : true
});
//renderer.setSize(document.querySelector('.canvas').clientWidth, document.querySelector('.canvas').clientHeight);


//매쉬
const geometry = new THREE.SphereGeometry(200, 32, 16);
const meterial = new THREE.MeshStandardMaterial({
    color : 0x999999
});
const sphere = new THREE.Mesh(geometry, meterial);
sphere.position.set(-1000,4500,4800);
scene.add(sphere);


//컨트롤러
const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.04;
controls.rotateSpeed = 0.6;
controls.update();


//빛
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);


//로더
const loader = new GLTFLoader();
loader.load('source/textures/earth_lowpoly/scene.gltf', function(gltf){
    scene.add(gltf.scene);
});
renderer.render(scene, camera);


//레이캐스팅
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event){
    mouse.x = ( event.clientX /  window.innerWidth) * 2 - 1;
    mouse.y = -( event.clientY / window.innerHeight) * 2 + 1;
}
// document.querySelector('.canvas').clientWidth
window.addEventListener('mousemove', onMouseMove, false);

// function onWindowResize(){
//     camera.aspect = window.innerWidth/window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerHeight, window.innerHeight);
// }

renderer.outputEncoding = THREE.sRGBEncoding;

function hoverPoints(){
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    for ( let i = 0; i < intersects.length; i ++ ) {

        intersects[ i ].object.material.color.set( 0xff0000 );

    }

}


//애니메이션
function animate() {
    requestAnimationFrame(animate);
    //hoverPoints();
    renderer.render(scene, camera);
    controls.update();
}
animate();
