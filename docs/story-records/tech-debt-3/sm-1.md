# sm-1 — Story 1.3 Dev 기록의 두 문장 정정

- Story: [tech-debt-3](../../stories/tech-debt/tech-debt-3.story.md)
- Entry: SM Draft Checklist 1회
- 작성자와 실제 검토자: SM 하위 세션 Bob, 모델 `claude-opus-5-5`, `*run-story tech-debt-3 remote to Done` run의 역할 작업
- 시각: 2026-11-07, 값의 재측정 05:48 +0900, 초안 저장 05:53 +0900 이후
- 입력 기준: `main` 6188a27. 로컬의 `origin/main`과 같고 fetch하지 않았다. Story와 이 기록은 커밋하지 않은 초안이다.
- 범위: Story 전체. 실행한 체크리스트는 `.bmad-core/checklists/story-draft-checklist.md`이고, 이 호출에서 한 번 실행했다. 절차는 SM `*draft-standalone [Tech-Debt] Story 1.3 Dev 기록의 두 문장`이다(`.bmad-core/tasks/brownfield-create-story.md`, `.bmad-core/tasks/create-next-story.md`의 Typed source).

## 범주 결과

| 범주 | 결과 | 근거 |
| --- | --- | --- |
| Project policy checks | PASS | 아래 "Project policy 항목별 근거". 임시 자료 항목은 실행 어긋남 F-1의 확인된 복구다 |
| 1. Goal & Context Clarity | PASS | Story 문장과 "결과와 범위": "이 Story의 Completion Notes에 두 문장을 정정한 새 항목이 있고". 이 Story는 Epic이 없어 Epic에 관한 항목은 식별된 출처(원천 항목과 커밋 6188a27의 트리아지)로 판정했다. 의존은 저장 줄 하나로 있고 표가 선행과 까닭, 근거를 든다. 값어치는 gate의 `failure_scenario`를 인용했다 |
| 2. Technical Implementation Guidance | PASS | Dev Notes "파일 위치"가 바꾸는 경로, 읽기만 하는 경로, 바꾸지 않는 경로를 표로 들고, 정정 항목의 자리와 링크를 적는다. 쓰는 기술은 Git 명령과 Node.js 점검이고 환경 변수는 쓰지 않는다. Architecture 본문을 끝까지 읽었다(아래 "설계 입력 읽기"). 사용자에게 보이는 동작이 바뀌지 않아 문서 대조 대상을 `docs/architecture.md`, `README.md`로 적었고, 내장 도움말이 없음을 `src/` 목록으로 확인했다 |
| 3. Reference Effectiveness | PASS | 참조는 파일과 섹션 이름, 행 이름, 짧은 인용이고 줄 번호가 없다. Story 1.3의 기록은 "이전 Story"에 요약했다. D-1, D-2가 닿지 않는 까닭을 적었다. `docs/research`는 없다. 지운 항목의 글은 Story에 옮겼고 커밋 6188a27로 찾을 수 있다 |
| 4. Self-Containment Assessment | PASS | 항목의 글, 영향받는 기록, 그대로 둘 때의 비용, 사용자의 말, 표 1 ~ 3의 값, 판정 방법이 Story에 있다. 부모가 미리 정하라고 한 매개변수는 없다. 합격 판정을 바꿀 수 있는 읽기는 아래 "정정을 담는 자리의 판단"에서 따로 판정했다. Canonical Implementation Source: 지정한 절이 없어 N/A |
| 4.5. Comment Contract | PASS | Tasks, Dev Notes, Testing을 읽었다. Dev Notes: "이 Story는 코드와 시험을 바꾸지 않아 새 주석과 머리글을 쓸 일이 없고, IN-FLIGHT 표시를 만들지 않는다". 새 IN-FLIGHT 지시와 기존 항목은 없다. 코드에 추적 ID를 넣으라는 지시가 없고, 정책 ID는 Dev Notes의 글에만 있다 |
| 5. Testing Guidance | PASS | 수준과 실행 방식은 시나리오 표에, 접근은 Task에 따로 있다. 실행 수준 시나리오 tech-debt-3-INT-001은 시험 지점을 적었고 대역이 없다. 읽어서 판정하는 시나리오는 "판정 방법"이 받는 글과 거부하는 글을 든다. 아래 "개수와 추적 재확인" |

