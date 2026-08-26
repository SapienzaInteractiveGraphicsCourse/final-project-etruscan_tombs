import * as THREE from "three";

export let torchLight;

export function createTorch(camera, scene) {

    torchLight = new THREE.SpotLight(
        0xffddaa,
        4
    );

    torchLight.angle = Math.PI / 6;
    torchLight.penumbra = 0.5;
    torchLight.distance = 20;
    torchLight.decay = 2;

    torchLight.castShadow = true;

    torchLight.visible = false;

    camera.add(torchLight);

    camera.add(torchLight.target);

    torchLight.position.set(0, 0, 0);

    torchLight.target.position.set(0, 0, -5);

    scene.add(camera);

}