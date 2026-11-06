# sm-2 — 아주 깊은 중첩을 계산 오류로 돌려주기

- Story: [bug-2](../../stories/bug/bug-2.story.md)
- Entry: SM Draft Checklist 2회
- 작성자와 실제 검토자: SM 하위 세션 Bob, 모델 `claude-opus-5-5`, `*run-story bug-2 remote to Done` run의 역할 작업
- 시각: 2026-11-07, 입력 확인 01:36 +0900, 수정 저장과 재측정 01:44 +0900 이후
- 입력 기준: `main` 9aea191. 로컬 커밋이고 fetch하지 않았다. Story와 기록 문서는 커밋하지 않은 초안이다. 수정 전 Story는 PO 회차 1이 적은 `git hash-object --no-filters` 값 `120703ae723a`의 글에 PO Validation의 1회 항목만 더한 것이다(그 사본과 `diff`, 사본에만 있는 줄 0)
- 범위: `.bmad-core/tasks/create-next-story.md`의 explicit revision. 수정 범위는 PO 검증 1회의 열린 차단 지적, 메인 세션이 넘긴 사용자의 답, SM이 값어치 있다고 본 계약 안의 비차단 지적이다. 체크리스트 `.bmad-core/checklists/story-draft-checklist.md`를 이 호출에서 한 번 실행했고 Story 전체를 다시 읽었다

## 지적마다의 처리

| ID | 분류 | 처리 | 저장한 글의 자리 |
| --- | --- | --- | --- |
| PO1-B1 | 차단, `pending`, 사용자 | 사용자의 답을 적었다. 이의 없음. 다음 PO 회차가 확인한다 | Scope and Dependencies "수용된 결정"의 "사용자의 결정(스택 넘침을 번역하는 설계의 수용)", "미결 항목과 선행 조건", Dev Notes "설계"의 첫 문단, "기술 제약", `coverage_gaps`, 추적 표의 새 행, SM Draft Checklist의 N-5 |
| PO1-B2 | 차단, `rework`, SM | 고쳤다. 이의 없음 | bug-2-INSP-001의 판단 목록 "까닭이 엔진의 다른 까닭과 같은 꼴의 영어 낱말이고 메시지에 식을 되풀이하지 않는가"와 판단 근거, 추적 표, `coverage_gaps`, Risk Coverage의 새 행 |
| PO1-N7 | 비차단, 계약 안 | 적용 | "입력의 정의"의 새 입력 `C`, 표 1의 G-4, "인터페이스와 파일 위치"의 `test/engine.test.js` 행 |
| PO1-N8 | 비차단, 계약 안 | 적용. AC 3의 문장은 고치지 않았다 | "기술 제약"의 경계 부근 문단, 표 3의 머리 문단, `coverage_gaps`, Risk Coverage, N-4 |
| PO1-N9 | 비차단, 계약 안 | 적용 | bug-2-UNIT-003의 실패 기준, Recommended Execution Order 3번, "설계"의 잡는 곳 조건, `coverage_gaps` |
| PO1-N10 | 비차단, 계약 안 | 적용 | Testing 첫 문단, "판정 방법"의 위치와 오류 줄 |
| PO1-N11 | 비차단, 계약 안 | 적용 | "인터페이스와 파일 위치"의 "바꾸지 않음" 행. bug-2-INSP-002가 그 행을 본다 |
| PO1-N12 | 비차단, 계약 안 | 적용 | "설계"의 `renderScreen` 문단 |
| PO1-N1 ~ PO1-N6 | 비차단, 계약 밖 | 적용하지 않았다. 지시대로 Story에 맞추어 적지 않았고 답을 정하지 않았다. PO Validation에 남고 병합 뒤 점검이 옮긴다 | 없음 |

