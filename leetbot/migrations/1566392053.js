/**
 * Migrate from multiChatLeetCounter at root to structure with nested
 * multiChatLeetCounter and userScores.
 */
export default {
    id: '1566392053',
    migrate: state => ({
        multiChatLeetCounter: state,
        userScores: {}
    })
}
