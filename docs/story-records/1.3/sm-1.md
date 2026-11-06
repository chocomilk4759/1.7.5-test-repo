# sm-1 — 계산기 화면

- Story: [1.3](../../stories/1.3.story.md)
- Entry: SM Draft Checklist 1회
- 작성자와 실제 검토자: SM 하위 세션 Bob, 모델 `claude-opus-5-5`, `*run-story 1.2 1.3 remote to Done` run의 역할 작업
- 시각: 2026-11-06, 입력 확인 17:23 +0900, 초안 저장과 재측정 17:28 +0900 이후
- 입력 기준: `main` 40e1a6b. `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`, `docs/planning/future-work.md`, `src/engine.js`, `src/number-format.js`, `.github/workflows/ci.yml`, `ci/screen-rule.check.mjs`는 그 커밋과 차이가 없다(`git diff --stat HEAD` 출력 없음). Story와 이 기록은 커밋하지 않은 초안이다.
- 범위: Story 전체. 실행한 체크리스트는 `.bmad-core/checklists/story-draft-checklist.md`이고, 이 호출에서 한 번 실행했다.

## 범주 결과

| 범주 | 결과 | 근거 |
| --- | --- | --- |
| Project policy checks | PASS | 아래 "Project policy 항목별 근거" |
| 1. Goal & Context Clarity | PASS | Story 문장과 "결과와 범위": "`src/screen.js`가 `renderScreen`과 `SCREEN_WIDTH`를 내보내고". Epic 안의 자리, Story 1.1과의 관계, Story 1.2와 무관함을 적었다. 의존은 저장 줄 하나로 있고 Epic 항목과 같다 |
| 2. Technical Implementation Guidance | PASS | Dev Notes "인터페이스와 파일 위치"가 경로와 심볼을 표로 든다. Architecture 본문을 끝까지 읽었고(아래 "설계 입력 읽기"), "기술 제약"에 기술 구성과 설계 원칙의 제약을 옮겼다. 환경 변수는 쓰지 않는다. 사용자에게 보이는 동작이 라이브러리 함수뿐이라 문서 대조 대상을 `docs/architecture.md`, `README.md`로 적었고 내장 도움말이 없음을 `src/` 목록(`engine.js`, `number-format.js`만 있음)으로 확인했다 |
| 3. Reference Effectiveness | PASS | 참조는 `docs/prd.md#story-13-계산기-화면`, `docs/architecture.md#설계-원칙`처럼 섹션을 가리키고, 인용한 제목 7개가 대상 파일에 있음을 확인했다. Story 1.1의 기록은 Dev Notes "이전 Story"에 요약했고 Story 1.2의 PO와 QA 지적은 입력이 아니라 위험의 출처로 적었다. D-1, D-2의 적용 범위를 적었다. `docs/research`는 없다 |
| 4. Self-Containment Assessment | PASS | AC, 메인 세션의 답과 근거, 실행 요청 원문, 사용자의 저작권 답이 Story에 있다. 입력별 기대 결과가 Testing에 있다. 부모가 미리 정하라고 한 매개변수는 없다. 메인 세션의 답을 "추적" 표에서 SubTask와 시나리오로 이었고 합격과 보고의 경우가 서로 맞는다. AC의 합격 판정을 바꾸는 해석은 아래 "해석과 합격 판정"에서 따로 판정했다. Canonical Implementation Source: 부모가 지정한 절이 없어 N/A |
| 4.5. Comment Contract | PASS | Tasks, Dev Notes, Testing을 읽었다. Dev Notes: "Story, Task, AC, 시나리오, 표의 행, 결정의 번호는 코드, 주석, 테스트 이름, 오류 메시지에 넣지 않는다", "IN-FLIGHT 표시는 만들지 않는다". 새 IN-FLIGHT 지시와 기존 항목은 없다. 정책 ID는 Dev Notes의 글에만 있고 코드에 옮기라는 지시가 없다. 머리글에 시나리오 목록을 두라는 지시도 없다 |
| 5. Testing Guidance | PASS | 수준과 실행 방식은 시나리오 표에, 접근은 Task에 따로 있다. 아래 "개수와 추적 재확인" |

