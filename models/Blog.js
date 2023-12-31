const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

blogSchema.statics.createBlog = async function (title, content, author) {
  if (!title) throw Error("The blog must have a title");
  if (!content) throw Error("The blog must hava some content");

  const blog = new this({ title, content, author });
  await blog.save();

  return blog;
};

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
