/*
name: Timer
author: Shoffli & Boru
*/

breeze.registerModule('Timer', 'Changes the game speed.', {
    gamespeed: new DoubleSetting('GameSpeed', 'How fast the game runs.', 1, 0.01, 100.0),
    tick: function(event) {
        mc.setTimerSpeed(this.gamespeed.getValue());
    },
    disable: function() {
        mc.setTimerSpeed(1);
    }
});