## Project policy 항목별 근거

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 새 주석의 언어와 쓸모 | PASS | Dev Notes "새 주석은 영어로 쓴다(CC-CMT-009)". `오류: `는 AC 2의 표시 글자라고 구별했다. 다른 파일의 언어 예외를 옮기지 않았다 |
| 현재 작업과 사실, 편집 이력 없음 | PASS | Tasks와 제목에 날짜나 회차가 없다. Testing의 "Draft 때 관찰한 사실"은 관찰임을 밝혔고 Dev가 다시 확인하고 기록하도록 적었다. 날짜는 수용 기록의 인용, SM 기록, Change Log에만 있다 |
| PRD 정체성과 승인된 뜻 | PASS | `docs/prd.md`를 바꾸지 않았다 |
| AC 일치 | PASS | PRD의 Story 1.3 항목과 Story의 AC 번호 줄을 `diff`로 비교해 차이 없음, 3개. 들여쓴 `Source:` 줄 3개. 부모 번호를 그대로 유지했고, 부모에 머리글과 표가 없다. Task 1이 AC 1~3을 받고 Testing이 각 AC를 덮는다 |
| 위반과 기존 잔여물 구분 | PASS | Dev Notes의 주석 위생 항목이 비교 기준과 대상을 정하고 바꾸지 않는 파일을 뺀다 |
| 기존 Story와 QA 기록 | PASS | Story 1.1의 파일과 gate, 브랜치 `story/1.2`의 기록을 읽기만 했고 다시 만들거나 옮기라고 지시하지 않는다 |
| 임시 자료 | PASS | 이 호출에서 만든 임시 자료는 메인 세션이 지정한 보고 파일과 소유권 사전 점검에 쓴 스냅샷 사본 하나다. 모두 프로젝트 임시 영역에 있고 이어가기 로그의 Story 1.3 섹션에 적었다. Story와 기록의 점검은 중간 파일 없이 파이프와 표준 입력으로 했다 |
| Story의 임시 자료 지시 | PASS | Dev Notes: "임시 자료는 프로젝트 임시 파일 정책(CL-GLD-OPS-008)을 따른다. Done까지 필요한 근거를 보존하고, 지우는 일은 병합이 확인된 뒤에". 경로를 적지 않았고 `BMAD_TEMP_PATTERN` 검색은 일치 없음 |
| 주석 위생 기준 | PASS | Dev Notes: 비교 기준은 Story 브랜치가 갈라진 기준 커밋, 대상은 `src/screen.js`, `test/screen.test.js`, 문맥 검토는 `.bmad-core/checklists/comment-hygiene-checklist.md` §3. 그 절("3. Post-Implementation Check")이 있음을 확인했다 |
| 승인 주장 | PASS | PRD와 Architecture의 "승인" 인용은 각 검토 기록의 일시, 주체, 대상을 그대로 옮겼고, 메인 세션의 답은 결정자를 메인 세션으로, 실행 요청과 저작권 답은 결정자를 사용자로 적었다. 인접 결정으로 넓히지 않았다 |
| 측정 합계와 소계 | PASS | 아래 "개수와 추적 재확인" |
| 작업 경계 | PASS | 파일은 경로로, 공개 인터페이스는 심볼로 적었다. "바꾸지 않음" 행의 여섯 파일을 경로로 들었다 |
| 출처와 위치 표기 | PASS | 파일과 섹션, 심볼, 설정 키, 테스트 이름으로 적었고 줄 번호를 쓰지 않았다 |
| 실행 가능성 주장 | PASS | 속성과 변이 점검을 계획하지 않은 까닭을 `testing.propertyCommands`, `testing.mutationCommands`, Architecture의 외부 패키지 금지에 묶었다. 가져오기 검색의 한계를 그 섹션에 적었다 |
| Task 문구 | PASS | SubTask는 심볼과 시나리오, 명령, 커밋 제목만 적고 구현식이 없다. 놓치기 쉬운 점은 Dev Notes에 있다 |
| 선택지 비교 표 없음 | PASS | 표 3의 받는 결과는 검증 표이고, 두 읽기는 글로 적었다 |
| Convention Sections 목록 | PASS | `convention-sections`는 Dev가 읽는 종류와 `testing-tdd`, `javascript-language`이고, `review-sections`는 `quality` 종류의 세 섹션과 `javascript-crap`이다. 모두 두 색인에 있다. 선언이 곧 읽었다는 증거는 아니므로 내가 읽은 본문은 아래에 따로 적었다 |
| 실행 비용 | PASS | Dev Notes에 적용 범위 판단을 적었다: `javascript-language`에 닿는 규칙이 없고 요구사항에 성능 기준이 없다 |

