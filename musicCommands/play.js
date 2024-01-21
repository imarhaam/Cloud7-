
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  StreamType,
  AudioPlayerStatus,
  entersState,
  VoiceConnectionStatus,
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const YouTubeSearch = require('youtube-search');
const { EmbedBuilder } = require('discord.js');
const { updateHistory } = require('./historyUtils');
const config = require('../config.json');
const youtubeAPIKey = config.youtubeAPIKey;


let isPaused = false;
const youtubeSearchOptions = {
  maxResults: 1,
  key: youtubeAPIKey,
};

const queue = [];
let player;
let currentConnection; 
let currentMessage; 
function createPlayer() {
  if (!player) {
    player = createAudioPlayer();
    player.on(AudioPlayerStatus.Idle, async () => {
      await playNextSong(currentConnection, currentMessage);
    });
  }
}


function enqueue(song) {
  queue.push(song);
}


function dequeue() {
  return queue.shift();
}


async function playNextSong(connection, message) {
  if (queue.length > 0) {
    const nextSong = dequeue();
    await playSong(connection, nextSong.searchQuery, nextSong.message);
  } else {
    if (!connection.destroyed) {
      connection.destroy();
    }
    message.reply('**✨ Queue is empty! Leaving voice channel...**');
  }
}


async function playSong(connection, searchQuery, message) {
  createPlayer(); 

  player.pause();

  let searchResult;
  try {
    searchResult = await YouTubeSearch(searchQuery, youtubeSearchOptions);
  } catch (error) {
    console.error(error);
    return message.reply('❌ There was an error searching for the song.');
  }

  if (!searchResult || !searchResult.results.length) {
    return message.reply('❌ No search results found for the provided query.');
  }

  const video = searchResult.results[0];
  const youtubeLink = `https://www.youtube.com/watch?v=${video.id}`;

  const stream = ytdl(youtubeLink, { filter: 'audioonly' });
  const resource = createAudioResource(stream, {
    inputType: StreamType.Arbitrary,
    inlineVolume: true,
  });

  player.play(resource);
  connection.subscribe(player);

  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 20_000);
    await entersState(player, AudioPlayerStatus.Playing, 20_000);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: 'Currently playing a Track',
        iconURL: 'https://cdn.discordapp.com/attachments/1140841446228897932/1144671132948103208/giphy.gif', 
        url: 'https://discord.gg/FUEHs7RCqz'
      })
      .setDescription(`\n ‎ \n▶️ **Details :** [${video.title}](${youtubeLink})\n▶️ **Enjoy the Ultimate YouTube Music Experience ** \n▶️ **If link breaks playback try to give query**`)
      .setImage(video.thumbnails.high.url) 
      .setColor('#2b71ec')
      .setFooter({ text: 'More info - Use Help command Default : ?help' });

    message.reply({ embeds: [embed] });

    updateHistory({ title: video.title, link: youtubeLink });
  } catch (error) {
    console.error(error);
    if (!connection.destroyed) {
      connection.destroy();
    }
    message.reply('🔴 There was an error playing the music.');
  }
}


function pausePlayback() {
  if (player && player.state.status === AudioPlayerStatus.Playing) {
    player.pause();
    isPaused = true;

    const embed = new EmbedBuilder()
      .setAuthor({
          name: 'Playback Paused!',
          iconURL: 'https://cdn.discordapp.com/attachments/1175488636033175602/1175488720519049337/pause.png?ex=656b6a2e&is=6558f52e&hm=6695d8141e37330b5426f146ec6705243f497f95f08916a40c1db582c6e07d7e&',
          url: 'https://discord.gg/FUEHs7RCqz'
        })
      .setDescription('**Halt the beats! Music taking a break..**')
      .setColor('#2b71ec');

    currentMessage.reply({ embeds: [embed] });
  } else {
    currentMessage.reply('❌ The bot is not currently playing any music.');
  }
}

function resumePlayback() {
  if (player && player.state.status === AudioPlayerStatus.Paused) {
    player.unpause();
    isPaused = false;

    const embed = new EmbedBuilder()
       .setAuthor({
          name: 'Playback Resumed!',
          iconURL: 'https://cdn.discordapp.com/attachments/1175488636033175602/1175488720762310757/play.png?ex=656b6a2e&is=6558f52e&hm=ae4f01060fe8ae93f062d6574ef064ca0f6b4cf40b172f1bd54d8d405809c7df&',
          url: 'https://discord.gg/FUEHs7RCqz'
        })
      .setDescription('**Back in action! Let the beats roll..**')
      .setColor('#2b71ec');
    currentMessage.reply({ embeds: [embed] });
  } else {
    currentMessage.reply('❌ The bot is not currently paused.');
  }
}


module.exports = {
  name: 'play',
  description: 'Play music from YouTube',
  execute: async (message, args) => {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('**⚠️ You need to be in a voice channel!**');
    }

    const searchQuery = args.join(' ');
    if (!searchQuery) {
      return message.reply('**▶️ Please provide a search query!**');
    }

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    currentConnection = connection; 
    currentMessage = message; 

    if (connection.state.status === VoiceConnectionStatus.Ready) {
      enqueue({ searchQuery, message });
      createPlayer();
      return message.reply('**✅ Song added to Queue!**');
    }

    const listener = async (oldState, newState) => {
      if (newState.member.user.bot) {
        return;
      }

      if (oldState.channel && !newState.channel) {
        const membersInChannel = oldState.channel.members.size;
        if (membersInChannel === 1) {
          message.client.removeListener('voiceStateUpdate', listener);

          if (!connection.destroyed) {
            connection.destroy();
          }
        }
      }
    };

    message.client.on('voiceStateUpdate', listener);

    await playSong(connection, searchQuery, message);
  },
  queue,
  dequeue,
  playNextSong,
  playSong,
  pause: () => {
    pausePlayback();
  },
  resume: () => {
    resumePlayback();
  },
  getPlayer: () => player,
  getCurrentConnection: () => currentConnection, 
};
