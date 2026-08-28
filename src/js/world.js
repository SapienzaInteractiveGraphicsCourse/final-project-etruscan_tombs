import * as THREE from "three";
import { loadingManager } from "./loadingManager.js";

const textureLoader = new THREE.TextureLoader(loadingManager);

const grassTexture = textureLoader.load(
    "assets/textures/prato.png"
);

grassTexture.wrapS = THREE.RepeatWrapping;
grassTexture.wrapT = THREE.RepeatWrapping;
grassTexture.repeat.set(60, 60);

const world = new THREE.Group();

export function createWorld(scene) {

    // Terreno
    const geometry = new THREE.PlaneGeometry(500,220);
    const material = new THREE.MeshStandardMaterial({
    map: grassTexture
    });

    const ground = new THREE.Mesh(geometry, material);

    ground.rotation.x = -Math.PI / 2;
    ground.position.set(0,0,0);
    ground.receiveShadow = true;
    
    // Texture sentiero
    const pathTexture = textureLoader.load(
        "assets/textures/sentiero3.png"
    );

    pathTexture.wrapS = THREE.RepeatWrapping;
    pathTexture.wrapT = THREE.RepeatWrapping;

    pathTexture.repeat.set(2, 50);

    const pathMaterial = new THREE.MeshStandardMaterial({
        map: pathTexture,
    });

    const path = new THREE.Mesh(

        new THREE.PlaneGeometry(6, 130),

        pathMaterial

    );

    path.rotation.x = -Math.PI / 2;
    path.position.set(
        0,
        0.01,
        37.5
    );
    path.receiveShadow = true;
    
    world.add(ground);
    world.add(path);
    scene.add(world);
    world.position.z = -45;

}
