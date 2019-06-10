/* eslint-disable indent */
import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const notebookSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
    pages: [{
        type: String
    }],
    number_of_pages: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true })

notebookSchema.methods = {
    view (full) {
      let view = {}
      let fields = ['id', 'name', 'title', 'description', 'pages', 'user', 'number_of_pages', 'createdAt', 'updateAt']
  
      if (full) {
        fields = [...fields, 'createdAt']
      }
  
      fields.forEach((field) => { view[field] = this[field] })
  
      return view
    }
}

notebookSchema.plugin(mongooseKeywords, { paths: ['title'] })

const model = mongoose.model('Notebook', notebookSchema)

export const schema = model.schema
export default model
