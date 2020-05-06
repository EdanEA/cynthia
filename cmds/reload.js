const conf = require('../storage/config.json');

exports.run = async (message, args) => {
  if(!conf.conf.staff.includes(message.author.id) && conf.conf.ownerID !== message.author.id)
    return;

  if(!args[0])
    return;

  var cmd = args.join(' ');

  try {
    let cmdFile = require(`./${cmd}`);
  } catch (e) {
    var msg = `There was an error reloading that file.`;
    var err = `\n\n\`\`\`${e}\`\`\``;

    if(msg.length + err > 2000)
      console.error(e);
    else
      msg += err;

    return message.channel.createMessage(msg);
  }

  var del = await delete require.cache[require.resolve(`./${cmd}`)];

  return message.channel.createMessage(`Successfully reloaded \`${cmd}\`.`);
};

exports.info = {
  usage: "reload% <file path>",
  args: "<file path>: The path to a file.",
  examples: "reload% queue.js\nreload% ../events/ready.js",
  description: "Reloads a file's cache, letting you add changes to a file without restarting the server.",
  type: "staff"
};
