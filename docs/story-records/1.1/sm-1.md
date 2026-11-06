# sm-1 — 계산 엔진

- Story: [1.1](../../stories/1.1.story.md)
- Entry: SM Draft Checklist 1회
- 작성자와 실제 검토자: SM 하위 세션 Bob, 모델 `claude-opus-5-5`, `*run-story 1.1` run의 역할 작업
- 시각: 2026-11-06, 초안 작성 전 입력 확인 09:30 +0900, 저장한 초안의 점검 09:36 +0900
- 입력 기준: `main` 862f5fd. `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`, `docs/planning/future-work.md`는 그 커밋과 차이가 없다(`git diff --stat HEAD` 출력 없음). Story와 이 기록은 커밋하지 않은 초안이다.
- 범위: Story 전체. 실행한 체크리스트는 `.bmad-core/checklists/story-draft-checklist.md`이고, 이 호출에서 한 번 실행했다.

## 범주 결과

| 범주 | 결과 | 근거 |
| --- | --- | --- |
| Project policy checks | PASS | 아래 "Project policy 항목별 근거" |
| 1. Goal & Context Clarity | PASS | Story 문장과 Scope and Dependencies의 "결과와 범위": "`src/engine.js`가 `evaluate`와 `CalculationError`를 내보내고". Epic 안의 자리와 Story 1.3의 사용 관계를 적었다. 의존은 저장 줄 하나로 있고 Epic 항목과 같다 |
| 2. Technical Implementation Guidance | PASS | Dev Notes "인터페이스와 파일 위치"가 경로와 심볼을 표로 든다. Architecture 본문을 끝까지 읽었고(아래 "설계 입력 읽기"), Dev Notes "기술 제약"에 기술 구성과 설계 원칙의 제약을 옮겼다. 환경 변수는 쓰지 않는다. 사용자에게 보이는 동작이 라이브러리 함수뿐이라 문서 대조 대상을 `docs/architecture.md`, `README.md`로 적었고 내장 도움말이 없음을 `src/` 목록(`number-format.js`만 있음)으로 확인했다 |
| 3. Reference Effectiveness | PASS | 참조는 `docs/prd.md#story-11-계산-엔진`, `docs/architecture.md#설계-원칙`처럼 섹션을 가리키고, 각 제목은 대상 파일에 있음을 확인했다. 이전 Story는 없다. D-1은 적용, D-2는 영향 범위가 Story 1.2라 미적용이라고 적었다. `docs/research`는 없다 |
| 4. Self-Containment Assessment | PASS | AC, D-1 원문, 실행 요청 원문이 Story에 있다. 문법과 입력별 기대 결과가 Testing에 있다. 부모가 정해 두라고 한 매개변수는 없고 D-1이 해석을 정한다. D-1 다섯 내용을 Testing "결정 D-1의 추적"에서 SubTask와 시나리오로 이었다. Canonical Implementation Source: 부모가 지정한 절이 없어 N/A |
| 4.5. Comment Contract | PASS | Tasks, Dev Notes, Testing을 읽었다. Dev Notes: "Story, Task, AC, 시나리오, 결정의 번호는 코드, 주석, 테스트 이름, 오류 메시지에 넣지 않는다", "IN-FLIGHT 표시는 만들지 않는다". 새 IN-FLIGHT 지시와 기존 항목은 없다. 정책 ID는 Dev Notes의 글에만 있고 코드에 옮기라는 지시가 없다. 테스트 머리글에 시나리오 목록을 두라는 지시도 없다 |
| 5. Testing Guidance | PASS | 수준과 실행 방식은 시나리오 표에, 접근은 Task에 따로 있다. 아래 "개수와 추적 재확인" |

