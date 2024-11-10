/*
name: BlatantAura
author: Shoffli
*/

breeze.registerModule("BlatantAura", "A very blatant aura.", {
  mode: new ModeSetting('Mode', 'The mode to use.', 'Normal', ['Normal', 'Switch']),
  lockView: new BooleanSetting('LockView', 'Locks the view on the target.', false),
  delay: new IntSetting('Delay', 'The attack speed delay.', 50, 0, 1000),
  reach: new DoubleSetting('Reach', 'The reach to hit in.', 3, 0, 6),
  targetSwitchDelay: new IntSetting('SwitchDelay', 'The delay between switching targets.', 0, 0, 2000),

  lastAttackTime: 0,
  lastTargetSwitchTime: 0,
  targets: [],
  targetIndex: 0,
  target: null,

  tick: function() {
    var player = mc.getPlayer();
    if (!player) return;
    
    if (this.mode.is('Switch')) {
      this.lockView.setHidden(false);
      this.targetSwitchDelay.setHidden(false);
    } else {
      this.lockView.setHidden(true);
      this.targetSwitchDelay.setHidden(true);
    }

    if (this.mode.is('Normal')) {
      var players = world.getPlayers();
      var playersInRange = [];

      for (var i = 0; i < players.length; i++) {
        var dist = this.getReach(player, players[i]);
        if (dist <= this.reach.getValue() && players[i].getEntityId()!== player.getEntityId()) {
          playersInRange.push(players[i]);
        }
      }

      if (playersInRange.length > 0) {
        var attackDelay = this.delay.getValue();
        var currentTime = new Date().getTime();
        if (currentTime - this.lastAttackTime >= attackDelay) {
          for (var i = 0; i < playersInRange.length; i++) {
            player.swingItem();
            playerController.attackEntity(playersInRange[i]);
          }
          this.lastAttackTime = currentTime;
        }
      }
    } else if (this.mode.is('Switch')) {
      var players = world.getPlayers();
      this.targets = [];

      for (var i = 0; i < players.length; i++) {
        if (players[i].getEntityId()!== player.getEntityId()) {
          var dist = this.getReach(player, players[i]);
          if (dist <= this.reach.getValue()) {
            this.targets.push(players[i]);
          }
        }
      }

      if (this.targets.length === 0) {
        this.target = null;
        return;
      }

      if (new Date().getTime() - this.lastTargetSwitchTime >= this.targetSwitchDelay.getValue()) {
        this.targetIndex = (this.targetIndex + 1) % this.targets.length;
        this.target = this.targets[this.targetIndex];
        this.lastTargetSwitchTime = new Date().getTime();
      }

      if (this.target!== null) {
        var dist = this.getReach(player, this.target);
        if (dist > this.reach.getValue()) {
          this.target = null;
        } else {
          var attackDelay = this.delay.getValue();
          var currentTime = new Date().getTime();
          if (currentTime - this.lastAttackTime >= attackDelay) {
            player.swingItem();
            playerController.attackEntity(this.target);
            this.lastAttackTime = currentTime;
          }
        }
      }
    }
  },

  render3D: function(event) {
    var player = mc.getPlayer();
    if (!player) return;
    if (this.mode.is('Switch') && this.target!== null) {
      var targetPos = this.target.getPosition();
      var playerPos = new Vec3(player.getX(), player.getY(), player.getZ());
      
      var rotation = mathUtil.calcRotation(playerPos, targetPos);
      if (this.lockView.getValue()) {
        player.setYaw(rotation[0]);
        player.setPitch(rotation[1]);
      } else {
        player.setYaw(player.getYaw());
        player.setPitch(player.getPitch());
      }
    } else {
      player.setYaw(player.getYaw());
      player.setPitch(player.getPitch());
    }
  },

  getReach: function(player, target) {
    var playerPos = new Vec3(player.getX(), player.getY(), player.getZ());
    var targetPos = new Vec3(target.getX(), target.getY(), target.getZ());
    return (playerPos.distanceTo(targetPos) -0.4);
  }
});