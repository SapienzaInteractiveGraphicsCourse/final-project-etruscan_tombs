import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { addCollider } from "../collision.js";

const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

export let tomb3;
export let internalDoor3;
export let relic3;

export let dustyWall;
export let hiddenMessage;
export let secretRelic;

export const paintingInspectPoint = new THREE.Object3D();


export function createTomb3(scene) {

    tomb3 = new THREE.Group();

    createEntrance();

    createMainRoom();

    tomb3.position.set(
        10,
        -4,
        -10
    );

    tomb3.rotation.y = Math.PI / 2;

    scene.add(tomb3);

    //createTomb3Puzzle(scene);

}

function createEntrance() {

    const entrance = new THREE.Group();

    createColumns(entrance);

    createArch(entrance);

    createCorridorFloor(entrance);

    createDustyWall(entrance);

    createHiddenMessage(entrance);

    tomb3.add(entrance);

}

function createColumns(entrance) {

    const stoneMaterial = new THREE.MeshStandardMaterial({

        color: 0x9a8b75

    });

    const leftColumn = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.7,
            2.2,
            9.4
        ),

        stoneMaterial

    );

    leftColumn.position.set(
        23.8,
        1.1,
        -24.1
    );

    entrance.add(leftColumn);

    addCollider(leftColumn);

    const rightColumn = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.7,
            2.2,
            9.4
        ),

        stoneMaterial

    );

    rightColumn.position.set(
        26.2,
        1.1,
        -24.1
    );

    entrance.add(rightColumn);

    addCollider(rightColumn);

}

function createArch(entrance) {

    const stoneMaterial = new THREE.MeshStandardMaterial({

        color:0x9a8b75

    });

    function addStone(width,x,y){

        const stone = new THREE.Mesh(

            new THREE.BoxGeometry(
                width,
                0.45,
                9.4
            ),

            stoneMaterial

        );

        stone.position.set(
            x,
            y,
            -24.1
        );

        entrance.add(stone);

    }

    addStone(3.2,25,2.3);
    addStone(2.6,25,2.7);
    addStone(2.0,25,3.1);

}

function createCorridorFloor(entrance){

    const stoneMaterial = new THREE.MeshStandardMaterial({

        color:0x8f8472

    });

    const floor = new THREE.Mesh(

        new THREE.BoxGeometry(
            3,
            0.1,
            9.4
        ),

        stoneMaterial

    );

    floor.position.set(
        25,
        0,
        -24.1
    );

    entrance.add(floor);

}


function createDustyWall(entrance) {

    const texture = textureLoader.load(
        "assets/textures/tomb1/polvere.png"
    );

    texture.colorSpace = THREE.SRGBColorSpace;

    dustyWall = new THREE.Mesh(

        new THREE.PlaneGeometry(
            1.25,
            0.75
        ),

        new THREE.MeshStandardMaterial({

            map: texture,
            transparent: true,
            alphaTest: 0.02,
            depthWrite: false,
            side: THREE.DoubleSide

        })

    );

    dustyWall.position.set(
        24.16,
        1.2,
        -25
    );

    dustyWall.rotation.y = Math.PI / 2;

    entrance.add(dustyWall);

}

function createHiddenMessage(entrance) {

    const canvas = document.createElement("canvas");

    canvas.width = 1024;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");

    // Sfondo trasparente
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Testo
    ctx.fillStyle = "#2f2418";
    ctx.font = "bold 70px Cinzel";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        "LOOK BENEATH",
        canvas.width / 2,
        210
    );

    ctx.fillText(
        "THE MAIN PAINTING",
        canvas.width / 2,
        320
    );

    const texture = new THREE.CanvasTexture(canvas);

    hiddenMessage = new THREE.Mesh(

        new THREE.PlaneGeometry(1.2, 0.7),

        new THREE.MeshStandardMaterial({

            map: texture,
            transparent: true,
            side: THREE.DoubleSide

        })

    );

    hiddenMessage.position.copy(dustyWall.position);

    hiddenMessage.rotation.copy(dustyWall.rotation);

    hiddenMessage.visible = false;

    entrance.add(hiddenMessage);

}

function createMainRoom(){

    const room = new THREE.Group();

    createRoomFloor(room);

    createRoomWalls(room);

    createRoomRoof(room);

    createCentralBeam(room);

    createRoomEntrance(room);

    createDoor(room);

    createstartwall(room);

    createSecretRelic(room);

    tomb3.add(room);

}

function createRoomFloor(room){

    const stoneMaterial = new THREE.MeshStandardMaterial({

        color:0x8f8472

    });

    const floor = new THREE.Mesh(

        new THREE.BoxGeometry(
            4,
            0.1,
            4
        ),

        stoneMaterial

    );

    floor.position.set(
        25,
        0,
        -30.8
    );

    room.add(floor);

}

