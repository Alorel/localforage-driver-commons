"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getKeyPrefix(options, defaultConfig) {
    var keyPrefix = options.name + "/";
    if (options.storeName !== defaultConfig.storeName) {
        keyPrefix += options.storeName + "/";
    }
    return keyPrefix;
}
exports.getKeyPrefix = getKeyPrefix;
//# sourceMappingURL=getKeyPrefix.js.map