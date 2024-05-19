const mongoose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A book must have a name !'],
            trim: true,
        },
        slugName: {
            type: String,
        },
        author: {
            type: String,
            required: [true, 'A book must have an author !'],
            trim: true,
        },
        authorName: {
            type: String,
        },
        genre: {
            type: String,
            trim: true,
        },
        cover: {
            type: String,
            trim: true,
        },
        pages: {
            type: String,
            trim: true,
        },
        year: {
            type: String,
        },
        id: {
            type: String,
            select: false,
        },
        addedAt: {
            type: Date,
            default: Date(),
            immutable: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

bookSchema.index(
    { name: 1, slugName: 1, author: 1 },
    { unique: true }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
