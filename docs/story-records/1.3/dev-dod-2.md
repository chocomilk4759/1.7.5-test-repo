# dev-dod-2 — Definition of Done 점검 2회(QA 수정 2회차)

- Story: [1.3](../../stories/1.3.story.md)
- Entry: Dev Definition of Done 점검 2회, QA 수정 2회차(QA 라운드 2, 다시 열기)를 마치고 Review로 넘기기 전
- 작성자와 실제 점검자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.2 1.3 remote` run의 역할 작업. effort는 시스템이 숫자 30으로만 알려 주어 설정의 이름(`xhigh`)과의 대응을 확인하지 못했다
- 시각: 2026-11-06 22:00 ~ 22:10 +0900
- 입력 기준: 브랜치 `story/1.3`, 단위 3.3의 커밋 `6bd260f`(HEAD). 이 라운드의 구현 범위는 `src/screen.js`(단위 3.1의 `f67f0c5`)와 `test/screen.test.js`(단위 3.2의 `a5eade8`, 3.3의 `6bd260f`)이고, 그 뒤의 편집은 Story와 이 기록뿐이다. 수정 라운드의 비교 기준은 `Story Base` 병합 커밋 `12da9b3`이고, 프로젝트가 정한 기준 tip은 `d90c99e`다. 점검 도구는 `.bmad-core/checklists/story-dod-checklist.md`(`tasks/execute-checklist.md`로 실행, 점검자는 Dev)다.
- 결과 정의: 체크리스트의 `[x] Done`, `[ ] Not Done`, `[N/A]`. 점검하지 않은 항목은 통과로 세지 않는다. 앞선 DoD 점검 1회([dev-dod-1](dev-dod-1.md))는 SubTask 1.1과 2.1의 인계 때의 결과이고 이 점검이 대신하는 것은 이 라운드가 바꾼 입력에 닿는 항목이다.

## 프로젝트 정책 점검

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 새 주석의 언어와 쓸모 | [x] | 이 라운드가 더한 주석은 `test/screen.test.js`의 영어 네 줄이다. 긴 오류 줄의 입력이 폭을 넘는 까닭과 위치 시험의 두 행이 다른 까닭을 말하며 단언과 맞는다(Cleaner 검토자 둘이 읽었다). `src/screen.js`는 주석을 바꾸지 않았다. 다른 파일의 예외를 옮기지 않았다 |
| 현재 작업과 사실, 편집 이력은 지정된 기록에 | [x] | Story에서 Dev가 바꾼 곳은 Change Log, Dev Agent Record(Agent Identity, Debug Log References, Completion Notes, File List)뿐이다. Story를 이 라운드 시작 전의 `e71238d`와 섹션별로 비교해 바뀐 섹션이 Change Log와 Dev Agent Record뿐이고 지운 줄이 없음을 확인했다. Status는 Review 전환에서 바꾼다 |
| PRD 정체성, QA 날짜와 결과, 법적 증거 | [x] | `docs/prd.md`, `docs/architecture.md`, `docs/planning`, `README.md`, `package.json`을 기준 tip `d90c99e`와 `git diff --quiet`로 비교해 차이 없음. gate `docs/qa/gates/1.3.yml`과 이 Story의 앞선 기록 문서 열한 개(SM, PO, QA, Dev의 앞선 기록)는 `e71238d`와 `git diff --quiet`로 비교해 차이 없음 |
| 현재 시험 위반과 기존 잔여물 구분 | [x] | 현재 시험 위반 없음. `test/screen.test.js`는 기준 tip에 없던 새 파일이어서 기존 잔여물이 없다. 활성 이슈의 분류는 QA의 몫 |
| 기존 Story와 QA 기록을 다시 만들지 않음 | [x] | 위의 비교대로다. 앞선 기록을 고쳐 쓰지 않고 정정은 Completion Notes의 새 항목에서 했다 |

## 체크리스트 항목

### 1. Requirements Met

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 기능 요구를 모두 구현함 | [x] | `renderScreen(expression)`과 `SCREEN_WIDTH`(값 48)를 `src/screen.js`에서 내보낸다(Story의 "인터페이스와 파일 위치"). 줄의 모양, 오류 줄, 다른 오류의 전달, 빈 글자는 이 라운드가 바꾸지 않았다 |
| AC와 구속력 있는 맥락을 충족함 | [x] | AC 1 ~ 3의 시험은 그대로 통과한다(`node --test`의 화면 시험 13개). 사용자의 결정 `SCREEN_WIDTH = 48`: 내보내기 시험과 `node ci/screen-rule.check.mjs` 종료 상태 0. 줄을 자르거나 접지 않음: "returns a line longer than the display whole"(값 줄 53글자와 오류 줄 49글자가 48보다 길고 그대로 나옴)과 1.3-INSP-002의 읽기 |

### 2. Coding Standards & Project Structure

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 새 코드가 규칙 본문을 따름 | [x] | 이 라운드의 코드 변경은 `src/screen.js`의 상수 값 한 줄과 시험 파일의 상수, 입력, 목록 줄, 단언 한 줄이다. 두 칸 들여쓰기, 세미콜론, 큰따옴표, 탈출 표기(CC-JS-001, 002). 시험 파일에 CR 바이트와 U+00A0의 실제 바이트가 0이다. 포매터는 설정되어 있지 않다 |
| 파일 위치와 이름, 기술 버전이 Architecture를 따름 | [x] | 아래 "Architecture 정렬의 재점검" |
| 바뀐 인터페이스가 승인된 설계와 현재 소스 계약에 맞음 | [x] | 내보내기가 `SCREEN_WIDTH`, `renderScreen` 둘뿐이다(내보내기 시험 통과). `renderScreen`의 결과는 바뀌지 않았다. `src/engine.js`와 `src/number-format.js`는 바뀌지 않았다 |
| 기본 보안(입력 검증, 오류 처리, 비밀 없음) | [x] | 제품 코드의 변경이 상수 값뿐이다. 문자열이 아닌 입력의 거절, 오류 처리, `eval` 없음은 그대로다 |
| 설정된 빌드, 경고 기준선, 린트 점검 | [N/A] | `testing.lintCommands`가 비어 있고 `package.json`에 빌드와 린트 스크립트가 없다. 시험 명령 `node --test`는 실행했다 |
| 필요한 곳에 주석 | [x] | 위의 주석 네 줄. 문장마다 설명하지 않았다 |
| 주석 위생 1: Story나 AC 번호 없음 | [x] | 후보 검색(§1.1)을 수정 라운드 기준 `12da9b3`부터 현재까지 추가된 열 줄과 두 파일 전체에 실행해 일치 없음 |
| 주석 위생 2: 전역 규칙 ID 없음 | [x] | 같은 검색에 `CL-GLD-`와 `CC-` 패턴이 들어 있고 일치 없음 |
| 주석 위생 3: 금지된 외부 절대 경로 인용 없음 | [x] | 기계 고유 경로와 임시 영역 이름 검색(§1.3)에 일치 없음 |
| 주석 위생 4: 이 Story의 IN-FLIGHT 주석이 모두 해결됨 | [x] | `IN-FLIGHT` 검색 일치 없음, 원장은 비어 있음, `pending_after_story_done == 0` |
| 주석 위생 5: 이전 Story의 IN-FLIGHT 항목 | [x] | 기존 IN-FLIGHT 항목이 없다. `commentHygiene.preservedComments`도 비어 있어 지킬 예외가 없다 |

주석 위생 §3은 `{codeChanges}`(`src/screen.js`)와 `{testChanges}`(`test/screen.test.js`)의 수정 라운드 기준 `12da9b3`부터 현재 저장된 내용까지에 실행했다. 이 기준은 커밋한 단위와 작업 트리를 모두 덮는다. 후보 검색은 §1.1, §1.2의 접두 질의와 Story의 시나리오, 표, 지적 ID(`1.3-UNIT-`, `PO1-N`, `E-`, `R-`, `N-`, `U-`, `T-`, `D-`) 꼴, §1.4, §1.7이고 모두 0건이다. 추가된 줄은 값 한 줄, 상수 한 줄, 영어 주석 네 줄, 입력과 목록 줄이며 문맥을 읽어 위반이 없음을 확인했다. 시험 이름은 실제 단언과 맞는다. 정정이 필요한 위반이 없어 CP-6.5의 되돌림은 없었다. 이 검색은 실행한 방법이지 주석의 쓸모에 대한 증명이 아니며 쓸모와 단언 정확성은 Cleaner 검토자 셋과 Dev의 읽기가 판단했다.

### 3. Testing

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| Story Testing과 규칙이 요구하는 단위 시험 구현 | [x] | 화면 시험 13개가 1.3-UNIT-001 ~ 010을 덮는 것은 이 라운드가 줄이지 않았다. 1.3-INT-001은 `node ci/screen-rule.check.mjs`로, 1.3-UNIT-011은 기준 tip과의 `git diff`와 기존 시험 55개의 통과로 확인했다. 새 시험 파일이나 시험 이름의 추가는 없고 기존 시험의 입력과 행을 고쳤다 |
| 최종 후보에서 필수 점검이 통과함 | [x] | `6bd260f` 상태에서 프로젝트 루트의 `node --test`: 68개 통과(기존 55개와 화면 13개), 실패 0, 취소와 건너뜀 0. `node ci/screen-rule.check.mjs` 종료 상태 0. 1.3-INSP-001 종료 상태 0. 1.3-INSP-002는 `src/screen.js`를 끝까지 읽고 통과. 1.3-UNIT-011: 기존 여섯 파일과 `src/units.js`, `test/units.test.js`가 `d90c99e`와 차이 없음. 1.3-INSP-003은 아래 재점검 |
| 시험 범위가 프로젝트 기준을 충족함(정해진 경우) | [N/A] | 프로젝트가 정한 범위 기준이 없다. CRAP은 측정하지 않았다(`quality.crap.commands`가 비어 있음) |
| SubTask의 접근과 시나리오 ID가 실제 증거에 대응함 | [x] | 단위 3.1 [dev-3.1](dev-3.1.md): `TDD`, 1.3-INT-001의 RED(병합 커밋 뒤 규칙 종료 상태 1과 `got 40`)와 GREEN(값 변경 뒤 종료 상태 0), Cleaner 검토자의 지적 없음. 단위 3.2 [dev-3.2](dev-3.2.md): `verification-only`, 변경 전 시험의 민감도, 변경 뒤 값 줄과 오류 줄을 48글자에서 자르는 변형의 실패, Cleaner 지적 없음. 단위 3.3 [dev-3.3](dev-3.3.md): `verification-only`, 두 행의 변형 점검, Cleaner 지적 한 건(F-1)의 처분과 정정 뒤 점검. 앞선 SubTask 1.1, 2.1의 증거는 dev-1.1, dev-2.1에 있다. 기록한 민감도 점검은 사후의 점검이고 Dev의 TDD RED가 아니다. 최종 PASS로 RED를 추정하지 않았다 |

### 4. Functionality & Verification

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| Story의 자동 점검과 agent-review 관찰로 기능을 확인함 | [x] | 자동 점검: 1.3-UNIT-001 ~ 011(`node --test`), 1.3-INT-001, 1.3-INSP-001. agent-review: 1.3-INSP-002, 1.3-INSP-003을 다시 읽었다. 사용자 전용 시나리오는 없다 |
| 경계 조건과 오류 상황을 다룸 | [x] | 이 라운드가 더한 경계: 폭 48을 넘는 값 줄과 오류 줄(위치 네 자리), 끝 공백으로 위치가 밀리는 오류, CR이 섞인 식. 앞선 라운드의 경계(빈 식, 0으로 나누기, 짝 없는 괄호, 유한하지 않은 수, 문자열이 아닌 입력, 아주 깊은 중첩, 호출 사이의 상태)는 그대로 통과한다 |

### 5. Story Administration

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 계획 Task와 단위의 ID, 체크박스, 증거, 커밋이 저장된 일과 같음 | [x] | 계획 Task 1, 2와 SubTask 1.1, 2.1은 앞선 체크 그대로다. QA 수정 단위 3.1, 3.2, 3.3이 Completion Notes에 체크되어 있고 커밋 `f67f0c5`, `a5eade8`, `6bd260f`와 같다. 시작 병합 커밋 `12da9b3`, 결정 목록 커밋 `8579e5a`. 미완료 단위가 없다. 계획 Task의 body에 QA 수정 Task를 더하지 않았다 |
| 개발 중의 해석과 결정이 문서화됨 | [x] | 수정 단위 3.3의 줄바꿈 단언을 CR까지 보게 한 해석(F-1)은 dev-3.3에, 시험 행 둘의 선택은 dev-3.3과 dev-qa-r2에, DEV-1의 정정은 Completion Notes에 있다 |
| Dev Agent Record와 Completion Notes에 실제 변경, 점검, 한계, 다음 소유자가 있고 Agent Identity가 실제와 같음 | [x] | Completion Notes의 QA 수정 2회차 시작 항목, 단위 줄 셋, DEV-1 정정, TEST-001 항목, Review 인계. Agent Identity에 이 라운드의 Dev와 Cleaner 검토자 셋의 모델이 있다. 다음 소유자는 QA(`review-story.md`, 새 세션의 전체 리뷰) |
| File List가 변경, 새 파일, 필요한 동반 파일을 모두 포함함 | [x] | `src/screen.js`, `test/screen.test.js`, Story, 이 라운드의 새 기록 문서 다섯(dev-qa-r2, dev-3.1, dev-3.2, dev-3.3, 이 기록)과 QA, SM, PO가 더한 기록, 병합 커밋이 들여온 파일의 구분, 바뀌지 않은 파일 여덟을 `git diff`로 확인한 증거. 기준 tip과 다른 경로는 이 Story의 파일뿐임을 `git diff --name-only d90c99e HEAD`로 확인했다 |
| 이어가기 로그에 이 Story의 임시 자료가 목록으로 있고 Story에는 임시 경로가 없음 | [x] | 로그의 Story 1.3 섹션에 이 라운드의 Dev 자료(작업 폴더, 변형 사본, 후보 시험 파일, 스크립트, 커밋 메시지 파일, Cleaner 검토자 세 곳의 폴더와 그 상태 파일)와 남은 QA 쓰임을 적었다. 다른 역할이 기록한 항목은 그대로 두었다. `check-stage.sh records`와 Story의 임시 경로 검색에 일치가 없다 |

### 6. Dependencies, Build & Configuration

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 설정된 빌드 점검이 통과함 | [N/A] | 설정된 빌드 점검이 없다 |
| 설정된 린트 점검이 통과함 | [N/A] | `testing.lintCommands`가 비어 있다 |
| 새 의존성이 승인된 것이거나 승인이 기록됨 | [N/A] | 새 의존성이 없다(`package.json`이 기준 tip과 같다) |
| 새 의존성의 기록 | [N/A] | 해당 없음 |
| 새 의존성의 알려진 취약점 | [N/A] | 해당 없음 |
| 새 환경 변수나 구성의 문서화 | [N/A] | 새 환경 변수와 구성이 없다 |

### 7. Documentation

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 새 공개 API의 인라인 문서 | [N/A] | 새 공개 API가 없다. `SCREEN_WIDTH` 위의 설명과 `renderScreen`의 JSDoc은 값에 기대지 않아 바꾸지 않았다 |
| 사용자 문서 갱신 | [N/A] | 사용자가 읽는 문서에 영향이 없다. `README.md`는 화면 모듈을 서술하지 않는다 |
| 기술 문서 갱신 | [N/A] | 아래 재점검에서 고칠 문서가 없었다. `SCREEN_WIDTH`가 소스 트리 표에 없는 틈은 Story의 N-8에 따라 future-work 항목에 남는다 |

## QA 수정 검증

`apply-qa-fixes-validate.md` STEP 1 ~ 4다. Node.js v24.22.1, 프로젝트 루트, HEAD `6bd260f`, 작업 트리에 이 기록과 Story의 편집 외 변경 없음.

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 전체 시험 | `node --test` | 종료 상태 0, 68개 통과, 실패 0 |
| 1.3-INT-001 | `node ci/screen-rule.check.mjs` | 종료 상태 0, 출력 없음 |
| 1.3-INSP-001 | Story의 가져오기 검색 명령(저장된 글에서 뽑아 실행) | 종료 상태 0, 출력 없음 |
| 1.3-INSP-002 | `src/screen.js`를 끝까지 읽음 | 결과는 `evaluate`와 `formatNumber`로 만든다. 입출력, 전역 상태, 호출 사이에 바뀌는 모듈 변수가 없다. `SCREEN_WIDTH`는 선언에만 나오고 줄의 모양에 쓰이지 않으며 줄을 자르거나 접는 코드가 없다. 잡은 오류를 `throw error;`로 그대로 던진다 |
| 1.3-UNIT-011 | `git diff --quiet d90c99e HEAD`로 여덟 파일(`src/engine.js`, `src/number-format.js`, `src/units.js`, `test/engine.test.js`, `test/number-format.test.js`, `test/units.test.js`, `ci/screen-rule.check.mjs`, `.github/workflows/ci.yml`) | 종료 상태 0. PO2-N1이 짚은 병합으로 들어온 `src/units.js`와 `test/units.test.js`도 포함해 확인했다 |
| 기준 tip과 다른 경로 | `git diff --name-only d90c99e HEAD` | gate, Story, 기록 문서 열다섯 개(이 기록은 저장 전이어서 세지 않음), `src/screen.js`, `test/screen.test.js`뿐이다. 다른 Story의 파일이나 코드가 바뀌지 않았다 |
| 주석 위생 | 위 항목 2의 §3 | 후보 0건, 위반 0건 |
| 강화한 단언의 민감도 | dev-3.2, dev-3.3의 변형 사본 | 값 줄 자르기, 오류 줄 자르기, 까닭을 줄인 엔진, 끝 공백 지우기, CR 지우기, 메시지에 LF 끼우기, CR 끼우기가 모두 한 시험 이상에서 실패하고 전달된 모듈은 13개 통과 |
| CRAP | 측정하지 않음 | `quality.crap.commands`가 비어 있다. 통과도 차단도 아니다. 이 라운드는 제품의 분기를 바꾸지 않았다 |

## Architecture 정렬의 재점검

`architecture-align.md`다. 이 라운드의 변경은 `SCREEN_WIDTH`의 값과 시험 파일의 입력, 행, 단언이어서 앞선 SubTask 2.1의 결과(dev-2.1)가 이 입력에 자동으로 닿지 않는다고 보고 다시 대조했다.

- 읽은 문서: `docs/architecture.md`의 기술 구성, 소스 트리, 설계 원칙과 `README.md`.
- 기술 구성: ES 모듈, Node.js 24, 내장 모듈만, `node:test`와 `node:assert/strict`. 새 의존성이 없고 `package.json`이 기준 tip과 같다.
- 소스 트리: `src/screen.js`의 행(계산기 화면, `renderScreen`)과 `test/{모듈}.test.js`의 행이 여전히 맞다. 파일을 더하거나 옮기지 않았다.
- 설계 원칙: 공개 함수는 순수 함수이고 입출력이나 전역 상태가 없다(INSP-002의 읽기). `src/screen.js`는 `src/engine.js`와 `src/number-format.js`만 가져온다(1.3-INSP-001 종료 상태 0). 오류 클래스와 엔진의 규칙은 바뀌지 않았다.
- 결론: 어긋남이 없고 바꾼 문서가 없다(no-change). `docs/architecture.md`와 `README.md`는 기준 tip과 차이가 없다. `SCREEN_WIDTH`와 폭을 넘는 줄의 처리, 코딩 표준 절, Change Log 절이 Architecture에 없는 틈은 Story의 N-8과 future-work 항목 "CI 규칙이 계획 문서에 없음"이 든다. 이 라운드가 값을 48로 바꾸어도 틈은 그대로이고 Task 2.1처럼 이 Story가 고치지 않는다. 같은 틈이 이 다시 열기의 근본 원인이었다는 점은 QA의 위험 평가(qa-r2)와 그 항목의 "더한 사실"이 든다.

## 지적과 결정의 대조

| ID | 결정 | 결과 | 줄 |
| --- | --- | --- | --- |
| REQ-001 | 고친다 | 단위 3.1(`SCREEN_WIDTH` 48, RED와 GREEN), 단위 3.2(시험의 폭과 입력). 필수 점검 1.3-INT-001이 기준 tip의 규칙에서 통과 | `Treatment: REQ-001 fix` |
| REQ-002 | SM이 고쳤고 PO가 GO로 재검증함 | Dev가 한 일 없음. 계획의 숫자(`W`의 1000글자와 49글자, 값 줄 53글자)를 코드로 확인했다(dev-qa-r2) | `Treatment: REQ-002 fix` |
| TEST-001 | Dev가 적용을 고름 | 단위 3.3. 앞선 `future` 결정을 대신한다 | `Treatment: TEST-001 fix` |
| DEV-1 | future | 기록의 글을 Completion Notes의 정정 항목으로 바꾸었다. 폭 48과 입력 `W`, 줄 49글자와 35글자 | `Treatment: DEV-1 future` |
| PO2-N1 ~ PO2-N4 | PO2-N2는 적용(단위마다 Cleaner 검토), 나머지는 계획의 글이어서 적용하지 않음 | PO2-N1은 위 UNIT-011 확인으로 값만 재확인했다. 지적 자체는 PO Validation에 남는다 | 없음 |

계획의 `Treatment:` 줄은 Completion Notes 끝의 줄들이다. 원래 QA의 처분(`required`, `optional`)과 `rework`, `rework`, 계약 안의 경로, 심각도와 확신은 바꾸지 않았다. 닫는 일은 QA의 다음 리뷰다.

## 최종 확인

- 이 라운드에서 이룬 것: 기준 tip을 `Story Base` 병합 커밋으로 들여왔고, `SCREEN_WIDTH`를 48로 바꾸어 필수 점검 1.3-INT-001이 기준 tip의 규칙에서 통과하며, 시험의 폭과 긴 오류 줄의 입력을 계획대로 고쳤고, TEST-001의 두 행과 줄바꿈 단언의 정정을 더했다. `node --test` 68개와 `node ci/screen-rule.check.mjs`가 통과한다.
- 완료하지 못한 항목: 없다. [N/A]는 각각 까닭이 있다(빌드, 린트, 범위 기준이 설정되지 않음, 새 의존성 없음, 사용자와 기술 문서 갱신 필요 없음, 새 공개 API 없음).
- 기술 부채와 후속 일: DEV-1(오류 줄의 길이 단언이 엔진의 까닭 글자에 기댐)은 future 기록이다. 이 Story가 새로 가려낸 범위 밖 발견은 이 밖에 없다. CRAP 측정과 저작권, SPDX 값은 이미 future-work 파일의 항목이 들고 있다. 서비스 CI가 같은 점검을 어떻게 읽는지는 수정 뒤의 병합 작업이 읽는다.
- 배운 점: 단언을 더하면 같은 시험의 기존 단언이 새 입력에 닿아 이름이 말하는 만큼 단언하는지 다시 보아야 한다. 새 CR 행에 걸린 줄바꿈 단언이 LF만 보던 것을 Cleaner 검토자가 짚었다. 값 하나를 바꾸는 수정도 그 값에 기댄 시험의 입력을 같이 봐야 한다. 단위 3.2의 입력이 `7 +`의 46글자로는 오류 줄 쪽 변형을 가리지 못했다.
- 검토 준비: Review로 넘길 준비가 되었다. 이 점검은 Dev의 자체 점검이며 QA 검토가 아니다. QA가 정한 대로 다음 리뷰는 새 세션의 전체 리뷰다.
