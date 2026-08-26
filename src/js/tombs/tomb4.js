import * as THREE from "three";

import { addCollider } from "../collision.js";

const textureLoader = new THREE.TextureLoader();

export let tomb4;
export let internalDoor4;

export function createTomb4(scene) {

    tomb4 = new THREE.Group();

    createEntrance();

    createMainRoom();

    tomb4.position.set(-3, -4, -70);
    tomb4.rotation.y = -Math.PI / 2;


    scene.add(tomb4);

}

function createEntrance() {

    const entrance = new THREE.Group();

    createColumns(entrance);

    createArch(entrance);

    createCorridorFloor(entrance);

    tomb4.add(entrance);

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

    tomb4.add(room);

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

    const WallTexture = textureLoader.load(
            "../src/assets/textures/tombs/laterale4.png"
        );
    WallTexture.colorSpace = THREE.SRGBColorSpace;

    const WallMaterial =
        new THREE.MeshStandardMaterial({

            map: WallTexture

        });

    // Parete sinistra
    const leftWall = new THREE.Mesh(

        new THREE.BoxGeometry(0.3, 2, 4),

        WallMaterial

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
        WallMaterial
    );

    rightWall.position.set(27, 1, -30.8);
    room.add(rightWall);
    addCollider(rightWall);

     // Parete fondo

    const backWallTexture = textureLoader.load(
        "../src/assets/textures/tombs/frontale4_.png"
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

    const roofTexture = textureLoader.load(
            "../src/assets/textures/tombs/soffitto4.png"
        );
    roofTexture.colorSpace = THREE.SRGBColorSpace;

    const roofMaterial =
        new THREE.MeshStandardMaterial({

            map: roofTexture

        });

    // Falda sinistra
    const leftRoof = new THREE.Mesh(

        new THREE.BoxGeometry(2.2, 0.2, 4),

        roofMaterial

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

        roofMaterial

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

    internalDoor4 = new THREE.Mesh(

        new THREE.BoxGeometry(
            1.5,
            1.8,
            0.1
        ),

        stoneMaterial

    );

    internalDoor4.position.set(
        25,
        0.9,
        -19.6
    );

    room.add(internalDoor4);
    addCollider(internalDoor4);

}
