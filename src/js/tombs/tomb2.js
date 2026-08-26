import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { createTomb2Puzzle } from "./tomb2Puzzle.js";

import { addCollider } from "../collision.js";

const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

export let tomb2;
export let internalDoor2;
export let bucchero;


export function createTomb2(scene) {

    tomb2 = new THREE.Group();

    createEntrance();

    createMainRoom();

    tomb2.position.set(-10, -4, 15);
    tomb2.rotation.y = Math.PI / 2;


    scene.add(tomb2);
    createTomb2Puzzle(scene);

}

function createEntrance() {

    const entrance = new THREE.Group();

    createColumns(entrance);

    createArch(entrance);

    createCorridorFloor(entrance);

    tomb2.add(entrance);

}

function createColumns(entrance) {

    const stoneMaterial = new THREE.MeshStandardMaterial({

        color: 0x9a8b75

    });

    // Colonna sinistra
    const leftColumn = new THREE.Mesh(

        new THREE.BoxGeometry(0.7, 2.2, 9.4),

        stoneMaterial

    );


    leftColumn.position.set(23.8, 1.1, -24.1);

    entrance.add(leftColumn);
    addCollider(leftColumn);

    // Colonna destra
    const rightColumn = new THREE.Mesh(

        new THREE.BoxGeometry(0.7, 2.2, 9.4),

        stoneMaterial

    );

    rightColumn.position.set(26.2, 1.1, -24.1);

    entrance.add(rightColumn);
    addCollider(rightColumn);

}

function createArch(entrance) {

    const stoneMaterial = new THREE.MeshStandardMaterial({

        color: 0x9a8b75

    });

    function addStone(width, x, y) {

        const stone = new THREE.Mesh(

            new THREE.BoxGeometry(width, 0.45, 9.4),

            stoneMaterial

        );

        stone.position.set(x, y, -24.1);

        entrance.add(stone);

    }

    // Blocco inferiore
    addStone(3.2, 25, 2.3);

    // Blocco centrale
    addStone(2.6, 25, 2.7);

    // Blocco superiore
    addStone(2.0, 25, 3.1);

}

function createCorridorFloor(entrance) {

    const stoneMaterial = new THREE.MeshStandardMaterial({

        color: 0x8f8472

    });

    const floor = new THREE.Mesh(

        new THREE.BoxGeometry(3, 0.1, 9.4),

        stoneMaterial

    );

    floor.position.set(25, 0, -24.1);

    entrance.add(floor);


}


function createMainRoom() {

    const room = new THREE.Group();

    createRoomFloor(room);

    createRoomWalls(room);

    createRoomRoof(room);

    createCentralBeam(room);

    createRoomEntrance(room);

    createDoor(room);
    createstartwall(room);

    createRelic(room);


    tomb2.add(room);

}

function createRoomFloor(room) {

    const stoneMaterial = new THREE.MeshStandardMaterial({

        color: 0x8f8472

    });

    const floor = new THREE.Mesh(

        new THREE.BoxGeometry(4, 0.1, 4),

        stoneMaterial

    );

    // Subito dopo il corridoio
    floor.position.set(

        25,
        0,
        -30.8

    );
    room.add(floor);
}

function createRoomWalls(room) {

    const stoneMaterial = new THREE.MeshStandardMaterial({

        color: 0x9a8b75

    });

    const LeftTexture = textureLoader.load(
            "../src/assets/textures/tombs/laterale2_.png"
        );
    LeftTexture.colorSpace = THREE.SRGBColorSpace;

    const LeftMaterial =
        new THREE.MeshStandardMaterial({

            map: LeftTexture

        });
    // Parete sinistra
    const leftWall = new THREE.Mesh(

        new THREE.BoxGeometry(0.3, 2, 4),

        LeftMaterial

    );

    leftWall.position.set(

        23,
        1,
        -30.8

    );

    room.add(leftWall);
    addCollider(leftWall);

    // MURO
    const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 2, 4),
        stoneMaterial
    );

    rightWall.position.set(27, 1, -30.8);
    room.add(rightWall);
    addCollider(rightWall);


    // AFFRESCO
    const texture = textureLoader.load(
        "../src/assets/textures/tombs/laterale2_.png"
    );

    texture.colorSpace = THREE.SRGBColorSpace;

    const frescoMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide
    });

    const fresco = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 2),
        frescoMaterial
    );

    // appena davanti al muro, verso l'interno della stanza
    fresco.position.set(
        26.84,
        1,
        -30.8
    );

    fresco.rotation.y = -Math.PI / 2;

    room.add(fresco);

     // Parete fondo

    const backWallTexture = textureLoader.load(
        "../src/assets/textures/tombs/fondo 2_.png"
    );
    backWallTexture.colorSpace = THREE.SRGBColorSpace;

    const backWallMaterial =
        new THREE.MeshStandardMaterial({

            map: backWallTexture

        });
    const backWall = new THREE.Mesh(

        new THREE.BoxGeometry(4, 2.6, 0.3),

        backWallMaterial

    );

    backWall.position.set(

        25,
        1.3,
        -32.8

    );

    room.add(backWall);
    addCollider(backWall);
}

