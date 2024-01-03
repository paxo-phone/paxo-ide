
const MSG_FORMAT = (feature, text) => `[paxoide] [${feature}] ${text}`

function logInfo(feature, text) {
    console.info(MSG_FORMAT(feature, text))
}

/**
 * Prefer use console.log like always ^^
 * @param {string} feature 
 * @param {string} text 
 */
function logDebug(feature, text) {
    console.info(MSG_FORMAT(feature, text))
}

function logWarning(feature, text) {
    console.warn(MSG_FORMAT(feature, text))
}

function logError(feature, text) {
    console.error(MSG_FORMAT(feature, text))
}

function assert(condition, feature, text) {
    console.assert(condition, MSG_FORMAT(feature, text))
}

module.exports = {
    logInfo,
    logDebug,
    logWarning,
    logError,
    assert
}
