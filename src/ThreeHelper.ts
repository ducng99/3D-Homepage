import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Model from './models/Model'

export let scene: THREE.Scene;
export let camera: THREE.PerspectiveCamera;
export let renderer: THREE.WebGLRenderer;

export let humanModel: Model, bedroomModel: Model;

const loader = new GLTFLoader();
const clock = new THREE.Clock();
let light: THREE.PointLight;
let moonLight: THREE.PointLight;
let ambLight: THREE.AmbientLight;

export async function Init() {
    scene = new THREE.Scene();

    //let bgImg = new THREE.TextureLoader().load("./bg.jpg");
    scene.background = new THREE.Color(0);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight);
    camera.position.x = 6;
    camera.position.z = 6;
    camera.position.y = 6;
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.physicallyCorrectLights = true;
    document.body.appendChild(renderer.domElement);
}

export async function SetupRoom() {
    loader.load('/3DModels/Bedroom.glb', function (gltf) {
        bedroomModel = new Model();
        bedroomModel.InitFromGLTF(gltf);

        scene.add(bedroomModel.GetModel()!);
    }, undefined, function (error) {
        console.error(error);
    });
}

export async function SetupHuman(onLoaded?: Function) {
    loader.load('/3DModels/human.glb', function (gltf) {
        humanModel = new Model();
        humanModel.InitFromGLTF(gltf);

        scene.add(humanModel.GetModel()!);
        
        if (onLoaded)
            onLoaded();
    }, undefined, function (error) {
        console.error(error);
    });
}

export async function SetupLights() {
    ambLight = new THREE.AmbientLight(0xFDF4DC, 0.2);
    scene.add(ambLight);

    light = new THREE.PointLight(0xFDF4DC, 0, 0, 2);
    light.power = 531;
    light.position.set(0, 4, 0);
    light.castShadow = true;
    light.shadow.mapSize.width = light.shadow.mapSize.height = 1024;
    light.shadow.bias = -0.001;
}

export async function TurnOnLight()
{
    scene.add(light);
}

export async function TurnOffLight()
{
    scene.remove(light);
}

export async function SetupMoonLight()
{
    moonLight = new THREE.PointLight(0xC2C5CC, 0, 0, 2);
    moonLight.power = 2500;
    moonLight.position.set(-10, 30, 2);
    moonLight.castShadow = true;
    moonLight.shadow.mapSize.width = moonLight.shadow.mapSize.height = 4096;
    moonLight.shadow.bias = -0.001;
    scene.add(moonLight);
}

export async function RemoveMoonLight()
{
    scene.remove(moonLight);
}

export function UpdateSize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

export function animate() {
    requestAnimationFrame(animate);

    if (typeof bedroomModel !== 'undefined')
        bedroomModel.GetMixer()?.update(clock.getDelta());

    renderer.render(scene, camera);
};

export function Cleanup()
{
    bedroomModel.GetModel()?.traverse(obj => {
        if (obj instanceof THREE.Mesh)
        {
            obj.geometry.dispose();
            obj.material.dispose();
        }
    });
    
    scene.remove(bedroomModel.GetModel()!);
    
    humanModel.GetModel()?.traverse(obj => {
        if (obj instanceof THREE.Mesh)
        {
            obj.geometry.dispose();
            obj.material.dispose();
        }
    });
    
    scene.remove(humanModel.GetModel()!);
    
    scene.remove(light);
    scene.remove(moonLight);
    scene.remove(ambLight);
    
    console.info("Finished cleanning up!");
}

export function onReady(callback: Function) {
    let checker = setInterval(() => {
        if (typeof light !== 'undefined' && typeof bedroomModel !== 'undefined') {
            clearInterval(checker);
            callback();
        }
    }, 100);
}