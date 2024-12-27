import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'; 
import { getCurrentTime } from './clock.js';

export function loadFont(scene) {
    const loader = new FontLoader();

    loader.load('/fonts/3Dfonts/BrownMedium_Regular.json', (font) => {
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

let previousTime = '';
let previousDate = '';

let cachedFont = null;

export function loadClockTexts(scene) {
    const loader = new FontLoader();

    if (clockTextMeshes.time || clockTextMeshes.date) {
        clockTextMeshes.time.visible = true;
        clockTextMeshes.date.visible = true;
        return;
    }

    const { formattedTime, formattedDate } = getCurrentTime();
    previousTime = formattedTime;
    previousDate = formattedDate;

    const yAxis = new THREE.Vector3(0, 1, 0);
    const yRot = Math.PI / 2;
    const yQuaternion = new THREE.Quaternion().setFromAxisAngle(yAxis, yRot);

    const xAxis = new THREE.Vector3(1, 0, 0);
    const xRot = Math.PI / -17;
    const xQuaternion = new THREE.Quaternion().setFromAxisAngle(xAxis, xRot);

    const combinedQuaternion = new THREE.Quaternion().multiplyQuaternions(yQuaternion, xQuaternion);

    if (cachedFont) {
        createClockTextMeshes(scene, cachedFont, formattedTime, formattedDate, combinedQuaternion);
    } else {
        loader.load('/fonts/3Dfonts/BrownLight_Regular.json', (font) => {
            cachedFont = font;
            createClockTextMeshes(scene, font, formattedTime, formattedDate, combinedQuaternion);
        });
    }
}

function createClockTextMeshes(scene, font, formattedTime, formattedDate, combinedQuaternion) {

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

        requestAnimationFrame(() => checkForTimeUpdate(font));
    };


function checkForTimeUpdate(font) {
    const { formattedTime, formattedDate } = getCurrentTime();

    if (formattedTime !== previousTime) {
        previousTime = formattedTime;
        clockTextMeshes.time.geometry.dispose();
        clockTextMeshes.time.geometry = new TextGeometry(formattedTime, {
            font: font,
            size: 0.4,
            depth: 0.05,
        });
    }

    if (formattedDate !== previousDate) {
        previousDate = formattedDate;
        clockTextMeshes.date.geometry.dispose();
        clockTextMeshes.date.geometry = new TextGeometry(formattedDate, {
            font: font,
            size: 0.4,
            depth: 0.05,
        });
    }

    requestAnimationFrame(() => checkForTimeUpdate(font));
}


export function removeClockTexts(scene) {
    if (clockTextMeshes.time) clockTextMeshes.time.visible = false;
    if (clockTextMeshes.date) clockTextMeshes.date.visible = false;
}