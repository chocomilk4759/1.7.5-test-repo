# sm-2 — Story 1.3 Dev 기록의 두 문장 정정

- Story: [tech-debt-3](../../stories/tech-debt/tech-debt-3.story.md)
- Entry: SM Draft Checklist 2회
- 작성자와 실제 검토자: SM 하위 세션 Bob, 모델 `claude-opus-5-5`, `*run-story tech-debt-3 remote to Done` run의 역할 작업
- 시각: 2026-11-07, 메인 세션의 스냅샷 06:25 +0900 뒤에 시작, Story 수정의 저장 06:32 +0900 전후, 이 기록의 값은 그 뒤의 재측정
- 입력 기준: `main` 20256e4. 로컬 커밋이고 fetch하지 않았다. Story와 기록 문서는 커밋하지 않은 초안이다. 수정 전 Story(`git hash-object --no-filters` 값 `8779e610e194`)는 PO 회차 1이 적은 값 `43722f291fa9`의 글에 PO Validation의 1회 항목만 더한 것이다(그 사본과 `diff`, 사본에만 있는 줄 0, Story에만 있는 줄 30)
- 범위: `.bmad-core/tasks/create-next-story.md`의 explicit revision. 수정 범위는 PO 검증 1회의 열린 차단 지적 PO1-B1과, SM이 값어치 있다고 본 계약 안의 비차단 지적이다. 체크리스트 `.bmad-core/checklists/story-draft-checklist.md`를 이 호출에서 한 번 실행했고 Story 전체를 다시 읽었다

## 지적마다의 처리

| ID | 분류 | 처리 | 저장한 글의 자리 |
| --- | --- | --- | --- |
| PO1-B1 | 차단, `rework`, SM | 고쳤다. 이의 없음. 다음 PO 회차가 확인한다 | Dev Notes "파일 위치"의 "바꾸는 경로" 행과 그 다음 문단, tech-debt-3-INSP-004, 표 "추적"의 AC 3 행, Risk Coverage의 새 행, Dev Notes "기술 제약"의 "이 Story의 변경은" 문장 |
| PO1-N2 | 비차단, 계약 안 | 적용. gate 이름을 `docs/qa/gates/tech-debt-3-story-1-3-dev.yml`로 고쳤다 | "파일 위치"의 `qa-` 문서와 gate의 행 |
| PO1-N3 | 비차단, 계약 안 | 적용 | `coverage_gaps`의 새 줄, tech-debt-3-INSP-004의 끝 문장 |
| PO1-N4 | 비차단, 계약 안 | 적용 | "판정 방법"의 "두 기준에 공통으로" 문단, 첫째 문장의 거부하는 글 |
| PO1-N5 | 비차단, 계약 안 | 적용 | tech-debt-3-INSP-001의 실패 |
| PO1-N1 | 비차단, 계약 밖 | 적용하지 않았다. 지시와 `.bmad-core/data/finding-classification.md` step 7대로 PO Validation에 남고 병합 뒤 점검이 옮긴다 | 없음 |

PO1-N2 ~ PO1-N5의 적용 판단은 다음과 같다. 모두 새 동작이나 새 입력 부류를 더하지 않는다. PO1-N2는 절차가 이미 정한 이름을 적는 일이고, "바꾸는 경로" 행이 이제 AC 3의 합격 판정에 쓰이므로 값어치가 낮지 않다. PO1-N3은 기록이 잰 범위 밖까지 말하지 않게 하는 일이고 이 Story가 고치는 꼴과 같은 결함을 막는다. PO1-N4와 PO1-N5는 값어치가 낮지만 두 기준과 두 문장의 판정을 같게 하며 글을 옮기거나 좁힐 뿐이다. 계약 안의 판단은 step 7의 "a case or assertion that makes an existing rule or scenario more specific stays inside the contract"에 선다.

## PO1-B1의 수정과 세 곳의 판정

