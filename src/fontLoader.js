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

// Load the initial clock texts
export function loadClockTexts(scene) {
    if (clockTextMeshes.time || clockTextMeshes.date) {
        clockTextMeshes.time.visible = true;
        clockTextMeshes.date.visible = true;
        return;
    }

    const { formattedTime, formattedDate } = getCurrentTime();
    const loader = new FontLoader();

    const yAxis = new THREE.Vector3(0, 1, 0);
    const yRot = Math.PI / 2;
    const yQuaternion = new THREE.Quaternion().setFromAxisAngle(yAxis, yRot);

    const xAxis = new THREE.Vector3(1, 0, 0);
    const xRot = Math.PI / -17;
    const xQuaternion = new THREE.Quaternion().setFromAxisAngle(xAxis, xRot);

    const combinedQuaternion = new THREE.Quaternion().multiplyQuaternions(yQuaternion, xQuaternion);

    loader.load('./fonts/3Dfonts/BrownLight_Regular.json', (font) => {
        // Time Text
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

        // Date Text
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
        setInterval(() => updateClockTexts(font), 1000);
    });
}

// Update clock text geometries each second
function updateClockTexts(font) {
    const { formattedTime, formattedDate } = getCurrentTime();

    // Update time text
    if (clockTextMeshes.time) {
        clockTextMeshes.time.geometry.dispose();
        clockTextMeshes.time.geometry = new TextGeometry(formattedTime, {
            font: font,
            size: 0.4,
            depth: 0.05,
        });
    }

    // Update date text
    if (clockTextMeshes.date) {
        clockTextMeshes.date.geometry.dispose();
        clockTextMeshes.date.geometry = new TextGeometry(formattedDate, {
            font: font,
            size: 0.4,
            depth: 0.05,
        });
    }
}

// Hide clock texts if needed
export function removeClockTexts(scene) {
    if (clockTextMeshes.time) clockTextMeshes.time.visible = false;
    if (clockTextMeshes.date) clockTextMeshes.date.visible = false;
}