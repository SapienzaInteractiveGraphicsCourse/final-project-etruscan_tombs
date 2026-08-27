import * as THREE from "three";
import { addCollider } from "../collision.js";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { loadingManager } from "../loadingManager.js";
const gltfLoader = new GLTFLoader(loadingManager);

export let finalSarcophagus;

export let sealedPassage;
export let sacredDoor;
export let augursPedestal;
export let leopardsPedestal;
export let huntingPedestal;

const textureLoader = new THREE.TextureLoader(loadingManager);

export function createSacredRoom(roomGroup) {

    const room = new THREE.Group();

    createRoomFloor(room);

    createRoomWalls(room);

    createRoomRoof(room);

    createCentralBeam(room);

    createPedestals(room);

    createCorridor(room);

    createFinalRoom(room);

    room.position.set(0,-6,-74)

    roomGroup.add(room);

}

function createRoomFloor(room) {

    const material = new THREE.MeshStandardMaterial({

        color: 0x8f8472

    });

    const floor = new THREE.Mesh(

        new THREE.BoxGeometry(
            8,
            0.1,
            8
        ),

        material

    );

    floor.position.set(
        0,
        0,
        0
    );

    floor.receiveShadow = true;

    room.add(floor);

}

function createRoomWalls(room) {

    const material = new THREE.MeshStandardMaterial({

        color: 0x9a8b75

    });

    // Sinistra

    const leftWall = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.3,
            2.8,
            8
        ),

        material

    );

    leftWall.position.set(
        -4,
        1.4,
        0
    );

    room.add(leftWall);

    addCollider(leftWall);

    // Destra

    const rightWall = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.3,
            2.8,
            8
        ),

        material

    );

    rightWall.position.set(
        4,
        1.4,
        0
    );

    room.add(rightWall);

    addCollider(rightWall);

    // Parete frontale

    const frontWall = new THREE.Mesh(

        new THREE.BoxGeometry(
            8,
            4,
            0.3
        ),

        material

    );

    frontWall.position.set(
        0,
        2,
        4
    );

    room.add(frontWall);

    addCollider(frontWall);

    const doorMaterial = new THREE.MeshStandardMaterial({

        color: 0x4a4034

    });

    sacredDoor = new THREE.Mesh(

        new THREE.BoxGeometry(
            3,
            3.7,
            0.15
        ),

        doorMaterial

    );

    sacredDoor.position.set(
        0,
        1.4,
        3.9
    );

    room.add(sacredDoor);

    createBackWall(room, material);

}

function createBackWall(room, material) {

    // Sinistra

    const left = new THREE.Mesh(

        new THREE.BoxGeometry(
            2.5,
            4,
            7.3
        ),

        material

    );

    left.position.set(
        -2.75,
        1.4,
        -7.5
    );

    room.add(left);

    addCollider(left);

    // Destra

    const right = new THREE.Mesh(

        new THREE.BoxGeometry(
            2.5,
            4,
            7.3
        ),

        material

    );

    right.position.set(
        2.75,
        1.4,
        -7.5
    );

    room.add(right);

    addCollider(right);

    // Architrave

    const top = new THREE.Mesh(

        new THREE.BoxGeometry(
            3,
            3,
            7.3
        ),

        material

    );

    top.position.set(
        0,
        3.8,
        -7.5
    );

    room.add(top);

    addCollider(top);

    // Blocco nascosto

    sealedPassage = new THREE.Mesh(

        new THREE.BoxGeometry(
            3,
            3.8,
            0.3
        ),

        material

    );

    sealedPassage.position.set(
        0,
        1.6,
        -4
    );

    room.add(sealedPassage);

    addCollider(sealedPassage);

}

function createRoomRoof(room) {

    const material = new THREE.MeshStandardMaterial({

        color: 0x8f8472

    });

    const leftRoof = new THREE.Mesh(

        new THREE.BoxGeometry(
            4.2,
            0.2,
            8
        ),

        material

    );

    leftRoof.position.set(
        -2,
        3,
        0
    );

    leftRoof.rotation.z = Math.PI / 8;

    room.add(leftRoof);

    const rightRoof = new THREE.Mesh(

        new THREE.BoxGeometry(
            4.2,
            0.2,
            8
        ),

        material

    );

    rightRoof.position.set(
        2,
        3,
        0
    );

    rightRoof.rotation.z = -Math.PI / 8;

    room.add(rightRoof);

}

function createCentralBeam(room) {

    const material = new THREE.MeshStandardMaterial({

        color: 0x8f8472

    });

    const beam = new THREE.Mesh(

        new THREE.BoxGeometry(
            2,
            0.35,
            8.2
        ),

        material

    );

    beam.position.set(
        0,
        3.6,
        0
    );

    room.add(beam);

}

function createPedestals(room) {

    augursPedestal =
        createPedestal(
            "augurs",
            -2.4,
            -1
        );

    leopardsPedestal =
        createPedestal(
            "leopards",
            0,
            -2
        );

    huntingPedestal =
        createPedestal(
            "hunting",
            2.4,
            -1
        );

    room.add(augursPedestal);
    room.add(leopardsPedestal);
    room.add(huntingPedestal);

}

