# qa-r3 — 계산기 화면

- Story: [1.3](../../stories/1.3.story.md)
- Entry: QA review round 3, 다시 열기 뒤의 전체 리뷰(리뷰 루프의 1회차)
- Reviewer and time: Quinn(QA 하위 세션, 모델 `claude-opus-5-5`, effort `max`, 둘 다 시스템이 알려 준 값), `*run-story 1.2 1.3 remote` run의 역할 작업, 회차 1, 회차 2, 완료 점검과 다른 새 세션. 2026-11-06, 점검 실행 22:12 +0900부터, 기록 작성 22:28 +0900부터. 점검은 이 세션이 직접 실행했고 하위 세션을 시작하지 않았다.
- Reviewed inputs: 브랜치 `story/1.3`, HEAD `b764e00e6d8814c0645b024f46379615944a3c09`, 커밋하지 않은 변경 없음. 기준 tip `d90c99e2f6e4d94e17d755fd4b4a5ac672f0b685`(로컬 `main`과 `origin/main`이 같고 fetch하지 않았다). 앞 회차의 head `f5aea95`. `src/screen.js`의 구현 개정은 `f67f0c5`, `test/screen.test.js`의 구현 개정은 `6bd260f`이고 그 뒤의 커밋은 Story와 기록 문서만 바꾼다.

## 이 회차의 성격

회차 2의 늦은 지적이 회차 1의 통과를 뒤집어 다음 리뷰가 새 세션의 전체 리뷰가 되었다(`data/finding-classification.md` 섹션 Later rounds). 그래서 앞 회차의 결론을 잇지 않고 Story, 코드, 시험, 필수 점검을 이 회차의 입력으로 다시 판정했고 Dev의 평가를 근거로 삼지 않았다. 앞선 기록은 대조 대상으로 읽었다. 리뷰 루프의 1회차이고 gate의 round 값은 3이다. Done은 이 작업의 일이 아니다.

## 읽은 입력과 규칙

- 끝까지 읽음: `agents/qa.md`, `tasks/load-project-rules.md`, `core-config.yaml`, `project-map.md`, Hub, Common 색인, JavaScript README와 색인, QA의 규칙 종류에 드는 본문 `golden-rules`, `coding-principles`, `comments`, `documentation`, `testing-tdd`, `crap`, `javascript-language`, `javascript-crap`, `tasks/review-story.md`, `tasks/qa-gate.md`, `tasks/review-loop.md`, `tasks/trace-requirements.md`, `tasks/nfr-assess.md`, `tasks/code-comment-style.md`, `tasks/in-flight-comment-lifecycle.md`, `tasks/architecture-align.md`, `tasks/reopen-story.md`, `tasks/apply-qa-fixes.md`, `tasks/local-story-review.md`, `checklists/comment-hygiene-checklist.md`, `templates/qa-gate-tmpl.yaml`, `data/agent-context.md`, `data/finding-classification.md`, `data/development-quality.md`, `data/verification-ownership.md`, `data/story-paths.md`, `data/local-git-workflow.md`, `data/domain-language.md`, `data/future-work-planning.md`, `utils/checks/gate-rules.awk`, `utils/checks/check-done.sh`.
- 일부만 읽음: `tasks/run-story.md`(Role sessions, Rounds, Checks after each task), `data/workflow-routing.md`(Story temporary material과 In a run), `data/configuration.md`(`workflow.run.sessions` 행), `tasks/local-story-done.md`(처리 줄의 문단), `templates/story-tmpl.yaml`(QA Results), `utils/checks/story-rules.awk`(처리 줄), `utils/checks/check-owned.sh`(머리).
- 프로젝트 입력을 끝까지 읽음: Story 파일, gate, `qa-r1`, `qa-r2`, `qa-done`, `sm-2`, `po-r2`, `dev-1.1`, `dev-2.1`, `dev-3.1`, `dev-3.2`, `dev-3.3`, `dev-qa-r1`, `dev-qa-r2`, `dev-dod-2`, `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`, `docs/planning/future-work.md`, `README.md`, `package.json`, `.github/workflows/ci.yml`, `ci/screen-rule.check.mjs`, `src/screen.js`, `src/engine.js`, `src/number-format.js`, `test/screen.test.js`. 이어가기 로그는 Story 1.3 섹션과 `remote` run 섹션을 읽었다.
- 일부만 읽음: `dev-dod-1`(앞부분). 읽지 않음: `sm-1`, `po-r1`(Story의 1회 항목과 `sm-2`, `po-r2`로 대신했다), `src/units.js`, `test/units.test.js`, `test/engine.test.js`, `test/number-format.test.js`(기준 tip과 같음을 diff로 보았고 시험은 실행했다).
- `check-instructions.sh` 종료 상태 0. `docs/domain-glossary.md`와 `docs/research`는 없고 수용된 문서의 뜻을 썼다.

## Spec Review

### 앞 회차 지적의 판정

| ID | 판정 | 근거 |
| --- | --- | --- |
| REQ-001, Required | RESOLVED | HEAD가 기준 tip을 포함하고(`git rev-list --count HEAD..main`이 0, 병합 커밋 `12da9b3`의 `git log --remerge-diff` 출력 없음) 규칙 파일이 기준 tip과 같다. `src/screen.js`는 `export const SCREEN_WIDTH = 48;`이고 `node ci/screen-rule.check.mjs` 종료 상태 0, 출력 없음, `node --test` 68개 통과다. 시험은 `DISPLAY_WIDTH = 48`이고 긴 오류 줄의 입력이 `"7 +".padEnd(1000)`이다 |
| REQ-002, Required | RESOLVED | `qa-r2`의 목록 12행을 저장된 Story에 하나씩 대조해 모두 고쳐졌다. 사용자의 결정이 Scope and Dependencies에 질문, 답, 선택지의 글, 근거, 결정자, 범위와 함께 있고 글이 이 작업의 지시와 같다. PO 재검증이 GO다(`check-stage.sh po-record`: GO, Round 2, complete) |
| TEST-001, Optional | RESOLVED | 두 시험에 행이 더해졌고 지적의 변이 둘이 이제 실패한다. 아래 "변이 결과". 제품 코드는 받은 글자를 그대로 넘긴다 |

