const { Schema, model, Types } = require('mongoose');
const moment = require("moment");//to format date
const reactionSchema = require("./Reaction");

//Schema to create Thought model
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => moment(timestamp).format("MMM DD, YYYY [at] hh:mm a")
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

//virtual to get length of reaction
thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;