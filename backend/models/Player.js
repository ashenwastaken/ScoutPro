const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  position: { type: String, required: true },
  heightWithShoes: { type: Number, required: true },
  weight: { type: Number, required: true },
  bodyFat: { type: Number },
  wingSpan: { type: Number },
  standingReach: { type: Number },
  handWidth: { type: Number },
  handLength: { type: Number },
  standingVert: { type: Number },
  maxVert: { type: Number },
  laneAgility: { type: Number },
  shuttle: { type: Number },
  courtSprint: { type: Number },
  description: { type: String },
  maxSpeed: { type: Number },
  maxJump: { type: Number },
  prpp: { type: Number },
  acceleration: { type: Number },
  deceleration: { type: Number },
  ttto: { type: Number },
  brakingPhase: { type: Number },
  images: [{ type: String }],
  videos: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Player", playerSchema);
