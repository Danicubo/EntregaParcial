import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'https://cdn.skypack.dev/pin/three@v0.134.0-dfARp6tVCbGvQehLfkdx/mode=imports/unoptimized/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'https://cdn.skypack.dev/three/examples/jsm/geometries/TextGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
const renderer = new THREE.WebGLRenderer();

// Paleta de colores
const palette = {
    bgColor: '#000000',
    Light: '0xffffff'
};

document.body.onload = () => {
    main();
};

window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, true);
};

/* Intancia para cargar FontLoader */
const fontLoader = new FontLoader();

/* Instancia para cargar modelos 3d  */
let loader = new GLTFLoader();

/* Intancia para Texturas*/

const textureWall1 = new THREE.TextureLoader().load('textures/texture.jpg');
textureWall1.crossOrigin = true;

const textureFloor = new THREE.TextureLoader().load('textures/texture1.jpg');
textureFloor.crossOrigin = true;

const textureWall2 = new THREE.TextureLoader().load('textures/texture2.jpg');
textureWall2.crossOrigin = true;

const textureWall3 = new THREE.TextureLoader().load('textures/texture3.jpg');
textureWall3.crossOrigin = true;

const textureWall4 = new THREE.TextureLoader().load('textures/texture4.jpg');
textureWall4.crossOrigin = true;

const textureDeepWall1 = new THREE.TextureLoader().load('textures/texture.jpg');
textureDeepWall1.crossOrigin = true;

//AudioListener
const listener = new THREE.AudioListener();
camera.add(listener);

// Declaraciones //
var keyboard = {};
var player = { height: 3.5, speed: 0.08, turnSpeed: Math.PI * 0.01 };

// Controls
camera.position.set(0, player.height, -5);
camera.lookAt(new THREE.Vector3(2, player.height, 0));

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