AC 3의 글은 바꾸지 않았다. AC 3이 가리키는 표의 "바꾸는 경로"를 네 행으로 넓혔고, tech-debt-3-INSP-004가 같은 행을 받는 경로로 삼아 경로를 따로 적지 않는다. 끝 문장 "QA가 돌릴 때는 QA의 gate와 `qa-` 기록을 받는 경로에 더한다"는 지웠다. 표가 QA 단계의 경로를 들어 Dev가 돌릴 때와 QA가 돌릴 때의 집합이 같다.

저장한 글로 다시 읽어 판정했다. Story는 시작하지 않아 tech-debt-3-INSP-004를 돌릴 수 없으므로 입력은 `.bmad-core/tasks/local-story-start.md`의 글과 `.bmad-core/data/story-paths.md` 섹션 Record documents의 이름에서 얻었고, 아래 판정은 술어를 따라간 것이다.

| `git diff --name-only {기준}`의 경로 | AC 3과 "바꾸는 경로" | tech-debt-3-INSP-004 | 같은가 |
| --- | --- | --- | --- |
| `docs/stories/tech-debt/tech-debt-3.story.md` | 받음(Story 파일의 행) | 받음 | 같다 |
| `docs/story-records/tech-debt-3/`의 `sm-1.md`, `sm-2.md`, `po-r1.md`, 다음 회차의 `po-` 문서 | 받음(`sm-`, `po-` 행) | 받음 | 같다 |
| 같은 폴더의 `dev-1.1.md`, `dev-2.1.md`, `dev-dod-1.md`, QA 수정의 `dev-` 문서 | 받음(`dev-` 행) | 받음 | 같다 |
| 같은 폴더의 `qa-r1.md`, `qa-done.md` | 받음(`qa-` 문서와 gate의 행) | 받음 | 같다 |
| `docs/qa/gates/tech-debt-3-story-1-3-dev.yml` | 받음(`qa-` 문서와 gate의 행) | 받음 | 같다 |
| 같은 폴더의 `sm-`, `po-`, `dev-`, `qa-` 문서가 아닌 파일 | 실패 | 실패 | 같다 |
| `docs/story-records/1.3/` 아래 새 파일, `docs/qa/gates/1.3.yml` | 실패 | 실패 | 같다 |
| `src/`, `test/` 아래 파일, `docs/planning/future-work.md` | 실패 | 실패 | 같다 |

수정 전에는 `sm-`, `po-` 문서에서 판정이 갈렸고(AC 3은 실패, tech-debt-3-INSP-004는 통과, `docs/story-records/tech-debt-3/po-r1.md`의 섹션 "차단 지적 PO1-B1"), 같은 폴더의 다른 파일도 그랬다.

같은 절차를 지난 Story bug-2의 커밋에 이 규칙을 키만 바꾸어 대어 보았다. 실행이 아니라 대조이고 이 Story의 결과가 아니다.

| 대조 | 명령의 바탕 | 결과 |
| --- | --- | --- |
| 새 규칙 | `git diff --name-only 9aea191 refs/archive/story/bug-2`를 `docs/stories/bug/bug-2.story.md`, 네 접두어의 기록, `docs/qa/gates/bug-2.yml`로 거름 | 안 12개, 밖 3개 `src/engine.js`, `test/engine.test.js`, `test/screen.test.js`. 그 Story는 코드를 고치는 일이어서 밖의 셋이 있고, 이 Story의 표대로면 실패로 잡힌다 |
| 수정 전의 표(Story와 `dev-`) | 같은 목록을 그 둘로 거름 | 밖 10개. `sm-`, `po-` 기록 4개, `qa-` 기록 2개, gate, 코드와 시험 3개. `qa-`와 gate는 수정 전에도 표 다음 문단이 더했고, `sm-`, `po-` 4개가 PO1-B1의 경로다 |
| 수정 전의 tech-debt-3-INSP-004(Story와 폴더) | 같은 목록을 그 둘로 거름 | 밖 4개. gate와 코드, 시험 |
| 새 명령 | `git diff --name-only --no-renames --diff-filter=MD 6741bd9 refs/archive/story/bug-2 -- docs/story-records/bug-2/` | 출력 없음. 시작 커밋 6741bd9의 제목은 `[story-bug-2] Story Status: Approved -> InProgress`다 |

