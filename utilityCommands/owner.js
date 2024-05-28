const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'owner',
    description: 'Bot owner info',
    execute(message, args) {
        const youtubeLink = 'https://youtube.com/@arhaaam';
        const InstagramLink = 'https://instagram.com/qrhaaam';
        const embed = new EmbedBuilder()
            .setColor('#FFFFFF')
            .setTitle(' 🫅 Owner Info')
            .setDescription(`__**About me**__:\n 👋🏻  hey, i am arhaam <3 
🗣️  Erin's Personal Slave
👑 CloudMC
👩🏻‍💻 Professional Dev (Spigot, HTML, CSS) \n ❤️ [arhaaam](${youtubeLink})\n 💙 [Atstreak](${InstagramLink})`)
            .setTimestamp();


        message.reply({ embeds: [embed] });
    },
};