## Project policy 항목별 근거

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 새 주석의 언어와 쓸모 | PASS | 새 주석이 없다. Dev Notes: "새 주석과 머리글을 쓸 일이 없고" |
| 현재 작업과 사실, 편집 이력 없음 | PASS | Tasks와 제목에 날짜나 회차가 없다. Testing의 "Draft 때 관찰한 사실"은 관찰로 밝혔고 Dev가 다시 확인한다. 날짜는 수용 기록의 인용, SM Draft Checklist, Change Log에만 있다 |
| PRD 정체성과 승인된 뜻 | PASS | `docs/prd.md`를 바꾸지 않았고 Story가 바꾸지 말라고 적는다 |
| AC와 출처 | PASS | 부모 AC가 없는 유형 Story다. 항목의 "필요한 일"에 번호가 없어 AC 3개를 이 Story가 적었고 그 사실을 AC 머리 문장이 밝힌다. 들여쓴 `Source:` 줄이 3개다. 회귀 기준은 번호 없이 따로 두고 출처를 들었다. 항목의 다섯 줄은 커밋 6188a27의 글과 줄 단위로 대조해 모두 같다(`grep -xF`) |
| 위반과 기존 잔여물 구분 | PASS | 두 문장 말고 다른 문장을 다시 판정하지 않는다고 범위 밖에 적었다. 주석 위생은 대상 줄이 없다고 적었다 |
| 기존 Story와 QA 기록 | PASS | Story 1.3과 gate를 읽기만 했고, Story가 "고치지 않는다"고 적는다 |
| 임시 자료 | PASS(복구) | 아래 "실행 어긋남 F-1". 만든 임시 자료 셋(스크립트 파일, 점검 출력 폴더, 커밋 메시지 파일)은 프로젝트 임시 영역의 목적별 위치에 있고 이어가기 로그의 섹션 `## Story tech-debt-3`에 적었다. 메인 세션이 지정한 보고 파일은 그 세션의 실행 재료여서 내 임시 자료로 적지 않았다 |
| Story의 임시 자료 지시 | PASS | Dev Notes: "임시 자료는 프로젝트 임시 파일 정책(CL-GLD-OPS-008)을 따르고", "지우는 일은 병합이 확인된 뒤에 이 Story의 일회용 자료에만 한다". 경로를 적지 않았다 |
| 주석 위생 기준 | PASS | Dev Notes: 비교 기준은 Story 시작의 기준선 HEAD, 대상은 `src/`와 `test/`의 바뀐 줄이고 없음, 문맥 검토는 `.bmad-core/checklists/comment-hygiene-checklist.md` §3. 그 절("3. Post-Implementation Check")이 있음을 확인했다 |
| 승인 주장 | PASS | 결정자를 항목마다 적었다. 배정은 사용자(6188a27), 까닭은 PO이고 사용자의 말이 아니라고 적었다. 실행 요청과 조사 면제는 사용자, 키의 지정은 메인 세션이다. "정정을 담는 자리"는 수용된 결정이 아니라 SM의 읽기라고 적었다 |
| 측정 합계와 소계 | PASS | 아래 "값의 재측정"과 "개수와 추적 재확인" |
| 작업 경계 | PASS | 파일은 경로로 적었다. 개수만으로 집합을 정한 곳이 없다 |
| 출처와 위치 표기 | PASS | 파일과 섹션, 행 이름, 설정 키, 짧은 인용으로 적었고 줄 번호를 쓰지 않았다. Story의 40 검색 명령은 `grep -n`을 쓰지 않는다 |
| 실행 가능성 주장 | PASS | "이 checkout의 `git for-each-ref --contains e71238d`", "원격에 이 ref가 있는지는 보지 않았다"로 한정했다. 다른 읽기가 실행되지 않는다는 주장은 `check-owned.sh`의 `role_owns`를 든다 |
| Task 문구 | PASS | SubTask는 시나리오, 경로, 커밋 제목만 적고 구현식이 없다 |
| 선택지 비교 표 없음 | PASS | 두 읽기는 "정정을 담는 자리"의 글로 적었다 |
| Convention Sections 목록 | PASS | `convention-sections`는 Dev가 읽는 종류와 `testing-tdd`이고, `review-sections`는 `quality` 종류의 세 섹션이다. 모두 Common 색인에 있다. JavaScript 코드를 바꾸지 않아 `javascript-language`, `javascript-crap`을 들지 않았다. 선언이 곧 읽었다는 증거는 아니므로 내가 읽은 본문은 아래에 따로 적었다 |
| 실행 비용 | PASS | Dev Notes: "실행되는 코드를 바꾸지 않아 닿는 규칙이 없고 성능 측정을 계획하지 않는다" |