## 설계 입력 읽기

`docs/architecture.md`는 "기술 구성", "소스 트리", "설계 원칙", "검토 기록"까지 끝까지 읽었다. 저장한 Tasks와 Testing이 닿는 절은 앞의 세 절이고 모두 읽은 범위에 든다. 이 Story는 입출력 없는 순수 함수이므로 API, 데이터베이스, 브라우저 화면 주제는 Architecture에도 없고 해당하지 않는다. `docs/prd.md`, `docs/planning/decisions.md`, `docs/planning/future-work.md`, `src/engine.js`, `src/number-format.js`, `test/engine.test.js`, `test/number-format.test.js`, `.github/workflows/ci.yml`, `ci/screen-rule.check.mjs`, `package.json`, `README.md`도 끝까지 읽었다.

앞선 Story는 `docs/stories/1.1.story.md`와 `docs/story-records/1.1/sm-1.md`를 끝까지 읽었다. 브랜치 `story/1.2`(f18dcd9)는 `git show`로 Story의 Scope and Dependencies, Dev Notes, Testing의 "가져오기 검색", SM Draft Checklist, QA Results의 지적 줄과 gate의 앞부분, `po-r1.md`의 앞부분을 읽었다. 이 브랜치는 입력이 아니고 위험의 출처로만 썼다.

