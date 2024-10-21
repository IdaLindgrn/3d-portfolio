import * as THREE from 'three';

// Raycaster and mouse vector for interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const objectsToTest = [];

// Screen Geometry setup
const screens = {
    screenStart: new THREE.TextureLoader().load('./textures/GroupTest2.png'),
    screenRobot: new THREE.TextureLoader().load('./textures/screenRobot.png'),
    screenProjects: new THREE.TextureLoader().load('./textures/screenProjects.png'),
};

const cubeGeometry = new THREE.PlaneGeometry(26, 17); 

// Create a material using the screenStart texture
const cubeMaterial = new THREE.MeshBasicMaterial({
    map: screens.screenStart,
    side: THREE.DoubleSide
});

// Screen cube mesh
const screenCube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Set screenCube position and orientation
screenCube.position.set(-9, 28, 7.7);  
const yAxis = new THREE.Vector3(0, 1, 0);
const yRot = Math.PI / 2; // 90 degrees
const yQuaternion = new THREE.Quaternion().setFromAxisAngle(yAxis, yRot);

const xAxis = new THREE.Vector3(1, 0, 0);
const xRot = Math.PI / -17; // Tilt back
const xQuaternion = new THREE.Quaternion().setFromAxisAngle(xAxis, xRot);

const combinedQuaternion = new THREE.Quaternion().multiplyQuaternions(yQuaternion, xQuaternion);
screenCube.quaternion.copy(combinedQuaternion);

objectsToTest.push(screenCube);

// Update raycaster on mouse move
const updateMousePosition = (event, sizes) => {
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(event.clientY / sizes.height) * 2 + 1;
};

// Function to detect intersection with objects
const detectIntersects = (camera, controls, screens, animateCamera) => {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objectsToTest);

    if (intersects.length) {
        const clickedObject = intersects[0].object;
        const index = objectsToTest.indexOf(clickedObject);

        if (index === 0) {
            console.log('click on screen');
            clickedObject.material.map = screens.screenRobot;  // Change texture on click
            animateCamera(clickedObject.position, 1.5, {
                positionOffset: { x: 25, y: 15, z: 0 },
                targetOffset: { x: 0, y: 8.5, z: 0 }
            });
        }
    }
};

export { screenCube, updateMousePosition, detectIntersects };