Story 시작 커밋의 제목 `[story-tech-debt-3] Story Status: Approved -> InProgress`는 `.bmad-core/tasks/local-story-start.md`의 "`[story-{story_id}] Story Status: Approved -> InProgress`"에서 왔다.

## PO 피드백 밖에 더한 것

"Dev가 고치지 않는다"는 "바꾸는 경로" 행이 새로 적는 규칙이고, `sm-`, `po-` 경로는 시작 커밋 뒤 늘 나오므로 경로의 집합으로는 재지 못한다. `.bmad-core/tasks/test-design.md` 섹션 5는 Dev Notes가 적은 규칙을 그것을 재는 점검까지 따라가라고 한다. 그래서 tech-debt-3-INSP-004에 시작 커밋 뒤의 고침과 지움을 찾는 명령 하나를 더했고 실패에 그 경우를 적었다. `--no-renames`는 이름을 바꾼 경우가 지움으로 나오게 한다. 시작 뒤의 계획 수정이 더하는 새 `sm-`, `po-` 문서는 `--diff-filter=MD`에 들지 않는다.

처음에는 이 틈을 `coverage_gaps`에 적었다가 지웠다. 재는 명령이 한 줄이고 별도 도구가 필요 없어서다. 시나리오의 ID, 수준, 우선순위, 실행 방식은 그대로이고 실행 근거 `git diff`도 같다. 소유권 점검 `.bmad-core/utils/checks/check-owned.sh`의 `role_owns`와 `started_record`도 Dev의 그런 변경을 보고하지만, 메인 세션의 점검이어서 Story의 시나리오로 삼지 않았다. 이 더함은 PO 피드백의 글 밖이므로 SM Draft Checklist 2회에 적었고 다음 PO 회차가 함께 본다.

## 범주 결과

| 범주 | 결과 | 근거 |
| --- | --- | --- |
| Project policy checks | PASS | 아래 "Project policy 항목별 근거" |
| 1. Goal & Context Clarity | PASS | 이어 씀. Story 문장과 Scope and Dependencies의 글이 호출 시작 때와 같다(아래 섹션 비교). `check-stage.sh deps`의 `story tech-debt-3 story 1.3`, `check-merge.sh status 1.3 main`의 `merged` 줄을 다시 봤다 |
| 2. Technical Implementation Guidance | PASS | `docs/architecture.md`를 이 호출에서 끝까지 읽었다. 고친 글은 기록과 gate의 경로이고 "소스 트리"에 닿는 새 코드 경로가 없다. 표가 바꾸는 경로와 바꾸지 않는 경로를 경로로 든다. 환경 변수와 문서 대조 대상은 바꾸지 않았다 |
| 3. Reference Effectiveness | PASS | 새 참조 셋의 글을 읽어 대조했다. `.bmad-core/tasks/local-story-start.md`의 "this commit adds it and the files of its record folder to the Story branch", `.bmad-core/tasks/qa-gate.md`의 "`{qa.qaLocation}/gates/{story_key}-{slug}.yml`", `.bmad-core/data/story-paths.md` 섹션 Slug. 제목의 slug를 그 규칙대로 내면 `story-1-3-dev`다(아래 명령). 줄 번호는 없다 |
| 4. Self-Containment Assessment | PASS | AC 3의 합격 판정이 한 집합으로 정해졌다. 더한 경로는 항목의 요구 "앞선 기록(dev-dod-2, dev-qa-r2)은 고쳐 쓰지 않고 코드와 시험은 바꾸지 않는다"에 닿지 않아 소유자의 결정이 필요하지 않고, PO도 경로 `rework`로 두었다. 그 밖의 합격 판정을 바꾸는 읽기는 없다. Canonical Implementation Source는 지정한 절이 없어 N/A |
| 4.5. Comment Contract | PASS | 고친 Dev Notes와 Testing의 글을 읽었다. Tasks / Subtasks 섹션은 바꾸지 않았고 코드나 주석에 ID를 넣으라는 지시를 더하지 않았다. 새 IN-FLIGHT 지시가 없다. Dev Notes의 "새 주석과 머리글을 쓸 일이 없고"는 그대로다 |
| 5. Testing Guidance | PASS | 수준, 실행 방식, 합계를 바꾸지 않았고 다시 쟀다(아래). SubTask에서 시작해 시나리오 행을 다시 읽었다. tech-debt-3-INSP-004의 받는 경우와 실패가 위 표의 입력마다 판정을 낸다. 코드를 바꾸지 않아 Hardener 시나리오와 변이 점검의 판단은 그대로다 |

