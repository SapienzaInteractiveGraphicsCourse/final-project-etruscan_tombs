//IMPORT
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import "./style1.css";
import { createWorld } from "./js/world.js";
import { createLights, ambientLight, sun } from "./js/lights.js";
import { createEntrance } from "./js/entrance.js";
import { createSign } from "./js/sign.js";
import { createGate, toggleGate, updateGate, gateOpen, resetGate } from "./js/gate.js";
import { setupPlayerControls, updatePlayer } from "./js/player.js";
import { createTable, table, torch, scroll, paper, brush, trowel, knife, rope, pen, stone, fragment, pickaxe } from "./js/table.js";
import { gameState,collectEquipment, resetGameState } from "./js/gameState.js";
import { documentLibrary } from "./js/documents.js";
import { createTorch,torchLight} from "./js/torch.js";
import { CreatetombEntrance1, tombDoor1, informationPanel1 } from "./js/tombs/Entrance1.js";
import { createTomb1, internalDoor1 } from "./js/tombs/tomb1.js";
import { urns, inspectUrn, resetTomb1Puzzle } from "./js/tombs/tomb1Puzzle.js";
import { createTombEntrance2, tombDoor2,informationPanel2} from "./js/tombs/Entrance2.js";
import { createTomb2, bucchero, internalDoor2 } from "./js/tombs/tomb2.js";
import { rockWall, rocksBroken, hitRockWall, updateRockWall, resetTomb2Puzzle } from "./js/tombs/tomb2Puzzle.js";
import { createTombEntrance3, tombDoor3,informationPanel3} from "./js/tombs/Entrance3.js";
import { createTomb3,internalDoor3, dustyWall, hiddenMessage, paintingInspectPoint, secretRelic, wallAlreadyInspected, revealSecretRelic, resetSecretRelic } from "./js/tombs/tomb3.js";
import { createSacredChamber,sacredWall, updateSacredChamber, consumeChamberOpened, resetSacredChamber} from "./js/tombs/MuroSacred.js";
import { createSacredEntrance, sacredDoor} from "./js/tombs/sacredEntrance.js"
import { createSacredRoom, augursPedestal, leopardsPedestal, huntingPedestal, finalSarcophagus } from "./js/tombs/sacredChamber.js";
import { initializePedestals, selectPedestal, getSelectedPedestal, placeRelic, isPedestalEmpty, PEDESTAL, resetSacredPuzzle, updateSacredPassage } from "./js/tombs/sacredPuzzle.js";
import { createEnvironment,updateEnvironment} from "./js/environment.js";
import { createTombEntrance4, tombDoor4, informationPanel4 } from "./js/tombs/Entrance4.js";
import { createTomb4, internalDoor4 } from "./js/tombs/tomb4.js";
import { createTombEntrance5, tombDoor5, informationPanel5 } from "./js/tombs/Entrance5.js";
import { createTomb5, internalDoor5 } from "./js/tombs/tomb5.js";
import { createTombEntrance6, tombDoor6, informationPanel6 } from "./js/tombs/Entrance6.js";
import { createTomb6, internalDoor6 } from "./js/tombs/tomb6.js";

// =====================================
//SCENE SETUP
// =====================================
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

//Renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

//Player controls
const controls = new PointerLockControls(
    camera,
    document.body
);

setupPlayerControls();

//Utilities
const clock = new THREE.Clock();

const raycaster = new THREE.Raycaster();

const cameraDirection = new THREE.Vector3();

const worldPosition = new THREE.Vector3();

// =====================================
// UI
// =====================================

//Into
const introScreen = document.getElementById("intro-screen");
const startButton = document.getElementById("startButton");

//Pause Menu
const pauseScreen = document.getElementById("pause-screen");
const resumeButton = document.getElementById("resumeButton");
const menuButton = document.getElementById("menuButton");
const confirmScreen = document.getElementById("confirm-screen");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");

//Equipment
const equipmentScreen =
    document.getElementById("equipment-screen");
const collectEquipmentButton =
    document.getElementById("collectEquipment");
const toolCheckboxes =
    document.querySelectorAll(".tool-checkbox");
const selectedToolsCount =
    document.getElementById("selected-tools-count");

//Inventory
const inventoryScreen =
    document.getElementById("inventory-screen");
const inventoryContent =
    document.getElementById("inventory-content");
const closeInventory =
    document.getElementById("closeInventory");
const equipmentTab =
    document.getElementById("equipmentTab");
const mapTab =
    document.getElementById("mapTab");
const documentsTab =
    document.getElementById("documentsTab");

const interactionPrompt =
    document.getElementById("interactive-prompt");

const objectiveMessage =
    document.getElementById("objective-message");

//Documents
const documentScreen =
    document.getElementById("document-screen");
const documentTitle =
    document.getElementById("document-title");
const documentContent =
    document.getElementById("document-content");
const closeDocument =
    document.getElementById("closeDocument");

const equippedHUD =
    document.getElementById("equipped-hud");

//RelicMenu
const relicScreen =
    document.getElementById("relic-screen");
const closeRelicMenu =
    document.getElementById("closeRelicMenu");
const relicList =
    document.getElementById("relic-list");

//End
const finalScreen =
    document.getElementById("final-screen");
const returnMenuButton =
    document.getElementById("returnMenuButton");

closeRelicMenu.addEventListener("click", () => {

    closeRelicSelection();

    paused = false;

    controls.lock();

});


// =====================================
// GAME VARIABLES
// =====================================

//Interface
let paused = false;
let openingInterface = false;
let currentInventoryTab = "equipment";

//Interaction
let urnToInspect = null;
let documentOpenedFromInventory = false;

//Messages
let promptTimeout = null;
let objectiveTimeout = null;
let temporaryMessageVisible = false;

//Camera Effects
let shakeTime = 0;
let shakeDuration = 4;

//Ending
let finalSequenceStarted = false;
let finalSequenceProgress = 0;
let finalScreenStarted = false;

const finalCameraStart = new THREE.Vector3();
const finalCameraTarget = new THREE.Vector3(
    0,
    45,
    40
);

// =====================================
// CONSTANTS
// =====================================

const gatePosition =
    new THREE.Vector3(0, 1.7, 4);

const shakeOffset = new THREE.Vector3();

const sacredExitPosition =
    new THREE.Vector3(
        0,
        -4.8,
        -70.65
    );
