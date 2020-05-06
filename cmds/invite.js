const conf = require('../storage/config.json');

exports.run = (message, args) => {
  var l = `https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=3525696`;

  return message.channel.createMessage({embed: {
    color: parseInt(`0x${conf.conf.color}`),
    fields: [
      { name: "Bot Invite", value: `[\`/oauth2/authorize\` link](${l})` },
      { name: "Additional Invites", value: `[Support Server](https://discord.gg/WEpCRUV)\n[XD Bot](https://discordapp.com/oauth2/authorize?client_id=305602159741763585&scope=bot&permissions=8)` }
    ]
  }});
};

exports.info = {
  usage: "invite%",
  args: "None.",
  description: "Shows an invite for the bot, as well as the support server and the developer's other bot.",
  examples: "invite%",
  type: "misc"
}
