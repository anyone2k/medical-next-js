import mongoose, { Schema, Document, Model } from "mongoose";

// Schéma Mongoose pour le modèle Appointment
const AppointmentSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  dayTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: [true, "Please add a reason for the appointment"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exporter le modèle
const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
