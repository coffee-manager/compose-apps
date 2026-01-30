/**
 * 공통 HTML(header/footer)을 fetch로 불러온다
 */
function loadCommon() {
    fetch('header.html')
        .then(r => r.text())
        .then(html => document.getElementById('header').innerHTML = html);

    fetch('footer.html?v=20260130-2')
        .then(r => r.text())
        .then(html => document.getElementById('footer').innerHTML = html);
}

loadCommon();