function main() {
    // Configurracion inicial
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(palette.bgColor, 1);
    document.body.appendChild(renderer.domElement);


    camera.position.z = 55; //55
    camera.position.y = 20; //20
    camera.position.x = 0;

    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    /* Floor All Scene */

    let planeFloorAll = drawPlane(250, 250, 4, 4, 0xB6D7A8, true);
    planeFloorAll.position.x = 0;
    planeFloorAll.position.y = -0.1;
    planeFloorAll.position.z = 0;
    planeFloorAll.rotation.x = Math.PI / 2;
    scene.add(planeFloorAll);

    /* Roof House */
    const roof1 = drawCube(1, 200, 200, 0x1C262E, /* textureFloor */ );
    roof1.castShadow = true;
    roof1.position.x = 0;
    roof1.position.y = 45;
    roof1.rotation.z = Math.PI / 2;
    scene.add(roof1);

    /* Floor House*/

    let planeFloor = drawPlane(200, 200, 4, 4, 0xffffff, true, textureFloor);
    planeFloor.position.x = 0;
    planeFloor.position.y = 0;
    planeFloor.position.z = 0;
    planeFloor.rotation.x = Math.PI / 2;
    scene.add(planeFloor);

    /* OutSideWalls */

    const outsideWall1 = drawCube(1, 45, 130, 0xffffff, textureWall2);
    outsideWall1.castShadow = true;
    outsideWall1.rotation.y = Math.PI / 2;
    outsideWall1.position.x = -35;
    outsideWall1.position.y = 22.5;
    outsideWall1.position.z = 100.2;
    scene.add(outsideWall1);

    const outsideWall2 = drawCube(1, 45, 200, 0xFFD966, textureDeepWall1);
    outsideWall2.castShadow = true;
    outsideWall2.position.x = -100;
    outsideWall2.position.y = 22.5;
    outsideWall2.position.z = 0;
    scene.add(outsideWall2);

    const outsideWall3 = drawCube(1, 45, 77, 0xFFD966, textureWall1);
    outsideWall3.castShadow = true;
    outsideWall3.rotation.y = Math.PI / 2;
    outsideWall3.position.x = 61.5;
    outsideWall3.position.y = 22.5;
    outsideWall3.position.z = 100;
    scene.add(outsideWall3);

    const outsideWall4 = drawCube(1, 45, 200, 0xffffff, textureDeepWall1);
    outsideWall4.castShadow = true;
    outsideWall4.rotation.y = Math.PI / 2;
    outsideWall4.position.x = 0;
    outsideWall4.position.y = 22.5;
    outsideWall4.position.z = -100;
    scene.add(outsideWall4);

    const outsideWall5 = drawCube(1, 45, 200, 0xFFD966, textureDeepWall1);
    outsideWall5.castShadow = true;
    outsideWall5.position.x = 100;
    outsideWall5.position.y = 22.5;
    outsideWall5.position.z = 0;
    scene.add(outsideWall5);

    /* Room 1 */

    const room1Wall1 = drawCube(1, 45, 77, 0xFFD966, textureWall1);
    room1Wall1.castShadow = true;
    room1Wall1.rotation.y = Math.PI / 2;
    room1Wall1.position.x = 61.5;
    room1Wall1.position.y = 22.5;
    room1Wall1.position.z = 26;
    scene.add(room1Wall1);

    const room1Wall2 = drawCube(1, 45, 55, 0xFFD966, textureWall1);
    room1Wall2.castShadow = true;
    room1Wall2.position.x = 23;
    room1Wall2.position.y = 22.5;
    room1Wall2.position.z = 72;
    scene.add(room1Wall2);

    const room1Wall3 = drawCube(1, 45, 77, 0xFFD966, textureWall1);
    room1Wall3.castShadow = true;
    room1Wall3.position.x = 99;
    room1Wall3.position.y = 22.5;
    room1Wall3.position.z = 65;
    scene.add(room1Wall3);


    //createVideo1(10, 10);

    /* Room 2 */


    const room2Wall1 = drawCube(1, 45, 77, 0xffffff, textureWall2);
    room2Wall1.castShadow = true;
    room2Wall1.rotation.y = Math.PI / 2;
    room2Wall1.position.x = -61.5;
    room2Wall1.position.y = 22.5;
    room2Wall1.position.z = 25;
    scene.add(room2Wall1);

    const room2Wall2 = drawCube(1, 45, 55, 0xffffff, textureWall2);
    room2Wall2.castShadow = true;
    room2Wall2.position.x = -25;
    room2Wall2.position.y = 22.5;
    room2Wall2.position.z = 73;
    scene.add(room2Wall2);

    const room2Wall3 = drawCube(1, 45, 77, 0xffffff, textureWall2);
    room2Wall3.castShadow = true;
    room2Wall3.position.x = -99;
    room2Wall3.position.y = 22.5;
    room2Wall3.position.z = 64;
    scene.add(room2Wall3);


    /* Room 3 */


    const room3Wall1 = drawCube(1, 45, 60, 0xFFD966, textureWall3);
    room3Wall1.castShadow = true;
    room3Wall1.position.x = -25;
    room3Wall1.position.y = 22.5;
    room3Wall1.position.z = -5;
    scene.add(room3Wall1);

    const room3Wall2 = drawCube(1, 45, 77, 0xFFD966, textureWall3);
    room3Wall2.castShadow = true;
    room3Wall2.rotation.y = Math.PI / 2;
    room3Wall2.position.x = -61.5;
    room3Wall2.position.y = 22.5;
    room3Wall2.position.z = -50;
    scene.add(room3Wall2);

    const room3Wall3 = drawCube(1, 45, 77, 0xFFD966, textureWall3);
    room3Wall3.castShadow = true;
    room3Wall3.rotation.y = Math.PI / 2;
    room3Wall3.position.x = -61.5;
    room3Wall3.position.y = 22.5;
    room3Wall3.position.z = 24;
    scene.add(room3Wall3);

    const room3Wall4 = drawCube(1, 45, 74, 0xFFD966, textureWall3);
    room3Wall4.castShadow = true;
    room3Wall4.position.x = -99;
    room3Wall4.position.y = 22.5;
    room3Wall4.position.z = -12;
    scene.add(room3Wall4);


    //createVideo3(10, 10);

    /* Room 4 */

    const room4Wall1 = drawCube(1, 45, 60, 0xFFD966, textureWall4);
    room4Wall1.castShadow = true;
    room4Wall1.position.x = 25;
    room4Wall1.position.y = 22.5;
    room4Wall1.position.z = -5;
    scene.add(room4Wall1);

    const room4Wall2 = drawCube(1, 45, 77, 0xFFD966, textureWall4);
    room4Wall2.castShadow = true;
    room4Wall2.rotation.y = Math.PI / 2;
    room4Wall2.position.x = 61.5;
    room4Wall2.position.y = 22.5;
    room4Wall2.position.z = -50;
    scene.add(room4Wall2);

    const room4Wall3 = drawCube(1, 45, 77, 0xFFD966, textureWall4);
    room4Wall3.castShadow = true;
    room4Wall3.rotation.y = Math.PI / 2;
    room4Wall3.position.x = 61.5;
    room4Wall3.position.y = 22.5;
    room4Wall3.position.z = 24;
    scene.add(room4Wall3);

    const room4Wall4 = drawCube(1, 45, 74, 0xFFD966, textureWall4);
    room4Wall4.castShadow = true;
    room4Wall4.position.x = 99;
    room4Wall4.position.y = 22.5;
    room4Wall4.position.z = -12;
    scene.add(room4Wall4);

    const table = drawCube(10, 15, 10, 0xffffff);
    table.castShadow = true;
    table.castShadow = true;
    table.position.x = 60;
    table.position.y = 8;
    table.position.z = 19;
    scene.add(table);

    /* PlaneTv */
    const planeTv = drawPlane(35, 18, 4, 4, 0xffffff, true);
    planeTv.position.x = 0;
    planeTv.position.y = 23;
    planeTv.position.z = 96;
    planeTv.rotation.z = THREE.Math.degToRad(180);
    scene.add(planeTv);

    //Animate
    animate();

    //Audio
    //ambientAudio();

    // Lights
    pointLight();
    pointLight2();
    pointLight3();
    pointLight4();
    pointLight5();
    pointLight6();

    pointLightRoom1();
    pointLightRoom2();
    pointLightRoom3();
    pointLightRoom4();

    //Videos
    createVideo1(30, 20);
    createVideo2(40, 20);
    createVideo3(40, 20);
    createVideo4(40, 20);

    //Models
    model1();
    model2();
    model3();
    model4();
    model5();
    model6();
    model7();
    model8();
    model9();
    model10();
    model11();
    model12();

    //Fonts
    /* FontGeometry */
    text1();
    text2();
    text3();
    text4();
    text5();
}

