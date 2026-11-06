# sm-1 — 단위 변환

- Story: [1.2](../../stories/1.2.story.md)
- Entry: SM Draft Checklist 1회
- 작성자와 실제 검토자: SM 하위 세션 Bob, 모델 `claude-opus-5-5`, `*run-story 1.2 1.3 remote to Done` run의 역할 작업
- 시각: 2026-11-06, 초안 작성 전 입력 확인 13:32 +0900, 저장한 초안의 점검 13:39 +0900 이후
- 입력 기준: `main` 40e1a6b. `docs/prd.md`, `docs/architecture.md`, `docs/planning/`, `src/`, `test/`, `package.json`, `README.md`는 그 커밋과 차이가 없다(`git diff --stat HEAD` 출력 없음). Story와 이 기록은 커밋하지 않은 초안이다.
- 범위: Story 전체. 실행한 체크리스트는 `.bmad-core/checklists/story-draft-checklist.md`이고, 이 호출에서 한 번 실행했다.

## 범주 결과

| 범주 | 결과 | 근거 |
| --- | --- | --- |
| Project policy checks | PASS | 아래 "Project policy 항목별 근거" |
| 1. Goal & Context Clarity | PASS | Story 문장과 Scope and Dependencies의 "결과와 범위": "`src/units.js`가 `convert`, `units`, `ConversionError`를 내보내고". Epic 안의 자리와 Story 1.1, 1.3과의 관계를 적었다. 의존은 저장 줄 하나로 있고 Epic 항목과 같다 |
| 2. Technical Implementation Guidance | PASS | Dev Notes "인터페이스와 파일 위치"가 경로와 심볼을 표로 든다. Architecture 본문을 끝까지 읽었고(아래 "설계 입력 읽기"), Dev Notes "기술 제약"에 기술 구성과 설계 원칙의 제약을 옮겼다. 환경 변수는 쓰지 않는다. 사용자에게 보이는 동작이 라이브러리 함수뿐이라 문서 대조 대상을 `docs/architecture.md`, `README.md`로 적었고, `src/`에 `engine.js`와 `number-format.js`만 있어 내장 도움말이 없음을 확인했다 |
| 3. Reference Effectiveness | PASS | 참조는 `docs/prd.md#story-12-단위-변환`, `docs/architecture.md#설계-원칙`처럼 섹션을 가리키고, 각 제목은 대상 파일에 있음을 확인했다. Story 1.1의 기록은 Dev Notes "이전 Story"에 요약했다. D-2는 적용, D-1은 영향 범위가 Story 1.1이라 미적용이라고 적었다. `docs/research`는 없다 |
| 4. Self-Containment Assessment | PASS | AC, D-2 원문, 실행 요청 원문이 Story에 있다. 입력별 기대 결과가 Testing에 있다. 부모가 정해 두라고 한 매개변수는 없고 D-2가 해석을 정한다. D-2의 내용을 Testing "결정 D-2의 추적"에서 SubTask와 시나리오로 이었다. Canonical Implementation Source: 부모가 지정한 절이 없어 N/A |
| 4.5. Comment Contract | PASS | Tasks, Dev Notes, Testing을 읽었다. Dev Notes: "Story, Task, AC, 시나리오, 표의 행, 결정의 번호는 코드, 주석, 테스트 이름, 오류 메시지에 넣지 않는다", "IN-FLIGHT 표시는 만들지 않는다". 새 IN-FLIGHT 지시와 기존 항목은 없다. 정책 ID는 Dev Notes의 글에만 있고 코드에 옮기라는 지시가 없다. 테스트 머리글에 시나리오 목록을 두라는 지시도 없다 |
| 5. Testing Guidance | PASS | 수준과 실행 방식은 시나리오 표에, 접근은 Task에 따로 있다. 아래 "개수와 추적 재확인"과 "기대 값과 판정의 확인" |