## 실행 어긋남 F-1

- 일: 이 호출의 값 확인에서 Story 1.3의 Dev Notes와 Testing의 40을 세는 읽기 전용 셸 스크립트 파일을 프로젝트 임시 영역의 스크립트 위치에 만들어 세 개정에 돌렸다.
- 어긋난 기준: `.bmad-core/agents/sm.md`의 "Do not implement Stories or create or modify executable code, including temporary diagnostic probes and reusable test support. For planning verification, use existing checks within the authorized scope." 앞선 결과에 PASS로 적은 일은 없다.
- 영향: 스크립트는 `git show`와 `awk`로 읽고 출력만 했다. 저장소의 파일, index, ref를 바꾸지 않았고 Story와 이 기록은 그 파일에 기대지 않는다.
- 복구 1, 멈춤: 그 뒤로 스크립트 파일을 만들지 않았고 점검은 파일 없는 명령으로 했다.
- 복구 2, 살핀 것: 그 파일과 이 호출의 임시 자료를 이어가기 로그에 일회용으로 적었다. 파일은 병합 뒤 정리 전까지 그대로 둔다.
- 복구 3, 다시 낸 값: 같은 검색을 파일 없는 명령으로 다시 냈다. `git show {개정}:docs/stories/1.3.story.md | awk '/^## Dev Notes/{on=1;next} /^## /{on=0} on' | grep -cE '(^|[^0-9.])40($|[^0-9A-Za-z])'`는 `8579e5a`, `6701dcd`, `6188a27`에서 모두 4다. Story의 표 2는 이 결과와 `grep -oE`로 본 네 곳의 글에서 왔다.
- 판정: 위 복구로 지금의 준비 상태는 PASS다. 이것은 실행이 처음부터 규칙에 맞았다는 뜻이 아니다.

## 유형 Story의 조건

| 조건 | 판정 | 근거 |
| --- | --- | --- |
| 키와 경로 | 맞음 | `git ls-tree -r --name-only`로 `main`, `story/bug-2`, `origin/main`의 `docs/stories` 아래 유형 폴더의 파일은 `docs/stories/bug/bug-2.story.md`, `docs/stories/tech-debt/tech-debt-1.story.md`뿐이다. 작업 트리도 같다. 커밋 6188a27의 future-work 파일에 `Closed items`가 없다. 가장 높은 번호 2의 다음인 3, 키 `tech-debt-3`, 경로 `docs/stories/tech-debt/tech-debt-3.story.md`는 지시와 같고 쓰기 전에 파일과 기록 폴더가 없었다 |
| 중복 | 없음 | 파일에서 `dev-dod-2`, `dev-qa-r2`를 찾으면 이 항목의 두 줄과, Story 1.2의 같은 이름 문서를 든 다른 항목 셋뿐이다. Story 1.3의 문서를 정정하는 다른 항목은 없다. `tech-debt-1`은 씨앗이고 `bug-2`는 엔진의 결함이다 |
| `[Tech-Debt]` 출처의 요소 | 모두 있음 | 영향받는 기록과 그대로 둘 때의 비용을 "영향받는 기록과 그대로 둘 때의 비용"에 적었다. 비용의 글은 항목이 출처로 든 gate의 `failure_scenario`다 |
| 항목 제거 | 계획 커밋이 한다(브랜치 `docs/tech-debt-3-draft`, 커밋 db5cf1b, 기준 `main` 6188a27) | `git diff --numstat`는 `docs/planning/future-work.md`에서 더한 줄 4, 지운 줄 12이고 그 커밋의 `git show --stat`도 같다. 지운 줄은 그 항목의 제목부터 빈 줄까지이고, 더한 줄은 빈 줄과 `## Closed items`, 빈 줄, 그 줄 하나다. 다른 항목의 글은 바꾸지 않았다. `check-stage.sh future --story tech-debt-3`는 종료 상태 0이고 `Revisit:` 알림 둘만 낸다 |
| `Closed items` 줄 | 남겼다 | `git grep -F`로 이 항목의 제목을 찾으면 항목 "[Tech-Debt] 재발: 기록의 서술이 실제와 다름"의 "더한 출처" 줄과 `docs/stories/1.3.story.md`의 `Post-merge check` 줄이 나온다. Markdown 링크와 앵커는 아니지만 지금의 글이 이 이름으로 정정할 일의 자리를 가리키므로, CC-DOC-009의 "verify affected incoming references resolve and still support their claims"를 채우려고 `.bmad-core/data/future-work-planning.md`의 형식(제목, 배정한 곳, 날짜)으로 남겼다. 그 재발 항목의 글을 고치면 `.bmad-core/utils/checks/future-work-rules.awk`가 찾은 내용을 더한 것으로 보아 `undecided`를 요구하므로 고치지 않았다 |

