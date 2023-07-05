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
var SceneKeys_1 = require("../consts/SceneKeys");
var GameOver = /** @class */ (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        return _super.call(this, SceneKeys_1.default.GameOver) || this;
    }
    GameOver.prototype.create = function () {
        var _this = this;
        var _a = this.scale, width = _a.width, height = _a.height;
        var x = width * 0.5;
        var y = height * 0.5;
        this.add.text(x, y, 'Press Space to Play Again!', {
            fontSize: '32px',
            color: '#FFFFFF',
            backgroundColor: '#000000',
            shadow: { fill: true, blur: 0, offsetY: 0 },
            padding: { left: 15, right: 15, top: 10, bottom: 10 }
        })
            .setOrigin(0.5);
        this.input.keyboard.once('keydown-SPACE', function () {
            _this.scene.stop(SceneKeys_1.default.GameOver);
            _this.scene.stop(SceneKeys_1.default.Game);
            _this.scene.start(SceneKeys_1.default.Game);
        });
    };
    return GameOver;
}(phaser_1.default.Scene));
exports.default = GameOver;