function createRoomWalls(room){

    const WallTexture = textureLoader.load(
                "assets/textures/tombs/laterale3_.png"
            );
    WallTexture.colorSpace = THREE.SRGBColorSpace;

    const WallMaterial =
        new THREE.MeshStandardMaterial({

            map: WallTexture

        });


    const leftWall = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.3,
            2,
            4
        ),

        WallMaterial

    );

    leftWall.position.set(
        23,
        1,
        -30.8
    );

    room.add(leftWall);

    addCollider(leftWall);

    const rightWall = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.3,
            2,
            4
        ),

        WallMaterial

    );

    rightWall.position.set(
        27,
        1,
        -30.8
    );

    room.add(rightWall);

    addCollider(rightWall);


    const backWallTexture = textureLoader.load(
        "assets/textures/tombs/fondo 3_.png"
    );

    backWallTexture.colorSpace =
        THREE.SRGBColorSpace;

    const backWallMaterial =
        new THREE.MeshStandardMaterial({

            map:backWallTexture

        });

    const backWall = new THREE.Mesh(

        new THREE.BoxGeometry(
            4,
            2.6,
            0.3
        ),

        backWallMaterial

    );

    backWall.position.set(
        25,
        1.3,
        -32.8
    );

    room.add(backWall);

    addCollider(backWall);

    paintingInspectPoint.position.set(
        25,
        0.8,
        -31.8
    );

    room.add(paintingInspectPoint);

}

function createRoomRoof(room) {

    const RoofTexture = textureLoader.load(
                "assets/textures/tombs/beam2.png"
            );
    RoofTexture.colorSpace = THREE.SRGBColorSpace;

    const RoofMaterial =
        new THREE.MeshStandardMaterial({

            map: RoofTexture

        });


    const leftRoof = new THREE.Mesh(

        new THREE.BoxGeometry(
            2.2,
            0.2,
            4
        ),

        RoofMaterial

    );

    leftRoof.position.set(

        24,
        2.15,
        -30.8

    );

    leftRoof.rotation.z = Math.PI / 8;

    room.add(leftRoof);

    const rightRoof = new THREE.Mesh(

        new THREE.BoxGeometry(
            2.2,
            0.2,
            4
        ),

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
                "assets/textures/tombs/soffitto2.png"
            );
    BeamTexture.colorSpace = THREE.SRGBColorSpace;

    const BeamMaterial =
        new THREE.MeshStandardMaterial({

            map: BeamTexture

        });
    

    const beam = new THREE.Mesh(

        new THREE.BoxGeometry(

            0.8,
            0.35,
            4.2

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

    const left = new THREE.Mesh(

        new THREE.BoxGeometry(

            1.5,
            2.5,
            1

        ),

        stoneMaterial

    );

    left.position.set(

        23.4,
        1,
        -28.7

    );

    room.add(left);

    addCollider(left);

    const right = new THREE.Mesh(

        new THREE.BoxGeometry(

            1.5,
            2.5,
            1

        ),

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

    internalDoor3 = new THREE.Mesh(

        new THREE.BoxGeometry(
            1.5,
            1.8,
            0.1
        ),

        stoneMaterial

    );

    internalDoor3.position.set(
        25,
        0.9,
        -19.6
    );

    room.add(internalDoor3);
    addCollider(internalDoor3);

}

let wallCleaned = false;

export function updateDustyWall() {

    if (wallCleaned)
        return;

    const distance =
        controls.object.position.distanceTo(
            dustyWall.position
        );

    if (distance > 2)
        return;

    if (gameState.brushEquipped) {

        showInteraction(
            "[E] Brush wall"
        );

    }
    else {

        showInteraction(
            "You need a brush to remove the dust."
        );

    }

}

export function brushDustyWall() {

    if (wallCleaned)
        return false;

    if (!gameState.brushEquipped)
        return false;

    const distance =
        controls.object.position.distanceTo(
            dustyWall.position
        );

    if (distance > 2)
        return false;

    dustyWall.visible = false;

    hiddenMessage.visible = true;

    wallCleaned = true;

    return true;

}



function createSecretRelic(room) {

    gltfLoader.load(

        "assets/models/bronze_figurine.glb",

        (gltf) => {

            secretRelic = gltf.scene;

            secretRelic.position.set(
                25,
                1,
                -32.2
            );

            secretRelic.rotation.set(
                0,
                Math.PI / 4,
                0
            );

            
            secretRelic.scale.set(
                3.5,
                3.5,
                3.5
            );

            secretRelic.visible = false;

            addCollider(secretRelic);

            room.add(secretRelic);

        }

    );


}

let relicRevealed = false;
export let wallAlreadyInspected = false;

export function revealSecretRelic() {

    if (relicRevealed || !secretRelic)
        return;

    relicRevealed = true;
    wallAlreadyInspected = true;

    secretRelic.visible = true;

}

export function resetSecretRelic() {

    relicRevealed = false;
    wallAlreadyInspected = false;

    if (secretRelic) {

        secretRelic.visible = false;

    }

}