SM 소유 섹션(Scope and Dependencies, Tasks / Subtasks, Dev Notes)에 남은 40은 사용자 결정의 질문과 근거, 메인 세션의 답의 인용과 그 값이 역사라는 문장, 커밋 `cb50c3c`의 변화(40에서 48로), 실패 메시지 `got 40`, `Story Base` 병합 커밋 전의 규칙을 말하는 문장이다. 모두 과거나 인용이고 지금 요구하는 값은 48이다. SM Draft Checklist 1회 항목의 N-8은 그때의 기록이다.

### AC와 결정의 대조

| 수용된 내용 | 코드의 근거 | 실행의 근거 | 결과 |
| --- | --- | --- | --- |
| AC 1 줄의 꼴과 `{식}` | `` `${expression} = ${formatNumber(value)}` `` | 표 1의 23행이 글자까지 같고 독립 오라클과도 같다 | 충족 |
| AC 1 `evaluate`와 `formatNumber` | `value = evaluate(expression)`, 유효 숫자 인자 없음 | 변이 `raw-value`, `to-fixed`, `to-precision-text`, `digits-10`, `digits-11`, `digits-13` 모두 실패 | 충족 |
| AC 2 오류 줄 | `error instanceof CalculationError`이면 `` `오류: ${error.message}` `` | 표의 오류 입력 22행, 변이 `catch-by-name`, `string-of-error`, `prefix-*`, `message-upper`, `reason-only`, `error-line-newline` 모두 실패 | 충족 |
| AC 2 다른 오류 | `throw error;`로 잡은 객체를 그대로 던진다 | 표의 8행이 같은 클래스와 메시지로 던진다. 변이 `catch-all`, `catch-range-too`, `catch-type-too`, `swallow-other` 모두 실패 | 충족 |
| AC 3 빈 글자 | `typeof expression === "string"`이고 `/^ *$/`에 맞으면 빈 글자 | E-0의 3행, 변이 `blank-*` 13개 실패 | 충족 |
| 사용자의 결정 `SCREEN_WIDTH = 48` | `export const SCREEN_WIDTH = 48;` | 규칙 종료 상태 0, 값 47, 49, 40, 글자 `48`, 내보내기 없음의 사본은 종료 상태 1 | 충족 |
| 메인 세션의 답의 자르거나 접지 않음 | `SCREEN_WIDTH`가 선언에만 나온다 | 53글자 값 줄과 49글자 오류 줄이 그대로 나온다. 48글자에서 자르거나 접거나 말줄임을 붙이는 변이가 모두 실패한다. 속성 실행에서 48글자를 넘는 줄 3만 5529개가 명세와 같다 | 충족 |
| 설계 원칙: 가져오기 | `./engine.js`, `./number-format.js` 두 줄 | 1.3-INSP-001 종료 상태 0, 출력 없음 | 충족 |
| 설계 원칙: 순수 함수 | 입출력과 전역 접근 없음, 바뀌는 모듈 변수 없음 | 1.3-INSP-002 읽기, 두 번 부르는 시험, 속성 실행 | 충족 |

AC 번호 줄 3개는 `docs/prd.md`의 Story 1.3 항목과 같다. `docs/prd.md`, `docs/architecture.md`, `docs/planning`, `README.md`, `package.json`은 기준 tip과 같아 이 Story가 바꾸지 않았다.

### 시나리오와 시험 이름의 대응

마지막 열의 "통과"는 이 회차의 `node --test`나 명령의 결과다.

| 시나리오 | 방식 | 시험 이름 또는 방법 | 민감도의 근거(이 회차의 변이) | 결과 |
| --- | --- | --- | --- | --- |
| 1.3-UNIT-001 | automated | `renders the expression, an equals sign and the result as one line`, `keeps the spacing inside the expression as received` | `value-only`, `separator-none`, `separator-double`, `trailing-newline`, `expression-collapsed`, `expression-removed`, `zero-as-empty` 실패 | 통과 |
| 1.3-UNIT-002 | automated | `shows the result with at most twelve significant digits` | `raw-value`, `to-fixed`, `to-precision-text`, `digits-10`, `digits-11`, `digits-13` 실패 | 통과 |
| 1.3-UNIT-003 | automated | `returns a line longer than the display whole` | `cut-value-48`, `cut-value-by-width`, `cut-value-52`, `wrap-value-48`, `ellipsis-value-48`, `cut-error-48`, `cut-error-by-width`, `wrap-error-48`, `ellipsis-error-48` 실패. `cut-value-53`, `cut-value-60`, `cut-error-49`, `cut-error-60` 통과(`coverage_gaps`가 들고 1.3-INSP-002가 본다) | 통과 |
| 1.3-UNIT-004 | automated | `returns an error line instead of throwing for a rejected expression` | `catch-by-name`, `catch-none`, `string-of-error`, `prefix-no-space`, `prefix-english`, `prefix-fullwidth-colon`, `message-upper`, `reason-only`, `error-line-newline`, `pad-error-48` 실패 | 통과 |
| 1.3-UNIT-005 | automated | `reports an error at its position in the expression as received`, `does not take white space other than a space for a space` | `pass-trim`, `pass-trim-start`, `pass-trim-end`, `pass-no-leading-u0020`, `pass-no-trailing-u0020`, `pass-no-carriage-returns`, `pass-carriage-returns-as-space`, `pass-collapsed-u0020`, `pass-tabs-as-spaces`, `pass-no-newlines`, `pass-nbsp-as-space`, `pass-all-white-space`, `blank-multiline-flag` 실패. `pass-other-separators` 통과(아래) | 통과 |
| 1.3-UNIT-006 | automated | `throws what evaluate throws when that is not a calculation error` | `catch-all`, `catch-range-too`, `catch-type-too`, `rethrow-plain-error`, `rethrow-wrapped-message`, `swallow-other`, `blank-truthiness`, `blank-method-call`, `blank-optional-call`, `blank-string-coercion`, `blank-no-type-test`, `pass-string-coercion` 실패. 새 오류를 같은 클래스와 메시지로 던지는 셋 통과(PO1-N10) | 통과 |
| 1.3-UNIT-007 | automated | `returns an empty text for an empty expression and for spaces only` | `blank-only-empty`, `blank-one-at-most`, `blank-one-or-more`, `blank-echo`, `blank-as-zero-line` 실패 | 통과 |
| 1.3-UNIT-008 | automated | `answers white space other than a space with an empty text or an error line` | `pass-ideographic-as-space` 실패. `accepted-blank-js-trim`, `accepted-blank-tab-too`는 표 3이 받아 통과 | 통과 |
| 1.3-UNIT-009 | automated | `answers spaces around an expression with the text as received or trimmed` | `display-trim-start`, `display-trim-end` 실패. `accepted-display-trimmed`는 표 3이 받아 통과 | 통과 |
| 1.3-UNIT-010 | automated | `exports only the display width and the render function`, `gives the same line for a repeated call, also after an error` | `extra-export`, `default-export`, `width-missing`, `blank-global-regex`, `blank-sticky-regex`, `state-after-error` 실패. 출력에 나타나지 않는 상태(`cache-of-lines`, `counter-state`)는 통과하고 1.3-INSP-002가 본다 | 통과 |
| 1.3-UNIT-011 | automated | 기존 시험 55개(엔진 31, 표시 규칙 4, 단위 20), `git diff --quiet d90c99e HEAD --` 여섯 파일 | 종료 상태 0. `src/units.js`, `test/units.test.js`를 더해도 종료 상태 0 | 통과 |
| 1.3-INT-001 | automated | `git ls-files --error-unmatch src/screen.js`, `node ci/screen-rule.check.mjs` | `width-47`, `width-49`, `width-40`, `width-text`, `width-missing`의 사본에서 종료 상태 1. `width-47`의 메시지는 `src/screen.js must export SCREEN_WIDTH = 48, got 47` | 통과 |
| 1.3-INSP-001 | automated | 저장된 Story에서 그대로 뽑은 가져오기 검색(436글자) | 종료 상태 0, 출력 없음. `import-units`, `import-node-fs`, `import-dynamic`의 사본은 종료 상태 1 | 통과 |
| 1.3-INSP-002 | agent-review | `src/screen.js`를 끝까지 읽음. 아래 "읽기 결과" | 해당 없음 | 통과 |
| 1.3-INSP-003 | agent-review | 누적 변경을 Architecture와 `README.md`에 대조. 아래 "읽기 결과" | 해당 없음 | 통과 |

