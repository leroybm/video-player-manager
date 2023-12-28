import mongoose from 'mongoose';

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI!)

mongoose.Promise = global.Promise;

export const db = {
    VideoPlayer: videoPlayerSchema(),
    User: userSchema(),
};

// mongoose models with schema definitions

function videoPlayerSchema() {
    const schema = new Schema({
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        playerConfiguration: { type: Object, required: true },
        title: { type: String, unique: true, required: true },
        sources: [{
            label: { type: String, required: true },
            url: { type: String, required: true },
        }]
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
        }
    });

    return mongoose.models.VideoPlayer || mongoose.model('VideoPlayer', schema);
}

function userSchema() {
    const schema = new Schema({
        title: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: { createdAt: true, updatedAt: false }
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}