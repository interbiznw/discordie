"use strict";

const DiscordieError = require("../../../core/DiscordieError");

module.exports = function handler(data, gw) {
  // todo: move this error somewhere else
  const user = this.User;
  const isLocal = this.VoiceConnections.isLocalSession(data.session_id);
  const joinedGuildId = gw.voiceState.guildId;
  if (user.id == data.user_id && joinedGuildId == data.guild_id && !isLocal)
    gw.disconnectVoice(
      false,
      new DiscordieError("Connected from another location")
    );

  return true;
};