실행 맵과 요약을 다시 세었다. 시나리오 15개, unit 11, integration 1, inspection 3, P0 4, P1 8, P2 3, automated 13, agent-review 2로 표와 맞고 어긋나는 ID가 없다. 사용자 전용 시나리오는 없다.

추적 범위: AC 1, AC 2, AC 3 모두 `full`이다. AC 2의 "그대로"의 객체 동일성은 시험이 아니라 1.3-INSP-002의 읽기가 덮는다. 결과는 모두 통과다.

### 읽기 결과

1.3-INSP-002의 판단 목록과 결과다.

- 결과를 `evaluate`로 계산하고 `formatNumber(value)`로 표시한다. 같은 결과를 내는 다른 계산이 없다.
- 입출력과 전역 접근이 없다. `console`, `process`, `globalThis`가 없고 가져오기는 두 줄이다.
- 호출 사이에 바뀌는 모듈 변수가 없다. 모듈 수준 바인딩은 상수 `SCREEN_WIDTH` 하나이고 `let value`는 함수 안에 있다. 정규식은 함수 안의 리터럴이고 `g`, `y` 플래그가 없다.
- `SCREEN_WIDTH`는 선언에만 나오고 줄의 모양에 쓰지 않는다. `slice`, `substring`, `padEnd` 등의 호출과 줄바꿈 글자를 넣는 코드가 없다.
- 오류는 클래스로 가리고 잡은 오류는 `throw error;`로 그대로 던진다(PO1-N10).

1.3-INSP-003의 결과다. `docs/architecture.md`의 기술 구성(ES 모듈, Node.js 24, 내장 모듈만, `node:test`)에 어긋남이 없다. 소스 트리의 `src/screen.js` 행 "계산기 화면(`renderScreen`)"은 여전히 맞고 `SCREEN_WIDTH`가 그 행에 없는 틈은 Task 2.1과 N-8이 고치지 않기로 정했다. `test/screen.test.js`가 엔진을 함께 가져오는 것은 Story의 "인터페이스와 파일 위치"가 정했다. 설계 원칙의 순수 함수, `eval`과 `Function` 없음(검색 일치 없음), 가져오기 제한이 맞다. 오류 위치는 받은 글자의 위치여서 D-1과 어긋나지 않는다. `README.md`는 화면을 서술하지 않아 고칠 곳이 없다. `dev-dod-2`의 no-change 결론과 같다.

### 실행한 점검