// =====================================
//EQUIPMENT SELECTION
// =====================================
function updateEquipmentSelection() {

    const selected = document.querySelectorAll(
        ".tool-checkbox:checked"
    );

    selectedToolsCount.textContent =
        `${selected.length} / 3`;

}

// =====================================
//Messages
// =====================================
function showInteraction(text) {

    interactionPrompt.style.display = "block";
    interactionPrompt.innerHTML = text;

}

function hideInteraction() {

    interactionPrompt.style.display = "none";

}

function showTemporaryMessage(text, duration = 2000) {

    temporaryMessageVisible = true;

    showInteraction(text);

    clearTimeout(promptTimeout);

    promptTimeout = setTimeout(() => {

        temporaryMessageVisible = false;

        hideInteraction();

    }, duration);

}

function showObjectiveMessage(text, duration = 4000) {

    clearTimeout(objectiveTimeout);
    objectiveMessage.style.visibility = "visible";
    objectiveMessage.innerHTML = text;
    objectiveMessage.style.opacity = "1";

    objectiveTimeout = setTimeout(() => {

        hideObjectiveMessage();

    }, duration);

}

function hideObjectiveMessage() {

    clearTimeout(objectiveTimeout);

    objectiveMessage.style.visibility = "hidden";
    objectiveMessage.innerHTML = "";
}
// =====================================
//DOCUMENTS
// =====================================
function openDocument(title, content) {

    paused = true;
    openingInterface = true;

    controls.unlock();
    //Update
    documentTitle.textContent = title;
    documentContent.innerHTML = content;

    inventoryScreen.style.display = "none";
    documentScreen.style.display = "flex";

}
// =====================================
//RESET
// =====================================
function resetGame() {

    hideObjectiveMessage();
    hideInteraction();

    //Game Logic
    resetGate();
    resetGameState();
    resetTomb1Puzzle();
    resetTomb2Puzzle();
    resetSacredChamber();
    resetSecretRelic();
    resetSacredPuzzle();

    // Equipment selection
    toolCheckboxes.forEach(box => {

        box.checked = false;

    });

    updateEquipmentSelection();

    //Player
    controls.object.position.set(
        0,
        1.7,
        10
    );
    controls.object.rotation.set(0,0,0);
    camera.rotation.set(0,0,0);

    //objects
    torchLight.visible = false;
    torch.visible = true;
    scroll.visible = true;
    paper.visible = true;
    pickaxe.visible = true;
    brush.visible = true;
    trowel.visible = true;
    knife.visible = true;
    rope.visible = true;
    pen.visible = true;
    stone.visible = true;
    fragment.visible = true;

    // Wall puzzle
    wallCleaned = false;
    brushProgress = 0;
    if (dustyWall) {
        dustyWall.visible = true;
        dustyWall.material.opacity = 1;
    }
    if (hiddenMessage)
        hiddenMessage.visible = false;

    //end
    equippedHUD.style.display = "block";
    finalSequenceStarted = false;
    finalSequenceProgress = 0;
    finalScreenStarted = false;
    finalScreen.style.display = "none";

}

function openRelicMenu() {

    populateRelicMenu();

    relicScreen.style.display = "flex";

}


function closeRelicSelection() {

    relicScreen.style.display = "none";

}

// =====================================
//EVENTS
// =====================================
function setupStartEvents() {

    startButton.addEventListener("click", () => {

        introScreen.style.opacity = "0";

        setTimeout(() => {

            introScreen.style.display = "none";

            controls.lock();

        }, 800);

    });

}

function setupPauseEvents() {

    controls.addEventListener("lock", () => {

        paused = false;

        pauseScreen.style.display = "none";

    });

    controls.addEventListener("unlock", () => {

        paused = true;

        hideInteraction();

        hideObjectiveMessage();

        if (openingInterface) {

            openingInterface = false;
            return;

        }

        if (finalSequenceStarted)
            return;

        pauseScreen.style.display = "flex";

    });

    resumeButton.addEventListener("click", () => {

        controls.lock();

    });

    menuButton.addEventListener("click", () => {

        pauseScreen.style.display = "none";

        confirmScreen.style.display = "flex";

    });

    confirmNo.addEventListener("click", () => {

        confirmScreen.style.display = "none";

        pauseScreen.style.display = "flex";

    });

    confirmYes.addEventListener("click", () => {

        confirmScreen.style.display = "none";

        pauseScreen.style.display = "none";

        resetGame();
        updateEquippedHUD();

        introScreen.style.display = "flex";
        introScreen.style.opacity = "1";

    });

    returnMenuButton.addEventListener("click", () => {

        finalScreen.style.display = "none";

        resetGame();

        updateEquippedHUD();

        introScreen.style.display = "flex";
        introScreen.style.opacity = "1";

    });

}


function setupInventoryEvents() {

    collectEquipmentButton.addEventListener("click", () => {

        collectEquipment();
        updateEquippedHUD();
        if (!gameState.hasTorch) {

            gameState.torchEquipped = false;
            gameState.torchOn = false;
            torchLight.visible = false;

        }

        torch.visible = !gameState.hasTorch;

        scroll.visible = !gameState.hasMap;

        paper.visible =
            !gameState.documents.includes(
                "informationSheet"
            );

        pickaxe.visible = !gameState.hasPickaxe;

        brush.visible = !gameState.hasBrush;

        trowel.visible = !gameState.hasTrowel;

        knife.visible = !gameState.hasKnife;

        rope.visible = !gameState.hasRope;

        pen.visible = !gameState.hasPen;

        stone.visible = !gameState.hasStone;

        fragment.visible = !gameState.hasFragment;

        equipmentScreen.style.display = "none";

        paused = false;

        openingInterface = false;

        showObjectiveMessage(
            "Equipment collected.<br>Press <strong>F</strong> to open your Inventory."
        );

        controls.lock();

    });

    closeInventory.addEventListener("click", () => {

        inventoryScreen.style.display = "none";

        currentInventoryTab = "equipment";

        if (

            gameState.torchEquipped &&
            !gameState.torchTutorialCompleted

        ) {

            showObjectiveMessage(
                'Press <strong>T</strong> to turn lantern On/Off.'
            );
            gameState.torchTutorialCompleted = true;

        }

        paused = false;

        controls.lock();

    });

    equipmentTab.addEventListener("click", () => {

        currentInventoryTab = "equipment";
        updateInventory();

    });

    mapTab.addEventListener("click", () => {

        currentInventoryTab = "map";
        updateInventory();

    });

    documentsTab.addEventListener("click", () => {

        currentInventoryTab = "documents";
        updateInventory();

    });

}

