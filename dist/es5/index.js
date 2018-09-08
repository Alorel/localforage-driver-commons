"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serialiser_1 = require("./serialiser");
var clone_1 = require("./clone");
exports.clone = clone_1.clone;
var getKeyPrefix_1 = require("./getKeyPrefix");
exports.getKeyPrefix = getKeyPrefix_1.getKeyPrefix;
exports.serialiser = {
    bufferToString: serialiser_1.bufferToString,
    deserialize: serialiser_1.deserialize,
    serialize: serialiser_1.serialize,
    stringToBuffer: serialiser_1.stringToBuffer
};
//# sourceMappingURL=index.js.map