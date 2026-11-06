# dev-3.1 — QA 수정 단위 3.1: SCREEN_WIDTH를 48로

- Story: [1.3](../../stories/1.3.story.md)
- Entry: Dev QA 수정 단위 3.1, QA 라운드 2의 REQ-001(값), 결정 목록은 [dev-qa-r2](dev-qa-r2.md)
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.2 1.3 remote` run의 역할 작업. effort는 시스템이 숫자 30으로만 알려 주어 설정의 이름(`xhigh`)과의 대응을 확인하지 못했다
- 시각: 2026-11-06, RED 21:41 +0900, GREEN 21:42 +0900
- 입력 기준: 브랜치 `story/1.3`, 단위의 비교 기준 `8579e5a`(`DOCS` 커밋, 그 앞은 `Story Base` 병합 커밋 `12da9b3`). 제품과 시험 파일은 `12da9b3`과 `8579e5a`에서 같다

## 범위와 접근

- 지적: REQ-001(Required, `rework`, Dev). 필수 점검 1.3-INT-001이 기준 tip에서 실패한다.
- 결정: 고친다(실행 요청의 결정과 사용자의 `SCREEN_WIDTH` 결정, [dev-qa-r2](dev-qa-r2.md)).
- 접근: `TDD`(Story의 Dev Notes "폭 결정을 코드에 옮기는 일" 2번). 시나리오는 1.3-INT-001(RED와 GREEN), 1.3-UNIT-010(내보내기 이름), 1.3-UNIT-011(바꾸지 않는 파일), 1.3-INSP-001, 1.3-INSP-002다. 계획에 새 시험이 없다: 1.3-INT-001의 판정은 CI 규칙의 값 비교이고 시험 파일은 이 상수를 다시 단언하지 않는다.
- 바뀐 경로: `src/screen.js`(`SCREEN_WIDTH`의 값 한 곳). 새 기록 문서는 이 파일이다.
- 진단(`data/defect-diagnosis.md`): 증상은 규칙의 종료 상태 1과 메시지 `got 40`이다. 원인은 상수 `SCREEN_WIDTH`가 이전 수용 결정의 값 40을 담고 있다는 것이다. 이 값은 줄의 모양에 쓰이지 않아(`renderScreen`은 줄을 자르거나 접지 않는다) 값을 바꾸어도 `renderScreen`의 결과는 같다.

## 순서 있는 증거

Node.js v24.22.1, 프로젝트 루트.

### 1. RED, 값을 바꾸기 전

코드 상태: 브랜치 `story/1.3`, `Story Base` 병합 커밋 `12da9b3`이 만든 트리. `src/screen.js`는 `SCREEN_WIDTH = 40`이고 `git hash-object`는 `bbd96bea4be3`이다. 이 시점의 CI 규칙은 기준 tip의 규칙이다(`EXPECTED_WIDTH = 48`).

| 명령 | 결과 |
| --- | --- |
| `node ci/screen-rule.check.mjs` | 종료 상태 1, 출력 `src/screen.js must export SCREEN_WIDTH = 48, got 40` |
| `node --test` | 종료 상태 0, 68개 통과, 실패 0(기존 55개, 화면 13개) |

규칙이 값 불일치로 의도한 대로 실패했다(Story의 Dev Notes가 정한 RED). 모듈이나 심볼이 없어서 난 실패가 아니고 구문, 가져오기, 환경의 실패도 아니다. 이 실행은 Testing의 "기준 tip에서 관찰한 사실"을 `Story Base` 병합 커밋 뒤에 다시 확인한 것이다: `node --test` 68개 통과, 규칙의 종료 상태 1과 같은 메시지. Draft가 적은 사실과 같다.

### 2. 변경

`src/screen.js`의 `export const SCREEN_WIDTH = 40;`를 `export const SCREEN_WIDTH = 48;`로 바꾸었다. 그 위의 주석(디스플레이의 글자 폭이고 `renderScreen`은 줄을 이 폭으로 자르거나 접지 않는다)은 값에 기대지 않아 바꾸지 않았다. `git diff`는 한 줄 바뀜이다.

### 3. GREEN, 값을 바꾼 뒤

코드 상태: 위 변경만 있는 작업 트리(`src/screen.js`의 `git hash-object`는 `4c17930a0090`).

| 명령 | 결과 |
| --- | --- |
| `node ci/screen-rule.check.mjs` | 종료 상태 0, 출력 없음 |
| `node --test` | 종료 상태 0, 68개 통과, 실패 0 |

Testing의 "기준 tip에서 관찰한 사실"이 "그 사본에서 `SCREEN_WIDTH`의 값만 48로 바꾸면 `node --test`는 68개 통과하고 규칙은 종료 상태 0이다"라고 적은 대로다.

### 4. Cleaner 검토자에게 넘길 때의 상태

위임 직전 21:46 +0900의 상태: HEAD `8579e5a`, `git status --porcelain=v1`은 ` M src/screen.js`와 새 기록 문서 이 파일뿐, 색인은 비어 있음(`git ls-files --stage`와 `git status`의 출력 해시를 저장했다). 제품 파일 `src/screen.js`는 `4c17930a0090`, 시험 파일 `test/screen.test.js`는 `3ed20611195c`다. 검토자가 돌아온 21:48 +0900에 HEAD, 색인, 작업 트리 상태의 해시와 세 파일의 해시가 위임 때와 같음을 확인했다.

## Cleaner 결과

- 검토자: Dev 하위 세션이 시작한 하위 세션(`Agent` 도구, 유형 `general-purpose`, 요청 모델 별칭 `opus`, 요청 effort `high`, 이름 없음). 검토자가 자기 세션 정보에서 읽어 보고한 모델 ID는 `claude-opus-5-5`이고 effort는 숫자 30으로 읽히며 설정의 이름 `high`와의 대응은 확인하지 못했다(검토자의 자기 보고).
- 검토 범위: 바뀐 경로 `src/screen.js`의 한 줄 변경(`SCREEN_WIDTH`의 값). 시나리오 1.3-INT-001, 1.3-UNIT-010, 1.3-UNIT-011, 1.3-INSP-001, 1.3-INSP-002를 직접 다시 확인했다고 보고했다(규칙 종료 상태 0, `node --test` 68개 통과, 여섯 파일의 `git diff` 없음, 가져오기 검색 종료 상태 0, `src/screen.js`를 끝까지 읽음). 주석 위생 §2와 §3의 후보 검색(§1.1, §1.2, §1.4, §1.7)과 문맥 검토, 실제 ID 64개의 고정 문자열 검색을 했고 후보와 위반이 없다.
- 읽은 규칙 본문: `golden-rules`, `testing-tdd`, `javascript-language`, `javascript-crap`, `coding-principles`, `comments`, `crap`과 Hub와 두 색인, `load-project-rules.md`, `code-comment-style.md`, 주석 위생 체크리스트. 읽지 않은 본문은 `documentation`(cleaner의 규칙 종류가 아님)이다. Story는 일부만 읽었다고 보고했다.
- 검토자가 쓴 파일: 없음(지정한 작업 폴더 안팎 모두). 추적하는 파일을 바꾸지 않았다.
- 지적: 없다(no-change 결과). 검토자가 기각한 후보는 네 가지다. 리터럴 `48`은 이름 있는 상수의 값이어서 `coding-principles`의 Declared 단계이고, 주석의 "in characters"는 이 단위가 바꾸지 않았으며 값에 기대지 않고, 시험 파일의 `DISPLAY_WIDTH = 40`과 오류 줄 입력 `7 +`는 이 단위의 경로가 아니라 단위 3.2의 일이며, 상수의 값을 단언하는 시험이 없는 것은 계획이고 시험이 상수를 다시 단언하면 `testing-tdd`가 제외하는 꼴이다.
- 처분: 지적이 없어 파일을 바꾸지 않았다. 코드의 재검토를 위해 같은 검토자를 다시 부르지 않았다. 검토를 받은 뒤 모델 ID와 effort만 한 번 물었고, 그 답은 검토자가 파일이나 명령을 쓰지 않고 한 것이다.

## 정리 뒤 재점검과 최종 점검

Cleaner 결과가 파일을 바꾸지 않아 Coder의 결과가 그대로 유효하다(`src/screen.js`, `test/screen.test.js`, 읽는 엔진과 `package.json`이 GREEN 때와 같다). `local-task-done.md`에 따라 이 단위의 완료는 Coder의 결과를 잇고 스테이지 점검과 커밋만 더한다. 같은 상태에서 이 기록을 쓰며 다시 낸 결과는 다음과 같다.

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 1.3-INT-001 | `node ci/screen-rule.check.mjs` | GREEN의 종료 상태 0 |
| 전체 시험, 1.3-UNIT-010 | 프로젝트 루트의 `node --test` | GREEN의 68개 통과 |
| 1.3-INSP-001 | Story의 가져오기 검색 명령(436글자)을 저장된 글에서 뽑아 실행 | 종료 상태 0, 출력 없음 |
| 1.3-INSP-002 | `src/screen.js`를 끝까지 읽음(검토자도 읽음) | 결과는 `evaluate`와 `formatNumber`로 만든다. 입출력, 전역 상태, 호출 사이에 바뀌는 모듈 변수가 없다. `SCREEN_WIDTH`는 선언에만 나오고 줄의 모양에 쓰이지 않으며 줄을 자르거나 접는 코드가 없다. 잡은 오류를 `throw error;`로 그대로 던진다 |
| 1.3-UNIT-011 | `git diff --quiet d90c99e HEAD -- src/engine.js src/number-format.js test/engine.test.js test/number-format.test.js ci/screen-rule.check.mjs .github/workflows/ci.yml src/units.js test/units.test.js` | 종료 상태 0. 기존 여섯 파일과 기준 tip이 들여온 `src/units.js`, `test/units.test.js`에 차이가 없다 |
| 주석 위생 후보 검색(§1.1, §1.2, §1.4와 `IN-FLIGHT`) | `git diff -U0 -- src/screen.js`의 추가 줄 | 추가된 줄은 `export const SCREEN_WIDTH = 48;` 하나이고 후보가 없다 |
| CRAP | 측정하지 않음 | `quality.crap.commands`가 비어 있다. 통과도 차단도 아니다. 이 변경은 분기를 바꾸지 않는다 |

## 한계

- 새 시험이 없다. 1.3-INT-001의 판정은 CI 규칙의 값 비교이고 계획이 시험 파일의 상수 단언을 두지 않았다. 규칙이 값 불일치로 실패함은 RED가 보였다.
- CI 서비스의 실행은 보지 않았다(이 호출은 네트워크를 쓰지 않는다).
