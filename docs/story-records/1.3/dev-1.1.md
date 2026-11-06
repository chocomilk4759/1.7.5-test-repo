# dev-1.1 — 계산기 화면 구현

- Story: [1.3](../../stories/1.3.story.md)
- Entry: Dev SubTask 1.1
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.2 1.3 remote to Done` run의 역할 작업
- 시각: 2026-11-06, 시작 18:10 +0900, Cleaner 위임 18:18 +0900, 정리와 최종 점검 완료 18:26 +0900
- 입력 기준: 브랜치 `story/1.3`, 시작 커밋 `77a3c97`(`Approved -> InProgress`), 기준선 `main`의 `40e1a6b`. 이 SubTask는 새 파일 `src/screen.js`와 `test/screen.test.js`만 더한다. 기준에 두 파일이 없다.
- 환경: Node.js v24.22.1, Git 2.51.0. 점검 명령은 프로젝트 루트의 `node --test`(전체), `node --test test/screen.test.js`(조각 실행), `node ci/screen-rule.check.mjs`다. 외부 패키지와 테스트 대역은 쓰지 않았다.

## 읽은 규칙

`.bmad-core/tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`(Dev의 규칙 종류 `operations`, `design`, `documentation`). 완료 점검(`develop-story.md` Completion 4.5)을 위해 `comments`, `crap`, `javascript-crap`도 읽었다.
- 절차 문서: `develop-story.md`, `local-story-start.md`, `local-task-done.md`, `local-story-review.md`, `data/development-quality.md`, `data/local-git-workflow.md`, `data/story-paths.md`, `data/defect-diagnosis.md`, `data/verification-ownership.md`, `data/workflow-routing.md`, `tasks/publish-story.md`, `tasks/code-comment-style.md`, `checklists/comment-hygiene-checklist.md`, `checklists/story-dod-checklist.md`, `tasks/architecture-align.md`, `tasks/execute-checklist.md`를 끝까지 읽었다.

## 접근과 시나리오

접근은 `TDD`다. Story의 Recommended Execution Order대로 조각마다 RED → GREEN을 마쳤다. 시나리오 ID는 Story의 Testing을 그대로 쓴다. 먼저 모듈 없이 시험 파일만 돌려 보았고(`ERR_MODULE_NOT_FOUND`, 이것은 RED가 아니다), 이어 뼈대(`renderScreen`이 `undefined`를 돌려주고 `SCREEN_WIDTH`가 없는 파일)를 만든 뒤 값 단언 실패로 첫 RED를 보았다. 시나리오 1.3-UNIT-011, 1.3-INSP-001, 1.3-INSP-002는 아래 "최종 점검"에서 다룬다.

## 조각별 실행 기록

명령은 모두 `node --test test/screen.test.js`이고, 코드 상태는 직전 GREEN 뒤의 `src/screen.js`에 그 조각의 시험을 더한 것이다. "기준 통과"는 시험을 더한 뒤 처음 실행에서 이미 통과했다는 뜻이며 RED가 아니다. 그런 조각은 아래 "사후 민감도 점검"으로 시험이 해당 동작에 닿는지 보였다.

| 조각 | 시나리오 | 결과(처음 실행) | 구현(최소 변경) | GREEN |
| --- | --- | --- | --- | --- |
| 뼈대 | 1.3-UNIT-001의 첫 RED, 1.3-INT-001의 RED | RED: 시험 2개 실패, 값 단언 `actual: undefined`, `expected: '1 + 2 = 3'`와 `'1+2 = 3'`. 같은 상태(`src/screen.js`가 있고 `SCREEN_WIDTH`가 없음)에서 `node ci/screen-rule.check.mjs`는 종료 상태 1, 메시지 `src/screen.js must export SCREEN_WIDTH = 40, got undefined` | `export function renderScreen() {}` | |
| 1 | 1.3-UNIT-001 (R-1, R-2) | 위 RED | `` `${expression} = ${evaluate(expression)}` `` | 2/2 통과 |
| 2 | 1.3-UNIT-002 (R-3) | RED: 1개 실패, `actual: '0.1 + 0.2 = 0.30000000000000004'`, `expected: '0.1 + 0.2 = 0.3'` | 결과를 `formatNumber`로 표시 | 3/3 |
| 3 | 1.3-UNIT-004 (E-1, E-2, E-3) | RED: 1개 실패, `CalculationError`가 `renderScreen`을 빠져나옴(`division by zero at position 2`) | `CalculationError`를 `instanceof`로 가려 `오류: {메시지}`를 돌려주고 다른 오류는 잡은 그대로 다시 던짐 | 4/4 |
| 4 | 1.3-UNIT-006 (T-1, T-2) | 기준 통과(5/5). 조각 1의 `evaluate` 호출과 조각 3의 클래스 확인이 이미 이 동작을 낸다 | 없음 | 5/5 |
| 5 | 1.3-UNIT-007 (E-0) | RED: 1개 실패, `actual: '오류: unexpected end of expression at position 0'`, `expected: ''` | 문자열이고 U+0020만으로 이루어진 입력에 빈 글자를 돌려줌 | 6/6 |
| 정리 | | 시험 도우미 `assertErrorLines` 추출(오류 줄 단언 반복 제거), 시험 6/6 통과 유지 | | 6/6 |
| 6 | 1.3-UNIT-005 (E-4, E-5) | 기준 통과(8/8, 시험 둘) | 없음 | 8/8 |
| 7 | 1.3-UNIT-003 (R-4, E-2의 `7 +`) | 기준 통과(9/9) | 없음 | 9/9 |
| 8 | 1.3-UNIT-010, 1.3-INT-001 | RED: 내보내기 시험 1개 실패, `actual: [ 'renderScreen' ]`, `expected: [ 'SCREEN_WIDTH', 'renderScreen' ]`. 호출 사이 상태 시험은 기준 통과. 같은 상태에서 `node ci/screen-rule.check.mjs` 종료 상태 1, 같은 메시지 | `export const SCREEN_WIDTH = 40;` | 시험 11/11, `node ci/screen-rule.check.mjs` 종료 상태 0(출력 없음) |
| 9 | 1.3-UNIT-008, 1.3-UNIT-009 (U-1, U-2) | 기준 통과(13/13, 시험 둘) | 없음 | 13/13 |

1.3-INT-001의 RED는 뼈대의 상태에서 한 번 보았고 조각 8의 RED에서 같은 상태로 다시 보았다. 그 사이 조각들의 GREEN은 `SCREEN_WIDTH`를 더하지 않아 그 상태를 없애지 않았다. 그래서 RED는 `SCREEN_WIDTH`를 더하기 전의 상태에서 나왔고, GREEN은 그것을 더한 뒤의 종료 상태 0이다.

조각 8에서 호출 사이 상태 시험을 처음 만들 때는 세 입력을 차례로 한 번 부르고 같은 차례로 또 불렀다. 모듈 수준 `g` 플래그 정규식으로 공백 판정을 한 변형이 이 시험을 통과하고 빈 식 시험만 실패해서, 시험이 Story가 정한 "각각 두 번"의 뜻(같은 입력을 잇달아 두 번)에 닿지 않음을 알았다. 입력마다 잇달아 두 번 부르도록 시험을 고친 뒤 같은 변형이 두 시험에서 실패한다. 이것은 제품 코드의 실패한 수정이 아니라 시험을 강하게 한 일이다.

## 사후 민감도 점검

위 표의 기준 통과 시험이 해당 동작에 닿는지, 시나리오의 실패 기준에 적힌 틀린 구현 하나씩을 걸어 보였다. 이것은 RED가 아니라 사후 점검이다. 정리 뒤의 최종 `src/screen.js`에 바꾼 곳 하나씩만 더한 변형을 만들어 최종 시험 파일 13개에 돌렸다. 바꾸지 않은 최종 코드(통제)는 13/13 통과했다.

| 변형 | 바꾼 곳 | 결과 | 닿는 시나리오 |
| --- | --- | --- | --- |
| broad-catch | 오류 판정을 `if (error)`로 바꿔 모든 오류를 오류 줄로 만듦 | 1개 실패: "throws what evaluate throws when that is not a calculation error"의 행 "a number"에서 `renderScreen for a number must throw` | 1.3-UNIT-006 |
| catch-range-error | 판정에 `\|\| error instanceof RangeError`를 더함 | 같은 시험이 행 "an expression nested too deeply"에서 실패 | 1.3-UNIT-006 (T-2) |
| coerce-string | `evaluate(String(expression))`로 글자로 바꾸어 넘김 | 같은 시험이 행 "a number"에서 실패 | 1.3-UNIT-006 (T-1) |
| blank-truthiness | 빈 식 판정을 `!expression \|\| /^ *$/.test(expression)`로 바꿈 | 같은 시험이 행 "zero"에서 실패 | 1.3-UNIT-006 (T-1) |
| blank-method-call | 빈 식 판정을 `expression.trim() === ""`로 바꿈 | 같은 시험이 행 "a number"에서 실패: 메시지 `expression.trim is not a function`, 기대 `expression must be a string` | 1.3-UNIT-006 (T-1) |
| blank-string-coercion | 빈 식 판정을 `String(expression).trim() === ""`로 바꿈 | 같은 시험이 행 "an empty array"에서 실패 | 1.3-UNIT-006 (T-1) |
| name-check | 오류 판정을 `error.name === "CalculationError"`로 바꿈(`name`은 "Error") | 6개 실패: 오류 줄을 만드는 시험 전부 | 1.3-UNIT-004 |
| string-of-error | 오류 줄을 `String(error)`로 만듦 | 6개 실패 | 1.3-UNIT-004 |
| trim-before-evaluate | 문자열이면 다듬은 글자를 `evaluate`에 넘김 | 3개 실패: 받은 글자의 위치 시험, U+0020이 아닌 공백 시험, U-1 시험 | 1.3-UNIT-005, 1.3-UNIT-008 |
| normalize-whitespace | 모든 공백을 U+0020으로 바꾼 글자를 `evaluate`에 넘김 | 2개 실패: U+0020이 아닌 공백 시험, U-1 시험 | 1.3-UNIT-005 (E-5) |
| cut-at-40 | 값 줄을 40글자에서 자름 | 1개 실패: "returns a line longer than the display whole" | 1.3-UNIT-003 |
| wrap-at-40 | 40글자 뒤에 줄바꿈을 넣음 | 같은 시험 1개 실패 | 1.3-UNIT-003 |
| ellipsis-at-40 | 40글자를 넘으면 39글자에 말줄임을 붙임 | 같은 시험 1개 실패 | 1.3-UNIT-003 |
| stateful-regex | 모듈 수준 `g` 플래그 정규식으로 빈 식을 판정함 | 2개 실패: 빈 식 시험, "gives the same line for a repeated call, also after an error" | 1.3-UNIT-010 |
| white-space-echo | 모든 공백만의 입력에 받은 글자를 그대로 돌려줌 | 3개 실패: 빈 식 시험, 호출 반복 시험, U-1 시험 | 1.3-UNIT-008 |
| trimmed-double-space | 값 줄을 `{다듬은 식}  = {값}`(공백 둘)로 만듦 | 6개 실패: U-2 시험과 값 줄 시험들 | 1.3-UNIT-009 |
| rethrow-new-error | `throw error;`를 `throw new error.constructor(error.message);`로 바꿈 | 실패 없음(13/13 통과). 시험이 가리지 못한다 | 1.3-INSP-002의 읽기가 맡는다 |
| wrong-width | `SCREEN_WIDTH`를 41로 바꿈 | 화면 시험은 13/13 통과(시험 파일이 이 값을 단언하지 않는다). 같은 변형에 `node ci/screen-rule.check.mjs`를 돌리면 종료 상태 1, `src/screen.js must export SCREEN_WIDTH = 40, got 41` | 1.3-INT-001 |

변형은 시나리오의 실패 기준 가운데 `name` 글자로 가림, `String(error)`, 클래스를 가리지 않고 받음, 공백 판정의 메서드 호출, 글자로 바꾸어 가림, 40글자에서 자르거나 접거나 말줄임을 붙임, 다듬은 글자를 넘김, 호출 사이의 정규식 상태, 다른 글자를 돌려줌에 대응한다. 위 변형들은 각각 의도한 시험에서 실패했다.

## 표 행 전달 확인

표 1, 2, 3의 모든 입력 행이 실행되는 시험에 닿는다. 입력 글자를 시험 파일에서 하나씩 찾는 점검을 정리 뒤에도 다시 돌려 빠진 행이 없음을 확인했다.

| 표의 행 | 시험 |
| --- | --- |
| R-1 | "renders the expression, an equals sign and the result as one line" |
| R-2 | "keeps the spacing inside the expression as received" |
| R-3 | "shows the result with at most twelve significant digits" |
| R-4, E-2의 `7 +`(46글자의 오류 줄) | "returns a line longer than the display whole" |
| E-0 | "returns an empty text for an empty expression and for spaces only" |
| E-1, E-2, E-3 | "returns an error line instead of throwing for a rejected expression" |
| E-4 | "reports an error at its position in the expression as received" |
| E-5 | "does not take white space other than a space for a space" |
| T-1, T-2 | "throws what evaluate throws when that is not a calculation error" |
| U-1 | "answers white space other than a space with an empty text or an error line" |
| U-2 | "answers spaces around an expression with the text as received or trimmed" |
| 1.3-UNIT-010 | "exports only the display width and the render function", "gives the same line for a repeated call, also after an error" |

## 선택한 해석과 구현 결정

- 빈 식: 문자열이고 U+0020만으로 이루어진 입력(빈 글자 포함)이다. 엔진도 U+0020만 공백으로 보므로 같은 정의를 쓴다. 그 밖의 공백만의 글자(탭, 줄바꿈, U+00A0, U+3000)는 `evaluate`의 오류 줄이 된다. Story의 N-1은 미결이고 표 3 U-1은 빈 글자와 오류 줄을 둘 다 받는다.
- 문자열이 아닌 입력은 공백 판정에 닿지 않고 `evaluate`로 넘어가 `evaluate`의 `TypeError`가 그대로 나간다.
- `{식}`은 받은 글자 그대로 보이고, `evaluate`에도 받은 글자를 그대로 넘긴다(N-3). 앞뒤 U+0020의 표시는 정하지 않았고 표 3 U-2가 두 읽기를 받는다(N-2).
- 오류는 클래스(`instanceof CalculationError`)로 가린다. `CalculationError`의 `name`은 "Error"여서 글자로는 가려지지 않는다.
- `try`는 `evaluate` 호출만 감싼다. `formatNumber`의 `RangeError`는 `evaluate`가 유한한 값만 돌려주므로 닿지 않고, 닿더라도 가려지지 않는다.
- `SCREEN_WIDTH = 40`은 내보내기만 하고 줄의 모양에 쓰지 않는다. 시험 파일은 이 값을 단언하지 않는다(1.3-INT-001이 본다).
- 공개 함수 `renderScreen`에 JSDoc을 두어 호출자의 계약(네 가지 결과와 그대로 던지는 오류)을 선언에 적었다. Cleaner 지적 F-4에 따른 것이다.
- 시험의 방식: Story의 1.3-UNIT-006 행은 `assert.throws`를 적었으나 시험은 도우미 `thrownBy`로 던져진 오류를 얻어 `constructor`와 `message`를 `assert.equal`로 비교한다. 판정 내용은 같다(같은 입력의 `evaluate`가 던진 오류와 `constructor`, `message`가 같고 `CalculationError`의 인스턴스가 아니다). `data/verification-ownership.md`가 허용하는 같은 모드 안의 기법 변경이다.
- 호출 사이 상태 시험과 내보내기 시험은 Story의 1.3-UNIT-010대로 두 시험으로 나누었다. 내보내기 시험은 정적 가져오기를 한 번 더 두지 않으려고 `await import()`로 모듈 이름공간을 얻는다.
- 새 두 파일의 머리글은 요약 줄만 둔다. 저작권자, 연도, SPDX 값은 사용자 답("저작권자, 연도, SPDX 값은 지금 정하지 않습니다")대로 만들지 않았다. 빠진 입력은 이 값들이며 Task를 마치는 데 필요하지 않다.
- 시험 파일의 U+00A0과 U+3000은 JavaScript 탈출 표기로 둔다. 파일 쓰기 도구가 한 번 U+00A0을 실제 글자로 바꾸어 저장했기에 저장한 뒤 파일의 바이트를 확인했고, 실제 글자를 탈출 표기로 되돌렸다. 최종 파일에는 U+00A0과 U+3000의 실제 글자가 없고(바이트 검색 0줄) 탈출 표기만 있다.

## Cleaner 결과

- 검토자: Dev 하위 세션이 직접 시작한 하위 세션. 요청 모델 별칭 `opus`, effort `high`. 검토자가 자기 세션 정보에서 읽어 보고한 모델 ID는 `claude-opus-5-5`이고 effort는 세션 정보에서 읽을 수 없다고 보고했다(요청은 `high`, 설정값과 같다).
- 위임 입력: 프로젝트 루트, Story 경로, SubTask 1.1, 접근 `TDD`와 시나리오 ID, 비교 기준(`40e1a6b`, HEAD `77a3c97`), 바뀐 경로(새 파일 둘), 시험 명령, CRAP 측정 안 함, 검토자의 작업 폴더 하나(프로젝트 임시 영역). 위임 전 작업 트리는 새 파일 두 개만 있었고 두 파일의 Git 해시와 인덱스 해시를 기록했다. 검토자가 돌아온 뒤 같은 값을 다시 얻어 작업 트리와 인덱스가 위임 이후 바뀌지 않았음을 확인한 다음 지적을 판단했다.
- 검토자가 읽은 규칙: 로더의 순서대로 Hub와 두 색인, 본문 `golden-rules`, `testing-tdd`, `coding-principles`, `comments`, `crap`, `javascript-language`, `javascript-crap`. `documentation`은 검토자의 규칙 종류에 없어 읽지 않았다. 절차 문서는 `data/development-quality.md`의 해당 섹션, `tasks/code-comment-style.md`, `checklists/comment-hygiene-checklist.md`다. `check-instructions.sh`는 종료 상태 0이다.
- 검토자가 쓴 파일: 모두 자신이 만든 것이고 Dev가 지정한 작업 폴더 안에 있다(실험 스크립트 둘, 시험 초안 하나, 변형 사본 20개 폴더). 그 폴더 밖에 쓴 파일과 바꾼 기존 파일은 없다.
- 검토 범위: `src/screen.js`, `test/screen.test.js`. 정확성이나 AC에 닿는 지적은 없었고, 품질 규칙과 검사 목록에 닿는 지적이 6건이다.

| ID | 위치 | 기준 | 신뢰도 | 처분 | 까닭 |
| --- | --- | --- | --- | --- | --- |
| F-1 | `test/screen.test.js`의 `NESTED_TOO_DEEP` | CL-GLD-001 반복되는 숫자 리터럴 | high | 받아들임 | 깊이 `100000`이 두 번 적혀 함께 고쳐야 했다. 이름 `NESTING_LEVELS`를 하나 두었다 |
| F-2 | `assertErrorLines`와 `assertLines` | CL-GLD-005 | medium | 받아들임 | 비교와 실패 메시지 꼴이 같은 반복문 둘이었다. `assertErrorLines`가 `assertLines`를 부르도록 줄였다 |
| F-3 | "returns a line longer than the display whole", 호출 반복 시험 | CL-GLD-005 | low | 받아들임 | 한 시험 안에서 같은 입력(`7 +`, `7 + a`)을 두 번 적었다. 지역 상수로 두었다 |
| F-4 | `src/screen.js`의 `renderScreen` | CC-CMT-012, CC-CMT-003 | medium | 받아들임 | 호출자가 알아야 할 결과 넷이 선언에 없었다. 선언 위에 영어 JSDoc을 두고 그대로 던지는 오류는 `@throws`로 적었다. 본문 주석은 공백 판정의 까닭만 남겼다 |
| F-5 | `test/screen.test.js`의 `DISPLAY_WIDTH` 위 주석 | CC-CMT-013, CC-CMT-008 | medium | 받아들임 | 바로 아래 선언과 시험 이름을 되풀이했다. 주석을 지웠다 |
| F-6 | 시험 이름 "keeps no state between calls, also after an error" | CC-CMT-010, 주석 절의 시험 이름 규칙 | low | 받아들임 | 단언은 정해진 호출 차례에서 결과가 같은지만 보는데 이름은 상태가 없다고 단정했다. "gives the same line for a repeated call, also after an error"로 바꿨다. 상태 유무는 1.3-INSP-002의 읽기가 판단한다 |

받아들이지 않은 후보: `await import()`를 정적 가져오기로 바꾸는 것(동작 차이 없음, 시험 한 개의 일), `7 +` 줄의 길이 단언(Story의 E-2가 이 입력으로 자르지 않음을 보라고 정했고 틀릴 때 조용히 지나가지 않음), 1.3-UNIT-006의 `assert.throws`(위 "선택한 해석"에 실제 방식을 적었다), SPDX 없는 머리글(사용자 답대로). 검토자의 변형(통제 포함 폴더 20개)은 대부분 의도한 시험에서 실패했고, 살아남은 변형은 `rethrow-*` 셋(INSP-002의 대상), `accepted-*` 둘(표 3이 받는 읽기), `cut-at-eighty`(53글자 줄까지만 시험하며 표가 정한 범위)다.

PO1-N10과 검토자의 판단 (b): `catch` 블록은 잡은 객체를 `throw error;`로 그대로 다시 던진다. 같은 클래스와 메시지로 새로 만든 오류는 시험이 가리지 못한다(검토자의 변형 셋과 위의 `rethrow-new-error`가 모두 통과). 객체 동일성을 직접 보는 자동 판별은 없다: `evaluate`는 호출마다 새 오류를 만들고, 입력으로 오류 객체를 주입할 길이 없고, 대역은 시스템 경계에만 허용된다. 부분 판별로 검토자가 시험한 `error.stack`의 머리 줄과 첫 프레임 비교는 T-1에서 새로 만든 오류를 잡지만, V8이 만드는 글에 기대는 곁 통로여서 `testing-tdd`가 제외하는 형식에 가깝고, 스택을 복사한 변형은 통과하며, T-2(`D`)에는 호출 깊이에 따라 첫 프레임이 달라 쓸 수 없다. 그래서 이 시험을 더하지 않았고 판정은 1.3-INSP-002의 읽기에 둔다.

### 정리 뒤 재점검

받아들인 정리는 시험의 상수와 도우미, 시험 이름, 주석, JSDoc이며 제품의 동작을 바꾸지 않는다. 정리 뒤에 다음을 다시 돌렸다. 프로젝트 루트의 `node --test` 48개 통과(기존 35, 화면 13), `node ci/screen-rule.check.mjs` 종료 상태 0, 1.3-INSP-001 종료 상태 0, 위 사후 민감도 점검 전부(변형을 최종 코드에서 다시 만들어 최종 시험에 돌림), 표 행 확인, 주석 위생 후보 검색(아래). 정리 전에 얻은 결과는 정리 뒤의 판정으로 쓰지 않았다.

## 최종 점검

최종 상태는 두 파일의 Git 해시(`git hash-object --no-filters`) `src/screen.js` `bbd96bea4be3`, `test/screen.test.js` `3ed20611195c`다.

| 점검 | 명령 또는 방법 | 결과 |
| --- | --- | --- |
| 1.3-UNIT-001 ~ 010 | `node --test test/screen.test.js` | 13개 통과 |
| 전체 시험과 1.3-UNIT-011의 시험 부분 | 프로젝트 루트의 `node --test` | 48개 통과, 실패 0, 취소와 건너뜀 0 (기존 35개와 화면 13개). 기존 테스트가 하나도 실패하지 않았다 |
| 1.3-UNIT-011의 diff 부분 | `git diff --quiet 40e1a6b -- src/engine.js src/number-format.js test/engine.test.js test/number-format.test.js ci/screen-rule.check.mjs .github/workflows/ci.yml` | 종료 상태 0, 여섯 파일에 변경 없음 |
| 1.3-INT-001 | `src/screen.js`가 있는 상태에서 `node ci/screen-rule.check.mjs` | 종료 상태 0, 출력 없음. RED(`SCREEN_WIDTH`가 없는 상태의 종료 상태 1과 메시지)는 위 표에 있다. `git status --short`가 `src/screen.js`를 새 파일로 보인다 |
| 1.3-INSP-001 | Story의 "가져오기 검색" 명령 | 종료 상태 0, 걸린 줄 없음. 이 명령에서 `src/screen.js`의 가져오기 줄은 `./engine.js`와 `./number-format.js` 둘뿐이다. `node:` 가져오기를 더한 사본에 돌린 음성 점검은 종료 상태 1과 그 줄을 냈다 |
| 1.3-INSP-002 | `src/screen.js`를 끝까지 읽음(Dev의 읽기와 Cleaner 검토자의 판단 (a), (b)) | 아래 |

1.3-INSP-002의 판단 목록과 결과. 모두 통과다.

- 결과를 `evaluate`로 계산하고 `formatNumber`로 표시한다.
- 입출력이 없다. 가져오기는 `./engine.js`와 `./number-format.js`뿐이다.
- 호출 사이에 바뀌는 모듈 변수가 없다. 모듈 수준 바인딩은 상수 `SCREEN_WIDTH` 하나이고, 정규식은 `g` 플래그가 없는 함수 안의 리터럴이다.
- `SCREEN_WIDTH`는 선언과 내보내기에만 나오고 줄의 모양에 쓰지 않는다. `slice`, `substring`, `substr`, `padEnd`, `padStart`를 찾은 검색에 일치가 없고 읽어서도 줄을 자르거나 접는 코드가 없다.
- 잡은 오류를 그대로 다시 던진다(PO1-N10). `throw error;`이며 같은 클래스와 메시지로 새 오류를 만들지 않는다. 시험은 이 구별을 못 하므로(위 `rethrow-new-error`) 이 읽기가 판정한다.

### 주석 위생(`checklists/comment-hygiene-checklist.md`)

대상은 새 파일 `src/screen.js`와 `test/screen.test.js`이고 비교 기준 `40e1a6b`에 두 파일이 없어 기존 후보가 없다. 후보 검색은 §1.1(추적 번호), §1.2(작업과 검토 번호의 접두와 이 Story의 번호 꼴), §1.3(외부 경로), §1.4(`IN-FLIGHT`), §1.7(편집 표지와 날짜)을 두 파일에 돌렸고 모두 일치 0건이다. 비ASCII 글자는 표시 글자 `오류: ` 셋뿐이다(코드 둘과 JSDoc 하나). 새 주석은 모두 영어이고 이유와 계약을 설명한다. 두 파일은 UTF-8이고 LF다. 시험 이름이 단언의 범위와 맞는지는 읽어서 확인했고 Cleaner 지적 F-6을 반영했다. `pending_after_story_done`은 0이고 IN-FLIGHT 주석을 만들지 않았다.

### CRAP

`quality.crap.commands`가 비어 있어 `src/screen.js`를 측정할 명령이 없다. CRAP은 측정하지 않음으로 기록한다. 측정 제안은 이미 future-work 파일에 있는 항목이 들고 있어 새로 하지 않았다.

### 한계

- 시험이 가리지 못하는 것: 잡은 오류를 새로 만들어 던지는 구현(위). 1.3-INSP-002의 읽기만 판정한다.
- E-2, E-3, E-5, T-1, T-2의 기대는 지금 엔진의 동작(메시지와 오류 클래스)에 기대며 수용된 결정이 아니다. 엔진이 바뀌면 SM의 수정과 PO의 재검증이 이 행들을 고친다.
- 표 3 U-1, U-2는 두 읽기를 받는다. N-1, N-2의 답이 오면 SM이 줄인다.
- 1.3-INSP-001은 줄의 글자 꼴만 보며 Story가 적은 한계가 그대로 남는다.
- 사후 민감도 점검은 RED가 아니다. 기준 통과 조각의 RED는 없다.
- 저작권자, 연도, SPDX 값은 사용자 답대로 정하지 않았다.
- CRAP은 측정하지 않았다.
