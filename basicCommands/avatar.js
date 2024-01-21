const { EmbedBuilder } = require('discord.js');
const db = require("../mongodb");

module.exports = {
	name: 'avatar',
    aliases: ['profilepic', 'pfp', 'av'],
	description: 'sends user avatar',
    execute(message, args) {
        const user = message.mentions.users.first() || message.author;
        const avatar = user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 });
		
        const embed = new EmbedBuilder()
            .setColor('#FFFFFF')
            .setTitle(`${user.username}'s Avatar`)
            .setImage(avatar);

		
		
		
		message.reply({ embeds: [embed] });
	},
};

/*

   MADE BY RTX!! FEEL FREE TO USE ANY PART OF CODE

  ██████╗░████████╗██╗░░██╗           
  ██╔══██╗╚══██╔══╝╚██╗██╔╝          
  ██████╔╝░░░██║░░░░╚███╔╝░          
  ██╔══██╗░░░██║░░░░██╔██╗░          
  ██║░░██║░░░██║░░░██╔╝╚██╗          
  ╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝          

   FOR EMOJIS EITHER YOU CAN EDIT OR JOIN OUR DISCORD SERVER 
   SO WE ADD BOT TO OUR SERVER SO YOU GET ANIMATED EMOJIS.

   DISCORD SERVER : https://discord.gg/FUEHs7RCqz
   YOUTUBE : https://www.youtube.com/channel/UCPbAvYWBgnYhliJa1BIrv0A

   FOR HELP CONTACT ME ON DISCORD
   ## Contact    [ DISCORD SERVER :  https://discord.gg/c4kaW2sSbm ]
*/