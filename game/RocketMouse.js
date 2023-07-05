"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MouseState;
(function (MouseState) {
    MouseState[MouseState["Running"] = 0] = "Running";
    MouseState[MouseState["Killed"] = 1] = "Killed";
    MouseState[MouseState["Dead"] = 2] = "Dead";
})(MouseState || (MouseState = {}));
var phaser_1 = require("phaser");
var TextureKeys_1 = require("../consts/TextureKeys");
var AnimationKeys_1 = require("../consts/AnimationKeys");
var SceneKeys_1 = require("../consts/SceneKeys");
var RocketMouse = /** @class */ (function (_super) {
    __extends(RocketMouse, _super);
    function RocketMouse(scene, x, y) {
        var _this = _super.call(this, scene, x, y) || this;
        _this.mouseState = MouseState.Running;
        _this.mouse = scene.add.sprite(0, 0, TextureKeys_1.default.RocketMouse)
            .setOrigin(0.5, 1)
            .play(AnimationKeys_1.default.RocketMouseRun);
        _this.flames = scene.add.sprite(-63, -15, TextureKeys_1.default.RocketMouse)
            .play(AnimationKeys_1.default.RocketFlamesOn);
        _this.enableJetpack(false);
        _this.add(_this.flames);
        _this.add(_this.mouse);
        scene.physics.add.existing(_this);
        var body = _this.body;
        body.setSize(_this.mouse.width * 0.5, _this.mouse.height * 0.7);
        body.setOffset(_this.mouse.width * -0.3, -_this.mouse.height + 15);
        _this.cursors = scene.input.keyboard.createCursorKeys();
        return _this;
    }
    RocketMouse.prototype.enableJetpack = function (enabled) {
        this.flames.setVisible(enabled);
    };
    RocketMouse.prototype.kill = function () {
        if (this.mouseState !== MouseState.Running) {
            return;
        }
        this.mouseState = MouseState.Killed;
        this.mouse.play(AnimationKeys_1.default.RocketMouseDead);
        var body = this.body;
        body.setAccelerationY(0);
        body.setVelocity(1000, 0);
        this.enableJetpack(false);
    };
    RocketMouse.prototype.preUpdate = function () {
        var _a;
        var body = this.body;
        switch (this.mouseState) {
            case MouseState.Running:
                {
                    if ((_a = this.cursors.space) === null || _a === void 0 ? void 0 : _a.isDown) {
                        body.setAccelerationY(-800);
                        this.enableJetpack(true);
                        this.mouse.play(AnimationKeys_1.default.RocketMouseFly, true);
                    }
                    else {
                        body.setAccelerationY(0);
                        this.enableJetpack(false);
                    }
                    if (body.blocked.down) {
                        this.mouse.play(AnimationKeys_1.default.RocketMouseRun, true);
                    }
                    else if (body.velocity.y > 0) {
                        this.mouse.play(AnimationKeys_1.default.RocketMouseFall, true);
                    }
                    break;
                }
            case MouseState.Killed:
                {
                    body.velocity.x *= 0.99;
                    if (body.velocity.x <= 5) {
                        this.mouseState = MouseState.Dead;
                        this.scene.scene.run(SceneKeys_1.default.GameOver);
                        break;
                    }
                }
        }
    };
    return RocketMouse;
}(phaser_1.default.GameObjects.Container));
exports.default = RocketMouse;