최종 판정: READY. 차단 지적을 처리했고, 끝나지 않았거나 검토하지 않은 적용 점검이 없다. PO 검증이나 Approved가 아니다.

## Project policy 항목별 근거

바꾼 글이 닿는 항목만 다시 판정했다. 나머지는 아래 "이어 쓴 근거"대로 `sm-1`의 판정을 잇는다.

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 현재 작업과 사실, 편집 이력 없음 | PASS | 새 글은 경로와 조건을 적는다. 날짜와 회차는 SM Draft Checklist와 Change Log에만 있고 Task와 제목에 없다 |
| PRD 정체성과 승인된 뜻 | PASS | `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`를 바꾸지 않았다. AC 3개의 글이 호출 시작 때와 같다(섹션 비교) |
| AC와 출처 | PASS | AC 섹션이 같고, "바꾸는 경로"는 AC가 아닌 Dev Notes의 표다. AC 3의 `Source:` 줄이 든 글을 바꾸지 않았다 |
| 기존 Story와 QA 기록 | PASS | Story 1.3의 파일과 gate, `sm-1`, PO Validation 1회, `po-r1`을 바꾸지 않았다. PO Validation의 옛 gate 이름 인용은 PO의 기록이어서 그대로다(그 줄이 Story에서 옛 이름의 유일한 일치다) |
| 임시 자료 | PASS | 이 호출은 임시 자료를 만들지 않았다. 점검은 파일 없는 명령과 파이프로 했고, PO의 사본과 메인 세션의 스냅샷 사본은 읽기만 했다. 진단 스크립트 파일을 만들지 않았다. 메인 세션이 지정한 보고 파일은 그 세션의 실행 재료여서 내 임시 자료로 적지 않았다 |
| Story의 임시 자료 지시 | PASS | 새 글에 임시 경로가 없다. 검색 결과는 아래 |
| 측정 합계와 소계 | PASS | 아래 "개수와 추적 재확인" |
| 작업 경계 | PASS | "바꾸는 경로" 네 행을 경로로 적었다. 집합을 개수로 정한 곳이 없다 |
| 출처와 위치 표기 | PASS | 새 글은 파일, 섹션, 행 이름, 시나리오 ID로 적었고 줄 번호가 없다 |
| 실행 가능성 주장 | PASS | `coverage_gaps`의 새 줄은 "이 checkout의 .git/info/exclude"로 한정했다. `grep -c '^/.bmad-core/$' .git/info/exclude`가 1, `git ls-files .bmad-core`가 0개다. "바꾸지 않음" 행의 다른 경로는 `git ls-files`로 모두 추적되어 그 시나리오가 잰다 |
| Task 문구 | PASS | SubTask의 글을 바꾸지 않았다 |
| 선택지 비교 표 없음 | PASS | 위 표는 입력별 판정이고 선택지 비교가 아니다. Story에 새 비교 표가 없다 |

## 이 수정이 닿는 다른 글