function setupDocumentEvents() {

    closeDocument.addEventListener("click", () => {

        documentScreen.style.display = "none";

        if (documentOpenedFromInventory) {

            inventoryScreen.style.display = "flex";

        } else {

            paused = false;
            openingInterface = false;

            controls.lock();

        }

    });

}

// =====================================
//KEYBOARD
// =====================================
function setupKeyboardEvents() {

    document.addEventListener("keydown", (event) => {

        switch (event.code) {

            case "KeyE":
                handleKeyE();
                break;

            case "KeyF":
                handleKeyF();
                break;

            case "KeyT":
                handleKeyT();
                break;

        }
    });

}

function handleKeyF() {

    paused = true;

    openingInterface = true;

    hideInteraction();

    hideObjectiveMessage();

    controls.unlock();

    updateInventory();

    inventoryScreen.style.display = "flex";

}

function handleKeyT() {

    if (!gameState.hasTorch)
        return;

    if (!gameState.torchEquipped)
        return;

    gameState.torchOn = !gameState.torchOn;

    torchLight.visible = gameState.torchOn;

    //gameState.torchTutorialCompleted = true;

    hideObjectiveMessage();

}

function handleKeyE() {

    if (tryGate())
        return;

    if (tryTable())
        return;

    if (tryEnterTomb1())
        return;

    if (tryExitTomb1())
        return;

    if (tryInspectUrn())
        return;

    if (tryEnterTomb2())
        return;

    if (tryExitTomb2())
        return;

    if (

        rockWallDistance < 2.5 &&
        !rocksBroken && gameState.hasPickaxe &&
        gameState.pickaxeEquipped

    ) {

        hitRockWall();

        return;

    }

    if (tryCollectRelic())
        return;

    if (tryEnterTomb3())
        return;

    if (tryExitTomb3())
        return;

    if (tryCollectRelic3())
        return;

    if (

        !wallCleaned &&
        dustyWallDistance < 2 && gameState.hasBrush &&
        gameState.brushEquipped

    ) {

        brushProgress++;

        if (brushProgress === 1) {

            dustyWall.material.opacity = 0.65;

        }

        else if (brushProgress === 2) {

            dustyWall.material.opacity = 0.30;

        }

        else {

            dustyWall.visible = false;

            hiddenMessage.visible = true;

            wallCleaned = true;

        }

        return;

    }

    if (

        wallCleaned &&
        paintingDistance < 1.5

    ) {

        if (!wallAlreadyInspected) {

            revealSecretRelic();

        }
        else {

            showTemporaryMessage(
                "There is nothing else hidden here."
            );

        }

        return;

    }

    if (tryEnterSacred())
        return;

    if (tryExitSacred())
        return;

    if (tryPlaceRelic())
        return;

    if (tryInspectSarcophagus())
        return;

    if (tryEnterTomb4())
        return;

    if (tryExitTomb4())
        return;

    if (tryEnterTomb5())
        return;

    if (tryExitTomb5())
        return;

    if (tryEnterTomb6())
        return;

    if (tryExitTomb6())
        return;

    if (tryReadInformationPanel(informationPanel1Distance, "tomb1Information"))
        return;

    if (tryReadInformationPanel(informationPanel2Distance, "tomb2Information"))
        return;

    if (tryReadInformationPanel(informationPanel3Distance, "tomb3Information"))
        return;

    if (tryReadInformationPanel(informationPanel4Distance, "tomb4Information"))
        return;

    if (tryReadInformationPanel(informationPanel5Distance, "tomb5Information"))
        return;

    if (tryReadInformationPanel(informationPanel6Distance, "tomb6Information"))
        return;
}

function tryCollectRelic() {

    if (
        !bucchero ||
        !bucchero.visible ||
        buccheroDistance >= 2
    )
        return false;

    bucchero.visible = false;

    gameState.relics++;

    gameState.hasSacredRelic2 = true;

    showObjectiveMessage(
        "You recovered the Sacred Kantharos."
    );

    return true;

}

function tryCollectRelic3() {

    if (
        !secretRelic ||
        !secretRelic.visible ||
        paintingDistance >= 2
    )
        return false;

    secretRelic.visible = false;

    gameState.relics++;

    gameState.hasSacredRelic3 = true;

    showObjectiveMessage(
        "You recovered the Bronze Votive Figurine."
    );

    return true;

}

// =====================================
//DISTANCES
// =====================================
let gateDistance;
let tableDistance;

let tombDistance1;
let tomb1ExitDistance;

let tombDistance2;
let tomb2ExitDistance;

let rockWallDistance;
let buccheroDistance;

let tombDistance3;
let tomb3ExitDistance;

let dustyWallDistance;
let wallCleaned = false;
let brushProgress = 0;

let paintingDistance;

let sacredDoorDistance;
let sacredExitDistance;

let augursPedestalDistance;
let leopardsPedestalDistance;
let huntingPedestalDistance;
let finalSarcophagusDistance;

let tombDistance4;
let tomb4ExitDistance;

let tombDistance5;
let tomb5ExitDistance;

let tombDistance6;
let tomb6ExitDistance;

let informationPanel1Distance;
let informationPanel2Distance;
let informationPanel3Distance;
let informationPanel4Distance;
let informationPanel5Distance;
let informationPanel6Distance;