규칙은 `.bmad-core/tasks/load-project-rules.md`대로 읽었다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`.
- 읽지 않은 본문: `coding-principles`, `comments`, `crap`, `javascript-crap`. SM의 규칙 종류가 아니다. Story는 이 섹션들의 ID를 인용만 하며 Cleaner 검토와 QA가 적용한다. Story가 인용한 CC-CMT-010과 CL-GLD-001은 Story 1.2 QA 기록의 인용을 옮긴 것이고 본문을 대조하지 않았다.

## 해석과 합격 판정

| 항목 | 두 읽기와 각각의 판정 | Story의 처리 |
| --- | --- | --- |
| N-1 AC 3의 "공백" | 읽기 ㄱ(U+0020만, 엔진과 같음): `"\t"`, `"\n"`, U+00A0 하나는 `오류:` 줄이다. 읽기 ㄴ(다른 공백도): 빈 글자다. 하나로 고정한 점검이면 다른 읽기의 구현이 실패한다 | 표 3 U-1이 두 결과를 받아 Task와 합격 판정이 같다. 계획 결정이 남아 있으나 막지 않는다 |
| N-2 `{식}`의 앞뒤 공백 | 읽기 ㄱ(받은 그대로): `" 1 + 2  = 3"`. 읽기 ㄴ(앞뒤를 다듬음): `"1 + 2 = 3"`. 하나로 고정한 점검이면 다른 읽기의 구현이 실패한다 | 표 3 U-2가 두 결과를 받아 Task와 합격 판정이 같다. 계획 결정이 남아 있으나 막지 않는다 |
| N-3 `evaluate`에 넘기는 글자 | 읽기 ㄱ(받은 글자): `" 7 + a"`의 메시지는 위치 5이고 `"\t1 + 2"`는 오류 줄이다. 1.3-UNIT-005 통과. 읽기 ㄴ(다듬은 글자): 위치 4이고 값 줄이다. 1.3-UNIT-005 실패 | 판정이 갈린다. 수용된 글이 정한다고 보고 ㄱ으로 적었다. 근거: AC 1의 `renderScreen(expression)`, AC 2의 "식이 `CalculationError`를 던지면", D-1의 "식의 0부터 센 글자 위치". 확인을 요청한다 |
| N-4 메시지의 언어 | 읽기 ㄱ(`{메시지}`는 엔진의 `message` 그대로): 통과. 읽기 ㄴ(화면 글은 한국어): `src/engine.js`의 글자를 바꾸는 별도 Task가 필요하다 | 1.3-UNIT-004는 낱말을 고정하지 않아 두 읽기의 판정이 같다. 이 Story의 Task는 바뀌지 않는다 |
| N-5, N-6 다른 오류 | 지금 엔진은 `TypeError`와 `RangeError`를 던지고 AC 2가 "그대로 던진다"고 정한다. `CalculationError`로 정해지면 엔진을 바꾸는 별도 계획이 필요하고 T-1, T-2의 기대가 오류 줄로 바뀐다 | 지금 엔진에서 판정은 하나다. 클래스 이름과 낱말을 시험에 적지 않는다 |
| N-7 `name` | 값이 무엇이든 클래스로 가리면 판정이 같다 | 닿지 않는다 |
| N-8 폭 | 메인 세션의 답이 정했다 | R-4와 1.3-UNIT-003이 자르지 않음을 본다 |

Task 2.1은 두 읽기를 남기지 않도록 적었다. `docs/architecture.md`에 Change Log 절이 없고 `SCREEN_WIDTH`를 적는 일이 future-work 항목의 필요한 일에 있으므로, Dev는 이 Task에서 문서를 고치지 않고 표의 `src/screen.js` 행이 여전히 맞는지 본다.

## 개수와 추적 재확인

저장한 Story를 grep, awk, diff로 측정했다. 중간 파일은 만들지 않았다.

| 측정 | 대상과 방법 | 결과 |
| --- | --- | --- |
| 시나리오 행 | `1.3-`로 시작하는 표의 행, ID 중복 검사 | 15개, 중복 없음, 모든 행이 8열 |
| 수준 | 표의 Level 열 | unit 11, integration 1, inspection 3 |
| 우선순위 | 표의 Priority 열 | P0 4, P1 8, P2 3 |
| 실행 방식 | 표의 Execution 열 | automated 13, agent-review 2 |
| 실행 맵 | `test_design.execution`의 ID와 값을 표와 `diff` | ID와 방식이 모두 같음 |
| 요약 | Test Strategy Overview, `by_level`, `by_priority`, `by_execution` | 측정값과 같음 |
| 규칙 참조 | R-1 ~ R-4, E-0 ~ E-5, T-1, T-2, U-1, U-2가 표에 정의되어 있고 시나리오 행에서 참조되는가 | 14개 모두 정의와 참조가 있음. U-2의 입력 셋은 세 행으로 적었다 |
| SubTask와 시나리오 | SubTask 1.1은 1.3-UNIT-001 ~ 011, 1.3-INT-001, 1.3-INSP-001, 1.3-INSP-002, SubTask 2.1은 1.3-INSP-003 | 표의 Task 열이 14행은 1.1, 1행은 2.1로 같음. 각 점검이 해당 SubTask의 결과를 덮는지 표의 기대와 실패 기준으로 읽어 확인함 |
| 표의 열 | R, E, T 행 4열, U 행 6열 | 12행, 4행, 어긋남 없음 |
| R-4의 길이 | `awk` `length`, 식과 줄 | 식 48글자, 줄 53글자 |
| E-2 `7 +`의 줄 | `오류: `의 4글자와 메시지의 `length` | 46글자, `docs/planning/future-work.md`의 값과 같음 |
| future-work 항목 | `^## ` 줄과 `Planning: unplanned` 줄의 수, 제목별 처리 | 17개, 17개. Dev Notes의 처리가 13개를 이름 대고 "Story 1.1의 글에 관한 넷"이 나머지다 |
| 커밋 제목 | `git.taskCommitPattern`과 비교 | `[story-1.3] Task 1.1: 계산기 화면 구현`, `[story-1.3] Task 2.1: Architecture 정렬`이 패턴에 맞음 |
| 버전 | `package.json` 0.1.0, 설정에 버전 키 없음, `docs/`와 `README.md`에 버전 정책 없음 | 버전 변경 없음 |

