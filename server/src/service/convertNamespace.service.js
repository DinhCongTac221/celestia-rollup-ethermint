require("module-alias/register");
const logger = require("@logger");
const sha256 = require("js-sha256");

function hexToBytes(hex) {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return bytes;
}

function bytesToNamespace(bytes) {
    const hex = [];
    for (let i = 0; i < bytes.length; i++) {
        const byteString = bytes[i].toString(16).padStart(2, "0");
        hex.push(byteString);
    }
    return hex.slice(0, 8).join("");
}

const ConvertNamespaceService = (anyNamepaceString) => {
    try {
        var hash = sha256.create();
        hash.update(anyNamepaceString);
        const bytes = hexToBytes(hash.hex());
        return bytesToNamespace(bytes);
    } catch (exception) {
        logger.warn("ConvertNamespaceService exception:" + exception);
    }
};

module.exports = ConvertNamespaceService;
