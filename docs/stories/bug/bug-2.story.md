# Story bug-2: 아주 깊은 중첩을 계산 오류로 돌려주기

## Status

InProgress

## Story

**As a** 공업용 계산기를 쓰는 사람,

**I want** 아주 깊게 중첩된 식을 넣어도 화면이 내부 오류를 던지지 않고 다른 잘못된 식처럼 `오류:` 줄로 답하기를,

**so that** 입력한 글자 때문에 화면이 깨지지 않고, 호출자는 이 실패를 계산 오류로 다룰 수 있다.

## Scope and Dependencies

### 결과와 범위

이 Story의 결과는 처리할 수 없는 깊이로 중첩된 식의 결과가 `RangeError`에서 `CalculationError`로 바뀌는 것이다. `src/engine.js`의 `evaluate`가 이 오류를 던지고 JSDoc이 이를 적으며, `src/screen.js`를 바꾸지 않아도 `renderScreen`이 `오류:` 줄을 돌려준다. `test/engine.test.js`와 `test/screen.test.js`가 이를 확인하고, 프로젝트 루트의 `node --test`가 모두 통과하며 `node ci/screen-rule.check.mjs`가 종료 상태 0으로 끝나면 확인된다.

이 Story는 Epic에 속하지 않는 `[Bug]` 유형 Story다. 바꾸는 제품 코드는 `src/engine.js` 하나다.

범위 밖은 다음과 같다.

- `src/screen.js`, `src/number-format.js`, `src/units.js`, `test/number-format.test.js`, `test/units.test.js`, `ci/screen-rule.check.mjs`, `.github/workflows/ci.yml`은 바꾸지 않는다.
- 파서를 반복문으로 다시 쓰지 않고, 깊이나 식 길이의 숫자 한도를 두지 않는다(Dev Notes의 "설계").
- 오류 위치 규칙, 메시지의 언어와 꼴, 문자열이 아닌 입력의 오류 클래스는 정하지 않는다. 이 답들은 `docs/planning/future-work.md`의 항목 "오류 위치의 글자", "오류 메시지의 언어와 꼴", "문자열이 아닌 입력"에 `unplanned`로 남아 있다.
- `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`의 글은 바꾸지 않는다. 사용자가 이 문서들을 승인된 상태라고 했다(아래 "실행 요청의 결정").
- 병합된 Story 1.1, 1.3의 파일과 기록은 고치지 않는다. Story 1.3 Testing 표 2의 T-2와 1.3-UNIT-006은 그때의 계획으로 남고, 지금의 확인은 이 Story의 표가 맡는다.
- 다른 future-work 항목은 가져오지 않는다. 이 Story에 닿는 항목의 처리는 Dev Notes의 "참고한 기록"에 적었다.

### 출처

- 유형과 키: `[Bug]`, 키 `bug-2`, 파일 `docs/stories/bug/bug-2.story.md`, 기록 폴더 `docs/story-records/bug-2/`. `.bmad-core/data/story-paths.md` 섹션 Type Stories대로 작업 트리와 로컬, 원격 추적 브랜치(`main`, `origin/main`)의 유형 Story를 읽었다. 키는 `tech-debt-1`뿐이고 future-work 파일에 `Closed items`가 없어 다음 번호가 2다.
- 중복 확인: 열린 유형 Story가 없다. 다른 future-work 항목 가운데 이 입력을 든 항목이 없다. 이 결함을 고친 Done Story도 없어 재발이 아니다(`tech-debt-1`은 코드를 바꾸지 않은 씨앗이다).
- 원천 항목: 커밋 21a78f7의 `docs/planning/future-work.md` 항목 "아주 깊은 중첩". 이 Story의 계획 커밋이 그 항목을 지우므로 내용을 아래 "결함의 사실"에 옮겼다. 항목의 배정 줄의 값은 "[Bug] 유형 Story, docs/stories/bug/ 아래(키는 SM의 draft-standalone가 정한다) — SM — 2026-11-06"이다.
- 항목의 출처: Story 1.1 PO 검증 1회의 PO1-N6, SM N-6(`docs/story-records/1.1/po-r1.md`의 섹션 "Q6, SM N-6, PO1-N6"), Story 1.1 QA 회차 1의 넘겨받은 질문 3(`docs/story-records/1.1/qa-r1.md`), `docs/qa/gates/1.1.yml`의 `risk_summary.recommendations.monitor`. Story 1.3 PO 검증 1회의 PO1-N6, SM N-6(`docs/story-records/1.3/po-r1.md`의 섹션 "Q6, SM N-6, PO1-N6: 아주 깊은 중첩"), `docs/qa/gates/1.3.yml`의 `risk_summary.recommendations.monitor`.
- PO의 트리아지: 커밋 2c44760. 이 항목을 `[Bug]` 유형 Story로 지금 배정했다(아래 "사용자의 결정").
- 원격 트래커: 항목에 트래커 번호가 없어 적을 참조가 없다.

### 결함의 사실

아래 관찰은 앞선 기록의 측정이고 이 Draft에서 다시 재지 않았다(SM은 탐침 코드를 만들지 않는다). 환경은 Node.js v24.22.1과 그 기기의 기본 스택 크기다.

- 기대한 동작: 처리할 수 없는 깊이면 `evaluate`는 `CalculationError`를 던지고, `renderScreen`은 다른 잘못된 식처럼 `오류:` 줄을 돌려준다.
- 실제 동작: 재귀 파서의 콜 스택이 넘쳐 `evaluate`가 `RangeError`("Maximum call stack size exceeded")를 던지고, `docs/prd.md`의 Story 1.3 AC 2 "다른 오류는 그대로 던진다"에 따라 `renderScreen`도 같은 오류를 던진다. `evaluate`의 JSDoc은 이 오류를 말하지 않는다.
- 재현: 프로젝트 루트에서 `(` 100000개, `1`, `)` 100000개를 이은 글자를 `evaluate`와 `renderScreen`에 넘긴다. `test/screen.test.js`의 시험 `throws what evaluate throws when that is not a calculation error`의 행 "an expression nested too deeply"가 지금 이 결과를 받아 통과한다.
- 어긋나는 기대: 커밋 2c44760의 사용자의 말 "사용자가 입력한 글자로 화면이 `RangeError`를 그대로 던지는 것은 기대한 동작이 아닙니다.", `src/engine.js`의 `CalculationError` JSDoc "Thrown when an expression cannot be evaluated."

어느 깊이에서 넘치는지는 스택 상태에 달렸다. Story 1.1 QA 회차 1의 측정은 다음과 같다(`docs/story-records/1.1/qa-r1.md`의 섹션 "넘겨받은 질문(Dev의 메모 네 건)").

| 입력 | 새 프로세스 | 예열된 프로세스의 한계 |
| --- | --- | --- |
| 짝이 맞는 괄호 | 2000 통과, 3000부터 `RangeError` | 약 5660 |
| 닫지 않은 괄호 | 2000은 `CalculationError`, 3000부터 `RangeError` | 약 12500 |
| 단항 마이너스 | 8000 통과, 10000부터 `RangeError` | 약 15600 |

같은 기록에 따르면 `RangeError` 뒤의 호출은 정상이고, 중첩 없는 항 20만 개의 합은 계산된다.

Story 1.1과 1.3은 이 결함을 적용하지 않았다(그 입력의 점검이 계획에 없고, AC 2가 지금 엔진에서의 결과를 정해 계약 밖이었다). QA는 차단이 아닌 위험 medium으로 monitor에 두었고, 화면을 쓰는 호출자는 아직 없다. 항목의 책임 역할은 PM이었고 결과는 아래 사용자의 결정이 정했다.

### 선행 Story와 입력

Depends on: 1.1, 1.3

두 Story 모두 이 일이 바꿀 코드와 시험을 공급한다. `Source Story:` 줄이 있어서가 아니라 아래 표의 파일이 없으면 Task를 할 수 없어서 선행이다. 둘 다 `main`에 병합되어 있어 기다릴 것이 없다.

| 선행 또는 입력 | 공급하는 것 | 막는 까닭 | 확인한 근거 |
| --- | --- | --- | --- |
| Story 1.1, `docs/stories/1.1.story.md` | `src/engine.js`의 `evaluate`, `CalculationError`, `test/engine.test.js` | AC 1, 2, 3, 5가 이 코드를 고친다 | `sh .bmad-core/utils/checks/check-merge.sh status 1.1 main`의 출력 "merged 81c547c94a4e2dcbbf64e375909f3721b2933146 (the archive ref records its confirmed merge)" |
| Story 1.3, `docs/stories/1.3.story.md` | `src/screen.js`의 `renderScreen`, `test/screen.test.js` | AC 4가 이 함수의 결과이고, 시험의 행 하나가 고칠 동작을 받고 있다 | 같은 명령 `status 1.3 main`의 출력 "merged 937f21c5a4d5cc5623f90caefa08dd3e137d89f5 (the archive ref records its confirmed merge)" |
| `docs/architecture.md` | 기술 구성, 소스 트리, 설계 원칙 | 구현 제약 | `docs/architecture.md#검토-기록`의 2026-10-29 승인, 아래 "실행 요청의 결정" |
| `docs/prd.md#story-11-계산-엔진`, `docs/prd.md#story-13-계산기-화면`, `docs/planning/decisions.md`의 D-1 | 오류 메시지와 오류 줄의 수용된 글 | AC 3, 4의 근거 | `docs/prd.md#계획-검토-기록`의 2026-10-29 승인, 아래 "실행 요청의 결정" |

Story 1.2와 `tech-debt-1`은 선행이 아니다. 이 일은 `src/units.js`를 쓰지도 바꾸지도 않고, `tech-debt-1`은 코드가 없다.

### 수용된 결정

**사용자의 결정(깊은 중첩의 결과).** 결정자는 사용자이고 날짜는 2026-11-06이며(PO `*future-work`의 호출 인자), 범위는 이 항목이다. 근거는 커밋 2c44760의 메시지다.

> "이 항목은 지금 처리할 결함입니다. 사용자가 입력한 글자로 화면이 `RangeError`를 그대로 던지는 것은 기대한 동작이 아닙니다. 결과는 항목의 제안대로, 처리할 수 없는 깊이면 `CalculationError`입니다. `[Bug]` 유형 Story로 지금 배정해 주세요."

"항목의 제안"은 그 항목의 "po-r1의 제안은 숫자 한도 없이 "처리할 수 없는 깊이면 `CalculationError`"다."와 "정해지면 엔진과 JSDoc을 맞추고, 값 또는 그 결과를 받는 시험을 둔다."이다. 같은 커밋의 다음 행동은 "Story의 AC는 고쳐진 동작과 그 확인 조건을 적고, `evaluate`의 JSDoc, Testing 표 2의 T-2와 `test/screen.test.js`의 행 "an expression nested too deeply"가 지금 이 입력으로 "다른 오류는 그대로 던진다"를 확인하므로 그 확인에 쓸 다른 입력을 정하는 일을 함께 다룬다."이다. 그 입력은 Testing 표 4의 T-1이다.

**사용자의 결정(스택 넘침을 번역하는 설계의 수용).** 결정자는 사용자이고 날짜는 2026-11-07이며(PO 검증 1회의 PO1-B1을 두고 메인 세션이 물은 질문에 대한 선택), 범위는 이 Story의 이 설계다. 다른 Story나 공용 결정으로 넓히지 않고 `docs/planning/decisions.md`를 바꾸지 않는다. 받은 설계는 "재귀 파서를 그대로 두고, 스택 넘침의 `RangeError`를 `evaluate` 경계에서 잡아 `CalculationError`로 바꿈"이다. 사용자가 고른 선택지의 원문은 다음과 같다.

> "조사 없이 이 설계를 수용"

그 선택지의 설명 원문은 다음과 같다.

> "네트워크 조건은 그대로 둡니다. 조사 없이 이 설계와 그 위험을 받아들인다고 결정합니다. SM이 이 결정과 빠진 자료를 Story에 적고, Story는 조사 요건을 채웠다고 적지 않습니다. 남는 위험: 스택 크기를 바꾼 실행과 다른 런타임의 동작이 확인되지 않습니다."