Node.js v24.22.1, Git 2.51.0, 프로젝트 루트, HEAD `b764e00`.

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 입력 고정 | `git status --porcelain=v1`, `git rev-parse`, `git merge-base --is-ancestor d90c99e HEAD` | 커밋하지 않은 변경 없음, `main`과 `origin/main`이 d90c99e, 종료 상태 0 |
| 병합 커밋 | `git log -1 --remerge-diff 12da9b3`, 부모 | 출력 없음, 부모 `e71238d`와 `d90c99e`, 제목이 `[story-1.3] Story Base: main at d90c99e2f6e4d94e17d755fd4b4a5ac672f0b685` |
| 전체 시험 | 프로젝트 루트의 `node --test` | 종료 상태 0, 68개 통과, 실패 0, 취소와 건너뜀 0. 파일별로 엔진 31, 표시 규칙 4, 단위 20, 화면 13 |
| CI 규칙 | `git ls-files --error-unmatch src/screen.js`, `node ci/screen-rule.check.mjs` | 파일이 있고 종료 상태 0, 출력 없음 |
| 바꾸지 않는 파일 | `git diff --quiet d90c99e HEAD --` 여섯 파일과 `src/units.js`, `test/units.test.js` | 종료 상태 0 |
| 기준 tip과 다른 경로 | `git diff --name-status d90c99e HEAD` | 20개, 모두 추가. gate, Story, 기록 문서 16개, `src/screen.js`, `test/screen.test.js` |
| 표 대조 | Story의 글에서 표 1의 행을 읽고 표 2, 3의 행은 행의 글과 대조해 적어, 호출을 기록하는 사본에서 전달 시험을 실행 | 65행 모두 닿음(R-1 10, R-2 3, R-3 9, R-4 1, E-0 3, E-1 6, E-2 4, E-3 3, E-4 3, E-5 5, E-6 1, T-1 7, T-2 1, U-1 6, U-2 3), 표 1의 23행은 기대 글자와 같음 |
| 독립 오라클 | 제품과 코드를 나누지 않는 BigInt 유리수 계산, 규칙에서 쓴 12자리 반올림, ECMAScript의 글자 변환 규칙 | 23행에서 오라클, Story, 전달 모듈이 같음 |
| 줄의 길이 | 전달 모듈로 표의 입력을 돌림 | 48글자를 넘는 줄은 R-4의 53글자와 E-6의 49글자뿐. `W`는 1000글자이고 줄은 `오류: unexpected end of expression at position 1000`. `7 +`의 줄은 46글자 |
| 변이 | 사본에 한 곳씩 바꾸어 전달 시험, CI 규칙, 가져오기 검색을 실행 | 아래 "변이 결과" |
| 속성 실행 | 씨앗을 고정한 문자열 25만 2000개: 길이 0 ~ 8의 임의 글자 20만, 문법에 맞는 긴 식 5만, 끝에 오류와 공백이 있는 긴 식 2000 | 빈 글자 2만 4663, 값 줄 5만 5120, 오류 줄 17만 2217, 48글자를 넘는 줄 3만 5529(값 줄 3만 5376, 오류 줄 153), 가장 긴 줄 1397글자. 던짐, 줄바꿈 글자(LF, CR, U+2028, U+2029), 두 번 부를 때의 차이, 명세와의 어긋남 0건 |
| 문자열이 아닌 입력 | `String` 객체, `Symbol`, `toString`이 있는 객체, `true` | 모두 `TypeError: expression must be a string` |
| 새 주석의 사실 | `7 +  `, `7 +`, `7 + a  `, `7 + a`의 줄 | 위치 5, 3, 4, 4. 주석의 "the trailing spaces move the position"과 "which they do not move"가 맞다 |
| 파일의 바이트 | 두 파일의 CR, U+00A0, U+3000 실제 바이트 | 모두 0줄. 시험 파일에는 탈출 표기만 있다 |
| Story 섹션 비교 | `e71238d`와 HEAD의 Story를 `## ` 제목으로 나누어 비교 | 바뀐 섹션은 Status, Change Log, Dev Agent Record뿐 |
| 커밋의 경로 | `e71238d` 뒤 커밋마다의 경로 | 단위 3.1은 `src/screen.js`, 3.2와 3.3은 `test/screen.test.js`와 기록뿐이다. 병합 커밋이 들여온 22개 가운데 Story 1.2의 기록 밖의 것은 `ci/screen-rule.check.mjs`, `docs/planning/future-work.md`, `src/units.js`, `test/units.test.js`로 File List의 글과 같다 |
| 저장 기록 | `check-stage.sh records`, `po-record`, `qa-record`, `deps`, `check-instructions.sh`, `check-merge.sh status 1.1 main`, `pending main` | 모두 종료 상태 0. 1.1은 `merged 81c547c`, `pending`은 목록 없음 |
| future-work | `check-stage.sh future --story 1.3`, 항목 수 | 종료 상태 1, `undecided` 17개. 32개 항목, `unplanned` 15개로 Story의 글과 같다. 새 Story의 시작을 막는 조건이어서 이 Story를 막지 않는다 |
| 저장 뒤 점검 | 아래 "Review Record Changes" | 그곳에 적는다 |

### 변이 결과

99개 가운데 시험에서 76개, CI 규칙에서만 4개(`width-47`, `width-49`, `width-40`, `width-text`), 가져오기 검색에서만 3개(`import-units`, `import-node-fs`, `import-dynamic`)가 실패했고 16개가 통과했다. 통제 사본은 시험 13개 통과, 규칙과 검색이 종료 상태 0이다.

| 통과한 변이 | 수 | 판단 |
| --- | --- | --- |
| `accepted-display-trimmed`, `accepted-blank-js-trim`, `accepted-blank-tab-too` | 3 | 표 3이 받는 읽기다. 지적이 아니다 |
| `cut-value-53`, `cut-value-60`, `cut-error-49`, `cut-error-60` | 4 | 표의 줄이 그 길이를 넘지 않는다. `coverage_gaps`와 1.3-UNIT-003 행이 적은 틈이고 1.3-INSP-002의 읽기가 본다 |
| `rethrow-new-same-class`, `rethrow-new-with-cause`, `rethrow-copy-with-stack` | 3 | PO1-N10. 전달 코드는 `throw error;`이고 읽기가 본다 |
| `catch-by-message` | 1 | 메시지 꼴로 가리는 변형이고 닿는 입력에서 결과가 같다. Dev Notes의 "오류는 클래스로 가린다"대로 전달 코드는 `instanceof`다 |
| `cache-of-lines`, `counter-state`, `console-output`, `format-inlined` | 4 | 출력이 같아 시험이 볼 수 없다. 1.3-INSP-002의 판단 목록이 상태, 입출력, `formatNumber`를 본다 |
| `pass-other-separators` | 1 | VT, FF, U+2028, U+2029, U+0085를 공백으로 바꾸어 넘기는 변형이다. 아래 "기각과 합침" |

엔진 사본 넷의 결과다. 까닭을 줄인 엔진과 끝 위치에서 뒤 공백을 빼는 엔진은 `returns a line longer than the display whole` 하나가 길이 단언에서 실패하고, 메시지에 LF나 CR을 끼운 엔진은 `does not take white space other than a space for a space` 하나가 실패한다. 어느 쪽도 조용히 지나가지 않는다.

### Dev 기록의 대조

단위 기록의 값을 같은 꼴의 사본에서 직접 다시 냈다.

