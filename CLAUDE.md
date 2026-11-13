# 점주 도구함 웹사이트

컴포즈 매장용 무료 프로그램 소개·다운로드 사이트. 정적 HTML (GitHub Pages).

## 사이트를 고칠 때

먼저 각 프로그램 저장소의 커밋 내역(`git log`)과 코드를 확인하고, 바뀐 기능·화면·설정·설치 경로를 페이지에 반영한다.
소개 문구, 사용 방법, 문제 해결(FAQ), 설치 방법, 버전 표시까지 같이 맞춘다.

| 페이지 | 프로그램 저장소 (`C:\Users\JiHoon\IdeaProjects\`) |
|---|---|
| `apporder-auto-accept.html` | `ComposeAppOrderCPP` (C++ 판. 예전 Java 판 `ComposeAppOrder` 는 안 씀) |
| `deposit.html` | `ComposeDeposit` |
| `kiosk-auto-start.html` | `Compose-KioskAutoRun` |
| `margin-check.html` | 웹사이트 https://margincheck.store |
| 메뉴 원가 계산기 (`index.html` 카드, 각 페이지 '다른 프로그램') | `profit-calculator` |
| 본사 공지 검색 (`index.html` 맨 아래 카드, 각 페이지 '다른 프로그램') | `notice-search` (https://notice-finder.duckdns.org) |

- 릴리스 버전·날짜·크기: https://github.com/coffee-manager/deploy/releases. 페이지의 `data-r` 기본값도 최신으로 맞춘다.
- 앱오더 대표 그림 `img/apporder/auto-accept.svg` 는 실제 화면이 아닌 그림이라 프로그램 화면이 바뀌어도 그대로 둔다.
- 마진체크 화면은 `https://margincheck.store/analyze?demo` 를 1280×860, 배율 1.5 로 캡처한다.
- 자동 업데이트·Java 안내 문구는 넣지 않는다.