표 1의 기대 글자는 손 계산이다. `toPrecision(12)`을 값마다 적용하면 `0.1 + 0.2`는 0.300000000000, `1 / 3`은 0.333333333333, `2 / 3`은 0.666666666667, `7 / 2`는 3.50000000000이고, 지수가 12 이상인 값은 지수 표기가 되어 `Number`를 거쳐 123456789012000, 1000000000000, 1e+21이 된다. 마지막 값은 ECMAScript의 수 글자 변환이 21자리를 넘으면 지수 표기를 쓰기 때문이다. 표 2와 표 3의 입력에서 `evaluate`가 던지거나 값을 돌려준다는 것은 `src/engine.js`의 `Parser`를 입력마다 따라가 추적했다. `D`의 `RangeError`는 `docs/planning/future-work.md`의 "아주 깊은 중첩"에 적힌 측정(괄호 깊이 3000부터)에 기댄다.

SM은 탐침 코드를 만들지 않으므로 이 값들을 Draft에서 실행하지 않았다. 처음 실행은 Dev의 조각이다. 기존 테스트에 대한 주장은 "화면 테스트가 없다"와 "기존 35개가 통과한다"뿐이며, `test/` 목록과 커밋 40e1a6b의 `node --test` 결과로 확인했다. 이 Draft는 기존 테스트가 새 동작을 잡는다고 주장하지 않는다.

가져오기 검색은 저장한 Story에서 명령과 두 목록을 읽어, `test -r`과 파일 인자를 빼고 목록을 표준 입력으로 주어 돌렸다. 통과할 줄 14개는 출력 없이 종료 상태 0이고, 잡을 줄 14개는 줄마다 따로 돌려 모두 종료 상태 1이다. `src/screen.js`가 없는 지금 `test -r`은 종료 상태 1이어서 파일이 없으면 통과하지 않는다. 제품 코드에 돌린 결과가 아니다.

## 실행한 명령과 결과

| 명령 | 결과 |
| --- | --- |
| `sh .bmad-core/utils/checks/check-instructions.sh` | 종료 상태 0 |
| `git switch --no-overwrite-ignore main` | 종료 상태 0, `story/1.2`에서 `main`으로 전환, 작업 트리 깨끗. 그 전 `ignored-aside.sh list main` 출력 없음 |
| `sh .bmad-core/utils/checks/check-merge.sh status 1.1 main` | 종료 상태 0, "merged 81c547c94a4e2dcbbf64e375909f3721b2933146 (the archive ref records its confirmed merge)" |
| `sh .bmad-core/utils/checks/check-stage.sh future --story 1.3` | 종료 상태 0, 출력 없음 |
| `node --test` (커밋 40e1a6b, Story 파일 작성 전) | 35개 통과 |
| `node --version` | v24.22.1 |
| `node ci/screen-rule.check.mjs` (커밋 40e1a6b, `src/screen.js` 없음) | 종료 상태 0, 판정 없음 |

