const fs = require('fs');
const conf = require('../storage/config.json');

exports.run = async function(message, args) {
  async function writeAsync(path, object) {
    await fs.writeFileSync(path, JSON.stringify(object, null, 2), 'utf8');
    console.log(`Successfully logged ${Object.keys(object).length} items in ${path}.`);
  }

  async function finalize() {
    for(var id of Object.keys(guilds)) {
      var vc = client.voiceConnections.get(id);
      var g = guilds[id];

      if(!client.voiceConnections.get(id)) {
        g.queue = [];
        continue;
      }

      if(g.music.channel == null || g.music.vc == null)
        continue;

      g.queue.unshift(g.queue[0]);

      await client.createMessage(g.music.channel, "I have to restart. Your current queue will be saved.");
      await client.leaveVoiceChannel(g.music.vc);
    }

    await Object.keys(guilds).forEach(g => {
      guilds[g].music.vc = null;
      guilds[g].music.channel = null;
    });
  }

  if(message.author.id !== conf.conf.ownerID)
    return;

  await writeAsync('./storage/guilds.json', guilds);
  await finalize();

  await message.channel.createMessage("*distant screams*");

  process.exit();
};

exports.info = {
  usage: "restart%",
  args: "None.",
  examples: "restart%",
  description: "Restarts the pm2 server.",
  type: "owner"
};