| 글 | 판정 |
| --- | --- |
| "기술 제약"의 "이 Story의 변경은 Story 파일과 그 기록 폴더뿐이어서" | gate가 "바꾸는 경로"에 들어 어긋나므로 "Story 파일, 그 기록 폴더, QA의 gate뿐이어서"로 고쳤다 |
| "결과와 범위", "범위 밖", "미결 항목과 선행 조건" | 경로 집합을 말하지 않는다. 고칠 것이 없고 Scope and Dependencies의 글이 같다 |
| "미결 항목과 선행 조건"의 "그 시나리오는 미완료 점검으로 남으며" | tech-debt-3-INSP-001의 새 글이 이 문장을 가리켜 맞는다. `coverage_gaps`의 "refs/archive/story/1.3이 있는 checkout에서만 돈다"와도 맞는다 |
| Recommended Execution Order의 "값이 표와 다르면 멈추고 시나리오의 실패 기준대로 한다" | 값이 다른 경우의 글이 그대로여서 맞는다 |
| 표 "추적"의 AC 3 행 | "바꾸는 경로"를 더했고 시나리오는 tech-debt-3-INSP-004다 |
| Risk Coverage | `sm-`, `po-` 문서를 고치는 경우의 행을 더했다. 나머지 행은 그대로 맞다 |
| SubTask 1.1, 2.1 | tech-debt-3-INSP-004를 그대로 가리키고 글이 같다 |
| 항목 "[Tech-Debt] Story 1.3 Dev 기록의 두 문장"의 인용 | 원문 그대로다 |

`docs/planning/future-work.md`를 "바꾸지 않음" 행에 둔 것은 `.bmad-core/data/future-work-planning.md`의 "No role changes the future-work file on a Story branch"와 맞는다. 계획 문서를 바꾸지 않아 계획 커밋이 없다.

## 개수와 추적 재확인

저장한 Story를 파일 없는 명령으로 쟀다.

| 측정 | 대상과 방법 | 결과 |
| --- | --- | --- |
| 시나리오 행 | `^\| tech-debt-3-` 행, 열 수 | 6개, 모두 8열 |
| 수준 | Level 열 | integration 1, inspection 5. Overview, `by_level`과 같다 |
| 우선순위 | Priority 열 | P1 2, P2 3, P3 1. Overview, `by_priority`와 같다 |
| 실행 방식 | Execution 열 | automated 3, agent-review 3, user-only 0. Overview, `by_execution`과 같다 |
| 실행 맵 | `test_design.execution`의 ID | 각 ID가 한 번씩이고 행과 같다. `coverage_gaps`에 한 줄을 더했고 개수에 들지 않는다 |
| SubTask와 시나리오 | SubTask 1.1의 INSP-001, 002, 003, 004, INT-001과 2.1의 INSP-005, 004를 표의 Task 열과 대조하고 고친 행의 기대와 실패를 읽었다 | 같다. 각 점검이 그 SubTask의 결과를 덮는다 |
| 줄 수 | `wc -l`, 저장한 Story | 455줄. `.bmad-core/tasks/create-next-story-style.md`의 구조 재검토 기준 600줄 아래 |

표 1 ~ 3과 P-1 ~ P-4는 고치지 않았고, `main` 20256e4에서 다시 내어 같음을 봤다.

| 잰 것 | 명령 | 결과 |
| --- | --- | --- |
| 줄 수 | `git diff --numstat e71238d 6701dcd -- docs/stories/1.3.story.md` | 29, 4 |
| 지운 줄 | 같은 비교의 `-` 줄에서 머리 줄을 뺌 | 4줄. `InProgress`와 File List의 세 줄 |
| 앞선 기록 문서 | `git ls-tree --name-only e71238d docs/story-records/1.3/`, `git diff --name-status e71238d 6701dcd -- docs/story-records/1.3` | 11개, `A` 5개이고 그 밖의 줄이 없다 |
| 40 | 표 2의 명령을 `grep -c`로, `8579e5a`, `6701dcd`, `6188a27`, HEAD | 모두 4 |
| 표 3 | `git hash-object` | `18eb39bc4ecb...`, `058eb6c45a1f...`로 표 3과 같다 |
| 폭의 값 | `grep` | `EXPECTED_WIDTH = 48`, `SCREEN_WIDTH = 48` |
| 커밋의 자리 | `git for-each-ref --contains e71238d` | `refs/archive/story/1.3`만 |

## 이어 쓴 근거

