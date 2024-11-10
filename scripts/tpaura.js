/*
name: TPAura
author: Shoffli
*/

breeze.registerModule("TPAura", "Hits players above the range limit.", {

  lastAttackTime: 0,
  lastSwitchTime: 0,
  targets: [],
  currentTargetIndex: 0,
  midTeleportDelay: 0,
  midTeleportSteps: 0,
  midTeleportDX: 0,
  midTeleportDY: 0,
  midTeleportDZ: 0,
  midTeleportX: 0,
  midTeleportY: 0,
  midTeleportZ: 0,
  isMidTeleporting: false,
  targetLocation: null,
  originalPlayerLocation: null,

  tick: function() {
    var player = mc.getPlayer();
    if (!player) return;

    var players = world.getPlayers();
    this.targets = [];

    for (var i = 0; i < players.length; i++) {
      var entity = players[i];
      if (entity.getEntityId() === player.getEntityId()) continue;

      var entityPos = new Vec3(entity.getX(), entity.getY(), entity.getZ());
      var playerPos = new Vec3(player.getX(), player.getY(), player.getZ());

      if (!entityPos || !playerPos) continue;

      var dist = playerPos.distanceTo(entityPos);
      if (dist <= 100) {
        this.targets.push(entity);
      }
    }

    if (this.targets.length > 0) {
      var currentTime = new Date().getTime();
      if (currentTime - this.lastSwitchTime >= 0) {
        this.currentTargetIndex = (this.currentTargetIndex + 1) % this.targets.length;
        this.lastSwitchTime = currentTime;
      }

      var currentTarget = this.targets[this.currentTargetIndex];
      if (!currentTarget) return;

      this.targetLocation = currentTarget.getPosition();
      if (!this.targetLocation) return;

      var playerLocation = player.getPosition();
      if (!playerLocation) return;

      var dx = this.targetLocation.getX() - playerLocation.getX();
      var dy = this.targetLocation.getY() - playerLocation.getY();
      var dz = this.targetLocation.getZ() - playerLocation.getZ();

      var distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      var steps = Math.floor(distance / 8);

      if (currentTime - this.lastAttackTime >= 0 && !this.isMidTeleporting) {
        this.originalPlayerLocation = playerLocation; // Store the original player location
        this.midTeleportDelay = 0;
        this.midTeleportSteps = steps;
        this.midTeleportDX = dx / steps;
        this.midTeleportDY = dy / steps;
        this.midTeleportDZ = dz / steps;
        this.midTeleportX = playerLocation.getX();
        this.midTeleportY = playerLocation.getY();
        this.midTeleportZ = playerLocation.getZ();
        this.isMidTeleporting = true;
      }

      if (this.isMidTeleporting) {
        if (this.midTeleportDelay < this.midTeleportSteps) {
          var tpX = this.midTeleportX + this.midTeleportDX;
          var tpY = this.midTeleportY + this.midTeleportDY;
          var tpZ = this.midTeleportZ + this.midTeleportDZ;

          breeze.sendPacket(new C04PacketPlayerPosition(tpX, tpY, tpZ, true), false);
          this.midTeleportX = tpX;
          this.midTeleportY = tpY;
          this.midTeleportZ = tpZ;
          this.midTeleportDelay++;

          return;
        } else {
          breeze.sendPacket(new C04PacketPlayerPosition(this.targetLocation.getX(), this.targetLocation.getY(), this.targetLocation.getZ(), true), false);

          player.swingItem();
          playerController.attackEntity(currentTarget);

          this.lastAttackTime = currentTime;

          var originalPlayerLocation = this.originalPlayerLocation;
          var dx = originalPlayerLocation.getX() - this.targetLocation.getX();
          var dy = originalPlayerLocation.getY() - this.targetLocation.getY();
          var dz = originalPlayerLocation.getZ() - this.targetLocation.getZ();

          var distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          var steps = Math.floor(distance / 8);

          this.midTeleportDelay = 0;
          this.midTeleportSteps = steps;
          this.midTeleportDX = dx / steps;
          this.midTeleportDY = dy / steps;
          this.midTeleportDZ = dz / steps;
          this.midTeleportX = this .targetLocation.getX();
          this.midTeleportY = this.targetLocation.getY();
          this.midTeleportZ = this.targetLocation.getZ();
          this.isMidTeleporting = true;

          return;
        }
      }
    }
  }
});