const conf = require('../storage/config.json');

module.exports = async (guild) => {
  var botCount = function() { var bots = 0; guild.members.forEach(m => {if(m.bot) bots += 1;}); return bots;};

  await client.createMessage(conf.conf.logChannel, {embed: {
    color: 0x4DDDDD,
    title: `Joined a Guild`,
    description: `Name: \`${guild.name}\`\nID: \`${guild.id}\`\nMember Count: \`${guild.memberCount}\`\nBot Count: \`${botCount()}\``,
    timestamp: new Date().toISOString(),
    footer: {text: `${client.guilds.size} Servers`}
  }});

  guild.defaultChannel.createMessage("```Markdown\n# Hey, hey, hey. I\'m Cynthia, a music bot.\n\nFor a full list of my commands, use \"help%\". My suffix is \"%\". By suffix, I mean, rather than a prefix, coming before the command, a suffix that goes after. So, if you want to use the \"help\" command you would append the suffix to help, e.g. \"help%\" then any arguments would go after that. So, if you wanted information on the help command itself, you would do \"help% help\".```");
};
