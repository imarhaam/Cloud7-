const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'owner',
    description: 'Bot owner info',
    execute(message, args) {
        const youtubeLink = 'https://youtube.com/@clashifiedEXE';
        const InstagramLink = 'https://instagram.com/clashifiedEXE';
        const embed = new EmbedBuilder()
            .setColor('#FFFFFF')
            .setTitle(' 🫅 Owner Info')
            .setDescription(`__**About me**__:\n 👋🏻  hey, i am arhaam <3 
🗣️  packgod 
👑 Interstellar Client
👩🏻‍💻 Professional Dev (Spigot, HTML, CSS) \n ❤️ [imarhaam / clashifiedEXE](${youtubeLink})\n 💙 [Atstreak](${InstagramLink})`)
            .setTimestamp();


        message.reply({ embeds: [embed] });
    },
};

