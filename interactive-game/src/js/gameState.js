// Stato del gioco

export const gameState = {

    // Equipaggiamento
    equipmentCollected: false,

    hasTorch: false,
    hasPickaxe: false,
    hasBrush: false,
    hasTrowel: false,
    hasKnife: false,
    hasRope: false,
    hasPen: false,
    hasStone: false,
    hasFragment: false,

    hasMap: false,

    torchOn: false,
    torchHintVisible: false,
    torchTutorialCompleted: false,

    torchEquipped: false,
    pickaxeEquipped: false,
    brushEquipped: false,
    trowelEquipped: false,
    knifeEquipped: false,
    ropeEquipped: false,
    penEquipped: false,
    stoneEquipped: false,
    fragmentEquipped: false,

    // Progressione
    relics: 0,

    hasSacredRelic1: false,
    hasSacredRelic2: false,
    hasSacredRelic3: false,

    // Documenti
    documents: []

};

// Raccolta equipaggiamento
export function collectEquipment() {

    gameState.equipmentCollected = true;

    gameState.hasTorch =
        document.querySelector(
            'input[value="torch"]'
        ).checked;

    gameState.hasPickaxe =
        document.querySelector(
            'input[value="pickaxe"]'
        ).checked;

    gameState.hasBrush =
        document.querySelector(
            'input[value="brush"]'
        ).checked;

    gameState.hasTrowel =
        document.querySelector(
            'input[value="trowel"]'
        ).checked;

    gameState.hasKnife =
        document.querySelector(
            'input[value="knife"]'
        ).checked;

    gameState.hasRope =
        document.querySelector(
            'input[value="rope"]'
        ).checked;

    gameState.hasPen =
        document.querySelector(
            'input[value="pen"]'
        ).checked;

    gameState.hasStone =
        document.querySelector(
            'input[value="stone"]'
        ).checked;

    gameState.hasFragment =
        document.querySelector(
            'input[value="fragment"]'
        ).checked;

    gameState.hasMap = true;

    if (!gameState.documents.includes("informationSheet")) {

        gameState.documents.push(
            "informationSheet"
        );

    }

}

// Reset completo del gioco
export function resetGameState() {

    gameState.equipmentCollected = false;

    gameState.hasTorch = false;

    gameState.hasMap = false;

    gameState.relics = 0;
    gameState.hasSacredRelic1 = false;
    gameState.hasSacredRelic2 = false,
    gameState.hasSacredRelic3 = false;

    gameState.documents = [];

    gameState.torchEquipped = false,
    gameState.pickaxeEquipped = false,
    gameState.brushEquipped = false;
    gameState.trowelEquipped = false;
    gameState.knifeEquipped = false;
    gameState.ropeEquipped = false;
    gameState.penEquipped = false;
    gameState.stoneEquipped = false;
    gameState.fragmentEquipped = false;

    gameState.torchOn = false
    gameState.torchHintVisible = false
    gameState.torchTutorialCompleted = false;

    gameState.hasPickaxe = false;

    gameState.hasBrush = false;
    gameState.hasTrowel = false;
    gameState.hasKnife = false;
    gameState.hasRope = false;
    gameState.hasPen = false;
    gameState.hasStone = false;
    gameState.hasFragment = false;


}