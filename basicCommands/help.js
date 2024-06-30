const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ButtonStyle } = require('discord.js');
const db = require("../mongodb");
module.exports = {
  name: 'help',
  aliases: ['hlp', 'h'],
  description: 'Shows a list of available commands',
  execute(message, args) {
    const botUser = message.client.user;
    const botPing = Date.now() - message.createdTimestamp;
    const serverCount = message.client.guilds.cache.size;
    const embed = new EmbedBuilder()
      .setColor('#2b71ec')
      .setAuthor({
        name: 'Im here to Help!',
        iconURL: 'https://cdn.discordapp.com/attachments/1175487983915376662/1175667506791325706/communication.png?ex=656c10b0&is=65599bb0&hm=e378f1b355a2401bcab504b08a0766001d6b7c090c91ce0a7a7a87c868feb955&', 
        url: 'https://discord.gg/FUEHs7RCqz'
    })
     
      .setDescription(`__**STATS :**__\n\n> **📊 Bot in servers:** ${serverCount}\n> **🟢 Bot Ping:** ${botPing}ms\n> **👑 Made By [arhaaam](https://www.youtube.com/@arhaaam)**\n\n__**COMMANDS :**__ `)
      .addFields(
        // Basic commands category
        {
          name: '▶️  Basic',
          value: '`avatar`, `owner`, `support`, `invite`, `userinfo`',
          inline: true,
        },
        // Music commands category
        {
          name: '▶️  Music',
          value: '`play`, `stop`, `history`,`volume`,`pause`,`resume`,`247`',
          inline: true,
        },
        //fun category
        {
          name: '▶️  Fun',
          value: ' `ascii`, `joke`, `meme`, `roll`, `animecommands`',
          inline: true,
        },
        //image category
        {
          name: '▶️  Image',
          value: '`cat`, `dog`, `panda`',
          inline: true,
        },
        //anime category
        {
          name: '▶️  Anime',
          value: '`hug`, `slap`, `pat`, `kiss`',
          inline: true,
        },
        // Utility commands category
        {
          name: '▶️  Utility',
          value: '`kick`, `ban`, `serverinfo`, `clear`, `uptime`',
          inline: true,
        }
      )
      .setThumbnail(botUser.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
      .setImage(`https://media.discordapp.net/attachments/1203668832166744095/1231130256279076886/GojoSatoru.pg.png?ex=6635d666&is=66236166&hm=108466e8fe85125879f6eabf6c3592b43403786ec9b17d4879d3470aa29a098d&=&format=webp&quality=lossless&width=1365&height=597`);

    const button1 = new ButtonBuilder()
      .setLabel('Discord')
      .setURL('https://dsc.gg/dankgc')
      .setStyle(ButtonStyle.Link);
      
    const row = new ActionRowBuilder()
      .addComponents(button1);
    
    message.reply({ embeds: [embed], components: [row] });
  },
};
