import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createSmokeEffect } from './smokeEffect.js'; // Import the smoke effect function
import GUI from 'lil-gui';

/**
 * Base
 */
const gui = new GUI({
    width: 400
});

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();

/**
 * Textures
 */

const bakedTextures = {
    texture1: textureLoader.load('calcBaked1024.jpg'),
    texture2: textureLoader.load('cupJoystickBaked.jpg'),
    texture3: textureLoader.load('extraSmallPartsBaked.jpg'),
    texture4: textureLoader.load('floorBaked1024.jpg'),
    texture5: textureLoader.load('gameboyBaked1024.jpg'),
    texture6: textureLoader.load('gameboyChassisBaked.jpg'),
    texture7: textureLoader.load('gameboyParts2Baked.jpg'),
    texture8: textureLoader.load('gameboyPartsBaked.jpg'),
    texture9: textureLoader.load('smallPartsBaked1024.jpg')
};

// Ensure textures are flipped and wrapped correctly
for (const key in bakedTextures) {
    bakedTextures[key].flipY = false;
    bakedTextures[key].flipY = false;
}

// Baked materials
const bakedMaterials = {
    material1: new THREE.MeshBasicMaterial({ map: bakedTextures.texture1 }),
    material2: new THREE.MeshBasicMaterial({ map: bakedTextures.texture2 }),
    material3: new THREE.MeshBasicMaterial({ map: bakedTextures.texture3 }),
    material4: new THREE.MeshBasicMaterial({ map: bakedTextures.texture4 }),
    material5: new THREE.MeshBasicMaterial({ map: bakedTextures.texture5 }),
    material6: new THREE.MeshBasicMaterial({ map: bakedTextures.texture6 }),
    material7: new THREE.MeshBasicMaterial({ map: bakedTextures.texture7 }),
    material8: new THREE.MeshBasicMaterial({ map: bakedTextures.texture8 }),
    material9: new THREE.MeshBasicMaterial({ map: bakedTextures.texture9 })
};

// Glow materials
const redGlow = new THREE.MeshBasicMaterial({ color: 0xffaa9f });
const orangeGlow = new THREE.MeshBasicMaterial({ color: 0xe6c4a3 });
const yellowGlow = new THREE.MeshBasicMaterial({ color: 0xffeb2a });
const greenGlow = new THREE.MeshBasicMaterial({ color: 0xceffB8 });
const blueGlow = new THREE.MeshBasicMaterial({ color: 0xc5e7e7 });
const purpleGlow = new THREE.MeshBasicMaterial({ color: 0xd2c2ef });
const whiteGlow = new THREE.MeshBasicMaterial({ color: 0xffffe5 });
const whiteGlow2 = new THREE.MeshBasicMaterial({ color: 0xffffe5 });