function updateDistances() {

    gateDistance =
        controls.object.position.distanceTo(gatePosition);

    tableDistance =
        controls.object.position.distanceTo(table.position);

    tombDistance1 =
        controls.object.position.distanceTo(
            tombDoor1.position
        );

    if (internalDoor1) {

        internalDoor1.getWorldPosition(worldPosition);

        tomb1ExitDistance =
            controls.object.position.distanceTo(
                worldPosition
            );

    }

    tombDoor2.getWorldPosition(worldPosition);

    tombDistance2 =
        controls.object.position.distanceTo(
            worldPosition
        );

    if (internalDoor2) {

        internalDoor2.getWorldPosition(worldPosition);

        tomb2ExitDistance =
            controls.object.position.distanceTo(
                worldPosition
            );

    }

    if (rockWall) {

    rockWallDistance =
        controls.object.position.distanceTo(
            rockWall.position
        );

    }

    if (bucchero) {

        bucchero.getWorldPosition(worldPosition);

        buccheroDistance =
            controls.object.position.distanceTo(
                worldPosition
            );

    }

    tombDoor3.getWorldPosition(worldPosition);

    tombDistance3 =
        controls.object.position.distanceTo(
            worldPosition
        );

    if (internalDoor3) {

        internalDoor3.getWorldPosition(worldPosition);

        tomb3ExitDistance =
            controls.object.position.distanceTo(
                worldPosition
            );

    }

    if (dustyWall) {

        dustyWall.getWorldPosition(worldPosition);

        dustyWallDistance =
            controls.object.position.distanceTo(
                worldPosition
            );

    }

    paintingInspectPoint.getWorldPosition(worldPosition);

    paintingDistance =
        controls.object.position.distanceTo(
            worldPosition
        );
    
    if (sacredDoor) {

        sacredDoor.getWorldPosition(worldPosition);

        sacredDoorDistance =
            controls.object.position.distanceTo(
                worldPosition
            );

    }

    sacredExitDistance =
        controls.object.position.distanceTo(
            sacredExitPosition
        );


    augursPedestal.getWorldPosition(worldPosition);

    augursPedestalDistance =
        controls.object.position.distanceTo(
            worldPosition
        );

    leopardsPedestal.getWorldPosition(worldPosition);

    leopardsPedestalDistance =
        controls.object.position.distanceTo(
            worldPosition
        );

    huntingPedestal.getWorldPosition(worldPosition);

    huntingPedestalDistance =
        controls.object.position.distanceTo(
            worldPosition
        );
    
    if (finalSarcophagus) {

        finalSarcophagus.getWorldPosition(worldPosition);

        finalSarcophagusDistance =
            controls.object.position.distanceTo(worldPosition);

    }

    tombDoor4.getWorldPosition(worldPosition);

    tombDistance4 =
        controls.object.position.distanceTo(
            worldPosition
        );

    if (internalDoor4) {

        internalDoor4.getWorldPosition(worldPosition);

        tomb4ExitDistance =
            controls.object.position.distanceTo(
                worldPosition
            );

    }

    tombDoor5.getWorldPosition(worldPosition);

    tombDistance5 =
        controls.object.position.distanceTo(
            worldPosition
        );

    if (internalDoor5) {

        internalDoor5.getWorldPosition(worldPosition);

        tomb5ExitDistance =
            controls.object.position.distanceTo(
                worldPosition
            );

    }

    tombDoor6.getWorldPosition(worldPosition);

    tombDistance6 =
        controls.object.position.distanceTo(
            worldPosition
        );

    if (internalDoor6) {

        internalDoor6.getWorldPosition(worldPosition);

        tomb6ExitDistance =
            controls.object.position.distanceTo(
                worldPosition
            );

    }

    if (informationPanel1) {

        informationPanel1.getWorldPosition(worldPosition);

        informationPanel1Distance =
            controls.object.position.distanceTo(worldPosition);

    }

    if (informationPanel2) {

        informationPanel2.getWorldPosition(worldPosition);

        informationPanel2Distance =
            controls.object.position.distanceTo(worldPosition);

    }

    if (informationPanel3) {

        informationPanel3.getWorldPosition(worldPosition);

        informationPanel3Distance =
            controls.object.position.distanceTo(worldPosition);

    }

    if (informationPanel4) {

        informationPanel4.getWorldPosition(worldPosition);

        informationPanel4Distance =
            controls.object.position.distanceTo(worldPosition);

    }

    if (informationPanel5) {

        informationPanel5.getWorldPosition(worldPosition);

        informationPanel5Distance =
            controls.object.position.distanceTo(worldPosition);

    }

    if (informationPanel6) {

        informationPanel6.getWorldPosition(worldPosition);

        informationPanel6Distance =
            controls.object.position.distanceTo(worldPosition);

    }

}

function updateRaycast() {

    urnToInspect = null;

    camera.getWorldDirection(cameraDirection);

    raycaster.set(
        camera.position,
        cameraDirection
    );

    const urnMeshes =
        urns.map(urn => urn.mesh);

    const intersections =
        raycaster.intersectObjects(
            urnMeshes,
            true
        );

    if (intersections.length === 0)
        return;

    const objectHit =
        intersections[0].object;

    for (const urn of urns) {

        if (urn.mesh === objectHit || urn.mesh.getObjectById(objectHit.id)) {

            const distance =
                camera.position.distanceTo(
                    intersections[0].point
                );

            if (distance < 2) {

                urnToInspect = urn;

            }

            return;

        }

    }

}