## Project policy 항목별 근거

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 새 주석의 언어와 쓸모 | PASS | Dev Notes "새 주석은 영어로 쓴다(CC-CMT-009)". 다른 파일의 언어 예외를 옮기지 않았다 |
| 현재 작업과 사실, 편집 이력 없음 | PASS | Tasks와 제목에 날짜나 회차가 없다. "Draft 때 커밋 40e1a6b에서 관찰한 사실"과 "Draft 때 Node.js v24.22.1에서 계산한 배정밀도 값"은 관찰임을 밝혔고 Dev가 다시 확인하도록 적었다. 날짜는 수용 기록의 원문과 SM 기록, Change Log에만 있다 |
| PRD 정체성과 승인된 뜻 | PASS | `docs/prd.md`를 바꾸지 않았다 |
| AC 일치 | PASS | PRD의 Story 1.2 항목과 Story의 AC 번호 줄을 `diff`로 비교해 차이 없음, 4개. 들여쓴 Source 줄 4개. 부모 번호를 그대로 유지했고, AC 앞뒤 글과 표는 부모에 없다. Task 1이 AC 1~4를 받고 Testing이 각 AC를 덮는다 |
| 위반과 기존 잔여물 구분 | PASS | Dev Notes의 주석 위생 항목이 비교 기준과 대상을 정하고 바꾸지 않는 파일을 뺀다 |
| 기존 Story와 QA 기록 | PASS | Story 1.1의 파일, 기록 문서, gate를 읽기만 했고 바꾸지 않았다 |
| 임시 자료 | PASS | 이 호출에서 만든 임시 파일은 메인 세션이 지정한 보고 파일 하나다. 프로젝트 임시 영역에 있고 메인 세션의 실행 자료다. 점검은 중간 파일 없이 파이프로 했다. 이어가기 로그의 Story 1.2 섹션에 이 사실을 적었다 |
| Story의 임시 자료 지시 | PASS | Dev Notes: "임시 자료는 프로젝트 임시 파일 정책(CL-GLD-OPS-008)을 따른다. Done까지 필요한 근거를 보존하고, 지우는 일은 병합이 확인된 뒤에". 경로를 적지 않았고 `BMAD_TEMP_PATTERN` 검색은 일치 없음 |
| 주석 위생 기준 | PASS | Dev Notes: 비교 기준은 Story 브랜치가 갈라진 기준 커밋, 대상은 `src/units.js`, `test/units.test.js`, 문맥 검토는 `.bmad-core/checklists/comment-hygiene-checklist.md` §3 |
| 승인 주장 | PASS | PRD와 Architecture의 "승인" 인용은 각 검토 기록의 일시, 주체, 대상을 그대로 옮겼고 실행 요청은 원문으로 적었다. 인접 결정으로 넓히지 않았다 |
| 측정 합계와 소계 | PASS | 아래 "개수와 추적 재확인" |
| 작업 경계 | PASS | 파일은 경로로, 공개 인터페이스는 심볼로 적었다 |
| 출처와 위치 표기 | PASS | 파일과 섹션, 심볼, 설정 키, 테스트 이름으로 적었고 줄 번호를 쓰지 않았다 |
| 실행 가능성 주장 | PASS | 속성과 변이 점검의 도구를 계획하지 않은 까닭을 `testing.propertyCommands`, `testing.mutationCommands`, Architecture의 외부 패키지 금지에 묶었다. 왕복 시험을 빼는 까닭은 Draft에서 계산한 값에 묶었다 |
| Task 문구 | PASS | SubTask는 심볼과 시나리오, 명령, 커밋 제목만 적고 구현식이 없다. 계산 순서의 주의점은 Dev Notes에 있다 |
| 선택지 비교 표 없음 | PASS | 표 3의 받는 결과는 검증 표이고, 제안은 비차단 메모의 글로 적었다 |
| Convention Sections 목록 | PASS | `convention-sections`는 Dev가 읽는 종류와 `testing-tdd`, `javascript-language`이고, `review-sections`는 `quality` 종류의 세 섹션과 `javascript-crap`이다. 모두 두 색인에 있다. 선언이 곧 읽었다는 증거는 아니므로 내가 읽은 본문은 아래에 따로 적었다 |
| 실행 비용 | PASS | Dev Notes에 적용 범위 판단을 적었다: `javascript-language`에 닿는 규칙이 없고 요구사항에 성능 기준이 없다 |

## 설계 입력 읽기

