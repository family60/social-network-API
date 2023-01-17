const { Schema, model, Types } = require('mongoose');
const moment = require("moment");//to format date

//Schema to create Reaction model
const reactionSchema = new Schema({
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody:{
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => moment(timestamp).format("MMM DD, YYYY [at] hh:mm a")
    }
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

module.exports = reactionSchema;