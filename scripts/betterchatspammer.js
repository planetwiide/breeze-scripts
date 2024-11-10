/*
name: BetterChatSpammer
author: surge & Shoffli
*/

const timer = new Timer();

breeze.registerModule('ChatSpammer', 'Spams the chat with a message.', {

    message: new StringSetting('Message', 'The message to spam.', 'breeze.rip/buy/shoffli', 32),
    delay: new DoubleSetting('Delay', 'The delay between messages (in seconds).', 5, 0, 60),
    bypass: new BooleanSetting('Bypass', 'If numbers should be added.', false),

    tick: function(event) {
        const randomNumber = Math.floor(Math.random() * 9999);
        if (timer.hasPassed(this.delay.getValue() * 1000)) {
            if (this.bypass.getValue()) {
                breeze.sendPacket(new C01PacketChatMessage(this.message.getValue() + ' ' + randomNumber), false);
            } else {
                breeze.sendPacket(new C01PacketChatMessage(this.message.getValue()), false);
            }
            timer.reset();
        }
    }

});