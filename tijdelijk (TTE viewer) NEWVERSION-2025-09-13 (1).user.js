// ==UserScript==
// @name         tijdelijk (TTE viewer) NEWVERSION
// @namespace    http://tampermonkey.net/
// @version      2025-09-13
// @description  Load and sort TTE reports from localStorage
// @author       You
// @match        https://olva.smartschool.be/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=smartschool.be
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const rawdata = localStorage.getItem("testing134");
    if (!rawdata) {
        console.warn("⚠️ No data found in localStorage under 'testing134'");
        return;
    }

    let tte = JSON.parse(rawdata); // already an array

    // 🔄 Sort by date (ascending: oldest → newest)
    tte.sort((a, b) => {
        const [da, ma, ya] = a.date.split("-").map(Number);
        const [db, mb, yb] = b.date.split("-").map(Number);
        return new Date(ya, ma - 1, da) - new Date(yb, mb - 1, db);
    });

    console.log("✅ TTE data (sorted):", tte);

    // Example: log each line
    tte.forEach(entry => {
        console.log(`${entry.date} | ${entry.score} | ${entry.type} | ${entry.note || ""}`);
    });

})();
