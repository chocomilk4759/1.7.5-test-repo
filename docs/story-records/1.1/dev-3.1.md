# dev-3.1 — 시험 행과 단언 보강

- Story: [1.1](../../stories/1.1.story.md)
- Entry: Dev QA 수정 단위 3.1, QA 라운드 1의 TEST-001(Required)과 TEST-003(Optional, Dev가 적용을 고름). 결정 목록은 [dev-qa-r1](dev-qa-r1.md)
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.1` run의 역할 작업
- 시각: 2026-11-06, 시험 편집과 변형 실행 11:06, Cleaner 위임과 반환 11:06 ~ 11:10, 최종 점검 11:10 +0900
- 입력 기준: 브랜치 `story/1.1`, 시작 HEAD `68aee70`. 비교 기준은 같은 `68aee70`이다. 바뀐 경로는 `test/engine.test.js` 하나(`git hash-object` 값 `abaa40a4123015`에서 `9c393cf547edc9`로)이고 `src/engine.js`(`5e7c584b21900d`)와 새 파일은 없다. Node.js v24.22.1, 점검 명령은 프로젝트 루트의 `node --test`다. 외부 패키지와 테스트 대역은 쓰지 않았다

## 접근과 시나리오

접근은 `verification-only`다. 제품 동작은 AC 1 ~ 4와 D-1에 이미 맞고 QA 지적도 그렇게 확인했으며, 이 단위는 시험의 단언만 강화한다. `testing-tdd`에 따라 유효한 기준선이 통과함을 먼저 보이고, 강화한 단언마다 요구사항에서 나온 안전한 변형 하나가 그 단언에서 실패함을 보인다. 이 점검은 Dev의 TDD RED가 아니다. 시나리오 ID는 Story의 Testing을 그대로 쓴다: 1.1-UNIT-001(TEST-001의 V-3 대조 행, TEST-003의 곱셈 행), 1.1-UNIT-004(단항 마이너스), 1.1-UNIT-013(오류 클래스).

## 변경 내용

기대 값은 구현이 아니라 손 계산과 Testing의 표에서 왔다.

| 시험 이름 | 더한 것 | 기대 값의 출처 | 지적 | 시나리오 |
| --- | --- | --- | --- | --- |
| parentheses override the default grouping | 행 `8 - 3 - 2` → 3 | 왼쪽부터 계산한 손 값. Testing 표 1 V-3 칸의 대조 값 | TEST-001 | 1.1-UNIT-001 |
| accepts a unary minus before a number, a parenthesis or another minus | 행 `8 / -2 * 3` → -12 | `(8 / -2) * 3`을 왼쪽부터 계산한 손 값(AC 1, AC 2) | TEST-003 | 1.1-UNIT-004 |
| evaluates a single number and each of the four operations | 행 `7 * 0` → 0 | 손 값. AC 3은 0으로 나누기만 오류로 정한다 | TEST-003 | 1.1-UNIT-001 |
| does not treat an ordinary Error as a CalculationError (새 시험) | `new Error("x")`가 `CalculationError`의 인스턴스가 아니라는 단언 | Architecture 설계 원칙의 자기 오류 클래스와 1.1-UNIT-013("다른 클래스를 던지면 실패")에서 온 구별 | TEST-003 | 1.1-UNIT-013 |

오류 구별 단언은 기존 시험 "throws a CalculationError that is an Error with a text message"에 덧붙이지 않고 별도 시험으로 두었다. 기존 시험의 이름에 없는 단언을 붙이면 이름이 단언을 다 말하지 못하기 때문이다.

## 실행 순서와 결과

1. 기준선, 변경 전: `68aee70`의 프로젝트 루트 `node --test`: 34개 통과(엔진 30, 기존 4), 실패 0.
2. 변경 전의 틈 확인: 아래 변형을 `68aee70`의 시험 파일에 걸었다(프로젝트 임시 영역의 엔진 사본에서만 실행했고 추적 파일을 바꾸지 않았다). 변형이 없는 엔진은 30개 모두 통과해 실행기가 올바르게 동작함을 보였다.
3. 시험 편집 뒤: 프로젝트 루트 `node --test`: 35개 통과(엔진 31, 기존 4), 실패 0. 같은 변형을 편집한 시험 파일에 걸었고 변형이 없는 엔진은 31개 모두 통과했다.
4. Cleaner 검토와 최종 점검은 아래에 있다.

| 변형(틀린 구현) | 요구사항 근거 | 변경 전 시험의 결과 | 변경 뒤 시험의 결과 |
| --- | --- | --- | --- |
| `+`와 `-`를 오른쪽부터 묶음(`8 - 3 - 2`가 7) | AC 1 "우선순위가 같으면 왼쪽부터" | 실패는 "operators of equal precedence are evaluated from the left" 하나. "parentheses override the default grouping"은 통과 | 두 시험이 실패한다. 새 실패는 "parentheses override the default grouping"의 `evaluate("8 - 3 - 2")`, actual 7, expected 3 |
| 단항 마이너스가 뒤따르는 항 전체에 걸림(`8 / -2 * 3`이 -1.3333333333333333) | AC 1, AC 2 | 통과(실패 0) | 실패는 "accepts a unary minus before a number, a parenthesis or another minus"의 `evaluate("8 / -2 * 3")`, actual -1.3333333333333333, expected -12 |
| 곱셈의 오른쪽 피연산자가 0이면 거부(`7 * 0`이 오류) | AC 3(오류는 0으로 나누기) | 통과(실패 0) | 실패는 "evaluates a single number and each of the four operations", `7 * 0`에서 "division by zero at position 2" 오류 |
| `CalculationError`를 `Error`의 별칭으로 둠 | Architecture 설계 원칙, 1.1-UNIT-013 | 통과(실패 0) | 실패는 "does not treat an ordinary Error as a CalculationError" 하나 |

변경 전 시험에서 세 변형이 통과한다는 것이 QA 지적(TEST-001의 행 없음, TEST-003의 틈)의 직접 확인이고, 변경 뒤에는 각 변형이 새로 더한 단언에서 실패한다.

## Cleaner 결과

- 검토자: Cleaner 검토자 하위 세션 하나(이름 없음). Dev 하위 세션이 Agent 도구로 직접 시작했다. 요청한 모델은 별칭 `opus`(설정 `workflow.run.sessions.cleaner`의 `claude-opus-5-5`)이고 effort는 `high`다. 검토자가 자기 세션 정보에서 읽어 보고한 모델 ID는 `claude-opus-5-5`다(검토자의 자기 보고이며 Dev가 호스트로 확인한 값은 아니다). 시각은 11:06 ~ 11:10 +0900이다.
- 위임한 입력: 프로젝트 루트, 프로젝트 지침 파일과 임시 영역의 절대 경로, Story 경로, 단위 3.1, 접근 `verification-only`와 시나리오 ID, 비교 기준 `68aee70`, 바뀐 경로 `test/engine.test.js`(새 파일 없음), 테스트 명령과 결과(35개 통과), CRAP 측정 안 함, 검토자의 작업 폴더 하나. Dev의 판단과 결론, 변형 실험 결과는 넘기지 않았다. 위임 시점의 상태: HEAD `68aee70`, 시험 파일 `9c393cf547edc9`, 엔진 `5e7c584b21900d`, 인덱스와 `git status --porcelain=v1`의 해시.
- 검토자가 읽은 규칙 본문: `golden-rules`, `coding-principles`, `comments`, Common `crap`, `testing-tdd`, `javascript-language`, `javascript-crap`과 Hub, 두 색인, `data/development-quality.md`, `tasks/code-comment-style.md`, `checklists/comment-hygiene-checklist.md`, `data/local-git-workflow.md`의 Read-only work. `documentation`은 검토자의 규칙 종류가 아니어서 읽지 않았다.
- 검토자가 쓴 파일: 실험 스크립트 하나와 작업 사본, 결과 파일을 합쳐 35개이고 모두 검토자가 만든 새 파일이며 Dev가 지정한 작업 폴더 안에만 있다. 폴더 밖에 쓴 파일과 바꾼 기존 파일은 없다. Dev는 폴더의 파일 수(35개)를 보고와 대조했다.
- 위임 뒤 확인: 반환 뒤 시험 파일, 엔진, 인덱스 목록의 해시, `git status --porcelain=v1`의 해시, HEAD가 모두 위임 때의 값과 같았다. 스테이징된 변경도 없다.
- 결과: no-change, 지적 0건. 검사 범위는 `68aee70`과 작업 트리의 `test/engine.test.js` 차이(추가 7줄, 삭제 0줄)이고 시험 파일 전체와 `src/engine.js`를 맥락으로 읽었다. 이름과 단언의 일치, 새 분기와 도우미와 공유 상태 없음, 수 리터럴(기대 값은 시험 사례 값), 추적 번호와 편집 이력 후보 없음(0건), 추가된 주석 없음, 형식(두 칸 들여쓰기, 큰따옴표, 세미콜론, 추가 줄의 최대 길이 70열)을 확인했다. 새 시험은 `testing-tdd`가 빼는 세 형태에 해당하지 않는다(공개 export만 쓰고, 구현을 되풀이하지 않고, 별칭 변형에서 실패한다).
- 검토자의 실험: 엔진 사본의 변형 8개를 현재 시험과 기준 시험에 걸었다. 곱셈에도 0 거부, 곱셈의 오른쪽을 `right || 1`로 바꿈, 오른쪽 결합, 단항 마이너스가 항을 삼킴, `Error`의 별칭, `Symbol.hasInstance`로 모든 `Error`를 인스턴스로 봄은 현재 시험에서 실패하고 기준 시험에서는 오른쪽 결합의 한 시험을 빼고 통과했다. `RangeError`의 별칭은 둘 다에서 통과(살아남음)했다. 프로젝트 루트의 `node --test`는 실험 뒤에도 35개 통과다.
- 처분: 지적이 없어 받아들일 정리가 없다. `RangeError` 별칭 변형은 지적이 아니라 검토자의 기록 사항이다. 수용된 시나리오와 TEST-003이 요구한 구별은 `CalculationError`와 `Error` 사이이고 새 시험의 이름도 평범한 `Error`로 범위를 말하므로, 다른 내장 오류 클래스의 별칭을 가르는 시험은 더하지 않았고 이 기록의 한계에 시험하지 않은 범위로 적는다.
- Cleaner 뒤의 재점검: 파일이 바뀌지 않았으므로 정리에 따른 재점검은 없다. 아래 최종 점검은 Cleaner 뒤의 상태에서 실행했다.

## 최종 점검

Cleaner 반환 뒤의 상태(시험 파일 `9c393cf547edc9`, 엔진 `5e7c584b21900d`)에서 실행했다. 기준은 `68aee70`이다.

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 전체 시험 | 프로젝트 루트의 `node --test` | 35개 통과, 실패 0(엔진 31, 기존 4) |
| 1.1-UNIT-016 | `git diff 68aee70 --quiet -- src/number-format.js test/number-format.test.js` | 종료 상태 0, 차이 없음 |
| 1.1-INSP-001 | `grep -nE -e "\beval\b" -e "\bFunction\b" src/engine.js` | 일치 없음, 종료 상태 1 |
| 엔진 불변 | `git diff --quiet HEAD -- src/engine.js` | 종료 상태 0, 이 단위는 제품 파일을 바꾸지 않았다 |
| 주석 위생 | 체크리스트 §1.1(추적 번호), §1.2(QA ID 접두와 이 Story의 지적과 시나리오 ID), §1.3(기계 고유 경로와 임시 영역 이름), §1.4(`IN-FLIGHT`), §1.7(편집 표시와 날짜)의 후보 검색을 `68aee70` 대비 추가된 줄에, 비ASCII 검색을 시험 파일 전체에 실행 | 모두 일치 없음(종료 상태 1). 추가된 주석이 없고 새 시험 이름은 영어이며 단언과 맞는다. 새 추적 번호 누출 0, IN-FLIGHT 0 |
| CRAP | 해당 없음 | 측정하지 않았다. `quality.crap.commands`가 비어 있고 이 단위는 제품 코드를 바꾸지 않았다. 측정 제안은 future 기록 DEV-1이 이미 갖고 있다 |

## 한계

- 변형은 손으로 고른 몇 개이며 변이 도구와 속성 점검 도구는 설정되어 있지 않다. 이 점검은 단언이 해당 변형에서 실패함을 보일 뿐 모든 틀린 구현을 잡는다는 증거가 아니다.
- 새 시험은 `CalculationError`와 평범한 `Error`의 구별만 본다. 다른 내장 오류 클래스의 별칭은 시험하지 않았다.
- 문자열이 아닌 입력이 던지는 오류의 클래스는 수용된 문서에 없어(N-4) 시험하지 않았다.
