# qa-r1 — 계산기 화면

- Story: [1.3](../../stories/1.3.story.md)
- Entry: QA review round 1
- Reviewer and time: Quinn(QA 하위 세션, 모델 `claude-opus-5-5`, effort `max`, 둘 다 시스템이 알려 준 값), `*run-story 1.2 1.3 remote to Done` run의 역할 작업. 2026-11-06, 메인 세션의 시작 스냅샷 18:34 +0900 뒤에 시작, 점검 실행 18:40 ~ 18:51 +0900
- Reviewed inputs: 브랜치 `story/1.3`, 기준 `main` 40e1a6b, HEAD 5ca0d47, 커밋하지 않은 변경 없음. 구현 개정은 aac1c5a이고 `src/screen.js`와 `test/screen.test.js`는 그 뒤 바뀌지 않았다(`git hash-object --no-filters` 값 `bbd96bea4be3`, `3ed20611195c`, `git diff --quiet aac1c5a HEAD -- src test` 종료 상태 0)

## 읽은 입력과 규칙

- Story 파일 전체, 기록 문서 sm-1, po-r1, dev-1.1, dev-2.1, dev-dod-1 전체. 부모와 설계: `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`, `docs/planning/future-work.md`. 코드: `src/screen.js`, `test/screen.test.js`, `src/engine.js`, `src/number-format.js`, `ci/screen-rule.check.mjs`, `.github/workflows/ci.yml`, `package.json`, `README.md`.
- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`. `check-instructions.sh` 종료 상태 0.
- 끝까지 읽은 본문(QA의 규칙 종류 `operations`, `design`, `quality`, `documentation`): `golden-rules`, `coding-principles`, `comments`, `documentation`, `testing-tdd`, `crap`, `javascript-language`, `javascript-crap`.
- 끝까지 읽은 절차: `agents/qa.md`, `project-map.md`, `core-config.yaml`, `tasks/load-project-rules.md`, `tasks/review-story.md`, `tasks/qa-gate.md`, `templates/qa-gate-tmpl.yaml`, `tasks/trace-requirements.md`, `tasks/nfr-assess.md`, `tasks/code-comment-style.md`, `tasks/in-flight-comment-lifecycle.md`, `tasks/architecture-align.md`, `tasks/review-loop.md`, `checklists/comment-hygiene-checklist.md`, `data/agent-context.md`, `data/finding-classification.md`, `data/story-paths.md`, `data/development-quality.md`, `data/verification-ownership.md`, `data/domain-language.md`, `data/local-git-workflow.md`, `utils/checks/gate-rules.awk`, `utils/checks/owned-rules.awk`.
- 일부만 읽은 파일: `tasks/run-story.md`(Role sessions, Rounds, Checks after each task, Stop hold and carry on, Inputs and authorization의 권한 문단), `data/future-work-planning.md`(앞부분), `data/workflow-routing.md`(Story temporary material과 In a run), `tasks/apply-qa-fixes.md`와 `tasks/local-story-done.md`(처리 줄 부분), `templates/story-tmpl.yaml`(QA Results), `utils/checks/check-owned.sh`(머리와 `role_owns`), `utils/checks/check-stage.sh`.
- 앞선 기록은 판정의 근거가 아니라 꼴의 참고로만 보았다: 브랜치 `story/1.2`의 gate와 QA Results.

## Spec Review

### AC 대조

| 수용된 내용 | 코드의 근거 | 실행의 근거 | 결과 |
| --- | --- | --- | --- |
| AC 1 줄의 꼴과 `{식}` | `renderScreen`의 `` `${expression} = ${formatNumber(value)}` `` | 표 1의 23행이 글자까지 같다. 독립 오라클과도 같다 | 충족 |
| AC 1 `evaluate`와 `formatNumber` | `value = evaluate(expression)`, 유효 숫자 인자 없음 | 변이 `raw-value`, `to-fixed`, `ten-digits`, `thirteen-digits` 모두 실패 | 충족 |
| AC 2 오류 줄 | `error instanceof CalculationError`이면 `` `오류: ${error.message}` `` | 표의 오류 입력 21행, 변이 `catch-by-name`, `string-of-error`, `prefix-no-space`, `message-upper`, `error-line-newline` 모두 실패 | 충족 |
| AC 2 다른 오류 | `throw error;`로 잡은 객체를 그대로 던진다 | 표의 8행이 같은 클래스와 메시지로 던진다. 변이 `catch-all`, `catch-range-too`, `catch-type-too`, `swallow-other` 모두 실패 | 충족 |
| AC 3 빈 글자 | `typeof expression === "string"`이고 `/^ *$/`에 맞으면 빈 글자 | E-0의 3행이 빈 글자, 문자열 아닌 입력은 판정에 닿지 않는다. 변이 `blank-*` 13개 실패 | 충족 |
| 메인 세션의 답 `SCREEN_WIDTH = 40` | `export const SCREEN_WIDTH = 40;` | CI 규칙 종료 상태 0, 값 41과 글자 `"40"`과 내보내기 없음의 사본은 종료 상태 1 | 충족 |
| 메인 세션의 답 자르거나 접지 않음 | `SCREEN_WIDTH`가 선언에만 나온다 | 53글자 값 줄과 46글자 오류 줄이 그대로 나온다. 변이 `cut-value-at-40`, `wrap-value-at-40`, `ellipsis-value-at-40`, `pad-value-to-40`, `cut-value-at-50`, `cut-error-at-40` 모두 실패 | 충족 |
| 설계 원칙: 가져오기 | `./engine.js`, `./number-format.js` 두 줄 | 1.3-INSP-001 종료 상태 0, 출력 없음 | 충족 |
| 설계 원칙: 순수 함수 | 입출력과 전역 접근 없음, 바뀌는 모듈 변수 없음 | 1.3-INSP-002 읽기, 두 번 부르는 시험, 속성 실행 | 충족 |

AC 번호 줄은 `docs/prd.md`의 Story 1.3 항목과 `diff`로 같다.

### 시나리오와 시험 이름의 대응

마지막 열의 "통과"는 이 회차의 `node --test`나 명령의 결과다.

| 시나리오 | 방식 | 시험 이름 또는 방법 | 민감도의 근거(이 회차의 변이) | 결과 |
| --- | --- | --- | --- | --- |
| 1.3-UNIT-001 | automated | `renders the expression, an equals sign and the result as one line`, `keeps the spacing inside the expression as received` | `value-only`, `separator-no-spaces`, `separator-double-space`, `trailing-newline`, `expression-spaces-collapsed`, `expression-spaces-removed`, `zero-as-empty` 실패 | 통과 |
| 1.3-UNIT-002 | automated | `shows the result with at most twelve significant digits` | `raw-value`, `to-fixed`, `ten-digits`, `thirteen-digits` 실패 | 통과 |
| 1.3-UNIT-003 | automated | `returns a line longer than the display whole` | `cut-value-at-40`, `wrap-value-at-40`, `ellipsis-value-at-40`, `cut-value-at-50`, `cut-error-at-40` 실패 | 통과 |
| 1.3-UNIT-004 | automated | `returns an error line instead of throwing for a rejected expression` | `catch-by-name`, `catch-none`, `string-of-error`, `prefix-no-space`, `prefix-english`, `message-upper`, `error-line-newline` 실패 | 통과 |
| 1.3-UNIT-005 | automated | `reports an error at its position in the expression as received`, `does not take white space other than a space for a space` | `pass-trim`, `pass-trim-start`, `pass-trim-end`, `pass-no-leading-u0020`, `pass-collapsed-u0020`, `pass-tabs-as-spaces`, `pass-no-newlines`, `pass-nbsp-as-space`, `blank-multiline-flag` 실패. `pass-no-trailing-u0020`, `pass-no-carriage-returns` 통과(TEST-001) | 통과 |
| 1.3-UNIT-006 | automated | `throws what evaluate throws when that is not a calculation error` | `catch-all`, `catch-range-too`, `catch-type-too`, `rethrow-plain-error`, `rethrow-wrapped-message`, `swallow-other`, `blank-truthiness`, `blank-method-call`, `blank-optional-call`, `blank-string-coercion`, `blank-no-type-test` 실패. 새 오류를 같은 클래스와 메시지로 던지는 셋 통과(PO1-N10) | 통과 |
| 1.3-UNIT-007 | automated | `returns an empty text for an empty expression and for spaces only` | `blank-only-empty`, `blank-one-space-at-most`, `blank-one-or-more`, `blank-echo`, `blank-as-zero-line` 실패 | 통과 |
| 1.3-UNIT-008 | automated | `answers white space other than a space with an empty text or an error line` | `pass-ideographic-as-space` 실패, JavaScript `trim` 판정은 표 3이 받아 통과 | 통과 |
| 1.3-UNIT-009 | automated | `answers spaces around an expression with the text as received or trimmed` | `separator-double-space` 실패, 다듬은 표시는 표 3이 받아 통과 | 통과 |
| 1.3-UNIT-010 | automated | `exports only the display width and the render function`, `gives the same line for a repeated call, also after an error` | `extra-export`, `width-missing`, `blank-global-regex`, `blank-sticky-regex` 실패. 출력에 나타나지 않는 상태(`cache-of-lines`, `counter-state`)는 통과하고 1.3-INSP-002가 본다 | 통과 |
| 1.3-UNIT-011 | automated | 기존 시험 35개, `git diff --quiet 40e1a6b --` 여섯 파일 | 종료 상태 0 | 통과 |
| 1.3-INT-001 | automated | `git ls-files --error-unmatch src/screen.js`, `node ci/screen-rule.check.mjs` | `width-41`, `width-text`, `width-missing`의 사본에서 종료 상태 1. `width-41`의 메시지는 `src/screen.js must export SCREEN_WIDTH = 40, got 41` | 통과 |
| 1.3-INSP-001 | automated | 저장된 Story에서 그대로 뽑은 가져오기 검색 | 종료 상태 0, 출력 없음 | 통과 |
| 1.3-INSP-002 | agent-review | `src/screen.js`를 끝까지 읽음. 아래 "읽기 결과" | 해당 없음 | 통과 |
| 1.3-INSP-003 | agent-review | 누적 변경을 Architecture와 `README.md`에 대조. 아래 "읽기 결과" | 해당 없음 | 통과 |

실행 맵과 요약을 다시 세었다. 시나리오 15개, unit 11, integration 1, inspection 3, P0 4, P1 8, P2 3, automated 13, agent-review 2로 표와 맞다. 사용자 전용 시나리오는 없다.

추적 범위: AC 1, AC 2, AC 3 모두 `full`이다. AC 2의 "그대로"의 객체 동일성은 시험이 아니라 1.3-INSP-002의 읽기가 덮는다. 결과는 모두 통과다.

### 읽기 결과

1.3-INSP-002의 판단 목록과 결과다.

- 결과를 `evaluate`로 계산하고 `formatNumber(value)`로 표시한다. 같은 결과를 내는 다른 계산이 없다.
- 입출력과 전역 접근이 없다. `console`, `process`, `globalThis`가 없고 가져오기는 두 줄이다.
- 호출 사이에 바뀌는 모듈 변수가 없다. 모듈 수준 바인딩은 상수 `SCREEN_WIDTH` 하나이고 `let value`는 함수 안에 있다. 정규식은 함수 안의 리터럴이고 `g`, `y` 플래그가 없다.
- `SCREEN_WIDTH`는 선언에만 나오고 줄의 모양에 쓰지 않는다. `slice`, `substring`, `padEnd`, 줄바꿈 글자를 넣는 코드가 없다.
- 잡은 오류는 `throw error;`로 그대로 던진다(PO1-N10).

1.3-INSP-003의 결과다. `docs/architecture.md`의 기술 구성(ES 모듈, Node.js 24, 내장 모듈만, `node:test`)에 어긋남이 없다. 소스 트리의 `src/screen.js` 행 "계산기 화면(`renderScreen`)"은 여전히 맞고 `SCREEN_WIDTH`가 그 행에 없는 틈은 Task 2.1이 고치지 않기로 정했다. `test/screen.test.js`가 엔진을 함께 가져오는 것은 Story의 "인터페이스와 파일 위치"가 정했다. 설계 원칙의 순수 함수, `eval`과 `Function` 없음(검색 일치 없음), 가져오기 제한이 맞다. 오류 위치는 받은 글자의 위치여서 D-1과 어긋나지 않는다. `README.md`는 화면을 서술하지 않아 고칠 곳이 없다. `git diff --stat 40e1a6b HEAD -- package.json README.md docs/architecture.md docs/prd.md docs/planning ci .github` 출력 없음. dev-2.1의 no-change 결론과 같다.

### 실행한 점검

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 전체 시험 | 프로젝트 루트의 `node --test`, Node.js v24.22.1 | 종료 상태 0, 48개 통과, 실패 0, 건너뜀 0 |
| CI 규칙 | `src/screen.js`가 있는 상태의 `node ci/screen-rule.check.mjs` | 종료 상태 0, 출력 없음 |
| 바꾸지 않는 파일 | `git diff --quiet 40e1a6b --` 여섯 파일 | 종료 상태 0 |
| 표 대조 | Story의 글에서 표 1의 행을 읽고 표 2, 3의 행을 적어, 호출을 기록하는 사본에서 전달 시험을 실행 | 64행 모두 닿음, 표 1의 23행은 기대 글자와 같음 |
| 독립 오라클 | 제품과 코드를 나누지 않는 BigInt 유리수 계산, 규칙에서 쓴 12자리 반올림, ECMAScript의 글자 변환 규칙 | 23행에서 오라클, Story, 전달 모듈이 같음 |
| 변이 | `src/screen.js`의 사본에 한 곳씩 바꾸어 전달 시험과 CI 규칙을 실행. 통제 사본은 13개 통과, 종료 상태 0 | 아래 "변이 결과" |
| 속성 실행 | 씨앗을 고정한 길이 0 ~ 8의 문자열 30만 개. 글자는 숫자, 연산자, 괄호, U+0020, 탭, LF, CR, U+00A0, U+3000, U+2028, 영문자 | 빈 글자 38220, 값 줄 10461, 오류 줄 251319. 던짐, 줄바꿈 글자, 두 번 부를 때의 차이, `evaluate`와의 어긋남, 값 줄의 앞머리 어긋남 0건 |
| 저장 기록 | `check-stage.sh records`, `po-record`, `future --story 1.3`, `deps`, `check-instructions.sh` | 모두 종료 상태 0. `check-stage.sh review`는 Status가 이미 Review라는 한 줄만 보고했다(Dev의 전환 뒤 상태라 정상) |
| Story의 계획 본문 | PO가 읽은 Story 사본(`3b48db1d554b`)과 현재 Story의 `diff` | PO 뒤 달라진 곳은 Status, Tasks / Subtasks 체크박스, 뒤에 더한 섹션들이다. AC, Dev Notes, Testing은 같다 |
| 파일의 바이트 | 두 새 파일의 U+00A0, U+3000 실제 바이트, CR | 모두 0줄. 시험 파일에는 탈출 표기만 있다 |
| 기록의 글자 | `invisible-chars.awk`, 임시 경로 패턴, 줄 번호 꼴의 표기를 Story와 기록 문서에 검색 | 일치 없음 |

### 변이 결과

67개 가운데 시험에서 54개, CI 규칙에서만 2개(`width-41`, `width-text`)가 실패했고 11개가 통과했다.

| 통과한 변이 | 수 | 판단 |
| --- | --- | --- |
| `pass-no-trailing-u0020`, `pass-no-carriage-returns` | 2 | TEST-001. 전달 코드에는 없는 변형이다 |
| `rethrow-new-same-class`, `rethrow-new-with-cause`, `rethrow-copy-with-stack` | 3 | PO1-N10. 1.3-INSP-002의 읽기가 본다 |
| `accepted-blank-js-trim`, `accepted-display-trimmed` | 2 | 표 3이 받는 읽기다. 지적이 아니다 |
| `cut-value-at-60`, `cut-error-at-60` | 2 | 표의 줄이 그 길이에 닿지 않는다. 추적 표가 자르지 않음을 1.3-UNIT-003과 1.3-INSP-002에 맡겼다 |
| `cache-of-lines`, `counter-state` | 2 | 출력이 같아 시험이 볼 수 없다. 추적 표가 상태를 1.3-UNIT-010과 1.3-INSP-002에 맡겼다 |

### 분류의 근거: TEST-001

- step 1, 확인: 변이 사본에서 시험 13개가 통과하고 CI 규칙이 종료 상태 0이다. 그 사본에서 뒤 공백 둘이 있는 `7 +`는 `오류: unexpected end of expression at position 3`이고 `1`과 `+ 2` 사이에 CR이 있는 식은 CR이 든 값 줄이다. 전달 모듈은 같은 입력에 `position 5`, `position 1`의 오류 줄을 돌려준다.
- step 2, 책임: 이 Story의 시험 파일이다.
- step 3, 기준: E-4와 E-5의 이름 붙은 행은 모두 전달 시험에 닿는다(표 대조). 뒤 공백을 지우는 입력과 CR이 든 식은 어느 필수 점검도 이름 붙이지 않았다. 실패 기준의 "다듬거나 공백을 바꾼 글자를 `evaluate`에 넘겨"에 뒤따르는 예는 `"  a"`와 탭으로 시작하는 식, 끝에 LF가 있는 식이고 이것들은 잡힌다. 그래서 이 단계의 기준이 아니다.
- step 4, 실패: 전달 코드는 받은 글자를 그대로 넘겨 틀린 결과가 없다. 틀린 작업이 시험을 통과할 가능성은 step 3의 기준을 통해서만 막는다. 비차단이다.
- step 7: 기존 규칙에 시험 행을 더하는 일이어서 계약 안이다. 심각도 low, 신뢰도 high.

### 넘겨받은 질문

`tasks/review-story.md` 섹션 In a run대로 각 질문을 리드처럼 확인했다. 어느 것도 막지 않아 `pending` 지적이 없고 회차 `note`에 리드로 둔다. 막는 단계는 모두 없다.

| 질문 | 이 회차의 확인 | 판정 | 답할 소유자 |
| --- | --- | --- | --- |
| Q1, SM N-1, PO1-N1 | 탭, LF, CR LF, U+00A0, U+3000만 있는 글자는 `오류: unexpected character at position 0`, U+0020 사이의 탭은 `position 1`이다. 전달 코드는 U+0020만 빈 식으로 본다. JavaScript `trim` 변이도 통과한다 | AC 3의 경계가 값으로 정해지지 않아 step 3의 기준이 아니고, 두 읽기의 Task, 순서, 합격 판정이 같아 step 4에서 막지 않는다. U+3000은 한글 입력기로 넣기 쉬운 글자이므로 답을 정할 때 볼 사실로 적는다 | PM, SM |
| Q2, SM N-2, PO1-N2 | 앞뒤 공백 하나가 있는 `1 + 2`의 줄은 앞 공백이 남고 등호 앞 공백이 둘이다. 다듬은 표시 변이도 통과한다 | 같은 까닭으로 막지 않는다 | PM, SM |
| Q3, SM N-3, PO1-N3 | `evaluate(expression)`. 앞 공백 둘이 있는 `a`는 `position 2`, 앞 공백이 있는 `7 + a`는 `position 5`다 | Story가 허용한 읽기는 하나이고 AC 1, AC 2를 그대로 읽은 것이다. 미결이 아니며 확인은 수용 문서에 적는 일이다 | PM |
| Q4, SM N-4, PO1-N4 | `오류: division by zero at position 2`. 영어 까닭이 그대로 보인다 | AC 2의 `{메시지}`가 엔진의 메시지다. 답은 엔진의 별도 계획이다. 까닭을 짧게 한 엔진 사본에서는 `7 +` 줄의 길이 단언 하나가 실패하므로 그 답과 함께 고친다 | PM |
| Q5, SM N-5, PO1-N5 | 표의 7가지와 `String` 객체가 `TypeError: expression must be a string`으로 나간다 | AC 2가 지금 결과를 하나로 정한다 | PM |
| Q6, SM N-6, PO1-N6 | 깊이 100000에서 `RangeError: Maximum call stack size exceeded`로 나간다 | AC 2의 결과다. 사용자가 입력한 글자로 던지는 길이어서 위험 medium으로 monitor에 둔다 | PM |
| Q7, SM N-7, PO1-N7 | `name`은 `Error`다. 코드는 클래스로 가리고 `catch-by-name` 변이는 실패한다 | 이 Story에 닿지 않는다 | 그 항목의 Dev |
| Q8, SM N-8, PO1-N8 | `docs/architecture.md`에 `SCREEN_WIDTH`, Change Log 절, 코딩 표준 절이 없다. 행의 글은 여전히 맞다 | 수용된 계획이 이 Story에 맡기지 않았다(Task 2.1, 메인 세션의 답) | Architect, PM |
| PO1-N9 | Dev의 저장 출력에서 뼈대 상태와 조각 8의 상태 모두 종료 상태 1과 메시지이고, 더한 뒤 종료 상태 0이다 | 실행으로 해소되어 남은 효과가 없다 | 없음 |
| PO1-N10, Dev 보고의 시험 틈 | 재현했다. 위 변이 셋이 13개를 통과한다. 코드는 `throw error;`다 | 판정 방법이 같은 오류를 `constructor`와 `message`로 정했고 어느 점검도 이 변형을 이름 붙이지 않아 step 3의 기준이 아니며 코드가 맞아 step 4도 아니다. 객체 동일성을 보는 자동 판별은 대역이나 V8 스택 글에 기대어 `testing-tdd`가 제외하는 꼴이다. 이 회차의 1.3-INSP-002가 그 판단을 포함했다 | SM(다음 수정이 있으면) |
| PO1-N11 | 1.3-UNIT-011의 수준이 `unit`이고 한 부분이 `git diff`다 | 수준은 판단의 분류이고 합격 판정이 같다 | SM |
| PO1-N12 | `git cat-file -t a81b56a`는 commit이지만 `git branch -a --contains`의 출력이 없고 `main`의 병합은 81c547c다 | 이 Story가 만든 글이 아니어서 범위 밖이다 | 병합 뒤 점검 |
| Dev의 `git ls-remote` 읽기 | Dev 보고에만 있고 저장소에 흔적이 남지 않아 확인하지 못했다 | 산출물을 바꾸지 않아 범위 밖이다. 메인 세션이 최종 보고에 적는다 | 메인 세션 |
| 저작권과 SPDX | 새 두 파일의 머리글은 요약 줄뿐이고 빠진 입력이 dev-1.1과 Completion Notes에 있다 | 사용자 답과 CC-CMT-001의 처리와 같다. 위반이 아니다 | 프로젝트 소유자 |

## Standards Review

- 접근과 TDD: Task 1은 `TDD`, Task 2는 `verification-only`로 계획과 같다. dev-1.1의 조각 표를 Dev의 원시 출력과 대조했다. 시험 수(2, 3, 4, 5, 6, 8, 9, 11, 13), 실패 수, 첫 실패의 값(`actual: undefined`, `0.30000000000000004`, 빠져나온 `division by zero at position 2`, `오류: unexpected end of expression at position 0`, `[ 'renderScreen' ]`)이 표와 같고 파일 시각의 순서가 뼈대 RED, GREEN, 다음 조각, Cleaner 위임, 재점검이다. 조각 순서는 Recommended Execution Order와 같다.
- 기준 통과 조각: 1.3-UNIT-006, 005, 003, 008, 009와 호출 사이 상태 시험은 처음 실행에서 통과했다. 기록이 RED 없음을 그대로 적었고 사후 민감도 점검으로 닿음을 보였다. 이것은 RED가 아니라는 한계를 유지한다. 요약 파일의 변형 18개 결과와 기록의 표가 같다.
- Cleaner: 작업 트리 상태 파일이 위임 전후 같고, 지적 F-1 ~ F-6의 처분이 최종 파일에 나타난다(`NESTING_LEVELS`, `assertErrorLines`가 `assertLines`를 부름, 지역 상수 `longErrorExpression`과 `rejected`, JSDoc, 지운 주석, 바꾼 시험 이름).
- 시험의 세 금지 꼴: 내부 협력자를 바꾸지 않고 비공개 부분을 부르지 않으며 곁 통로가 없다. 대역이 없다. 표 1의 기대는 글자 그대로이고 오류 줄의 메시지만 AC 2가 맡긴 대로 `evaluate`에서 얻는다. 단언에 닿지 않는 시험이 없다.
- 시험 이름과 주석: 13개 이름과 모든 주석을 단언에 대조했다. 어긋남이 없다.
- 규칙: CC-JS-001 ~ 006, CL-GLD-001 ~ 010을 읽어 위반을 찾지 못했다. 숫자 리터럴의 분류는 아래 "기각과 합침"에 있다.
- CRAP: `quality.crap.commands`가 비어 측정하지 않음이고 통과도 차단도 아니다. 제안은 기존 future-work 항목 `[Tech-Debt] CRAP 측정 경로`가 들고 있어 새로 하지 않는다.
- 도메인 용어: 글로서리 파일이 없다. 코드의 표시 낱말은 PRD와 같은 뜻이다(식, 결과, 오류, 폭).

### 기각과 합침

| 후보 | 처리 | 까닭 |
| --- | --- | --- |
| `SCREEN_WIDTH`, `DISPLAY_WIDTH`의 40, `LARGEST_POWER_OF_TEN`의 308, `NESTING_LEVELS`의 100000 | 기각 | CL-GLD-001 Numeric literals 2단계, 이름이 양을 말하는 상수다 |
| 시험 표의 `42`, `0` | 기각 | 3단계, 시험 입력이다 |
| 제품과 시험에 40이 함께 있음 | 기각 | 1단계의 "Test code that states a value of the production code it checks does not repeat that value" |
| `errorLineOf`가 기대를 `evaluate`에서 얻음 | 기각 | AC 2의 `{메시지}`가 그 식의 메시지이고 "판정 방법"이 정했다. 시험이 접두를 글자로 적고 던짐을 단언한다. 접두와 메시지를 바꾼 변이가 모두 실패한다 |
| 시험 이름 `throws what evaluate throws when that is not a calculation error` | 기각 | 판정 방법의 "같은 오류"와 같은 뜻이고 코드에 대해 참이어서 CC-CMT-010 아래 문장의 거짓 주장이 아니다. 동일성의 틈은 PO1-N10이 든다 |
| `7 +` 줄의 길이 단언이 메시지 길이에 기댐 | PO1-N4에 합침 | E-2가 "지금 엔진의 메시지로 46글자"라고 전제를 적었고 틀릴 때 조용히 지나가지 않는다. 엔진을 바꾸는 일은 뒤의 변경이다. gate의 `recommendations.future`에 적었다 |
| 커밋 5ca0d47의 시각 정정 | 기각 | Dev가 자기 기록의 정체 정보를 같은 작업 안에서 고쳤고 결과를 바꾸지 않았다. 고친 값이 커밋 시각(8ece8d7 18:29, a9c03de 18:31)과 맞고 앞 값은 Git에 남는다 |
| dev-1.1의 `rethrow-*`(Cleaner의 폴더는 `rebuild-*`), File List의 설명이 Status와 Change Log를 빠뜨림 | 기각 | 말한 사실은 맞고 표현만 덜 정확하며 완전한 목록으로 쓰이지 않는다(결정 순서 step 3의 imprecise). 파일 목록 자체는 `git diff --name-status`의 여덟 파일과 같다 |
| 80칸을 넘는 시험 이름 줄 다섯 | 기각 | CC-JS-002의 80칸은 선호 폭이고 글자열을 줄바꿈할 수 없다. dev-dod-1의 "5개"는 측정과 같다 |
| JSDoc의 `오류: ` | 기각 | AC 2의 표시 글자 인용이고 주석의 언어 예외가 아니다 |
| 공백의 정의가 엔진과 겹침(CL-GLD-005, CL-GLD-009) | 기각 | 엔진의 공개 심볼은 둘뿐이고 범위 밖이며 N-1이 미결이어서 지금 합칠 대상이 없다 |
| `let value;` | 기각 | `try`를 `evaluate`로 좁히려는 재바인딩이어서 CC-JS-001에 맞다 |

### 위험 평가

방법: Story의 Risk Coverage 표와 이 회차의 실행을 놓고 결과의 크기와 가능성을 글로 판단했다. 프로젝트에 정한 위험 척도는 없다.

| 위험 | 크기 | 통제 | 남은 불확실성 |
| --- | --- | --- | --- |
| 깊은 중첩에서 화면이 던진다 | medium | AC 2가 정한 결과, T-2, 기존 future-work 항목 | PM의 답. 화면을 쓰는 호출자가 아직 없다 |
| 공백의 종류가 미결이다 | low | 표 3 U-1 | PM, SM의 답 |
| `{식}` 앞뒤 공백이 미결이다 | low | 표 3 U-2 | PM, SM의 답 |
| 오류 줄에 영어 까닭이 보인다 | low | AC 2, 1.3-UNIT-004 | PM의 답 |
| 받은 글자와 받은 오류의 전달이 시험으로 다 잡히지 않는다 | low | 현재 코드의 읽기, 1.3-UNIT-005, 1.3-UNIT-006 | 뒤의 수정. TEST-001, PO1-N10 |
| 폭을 넘는 줄의 처리와 Architecture의 틈 | low | 메인 세션의 답, 1.3-UNIT-003 | Architect, PM의 답 |

## Code Quality Assessment

`renderScreen`은 네 결과(빈 글자, 값 줄, 오류 줄, 그대로 던짐)를 짧은 분기로 나눈다. `try`가 `evaluate`만 감싸 `formatNumber`의 오류를 가리지 않는다. 공개 심볼 둘 뒤에 표시 규칙을 숨겨 호출자가 오류 판정과 표시를 알 필요가 없다. 시험은 표를 그대로 옮겼고 도우미가 파일 안에 있어 읽기 쉽다. 시험과 CI 규칙이 이 회차의 틀린 구현 56개를 잡는다.

## Implementation Recommendations

| 제안 | 근거 | 소유자 | 기대 점검 |
| --- | --- | --- | --- |
| TEST-001의 처리를 정한다. 적용하면 두 시험에 행을 하나씩 더한다(뒤 공백 둘이 있는 `7 +`, `1`과 `+ 2` 사이에 CR이 있는 식). 제품 코드는 바꾸지 않는다 | 위 "분류의 근거" | Dev | 변이 `pass-no-trailing-u0020`, `pass-no-carriage-returns`가 실패하고 전달 코드는 통과한다 |

## Compliance Check

- Coding Standards: pass. 위 Standards Review
- Project Structure: pass. 새 파일 둘이 `docs/architecture.md#소스-트리`의 자리에 있고 바꾸지 않는 여섯 파일에 변경이 없다
- Testing Strategy: pass. 접근, 시나리오, 표 행, 민감도. 기준 통과 조각의 RED가 없다는 한계는 계획이 정한 길이고 기록에 그대로 있다
- All ACs Met: pass. 위 AC 대조