## 정정을 담는 자리의 판단

| 질문 | 판단 |
| --- | --- |
| 읽기 | 항목의 "Completion Notes의 새 항목"과 PO의 까닭 "병합된 Story에 정정을 담을 계획"은 Story 1.3의 파일에 항목을 더하는 읽기(ㄱ)와, 새 Story의 Completion Notes에 담는 읽기(ㄴ)를 모두 허락하는 글이다 |
| 각 읽기의 Task와 판정 | ㄱ은 `docs/stories/1.3.story.md`와 `docs/story-records/1.3/`에 쓰는 Task이고, `check-owned.sh`의 `role_owns`가 Dev에게 `"$story_dir"/*`를 거부하고 기록은 `"$own_folder/$1"-*`만 허락해 소유권 점검에서 실패한다. ㄴ은 이 Story의 파일과 기록 폴더에 쓰고 그 점검을 통과한다 |
| 처리 | ㄴ을 Story에 적었다. ㄱ은 실행할 수 없으므로 이 읽기가 AC의 합격 판정을 사용자의 결정 없이 고른 것이 아니다. 수용 문서에 적힌 결정이 아니라고 Story가 밝히고, 남는 불편은 N-1로 PO에 넘긴다 |

## 값의 재측정

`main` 6188a27, Windows x64, Node.js v24.22.1, 2026-11-07 05:48 +0900 전후. 표 1, 표 2, 표 3과 Testing의 관찰은 이 값이다.

| 잰 것 | 명령 | 결과 |
| --- | --- | --- |
| 커밋의 자리 | `git cat-file -t`, `git for-each-ref --contains` | `e71238d`, `6701dcd`, `8579e5a`는 commit이고 `refs/archive/story/1.3`만 담는다 |
| 지운 줄 | `git diff e71238d 6701dcd -- docs/stories/1.3.story.md`의 `-` 줄에서 머리 줄을 뺌 | 4줄, Status의 `InProgress`와 File List의 세 줄 |
| 줄 수 | `git diff --numstat e71238d 6701dcd -- docs/stories/1.3.story.md` | 29, 4 |
| 섹션 | 두 커밋의 Story를 `## ` 제목마다 나누어 `git hash-object`로 비교 | 다름 3(Status, Change Log, Dev Agent Record), 같음 8, 합계 11 |
| 앞선 기록 문서 | `git ls-tree --name-only e71238d docs/story-records/1.3/`, `git diff --name-status e71238d 6701dcd -- docs/story-records/1.3` | 11개, `A` 5개이고 그 밖의 줄이 없다 |
| 40 | 위 F-1의 명령 | 세 개정에서 4. 네 곳의 글은 표 2와 같다 |
| 범위의 글 | 세 개정의 `## Dev Notes` 구간의 `git hash-object` | 모두 `57b4a0bffca52ab6a798479cfdb9b5115272695a` |
| 문장의 있음 | `git show 8579e5a:docs/story-records/1.3/dev-qa-r2.md`, `git show 6701dcd:docs/story-records/1.3/dev-dod-2.md`에서 문장 찾기 | 각각 1줄 |
| 폭의 값 | `ci/screen-rule.check.mjs`, `src/screen.js`를 읽음 | `EXPECTED_WIDTH = 48`, `SCREEN_WIDTH = 48` |
| 앞선 기록의 해시 | `git hash-object`와 `git rev-parse HEAD:{경로}` | `dev-dod-2.md` `18eb39bc4ecbc7956f3d164bd3990bf739551591`, `dev-qa-r2.md` `058eb6c45a1ffafc2c3d8fc277777e9ab7a08d25`, 작업 트리와 커밋이 같다 |
| 회귀 | `node --test`, `node ci/screen-rule.check.mjs` | 76개 통과, 실패 0, 종료 상태 0 |
| 선행 | `sh .bmad-core/utils/checks/check-merge.sh status 1.3 main` | "merged 937f21c5a4d5cc5623f90caefa08dd3e137d89f5 (the archive ref records its confirmed merge)", 종료 상태 0 |
| future-work의 개수 | `##`, `###` 제목과 상태 줄을 셈 | 항목 45개, `unplanned` 44, `undecided` 1 |