| 기록 | 점검 | 결과 |
| --- | --- | --- |
| `dev-3.1`의 RED와 GREEN | Dev의 원시 출력과 시각, 커밋 시각 | 병합 커밋 21:41:07, RED 21:41:13(규칙 종료 상태 1, `got 40`, 시험 68개 통과), GREEN 21:42:04(종료 상태 0, 시험 68개 통과). 기록과 같다 |
| `dev-3.2`의 변경 전 표 | `f67f0c5`의 시험 파일에 변이 | 값 줄 자르기 1개 실패, 오류 줄 자르기 13개 통과, 까닭을 줄인 엔진 1개 실패 |
| `dev-3.2`의 변경 뒤 표 | `a5eade8`의 시험 파일에 변이 | 끝 공백 1개 실패, CR 13개 통과 |
| `dev-3.3`의 표 | HEAD의 시험 파일에 변이 | 끝 공백 2개 실패, CR 1개 실패, 값 줄과 오류 줄 자르기와 까닭을 줄인 엔진 각 1개 실패 |
| `dev-3.3`의 F-1 | 정정 전 후보 시험 파일과 HEAD의 시험 파일에 메시지의 LF, CR | 정정 전은 LF 1개 실패, CR 13개 통과. 정정 뒤는 각 1개 실패 |
| Cleaner 검토 전후 | 상태 파일 세 쌍, 검토자 폴더 | 쌍마다 같다. 3.1과 3.2의 폴더는 비어 있고 3.3의 폴더는 64개 파일이다 |
| 해시 | `git rev-parse`, `git hash-object` | `bbd96bea4be3`, `3ed20611195c`, `4c17930a0090`, `247897755729`, `291720dff675`, `bf965aa51886`이 기록과 같다 |
| 개수 | 추가된 줄, 앞선 기록 | 수정 라운드가 두 파일에 더한 줄 10개, 영어 주석 네 줄, 80칸을 넘는 줄 5개, 앞선 기록 11개와 gate가 `e71238d`와 같음(`git diff --quiet` 종료 상태 0) |
| DEV-1 | 까닭을 줄인 엔진, 계산 | 줄 35글자, 시험 하나만 실패. 14글자 까닭에서 48글자를 넘으려면 위치가 18자리라는 계산이 맞다. future 기록에 지적과 출처, 적용하지 않는 까닭, 필요한 일이 있고 처리 줄이 `future`다 |

다른 값은 모두 같고 어긋난 것은 문장 둘이다. 아래 DOC-001이다.

### 분류의 근거: DOC-001

- step 1, 확인: `dev-dod-2`의 행 "현재 작업과 사실, 편집 이력은 지정된 기록에"는 "Story를 이 라운드 시작 전의 `e71238d`와 섹션별로 비교해 바뀐 섹션이 Change Log와 Dev Agent Record뿐이고 지운 줄이 없음을 확인했다"고 적는다. `git diff e71238d 6701dcd -- docs/stories/1.3.story.md`의 지운 줄은 Status의 `InProgress`와 File List의 세 줄이다: `src/screen.js`의 "(새 파일)", `test/screen.test.js`의 "(새 파일)", 기준 `40e1a6b`를 적은 "바꾸지 않음" 줄. Dev의 섹션 비교 도구는 섹션마다 같음과 바뀜만 출력한다. `dev-qa-r2`의 REQ-002 분석은 "현재 계획의 글(Dev Notes, Testing, 표)에는 40이 없다"고 적는데, Dev Notes의 "이 커밋 전의 트리에서는 규칙이 40이어서", Testing의 "규칙 40으로 낸 결과도 증거가 아니다"에 옛 규칙의 값이 있다.
- step 2, 책임: 이 Story의 Dev 기록이다.
- step 3, 기준: 두 문장은 Story 자신의 기록 구역과 계획에 대한 글이어서 `data/finding-classification.md`의 "a statement about the Story's own plan or record sections is judged as a statement of the Story"에 든다. 다른 행동, 결과, 합격 판정을 정하는 두 문장의 모순이 아니므로 step 3의 기준이 아니다. 말하려는 사실(앞선 기록을 고쳐 쓰지 않았다, 계획이 요구하는 값은 48이다)은 맞고, File List는 Dev가 지금 상태로 고칠 수 있는 목록이다.
- step 4, 실패: 산출물의 결과가 틀리지 않고 필수 점검에 닿지 않는다. 비차단이다.
- step 7: 코드와 시험을 바꾸지 않는 기록의 정정이어서 계약 안이다. 심각도 low, 신뢰도 high. 이 회차가 처음 보는 기록이어서 늦은 지적이 아니다. 기준은 기존 future-work 항목 "[Tech-Debt] 재발: 기록의 서술이 실제와 다름"과 같아 병합 뒤 점검의 재발 대조에 들어간다.

### 넘겨받은 질문

`tasks/review-story.md` 섹션 In a run대로 각 질문을 리드처럼 확인했다. 어느 것도 막지 않아 `pending` 지적이 없고 회차 `note`에 리드로 둔다.

| 질문 | 이 회차의 확인 | 판정 | 답할 소유자 |
| --- | --- | --- | --- |
| Dev: `Treatment: REQ-002 fix`는 SM이 한 일에 Dev가 붙인 줄이다 | `tasks/apply-qa-fixes.md`가 `fix`를 현재 Story의 일로 정하고 줄에는 지적 ID와 처리만 둔다. `dev-qa-r2`와 Completion Notes가 고친 역할이 SM이고 PO가 재검증했다고 적는다. `story-rules.awk`의 `check_treatments`는 활성 Optional의 줄과 `future` 기록만 보고, 병합 뒤 점검은 `future`와 `none`만 옮긴다 | 닫는 데 걸리지 않는다. 닫는 근거는 저장된 Story와 PO Validation 2회다 | 없음 |
| Dev: effort의 이름과 숫자 30의 대응을 확인하지 못했다 | 이 세션에서 다른 세션의 effort를 읽을 수 없다. 확인하려면 호스트의 대응표나 메인 세션의 시작 기록이 필요하다 | 리드로 남긴다. 수용된 기준에 세션의 effort가 없고 산출물의 판정에 닿지 않는다 | 메인 세션 |
| SM과 PO: `docs/architecture.md`에 `SCREEN_WIDTH`, 폭의 뜻, 코딩 표준 절, Change Log 절이 없다 | 직접 읽어 확인했다. 기준 tip과 같고 `SCREEN_WIDTH`가 수용 문서에 없다 | Task 2.1, N-8, 메인 세션의 답이 이 Story에 맡기지 않아 step 2에서 범위 밖이고 비차단이다. 항목 "CI 규칙이 계획 문서에 없음"(`Planning: undecided`)과 PO1-N8이 들고 있고, 이번 다시 열기가 이 틈에서 왔으므로 monitor에 둔다 | Architect, PM |
| PO: PO2-N1 ~ N4는 PO Validation에 남았다 | 아래 표 | 모두 비차단이고 처분을 바꾸지 않았다. 병합 뒤 점검이 PO2-N1, N3, N4를 옮긴다 | SM, 병합 뒤 점검 |