이 결정은 `AGENTS.md` 섹션 Research for uncertainty and core implementation decisions의 조사 요건을 채운 것이 아니다. 이 설계에는 그 요건이 드는 참고 자료 다섯 개의 조사가 없다.

- 결정의 근거: 위 원문의 선택과, 그 질문을 낳은 PO1-B1의 절(`docs/story-records/bug-2/po-r1.md`의 섹션 "차단 지적 PO1-B1: 핵심 기술 결정의 조사가 없고 이 호출에서 얻을 수 없다")이다.
- 얻은 근거(그 절이 든 것): 같은 문서의 "계획 점검"과 "런타임 근거"의 실행, Node.js 실행 파일에 든 자체 소스 `internal/errors`의 `isStackOverflowError`, `node --v8-options`의 `--stack-size` 설명, 프로젝트 규칙 CC-JS-006과 CL-GLD-OPS-006이다. `isStackOverflowError`와 `--stack-size`의 글은 같은 구현에서 나온 자료이고, 두 규칙은 번역과 범위의 일반 규칙이어서 스택 넘침을 말하지 않는다. 어느 것도 표준이나 공식 문서를 읽은 것이 아니다.
- 빠진 자료(그 절이 든 것): ECMAScript 명세가 호출 스택의 한계를 정하는지, V8과 Node.js의 공식 문서가 스택 넘침의 오류와 복구를 어떻게 말하는지(`--stack-size`, Worker의 `resourceLimits.stackSizeMb`), 스택 넘침을 잡는 일에 대한 정착된 지침, 재귀 하강 파서의 깊이 처리에 대한 공개 구현이나 지침이다. 이 목록은 읽을 후보이고 그 내용을 이 Story가 안다고 말하지 않는다.
- 남는 위험의 자리: 위 원문의 위험은 SM Draft Checklist의 N-5와 Testing의 `coverage_gaps`가 든다.

**실행 요청의 결정.** 출처는 메인 세션이 이 역할 작업에 전달한 `*run-story bug-2 remote to Done` 요청이고, 결정자는 사용자이며, 범위는 이 호출이다.

> "`docs/prd.md`의 Epic 범위와 AC, 의존 줄, `docs/architecture.md`, 결정 기록 `docs/planning/decisions.md`는 승인된 상태입니다. `bug-2`는 future-work의 "아주 깊은 중첩" 항목을 처리하는 `[Bug]` Story입니다. 이번 호출은 이 Story의 Done과 요청까지이고 병합은 하지 않습니다."

**다른 항목의 트리아지.** 커밋 21a78f7이 사용자의 답 "드롭 없이 모두 unplanned"(2026-11-07)로 다른 항목 28개를 `unplanned`로 두었다. 이 항목들의 답은 정해지지 않았고 이 Story가 정하지 않는다.

### 미결 항목과 선행 조건

- 미결 계획 결정: N-1(새 오류의 위치가 가리키는 글자)과 N-2(새 까닭 글자의 언어) 둘이다. 답이 오면 시험과 글자가 바뀔 수 있으므로 계획 결정이다. 지금은 시험이 위치를 0부터 식 길이까지 받고 낱말을 고정하지 않아 Task의 내용과 순서, 합격 판정이 같으므로 이 Story를 막지 않는다. 두 항목은 사용자가 `unplanned`로 두었고 이 Story는 없는 결정을 만들지 않는다.
- 정해진 계획 결정: 스택 넘침을 `evaluate` 경계에서 번역하는 수단이다. 답에 따라 AC 1의 `D`, `M`의 합격 판정, 범위 밖의 "파서를 반복문으로 다시 쓰지 않고", SubTask 1.1, 표 1 ~ 3이 바뀌는 계획 결정이었고, 위 "수용된 결정"의 사용자의 결정이 이 Story에 한해 정했다. 조사 요건을 채운 결정은 아니다.
- N-3, N-4, N-6은 이 Story의 Task 내용과 순서, 합격 판정을 바꾸지 않는다. N-5는 위 수단의 결정에 기대었고, 그 결정 뒤에 남는 것은 보지 않은 실행이어서 Task 내용과 순서, 합격 판정을 바꾸지 않는다. 모두 SM Draft Checklist의 비차단 메모에 있다.
- 실행 선행 조건: Story 1.1, 1.3의 병합은 위 표대로 확인했다. 그 밖에는 Node.js 24와 이 저장소만 있으면 된다.
- 사람만 할 수 있는 입력이나 행동: 위 수단의 수용이 사용자만 할 수 있는 결정이었고 위 사용자의 결정으로 받았다. 남은 입력이나 행동은 없다.

## Acceptance Criteria

아래 AC는 원천 항목과 사용자의 결정에서 이 Story가 적은 것이다. `D`, `M`, `O`, `P(n)`은 Testing의 "입력의 정의"가 정한다. `node --test`는 프로젝트 루트에서 Node.js 24의 기본 스택 크기로 실행한다.

1. 처리할 수 없는 깊이로 중첩된 식을 받으면 `evaluate`는 `RangeError`가 아니라 `CalculationError`를 던진다. 확인 조건: `node --test`에서 `D`(`(` 100000개, `1`, `)` 100000개), `M`(`-` 100000개 뒤에 `1`), `O`(`(` 100000개 뒤에 `1`)와 그 앞뒤에 다른 글자가 있는 식을 넘겨 확인한다.

   Source: 커밋 21a78f7의 `docs/planning/future-work.md` 항목 "아주 깊은 중첩"의 "내용"과 "필요한 일", 커밋 2c44760의 사용자의 말 "처리할 수 없는 깊이면 `CalculationError`입니다."

2. 깊이의 숫자 한도는 두지 않는다. 엔진이 처리할 수 있는 깊이의 식은 값을 돌려준다. 확인 조건: `node --test`에서 깊이 1000의 괄호와 단항 마이너스, 중첩 없는 긴 식이 바른 값을 돌려주고, `P(n)`과 단항 마이너스의 경계 부근 깊이(2000 ~ 20000)에서 결과가 바른 값이거나 `CalculationError`이며 다른 값이나 다른 오류가 없다.

   Source: 같은 항목의 "숫자 한도 없이", "값 또는 그 결과를 받는 시험을 둔다", 커밋 2c44760의 "결과는 항목의 제안대로"

3. 이 `CalculationError`의 메시지는 다른 `CalculationError`처럼 까닭과 식의 0부터 센 글자 위치를 담고, 같은 식이면 호출할 때마다, 호출 스택의 깊이가 달라도 같다. 확인 조건: `node --test`에서 메시지에 0부터 식 길이까지의 위치가 있고, 까닭이 다른 문제의 까닭과 다르며, 연속 호출과 더 깊은 호출 스택에서 메시지가 같다.

   Source: `src/engine.js`의 `CalculationError` JSDoc, `docs/prd.md#story-11-계산-엔진` AC 3의 "오류 메시지는 까닭과 문제가 된 위치를 담는다", `docs/planning/decisions.md`의 D-1 "오류 위치는 식의 0부터 센 글자 위치다", `docs/architecture.md#설계-원칙`의 "공개 함수는 순수 함수로 두고". 어느 글자를 가리키는지는 정하지 않는다(N-1).

4. `renderScreen`은 AC 1의 `D`, `M`, `O`에서 던지지 않고 `오류: {메시지}` 한 줄을 돌려준다. `{메시지}`는 같은 식에서 `evaluate`가 던진 `CalculationError`의 `message`다. 확인 조건: `node --test`에서 줄이 그 글자와 같고 줄바꿈 글자가 없다.

   Source: 커밋 2c44760의 사용자의 말 "사용자가 입력한 글자로 화면이 `RangeError`를 그대로 던지는 것은 기대한 동작이 아닙니다.", `docs/prd.md#story-13-계산기-화면` AC 2

5. `evaluate`의 JSDoc이 처리할 수 없는 깊이의 결과를 적는다. 확인 조건: `src/engine.js`의 `evaluate` JSDoc을 읽어 `@throws {CalculationError}`에 이 경우가 있음을 확인한다.

   Source: 같은 항목의 "`evaluate`의 JSDoc도 이 오류를 말하지 않는다", "엔진과 JSDoc을 맞추고"

회귀와 호환 기준은 다음과 같다. AC가 아니며 Task와 Testing이 덮는다.

- `renderScreen`의 "다른 오류는 그대로 던진다"는 그대로다. 출처는 `docs/prd.md#story-13-계산기-화면` AC 2다. 확인 입력은 문자열이 아닌 입력 `42`, `0`, `null`, 인자 없는 호출, `["1"]`, `[]`, `[" "]`이고, 판정은 지금과 같이 `evaluate`와 `constructor`, `message`가 같은지 본다. 이 판정은 클래스 이름을 고정하지 않는다.
- 문자열이 아닌 입력에 대한 `evaluate`의 동작은 바꾸지 않는다. 출처는 위 범위 밖의 항목 "문자열이 아닌 입력"이다.
- 기존 시험은 행 "an expression nested too deeply"를 빼고 모두 통과하고, `node ci/screen-rule.check.mjs`가 종료 상태 0이다. 출처는 `.github/workflows/ci.yml`이다. 그 행을 지우는 것은 사용자의 결정이 바꾼 기대이고 시험을 약하게 하는 일이 아니다.

## Tasks / Subtasks

