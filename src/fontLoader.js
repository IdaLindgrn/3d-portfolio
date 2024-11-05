// fontLoader.js
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'; 
import { getCurrentTime } from './clock.js';


export function loadFont(scene) {
    const loader = new FontLoader();

    loader.load('./fonts/3Dfonts/BrownMedium_Regular.json', (font) => {
        const geometry = new TextGeometry('DO NOT PRESS!', {
            font: font,
            size: 2.5,
            depth: 0.5,
        });

        const textMesh = new THREE.Mesh(geometry, [
            new THREE.MeshBasicMaterial({ color: 0xffffe5 }),
            new THREE.MeshBasicMaterial({ color: 0xffffe5 })
        ]);

        textMesh.position.set(-55, 12, -8);
        textMesh.rotation.y = 4.7;
        scene.add(textMesh);

    });
}

const clockTextMeshes = {
    time: null,
    date: null,
};

export function loadClockTexts(scene) {
    const { formattedTime, formattedDate } = getCurrentTime();
    const loader = new FontLoader();

    
    const yAxis = new THREE.Vector3(0, 1, 0);
    const yRot = Math.PI / 2; 
    const yQuaternion = new THREE.Quaternion();
    yQuaternion.setFromAxisAngle(yAxis, yRot);

    const xAxis = new THREE.Vector3(1, 0, 0);
    const xRot = Math.PI / -17; 
    const xQuaternion = new THREE.Quaternion();
    xQuaternion.setFromAxisAngle(xAxis, xRot);

    const combinedQuaternion = new THREE.Quaternion();
    combinedQuaternion.multiplyQuaternions(yQuaternion, xQuaternion);

 
    loader.load('./fonts/3Dfonts/BrownLight_Regular.json', (font) => {
        const timeGeometry = new TextGeometry(formattedTime, {
            font: font,
            size: 0.4,
            depth: 0.05,
        });
    
        clockTextMeshes.time = new THREE.Mesh(timeGeometry, [
        new THREE.MeshBasicMaterial({ color: 0x000 }),
        new THREE.MeshBasicMaterial({ color: 0x000 })
    ]);
    
    clockTextMeshes.time.position.set(-7.5, 21, -2.6); 
    clockTextMeshes.time.quaternion.copy(combinedQuaternion);

    scene.add(clockTextMeshes.time);

    const dateGeometry = new TextGeometry(formattedDate, {
        font: font,
        size: 0.4,
        depth: 0.05,
    });

    clockTextMeshes.date = new THREE.Mesh(dateGeometry, [
        new THREE.MeshBasicMaterial({ color: 0x000 }),
        new THREE.MeshBasicMaterial({ color: 0x000 })
    ]);
    
    clockTextMeshes.date.position.set(-7.2, 19.95, -2.45); 
    clockTextMeshes.date.quaternion.copy(combinedQuaternion);

    scene.add(clockTextMeshes.date);

    // Update time and date every second
    // setInterval(() => {
    //     const { formattedTime, formattedDate } = getCurrentTime();

    //     // Update time text

    //     clockTextMeshes.time.geometry.dispose(); 
    //     clockTextMeshes.time.material.dispose(); 
    //     clockTextMeshes.time.geometry = new TextGeometry(formattedTime, {
    //         font: font,
    //         size: 0.4,
    //         depth: 0.1,
    //     });

    //     // Update date text
    //     clockTextMeshes.date.geometry.dispose(); 
    //     clockTextMeshes.date.material.dispose(); 
    //     clockTextMeshes.date.geometry = new TextGeometry(formattedDate, {
    //         font: font,
    //         size: 0.4,
    //         depth: 0.1,
    //     });
    // }, 1000); // Update every second
})
}

// export function removeClockTexts(scene) {
//     if (clockTextMeshes.time) {
//         scene.remove(clockTextMeshes.time); // Remove time text from scene
//         if (clockTextMeshes.time.geometry) {
//             clockTextMeshes.time.geometry.dispose(); 
//         }
//         clockTextMeshes.time = null; // Clear reference
//         console.log('Removed time text mesh');
//     }

//     if (clockTextMeshes.date) {
//         scene.remove(clockTextMeshes.date); // Remove date text from scene
//         if (clockTextMeshes.date.geometry) {
//             clockTextMeshes.date.geometry.dispose(); 
//         }
//         clockTextMeshes.date = null; // Clear reference
//         console.log('Removed date text mesh');
//     }
// }