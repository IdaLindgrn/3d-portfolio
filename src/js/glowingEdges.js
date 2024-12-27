import * as THREE from 'three';
import glowingEdgesVertexShader from '/shaders/glowingEdges/vertex.glsl';
import glowingEdgesfragmentShader from '/shaders/glowingEdges/fragment.glsl';

export function createGlowingEdges(mesh) {
    const edgeGeometry = new THREE.EdgesGeometry(mesh.geometry);

    const edgeMaterial = new THREE.ShaderMaterial({
        vertexShader: glowingEdgesVertexShader,
        fragmentShader: glowingEdgesfragmentShader,
        transparent: true,
        uniforms: {
            uTime: { value: 0 },
        },
    });

    const edgeMesh = new THREE.LineSegments(edgeGeometry, edgeMaterial);

    edgeMesh.position.copy(mesh.position);
    edgeMesh.rotation.copy(mesh.rotation);
    edgeMesh.scale.copy(mesh.scale);

    edgeMesh.update = (elapsedTime) => {
        edgeMaterial.uniforms.uTime.value = elapsedTime;
    };

    return edgeMesh;
}