- [ ] Task 1: 처리할 수 없는 깊이의 결과 고치기 (AC: #1, #2, #3, #4, #5, 그리고 회귀와 호환 기준)
  - 접근: `TDD`, 결함 수정이므로 CC-TDD-005에 따라 고치기 전에 실패를 보인다. Testing의 Recommended Execution Order대로 조각마다 RED → GREEN을 마치고, 마지막 GREEN 뒤에 Independent Cleaner review, 받아들인 정리, 영향받은 재점검을 같은 SubTask 안에서 끝낸 다음 커밋한다.
  - [ ] 1.1 `evaluate`가 처리할 수 없는 깊이에서 `CalculationError`를 던지게 하고 JSDoc을 맞추며, `test/engine.test.js`에 표 1, 2, 3의 행을, `test/screen.test.js`에 표 4의 S-1을 더하고 행 "an expression nested too deeply"를 지운다. 시나리오: bug-2-UNIT-001 ~ bug-2-UNIT-007, bug-2-INT-001, bug-2-INSP-001, bug-2-INSP-002. 완료 점검: 프로젝트 루트의 `node --test` 전부 통과, `node ci/screen-rule.check.mjs` 종료 상태 0. 커밋 제목: `[story-bug-2] Task 1.1: 처리할 수 없는 깊이를 계산 오류로 돌려줌`
- [ ] Task 2: Architecture 정렬 (의무 출처: `.bmad-core/tasks/architecture-align.md`, `docs/architecture.md`)
  - 접근: `verification-only`. 제품과 시험의 동작을 바꾸지 않는다. 대조에서 코드 위반이 나오면 코드를 고치고 영향받은 점검을 다시 돌린다.
  - [ ] 2.1 누적 변경을 `docs/architecture.md`의 기술 구성, 소스 트리, 설계 원칙, `README.md`와 대조하고, 고칠 문서가 없으면 검토 범위와 까닭을 no-change로 기록한다. 시나리오: bug-2-INSP-003. 커밋 제목: `[story-bug-2] Task 2.1: Architecture 정렬`

## Dev Notes

### 이전 Story

Story 1.1(병합 커밋 81c547c)과 Story 1.3(병합 커밋 937f21c)의 기록에서 이 Story에 쓸 내용은 다음과 같다.

- 엔진의 꼴: `src/engine.js`의 `Parser`는 재귀 하강 파서이고 호출마다 새로 만든다. 오류는 `Parser.fail`이 `{까닭} at position {위치}` 꼴로 던진다. `test/engine.test.js`는 공개 심볼만 부르고 같은 파일의 도우미 `assertRejected`, `messageOf`, `reasonOf`로 입력 표를 돈다. 후보가 `null`이면 0부터 식 길이까지의 위치를 받는다.
- Story 1.1 PO1-N8: 식의 작은 수가 위치 후보 안에 들면 위치 없이 식만 되풀이한 메시지가 통과한다. 그래서 위치를 보는 행은 수가 식 길이보다 큰 입력 `Z`를 쓴다.
- Story 1.1 QA TEST-001, TEST-002: 표의 행에 닿는 전달 시험이 없거나, 앞 조각으로 이미 통과한 시험의 확인 기록이 없으면 Required가 되었다. Recommended Execution Order 3번이 할 일을 정한다.
- Story 1.1 QA DOC-001과 Story 1.3 QA DOC-001: Dev 기록의 문장이 저장된 출력과 달랐다. 기록은 실제 출력과 대조해 적고, 모든 입력을 말하는 문장에는 잰 범위를 함께 적는다.
- Story 1.3 Cleaner F-1, F-6: 같은 숫자를 두 번 적었고(`NESTING_LEVELS`로 고침) 시험 이름이 단언보다 강했다. 새 시험의 이름과 주석은 실제 단언에 맞춘다.
- Story 1.3 PO1-N10: 같은 클래스와 메시지로 새 오류를 던지는 구현은 시험이 가리지 못한다. `src/screen.js`의 `throw error;`는 이 Story에서 바뀌지 않으므로 bug-2-INSP-002가 그 파일을 지킨다.
- Story 1.3 PO1-N11, PO2-N1: `git diff`를 시험 행에 넣은 수준 분류와, 비교 목록이 일부 파일을 덮지 않은 점이 지적되었다. 그래서 bug-2-INSP-002를 inspection 행으로 따로 두고 바꾸지 않는 파일을 모두 든다.

### 설계

재귀 파서를 그대로 두고, 스택이 넘친 결과를 공개 함수의 경계에서 `CalculationError`로 바꾼다. 사용자가 이 설계와 그 위험을 조사 없이 받았다(Scope and Dependencies의 "수용된 결정"). 이 선택의 까닭은 다음과 같고, 이 저장소의 관찰과 앞선 기록에 기대며 외부 자료의 근거는 없다.

- 숫자 깊이 한도는 사용자의 결정이 받은 제안의 "숫자 한도 없이"와 맞지 않고, 지금 값을 돌려주는 식(새 프로세스의 괄호 깊이 2000)을 거부할 위험이 있다.
- 반복문으로 다시 쓰는 일은 Architecture가 요구하지 않고 파서 전체를 바꾸며 이 결함에 비해 넓다(CL-GLD-OPS-006).
- `src/screen.js`에서 잡으면 `evaluate`가 여전히 `RangeError`를 던져 AC 1에 어긋난다.

구현의 조건은 다음과 같다.

- 잡는 곳은 `evaluate`의 경계, 곧 `Parser`의 재귀 밖이다(`evaluate`의 본문이나 `evaluate`만 부르는 `Parser.parseAll`). 재귀 안에서 잡으면 스택이 아직 차 있어 새 오류를 만들다가 다시 넘칠 수 있다. 다시 넘친 오류는 바깥 층의 `catch`가 받아 끝내 `CalculationError`가 되므로, 고정된 위치를 쓰는 그 구현은 결과로 구별되지 않아 표의 시험이 가리지 못한다(PO 검증 1회의 사본이 표를 통과했다). 잡는 곳은 bug-2-INSP-001이 읽어 본다.
- 잡는 것은 `RangeError`뿐이다. `src/engine.js`를 읽은 결과 `Parser`가 스스로 던지는 곳은 `fail` 하나이고 `RangeError`를 낼 다른 호출이 없다(`slice`, `Number`). 그 밖의 오류는 그대로 지나가야 한다(CC-JS-006). 새 `CalculationError`의 `cause`에 잡은 오류를 둔다(`class CalculationError extends Error {}`는 `Error`의 옵션을 그대로 받는다).
- `typeof` 확인과 `TypeError`는 `try` 밖에 그대로 둔다.
- 위치는 스택 상태에 따라 달라지지 않는 값을 쓴다. 넘친 순간의 `this.position`은 쓸 수 없다. 앞선 측정처럼 넘치는 깊이가 프로세스의 예열 상태에 달렸고, 호출 스택이 깊어지면 더 앞에서 넘치므로 같은 식의 메시지가 달라진다(뒤의 것은 실행하지 않은 추론이고 bug-2-UNIT-005의 변형이 확인한다). 그러면 `renderScreen`의 줄이 시험 안의 `evaluate` 메시지와도, 앞선 호출의 줄과도 달라진다. 가장 단순한 값은 식의 시작 0이다. 이것은 구현 선택이고 수용된 위치 규칙이 아니다(N-1).
- 까닭 글자는 엔진의 다른 까닭처럼 영어 낱말로 쓰고 다른 까닭과 다르게 한다. 시험은 낱말을 고정하지 않는다(N-2). 메시지에 식을 되풀이하지 않는다.
- 기존 까닭 글자와 위치 계산은 바꾸지 않는다. `test/screen.test.js`의 시험 `returns a line longer than the display whole`의 길이 단언이 `unexpected end of expression`과 위치 1000에 기댄다.
- 까닭과 위치를 잇는 꼴 `{까닭} at position {위치}`를 두 곳에 적지 않는다.

`src/screen.js`는 바꾸지 않는다. `error instanceof CalculationError`로 가리므로 엔진이 고쳐지면 오류 줄이 저절로 나오고, `@throws {Error} Whatever evaluate throws other than a CalculationError.`도 그대로 맞다. `renderScreen`이 문자열로 받은 입력에서 스택 넘침으로 던지는 길은 AC의 머리가 정한 실행(Node.js 24의 기본 스택 크기)에서 이 수정으로 없어진다. 호출자가 스택을 거의 다 쓴 호출은 이 Story의 입력이 아니다(N-6). 스택 넘침이 아닌 길은 이 Story가 다루지 않는다. 길이 `2 ** 29 - 24`의 글자에서는 `try` 밖의 글자 잇기가 `RangeError: Invalid string length`를 던진다(PO 검증 1회의 측정, Windows x64의 Node.js v24.22.1). `formatNumber`의 `RangeError`는 `evaluate`가 유한한 값만 돌려주므로 닿지 않는다.

`docs/prd.md`의 Story 1.3 AC 2 둘째 문장 "다른 오류는 그대로 던진다"의 확인 입력은 표 4의 T-1이다. 글자 입력은 더 이상 닿지 않고, `evaluate`를 대역으로 바꾸는 일은 시스템 경계가 아니어서 `testing-tdd`가 제외한다. T-1의 일곱 입력은 지금 시험에 이미 있고, 클래스를 가리지 않고 받는 구현은 이 행들에서도 실패한다(아래 "현재 시험에 관한 주장").

호환과 위험: `evaluate`의 인자와 값은 그대로이고, 바뀌는 것은 이 입력에서 던지는 오류의 클래스다. 이 저장소에서 `evaluate`를 부르는 제품 코드는 `src/screen.js`뿐이다. 주된 위험은 잡는 범위가 넓어 다른 오류를 계산 오류로 가리는 것이고, `RangeError`만 잡는 조건과 bug-2-UNIT-007, bug-2-INSP-001이 막는다. 되돌리기는 이 Story의 squash 커밋을 되돌리는 것이고 자료나 저장 형식의 변경이 없다.

### 인터페이스와 파일 위치

| 경로 또는 심볼 | 변경 | 내용 | 출처 |
| --- | --- | --- | --- |
| `evaluate(expression)`, `src/engine.js` | 동작과 JSDoc 변경 | 인자와 값은 그대로. 처리할 수 없는 깊이에서 `CalculationError`, `cause`에 잡은 오류 | AC 1, 2, 3, 5 |
| `CalculationError`, `src/engine.js` | 바꾸지 않음 | JSDoc "The message states the reason and the 0-based character position"이 새 오류에도 맞아야 한다 | AC 3 |
| `test/engine.test.js` | 시험 추가 | 표 1, 2, 3. 기존 시험 `gives a different reason in the message for different problems`에 `D`와 `C`를 더할 수 있다 | Testing |
| `test/screen.test.js` | 시험 변경 | 표 4의 S-1 추가, 행 "an expression nested too deeply" 삭제. 시험 이름 `throws what evaluate throws when that is not a calculation error`는 다른 future-work 항목이 들므로 유지한다. 상수 `NESTING_LEVELS`, `NESTED_TOO_DEEP`은 S-1이 쓴다 | Testing |
| `src/screen.js`, `src/number-format.js`, `src/units.js`, `test/number-format.test.js`, `test/units.test.js`, `ci/screen-rule.check.mjs`, `.github/workflows/ci.yml`, `README.md`, `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`, `docs/planning/future-work.md`, `docs/stories/1.1.story.md`, `docs/stories/1.3.story.md`, `docs/story-records/1.1/`, `docs/story-records/1.3/`, `docs/qa/gates/1.1.yml`, `docs/qa/gates/1.3.yml`, `package.json` | 바꾸지 않음 | bug-2-INSP-002가 본다 | "결과와 범위" |

등록할 곳은 없다. 새 파일이 없고 `node --test`는 `test/` 아래 시험 파일을 스스로 찾는다. 버전도 바꾸지 않는다. `package.json`의 버전은 0.1.0이지만 설정에 프로젝트 버전 키가 없고 `git.taskCommitPattern`에 `{project_version}`이 없으며 버전 정책 문서도 없다. 제목에 ASCII 글자와 숫자가 없어 구현 브랜치는 `git.branchPattern`과 `.bmad-core/data/story-paths.md` 섹션 Slug대로 `story/bug-2`이고, squash 커밋의 범주는 `[Bug 2]`다.

### 기술 제약

프로젝트 구조는 `docs/architecture.md#소스-트리`와 충돌하지 않는다. 새 경로와 새 내보내기가 없다.

Architecture에서 온 제약은 다음과 같다.

- 언어와 실행 환경은 ES 모듈과 Node.js 24다. 내장 모듈만 쓰고 외부 패키지는 쓰지 않는다. 시험은 `node:test`와 `node:assert/strict`다(`docs/architecture.md#기술-구성`).
- 공개 함수는 순수 함수로 두고 입출력이나 전역 상태를 쓰지 않는다. 오류 클래스는 `Error`를 잇고 자기 모듈에서 내보낸다. `src/screen.js`는 `src/engine.js`와 `src/number-format.js`만 가져다 쓴다(`docs/architecture.md#설계-원칙`).

스택 넘침이 `RangeError`로 온다는 것은 Node.js v24.22.1의 관찰이고 다른 런타임은 확인하지 않았으며 외부 자료를 조사하지 않았다(N-5). 사용자가 이 상태로 설계와 그 위험을 받았고(Scope and Dependencies의 "수용된 결정"), 조사 요건을 채운 것은 아니다. Dev의 RED와 GREEN이 이 환경에서 그 관찰을 다시 확인한다.

경계 부근의 깊이는 같은 식도 스택 상태에 따라 값이거나 깊이 오류일 수 있고, 닫지 않은 괄호처럼 다른 문제가 있는 식은 깊이 오류이거나 그 문제의 오류일 수 있다(N-4). PO 검증 1회가 Story의 설계대로 고친 사본에서 잰 `O(3000)`은 새 프로세스의 첫 호출에서 깊이 오류이고, 앞선 호출로 예열된 프로세스에서 `unclosed parenthesis at position 2999`다. 표 3이 이 결과들을 받는다. AC 3의 "같은 식이면 호출할 때마다, 호출 스택의 깊이가 달라도 같다"는 스택이 넘쳐 던지는 이 `CalculationError`의 메시지끼리 같다는 뜻이고, 넘치지 않은 호출의 값이나 다른 오류까지 같다는 뜻이 아니다. 호출자가 스택을 거의 다 쓴 상태의 호출은 이 Story의 입력이 아니다(N-6).

프로젝트 규칙의 적용은 다음과 같다.

- 코드 형식은 CC-JS-001, CC-JS-002를 따른다. 포매터와 린터는 설정되어 있지 않다(`testing.lintCommands`가 비어 있고 `package.json`에 도구가 없다). 오류 처리는 CC-JS-006을 따른다.
- 새 주석은 영어로 쓰고, 왜 `RangeError`를 잡는지처럼 코드만으로 드러나지 않는 까닭을 적는다(CC-CMT-009). 시험 이름과 주석은 시험이 실제로 닿고 단언하는 것을 말해야 하고(CC-CMT-010), 이름은 담은 것을 말해야 한다(`.bmad-core/data/development-quality.md`의 Cleaner 점검 목록). 파일은 UTF-8로 저장한다. Story, Task, AC, 시나리오, 표의 행, 결정의 번호는 코드, 주석, 시험 이름, 오류 메시지에 넣지 않는다(CC-CMT-018, CL-GLD-OPS-001). AC와 케이스의 대응은 Testing과 기록 문서에 둔다. IN-FLIGHT 표시는 만들지 않는다.
- 주석 위생의 비교 기준은 Story 시작의 기준선 HEAD이고, 대상은 `src/engine.js`, `test/engine.test.js`, `test/screen.test.js`의 바뀐 줄이다. 문맥 검토는 `.bmad-core/checklists/comment-hygiene-checklist.md` §3을 따른다. 바뀌지 않은 줄의 기존 내용은 대상이 아니다.
- 새 파일이 없어 머리글을 새로 쓸 일이 없다.
- CRAP은 `quality.crap.commands`가 비어 있어 `src/engine.js`를 측정할 명령이 없다. Dev와 QA는 `.bmad-core/data/development-quality.md` 섹션 CRAP check대로 측정하지 않음으로 기록한다. 측정 제안은 항목 "[Tech-Debt] CRAP 측정 경로"가 이미 들고 있어 새로 하지 않는다.
- 실행 비용: 설치된 JavaScript 규칙에 이 변경에 닿는 실행 비용 규칙이 없고, 수용된 요구사항에 성능 기준이 없다. 성능 측정은 계획하지 않는다.
- 임시 자료는 프로젝트 임시 파일 정책(CL-GLD-OPS-008)을 따른다. Done까지 필요한 근거를 보존하고, 지우는 일은 병합이 확인된 뒤에 이 Story의 일회용 자료에만 한다.

참고한 기록은 다음과 같다.

- 결정 D-1의 "오류 위치는 식의 0부터 센 글자 위치다"와 "계산 중의 값이 유한한 수가 아니게 되면 `CalculationError`다"는 영향 범위가 Story 1.1이고, 이 Story는 앞의 글을 AC 3의 세는 법으로 쓴다. D-2는 닿지 않는다.
- `docs/planning/future-work.md`(커밋 21a78f7)는 `##` 항목 38개이고 `unplanned` 37개, 이 항목 하나가 `undecided`와 배정 줄이다. 이 Story는 이 항목만 지운다. 닿는 항목의 처리는 다음과 같다.
  - "오류 위치의 글자": 정하지 않는다. 새 오류의 위치도 그 미결의 한 사례다(N-1).
  - "오류 메시지의 언어와 꼴": 정하지 않는다. 기존 까닭 글자를 바꾸지 않고 새 까닭은 같은 꼴로 둔다(N-2).
  - "문자열이 아닌 입력": 정하지 않는다. T-1은 클래스를 고정하지 않는다(N-3).
  - "[Tech-Debt] CalculationError의 name": 정하지 않는다. `name`을 바꾸지 않는다.
  - "[Tech-Debt] CRAP 측정 경로": 위 규칙대로다.
  - "[Tech-Debt] 새 파일의 저작권과 SPDX 값": 새 파일이 없어 닿지 않는다.
  - "CI 규칙이 계획 문서에 없음": `SCREEN_WIDTH`와 폭을 바꾸지 않는다. `node ci/screen-rule.check.mjs`는 요청의 CI가 돌리므로 회귀 점검으로 둔다.
  - `[Tech-Debt] 재발:`로 시작하는 항목: 그 완료 조건을 채우지 않는다. 앞선 지적만 위 "이전 Story"와 프로젝트 규칙의 적용에 적었다.
  - 나머지 항목은 Story 1.1, 1.2, 1.3의 글, 단위 변환, 뒤 Epic에 관한 것이어서 닿지 않는다.
- `workflow.researchLocation`의 `docs/research`와 `domainGlossary`의 `docs/domain-glossary.md`는 없다. 용어는 PRD, Architecture의 뜻을 쓴다. 새 용어 제안은 없다.
- 문서 대조 대상은 `docs/architecture.md`와 `README.md`다. `README.md`는 저장소 설명과 시험 명령뿐이고 `src/`에 내장 도움말은 없다. `docs/architecture.md`에 Change Log 절이 없으므로, 2.1에서 고칠 문서가 나오면 고치지 말고 Architect에게 보고한다(future-work 항목 "CI 규칙이 계획 문서에 없음").

### Convention Sections

```yaml
convention-sections: [documentation, golden-rules, testing-tdd, javascript-language]
review-sections: [coding-principles, comments, crap, javascript-crap]
auto-detected-keywords: [JavaScript, module, ESM, testing, SubTask, regression, comment, CRAP]
```

### Testing

시험 파일은 `test/engine.test.js`와 `test/screen.test.js`이고, 프레임워크는 `node:test`와 `node:assert/strict`다. 필수 점검 명령은 둘이다. 프로젝트 루트의 `node --test`는 `test/` 아래 시험 파일을 모두 실행하고, `node ci/screen-rule.check.mjs`는 `SCREEN_WIDTH`를 본다. 다른 넓은 실행은 필수로 두지 않는다. 시험 대역은 쓰지 않는다. `evaluate`는 이 프로젝트의 모듈이어서 시스템 경계가 아니다. 시험 이름과 주석은 기존 시험 파일처럼 영어로 쓴다. 긴 입력을 실패 메시지에 그대로 넣으면 출력이 20만 글자가 되므로 이름표를 쓴다(`test/screen.test.js`의 `label`처럼). 기존 도우미 `assertValues`, `assertRejected`, `messageOf`, `errorLineOf`, `assertLines`는 식을 메시지에 그대로 넣으므로, 긴 입력에는 그대로 쓰지 않고 이름표를 받는 인자를 더하거나 같은 판정을 이름표로 적는다. 판정은 아래 "판정 방법"과 같다. PO 검증 1회의 측정에서 고치기 전의 엔진에 `errorLineOf(D)`를 넣은 시험 하나의 `node --test` 출력은 201024바이트였다.

Draft 때 관찰한 사실(커밋 21a78f7, Node.js v24.22.1): `node --test`는 68개 통과했고 `node ci/screen-rule.check.mjs`는 종료 상태 0이다. Dev는 시작할 때 다시 확인하고 기록한다. 아래는 계획이며 실행 결과가 아니다.

#### Test Design

##### Test Strategy Overview

- Total: 11 | Unit: 7 | Integration: 1 | E2E: 0 | Inspection: 3
- Priority: P0: 3, P1: 7, P2: 1, P3: 0
- Execution: automated: 9 | agent-review: 2 | user-only: 0

##### 입력의 정의

- `P(n)`: `(` n개, `1`, `)` n개. 값은 1이다.
- `M(n)`: `-` n개 뒤에 `1`. n이 짝수이면 값은 1이다.
- `O(n)`: `(` n개 뒤에 `1`. 닫지 않아 값이 없다.
- `A(n)`: `-(` n개, `1`, `)` n개. n이 짝수이면 값은 1이다.
- `D`는 `P(100000)`, `M`은 `M(100000)`, `O`는 `O(100000)`이다. `D`는 원천 항목과 Story 1.3의 재현 입력이다.
- `Z`: `(` 100000개, `9999999`, `)` 100000개. 길이가 200007이어서 식의 수가 식 길이보다 크다.
- `F`: `1` 뒤에 ` + 1`이 199999번. 값은 200000이다.
- `S`: `1`, U+0020 100000개, `+ 2`. 값은 3이다.
- `B`: 1 뒤에 0이 308개 오는 수 글자(`test/engine.test.js`의 `LARGEST_POWER_OF_TEN`).
- `C`: 1 뒤에 0이 309개 오는 수 글자(`test/engine.test.js`의 `OVERFLOW_POWER_OF_TEN`). 유한한 수가 아니어서 `CalculationError`다.

100000과 1000은 입력을 고른 값이지 제품 코드의 한도가 아니다. 100000은 앞선 측정의 한계(예열된 프로세스에서 약 15600까지)보다 훨씬 크다. 1000은 새 프로세스에서 통과한다고 잰 깊이(괄호 2000, 단항 마이너스 8000)보다 작다.

##### 판정 방법

- `CalculationError`: `instanceof`로 본다. 클래스 이름 글자나 `name`으로 보지 않는다.
- 값: `assert.equal`로 표의 값과 정확히 비교한다.
- 값 또는 `CalculationError`: 기존 시험 `answers other spacing with the value or a CalculationError`의 꼴로, 결과가 표의 값이거나 `CalculationError`의 인스턴스이면 통과이고 다른 값이나 다른 오류이면 실패다.
- 위치: 기존 도우미 `assertRejected(expression, null)`의 판정으로, 메시지의 수 가운데 0부터 식 길이까지의 위치가 있으면 통과다. 어느 글자인지 고정하지 않는다.
- 까닭: 기존 도우미 `reasonOf`로 메시지에서 수를 뺀 글자를 비교한다. 낱말과 언어를 시험에 적지 않는다.
- 오류 줄: 기존 도우미 `errorLineOf`의 판정으로, `오류: `에 같은 입력을 시험 안에서 `evaluate`에 넣어 받은 `CalculationError`의 `message`를 붙인 글자와 같아야 한다.
- 같은 오류: `renderScreen`이 던진 오류가 같은 입력의 `evaluate`가 던진 오류와 `constructor`와 `message`가 같고, `CalculationError`의 인스턴스가 아니다.

##### 표 1: 처리할 수 없는 깊이

| 규칙 | 출처 | 입력 → 기대 | 시나리오 |
| --- | --- | --- | --- |
| G-1 재현 입력 | AC 1 | `D`, `M`, `O` → `CalculationError` | bug-2-UNIT-001 |
| G-2 앞뒤에 다른 글자가 있는 식 | AC 1 | `1 + ` 뒤에 `D`, `D` 뒤에 ` + a` → `CalculationError`. 둘째 식에서 어느 문제를 말할지는 고정하지 않는다 | bug-2-UNIT-001 |
| G-3 메시지의 위치 | AC 3 | `Z` → 메시지에 0부터 200007까지의 위치가 있다 | bug-2-UNIT-004 |
| G-4 메시지의 까닭 | AC 3 | `D`의 까닭이 빈 글자가 아니고 `7 / 0`, `(7`, `7 $`, 빈 식, `1 / (B * 10)`, `C`의 까닭과 모두 다르다 | bug-2-UNIT-004 |
| G-5 원인 보존 | CC-JS-006 | `D`의 오류의 `cause`가 `RangeError`의 인스턴스다 | bug-2-UNIT-004 |
| G-6 같은 메시지 | AC 3 | `D`, `M`을 각각 연속 세 번 호출하고 시험 안의 재귀로 호출 스택을 200단 쌓아 한 번 더 호출하면 메시지가 모두 같다 | bug-2-UNIT-005 |
| G-7 다음 호출 | 원천 항목의 "다음 호출은 정상이다" | `D`의 오류 뒤 `1 + 2` → 3 | bug-2-UNIT-005 |

##### 표 2: 처리할 수 있는 식

| 규칙 | 출처 | 입력 → 기대 | 시나리오 |
| --- | --- | --- | --- |
| V-1 깊이 1000 | AC 2 | `P(1000)` → 1, `M(1000)` → 1, `A(500)` → 1 | bug-2-UNIT-002 |
| V-2 중첩 없는 긴 식 | AC 2 | `F` → 200000, `S` → 3 | bug-2-UNIT-002 |

##### 표 3: 결과를 하나로 고정하지 않는 입력

수용된 숫자 한도가 없어 어느 깊이부터 처리할 수 없는지는 스택 상태에 달렸다. 그래서 경계 부근은 두 결과를 받는다. n은 2000부터 20000까지 1000씩이며 앞선 측정의 한계들을 사이에 둔다. B-3은 클래스만 본다. `O(n)`의 메시지는 경계 부근에서 깊이 오류와 닫지 않은 괄호의 오류 사이에서 달라질 수 있고, 이 표는 그것을 실패로 보지 않는다(N-4).

| 규칙 | 입력 | 받는 결과 | 실패 | 시나리오 |
| --- | --- | --- | --- | --- |
| B-1 짝이 맞는 괄호 | `P(n)` | 1 또는 `CalculationError` | 다른 값, 다른 오류 | bug-2-UNIT-003 |
| B-2 단항 마이너스 | `M(n)` | 1 또는 `CalculationError` | 다른 값, 다른 오류 | bug-2-UNIT-003 |
| B-3 닫지 않은 괄호 | `O(n)` | `CalculationError` | 값, 다른 오류 | bug-2-UNIT-003 |

##### 표 4: 화면

| 규칙 | 출처 | 입력 → 기대 | 시나리오 |
| --- | --- | --- | --- |
| S-1 처리할 수 없는 깊이 | AC 4 | `D`, `M`, `O` → 던지지 않고 "판정 방법"의 오류 줄, CR과 LF 없음 | bug-2-UNIT-006 |
| T-1 문자열이 아닌 입력 | 회귀 기준, `docs/prd.md#story-13-계산기-화면` AC 2 | `42`, `0`, `null`, 인자를 아예 뺀 호출, `["1"]`, `[]`, `[" "]` → "판정 방법"의 같은 오류 | bug-2-UNIT-007 |

Story 1.3의 표 2에서 T-2였던 `D`는 S-1로 옮겼다. T-1에는 입력을 더하지 않는다.

##### 현재 시험에 관한 주장

기준은 커밋 21a78f7의 `test/engine.test.js`, `test/screen.test.js`, `src/engine.js`, `src/screen.js`이고 네 파일을 끝까지 읽었다. SM은 탐침 코드를 만들지 않으므로 아래 판정은 술어를 따라간 것이고 실행하지 않았다. 실행은 Dev의 RED와 민감도 점검이다. 실행해 본 것은 `node --test`의 기준 통과뿐이다.

| 주장 | 읽은 단언과 추적 | 확인하지 않은 범위 |
| --- | --- | --- |
| 지금 시험은 엔진의 깊은 입력을 보지 않는다 | `test/engine.test.js`에서 중첩이 가장 깊은 입력은 괄호 두 겹(`((42))`, `((1 + 2) * (3 + 4))`, `((7)`)과 단항 마이너스 세 개(`---3`)다. 새 행이 필요하다 | 없음 |
| 행 "an expression nested too deeply"는 수정 뒤 실패한다 | `thrownBy(() => evaluate(...args))`는 `CalculationError`를 받고, `thrownBy(() => renderScreen(...args))`는 줄이 돌아와 `assert.fail`("must throw")에 닿는다. 그 행을 같은 SubTask에서 지운다 | 실행하지 않았다 |
| 그 행을 지워도 T-1이 클래스를 가리지 않는 `renderScreen`을 잡는다 | 그 구현에서 `renderScreen(42)`는 `오류:` 줄을 돌려주고 `thrownBy`가 `assert.fail`에 닿는다. 1.3-UNIT-006의 "`D`가 이것을 잡는다"는 T-1에도 해당한다 | 실행하지 않았다. `RangeError`만 더 받는 변형은 글자 입력으로 닿지 않아 시험이 못 가리고 bug-2-INSP-002가 지킨다 |
| 엔진의 시험 `throws an Error for input that is not a string`은 번역이 넓어진 구현을 못 가린다 | `assert.throws(call, Error)`여서 `TypeError`가 `CalculationError`로 바뀌어도 통과한다. 그런 구현은 `renderScreen(42)`가 줄을 돌려주어 T-1에서 실패하고 bug-2-INSP-001의 읽기에도 걸린다 | 실행하지 않았다 |

##### Test Scenarios by Acceptance Criteria

마지막 열의 "테스트 결과"는 `node --test`에 나온 해당 시험의 결과를 뜻한다.

###### AC1: 처리할 수 없는 깊이의 오류 클래스

| ID | AC / Task | Level | Priority | Execution | Seam | Test and failure criterion | Prerequisites / evidence / execution basis |
| --- | --- | --- | --- | --- | --- | --- | --- |
| bug-2-UNIT-001 | AC 1 / 1.1 | unit | P0 | automated | `evaluate`, `src/engine.js` | G-1, G-2의 입력이 `CalculationError`를 던진다. 정상 경로는 bug-2-UNIT-002가 본다. 실패: `RangeError`가 그대로 나가거나, 값을 돌려주거나, 다른 오류를 던진다 | 없음 / 테스트 결과 / `instanceof` 단언 |

###### AC2: 처리할 수 있는 깊이의 값

| ID | AC / Task | Level | Priority | Execution | Seam | Test and failure criterion | Prerequisites / evidence / execution basis |
| --- | --- | --- | --- | --- | --- | --- | --- |
| bug-2-UNIT-002 | AC 2 / 1.1 | unit | P1 | automated | `evaluate`, `src/engine.js` | V-1, V-2의 값이 표와 같다. 실패: 깊이 1000 아래의 숫자 한도나 식 길이 한도로 거부하거나, 번역이 값을 바꾼다 | 없음 / 테스트 결과 / `assert.equal` |
| bug-2-UNIT-003 | AC 1, AC 2 / 1.1 | unit | P1 | automated | `evaluate`, `src/engine.js` | 표 3의 입력이 받는 결과 안에 든다. 넘치는 자리가 깊이마다 달라도 결과가 같은 갈래인지 본다. 실패: 어느 한 깊이에서 `RangeError`가 나가거나, 틀린 값이 나온다(넘치면 오류 대신 값 0을 돌려주는 구현). 재귀 안에서 잡고 고정된 위치를 쓰는 구현은 결과로 구별되지 않아 이 시험이 아니라 bug-2-INSP-001이 잡는다 | 없음 / 테스트 결과 / `assert` 비교 |

###### AC3: 메시지

| ID | AC / Task | Level | Priority | Execution | Seam | Test and failure criterion | Prerequisites / evidence / execution basis |
| --- | --- | --- | --- | --- | --- | --- | --- |
| bug-2-UNIT-004 | AC 3, CC-JS-006 / 1.1 | unit | P1 | automated | `evaluate`, `src/engine.js` | G-3, G-4, G-5가 성립한다. 실패: 메시지에 위치가 없거나 식 길이 밖이거나, 식만 되풀이해 `Z`의 수만 있거나, 다른 문제의 까닭을 다시 쓰거나, 원인을 버린다 | 없음 / 테스트 결과 / `assert` 비교 |
| bug-2-UNIT-005 | AC 3, 원천 항목 / 1.1 | unit | P1 | automated | `evaluate`, `src/engine.js` | G-6, G-7이 성립한다. 실패: 넘친 순간의 커서를 위치로 써서 호출 스택이나 예열 상태에 따라 메시지가 달라지거나, 오류 뒤 호출이 틀린다 | 없음 / 테스트 결과 / `assert.equal` |

###### AC4: 화면의 오류 줄

| ID | AC / Task | Level | Priority | Execution | Seam | Test and failure criterion | Prerequisites / evidence / execution basis |
| --- | --- | --- | --- | --- | --- | --- | --- |
| bug-2-UNIT-006 | AC 4 / 1.1 | unit | P0 | automated | `renderScreen`, `src/screen.js` | S-1의 입력이 "판정 방법"의 오류 줄을 돌려준다. 실패: `RangeError`가 나가거나, 줄이 같은 입력의 `evaluate` 메시지와 다르거나, 줄바꿈 글자가 든다 | 없음 / 테스트 결과 / `assert.equal` 글자 비교 |

###### AC5: JSDoc과 설계의 조건

| ID | AC / Task | Level | Priority | Execution | Seam | Test and failure criterion | Prerequisites / evidence / execution basis |
| --- | --- | --- | --- | --- | --- | --- | --- |
| bug-2-INSP-001 | AC 5, AC 2, Dev Notes "설계" / 1.1 | inspection | P1 | agent-review | 해당 없음 | `src/engine.js`의 변경을 끝까지 읽어 판단한다. `evaluate`의 `@throws {CalculationError}`에 이 경우가 있고 `CalculationError` JSDoc이 새 오류에도 맞는가, 잡는 곳이 재귀 밖이고 잡는 것이 `RangeError`뿐인가, 깊이를 세는 변수나 숫자 한도, 식 길이 한도가 없는가, `typeof` 확인과 `TypeError`, 문법, 기존 까닭 글자와 위치 계산이 그대로인가, 까닭이 엔진의 다른 까닭과 같은 꼴의 영어 낱말이고 메시지에 식을 되풀이하지 않는가. 실패: 하나라도 어긋난다 | 없음 / SubTask 기록 문서의 검토 결과 / 글의 정확함, 한도의 부재, 시험이 고정하지 않는 까닭 글자의 꼴은 코드의 뜻을 읽어야 판단할 수 있다 |

###### 회귀 기준

| ID | AC / Task | Level | Priority | Execution | Seam | Test and failure criterion | Prerequisites / evidence / execution basis |
| --- | --- | --- | --- | --- | --- | --- | --- |
| bug-2-UNIT-007 | 회귀 기준 / 1.1 | unit | P0 | automated | `renderScreen`, `src/screen.js` | T-1의 입력에서 "판정 방법"의 같은 오류를 던진다. 시험 이름은 그대로 둔다. 실패: 오류 줄이나 빈 글자, 값 줄을 돌려주거나 다른 오류를 던진다 | 없음 / 테스트 결과 / 시험의 `constructor`, `message` 비교 |
| bug-2-INT-001 | 회귀 기준 / 1.1 | integration | P1 | automated | `node --test`가 실행하는 시험 파일의 공개 함수, `ci/screen-rule.check.mjs`가 가져오는 `SCREEN_WIDTH` | 프로젝트 루트의 `node --test`가 실패 없이 끝나고, `node ci/screen-rule.check.mjs`가 종료 상태 0이다. 실패: 시험이 하나라도 실패하거나 종료 상태가 0이 아니다 | 없음 / 명령의 출력과 종료 상태 / 시험과 점검 스크립트가 판정 |
| bug-2-INSP-002 | "결과와 범위" / 1.1 | inspection | P1 | automated | 해당 없음 | Story 시작의 기준선 HEAD와 비교한 `git diff --quiet`가 Dev Notes "인터페이스와 파일 위치"의 "바꾸지 않음" 행 경로에서 종료 상태 0이다. 실패: 그 밖의 종료 상태 | 기준선 HEAD / 명령과 종료 상태 / `git diff`가 판정 |
| bug-2-INSP-003 | `.bmad-core/tasks/architecture-align.md` / 2.1 | inspection | P2 | agent-review | 해당 없음 | 누적 변경을 `docs/architecture.md`의 기술 구성, 소스 트리, 설계 원칙, `README.md`와 대조한다. 실패: 문서와 코드가 어긋나는데 기록이나 수정, 보고가 없거나, 위반을 규칙 수정으로 덮는다 | 없음 / 기록 문서의 검토 범위와 결론 / 설계 부합은 판단이 필요하다 |

##### 추적

| 수용된 내용 | SubTask | 시나리오 |
| --- | --- | --- |
| AC 1의 오류 클래스 | 1.1 | bug-2-UNIT-001, bug-2-UNIT-003 |
| AC 2의 숫자 한도 없음과 값 | 1.1 | bug-2-UNIT-002, bug-2-UNIT-003, bug-2-INSP-001 |
| AC 3의 까닭, 위치, 같은 메시지 | 1.1 | bug-2-UNIT-004, bug-2-UNIT-005 |
| AC 4의 오류 줄 | 1.1 | bug-2-UNIT-006 |
| AC 5의 JSDoc | 1.1 | bug-2-INSP-001 |
| "다른 오류는 그대로 던진다"와 문자열이 아닌 입력 | 1.1 | bug-2-UNIT-007, bug-2-INSP-001 |
| 기존 시험과 CI 규칙 | 1.1 | bug-2-INT-001 |
| 바꾸지 않는 파일 | 1.1 | bug-2-INSP-002 |
| Dev Notes "설계"의 구현 조건. 까닭과 위치를 잇는 꼴을 두 곳에 적지 않는 조건은 SubTask 1.1의 Independent Cleaner review가 본다 | 1.1 | bug-2-UNIT-003, bug-2-UNIT-004, bug-2-UNIT-005, bug-2-INSP-001 |
| 사용자의 결정: 재귀 파서를 두고 스택 넘침을 `evaluate` 경계에서 번역함 | 1.1 | bug-2-UNIT-001, bug-2-UNIT-003, bug-2-INSP-001 |
| Architecture 정렬 | 2.1 | bug-2-INSP-003 |

##### User-only Actions

없다. 모든 시나리오를 에이전트가 실행한다.

##### Risk Coverage

위험 프로필 문서는 없다. Draft에서 본 주요 오동작과 이를 잡는 시나리오는 다음과 같다.

| 오동작 | 시나리오 |
| --- | --- |
| 입력한 글자로 `RangeError`가 나간다 | bug-2-UNIT-001, bug-2-UNIT-003, bug-2-UNIT-006 |
| 숫자 한도나 길이 한도로 처리할 수 있는 식을 거부한다 | bug-2-UNIT-002, bug-2-INSP-001 |
| 스택이 넘쳐 던지는 오류의 메시지가 호출마다 달라 화면의 줄이 흔들린다 | bug-2-UNIT-005, bug-2-UNIT-006 |
| 번역이 넓어 다른 오류를 계산 오류로 가린다 | bug-2-UNIT-007, bug-2-INSP-001 |
| 까닭이나 위치가 없는 메시지가 나간다 | bug-2-UNIT-004 |
| 메시지에 식을 되풀이해 오류 줄이 20만 글자를 넘는다 | bug-2-INSP-001 |
| 기존 동작이 깨진다 | bug-2-INT-001, bug-2-INSP-002 |

경계 부근의 같은 식이 값, 깊이 오류, 다른 오류 사이에서 달라지는 것은 위의 오동작이 아니다. 표 3과 `coverage_gaps`가 든다(N-4).

##### Recommended Execution Order

1. 첫 조각은 P0인 bug-2-UNIT-001과 bug-2-UNIT-006이다. 두 시험을 더하고 엔진을 바꾸기 전에 실행해, `RangeError`를 받아 실패함을 기록한다(RED, CC-TDD-005). 엔진을 최소로 고치면 두 시험은 통과하고 행 "an expression nested too deeply"가 "must throw"로 실패한다. 이 실패는 예상된 것이고 같은 조각에서 그 행을 지워 `node --test` 전체를 통과시킨다(GREEN). 이어서 P0인 bug-2-UNIT-007을 확인한다.
2. 다음은 P1인 bug-2-UNIT-004, bug-2-UNIT-005, bug-2-UNIT-002, bug-2-UNIT-003을 이 순서로 하나씩 RED → GREEN으로 마친다.
3. 앞 조각의 구현으로 이미 통과하는 시험은 RED가 아니다. 그 시나리오의 실패 기준에 적힌 틀린 변형 하나를 사본에 걸어 실패함을 보이고 `testing-tdd`대로 민감도 점검으로 기록한다. 예상되는 대상은 bug-2-UNIT-007(클래스를 가리지 않는 `renderScreen`), bug-2-UNIT-002(깊이 한도와 길이 한도), bug-2-UNIT-003(넘치면 오류 대신 값 0을 돌려주는 구현), bug-2-UNIT-005(넘친 순간의 커서를 위치로 쓰는 구현)다. 표 1 ~ 4의 모든 행이 전달되는 시험에 닿음을 기록한다.
4. JSDoc을 맞추고 Independent Cleaner review와 받아들인 정리를 마친 뒤 bug-2-INSP-001, bug-2-INSP-002, bug-2-INT-001을 확인하고 SubTask 1.1을 커밋한다.
5. SubTask 2.1에서 bug-2-INSP-003을 실행한다.

##### 속성 점검과 변이 점검

`testing.propertyCommands`와 `testing.mutationCommands`가 비어 있고, Architecture가 외부 패키지를 금지하며, 설치된 도구도 없다. 그래서 두 점검의 도구는 계획하지 않는다. 시험의 민감도는 각 조각의 RED와 Recommended Execution Order 3번의 변형이 보인다. 표 3의 여러 깊이는 넘치는 자리가 달라지는 경우를 고르는 입력 표이고 속성 점검이 아니다.

#### 실행 맵

```yaml
test_design:
  scenarios_total: 11
  by_level: { unit: 7, integration: 1, e2e: 0, inspection: 3 }
  by_priority: { p0: 3, p1: 7, p2: 1, p3: 0 }
  execution:
    bug-2-UNIT-001: automated
    bug-2-UNIT-002: automated
    bug-2-UNIT-003: automated
    bug-2-UNIT-004: automated
    bug-2-UNIT-005: automated
    bug-2-UNIT-006: automated
    bug-2-UNIT-007: automated
    bug-2-INT-001: automated
    bug-2-INSP-001: agent-review
    bug-2-INSP-002: automated
    bug-2-INSP-003: agent-review
  by_execution: { automated: 9, agent_review: 2, user_only: 0 }
  user_only: {}
  coverage_gaps:
    - "경계 부근 깊이의 결과를 하나로 고정하지 않음: 표 3 (N-4)"
    - "경계 부근 O(n)의 메시지가 깊이 오류와 닫지 않은 괄호의 오류 사이에서 달라지는 것을 보지 않음: B-3은 클래스만 본다 (N-4)"
    - "새 오류의 위치가 가리키는 글자를 고정하지 않음 (N-1)"
    - "시험은 오류 메시지의 낱말과 언어를 고정하지 않음. 영어 낱말과 식을 되풀이하지 않는 조건은 bug-2-INSP-001의 읽기가 본다 (N-2)"
    - "T-1의 오류 클래스는 고정하지 않음 (N-3)"
    - "숫자 한도의 부재는 시험이 깊이 1000까지 보고 그 위는 bug-2-INSP-001의 읽기가 본다"
    - "재귀 안에서 잡고 고정된 위치를 쓰는 구현과 RangeError 말고 다른 오류까지 잡는 구현은 시험으로 구별되지 않고 bug-2-INSP-001의 읽기가 본다"
    - "Node.js 24의 기본 스택 크기 밖의 실행과 다른 런타임은 보지 않음. 사용자가 이 위험을 받음 (N-5)"
    - "호출자가 스택을 거의 다 쓴 상태의 호출은 보지 않음 (N-6)"
```

## SM Draft Checklist

### 1회, 2026-11-07

- 결과: READY. PO 검증을 받을 준비가 되었다는 뜻이며, PO 검증이나 Approved가 아니고 개발을 허락하지 않는다.
- 검토자: SM 하위 세션(Bob, `claude-opus-5-5`), `*run-story bug-2 remote to Done` run의 역할 작업.
- 범위: Story 전체. 기준은 `main` 21a78f7이고, Story와 기록 문서는 커밋하지 않은 초안이다. 입력은 그 커밋의 `docs/planning/future-work.md` 항목 "아주 깊은 중첩", 커밋 2c44760과 21a78f7의 메시지, `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`, 병합된 Story 1.1, 1.3의 파일과 기록, `src/engine.js`, `src/screen.js`, `test/engine.test.js`, `test/screen.test.js`다.
- 범주 결과: Project policy PASS, 1 PASS, 2 PASS, 3 PASS, 4 PASS, 4.5 PASS, 5 PASS.
- 적용한 PO 비차단 지적과 이의 제기: 없다(첫 초안).
- 차단 지적: 없다.
- 비차단 메모(각 항목의 제안은 메인 세션에 질문으로 보고했다):
  - N-1 새 오류의 위치가 가리키는 글자: 시험은 0부터 식 길이까지 받고 호출마다 같음만 요구한다. 어느 글자인지는 항목 "오류 위치의 글자"의 미결에 든다. 구현이 고른 값은 수용된 결정이 아니다. 소유자: 프로젝트 소유자.
  - N-2 새 까닭 글자의 언어: 엔진의 다른 까닭처럼 영어 낱말로 두고 시험은 낱말을 고정하지 않는다. 항목 "오류 메시지의 언어와 꼴"의 답을 따른다. 소유자: PM.
  - N-3 "다른 오류는 그대로 던진다"의 확인 입력: 이 Story 뒤로 `docs/prd.md`의 Story 1.3 AC 2 둘째 문장에 닿는 입력은 문자열이 아닌 입력뿐이다. 항목 "문자열이 아닌 입력"의 답이 `CalculationError`이면 닿는 입력이 없어지고 그 시험이 사라진다. 그 답을 정할 때 함께 본다. 소유자: PM.
  - N-4 경계 부근의 결과: 숫자 한도가 없어 같은 식이 스택 상태에 따라 값이거나 `CalculationError`일 수 있다. `docs/architecture.md#설계-원칙`의 "순수 함수"는 이 경우를 말하지 않는다. 표 3이 둘을 받아 합격 판정이 같다. 소유자: Architect.
  - N-5 스택 넘침의 모습: 이 설계는 Node.js 24에서 스택 넘침이 `RangeError`로 온다는 관찰에 기댄다. 다른 런타임과 스택 크기를 바꾼 실행은 보지 않았다. `docs/architecture.md#기술-구성`이 실행 환경을 Node.js 24로 정해 이 Story를 막지 않는다. 소유자: Architect.
  - N-6 호출자가 스택을 거의 다 쓴 상태의 호출: 새 오류를 만들 자리도 없으면 `RangeError`가 나갈 수 있다. 원인이 입력한 글자가 아니라 호출자의 스택이어서 이 Story의 입력이 아니고 시험하지 않는다. 소유자: Architect.
- 기록: [sm-1](../../story-records/bug-2/sm-1.md)

### 2회, 2026-11-07

- 결과: READY. PO 재검증을 받을 준비가 되었다는 뜻이며, PO 검증이나 Approved가 아니고 개발을 허락하지 않는다.
- 검토자: SM 하위 세션(Bob, `claude-opus-5-5`), `*run-story bug-2 remote to Done` run의 역할 작업.
- 범위: PO 검증 1회 뒤의 수정이다. Story 전체를 다시 읽었고, 사용자의 답과 PO1-B2, PO1-N7 ~ PO1-N12에 따른 수정과 그 영향을 판정했다. 기준은 `main` 9aea191이고 Story와 기록 문서는 커밋하지 않은 초안이다. AC, 범위, Task 구조, 시나리오의 ID와 합계, 설계는 바꾸지 않았다. 1회에서 이어 쓴 근거와 그 비교는 기록 문서에 있다.
- 범주 결과: Project policy PASS, 1 PASS, 2 PASS, 3 PASS, 4 PASS, 4.5 PASS, 5 PASS. 범주 3의 PASS는 조사 요건을 채웠다는 뜻이 아니다. 사용자가 조사 없이 설계를 받았고 Story가 그렇게 적는다.
- 차단 지적의 처리:
  - PO1-B1(`pending`, 사용자): 사용자의 답 "조사 없이 이 설계를 수용"을 Scope and Dependencies의 "수용된 결정"에 그 글, 근거, 결정자, 범위와 함께 적고 빠진 자료를 옮겼으며, "N-3 ~ N-6은 ..."과 "사람만 할 수 있는 입력이나 행동: 없다"를 고쳤다. 다음 PO 회차가 확인한다.
  - PO1-B2(`rework`, SM): bug-2-INSP-001의 판단 목록에 "까닭이 엔진의 다른 까닭과 같은 꼴의 영어 낱말이고 메시지에 식을 되풀이하지 않는가"를 더했다. 다음 PO 회차가 확인한다.
- 적용한 PO 비차단 지적: PO1-N7, PO1-N8, PO1-N9, PO1-N10, PO1-N11, PO1-N12.
- 적용하지 않은 PO 비차단 지적: PO1-N1 ~ PO1-N6. 계약 밖이고 PO Validation에 남으며, 이 수정은 그 답을 정하지 않는다.
- 이의 제기: 없다.
- 새 차단 지적: 없다.
- 비차단 메모(1회의 메모를 이어 쓰고, 달라진 것만 적는다):
  - N-1: 1회와 같다.
  - N-2: 1회와 같다. 지금 엔진의 꼴을 따르는지는 bug-2-INSP-001이 읽고, 시험은 낱말을 고정하지 않는다.
  - N-3: 1회와 같다.
  - N-4: 1회의 글에 더한다. 닫지 않은 괄호처럼 다른 문제가 있는 식은 경계 부근에서 깊이 오류와 그 문제의 오류 사이에서 달라질 수 있다. 표 3이 받아 합격 판정은 같다. 소유자: Architect.
  - N-5: 수단의 결정은 사용자가 이 Story에 한해 받았다. 남는 것은 다른 런타임과 스택 크기를 바꾼 실행을 보지 않은 것이고 사용자가 이 위험을 받았다. 수용 문서에 적을지는 소유자 Architect의 일이고 PO1-N5가 든다.
  - N-6: 1회와 같다.
- 기록: [sm-2](../../story-records/bug-2/sm-2.md)

## Change Log

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 2026-11-07 | 0.1 | Story 초안 작성 | SM (Bob) |
| 2026-11-07 | 0.2 | PO 검증 1회 반영: 사용자의 설계 수용 기록(PO1-B1), bug-2-INSP-001의 목록 보강(PO1-B2), PO1-N7 ~ PO1-N12 적용 | SM (Bob) |

## PO Validation

### 1회, 2026-11-07

- 판정: NO-GO. 전체 검토이고 모든 필수 점검을 끝냈으나 차단 지적 PO1-B1, PO1-B2가 열려 있다.
- 검토자: PO 하위 세션(Sarah, `claude-opus-5-5`, effort `max`), `*run-story bug-2 remote to Done` run의 역할 작업. 이 Story를 쓰지 않았고, SM의 점검이 아닌 실제 LLM 검토이며 추가 검토자는 없다. 시각: 2026-11-07, 읽은 Story의 사본 저장 01:12 +0900, 기록 작성 01:24 +0900 이후.
- 범위와 입력: Story 전체, 이 Story의 첫 회차의 full review. 기준은 `main` 9aea191이고 Story와 기록 문서는 커밋하지 않은 초안이다. 검토한 계획 내용은 이 항목을 더하기 전의 Story(`git hash-object --no-filters` 값 `120703ae723a`)와 `sm-1`(`429da3e39109`)이다. 부모는 커밋 21a78f7의 `docs/planning/future-work.md` 항목 "아주 깊은 중첩"과 커밋 2c44760의 사용자의 결정이고, `docs/prd.md#story-11-계산-엔진`, `docs/prd.md#story-13-계산기-화면`, 설계 `docs/architecture.md`, 결정 `docs/planning/decisions.md`는 21a78f7과 같다.
- 범주 요약: Project policy PASS, 1 PASS, 2 PASS, 3 FAIL(PO1-B1), 4 PASS, 4.5 PASS, 5 FAIL(PO1-B2). 앞선 회차에서 이어 쓴 결과는 없다.
- 차단 지적:
  - PO1-B1 핵심 기술 결정의 조사가 없고 이 호출에서 얻을 수 없다(SM N-5, Q5). 기준: `AGENTS.md` 섹션 Research for uncertainty and core implementation decisions의 "at least five distinct references"와 항목 6 "Hold work dependent on that decision", `.bmad-core/tasks/research-decision.md` step 2, step 7, 답에 따라 Task와 합격 판정이 바뀌는 계획 결정(`.bmad-core/data/story-slicing.md`). 결정은 Dev Notes "설계"의 "스택이 넘친 결과를 공개 함수의 경계에서 `CalculationError`로 바꾼다"이고, Story의 글은 "외부 자료를 조사하지 않았다(N-5)"이며, 실행 요청의 네트워크 조건으로 자료를 읽을 수 없다. 요건을 채웠다고 말하지 않는다. 얻은 근거와 빠진 자료는 기록 문서의 이 지적 절에 있다. 잡히는 일: 이 결정의 확정, Draft에서 Approved로의 전환, Story 시작, SubTask 1.1, 2.1, QA, Done, 요청. 잡히지 않는 일: PO1-B2의 수정과 계약 안 비차단 지적의 적용. 경로 `pending`, 소유자 사용자. 필요한 것: 이 결정의 조사에 외부 자료 읽기를 허용하거나(PO의 권고), 조사 없이 이 설계와 그 위험을 받아들인다는 사용자의 결정. 답이 오면 SM이 그 결과를 Scope and Dependencies와 Dev Notes에 적고 "N-3 ~ N-6은 ... 바꾸지 않는다", "사람만 할 수 있는 입력이나 행동: 없다"를 고치며, PO가 영향 범위를 다시 검증한다.
  - PO1-B2 설계의 구현 조건 둘에 닿는 점검이 없다. 기준: `.bmad-core/tasks/test-design.md` 섹션 5 "Trace each required behavior, decision rule and output declared in the Story, including Dev Notes, back to its responsible SubTask and to a check". 조건은 Dev Notes "설계"의 "영어 낱말로 쓰고"와 "메시지에 식을 되풀이하지 않는다"이고, 표 "추적"은 이를 bug-2-UNIT-003, 004, 005, bug-2-INSP-001에 대지만 bug-2-INSP-001의 목록에 없다. 식과 위치를 함께 담은 메시지와 한국어 까닭을 쓴 사본이 기존 시험과 표의 행 81개를 모두 통과했다. 경로 `rework`, 소유자 SM. 필요한 수정: bug-2-INSP-001의 목록에 "까닭이 엔진의 다른 까닭과 같은 꼴의 영어 낱말이고 메시지에 식을 되풀이하지 않는가"를 더한다. 시험이 낱말을 고정하지 않는 결정은 그대로다.
- SM 이의 제기, 분류 변경, 늦은 지적, 미완료 점검: 없다.
- 메인 세션이 넘긴 질문 Q1 ~ Q6과 SM 메모 N-1 ~ N-6: 직접 확인했다. Q5의 수단은 PO1-B1로 막는다. Q4는 받아들인다: "순수 함수"의 구체적인 글 "입출력이나 전역 상태를 쓰지 않는다"가 지켜지고, 사용자가 받은 항목의 "값 또는 그 결과를 받는 시험을 둔다"가 경계의 경우를 말한다. Q6의 두 해석은 수용된 출처가 뒷받침한다: "같은 식의 메시지"는 Architecture의 "순수 함수"와 AC 4의 판정에서, "`D`는 값이 아니라 `CalculationError`"는 지금 엔진의 실행 사실과 사용자의 말, CL-GLD-OPS-006에서 온다. 나머지는 막는 것이 없다. 근거는 기록 문서에 있다.
- 비차단 지적(Story는 아직 적용하지 않았고, 어느 것도 다음 단계를 막지 않는다):
  - PO1-N1 새 오류의 위치가 가리키는 글자(SM N-1, Q1). 출처: AC 3, G-3, Dev Notes "가장 단순한 값은 식의 시작 0", `docs/planning/future-work.md`의 "오류 위치의 글자". 값어치: 위치 규칙을 정할 때 이 오류도 함께 정한다. `1 + D`에서 0은 `1`을 가리킨다. 계약 밖(새 결정 필요, 소유자는 프로젝트 소유자). 시점: 그 항목의 트리아지. 병합 뒤 점검에서 그 항목에 합친다.
  - PO1-N2 새 까닭 글자의 언어(SM N-2, Q2). 출처: Dev Notes "영어 낱말로 쓰고", `docs/planning/future-work.md`의 "오류 메시지의 언어와 꼴". 값어치: 화면에 영어 까닭이 하나 더 늘어나는 것을 그 항목의 답에 담는다. 계약 밖(소유자는 PM). 시점: 그 항목의 트리아지. 병합 뒤 점검에서 그 항목에 합친다.
  - PO1-N3 "다른 오류는 그대로 던진다"에 닿는 입력(SM N-3, Q3). 출처: `docs/prd.md`의 Story 1.3 AC 2, 표 4의 T-1, `docs/planning/future-work.md`의 "문자열이 아닌 입력". 값어치: 그 항목의 답이 `CalculationError`이면 시험으로 닿는 입력이 없어지고 T-1이 사라지는 것을 답할 때 함께 본다. 계약 밖(소유자는 PM). 시점: 그 항목의 트리아지. 병합 뒤 점검에서 그 항목에 합친다.
  - PO1-N4 경계 부근의 결과와 설계 원칙(SM N-4, Q4). 출처: `docs/architecture.md#설계-원칙`, 표 3, 잰 사실 `P(3000)`이 같은 프로세스에서 오류 뒤 값. 값어치: AC 3의 출처인 "순수 함수"와 표 3이 함께 서는 까닭을 수용 문서에 적는다. 계약 밖(소유자는 Architect). 시점: 병합 뒤 점검에서 새 항목으로 옮긴다.
  - PO1-N5 스택 크기를 바꾼 실행과 호출자가 스택을 거의 다 쓴 호출(SM N-5, N-6, Q5). 출처: AC의 머리 "Node.js 24의 기본 스택 크기", Dev Notes의 N-6 문장, 잰 사실(스택 64MB의 Worker에서 `D`가 값 1, 스택을 거의 다 쓴 호출에서 `D`의 `RangeError` 2번, `1 + 2`의 깊이 오류 4번). 값어치: 짧은 식이 깊이 오류로 번역되는 경우까지 N-6에 적고 까닭 글자를 정한다. 계약 밖(소유자는 Architect). 시점: PO1-B1의 조사에서 함께 보고, 남으면 병합 뒤 점검에서 새 항목으로 옮긴다.
  - PO1-N6 결정의 자리(Q6). 출처: Scope and Dependencies "수용된 결정", 커밋 2c44760, `docs/planning/decisions.md`, `docs/prd.md`의 Story 1.1 AC 3. 값어치: 깊은 입력의 결과와 Story의 두 해석을 다른 Story가 쓸 공유 근거로 옮길지 정한다. 지금의 자리는 `.bmad-core/tasks/research-decision.md` step 6과 `.bmad-core/data/future-work-planning.md`에 맞다. 계약 밖(Story가 그 문서들을 바꾸지 않는다고 적었다, 소유자는 PM). 시점: 병합 뒤 점검에서 새 항목으로 옮긴다.
  - PO1-N7 G-4가 `number out of range`의 까닭을 비교하지 않음(PO). 출처: AC 3 "까닭이 다른 문제의 까닭과 다르며", 표 1의 G-4, `src/engine.js`의 `parseNumber`. 값어치: 그 까닭을 다시 쓴 사본이 표를 통과하는 틈을 닫는다. 계약 안. 시점: SM의 다음 수정. G-4에 `1` 뒤에 0이 309개 오는 수 글자를 더한다.
  - PO1-N8 AC 3의 문장과 경계 부근의 `O(n)`(PO). 출처: AC 3, Risk Coverage "같은 식의 메시지가 호출마다 달라", 잰 사실 `O(3000)`이 새 프로세스에서 깊이 오류, 예열 뒤 `unclosed parenthesis at position 2999`. 값어치: 넓은 읽기를 막는다. 합격 판정은 같다. 계약 안. 시점: SM의 다음 수정. 넘쳐서 던지는 오류의 메시지임을 적고 N-4와 `coverage_gaps`에 더한다.
  - PO1-N9 bug-2-UNIT-003의 실패 기준이 든 변형은 실패하지 않음(PO). 출처: 그 행의 "재귀 안에서 잡아 다시 넘친 구현", Recommended Execution Order 3번. 값어치: 재귀 안에서 잡고 위치 0을 쓴 사본이 표를 통과하므로, Dev가 실패하지 않을 변형을 기록하는 일을 막는다. 잡는 곳은 bug-2-INSP-001이 읽는다. 계약 안. 시점: SM의 다음 수정. 변형을 값이 틀리는 구현으로 바꾼다.
  - PO1-N10 이름표 문장과 기존 도우미(PO). 출처: Testing "이름표를 쓴다", "판정 방법"의 `errorLineOf`, `assertRejected`. 값어치: 도우미가 긴 식을 메시지에 넣어 고치기 전의 RED 출력이 시험 하나에 201024바이트다. 합격 판정은 같다. 계약 안. 시점: SM의 다음 수정, 없으면 Dev의 SubTask 1.1.
  - PO1-N11 "바꾸지 않음" 목록의 빠짐(PO). 출처: Dev Notes "바꾸지 않는 파일을 모두 든다", 범위 밖 "파일과 기록은 고치지 않는다", "버전도 바꾸지 않는다". 값어치: 낮다. `docs/story-records/1.1/`, `docs/story-records/1.3/`, `docs/qa/gates/1.1.yml`, `docs/qa/gates/1.3.yml`, `package.json`을 더한다. 계약 안. 시점: SM의 다음 수정.
  - PO1-N12 "던지는 길은 이 수정으로 없어진다"의 범위(PO). 출처: Dev Notes의 그 문장, 잰 사실(길이 `2 ** 29 - 24`의 글자에서 `RangeError: Invalid string length`). 값어치: 낮다. 잰 범위를 함께 적는다. 계약 안. 시점: SM의 다음 수정.
- 수집: 완료. 실행 요청이 이 run의 회차에 추가 검토가 없다는 수집 응답이다. 필요한 수정 PO1-B2와 계약 안의 비차단 지적을 SM 피드백으로 넘겼고, PO1-B1은 사용자의 답을 기다린다.
- 승인: 하지 않았다. 판정이 NO-GO이므로 Status는 Draft 그대로다.
- 한계: 계획 점검은 프로젝트 임시 영역의 사본에 Story의 글로 시험과 변형을 만든 것이며 구현 결과나 Dev의 RED가 아니다. 재기는 Windows x64의 Node.js v24.22.1에서만 했다. 외부 자료를 읽지 않았다. `quality` 종류의 규칙 본문은 PO의 규칙 종류가 아니어서 읽지 않았다.
- 기록: [po-r1](../../story-records/bug-2/po-r1.md)

Run authorization: through Done remote — 사용자, 2026-11-06 23:52 +0900, "*run-story bug-2 remote to Done / `docs/prd.md`의 Epic 범위와 AC, 의존 줄, `docs/architecture.md`, 결정 기록 `docs/planning/decisions.md`는 승인된 상태입니다. `bug-2`는 future-work의 "아주 깊은 중첩" 항목을 처리하는 `[Bug]` Story입니다. 이번 호출은 이 Story의 Done과 요청까지이고 병합은 하지 않습니다."

Route: PO1-B1 pending 사용자
Route: PO1-B2 rework SM

Validation: NO-GO
Round: 1
Collection: complete

### 2회, 2026-11-07

- 판정: GO. later round이고, 이 회차에 다시 본 결과와 이어 쓴 1회의 결과가 현재 적용되는 점검을 모두 덮으며, 모든 필수 점검이 끝났고 열린 차단 지적이 없다. 이 판정은 `AGENTS.md`의 조사 요건을 채웠다는 뜻이 아니다.
- 검토자: PO 하위 세션(Sarah, `claude-opus-5-5`, effort `max`), `*run-story bug-2 remote to Done` run의 역할 작업. 1회의 검토자 세션을 이었고 이 Story를 쓰지 않았으며, SM의 점검이 아닌 실제 LLM 검토이고 추가 검토자는 없다. 시각: 2026-11-07, 입력 확인 01:49 +0900, 기록 작성 01:57 +0900 이후.
- 범위와 입력: 열린 차단 지적 둘, 1회 뒤에 바뀐 글, 그 변경이 닿는 점검이다. 기준은 `main` 9aea191로 1회와 같고 Story와 기록 문서는 커밋하지 않은 초안이다. 검토한 계획 내용은 이 항목을 더하기 전의 Story(`git hash-object --no-filters` 값 `2150527f27dc`)와 `sm-2`(`40c3be8d84ee`)이고, 비교 기준은 1회가 읽은 사본과 메인 세션의 스냅샷(둘 다 `120703ae723a`)이다. 바뀐 곳은 Scope and Dependencies의 "수용된 결정", "미결 항목과 선행 조건", Dev Notes의 "설계", "인터페이스와 파일 위치", "기술 제약", Testing, SM Draft Checklist 2회, Change Log다. Status, Story 문장, AC, Tasks / Subtasks, "결과와 범위", PO Validation 1회 항목은 같다(섹션별 비교와 1회 저장 값의 재구성).
- full review 조건: 해당하지 않아 이 세션이 이었다. AC, 범위, Task 구조가 바뀌지 않았고, 사용자는 같은 설계를 받았으며, 고친 지적이 남거나 되살아나지 않았다. 이 세션은 문맥 사용량을 볼 수 없다.
- 범주 요약: Project policy PASS, 1 PASS(이어 씀), 2 PASS, 3 PASS, 4 PASS, 4.5 PASS, 5 PASS. 범주 3의 PASS는 열린 차단 지적이 없다는 뜻이고, 조사가 없다는 사실과 빠진 자료를 Story가 적는다.
- 이어 쓴 앞선 결과: 1회의 범주 1, 바뀌지 않은 섹션의 사실 주장 대조, Q1 ~ Q6의 분류와 추론, 런타임 근거의 값, 기각한 관찰이다. HEAD, 코드, 시험, PRD, Architecture, 결정 기록, 규칙 파일이 1회와 같고 해당 글이 같다. 그 밖의 1회 결과는 이 회차의 결과로 대신한다.
- 닫은 차단 지적:
  - PO1-B1 닫음. 경로 `pending`의 소유자인 사용자가 "조사 없이 이 설계를 수용"이라고 답했다. Story의 "수용된 결정"에 선택과 설명의 원문, 받은 설계의 글, 결정자, 날짜, 범위가 있고 원문과 글자까지 같다. 낱말 "조사"가 든 줄을 모두 읽어 요건을 채웠다는 문장이 없음을 확인했다. 얻은 근거와 빠진 자료가 적혔고, 1회가 고치라고 한 두 문장이 고쳐졌다. 요건 자체는 채워지지 않았고 답은 이 Story의 이 설계에 한한다. 근거: `.bmad-core/data/finding-classification.md`의 "such as accepting a risk"와 섹션 In a run, `AGENTS.md`의 항목 6과 "the user's current explicit instructions".
  - PO1-B2 닫음. bug-2-INSP-001의 목록에 "까닭이 엔진의 다른 까닭과 같은 꼴의 영어 낱말이고 메시지에 식을 되풀이하지 않는가"가 더해져 두 조건에 닿는 점검이 생겼다. 표 "추적", `coverage_gaps`, Risk Coverage가 맞다. 시험이 낱말을 고정하지 않는 결정은 그대로이고 두 사본은 여전히 표를 통과해 읽기가 판정한다.
- 열린 차단 지적, SM 이의 제기, 분류 변경, 늦은 지적, 미완료 점검: 없다.
- 메인 세션이 넘긴 질문 Q-r2-1(`evaluate`의 본문과 `Parser.parseAll`을 "`evaluate` 경계"로 읽기): 읽어도 된다. 막는 것이 없다. `parseAll`은 `evaluate`만 부르고 재귀의 경로에 없어 두 `try`가 같은 호출을 덮으며, 두 사본이 기존 시험과 표의 행 81개를 통과한다. Task, 순서, 합격 판정이 같은 다른 구현 선택이다. 바꿀 것은 사용자가 자리를 `evaluate`의 본문으로 못박았다는 말이고 받은 글에 없다.
- 앞선 비차단 지적: PO1-N7 ~ PO1-N12는 SM이 적용했고 고친 글과 재실행으로 확인했다(`number out of range`를 다시 쓴 사본이 이제 G-4에서 실패한다). PO1-N1 ~ PO1-N6은 적용되지 않아 1회 항목에 남고 병합 뒤 점검이 읽는다. 갱신은 둘이다. PO1-N5의 시점은 조사가 없으므로 병합 뒤 점검에서 새 항목으로 옮기는 것이다. PO1-N6의 값어치에 사용자의 설계 수용이 더해졌고, 그 결정을 공유 근거로 쓰려면 PO2-N1의 일이 먼저다.
- 새 비차단 지적(Story는 적용하지 않았고, 다음 단계를 막지 않는다):
  - PO2-N1 조사 없이 받은 설계의 남은 일(PO). 출처: "수용된 결정"의 "빠진 자료", 사용자의 답의 "남는 위험", PO1-B1, `AGENTS.md` 섹션 Research for uncertainty and core implementation decisions. 값어치: 병합 뒤에 이 설계를 다른 Story나 결정 기록의 공유 근거로 쓸 때, 또는 외부 자료를 읽을 수 있는 호출에서 빠진 자료를 읽을지 사용자가 정할 수 있게 남긴다. 계약 밖(외부 자료가 필요하고 네트워크 조건이 막는다, 소유자는 Architect). 시점: 병합 뒤 점검에서 새 항목으로 옮긴다.
- 수집: 완료. 실행 요청이 이 run의 회차에 추가 검토가 없다는 수집 응답이다. 필요한 수정은 없고, PO2-N1과 갱신을 SM 피드백으로 알렸다.
- 승인: 평가한 범위는 Story 전체이고, 이 회차의 결과와 이어 쓴 1회의 결과가 함께 덮는다. 저장한 Story, SM Draft Checklist 2회, PO Validation과 수용 출처의 대조를 읽어 맞음을 확인했고 `check-stage.sh approve`가 종료 상태 0이어서, 1회 항목의 실행 요청 줄의 단계 `through Done`에 따라 Status를 Draft에서 Approved로 바꿨다. 이 전환만으로 구현이 허락되지는 않는다.
- 실행 요청 줄: 1회 항목에 있고 단계는 `through Done remote`다. run의 첫 PO 회차가 한 번 저장하므로 새로 적지 않았다.
- 한계: 계획 점검과 재실행은 프로젝트 임시 영역의 사본에 Story의 글로 만든 시험과 변형이며 구현 결과나 Dev의 RED가 아니다. 재기는 Windows x64의 Node.js v24.22.1에서만 했다. 외부 자료를 읽지 않았다. `quality` 종류의 규칙 본문은 PO의 규칙 종류가 아니어서 읽지 않았다.
- 기록: [po-r2](../../story-records/bug-2/po-r2.md)

Validation: GO
Round: 2
Collection: complete

## Dev Agent Record

### Agent Identity

Dev 하위 세션 James(Full Stack Developer), 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story bug-2 remote to Done` run의 역할 작업. effort는 설정의 이름(`xhigh`)과의 대응을 이 세션이 확인할 수 없다.

### Debug Log References

### Completion Notes List

Issue: #17

- 시작: 2026-11-07 02:04 +0900. `local-story-start.md`를 따랐다. 구현 브랜치 `story/bug-2`, 기준 브랜치 `main`, 기준선 HEAD `9aea1916e47d8d677fd0b4c291af260fa355c0a8`(`main`의 9aea191이고 `origin/main`과 같다). 슬롯 없는 run이고 원래 checkout에서 시작했다. 이 Story와 기록 문서는 커밋하지 않은 초안이어서 시작 커밋이 Story 브랜치에 더한다. 실행 요청 줄은 PO Validation의 `Run authorization: through Done remote`다. 시작 점검: `check-stage.sh start`, `check-stage.sh records`, `check-stage.sh po-record`(Validation: GO, Round: 2, Collection: complete)가 종료 상태 0이고, 선행 Story는 `check-merge.sh status 1.1 main`과 `status 1.3 main`이 `merged`(Done 커밋 81c547c와 937f21c)를 냈다. 이슈는 `publish.sh issue main story/bug-2`가 새로 만들었다(`issue 17 created`).
- 시작 시 기준 통과: 프로젝트 루트의 `node --test` 68개 통과(실패 0, 취소와 건너뜀 0), `node ci/screen-rule.check.mjs` 종료 상태 0. Draft가 적은 관찰과 같다.

### File List

### In-Flight Comments Ledger

in-flight-comments-ledger: []

## QA Results