이 값들은 Draft 때의 관찰이고 Dev의 실행 결과가 아니다. 탐침 코드를 쓴 일은 위 F-1뿐이고 제품 코드에 변형을 건 일은 없다.

## 설계 입력 읽기

`docs/architecture.md`는 "기술 구성", "소스 트리", "설계 원칙", "검토 기록"까지 끝까지 읽었다. 저장한 Tasks와 Testing이 닿는 절은 앞의 세 절이고 SubTask 2.1의 대조 기준이다. 기록만 바꾸는 일이어서 API, 데이터베이스, 화면 주제는 Architecture에도 없고 해당하지 않는다. `docs/planning/decisions.md`, `docs/planning/future-work.md`, `docs/stories/tech-debt/tech-debt-1.story.md`, `.github/workflows/ci.yml`, `package.json`, `README.md`도 끝까지 읽었다. `docs/prd.md`도 끝까지 읽었다. 이 일의 AC 출처가 아니고 Epic 1의 항목은 Story 1.1, 1.2, 1.3뿐이다. `ci/screen-rule.check.mjs`와 `src/screen.js`는 폭의 줄을 읽었다.

앞선 Story의 읽은 범위는 다음과 같다. `docs/stories/1.3.story.md`는 Completion Notes의 DEV-1 정정, DOC-001 기록, 처리 줄을 읽었고 그 밖에는 낱말 `DOC-001`로 찾은 줄과 그 주변을 읽었다. `docs/qa/gates/1.3.yml`은 `top_issues`의 DOC-001을, `docs/story-records/1.3/qa-r3.md`는 섹션 "분류의 근거: DOC-001"을, `docs/story-records/1.3/dev-qa-r3.md`는 섹션 "DOC-001 Dev 기록의 두 문장이 저장된 Story와 다르다"까지를, `docs/story-records/1.3/dev-dod-2.md`는 그 행을, `docs/story-records/1.3/dev-qa-r2.md`는 섹션 "REQ-002 Story의 수용된 결정과 계획의 글이 사용자의 결정과 어긋난다"를 읽었다. `docs/story-records/1.3/qa-done-2.md`는 낱말 `DOC-001`로 찾은 줄을 읽었다. `docs/stories/bug/bug-2.story.md`와 `docs/story-records/bug-2/sm-1.md`는 이 Story의 꼴을 맞추려고 일부를 읽었고 근거로 쓰지 않았다.

