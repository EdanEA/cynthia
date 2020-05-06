const f = require('../util/misc.js');
const conf = require('../storage/config.json');

exports.run = async (message, args) => {
  var g = guilds[message.channel.guild.id];

  if(args.length == 0)
    return message.channel.createMessage({embed: {
      color: parseInt(`0x${conf.conf.color}`),
      description: `To change a setting, do \`config${g.suffix} ([option] [value])\``,
      fields: [
        { name: "`[1]` Default Search Platform", value: `Currently set to: \`${g.music.defaultSearch}\`\nValue: \`youtube\` or \`soundcloud\`.\nInfo: Affects the default platform used when queueing music.` },
        { name: "`[2]` Any User can Skip Songs", value: `Currently set to: \`${g.music.anySkip}\`\nValue: \`true\` or \`false\`.\nInfo: Affects if anyone can skip songs in the queue.` },
        { name: "`[3]` Now Playing Message Type", value: `Currently set to: \`${g.music.msgType}\`\nValue: \`0\` for no messages, \`1\` for embed messages, \`2\` for simple text messages.\nInfo: Affects the type of message sent when a song begins playing.` }
      ]
    }});

  if(!f.hasMod(message.member, message.channel.guild))
    return;

  switch(parseInt(args[0])) {
    case 1:
      if(!args[1])
        g.music.defaultSearch = conf.conf.defaultConfig.music.defaultSearch;

      if(args[1] == "youtube" || args[1] == "yt")
        g.music.defaultSearch = "youtube";
      else if(args[1] == "soundcloud" || args[1] == "sc")
        g.music.defaultSearch = "soundcloud";
      else if(args[1])
        return message.channel.createMessage(`An invalid search platform was provided.`);

      return message.channel.createMessage(`Set the guild's default search platform to \`${g.music.defaultSearch}\`.`);

    case 2:
      if(!args[1])
        g.music.anySkip = conf.conf.defaultConfig.music.anySkip;

      if(args[1] == "true")
        g.music.anySkip = true;
      else if(args[1] == "false")
        g.music.anySkip = false;
      else if(args[1])
        return message.channel.createMessage(`An invalid option was provided.`);

      return message.channel.createMessage(`Set the any skip for the guild to \`${g.music.anySkip}\`.`);

    case 3:
      var t = parseInt(args[1]);

      if(!args[1]) {
        g.music.msgType = conf.conf.defaultConfig.music.msgType;
        t = g.music.msgType;
      }

      if(isNaN(t))
        return message.channel.createMessage(`A number must be given corresponding to the option for the message type. It can be \`0\`, \`1\` or \`2\`.`);

      if(t < 0 || t > 2)
        return message.channel.createMessage(`An invalid number must be given corresponding to the option for the message type. It can be \`0\`, \`1\` or \`2\`.`);

      g.music.msgType = t;

      return message.channel.createMessage(`Message type is now set to \`${g.music.msgType}\`.`);

    default:
      return;
  }
};

exports.info = {
  usage: "config% ([option] [value])",
  args: "[option]: The number corresponding to the config option you want to change.\n[value]: The value you want to set the config option to.",
  examples: "config%\nconfig% 3 2\nconfig% 2 false",
  description: "Allows a guild moderator to change the config for the guild. If no arguments are left when running the command, information about the configuration is sent.",
  type: "mod"
};
