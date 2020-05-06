const conf = require('../storage/config.json');
const moment = require('moment');
require('moment-duration-format');

exports.run = function(message, args) {
  var time = moment.duration(client.uptime, "milliseconds").format("d[d] hh[h] mm[m] ss[s]");
  var pkg = require('../package.json');

  return message.channel.createMessage({embed: {
    color: parseInt(`0x${conf.conf.color}`),
    fields: [
      {
        name: 'Bot Info',
        value: `• Uptime: \`${time}\`\n• Ping: \`${new Date - message.timestamp} ms\`\n• Memory Heap: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MBs / ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MBs\`\n• Number of Shards: \`${client.shards.size}\``
      },
      {
        name: "Guild Info",
        value: `• Guild Count: \`${client.guilds.size}\`\n• User Count: \`${client.users.size}\`\n• Voice Stream Count: \`${client.voiceConnections.size}\``
      },
      {
        name: "Development Info",
        value: `• Version: \`${pkg.version}\`\n• Developed By: \`Edab INC.\`\n• Written In: [Node.js ${process.version}](https://nodejs.org/en/)\n• API Lib: [Eris ${pkg.dependencies.eris.slice(1)}](https://github.com/abalabahaha/eris)`
      }
    ]
  }});
};

exports.info = {
  usage: "stats%",
  args: "None.",
  examples: "stats%",
  description: "Gives some info on how the bot's doing, like its ping and guild count.",
  type: "misc"
};
