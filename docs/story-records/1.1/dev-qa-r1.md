# dev-qa-r1 — QA 1회차 지적의 분석과 처리 결정

- Story: [1.1](../../stories/1.1.story.md)
- Entry: Dev `review-qa`(`tasks/apply-qa-fixes.md`)의 QA 라운드 1 분석과 결정 목록
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.1` run의 역할 작업. effort는 시스템이 숫자 30으로만 알려 주어 설정의 이름(`xhigh`)과의 대응을 확인하지 못했다
- 시각: 2026-11-06, 분석과 결정 11:05 ~ 11:06 +0900
- 입력 기준: 브랜치 `story/1.1`, HEAD `68aee70`(QA 1회차 기록 커밋), 작업 트리 깨끗, Status InProgress. 입력은 gate `docs/qa/gates/1.1.yml`(라운드 1, FAIL), Story의 QA Results, 기록 문서 qa-r1이다. 별도 평가 문서와 추가 검토는 없다(QA Results의 "Extra Reviews"가 없음을 말한다)

## 읽은 규칙과 절차

`tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`(Dev의 규칙 종류 `operations`, `design`, `documentation`). 주석 검사와 CRAP 비교를 위해 `comments`, `coding-principles`, Common `crap`, `javascript-crap`도 읽었다.
- 절차: `agents/dev.md`, `tasks/apply-qa-fixes.md`와 그 하위 작업 넷(collect, extract, implement, validate), `tasks/develop-story.md`, `tasks/local-task-done.md`, `tasks/local-story-review.md`, `tasks/review-loop.md`, `tasks/architecture-align.md`, `tasks/code-comment-style.md`, `checklists/comment-hygiene-checklist.md`, `checklists/story-dod-checklist.md`, `data/finding-classification.md`, `data/development-quality.md`, `data/defect-diagnosis.md`, `data/verification-ownership.md`, `data/future-work-planning.md`, `data/local-git-workflow.md`, `data/story-paths.md`, `data/agent-context.md`, `data/workflow-routing.md`의 임시 자료 절, `tasks/run-story.md`의 Role sessions, Rounds, Checks after each task, Stop, hold and carry on 절.

## 처리 결정의 권한

Story의 PO Validation에 저장된 실행 요청 줄(단계 `through Merged`, 사용자, 2026-11-06 09:11 +0900, `remote` 없음)과 메인 세션이 이 역할 작업에 전달한 지시가 `apply-qa-fixes.md` CP-4의 처리 결정이다. 그 범위는 현재 Required와 Recommended 지적을 수용된 범위 안에서 고치거나 근거 있는 이의로 기록하는 것이다. 요구사항이나 범위의 변경, 면제(waiver), Done은 허락하지 않는다. Optional 지적 가운데 값어치가 있고 수용된 계약 안에 드는 것은 Dev가 고르고(CP-4), 적용하지 않는 Optional과 future 지적은 future 기록과 `Treatment:` 줄로 남긴다. `contract`로 분류된 지적과 `pending`인 지적, 면제 요청은 이번 라운드에 없다.

## 결정 목록

네 지적 모두 gate의 활성 `top_issues`(라운드 1)에서 왔고 다른 출처와 겹치는 항목이 없다. 입력 4건, 결정 목록 4건이다.

| ID | QA 처분 | 심각도, 확신 | 경로와 소유자 | 증거 확인 | 처리 | 단위 |
| --- | --- | --- | --- | --- | --- | --- |
| TEST-001 | required | low, high | rework, Dev | 확인됨 | 고침 (`Treatment: TEST-001 fix`) | 3.1 |
| TEST-002 | required | low, high | rework, Dev | 확인됨 | 고침 (`Treatment: TEST-002 fix`) | 3.2 |
| TEST-003 | optional | low, high | 계약 안 | 확인됨 | Dev가 적용을 골라 고침 (`Treatment: TEST-003 fix`) | 3.1 |
| MNT-001 | optional | low, high | 계약 밖 | 확인됨 | 적용하지 않음, future 기록 (`Treatment: MNT-001 future`) | 없음 |

## 지적별 분석

### TEST-001 계획 사례 `8 - 3 - 2` → 3에 닿는 시험이 없다

- 확인: 시험 파일에서 고정 문자열 `8 - 3 - 2`를 검색해 일치가 없었다(`grep -n -F`, 종료 상태 1). Story Testing 표 1의 V-3 칸은 "`8 - (3 - 2)` → 7(`8 - 3 - 2` → 3과 다름)"이고 1.1-UNIT-001은 "V-1, V-2, V-3의 식이 표의 값과 정확히 같다"고 정한다. 현재 엔진은 이 식에 3을 돌려준다(실행: `evaluate("8 - 3 - 2")` → 3).
- 시험이 이 사례에 닿는지: 기준 `68aee70`의 시험 파일에 오른쪽 결합 변형(`+`와 `-`를 오른쪽부터 묶음, 이 식은 7)을 걸면 "operators of equal precedence are evaluated from the left"만 실패하고 "parentheses override the default grouping"은 통과한다. 이 식의 대조 값이 시험으로 고정되지 않는다는 QA의 관찰이 맞다.
- 분류: QA의 분류(3단계, 경로 rework, 소유자 Dev)에 동의한다. QA는 이 칸을 대조 설명으로만 읽는 다른 읽기를 적었는데, 한 행을 더하는 일은 요구사항이나 범위를 바꾸지 않고 시나리오가 이름 붙인 값을 고정하므로 이의를 내지 않고 고친다.
- 처리: 고침. 시험 "parentheses override the default grouping"에 행 `8 - 3 - 2` → 3을 더한다. 동작이 이미 맞으므로 접근은 `verification-only`이고, 오른쪽 결합 변형이 이 행에서 실패함을 보인다(단위 3.1). 시나리오 1.1-UNIT-001.

### TEST-002 이미 통과한 시험 셋에 닿음 확인의 기록이 없다

- 확인: dev-1.1의 조각 표는 "accepts digits with an optional fractional part"(조각 5), "divides by a number that is not zero"(조각 11), "accepts the largest finite power of ten and a quotient that underflows"(조각 12a, 당시 이름은 다름)를 기준 통과로 적었다. 같은 문서의 "민감도 점검" 표에는 이 셋의 동작을 노린 변형이 없고, 그 표 아래 문장이 RED를 본 조각만 이 점검에서 뺀다. Dev가 남긴 변형 실행 출력 전부에서 실패한 시험 이름을 찾으면 "divides by a number that is not zero"는 공백을 먼저 지우는 거친 변형에서만 실패했고 나머지 둘은 어떤 변형에서도 실패하지 않았다. Story의 Completion Notes 1.1 줄은 UNIT-003, UNIT-006, UNIT-007, UNIT-010의 일부 시험을 "기준 통과와 사후 민감도 점검으로 기록했다"고 쓰는데 이 셋에는 맞지 않는다. QA의 관찰이 맞다.
- 분류: QA의 분류(3단계, `testing-tdd`의 "If a planned test already passes"와 Recommended Execution Order, 경로 rework, 소유자 Dev)에 동의한다.
- 처리: 고침. 세 시험 각각에 요구사항에서 나온 틀린 변형을 걸어 실패하는 시험 이름을 보이고, 사후 점검(RED가 아님)으로 단위 3.2의 기록 문서에 남긴다. 앞선 서술(dev-1.1과 Completion Notes 1.1 줄)은 고쳐 쓰지 않고 단위 3.2의 Completion Notes 항목에서 정정한다. 제품과 시험 파일은 바꾸지 않는다. 접근 `verification-only`, 시나리오 1.1-UNIT-003, 1.1-UNIT-006, 1.1-UNIT-010.

### TEST-003 계획이 이름 붙이지 않은 세 변형을 시험이 잡지 못한다

- 확인: 기준 `68aee70`의 시험 파일에 세 변형을 걸어 모두 통과함을 직접 보였다. 변형 (1) 단항 마이너스가 뒤따르는 항 전체에 걸림(`8 / -2 * 3`이 -12 대신 -1.3333333333333333), (2) 곱셈의 오른쪽 피연산자가 0이면 거부(`7 * 0`이 오류), (3) `CalculationError`를 `Error`의 별칭으로 둠. 현재 엔진의 값은 `8 / -2 * 3` → -12, `7 * 0` → 0이고 `CalculationError`는 별도 클래스이며 평범한 `Error`는 그 인스턴스가 아니다(실행으로 확인).
- 계약 안인가: 세 가지 모두 AC 1(곱셈과 나눗셈을 왼쪽부터), AC 2(단항 마이너스), 1.1-UNIT-013("`Error`의 인스턴스이고 다른 클래스를 던지면 실패")이 이미 말한 동작을 더 구체적으로 보는 행과 단언이다. 새 동작이나 새 종류의 검증이 아니어서 수용된 계약 안이다(`data/finding-classification.md` 단계 7).
- 값어치: 단항 마이너스의 결합과 0을 곱하는 경우는 값이 조용히 틀리는 회귀이고, 오류 구별은 Story 1.3이 기대는 동작이다. 비용은 행 두 개와 짧은 시험 하나다. 그래서 Dev가 적용을 고른다(CP-4). 이 고름이 그 지적의 처리 결정이다.
- 처리: 고침. 행 `7 * 0` → 0은 "evaluates a single number and each of the four operations"에, 행 `8 / -2 * 3` → -12는 "accepts a unary minus before a number, a parenthesis or another minus"에 더한다. 오류 구별은 이름이 단언과 맞도록 별도 시험 "does not treat an ordinary Error as a CalculationError"로 둔다(기존 시험의 이름에 없는 단언을 덧붙이지 않기 위해서다). 접근 `verification-only`, 단위 3.1. 시나리오 1.1-UNIT-001, 1.1-UNIT-004, 1.1-UNIT-013.

### MNT-001 `CalculationError`의 `name`이 "Error"다

- 확인: 실제 엔진이 던진 오류에서 `name`은 "Error"이고 `String(error)`와 스택의 첫 줄은 "Error: division by zero at position 2"이며 `util.inspect`의 첫 줄만 "CalculationError: ..."를 보인다(실행). dev-1.1에서 Cleaner 지적 F13을 받아들이지 않은 근거 문장 가운데 "호스트는 클래스 이름을 로그에 보여 준다"는 `util.inspect` 경로에서만 맞다는 QA의 정정이 맞다. 앞선 기록은 고쳐 쓰지 않고 이 항목에서 정정한다.
- 계약 안인가: 아니다. Architecture 설계 원칙은 오류 클래스가 `Error`를 잇고 자기 모듈에서 내보낸다고만 말하고, AC 3은 메시지가 까닭과 위치를 담는다고만 말한다. `name` 속성은 수용된 문서에 없고 Story 1.3은 `message`만 쓴다. 적용하려면 계약이 침묵하는 속성과 그것을 보는 시험 행이 더 필요하므로 범위를 넓힌다(`data/finding-classification.md` 단계 7).
- 처리: 이 Story에 적용하지 않고 future 기록으로 남긴다. 기록 문장과 `Treatment: MNT-001 future` 줄은 Story의 Dev Agent Record에 있다. 이 Story가 `name`을 주지 않으므로 시험 행도 더하지 않는다.

## 수정 계획

모든 항목이 Status `InProgress`에서 진행된다(Story는 QA 1회차 기록에서 이미 InProgress). 실행 단위 번호는 수용된 계획의 Task 1~2와 앞선 기록에서 쓰지 않은 Task 3을 쓴다. 이 번호는 QA 지적 ID와 다르다.

| # | 순서 근거 | ID | QA 처분 | 사용자 결정 | 종류 | 지적 | 조치 | 참조 | 노력의 근거 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 둘 다 시험 파일 하나의 단언 보강이고 Required가 먼저 | TEST-001 | required | 실행 요청의 처리 결정 | `test_change` | 계획 사례의 시험 행 없음 | 3.1: 행 `8 - 3 - 2` → 3 추가 | `test/engine.test.js`, Testing 표 1 V-3, 1.1-UNIT-001 | 한 행 |
| 2 | 같은 파일의 같은 단위 | TEST-003 | optional | Dev가 고름(CP-4) | `test_change` | 시험이 잡지 못하는 세 변형 | 3.1: 행 둘과 시험 하나 추가 | `test/engine.test.js`, 1.1-UNIT-001, 1.1-UNIT-004, 1.1-UNIT-013 | 행 둘, 시험 하나 |
| 3 | 3.1 뒤 최종 후보의 시험 파일로 확인하고, 제품과 시험을 바꾸지 않음 | TEST-002 | required | 실행 요청의 처리 결정 | 기록(문서) | 닿음 확인의 기록 없음 | 3.2: 세 시험의 사후 민감도 점검을 기록 문서에 남기고 앞선 서술을 정정 | dev-1.1, Completion Notes 1.1 줄, 1.1-UNIT-003, 1.1-UNIT-006, 1.1-UNIT-010 | 변형 실행과 기록 |
| - | 적용하지 않음 | MNT-001 | optional | Dev가 고르지 않음 | 해당 없음 | `name`이 "Error" | future 기록 | `src/engine.js`의 `CalculationError`, dev-1.1의 Cleaner 지적 처분 | 해당 없음 |

3.1은 시험 코드를 바꾸므로 `data/development-quality.md` 섹션 Independent Cleaner review의 대상이고, 3.2는 코드를 바꾸지 않는 기록 단위여서 Dev 자신의 점검만 기록한다.

## 그 밖의 확인

- 새 요구, 범위 변경, 계획 본문(AC, Task, Testing)의 수정이 필요한 지적은 없다. 따라서 SM의 정정과 PO의 재검증은 필요하지 않다.
- 미결 결정과 면제 요청이 없어 이번 라운드에서 멈춘 항목이 없다. 같은 지적에 대한 이전 교정 시도가 없어(라운드 1) 반복 실패 계수는 0이다.
- gate 파일과 QA Results는 QA 소유이므로 바꾸지 않았다. 수정 단위의 체크박스는 QA의 RESOLVED 판정이 아니다.
- future-work 파일은 Story 브랜치에서 바꾸지 않는다. MNT-001의 future 기록은 Story의 Dev Agent Record에 두고, 병합 뒤의 PO 점검이 옮긴다.

## 한계

- 이 문서는 분석과 결정의 기록이다. 단위별 실행 증거는 dev-3.1과 dev-3.2에, Definition of Done 점검은 dev-dod-2에 있다.
- QA의 변이 83개와 독립 오라클 결과는 QA의 표본이며 Dev가 다시 돌리지 않았다. 이 문서의 확인은 위 항목에 적은 직접 실행뿐이다.
