
// const raycaster = new THREE.Raycaster();
// const pointer = new THREE.Vector2();

// window.addEventListener('mousemove', (event) => 
//     {
//         pointer.x = event.clientX / sizes.width * 2 - 1
//         pointer.y = - (event.clientY / sizes.height) * 2 + 1

//         console.log(pointer)
//     })

// const tick = () => 
//     {
//         raycaster.setFromCamera(mouse, camera)

//         const objectsToTest = ['Parts2_Cube.066']
//         const intersects = raycaster.intersectObjects(objectsToTest)

//         for(const intersect of intersects) {
//             intersect.objct.material.color.set('0000ff')
//         }
// }