규칙은 `.bmad-core/tasks/load-project-rules.md`대로 읽었고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`.
- 읽지 않은 본문: `coding-principles`, `comments`, `crap`은 SM의 규칙 종류가 아니고 Cleaner 검토와 QA가 적용한다. `javascript-language`, `javascript-crap`은 이 일이 JavaScript 코드를 쓰거나 계획하지 않아 필요하지 않았다.
- 프로젝트 밖 자료는 조사하지 않았다. 사용자의 말로 면제되었고 조사 요건을 채운 것이 아니다. 이 일에 핵심 기술 결정이 없다.

## 개수와 추적 재확인

저장한 Story에서 다시 읽었다.

- 시나리오 행은 6개다: tech-debt-3-INSP-001, tech-debt-3-INSP-002, tech-debt-3-INSP-003, tech-debt-3-INSP-004, tech-debt-3-INT-001, tech-debt-3-INSP-005. 실행 맵의 `execution`에 각 ID가 한 번씩 있다.
- 수준: integration 1(INT-001), inspection 5. 합계 6으로 `scenarios_total`, Test Strategy Overview와 같다.
- 우선순위: P1 2(INSP-004, INT-001), P2 3(INSP-001, INSP-002, INSP-003), P3 1(INSP-005). 합계 6.
- 실행: automated 3(INSP-001, INSP-004, INT-001), agent-review 3(INSP-002, INSP-003, INSP-005), user-only 0. 합계 6.
- SubTask에서 시작한 대조: 1.1은 INSP-001, INSP-002, INSP-003, INSP-004, INT-001이고, 2.1은 INSP-005, INSP-004다. 참조한 ID가 모두 표와 맵에 있고 표의 모든 ID를 SubTask가 참조한다. 각 시나리오의 점검이 그 SubTask의 결과를 덮는다: 1.1의 값은 INSP-001, 글은 INSP-002, INSP-003, 경로는 INSP-004, 회귀는 INT-001, 2.1의 결론은 INSP-005다.
- Dev Notes "파일 위치"의 항목 자리와 링크는 "판정 방법"의 공통 문단이 거부 조건으로 들고 INSP-002, INSP-003이 본다.
- 받는 글과 거부하는 글은 "판정 방법"에, 입력별 값은 표 1 ~ 3에 있다. 이 Story는 현재 시험이 무엇을 잡거나 놓친다는 주장에 기대지 않는다고 Testing이 적는다.
- 커밋 제목은 `git.taskCommitPattern`의 꼴이다. `core.hooksPath` 설정이 없고 `.githooks`가 없다.
- 버전: `package.json` 0.1.0, 버전 정책과 `git.projectVersionFile`이 없어 바꾸지 않는다.
- 산출물: Story 하나와 이 기록 문서이고 다른 산출물이 없다. Story와 이 기록에 임시 경로가 없다.
- Story의 줄 수는 `wc -l`로 404이고 구조 재검토 기준 600줄 아래다.

## 비차단 메모의 제안

| 메모 | 제안 | 소유자 |
| --- | --- | --- |
| N-1 정정의 자리 | 지금 자리를 그대로 둔다. 병합된 기록에서 정정으로 가는 길이 필요하다고 보면 Story 1.3의 파일을 고치는 절차는 없으므로 PO가 future-work나 방법론 제안으로 돌린다 | PO |
| N-2 항목 이름을 든 글 | `Closed items` 줄로 충분하다. 다음 트리아지에서 재발 항목의 그 문장을 `tech-debt-3`으로 고칠지 본다. 고치는 일이 트리아지를 되돌리므로 이 호출에서 하지 않는다 | PO |
| N-3 Story 1.3의 DOC-001 | 그때의 기록으로 둔다. QA는 이 Story의 gate에서 정정의 결과를 판정하고 1.3의 gate를 바꾸지 않는다 | QA |

## 고친 곳과 저장 뒤 재확인

이 호출 안에서 저장 뒤에 읽고 고친 곳은 다음과 같다. 키의 근거 문장에 "커밋 6188a27의"를 더했다(계획 커밋 뒤의 파일에는 `Closed items`가 있다). 표 1의 "섹션" 행에 재는 법을 더했다. "판정 방법"의 공통 문단에 항목의 자리와 링크의 거부 조건을 더했다(Dev Notes가 적은 결과에 닿는 점검이 없어서였다). Dev Notes의 Definition of Done 기록의 출처를 `.bmad-core/data/story-paths.md`로 고쳤다(`develop-story.md`에 그 파일 이름이 없다). "참고한 기록"에 `Closed items` 줄을 적었다. 고친 뒤의 글을 다시 읽었고 개수와 ID는 바뀌지 않았다.
