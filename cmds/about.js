const conf = require('../storage/config.json');

exports.run = (message, args) => {
  return message.channel.createMessage({embed: {
    fields: [
      {
        name: "What is this?",
        value: "This is Cynthia, a music bot. It is often referred to as--by the developer, at least--\"the worst free Discord music bot.\"\n\nAll jokes aside, Cynthia is meant to a be a music bot that offers all of its features, without begging you for money every half-hour. Is it great? No. Is it particularly special? No. But it's to exist for as long and be continually maintained and updated, as long as the developer can host it."
      },
      {
        name: "Ways to help",
        value: "You can help with the bot's development by contributing to the [GitHub](https://github.com/edanea/cynthia). If there are any bugs you notice, leave an issue on the [GitHub](https://github.com/edanea/cynthia), or let someone know in the [support server](https://discord.gg/WEpCRUV)."
      }
    ],
    color: parseInt(`0x${conf.conf.color}`)
  }});
};

exports.info = {
  usage: "about%",
  examples: "about%",
  args: "None.",
  description: "Provides information on the bot, like its purpose, and its future.",
  type: "misc"
};