| PO 지적 | 이 회차의 확인 |
| --- | --- |
| PO2-N1 | PO가 QA에 맡긴 확인이다. 기준 tip과 다른 경로 20개가 모두 이 Story의 파일이고 `src/units.js`, `test/units.test.js`의 diff가 없다. 계획의 글은 그대로 남는다 |
| PO2-N2 | Dev가 적용했다. 단위 3.1, 3.2, 3.3마다 Cleaner 검토가 있고 상태 파일과 기록이 맞다 |
| PO2-N3 | PO가 읽지 못한 CC-CMT-001 본문을 읽었다. "A project without any of these takes the file summary alone, and this rule asks for no header, no record and no question." 라이선스 파일, `package.json`의 `license`, 기존 파일의 저작권 머리글이 없어 요약 줄만 둔 두 파일이 맞다. Dev Notes의 "Dev가 빠진 입력을 기록한다"는 없어도 될 기록을 더 시킬 뿐 산출물을 틀리게 하지 않는다 |
| PO2-N4 | 끝 위치에서 뒤 공백을 빼는 엔진 사본에서 긴 줄 시험이 실패한다. E-6이 위치 규칙에도 기대지만 조용히 지나가지 않는다는 PO의 판단과 같다 |

앞선 비차단 지적: PO1-N9, PO1-N10은 SubTask 1.1에서 적용되었고 PO1-N1 ~ PO1-N8, PO1-N11, PO1-N12는 PO Validation에 그대로 있다. 표 3과 엔진이 바뀌지 않아 회차 1의 분류를 바꿀 새 사실이 없다.

## Standards Review

- 접근과 TDD: Dev Notes의 "폭 결정을 코드에 옮기는 일"이 값은 `TDD`, 시험 변경은 `verification-only`로 정했고 실행이 같다. 단위 3.1의 RED가 값을 바꾸기 전이고 GREEN이 뒤다. 단위 3.2, 3.3은 단언을 강화하고 대상 동작이 이미 맞아 `testing-tdd`의 `verification-only`에 맞으며, 강화한 단언마다 틀린 변형의 실패를 보였고 RED라고 적지 않았다. SubTask 1.1의 기준 통과 조각은 RED가 없다는 한계가 기록에 그대로 있다.
- Cleaner: 코드나 시험을 바꾼 세 단위 모두 마지막 변경 뒤, 최종 점검 전에 새 세션의 검토를 받았다. 3.3의 F-1은 줄바꿈 없음 단언이 LF만 보던 것을 고쳤고 정정 전후의 민감도가 위 표와 같다.
- 시험의 세 금지 꼴: 내부 협력자를 바꾸지 않고 비공개 부분을 부르지 않으며 곁 통로가 없다. 대역이 없다. 표 1의 기대는 글자 그대로이고 오류 줄의 메시지만 AC 2가 맡긴 대로 `evaluate`에서 얻으며 접두와 메시지를 바꾼 변이가 모두 실패한다. 단언에 닿지 않는 시험이 없다. `SCREEN_WIDTH`를 가져와 비교하지 않고 `DISPLAY_WIDTH`를 시험 파일에 둔다.
- 시험 이름과 주석: 13개 이름과 모든 주석을 단언과 실행에 대조했다. 어긋남이 없다.
- 규칙: CC-JS-001 ~ 007, CL-GLD-001 ~ 010, CC-CMT-001 ~ 019를 읽어 위반을 찾지 못했다. 코드 형식은 포매터가 설정되어 있지 않아 읽어서 보았고 두 칸 들여쓰기, 세미콜론, 큰따옴표다.
- CRAP: `quality.crap.commands`가 비어 측정하지 않음이고 통과도 차단도 아니다. 제안은 기존 future-work 항목 `[Tech-Debt] CRAP 측정 경로`가 들고 있어 새로 하지 않는다.
- 실행 비용: 이 변경에 닿는 실행 비용 규칙과 수용된 성능 기준이 없다.
- 도메인 용어: 글로서리 파일이 없다. 코드의 표시 낱말은 PRD와 같은 뜻이다(식, 결과, 오류, 폭).

### 기각과 합침

