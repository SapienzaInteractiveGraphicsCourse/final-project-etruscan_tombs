import * as THREE from "three";
import { getColliders } from "./collision.js";
const keys = {

    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false

};

export function setupPlayerControls() {

    document.addEventListener("keydown", (event) => {

        if (keys.hasOwnProperty(event.code)) {

            keys[event.code] = true;

        }

    });

    document.addEventListener("keyup", (event) => {

        if (keys.hasOwnProperty(event.code)) {

            keys[event.code] = false;

        }

    });

}

export function updatePlayer(controls, delta) {

    const speed = 6 * delta;

    const direction = new THREE.Vector3();

    if (keys.KeyW) direction.z -= 1;
    if (keys.KeyS) direction.z += 1;
    if (keys.KeyA) direction.x -= 1;
    if (keys.KeyD) direction.x += 1;

    if (direction.length() === 0) return;

    direction.normalize();

    // Direzione rispetto alla camera
    direction.applyQuaternion(controls.object.quaternion);
    direction.y = 0;
    direction.normalize();

    const newPosition = controls.object.position.clone();
    newPosition.addScaledVector(direction, speed);

    // Limiti del mondo
    if (

        newPosition.x < -80 ||
        newPosition.x > 80 ||
        newPosition.z < -135 ||
        newPosition.z > 35

    ) {

        return;

    }

    // Box del giocatore
    const playerBox = new THREE.Box3().setFromCenterAndSize(
        newPosition,
        new THREE.Vector3(0.6, 1.8, 0.6)
    );

    // Controllo collisioni
    for (const collider of getColliders()) {
        collider.updateMatrixWorld(true);
        const colliderBox = new THREE.Box3().setFromObject(collider);

        if (playerBox.intersectsBox(colliderBox)) {

            return; // non si muove

        }

    }

    // Movimento consentito
    controls.object.position.copy(newPosition);

}