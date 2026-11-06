# qa-r1 — 아주 깊은 중첩을 계산 오류로 돌려주기

- Story: [bug-2](../../stories/bug/bug-2.story.md)
- Entry: QA review round 1
- Reviewer and time: Quinn(QA 하위 세션, 모델 `claude-opus-5-5`, effort `max`는 실행 계획의 값), `*run-story bug-2 remote to Done` run의 역할 작업. 구현을 쓰지 않은 주 검토자의 실제 LLM 검토이고 추가 검토자는 없다. 2026-11-07, 지시 파일 02:28 +0900 뒤에 시작, 점검 실행 02:30 ~ 02:47 +0900, 기록 작성은 그 뒤
- Reviewed inputs: 브랜치 `story/bug-2`, 기준 브랜치 `main`, 기준선 `9aea191`, HEAD `4c7fb2f`, 커밋하지 않은 변경 없음. 구현 개정은 `4a69ac7`이고 그 뒤 `src/`, `test/`는 바뀌지 않았다(`git diff --quiet 4a69ac7 HEAD -- src test` 종료 상태 0). 환경은 Node.js v24.22.1, Windows x64, Git 2.51.0

## 읽은 입력과 규칙

- Story 파일 전체, 기록 문서 dev-1.1, dev-2.1, dev-dod-1 전체. po-r1의 PO1-B1 절, po-r2의 앞부분과 PO1-B1 절. 앞선 PO와 SM의 결과는 판정의 근거가 아니라 입력으로 읽었다.
- 부모와 설계: `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md` 전체, 커밋 21a78f7의 `docs/planning/future-work.md` 항목 "아주 깊은 중첩", 커밋 2c44760의 메시지, 현재 future-work 파일의 항목 "[Tech-Debt] CRAP 측정 경로"와 "[Tech-Debt] 재발: 기록의 서술이 실제와 다름".
- 코드: `src/engine.js`, `src/screen.js`, `src/number-format.js`, `test/engine.test.js`, `test/screen.test.js`, `ci/screen-rule.check.mjs`, `.github/workflows/ci.yml`, `package.json`, `README.md`를 끝까지 읽었고 기준선과의 diff 전체를 읽었다.
- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`. `check-instructions.sh` 종료 상태 0.
- 끝까지 읽은 본문(QA의 규칙 종류 `operations`, `design`, `quality`, `documentation`): `golden-rules`, `coding-principles`, `comments`, `documentation`, `testing-tdd`, `crap`, `javascript-language`, `javascript-crap`.
- 끝까지 읽은 절차: `agents/qa.md`, `project-map.md`, `core-config.yaml`, `tasks/load-project-rules.md`, `tasks/review-story.md`, `tasks/qa-gate.md`, `templates/qa-gate-tmpl.yaml`, `tasks/review-loop.md`, `tasks/run-story.md`, `tasks/trace-requirements.md`, `tasks/nfr-assess.md`, `tasks/code-comment-style.md`, `tasks/in-flight-comment-lifecycle.md`, `tasks/architecture-align.md`, `tasks/research-decision.md`, `checklists/comment-hygiene-checklist.md`, `data/agent-context.md`, `data/finding-classification.md`, `data/story-paths.md`, `data/development-quality.md`, `data/verification-ownership.md`, `data/local-git-workflow.md`, `data/workflow-routing.md`, `data/future-work-planning.md`, `data/domain-language.md`, `data/defect-diagnosis.md`, `utils/checks/gate-rules.awk`.
- 일부만 읽은 파일: `tasks/local-story-done.md`(조건 부분), `tasks/apply-qa-fixes.md`(처리 줄과 면제 부분), `templates/story-tmpl.yaml`(QA Results), `user-guide.md`(사용자의 결정 부분), `utils/checks/check-owned.sh`(`role_owns`), `utils/checks/story-rules.awk`(gate 관련 줄).
- 앞선 gate와 QA Results는 꼴의 참고로만 보았다.

## Spec Review

### AC 대조

| AC | 관찰과 근거 | 판정 |
| --- | --- | --- |
| AC 1 | 전달 모듈에 `D`, `M`, `O`, `1 + D`, `D + a`를 넘기면 모두 `CalculationError`이고 메시지는 `expression nested too deeply at position 0`이다. 시험 `throws a CalculationError for an expression nested too deeply`가 다섯 입력을 `instanceof`로 본다. 기준선 엔진의 사본에서 이 시험이 `RangeError`로 실패한다 | 충족 |
| AC 2 | `src/engine.js`에 깊이 변수, 숫자 한도, 길이 한도가 없다. `P(1000)`, `M(1000)`, `A(500)`은 1, `F`는 200000, `S`는 3이다. n = 2000 ~ 20000의 19개 깊이에서 `P(n)`, `M(n)`은 1 또는 `CalculationError`, `O(n)`은 `CalculationError`이고 다른 값과 다른 오류가 없다(시험과 세 번씩 부른 탐침) | 충족 |
| AC 3 | 까닭 `expression nested too deeply`는 다른 까닭 여섯과 다르다. 위치 0은 `Z`의 0 ~ 200007 안에 있다. 입력 다섯을 연속 세 번과 200단을 더한 호출로 부른 메시지가 같다. 커서를 위치로 쓴 변이가 이 시험에서 실패하고 메시지가 2714에서 2658로 바뀐 Dev의 관찰도 저장 출력과 같다 | 충족 |
| AC 4 | `renderScreen`이 `D`, `M`, `O`에서 던지지 않고 `오류: expression nested too deeply at position 0`(46글자)을 돌려준다. 시험이 `errorLineOf`의 글자와의 같음과 CR, LF 없음을 본다. `src/screen.js`는 기준선과 같다 | 충족 |
| AC 5 | `evaluate`의 `@throws {CalculationError}`: "an expression nested so deeply that the parser runs out of call stack. The error of the last case names the start of the expression, and its cause is the overflow." | 충족 |

회귀와 호환 기준도 충족한다. 문자열이 아닌 입력 일곱과 `String` 객체가 `TypeError`로 나가고 `renderScreen`이 같은 클래스와 메시지로 던진다. 기준선의 시험 두 파일과 HEAD 엔진의 사본은 68개 가운데 67개 통과이고, 실패는 시험 `throws what evaluate throws when that is not a calculation error` 하나이며 메시지가 `renderScreen for an expression nested too deeply must throw`여서 지운 행의 실패뿐이다. `node ci/screen-rule.check.mjs`는 종료 상태 0이다.

### 시나리오와 시험의 대응

전체 11개를 이 회차에 직접 실행하거나 읽었다. 합계와 소계는 Testing의 실행 맵과 같다(unit 7, integration 1, inspection 3, automated 9, agent-review 2, user-only 0).

| ID | 수준과 모드 | 시험 또는 방법 | 표의 행 | 결과 |
| --- | --- | --- | --- | --- |
| bug-2-UNIT-001 | unit, automated | 엔진 `throws a CalculationError for an expression nested too deeply` | G-1, G-2 | 통과 |
| bug-2-UNIT-002 | unit, automated | 엔진 `evaluates deeply nested and very long expressions that fit` | V-1, V-2 | 통과 |
| bug-2-UNIT-003 | unit, automated | 엔진 `answers an expression near the depth the recursion can hold with its value or a CalculationError` | B-1, B-2, B-3 | 통과 |
| bug-2-UNIT-004 | unit, automated | 엔진 `names a position inside an expression that is nested too deeply`, `gives a different reason in the message for different problems`, `keeps the overflow of the call stack as the cause of the error for an expression nested too deeply` | G-3, G-4, G-5 | 통과. G-4의 빈 글자 부분은 TEST-001 |
| bug-2-UNIT-005 | unit, automated | 엔진 `gives the same message for an expression nested too deeply on repeated calls and with more frames on the call stack`, `evaluates the next expression after one that is nested too deeply` | G-6, G-7 | 통과 |
| bug-2-UNIT-006 | unit, automated | 화면 `returns an error line instead of throwing for an expression nested too deeply` | S-1 | 통과 |
| bug-2-UNIT-007 | unit, automated | 화면 `throws what evaluate throws when that is not a calculation error` | T-1 | 통과 |
| bug-2-INT-001 | integration, automated | 프로젝트 루트의 `node --test`, `node ci/screen-rule.check.mjs` | 회귀 | 76개 통과, 종료 상태 0 |
| bug-2-INSP-001 | inspection, agent-review | `src/engine.js`의 변경을 끝까지 읽음 | 설계의 조건 | 통과(아래) |
| bug-2-INSP-002 | inspection, automated | `git diff --quiet 9aea191`, "바꾸지 않음" 행의 19개 경로 | 범위 | 종료 상태 0 |
| bug-2-INSP-003 | inspection, agent-review | 누적 변경을 `docs/architecture.md`, D-1, `README.md`와 대조 | 정렬 | 통과(아래) |

`trace-requirements.md`의 범위 분류는 AC 1 ~ 5 모두 `full`이고 실행 결과는 모두 통과다. 시험이 가리지 못해 읽기에 맡긴 부분은 Story의 `coverage_gaps`가 들고 이 회차에 읽었으며, 그 밖의 틈은 TEST-001 하나다.

### bug-2-INSP-001의 읽기

- `evaluate`의 `@throws`가 이 경우와 위치, 원인을 적는다. `CalculationError`의 JSDoc "The message states the reason and the 0-based character position"이 새 오류에도 맞다.
- 잡는 곳은 `evaluate`의 본문으로 `Parser`의 재귀 밖이다. 잡는 것은 `error instanceof RangeError`뿐이고 그 밖은 `throw error;`로 지나간다.
- 깊이 변수, 숫자 한도, 식 길이 한도가 없다. `grep`으로 찾은 이름에도 없고 `this.source.length`는 끝 판정 셋뿐이다.
- `typeof` 확인과 `TypeError`가 `try` 밖이다. 문법, 기존 까닭 여섯, 위치 계산이 그대로이고 `Parser`의 변경은 `fail`이 `calculationErrorAt`을 부르는 것뿐이다. `Parser`가 스스로 던지는 곳은 `fail` 하나다.
- 까닭은 다른 까닭과 같은 꼴의 소문자 영어 문구이고 메시지에 식을 되풀이하지 않는다. `at position`은 `src/`와 `test/`에서 `calculationErrorAt` 한 곳뿐이다.

### 사용자의 결정과 면제 판단

**판단: 이 답은 규칙 위반의 수용이다. `tasks/qa-gate.md` 섹션 Schema when Waived의 꼴로 적는다. 조사 요건은 채워지지 않았다.**

읽은 글은 다음과 같다.

- `tasks/run-story.md` 섹션 Stop, hold and carry on: "When the decision, or an answer that ends a hold, accepts a rule or convention violation, QA records it from its first review round as an approved waiver of that scope, with that text as the approval, in the waiver form of `tasks/qa-gate.md` section Schema when Waived; an unmet AC is still never waived".
- `tasks/qa-gate.md` 섹션 Schema when Waived: "A waiver accepts only a confirmed violation of an applicable rule or convention", "A user's decision or answer that a run's instruction passes on and that accepts such a violation is recorded the same way from QA's first review round, with its text as the approval."
- `user-guide.md`: "A decision that accepts a rule or convention violation counts as QA's approved waiver."
- 사용자의 답(2026-11-07): "조사 없이 이 설계를 수용". 설명: "네트워크 조건은 그대로 둡니다. 조사 없이 이 설계와 그 위험을 받아들인다고 결정합니다. SM이 이 결정과 빠진 자료를 Story에 적고, Story는 조사 요건을 채웠다고 적지 않습니다. 남는 위험: 스택 크기를 바꾼 실행과 다른 런타임의 동작이 확인되지 않습니다." 이 글은 이 회차의 지시, Story의 수용된 결정, 이어가기 로그에서 같다.

조건마다 대조한 결과는 다음과 같다.

| 조건 | 결과 | 근거 |
| --- | --- | --- |
| 적용되는 규칙인가 | 그렇다 | `AGENTS.md` 섹션 Research for uncertainty and core implementation decisions의 "Before deciding an uncertain fact or a core technical, design, or behavioral question needed for implementation, investigate ... using **at least five distinct references**", `tasks/research-decision.md` step 2와 step 7. 이 Story의 제품 변경 전부가 이 설계이고, 수용 문서 셋에 스택, `RangeError`, 재귀가 없어 다른 곳에서 정해지지 않았다. "core", "uncertain"은 정도의 말이지만 Story의 글 "이 결정은 ... 조사 요건을 채운 것이 아니다"가 이 경우를 정한다 |
| 위반이 확인되는가 | 그렇다 | Story의 글 "이 설계에는 그 요건이 드는 참고 자료 다섯 개의 조사가 없다". `docs/research`가 없고 `git log --all -- docs/research`가 0건이다. 설계는 `evaluate`의 `try`와 `catch`로 구현되어 있다. 항목 6의 "do not claim the requirement is met"과 "Record the evidence obtained and the missing material"은 지켜졌으나 다섯 자료의 조사는 그대로 없다 |
| 답이 그 위반을 받는가 | 그렇다 | 답이 조사가 없음과 요건이 채워지지 않음을 말하면서 설계와 위험을 받고, PO1-B1의 잡음을 끝냈다("an answer that ends a hold") |
| 면제가 닿을 수 있는 것인가 | 그렇다 | 조사는 AC, 부모 요구, Story가 이름 붙인 필수 점검이 아니다(`data/finding-classification.md` step 2의 뜻). AC 1 ~ 5와 시나리오 11개는 면제와 상관없이 따로 충족된다. 미충족 AC가 없고 면제가 AC를 덮지 않는다 |
| 범위와 승인자 | 맞다 | 범위는 답의 글대로 "이 Story의 이 설계"이고, 검토한 입력은 HEAD `4c7fb2f`의 `src/engine.js`의 `evaluate`다. 승인자는 사용자다. 다른 Story, 공용 결정, 새 발생으로 넓어지지 않는다 |

받지 않은 읽기와 그 까닭은 다음과 같다.

- 위험 수용일 뿐 규칙 위반이 아니므로 PASS로 적는 읽기. PO 회차가 `pending`으로 닫은 것은 PO에 면제가 없어 쓴 경로이고, po-r2도 이 판단을 QA에 남겼다. `AGENTS.md`의 머리 "the user's current explicit instructions"는 일이 사용자의 말을 따른다는 뜻이고 요건이 채워졌다는 뜻이 아니다. PASS로 적으면 채워지지 않은 요건이 판정에서 사라지고, `tasks/qa-gate.md`의 결정 순서는 면제를 PASS 앞에 둔다.
- 사용자에게 면제 결정을 새로 받을 때까지 지적을 열어 두는 읽기. `tasks/apply-qa-fixes.md` CP-4의 길은 그런 답이 아직 없을 때의 길이다. 이미 받은 답은 `tasks/qa-gate.md`의 문장대로 첫 회차부터 그 글을 승인으로 적는다.

효과는 다음과 같다. gate는 WAIVED이고 `waiver.active`가 true이며 ARCH-001은 `verdict: WAIVED`로 닫혔다. 면제는 코드를 규칙에 맞게 만들지 않고 규칙을 바꾸지 않으며 뒤의 일을 허락하지 않는다. 입력이 바뀌면 QA가 범위를 다시 확인한다. 빠진 자료의 목록은 Story의 수용된 결정에 있고, 이 설계를 공유 근거로 쓰려면 조사가 다시 든다(PO2-N1).

### 실행한 점검

명령은 모두 프로젝트 루트에서 돌렸고 변이는 프로젝트 임시 영역의 사본에서 돌렸다. 추적 파일을 바꾸지 않았다.

| 점검 | 결과 |
| --- | --- |
| `node --test` | 76개 통과, 실패 0, 취소와 건너뜀 0. 10회 반복 모두 같음 |
| `node --test test/engine.test.js`, `node --test test/screen.test.js` | 38개, 14개 통과 |
| `node ci/screen-rule.check.mjs` | 종료 상태 0, 출력 없음 |
| bug-2-INSP-002 | 종료 상태 0. `git diff --name-status 9aea191 HEAD`는 File List의 11개 경로와 같다 |
| `node --test --experimental-test-coverage` | `engine.js`, `screen.js`의 줄, 분기, 함수 100. CRAP 측정이 아니다 |
| 기준선 시험과 HEAD 엔진의 사본 | 68개 가운데 실패는 지운 행의 시험 하나 |
| HEAD 시험과 기준선 엔진의 사본 | 5개 실패(`throws a CalculationError ...`, `names a position ...`, `answers an expression near ...`, `keeps the overflow ...`, 화면 `returns an error line ...`). 사후 재현이고 Dev의 RED를 대신하지 않는다 |
| `check-instructions.sh`, `check-stage.sh records`, `po-record`, `future --story bug-2` | 종료 상태 0. `po-record`는 GO, 회차 2, complete |
| `check-stage.sh review` | 이미 Review인 Status 하나만 보고한다(Dev의 전환 뒤 상태라 정상) |

### 탐침 결과

| 입력 | 결과 |
| --- | --- |
| `D`, `M`, `O`, `Z`, `1 + D`, `D + a`, `D * D`, `2 * -(D)`, `M(100001)`, `A(100000)`, 괄호와 마이너스를 섞은 식, 괄호 안에 공백을 둔 식 | `CalculationError`, `expression nested too deeply at position 0`, `cause`는 `RangeError`. 줄은 46글자 |
| `a + D`, `7 / 0 + D` | 먼저 만난 문제의 오류(`unexpected character at position 0`, `division by zero at position 2`) |
| 같은 프로세스의 n = 2000 ~ 20000, 세 번씩 | `P(3000)`은 깊이 오류와 값 1, `O(4000)`은 깊이 오류와 `unclosed parenthesis at position 3999`로 갈린다. 그 밖은 한 갈래이고 다른 값과 다른 오류 0건 |
| 새 프로세스, 여섯 번씩 | `P(2000)`, `M(8000)`은 값 1. `P(3000)`, `P(6000)`, `M(10000)`, `M(16000)`, `O(3000)`, `O(13000)`은 깊이 오류. `O(2000)`은 `unclosed parenthesis at position 1999`. Story의 측정 표와 같은 범위다 |
| 문자열이 아닌 입력 일곱과 `String` 객체 | `evaluate`, `renderScreen` 모두 `TypeError: expression must be a string` |
| 공백 2의 20, 24, 26제곱 개와 `a`, 공백만 있는 글자, 2의 24제곱 자리의 수 | `RangeError` 없음. 공백 뒤 `a`는 `unexpected character`, 공백만은 빈 글자, 긴 수는 `number out of range` |
| `7 / 0`, `(7`, `7 $`, 빈 식 | `cause` 속성 없음(`Object.hasOwn`이 false) |
| 호출자가 스택을 거의 다 쓴 호출 | 여백을 5프레임씩 줄인 실행에서 `D`와 `1 + 2`가 `RangeError` 각 1번, `1 + 2`가 깊이 오류 1번. 내 탐침은 마지막 단에서 `1 + 2`와 `7 $`가 깊이 오류였다. N-6, PO1-N5와 같다 |
| 스택 64MB의 Worker | `D`는 값 1. N-5, PO1-N5와 같다 |

### 변이 결과

통제는 76개 통과다. 30개 가운데 21개가 시험에서 잡혔다.

| 변이 | 결과 |
| --- | --- |
| 번역 없음, 모든 오류를 번역, 다른 오류를 삼킴, `typeof`를 `try` 안에 두고 다른 오류를 번역 | 잡힘(5개, 14개, 26개, T-1) |
| 커서를 위치로, 위치 없음, 식 길이 + 1을 위치로, 식만 메시지로 | 잡힘(같은 메시지 시험과 화면 시험, 위치 시험) |
| 원인 없음, 새 오류를 원인으로 | 잡힘(원인 시험) |
| 까닭을 `unclosed parenthesis`나 `number out of range`로 | 잡힘(까닭 시험) |
| 넘치면 값 0이나 1 | 잡힘(8개) |
| 호출마다 달라지는 메시지, 오류 뒤에 남는 상태 | 잡힘(같은 메시지 시험과 화면 시험, 다음 호출 시험) |
| 깊이 한도 500, 길이 한도 100000 | 잡힘(값 시험과 원인 시험) |
| 화면이 모든 오류를 받음, 깊이 오류에 다른 줄, 오류 줄에 LF | 잡힘(T-1, S-1, 오류 줄 시험 일곱) |
| `RangeError` 밖의 오류까지 번역 | 통과. `coverage_gaps`, bug-2-INSP-001. 코드는 `instanceof RangeError`다 |
| 재귀 안에서 잡음 | 통과. `coverage_gaps`, bug-2-INSP-001. 코드는 `evaluate`의 본문이다 |
| 깊이 한도 1500 | 통과. `coverage_gaps`, bug-2-INSP-001. 코드에 한도가 없다 |
| 식과 위치를 함께 담은 메시지, 한국어 까닭 | 통과. N-2, bug-2-INSP-001. 코드는 영어 문구이고 식이 없다 |
| 위치가 식 길이 | 통과. N-1이 열어 둔 범위다 |
| 화면이 `RangeError`도 받음, 같은 클래스와 메시지로 새 오류를 던짐 | 통과. bug-2-INSP-002, "현재 시험에 관한 주장". `src/screen.js`는 기준선과 같다 |
| 빈 까닭 | 통과. TEST-001 |

"현재 시험에 관한 주장"의 네 행도 위 결과와 같다.

## Standards Review

**TDD 증거.** 접근 `TDD`, 결함 수정(CC-TDD-005). dev-1.1의 조각 표를 Dev의 저장 출력과 대조했다. 조각 1의 RED 70개 가운데 2개 실패(`RangeError`), GREEN 뒤 지운 행의 `must throw` 실패, 70개 통과, 조각 2의 RED 72개 가운데 2개 실패, 72개 통과, 기준 통과 조각 74, 75, 76개가 표와 같고 파일 시각의 순서도 RED, GREEN, 변형, Cleaner, 재점검이다. 조각 3, 4, 5와 G-4, bug-2-UNIT-007에 RED가 없다는 사실이 기록에 그대로 있고, Story의 Recommended Execution Order 3번이 정한 민감도 점검을 사후 점검으로 적었다. RED가 빠졌다고 볼 수 없다: 앞 조각의 구현이 이미 그 동작을 내고 `testing-tdd`가 일부러 망가뜨리지 말라고 한다. 이 회차의 변이가 같은 시험의 민감도를 따로 보였다.

**Cleaner.** SubTask 1.1의 Independent Cleaner review가 있고 처분에 까닭이 있다. F-2를 받아들이지 않은 처분은 맞다. 긴 출력은 엔진이 식을 되풀이하는 결함에서만 나고 그 결함은 G-3과 읽기가 막는다. SubTask 2.1은 기록만 바꾸어 Dev의 점검으로 충분하다.

**시험의 꼴.** 대역이 없고 공개 함수만 부른다. 기대는 표의 값과 판정 방법에서 나오고 구현을 되풀이하지 않는다. 긴 입력은 도우미마다 이름표로 메시지에 들어가지 않는다. 기존 시험의 변경은 이름표 인자, `outcomeOf`로 바꾼 같은 판정, G-4의 입력 추가뿐이고 약해진 단언이 없다.

**CC-JS.** CC-JS-001, CC-JS-002는 추가 줄의 이름, `const`, 들여쓰기, 세미콜론, 큰따옴표에서 맞다. CC-JS-003은 내보내기가 `CalculationError`, `evaluate` 그대로다. CC-JS-004는 경계 검증이 그대로다. CC-JS-006은 번역이 가능한 자리에서 잡고 `cause`를 보존하며 삼키지 않는다. CC-JS-005, CC-JS-007은 닿지 않는다.

**코딩 원칙.** CL-GLD-001의 분류는 아래 "기각과 합침"에 있다. CL-GLD-003, CL-GLD-004는 `typeof` 확인이 먼저다. CL-GLD-005, CL-GLD-009는 메시지의 꼴이 한 곳이다. CL-GLD-006, CL-GLD-007, CL-GLD-OPS-006은 파서를 그대로 두었고 사용자가 받은 설계다. 호출마다 새 `Parser`여서 넘침 뒤 남는 상태가 없다.

**Architecture 정렬(bug-2-INSP-003).** ES 모듈, 내장 모듈만(`src/engine.js`에 가져오기가 없고 시험은 `node:test`, `node:assert/strict`와 프로젝트 모듈), 소스 트리의 책임, 입출력과 전역 상태 없음(모듈의 바뀌는 바인딩이 없고 `console`, `process`, `globalThis`, 난수, 날짜 없음), `eval`과 `Function` 없음, 오류 클래스, 가져오기 방향이 모두 맞고 D-1의 세는 법과도 맞다. dev-2.1의 no-change와 같고 문서를 고쳐 위반을 덮은 일이 없다. "순수 함수"와 경계 부근의 결과는 PO1-N4에 있다. 수용된 글 "입출력이나 전역 상태를 쓰지 않는다"는 어겨지지 않고, 경계의 결과는 사용자가 받은 항목의 "값 또는 그 결과를 받는 시험을 둔다"와 표 3이 받으며, 재귀 파서는 사용자가 받은 설계이고 기준선에도 있던 성질이다.

**용어.** `docs/domain-glossary.md`가 없다. 식, 위치, `CalculationError`는 PRD와 Architecture의 뜻대로 쓴다.

**문서.** Story와 Dev 기록에 임시 경로와 줄 번호 위치가 없고 보이지 않는 글자가 없다(`invisible-chars.awk`, 검색). Dev의 Story 변경은 Status, Tasks 체크박스, Change Log, Dev Agent Record뿐이다. 사실 주장의 대조에서 어긋난 곳은 DOC-001이다.

### 수집한 지적

| ID | 위치 | 심각도 | 신뢰도 | 처분 | 경로와 소유자 |
| --- | --- | --- | --- | --- | --- |
| ARCH-001 | `src/engine.js`의 `evaluate`, Story의 수용된 결정 | medium | high | Required, 승인된 면제로 닫음 | PO 회차의 `pending`, 소유자 사용자. 답을 받았다 |
| TEST-001 | `test/engine.test.js`의 `gives a different reason in the message for different problems` | low | high | Optional | 계약 안, 소유자 Dev |
| DOC-001 | dev-1.1의 머리와 섹션 "Cleaner 결과" | low | high | Optional | 계약 안, 소유자 Dev |

활성 Required와 Recommended는 없다.

**TEST-001의 결정 순서.** 1단계: 까닭을 빈 글자로 쓴 변이가 76개를 통과해 확인했다. 2단계: 이 Story가 더한 단언이다. 3단계: G-4가 "`D`의 까닭이 빈 글자가 아니고"를 들지만 판정 방법이 까닭을 "메시지에서 수를 뺀 글자"로 정했고 전달 시험이 그 판정대로 닿으므로 미충족이 아니다. 4단계: 전달된 까닭은 비어 있지 않아 잘못된 결과가 없고, 틀린 일이 통과할 수 있다는 가능성은 3단계의 기준을 통해서만 막는다. 비차단이다. 제안한 단언은 프로젝트 임시 영역의 사본에서 통제 38개가 통과하고 빈 까닭에서 이 시험이 실패했다. 낱말을 시험에 적지 않아 N-2와 어긋나지 않는다.

**DOC-001의 결정 순서.** 1단계: 머리의 "첫 RED 02:09"와 조각 1의 RED 출력의 수정 시각 02:07:12, 조각 5의 출력 02:09:42를 대조했고, 검토자의 변형 요약에서 76개를 통과한 행을 읽었다(empty-reason, position-at-the-end-allowed, expression-and-position-in-message, catch-inside-the-recursion-fixed-position, screen-also-answers-range-error, depth-limit-above-the-fitting-depth). 2단계: Dev의 기록이다. 3단계: Story 자신의 실행 기록이어서 "description of current content"가 아니고 Story 안의 다른 문장과 모순하지 않으며, 나열을 완전한 목록으로 쓰는 곳이 없다. 4단계: 순서가 맞고 제품, 시험, 필수 점검의 결과에 닿지 않는다. 비차단이다.

### 기각과 합침

기각한 후보는 다음과 같다.

- 숫자 리터럴. `calculationErrorAt(..., 0, ...)`의 0은 Numeric literals 3단계(위치의 시작)다. `NESTING_LEVELS`, `EXTRA_FRAMES`, `FITTING_LEVELS`, `LONG_SUM_TERMS`, `LONG_SPACE_RUN`, `NEAR_LIMIT_*`는 2단계(수량을 말하는 이름 있는 상수)다. `FITTING_LEVELS / 2`의 2, `LONG_SUM_TERMS - 1`의 1, 표의 값과 `[0, 0, 0, EXTRA_FRAMES]`의 0은 3단계다. 두 시험 파일의 `NESTING_LEVELS` 100000은 1단계가 말하는 독립된 곳이다(한쪽을 바꾸어도 다른 쪽을 바꿀 까닭이 없다).
- 80칸을 넘는 추가 줄 7개. CC-JS-002는 선호 폭이고 "not a hard maximum"이며 포매터가 설정되지 않았다. 시험 이름 다섯과 템플릿 글자 하나는 줄바꿈할 수 없고 나머지 하나는 81칸이다.
- 라벨 글자 "parentheses around a number"의 되풀이와 두 시험 파일의 입력 도우미. 함께 바뀌어야 할 지식이 아니어서 CL-GLD-005가 아니고, 시험 파일마다 입력을 두는 것은 이 저장소의 기존 꼴이다.
- 시험 이름의 "inside". 판정 방법의 0부터 식 길이까지와 같아 거짓 주장이 아니다(N-1).
- `calculationErrorAt`의 `options`. G-5에 필요해 추측이 아니고 다른 오류에 `cause`가 생기지 않는다.
- `renderScreen`의 다른 `RangeError` 경로와 `Parser`의 다른 `RangeError`. 위 탐침에서 나오지 않았다. 길이 `2 ** 29 - 24`의 글자는 Story가 이미 적은 범위 밖이다.

합친 후보는 다음과 같다. 새 지적을 만들지 않았다.

- `1 + D`의 위치 0은 PO1-N1에, 영어 까닭은 PO1-N2에, 다른 오류에 닿는 입력은 PO1-N3에 합쳤다.
- 경계 부근의 결과와 "순수 함수"는 PO1-N4에, 거의 찬 스택과 큰 스택은 PO1-N5에 합쳤다. 사실을 다시 재어 같음을 확인했다.
- 설계 결정의 자리는 PO1-N6, PO2-N1에 합쳤다.

Dev와 Cleaner가 넘긴 질문은 없다. 리드와 미완료 점검도 없다.

### 위험 평가

방법: 프로젝트에 위험 척도가 없어 결과의 크기와 가능성을 글로 판단했고, 범위는 이 Story의 변경과 그 호출자다.

| 위험 | 크기 | 통제 | 남은 불확실성 |
| --- | --- | --- | --- |
| 조사 없는 설계(ARCH-001, N-5) | medium | 사용자의 수용, 기본 스택의 시험과 탐침 | 스택 크기를 바꾼 실행과 다른 런타임 |
| 경계 부근의 결과(N-4) | medium | 표 3, 다른 값과 다른 오류 0건 | 같은 식의 결과가 스택 상태에 달림. 소유자 Architect |
| 호출자가 스택을 거의 다 쓴 호출(N-6) | low | 이 Story의 입력이 아니고 호출자가 아직 없음 | 좁은 여백에서 `RangeError`, 짧은 식의 깊이 오류 |
| 새 오류의 위치(N-1) | low | 시험이 범위만 받음 | 위치 규칙의 답 |
| 까닭의 언어(N-2) | low | 읽기 | 메시지 언어의 답 |
| 다른 오류에 닿는 입력(N-3) | low | T-1 | 문자열이 아닌 입력의 답 |
| 번역의 범위 | low | `RangeError`만 잡음, 읽기, 탐침 | 없음 |
| 시험이 못 가리는 변형 | low | 읽기, `coverage_gaps`, TEST-001 | 뒤의 수정 |

## Code Quality Assessment

변경이 작고 맞다. 제품은 `evaluate`의 `try` 하나와 메시지의 꼴을 모은 함수 하나이고 인터페이스가 그대로다. 주석은 왜 위치가 식의 시작인지를 적는다. 시험은 표의 행을 빠짐없이 닿고 입력 크기가 이름 있는 상수이며 긴 입력이 메시지에 들어가지 않는다. 제품 결함을 찾지 못했다.

## Implementation Recommendations

- TEST-001. 소유자 Dev. 계약 안에서 고치면 시험 `gives a different reason in the message for different problems`에서 `D`의 까닭의, 다른 문제의 까닭과 겹치는 꼬리를 걷어낸 나머지가 비어 있지 않은지 본다. 기대 점검: 통제 통과, 빈 까닭의 변이에서 이 시험 실패, `node --test`. 고치지 않으면 `future`로 두고 항목 "오류 메시지의 언어와 꼴"의 답과 함께 본다.
- DOC-001. 소유자 Dev. 고치면 앞선 기록을 고쳐 쓰지 않고 Completion Notes의 새 항목에서 시각과 나열을 정정한다. 코드와 시험은 바꾸지 않는다. 고치지 않으면 `future`로 두고 병합 뒤 점검이 재발 항목에 더한다.

## Compliance Check

- Coding Standards: pass. CC-JS, 코딩 원칙, 주석 규칙에 현재 위반이 없다.
- Project Structure: pass. 새 경로와 새 내보내기가 없고 `docs/architecture.md`와 맞다.
- Testing Strategy: pass. TDD 조각, 사후 민감도 점검, Cleaner, 재점검이 계획대로이고 TEST-001은 비차단이다.
- All ACs Met: pass. AC 1 ~ 5 모두 충족이고 면제가 덮는 AC가 없다.

## Improvements Checklist

- [x] 필수 시나리오 11개 실행과 읽기
- [x] 표 1 ~ 4의 행과 전달 시험의 대응
- [x] Dev 기록의 사실 주장 대조
- [x] 면제 판단과 기록
- [ ] TEST-001의 처리(소유자 Dev)
- [ ] DOC-001의 처리(소유자 Dev)

## Security Review

새 입력 경로, 입출력, 비밀, 의존성이 없다. 경계 검증이 그대로이고 새 메시지는 식을 되풀이하지 않아 긴 입력이 오류 줄로 돌아가지 않는다. 문제를 찾지 못했다.

## Performance Considerations

수용된 성능 기준과 이 변경에 닿는 실행 비용 규칙이 없어 측정하지 않았다(Story의 기술 제약). CRAP은 `quality.crap.commands`가 비어 측정하지 않음이고 통과도 차단도 아니며, 제안은 항목 "[Tech-Debt] CRAP 측정 경로"가 이미 든다. 위 범위의 값은 CRAP 측정이 아니다.

## Review Record Changes

- Story의 QA Results에 회차 1 항목을 더했다. Status는 Review 그대로다.
- `docs/qa/gates/bug-2.yml`을 새로 만들었다.
- 이 기록 문서를 새로 만들었다.
- 코드와 시험을 고치지 않았다. Done을 하지 않았다.

## Comment Hygiene Report

방법과 범위: 기준선 `9aea191` 대비 `src/engine.js`, `test/engine.test.js`, `test/screen.test.js`의 추가 줄 224줄(지운 줄 33줄)에 체크리스트 §1.1, §1.2, §1.3, §1.4, §1.7의 후보 검색과 Story, 기록의 ID 40개의 고정 문자열 검색, 작업 태그, 작성자와 저작권, Story 키, 시나리오 번호, 계획의 행 번호 검색을 돌렸다. 모두 일치가 없고 추가 줄에 ASCII가 아닌 글자가 없다. 바뀐 주석 전부와 새 시험 이름 8개를 읽어 코드와 단언에 대조했고 위반이 없다.

- 현재 지적: `tracking_id_leaks` 0, `forbidden_patterns` 모두 0.
- 기준선: 세 파일의 기준선 버전에도 후보가 없어 `tests_directory_findings` 0이다.
- 수명: IN-FLIGHT 표시와 원장 항목이 없고 `pending_at_review` 0, `pending_after_story_done` 0, `orphan_from_prior_stories` 0이다.
- whitelist: `commentHygiene.preservedComments`가 비어 있고 정책에 항목이 없어 기대 0, 관찰 0이다.
- 적용 판단: build guard는 `typeof` 확인이 그대로여서 해당 없음, hotspot은 선언과 구현이 나뉘지 않고 계약과 시험이 커밋 `4a69ac7` 하나여서 N/A, access specifier는 C++이 아니어서 해당 없음이다.
- 판정: PASS. 면제는 위생과 상관없다.

## Extra Reviews

없다. `workflow.run.orca`가 꺼져 있어 이 회차에 추가 검토자가 없다.

## 한계

- 이 호출은 호스팅 서비스를 읽지 않아 이슈 #17의 실제 상태와 CI 실행(ubuntu-latest)을 보지 않았다. 둘 다 이 Story의 필수 시나리오가 아니다.
- 재기는 Windows x64의 Node.js v24.22.1에서만 했다. 스택 크기를 바꾼 실행은 Worker 하나만 보았고 다른 런타임은 보지 않았다. 사용자가 이 위험을 받았다.
- 변이는 사람이 고른 30개이고 도구가 만든 전수가 아니다. 프로젝트에 변이 도구가 없다.
- 외부 자료를 읽지 않았다. 이 기록은 조사 요건을 채웠다고 말하지 않는다.
- 메인 세션의 소유권 점검은 이 작업 뒤에 돈다.
