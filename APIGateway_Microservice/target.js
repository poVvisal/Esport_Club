module.exports = {
    REGISTRATION_SERVICE: process.env.REGISTRATION_SERVICE_URL || 'http://registration:5001',
    COACH_SERVICE: process.env.COACH_SERVICE_URL || 'http://coach:5002', 
    PLAYER_SERVICE: process.env.PLAYER_SERVICE_URL || 'http://player:5003'
};