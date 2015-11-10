/// <reference path="typings/three.d.ts" />
/// <reference path="typings/cannon.d.ts" />
/// <reference path="typings/jquery/jquery.d.ts" />
/// <reference path="Physics.ts" />
/// <reference path="Three.ts" />
var CannonjsThreejsStart;
(function (CannonjsThreejsStart) {
    var Simulation = (function () {
        function Simulation() {
        }
        Simulation.prototype.animate = function () {
            var _this = this;
            requestAnimationFrame(function () { return _this.animate(); });
            this.updatePhysics();
            this.three.render();
        };
        Simulation.prototype.updatePhysics = function () {
            this.physics.stepWorld();
            var body = this.physics.body;
            this.three.setFlyingObjectPosition(new THREE.Vector3(body.position.x, body.position.y, body.position.z), new THREE.Quaternion(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.z));
        };
        Simulation.prototype.go = function () {
            this.physics = new CannonjsStart.Physics();
            this.three = new ThreejsStart.Three();
            this.animate();
        };
        return Simulation;
    })();
    CannonjsThreejsStart.Simulation = Simulation;
})(CannonjsThreejsStart || (CannonjsThreejsStart = {}));
$(function () {
    new CannonjsThreejsStart.Simulation().go();
});