아래 표는 Story와 이 기록을 저장한 뒤의 점검이다.

| 명령 | 결과 |
| --- | --- |
| `sh .bmad-core/utils/checks/check-stage.sh deps` | 종료 상태 0, `story 1.1 story none`, `story 1.2 epic none`, `story 1.3 story 1.1`, 지적 없음 |
| `sh .bmad-core/utils/checks/check-stage.sh records docs/stories/1.3.story.md` | 종료 상태 0, 출력 없음 |
| `BMAD_TEMP_PATTERN` 검색, Story와 이 기록 | 일치 없음 |
| `invisible-chars.awk`, Story와 이 기록 | 일치 없음 |
| `story-rules.awk` 모드 `status`, `key`, `tasks` | `Draft`, `1.3`, Task 2개 |
| 제목 대조 | Story가 인용한 PRD와 Architecture 제목 7개가 원문에 있음 |
| 줄 수 | 저장한 Story 449줄. `.bmad-core/tasks/create-next-story-style.md`의 구조 검토 기준 600줄 아래 |
| 소유권 사전 점검: 스냅샷의 사본으로 돌린 `check-owned.sh sm` | 종료 상태 0, 지적 없음. 메인 세션의 점검을 대신하지 않는다 |

## 수정과 재확인

같은 호출 안에서 저장한 글을 읽고 다음을 고쳤다. 고친 뒤 해당 부분을 다시 읽고 위 측정을 다시 했다.

- 표 2의 제목과 갈래 표의 참조: E-0이 오류 줄이 아니어서 제목을 "값 줄이 아닌 결과를 내는 입력"으로 바꾸고 참조를 맞췄다.
- 입력의 근거 문장: `ci/` 파일에 승인 기록이 있다고 읽히는 문장을 "각 입력의 근거는 표의 마지막 열에 있다"로 고쳤다.
- 표 3 판정 방법: 행 사이에 같은 읽기를 요구하지 않는 까닭을 적었다.
- 표 3 머리말: 다듬는 읽기가 바꿀 수 있는 것과 지킬 것을 적었다.
- 1.3-UNIT-006의 Seam: 기대 값을 얻는 `evaluate`를 뺐다. 시험이 부르는 대상은 `renderScreen`이다.
- E-4의 머리말: `"7 + a  "`에는 앞 공백이 없어 메시지가 다르다는 문장이 맞지 않으므로 앞 공백이 있는 두 입력으로 좁혔다.
- 보이지 않는 글자: 저장한 뒤 `invisible-chars.awk`가 Story의 세 줄과 이 기록의 한 줄에서 U+00A0을 찾았다. 나는 JavaScript 탈출 표기로 적었는데 파일 쓰기 도구가 실제 U+00A0과 U+3000으로 바꿔 저장한 것이다. CC-DOC-013대로 코드 포인트 이름으로 고치고 검색을 다시 돌려 일치 없음을 확인했다. 같은 일이 Dev에게도 생길 수 있어 Testing에 저장 뒤 확인을 적었다.

처음 쓴 awk 집계는 필드 구분자 때문에 열을 잘못 나눴다. Story의 문제가 아니라 측정 명령의 문제였고, 구분자를 `|`로 고쳐 다시 측정했다. 위 표는 다시 측정한 값이다.

체크리스트의 Execution deviations에 해당하는 일은 없었다.

## 비차단 메모의 근거

메모는 Story의 SM Draft Checklist에 있고, 각 메모의 판정은 위 "해석과 합격 판정"에 있다. N-1, N-2, N-4 ~ N-7의 항목은 사용자가 `unplanned`로 둔 future-work 항목에 담겨 있고 메인 세션이 답하지 않았다. N-3은 future-work에 없고 수용된 글을 그대로 읽은 것의 확인 요청이다. N-8은 메인 세션의 답이 그 항목에 남긴 부분이다.
