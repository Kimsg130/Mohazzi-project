import {GLTFLoader} from 'GLTFLoader';
import * as THREE from 'three';
import {OrbitControls} from 'OrbitControls';

var scene, camera, renderer, controls, light, loader, raycaster, mouse, earth;
var INTERSECTED = false;

function init(){
    scene = new THREE.Scene();
    // scene.scale.set(0.00015,0.00015,0.00015);
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
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0,0,230);

    //렌더러
    renderer = new THREE.WebGLRenderer({
        antialias : true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    //매쉬
    const geometry = new THREE.SphereGeometry(4, 32, 16);
    // for(let i = 0; i<2; i++){
    //     let sphere = new THREE.Mesh(geometry);
    //     sphere.material = new THREE.MeshStandardMaterial({ color : 0xffd400 });
    //     sphere.position.set(-20+(10*i*-1),70,68);
    //     sphere.name = "sphere"+i;
    //     scene.add(sphere);
    // }
    let sphere1 = new THREE.Mesh(geometry);
    sphere1.material = new THREE.MeshStandardMaterial({ color : 0xffd400 });
    sphere1.position.set(-20,70,68);
    let sphere2 = new THREE.Mesh(geometry);
    sphere2.material = new THREE.MeshStandardMaterial({ color : 0xffd400 });
    sphere2.position.set(0,30,94);
    scene.add(sphere1, sphere2);

    //컨트롤러
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.04;
    controls.rotateSpeed = 0.6;
    controls.update();

    //빛
    light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    earth = new THREE.Group();
    //로더
    loader = new GLTFLoader();
    loader.load('source/textures/earth_lowpoly/scene.gltf', function(gltf){
        gltf.scene.scale.set(0.015,0.015,0.015);
        earth.add(gltf.scene);
    });
    scene.add(earth);
    renderer.render(scene, camera);

    //레이캐스팅
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    renderer.outputEncoding = THREE.sRGBEncoding;
    window.requestAnimationFrame(animate);
}
//모달창
const modal = document.getElementById("modal");

function modalOn() {
    modal.style.display = "flex"
}
function isModalOn() {
    return modal.style.display === "flex"
}
function modalOff() {
    modal.style.display = "none"
}

const closeBtn = modal.querySelector(".close-area")
closeBtn.addEventListener("click", e => {
    modalOff()
})
modal.addEventListener("click", e => {
    const evTarget = e.target
    if(evTarget.classList.contains("modal-overlay")) {
        modalOff()
    }
})


//애니메이션
function animate() {
    window.requestAnimationFrame(animate);
    hoverPoints();
    if(!INTERSECTED){
        resetMaterials();
    }
    renderer.render(scene, camera);
    controls.update();
}

function onMouseMove(event){
    mouse.x = ( event.clientX /  window.innerWidth) * 2 - 1;
    mouse.y = -( event.clientY / window.innerHeight) * 2 + 1;
}

function onClick(event){
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, false);
    if(intersects.length >0){
        modalOn();
    }
}

function hoverPoints(){
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, false);
    if(intersects.length >0){
        let object = intersects[0].object;
        object.material.color.set(0xF5F6CE);
        INTERSECTED = true;
    }else{
        INTERSECTED = false;
    }
}

function resetMaterials(){
    for (let i=0; i<scene.children.length; i++){
        if(scene.children[i].material){
            scene.children[i].material.color.set(0xffd400);
        }
    }
}

function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('resize', onWindowResize);
window.addEventListener('click', onClick);

window.onload = init;