PO1-N7 ~ PO1-N12의 적용 판단은 다음과 같다. 모두 `.bmad-core/data/finding-classification.md` 단계 7의 "a case or assertion that makes an existing rule or scenario more specific"이거나 사실을 맞게 적는 일이고, 새 동작이나 새 입력 부류를 더하지 않는다. PO1-N7은 AC 3 "까닭이 다른 문제의 까닭과 다르며"의 사례이고, 엔진의 까닭 여섯(`src/engine.js`의 `fail` 호출과 `failAtCursor`)을 모두 덮는다. PO1-N8, PO1-N9, PO1-N12는 Dev와 QA가 넓게 읽거나 실패하지 않을 변형을 기록하는 일을 막는다. PO1-N10은 판정을 바꾸지 않고 RED 출력을 줄이며, 도우미 변경은 `.bmad-core/data/verification-ownership.md`의 기법 변경에 든다. PO1-N11은 값어치가 낮지만 범위 밖 문장과 맞는 경로 다섯 개뿐이고, 다섯 경로가 `git cat-file -e HEAD:{경로}`로 모두 있음을 확인했다.

## 사용자의 답의 기록

지시 문서의 원문과 저장한 Story를 `grep -F`로 글자 대조했다.

| 대조한 글 | 결과 |
| --- | --- |
| 선택지 "조사 없이 이 설계를 수용" | 지시와 Story에 있다 |
| 선택지의 설명 전문 | 지시와 Story에 각각 1번, 같다 |
| 설계의 글 "재귀 파서를 그대로 두고, ... `CalculationError`로 바꿈" | 지시와 Story에 각각 1번, 같다 |
| 빠진 자료의 문장 "ECMAScript 명세가 ... 공개 구현이나 지침이다." | `po-r1`의 PO1-B1 절과 Story에 각각 1번, 같다 |
| 인용한 섹션 이름 "차단 지적 PO1-B1: ..." | `po-r1`의 `##` 제목과 같다 |

결정자는 사용자, 날짜는 2026-11-07, 범위는 이 Story의 이 설계로 적었다. 다른 Story나 공용 결정으로 넓히지 않았고 `docs/planning/decisions.md`를 바꾸지 않았다(`git status`에 없음). Story에서 글자 `요건을 채`와 `조사 요건`을 찾아 모든 일치를 문맥으로 읽었고, 요건을 채웠다고 말하는 문장은 없다.

"얻은 근거" 항목은 `po-r1`의 글을 옮기면서 "앞의 둘", "뒤의 둘"을 각 자료의 이름으로 바꾸었다. 뜻은 같다.

## 범주 결과

| 범주 | 결과 | 근거 |
| --- | --- | --- |
| Project policy checks | PASS | 아래 "Project policy 항목별 근거" |
| 1. Goal & Context Clarity | PASS | 이어 씀. Story 문장, "결과와 범위", 의존 줄과 표를 바꾸지 않았다. `check-stage.sh deps`의 `story bug-2 story 1.1,1.3`, `check-merge.sh status`의 두 `merged` 줄을 다시 봤다 |
| 2. Technical Implementation Guidance | PASS | `docs/architecture.md`를 이 호출에서 끝까지 읽었다. 고친 글이 닿는 "기술 구성", "소스 트리", "설계 원칙"과 어긋나지 않는다. 환경 변수와 문서 대조 대상은 바꾸지 않았다. "설계"의 "잡는 곳은 `evaluate`의 경계, 곧 `Parser`의 재귀 밖이다"는 `src/engine.js`에서 `parseAll`을 부르는 곳이 `evaluate`뿐임을 읽어 적었다 |
| 3. Reference Effectiveness | PASS | 항목 "Relevant prior research and decisions": 재사용할 조사가 없고(`docs/research` 없음) 조사도 없다. Dev Notes "기술 제약": "사용자가 이 상태로 설계와 그 위험을 받았고 ..., 조사 요건을 채운 것은 아니다". 이 PASS는 조사 요건을 채웠다는 뜻이 아니라, 소유자의 결정이 빠짐을 받았고 Story가 빠진 자료를 적었다는 뜻이다. 새 참조 `docs/story-records/bug-2/po-r1.md`의 섹션 이름을 대조했다 |
| 4. Self-Containment Assessment | PASS | 합격 판정을 바꾸는 수단의 결정에 소유자의 결정이 생겼고, Scope, SubTask 1.1, Testing으로 따라갔다(추적 표의 새 행, 아래 "해석과 합격 판정"). 기대와 실제 동작, 재현, 측정 표는 그대로 Story에 있다. Canonical Implementation Source는 지정한 절이 없어 N/A |
| 4.5. Comment Contract | PASS | 고친 Dev Notes와 Testing의 글을 읽었다. Tasks / Subtasks 섹션은 바꾸지 않았고(아래 섹션 비교), 코드나 주석에 ID를 넣으라는 지시를 더하지 않았다. 새 IN-FLIGHT 지시가 없다. Dev Notes의 "Story, Task, AC, 시나리오, 표의 행, 결정의 번호는 코드, 주석, 시험 이름, 오류 메시지에 넣지 않는다"는 그대로다 |
| 5. Testing Guidance | PASS | 수준과 실행 방식, 합계를 바꾸지 않았고 다시 쟀다(아래). 각 SubTask의 시나리오 참조와 행의 기대를 다시 읽었다. 새 입력 `C`는 기존 시험의 `OVERFLOW_POWER_OF_TEN`이고 독립 오라클은 `reasonOf`의 비교다. 아래 "시험 계획의 재확인" |

