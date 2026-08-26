import * as THREE from "three";

const colliders = [];

export function addCollider(object) {

    colliders.push(object);

}

export function checkCollision(position) {

    const playerBox = new THREE.Box3().setFromCenterAndSize(
        position,
        new THREE.Vector3(0.6, 1.8, 0.6)
    );

    for (const object of colliders) {

        const objectBox = new THREE.Box3().setFromObject(object);

        if (playerBox.intersectsBox(objectBox)) {

            return true;

        }

    }

    return false;

}

export function getColliders() {

    return colliders;

}

export function removeCollider(object) {

    const index = colliders.indexOf(object);

    if (index !== -1) {

        colliders.splice(index, 1);

    }

}