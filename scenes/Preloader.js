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
var phaser_1 = require("phaser");
var TextureKeys_1 = require("../consts/TextureKeys");
var SceneKeys_1 = require("../consts/SceneKeys");
var AnimationKeys_1 = require("../consts/AnimationKeys");
var Preloader = /** @class */ (function (_super) {
    __extends(Preloader, _super);
    function Preloader() {
        return _super.call(this, SceneKeys_1.default.Preloader) || this;
    }
    Preloader.prototype.preload = function () {
        this.load.image(TextureKeys_1.default.Background, 'house/bg_repeat_340x640.png');
        this.load.atlas(TextureKeys_1.default.RocketMouse, 'characters/rocket-mouse.png', 'characters/rocket-mouse.json');
        this.load.image(TextureKeys_1.default.MouseHole, 'house/object_mousehole.png');
        this.load.image(TextureKeys_1.default.Window1, 'house/object_window1.png');
        this.load.image(TextureKeys_1.default.Window2, 'house/object_window2.png');
        this.load.image(TextureKeys_1.default.Bookcase1, 'house/object_bookcase1.png');
        this.load.image(TextureKeys_1.default.Bookcase2, 'house/object_bookcase2.png');
        this.load.image(TextureKeys_1.default.LaserEnd, 'house/object_laser_end.png');
        this.load.image(TextureKeys_1.default.LaserMiddle, 'house/object_laser.png ');
        this.load.image(TextureKeys_1.default.Coin, 'house/object_coin.png');
    };
    Preloader.prototype.create = function () {
        this.anims.create({
            key: AnimationKeys_1.default.RocketMouseRun,
            frames: this.anims.generateFrameNames(TextureKeys_1.default.RocketMouse, {
                start: 1,
                end: 4,
                prefix: 'rocketmouse_run',
                zeroPad: 2,
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: AnimationKeys_1.default.RocketMouseFall,
            frames: [{
                    key: TextureKeys_1.default.RocketMouse,
                    frame: 'rocketmouse_fall01.png'
                }]
        });
        this.anims.create({
            key: AnimationKeys_1.default.RocketMouseFly,
            frames: [{
                    key: TextureKeys_1.default.RocketMouse,
                    frame: 'rocketmouse_fly01.png'
                }]
        });
        this.anims.create({
            key: AnimationKeys_1.default.RocketFlamesOn,
            frames: this.anims.generateFrameNames(TextureKeys_1.default.RocketMouse, {
                start: 1,
                end: 2,
                prefix: 'flame',
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: AnimationKeys_1.default.RocketMouseDead,
            frames: this.anims.generateFrameNames(TextureKeys_1.default.RocketMouse, {
                start: 1,
                end: 2,
                prefix: 'rocketmouse_dead',
                zeroPad: 2,
                suffix: '.png'
            }),
            frameRate: 10,
        });
        this.scene.start(SceneKeys_1.default.Game);
    };
    return Preloader;
}(phaser_1.default.Scene));
exports.default = Preloader;