`sm-1`의 다음 판정은 다시 하지 않고 잇는다. 비교는 `git diff --stat 6188a27 HEAD`의 출력이 `docs/planning/future-work.md`의 더한 줄 4, 지운 줄 12뿐이라는 것과, 수정 전 Story가 PO가 읽은 글에 PO Validation만 더한 것이며 이 수정이 고친 글은 Dev Notes, SM Draft Checklist, Change Log뿐이라는 것이다.

- `sm-1`의 "유형 Story의 조건": 키, 경로, 중복, `[Tech-Debt]` 출처의 요소. 항목 제거는 20256e4에 병합되었다.
- `sm-1`의 "정정을 담는 자리의 판단". PO 회차 1이 맞다고 판정했다.
- `sm-1`의 "Project policy 항목별 근거" 가운데 위 표에 없는 항목: 새 주석의 언어와 쓸모, 위반과 기존 잔여물 구분, 승인 주장, 주석 위생 기준, Convention Sections 목록, 실행 비용. 승인 주장이 든 Scope and Dependencies의 글이 같고, 주석 위생과 실행 비용의 문장은 "기술 제약"에서 고치지 않은 문장이다.
- `sm-1`의 "설계 입력 읽기" 가운데 이 호출에서 읽지 않은 파일: `docs/prd.md`, `docs/planning/decisions.md`, `docs/stories/tech-debt/tech-debt-1.story.md`, `.github/workflows/ci.yml`, `package.json`, `README.md`, 앞선 Story의 기록.
- `sm-1`의 실행 어긋남 F-1은 그 기록과 1회 항목에 그대로 남는다. PO 회차 1이 복구를 확인했다.

## 실행한 명령과 결과

| 명령 | 결과 |
| --- | --- |
| `sh .bmad-core/utils/checks/check-instructions.sh` | 종료 상태 0 (시작 때와 수정 뒤) |
| `git status --short --untracked-files=all`, `git rev-parse HEAD`, `git branch --show-current` | Story, `po-r1`, `sm-1`, 이 기록만 추적되지 않음, 20256e4defbc36ab3d1e7cbce224a265e4121034, `main` |
| `git diff --stat 6188a27 HEAD` | `docs/planning/future-work.md`의 변경뿐 |
| `node --version` | v24.22.1 |
| `node --test`, 프로젝트 루트 | 76개 통과, 실패 0. 코드와 시험을 바꾸지 않았다 |
| `node ci/screen-rule.check.mjs` | 종료 상태 0 |
| `sh .bmad-core/utils/checks/check-stage.sh deps` | 종료 상태 1, `story tech-debt-3 story 1.3`. `missing tech-debt-1 story`는 이 Story가 아닌 씨앗의 줄이고 `po-r1`과 같다 |
| `sh .bmad-core/utils/checks/check-stage.sh future --story tech-debt-3` | 종료 상태 0, `Revisit:` 알림 둘 |
| `sh .bmad-core/utils/checks/check-merge.sh status 1.3 main` | 종료 상태 0, `merged 937f21c5a4d5cc5623f90caefa08dd3e137d89f5` |
| `sh .bmad-core/utils/checks/check-stage.sh records`, Story | 종료 상태 0, 출력 없음 |
| `sh .bmad-core/utils/checks/check-stage.sh po-record`, Story | 종료 상태 0, 회차 1의 route 줄과 verdict 줄 그대로 |
| 제목의 slug: `printf`로 제목을 넘겨 `tr`, `sed`로 섹션 Slug의 규칙을 따름 | `story-1-3-dev` |
| `BMAD_TEMP_PATTERN` 검색, Story와 이 기록 | 일치 없음 |
| `invisible-chars.awk`, Story와 이 기록 | 일치 없음 |
| 저장 줄 검색, 이 기록 | 일치 없음 |
| 줄 좌표 검색(`파일:숫자`, `#L숫자`), Story와 이 기록 | 일치 없음 |
| 호출을 시작할 때의 Story 사본과 `## ` 섹션별 `git hash-object` 비교 | Status, Story, Scope and Dependencies, Acceptance Criteria, Tasks / Subtasks, PO Validation, Dev Agent Record, QA Results가 같다. 바뀐 섹션은 Dev Notes, SM Draft Checklist, Change Log뿐이다 |

