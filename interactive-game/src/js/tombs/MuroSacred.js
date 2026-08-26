import * as THREE from "three";
import { addCollider, removeCollider} from "../collision.js";
import { gameState } from "../gameState.js";

export let sacredWall;
export let wallRubble = [];
export let leftRubbleCollider;
export let rightRubbleCollider;
let chamberOpened = false;
let chamberJustOpened = false;
const textureLoader = new THREE.TextureLoader();

export function createSacredChamber(scene) {

    const chamber = new THREE.Group();

    createSacredWall(chamber);

    scene.add(chamber);

}

function createSacredWall(chamber) {

    const texture = textureLoader.load(
        "../src/assets/textures/Corniolo.png"
    );

    texture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({

        map: texture

    });

    sacredWall = new THREE.Mesh(

        new THREE.BoxGeometry(
            14,     // larghezza
            8,      // altezza
            1       // spessore
        ),

        material

    );

    sacredWall.position.set(
        0,
        4,
        -70
    );

    sacredWall.castShadow = true;
    sacredWall.receiveShadow = true;

    //sacredWall.visible = false;

    chamber.add(sacredWall);
    wallRubble.length = 0;
    createWallRubble(chamber);
    addCollider(sacredWall);

}

function createWallRubble(chamber) {

    const material = new THREE.MeshStandardMaterial({

        color: 0xb49a72,
        roughness: 1,
        metalness: 0

    });

    const stones = [

        // ---------- LATO SINISTRO ----------
        { geo: "box", x:-6.2, y:0.12, z:-69.65, sx:1.4, sy:0.45, sz:0.9, rx:0.15, ry:0.30, rz:0.18 },
        { geo: "dod", x:-5.2, y:0.02, z:-69.90, s:0.55, rx:0.20, ry:1.00, rz:0.40 },
        { geo: "ico", x:-4.2, y:0.10, z:-69.45, s:0.40, rx:0.80, ry:0.50, rz:0.10 },
        { geo: "box", x:-3.2, y:0.20, z:-69.70, sx:1.0, sy:0.35, sz:0.7, rx:0.25, ry:0.60, rz:-0.20 },
        { geo: "dod", x:-2.3, y:-0.02, z:-69.40, s:0.50, rx:0.40, ry:0.90, rz:0.20 },
        { geo: "ico", x:-1.4, y:0.05, z:-69.85, s:0.35, rx:0.70, ry:0.40, rz:0.50 },

        // ---------- LATO DESTRO ----------
        { geo: "ico", x:1.5, y:0.04, z:-69.80, s:0.35, rx:0.20, ry:0.70, rz:0.60 },
        { geo: "dod", x:2.4, y:-0.02, z:-69.50, s:0.55, rx:0.30, ry:0.80, rz:0.20 },
        { geo: "box", x:3.4, y:0.18, z:-69.70, sx:1.1, sy:0.40, sz:0.8, rx:0.20, ry:0.50, rz:0.25 },
        { geo: "ico", x:4.5, y:0.10, z:-69.45, s:0.40, rx:0.90, ry:0.20, rz:0.40 },
        { geo: "dod", x:5.5, y:0.03, z:-69.90, s:0.60, rx:0.50, ry:1.10, rz:0.10 },
        { geo: "box", x:6.4, y:0.12, z:-69.60, sx:1.3, sy:0.45, sz:0.9, rx:0.10, ry:0.30, rz:-0.18 }

    ];

    stones.forEach(data => {

        let geometry;

        switch (data.geo) {

            case "box":
                geometry = new THREE.BoxGeometry(
                    data.sx,
                    data.sy,
                    data.sz
                );
                break;

            case "dod":
                geometry = new THREE.DodecahedronGeometry(
                    data.s,
                    0
                );
                break;

            case "ico":
                geometry = new THREE.IcosahedronGeometry(
                    data.s,
                    0
                );
                break;

        }

        const stone = new THREE.Mesh(
            geometry,
            material
        );

        stone.position.set(
            data.x,
            data.y,
            data.z
        );

        stone.rotation.set(
            data.rx,
            data.ry,
            data.rz
        );

        stone.castShadow = true;
        stone.receiveShadow = true;

        stone.visible = false;

        chamber.add(stone);

        wallRubble.push(stone);

        // Collider invisibile sinistra
        leftRubbleCollider = new THREE.Mesh(

            new THREE.BoxGeometry(
                5.8,
                1.2,
                1.6
            ),

            new THREE.MeshBasicMaterial({
                visible: false
            })

        );

        leftRubbleCollider.position.set(
            -3.8,
            0.6,
            -69.65
        );

        chamber.add(leftRubbleCollider);


        // Collider invisibile destra
        rightRubbleCollider = new THREE.Mesh(

            new THREE.BoxGeometry(
                5.8,
                1.2,
                1.6
            ),

            new THREE.MeshBasicMaterial({
                visible: false
            })

        );

        rightRubbleCollider.position.set(
            3.8,
            0.6,
            -69.65
        );

        chamber.add(rightRubbleCollider);

    });

}

export function updateSacredChamber() {

    if (
        gameState.relics === 3 &&
        !chamberOpened
    ) {

        chamberOpened = true;

        sacredWall.visible = false;

        removeCollider(sacredWall);

        wallRubble.forEach(stone => {

            stone.visible = true;

        });

        addCollider(leftRubbleCollider);
        addCollider(rightRubbleCollider);

        chamberJustOpened = true;

    }

}

export function consumeChamberOpened() {

    if (!chamberJustOpened)
        return false;

    chamberJustOpened = false;

    return true;

}

export function resetSacredChamber() {

    chamberOpened = false;

    chamberJustOpened = false;

    sacredWall.visible = true;
    removeCollider(sacredWall);
    addCollider(sacredWall);
    removeCollider(leftRubbleCollider);
    removeCollider(rightRubbleCollider);

    wallRubble.forEach(stone => {

        stone.visible = false;

    });

}