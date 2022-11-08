import {GLTFLoader} from 'GLTFLoader';
import * as THREE from 'three';
import {OrbitControls} from 'OrbitControls';
import {modalOn} from './popup.js';
import {expressContent} from './expressContent.js';

var scene, camera, renderer, controls, light, loader, raycaster, mouse, earth, pins;
var INTERSECTED = false;

//TODO : 사건이 발생한 나라들을 저장하는 배열 추가
//TODO : 한 연도에 못해도 6개는 만들기
var year2022 = new Array("2022", "USA", "RUSSIA", "KOREA");
var year2002 = new Array("2002","MEXICO", "KOREA");
//나라의 3차원 좌표를 저장하는 맵 -> key:[나라], value:[x, y, z]
var countrys = {USA : [-20,70,68], RUSSIA : [-10,87,-47], KOREA : [-49,58,-63], MEXICO : [0,30,94]};

var slider = document.getElementById("slider-action");

function init(){
    
    //씬 할당
    scene = new THREE.Scene();
    scene.background = new THREE.CubeTextureLoader()
    .setPath('src/textures/')
    .load([
        'space_ft.png',
        'space_bk.png',
        'space_up.png',
        'space_dn.png',
        'space_rt.png',
        'space_lf.png',
    ]);


    //카메라 할당
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(-150, 150, -230); //최종 한국을 바라보는 좌표 (-150,150,-230)

    //렌더러 할당
    renderer = new THREE.WebGLRenderer({
        antialias : true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    //매쉬
    pins = new THREE.Group();
    pins.name="pins";
    makePoints(year2022);

    //OrbitControls로 카메라 이동, 줌 구현
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.04;
    controls.rotateSpeed = 0.6;
    controls.update();

    //빛 할당
    light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    //외부 3D모델 불러오기
    earth = new THREE.Group();
    loader = new GLTFLoader();
    loader.load('src/textures/earth_lowpoly/scene.gltf', function(gltf){
        gltf.scene.scale.set(0.015,0.015,0.015);
        earth.add(gltf.scene);
    });
    scene.add(earth);
    renderer.render(scene, camera);

    //레이캐스팅 할당
    //mouse : 2차원 공간인 화면에서의 정규좌표 정보를 저장할 객체
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    renderer.outputEncoding = THREE.sRGBEncoding;
    window.requestAnimationFrame(animate);
}


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

//3D오브젝트를 생성하는 메서드
function makePoints(year){
    const geometry = new THREE.SphereGeometry(4, 32, 16);
    for(let i = 1; i<year.length; i++){
        let point = new THREE.Mesh(geometry);
        point.material = new THREE.MeshStandardMaterial({ 
            color : 0xffd400,
            transparent : true,
            opacity : 0.7
        });

        let country = year[i];
        let coordinate = countrys[country]; //좌표를 배열로 받음
        point.position.set(coordinate[0],coordinate[1],coordinate[2]);
        point.userData.yc = year[0]+country;
        pins.add(point);
        // scene.add(point);
    }
    scene.add(pins);
}

//마우스가 움직일 때마다 마우스의 좌표정보를 수정하는 메서드
function onMouseMove(event){
    mouse.x = ( event.clientX /  window.innerWidth) * 2 - 1;
    mouse.y = -( event.clientY / window.innerHeight) * 2 + 1;
}

//클릭이벤트가 발생했을 때, 레이와 교차한 객체를 판별하여 기능을 수행하는 메서드
function onClick(event){
    raycaster.setFromCamera(mouse, camera);
    const pin = scene.getObjectByName("pins");
    const intersects = raycaster.intersectObjects(pin.children, false); //pins.children
    if(intersects.length >0){
        expressContent(intersects[0].object.userData.yc);
        modalOn();
    }
}

//마우스에서 출발한 레이와 교차한 객체를 판별하여 기능을 수행하는 메서드
//INTERSECTED : 레이와 교차하고있는 객체가 있는지 판별. 있다->true
function hoverPoints(){
    raycaster.setFromCamera(mouse, camera);
    const pin = scene.getObjectByName("pins");
    const intersects = raycaster.intersectObjects(pin.children, false);
    if(intersects.length >0){
        let object = intersects[0].object;
        object.material.transparent = false;
        object.material.color.set(0xFF8000);
        INTERSECTED = true;
    }else{
        INTERSECTED = false;
    }
}

//교차하고있는 객체가 없을때 색깔을 원상복구 시키는 메서드
function resetMaterials(){
    const pin = scene.getObjectByName("pins");
    for (let i=0; i<pin.children.length; i++){
        if(pin.children[i].material){
            pin.children[i].material.transparent = true;
            pin.children[i].material.color.set(0xffd400);
        }
    }
}

//반응형 화면비를 위한 메서드
//윈도우창의 크기가 바뀌었을때, 카메라의 가로세로 비율과 렌더러 사이즈를 수정한다.
function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function yearChange(){
    let svalue = slider.value;
    let year;
    switch(svalue){
        case '5' :
            year = year2022;
            break;
        case '4' :
            year = year2002;
            break;
        default :
            year = year2022;
    }
    pins.clear();
    makePoints(year);
}

//이벤트리스너
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('resize', onWindowResize);
window.addEventListener('click', onClick);
slider.addEventListener('input', yearChange);

//실행
window.onload = init;