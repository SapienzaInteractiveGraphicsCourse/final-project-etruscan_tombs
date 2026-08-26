import * as THREE from "three";
import { addCollider } from "./collision.js";

export let leftPivot;
export let rightPivot;

export let leftGate;
export let rightGate;

export let gateOpen = false;
let opening = false;
let closing = false;

export function toggleGate() {

    if (opening || closing) return;

    if (gateOpen) {

        closing = true;

    } else {

        opening = true;

    }

}

export function updateGate() {

    const speed = 0.02;

    // Apertura
    if (opening) {

        if (leftPivot.rotation.y < Math.PI / 2)
            leftPivot.rotation.y += speed;

        if (rightPivot.rotation.y > -Math.PI / 2)
            rightPivot.rotation.y -= speed;

        if (
            leftPivot.rotation.y >= Math.PI / 2 &&
            rightPivot.rotation.y <= -Math.PI / 2
        ) {

            opening = false;
            gateOpen = true;

        }

    }

    // Chiusura
    if (closing) {

        if (leftPivot.rotation.y > 0)
            leftPivot.rotation.y -= speed;

        if (rightPivot.rotation.y < 0)
            rightPivot.rotation.y += speed;

        if (
            leftPivot.rotation.y <= 0 &&
            rightPivot.rotation.y >= 0
        ) {

            leftPivot.rotation.y = 0;
            rightPivot.rotation.y = 0;

            closing = false;
            gateOpen = false;

        }

    }

}

export function resetGate() {

    gateOpen = false;
    opening = false;
    closing = false;

    leftPivot.rotation.y = 0;
    rightPivot.rotation.y = 0;

}

export function createGate(scene) {

    const gate = new THREE.Group();

   const woodMaterial = new THREE.MeshStandardMaterial({
    color: 0x6b4423
});

// Gruppi delle due ante
leftGate = new THREE.Group();
rightGate = new THREE.Group();

// Assi verticali
const plankGeometry = new THREE.BoxGeometry(0.25, 3.2, 0.12);

// Traverse
const barGeometry = new THREE.BoxGeometry(1.55, 0.18, 0.14);

function buildGateLeaf(gateLeaf) {

    const numPlanks = 5;
    const spacing = 0.28;

    const startX = -((numPlanks - 1) * spacing) / 2;

    for (let i = 0; i < numPlanks; i++) {

        const plank = new THREE.Mesh(plankGeometry, woodMaterial);

        plank.position.set(startX + i * spacing, 0, 0);

        gateLeaf.add(plank);

    }

    const topBar = new THREE.Mesh(barGeometry, woodMaterial);
    topBar.position.set(0, 0.9, 0.02);

    const bottomBar = new THREE.Mesh(barGeometry, woodMaterial);
    bottomBar.position.set(0, -0.9, 0.02);

    gateLeaf.add(topBar);
    gateLeaf.add(bottomBar);

    }

    buildGateLeaf(leftGate);
    buildGateLeaf(rightGate);

    leftPivot = new THREE.Group();
    rightPivot = new THREE.Group();
    leftPivot.position.set(-1.5, 1.6, 4);
    rightPivot.position.set(1.5, 1.6, 4);
    leftGate.position.set(0.75, 0, 0);
    rightGate.position.set(-0.75, 0, 0);
    leftPivot.add(leftGate);
    rightPivot.add(rightGate);
    gate.add(leftPivot);
    gate.add(rightPivot);


    addCollider(leftGate);
    addCollider(rightGate);

    gate.traverse(child => {

        if (child.isMesh) {

            child.castShadow = true;
            child.receiveShadow = true;

        }

    });

    scene.add(gate);
}