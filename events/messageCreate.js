const conf = require('../storage/config.json');
const fetch = require('node-fetch');
const fs = require('fs');

module.exports = async (message) => {
  if(!message.channel.guild.id || message.author.bot || message.author.id !== conf.conf.ownerID)
    return;

  if(!guilds[message.channel.guild.id]) {
    guilds[message.channel.guild.id] = conf.conf.defaultConfig;
    guilds[message.channel.guild.id].id = message.channel.guild.id;
    guilds[message.channel.guild.id].suffix = conf.conf.defaultSuffix;
  }

  var g = guilds[message.channel.guild.id];
  var args = message.content.split(' ').slice(1);
  var suffix = g.prefix == conf.conf.defaultSuffix ? conf.conf.defaultSuffix : g.suffix;
  var cmd;

  message.content = message.content.toLowerCase()

  fs.readdir('./cmds', (err, files) => {
    files.forEach(f => {
      f = f.split('.js')[0];

      if(!message.content.startsWith(f + suffix))
        return;

      cmd = f;

      try {
        require(`../cmds/${cmd}.js`).run(message, args);
      } catch(e) {
        if(!(e.message.includes('Cannot find module') || e.message.includes('ENOENT') || e.length > 2000) && message.author.id !== conf.ownerID)
          return console.log(e.stack);

        if(message.author.id == conf.conf.ownerID)
          return message.channel.createMessage(`\`\`\`${e}\`\`\``);
        else
          return message.channel.createMessage("An error occurred.");
      }
    });
  });

};
