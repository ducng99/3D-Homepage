import * as THREE from 'three'
import Model from './models/Model'

let RUNNING = true;

let scene: THREE.Scene;
export let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

export let humanModel: Model, bedroomModel: Model;

let modelsList: Model[] = [];

let light: THREE.PointLight;
let moonLight: THREE.PointLight;
let ambLight: THREE.AmbientLight;

export async function Init() {
    scene = new THREE.Scene();

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
    let loader = new (await import("three/examples/jsm/loaders/GLTFLoader.js")).GLTFLoader();
    
    loader.load('./assets/3DModels/Bedroom.glb', function (gltf) {
        bedroomModel = new Model();
        bedroomModel.InitFromGLTF(gltf);

        scene.add(bedroomModel.Model!);
        
        modelsList.push(bedroomModel);
    }, undefined, function (error) {
        console.error(error);
    });
}

export async function SetupHuman(onLoaded?: Function) {
    let loader = new (await import("three/examples/jsm/loaders/GLTFLoader.js")).GLTFLoader();
    
    loader.load('./assets/3DModels/human.glb', function (gltf) {
        humanModel = new Model();
        humanModel.InitFromGLTF(gltf);

        scene.add(humanModel.Model!);
        
        modelsList.push(humanModel);
        
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
    light.position.set(0, 4, 1);
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
    moonLight.power = 2000;
    moonLight.position.set(-20, 30, 2);
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
    if (RUNNING)
        requestAnimationFrame(animate);

    if (humanModel && humanModel.Animation)
        humanModel.Animation.Update();
    
    if (bedroomModel && bedroomModel.Animation)
        bedroomModel.Animation.Update();

    renderer.render(scene, camera);
};

export function Cleanup()
{
    RUNNING = false;
    
    bedroomModel.Model?.traverse(obj => {
        if (obj instanceof THREE.Mesh)
        {
            obj.geometry.dispose();
            obj.material.dispose();
        }
    });
    
    scene.remove(bedroomModel.Model!);
    
    humanModel.Model?.traverse(obj => {
        if (obj instanceof THREE.Mesh)
        {
            obj.geometry.dispose();
            obj.material.dispose();
        }
    });
    
    scene.remove(humanModel.Model!);
    
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