최종 판정: READY. 차단 지적을 모두 처리했고, 끝나지 않았거나 검토하지 않은 적용 점검이 없다. PO 검증이나 Approved가 아니다.

## Project policy 항목별 근거

바꾼 글이 닿는 항목만 다시 판정했다. 나머지는 아래 "이어 쓴 근거"대로 `sm-1`의 판정을 잇는다.

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 현재 작업과 사실, 편집 이력 없음 | PASS | 새 글은 현재의 결정과 조건을 적는다. 회차와 날짜는 결정의 날짜, 측정의 출처, SM Draft Checklist, Change Log에만 있고 Task와 제목에 없다. "PO 검증 1회"는 측정의 출처 표기다 |
| PRD 정체성과 승인된 뜻 | PASS | `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`를 바꾸지 않았다. AC 5개의 글을 바꾸지 않았다 |
| 승인 주장 | PASS | 새 결정의 결정자는 사용자이고 그 대상은 이 Story의 이 설계다. 위치 규칙, 메시지 언어, 문자열이 아닌 입력의 답으로 넓히지 않았다 |
| 임시 자료 | PASS | 이 호출은 임시 자료를 만들지 않았다. 점검은 파이프와 프로세스 치환으로 했고 PO의 출력 파일은 읽기만 했다. 메인 세션이 지정한 보고 파일은 그 세션의 실행 재료여서 내 임시 자료로 적지 않았다 |
| Story의 임시 자료 지시 | PASS | 새 글에 임시 경로가 없다. `BMAD_TEMP_PATTERN`과 `check-stage.sh records`의 결과는 아래 |
| 측정 합계와 소계 | PASS | 아래 "개수와 추적 재확인" |
| 작업 경계 | PASS | "바꾸지 않음" 행은 경로로 적었고, 디렉터리 두 개는 `git diff --quiet`가 경로로 받는다 |
| 출처와 위치 표기 | PASS | 새 글은 파일과 섹션 이름, 심볼, 시험 이름, 시나리오 ID로 적었고 줄 번호가 없다. 201024바이트와 `2 ** 29 - 24`는 측정값이다 |
| 실행 가능성 주장 | PASS | 측정마다 PO 검증 1회의 측정임을 밝혔다. `RangeError: Invalid string length`는 Windows x64의 Node.js v24.22.1로 한정했고, `O(3000)`은 Story의 설계대로 고친 사본에서 잰 것임을 적었다. 이 호출은 이 값들을 다시 재지 않았다 |
| Task 문구 | PASS | SubTask 글을 바꾸지 않았다. 구현 조건의 고침은 Dev Notes에 있다 |
| 선택지 비교 표 없음 | PASS | 새 비교 표가 없다 |

