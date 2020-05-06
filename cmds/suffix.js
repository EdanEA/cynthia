const f = require('../util/misc.js');
const conf = require('../storage/config.json');

exports.run = (message, args) => {
  if(!f.hasMod(message.member, message.channel.guild))
    return;

  var g = guilds[message.channel.guild.id];
  var o, s;

  o = g.suffix;

  if(args.length == 0)
    s = conf.conf.defaultSuffix;
  else {
    if(args.join(' ').length > 4)
      return message.channel.createMessage(`The given suffix is too long. It can be at most four characters long.`);

    s = args.join('');
  }

  g.suffix = s;

  return message.channel.createMessage({embed: {
    color: parseInt(`0x${conf.conf.color}`),
    title: `New Suffix in ${message.channel.guild.name}`,
    fields: [
      { name: `New Suffix`, value: `\`\`\`${s}\`\`\`` },
      { name: `Old Suffix`, value: `\`\`\`${o}\`\`\`` }
    ]
  }});
};

exports.info = {
  usage: "suffix% [suffix]",
  args: "[suffix]: The new suffix. If nothing is given, the suffix is reset to the default.",
  description: "Allows a server moderator to change the suffix used for the bot.",
  examples: "suffix% !\nsuffix% .\nsuffix% :(",
  type: "mod"
};