## Project policy 항목별 근거

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 새 주석의 언어와 쓸모 | PASS | Dev Notes "새 주석은 영어로 쓴다(CC-CMT-009)". 다른 파일의 언어 예외를 옮기지 않았다 |
| 현재 작업과 사실, 편집 이력 없음 | PASS | Tasks와 제목에 날짜나 회차가 없다. Testing의 "Draft 때 커밋 862f5fd에서 관찰한 사실"은 관찰임을 밝혔고 Dev가 다시 확인하도록 적었다. 날짜는 수용 기록의 원문과 SM 기록, Change Log에만 있다 |
| PRD 정체성과 승인된 뜻 | PASS | `docs/prd.md`를 바꾸지 않았다 |
| AC 일치 | PASS | PRD의 Story 1.1 항목과 Story의 AC 번호 줄을 `diff`로 비교해 차이 없음, 4개. 들여쓴 Source 줄 4개. 부모 번호를 그대로 유지했고, AC 앞뒤 글과 표는 부모에 없다. Task 1이 AC 1~4를 받고 Testing이 각 AC를 덮는다 |
| 위반과 기존 잔여물 구분 | PASS | Dev Notes의 주석 위생 항목이 비교 기준과 대상을 정하고 바꾸지 않는 파일을 뺀다 |
| 기존 Story와 QA 기록 | N/A | 이 Story 전에 Story와 QA 기록이 없다(`docs/stories`, `docs/story-records` 없음, `docs/qa` 없음) |
| 임시 자료 | PASS | 이 호출에서 만든 임시 파일은 메인 세션이 지정한 보고 파일 하나다. 프로젝트 임시 영역에 있고 이어가기 로그의 Story 1.1 섹션에 적었다. 점검은 중간 파일 없이 파이프로 했다 |
| Story의 임시 자료 지시 | PASS | Dev Notes: "임시 자료는 프로젝트 임시 파일 정책(CL-GLD-OPS-008)을 따른다. Done까지 필요한 근거를 보존하고, 지우는 일은 병합이 확인된 뒤에". 경로를 적지 않았고 `BMAD_TEMP_PATTERN` 검색은 일치 없음 |
| 주석 위생 기준 | PASS | Dev Notes: 비교 기준은 Story 브랜치가 갈라진 기준 커밋, 대상은 `src/engine.js`, `test/engine.test.js`, 문맥 검토는 `.bmad-core/checklists/comment-hygiene-checklist.md` §3 |
| 승인 주장 | PASS | PRD와 Architecture의 "승인" 인용은 각 검토 기록의 일시, 주체, 대상을 그대로 옮겼고 실행 요청은 원문으로 적었다. 인접 결정으로 넓히지 않았다 |
| 측정 합계와 소계 | PASS | 아래 "개수와 추적 재확인" |
| 작업 경계 | PASS | 파일은 경로로, 공개 인터페이스는 심볼로 적었다 |
| 출처와 위치 표기 | PASS | 파일과 섹션, 심볼, 설정 키, 테스트 이름으로 적었고 줄 번호를 쓰지 않았다 |
| 실행 가능성 주장 | PASS | 속성과 변이 점검을 계획하지 않은 까닭을 `testing.propertyCommands`, `testing.mutationCommands`, Architecture의 외부 패키지 금지에 묶었다 |
| Task 문구 | PASS | SubTask는 심볼과 시나리오, 명령, 커밋 제목만 적고 구현식이 없다. 수 변환 함수의 주의점은 Dev Notes에 있다 |
| 선택지 비교 표 없음 | PASS | 표 2의 후보 집합은 검증 표이고, 제안 규칙은 Dev Notes의 글로 적었다 |
| Convention Sections 목록 | PASS | `convention-sections`는 Dev가 읽는 종류와 `testing-tdd`, `javascript-language`이고, `review-sections`는 `quality` 종류의 세 섹션과 `javascript-crap`이다. 모두 두 색인에 있다. 선언이 곧 읽었다는 증거는 아니므로 내가 읽은 본문은 아래에 따로 적었다 |
| 실행 비용 | PASS | Dev Notes에 적용 범위 판단을 적었다: `javascript-language`에 닿는 규칙이 없고 요구사항에 성능 기준이 없다 |

