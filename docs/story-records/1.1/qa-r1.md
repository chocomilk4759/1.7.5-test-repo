# qa-r1 — 계산 엔진

- Story: [1.1](../../stories/1.1.story.md)
- Entry: QA review round 1
- Reviewer and time: Quinn(QA 하위 세션, 모델 `claude-opus-5-5`, effort `max`, 둘 다 시스템이 알려 준 값), `*run-story 1.1` run의 역할 작업. 2026-11-06, 메인 세션의 시작 스냅샷 10:32 +0900 뒤에 시작, 점검 실행 10:42 ~ 10:52 +0900, 기록 저장 10:58 +0900. 실제 LLM 검토이며 추가 검토자는 없다.
- Reviewed inputs: 브랜치 `story/1.1`, 기준 `main` 862f5fd, HEAD 50347a4, 커밋하지 않은 변경 없음. 구현 개정은 d49a11f이고 `src/engine.js`와 `test/engine.test.js`는 그 뒤 바뀌지 않았다(`git hash-object` 값 `5e7c584b21900d`, `abaa40a4123015`, dev-1.1의 최종 상태와 같다).

## 읽은 입력과 규칙

- Story 파일 전체, 기록 문서 dev-1.1, dev-2.1, dev-dod-1 전체, po-r1의 앞부분(범주와 계획 점검). 부모와 설계: `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`, `docs/planning/future-work.md`. 코드: `src/engine.js`, `test/engine.test.js`, `src/number-format.js`, `test/number-format.test.js`, `package.json`, `README.md`, `.github/workflows/ci.yml`, `ci/screen-rule.check.mjs`.
- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`. `check-instructions.sh` 종료 상태 0.
- 끝까지 읽은 본문(QA의 규칙 종류 `operations`, `design`, `quality`, `documentation`): `golden-rules`, `coding-principles`, `comments`, `documentation`, `testing-tdd`, `crap`, `javascript-language`, `javascript-crap`.
- 끝까지 읽은 절차: `agents/qa.md`, `tasks/load-project-rules.md`, `tasks/review-story.md`, `tasks/qa-gate.md`, `templates/qa-gate-tmpl.yaml`, `tasks/trace-requirements.md`, `tasks/nfr-assess.md`, `tasks/risk-profile.md`, `tasks/code-comment-style.md`, `tasks/in-flight-comment-lifecycle.md`, `checklists/comment-hygiene-checklist.md`, `tasks/local-story-review.md`, `tasks/local-story-done.md`, `tasks/architecture-align.md`, `tasks/apply-qa-fixes-extract.md`, `data/finding-classification.md`, `data/story-paths.md`, `data/agent-context.md`, `data/development-quality.md`, `data/verification-ownership.md`, `data/domain-language.md`, `data/quality-tooling.md`, `data/workflow-routing.md`, `data/local-git-workflow.md`, `data/future-work-planning.md`, `data/terms.md`, `utils/checks/gate-rules.awk`, `utils/checks/story-rules.awk`, `utils/checks/record-rules.awk`.
- 일부만 읽은 파일: `tasks/run-story.md`(Role sessions, Rounds, Checks after each task, Stop hold and carry on, Final report), `data/story-slicing.md`(Record actual blocking relationships), `tasks/apply-qa-fixes.md`(CP-1 ~ CP-4 앞부분), `templates/story-tmpl.yaml`(Dev Agent Record와 QA Results).

## Spec Review

### AC 대조

| 요구 | 시나리오와 시험 | 수준, 방식 | 관찰 | 범위 |
| --- | --- | --- | --- | --- |
| AC 1 값, 우선순위, 왼쪽 결합, 괄호 | 1.1-UNIT-001, 002, 003, 008 | unit, automated | 표 V-1 ~ V-5 값이 모두 맞다. `8 - 3 - 2`에 닿는 시험이 없다(TEST-001) | partial: 빠진 것은 `8 - 3 - 2` 한 행 |
| AC 2 단항 마이너스, 공백 | 1.1-UNIT-004, 005 | unit, automated | V-6, V-7과 표 3이 맞다 | full |
| AC 3 오류와 메시지 | 1.1-UNIT-006, 007, 008, 009, 011, 012, 013, 1.1-INSP-003 | unit과 inspection, automated와 agent-review | E-1 ~ E-4, E-7 ~ E-9, E-11, E-12가 맞고 메시지가 까닭과 위치를 담는다 | full |
| AC 4 반올림 없음 | 1.1-UNIT-015 | unit, automated | V-8이 `Object.is`로 맞다. `-0` 포함 | full |
| 결정 D-1 | 1.1-UNIT-003, 004, 008, 010, 011 | unit, automated | 수의 꼴, 단항 `+` 거부, 단항 마이너스 자리, 중간값의 유한성, 0부터 센 위치가 맞다 | full |
| Architecture 설계 원칙 | 1.1-UNIT-013, 1.1-INSP-001, 002, 004 | unit, inspection | `eval`과 `Function` 없음, 순수 함수, `Error`를 잇는 자기 모듈의 오류 클래스, 가져오기 없음 | full |
| 기존 표시 규칙 회귀 | 1.1-UNIT-016 | unit, automated | 기존 시험 4개 통과, 두 파일의 `git diff` 빈 결과 | full |

AC 집계: 4개 가운데 full 3, partial 1, none 0. 위 범위는 시험의 설계 범위이고 실행 결과는 아래 표와 "실행한 점검"에 따로 적었다.

### 시나리오와 시험 이름의 대응

시나리오 20개 모두 실행했다. 실행 맵의 방식(automated 17, agent-review 3, user-only 0)을 바꾸지 않았다. 엔진 시험 30개가 모두 아래에 한 번 이상 나온다.

| 시나리오 | 시험 이름 또는 방법 | 결과 |
| --- | --- | --- |
| 1.1-UNIT-001 | "evaluates a single number and each of the four operations", "multiplies and divides before adding and subtracting", "parentheses override the default grouping" | 통과, 단 `8 - 3 - 2` 행 없음(TEST-001) |
| 1.1-UNIT-002 | "operators of equal precedence are evaluated from the left", "parentheses override the default grouping"의 `8 - (3 - 2)` | 통과 |
| 1.1-UNIT-003 | "accepts digits with an optional fractional part", "rejects a number without digits on both sides of the point or with an exponent" | 통과 |
| 1.1-UNIT-004 | "accepts a unary minus before a number, a parenthesis or another minus", "rejects a unary plus" | 통과 |
| 1.1-UNIT-005 | "ignores spaces between numbers and operators", "answers other spacing with the value or a CalculationError" | 통과 |
| 1.1-UNIT-006 | "rejects division by zero, also by a computed zero or negative zero", "divides by a number that is not zero", "gives one reason for every division by zero" | 통과 |
| 1.1-UNIT-007 | "rejects a closing parenthesis without an opening one", "rejects an opening parenthesis that is never closed", "names the stray character when a closing parenthesis was expected" | 통과 |
| 1.1-UNIT-008 | "rejects characters outside digits, operators, parentheses and spaces", "rejects tokens that are in the wrong place", "rejects an expression that ends without an operand" | 통과 |
| 1.1-UNIT-009 | "rejects an empty expression and one made of spaces only" | 통과 |
| 1.1-UNIT-010 | "accepts the largest finite power of ten and a quotient that underflows", "rejects a number literal that is not finite", "rejects an intermediate or final result that is not finite" | 통과 |
| 1.1-UNIT-011 | "counts error positions from zero in the original expression", "reports the position of one problem when an expression has several" | 통과 |
| 1.1-UNIT-012 | "gives a different reason in the message for different problems" | 통과 |
| 1.1-UNIT-013 | "throws a CalculationError that is an Error with a text message", "keeps no state between calls, also after an error" | 통과 |
| 1.1-UNIT-014 | "throws an Error for input that is not a string" | 통과 |
| 1.1-UNIT-015 | "returns the double-precision result without rounding" | 통과 |
| 1.1-UNIT-016 | `test/number-format.test.js`의 4개와 `git diff 862f5fd --quiet -- src/number-format.js test/number-format.test.js` | 통과, 종료 상태 0 |
| 1.1-INSP-001 | 계획된 `grep` 명령을 `src/engine.js`에 실행 | 통과, 일치 없음, 종료 상태 1 |
| 1.1-INSP-002 | `src/engine.js`를 끝까지 읽음. 실행 시 내보내기 `CalculationError`, `evaluate` | 통과. 가져오기, 입출력, 전역 접근, 모듈 변수가 없고 호출마다 새 `Parser`를 만든다 |
| 1.1-INSP-003 | 대표식의 메시지를 다시 냄 | 통과. "division by zero at position 2", "unclosed parenthesis at position 0", "unexpected character at position 2", "unexpected end of expression at position 0", "result out of range at position 315" |
| 1.1-INSP-004 | 누적 변경을 `docs/architecture.md`, D-1, `README.md`와 다시 대조 | 통과. dev-2.1의 no-change 결론과 같다 |

### 실행한 점검

Node.js v24.22.1, Git 2.51.0, 프로젝트 루트, HEAD 50347a4. 아래 스크립트는 프로젝트 임시 영역에 두었고 제품 파일을 바꾸지 않았다. 변이와 입력 수집은 복사본에서 했다.

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 전체 시험 | `node --test` | 34개 통과, 실패 0(엔진 30, 기존 4) |
| 표 대조와 닿음 | Story의 표 1, 표 2를 읽어 116행(값 56, 오류 60)을 만들고 실제 엔진에 돌린 뒤, `evaluate` 인자를 모으는 복사본에서 전달 시험을 실행해 입력 126개와 비교 | 모든 행의 값과 위치 후보가 표와 맞다. 입력에 없는 행은 `8 - 3 - 2` 하나다 |
| 독립 오라클 1 | 식 트리를 만들어 임의의 공백으로 출력하면서 연산자 위치를 적고, 트리를 걸어 기대 값이나 첫 오류를 구한다. 30만 건 | 값 111266건, 오류 188734건, 불일치 0. 값은 `Object.is`, 오류는 까닭과 위치까지 비교 |
| 독립 오라클 2 | 피연산자 기대와 연산자 기대의 상태와 여는 괄호 스택만 가진 상태 기계로 임의 문자열 30만 건의 문법 판정과 위치를 구한다. 글자 집합에 탭, 줄바꿈, U+00A0, U+FF11, U+1F600, U+FEFF 포함 | 문법 오류 294523건, 값 5401건, 문법 오류보다 앞선 계산 오류 76건, 불일치 0 |
| 변이 | 손으로 쓴 변이 83개를 전달 시험에 실행 | 잡힘 72, 통과 11. 내역은 아래 "변이 결과" |
| 동등성 비교 | 통과한 변이 가운데 동등해 보이는 둘을 원본과 입력 50만 개로 비교 | `parseFloat`는 차이 0(동등), `-this.parseTerm()`은 차이 71건(동등 아님, TEST-003) |
| 깊은 중첩 | 깊이를 바꾸어 예열된 프로세스와 새 프로세스에서 실행 | 아래 "넘겨받은 질문" 3 |
| CI 규칙 | `node ci/screen-rule.check.mjs` | 종료 상태 0. `src/screen.js`가 없어 판정 없음이고 이 Story의 필수 점검이 아니다 |
| 기록 | `check-stage.sh records`, `check-stage.sh future --story 1.1` | 종료 상태 0. 알림은 이 Story와 무관한 항목 "결과 복사"의 `Revisit` |

### 변이 결과

통과한 변이 11개는 다음과 같다.

| 변이 | 판정 | 근거 |
| --- | --- | --- |
| 유한하지 않은 결과의 위치를 0으로, 덧셈과 뺄셈의 위치를 하나 뒤로, 곱셈과 나눗셈의 위치를 하나 뒤로, 유한하지 않은 수 글자의 위치를 0으로 | 계획이 허용 | E-10과 E-1의 `{범위}` 행. PO1-N1, PO1-N8 |
| 짝 없는 `(`를 식 끝 위치로 알림 | 계획이 허용 | E-3의 후보 `{0, 6}` 등. PO1-N1 |
| 탭도 공백으로 건너뜀 | 계획이 허용 | 표 3. PO1-N3 |
| 문자열이 아닌 입력에 `CalculationError` | 계획이 허용 | 표 3은 `Error`의 인스턴스를 받는다. PO1-N4 |
| 수 변환을 `parseFloat`로 | 동등 | 숫자 스캔 뒤의 글자만 변환한다. 비교 50만 입력에서 차이 0 |
| 단항 마이너스가 항까지 삼킴(`-this.parseTerm()`) | 시험 틈 | `8 / -2 * 3`이 -12가 아니라 -1.333...이 된다. TEST-003 |
| 곱셈의 오른쪽이 0이면 거부 | 시험 틈 | `7 * 0`이 오류가 된다. TEST-003 |
| `CalculationError`를 `Error`의 별칭으로 | 시험 틈 | `instanceof CalculationError`가 다른 오류와 구별하지 못한다. TEST-003 |

### 분류의 근거

- TEST-001: 1단계, 시험 파일 검색과 입력 수집 모두 일치 없음. 2단계, 이 Story가 만든 시험. 3단계, 시나리오 1.1-UNIT-001이 "V-1, V-2, V-3의 식이 표의 값과 정확히 같다"고 정하고 V-3 칸이 "`8 - 3 - 2` → 3"을 값과 함께 적었으므로, `data/finding-classification.md`의 "a named case that no delivered check reaches leaves that criterion unmet"에 든다. 다른 읽기는 이 칸을 대조 설명으로만 보는 것이다. 그래도 PO 1회차의 계획 점검이 이 식을 V-3의 값 행으로 세어 검증했고(값 56행, V-3 5행), 표의 다른 대조 식 `2 + 3 * 4`는 V-2의 행으로 시험되므로 이 읽기를 택하지 않았다. Dev는 이의를 근거와 함께 남길 수 있고 다음 회차가 판단한다.
- TEST-002: 1단계, Dev의 변형 실행 출력 전부를 시험 이름으로 찾았다. 2단계, 이 Story의 기록. 3단계, Recommended Execution Order가 "앞 조각의 구현으로 이미 통과하는 테스트"라는 항목 각각에 요구한 결과가 셋에 없다. 조각 표에는 기준 통과가 적혀 있으나 닿음 확인은 없고, "RED를 본 조각 ... 이 점검이 필요 없다"가 이들을 건너뛴다. 조각 9a의 `)` 시험은 위치를 1부터 세는 변형에서 실패가 기록되어 있어 빠진 셋에 넣지 않았다. QA의 사후 변이가 세 시험의 민감도를 보였으나, `testing-tdd`대로 사후 점검은 Dev의 실행 순서를 증명하지 않고 계획의 기록을 대신하지 않는다.
- TEST-003: 1단계, 변이 실행으로 확인. 3단계, 어떤 점검이나 시나리오도 이 사례들을 이름 붙이지 않았으므로 기준이 아니다. 4단계, 실제 코드의 값이 맞아 잘못된 결과가 없고, 틀린 구현이 통과할 수 있다는 가능성은 3단계의 기준을 통해서만 막는다. 비차단이고 계약 안이다.
- MNT-001: 1단계, 실행으로 확인. 3단계, 수용 문서에 `name`이 없다. 4단계, 수용된 쓰임에 잘못된 결과가 없다. 비차단이고 계약이 말하지 않는 속성이다.

### 넘겨받은 질문(Dev의 메모 네 건)

모두 리드처럼 직접 확인했다. 막는 것이 없어 `pending` 지적이 없고 게이트의 회차 `note`에 리드로 두었다.

1. **구현 선택.** 오류 위치 규칙, 공백은 U+0020만, 숫자는 ASCII만, 문자열이 아닌 입력은 `TypeError`, 메시지는 영어 까닭과 위치. 확인: dev-1.1의 규칙이 독립 오라클의 기대와 까닭, 위치까지 일치하고, 표 2의 후보와 표 3의 받는 결과 안에 모두 든다. 미결 항목의 판정(`data/finding-classification.md`의 undecided item 문단, `data/story-slicing.md`): Story의 합격 판정이 어느 읽기에서도 같으므로 4단계에서 다른 구현 선택일 뿐이고 막지 않는다. 수용된 결정은 아니며 PO1-N1 ~ PO1-N5로 열려 있다. 소유자는 프로젝트 소유자와 PM이다. 시험 "names the stray character when a closing parenthesis was expected"는 고른 위치 규칙의 일부를 고정하므로, 답이 다르게 오면 함께 바꿔야 한다.
2. **CRAP.** `quality.crap.commands`가 비어 있음을 설정에서 확인했다. `data/development-quality.md` 섹션 CRAP check대로 측정하지 않음이고, 통과도 차단도 아니다. 제안은 DEV-1과 그 `Treatment` 줄에 이미 있고 필요한 세 요소(지적과 출처, 적용하지 않는 까닭, 필요한 일)가 다 있어 QA가 되풀이하지 않는다. 복잡도를 다른 수치로 대신 재지 않았다.
3. **깊은 중첩.** 재현했다. 메모의 숫자는 새 프로세스에서 맞지 않는다.

   | 입력 | 새 프로세스 | 예열된 프로세스의 한계 |
   | --- | --- | --- |
   | 짝이 맞는 괄호 | 2000 통과, 3000부터 `RangeError` | 약 5660 |
   | 닫지 않은 괄호 | 2000은 `CalculationError`, 3000부터 `RangeError` | 약 12500 |
   | 단항 마이너스 | 8000 통과, 10000부터 `RangeError` | 약 15600 |

   `RangeError` 뒤의 호출은 정상이고, 중첩 없는 항 20만 개의 합은 계산된다. 분류: AC 1과 AC 3은 깊이의 경계를 정하지 않았고, 다른 수용 문장이 값을 주지 않으며, 어떤 시나리오도 이 사례를 말하지 않는다. Story가 N-6과 `coverage_gaps`에서 범위 밖이라고 적었고 PO가 비차단으로 분류했다. 그래서 3단계의 기준이 아니고, 4단계에서 이름 없는 입력이므로 비차단이다. PO1-N6으로 열려 있고 소유자는 PM, 시점은 Story 1.3 초안 전이다. Story 1.3의 AC 2는 다른 오류를 그대로 던지라고 하므로 화면은 이 입력에서 던진다. `evaluate`의 JSDoc이 이 오류를 말하지 않는 점도 같은 결정을 따른다.
4. **세션 정체.** Dev 세션의 effort 이름 대응과 Cleaner 검토자의 실제 모델 ID는 이 세션에서도 확인할 수 없다. 절차가 특정 모델을 요구하지 않고(`tasks/review-story.md`, `data/development-quality.md`), Cleaner 결과의 내용을 이 회차가 직접 확인했으므로 이 Story의 판정을 막지 않는다. 소유자는 메인 세션이고 최종 보고에서 다룬다.

## Standards Review

- 접근과 TDD 증거: Task 1은 `TDD`, Task 2는 `verification-only`로 계획과 같다. dev-1.1의 조각 표를 Dev의 원시 출력과 대조했다. 조각 1, 3, 4, 5, 9a, 9b, 11, 12a, 12b, 14, 15의 시험 수와 실패 수가 표와 같고, 각 RED는 값, 위치, 까닭의 단언 실패이거나 "Missing expected exception"이어서 가져오기 실패가 아니다. 조각 순서는 Recommended Execution Order와 같다. 처음부터 통과한 조각은 RED 없이 기준 통과로 적었고 이것은 `testing-tdd`가 허용한다. 이 기록의 빈자리는 TEST-002다.
- Cleaner: dev-1.1의 기록과 검토자의 작업 폴더로 보아 마지막 GREEN 뒤, 최종 점검 전에 Dev가 아닌 하위 세션이 검토했고, 지적 13건의 처분과 재점검이 있다. F3, F4는 RED가 아니라 민감도 점검으로 적었고 해당 출력이 있다. 정리 전후 40만 입력 비교의 결과 파일도 기록과 같다.
- 시험 구조: 공개 인터페이스만 쓰고 테스트 대역이 없다. `testing-tdd`가 빼는 세 형태(구현에 결합, 구현을 다시 계산, 실패할 수 없음)에 해당하는 시험이 없다. `assert.equal`은 strict 모듈이라 `Object.is`로 비교하며, `-0`을 0으로 바꾸는 변이가 실제로 잡힌다. 위치 판정 도우미 `assertRejected`는 Story의 위치 판정 방법과 같다.
- CC-JS-001 ~ CC-JS-006: 두 칸 들여쓰기, 세미콜론, 큰따옴표, camelCase, PascalCase, UPPER_SNAKE_CASE, `var` 없음, 탭 없음을 검색과 읽기로 확인했다. 80칸을 넘는 줄은 시험 이름 줄 7개이고 CC-JS-002의 80칸은 권장값이다. 경계 검증은 `typeof`로 하고 진위 검사가 없다. 포매터와 린터는 설정되어 있지 않다.
- CL-GLD-001 숫자 리터럴: 제품 코드의 `0`, `1`은 시작 값, 한 칸 전진, 0과의 비교다(3단계 분류). 시험의 `308`은 이름 있는 상수의 값이고(2단계), 나머지는 사례 표의 입력과 기대 값이다(3단계). 지적 없음.
- CL-GLD-003, 004, 005, 006, 007, 010: 지적 없음. `parseExpression`과 `parseTerm`의 비슷한 반복은 독립된 동작의 비슷한 문법이다. `fail`과 `failAtCursor`로 까닭 글자가 한 곳씩만 있다.
- 도메인 용어: `docs/domain-glossary.md`가 없고 PRD, Architecture, D-1의 뜻을 쓴다. `expression`, `position`, `CalculationError`가 그 뜻과 맞다.
- Architecture 정렬: dev-2.1의 표를 코드와 문서에 다시 대조했다. 문서를 고치지 않은 결론이 맞다. Architecture에 코딩 표준 절과 Change Log 절이 없는 점은 N-7(PO1-N7)로 열려 있다.
- 계획 대비 Dev의 변경: 시험을 더한 것(`B / 0.1`, "gives one reason for every division by zero", "names the stray character when a closing parenthesis was expected")은 계획의 후보와 어긋나지 않고 시나리오를 더 세밀하게 본다.

### 위험 평가

프로젝트에 정한 위험 척도가 없어 결과의 크기와 가능성을 글로 판단했다. 가장 큰 위험은 R1이다.

| ID | 사건 | 결과 | 가능성의 근거 | 통제 | 수준 | 소유자 |
| --- | --- | --- | --- | --- | --- | --- |
| R1 | 깊은 중첩의 `RangeError`가 화면까지 올라간다 | Story 1.3의 한 줄 표시가 깨진다 | 약 3000단계의 중첩이 필요해 손으로 친 식에서는 낮다 | 다음 호출은 정상, PO1-N6 | medium | PM |
| R2 | 계획 사례와 기록의 빈자리가 남는다 | 회귀 하나를 표로 고정하지 못한다 | 빈자리 확인됨, 다른 행이 같은 동작을 잡는다 | TEST-001, TEST-002 | low | Dev |
| R3 | 미결 해석의 답이 구현 선택과 다르다 | 시험과 코드를 바꾼다 | 답이 아직 없다 | PO1-N1 ~ PO1-N5 | low | 프로젝트 소유자, PM |
| R4 | 뒤의 수정이 단항 결합이나 0 곱셈을 깨뜨린다 | 조용히 틀린 값 | 지금 코드는 맞고 수정이 있어야 드러난다 | TEST-003 | low | Dev |
| R5 | 오류 이름으로 구별하는 소비자 | 일반 `Error`로 보인다 | 현재 소비자가 없다 | MNT-001 | low | Dev |
| R6 | 복잡도를 모른 채 함수가 자란다 | 시험이 어려워진다 | 메서드가 짧다 | DEV-1 | low | 사용자 승인 뒤 설정 |

수준 집계: critical 0, high 0, medium 1, low 5.

## Code Quality Assessment

구현은 작은 공개 인터페이스(`evaluate`, `CalculationError`) 뒤에 재귀 하강 파서를 숨긴 깊은 모듈이다. 읽으면서 계산해 왼쪽부터 먼저 드러나는 문제를 알리고, 수 변환 전에 문법을 확인해 JavaScript 변환 함수의 느슨함을 막으며, 유한성을 연산마다 검사한다. 상태는 호출마다 만드는 인스턴스에만 있다. 주석은 이유와 계약만 설명한다. 결함은 찾지 못했고, 남은 것은 시험 행과 기록의 빈자리다.

## Implementation Recommendations

| 지적 | 제안 | 까닭 | 소유자 | 점검 |
| --- | --- | --- | --- | --- |
| TEST-001 | `test/engine.test.js`의 "parentheses override the default grouping"에 `8 - 3 - 2` → 3 행을 더한다. 접근은 `verification-only` | 시나리오가 이름 붙인 사례에 닿는 시험이 없다 | Dev | 오른쪽 결합 변형이 이 행에서 실패하고, 원본에서 `node --test`가 통과한다 |
| TEST-002 | 세 시험에 사후 민감도 점검을 하고 수정 단위 기록에 사후 점검으로 적는다. Completion Notes의 앞 줄은 고쳐 쓰지 않고 새 항목에서 정정한다 | 계획이 요구한 기록이 없다 | Dev | 변형별 실패한 시험 이름, `node --test` |
| TEST-003 | `8 / -2 * 3` → -12, `7 * 0` → 0 행과 오류 클래스 구별 단언을 더한다 | 비차단, 계약 안. 수정 회차에 함께 적용할 수 있다 | Dev | QA의 해당 변이 셋이 실패한다 |
| MNT-001 | 적용 여부를 정한다. 적용하지 않으면 `Treatment`로 남긴다 | 비차단, 계약이 말하지 않는 속성 | Dev | 적용하면 이름을 보는 시험 한 행 |

## Compliance Check

- Coding Standards: pass. 지적한 위반 없음.
- Project Structure: pass. 새 파일 둘이 소스 트리와 맞고 그 밖의 파일을 만들지 않았다.
- Testing Strategy: fail. TEST-001, TEST-002. 그 밖의 TDD 증거는 계획과 맞다.
- All ACs Met: pass. 제품 동작은 AC 1 ~ 4에 맞다. AC 1의 시험 범위는 TEST-001로 partial이다.

## Improvements Checklist

- [ ] TEST-001 계획 사례 `8 - 3 - 2`의 시험 행(Dev)
- [ ] TEST-002 이미 통과한 시험 셋의 닿음 확인 기록(Dev)
- [ ] TEST-003 시험 틈 세 가지의 처리 결정(Dev)
- [ ] MNT-001 오류 이름의 처리 결정(Dev)

## Security Review

신뢰할 수 없는 식을 실행하지 않는다는 기준을 1.1-INSP-001과 읽기로 확인했다. 가져오는 모듈, 입출력, 비밀, 환경 변수가 없다. 문자열이 아닌 입력은 경계에서 거부한다. 깊은 중첩은 스택 넘침이 `RangeError`로 끝나 프로세스를 죽이지 않으며 다음 호출이 정상이다. 지적 없음.

## Performance Considerations

수용된 성능 기준과 이 변경에 닿는 실행 비용 규칙이 없어 측정 기준이 없다. 항 20만 개의 합은 문제없이 끝났고, 이것은 기준 측정이 아니다. CRAP은 측정하지 않았다.

## Review Record Changes

- 새 파일: `docs/qa/gates/1.1.yml`, 이 기록 문서.
- Story: QA Results 항목을 더하고 Status를 Review에서 InProgress로 바꿨다. 다른 섹션은 바꾸지 않았다.
- 구현 수정은 없다. Dev의 일이다.

## Comment Hygiene Report

- 방법과 범위: 체크리스트 §1.1(추적 번호), §1.2(QA 접두와 이 Story에 선언된 ID: `PO1-N`, `N-`, `Q`, `DEV-1`, `F`, `D-`, `V-`, `E-`, 시나리오 ID), §1.3(기계 고유 경로), §1.4(`IN-FLIGHT`), §1.7(편집 표시와 날짜), 작업 태그, 비ASCII를 `src/engine.js`, `test/engine.test.js`에 검색했다. 모두 일치 없음(종료 상태 1). 보조 조사로 `src` 전체를 §1.1로 검색했고 일치 없음이다.
- 기준선: 두 파일은 862f5fd에 없는 새 파일이어서 기존 잔여물이 없다. `tests_directory_findings`는 0이다.
- 문맥 검토: 두 파일의 주석과 시험 이름을 모두 읽었다. 머리 주석은 한 줄 요약이다. 저작권과 SPDX 값은 프로젝트에 없고 Dev가 빠진 입력을 기록했다(CC-CMT-001, 소유자는 프로젝트 소유자). 공개 API의 JSDoc이 이유와 실패를 말한다. "Only U+0020 counts as a space"의 코드 포인트는 추적 번호가 아니다. 시험 주석과 이름이 단언과 맞다.
- 수명: 원장이 비어 있고 표시가 없다. `pending_at_review` 0, `pending_after_story_done` 0, 앞선 Story 없음.
- 화이트리스트: `commentHygiene.preservedComments`가 비어 있어 기대 0, 관찰 0.
- 적용 안 됨: 빌드 가드, 핫스팟 짝 커밋, 접근 지정자(JavaScript 새 파일, 대상 없음).
- 결정: PASS.

## Extra Reviews

없다. 오케스트레이션 스위치가 꺼져 있어 이 회차에 추가 검토자가 없다.

## 한계

- 변이는 손으로 고른 83개이고 전수가 아니다. 변이 도구와 속성 점검 도구는 설정되어 있지 않다.
- 오라클의 입력은 생성한 표본이며 모든 식을 덮지 않는다.
- 깊이 측정값은 이 기기의 기본 스택 크기와 Node.js v24.22.1의 값이다.
- Dev의 실행 순서는 저장된 출력과 파일 시각으로만 확인했다. 그 출력을 만든 실행을 다시 보지는 못한다.
- Cleaner 검토자가 실제로 쓴 모델과 Dev 세션의 effort는 확인하지 못했다.
