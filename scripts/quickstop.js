/*
name: QuickStop
author: wallhacks & Shoffli
*/

const w = new KeyBind(17)
const a = new KeyBind(30)
const s = new KeyBind(31)
const d = new KeyBind(32)

breeze.registerModule('QuickStop', 'Immediately stops all movement when you release wasd.', {
    inAir: new BooleanSetting('InAir', 'Also stops your movement while you are in the air.', false),
    combatOnly: new BooleanSetting('CombatOnly', 'Only insta stops you when you are in combat.', true),
    
    preMotion: function(event) {
        var moving = (w.isDown() || a.isDown() || s.isDown() || d.isDown())
        if (this.combatOnly.getValue()) {
            var found = false;
            for (var entity in world.getLivingEntities()) {
                if (mc.getPlayer().equals(world.getLivingEntities()[entity])) {
                    continue;
                }
                if (mc.getPlayer().getDistanceToEntity(world.getLivingEntities()[entity]) < 10) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                return;
            }
        }

        if (!this.inAir.getValue() && !mc.getPlayer().onGround()) {
            return;
        }
        if (!moving) {
            mc.getPlayer().setMotion(0, mc.getPlayer().getMotionY(), 0);
        }
    }
});