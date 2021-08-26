import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
const renderer = new THREE.WebGLRenderer();

let speed = 0.03;
let objects = [];
let spotLight;

document.body.onload = () => {
    main();
    const speedUpBtn = document.querySelector('#speedUp');
    const speedDownBtn = document.querySelector('#speedDown');

    speedUpBtn.onclick = () => {
        speedUp();
    };
    speedDownBtn.onclick = () => {
        speedDown();
    };
};

window.onresize = () => {
    /* if (window.innerWidth > 375) {
          // Mostrarme otra cosa
      } */
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight, true);
};

function main() {
    // Configurracion inicial
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // Controls
    new OrbitControls(camera, renderer.domElement);

    camera.position.z = 5;
    camera.position.y = 5;

    // Lights
    setupLights();

    let cube = drawCube(0xff00ff, false);
    cube.position.z = 0;
    cube.position.y = 3;
    scene.add(cube);
    objects.push(cube);

    camera.lookAt(cube.position);

    let plane = drawPlane(10, 10, 4, 4, 0x404040, true);
    plane.rotation.x = Math.PI / 2;
    scene.add(plane);

    animate();
}

function drawPlane(w, h, sh, sw, color, ds = false) {
    const geometry = new THREE.PlaneGeometry(w, h, sw, sh);
    const material = new THREE.MeshPhongMaterial({
        color,
        side: ds ? THREE.DoubleSide : undefined,
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.receiveShadow = true;
    return plane;
}

function drawCube(color, wireframe = false) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({
        color: color,
        wireframe: wireframe,
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    return cube;
}

function setupLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 10, 0);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.1;
    spotLight.decay = 2;
    spotLight.distance = 200;

    spotLight.castShadow = true;
    scene.add(spotLight);

    const lightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(lightHelper);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    objects[0].rotation.x += speed;
    objects[0].rotation.y += speed;

}

function speedUp() {
    speed += 0.01;
}

function speedDown() {
    speed -= 0.01;
}