//LoadText
function text1() {

    let textGeometry;
    fontLoader.load('fonts/Times_Regular.json', function(font) {

        const geometry = new TextGeometry("A CowBoy", {
            font: font,
            size: 5,
            height: 5,
            curveSegments: 10,

            //bevelEnabled: true,
            bevelThickness: 5,
            bevelSize: 5,
            bevelOffset: 0,
            bevelSegments: 5
        });
        var textMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            /*    shininess: 30,
               shading: THREE.FlatShading */
        });
        textGeometry = new THREE.Mesh(geometry, textMaterial);
        textGeometry.position.x = -40;
        textGeometry.position.y = 35;
        textGeometry.position.z = 98;
        textGeometry.rotation.y = THREE.Math.degToRad(180);
        scene.add(textGeometry);
    });
}

function text2() {

    let textGeometry;
    fontLoader.load('fonts/Times_Regular.json', function(font) {

        const geometry = new TextGeometry("A Ninja", {
            font: font,
            size: 5,
            height: 5,
            curveSegments: 10,

            //bevelEnabled: true,
            bevelThickness: 5,
            bevelSize: 5,
            bevelOffset: 0,
            bevelSegments: 5
        });
        var textMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            /*    shininess: 30,
               shading: THREE.FlatShading */
        });
        textGeometry = new THREE.Mesh(geometry, textMaterial);
        textGeometry.position.x = 75;
        textGeometry.position.y = 35;
        textGeometry.position.z = 98;
        textGeometry.rotation.y = THREE.Math.degToRad(180);
        scene.add(textGeometry);
    });
}

