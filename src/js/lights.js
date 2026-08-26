import * as THREE from "three";

export let ambientLight;
export let sun;


export function createLights(scene){

    ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    sun = new THREE.DirectionalLight(0xffffff, 1);

    sun.position.set(60,80,40);

    sun.target.position.set(0,0,-45);

    scene.add(sun.target);

    sun.castShadow = true;
    sun.shadow.autoUpdate = true;

    sun.shadow.mapSize.width = 4096;
    sun.shadow.mapSize.height = 4096;

    sun.shadow.camera.near = 0.5;
    sun.shadow.camera.far = 180;

    sun.shadow.camera.left = -120;
    sun.shadow.camera.right = 120;
    sun.shadow.camera.top = 120;
    sun.shadow.camera.bottom = -120;

    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.02;

    scene.add(sun);
}
