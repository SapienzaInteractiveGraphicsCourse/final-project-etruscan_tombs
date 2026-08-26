import * as THREE from "three";
import { addCollider } from "./collision.js";
const textureLoader = new THREE.TextureLoader();

const stoneTexture = textureLoader.load(
    "assets/textures/muro1.png"
);

stoneTexture.wrapS = THREE.RepeatWrapping;
stoneTexture.wrapT = THREE.RepeatWrapping;
stoneTexture.repeat.set(50, 2);

const stoneMaterial = new THREE.MeshStandardMaterial({

    map: stoneTexture,

});

const pillarTexture = textureLoader.load(
    "assets/textures/archi.png"
);

pillarTexture.wrapS = THREE.RepeatWrapping;
pillarTexture.wrapT = THREE.RepeatWrapping;
pillarTexture.repeat.set(1, 2);

const pillarMaterial = new THREE.MeshStandardMaterial({
    map: pillarTexture,
    color: 0xe5dccb
});

const beamTexture = textureLoader.load(
    "assets/textures/archi.png"
);

beamTexture.wrapS = THREE.RepeatWrapping;
beamTexture.wrapT = THREE.RepeatWrapping;

beamTexture.repeat.set(1, 3);

beamTexture.center.set(0.5, 0.5);
beamTexture.rotation = Math.PI / 2;

const beamMaterial = new THREE.MeshStandardMaterial({
    map: beamTexture,
    color: 0xe5dccb
});

export function createEntrance(scene) {
    const entrance = new THREE.Group();

    

    // Pilastro sinistro
    const pillarGeometry = new THREE.BoxGeometry(1, 4, 0.6);
    const leftPillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    leftPillar.position.set(-2, 2, 4);
    addCollider(leftPillar);

    // Pilastro destro
    const rightPillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    rightPillar.position.set(2, 2, 4);
    addCollider(rightPillar);

    // Architrave
    const beamGeometry = new THREE.BoxGeometry(5, 1, 1);
    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.position.set(0, 4.5, 4);

    entrance.add(leftPillar);
    entrance.add(rightPillar);
    entrance.add(beam);

    // Geometria muri
    const wallGeometry = new THREE.BoxGeometry(97.5, 2, 0.6);
    const leftWall = new THREE.Mesh(wallGeometry, stoneMaterial);
    leftWall.position.set(-51.25, 1, 4);

    entrance.add(leftWall);

    addCollider(leftWall);
    const rightWall = new THREE.Mesh(wallGeometry, stoneMaterial);
    rightWall.position.set(51.25, 1, 4);

    entrance.add(rightWall);

    addCollider(rightWall);



    // Texture aiuola
    const hedgeTexture = textureLoader.load(
        "assets/textures/aiuola.png"
    );

    const hedgeNormal = textureLoader.load(
        "assets/textures/aiuola_normal.png"
    );

    // Ripetizione texture
    hedgeTexture.wrapS = THREE.RepeatWrapping;
    hedgeTexture.wrapT = THREE.RepeatWrapping;
    hedgeTexture.repeat.set(40, 2);

    // Ripetizione normal map
    hedgeNormal.wrapS = THREE.RepeatWrapping;
    hedgeNormal.wrapT = THREE.RepeatWrapping;
    hedgeNormal.repeat.copy(hedgeTexture.repeat);

    // Materiale aiuola
    const hedgeMaterial = new THREE.MeshStandardMaterial({

        map: hedgeTexture,
        normalMap: hedgeNormal,
        normalScale: new THREE.Vector2(0.5, 0.5)

    });

    // Geometria aiuola
    const flowerBedGeometry = new THREE.BoxGeometry(97.5, 3, 0.8);

    // Aiuola sinistra
    const leftFlowerBed = new THREE.Mesh(
        flowerBedGeometry,
        hedgeMaterial
    );
    leftFlowerBed.position.set(-51.25, 3.5, 4);

    // Aiuola destra
    const rightFlowerBed = new THREE.Mesh(
        flowerBedGeometry,
        hedgeMaterial
    );
    rightFlowerBed.position.set(51.25, 3.5, 4);

    entrance.add(leftFlowerBed);
    entrance.add(rightFlowerBed);

    entrance.traverse(child => {

        if (child.isMesh) {

            child.castShadow = true;
            child.receiveShadow = true;

        }

    });

    scene.add(entrance);

}