돌리지 않은 것: tech-debt-3-INSP-004는 Story가 시작하지 않아 돌릴 수 없고 위 표의 판정은 술어를 따라간 것이다. 소유권 점검 `check-owned.sh sm`은 메인 세션의 일이다. Story의 시나리오의 처음 실행은 Dev의 일이다.

## 수정과 재확인

저장한 Story의 고친 곳을 모두 다시 읽었다. "파일 위치"의 표와 다음 문단, "기술 제약"의 위험 문단, "판정 방법"의 두 기준과 공통 문단, tech-debt-3-INSP-001, tech-debt-3-INSP-004, 표 "추적", Risk Coverage, `coverage_gaps`, SM Draft Checklist 2회, Change Log다. 같은 호출 안에서 고친 것은 다음과 같다.

- tech-debt-3-INSP-004와 `coverage_gaps`: 처음에는 `sm-`, `po-` 문서의 글을 재지 못한다는 줄을 `coverage_gaps`에 적었다. 다시 읽으니 Dev Notes가 적은 규칙을 재는 시나리오가 없어 위 "PO 피드백 밖에 더한 것"대로 명령을 더했고 그 줄을 지웠으며 Risk Coverage에 행을 더했다. 고친 뒤 위 판정과 개수를 다시 봤다. 합계는 그대로다.

체크리스트의 Execution deviations에 해당하는 일은 이 호출에 없었다.

## 지침과 다른 점

없다. 프로젝트 밖 자료는 읽지 않았다. 사용자의 말로 이 호출에서 면제되었고 `AGENTS.md`의 조사 요건을 채운 것이 아니다. 이 수정에 핵심 기술 결정이 없어 그 요건에 닿지 않는다.

## 읽은 규칙과 입력

`.bmad-core/tasks/load-project-rules.md`대로 이 호출에서 읽었다. 임시 자료 없이 도구의 출력으로 읽었다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`, 그리고 `.bmad-core/core-config.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`.
- 읽지 않은 본문: `coding-principles`, `comments`, `crap`. SM의 규칙 종류가 아니다. `javascript-crap`은 코드를 바꾸지 않아 필요하지 않았다.
- 끝까지 읽은 절차와 자료: `agents/sm.md`, `project-map.md`, `tasks/create-next-story.md`, `tasks/create-next-story-style.md`, `tasks/execute-checklist.md`, `tasks/test-design.md`, `tasks/validate-loop.md`, `tasks/local-story-start.md`, `checklists/story-draft-checklist.md`, `templates/story-tmpl.yaml`, `data/agent-context.md`, `data/finding-classification.md`, `data/story-paths.md`, `data/story-slicing.md`, `data/verification-ownership.md`, `data/development-quality.md`, `data/domain-language.md`, `utils/checks/check-owned.sh`.
- 일부만 읽은 파일: `tasks/run-story.md`의 섹션 Checks after each task의 앞부분, `tasks/validate-next-story.md`의 섹션 Continued applicability of earlier PO results, `tasks/qa-gate.md`의 gate 이름 줄, `data/workflow-routing.md`의 섹션 Story temporary material, `data/future-work-planning.md`의 그 줄 주변. 읽지 않은 파일: `data/test-levels-framework.md`, `data/test-priorities-matrix.md`. 수준과 우선순위를 바꾸지 않았다.
- 끝까지 읽은 입력: Story, `sm-1`, `po-r1`, PO 피드백 문서, `docs/architecture.md`. 외부 자료와 원격은 읽지 않았다.
- 꼴을 맞추려고 읽은 앞선 기록: `docs/story-records/bug-2/sm-2.md`와 `docs/stories/bug/bug-2.story.md`의 SM Draft Checklist, Change Log. 규칙으로 쓰지 않았다. Story bug-2의 커밋은 위 대조에만 썼다.
