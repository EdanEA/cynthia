const fs = require('fs');

module.exports = {
  async updateCmdList() {
    var cmds = {
      music: [],
      mod: [],
      misc: [],
      beta: [],
      staff: [],
      owner: []
    };

    await fs.readdirSync('./cmds').forEach(f => {
      let name = f.split('.')[0];
      var i = require(`../cmds/${f}`).info;

      if(typeof i == "undefined")
        return console.error(`No info on ${f}`);

      if(typeof i.type == "undefined")
        return console.error(`No command type on ${f}`);

      switch(i.type) {
        case "music":
          cmds.music.push(name);
          break;

        case "mod":
          cmds.mod.push(name);
          break;

        case "staff":
          cmds.staff.push(name);
          break;

        case "owner":
          cmds.owner.push(name);
          break;

        case "beta":
          cmds.beta.push(name);
          break;

        case "misc.":
        case "misc":
          cmds.misc.push(name);
          break;

        case "help":
          break;

        default:
          console.log(`Unindexed command type on ${f}`);
          break;
      }
    });

    return cmds;
  },

  hasMod(member, guild) {
    var c = false;

    if(!guild || !member)
      return null;

    var r = member.highestRole.permissions;

    if(r.has("manageMessages") || r.has("kickMembers") || this.hasAdmin(member, guild))
      c = true;
    else if(guild.ownerID == member.id)
      c = true;

    return c;
  },

  hasAdmin(member, guild) {
    var c = false;

    if(!guild || !member)
      return null;

    var r = member.highestRole.permissions;

    if(r.has("banMembers") || r.has("administrator"))
      c = true;
    else if(guild.ownerId == member.id)
      c = true;

    return c;
  }
};