function text3() {

    let textGeometry;
    fontLoader.load('fonts/Times_Regular.json', function(font) {

        const geometry = new TextGeometry("The Hot Lady dimitrescu on drugs!", {
            font: font,
            size: 3,
            height: 5,
            curveSegments: 10,

            //bevelEnabled: true,
            /* bevelThickness: 5,
            bevelSize: 2,
            bevelOffset: 0,
            bevelSegments: 5 */
        });
        var textMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            /*    shininess: 30,
               shading: THREE.FlatShading */
        });
        textGeometry = new THREE.Mesh(geometry, textMaterial);
        textGeometry.position.x = -100;
        textGeometry.position.y = 35;
        textGeometry.position.z = 23;
        textGeometry.rotation.y = THREE.Math.degToRad(90);
        scene.add(textGeometry);
    });
}

function text4() {

    let textGeometry;
    fontLoader.load('fonts/Times_Regular.json', function(font) {

        const geometry = new TextGeometry("A fucking head of Alien", {
            font: font,
            size: 3,
            height: 5,
            curveSegments: 10,

            //bevelEnabled: true,
            /* bevelThickness: 5,
            bevelSize: 2,
            bevelOffset: 0,
            bevelSegments: 5 */
        });
        var textMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 30,
            shading: THREE.FlatShading
        });
        textGeometry = new THREE.Mesh(geometry, textMaterial);
        textGeometry.position.x = 80;
        textGeometry.position.y = 35;
        textGeometry.position.z = 23;
        textGeometry.rotation.y = THREE.Math.degToRad(180);
        scene.add(textGeometry);
    });
}

