// services/pdfService.js
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const Player = require('../models/Player');

const createPdfAndPreview = async (playerId) => {
    const player = await Player.findById(playerId);
    if (!player) {
        throw new Error('Player not found');
    }

    const pdfPath = path.join(__dirname, `../uploads/${playerId}.pdf`);
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(pdfPath));

    // Generate PDF content using player data
    doc.fontSize(24).text(player.playerName, { align: 'center' });
    doc.moveDown();

    doc.fontSize(16).text(`Position: ${player.position}`);
    doc.text(`Height with Shoes: ${player.heightWithShoes}`);
    doc.text(`Weight: ${player.weight}`);
    doc.text(`Body Fat: ${player.bodyFat}`);
    doc.text(`Wingspan: ${player.wingSpan}`);
    doc.text(`Standing Reach: ${player.standingReach}`);
    doc.text(`Hand Width: ${player.handWidth}`);
    doc.text(`Hand Length: ${player.handLength}`);
    doc.text(`Standing Vertical: ${player.standingVert}`);
    doc.text(`Max Vertical: ${player.maxVert}`);
    doc.text(`Lane Agility: ${player.laneAgility}`);
    doc.text(`Shuttle: ${player.shuttle}`);
    doc.text(`3/4 Court Sprint: ${player.courtSprint}`);
    doc.text(`Max Speed: ${player.maxSpeed}`);
    doc.text(`Max Jump Height: ${player.maxJump}`);
    doc.text(`Propulsive Power: ${player.prpp}`);
    doc.text(`Acceleration: ${player.acceleration}`);
    doc.text(`Deceleration: ${player.deceleration}`);
    doc.text(`Take Off: ${player.ttto}`);
    doc.text(`Braking Phase: ${player.brakingPhase}`);
    doc.moveDown();

    doc.fontSize(16).text('Description:', { underline: true });
    doc.fontSize(12).text(player.description || 'No description provided.');

    doc.end();
};

module.exports = {
    createPdfAndPreview,
};
