import mongoose, { Schema, model, models } from "mongoose";

const HospitalSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  address: {
    type: Map,
    of: String,
    required: true,
    default: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  },
  phone_number: {
    type: String,
    required: [true, "Please add a phone_number"],
  },
  reviews: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Please add a rating between 1 and 5"],
      },
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Check if the model already exists, otherwise define it
const Hospital = models.Hospital || model("Hospital", HospitalSchema);

export default Hospital;
