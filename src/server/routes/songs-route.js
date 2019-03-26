"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var songsRoute = /** @class */ (function () {
    function songsRoute() {
    }
    songsRoute.prototype.getSongs = function (req, res) {
        res.send('hello');
    };
    songsRoute.prototype.registerRoutes = function (router, baseUrl) {
        router.get(baseUrl + '/songs', this.getSongs);
    };
    return songsRoute;
}());
exports.default = songsRoute;
