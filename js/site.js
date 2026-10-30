/**
 * 점주 도구함 공통 스크립트
 *
 * 다운로드 전표: 설치 파일 주소는 항상 최신을 가리키는 고정 주소(<prefix>latest/...)라 그대로 두고,
 * 버전·날짜·크기만 GitHub 릴리스 목록에서 읽어 채운다. 읽지 못하면 기본 문구가 남는다.
 *   릴리스 저장소: https://github.com/coffee-manager/deploy (각 프로그램 저장소의 Release 워크플로가 올림)
 */
const RELEASE_API = 'https://api.github.com/repos/coffee-manager/deploy/releases?per_page=100';
const CACHE_KEY = 'releases-v1';
const CACHE_MS = 10 * 60 * 1000;

/**
 * 릴리스 목록. 같은 탭에서는 10분 동안 다시 묻지 않는다. (GitHub API 는 IP 당 시간 60회 제한)
 */
async function loadReleases() {
    try {
        const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null');
        if (cached && Date.now() - cached.at < CACHE_MS) {
            return cached.list;
        }
    } catch (e) {
        // 저장소를 못 쓰는 브라우저는 매번 받는다
    }
    const res = await fetch(RELEASE_API, {headers: {Accept: 'application/vnd.github+json'}});
    if (!res.ok) {
        throw new Error('릴리스 목록 ' + res.status);
    }
    const list = (await res.json()).map(r => ({
        tag: r.tag_name,
        draft: r.draft,
        publishedAt: r.published_at,
        assets: (r.assets || []).map(a => ({name: a.name, size: a.size})),
    }));
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({at: Date.now(), list}));
    } catch (e) {
        // ignore
    }
    return list;
}

/**
 * prefix(apporder- 등) 로 시작하는 버전별 릴리스 중 가장 최근 것
 */
function latestOf(list, prefix) {
    return list
        .filter(r => !r.draft && r.publishedAt && r.tag.startsWith(prefix + 'v'))
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))[0];
}

function formatDate(iso) {
    const d = new Date(iso);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

function formatMb(bytes) {
    return Math.round(bytes / 1024 / 1024) + 'MB';
}

async function fillSlips() {
    const slips = document.querySelectorAll('[data-release]');
    if (!slips.length) {
        return;
    }
    let list;
    try {
        list = await loadReleases();
    } catch (e) {
        return;
    }
    slips.forEach(slip => {
        const prefix = slip.dataset.release;
        const r = latestOf(list, prefix);
        if (!r) {
            return;
        }
        const setup = r.assets.find(a => /-setup-.*\.exe$/.test(a.name));
        const set = (key, text) => slip.querySelectorAll(`[data-r="${key}"]`).forEach(el => el.textContent = text);
        set('version', r.tag.slice(prefix.length));
        set('date', formatDate(r.publishedAt));
        if (setup) set('size', formatMb(setup.size));
    });
}

/**
 * 토스트 메시지
 */
function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        toast.setAttribute('role', 'status');
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove('show'), 1600);
}

/**
 * data-copy 버튼: 값을 클립보드로
 */
function bindCopy() {
    document.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', () => {
            navigator.clipboard.writeText(btn.dataset.copy)
                .then(() => showToast(btn.dataset.copyDone || '복사했어요.'))
                .catch(() => showToast('복사하지 못했어요. 직접 적어 주세요.'));
        });
    });
}

/**
 * data-site-url: 이 사이트 첫 화면 주소 (키오스크 브라우저에 입력할 주소)
 */
function showSiteUrl() {
    const url = new URL('.', location.href).href.replace(/\/$/, '');
    document.querySelectorAll('[data-site-url]').forEach(el => el.textContent = url);
}

fillSlips();
bindCopy();
showSiteUrl();
