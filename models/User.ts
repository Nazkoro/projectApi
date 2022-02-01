import mongoos from "mongoose";

const UserSchema = new mongoos.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    activationLink: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    firstName: {
      type: String,
      max: 50,
      default: "",
    },
    lastName: {
      type: String,
      max: 50,
      default: "",
    },
    day: {
      type: String,
      max: 50,
      default: "",
    },
    month: {
      type: String,
      max: 50,
      default: "",
    },
    year: {
      type: String,
      max: 50,
      default: "",
    },
    gender: {
      type: String,
      max: 50,
      default: "",
    },
    city: {
      type: String,
      max: 50,
      default: "",
    },
    country: {
      type: String,
      max: 50,
      default: "",
    },
    desc: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    },
    jobs: {
      type: String,
      default: "",
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

export default mongoos.model("User", UserSchema);
