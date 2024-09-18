/*
name: TimerRange
author: PoulpyUwU :3
*/

breeze.registerModule("TimerRange", "Reach using timer", {
  mode: new ModeSetting("Mode", "The mode to use.", "Normal", [
    "Normal",
    "TimerBalance compliant",
  ]),
  distance: new DoubleSetting("Distance", "The distance to start.", 3.2, 0, 6),
  timerValue: new DoubleSetting("Timer", "The distance to start.", 1.5, 1, 10),
  tickTimer: new IntSetting("Tick", "number of ticks to timer.", 1, 0, 4),
  tickSleep: new IntSetting(
    "Wait",
    "how many ticks should wait before UwUing again",
    100,
    50,
    1000,
  ),
  targets: [],
  targetIndex: 0,
  tickRest: 0,
  target: null,
  tickSleepActu: 0,
  tickBeforeCompl: 2,
  tickBeforeComplActu: 0,

  tick: function () {
    if (this.tickRest > 0) {
      this.tickRest--;
      if (this.tickRest == 0) {
        if (this.mode.getValue() == "TimerBalance compliant") {
          this.tickRest = -(this.tickTimer.getValue() + 1);
        }
        this.tickBeforeComplActu = this.tickBeforeCompl;
      }
      return;
    } else if (this.tickRest < 0) {
      if (this.tickBeforeComplActu > 0) {
        this.tickBeforeComplActu--;
        return;
      }
      mc.setTimerSpeed(0.1);
      breeze.log("complying with timerbalance");
      this.tickRest++;
      return;
    }
    if (this.tickSleepActu > 0) {
      mc.setTimerSpeed(1);
      this.tickSleepActu--;
      return;
    }
    var player = mc.getPlayer();
    if (!player) return;

    var players = world.getPlayers();
    var playersInRange = [];

    for (var i = 0; i < players.length; i++) {
      var dist = this.getReach(player, players[i]);
      if (players[i].getEntityId() !== player.getEntityId()) {
        if (
          dist + 0.1 > this.distance.getValue() &&
          dist - 0.1 < this.distance.getValue()
        ) {
          playersInRange.push(players[i]);
        }
      }
    }

    if (playersInRange.length == 1) {
      this.tickRest = this.tickTimer.getValue();
      mc.setTimerSpeed(this.timerValue.getValue());
      this.tickSleepActu = this.tickSleep.getValue();
    } else {
      mc.setTimerSpeed(1);
    }
  },

  getReach: function (player, target) {
    var playerPos = new Vec3(player.getX(), player.getY(), player.getZ());
    var targetPos = new Vec3(target.getX(), target.getY(), target.getZ());
    return playerPos.distanceTo(targetPos) - 0.4;
  },
});
