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
var RocketMouse_1 = require("../game/RocketMouse");
var LaserObstacle_1 = require("../game/LaserObstacle");
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super.call(this, 'game') || this;
        _this.bookcases = [];
        _this.windows = [];
        _this.score = 0;
        return _this;
    }
    Game.prototype.init = function () {
        this.score = 0;
    };
    Game.prototype.preload = function () {
        this.load.image('background', 'house/bg_repeat_340x640.png');
        this.load.atlas('rocket-mouse', 'characters/rocket-mouse.png', 'characters/rocket-mouse.json');
    };
    Game.prototype.create = function () {
        var width = this.scale.width;
        var height = this.scale.height;
        this.background = this.add.tileSprite(0, 0, width, height, TextureKeys_1.default.Background)
            .setOrigin(0, 0)
            .setScrollFactor(0, 0);
        this.mouseHole = this.add.image(phaser_1.default.Math.Between(900, 1500), 501, TextureKeys_1.default.MouseHole);
        this.window1 = this.add.image(phaser_1.default.Math.Between(900, 1300), 200, TextureKeys_1.default.Window1);
        this.window2 = this.add.image(phaser_1.default.Math.Between(1600, 2000), 200, TextureKeys_1.default.Window2);
        this.windows = [this.window1, this.window2];
        this.bookcase1 = this.add.image(phaser_1.default.Math.Between(2200, 2700), 580, TextureKeys_1.default.Bookcase1);
        this.bookcase2 = this.add.image(phaser_1.default.Math.Between(2900, 3400), 580, TextureKeys_1.default.Bookcase2)
            .setOrigin(0.5, 1);
        this.bookcases = [this.bookcase1, this.bookcase2];
        this.laserObstacle = new LaserObstacle_1.default(this, 900, 100);
        this.add.existing(this.laserObstacle);
        this.coins = this.physics.add.staticGroup();
        this.spawnCoins();
        var mouse = new RocketMouse_1.default(this, width * 0.5, height - 30);
        this.add.existing(mouse);
        var body = mouse.body;
        body.setCollideWorldBounds(true);
        body.setVelocityX(200);
        this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 55);
        this.cameras.main.startFollow(mouse);
        this.cameras.main.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);
        this.physics.add.overlap(this.laserObstacle, mouse, this.handleOverlapLaser, undefined, this);
        this.physics.add.overlap(this.coins, mouse, this.handleCollectCoin, undefined, this);
        this.scoreLabel = this.add.text(10, 10, "Score: ".concat(this.score), {
            fontSize: '24px',
            color: '#080808',
            backgroundColor: '#F8E71C',
            shadow: { fill: true, blur: 0, offsetY: 0 },
            padding: { left: 15, right: 15, top: 10, bottom: 10 }
        })
            .setScrollFactor(0);
    };
    Game.prototype.spawnCoins = function () {
        var _this = this;
        this.coins.children.each(function (child) {
            var coin = child;
            _this.coins.killAndHide(coin);
            coin.body.enable = false;
        });
        var scrollX = this.cameras.main.scrollX;
        var rightEdge = scrollX + this.scale.width;
        var x = rightEdge + 100;
        var numCoins = phaser_1.default.Math.Between(1, 20);
        for (var i = 0; i < numCoins; ++i) {
            var coin = this.coins.get(x, phaser_1.default.Math.Between(100, this.scale.height - 100), TextureKeys_1.default.Coin);
            coin.setVisible(true);
            coin.setActive(true);
            var body = coin.body;
            body.setCircle(body.width * 0.5);
            body.enable = true;
            body.updateFromGameObject();
            x += coin.width * 1.5;
        }
    };
    Game.prototype.handleCollectCoin = function (obj1, obj2) {
        var coin = obj2;
        this.coins.killAndHide(coin);
        coin.body.enable = false;
        ++this.score;
        this.scoreLabel.text = "Score: ".concat(this.score);
    };
    Game.prototype.handleOverlapLaser = function (obj1, obj2) {
        var mouse = obj2;
        mouse.kill();
    };
    Game.prototype.wrapMouseHole = function () {
        var scrollX = this.cameras.main.scrollX;
        var rightEdge = scrollX + this.scale.width;
        if (this.mouseHole.x + this.mouseHole.width < scrollX) {
            this.mouseHole.x = phaser_1.default.Math.Between(rightEdge + 100, rightEdge + 1000);
        }
    };
    Game.prototype.wrapWindows = function () {
        var _this = this;
        var scrollX = this.cameras.main.scrollX;
        var rightEdge = scrollX + this.scale.width;
        var width = this.window1.width * 2;
        if (this.window1.x + width < scrollX) {
            this.window1.x = phaser_1.default.Math.Between(rightEdge + width, rightEdge + width + 800);
            var overlap = this.bookcases.find(function (bc) {
                return Math.abs(_this.window1.x - bc.x) <= _this.window1.
                    width;
            });
            this.window1.visible = !overlap;
        }
        width = this.window2.width;
        if (this.window2.x + width < scrollX) {
            this.window2.x = phaser_1.default.Math.Between(this.window1.x + width, this.window1.x + width + 800);
            var overlap = this.bookcases.find(function (bc) {
                return Math.abs(_this.window2.x - bc.x) <= _this.window2.width;
            });
            this.window2.visible = !overlap;
        }
    };
    Game.prototype.wrapBookcases = function () {
        var _this = this;
        var scrollX = this.cameras.main.scrollX;
        var rightEdge = scrollX + this.scale.width;
        var width = this.bookcase1.width * 2;
        if (this.bookcase1.x + width < scrollX) {
            this.bookcase1.x = phaser_1.default.Math.Between(rightEdge + width, rightEdge + width + 800);
            var overlap = this.windows.find(function (win) {
                return Math.abs(_this.bookcase1.x - win.x) <= _this.bookcase1.width;
            });
            this.bookcase1.visible = !overlap;
        }
        width = this.bookcase2.width;
        if (this.bookcase2.x + width < scrollX) {
            this.bookcase2.x = phaser_1.default.Math.Between(rightEdge + width, rightEdge + width + 800);
            var overlap = this.windows.find(function (win) {
                return Math.abs(_this.bookcase2.x - win.x) <= _this.bookcase2.width;
            });
            this.bookcase2.visible = !overlap;
            this.spawnCoins();
        }
    };
    Game.prototype.wrapLaserObstacle = function () {
        var scrollX = this.cameras.main.scrollX;
        var rightEdge = scrollX + this.scale.width;
        var body = this.laserObstacle.body;
        var width = this.laserObstacle.width;
        if (this.laserObstacle.x + width < scrollX) {
            this.laserObstacle.x = phaser_1.default.Math.Between(rightEdge + width, rightEdge + width + 1000);
            this.laserObstacle.y = phaser_1.default.Math.Between(0, 300);
            body.position.x = this.laserObstacle.x + body.offset.x;
            body.position.y = this.laserObstacle.y;
        }
    };
    Game.prototype.update = function () {
        this.wrapMouseHole();
        this.wrapWindows();
        this.wrapLaserObstacle();
        this.wrapBookcases();
        this.background.setTilePosition(this.cameras.main.scrollX);
    };
    return Game;
}(phaser_1.default.Scene));
exports.default = Game;
