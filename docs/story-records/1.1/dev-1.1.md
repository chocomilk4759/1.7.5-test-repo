# dev-1.1 — 계산 엔진 구현

- Story: [1.1](../../stories/1.1.story.md)
- Entry: Dev SubTask 1.1
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.1` run의 역할 작업
- 시각: 2026-11-06, 시작 10:09 +0900, Cleaner 위임 10:16 +0900, 정리와 최종 점검 완료 10:26 +0900
- 입력 기준: 브랜치 `story/1.1`, 시작 커밋 `d409028`(`Approved -> InProgress`), 기준선 `main`의 `862f5fd`. 이 SubTask는 새 파일 `src/engine.js`와 `test/engine.test.js`만 더한다. 기준에 두 파일이 없다.
- 환경: Node.js v24.22.1, Git 2.51.0. 점검 명령은 프로젝트 루트의 `node --test`(전체)와 `node --test test/engine.test.js`(조각 실행)다. 외부 패키지와 테스트 대역은 쓰지 않았다.

## 읽은 규칙

`.bmad-core/tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`(Dev의 규칙 종류 `operations`, `design`, `documentation`). 완료 점검(`develop-story.md` Completion 4.5)을 위해 `comments`, `javascript-crap`과 Common `crap`도 읽었다.
- 절차 문서: `develop-story.md`, `local-story-start.md`, `local-task-done.md`, `local-story-review.md`, `data/development-quality.md`, `data/local-git-workflow.md`, `data/verification-ownership.md`, `data/defect-diagnosis.md`, `tasks/code-comment-style.md`, `checklists/comment-hygiene-checklist.md`, `checklists/story-dod-checklist.md`, `tasks/architecture-align.md`를 끝까지 읽었다.

## 접근과 시나리오

접근은 `TDD`다. Story의 Recommended Execution Order대로 조각마다 RED → GREEN을 마쳤다. 뼈대(모듈과 두 심볼만 있고 `evaluate`가 `NaN`을 돌려주는 파일)를 먼저 만들어 가져오기 실패가 아닌 값 단언 실패로 첫 RED를 보았다. 시나리오 ID는 Story의 Testing을 그대로 쓴다.

## 조각별 실행 기록

명령은 모두 `node --test test/engine.test.js`이고, 코드 상태는 직전 GREEN 뒤의 `src/engine.js`에 그 조각의 시험을 더한 것이다. "기준 통과"는 시험을 더한 뒤 처음 실행에서 이미 통과했다는 뜻이며 RED가 아니다. 그런 조각은 아래 표의 민감도 점검으로 시험이 해당 동작에 닿는지 보였다.

| 조각 | 시나리오 | 결과(처음 실행) | 구현(최소 변경) | GREEN |
| --- | --- | --- | --- | --- |
| 1 | 1.1-UNIT-001 | RED: 3개 실패. `evaluate("1 + 2")` actual NaN, expected 3 | 파서(수, 사칙연산, 괄호, 공백 건너뛰기) | 3/3 통과 |
| 2 | 1.1-UNIT-002 | 기준 통과(4/4) | 없음 | 4/4 |
| 3 | 1.1-UNIT-015 | RED: 1개 실패. `evaluate("0.1 + 0.2")` actual 0, expected 0.30000000000000004 | 소수 부분, 단항 마이너스 | 5/5 |
| 4 | 1.1-UNIT-013 | RED: 2개 실패. "Missing expected exception"(`7 + a`가 값을 돌려줌) | 숫자가 없을 때 `CalculationError`(까닭과 위치를 담은 메시지) | 7/7 |
| 5 | 1.1-UNIT-003 | 값 시험은 기준 통과. 거부 시험 RED: `evaluate("5.")` Missing expected exception | 식 끝에 남은 글자 거부 | 9/9 |
| 6 | 1.1-UNIT-004 | 기준 통과(11/11, 값과 단항 `+` 거부 둘 다) | 없음 | 11/11 |
| 7 | 1.1-UNIT-005 | 기준 통과(13/13) | 없음 | 13/13 |
| 8 | 1.1-UNIT-008 | 기준 통과(16/16, E-4, E-7, E-8 세 시험) | 없음 | 16/16 |
| 9a | 1.1-UNIT-007 | 짝 없는 `)` 시험은 기준 통과. 짝 없는 `(` 시험 RED: `evaluate("(7 + 8")` Missing expected exception | `)`를 확인하고 없으면 여는 괄호 위치로 오류 | 18/18 |
| 9b | 1.1-UNIT-007에 더한 확인 | RED: 메시지 "unclosed parenthesis at position 0"이 위치 3을 말하지 않음(`(7 8)`, `(7 $`) | 식이 끝났을 때만 닫히지 않은 괄호, 아니면 그 글자 | 19/19 |
| 10 | 1.1-UNIT-009 | 기준 통과(20/20) | 없음 | 20/20 |
| 11 | 1.1-UNIT-006 | 나눗셈 거부 시험 RED: `evaluate("7 / 0")` Missing expected exception. 0이 아닌 수로 나누기는 기준 통과 | 0으로 나누기 거부(`-0` 포함) | 22/22 |
| 12a | 1.1-UNIT-010 | 유한한 경계값 시험은 기준 통과. 수 글자 시험 RED: 1 뒤에 0이 309개인 글자가 값을 돌려줌 | 수 글자의 유한성 검사 | 24/25(중간값 시험은 아직 RED) |
| 12b | 1.1-UNIT-010 | RED(12a 뒤에도 남음): `B * 10` 등이 값을 돌려줌 | 연산마다 중간값의 유한성 검사 | 25/25 |
| 13 | 1.1-UNIT-011 | 기준 통과(27/27) | 없음 | 27/27 |
| 14 | 1.1-UNIT-012 | RED: 까닭이 서로 다르지 않음(`7 $`와 빈 식이 같은 "unexpected character at position") | 식이 끝난 자리는 "unexpected end of expression" | 28/28 |
| 15 | 1.1-UNIT-014 | RED: `evaluate(["1"])`가 값을 돌려줌(Missing expected exception) | 문자열이 아니면 `TypeError` | 29/29 |

마지막 조각 뒤 `src/engine.js`에 주석을 더한 상태에서 전체 `node --test`는 33개 통과(기존 4개와 새 29개)였다.

## 민감도 점검(사후 점검)

기준 통과 조각은 RED가 없으므로, 시험이 해당 동작에 닿는지 `src/engine.js`의 사본에 틀린 변형을 넣고 같은 시험 파일을 돌려 보였다. 이 점검은 조각의 GREEN 뒤에 한 사후 점검이며 RED가 아니다. 변형은 한 번에 한 가지씩, 그 조각 시점의 구현 사본에 넣었다.

| 조각 | 변형(틀린 구현) | 실패한 시험과 증상 |
| --- | --- | --- |
| 2 | 같은 우선순위의 연산을 오른쪽부터 계산 | 같은 우선순위 시험. `evaluate("10 - 3 - 2")` actual 9, expected 5 |
| 6 | 단항 `+`를 받음 | 단항 `+` 거부 시험. `evaluate("+3")` Missing expected exception |
| 6 | 단항 마이너스가 뒤따르는 식 전체에 걸림 | 단항 마이너스 시험. `evaluate("-2 + 3")` actual -5, expected 1 |
| 7 | 공백을 하나만 건너뜀 | 공백 무시 시험 실패 |
| 7, 8, 5 | 식 끝에 남은 글자 검사를 뺌 | 다른 공백 시험, 받지 않는 글자 시험, 자리가 틀린 토큰 시험, 수의 꼴 거부 시험이 실패 |
| 8 | 수 스캔이 영문자와 `_`까지 읽고 `Number()`로 바꿈 | 받지 않는 글자 시험 등 4개 실패. 이 변형은 유한성 검사가 생기기 전의 구현에 넣었고 `7 + a`가 NaN, `7e8`이 700000000, `0x55`가 85를 돌려줌 |
| 8 | 숫자 자리가 없어도 `Number("")`로 0을 만듦 | 수의 꼴 거부, 단항 `+` 거부, 피연산자 없이 끝남, 자리가 틀린 토큰, 빈 식 시험이 실패 |
| 8 | 유니코드 숫자(`\p{Nd}`)를 숫자로 읽음 | 받지 않는 글자 시험 실패. 전각 숫자 `U+FF11`이 NaN을 돌려줌(Missing expected exception) |
| 10 | 숫자 자리가 없어도 0을 만듦(위와 같은 변형) | 빈 식과 공백만 있는 식 시험 실패 |
| 13 | 공백을 먼저 지우고 파싱 | 위치 시험 실패(많은 값 시험도 함께 실패하는 거친 변형이다) |
| 13 | 위치를 1부터 셈 | 위치 시험 실패. 위치를 말하는 모든 거부 시험이 실패 |

RED를 본 조각(1, 3, 4, 5의 거부 시험, 9a, 9b, 11, 12, 14, 15)은 이 점검이 필요 없다. 속성 점검과 변이 도구는 계획하지 않았고 설치되어 있지 않다.

## 선택한 해석과 구현 결정

수용된 문서가 하나로 정하지 않은 부분은 Story의 Testing이 후보를 모두 받는다. 구현이 고른 규칙은 다음과 같다.

- 오류 위치(0부터 센 원래 식의 글자 위치): 연산자가 만든 문제(0으로 나누기, 유한하지 않은 중간값이나 결과)는 그 연산자 글자, 유한하지 않은 수 글자는 그 수의 첫 글자, 닫히지 않은 `(`는 그 `(`, 그 밖의 받지 않는 글자는 그 글자, 피연산자 없이 식이 끝나면 식 길이다. 빈 식과 공백만 있는 식도 같은 규칙이라 빈 식은 0, 공백 세 개는 3이다(Testing의 후보 {0, 3} 안). 문제가 여럿이면 왼쪽부터 읽다가 먼저 드러나는 문제다.
- 공백: U+0020만 수와 연산자 사이, 식의 앞뒤, 괄호 안쪽에서 건너뛴다. 탭, 줄바꿈, U+00A0은 받지 않는 글자라 그 글자에서 `CalculationError`다. `- (2 + 1)`은 -3이다. 표 3이 받는 두 결과 가운데 이 쪽을 골랐다.
- 숫자는 ASCII `0`~`9`만 읽는다.
- 문자열이 아닌 입력은 `TypeError`다(수용된 문서에 없는 입력이며 `Error`의 인스턴스이면 합격하는 계획).
- 오류 메시지는 영어 까닭과 `at position {n}` 꼴이고, 식을 되풀이하지 않는다. 낱말은 고정된 계약이 아니다.
- `CalculationError`는 `Error`를 잇는 빈 클래스이며 `name`이나 다른 속성을 더하지 않았다.
- 파일 머리 주석은 한 줄 요약만 있다. 프로젝트에 라이선스 파일이나 저작권 표기가 없고 기존 `src/number-format.js`도 요약만 있어서 저작권과 SPDX 값은 만들지 않았다. 소유자가 값을 주면 채울 수 있다.

## Cleaner 결과

- 검토자: Cleaner 검토자 하위 세션 하나(이름 없음). Dev 하위 세션이 Agent 도구로 직접 시작했다. 요청한 모델은 별칭 `opus`(설정 `workflow.run.sessions.cleaner`의 `claude-opus-5-5`)이고 effort는 `high`다. 검토자의 보고는 자기 모델 ID를 적지 않아, 실제로 돈 모델은 Dev가 확인하지 못했다. 시각은 10:16 ~ 10:22 +0900이다.
- 위임한 입력: 프로젝트 루트, Story 경로, SubTask 1.1, 접근 `TDD`와 시나리오 ID, 비교 기준(`main`의 `862f5fd`, 기준에 두 파일이 없음), 변경 경로 `src/engine.js`와 `test/engine.test.js`(둘 다 새 파일), 테스트 명령 `node --test`와 그 결과(33개 통과), CRAP 측정 안 함, 검토자의 작업 폴더 하나. Dev의 판단과 결론은 넘기지 않았다. 위임 시점의 두 파일 상태는 `git hash-object` 값 `d187e19d9eae`(엔진)와 `9ed104f78aad`(시험)이다.
- 검토자가 읽은 규칙 본문: `golden-rules`, `testing-tdd`, `coding-principles`, `comments`, `crap`, `javascript-language`, `javascript-crap`과 Hub, 두 색인, `data/development-quality.md`, `tasks/code-comment-style.md`, `checklists/comment-hygiene-checklist.md`, `data/local-git-workflow.md`의 Read-only work.
- 검토자가 쓴 파일: 실험 스크립트 3개와 작업 사본 39개, 모두 검토자가 만든 새 파일이며 Dev가 지정한 작업 폴더 안에만 있다. 폴더 밖에 쓴 파일은 없다. Dev는 폴더의 파일 수(42개)를 보고와 대조했다.
- 위임 뒤 확인: 반환 뒤 두 파일의 `git hash-object`, `git ls-files --stage`의 해시, `git status --porcelain=v1`의 해시, HEAD가 모두 위임 때의 값과 같았다. 작업 트리와 인덱스는 변하지 않았다.
- 검토자의 점검: 손으로 고른 변이 19개 가운데 14개를 기존 시험이 잡았고 5개가 통과했다(아래 F3, F4, F5, F8의 근거와 동작을 바꾸지 않는 변형 하나). 구문 트리 20만 건을 별도 계산기로 대조해 불일치 0건, 변형 하나와 원본의 무작위 문자열 50만 건 비교에서 차이 0건이었다. 33개 통과를 다시 확인했다.

### 지적과 처분

| 지적 | 위치와 기준 | 처분 | 근거와 조치 |
| --- | --- | --- | --- |
| F1 높음 | 엔진 파일 요약 주석의 낱말 `eval`, 1.1-INSP-001 | 받아들임 | 재현: 계획된 `grep -nE -e "\beval\b" -e "\bFunction\b" src/engine.js`가 요약 주석에 일치(종료 상태 0, 실패). 주석에서 낱말을 뺀 뒤 일치 없음(종료 상태 1) |
| F2 높음 | `skipSpaces` 호출 4곳이 죽은 코드 | 받아들임 | 네 호출을 지움. 시험 전부 통과, 정리 전 엔진과의 비교에서 차이 0건(아래 재점검) |
| F3 중간 | 나눗셈 오버플로를 잡는 시험이 없음 | 받아들임 | 중간 결과 시험에 행 `LARGEST_POWER_OF_TEN / 0.1` 추가. 이미 통과하므로 RED가 아니라 민감도 점검: 나눗셈 결과를 검사하지 않는 변형에서 그 시험이 실패(Missing expected exception) |
| F4 중간 | `-0`과 계산된 0에서 0으로 나누기의 까닭을 확인하지 않음 | 받아들임 | 새 시험 "gives one reason for every division by zero"(행: `0 / 0`, `7 / 0.0`, `7 / (8 - 8)`, `7 / -0`, 계산된 0). 이미 통과하므로 민감도 점검: `-0`을 0으로 보지 않는 변형에서 `7 / -0`의 까닭이 "result out of range"가 되어 실패 |
| F5 중간 | 시험 이름이 단언보다 강함 | 받아들임 | 이름을 "reports the position of one problem when an expression has several"로 바꿈. 후보 집합은 그대로 |
| F6 중간 | 시험 이름과 상수 이름이 사실과 다름 | 받아들임 | 상수를 `LARGEST_POWER_OF_TEN`, `OVERFLOW_POWER_OF_TEN`으로, 시험 이름을 "accepts the largest finite power of ten and a quotient that underflows"로 바꿈 |
| F7 중간 | 308과 309가 같은 양을 두 번 적음 | 받아들임 | `OVERFLOW_POWER_OF_TEN`을 `LARGEST_POWER_OF_TEN`에 0을 붙여 만듦 |
| F8 중간 | 시험 입력에 보이지 않는 U+00A0가 그대로 있음 | 받아들임 | 이스케이프로 바꿈. 같은 문제가 있던 전각 숫자 U+FF11도 바꿈. 비ASCII 검색은 일치 없음 |
| F9 중간 | `Parser` 위 주석이 식 앞뒤 공백 동작과 다름 | 받아들임 | "Spaces are skipped around tokens, never inside a number."로 고침 |
| F10 중간 | `evaluate`가 파서 내부를 직접 다루고 "unexpected character"가 세 곳에 흩어짐 | 받아들임 | `Parser`에 `parseAll`과 `failAtCursor`를 두어 `evaluate`는 타입 검사 뒤 `parseAll`만 부름. 그 글자는 한 곳에만 있음 |
| F11 낮음 | 커서 읽기 반복과 80칸 넘는 줄 | 받아들임 | `get current()`를 둠. 엔진의 긴 줄과 시험의 긴 단언 줄을 없앰. 80칸을 넘는 줄은 줄바꿈할 지점이 없는 시험 이름 줄 7개만 남음 |
| F12 낮음 | 지역 변수 `open`이 위치임을 말하지 않음 | 받아들임 | `openPosition`으로 바꿈 |
| F13 낮음 | `CalculationError.name`이 `"Error"` | 받아들이지 않음 | 수용된 요구에 없고(Story 1.3은 `message`만 씀) 속성을 더하면 시험도 더해야 해서 현재 SubTask의 최소 범위를 넘는다. 호스트는 클래스 이름을 로그에 보여 준다. 필요하면 Story 1.3의 정리에서 정한다 |
| 기록 사항 | 저작권/SPDX 머리글 | 변경 없음 | 법적 입력이 없다(라이선스 파일, 저작권 표기, `package.json`의 `license` 없음). 값을 만들지 않았고 요약 한 줄은 있다 |

같은 검토자의 재검토는 하지 않았다. 높음으로 분류된 F1, F2의 정정은 설계 결정을 바꾸지 않았고(주석 낱말, 효과 없는 호출 삭제), 정정을 점검으로 보였다. F10의 구조 정리는 같은 동작을 비교로 보였다.

### 정리 뒤 재점검

| 점검 | 방법과 결과 |
| --- | --- |
| 전체 시험 | 프로젝트 루트의 `node --test`: 34개 통과(기존 4개와 엔진 30개), 실패 0 |
| 정리 전후 동등 | 정리 전 엔진 사본과 현재 엔진에 같은 입력 40만 개(절반은 토큰을 이어 붙인 무작위 문자열, 절반은 문법을 따라 만든 식으로 공백, 단항 마이너스, 괄호, 큰 수 글자를 섞고 15%는 잘라 냄)를 넣어 값(`Object.is`) 또는 오류 종류와 메시지를 비교: 받아들인 입력 169,674, 거부한 입력 230,326, 차이 0건 |
| 1.1-INSP-001 | 위 F1 |

## 최종 점검

정리 뒤의 최종 상태(엔진 `git hash-object` 값 `5e7c584b21900d`, 시험 `abaa40a4123015`)에서 실행했다. 기준은 `main`의 `862f5fd`다.

| 시나리오 | 방법 | 결과 |
| --- | --- | --- |
| 1.1-UNIT-001 ~ 1.1-UNIT-015 | 프로젝트 루트의 `node --test`에 든 엔진 시험 30개(조각별 대응은 위 표) | 통과 |
| 1.1-UNIT-016 | `git diff 862f5fd --quiet -- src/number-format.js test/number-format.test.js`(종료 상태 0, 차이 없음)와 `node --test`에서 기존 `test/number-format.test.js`의 4개 | 통과. 전체 34개 통과, 실패 0 |
| 1.1-INSP-001 | `grep -nE -e "\beval\b" -e "\bFunction\b" src/engine.js` | 처음 실행(Cleaner 지적 F1, 요약 주석에 일치, 종료 상태 0)은 실패였고, 주석을 고친 뒤 일치 없음(종료 상태 1)으로 통과 |
| 1.1-INSP-002 | `src/engine.js`를 끝까지 읽음(agent-review) | 통과. 가져오기가 없다. 입출력과 전역 접근이 없다(`console`, `process`, `globalThis`, `require`, `fetch`, 파일 읽기, `Date`, `Math.random` 검색에 일치 없음). 파일 맨 위 선언은 `CalculationError` 클래스, `isDigit` 함수, `Parser` 클래스, `evaluate` 함수뿐이고 모듈 변수가 없다. 호출마다 새 `Parser`를 만들어 상태는 그 인스턴스에만 있다. 실행 시 내보내기는 `CalculationError`, `evaluate` 둘이다 |
| 1.1-INSP-003 | 대표식의 실제 메시지를 읽음(agent-review) | 통과. `7 / 0`은 "division by zero at position 2", `(7`은 "unclosed parenthesis at position 0", `7 $`는 "unexpected character at position 2", 빈 글자는 "unexpected end of expression at position 0", 1 뒤에 0이 308개인 수를 10과 곱한 뒤 1을 나눈 식은 "result out of range at position 315"이다. 까닭이 사람이 읽는 영어 낱말이고 추적 번호가 없다 |

### 주석 위생(`checklists/comment-hygiene-checklist.md`)

- 섹션 2(비교 기준): 기준 `862f5fd`에 두 대상 파일이 없어 기존 후보가 없다. 둘 다 새 파일이다.
- 섹션 3과 4(최종 상태의 두 파일): 추적 번호(§1.1), QA ID 접두(§1.2), 이 Story의 지적과 시나리오 번호(`PO1-N`, `N-1`, `D-1`, 규칙 `V-`와 `E-`, 시나리오 ID), 편집 표시와 날짜(§1.7), `IN-FLIGHT`(§1.4)를 검색해 일치 없음. 비ASCII 문자 없음. 새 추적 번호 누출 0, IN-FLIGHT 0(새 표시를 만들지 않았고 기존 항목이 없다), 화이트리스트 해당 없음(`commentHygiene.preservedComments`가 비어 있다).
- 문맥 검토: 두 파일을 끝까지 읽었다. 주석은 영어이고 이유, 계약, 문법만 설명한다. 시험 이름과 주석은 실제 단언과 맞는다. 예를 들어 공백 시험은 두 결과 모두 받는다고 말하고, 위치 시험은 왼쪽 문제를 먼저 보고한다고 주장하지 않는다.

### CRAP

측정하지 않았다. `quality.crap.commands`가 비어 있어 `src/engine.js`를 측정할 명령이 없다. 이것은 통과도 차단도 아니다. 이 측정 제안은 Story 범위 밖이어서 Dev Agent Record에 future 기록(DEV-1)으로 남겼다.

### 한계

- 함수가 하나라도 CRAP 한도를 넘는지는 모른다. 메서드는 모두 짧지만 계산하지 않았다.
- 오류 위치 규칙, 공백 범위, 숫자 범위, 문자열이 아닌 입력, 메시지의 언어는 Story가 후보를 모두 받도록 둔 부분이며 위 "선택한 해석"이 구현의 선택이다. 수용된 결정이 아니다.
- 아주 깊은 중첩은 점검하지 않았다. Cleaner 검토자가 재귀 구현의 한계를 실험으로 보았다(깊이 5000은 통과, 20000은 `RangeError`). 이미 Story의 비차단 지적으로 열려 있어 새 기록은 만들지 않았다.
- 변이 도구와 속성 점검 도구가 없어 민감도 점검은 손으로 고른 변형이다. 전수가 아니다.
