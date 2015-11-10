/// <reference path="typings/three.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
var ThreejsStart;
(function (ThreejsStart) {
    var Three = (function () {
        function Three() {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.init();
        }
        Three.prototype.render = function () {
            this.renderer.render(this.scene, this.camera);
        };
        Three.prototype.setFlyingObjectPosition = function (position, quaternion) {
            this.flyingObject.position.copy(position);
            this.flyingObject.quaternion.copy(quaternion);
        };
        Three.prototype.init = function () {
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
        };
        Three.prototype.createCube = function () {
            var cubeGeometry = new THREE.CubeGeometry(100, 100, 100);
            var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
            var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            cube.rotation.y = Math.PI * 45 / 180;
            return cube;
        };
        Three.prototype.createBall = function () {
            var ballGeometry = new THREE.SphereGeometry(50);
            var ballMaterial = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
            var ball = new THREE.Mesh(ballGeometry, ballMaterial);
            return ball;
        };
        Three.prototype.createCamera = function () {
            var camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 10000);
            camera.position.y = 160;
            camera.position.z = 400;
            return camera;
        };
        Three.prototype.createSkybox = function () {
            var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
            var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
            var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
            return skybox;
        };
        return Three;
    })();
    ThreejsStart.Three = Three;
})(ThreejsStart || (ThreejsStart = {}));
