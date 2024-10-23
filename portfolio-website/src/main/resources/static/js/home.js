/*import '/styles/home.css';*/
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0,0,30);


const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);
//scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);


const controls = new OrbitControls(camera, renderer.domElement);

function addOne(){
    const loader = new GLTFLoader().setPath('oneModel/');
    loader.load('scene.gltf', (gltf) => {
        for (let i = 0; i < 500; i++) {
            const one = gltf.scene.clone();
            one.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));
            one.position.set(x, y, z);
            one.scale.set(6, 6, 6);  // Scale the object to be larger
            scene.add(one);
        }
    });
}
function addZero(){
    const loader = new GLTFLoader().setPath('zeroModel/');
    loader.load('scene.gltf', (gltf) => {
        for (let i = 0; i < 500; i++) {
            const zero = gltf.scene.clone();
            zero.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));
            zero.position.set(x, y, z);
            zero.scale.set(6, 6, 6);  // Scale the object to be larger
            scene.add(zero);
        }
    });
}

addZero();
addOne();

function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = Math.min(Math.max(t * -0.05, 30), 1000);;
    camera.position.x = t * -0.00;
    camera.position.y = t * -0.00;

}
document.body.onscroll = moveCamera;

function animate(){
    requestAnimationFrame(animate)
    // torus.rotation.x += 0.01;
    // torus.rotation.y += 0.005;
    // torus.rotation.z += 0.01;
    controls.update();
    renderer.render(scene, camera)
}
animate()