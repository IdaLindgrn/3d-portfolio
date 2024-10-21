// screenCube.js
import * as THREE from 'three';

const createScreenCube = (screens) => {
    const cubeGeometry = new THREE.PlaneGeometry(26, 17);
    const cubeMaterial = new THREE.MeshBasicMaterial({
        map: screens.screenStart,
        side: THREE.DoubleSide,
    });

    const screenCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    screenCube.position.set(-9, 28, 7.7);

    const yAxis = new THREE.Vector3(0, 1, 0);
    const yRot = Math.PI / 2; // 90 degrees
    const yQuaternion = new THREE.Quaternion();
    yQuaternion.setFromAxisAngle(yAxis, yRot);

    const xAxis = new THREE.Vector3(1, 0, 0);
    const xRot = Math.PI / -17; // Tilt back
    const xQuaternion = new THREE.Quaternion();
    xQuaternion.setFromAxisAngle(xAxis, xRot);

    const combinedQuaternion = new THREE.Quaternion();
    combinedQuaternion.multiplyQuaternions(yQuaternion, xQuaternion);

    screenCube.quaternion.copy(combinedQuaternion);

    return screenCube;
};

// Exported function
export { createScreenCube };
