import mongoose, { Schema, Document, Types } from 'mongoose';
import { UserInterface } from './user.model'; 


// Define the interface for the article document
export interface ArticleInterface extends Document {
    title: string;
    content: string;
    createdBy: Types.ObjectId | UserInterface; // Reference to the UserInterface
    createdAt: Date;
    updatedAt: Date;
}

// Define the schema for the article
const articleSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Create and export the model based on the schema
export default mongoose.model<ArticleInterface>('Article', articleSchema);
