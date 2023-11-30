import mongoose from 'mongoose';

const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

export const db = {
    Player: playerModel()
};

// mongoose models with schema definitions

function playerModel() {
    const schema = new Schema({
        title: { type: String, unique: true, required: true },
        videoUrl: { type: String, required: true },
        configuration: { type: Object, required: true },
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

    return mongoose.models.Player || mongoose.model('Player', schema);
}