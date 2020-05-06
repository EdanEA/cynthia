const conf = require('../storage/config.json');

module.exports = async (guild) => {
  await client.createMessage(conf.conf.logChannel, {embed:{
    color: 0xB22222,
    title: `Left a Guild`,
    description: `Name: \`${guild.name}\`\nID: \`${guild.id}\``,
    timestamp: new Date().toISOString(),
    footer: {text: `${client.guilds.size} Servers`}
  }});
};
