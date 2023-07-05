"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var phaser_1 = require("phaser");
var Preloader_1 = require("../scenes/Preloader");
var Game_1 = require("../scenes/Game");
var GameOver_1 = require("../scenes/GameOver");
var config = {
    type: phaser_1.default.AUTO,
    parent: 'app',
    width: 800,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        },
    },
    scene: [Preloader_1.default, Game_1.default, GameOver_1.default],
};
exports.default = new phaser_1.default.Game(config);
