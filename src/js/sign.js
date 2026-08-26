import * as THREE from "three";

export function createSign(scene) {

    const sign = new THREE.Group();

    // Canvas
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 512;

    const ctx = canvas.getContext("2d");

   // Sfondo
ctx.fillStyle = "#E8DCC0";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Bordo
ctx.strokeStyle = "#5b4636";
ctx.lineWidth = 8;
ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

// Testo
ctx.fillStyle = "#222222";
ctx.textAlign = "center";

// Icona
ctx.font = "90px serif";
ctx.fillText("🏺", canvas.width / 2, 120);

// Titolo
ctx.font = "bold 64px Cinzel";
ctx.fillText("NECROPOLIS OF TARQUINIA", canvas.width / 2, 210);

// Linea
ctx.beginPath();
ctx.moveTo(150, 260);
ctx.lineTo(874, 260);
ctx.stroke();

// Welcome
ctx.font = "bold 68px Cinzel";
ctx.fillText("Welcome", canvas.width / 2, 380);
    // Texture
    const signTexture = new THREE.CanvasTexture(canvas);

    // Pannello
    const panelGeometry = new THREE.BoxGeometry(2.5, 1.5, 0.08);

    const panelMaterial = new THREE.MeshStandardMaterial({
        map: signTexture
    });

    const panel = new THREE.Mesh(panelGeometry, panelMaterial);

    sign.add(panel);

    // Posizione
    sign.position.set(5, 3.8, 4.5);

    sign.rotation.y = 0;

    scene.add(sign);

}