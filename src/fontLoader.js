// fontLoader.js
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'; 

export function loadFont(scene) {
    const loader = new FontLoader();

    loader.load('./fonts/BrownMedium_Regular.json', (font) => {
        const geometry = new TextGeometry('DO NOT PRESS!', {
            font: font,
            size: 4,
            height: 2,
        });

        const textMesh = new THREE.Mesh(geometry, [
            new THREE.MeshPhongMaterial({ color: 0xad4000 }), // Front
            new THREE.MeshPhongMaterial({ color: 0x5c2301 }) // Sides
        ]);

        textMesh.position.set(-60, 10, 20); // Set the position
        textMesh.rotation.y = -90;
        scene.add(textMesh); // Add text to the scene
    });
}
