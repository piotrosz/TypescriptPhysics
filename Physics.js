/// <reference path="typings/cannon.d.ts" />
var CannonjsStart;
(function (CannonjsStart) {
    var Physics = (function () {
        function Physics() {
            this.timeStep = 1.0 / 60.0;
            this.world = new CANNON.World();
            this.init();
        }
        Physics.prototype.stepWorld = function () {
            this.world.step(this.timeStep);
        };
        Physics.prototype.init = function () {
            var ballMaterial = new CANNON.Material("ballMaterial");
            var physicsContactMaterial = new CANNON.ContactMaterial(ballMaterial, ballMaterial, {
                friction: 0,
                restitution: 0.8
            });
            this.world.broadphase = new CANNON.NaiveBroadphase();
            this.world.gravity.set(0, 0, -90.82);
            this.world.addContactMaterial(physicsContactMaterial);
            var radius = 1;
            this.body = new CANNON.Body({
                mass: 50,
                position: new CANNON.Vec3(0, 0, window.innerHeight)
            });
            this.body.addShape(new CANNON.Sphere(radius));
            this.body.material = ballMaterial;
            this.world.addBody(this.body);
            var groundBody = new CANNON.Body({ mass: 0 });
            var groundShape = new CANNON.Plane();
            groundBody.addShape(groundShape);
            groundBody.material = ballMaterial;
            this.world.addBody(groundBody);
        };
        return Physics;
    })();
    CannonjsStart.Physics = Physics;
})(CannonjsStart || (CannonjsStart = {}));
