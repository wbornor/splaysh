/**
 * Created by wesbornor on 1/21/17.
 */

export const unescapeHTML = (html) => {
    "use strict";
    var escapeEl = document.createElement('textarea');
    escapeEl.innerHTML = html;
    return escapeEl.textContent;
};