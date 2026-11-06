# dev-dod-1 — Definition of Done 점검 1회

- Story: [bug-2](../../stories/bug/bug-2.story.md)
- Entry: Dev Definition of Done check 1 (Review로 넘기기 전)
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story bug-2 remote to Done` run의 역할 작업
- 시각: 2026-11-07, 02:25 +0900
- 입력 기준: 브랜치 `story/bug-2`, HEAD `7051cad`(SubTask 2.1), 기준선 `main`의 `9aea1916e47d8d677fd0b4c291af260fa355c0a8`. 구현 범위는 `src/engine.js`, `test/engine.test.js`, `test/screen.test.js`다. 이 점검은 `.bmad-core/checklists/story-dod-checklist.md`를 끝까지 읽고 실행했다.
- 결과: `DoD: READY`. 적용되는 항목을 모두 다루었고 [N/A]는 각각 까닭이 있다.

## 프로젝트 정책 점검

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 새 주석은 언어와 유용한 계약 규칙을 따르고, 같은 파일의 예외를 새 파일에 옮기지 않음 | [x] | 추가된 줄에 ASCII가 아닌 글자가 없고 새 주석은 모두 영어이며 이유나 계약을 적는다. 새 파일이 없다. 근거: [dev-1.1](dev-1.1.md)의 주석 위생 절 |
| 작업과 기술 본문은 현재의 사실을 적고 편집 이력은 지정된 기록에 | [x] | 시작 커밋 이후 Story의 바뀐 곳은 Tasks / Subtasks 체크박스, Change Log, Dev Agent Record뿐이다(`git diff -U0 6741bd9 HEAD`의 구역으로 확인). Story, Acceptance Criteria, Dev Notes, Testing은 바꾸지 않았다. 코드와 시험 파일에 날짜, 작성자, 작업 이력이 없다 |
| PRD의 식별자와 승인된 뜻, QA 날짜와 결과, 법적 근거가 그대로 | [x] | 기준선과 HEAD의 `git diff --quiet`가 `docs/prd.md`, `docs/architecture.md`, `docs/planning/`, `README.md`, `package.json`에서 종료 상태 0이다. 이 Story에는 QA 기록과 법적 근거가 아직 없다 |
| Dev는 현재 시험 위반과 기준선 잔여를 실행 가능한 근거로 기록 | [x] | 새 시험에서 위반으로 확인된 것이 없다(추가된 줄의 후보 검색에 일치가 없고 문맥으로 읽음). 기준선 잔여는 검토자의 기준선 사본 검색에서 일치가 없었다. QA가 활성 `top_issues`와 위생 분류를 맡는다 |
| 기존 Story와 QA 기록을 정책 때문에 다시 만들지 않음 | [x] | 시작 커밋 이후 기존 기록(`sm-1`, `sm-2`, `po-r1`, `po-r2`)과 다른 Story의 기록을 바꾸지 않았다(`git diff --name-status 6741bd9 HEAD`가 이 Dev의 기록 둘과 코드와 시험 셋, Story만 보인다) |

## 점검 항목

### 1. 요구 충족

- [x] Story의 기능 요구를 모두 구현했다. 처리할 수 없는 깊이에서 `evaluate`가 `CalculationError`를 던지고 `renderScreen`이 오류 줄을 돌려준다.
- [x] 번호 없는 맥락을 포함해 AC를 모두 충족한다. AC와 시험의 대응:

| AC 또는 기준 | 시나리오 | 증거 |
| --- | --- | --- | 
| AC 1 오류 클래스 | bug-2-UNIT-001, bug-2-UNIT-003 | 엔진 시험 `throws a CalculationError for an expression nested too deeply`, `answers an expression near the depth the recursion can hold with its value or a CalculationError`. 처음 실행에서 RED(`RangeError`)를 보았고 GREEN이다 |
| AC 2 숫자 한도 없음과 값 | bug-2-UNIT-002, bug-2-UNIT-003, bug-2-INSP-001 | `evaluates deeply nested and very long expressions that fit`(깊이 1000과 긴 식의 값), 경계 부근 시험, 읽기에서 깊이 변수와 한도가 없음 |
| AC 3 까닭, 위치, 같은 메시지 | bug-2-UNIT-004, bug-2-UNIT-005 | `names a position inside an expression that is nested too deeply`(RED 후 GREEN), 까닭 시험, `gives the same message ... on repeated calls and with more frames on the call stack`, 원인 시험(RED 후 GREEN) |
| AC 4 화면의 오류 줄 | bug-2-UNIT-006 | 화면 시험 `returns an error line instead of throwing for an expression nested too deeply`(RED 후 GREEN) |
| AC 5 JSDoc | bug-2-INSP-001 | `evaluate`의 `@throws {CalculationError}`가 이 경우를 적는다. 판단 목록은 [dev-1.1](dev-1.1.md) |
| 회귀: 다른 오류는 그대로 던짐, 문자열이 아닌 입력 | bug-2-UNIT-007, bug-2-INSP-001 | 기존 시험 `throws what evaluate throws when that is not a calculation error`의 일곱 입력, 변형 점검에서 클래스를 가리지 않는 구현을 잡음 |
| 회귀: 기존 시험과 CI 규칙 | bug-2-INT-001, bug-2-INSP-002 | `node --test` 76개 통과, `node ci/screen-rule.check.mjs` 종료 상태 0, 바꾸지 않는 경로의 `git diff --quiet` 종료 상태 0 |

### 2. 코딩 표준과 프로젝트 구조

- [x] 새 코드와 바뀐 코드가 읽은 규칙 본문을 따른다. CC-JS-001(이름 규칙과 `const`만 사용, `var` 없음)과 CC-JS-002(두 칸 들여쓰기, 세미콜론, 큰따옴표)를 추가된 줄에서 확인했다(`var`와 작은따옴표 문자열을 찾은 검색에 일치가 없다). CC-JS-006(번역이 가능한 자리인 `evaluate`에서 잡고 `RangeError`만 번역하며 `cause`를 보존한다), CC-JS-003(모듈 책임, 내보내기는 그대로).
- [x] 파일 위치와 이름, 기술 버전이 Architecture의 해당 절과 맞는다([dev-2.1](dev-2.1.md)의 항목별 대조).
- [x] 바뀐 인터페이스가 수용된 설계와 현재 소스의 계약에 맞는다. `evaluate`의 인자와 값은 그대로이고 이 입력에서 던지는 오류의 클래스만 바뀐다.
- [x] 기본 보안 관행: 경계 입력 검사(`typeof`)는 `try` 밖에 그대로이고, 넓은 `catch`로 다른 오류를 가리지 않으며, 비밀과 새 입력 경로가 없다.
- [N/A] 프로젝트의 빌드, 경고 기준선, 린트 점검: `testing.lintCommands`가 비어 있고 `package.json`에 도구가 없으며 이 Story의 범위에 빌드 단계가 없다. 근거: `core-config.yaml`의 `testing`, `package.json`의 scripts.
- [x] 필요한 곳에 주석이 있다. 엔진의 `catch`에 왜 위치가 식의 시작인지, 시험에 왜 입력의 크기가 한도가 아닌지, 왜 근처 깊이가 두 결과를 받는지를 적었다. 자명한 문장을 적지 않았다.
- [x] 주석 위생 1: 새 주석이나 바뀐 주석에 Story, AC, 추적 ID가 없다. 추가된 줄의 후보 검색에 일치가 없다.
- [x] 주석 위생 2: 규칙 ID(`CL-GLD-*`, `CC-*`)가 없다. 같은 검색.
- [x] 주석 위생 3: 외부 라이브러리의 절대 경로 인용이 없다.
- [x] 주석 위생 4: 이 Story의 IN-FLIGHT 주석이 없다(`pending_after_story_done == 0`). `src`와 `test`에서 `IN-FLIGHT`를 찾은 검색에 일치가 없고 Story의 장부는 `[]`이다.
- [x] 주석 위생 5: 앞선 Story의 IN-FLIGHT 항목 가운데 이 Story의 정리 의무로 받은 것이 없다. 기준선 `9aea191`의 `src`와 `test`에서 `IN-FLIGHT`를 찾은 `git grep`에도 일치가 없다.

### 3. 시험

- [x] Story Testing과 읽은 규칙이 요구하는 단위와 통합 시험을 구현했다. 새 시험 8개(엔진 7개, 화면 1개)이고, 기존 시험은 화면 시험의 행 하나를 지웠고(사용자의 결정이 바꾼 기대), 까닭 시험에 입력 둘을 더했으며, 공백 시험이 도우미 `outcomeOf`를 쓰게 했다.
- [x] 변경 범위가 요구하는 점검이 최종 후보에서 통과한다. 프로젝트 루트의 `node --test` 76개 통과(실패 0, 취소와 건너뜀 0), `node ci/screen-rule.check.mjs` 종료 상태 0, bug-2-INSP-002 종료 상태 0. SubTask의 결과는 기록을 참조하고 다시 돌리지 않았으며, 최종 후보(HEAD `7051cad`)에서 전체 시험과 CI 규칙을 다시 돌렸다.
- [N/A] 시험 범위(coverage) 기준: 프로젝트에 정의된 기준이 없다. 근거: `core-config.yaml`의 `quality`와 `testing`에 범위 명령이 없다(CRAP도 측정 명령이 없어 측정하지 않음으로 기록).
- [x] SubTask의 접근과 시나리오 ID가 실제 증거에 대응한다. 1.1은 `TDD`로 RED, GREEN, Cleaner 결과(지적 4건과 처분), 정리 뒤 재점검을 [dev-1.1](dev-1.1.md)에 적었고 기준 통과 조각은 RED가 아니라 사후 민감도 점검으로 구별해 적었다. 2.1은 `verification-only`로 [dev-2.1](dev-2.1.md)에 대조 결과를 적었다. 최종 PASS에서 순서를 추정하지 않았다.

### 4. 기능과 검증

- [x] Story의 자동 점검과 해당하는 에이전트 검토 관찰로 기능을 확인했다. 자동 9개(UNIT 7, INT 1, INSP-002)와 agent-review 2개(INSP-001, INSP-003)가 모두 실행되었고 사용자만 할 수 있는 점검은 없다.
- [x] 경계와 오류 조건을 다루었다. 경계 부근의 깊이(2000 ~ 20000)에서 값 또는 `CalculationError`, 오류 뒤의 다음 호출, 다른 문제가 있는 식(앞뒤 글자가 있는 식, 닫지 않은 괄호), 호출 스택이 다른 호출의 같은 메시지, 문자열이 아닌 입력이다.

### 5. Story 관리

- [x] 계획한 Task와 SubTask(1.1, 2.1)가 완료되었고 ID, 체크박스, 검증, 커밋 결과가 저장된 작업과 맞는다. QA 수정 단위는 없다.
- [x] 개발 중의 결정은 Story의 Dev Agent Record와 기록 문서에 적었다(위치 0, 까닭 문구, 잡는 곳, 도우미의 이름표 인자, Cleaner 처분).
- [x] Dev Agent Record와 Completion Notes에 실제 변경, 점검, 한계, 다음 소유자를 적었다. Agent Identity는 실제 실행자를 적고 Change Log는 실제 변경을 적는다.
- [x] File List가 모든 바뀐 파일과 필요한 동반 파일을 담는다(`git diff --name-status`와 대조: 코드와 시험 셋, Story, 기록 문서 여섯과 이 점검의 기록).
- [x] 이어가기 로그에 이 Story의 임시 자료와 남은 QA 쓰임을 목록으로 적었다(다른 역할이 기록한 항목을 이어받아 Dev의 변형 점검 출력, Cleaner 작업 폴더, 점검 스크립트, 메시지 파일을 더했다). 병합 뒤 정리가 일회용 자료를 지운다. Story와 기록 문서에 임시 경로가 없다(`check-stage.sh records`가 종료 상태 0).

### 6. 의존성, 빌드, 설정

- [N/A] 설정된 빌드 점검: 빌드가 설정되어 있지 않다.
- [N/A] 설정된 린트 점검: 위와 같다.
- [N/A] 새 의존성: 없다. 내장 모듈만 쓰고 `package.json`을 바꾸지 않았다.
- [N/A] 새 의존성의 기록: 위와 같다.
- [N/A] 새 의존성의 알려진 취약점: 위와 같다.
- [N/A] 새 환경 변수나 설정: 없다.

### 7. 문서

- [x] 공개 API의 코드 안 문서: `evaluate`의 JSDoc `@throws {CalculationError}`가 새 경우와 그 오류의 위치와 원인을 적는다. `CalculationError`의 JSDoc은 새 오류에도 맞는다.
- [N/A] 사용자용 문서: 사용자에게 보이는 글(오류 줄의 낱말)은 늘었지만 사용자 문서가 이 줄을 설명하지 않는다. `README.md`는 저장소 설명과 시험 명령뿐이다.
- [N/A] 기술 문서(README, 구조도): 구조와 인터페이스가 바뀌지 않아 갱신할 문서가 없다. 근거: [dev-2.1](dev-2.1.md).

## 최종 확인

- 이 Story에서 이룬 일: 처리할 수 없는 깊이로 중첩된 식에서 `evaluate`가 `RangeError` 대신 `CalculationError`를 던지고, `renderScreen`이 `src/screen.js`를 바꾸지 않고도 `오류:` 줄을 돌려준다. 재귀 파서는 그대로이고 숫자 한도는 없다.
- [ ] 아님으로 둔 항목: 없다(적용되는 항목은 모두 [x]이고 [N/A]에 까닭이 있다).
- 기술 부채와 남은 일: 이 Story가 새로 가려낸 범위 밖 발견은 없다. 호출자가 스택을 거의 다 쓴 호출의 결과(N-6)는 Cleaner 검토자가 실행으로 다시 보였고 앞선 PO의 측정(PO1-N5)과 같은 사실이어서 새 future 기록을 만들지 않았다. 새 오류의 위치(N-1)와 까닭의 언어(N-2), 문자열이 아닌 입력의 오류 클래스(N-3), 경계 부근의 결과와 "순수 함수"의 관계(N-4), 스택 크기를 바꾼 실행과 다른 런타임(N-5)은 Story에서 열린 채이고 이 Dev가 정하지 않았다.
- 배운 것: 도우미가 식을 메시지에 그대로 넣으면 긴 입력의 실패 출력이 20만 글자가 되므로 이름표를 받는 선택 인자로 막았다. 시험이 가리지 못하는 틀린 변형(너무 넓은 `catch`, 빈 까닭)은 Story가 예고한 대로 bug-2-INSP-001의 읽기가 막는다.
- 이 Story는 Review로 넘길 준비가 되었다. QA 검토는 Dev의 점검과 다르며 아직 하지 않았다.
- [x] 나, 개발자 에이전트는 적용되는 모든 항목을 다루었음을 확인한다.