| 후보 | 처리 | 까닭 |
| --- | --- | --- |
| `pass-other-separators`가 통과한다 | 지적으로 올리지 않음 | 어떤 점검이나 시나리오도 이 글자들을 이름 붙이지 않아 step 3의 기준이 아니고, 전달 코드는 받은 글자를 그대로 넘겨 step 4도 아니다. 틀린 작업이 통과할 가능성은 step 3의 기준을 통해서만 막는다. E-5의 행은 대표 입력이고 `pass-all-white-space`는 실패한다. 변이 통과의 설명으로 둔다 |
| `SCREEN_WIDTH` 주석의 "in characters"가 수용 문서에 없다 | 기각 | Story가 폭을 "48글자"로 적고 시험이 `length`로 잰다. Story의 "폭의 뜻은 이 결정도 정하지 않는다"는 줄과의 관계를 말하고, 주석은 줄을 자르지 않는다는 계약을 함께 적는다 |
| 줄바꿈 없음 단언이 U+2028, U+2029를 보지 않는다 | 기각 | E-5와 1.3-UNIT-005가 글자를 정하지 않았고 `dev-3.3`이 한계로 적었다. 이 시험의 입력에서 오류 줄은 엔진의 정해진 까닭뿐이고 속성 실행에서 0건이다 |
| 시험의 행 `7 +`와 뒤 공백 둘, CR이 든 식이 표 2에 없다 | 기각 | E-4, E-5의 규칙을 더 구체적으로 한 행이어서 계약 안이다(step 7). Dev는 Testing을 고칠 수 없고 `dev-3.3`이 적었다 |
| File List에 `qa-r1`, `qa-done`이 없다 | 기각 | File List는 Dev의 변경과 소유자가 한 계획 변경을 드는 목록이고, 앞선 완료 점검도 QA의 기록을 빼고 대조했다. 완전한 목록으로 쓰이지 않는다 |
| 기록의 "앞 441줄까지만 읽었다" | 기각 | 읽은 범위의 줄 수이고 위치 표기가 아니다(CC-DOC-009의 "a line count used as a measurement") |
| Dev 기록이 파일 해시를 적는다 | 기각 | 커밋 전 내용을 가리키는 값이고 커밋 뒤의 값과 같다 |
| 커밋 `b764e00`의 시각 정정 | 기각 | Dev가 자기 기록의 시각만 고쳤고 결과를 바꾸지 않았다. 고친 값이 커밋 시각과 맞고 앞 값은 Git에 남는다 |
| `DISPLAY_WIDTH`의 48, `padEnd`의 1000 | 기각 | CL-GLD-001 Numeric literals 2단계와 3단계다. 시험이 제품의 값을 적는 것은 1단계의 반복이 아니다 |
| 80칸을 넘는 시험 이름 줄 다섯 | 기각 | CC-JS-002의 선호 폭이고 글자열을 줄바꿈할 수 없으며 이번에 바뀌지 않았다 |
| 긴 오류 줄의 길이 단언이 엔진의 까닭과 위치에 기댐 | DEV-1, PO1-N4, PO2-N4에 합침 | Story의 표 2 머리가 전제를 적었고 틀릴 때 조용히 지나가지 않는다. 엔진을 바꾸는 일은 뒤의 변경이다 |
| 서비스 CI가 통과하는지 | 리드 | 필수 점검이 아니고 이 작업은 네트워크를 쓰지 않는다. 같은 두 명령을 로컬에서 돌렸고 수정 뒤의 게시와 병합이 서비스의 결과를 읽는다 |

### 위험 평가

방법: Story의 Risk Coverage 표와 이 회차의 실행을 놓고 결과의 크기와 가능성을 글로 판단했다. 프로젝트에 정한 위험 척도는 없다.

| 위험 | 크기 | 통제 | 남은 불확실성 |
| --- | --- | --- | --- |
| CI만 보는 규칙의 값이 계획 문서 밖에서 바뀌면 같은 어긋남이 되풀이된다 | medium | 병합 작업의 사본 검증이 잡는다. 항목 "CI 규칙이 계획 문서에 없음" | Architect, PM의 답. 폭의 뜻이 어디에도 없다 |
| 깊은 중첩에서 화면이 던진다 | medium | AC 2가 정한 결과, T-2, 기존 future-work 항목 | PM의 답. 화면을 쓰는 호출자가 아직 없다 |
| 공백의 종류가 미결이다 | low | 표 3 U-1 | PM, SM의 답 |
| `{식}` 앞뒤 공백이 미결이다 | low | 표 3 U-2 | PM, SM의 답 |
| 오류 줄에 영어 까닭이 보이고 긴 줄의 길이 단언이 그 글자에 기댄다 | low | AC 2, 1.3-UNIT-004, DEV-1 | PM의 답 |
| 받은 오류의 전달이 시험으로 다 잡히지 않는다 | low | 현재 코드의 읽기, 1.3-UNIT-006 | 뒤의 수정. PO1-N10 |
| 폭을 넘는 줄의 처리와 Architecture의 틈 | low | 메인 세션의 답, 1.3-UNIT-003 | Architect, PM의 답 |

TEST-001이 닫혀 "받은 글자의 전달"의 위험은 끝 공백과 CR에 대해 시험이 잡는다.

## Code Quality Assessment

`renderScreen`은 네 결과(빈 글자, 값 줄, 오류 줄, 그대로 던짐)를 짧은 분기로 나눈다. `try`가 `evaluate`만 감싸 `formatNumber`의 오류를 가리지 않는다. 공개 심볼 둘 뒤에 표시 규칙을 숨겨 호출자가 오류 판정과 표시를 알 필요가 없다. 수정 라운드의 변경은 상수 값 한 줄과 시험의 값, 입력, 행, 단언이다. 시험은 표를 그대로 옮겼고 도우미가 파일 안에 있어 읽기 쉽다.

## Implementation Recommendations

| 제안 | 근거 | 소유자 | 기대 점검 |
| --- | --- | --- | --- |
| DOC-001의 처리를 정한다. 적용하면 Completion Notes의 새 항목에서 두 문장을 정정하고 코드와 시험은 바꾸지 않는다 | 위 "분류의 근거" | Dev | `check-done.sh`가 처리 줄을 찾는다. `fix`면 QA 회차가 닫아야 하고 `future`면 future 기록이 함께 있어야 한다(`tasks/apply-qa-fixes.md`) |

## Compliance Check

- Coding Standards: pass. 위 Standards Review
- Project Structure: pass. 새 파일 둘이 `docs/architecture.md#소스-트리`의 자리에 있고 바꾸지 않는 파일에 변경이 없다
- Testing Strategy: pass. 접근, 시나리오, 표 행, 민감도. 기준 통과 조각의 RED가 없다는 한계는 계획이 정한 길이고 기록에 그대로 있다
- All ACs Met: pass. 위 AC와 결정의 대조

## Improvements Checklist

- [x] REQ-001, REQ-002, TEST-001을 현재 입력으로 확인하고 닫았다
- [x] PO2-N1, PO2-N3, PO2-N4를 이 회차의 실행과 본문 읽기로 확인했다
- [ ] DOC-001의 처리(Dev). 이 회차는 정하지 않았다
- [ ] PO1-N1 ~ PO1-N8, PO1-N11, PO1-N12, PO2-N1, PO2-N3, PO2-N4는 병합 뒤 PO 점검이 옮긴다

## Security Review