`docs/architecture.md`는 "기술 구성", "소스 트리", "설계 원칙", "검토 기록"까지 끝까지 읽었다. 저장한 Tasks와 Testing이 닿는 절은 앞의 세 절이고 모두 읽은 범위에 든다. 이 Story는 입출력 없는 순수 함수이므로 API, 데이터베이스, 화면 주제는 Architecture에도 없고 해당하지 않는다. `docs/prd.md`, `docs/planning/decisions.md`, `docs/planning/future-work.md`는 끝까지 읽었다. 앞선 Story는 `docs/stories/1.1.story.md`를 끝까지, 기록 문서는 `sm-1`을 끝까지 읽었고, `dev-`와 QA 기록 문서는 세부가 필요한 지적이 없어 Story의 항목과 낱말 검색으로만 보았다. 코드는 `src/engine.js`, `src/number-format.js`, `test/number-format.test.js`를 끝까지, `test/engine.test.js`는 도우미 함수까지 읽었다.

규칙은 `.bmad-core/tasks/load-project-rules.md`대로 읽었다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`, `javascript-crap`.
- 읽지 않은 본문: `coding-principles`, `comments`, `crap`. SM의 규칙 종류가 아니다. Story는 이 섹션들의 ID를 인용만 하며 Cleaner 검토와 QA가 적용한다.

## 개수와 추적 재확인

저장한 Story를 grep, awk, diff로 측정했다. 중간 파일은 만들지 않았다.

| 측정 | 대상과 방법 | 결과 |
| --- | --- | --- |
| 시나리오 행 | `1.2-`로 시작하는 표의 행, ID 중복 검사 | 17개, 중복 없음, 모든 행이 8열 |
| 수준 | 표의 Level 열 | unit 14, inspection 3 |
| 우선순위 | 표의 Priority 열 | P0 6, P1 8, P2 3 |
| 실행 방식 | 표의 Execution 열 | automated 15, agent-review 2 |
| 실행 맵 | `test_design.execution`의 ID와 값을 표와 `diff` | ID와 방식이 모두 같음 |
| 요약 | Test Strategy Overview, `by_level`, `by_priority`, `by_execution` | 측정값과 같음 |
| 규칙 참조 | L-1 ~ L-4, P-1 ~ P-4, T-1 ~ T-5, Z-1, Z-2, U-1, E-1 ~ E-5가 표에 하나씩 정의되어 있고 시나리오 행에서 참조되는가 | 21개 모두 정의 1개, 참조 1개 이상 |
| SubTask와 시나리오 | SubTask 1.1은 1.2-UNIT-001 ~ 014와 1.2-INSP-001, 002, SubTask 2.1은 1.2-INSP-003 | 표의 Task 열이 16행은 1.1, 1행은 2.1로 같음. 각 점검이 해당 SubTask의 결과를 덮는지 표의 기대와 실패 기준으로 읽어 확인함 |
| D-2 원문 | Story의 인용과 `docs/planning/decisions.md`의 행을 `diff` | 차이 없음 |
| 커밋 제목 | `git.taskCommitPattern`과 비교 | `[story-1.2] Task 1.1: 단위 변환 구현`, `[story-1.2] Task 2.1: Architecture 정렬`이 패턴에 맞음 |
| 버전 | `package.json` 0.1.0, 설정에 버전 키 없음, `docs/`, `README.md`, 설정에서 버전 정책 낱말 검색. 일치는 Story의 문장뿐 | 버전 변경 없음 |

## 기대 값과 판정의 확인

표 1의 기대 값은 D-2와 SI 접두어에서 10진수로 손 계산했다. 끝나지 않는 소수 셋은 `node -p`의 BigInt 정수 나눗셈으로 소수 25자리까지 구했다.

D-2의 온도 식이 배정밀도에서 내는 값은 파일을 만들지 않는 `node -p` 한 줄 산술식으로 구했다. 이것은 계산기로 쓴 것이다. 제품 코드가 없는 상태의 산술이고, 구현이나 탐침, 시험 지원 코드, 표 전체를 돌리는 참조 평가기를 만들지 않았다. 그래서 표의 모든 행이 구현에서 통과한다는 실행 증거는 없으며, Dev의 TDD RED도 아니다.

| 식 | 값 | 쓰인 곳 |
| --- | --- | --- |
| `(-459.67 - 32) * 5 / 9` | -273.15 | T-5 |
| `(-459.67 - 32) * 5 / 9 + 273.15`, `(-459.67 - 32) / 1.8 + 273.15` | 0 | T-5의 `F`→`K` |
| `(-459.67 - 32) * (5 / 9) + 273.15` | -5.684341886080802e-14 | 1.2-UNIT-005의 실패 기준 |
| `-273.15 * 9 / 5 + 32`, `(0 - 273.15) * 9 / 5 + 32` | -459.66999999999996, 상대 오차 약 1.2e-16 | T-5의 `C`→`F`, `K`→`F` |
| `-273.15 + 273.15`, `(32 - 32) * 5 / 9`, `273.15 - 273.15` | 0 | 기대 값이 0인 행 |
| `(32 - 32) * 5 / 9 + 273.15`, `(273.15 - 273.15) * 9 / 5 + 32` | 273.15, 32 | T-1 |
| `(212 - 32) * 5 / 9`, `(212 - 32) * 5 / 9 + 273.15`, `100 * 9 / 5 + 32`, `100 + 273.15`, `373.15 - 273.15`, `(373.15 - 273.15) * 9 / 5 + 32` | 100, 373.15, 212, 373.15, 100, 212 | T-2 |
| `(-40 - 32) * 5 / 9`, `-40 * 9 / 5 + 32`, `-40 + 273.15`, `233.15 - 273.15`, `(233.15 - 273.15) * 9 / 5 + 32`, `(-40 - 32) * 5 / 9 + 273.15` | -40, -40, 233.14999999999998, -39.99999999999997, -39.99999999999996, 233.14999999999998, 상대 오차는 가장 커도 약 1.1e-15 | T-3 |
| `37 * 9 / 5 + 32`, `37 + 273.15`, `(98.6 - 32) * 5 / 9`, `(98.6 - 32) * 5 / 9 + 273.15`, `310.15 - 273.15`, `(310.15 - 273.15) * 9 / 5 + 32` | 98.6, 310.15, 37, 310.15, 37, 98.6 | T-4 |
| `(-459.67000000000007 - 32) * 5 / 9 + 273.15`, `-273.15000000000003 + 273.15` | 모두 -5.684341886080802e-14 | Z-2 |
| `-459.67000000000007 === -459.67 - 2 ** -44`, `-273.15000000000003 === -273.15 - 2 ** -44` | 둘 다 `true`. 이 범위의 간격이 2의 -44제곱이므로 바로 아래의 수다 | Z-2 |
| `-273.149 + 273.15`, `273.151 - 273.15`, `(32.0018 - 32) * 5 / 9` | 0.0009999999999763531, 0.0010000000000331966, 0.0010000000000016168, 0.001과의 상대 오차 약 2.4e-11, 3.3e-11, 1.6e-12 | N-4, 표 1이 피하는 입력 |
| `Number.MAX_VALUE * 1e6`, `Number.MAX_VALUE * 9 / 5 + 32` | 둘 다 `Infinity` | 표 3 |
| `1e308 * 5 / 9`, `1e308 / 1.8` | `Infinity`, 5.555555555555556e+307 | N-1의 중간 넘침 |

표 1의 L, P 행은 곱셈과 나눗셈 몇 번으로 이루어져 반올림 오차가 상대 1e-15 안쪽이고, 0인 행은 정확히 0이므로 1e-12의 판정에 걸리지 않는다. 이것은 실행이 아니라 추론이다. 같은 단위 쌍도 같은 까닭이다.

틀린 변형의 판정은 표의 값과 "같은 값 판정"의 식을 대조해 읽어 확인했다. 예를 들어 6894.757293과 6894.757293168의 상대 오차는 약 2.4e-11이고, 0.3048006과 0.3048의 상대 오차는 약 2e-6이다.

이 Draft는 기존 테스트가 새 동작을 잡는다고 주장하지 않는다. 기존 테스트에 대한 주장은 "`src/units.js`와 `test/units.test.js`가 없다"와 "`node --test`가 35개 통과한다"뿐이다.

## 분해의 검토

`convert`와 `units`를 SubTask 둘로 나누는 길을 생각했다. 같은 모듈을 같은 책임과 같은 접근, 같은 점검으로 바꾸고, 그 사이에 의존이나 되돌림 지점이나 검토 크기로 커밋이 필요하지 않아 `.bmad-core/data/story-slicing.md`대로 SubTask 하나로 두었다. Task 2는 Architecture 정렬이고 마지막이다.

## 실행한 명령과 결과

| 명령 | 결과 |
| --- | --- |
| `sh .bmad-core/utils/checks/check-instructions.sh` | 종료 상태 0 |
| `sh .bmad-core/utils/checks/check-stage.sh future --story 1.2` | 종료 상태 0, 출력 없음 |
| `sh .bmad-core/utils/checks/check-merge.sh unmerged main` | 종료 상태 0, 출력 없음 |
| `node --test` (커밋 40e1a6b, Story 파일 작성 전) | 35개 통과 |
| `node --version` | v24.22.1 |
| `sh .bmad-core/utils/checks/check-stage.sh deps` (Story 저장 뒤) | 종료 상태 0, `story 1.1 story none`, `story 1.2 story none`, `story 1.3 epic 1.1`, 지적 없음 |
| `sh .bmad-core/utils/checks/check-stage.sh records docs/stories/1.2.story.md` | 종료 상태 0, 출력 없음 |
| `BMAD_TEMP_PATTERN` 검색, Story와 이 기록 | 일치 없음 |
| `invisible-chars.awk`, Story와 이 기록 | 일치 없음 |
| `story-rules.awk` 모드 `status`, `key`, `tasks` | `Draft`, `1.2`, Task 2개 |
| 제목 대조 | Story가 인용한 PRD와 Architecture 제목 7개(`목표`, `Story 1.2: 단위 변환`, `계획 검토 기록`, `기술 구성`, `소스 트리`, `설계 원칙`, `검토 기록`)가 원문에 있음 |

## 수정과 재확인

같은 호출 안에서 저장한 글을 읽고 다음을 고쳤다. 고친 뒤 해당 부분을 다시 읽고 영향받는 측정을 다시 했다.

- Dev Notes "참고한 기록": `docs/planning/future-work.md`에서 닿는 항목을 넷이라 했으나 N-7의 출처인 "CI 규칙이 계획 문서에 없음"이 빠져 있어 다섯으로 고쳤다.
- "지원 입력": "표 3의 입력만 예외"라는 글이 표 3의 입력을 거부 대상처럼 읽혀, 받는 입력 가운데 결과가 유한하지 않은 경우로 고쳤다.
- Dev Notes "이전 Story": PO 지적을 "이 초안에 반영했다"고 쓴 편집 이력 같은 글을 현재의 기준을 말하는 글로 고쳤다.
- Testing 첫 문단: 동작 시나리오의 수준이 unit인 까닭을 더했다.

처음 쓴 awk 집계는 필드 구분자 때문에 열을 잘못 나눴다. Story의 문제가 아니라 측정 명령의 문제였고, 구분자를 `[|]`로 고쳐 다시 측정했다. 위 표는 다시 측정한 값이다.

체크리스트의 Execution deviations에 해당하는 일은 없었다.

## 비차단 메모의 근거

메모는 Story의 SM Draft Checklist에 있다. 각 항목이 Task 내용, 순서, 합격 점검을 어떻게 다루는지는 다음과 같다.

- N-1: 표 3이 두 결과를 받으므로 어느 쪽을 구현해도 같은 합격 결과가 나온다. 답이 오면 표 3을 하나로 줄인다.
- N-2: 어떤 상대 오차 정의를 써도 기대 값이 0이면 허용 폭이 0이다. D-2의 식 순서로 계산한 값이 기대 값이 0인 행을 통과한다.
- N-3: AC 3의 "낮은 온도"와 D-2의 "정확히 0 K"를 배정밀도 입력에 그대로 적용했다. D-2의 "테스트는"으로 시작하는 문장은 시험의 값 비교를 말한다. 소유자가 허용 폭을 두기로 하면 Z-2의 세 입력이 표 3으로 옮겨 간다.
- N-4: 표 1이 이런 입력을 쓰지 않으므로 어떤 Task에도 닿지 않는다.
- N-5: 시험이 `name`과 메시지를 판정하지 않는다.
- N-6: 수용된 글을 그대로 읽은 것이다. 소유자가 다르게 정하면 수용된 결정의 변경이다.
- N-7: Task 2가 문서를 바꾸지 않으면 닿지 않는다. `src/units.js`와 `test/units.test.js`는 소스 트리에 이미 있다.
