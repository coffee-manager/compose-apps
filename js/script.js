/**
 * Windows 비트수 추정
 * @returns {number|null} 64 | 32 | null(윈도우 아님)
 */
function getWindowsBit() {
    const ua = navigator.userAgent.toLowerCase();
    const platform = (navigator.platform || "").toLowerCase();

    if (!ua.includes("windows")) {
        return null;
    }

    if (
        ua.includes("win64") ||
        ua.includes("wow64") ||
        ua.includes("x64") ||
        ua.includes("amd64") ||
        platform.includes("win64") ||
        platform.includes("x64")
    ) {
        return 64;
    }

    return 32;
}

function setDeskTopBitMsg() {
    const bit = getWindowsBit();
    if (!bit) {
        return;
    }
    const p = document.getElementById('desktop-bit-msg');
    p.innerText = `** 현재 접속하신 PC는 ${bit}bit 입니다.`;
}

/**
 * 공통 HTML header 를 fetch로 불러온다
 */
function loadCommon() {
    fetch('header.html')
        .then(r => r.text())
        .then(html => document.getElementById('header').innerHTML = html);
}

loadCommon();
setDeskTopBitMsg();