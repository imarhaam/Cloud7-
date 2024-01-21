const figlet = require('figlet');
const { EmbedBuilder } = require('discord.js');
const db = require("../mongodb");

module.exports = {
    name: 'ascii',
    description: 'Convert text into ASCII art',
    execute(message, args) {
        const text = args.join(' ');

        figlet.text(text, (error, result) => {
            if (error) {
                console.error('Error:', error);
                return;
            }

            message.reply('```' + result + '```');
        });
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