## Improvements Checklist

- [ ] TEST-001의 처리(Dev). 이 회차는 정하지 않았다
- [x] PO1-N9는 실행으로 해소되었음을 저장 출력으로 확인했다
- [x] PO1-N10의 판단을 이 회차의 1.3-INSP-002 읽기에 포함했다
- [ ] PO1-N1 ~ PO1-N8, PO1-N11, PO1-N12는 병합 뒤 PO 점검이 옮긴다

## Security Review

적용되는 기준은 CC-JS-004의 경계 검증이다. 문자열이 아닌 입력 8가지가 `evaluate`의 `TypeError`로 거절되고 글자로 바뀌지 않는다. 식은 `evaluate`만 해석하고 `eval`과 `Function`이 없다. 값 줄의 `{식}`은 문법이 받은 글자(숫자, 소수점, 연산자, 괄호, U+0020)만이고 오류 줄은 엔진의 정해진 까닭과 위치뿐이어서 입력이 그대로 나오는 곳이 없다. 입출력, 비밀, 환경 변수가 없다. 깊은 중첩의 던짐은 호출자가 받는 오류이며 위험 표에 있다.

## Performance Considerations

수용된 성능 기준과 이 변경에 닿는 실행 비용 규칙이 없어 기준을 만들지 않았다. 참고로 공백 판정 정규식은 공백 100만, 200만, 400만 글자 뒤에 다른 글자가 오는 입력에 3.3, 5.9, 10.4 ms로 길이에 비례했다. 이것은 합격 기준이 아니다.

