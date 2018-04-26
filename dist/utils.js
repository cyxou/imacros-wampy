'use strict';

var Cu = Components.utils;

var _Cu$import = Cu.import('resource://getbot/wampy/constants.js', {}),
    ALLOWED_BINARY_TYPES = _Cu$import.ALLOWED_BINARY_TYPES;

function getServerUrlBrowser(url) {
    var scheme = void 0,
        port = void 0;

    if (/^ws(s)?:\/\//.test(url)) {
        // ws scheme is specified
        return url;
    }

    scheme = window.location.protocol === 'https:' ? 'wss://' : 'ws://';

    if (!url) {
        port = window.location.port !== '' ? ':' + window.location.port : '';
        return scheme + window.location.hostname + port + '/ws';
    } else if (url[0] === '/') {
        // just path on current server
        port = window.location.port !== '' ? ':' + window.location.port : '';
        return scheme + window.location.hostname + port + url;
    } else {
        // assuming just domain+path
        return scheme + url;
    }
}

function getServerUrlNode(url) {
    if (/^ws(s)?:\/\//.test(url)) {
        // ws scheme is specified
        return url;
    } else {
        return null;
    }
}

function getWebSocket(url, protocols, ws) {
    if (ws) {
        // User provided webSocket class
        return new ws(url, protocols);
    } else if ('WebSocket' in window) {
        // Chrome, MSIE, newer Firefox
        return new window.WebSocket(url, protocols);
    } else if ('MozWebSocket' in window) {
        // older versions of Firefox
        return new window.MozWebSocket(url, protocols);
    }

    return null;
}

var EXPORTED_SYMBOLS = ['getWebSocket'];
//# sourceMappingURL=utils.js.map
