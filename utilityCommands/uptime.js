const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'uptime',
  description: 'Sends the bot\'s uptime to the advertising channel.',
  execute(message, args) {
    // Replace 'YOUR_ADVERTISING_CHANNEL_ID' with the actual ID of your advertising channel
    const advertisingChannelId = '1129242309175816294';

    // Check if the message was sent in the advertising channel
    if (message.channel.id !== advertisingChannelId) {
      return message.reply('This command can only be used in the advertising channel.');
    }

    // Send bot uptime as an embedded message to the advertising channel
    sendUptimeMessage(message.client, advertisingChannelId);

    // Set up a timer to send the uptime message every 1 hour (3600000 ms)
    setInterval(() => {
      sendUptimeMessage(message.client, advertisingChannelId);
    }, 100000); // 1 hour interval (3600000 ms)
  },
};

// Function to get the bot's uptime
function getBotUptime() {
  const totalSeconds = process.uptime();
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

// Function to send the uptime message as an embedded message to the specified channel
function sendUptimeMessage(client, channelId) {
  const advertisingChannel = client.channels.cache.get(channelId);
  if (advertisingChannel) {
    const uptime = getBotUptime();

    // Create an embedded message
    const embed = new EmbedBuilder()
      .setColor('#FFFFFF')
      .setTitle('uptime')
      .setDescription(`▶️ Bot uptime: ${uptime}`);

    // Send the embedded message to the advertising channel
    advertisingChannel.send({ embeds: [embed] });
  }
}