// =====================================
//INTERACTION
// =====================================
function updateInteractionPrompt() {

    // Se il gioco è in pausa non mostra nulla
    if (paused) {

        hideInteraction();
        return;

    }

    // Se è visibile un messaggio temporaneo non mostra i prompt
    if (temporaryMessageVisible)
        return;

    hideInteraction();

    // ==========================
    // GATE
    // ==========================

    if (gateDistance < 2) {

        showInteraction(

            gateOpen
                ? "[E] Close Gate"
                : "[E] Open Gate"

        );

        return;

    }

    // ==========================
    // TABLE
    // ==========================

    if (

        tableDistance < 3

    ) {

        showInteraction(
            "[E] Inspect Table"
        );

        return;

    }

    // ==========================
    // TOMB 1
    // ==========================

    if (tombDistance1 < 2) {

        showInteraction(
            "[E] Enter Tomb"
        );

        return;

    }

    if (tomb1ExitDistance < 2) {

        showInteraction(
            "[E] Exit Tomb"
        );

        return;

    }

    // ==========================
    // URNS
    // ==========================

    if (urnToInspect) {

        showInteraction(
            "[E] Inspect"
        );

        return;

    }

    // ==========================
    // TOMB 2
    // ==========================

    if (tombDistance2 < 2) {

        showInteraction(
            "[E] Enter Tomb"
        );

        return;

    }

    if (tomb2ExitDistance < 2) {

        showInteraction(
            "[E] Exit Tomb"
        );

    }

    // Muro di rocce
    if (
        rockWallDistance < 2.5 &&
        !rocksBroken
    ) {

        if (gameState.hasPickaxe && gameState.pickaxeEquipped) {

            showInteraction(
                "[E] Break Rock Wall"
            );

        }

        else {

            hideInteraction();

            showObjectiveMessage(
                "You need something to break through these rocks."
            );

            }

        return;

    }

    if (
        bucchero &&
        bucchero.visible &&
        buccheroDistance < 2
    ) {

        showInteraction(
            "[E] Pick up Sacred Relic"
        );

        return;

    }

    // ==========================
    // TOMB 3
    // ==========================

    if (tombDistance3 < 2) {

        showInteraction(
            "[E] Enter Tomb"
        );

        return;

    }

    if (tomb3ExitDistance < 2) {

        showInteraction(
            "[E] Exit Tomb"
        );

    }

    // ==========================
    // DUSTY WALL
    // ==========================

    if (

        !wallCleaned &&
        dustyWallDistance < 2

    ) {

        if (gameState.hasBrush && gameState.brushEquipped) {

            showInteraction(
                "[E] Brush Wall"
            );

        }
        else {

            showInteraction(
                "You need a brush to remove the dust."
            );

        }

        return;

    }

    if (

        wallCleaned &&
        !secretRelic.visible &&
        paintingDistance < 1.5

    ) {

        showInteraction(
            "[E] Inspect Wall"
        );

        return;

    }

    if (

        secretRelic &&
        secretRelic.visible &&
        paintingDistance < 1.5

    ) {

        showInteraction(
            "[E] Pick up Sacred Relic"
        );

        return;

    }

    const sacredWallDistance =
        controls.object.position.distanceTo(
            sacredWall.position
        );

    if (

        sacredWall.visible &&
        sacredWallDistance < 3

    ) {

        showInteraction(

            "An ancient force seals this chamber.<br>" +
            "Only the Three Sacred Relics can break the seal."

        );

        return;

    }

    if (

        sacredDoorDistance < 2

    ) {

        showInteraction(
            "[E] Enter Tomb"
        );

        return;

    }

    if (

        sacredExitDistance < 2

    ) {

        showInteraction(
            "[E] Exit Tomb"
        );

        return;

    }

    if (augursPedestalDistance < 1.6) {

        selectPedestal(
            PEDESTAL.AUGURS
        );

        if (isPedestalEmpty(PEDESTAL.AUGURS)) {

            showInteraction(
                "[E] Place Relic"
            );

        }
        else {

            showInteraction(
                "A relic has already been placed."
            );

        }

        return;

    }

        if (leopardsPedestalDistance < 1.6) {

        selectPedestal(
            PEDESTAL.LEOPARDS
        );

        if (isPedestalEmpty(PEDESTAL.LEOPARDS)) {

            showInteraction(
                "[E] Place Relic"
            );

        }
        else {

            showInteraction(
                "A relic has already been placed."
            );

        }

        return;

    }

    if (huntingPedestalDistance < 1.6) {

        selectPedestal(
            PEDESTAL.HUNTING
        );

        if (isPedestalEmpty(PEDESTAL.HUNTING)) {

            showInteraction(
                "[E] Place Relic"
            );

        }
        else {

            showInteraction(
                "A relic has already been placed."
            );

        }

        return;

    }

    selectPedestal(null);

    if (
        finalSarcophagus &&
        finalSarcophagusDistance < 2.5
    ) {

        showInteraction(
            "[E] Inspect Sarcophagus"
        );

        return;

    }

    // ==========================
    // TOMB 4
    // ==========================

    if (tombDistance4 < 2) {

        showInteraction(
            "[E] Enter Tomb"
        );

        return;

    }

    if (tomb4ExitDistance < 2) {

        showInteraction(
            "[E] Exit Tomb"
        );

        return;

    }

    // ==========================
    // TOMB 5
    // ==========================

    if (tombDistance5 < 2) {

        showInteraction(
            "[E] Enter Tomb"
        );

        return;

    }

    if (tomb5ExitDistance < 2) {

        showInteraction(
            "[E] Exit Tomb"
        );

        return;

    }

    // ==========================
    // TOMB 6
    // ==========================

    if (tombDistance6 < 2) {

        showInteraction(
            "[E] Enter Tomb"
        );

        return;

    }

    if (tomb6ExitDistance < 2) {

        showInteraction(
            "[E] Exit Tomb"
        );

        return;

    }

    //InformationPanel

    if (informationPanel1Distance < 1.2) {

        showInteraction(
            "[E] Read Information Panel"
        );

        return;

    }

    if (informationPanel2Distance < 1.2) {

        showInteraction(
            "[E] Read Information Panel"
        );

        return;

    }

    if (informationPanel3Distance < 1.2) {

        showInteraction(
            "[E] Read Information Panel"
        );

        return;

    }

    if (informationPanel4Distance < 1.2) {

        showInteraction(
            "[E] Read Information Panel"
        );

        return;

    }

    if (informationPanel5Distance < 1.2) {

        showInteraction(
            "[E] Read Information Panel"
        );

        return;

    }

    if (informationPanel6Distance < 1.2) {

        showInteraction(
            "[E] Read Information Panel"
        );

        return;

    }


}


//Interactions
function tryGate() {

    if (gateDistance >= 2)
        return false;

    toggleGate();

    return true;

}

function tryTable() {

    if (

        tableDistance >= 3 

    )
        return false;

    paused = true;

    openingInterface = true;

    controls.unlock();

    equipmentScreen.style.display = "flex";

    return true;

}

function tryEnterTomb1() {

    if (tombDistance1 >= 2)
        return false;

    controls.object.position.set(
        25,
        -2.8,
        -20.9
    );

    return true;

}

function tryExitTomb1() {

    if (tomb1ExitDistance >= 2)
        return false;

    controls.object.position.set(
        25,
        1.7,
        -15
    );

    return true;

}

function tryInspectUrn() {

    if (!urnToInspect)
        return false;

    const message =
        inspectUrn(urnToInspect);

    showTemporaryMessage(message);

    return true;

}


function tryEnterTomb2() {

    if (tombDistance2 >= 2)
        return false;

    tombDoor2.getWorldPosition(worldPosition);

    controls.object.position.set(
        worldPosition.x-4,
        -2.8,
        worldPosition.z,
    );

    return true;

}

function tryExitTomb2() {

    if (tomb2ExitDistance >= 2)
        return false;

    internalDoor2.getWorldPosition(worldPosition);

    controls.object.position.set(
        worldPosition.x+4,
        1.7,
        worldPosition.z,  
    );

    return true;

}

function tryEnterTomb3() {

    if (tombDistance3 >= 2)
        return false;

    tombDoor3.getWorldPosition(worldPosition);

    controls.object.position.set(
        worldPosition.x-4,
        -2.8,
        worldPosition.z,
    );

    return true;

}

