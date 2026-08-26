import * as THREE from "three";
import { addCollider } from "../collision.js";

export let rockWall;
export let rocksBroken = false;

const rocks = [];

let hits = 0;

const MAX_HITS = 6;

export function createTomb2Puzzle(scene) {

    rockWall = new THREE.Group();

    createRockWall();

    scene.add(rockWall);

}

function createRockWall() {

    const material = new THREE.MeshStandardMaterial({

        color: 0x7a746d,
        roughness: 1

    });

    const positions = [

        [-0.9, 0.3],
        [-0.3, 0.3],
        [ 0.3, 0.3],
        [ 0.9, 0.3],

        [-1.2, 0.8],
        [-0.6, 0.8],
        [ 0.0, 0.8],
        [ 0.6, 0.8],
        [ 1.2, 0.8],

        [-0.9, 1.3],
        [-0.3, 1.3],
        [ 0.3, 1.3],
        [ 0.9, 1.3],

        [-0.6, 1.8],
        [ 0.0, 1.8],
        [ 0.6, 1.8]

    ];

    positions.forEach(pos => {

        const geometry =
            new THREE.IcosahedronGeometry(
                0.33 + Math.random() * 0.08,
                0
            );

        const rock = new THREE.Mesh(

            geometry,

            material

        );

        rock.position.set(

            pos[0],
            pos[1],
            0.15

        );

        rock.rotation.set(

            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI

        );

        rock.userData = {

            falling: false,

            landed: false,

            velocity: new THREE.Vector3(),

            rotationSpeed: new THREE.Vector3(),

            startPosition: rock.position.clone(),

            startRotation: new THREE.Euler(

                rock.rotation.x,
                rock.rotation.y,
                rock.rotation.z

            )

        };

        rockWall.add(rock);

        rocks.push(rock);

    });

    rockWall.position.set(

        -26,
        0.1,
        -9.9

    );

    rockWall.rotation.y = Math.PI / 2;

    addCollider(rockWall);

}

function dropRock(rock) {

    if (
        rock.userData.falling ||
        rock.userData.landed ||
        !rock.visible
    )
        return;

    rock.userData.falling = true;

    rock.userData.velocity.set(

        (Math.random() - 0.5) * 0.02,

        0.035 + Math.random() * 0.02,

        (Math.random() - 0.5) * 0.02

    );

    rock.userData.rotationSpeed.set(

        (Math.random() - 0.5) * 0.15,

        (Math.random() - 0.5) * 0.15,

        (Math.random() - 0.5) * 0.15

    );

}

export function hitRockWall() {

    if (rocksBroken)
        return;

    hits++;

    let rocksToDrop = 2;

    for (let i = rocks.length - 1; i >= 0; i--) {

        const rock = rocks[i];

        if (rocksToDrop === 0)
            break;

        if (
            rock.userData.falling ||
            rock.userData.landed ||
            !rock.visible
        )
            continue;

        dropRock(rock);

        rocksToDrop--;

    }

    if (hits >= MAX_HITS) {

        breakRockWall();

    }

}

function breakRockWall() {

    rocksBroken = true;

    // Fa cadere tutte le rocce rimaste

    for (let i = rocks.length - 1; i >= 0; i--) {

        const rock = rocks[i];

        if (
            rock.userData.falling ||
            rock.userData.landed ||
            !rock.visible
        )
            continue;

        dropRock(rock);

    }

    // TODO:
    // removeCollider(rockWall);

}

export function updateRockWall() {

    rocks.forEach(rock => {

        if (!rock.userData.falling)
            return;

        // Gravità
        rock.userData.velocity.y -= 0.002;

        // Movimento
        rock.position.add(
            rock.userData.velocity
        );

        // Rotazione
        rock.rotation.x +=
            rock.userData.rotationSpeed.x;

        rock.rotation.y +=
            rock.userData.rotationSpeed.y;

        rock.rotation.z +=
            rock.userData.rotationSpeed.z;

        // Terreno
        const groundY = -0.45 + Math.random() * 0.15;

        if (rock.position.y <= groundY) {

            rock.position.y = groundY;

            // piccolo rimbalzo
            if (Math.abs(rock.userData.velocity.y) > 0.02) {

                rock.userData.velocity.y *= -0.15;

                rock.userData.velocity.x *= 0.75;

                rock.userData.velocity.z *= 0.75;

            }

            else {

                rock.userData.velocity.set(
                    0,
                    0,
                    0
                );

                rock.userData.rotationSpeed.multiplyScalar(
                    0
                );

                rock.userData.falling = false;

                rock.userData.landed = true;

            }

        }

    });

}

export function resetTomb2Puzzle() {

    hits = 0;

    rocksBroken = false;

    rockWall.visible = true;

    rocks.forEach(rock => {

        rock.visible = true;

        rock.userData.falling = false;

        rock.userData.velocity.set(0,0,0);

        rock.userData.rotationSpeed.set(0,0,0);

        rock.position.copy(
            rock.userData.startPosition
        );

        rock.rotation.copy(
            rock.userData.startRotation
        );

    });

}