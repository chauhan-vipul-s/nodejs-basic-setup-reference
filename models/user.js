const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: [true, "usernmae already exist"],
      minlength: 3,
      maxlength: 20,
      trim: true,
      match: /^[a-zA-Z0-9._]+$/,
    },
    email: {
      type: String,
      required: [true, "email requird"],
      unique: [true, "email id is already register"],
      lowercase: true,
      trim: true,
      match:
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      //match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+`~-])[a-zA-Z0-9!@#$%^&*()_+`~-]{8,}$/
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
          trim: true,
        },
        lastName: {
          type: String,
          required: true,
          trim: true,
        },
      },
      optional: true,
    },
    role: {
      type: String,
      enum: ["student", "instructor"],
      required: true,
    },
    profile: {
      type: {
        bio: {
          type: String,
          maxlength: 500,
          trim: true,
        },
        profilePicture: {
          type: String,
          optional: true,
          match:
            /^(?:https?:\/\/)?[\w.-]+(?:\.[\w.-]+)*\/[\w._\-/\?&=#]*\.(?:gif|jpeg|jpg|png)$/,
        },
      },
      optional: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