function text5() {

    let textGeometry;
    fontLoader.load('fonts/Times_Regular.json', function(font) {

        const geometry = new TextGeometry("Hecho_por_Daniel_Cuevas_65005", {
            font: font,
            size: 1.5,
            height: 1,
            curveSegments: 10,

            //bevelEnabled: true,
            /* bevelThickness: 5,
            bevelSize: 2,
            bevelOffset: 0,
            bevelSegments: 5 */
        });
        var textMaterial = new THREE.MeshPhongMaterial({
            color: 0x000000,
            specular: 0xffffff,
            shininess: 30,
            shading: THREE.FlatShading
        });
        textGeometry = new THREE.Mesh(geometry, textMaterial);
        textGeometry.position.x = 17;
        textGeometry.position.y = 25;
        textGeometry.position.z = 96;
        textGeometry.rotation.y = THREE.Math.degToRad(180);
        scene.add(textGeometry);
    });
}
//Model1
function model1() {
    //Models 3d
    let cowBoy;
    loader.load(
        `models/model1/scene.gltf`,
        function(gltf) {
            cowBoy = gltf.scene.children[0];
            cowBoy.position.x = -80;
            cowBoy.position.y = 1;
            cowBoy.position.z = 90;
            cowBoy.rotation.z = THREE.Math.degToRad(180);
            cowBoy.scale.set(10, 10, 10);
            scene.add(gltf.scene);
            //animate();
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
}

//Model2
function model2() {
    //Models 3d
    let ninja;
    loader.load(
        `models/model2/scene.gltf`,
        function(gltf) {
            ninja = gltf.scene.children[0];
            ninja.position.x = 60;
            ninja.position.y = 0;
            ninja.position.z = 90;
            ninja.rotation.z = THREE.Math.degToRad(180);
            ninja.scale.set(2, 2, 2);
            scene.add(gltf.scene);
            //animate();
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
}

//Model2
function model3() {
    //Models 3d
    let alien;
    loader.load(
        `models/model3/scene.gltf`,
        function(gltf) {
            alien = gltf.scene.children[0];
            alien.position.x = 60;
            alien.position.y = 15;
            alien.position.z = 19;
            alien.rotation.z = THREE.Math.degToRad(180);
            alien.scale.set(0.05, 0.05, 0.05);
            scene.add(gltf.scene);
            //animate();
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
}

//Model4
function model4() {
    //Models 3d
    let lady;
    loader.load(
        `models/model4/scene.gltf`,
        function(gltf) {
            lady = gltf.scene.children[0];
            lady.position.x = -95;
            lady.position.y = 1;
            lady.position.z = 0;
            lady.rotation.z = Math.PI / 2;
            lady.scale.set(0.2, 0.2, 0.2);
            scene.add(gltf.scene);
            //animate();
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
}

//Model5
function model5() {
    //Models 3d
    let poision;
    loader.load(
        `models/model5/scene.gltf`,
        function(gltf) {
            poision = gltf.scene.children[0];
            poision.position.x = 10;
            poision.position.y = 10;
            poision.position.z = 85;
            poision.rotation.z = THREE.Math.degToRad(360);
            poision.scale.set(10, 10, 10);
            scene.add(gltf.scene);
            //animate();
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
}

//Model6
function model6() {
    //Models 3d
    let table;
    loader.load(
        `models/model6/scene.gltf`,
        function(gltf) {
            table = gltf.scene.children[0];
            table.position.x = 0;
            table.position.y = 10;
            table.position.z = 90;
            table.rotation.z = THREE.Math.degToRad(180);
            table.scale.set(0.2, 0.2, 0.2);
            scene.add(gltf.scene);
            //animate();
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
}
//Model6
function model7() {
    //Models 3d
    let picture;
    loader.load(
        `models/model7/scene.gltf`,
        function(gltf) {
            picture = gltf.scene.children[0];
            picture.position.x = -60;
            picture.position.y = 20;
            picture.position.z = -49;
            picture.rotation.z = THREE.Math.degToRad(90);
            picture.scale.set(10, 10, 10);
            scene.add(gltf.scene);
            //animate();
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
}
//Model8
function model8() {
    //Models 3d
    let horse;
    loader.load(
        `models/model8/scene.gltf`,
        function(gltf) {
            horse = gltf.scene.children[0];
            horse.position.x = -50;
            horse.position.y = 1;
            horse.position.z = 90;
            horse.rotation.z = THREE.Math.degToRad(180);
            horse.scale.set(6, 6, 6);
            scene.add(gltf.scene);
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
}

//Model9
function model9() {
    //Models 3d
    let weapons;
    loader.load(
        `models/model9/scene.gltf`,
        function(gltf) {
            weapons = gltf.scene.children[0];
            weapons.position.x = 40;
            weapons.position.y = 20;
            weapons.position.z = 99;
            weapons.rotation.z = THREE.Math.degToRad(180);
            weapons.scale.set(10, 10, 10);
            scene.add(gltf.scene);
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
}

//Model10
function model10() {
    //Models 3d
    let ufo;
    loader.load(
        `models/model10/scene.gltf`,
        function(gltf) {
            ufo = gltf.scene.children[0];
            ufo.position.x = 80;
            ufo.position.y = 20;
            ufo.position.z = 10;
            ufo.rotation.z = THREE.Math.degToRad(180);
            ufo.scale.set(10, 10, 10);
            scene.add(gltf.scene);
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
}

//Model11
function model11() {
    //Models 3d
    let corpse;
    loader.load(
        `models/model11/scene.gltf`,
        function(gltf) {
            corpse = gltf.scene.children[0];
            corpse.position.x = -50;
            corpse.position.y = 0;
            corpse.position.z = 10;
            corpse.rotation.z = THREE.Math.degToRad(90);
            corpse.scale.set(15, 15, 15);
            scene.add(gltf.scene);
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
}

//Model11
function model12() {
    //Models 3d
    let tv;
    loader.load(
        `models/model12/scene.gltf`,
        function(gltf) {
            tv = gltf.scene.children[0];
            tv.position.x = 0;
            tv.position.y = 9;
            tv.position.z = 98;
            tv.rotation.z = THREE.Math.degToRad(180);
            tv.scale.set(3, 3, 3);
            scene.add(gltf.scene);
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + '% cargado modelo');
        },
        function(error) {
            console.log('Un error ocurrio');
        },
    );
}
/* Functions Create Videos */

/* Video Room 1 */
function createVideo1(w, h) {
    /* Ejemplo Video */
    let video = document.getElementById('video1');
    let texture = new THREE.VideoTexture(video);
    const geometry = new THREE.PlaneGeometry(w, h);
    const material = new THREE.MeshLambertMaterial({
        map: texture,
    });
    const planeVideo1 = new THREE.Mesh(geometry, material);
    planeVideo1.rotation.y = Math.PI / 2;
    planeVideo1.position.x = -95;
    planeVideo1.position.y = 20;
    planeVideo1.position.z = 63;
    scene.add(planeVideo1);
}

/* Video Room 2 */
function createVideo2(w, h) {
    /* Ejemplo Video */
    let video = document.getElementById('video2');
    let texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(w, h);
    const material = new THREE.MeshLambertMaterial({
        map: texture,
    });
    const planeVideo2 = new THREE.Mesh(geometry, material);
    planeVideo2.receiveShadow = true;
    planeVideo2.rotation.y = Math.PI / -2;
    planeVideo2.position.x = 97;
    planeVideo2.position.y = 20;
    planeVideo2.position.z = 63;
    scene.add(planeVideo2);
}

function createVideo3(w, h) {
    /* Ejemplo Video */
    let video = document.getElementById('video3');
    let texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(w, h);
    const material = new THREE.MeshLambertMaterial({
        map: texture,
    });
    const planeVideo3 = new THREE.Mesh(geometry, material);
    planeVideo3.receiveShadow = true;
    planeVideo3.rotation.y = Math.PI / 2;
    planeVideo3.position.x = -97;
    planeVideo3.position.y = 20;
    planeVideo3.position.z = -15;
    scene.add(planeVideo3);
}


function createVideo4(w, h) {
    /* Ejemplo Video */
    let video = document.getElementById('video4');
    let texture = new THREE.VideoTexture(video);

    const geometry = new THREE.PlaneGeometry(w, h);
    const material = new THREE.MeshLambertMaterial({
        map: texture,
    });
    const planeVideo3 = new THREE.Mesh(geometry, material);
    planeVideo3.receiveShadow = true;
    planeVideo3.rotation.y = Math.PI / -2;
    planeVideo3.position.x = 97;
    planeVideo3.position.y = 20;
    planeVideo3.position.z = -15;
    scene.add(planeVideo3);
}

/* Function CreatePlane */

function drawPlane(w, h, sh, sw, color, ds = false, texture) {
    const geometry = new THREE.PlaneGeometry(w, h, sw, sh);
    const material = new THREE.MeshPhongMaterial({
        color,
        side: ds ? THREE.DoubleSide : undefined,
        map: texture,
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.receiveShadow = true;
    return plane;
}

/* Function CreateCube */

function drawCube(w, h, d, color, texture) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshPhongMaterial({
        color: color,
        map: texture,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    return cube;
}

/* Function Lights */

function pointLight() {
    const light = new THREE.PointLight(0xeeeeee, 1, 65);
    light.position.set(0, 43, 80);
    scene.add(light);
}

function pointLight2() {
    const light = new THREE.PointLight(0x55FF00, 1, 10);
    light.position.set(0, 43, 0);
    scene.add(light);
}

function pointLight3() {
    const light = new THREE.PointLight(0xffffff, 1, 50);
    light.position.set(0, 43, 0);
    scene.add(light);
}

function pointLight4() {
    const light = new THREE.PointLight(0xffffff, 1, 50);
    light.position.set(-70, 43, -80);
    scene.add(light);

}

function pointLight5() {
    const light = new THREE.PointLight(0xffffff, 1, 50);
    light.position.set(70, 43, -80);
    scene.add(light);
}

function pointLight6() {
    const light = new THREE.PointLight(0xED52FF, 1, 80);
    light.position.set(0, 43, -80);
    scene.add(light);
}

/* LightRoom 1 and content */
function pointLightRoom1() {
    const light = new THREE.PointLight(0xFFC300, 0.8, 100);
    light.position.set(-60, 43, 60);
    scene.add(light);

    //

    const light2 = new THREE.PointLight(0xFFC300, 0.7, 100);
    light2.position.set(-30, 4, 95);
    scene.add(light2);
    //

    const light3 = new THREE.PointLight(0xFFC300, 0.7, 100);
    light3.position.set(-98, 4, 95);
    scene.add(light3);
    //

    const light4 = new THREE.PointLight(0xFFC300, 0.7, 100);
    light4.position.set(-98, 4, 30);
    scene.add(light4);

}


/* LightRoom 2 and content */
function pointLightRoom2() {
    const light = new THREE.PointLight(0xedd036, 1, 100);
    light.position.set(60, 43, 60);
    scene.add(light);

    //
    const light2 = new THREE.PointLight(0xcc0000, 1, 100);
    light2.position.set(30, 4, 95);
    scene.add(light2);

    //

    const light3 = new THREE.PointLight(0xcc0000, 1, 100);
    light3.position.set(98, 4, 95);
    scene.add(light3);

    //

    const light4 = new THREE.PointLight(0xcc0000, 1, 100);
    light4.position.set(98, 4, 30);
    scene.add(light4);

}


/* LightRoom 3 and content */
function pointLightRoom3() {
    const light = new THREE.PointLight(0x00F6FF, 1, 100);
    light.position.set(-60, 43, -10);
    scene.add(light);

    //
    const light2 = new THREE.PointLight(0xffffff, 1, 100);
    light2.position.set(-98, 4, 20);
    scene.add(light2);

    //

    const light3 = new THREE.PointLight(0xffffff, 1, 100);
    light3.position.set(-98, 4, -45);
    scene.add(light3);

    //

    const light4 = new THREE.PointLight(0xffffff, 1, 100);
    light4.position.set(-30, 4, 20);
    scene.add(light4);


}


/* LightRoom 4 and content */
function pointLightRoom4() {
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(60, 43, -10);
    scene.add(light);

    //
    const light2 = new THREE.PointLight(0xffffff, 1, 100);
    light2.position.set(98, 4, 20);
    scene.add(light2);

    //

    const light3 = new THREE.PointLight(0xffffff, 1, 100);
    light3.position.set(98, 4, -45);
    scene.add(light3);

    //
    const light4 = new THREE.PointLight(0xffffff, 1, 100);
    light4.position.set(30, 4, 20);
    scene.add(light4);
}




/* Funtion Audio */
/* function ambientAudio() {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    // create a global audio source
    const sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('video/musica.mp3', function(buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });
}
 */



/* Function Animate */
function animate() {
    requestAnimationFrame(animate);

    if (keyboard[87]) { // W key
        camera.position.x -= (Math.sin(camera.rotation.y) * player.speed) * 10;
        camera.position.z -= (-Math.cos(camera.rotation.y) * player.speed) * 10;
    }
    if (keyboard[83]) { // S key
        camera.position.x += (Math.sin(camera.rotation.y) * player.speed) * 5;
        camera.position.z += (-Math.cos(camera.rotation.y) * player.speed) * 5;
    }
    if (keyboard[65]) { // A key
        camera.position.x += (Math.sin(camera.rotation.y + Math.PI / 2) * player.speed) * 3;
        camera.position.z += (-Math.cos(camera.rotation.y + Math.PI / 2) * player.speed) * 3;
    }
    if (keyboard[68]) { // D key
        camera.position.x += (Math.sin(camera.rotation.y - Math.PI / 2) * player.speed) * 3;
        camera.position.z += (-Math.cos(camera.rotation.y - Math.PI / 2) * player.speed) * 3;
    }
    if (keyboard[37]) { // left arrow key
        camera.rotation.y -= player.turnSpeed * 3;
    }
    if (keyboard[39]) { // right arrow key
        camera.rotation.y += player.turnSpeed * 3;
    }

    renderer.render(scene, camera);
}

function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}