function tryExitTomb3() {

    if (tomb3ExitDistance >= 2)
        return false;

    internalDoor3.getWorldPosition(worldPosition);

    controls.object.position.set(
        worldPosition.x+4,
        1.7,
        worldPosition.z,  
    );

    return true;

}

function tryEnterSacred() {

    if (sacredDoorDistance >= 2)
        return false;

    controls.object.position.set(
        0,
        -4.8,
        -70.65
    );

    return true;

}

function tryExitSacred() {

    if (sacredExitDistance >= 2)
        return false;

    controls.object.position.set(

        0,
        1.7,
        -70

    );

    return true;

}

export function startCameraShake() {

    shakeTime = shakeDuration;

}

function tryPlaceRelic() {

    const pedestal = getSelectedPedestal();

    if (!pedestal)
        return false;

    if (!isPedestalEmpty(pedestal))
        return false;

    openRelicMenu();

    paused = true;
    openingInterface = true;

    controls.unlock();

    return true;

}

function tryEnterTomb4() {

    if (tombDistance4 >= 2)
        return false;

    tombDoor4.getWorldPosition(worldPosition);

    controls.object.position.set(
        worldPosition.x+4,
        -2.8,
        worldPosition.z,
    );

    return true;

}

function tryExitTomb4() {

    if (tomb4ExitDistance >= 2)
        return false;

    internalDoor4.getWorldPosition(worldPosition);

    controls.object.position.set(
        worldPosition.x-4,
        1.7,
        worldPosition.z,  
    );

    return true;

}

function tryEnterTomb5() {

    if (tombDistance5 >= 2)
        return false;

    tombDoor5.getWorldPosition(worldPosition);

    controls.object.position.set(
        worldPosition.x,
        -2.8,
        worldPosition.z-4,
    );

    return true;

}

function tryExitTomb5() {

    if (tomb5ExitDistance >= 2)
        return false;

    internalDoor5.getWorldPosition(worldPosition);

    controls.object.position.set(
        worldPosition.x,
        1.7,
        worldPosition.z+4,  
    );

    return true;

}


function tryEnterTomb6() {

    if (tombDistance6 >= 2)
        return false;

    tombDoor6.getWorldPosition(worldPosition);

    controls.object.position.set(
        worldPosition.x+4,
        -2.8,
        worldPosition.z,
    );

    return true;

}

function tryExitTomb6() {

    if (tomb6ExitDistance >= 2)
        return false;

    internalDoor6.getWorldPosition(worldPosition);

    controls.object.position.set(
        worldPosition.x-4,
        1.7,
        worldPosition.z,  
    );

    return true;

}

function tryReadInformationPanel(distance, documentKey) {

    if (distance >= 1.2)
        return false;

    const doc = documentLibrary[documentKey];

    documentOpenedFromInventory = false;

    openDocument(
        doc.title,
        doc.content
    );

    return true;

}

function tryInspectSarcophagus() {

    if (finalSarcophagusDistance >= 2.5)
        return false;

    startFinalSequence();

    return true;
}

function startFinalSequence() {

    if (finalSequenceStarted)
        return;

    finalSequenceStarted = true;

    paused = true;
    openingInterface = true;
    hideInteraction();
    hideObjectiveMessage();
    equippedHUD.style.display = "none";
    controls.unlock();
    finalCameraStart.copy(
        controls.object.position
    );

}

function updateLighting() {

    if (finalSequenceStarted) {

        finalSequenceProgress += 0.004;

        finalSequenceProgress =
            Math.min(finalSequenceProgress,1);

        ambientLight.intensity =
            THREE.MathUtils.lerp(
                0,
                0.8,
                finalSequenceProgress
            );

        sun.intensity =
            THREE.MathUtils.lerp(
                0,
                1.4,
                finalSequenceProgress
            );

        return;

    }

    if (controls.object.position.y < 0) {

        ambientLight.intensity = 0;
        sun.intensity = 0;

    }
    else {

        ambientLight.intensity = 0.6;
        sun.intensity = 1;

    }

}

// =====================================
// INVENTORY
// =====================================

function updateInventory() {

    inventoryContent.innerHTML = "";

    equipmentTab.classList.remove("active");
    mapTab.classList.remove("active");
    documentsTab.classList.remove("active");

    switch (currentInventoryTab) {

        case "equipment":
            populateEquipment();
            break;

        case "map":
            populateMap();
            break;

        case "documents":
            populateDocuments();
            break;

    }

}

function equipItem(item) {

    //gameState.torchEquipped = false;
    gameState.pickaxeEquipped = false;
    gameState.brushEquipped = false;
    gameState.trowelEquipped = false;
    gameState.knifeEquipped = false;
    gameState.ropeEquipped = false;
    gameState.penEquipped = false;
    gameState.stoneEquipped = false;
    gameState.fragmentEquipped = false;

    switch (item) {

        case "Pickaxe":
            gameState.pickaxeEquipped = true;
            break;

        case "Archaeological Brush":
            gameState.brushEquipped = true;
            break;

        case "Small Trowel":
            gameState.trowelEquipped = true;
            break;

        case "Multi-tool Knife":
            gameState.knifeEquipped = true;
            break;

        case "Rope":
            gameState.ropeEquipped = true;
            break;

        case "Pen":
            gameState.penEquipped = true;
            break;

        case "Stone":
            gameState.stoneEquipped = true;
            break;

        case "Pottery Fragment":
            gameState.fragmentEquipped = true;
            break;

    }

}

