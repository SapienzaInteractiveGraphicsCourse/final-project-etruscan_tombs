import * as THREE from "three";
import { addCollider } from "../collision.js";
export let tombEntrance6;
export let informationPanel6
export let tombDoor6;
const tombEntrance6Spawn = new THREE.Object3D();
export function createTombEntrance6(scene) {

    tombEntrance6 = new THREE.Group();

    createFrontWall();
    createLeftWall();
    createRightWall();
    createRoof();
    createDoor();
    createHandle();
    createInformationPanel();

    tombEntrance6.position.set(20, 0, -35);
    tombEntrance6.rotation.y = -Math.PI / 2;

    tombEntrance6Spawn.position.set(
        25,
        1.7,
        -15
    );

    tombEntrance6.add(tombEntrance6Spawn);

    tombEntrance6.traverse(child => {

        if (child.isMesh) {

            child.castShadow = true;
            child.receiveShadow = true;

        }

    });

    scene.add(tombEntrance6);

}
function createFrontWall(){

    const material = new THREE.MeshStandardMaterial({

        color:0xc6b393

    });

    // sinistra porta
    const left = new THREE.Mesh(

        new THREE.BoxGeometry(1.3,3,0.3),

        material

    );

    left.position.set(23.65,1.5,-17);

    tombEntrance6.add(left);

    // destra porta

    const right = new THREE.Mesh(

        new THREE.BoxGeometry(1.3,3,0.3),

        material

    );

    right.position.set(26.35,1.5,-17);

    tombEntrance6.add(right);

    // sopra porta

    const top = new THREE.Mesh(

        new THREE.BoxGeometry(1.4,0.8,0.3),

        material

    );

    top.position.set(25,2.6,-17);

    tombEntrance6.add(top);
    addCollider(top);

}

function createLeftWall(){

    const shape = new THREE.Shape();

    shape.moveTo(0,0);

    shape.lineTo(0,3);

    shape.lineTo(6,0);

    shape.lineTo(0,0);

    const geometry = new THREE.ExtrudeGeometry(shape,{

        depth:0.3,

        bevelEnabled:false

    });

    const material = new THREE.MeshStandardMaterial({

        color:0xc6b393

    });

    const wall = new THREE.Mesh(

        geometry,

        material

    );

    wall.rotation.y = Math.PI/2;

    wall.position.set(

        23,
        0,
        -17

    );

    tombEntrance6.add(wall);
    addCollider(wall);

}

function createRightWall(){

    const shape = new THREE.Shape();

    shape.moveTo(0,0);

    shape.lineTo(0,3);

    shape.lineTo(6,0);

    shape.lineTo(0,0);

    const geometry = new THREE.ExtrudeGeometry(shape,{

        depth:0.3,

        bevelEnabled:false

    });

    const material = new THREE.MeshStandardMaterial({

        color:0xc6b393

    });

    const wall = new THREE.Mesh(

        geometry,

        material

    );

    wall.rotation.y = -Math.PI/2;

    wall.scale.x = -1;

    wall.position.set(

        27,
        0,
        -17

    );

    tombEntrance6.add(wall);
    addCollider(wall);

}

function createRoof(){

    const material = new THREE.MeshStandardMaterial({

        color:0x9b7653

    });

    const roof = new THREE.Mesh(

        new THREE.BoxGeometry(

            4.2,
            0.2,
            6.8

        ),

        material

    );

    roof.rotation.x = THREE.MathUtils.degToRad(-27);

    roof.position.set(

        25,
        1.5,
        -20.2

    );

    tombEntrance6.add(roof);
    addCollider(roof);

}

function createDoor(){

    const material = new THREE.MeshStandardMaterial({

        color:0x4b4b4b

    });

    tombDoor6 = new THREE.Mesh(

        new THREE.BoxGeometry(

            1.5,
            2.2,
            0.12

        ),

        material

    );

    tombDoor6.position.set(

        25,
        1.1,
        -16.9

    );

    tombEntrance6.add(tombDoor6);
    addCollider(tombDoor6);

}

function createHandle() {

    const material = new THREE.MeshStandardMaterial({

        color: 0x444444,
        metalness: 0.6,
        roughness: 0.4

    });

    const base = new THREE.Mesh(

        new THREE.CylinderGeometry(0.04,0.04,0.05,16),

        material

    );

    base.rotation.x = Math.PI/2;

    base.position.set(
        25.35,
        1.1,
        -16.83
    );

    tombEntrance6.add(base);

    const handle = new THREE.Mesh(

        new THREE.CylinderGeometry(0.025,0.025,0.25,16),

        material

    );

    handle.rotation.z = Math.PI/2;

    handle.position.set(
        25.25,
        1.1,
        -16.80
    );

    tombEntrance6.add(handle);
    

}

function createInformationPanel() {

    // Materiale legno
    const woodMaterial = new THREE.MeshStandardMaterial({

        color: 0x7a5230

    });

    // Palo sinistro
    const leftPole = new THREE.Mesh(

        new THREE.CylinderGeometry(0.035, 0.04, 1.3, 10),

        woodMaterial

    );

    leftPole.position.set(
        21.8,
        0.65,
        -15.6
    );

    tombEntrance6.add(leftPole);

    // Palo destro
    const rightPole = leftPole.clone();

    rightPole.position.x += 0.9;

    tombEntrance6.add(rightPole);

    // Tavola di legno
    const frame = new THREE.Mesh(

        new THREE.BoxGeometry(1.1, 0.75, 0.06),

        woodMaterial

    );

    frame.position.set(
        22.25,
        1.45,
        -15.6
    );

    frame.rotation.x = THREE.MathUtils.degToRad(-10);

    tombEntrance6.add(frame);


    // =========================
    // Texture con il nome
    // =========================

    const canvas = document.createElement("canvas");

    canvas.width = 512;
    canvas.height = 256;

    const ctx = canvas.getContext("2d");

    // Sfondo
    ctx.fillStyle = "#efe6d0";
    ctx.fillRect(0, 0, 512, 256);

    // Bordo
    ctx.strokeStyle = "#6e5435";
    ctx.lineWidth = 8;
    ctx.strokeRect(8, 8, 496, 240);

    // Testo
    ctx.fillStyle = "#46331d";
    ctx.font = "bold 38px Georgia";
    ctx.textAlign = "center";

    ctx.fillText("TOMB OF", 256, 95);
    ctx.fillText("THE JUGGLERS", 256, 155);

    const panelTexture = new THREE.CanvasTexture(canvas);

    const panelMaterial = new THREE.MeshStandardMaterial({

        map: panelTexture

    });

    informationPanel6 = new THREE.Mesh(

        new THREE.BoxGeometry(0.95, 0.60, 0.02),

        panelMaterial

    );

    informationPanel6.position.set(
        22.25,
        1.45,
        -15.56
    );

    informationPanel6.rotation.x = THREE.MathUtils.degToRad(-10);

    tombEntrance6.add(informationPanel6);
    addCollider(informationPanel6);

}