function createPedestal(name, x, z) {

    const pedestal = new THREE.Group();

    pedestal.name = name;

    const stoneMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xb8ab92

        });

    // Base

    const base = new THREE.Mesh(

        new THREE.BoxGeometry(
            1,
            0.35,
            1
        ),

        stoneMaterial

    );

    base.position.y = 0.125;

    pedestal.add(base);
    addCollider(base);
    


    // Colonna

    const column = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.55,
            0.9,
            0.55
        ),

        stoneMaterial

    );

    column.position.y = 0.575;

    pedestal.add(column);
    addCollider(column);

    // Piastra superiore

    const top = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.9,
            0.12,
            0.9
        ),

        stoneMaterial

    );

    top.position.y = 0.95;

    pedestal.add(top);
    addCollider(top);

    pedestal.position.set(
        x,
        0,
        z
    );
    return pedestal;

}

function createCorridor(room) {

    const material = new THREE.MeshStandardMaterial({

        color: 0x9a8b75

    });

    const floorMaterial = new THREE.MeshStandardMaterial({

        color: 0x8f8472

    });

    // pavimento

    const floor = new THREE.Mesh(

        new THREE.BoxGeometry(
            3,
            0.1,
            6
        ),

        floorMaterial

    );

    floor.position.set(
        0,
        0,
        -7
    );

    room.add(floor);

    // parete sinistra

    const left = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.3,
            2.8,
            6
        ),

        material

    );

    left.position.set(
        -1.5,
        1.4,
        -7
    );

    room.add(left);

    addCollider(left);

    // parete destra

    const right = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.3,
            2.8,
            6
        ),

        material

    );

    right.position.set(
        1.5,
        1.4,
        -7
    );

    room.add(right);

    addCollider(right);

}

function createFinalRoom(room) {

    const material = new THREE.MeshStandardMaterial({

        color: 0x9a8b75

    });

    const floorMaterial = new THREE.MeshStandardMaterial({

        color: 0x8f8472

    });

    // pavimento

    const floor = new THREE.Mesh(

        new THREE.BoxGeometry(
            8,
            0.1,
            8
        ),

        floorMaterial

    );

    floor.position.set(
        0,
        0,
        -14
    );

    room.add(floor);

    // parete sinistra

    const left = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.3,
            2.8,
            8
        ),

        material

    );

    left.position.set(
        -4,
        1.4,
        -14
    );

    room.add(left);

    addCollider(left);

    // parete destra

    const right = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.3,
            2.8,
            8
        ),

        material

    );

    right.position.set(
        4,
        1.4,
        -14
    );

    room.add(right);

    addCollider(right);

    // parete fondo

    const back = new THREE.Mesh(

        new THREE.BoxGeometry(
            8,
            4,
            0.3
        ),

        material

    );

    back.position.set(
        0,
        2,
        -18
    );

    room.add(back);

    addCollider(back);

    // tetto sinistro

    const leftRoof = new THREE.Mesh(

        new THREE.BoxGeometry(
            4.2,
            0.2,
            8
        ),

        floorMaterial

    );

    leftRoof.position.set(
        -2,
        3,
        -14
    );

    leftRoof.rotation.z = Math.PI / 8;

    room.add(leftRoof);

    // tetto destro

    const rightRoof = new THREE.Mesh(

        new THREE.BoxGeometry(
            4.2,
            0.2,
            8
        ),

        floorMaterial

    );

    rightRoof.position.set(
        2,
        3,
        -14
    );

    rightRoof.rotation.z = -Math.PI / 8;

    room.add(rightRoof);

    // trave

    const beam = new THREE.Mesh(

        new THREE.BoxGeometry(
            2,
            0.35,
            8.2
        ),

        floorMaterial

    );

    beam.position.set(
        0,
        3.6,
        -14
    );

    room.add(beam);

    createSarcophagus(room);

}

function createSarcophagus(room) {

    gltfLoader.load(

        "assets/models/etruscan_female_sarcophagus.glb",

        (gltf) => {

            finalSarcophagus = new THREE.Group();

            const model = gltf.scene;

            model.position.y = 2.75;   // compensa il pivot

            finalSarcophagus.add(model);

            finalSarcophagus.position.set(
                0,
                0,
                -14
            );

            finalSarcophagus.rotation.y = Math.PI;

            finalSarcophagus.scale.set(
                1.2,
                1.2,
                1.2
            );

            room.add(finalSarcophagus);

            const collider = new THREE.Mesh(

                new THREE.BoxGeometry(
                    2.2,   // larghezza
                    1.3,   // altezza
                    0.8    // profondità
                ),

                new THREE.MeshBasicMaterial({
                    visible: false
                })

            );

            collider.position.set(
                -0.5,
                0.65,                    // metà dell'altezza del collider
                -13.5
            );

            room.add(collider);

            addCollider(collider);

            // opzionale: tieni un riferimento
            finalSarcophagus.userData.collider = collider;

        }

    );

}