적용되는 기준은 CC-JS-004의 경계 검증이다. 문자열이 아닌 입력(표의 7가지와 `String` 객체, `Symbol`, 객체, `true`)이 `evaluate`의 `TypeError`로 거절되고 글자로 바뀌지 않는다. 식은 `evaluate`만 해석하고 `eval`과 `Function`이 없다. 값 줄의 `{식}`은 문법이 받은 글자(숫자, 소수점, 연산자, 괄호, U+0020)만이고 오류 줄은 엔진의 정해진 까닭과 위치뿐이어서 입력이 그대로 나오는 곳이 없다. 입출력, 비밀, 환경 변수가 없다. 깊은 중첩의 던짐은 호출자가 받는 오류이며 위험 표에 있다.

## Performance Considerations

수용된 성능 기준과 이 변경에 닿는 실행 비용 규칙이 없어 기준을 만들지 않았다. 수정 라운드는 상수 값과 시험만 바꾸어 공백 판정 정규식이 회차 1과 같고 회차 1의 측정(길이에 비례)을 잇는다. 이것은 합격 기준이 아니다.

## Review Record Changes

- `docs/stories/1.3.story.md`: QA Results 끝에 이 회차의 항목을 더했다. Status는 Review 그대로다. 다른 섹션은 바꾸지 않았다
- `docs/qa/gates/1.3.yml`: 회차 3, PASS, 활성 지적 DOC-001, 닫은 지적 REQ-001, REQ-002, TEST-001, 점수 100, 위험의 `must_fix`와 `monitor`, `comment_hygiene`의 판정 근거와 실행 시각, 머리 주석, `recommendations`, `review_rounds`, `history`. 닫은 지적의 원문을 그 지적이 나온 회차 1, 회차 2의 `note` 끝에 더했고(`tasks/qa-gate.md` 섹션 Zone Rules) 그 밖의 회차 항목은 바꾸지 않았다
- `docs/story-records/1.3/qa-r3.md`: 이 기록
- 제품과 시험, 다른 역할의 기록, `docs/planning/future-work.md`는 바꾸지 않았다
- 저장 뒤 점검: `check-gate.sh docs/qa/gates/1.3.yml docs/stories/1.3.story.md`, `check-stage.sh qa-record`(PASS, 회차 3), `records`, `po-record` 모두 종료 상태 0. YAML 파싱 뒤 중첩 필드와 개수, 점수를 대조했고 회차 1, 회차 2의 필드와 `history`, `comment_hygiene`의 나머지 필드가 저장 전과 같으며 두 `note`는 앞부분이 그대로다. Story는 저장 전 사본과 앞부분이 바이트까지 같고 끝에 41줄을 더했을 뿐이다. 보이지 않는 글자와 임시 경로의 검색은 일치 없음이다. `check-done.sh`는 메시지 `DOC-001: an active Optional issue has no "Treatment:" line in Completion Notes`로 종료 상태 1이고 Dev의 인계 뒤에 풀린다. 이 회차는 Done을 하지 않으므로 맞는 상태다

## Comment Hygiene Report

- 방법과 범위: 체크리스트 §1.1, §1.2, §1.3, §1.4, §1.7의 grep 후보 검색을 `git diff -U0 d90c99e HEAD -- src/screen.js test/screen.test.js`의 추가 줄 286줄에 실행했다. §1.2는 QA 접두, 시나리오 번호, PO와 SM 메모 번호, 표의 행 번호, 결정과 Cleaner와 DEV 번호, Story와 gate에 적힌 ID 39개의 고정 문자열을 찾았다. 작업 태그와 저작권도 찾았다.
- 결과: 모두 0건. 커밋하지 않은 변경이 없다.
- 기준선: 기준 tip d90c99e에 두 파일이 없어(`git cat-file -e` 실패) 기존 잔여물이 없다. `tests_directory_findings`는 0이다. 기존 시험 파일은 기준 tip과 같다.
- 문맥 읽기: 머리 줄 둘, `SCREEN_WIDTH` 위 설명, `renderScreen`의 JSDoc, 공백 판정의 까닭, 시험의 상수와 도우미 설명, 표 3 시험의 설명, 수정 라운드의 영어 주석 네 줄, 시험 이름 13개를 읽어 코드와 단언에 대조했다. 모두 영어이고 이유와 계약을 말하며 편집 이력이 없다. 비ASCII 글자는 표시 글자 `오류: `가 코드 둘과 JSDoc 하나에 있을 뿐이다.
- 머리글: CC-CMT-001(Common 3.21). 정해진 머리글이 없는 프로젝트여서 요약 줄만 두는 것이 맞다.
- 수명: IN-FLIGHT 일치 없음, 원장 비어 있음, `pending_at_review`와 `pending_after_story_done`은 0, 이전 Story의 표시 없음.
- 보존 목록: `commentHygiene.preservedComments`가 비어 있어 기대 0, 관찰 0이다.
- §5.3: C++ 머리글과 빌드 가드가 없어 빌드 가드, 핫스팟, 접근 지정자는 해당 없음이다.
- 판정: PASS. 활성 주석 지적이 없다.

## Extra Reviews

없다. 이 run은 오케스트레이션 스위치가 꺼져 있어 추가 검토자가 없다.

## 한계

- 네트워크를 쓰지 않는 호출이어서 fetch하지 않았고 요청 #9와 호스팅 서비스의 CI 실행(ubuntu-latest)을 보지 않았다. 필수 점검은 이 기기의 Windows와 Node.js v24.22.1에서 돌렸다. 기준 tip은 로컬 ref의 값이다.
- 변이는 사람이 고른 99개이고 도구가 만든 전수가 아니다. 프로젝트에 변이 도구가 없다.
- 속성 실행의 문자열은 표본이고 깊은 중첩은 표의 `D`로만 보았다.
- 다른 세션의 모델과 effort는 그 세션의 보고로만 안다. 어떤 판단도 여기에 기대지 않는다.
- `sm-1`, `po-r1`은 다시 읽지 않았고 `dev-dod-1`은 앞부분만 읽었다. 회차 1이 읽은 입력이고 그 내용은 뒤의 기록과 이 회차의 실행이 대신한다.
- 메인 세션의 소유권 점검은 이 작업 뒤에 돈다.