// Model
gltfLoader.load(
    '5d-portfolio-test4.glb',
    (gltf) => 
    {

        const roundFloor = gltf.scene.children.filter(child => child.name === 'round_floor');
        roundFloor.forEach(child => {
            child.material = bakedMaterials.material4; 
        });

        const parts2Cylinder = gltf.scene.children.filter(child => child.name === 'Parts2_Cylinder003');
        parts2Cylinder.forEach(child => {
            const smoke = createSmokeEffect();
            child.add(smoke); 
        });

        const button = gltf.scene.children.filter(child => child.name === 'Parts2_Cube066');
        button.forEach(child => {
            objectsToTest.push(child);  // Add to the raycasting list
           
        });

        const gameboyScreen = gltf.scene.children.filter(child => child.name === 'Green_gameboy_large_screen');
        gameboyScreen.forEach(child => {
            objectsToTest.push(child);  // Add to the raycasting list
           
        });

        const calc = gltf.scene.children.filter(child => child.name.startsWith('Calc_'));
        calc.forEach(child => {
            child.material = bakedMaterials.material1; 
        });

        const cup = gltf.scene.children.filter(child => child.name.startsWith('Cup_'));
        cup.forEach(child => {
            child.material = bakedMaterials.material2;
        });

        const extra = gltf.scene.children.filter(child => child.name.startsWith('Extra_'));
        extra.forEach(child => {
            child.material = bakedMaterials.material3;
        });

        const keyboard = gltf.scene.children.filter(child => child.name.startsWith('Keyboard_'));
        keyboard.forEach(child => {
            child.material = bakedMaterials.material5;
        });

        const chassis = gltf.scene.children.filter(child => child.name.startsWith('Chassis_'));
        chassis.forEach(child => {
            child.material = bakedMaterials.material6;
        });

        const parts2 = gltf.scene.children.filter(child => child.name.startsWith('Parts2_'));
        parts2.forEach(child => {
            child.material = bakedMaterials.material7;
        });

        const parts = gltf.scene.children.filter(child => child.name.startsWith('Parts_'));
        parts.forEach(child => {
            child.material = bakedMaterials.material8;
        });

        const small = gltf.scene.children.filter(child => child.name.startsWith('Small_'));
        small.forEach(child => {
            child.material = bakedMaterials.material9;
        });

        // Handle glow materials
        const red = gltf.scene.children.filter(child => child.name.startsWith('Red_'));
        red.forEach(child => {
            child.material = redGlow;  
        });

        const orange = gltf.scene.children.filter(child => child.name.startsWith('Orange_'));
        orange.forEach(child => {
            child.material = orangeGlow;  
        });

        const yellow = gltf.scene.children.filter(child => child.name.startsWith('Yellow_'));
        yellow.forEach(child => {
            child.material = yellowGlow;  
        });

        const green = gltf.scene.children.filter(child => child.name.startsWith('Green_'));
        green.forEach(child => {
            child.material = greenGlow;  
        });

        const blue = gltf.scene.children.filter(child => child.name.startsWith('Blue_'));
        blue.forEach(child => {
            child.material = blueGlow;  
        });

        const purple = gltf.scene.children.filter(child => child.name.startsWith('Purple_'));
        purple.forEach(child => {
            child.material = purpleGlow;  
        });

        const white = gltf.scene.children.filter(child => child.name.startsWith('White_'));
        white.forEach(child => {
            child.material = whiteGlow;  
        });

        const white2 = gltf.scene.children.filter(child => child.name.startsWith('White2_'));
        white2.forEach(child => {
            child.material = whiteGlow2;  
        });

        scene.add(gltf.scene);
    }
);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Resize event listener
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 10, 500);
camera.position.set(110, 50, 40);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 180;
controls.minDistance = 1;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//Raycaster:
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => 
    {
        mouse.x = event.clientX / sizes.width * 2 - 1
        mouse.y = - (event.clientY / sizes.height) * 2 + 1
    })

let currentIntersect = null;
const objectsToTest = []

// window.addEventListener('click', () => {
//     if (currentIntersect) {

//         const index = objectsToTest.indexOf(currentIntersect.object);
        
//         switch (index) {
//             case 0:
//                 console.log('click on button');
//                 break;
//             case 1:
//                 console.log('click on screen');
//                 break;
//         }
//     }
// });



// Click event listener
window.addEventListener('click', () => {
    // Update the raycaster to get the latest intersections
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objectsToTest);

    if (intersects.length) {
        const index = objectsToTest.indexOf(intersects[0].object);
        
        switch (index) {
            case 0:
                console.log('click on button');
                break;
            case 1:
                console.log('click on screen');
                break;
            default:
                console.log('click on unknown object');
                break;
        }
    }
});





/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Cast a ray

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(objectsToTest)

    // for (const intersect of intersects) {
    //     // logic for camera
    // }

    if (intersects.length) {
        if(currentIntersect === null) {
            console.log('mouse enter')
        }
        currentIntersect = intersects[0]
    }
    else {
        if(currentIntersect) {
            console.log('mouse leave')
        }
        currentIntersect = null
    }
    

    // Update controls
    controls.update();

    scene.traverse((child) => {
        if (child.update) {
            child.update(elapsedTime);
        }
    });

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
