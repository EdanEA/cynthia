const conf = require('../storage/config.json');
const f = require('../util/misc.js');

exports.run = async (message, args) => {
  async function getHelp(id, type=0, commandName=null) {
    var suffix = guilds[message.channel.guild.id].suffix == conf.conf.defaultSuffix ? conf.conf.defaultSuffix : guilds[message.channel.guild.id].suffix;
    var fields = [];
    var e = {
      color: parseInt(`0x${conf.conf.color}`),
      footer: { text: `Use "help${suffix} [command name]" for in-depth information of a command.` }
    };

    if(!type) {
      for(var [key, values] of Object.entries(commands)) {
        var field = {name: `**${key.charAt(0).toUpperCase() + key.slice(1, key.length)}**`, value: ""};

        if(key == "misc") {
          field.name = "**Misc.**";
        }

        if(values.length == 0)
          continue;

        for await (var v of values) {
          field.value += `\`${v}\` `;
        }

        fields.push(field);
      }

      e.fields = fields;
    } else {
      var info;

      try {
        info = require(`../cmds/${commandName}`).info;
      } catch(e) {
        return {};
      }

      e = {
        title: `\`${info.usage}\` info`,
        description: info.description,
        fields: [{name: "Arguments", value: info.args}, {name: "Examples", value: info.examples}],
        color: parseInt(`0x${conf.conf.color}`)
      };
    }

    if(!f.hasMod(message.member, message.channel.guild))
    for(var i = 0; i < fields.length; i++) {
      if(fields[i].name.includes("Mod"))
        fields.splice(i, 1);
    }

    if(!conf.conf.staff.includes(id) && conf.conf.ownerID !== id)
      for(var i = 0; i < fields.length; i++) {
        if(fields[i].name.includes("Staff"))
          fields.splice(i, 1);
      }

    if(conf.conf.ownerID !== id)
      for(var i = 0; i < fields.length; i++) {
        if(fields[i].name.includes("Owner"))
          fields.splice(i, 1);
      }

    if(!conf.conf.beta.includes(id) && conf.conf.ownerID !== id && !conf.conf.staff.includes(id))
      for(var i = 0; i < fields.length; i++) {
        if(fields[i].name.includes("Beta"))
          fields.splice(i, 1);
      }

    return e;
  }

  if(!args[0])
    await getHelp(message.author.id).then(e => {
      message.channel.createMessage({embed: e});
    });
  else
    await getHelp(message.author.id, 1, args[0]).then(e => {
      message.channel.createMessage({embed: e});
    });
};

exports.info = {
  usage: "help% [command]",
  args: "[command]: A command's name.",
  description: "The `help` command gives a list of the commands on the bot. If given the name of a certain command, it will instead give you information on that specific command.\n\nArguments in square brackets `[]` are optional; arguments in angled brackets `<>` are required; multiple arguments in parentheses mean that both are required if one is used.",
  examples: "help%\nhelp% queue\nhelp% help",
  type: "help"
};
