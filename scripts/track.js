/*
name: Track
author: Shoffli
*/

breeze.registerModule('Track', 'Locks your position on the nearest player.', {

  targetLocation: null,

  render3D: function() {
    var player = mc.getPlayer();
    if (!player) return;

    var players = world.getPlayers();
    var nearestPlayer = null;
    var nearestDistance = Infinity;

    for (var i = 0; i < players.length; i++) {
      var entity = players[i];
      if (entity.getEntityId() === player.getEntityId()) continue;

      var entityPos = new Vec3(entity.getX(), entity.getY(), entity.getZ());
      var playerPos = new Vec3(player.getX(), player.getY(), player.getZ());

      if (!entityPos || !playerPos) continue;

      var dist = playerPos.distanceTo(entityPos);
      if (dist < nearestDistance) {
        nearestPlayer = entity;
        nearestDistance = dist;
      }
    }

    if (nearestPlayer) {
      this.targetLocation = nearestPlayer.getPosition();
      if (!this.targetLocation) return;

      var distanceToTarget = playerPos.distanceTo(this.targetLocation);
      if (distanceToTarget < 10) {
        player.setPosition(this.targetLocation.getX(), this.targetLocation.getY(), this.targetLocation.getZ());
      }
    }
  }
});