## 해석과 합격 판정

| 항목 | 판정 | Story의 처리 |
| --- | --- | --- |
| 수단의 결정 | 사용자의 답이 수단을 정했다. `D`, `M`이 값이 아니라 `CalculationError`라는 AC 1의 판정, 범위 밖의 "반복문으로 다시 쓰지 않고"가 이 답에 선다. 답이 같은 설계를 받았으므로 Task, AC, 표는 바뀌지 않는다 | "수용된 결정", "미결 항목과 선행 조건" |
| "`evaluate` 경계"와 "`Parser`의 재귀 밖" | 사용자가 받은 글은 "`evaluate` 경계"이고 Dev Notes의 조건은 "`Parser`의 재귀 밖"이었다. `Parser.parseAll`은 `evaluate`만 부르고 재귀 밖이어서, `evaluate`의 본문과 `parseAll`을 모두 그 자리로 적었다. 합격 판정이 같고 PO 회차 1의 사본 `Parser.parseAll`에서 잡는 변형도 조건에 맞는다고 판정했다. 다음 PO 회차가 이 글을 함께 볼 수 있게 적어 둔다 | "설계"의 잡는 곳 조건 |
| AC 3의 "같은 식이면 호출할 때마다" | "이 `CalculationError`"로 읽으며 AC 문장은 그대로 둔다. 스택이 넘쳐 던지는 오류의 메시지끼리의 약속으로 Dev Notes에 적었다. 합격 판정은 같다. G-6은 `D`, `M`만 보고 B-3은 클래스만 본다 | "기술 제약" |
| 메시지의 영어 낱말과 식 되풀이를 시험으로 옮기는가 | 옮기지 않았다. 피드백의 필요한 수정이 inspection 행으로 정했다. 시험으로 고정하면 메시지의 꼴을 일부 정하게 되어 `unplanned` 항목 "오류 메시지의 언어와 꼴"(N-2)에 닿는다. 실행 방식과 합계도 그대로다 | bug-2-INSP-001 |
| 이의 제기 | PO1-B1, PO1-B2 모두 이의 없다. PO1-B2의 조건 둘은 표 1 ~ 4의 어느 시험 판정도 좌우하지 않음을 "판정 방법"과 표를 읽어 확인했다 | 없음 |

## 시험 계획의 재확인

SM은 탐침 코드를 만들지 않으므로 새 글의 판정은 술어를 따라간 것이고 이 호출은 실행하지 않았다. PO 회차 1의 저장된 출력 파일을 읽어 대조한 것은 다음과 같다. 사본의 실행이고 구현 결과나 Dev의 RED가 아니다.

| 새 글 | 따라간 술어 | 대조한 PO 출력 |
| --- | --- | --- |
| G-4의 `C` | `parseNumber`의 `Number.isFinite` 거짓 갈래가 `number out of range`를 준다. `reasonOf`가 수를 빼서 `D`의 까닭과 비교한다. 까닭을 다시 쓴 구현은 이 비교에서 같아져 실패한다. 이 행을 더한 실행은 아직 없다 | `reuses-number-out-of-range-reason` 81개 통과(지금 표의 틈) |
| UNIT-003의 값 0 변형 | 넘치면 0을 돌려주면 `P(n)`이 1이 아니고 `O(n)`이 값이어서 표 3의 받는 결과 밖이다 | `value-on-overflow`에서 B-1, B-2, B-3 실패 |
| 재귀 안에서 잡는 구현 | 바깥 층의 `catch`가 다시 넘친 오류를 받는다 | `catch-inside-recursion-constant-position`, `catch-inside-recursion-no-retry-outer` 81개 통과 |
| bug-2-INSP-001의 새 항목 | 코드를 읽어 판단한다. 표의 시험은 이 조건에 달려 있지 않다 | `repeats-expression-with-position`, `korean-reason` 81개 통과 |
| `O(3000)`의 두 결과 | PO의 표 "런타임 근거"와 Story의 글을 대조했다 | 측정 출력의 `O(3000)` 줄(새 프로세스 깊이 오류, 같은 프로세스의 앞선 호출 뒤 `unclosed parenthesis`) |
| 201024바이트 | 저장된 출력 파일의 크기 | 파일 크기 201024 |
| `RangeError: Invalid string length` | `src/screen.js`에서 `return` 줄의 글자 잇기가 `try` 밖임을 읽었다 | 출력의 `a digit then spaces up to the longest text: threw RangeError: Invalid string length` |

