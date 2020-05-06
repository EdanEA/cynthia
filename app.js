const Eris = require('eris');
const fetch = require("node-fetch");
const conf = require('./storage/config.json');

require("eris-additions")(Eris, { disabled: ["Channel.sendMessage", "Channel.sendCode", "Eris.Embed"] })
require("./util/functions.js")(Eris);

global.client = new Eris(conf.bot.token, {
  reconnectDelay: 15e3,
  defaultImageSize: 1024,
  defaultImageFormat: "png",
  seedVoiceConnections: true,
  requestTimeout: 6e4,
  allowedMentions: { everyone: false },
  disableEvents: { TYPING_START: true }
});

global.guilds = require('./storage/guilds.json');
global.commands = {};

async function init() {
  const util = require('util');
  const fs = require('fs');

  var readdir = util.promisify(fs.readdir);
  const events = await readdir('./events/');

  for(var e of events) {
    let name = e.split('.')[0];
    let event = require(`./events/${name}`);

    try {
      client.on(name, event);
      console.log(`Successfully loaded event: ${name}`);
    } catch(e) {
      console.log(`Error loading event: ${name}\n${e.stack}`);
    }
  }

  console.log();

  client.connect();
}

init();
