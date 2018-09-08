"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getCallback_1 = require("./getCallback");
var getKeyPrefix_1 = require("./getKeyPrefix");
function dropInstanceCommon(options, callback) {
    var _this = this;
    callback = getCallback_1.getCallback.apply(this, arguments);
    options = (typeof options !== 'function' && options) || {};
    if (!options.name) {
        var currentConfig = this.config();
        options.name = options.name || currentConfig.name;
        options.storeName = options.storeName || currentConfig.storeName;
    }
    var promise;
    if (!options.name) {
        promise = Promise.reject('Invalid arguments');
    }
    else {
        promise = new Promise(function (resolve) {
            if (!options.storeName) {
                resolve(options.name + "/");
            }
            else {
                resolve(getKeyPrefix_1.getKeyPrefix(options, _this._defaultConfig));
            }
        });
    }
    return { promise: promise, callback: callback };
}
exports.dropInstanceCommon = dropInstanceCommon;
//# sourceMappingURL=dropInstanceCommon.js.map