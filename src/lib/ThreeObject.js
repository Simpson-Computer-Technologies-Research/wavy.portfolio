import * as THREE from 'three';
import noise from 'simplenoise';

// Establish an empty Renderer for later use
let Renderer;

// Establish a new scene
const SCENE = new THREE.Scene();

// Establish a new Sphere then add it to the scene
const SPHERE = new THREE.Mesh(
	new THREE.SphereGeometry(1, 200, 200),
	new THREE.ShaderMaterial({
		uniforms: {
			  color1: {value: new THREE.Color("#FF0022")},
			  color2: {value: new THREE.Color("#A200FF")}
		},
		vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
		fragmentShader: `uniform vec3 color1, color2; varying vec2 vUv; void main() { gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0); }`
	})
);
SPHERE.position.set(1.5, 0, 1);
SPHERE.rotation.set(0, 0, 2)
SCENE.add(SPHERE);

// Establish a new perspective camera and set it's position
const CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5);
CAMERA.position.z = 4;

// The animate() function is used to manipulate the sphere,
// adding noise to it's vertices which in return gives it
// that wavy kind of look.
const animate = async () => {
	// three.js animation function
	requestAnimationFrame(animate);

	// The Sphere's "Wave" Variables
	const SPEED = performance.now() * 0.0002;

	// Iterate over the spheres vertices
	for (let i = 0; i < SPHERE.geometry.vertices.length; i++) {
		var v = SPHERE.geometry.vertices[i];
		v.normalize().multiplyScalar(
			1 + noise.perlin3(v.x + SPEED, v.y, v.z)
		);
	}

	// Update the vertices and render the new sphere
	SPHERE.geometry.verticesNeedUpdate = true;

	// Render scene and camera
	Renderer.render(SCENE, CAMERA);
};

// The resize() function is used to resize the scene.
// This is required for if the user resizes the site,
// which is caught using the Window Resize Listener
export const resize = async () => {
	// Set the pixel ratio
	Renderer.setPixelRatio(window.devicePixelRatio);
	// Set the screen size
	Renderer.setSize(window.innerWidth, window.innerHeight);
	// Set the camera aspect ratio (most likely 16:9)
	CAMERA.aspect = window.innerWidth / window.innerHeight;
	// Update projection matrix
	CAMERA.updateProjectionMatrix();
};
// Window Resize Listener
window.addEventListener('resize', resize);

// The setScene() function is the primary function
// for updating the sphere's scene data.
export const setScene = async (canvas) => {
	// Render the new scene
	Renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
	// Change the Scene background-color to gray
	Renderer.setClearColor("#000000");
	// Size the scene
	await resize();
	// Animate the sphere
	await animate();
};
