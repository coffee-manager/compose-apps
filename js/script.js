/**
 * 공통 HTML header 를 fetch로 불러온다
 */
function loadCommon() {
    fetch('header.html')
        .then(r => r.text())
        .then(html => document.getElementById('header').innerHTML = html);
}

loadCommon();
