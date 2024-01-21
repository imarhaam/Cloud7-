
const { EmbedBuilder } = require('discord.js');
const { getPlayer } = require('./play');

module.exports = {
  name: 'volume',
  description: 'Adjust the volume of the bot',
  execute: async (message, args) => {
    const volume = parseFloat(args[0]);

    if (isNaN(volume) || volume < 0 || volume > 100) {
      return message.reply('❌ Please provide a valid volume level between 0 and 100.');
    }
    const player = getPlayer();

    if (!player) {
      return message.reply('❌ No music is currently playing.');
    }
    const resource = player.state.resource;

    if (!resource) {
      return message.reply('❌ No audio resource found.');
    }
    resource.volume.setVolume(volume / 100);

    const embed = new EmbedBuilder()
      .setColor('#2b71ec')
     .setAuthor({
          name: 'Volume Control!',
          iconURL: 'https://cdn.discordapp.com/attachments/1175488636033175602/1175488721546645624/volume.png?ex=656b6a2e&is=6558f52e&hm=8215d2f88ab073db1f3b6438c28fd73315ad7e581bb54000dbb06fca387cecf7&',
          url: 'https://discord.gg/FUEHs7RCqz'
        })
      .setDescription(`**volume engaged to ${volume}%**`);

    message.reply({ embeds: [embed] });
  },
};
