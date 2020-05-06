exports.run = async (message, args) => {
  if(!message.member.voiceState.channelID && !client.voiceConnections.get(message.channel.guild.id))
    return message.channel.createMessage(`You're not in a voice channel.`);

  var vcid = message.member.voiceState.channelID;
  var g = guilds[message.channel.guild.id];

  await client.joinVoiceChannel(vcid);

  g.music.vc = vcid;
  g.music.channel = message.channel.id;

  require('../util/stream.js').play(g, client);

  const player = client.voiceConnections.get(message.channel.guild.id);

  player.on("trackStart", async d => {
    client.voiceConnections.get(message.channel.guild.id).playing = true;
  });

  player.on("trackError", err => console.error(err));

  player.on("trackEnd", async d => {
    client.voiceConnections.get(g.id).playing = false;

    if(!g.queue[0])
      return;

    if(g.music.queueRepeat) {
      let i = g.queue[0];

      if(i.skip !== undefined && i.skip == true)
        i.skip = false;

      g.queue.push(i);
    }


    if(!g.music.singleRepeat)
      g.queue.shift();
    else {
      if(g.queue[0].skip !== undefined && g.queue[0].skip == true)
        g.queue[0].skip = false;
    }

    return require('../util/stream.js').play(guilds[message.channel.guild.id], client);
  });
};

exports.info = {
  usage: "play%",
  args: "None.",
  description: "Starts playing music in the queue.",
  examples: "play%",
  type: "music"
};
