/// <reference path="typings/three.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />

module ThreejsStart {
	export class Three {	
		private width = window.innerWidth;
		private height = window.innerHeight;
		//clock = new THREE.Clock();
		private renderer: THREE.WebGLRenderer;
		private scene: THREE.Scene;
		private camera: THREE.Camera;
		private flyingObject: THREE.Mesh;
		
		constructor() {
			this.init();
		}
		
		public render() {
			 this.renderer.render(this.scene, this.camera);
		}
		
		public setFlyingObjectPosition(position: THREE.Vector3, quaternion: THREE.Quaternion) {
			this.flyingObject.position.copy(position);
			this.flyingObject.quaternion.copy(quaternion);
		}
		
		private init() {
			this.renderer = new THREE.WebGLRenderer({ antialias: true });
			this.renderer.setSize(this.width, this.height);
			document.body.appendChild(this.renderer.domElement);
			this.scene = new THREE.Scene();
			this.flyingObject = this.createBall();
			//this.flyingObject.rotation.y -= clock.getDelta()
			this.scene.add(this.flyingObject);
			this.camera = this.createCamera();
			this.scene.add(this.camera);
			this.camera.lookAt(this.flyingObject.position);
			this.scene.add(this.createSkybox());
			
			var pointLight = new THREE.PointLight(0xffffff);
			pointLight.position.set(0, 300, 200);
			this.scene.add(pointLight);
		}
		
		private createCube() {
			var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
			var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
			var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
			cube.rotation.y = Math.PI * 45 / 180;
			return cube;		
		}
	
		private createBall() {
			var ballGeometry = new THREE.SphereGeometry(50);
			var ballMaterial = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
			var ball = new THREE.Mesh(ballGeometry, ballMaterial);
			return ball;
		}
	
		private createCamera() {
			var camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 10000)
			camera.position.y = 160;
			camera.position.z = 400;
			return camera;
		}
	
		private createSkybox() {
			var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
			var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
			var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
			return skybox;
		}
	}
}