function populateEquipment() {

    equipmentTab.classList.add("active");

    const equipment = [];

    if (gameState.hasTorch) {

        equipment.push({
            icon: "🏮",
            name: "Lantern"
        });

    }

    if (gameState.hasPickaxe) {

        equipment.push({
            icon: "⛏",
            name: "Pickaxe"
        });

    }

    if (gameState.hasBrush) {

        equipment.push({
            icon: "🖌",
            name: "Archaeological Brush"
        });

    }

    if (gameState.hasTrowel) {

        equipment.push({
            icon: "🪏",
            name: "Small Trowel"
        });

    }

    if (gameState.hasKnife) {

        equipment.push({
            icon: "🔪",
            name: "Multi-tool Knife"
        });

    }

    if (gameState.hasRope) {

        equipment.push({
            icon: "🪢",
            name: "Rope"
        });

    }

    if (gameState.hasPen) {

        equipment.push({
            icon: "🖊",
            name: "Pen"
        });

    }

    if (gameState.hasStone) {

        equipment.push({
            icon: "🪨",
            name: "Stone"
        });

    }

    if (gameState.hasFragment) {

        equipment.push({
            icon: "🏺",
            name: "Pottery Fragment"
        });

    }

    let equipmentHTML = "";

    if (equipment.length === 0) {

        equipmentHTML = `
            <div class="inventory-message">
                No equipment collected.
            </div>
        `;

    }
    else {

        equipment.forEach(item => {

            let equipped = "";

            switch (item.name) {

                case "Lantern":
                    if (gameState.torchEquipped)
                        equipped = '<span class="equipped">✓ Equipped</span>';
                    break;

                case "Pickaxe":
                    if (gameState.pickaxeEquipped)
                        equipped = '<span class="equipped">✓ Equipped</span>';
                    break;

                case "Archaeological Brush":
                    if (gameState.brushEquipped)
                        equipped = '<span class="equipped">✓ Equipped</span>';
                    break;

                case "Small Trowel":
                    if (gameState.trowelEquipped)
                        equipped = '<span class="equipped">✓ Equipped</span>';
                    break;

                case "Multi-tool Knife":
                    if (gameState.knifeEquipped)
                        equipped = '<span class="equipped">✓ Equipped</span>';
                    break;

                case "Rope":
                    if (gameState.ropeEquipped)
                        equipped = '<span class="equipped">✓ Equipped</span>';
                    break;

                case "Pen":
                    if (gameState.penEquipped)
                        equipped = '<span class="equipped">✓ Equipped</span>';
                    break;

                case "Stone":
                    if (gameState.stoneEquipped)
                        equipped = '<span class="equipped">✓ Equipped</span>';
                    break;

                case "Pottery Fragment":
                    if (gameState.fragmentEquipped)
                        equipped = '<span class="equipped">✓ Equipped</span>';
                    break;

            }

            equipmentHTML += `

                <div
                    class="inventory-entry equipment-entry"
                    data-equipment="${item.name}"
                >

                    <span>

                        ${item.icon} ${item.name}

                    </span>

                    ${equipped}

                </div>

            `;

        });

    }

    if (gameState.hasSacredRelic1) {

        equipmentHTML += `

            <div class="inventory-entry relic-entry">

                📿 Golden Necklace

            </div>

        `;

    }

    if (gameState.hasSacredRelic2) {

        equipmentHTML += `

            <div class="inventory-entry relic-entry">

                🏺 Sacred kantharos

            </div>

        `;

    }

    if (gameState.hasSacredRelic3) {

        equipmentHTML += `

            <div class="inventory-entry relic-entry">

                🗿 Bronze Votive Figurine

            </div>

        `;

    }

    inventoryContent.innerHTML = `

        <div class="equipment-content">

            ${equipmentHTML}

            <div class="relic-counter">

                🏺 Sacred Relics

                <strong>${gameState.relics} / 3</strong>

            </div>

        </div>

    `;

    inventoryContent
        .querySelectorAll(".equipment-entry")
        .forEach(entry => {

            entry.addEventListener("click", () => {

               const equipment =
                    entry.dataset.equipment;
                
                if (equipment === "Lantern") {

                    gameState.torchEquipped =
                        !gameState.torchEquipped;

                    if (!gameState.torchEquipped) {

                        gameState.torchOn = false;
                        torchLight.visible = false;

                    }

                    updateInventory();
                    updateEquippedHUD();

                    return;

                }

                let alreadyEquipped = false;

                switch (equipment) {

                    //case "Lantern":
                      //  alreadyEquipped = gameState.torchEquipped;
                        //break;

                    case "Pickaxe":
                        alreadyEquipped = gameState.pickaxeEquipped;
                        break;

                    case "Archaeological Brush":
                        alreadyEquipped = gameState.brushEquipped;
                        break;

                    case "Small Trowel":
                        alreadyEquipped = gameState.trowelEquipped;
                        break;

                    case "Multi-tool Knife":
                        alreadyEquipped = gameState.knifeEquipped;
                        break;

                    case "Rope":
                        alreadyEquipped = gameState.ropeEquipped;
                        break;

                    case "Pen":
                        alreadyEquipped = gameState.penEquipped;
                        break;

                    case "Stone":
                        alreadyEquipped = gameState.stoneEquipped;
                        break;

                    case "Pottery Fragment":
                        alreadyEquipped = gameState.fragmentEquipped;
                        break;

                }

                if (alreadyEquipped) {

                    //gameState.torchEquipped = false;
                    gameState.pickaxeEquipped = false;
                    gameState.brushEquipped = false;
                    gameState.trowelEquipped = false;
                    gameState.knifeEquipped = false;
                    gameState.ropeEquipped = false;
                    gameState.penEquipped = false;
                    gameState.stoneEquipped = false;
                    gameState.fragmentEquipped = false;

                    gameState.torchOn = false;
                    torchLight.visible = false;

                }
                else {

                    equipItem(equipment);
                    updateEquippedHUD();

                }

                updateInventory();

            });

        });

}


function populateDocuments() {

    documentsTab.classList.add("active");

    const collectedDocuments = [];

    gameState.documents.forEach(documentKey => {

        const document = documentLibrary[documentKey];

        collectedDocuments.push({

            icon: "📄",
            key: documentKey,
            title: document.title

        });

    });

    let documentsHTML = "";

    if (collectedDocuments.length === 0) {

        documentsHTML = `

            <div class="inventory-message">

                No documents found.

            </div>

        `;

    }

    else {

        collectedDocuments.forEach(item => {

            documentsHTML += `

                <div
                    class="inventory-entry document-entry"
                    data-document="${item.key}"
                >

                    ${item.icon} ${item.title}

                </div>

            `;

        });

    }

    inventoryContent.innerHTML = documentsHTML;

    inventoryContent
        .querySelectorAll(".document-entry")
        .forEach(entry => {

            entry.addEventListener("click", () => {

                const documentKey =
                    entry.dataset.document;

                const document =
                    documentLibrary[documentKey];
                documentOpenedFromInventory = true;

                openDocument(

                    document.title,

                    document.content

                );

            });

        });

}

function populateMap() {

    mapTab.classList.add("active");

    if (gameState.hasMap) {

        inventoryContent.innerHTML = `

            <div class="map-container">

                <img
                    src="../src/assets/textures/map/map.png"
                    alt="Necropolis Map">

            </div>

        `;

    }

    else {

        inventoryContent.innerHTML = `

            <div class="inventory-message">

                Map not collected.

            </div>

        `;

    }

}


