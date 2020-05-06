const { LavalinkVoiceConnectionManager } = require('@thesharks/tyr');
const conf = require('../storage/config.json');
const f = require('../util/misc.js');
const fs = require('fs')

module.exports = async () => {
  console.log(`Successfully connected as ${client.user.username}#${client.user.discriminator} (${client.user.id}).`);

  client.guilds.forEach(g => {
    if(!guilds[g.id]) {
      guilds[g.id] = conf.conf.defaultConfig;
      guilds[g.id].id = g.id;
      guilds[g.id].suffix = conf.conf.defaultSuffix;
    }
  });

  let nodes = [
    { host: conf.lavalink.host, port: conf.lavalink.port, password: conf.lavalink.pass, region: 'us' }
  ];

  client.voiceConnections = new LavalinkVoiceConnectionManager(nodes, {shards: client.shards.size, userId: client.user.id});

  await f.updateCmdList().then(cmds => {
    commands = cmds;
  });
};
