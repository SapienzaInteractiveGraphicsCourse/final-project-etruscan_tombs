import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { addCollider } from "./collision.js";
import { loadingManager } from "./loadingManager.js";

const textureLoader = new THREE.TextureLoader(loadingManager);
const gltfLoader = new GLTFLoader(loadingManager);

export let table;
export let torch;
export let scroll;
export let paper;
export let brush;
export let trowel;
export let knife;
export let rope;
export let pen;
export let stone;
export let fragment;
export let pickaxe;

function loadTool(
    path,
    position,
    rotation,
    scale,
    callback
){

    gltfLoader.load(path, gltf => {

        const model = gltf.scene;

        model.position.copy(position);

        model.rotation.set(
            rotation.x,
            rotation.y,
            rotation.z
        );

        model.scale.setScalar(scale);

        table.add(model);

        callback(model);

    });

}

export function createTable(scene) {

    table = new THREE.Group();

    const woodMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b5a2b
    });

    // ==========================
    // Piano del tavolo
    // ==========================

    const top = new THREE.Mesh(

        new THREE.BoxGeometry(3, 0.18, 1.4),
        woodMaterial

    );

    top.position.y = 0.9;

    table.add(top);

    // ==========================
    // Gambe
    // ==========================

    const legGeometry = new THREE.BoxGeometry(0.16, 0.9, 0.16);

    const legPositions = [

        [-1.3, 0.45, -0.55],
        [ 1.3, 0.45, -0.55],
        [-1.3, 0.45,  0.55],
        [ 1.3, 0.45,  0.55]

    ];

    legPositions.forEach(position => {

        const leg = new THREE.Mesh(legGeometry, woodMaterial);

        leg.position.set(...position);

        table.add(leg);

    });

    // ==========================
    // Traverse lunghe
    // ==========================

    const longBeamGeometry = new THREE.BoxGeometry(2.6, 0.12, 0.12);

    const beamFront = new THREE.Mesh(longBeamGeometry, woodMaterial);
    beamFront.position.set(0, 0.55, 0.55);

    const beamBack = new THREE.Mesh(longBeamGeometry, woodMaterial);
    beamBack.position.set(0, 0.55, -0.55);

    table.add(beamFront);
    table.add(beamBack);

    // ==========================
    // Traverse corte
    // ==========================

    const shortBeamGeometry = new THREE.BoxGeometry(0.12, 0.12, 1.1);

    const beamLeft = new THREE.Mesh(shortBeamGeometry, woodMaterial);
    beamLeft.position.set(-1.3, 0.55, 0);

    const beamRight = new THREE.Mesh(shortBeamGeometry, woodMaterial);
    beamRight.position.set(1.3, 0.55, 0);

    table.add(beamLeft);
    table.add(beamRight);

    // ==========================
    // Posizione
    // ==========================

    table.position.set(4, 0, -2);

    // Lato lungo parallelo al sentiero
    table.rotation.y = Math.PI / 2;

    addCollider(table);



    // ==========================
    // Pedana in pietra
    // ==========================


    const baseTexture = textureLoader.load(
    "assets/textures/pavimento.jpg"
    );

    baseTexture.wrapS = THREE.RepeatWrapping;
    baseTexture.wrapT = THREE.RepeatWrapping;
    baseTexture.repeat.set(1, 1);
    const baseMaterial = new THREE.MeshStandardMaterial({
    map: baseTexture
    });

    const base = new THREE.Mesh(

        new THREE.BoxGeometry(4.2, 0.15, 2.8),
        baseMaterial

    );

    base.position.set(0, 0.075, 0);

    table.add(base);


    // ==========================
    // Pali cartello
    // ==========================

    const postMaterial = woodMaterial;

    const postGeometry = new THREE.BoxGeometry(0.12, 2.1, 0.12);

    const leftPost = new THREE.Mesh(postGeometry, postMaterial);
    leftPost.position.set(-0.9, 2, 0.6);

    const rightPost = new THREE.Mesh(postGeometry, postMaterial);
    rightPost.position.set(0.9, 2, 0.6);

    table.add(leftPost);
    table.add(rightPost);



    // ==========================
    // Cartello INFO POINT
    // ==========================

    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;

    const ctx = canvas.getContext("2d");

    // Sfondo
    ctx.fillStyle = "#e8dcc0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Bordo
    ctx.strokeStyle = "#4a3a28";
    ctx.lineWidth = 20;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Titolo
    ctx.fillStyle = "#2f2418";
    ctx.textAlign = "center";

    ctx.font = "bold 250px Cinzel";
    ctx.fillText("INFO POINT", canvas.width / 2, 400);

    // Linea decorativa
    ctx.beginPath();
    ctx.moveTo(450, 470);
    ctx.lineTo(1598, 470);
    ctx.strokeStyle = "#8b5a2b";
    ctx.lineWidth = 6;
    ctx.stroke();

    // Sottotitolo
    ctx.font = "130px Arial";
    ctx.fillText("Visitor Information", canvas.width / 2, 640);

    const signTexture = new THREE.CanvasTexture(canvas);

    const signMaterial = new THREE.MeshStandardMaterial({
        map: signTexture
    });

    const sign = new THREE.Mesh(
        new THREE.BoxGeometry(2.3, 0.9, 0.08),
        signMaterial
    );

    sign.position.set(0, 2.45, 0.5);

    table.add(sign);

    // ==========================
    // Tetto
    // ==========================

    const roof = new THREE.Mesh(

        new THREE.BoxGeometry(2.5, 0.12, 1.5),
        woodMaterial

    );


    roof.position.set(0, 3.15, 0.6);

    roof.rotation.x = -0.18;

    table.add(roof);

    //======================
    // Lantern
    //======================
    torch = new THREE.Group();

    const metalMaterial = new THREE.MeshStandardMaterial({
        color: 0x3f2a18,
        roughness: 0.8,
        metalness: 0.2
    });

    const glassMaterial = new THREE.MeshStandardMaterial({
        color: 0xffe7a8,
        transparent: true,
        opacity: 0.35
    });

    const flameMaterial = new THREE.MeshStandardMaterial({
        color: 0xffdd55,
        emissive: 0xffaa00,
        emissiveIntensity: 2
    });


    // Base

    const lanternBase = new THREE.Mesh(

        new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16),

        metalMaterial

    );

    lanternBase.position.y = -0.05;

    torch.add(lanternBase);


    // Top

    const lanternTop = new THREE.Mesh(

        new THREE.CylinderGeometry(0.08, 0.08, 0.04, 16),

        metalMaterial

    );

    lanternTop.position.y = 0.11;

    torch.add(lanternTop);


    // Glass

    const lanternGlass = new THREE.Mesh(

        new THREE.CylinderGeometry(0.065, 0.065, 0.18, 16),

        glassMaterial

    );

    torch.add(lanternGlass);


    // Vertical bars


    const barGeometry =
        new THREE.CylinderGeometry(0.005, 0.005, 0.18);

    const bar1 = new THREE.Mesh(barGeometry, metalMaterial);
    bar1.position.set(0.05, 0, 0);

    torch.add(bar1);

    const bar2 = new THREE.Mesh(barGeometry, metalMaterial);
    bar2.position.set(-0.05, 0, 0);

    torch.add(bar2);

    // Handle

    const lanternHandle = new THREE.Mesh(

        new THREE.TorusGeometry(
            0.07,
            0.006,
            8,
            20,
            Math.PI
        ),

        metalMaterial

    );

    lanternHandle.rotation.z = 0;

    lanternHandle.position.y = 0.13;

    torch.add(lanternHandle);


    // Flame

    const flame = new THREE.Mesh(

        new THREE.SphereGeometry(0.022, 10, 10),

        flameMaterial

    );

    flame.position.y = -0.01;

    torch.add(flame);
 
    // Position

    torch.position.set(-0.9, 1.05, 0);

    table.add(torch);

    //=========================
    // Documento
    //=========================
    paper = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.45,
            0.003,
            0.35
        ),

        new THREE.MeshStandardMaterial({

            color:0xf0e3c0

        })

    );

    //paper.rotation.x = -Math.PI/2;

    paper.position.set(0.8,1.01,0);

    table.add(paper);

    // ==========================
    // Pergamena arrotolata
    // ==========================

    scroll = new THREE.Mesh(

        new THREE.CylinderGeometry(0.05, 0.05, 0.45, 16),

        new THREE.MeshStandardMaterial({

            color: 0xf2e3bc

        })

    );

    scroll.rotation.z = Math.PI / 2;

    scroll.position.set(0,1.03,0);

    table.add(scroll);

    // ==========================
    // Brush
    // ==========================

    loadTool(

        "assets/models/brush.glb",

        new THREE.Vector3(-0.35,0.9,-0.35),

        new THREE.Euler(-Math.PI/2,1.8,0),

        0.15,

        model => brush = model

    );

    // ==========================
    // Small Trowel
    // ==========================

    loadTool(

        "assets/models/small_trowel.glb",

        new THREE.Vector3(0.35,1.1,-0.35),

        new THREE.Euler(0,-0.5,0),

        0.15,

        model => {model.scale.set(3, 3, 3);  trowel = model;}

    );

    // ==========================
    // Knife
    // ==========================

    loadTool(

        "assets/models/multi_tool_knife.glb",

        new THREE.Vector3(-0.60,1,-0.30),

        new THREE.Euler(-Math.PI/2, 0,-0),

        0.15,

        model =>{model.scale.set(0.05, 0.05, 0.05); knife = model}

    );

    // ==========================
    // Rope
    // ==========================

    loadTool(

        "assets/models/rope.glb",

        new THREE.Vector3(-0.65,1.01,-0.7),

        new THREE.Euler(0,0.5,0),

        0.15,

        model => rope = model

    );

    // ==========================
    // Pen
    // ==========================

    loadTool(

        "assets/models/pen.glb",

        new THREE.Vector3(-0.60,1.01,-0.1),

        new THREE.Euler(0,2.2,0),

        0.15,

        model =>{model.scale.set(2, 2, 2); pen = model}

    );

    // ==========================
    // Stone
    // ==========================

    stone = new THREE.Mesh(

        new THREE.DodecahedronGeometry(0.06),

        new THREE.MeshStandardMaterial({

            color:0x777777

        })

    );

    stone.position.set(
        -0.15,
        1.02,
        0.32
    );

    table.add(stone);

    // ==========================
    // Pottery Fragment
    // ==========================

    loadTool(

        "assets/models/pottery_fragment.glb",

        new THREE.Vector3(0.55, 1, 0.5),

        new THREE.Euler(0,0.4,0),

        0.15,

        model =>{model.scale.set(2, 2, 2); fragment = model}

    );

    // ==========================
    // Pickaxe
    // ==========================

    loadTool(

        "assets/models/pickaxe.glb",

        new THREE.Vector3(1.65,0.5,-0.7),

        new THREE.Euler(0,0.3,0.2),

        0.22,

        model =>{model.scale.set(0.0005, 0.0005, 0.0005); pickaxe = model}

    );

    table.traverse(child => {

        if (child.isMesh) {

            child.castShadow = true;
            child.receiveShadow = true;

        }

    });

    scene.add(table);

}
