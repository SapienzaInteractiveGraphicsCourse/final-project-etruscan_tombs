import * as THREE from "three";
import { gameState } from "../gameState.js";
import { addCollider } from "../collision.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { loadingManager } from "../loadingManager.js";
const gltfLoader = new GLTFLoader(loadingManager);

export const urns = [];
export function createTomb1Puzzle(tomb1) {

    createUrns(tomb1);

}

// ==========================
// URNS
// ==========================

function createUrn(tomb1, x, z, hasRelic) {

    gltfLoader.load(

        "assets/models/etruscan_olla.glb",

        (gltf) => {

            const urn = gltf.scene;

            urn.position.set(
                x,
                0.5,
                z
            );

            urn.scale.set(
                2,
                2,
                2
            );

            urn.rotation.y =
                Math.random() * Math.PI * 2;

            tomb1.add(urn);

            addCollider(urn);

            urns.push({

                mesh: urn,

                searched: false,

                hasRelic: hasRelic

            });

        }

    );

}
export function createUrns(tomb1) {

    createUrn(tomb1, 24.0, -31.2, false);

    createUrn(tomb1, 26.0, -31.2, true);

    createUrn(tomb1, 24.0, -30.2, false);

    createUrn(tomb1, 26.0, -30.2, false);

}


// ==========================
// INTERAZIONI
// ==========================

export function inspectUrn(urn) {

    if (urn.searched) {

        return "Nothing here.";

    }

    urn.searched = true;

    if (urn.hasRelic) {

        gameState.relics++;

        gameState.hasSacredRelic1 = true;

        return "You recovered a Sacred Golden Necklace.";

    }

    return "Only ashes.";

}

export function resetTomb1Puzzle() {

    for (const urn of urns) {

        urn.searched = false;


    }

}