도우미 다섯 개가 식을 메시지에 넣는다는 글은 `test/engine.test.js`의 `assertValues`, `assertRejected`, `messageOf`, `test/screen.test.js`의 `errorLineOf`, `assertLines`를 읽어 확인했다. `reasonOf`는 `messageOf`를 거친다.

## 개수와 추적 재확인

저장한 Story를 awk, grep, diff로 쟀다. 중간 파일은 만들지 않았다.

| 측정 | 대상과 방법 | 결과 |
| --- | --- | --- |
| 시나리오 행 | `^\| bug-2-` 행, ID 중복, 열 수 | 11개, 중복 없음, 모든 행이 8열 |
| 수준 | Level 열 | unit 7, integration 1, inspection 3. Overview, `by_level`과 같다 |
| 우선순위 | Priority 열 | P0 3, P1 7, P2 1. Overview, `by_priority`와 같다 |
| 실행 방식 | Execution 열 | automated 9, agent-review 2. Overview, `by_execution`과 같다 |
| 실행 맵 | `test_design.execution`과 표를 `diff` | 같다 |
| SubTask와 시나리오 | SubTask 1.1의 bug-2-UNIT-001 ~ 007, bug-2-INT-001, bug-2-INSP-001, 002와 SubTask 2.1의 bug-2-INSP-003을 표의 Task 열과 대조하고, 고친 행의 기대와 실패 기준을 읽었다 | 같다 |
| 추적 표 | 고친 행과 새 행의 시나리오 ID가 표에 있는가, bug-2-INSP-001의 목록과 맞는가 | 맞다. 구현 조건 가운데 꼴을 두 곳에 적지 않는 조건만 Independent Cleaner review에 대었고 PO1-B2의 "넣지 않은 것"과 같다 |
| 줄 수 | `wc -l`, 저장한 Story | 554줄. `.bmad-core/tasks/create-next-story-style.md`의 구조 검토 기준 600줄 아래 |

## 이어 쓴 근거

`sm-1`의 다음 판정은 다시 하지 않고 잇는다. 비교는 `git diff --stat 21a78f7 HEAD`의 출력이 `docs/planning/future-work.md` 19줄 삭제뿐이라는 것과, 수정 전 Story가 PO가 읽은 글에 PO Validation만 더한 것이며 이 수정이 고친 글은 위 "지적마다의 처리"의 자리와 SM Draft Checklist, Change Log뿐이라는 것이다.

- `sm-1`의 "유형 Story의 조건": 키, 경로, 중복, `[Bug]` 출처의 요소. 항목 제거는 9aea191에 병합되었다.
- `sm-1`의 "Project policy 항목별 근거" 가운데 위 표에 없는 항목: 새 주석의 언어와 쓸모, AC와 출처, 위반과 기존 잔여물 구분, 기존 Story와 QA 기록, 주석 위생 기준, Convention Sections 목록, 실행 비용.
- `sm-1`의 "개수와 추적 재확인" 가운데 이 호출에서 다시 재지 않은 측정: 입력의 값, future-work 항목, 커밋 제목, 버전, 시험 지점.
- `sm-1`의 "설계 입력 읽기" 가운데 이 호출에서 읽지 않은 파일: `src/number-format.js`, `.github/workflows/ci.yml`, `ci/screen-rule.check.mjs`, `package.json`, `README.md`, `docs/planning/future-work.md`, 앞선 Story와 그 기록.