## 설계 입력 읽기

`docs/architecture.md`는 "기술 구성", "소스 트리", "설계 원칙", "검토 기록"까지 끝까지 읽었다. 저장한 Tasks와 Testing이 닿는 절은 앞의 세 절이고 모두 읽은 범위에 든다. 이 Story는 입출력 없는 순수 함수이므로 API, 데이터베이스, 화면 주제는 Architecture에도 없고 해당하지 않는다. `docs/prd.md`는 끝까지 읽었고, `docs/planning/decisions.md`와 `docs/planning/future-work.md`도 끝까지 읽었다.

규칙은 `.bmad-core/tasks/load-project-rules.md`대로 읽었다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`.
- 읽지 않은 본문: `coding-principles`, `comments`, `crap`, `javascript-crap`. SM의 규칙 종류가 아니다. Story는 이 섹션들의 ID를 인용만 하며 Cleaner 검토와 QA가 적용한다.

## 개수와 추적 재확인

저장한 Story를 grep, awk, diff로 측정했다. 중간 파일은 만들지 않았다.

| 측정 | 대상과 방법 | 결과 |
| --- | --- | --- |
| 시나리오 행 | `1.1-` 로 시작하는 표의 행, ID 중복 검사 | 20개, 중복 없음, 모든 행이 8열 |
| 수준 | 표의 Level 열 | unit 16, inspection 4 |
| 우선순위 | 표의 Priority 열 | P0 5, P1 12, P2 3 |
| 실행 방식 | 표의 Execution 열 | automated 17, agent-review 3 |
| 실행 맵 | `test_design.execution`의 ID와 값을 표와 `diff` | ID와 방식이 모두 같음 |
| 요약 | Test Strategy Overview, `by_level`, `by_priority`, `by_execution` | 측정값과 같음 |
| 규칙 참조 | V-1 ~ V-10, E-1 ~ E-12가 표에 하나씩 정의되어 있고 시나리오 행에서 참조되는가 | 22개 모두 정의 1개, 참조 1개 이상 |
| SubTask와 시나리오 | SubTask 1.1은 1.1-UNIT-001 ~ 016과 1.1-INSP-001 ~ 003, SubTask 2.1은 1.1-INSP-004 | 표의 Task 열이 19행은 1.1, 1행은 2.1로 같음. 각 점검이 해당 SubTask의 결과를 덮는지 표의 기대와 실패 기준으로 읽어 확인함 |
| 위치 값 | 표 2의 각 식에서 글자를 0부터 세어 후보 위치를 손으로 계산하고, 글자 36개는 awk `index`로, 식 길이 9개는 `length`로 다시 셈. 식의 숫자와 후보가 겹치지 않는지 읽어 확인 | 일치, 겹침 없음. `index`가 첫 글자를 찾아 `(7))`와 `7 + +8`만 다른 값을 냈고, 표의 값은 그 식의 둘째 글자가 맞다 |
| 커밋 제목 | `git.taskCommitPattern`과 비교 | `[story-1.1] Task 1.1: 계산 엔진 구현`, `[story-1.1] Task 2.1: Architecture 정렬`이 패턴에 맞음 |
| 버전 | `package.json` 0.1.0, 설정에 버전 키 없음, `docs/`와 `README.md`에 버전 정책 없음 | 버전 변경 없음 |

시나리오의 기대 값은 손 계산과 IEEE 754 값이다. SM은 탐침 코드를 만들지 않으므로 Draft에서 실행하지 않았다. 기존 테스트에 대한 주장은 "엔진 테스트가 없다"와 "기존 4개가 통과한다"뿐이며, `test/` 목록과 `test/number-format.test.js` 본문, 커밋 862f5fd의 `node --test` 결과로 확인했다. 이 Draft는 기존 테스트가 새 동작을 잡는다고 주장하지 않는다.

## 실행한 명령과 결과

| 명령 | 결과 |
| --- | --- |
| `sh .bmad-core/utils/checks/check-instructions.sh` | 종료 상태 0 |
| `sh .bmad-core/utils/checks/check-stage.sh future --story 1.1` | 종료 상태 0, 알림: "결과 복사" 항목의 Revisit 날짜 도래. PO triage 대상이며 메인 세션이 이미 기록했다 |
| `node --test` (커밋 862f5fd, Story 파일 작성 전) | 4개 통과 |
| `node --version` | v24.22.1 |
| `sh .bmad-core/utils/checks/check-stage.sh deps` (Story 저장 뒤) | 종료 상태 0, `story 1.1 story none`, `story 1.2 epic none`, `story 1.3 epic 1.1`, 지적 없음 |
| `sh .bmad-core/utils/checks/check-stage.sh records docs/stories/1.1.story.md` | 종료 상태 0, 출력 없음 |
| `BMAD_TEMP_PATTERN` 검색, Story와 이 기록 | 일치 없음 |
| `invisible-chars.awk`, Story와 이 기록 | 일치 없음 |
| `story-rules.awk` 모드 `status`, `key`, `tasks` | `Draft`, `1.1`, Task 2개 |
| 제목 대조 | Story가 인용한 PRD와 Architecture 제목 7개가 원문에 있음 |

## 수정과 재확인

같은 호출 안에서 저장한 글을 읽고 다음을 고쳤다. 고친 뒤 해당 부분을 다시 읽고 위 측정을 다시 했다.

- Dev Notes의 보충 문자 설명: 제안과 수용 사실이 섞인 문장을 사실만 남겨 고쳤다.
- 1.1-INSP-001의 명령: 표 안에서 파이프를 이스케이프해야 하는 꼴을 두 개의 `-e`로 바꿨다. 읽는 쪽에 따라 뜻이 달라질 수 있었다.
- 지원 문법의 공백 문장: 공백을 U+0020으로 단정한 글이 표 3과 어긋나 고쳤다.
- 1.1-UNIT-013의 입력: N-2에 기대는 `7 +`를 AC 3의 목록에 있는 받지 않는 글자 `7 + a`로 바꿨다.
- P0 시나리오의 오류 쪽 사례를 맡는 규칙을 행에 적었다.

처음 쓴 awk 집계는 필드 구분자 때문에 열을 잘못 나눴다. Story의 문제가 아니라 측정 명령의 문제였고, 구분자를 고쳐 다시 측정했다. 위 표는 다시 측정한 값이다.

체크리스트의 Execution deviations에 해당하는 일은 없었다.

## 비차단 메모의 근거

메모는 Story의 SM Draft Checklist에 있다. 각 항목이 Task 내용, 순서, 합격 점검을 바꾸지 않는 까닭은 다음과 같다.

- N-1: 표 2가 후보를 모두 받으므로 어느 후보를 구현해도 같은 합격 결과가 나온다. 후보가 아닌 위치는 실패한다.
- N-2: Story가 근거와 함께 정한 해석이다. AC 1~4의 합격 판정을 바꾸지 않는다. 답이 다르면 SM 수정에서 E-7, E-8을 고친다.
- N-3: 표 3이 두 결과를 받는다. ASCII 숫자로 읽은 해석만 E-4의 전각 숫자 사례에 닿는다.
- N-4: 1.1-UNIT-014는 값을 돌려주지 않고 던지는지만 본다.
- N-5: 메시지의 낱말을 고정하지 않으며, 까닭의 뜻은 1.1-INSP-003이 판단한다.
- N-6: 점검이 없고, Story의 어떤 Task에도 닿지 않는다.
- N-7: `node ci/screen-rule.check.mjs`는 `src/screen.js`가 없으면 판정하지 않는다.
