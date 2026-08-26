import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { addCollider, removeCollider} from "../collision.js";
import { augursPedestal, leopardsPedestal, huntingPedestal, sealedPassage } from "./sacredChamber.js";

const gltfLoader = new GLTFLoader();
let openingPassage = false;
export const PEDESTAL = {

    AUGURS: "augurs",
    LEOPARDS: "leopards",
    HUNTING: "hunting"

};

export const pedestals = {

    augurs: {

        object: null,
        relic: null,
        model: null

    },

    leopards: {

        object: null,
        relic: null,
        model: null

    },

    hunting: {

        object: null,
        relic: null,
        model: null

    }

};

let selectedPedestal = null;

let puzzleSolved = false;



// ======================================================
// INITIALIZE
// ======================================================

export function initializePedestals() {

    pedestals.augurs.object = augursPedestal;

    pedestals.leopards.object = leopardsPedestal;

    pedestals.hunting.object = huntingPedestal;

}



// ======================================================
// SELECT PEDESTAL
// ======================================================

export function selectPedestal(name) {

    selectedPedestal = name;

}

export function getSelectedPedestal() {

    return selectedPedestal;

}



// ======================================================
// PLACE RELIC
// ======================================================

export function placeRelic(relic) {

    if (!selectedPedestal)
        return false;

    if (pedestals[selectedPedestal].relic)
        return false;

    pedestals[selectedPedestal].relic = relic;

    createRelicModel(selectedPedestal, relic);

    checkPuzzle();

    return true;

}

function createRelicModel(name, relic) {

    let modelPath = "";
    let scale = 3;
    let rotationY = 0;
    let positionY= 1.05;
    switch (relic) {

        case 1:
            modelPath = "../src/assets/models/necklace.glb";
            scale = 0.01;
            rotationY = 0;
            positionY=  1.28;
            break;

        case 2:
            modelPath = "../src/assets/models/kantharos.glb";
            scale = 3;
            rotationY=Math.PI;
            break;

        case 3:
            modelPath = "../src/assets/models/bronze_figurine.glb";
            scale = 3.5;
            rotationY= Math.PI/4;
            break;

    }

    gltfLoader.load(

        modelPath,

        (gltf) => {

            const model = gltf.scene;

            model.position.set(
                0,
                positionY,
                0
            );

             model.rotation.set(
                0,
                rotationY,
                0
            );

            model.scale.set(
                scale,
                scale,
                scale
            );

            pedestals[name].object.add(model);

            pedestals[name].model = model;

        }

    );

}

// ======================================================
// CHECK
// ======================================================

function checkPuzzle() {

    if (

        pedestals.augurs.relic &&
        pedestals.leopards.relic &&
        pedestals.hunting.relic

    ) {

        puzzleSolved = true;

        openPassage();

    }

}



// ======================================================
// OPEN PASSAGE
// ======================================================

function openPassage() {

    if (!sealedPassage)
        return;

    openingPassage = true;

    //removeCollider(sealedPassage);

}



// ======================================================
// GETTERS
// ======================================================

export function isPuzzleSolved() {

    return puzzleSolved;

}

export function getPedestal(name) {

    return pedestals[name];

}



// ======================================================
// RESET
// ======================================================

export function resetSacredPuzzle() {

    for (const key of Object.keys(pedestals)) {

        if (pedestals[key].model) {

            pedestals[key].object.remove(
                pedestals[key].model
            );

            pedestals[key].model = null;

        }

        pedestals[key].relic = null;

    }

    selectedPedestal = null;

    puzzleSolved = false;

    if (sealedPassage) {

        sealedPassage.visible = true;
        //removeCollider(sealedPassage)
        //addCollider(sealedPassage)

    }

}

export function isPedestalEmpty(name) {

    return pedestals[name].relic === null;

}

export function updateSacredPassage() {

    if (!openingPassage)
        return;

    sealedPassage.position.x += 0.005;

    if (sealedPassage.position.x >= 27) {

        sealedPassage.position.x = 27;
        openingPassage = false;

    }

}