## 실행한 명령과 결과

| 명령 | 결과 |
| --- | --- |
| `sh .bmad-core/utils/checks/check-instructions.sh` | 종료 상태 0 (시작 때와 수정 뒤) |
| `git status --short --untracked-files=all`, `git rev-parse HEAD`, `git branch --show-current` | Story, `po-r1`, `sm-1`만 추적되지 않음(이 기록을 저장하기 전), 9aea1916e47d8d677fd0b4c291af260fa355c0a8, `main` |
| `git diff --stat 21a78f7 HEAD` | `docs/planning/future-work.md` 19줄 삭제뿐 |
| `node --version` | v24.22.1 |
| `node --test`, 프로젝트 루트 | 68개 통과, 실패 0. 코드와 시험을 바꾸지 않았으므로 Draft의 값과 같다 |
| `node ci/screen-rule.check.mjs` | 종료 상태 0 |
| `sh .bmad-core/utils/checks/check-stage.sh deps` | 종료 상태 1, `story bug-2 story 1.1,1.3`. `missing tech-debt-1 story`는 이 Story가 아닌 씨앗의 줄이고 `sm-1`과 같다 |
| `sh .bmad-core/utils/checks/check-stage.sh future --story bug-2` | 종료 상태 0 |
| `sh .bmad-core/utils/checks/check-merge.sh status 1.1 main`, `status 1.3 main` | 각각 `merged 81c547c94a4e2dcbbf64e375909f3721b2933146`, `merged 937f21c5a4d5cc5623f90caefa08dd3e137d89f5` |
| `sh .bmad-core/utils/checks/check-stage.sh records`, Story | 종료 상태 0, 출력 없음 |
| `sh .bmad-core/utils/checks/check-stage.sh po-record`, Story | 종료 상태 0, 회차 1의 route 줄과 verdict 줄 그대로 |
| `BMAD_TEMP_PATTERN` 검색, Story와 이 기록 | 일치 없음 |
| `invisible-chars.awk`, Story와 이 기록 | 일치 없음 |
| 저장 줄 검색, 이 기록 | 일치 없음 |
| 저장 줄 검색, Story | 의존 줄 한 줄과 PO Validation의 줄뿐이고 바꾸지 않았다 |
| 줄 번호 검색(`파일:숫자`, `#L숫자`, 낱말), Story와 이 기록 | 위치 표기로 쓴 곳 없음. 낱말의 일치는 이 기록의 항목 이름 "출처와 위치 표기"의 설명 하나 |
| 이 호출을 시작할 때의 Story 사본과 `##` 섹션별 `diff` | Status, Story, Acceptance Criteria, Tasks / Subtasks, PO Validation, Dev Agent Record, QA Results가 같다. 바뀐 섹션은 Scope and Dependencies, Dev Notes, SM Draft Checklist, Change Log뿐이다 |

돌리지 않은 것: 소유권 점검 `check-owned.sh sm`은 메인 세션의 일이다. Story의 표를 실행하는 시험과 변형은 만들지 않았다. 처음 실행은 Dev의 조각이다.

## 수정과 재확인

저장한 Story의 고친 곳을 모두 다시 읽었다. Scope and Dependencies의 "수용된 결정"과 "미결 항목과 선행 조건", Dev Notes의 "설계", "인터페이스와 파일 위치", "기술 제약", Testing의 첫 문단, "입력의 정의", "판정 방법", 표 1, 표 3의 머리 문단, 고친 시나리오 행, "추적", Risk Coverage, Recommended Execution Order 3번, 실행 맵, SM Draft Checklist 2회, Change Log다. 같은 호출 안에서 고친 것은 다음과 같다.

