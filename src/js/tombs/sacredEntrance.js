import * as THREE from "three";
import { addCollider } from "../collision.js";

export let sacredEntrance;
export let sacredDoor;

export function createSacredEntrance(scene) {

    sacredEntrance = new THREE.Group();

    createFrontWall();
    createLeftWall();
    createRightWall();
    createRoof();
    createColumns();
    createDoor();
    createHandle();

    sacredEntrance.position.set(
        0,      
        0,      
        -71.5
    );

    sacredEntrance.traverse(child => {

        if (child.isMesh) {

            child.castShadow = true;
            child.receiveShadow = true;

        }

    });
    scene.add(sacredEntrance);

}

function createFrontWall() {

    const material = new THREE.MeshStandardMaterial({

        color: 0xc6b393

    });

    // Sinistra
    const left = new THREE.Mesh(

        new THREE.BoxGeometry(
            2.5,
            4.5,
            0.4
        ),

        material

    );

    left.position.set(
        -2.75,
        2.25,
        0
    );

    sacredEntrance.add(left);

    addCollider(left);

    // Destra
    const right = new THREE.Mesh(

        new THREE.BoxGeometry(
            2.5,
            4.5,
            0.4
        ),

        material

    );

    right.position.set(
        2.75,
        2.25,
        0
    );

    sacredEntrance.add(right);

    addCollider(right);

    // Architrave
    const top = new THREE.Mesh(

        new THREE.BoxGeometry(
            3,
            1,
            0.4
        ),

        material

    );

    top.position.set(
        0,
        4,
        0
    );

    sacredEntrance.add(top);

    addCollider(top);

}

function createLeftWall() {

    const shape = new THREE.Shape();

    shape.moveTo(0,0);
    shape.lineTo(0,4.5);
    shape.lineTo(8,0);
    shape.lineTo(0,0);

    const geometry = new THREE.ExtrudeGeometry(shape,{

        depth:0.4,
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
        -4,
        0,
        0
    );

    sacredEntrance.add(wall);

    addCollider(wall);

}

function createRightWall() {

    const shape = new THREE.Shape();

    shape.moveTo(0,0);
    shape.lineTo(0,4.5);
    shape.lineTo(8,0);
    shape.lineTo(0,0);

    const geometry = new THREE.ExtrudeGeometry(shape,{

        depth:0.4,
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
        4,
        0,
        0
    );

    sacredEntrance.add(wall);

    addCollider(wall);

}

function createRoof() {

    const material = new THREE.MeshStandardMaterial({

        color: 0x9b7653

    });

    const roof = new THREE.Mesh(

        new THREE.BoxGeometry(

            8.5,  
            0.25,
            9

        ),

        material

    );

    roof.rotation.x = THREE.MathUtils.degToRad(-29.5);

    roof.position.set(

        0,
        2.4,
        -4

    );

    sacredEntrance.add(roof);

    addCollider(roof);

}

function createColumns() {

    const material = new THREE.MeshStandardMaterial({

        color:0xb79f78

    });

    [-3.2,3.2].forEach(x=>{

        const column = new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.35,
                0.45,
                4.5,
                12
            ),

            material

        );

        column.position.set(
            x,
            2.25,
            0.35
        );

        sacredEntrance.add(column);

        addCollider(column);

    });

}

function createDoor() {

    const material = new THREE.MeshStandardMaterial({

        color:0x4a4034

    });

    sacredDoor = new THREE.Mesh(

        new THREE.BoxGeometry(
            3,
            3.6,
            0.15
        ),

        material

    );

    sacredDoor.position.set(
        0,
        1.8,
        0.15
    );

    sacredEntrance.add(sacredDoor);

    addCollider(sacredDoor);

}

function createHandle() {

    const material = new THREE.MeshStandardMaterial({

        color: 0x444444,
        metalness: 0.6,
        roughness: 0.4

    });

    const base = new THREE.Mesh(

        new THREE.CylinderGeometry(0.05, 0.05, 0.06, 16),

        material

    );

    base.rotation.x = Math.PI / 2;

    base.position.set(
        1,
        1.4,
        0.23
    );

    sacredEntrance.add(base);

    const handle = new THREE.Mesh(

        new THREE.CylinderGeometry(0.03, 0.03, 0.35, 16),

        material

    );

    handle.rotation.z = Math.PI / 2;

    handle.position.set(
        0.8,
        1.4,
        0.25
    );

    sacredEntrance.add(handle);

}