function updateEquippedHUD() {

    const item =
        document.getElementById("equipped-item");

    const equipped = [];

    if (gameState.hasTorch && gameState.torchEquipped)
        equipped.push("🏮 Lantern");

    if (gameState.hasPickaxe && gameState.pickaxeEquipped)
        equipped.push("⛏ Pickaxe");

    if (gameState.hasBrush && gameState.brushEquipped)
        equipped.push("🖌 Archaeological Brush");

    if (gameState.hasTrowel && gameState.trowelEquipped)
        equipped.push("🪏 Small Trowel");

    if (gameState.hasKnife && gameState.knifeEquipped)
        equipped.push("🔪 Multi-tool Knife");

    if (gameState.hasRope && gameState.ropeEquipped)
        equipped.push("🪢 Rope");

    if (gameState.hasPen && gameState.penEquipped)
        equipped.push("🖊 Pen");

    if (gameState.hasStone && gameState.stoneEquipped)
        equipped.push("🪨 Stone");

    if (gameState.hasFragment && gameState.fragmentEquipped)
        equipped.push("🏺 Pottery Fragment");

    item.innerHTML =
        equipped.length
            ? equipped.join("<br>")
            : "None";

}

function populateRelicMenu() {

    let html = "";

    if (gameState.hasSacredRelic1) {

        html += createRelicEntry(
            "📿",
            "Golden Necklace",
            1
        );

    }

    if (gameState.hasSacredRelic2) {

        html += createRelicEntry(
            "🏺",
            "Sacred Kantharos",
            2
        );

    }

    if (gameState.hasSacredRelic3) {

        html += createRelicEntry(
            "🗿",
            "Bronze Votive Figurine",
            3
        );

    }

    if (html === "") {

        html = `

            <div class="inventory-message">

                No Sacred Relics available.

            </div>

        `;

    }

    relicList.innerHTML = html;

    relicList
        .querySelectorAll(".pedestal-relic-entry")
        .forEach(entry => {

            entry.addEventListener("click", () => {

                const relic = Number(entry.dataset.relic);

                if (!placeRelic(relic))
                    return;

                switch (relic) {

                    case 1:
                        gameState.hasSacredRelic1 = false;
                        break;

                    case 2:
                        gameState.hasSacredRelic2 = false;
                        break;

                    case 3:
                        gameState.hasSacredRelic3 = false;
                        break;

                }

                gameState.relics--;

                updateInventory();

                showObjectiveMessage("Relic placed.");

                closeRelicSelection();

                paused = false;

                controls.lock();

            });

        });

}

function createRelicEntry(icon, name, relic) {

    return `

        <div
            class="inventory-entry pedestal-relic-entry"
            data-relic="${relic}"
        >

            ${icon} ${name}

        </div>

    `;

}

// =====================================
//INITIALIZE
// =====================================

function initialize() {

    // Scene
    controls.object.position.set(
        0,
        1.7,
        10
    );

    createLights(scene);

    createWorld(scene);

    scene.add(controls.object);

    createEntrance(scene);

    createSign(scene);

    createGate(scene);

    createTable(scene);

    createTorch(camera, scene);

    CreatetombEntrance1(scene);
    createTomb1(scene);

    createTombEntrance2(scene);
    createTomb2(scene);

    //createPickaxe(scene);

    createTombEntrance3(scene);
    createTomb3(scene);

    createSacredEntrance(scene);
    createSacredRoom(scene);
    initializePedestals();

    // Events
    setupStartEvents();

    setupPauseEvents();

    setupInventoryEvents();

    setupDocumentEvents();

    setupKeyboardEvents();

    toolCheckboxes.forEach(box => {

        box.addEventListener("change", () => {

            const checked =
                document.querySelectorAll(
                    ".tool-checkbox:checked"
                );

            if (checked.length > 3) {

                box.checked = false;

                return;

            }

            updateEquipmentSelection();

        });

    });

    updateEquipmentSelection();
    createSacredChamber(scene);
    createEnvironment(scene);

    createTombEntrance4(scene);
    createTomb4(scene);
    createTombEntrance5(scene);
    createTomb5(scene);
    createTombEntrance6(scene);
    createTomb6(scene);

    

}

// =====================================
//ANIMATE
// =====================================
function animate() {

    requestAnimationFrame(animate);

    const delta = clock.getDelta();

    if (!paused) {

        updatePlayer(
            controls,
            delta
        );

    }

    updateGate();

    updateDistances();

    updateRaycast();

    updateInteractionPrompt();

    updateRockWall();

    //updateTutorial();

    // Tremore
    controls.object.position.sub(shakeOffset);
    shakeOffset.set(0, 0, 0);

    if (shakeTime > 0) {

        shakeTime -= delta;

        const intensity = 0.12 * (shakeTime / shakeDuration);

        shakeOffset.set(

            (Math.random() - 0.5) * intensity,
            (Math.random() - 0.5) * intensity * 0.8,
            (Math.random() - 0.5) * intensity

        );

        controls.object.position.add(shakeOffset);

    }

    updateSacredChamber();

    const chamberOpened = consumeChamberOpened();

    if (chamberOpened) {

        startCameraShake();

        showObjectiveMessage(
            "The ground trembles...<br>An ancient seal has been broken.",
            5000
        );

    }

    updateEnvironment();

    updateSacredPassage();

    if (finalSequenceStarted) {

        if (controls.object.position.y <= 0) {

            controls.object.position.lerp(
                finalCameraTarget,
                0.01
            );

        }
        else {

            controls.object.position.lerp(
                finalCameraTarget,
                0.03
            );

            if (
                controls.object.position.distanceTo(finalCameraTarget) < 1.3 &&
                !finalScreenStarted
            ) {
                finalScreenStarted = true;
                finalScreen.style.display = "flex";
            }

        }

        const lookTarget = finalSarcophagus.position.clone();

        lookTarget.y = -30;

        controls.object.lookAt(lookTarget);

        if (
            controls.object.position.distanceTo(finalCameraTarget) < 0.3 &&
            !finalScreenStarted
        ) {

            finalScreenStarted = true;

            finalScreen.style.display = "flex";

        }

    }

    updateLighting();
    renderer.render(
        scene,
        camera
    );

}

initialize();

animate();