- bug-2-UNIT-003 행과 `coverage_gaps`: 처음 글 "재귀 안에서 잡는 구현"은 넓었다. 재귀 안에서 넘친 순간의 커서를 쓰는 구현은 bug-2-UNIT-005에서 실패한다(술어를 따라간 것이고 실행하지 않았다). PO 사본의 조건대로 "잡고 고정된 위치를 쓰는 구현"으로 좁혔다.
- 이 기록: 적용 판단의 ID를 `PO1-N`으로 고쳤고, `sm-1`에서 이어 쓰는 항목의 이름을 그 문서의 표대로 맞추었으며, 범주 4.5의 근거를 섹션 비교로 바꾸었다.

고친 뒤 위 "개수와 추적 재확인"과 "실행한 명령과 결과"의 문서 점검을 다시 돌렸고 값이 같다. 체크리스트의 Execution deviations에 해당하는 일은 없었다.

## 지침과 다른 점

- `AGENTS.md` 섹션 Research for uncertainty and core implementation decisions는 핵심 기술 결정 전에 참고 자료 다섯 개의 조사를 요구하고, `.bmad-core/tasks/create-next-story.md` 섹션 In a run의 3.3은 SM이 그 결정을 조사 대신 틈으로 보고하게 한다. 이 차이는 PO 회차 1이 `po-r1`에 적었다. 이번 호출은 외부 자료를 읽지 않았고, 사용자가 조사 없이 받은 결정을 적었으며 요건을 채웠다고 적지 않았다.
- PO 피드백은 N-6의 글에 짧은 식이 깊이 오류로 번역되는 경우를 더해도 된다고 하고, 지시는 PO1-N1 ~ PO1-N6을 Story에 맞추어 적지 않는다고 한다. 그 사실은 PO1-N5에 있으므로 지시대로 N-6의 글을 고치지 않았다. 피드백의 글은 허용이어서 어긋나지 않는다.

## 읽은 규칙과 입력

`.bmad-core/tasks/load-project-rules.md`대로 이 호출에서 읽었다. 임시 자료 없이 도구의 출력으로 읽었고 잘린 범위는 나누어 다시 읽었다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`, 그리고 `.bmad-core/core-config.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`, `javascript-crap`.
- 읽지 않은 본문: `coding-principles`, `comments`, `crap`. SM의 규칙 종류가 아니다. 인용한 규칙 ID는 Story에 이미 있던 것이고 새로 인용한 CC-JS-006, CL-GLD-OPS-006은 읽은 본문에 있다.
- 끝까지 읽은 절차와 자료: `agents/sm.md`, `project-map.md`, `tasks/create-next-story.md`, `tasks/create-next-story-style.md`, `tasks/validate-loop.md`, `tasks/execute-checklist.md`, `tasks/test-design.md`, `tasks/research-decision.md`, `checklists/story-draft-checklist.md`, `templates/story-tmpl.yaml`, `data/finding-classification.md`, `data/agent-context.md`, `data/story-paths.md`, `data/story-slicing.md`, `data/verification-ownership.md`, `data/development-quality.md`, `data/domain-language.md`.
- 일부만 읽은 파일: `tasks/run-story.md`의 섹션 Stop, hold and carry on, `tasks/validate-next-story.md`의 앞부분과 섹션 Continued applicability of earlier PO results, `data/workflow-routing.md`의 섹션 Story temporary material과 In a run, `data/future-work-planning.md`의 찾은 줄. 읽지 않은 파일: `data/test-levels-framework.md`, `data/test-priorities-matrix.md`, `data/defect-diagnosis.md`. 수준과 우선순위, 재현을 바꾸지 않았다.
- 끝까지 읽은 입력: Story, `sm-1`, `po-r1`, PO 피드백 문서, `docs/architecture.md`, `docs/prd.md`, `docs/planning/decisions.md`, `src/engine.js`, `src/screen.js`, `test/engine.test.js`, `test/screen.test.js`. 외부 자료는 읽지 않았다.