## Review Record Changes

- `docs/stories/1.3.story.md`: QA Results 섹션을 더했다. Status는 Review 그대로다. 다른 섹션은 바꾸지 않았다
- `docs/qa/gates/1.3.yml`: 새 파일, schema 2, 회차 1, PASS
- `docs/story-records/1.3/qa-r1.md`: 이 기록
- 제품과 시험, 다른 역할의 기록, `docs/planning/future-work.md`는 바꾸지 않았다

## Comment Hygiene Report

- 방법과 범위: 체크리스트 §1.1, §1.2, §1.3, §1.4, §1.7의 grep 후보 검색을 `git diff -U0 40e1a6b HEAD -- src/screen.js test/screen.test.js`의 추가 줄에 실행했다. §1.2는 QA 접두, 시나리오 번호, PO와 SM 메모 번호, 표의 행 번호, 결정과 Cleaner 번호를 찾았다. 저작권과 작업 태그도 찾았다.
- 결과: 모두 0건. `git status`는 `src`, `test`, `ci`에 커밋하지 않은 변경이 없다고 보였다.
- 기준선: 기준 40e1a6b에 두 파일이 없어 기존 잔여물이 없다(`git cat-file -e` 실패). `tests_directory_findings`는 0이다.
- 문맥 읽기: 머리 줄 둘, `SCREEN_WIDTH` 위 설명, `renderScreen`의 JSDoc, 공백 판정의 까닭, 시험의 상수와 도우미 설명, 표 3 시험의 설명, 시험 이름 13개를 읽어 코드와 단언에 대조했다. 모두 영어이고 이유와 계약을 말하며 편집 이력이 없다. 비ASCII 글자는 표시 글자 `오류: `가 코드 둘과 JSDoc 하나에 있을 뿐이다.
- 수명: IN-FLIGHT 일치 없음, 원장 비어 있음, `pending_at_review`와 `pending_after_story_done`은 0, 이전 Story의 표시 없음.
- 보존 목록: `commentHygiene.preservedComments`가 비어 있어 기대 0, 관찰 0이다.
- §5.3: C++ 머리글과 빌드 가드가 없어 빌드 가드, 핫스팟, 접근 지정자는 해당 없음이다.
- 판정: PASS. 활성 주석 지적이 없다.

## Extra Reviews

없다. 이 run은 오케스트레이션 스위치가 꺼져 있어 추가 검토자가 없다.

## 한계

- 네트워크를 쓰지 않는 호출이어서 이슈 #8의 실제 상태와 호스팅 서비스의 CI 실행(ubuntu-latest)을 보지 않았다. 둘 다 이 Story의 필수 시나리오가 아니고, 필수 점검은 이 기기의 Windows와 Node.js v24.22.1에서 돌렸다.
- 변이는 사람이 고른 67개이고 도구가 만든 전수가 아니다. 프로젝트에 변이 도구가 없다.
- 속성 실행의 문자열은 길이 8까지이고 깊은 중첩은 따로 보았다.
- Dev의 `git ls-remote` 읽기는 Dev 보고로만 안다.
- 메인 세션의 소유권 점검은 이 작업 뒤에 돈다.
