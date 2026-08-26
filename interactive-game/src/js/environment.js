import * as THREE from "three";
import { addCollider } from "./collision.js";

const clouds = [];

export function createEnvironment(scene) {

    createTrees(scene);

    createClouds(scene);

}

export function updateEnvironment() {

    updateClouds();
}

function createTrees(scene) {

    for (let z = 35; z >= -95; z -= 15) {
        if (z === 5 || z === -70)
            continue

        // Lato sinistro
        let tree = createCypress();

        tree.scale.setScalar(1.8);

        tree.position.set(

            -7 + (Math.random() - 0.5) * 1.2,
            0,
            z + (Math.random() - 0.5) * 2

        );

        scene.add(tree);

        // Lato destro
        tree = createCypress();

        tree.scale.setScalar(1.8);
        tree.position.set(

            7 + (Math.random() - 0.5) * 1.2,
            0,
            z + (Math.random() - 0.5) * 2

        );

        scene.add(tree);

    }
    // ==========================
    // CIPRESSI SUL CONFINE
    // ==========================

    for (let i = 0; i < 15; i++) {

        const angle = (i / 15) * Math.PI * 2;

        // Raggio leggermente casuale
        const radiusX = 90 + Math.random() * 8;
        const radiusZ = 95 + Math.random() * 10;

        const tree = createCypress();

        tree.scale.setScalar(1.8);

        tree.position.set(

            Math.cos(angle) * radiusX,
            0,
            Math.sin(angle) * radiusZ - 45

        );

        tree.rotation.y =
            Math.random() * Math.PI * 2;

        scene.add(tree);

    }

}

function createCypress() {

    const tree = new THREE.Group();

    const trunkMaterial = new THREE.MeshStandardMaterial({
        color: 0x6b4a2a
    });

    const foliageMaterial = new THREE.MeshStandardMaterial({
        color: 0x356d45
    });

    // Tronco
    const trunk = new THREE.Mesh(

        new THREE.CylinderGeometry(
            0.12,
            0.18,
            1,
            8
        ),

        trunkMaterial

    );

    trunk.position.y = 0.5;

    tree.add(trunk);

    // Profilo del cipresso
    const points = [

        new THREE.Vector2(0.00, 0.0),
        new THREE.Vector2(0.55, 0.2),
        new THREE.Vector2(0.70, 1.2),
        new THREE.Vector2(0.75, 2.8),
        new THREE.Vector2(0.72, 4.2),
        new THREE.Vector2(0.60, 5.4),
        new THREE.Vector2(0.35, 6.5),
        new THREE.Vector2(0.12, 7.2),
        new THREE.Vector2(0.00, 7.5)

    ];

    const foliage = new THREE.Mesh(

        new THREE.LatheGeometry(points, 10),

        foliageMaterial

    );

    foliage.position.y = 0.4;

    tree.add(foliage);

    tree.traverse(child => {

        if (child.isMesh) {

            child.castShadow = true;
            child.receiveShadow = true;

        }

    });

    addCollider(tree);

    return tree;

}

const textureLoader = new THREE.TextureLoader();

const cloudTexture = textureLoader.load(
    "../src/assets/textures/nuvola.png"
);

function createClouds(scene) {

    const baseMaterial = new THREE.MeshStandardMaterial({

        map: cloudTexture,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide

    });

    for (let i = 0; i < 15; i++) {

        // Dimensioni casuali
        const width = 15 + Math.random() * 40;      // 20 - 60
        const height = width * (0.35 + Math.random() * 0.2);

        // Ogni nuvola ha una trasparenza diversa
        const material = baseMaterial.clone();
        material.opacity = 0.45 + Math.random() * 0.35;

        const cloud = new THREE.Mesh(

            new THREE.PlaneGeometry(width, height),

            material

        );

        cloud.position.set(

            Math.random() * 300 - 150,    // X
            35 + Math.random() * 12,      // Y
            Math.random() * 300 - 150     // Z

        );

        cloud.rotation.x = -Math.PI / 2;

        // Velocità diversa per ogni nuvola
        cloud.userData.speed =
            0.01 + Math.random() * 0.01;

        scene.add(cloud);

        clouds.push(cloud);

    }

}

function updateClouds() {

    clouds.forEach(cloud => {

        cloud.position.x += cloud.userData.speed;

        if (cloud.position.x > 150) {

            cloud.position.x = -150;

            // Cambia leggermente posizione quando rientra
            cloud.position.z = Math.random() * 300 - 150;
            cloud.position.y = 35 + Math.random() * 12;

        }

    });

}