function createRoomRoof(room) {

    const RoofTexture = textureLoader.load(
            "../src/assets/textures/tombs/beam2.png"
        );
    RoofTexture.colorSpace = THREE.SRGBColorSpace;

    const RoofMaterial =
        new THREE.MeshStandardMaterial({

            map: RoofTexture

        });

    // Falda sinistra
    const leftRoof = new THREE.Mesh(

        new THREE.BoxGeometry(2.2, 0.2, 4),

        RoofMaterial

    );

    leftRoof.position.set(

        24,
        2.15,
        -30.8

    );

    leftRoof.rotation.z = Math.PI / 8;

    room.add(leftRoof);

    // Falda destra
    const rightRoof = new THREE.Mesh(

        new THREE.BoxGeometry(2.2, 0.2, 4),

        RoofMaterial

    );

    rightRoof.position.set(

        26,
        2.15,
        -30.8

    );

    rightRoof.rotation.z = -Math.PI / 8;

    room.add(rightRoof);


}

function createCentralBeam(room) {

    const BeamTexture = textureLoader.load(
            "../src/assets/textures/tombs/soffitto2.png"
        );
    BeamTexture.colorSpace = THREE.SRGBColorSpace;

    const BeamMaterial =
        new THREE.MeshStandardMaterial({

            map: BeamTexture

        });


    const beam = new THREE.Mesh(

        new THREE.BoxGeometry(

            0.8,   // larghezza
            0.35,  // altezza
            4.2    // lunghezza

        ),

        BeamMaterial

    );

    beam.position.set(

        25,
        2.45,
        -30.8

    );

    room.add(beam);

}

function createRoomEntrance(room) {

    const stoneMaterial = new THREE.MeshStandardMaterial({

        color: 0x9a8b75

    });

    // Parete sinistra
    const left = new THREE.Mesh(

        new THREE.BoxGeometry(1.5, 2.5, 1),

        stoneMaterial

    );

    left.position.set(

        23.4,
        1,
        -28.7

    );

    room.add(left);
    addCollider(left);

    // Parete destra
    const right = new THREE.Mesh(

        new THREE.BoxGeometry(1.5, 2.5, 1),

        stoneMaterial

    );

    right.position.set(

        26.6,
        1,
        -28.7

    );

    room.add(right);
    addCollider(right);

}

function createstartwall(room) {

    const stoneMaterial = new THREE.MeshStandardMaterial({

        color:0x9a8b75

    });

    const startwall = new THREE.Mesh(

        new THREE.BoxGeometry(
            2,
            2.4,
            0.15
        ),

        stoneMaterial

    );

    startwall.position.set(
        25,
        1.1,
        -19.5
    );

    room.add(startwall);
    addCollider(startwall);

}

function createDoor(room) {

    const stoneMaterial = new THREE.MeshStandardMaterial({

        color:0x4b4b4b

    });

    internalDoor2 = new THREE.Mesh(

        new THREE.BoxGeometry(
            1.5,
            1.8,
            0.1
        ),

        stoneMaterial

    );

    internalDoor2.position.set(
        25,
        0.9,
        -19.6
    );

    room.add(internalDoor2);
    addCollider(internalDoor2);

}

function createRelic(room) {

    // Piedistallo

    const pedestal = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.7,
            0.55,
            0.7
        ),

        new THREE.MeshStandardMaterial({

            color: 0x8c8270

        })

    );

    pedestal.position.set(

        25,
        0.28,
        -31

    );
    addCollider(pedestal);
    room.add(pedestal);


    // Bucchero 3D

    gltfLoader.load(

        "../src/assets/models/kantharos.glb",

        (gltf) => {

            bucchero = gltf.scene;

            // da regolare
            bucchero.scale.set(
                3,
                3,
                3
            );

            bucchero.position.set(
                25,
                0.6,
                -31
            );

            bucchero.rotation.y = Math.PI;

            room.add(bucchero);

        }

    );

}