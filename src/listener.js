class Listener {
    constructor(playlistsService, mailSender) {
      this._playlistsService = playlistsService;
      this._mailSender = mailSender;
   
      this.listen = this.listen.bind(this);
    }
   
    async listen(message) {
      try {
        const { playlistId, targetEmail } = JSON.parse(message.content.toString());
        
        const playlists = await this._playlistsService.getPlaylists(playlistId);
        const prettyJson = JSON.stringify(playlists, null, 2);
        const result = await this._mailSender.sendEmail(targetEmail, prettyJson);
        console.log('Email sent result:', result);
      } catch (error) {
        console.error(error);
      }
    }
  }
   
  module.exports = Listener;