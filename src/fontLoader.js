// fontLoader.js
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'; 

export function loadFont(scene) {
    const loader = new FontLoader();

    loader.load('./fonts/BrownMedium_Regular.json', (font) => {
        const geometry = new TextGeometry('DO NOT PRESS!', {
            font: font,
            size: 3,
            height: 2,
        });

        const textMesh = new THREE.Mesh(geometry, [
            new THREE.MeshBasicMaterial({ color: 0xffffe5 }),
            new THREE.MeshBasicMaterial({ color: 0xffffe5 })
        ]);

        textMesh.position.set(-55, 12, -8); // Set the position
        textMesh.rotation.y = 4.7;
        scene.add(textMesh); // Add text to the scene
    });
}
