const User = require('../models/users');
const Follow = require('../models/follows');
const _ = require('lodash');

module.exports = {
    getStreamer: async (streamerId, userId) => {
        try {
            const streamer
                = await User.findById({ _id: streamerId }).select(['avatar', 'name', 'online', 'pun', 'wowza', 'view']).lean();
            if (!streamer) return { error: new Error('Invalid streamer!') };
            if (!streamer.wowza || _.isEmpty(streamer.wowza)) streamer.streamId = null;
            else streamer.streamId = streamer.wowza.streamId;
            if (streamer.wowza) delete streamer.wowza;
            const pairs
                = await Follow.findOne({ followed: streamerId, follower: userId });
            if (pairs) streamer.followed = true;
            else streamer.followed = false;
            return { error: null, value: streamer };
        }
        catch (err) {
            return { error: err };
        }
    }
}