const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const db = require("../mongodb");
module.exports = {
  name: 'panda',
  aliases: ['randompanda', 'pandapic'],
  description: 'Displays a random panda image',
  async execute(message, args) {
    try {
      const response = await axios.get('https://some-random-api.ml/img/panda');
      const imageUrl = response.data.link;

      if (!imageUrl) {
        throw new Error('Failed to fetch panda image.');
      }

      const embed = new MessageEmbed()
        .setColor('#000000')
        .setTitle('Random Panda Image 🐼')
        .setImage(imageUrl);

      // Reply to the user who executed the command
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching panda image:', error);
      // Reply to the user who executed the command
      message.reply('Sorry, I couldn\'t fetch a panda image at the moment.');
    }
  },
};
