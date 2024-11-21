const Player = require('../models/Player'); // Ensure you have a Player model

const addPlayer = async (req, res) => {
    try {
        const playerData = req.body; // Contains text fields
        const images = req.files; // Contains uploaded files
        console.log("req.body:", req.body); // Add this line
        console.log("req.files:", req.files); // And this line

        // Process images
        const imagePaths = images.map(file => file.filename);

        // Convert numerical fields from strings to numbers
        const numericalFields = [
            'heightWithShoes', 'weight', 'bodyFat', 'wingSpan', 'standingReach',
            'handWidth', 'handLength', 'standingVert', 'maxVert', 'laneAgility',
            'shuttle', 'courtSprint', 'maxSpeed', 'maxJump', 'prpp', 'acceleration',
            'deceleration', 'ttto', 'brakingPhase'
        ];

        numericalFields.forEach(field => {
            if (playerData[field]) {
                const parsedValue = parseFloat(playerData[field]);
                if (!isNaN(parsedValue)) {
                    playerData[field] = parsedValue;
                } else {
                    playerData[field] = undefined; // or delete playerData[field];
                }
            } else {
                playerData[field] = undefined; // or delete playerData[field];
            }
        });

        // Ensure videos is an array
        let videos = playerData.videos;
        if (typeof videos === 'string') {
            videos = [videos];
        } else if (!Array.isArray(videos)) {
            videos = [];
        }

        // Create a new player using the Mongoose model
        const newPlayer = new Player({
            ...playerData,
            images: imagePaths,
            videos: videos,
        });

        await newPlayer.save();

        res.status(201).json({ message: "Player added successfully", player: newPlayer });
    } catch (error) {
        console.error('Error saving new player:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        } else {
            throw error; // Re-throw other errors to be caught by the outer catch
        }
    }
};

const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find(); // Fetch all players from the database
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching players.' });
    }
};

module.exports = { addPlayer, getAllPlayers };
