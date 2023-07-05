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
var LaserObstacle = /** @class */ (function (_super) {
    __extends(LaserObstacle, _super);
    function LaserObstacle(scene, x, y) {
        var _this = _super.call(this, scene, x, y) || this;
        var top = scene.add.image(0, 0, TextureKeys_1.default.LaserEnd)
            .setOrigin(0.5, 0);
        var middle = scene.add.image(0, top.y + top.displayHeight, TextureKeys_1.default.LaserMiddle)
            .setOrigin(0.5, 0);
        middle.setDisplaySize(middle.width, 200);
        var bottom = scene.add.image(0, middle.y + middle.displayHeight, TextureKeys_1.default.LaserEnd)
            .setOrigin(0.5, 0)
            .setFlipY(true);
        _this.add(top);
        _this.add(middle);
        _this.add(bottom);
        scene.physics.add.existing(_this, true);
        var body = _this.body;
        var width = top.displayWidth;
        var height = top.displayHeight + middle.displayHeight + bottom.displayHeight;
        body.setSize(width * 0.5, height * 0.7);
        body.setOffset(-width * 0.3, 0);
        body.position.x = _this.x + body.offset.x;
        body.position.y = _this.y;
        return _this;
    }
    return LaserObstacle;
}(phaser_1.default.GameObjects.Container));
exports.default = LaserObstacle;
