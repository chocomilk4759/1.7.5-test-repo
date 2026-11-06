# dev-1.1 — 처리할 수 없는 깊이를 계산 오류로 돌려줌

- Story: [bug-2](../../stories/bug/bug-2.story.md)
- Entry: Dev SubTask 1.1
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story bug-2 remote to Done` run의 역할 작업
- 시각: 2026-11-07, 시작 02:04 +0900, 첫 RED 02:09, Cleaner 위임 02:12, Cleaner 결과 02:18, 정리와 최종 점검 완료 02:19
- 입력 기준: 브랜치 `story/bug-2`, 시작 커밋 `6741bd9`(`Approved -> InProgress`), 기준선 `main`의 `9aea1916e47d8d677fd0b4c291af260fa355c0a8`. 시작 커밋은 Story와 기록 문서만 더해서 `src/`와 `test/`의 파일은 기준선과 같다. 이 SubTask가 바꾸는 파일은 `src/engine.js`, `test/engine.test.js`, `test/screen.test.js`이고 새 파일은 없다.
- 환경: Node.js v24.22.1, Windows x64, Git 2.51.0. 점검 명령은 프로젝트 루트의 `node --test`(전체), `node --test test/engine.test.js`와 `node --test test/screen.test.js`(파일별), `node ci/screen-rule.check.mjs`다. 외부 패키지와 테스트 대역은 쓰지 않았다. 포매터와 린터는 설정되어 있지 않다.

## 읽은 규칙

`.bmad-core/tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`(Dev의 규칙 종류 `operations`, `design`, `documentation`). 완료 점검(`develop-story.md` Completion 4.5)을 위해 `comments`, `crap`, `javascript-crap`도 읽었다.
- 절차 문서: `develop-story.md`, `local-story-start.md`, `local-task-done.md`, `local-story-review.md`, `data/development-quality.md`, `data/local-git-workflow.md`, `data/story-paths.md`, `data/defect-diagnosis.md`, `data/verification-ownership.md`, `data/workflow-routing.md`, `tasks/publish-story.md`, `tasks/code-comment-style.md`, `checklists/comment-hygiene-checklist.md`, `checklists/story-dod-checklist.md`, `tasks/architecture-align.md`, `tasks/execute-checklist.md`를 끝까지 읽었다.
- 조사 요건: 이 SubTask는 새 설계 결정을 하지 않았다. Story가 받은 설계(재귀 파서를 두고 `evaluate` 경계에서 스택 넘침의 `RangeError`를 번역함)는 사용자가 조사 없이 받은 것이고 이 기록도 `AGENTS.md`의 조사 요건을 채웠다고 적지 않는다. RED와 GREEN이 이 환경(Node.js v24.22.1의 기본 스택 크기)에서 스택 넘침이 `RangeError`로 옴을 관찰했다. 스택 크기를 바꾼 실행과 다른 런타임은 보지 않았다.

## 접근과 시나리오

접근은 `TDD`이고 결함 수정이므로 `testing-tdd`의 CC-TDD-005에 따라 고치기 전에 실패를 보였다. Story의 Recommended Execution Order대로 조각마다 RED → GREEN을 마쳤다. 시나리오 ID는 Story의 Testing을 그대로 쓴다. 결함의 원인은 진단이 필요 없는 사실이다. 재귀 하강 파서의 호출 깊이가 입력의 중첩을 따라 늘어 호출 스택이 넘치면 `RangeError`가 `evaluate`를 빠져나온다(`data/defect-diagnosis.md`의 1단계, 재현 입력은 첫 RED의 출력이다).

긴 입력(10만 겹)은 시험의 단언 메시지에 그대로 넣지 않고 이름표(label)로 쓴다. 기존 도우미 `assertValues`, `assertRejected`, `messageOf`, `reasonOf`와 화면 시험의 `errorLineOf`에 이름표를 받는 선택 인자를 더했다. 이름표가 없으면 이전과 같은 메시지다. 도우미를 바꾼 뒤마다, 그 도우미를 쓰는 새 시험을 더하기 전에 전체 시험이 통과함을 확인했다(녹색 기준에서의 구조 준비).

## 조각별 실행 기록

명령은 모두 프로젝트 루트의 `node --test`이다. "기준 통과"는 시험을 더한 뒤 처음 실행에서 이미 통과했다는 뜻이며 RED가 아니다.

| 조각 | 시나리오 | 시험(추가) | 처음 실행 | 구현(최소 변경) | GREEN |
| --- | --- | --- | --- | --- | --- |
| 1 | bug-2-UNIT-001 (G-1, G-2), bug-2-UNIT-006 (S-1) | 엔진 `throws a CalculationError for an expression nested too deeply`, 화면 `returns an error line instead of throwing for an expression nested too deeply` | RED: 70개 가운데 2개 실패. 엔진 시험은 `evaluate(parentheses around a number) throws a CalculationError, not RangeError: Maximum call stack size exceeded`, 화면 시험은 `renderScreen`이 던진 `RangeError: Maximum call stack size exceeded`. 출력은 7110바이트 | `evaluate`에서 `Parser`의 호출을 `try`로 감싸 `RangeError`이면 `CalculationError("expression nested too deeply")`를 던짐(위치와 원인은 아직 없음) | 두 시험 통과. 기존 시험 `throws what evaluate throws when that is not a calculation error`가 행 "an expression nested too deeply"에서 `renderScreen for an expression nested too deeply must throw`로 실패(Story가 예고한 실패). 그 행을 같은 조각에서 지운 뒤 70개 모두 통과, `node ci/screen-rule.check.mjs` 종료 상태 0 |
| 2 | bug-2-UNIT-004 (G-3, G-4, G-5) | 엔진 `names a position inside an expression that is nested too deeply`, `keeps the overflow of the call stack as the cause of the error for an expression nested too deeply`, 기존 `gives a different reason in the message for different problems`에 `C`(`1` 뒤에 0이 309개)와 `D`의 까닭을 더함 | RED: 72개 가운데 2개 실패. 위치 시험은 `message "expression nested too deeply" names none of the positions 0 to 200007`, 원인 시험은 `the cause is undefined`. G-4의 까닭 시험은 기준 통과(조각 1의 까닭이 다른 까닭과 다르다) | 메시지의 꼴 `{까닭} at position {위치}`를 함수 `calculationErrorAt` 하나에 두고 `Parser.fail`과 `evaluate`가 쓰게 함. `evaluate`는 위치 0과 `{ cause: error }`로 호출 | 72개 모두 통과, CI 규칙 종료 상태 0. 관찰: 중첩 `D`의 메시지 `expression nested too deeply at position 0`, `cause`는 `RangeError`. 다른 오류(`7 / 0`)는 `cause` 속성이 없음(`Object.hasOwn`이 false) |
| 3 | bug-2-UNIT-005 (G-6, G-7) | 엔진 `gives the same message for an expression nested too deeply on repeated calls and with more frames on the call stack`, `evaluates the next expression after one that is nested too deeply` | 기준 통과(74개 모두 통과). 조각 2의 고정 위치 0이 이미 이 동작을 낸다 | 없음 | 74/74 |
| 4 | bug-2-UNIT-002 (V-1, V-2) | 엔진 `evaluates deeply nested and very long expressions that fit` | 기준 통과(75/75). 기준선의 엔진도 이 값들을 돌려준다 | 없음 | 75/75 |
| 5 | bug-2-UNIT-003 (B-1, B-2, B-3) | 엔진 `answers an expression near the depth the recursion can hold with its value or a CalculationError` | 기준 통과(76/76) | 없음 | 76/76 |

조각 5의 시험은 처음에 안쪽과 바깥쪽 반복문에서 같은 이름의 지역 상수를 쓰는 꼴이었고, 같은 판정을 하나의 사례 목록으로 줄였다(시험 76개 통과 유지). 이것은 구조 정리이고 동작을 바꾸지 않는다.

bug-2-UNIT-007(T-1)은 새 시험이 아니라 기존 시험 `throws what evaluate throws when that is not a calculation error`의 일곱 입력(`42`, `0`, `null`, 인자 없는 호출, `["1"]`, `[]`, `[" "]`)이 맡는다. 조각 1에서 행 하나를 지운 뒤에도 이 시험은 통과했고, 아래 민감도 점검이 이 시험이 클래스를 가리지 않는 `renderScreen`을 잡음을 보인다.

## 사후 민감도 점검

기준 통과 시험이 해당 동작에 닿는지, 시나리오의 실패 기준에 적힌 틀린 구현 하나씩을 사본에 걸어 보였다. 이것은 RED가 아니라 사후(retrospective) 점검이며, 관찰하지 못한 이전의 순서를 대신하지 않는다. 변형마다 `src/`, `test/`, `package.json`을 새 폴더에 복사하고 바꾼 곳 하나(또는 둘)만 더한 뒤 그 폴더에서 `node --test`를 돌렸다. 아래 결과는 Cleaner 정리 뒤의 최종 시험 파일에 대한 것이다. 통제(바꾸지 않은 사본)는 76/76 통과했다. Cleaner 정리 전의 시험 파일로 한 첫 실행도 같은 시험이 같은 변형을 잡았다(실패한 시험의 이름이 정리 전 이름일 뿐이다).

| 변형 | 바꾼 곳 | 결과 | 닿는 시나리오 |
| --- | --- | --- | --- |
| screen-catches-every-error | `renderScreen`의 판정을 `error instanceof Error`로 바꿈(클래스를 가리지 않음) | 1개 실패: `throws what evaluate throws when that is not a calculation error` | bug-2-UNIT-007 |
| length-limit | `evaluate`가 식 길이 100000을 넘으면 거부 | 2개 실패: `evaluates deeply nested and very long expressions that fit`, 원인 시험 | bug-2-UNIT-002 |
| depth-limit | `evaluate`가 `(`나 `-`가 501개 이어지면 거부 | 2개 실패: 같은 두 시험 | bug-2-UNIT-002 |
| overflow-gives-zero | 스택이 넘치면 오류 대신 값 0을 돌려줌 | 8개 실패: 조각 1 ~ 5의 새 시험 대부분과 화면 시험 | bug-2-UNIT-003 |
| cursor-as-position | 넘친 순간의 `this.position`을 위치로 씀 | 2개 실패: `gives the same message ... with more frames on the call stack`, 화면 시험. 이 변형의 메시지는 호출 스택 200단을 더하자 위치가 바뀌었다(`at position 2714`가 `at position 2658`로, 정리 전 시험의 첫 실행에서 관찰) | bug-2-UNIT-005 |
| reason-reused | 까닭을 `number out of range`로 씀 | 1개 실패: `gives a different reason in the message for different problems` | bug-2-UNIT-004 (G-4) |
| catch-every-other-error | `RangeError` 대신 `CalculationError`가 아닌 모든 오류를 번역 | 실패 없음(76/76). 시험이 가리지 못한다 | bug-2-INSP-001의 읽기가 맡는다 |
| empty-reason | 까닭을 빈 글자로 씀 | 실패 없음(76/76). 숫자를 뺀 글자에 ` at position `이 남아 비어 있지 않음 판정을 통과한다(Cleaner 지적 F-3) | bug-2-INSP-001의 읽기가 맡는다 |

시험이 가리지 못하는 두 변형은 Story의 `coverage_gaps`("재귀 안에서 잡고 고정된 위치를 쓰는 구현과 RangeError 말고 다른 오류까지 잡는 구현은 시험으로 구별되지 않고 bug-2-INSP-001의 읽기가 본다")와 N-2("시험은 오류 메시지의 낱말과 언어를 고정하지 않음")가 예고한 틈이다. 빈 까닭도 같은 읽기가 막는다(아래 bug-2-INSP-001).

## 표 행 전달 확인

표 1 ~ 4의 모든 입력 행이 실행되는 시험에 닿는다. 시험 파일을 읽고 행의 입력과 판정을 대조했다.

| 표의 행 | 시험 |
| --- | --- |
| G-1, G-2 | 엔진 `throws a CalculationError for an expression nested too deeply`(`D`, `M`, `O`, `1 + `과 `D`, `D`와 ` + a`) |
| G-3 | 엔진 `names a position inside an expression that is nested too deeply`(`Z`) |
| G-4 | 엔진 `gives a different reason in the message for different problems`(`D`와 `C`를 포함) |
| G-5 | 엔진 `keeps the overflow of the call stack as the cause of the error for an expression nested too deeply` |
| G-6 | 엔진 `gives the same message for an expression nested too deeply on repeated calls and with more frames on the call stack`(`D`, `M`을 포함한 다섯 입력) |
| G-7 | 엔진 `evaluates the next expression after one that is nested too deeply` |
| V-1, V-2 | 엔진 `evaluates deeply nested and very long expressions that fit` |
| B-1, B-2, B-3 | 엔진 `answers an expression near the depth the recursion can hold with its value or a CalculationError` |
| S-1 | 화면 `returns an error line instead of throwing for an expression nested too deeply` |
| T-1 | 화면 `throws what evaluate throws when that is not a calculation error`(일곱 입력) |

## 선택한 해석과 구현 결정

- 잡는 곳은 `evaluate`의 본문이다. `Parser.parseAll`이 아니라 `evaluate`의 본문에 `try`를 둔 것은 구현 선택이고 PO가 두 곳 모두 "`evaluate` 경계"로 읽어도 된다고 답했다(회차 2, Q-r2-1).
- 위치는 식의 시작 0이다. 넘친 순간의 커서는 스택 상태에 달려 있어 쓰지 않는다. 이것은 구현 선택이며 수용된 위치 규칙이 아니다(N-1은 열려 있다).
- 까닭은 영어 문구 `expression nested too deeply`이고 식을 되풀이하지 않는다. 언어와 꼴은 N-2가 열려 있어 시험이 낱말을 고정하지 않는다.
- 잡는 것은 `RangeError`뿐이다. `typeof` 확인과 `TypeError`는 `try` 밖이다. 새 오류의 `cause`에 잡은 오류를 둔다.
- `src/screen.js`는 바꾸지 않았다. `error instanceof CalculationError`로 가리므로 오류 줄이 저절로 나온다.
- 시험의 방식: 판정 방법의 "값 또는 `CalculationError`"를 위해 도우미 `outcomeOf`를 두고 기존 시험 `answers other spacing with the value or a CalculationError`도 이 도우미를 쓰게 했다(같은 판정, 반복 제거). 모두 같은 모드 안의 기법 선택이며 시나리오의 기대와 실패 기준은 그대로다.
- 시험 입력의 크기는 입력을 고른 값이다(`NESTING_LEVELS`, `FITTING_LEVELS`, `LONG_SUM_TERMS`, `LONG_SPACE_RUN`, 그리고 경계 부근의 `NEAR_LIMIT_*`). 제품 코드에는 숫자 한도나 깊이를 세는 변수가 없다.

## Cleaner 결과

- 검토자: Dev 하위 세션이 직접 시작한 하위 세션. 요청 모델 별칭 `opus`, effort `high`, 이름 없음. 검토자는 자기 모델 ID와 effort의 대응을 보고하지 않았다.
- 위임 입력: 프로젝트 루트, 이 Story의 경로, SubTask 1.1, 접근 `TDD`와 시나리오 ID, 비교 기준(`9aea191`), 바뀐 경로(셋, 새 파일 없음), 시험 명령, CRAP 측정 안 함, 검토자의 작업 폴더 하나(프로젝트 임시 영역). 위임 전 작업 트리와 인덱스를 파일의 Git 해시와 인덱스 해시로 기록했고(`src/engine.js` `0e36604857b9`, `test/engine.test.js` `4c46e40c25c1`, `test/screen.test.js` `06fedf3f30bf`, 스테이지에 올린 변경 없음), 검토자가 돌아온 뒤 같은 값을 다시 얻어 위임 이후 바뀌지 않았음을 확인했다.
- 검토자가 읽은 규칙: 로더의 순서대로 Hub와 두 색인, 본문 `golden-rules`, `testing-tdd`, `coding-principles`, `comments`, `crap`, `javascript-language`, `javascript-crap`. `documentation`은 검토자의 규칙 종류에 없어 읽지 않았다. 절차 문서는 `data/development-quality.md`의 해당 섹션, `tasks/code-comment-style.md`, `checklists/comment-hygiene-checklist.md`다. `check-instructions.sh`는 종료 상태 0이다.
- 검토자가 쓴 파일: 모두 자신이 만든 것이고 Dev가 지정한 작업 폴더 안에 있다(점검 스크립트, 복사본과 변형 사본 26개 폴더, 출력 파일). 폴더 밖에 쓴 파일과 바꾼 기존 파일은 없다고 보고했고, 위임 뒤 작업 트리가 같음을 확인했다.
- 검토 범위: `src/engine.js`, `test/engine.test.js`, `test/screen.test.js`의 기준선 대비 변경과 문맥으로 읽은 `src/screen.js`. 정확성이나 수용된 요구에 닿는 지적은 없었고 검사 목록에 닿는 지적이 4건이다. `src/engine.js`는 바꿀 곳이 없었다.

| ID | 위치 | 기준 | 신뢰도 | 처분 | 까닭 |
| --- | --- | --- | --- | --- | --- |
| F-1 | 엔진 시험 `gives the same message for an expression nested too deeply on every call and whatever the call stack holds` | CC-CMT-010(이름이 단언보다 강함) | high | 받아들임 | 시험은 세 번의 연속 호출과 200단을 더한 한 번만 본다. 검토자는 스택을 거의 다 쓴 호출(601개 여백)에서 `D`가 `RangeError`로 나가는 경우를 실행으로 보였다. 이것은 열린 N-6이고 제품의 동작은 그대로이며 이름만 틀렸다. 이름을 `...on repeated calls and with more frames on the call stack`으로 바꿨다 |
| F-2 | `assertRejected`의 메시지, 같은 메시지 시험의 `messages.join`, 까닭 시험의 `reasons.join` | Story Testing의 이름표 조건 | 측정은 high, 규칙이 요구하는지는 medium | 받아들이지 않음 | 이름표가 시험이 만드는 메시지에서 입력을 지운다. 엔진 자신의 메시지에 식이 들어가는 것은 엔진이 식을 되풀이하는 결함이 있을 때뿐이고 실패 출력에만 나타난다. 그 결함은 G-3의 `Z`와 bug-2-INSP-001이 막는다. 세 곳에 길이를 자르는 도우미를 더하는 것은 시험 전용 추상화이고 계획에 없다(CL-GLD-OPS-006). 화면 시험의 `actual`/`expected` 출력은 그 도우미로 줄지도 않는다. 측정: 식을 되풀이하는 변형의 실패 출력 206,744글자(통제는 5,439글자) |
| F-3 | 까닭 시험의 단언 문구 `the message holds more than a position` | G-4, CC-CMT-010 | 변형이 살아남음은 high, 고침은 medium | 일부 받아들임 | 까닭을 빈 글자로 쓴 변형이 76/76을 통과한다(숫자를 뺀 글자에 ` at position `이 남음). 문구를 `the message holds more than numbers`로 고쳐 실제 단언에 맞췄다. 낱말을 고정하는 것은 N-2가 막고 접미사를 걷어내는 것은 구현을 되풀이하는 기계를 더한다. 이 변형은 bug-2-INSP-001의 읽기가 막는다 |
| F-4 | 위치 시험의 지역 상수 `widened` | 이름이 뜻을 말함, 중복 | medium | 받아들임 | 이름을 지우고 `parenthesized(NESTING_LEVELS, "9999999")`로 같은 꼴 반복을 없앴다. `parenthesized`는 숫자를 선택 인자로 받는다 |

Dev가 정리 중에 스스로 고친 곳(검토자의 지적이 아님): 도우미 `negatedParenthesized`의 주석이 도우미가 아니라 호출 쪽의 사정을 말해 도우미의 내용으로 고쳤다.

검토자가 확인하고 지적하지 않은 것: `evaluate`의 `try`는 재귀 밖이고 `RangeError`만 잡으며 `typeof`와 `TypeError`는 `try` 밖이다. 위치는 고정값이고 까닭은 엔진의 다른 까닭과 같은 꼴의 영어 문구이며 식을 되풀이하지 않는다. `at position`은 세 파일에서 `calculationErrorAt` 한 곳에만 있다. 깊이를 세는 변수나 숫자 한도와 길이 한도가 없고 기존 까닭과 위치 계산은 그대로다. 새 주석에 추적 ID와 규칙 ID, 편집 이력이 없고 모두 영어다. 검토자의 변형 가운데 76/76을 통과한 것은 위 표의 둘과 Story가 예고한 틈(`position-at-the-end-allowed`는 N-1, 식과 위치를 함께 담은 메시지와 재귀 안에서 잡는 변형은 bug-2-INSP-001, `screen-also-answers-range-error`는 bug-2-INSP-002)이다. 검토자는 같은 시험이 5회 반복에도 76/76 통과함을 보였다.

### 정리 뒤 재점검

받아들인 정리는 시험의 이름, 단언 문구, 한 도우미의 선택 인자, 주석이며 제품의 동작을 바꾸지 않는다. 정리 뒤 다시 돌린 것: 프로젝트 루트의 `node --test` 76개 통과, `node ci/screen-rule.check.mjs` 종료 상태 0, 위 사후 민감도 점검 전부(정리 뒤 시험 파일로 변형 사본을 새로 만들어 돌림), 주석 위생 후보 검색, bug-2-INSP-002. 정리 전 시험 파일의 결과는 위에 따로 적었다. 같은 검토자를 다시 부르지 않았다(고친 지적 가운데 높은 심각도가 없고 설계 결정을 바꾼 것이 없으며, 고친 곳은 전체 시험과 변형 점검으로 보였다).

## 최종 점검

최종 상태의 Git 해시(`git hash-object --no-filters`)는 `src/engine.js` `0e36604857b9`, `test/engine.test.js` `51193b926986`, `test/screen.test.js` `06fedf3f30bf`이다.

| 점검 | 명령 또는 방법 | 결과 |
| --- | --- | --- |
| bug-2-UNIT-001 ~ 007 | 엔진 시험 파일과 화면 시험 파일 | `node --test test/engine.test.js` 38개 통과, `node --test test/screen.test.js` 14개 통과 |
| bug-2-INT-001 | 프로젝트 루트의 `node --test`와 `node ci/screen-rule.check.mjs` | 76개 통과, 실패 0, 취소와 건너뜀 0(기준선의 68개에 새 시험 8개). CI 규칙은 종료 상태 0, 출력 없음 |
| bug-2-INSP-002 | Dev Notes "인터페이스와 파일 위치"의 "바꾸지 않음" 행의 경로 전부에 대해 기준선 `9aea1916e47d8d677fd0b4c291af260fa355c0a8`와 비교한 `git diff --quiet` | 종료 상태 0 |
| bug-2-INSP-001 | `src/engine.js`의 변경을 끝까지 읽음(Dev의 읽기와 Cleaner 검토자의 판단) | 아래 |

bug-2-INSP-001의 판단 목록과 결과. 모두 통과다.

- `evaluate`의 `@throws {CalculationError}`가 "an expression nested so deeply that the parser runs out of call stack"을 적고 그 오류가 시작 위치를 가리키며 원인이 넘침임을 적는다. `CalculationError`의 JSDoc "The message states the reason and the 0-based character position of the problem"은 새 오류에도 맞는다(위치 0은 식의 0부터 센 글자 위치다).
- 잡는 곳은 `evaluate`의 본문이고 `Parser`의 재귀 밖이다. 잡는 것은 `RangeError`(`instanceof`)뿐이고 그 밖의 오류는 그대로 다시 던진다.
- 깊이를 세는 변수, 숫자 한도, 식 길이 한도가 없다.
- `typeof` 확인과 `TypeError`는 `try` 밖에 그대로 있다. 문법, 기존 까닭 글자와 위치 계산, `Parser`의 메서드는 `fail`이 꼴을 한 곳에 두는 함수를 부르는 것 말고 바뀌지 않았다. 기존 `CalculationError`에는 `cause` 속성이 생기지 않았다.
- 새 까닭 `expression nested too deeply`는 엔진의 다른 까닭(`division by zero`, `unclosed parenthesis`, `number out of range`)과 같은 꼴의 소문자 영어 문구이고, 메시지에 식을 되풀이하지 않는다. 비어 있지 않다(변형 `empty-reason`이 시험을 통과하는 틈은 이 읽기가 막는다).
- 까닭과 위치를 잇는 꼴 `{까닭} at position {위치}`는 `calculationErrorAt` 한 곳에만 적혀 있다.

### 주석 위생(`checklists/comment-hygiene-checklist.md`)

비교 기준은 Story 시작의 기준선 HEAD `9aea191`이고 대상은 `src/engine.js`, `test/engine.test.js`, `test/screen.test.js`의 바뀐 줄이다. 추가된 줄에서 §1.1(추적 ID와 규칙 ID), §1.2(QA ID 접두사), §1.7(편집 표지와 날짜), `IN-FLIGHT`, 이 Story의 키와 시나리오 접두사(`bug-2`, `UNIT-0`, `INSP-0`)를 `grep -E`로 찾아 일치가 없었다. 추가된 줄에 ASCII가 아닌 글자는 없다. 문맥으로도 읽었다. 새 주석은 모두 영어이고 이유나 계약을 적으며(왜 위치가 식의 시작인지, 왜 이 입력의 크기가 한도가 아닌지, 왜 근처 깊이가 두 결과를 받는지), 시험 이름과 주석은 실제 단언에 맞춘다(F-1의 정정). IN-FLIGHT 표시를 만들지 않았다. §2의 비교 기준 검색은 Cleaner 검토자가 기준선의 사본 세 파일에서 돌려 일치가 없다고 보고했다.

## 한계

- CRAP: 측정하지 않음. `quality.crap.commands`가 비어 있어 측정할 명령이 없다. 통과도 차단도 아니고, 측정 제안은 항목 "[Tech-Debt] CRAP 측정 경로"가 이미 든다.
- 스택 크기를 바꾼 실행, 다른 런타임, 호출자가 스택을 거의 다 쓴 호출은 보지 않았다(N-5, N-6). 검토자가 후자를 실행으로 보였고(`D`가 스택을 거의 다 쓴 호출에서 `RangeError`로 나가는 경우), 앞선 PO의 측정(PO1-N5)과 같은 사실이어서 새 future 기록을 만들지 않았다.
- 변형 점검은 사후 점검이며, 기준 통과 조각(UNIT-005, UNIT-002, UNIT-003, UNIT-007)에는 RED가 없다. 시험이 가리지 못하는 변형 둘(`catch-every-other-error`, `empty-reason`)은 bug-2-INSP-001의 읽기가 판정했다.
- 새 오류의 위치(N-1)와 까닭의 언어(N-2)는 열려 있다. 이 SubTask의 구현 선택은 수용된 규칙이 아니다.
