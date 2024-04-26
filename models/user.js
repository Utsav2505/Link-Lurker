import { Schema, model, models } from "mongoose";


const userSchema = new Schema({
    email:{
        type: String,
        unique:[true, "Email already exists!"],
        required: [true, "Email is required!"],
    },
    name:{
        type: String,
        required: [true, "Name is required!"],
    },
    image:{
        type: String,
    },
    installationDate: {
        type: Date,
        default: Date.now
      },
      lastUsageDate: {
        type: Date,
        default: Date.now
      },
      // Define any analytics and stats fields here
      // For example:
      analytics: {
        urlsScanned: {
          type: Number,
          default: 0
        },
        safeUrls: {
          type: Number,
          default: 0
        },
        potentiallyHarmfulUrls: {
          type: Number,
          default: 0
        },
        maliciousUrls: {
          type: Number,
          default: 0
        },
        geolocation:{
            type: String,
            default: "Unknown"
        }
    }
});

const User = models.User ||  model('User', userSchema);
export default User;
