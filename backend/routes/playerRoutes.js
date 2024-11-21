const express = require("express");
const path = require('path');
const multer = require('multer');
const { addPlayer, getAllPlayers } = require("../controllers/playerController");

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Make sure this directory exists
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Routes
router.get("/", getAllPlayers);

// Use Multer middleware for handling multipart/form-data
router.post('/register', upload.array('images'), addPlayer);

router.get('/generate-pdf/:id', async (req, res) => {
    try {
        const playerId = req.params.id;
        await createPdfAndPreview(playerId);

        const player = await Player.findById(playerId);

        const pdfPath = path.join(__dirname, `../uploads/${playerId}.pdf`);
        res.download(pdfPath, `ScoutPro-${player.playerName}.pdf`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error generating PDF.' });
    }
});

module.exports = router;
