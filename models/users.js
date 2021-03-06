const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const notificationSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    seen: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const wowzaSchema = new Schema({
    primaryServer: String,
    hostPort: Number,
    application: String,
    streamName: String,
    player_hls_playback_url: String,
    streamId: String,
});

const userSchema = new Schema({
    phone: {
        type: String,
        match: /^\d{10}$/,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    birthday: {
        type: String,
        match: /^\d\d\/\d\d\/\d\d\d\d$/,
        required: true
    },
    address: {
        type: String
    },
    avatar: {
        type: String,
        default: `https://api.adorable.io/avatars/285/${Date.now()}.png`
    },
    coin: {
        type: Number,
        default: 0
    },
    pun: {
        type: Number,
        default: 0
    },
    fcmToken: {
        type: String
    },
    online: {
        type: Boolean,
        default: false
    },
    view: {
        type: Number,
        default: 0,
    },
    wowza: wowzaSchema,
    notifications: [ notificationSchema ]
}, {
    timestamps: true
});

userSchema.plugin(passportLocalMongoose, {
    usernameField: 'phone',
    usernameUnique: false
});

const User = mongoose.model('User', userSchema);

module.exports = User;
