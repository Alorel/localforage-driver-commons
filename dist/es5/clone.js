"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function clone(obj) {
    var e_1, _a;
    if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj) {
        return obj;
    }
    var temp = obj instanceof Date ? new Date(obj) : (obj.constructor());
    try {
        for (var _b = tslib_1.__values(Object.keys(obj)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                obj['isActiveClone'] = null;
                temp[key] = clone(obj[key]);
                delete obj['isActiveClone'];
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return temp;
}
exports.clone = clone;
//# sourceMappingURL=clone.js.map