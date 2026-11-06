# po-r1 — Story 1.3 Dev 기록의 두 문장 정정

- Story: [tech-debt-3](../../stories/tech-debt/tech-debt-3.story.md)
- Entry: PO 검증 1회, 첫 회차의 전체 검토와 `validate-next-story.md` step 12의 취합
- 작성자와 실제 검토자: PO 하위 세션 Sarah, 모델 `claude-opus-5-5`(시스템이 알려 준 값), `*run-story tech-debt-3 remote to Done` run의 역할 작업. effort는 이어가기 로그의 실행 계획이 `max`로 적었고 이 세션에서 따로 확인하지 못했다. 이 Story를 쓰지 않았다. 추가 검토자는 없다
- 시각: 2026-11-07, 읽은 Story의 사본 저장 06:16 +0900, 기록 작성 06:20 +0900 이후
- 입력 기준: `main` 20256e4. Story와 SM 기록은 커밋하지 않은 초안이다

## 범위와 입력

범위는 Story 전체이고 제외한 범주는 없다. 이 Story의 첫 회차이고 full review다. SM의 판단을 받아들이지 않고 아래 입력으로 직접 판정했다.

| 입력 | 정체 | 읽은 범위 |
| --- | --- | --- |
| `docs/stories/tech-debt/tech-debt-3.story.md` | 커밋하지 않은 초안. PO 기록을 더하기 전 `git hash-object --no-filters` 값 `43722f291fa94d12f5edb5c71bb46a3b4ba52fa8`, 404줄. 메인 세션의 스냅샷 사본과 같다(`cmp`) | 끝까지 |
| `docs/story-records/tech-debt-3/sm-1.md` | 커밋하지 않은 SM 기록, 같은 값 `87a40c146a8f64c8d5c7c5be345aa6f5a14ff4a6`, 134줄 | 끝까지 |
| 원천 항목 | 커밋 6188a27의 `docs/planning/future-work.md` 항목 "[Tech-Debt] Story 1.3 Dev 기록의 두 문장". 커밋 20256e4의 `git show`가 지운 줄로 읽었다 | 항목 전체 |
| 사용자의 결정과 PO의 트리아지 | 커밋 6188a27의 메시지 | 끝까지 |
| 실행 요청 | 사용자, 2026-11-07 05:31 +0900, `*run-story tech-debt-3 remote to Done`. 단계 Done, 단어 `remote`. 수집 응답이며 단계가 Approved 이상이다 | 지시의 공통 입력 전체 |
| `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`, `README.md`, `package.json`, `.github/workflows/ci.yml`, `ci/screen-rule.check.mjs` | 6188a27과 20256e4에서 같다(`git diff --stat`의 출력 없음). PRD와 Architecture의 검토 기록은 2026-10-29 프로젝트 소유자(시험 운영자) 승인이고, 실행 요청의 글이 Story의 인용과 같다 | 끝까지 |
| `docs/planning/future-work.md` | 20256e4의 항목 "[Tech-Debt] 재발: 기록의 서술이 실제와 다름", "[Tech-Debt] Story bug-2 Dev 기록의 두 문장", `Closed items`. 6188a27의 제목과 상태 줄 수 | 그 절과 잰 값 |
| Story 1.3의 기록 | `docs/story-records/1.3/dev-qa-r3.md`, `docs/qa/gates/1.3.yml`(끝까지), `docs/story-records/1.3/dev-dod-2.md`의 제목들과 그 행, `docs/story-records/1.3/dev-qa-r2.md`의 제목들과 그 `확인`, `docs/story-records/1.3/qa-r3.md`의 섹션 "분류의 근거: DOC-001", `docs/story-records/1.3/qa-done-2.md`와 `docs/stories/1.3.story.md`의 `DOC-001`이 든 줄, `Post-merge check` 줄, Dev Notes의 "폭 결정을 코드에 옮기는 일" | 그 절과 찾은 줄 |
| 앞선 Story의 꼴과 사례 | `docs/stories/bug/bug-2.story.md`의 PO Validation과 시작 기록, `docs/story-records/bug-2/po-r1.md`, `docs/stories/tech-debt/tech-debt-1.story.md`. 기록의 꼴과 시작 커밋의 실제 사례로만 썼고 규칙으로 쓰지 않았다 | 그 절 |
| 메인 세션이 넘긴 질문 N-1 ~ N-3 | 지시 파일의 섹션 "앞선 작업이 넘긴 질문" | 끝까지 |

## 읽은 규칙

`.bmad-core/tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문(PO의 규칙 종류 `operations`, `design`, `documentation`): `golden-rules`, `documentation`, `testing-tdd`.
- 읽지 않은 본문: `coding-principles`, `comments`, `crap`은 `quality` 종류여서 읽지 않았다. `javascript-language`, `javascript-crap`은 이 Story가 JavaScript 코드를 쓰거나 계획하지 않아 필요하지 않았다.
- 끝까지 읽은 절차와 자료: `agents/po.md`, `project-map.md`, `core-config.yaml`, `tasks/validate-next-story.md`, `tasks/create-next-story.md`, `tasks/create-next-story-style.md`, `tasks/brownfield-create-story.md`, `tasks/test-design.md`, `tasks/architecture-align.md`, `tasks/execute-checklist.md`, `tasks/local-story-start.md`, `tasks/local-task-done.md`, `tasks/develop-story.md`, `tasks/verify-delivery.md`, `checklists/story-draft-checklist.md`, `templates/story-tmpl.yaml`, `data/agent-context.md`, `data/finding-classification.md`, `data/story-paths.md`, `data/story-slicing.md`, `data/verification-ownership.md`, `data/development-quality.md`, `data/domain-language.md`, `data/future-work-planning.md`, `data/workflow-routing.md`, `data/local-git-workflow.md`, `data/test-levels-framework.md`, `data/test-priorities-matrix.md`, `utils/checks/check-owned.sh`, `utils/checks/check-stage.sh`, 프로젝트의 `AGENTS.md`.
- 일부만 읽은 파일: `tasks/run-story.md`(Purpose, Inputs and authorization, Role sessions, Rounds, Checks after each task, Stop, hold and carry on), `tasks/qa-gate.md`(gate의 자리와 Zone Rules의 찾은 줄), `checklists/comment-hygiene-checklist.md`(제목들), `agents/sm.md`(찾은 줄), `utils/checks/check-merge.sh`(후보를 찾는 부분), `utils/checks/lib.sh`(`bmad_subject_tag`, `BMAD_TEMP_PATTERN`), `utils/checks/record-rules.awk`(앞부분).
- 프로젝트 밖 자료는 읽지 않았다. 사용자의 말로 이 호출에서 면제되었고 `AGENTS.md`의 조사 요건을 채운 것이 아니다.

## 범주 결과

| 범주 | 결과 | 근거 |
| --- | --- | --- |
| Project policy checks | PASS | 아래 "Project policy 항목별 근거". SM의 실행 어긋남 F-1은 복구를 직접 확인했다(아래 절). 비차단 PO1-N3, PO1-N4 |
| 1. Goal & Context Clarity | PASS | Story 문장과 "결과와 범위": "이 Story의 Completion Notes에 두 문장을 정정한 새 항목이 있고". Epic이 없는 유형 Story이므로 Epic 항목은 식별된 출처(원천 항목과 사용자의 결정)로 판정했다. 저장 줄 `Depends on: 1.3`이 글과 표에 맞고 `check-merge.sh status 1.3 main`이 병합을 말한다. 값어치의 인용이 gate의 `failure_scenario`와 글자까지 같다 |
| 2. Technical Implementation Guidance | PASS | "파일 위치"가 바꾸는 경로, 읽기만 하는 경로, 바꾸지 않는 경로를 표로 든다. 쓰는 기술은 Git과 Node.js 점검이고 환경 변수가 없다. Architecture 본문을 끝까지 읽었다. 사용자에게 보이는 동작이 바뀌지 않아 문서 대조 대상이 `docs/architecture.md`, `README.md`이고 `src/`의 파일은 `engine.js`, `number-format.js`, `screen.js`, `units.js`뿐이어서 내장 도움말이 없다. 경로 집합의 어긋남은 범주 5의 PO1-B1로 한 번 센다. 비차단 PO1-N2 |
| 3. Reference Effectiveness | PASS | 참조가 파일과 섹션, 행, 짧은 인용이고 줄 번호가 없다(아래 "출처와 위치 표기"). 앞선 기록을 "이전 Story"에 요약했다. D-1, D-2가 닿지 않는 까닭이 맞다. `docs/research`가 없음을 확인했다 |
| 4. Self-Containment Assessment | PASS | 항목의 글, 영향받는 기록, 비용, 사용자의 말, 표 1 ~ 3, 판정 방법이 Story에 있다. 합격 판정을 정하는 읽기 "정정을 담는 자리"는 아래 N-1의 판정대로 수용 출처와 규칙이 뒷받침한다. 부모가 지정한 구현 절이 없어 그 예외는 N/A다. 비차단 PO1-N1 |
| 4.5. Comment Contract | PASS | Tasks, Dev Notes, Testing을 읽었다. "이 Story는 코드와 시험을 바꾸지 않아 새 주석과 머리글을 쓸 일이 없고, IN-FLIGHT 표시를 만들지 않는다". 새 IN-FLIGHT 지시와 기존 항목이 없고, 정책 ID는 Dev Notes의 글에만 있으며 코드에 옮기라는 지시가 없다 |
| 5. Testing Guidance | FAIL | PO1-B1. 그 밖의 항목은 맞다: 수준과 접근이 따로 있고, 6행이 실행 맵과 같으며 합계와 소계가 잰 값과 같고, 읽어서 판정하는 시나리오에 받는 글과 거부하는 글이 있고, SubTask마다 접근과 시나리오가 있으며 Architecture 정렬이 마지막이다. 비차단 PO1-N3, PO1-N4, PO1-N5 |

### Project policy 항목별 근거

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 새 주석의 언어와 쓸모 | PASS | 새 주석이 없다. "새 주석과 머리글을 쓸 일이 없고" |
| 현재 작업과 사실, 편집 이력 없음 | PASS | Tasks와 제목에 날짜나 회차가 없다. Testing의 "Draft 때 관찰한 사실"은 관찰로 밝혔고 "Dev가 다시 내어 확인한 값만 기록한다". 날짜는 수용 기록의 인용, SM Draft Checklist, Change Log에만 있다 |
| PRD 정체성과 승인된 뜻 | PASS | `docs/prd.md`가 6188a27과 같고 Story가 "바꾸지 않는다"고 적는다 |
| AC와 출처 | PASS | 부모 AC가 없는 유형 Story다. AC 머리 문장이 "이 Story가 적은 것"이라고 밝히고 들여쓴 `Source:` 줄이 3개이며 그 글이 항목에 있다. 회귀 기준은 번호 없이 따로 있고 출처가 있다. 항목의 다섯 줄이 커밋의 글과 줄 단위로 같다. AC 3의 확인 조건은 PO1-B1에서 본다 |
| 위반과 기존 잔여물 구분 | PASS | "두 문장 말고 Story 1.3 기록의 다른 문장을 다시 판정하지 않는다". "주석 위생의 비교 기준은 Story 시작의 기준선 HEAD이고 대상은 `src/`와 `test/`의 바뀐 줄인데 그 줄이 없다" |
| 기존 Story와 QA 기록 | PASS | 범위 밖 첫 줄이 Story 1.3의 파일과 기록, gate를 "고치지 않는다"고 적는다. 아래 N-3 |
| 임시 자료 | PASS(복구) | 아래 "SM의 실행 어긋남 F-1". SM의 임시 자료가 프로젝트 임시 영역의 목적별 위치에 있고 이어가기 로그의 Story 섹션에 있다. 커밋 메시지 파일은 메인 세션이 squash 뒤 지웠다고 로그가 적고 없음을 확인했다 |
| Story의 임시 자료 지시 | PASS | "임시 자료는 프로젝트 임시 파일 정책(CL-GLD-OPS-008)을 따르고", "지우는 일은 병합이 확인된 뒤에 이 Story의 일회용 자료에만 한다". Story와 `sm-1`에 `BMAD_TEMP_PATTERN`이 잡을 글자가 없다(`check-stage.sh records` 종료 상태 0, 검색 일치 없음) |
| 주석 위생 기준 | PASS | 비교 기준과 대상이 있고 `.bmad-core/checklists/comment-hygiene-checklist.md` §3을 가리킨다. 그 절 "3. Post-Implementation Check"가 있음을 읽어 확인했다 |
| 승인 주장 | PASS | 결정자를 항목마다 나누었다. 배정은 사용자(6188a27), 까닭은 "사용자의 말이 아니다", 실행 요청과 조사 면제는 사용자, 키의 지정은 메인 세션, "정정을 담는 자리"는 "수용 문서에 적힌 결정이 아니라" SM의 읽기다. 인용을 원문과 글자로 대조했다 |
| 측정 합계와 소계 | PASS | 아래 "값의 재측정" |
| 작업 경계 | PASS | 파일을 경로로 적었고 개수만으로 집합을 정한 곳이 없다. 표의 집합이 다른 문장과 어긋나는 것은 PO1-B1, 이름의 어긋남은 PO1-N2다 |
| 출처와 위치 표기 | PASS | 줄 좌표 꼴을 찾아 일치가 없다. Dev Notes가 "줄 번호를 쓰지 않는다"고 적는다. 거부하는 글의 빠짐은 PO1-N4 |
| 실행 가능성 주장 | PASS | "이 checkout의 `git for-each-ref --contains e71238d`", "원격에 이 ref가 있는지는 보지 않았다", "이 run의 소유권 점검에서 실패한다"로 한정했다 |
| Task 문구 | PASS | SubTask는 대상, 시나리오, 완료 점검, 커밋 제목만 적고 구현식이 없다 |
| 선택지 비교 표 없음 | PASS | 두 읽기를 "정정을 담는 자리"의 글로 적었다 |
| Convention Sections 목록 | PASS | 두 목록의 이름이 모두 색인에 있고 `auto-detected-keywords`의 낱말이 색인의 `keywordMapping`에 있다 |
| 실행 비용 | PASS | "실행되는 코드를 바꾸지 않아 닿는 규칙이 없고 성능 측정을 계획하지 않는다" |
| 보이지 않는 글자(CC-DOC-013) | PASS | `invisible-chars.awk`를 Story와 `sm-1`에 돌려 일치 없음 |

## 단계별 결과

| 단계 | 결과 | 근거 |
| --- | --- | --- |
| 1 템플릿 | PASS | 템플릿의 섹션이 모두 있고 자리표시자가 없다(`_TBD_`, `{{` 일치 없음). `{개정}`, `{기준}`은 Story가 뜻을 정의한 명령의 인자다. PO Validation, Dev Agent Record, QA Results는 제목만 있었다 |
| 2 파일과 소스 트리 | PASS | 경로가 있고 읽기만 하는 파일이 모두 있다. 새 코드 경로가 없어 `docs/architecture.md#소스-트리`와 충돌하지 않는다. 표의 집합은 단계 4에서 본다 |
| 3 UI | N/A | 화면을 바꾸지 않는다. 기록만 더한다 |
| 4 AC | FAIL | PO1-B1. 그 밖의 항목은 맞다: AC와 Task가 대응하고, 각 AC에 "확인 조건"이 있으며 판정 방법이 받는 글과 거부하는 글을 든다 |
| 5 시험 | FAIL | PO1-B1. 접근 `verification-only`가 `testing-tdd`의 행과 맞다. 제품과 시험 지원의 동작을 바꾸지 않는다. 기록만 바꾸는 SubTask의 Dev 점검은 `data/development-quality.md`의 "A SubTask that changes only records"와 맞다 |
| 6 보안 | N/A | 인증, 데이터, 입출력의 변경이 없고 기록의 글만 더한다 |
| 7 Task 순서 | PASS | Task 1 뒤에 Task 2(Architecture 정렬)가 마지막이고, `Depends on:` 줄이 글, 표, `check-stage.sh deps`의 `story tech-debt-3 story 1.3`과 같다. 커밋 제목이 `git.taskCommitPattern`에 맞는다. 미결 계획 결정이 없다(아래 N-1) |
| 8 근거 | PASS | 아래 "사실 주장 대조". 꾸며낸 사실을 찾지 못했다 |
| 9 구현 준비 | FAIL | PO1-B1이 열려 있어 아직 준비되지 않았다. 지식의 빈틈은 아니다. 값이 모두 재현되고 지시가 분명하며, AC 3의 판정만 정해지면 된다 |

## 차단 지적 PO1-B1: AC 3의 확인 조건과 tech-debt-3-INSP-004가 `sm-`, `po-` 기록에서 다른 판정을 낸다

**관찰.** 같은 점검을 말하는 Story의 글은 다음과 같다.

- AC 3: "Story 시작의 기준선 HEAD와 비교해 바뀐 경로가 Dev Notes "파일 위치"의 "바꾸는 경로"뿐이고"
- "파일 위치"의 "바꾸는 경로" 두 행: `docs/stories/tech-debt/tech-debt-3.story.md`와 "`docs/story-records/tech-debt-3/`의 `dev-` 문서"
- 그 다음 문단: "QA 단계에서는 QA의 gate `docs/qa/gates/tech-debt-3.yml`과 `qa-` 기록이 바뀐 경로에 더해진다."
- tech-debt-3-INSP-004: "`docs/stories/tech-debt/tech-debt-3.story.md`와 `docs/story-records/tech-debt-3/` 아래뿐이며", "받는 경우: 바뀐 경로가 그 둘뿐이다", "QA가 돌릴 때는 QA의 gate와 `qa-` 기록을 받는 경로에 더한다"

**닿는 입력.** `.bmad-core/tasks/local-story-start.md`는 기준선 HEAD를 기록하고 시작 커밋이 "adds it and the files of its record folder to the Story branch"라고 적는다. 이 Story의 기록 폴더에는 `sm-1.md`와 이 문서 `po-r1.md`가 있으므로, `{기준}`과 비교한 `git diff --name-only`에는 시작 커밋 뒤 언제나 이 경로들이 나온다.

**재현.** 같은 절차를 지난 Story bug-2의 커밋으로 확인했다. 시작 커밋 6741bd9의 부모는 그 Story의 기준선 HEAD 9aea191이고, `git show --stat 6741bd9`는 Story와 `po-r1.md`, `po-r2.md`, `sm-1.md`, `sm-2.md`를 더하며, `git diff --name-only 9aea191 refs/archive/story/bug-2`는 이 네 기록을 든다. 이 Story는 아직 시작하지 않아 같은 명령을 돌릴 수 없고, 입력은 위 절차로 정해진다.

**두 판정.**

| 읽기 | 입력 `docs/story-records/tech-debt-3/sm-1.md`, `po-r1.md`의 결과 |
| --- | --- |
| AC 3의 확인 조건과 "바꾸는 경로" 표 | 표의 어느 행에도 없다. 실패 |
| tech-debt-3-INSP-004의 받는 경우 | 폴더 아래에 있다. 통과 |

INSP-004의 끝 문장이 `qa-` 기록을 받는 경로에 더한다고 적어서, 폴더 전체를 받는다는 읽기도 그 문장 안에서 흔들린다. 폴더 전체를 받는다면 더할 것이 없다.

**분류.**

- 1단계, 확인했다. 인용과 위의 명령이다.
- 2단계, 이 Story의 계획이고 필수 점검이다.
- 3단계, 기준은 `data/finding-classification.md`의 "two statements of the Story that contradict each other in a case that a planned use reaches"다. 계획된 쓰임은 SubTask 1.1, 2.1의 tech-debt-3-INSP-004와 AC 3의 판정이고, 같은 입력에 다른 합격 판정을 낸다. "A broadly worded statement that a more specific statement or a stated case narrows"에 들지 않는다. AC 3이 가리키는 표는 닫힌 목록이고, INSP-004는 그것을 좁히지 않고 넓히며, 어느 문장도 `sm-`, `po-` 기록을 말하지 않는다.
- 4단계로 보아도 같다. 표대로 읽으면 Story가 정한 대로 한 일이 Story 자신의 합격 판정에서 실패한다.

**해결 경로 `rework`, 소유자 SM.** 수용된 요구사항을 바꾸지 않는다. 항목의 요구는 "앞선 기록(dev-dod-2, dev-qa-r2)은 고쳐 쓰지 않고 코드와 시험은 바꾸지 않는다"이고 확인 조건과 표는 SM이 적은 글이다.

**필요한 수정.** AC 3, "파일 위치", tech-debt-3-INSP-004가 같은 경로 집합을 말하게 한다. 가장 작은 길은 "파일 위치"의 "바꾸는 경로"에 `docs/story-records/tech-debt-3/`의 `sm-`, `po-` 문서를 더하고 시작 커밋이 Story 파일과 함께 더하며 Dev가 고치지 않는다고 적는 것이다. 그러면 AC의 글을 바꾸지 않는다. 고친 뒤 INSP-004의 끝 문장도 그 집합에 맞춘다. AC의 글을 고치면 다음 회차는 `data/finding-classification.md` 섹션 Later rounds대로 새 세션의 full review다.

**잡히는 일.** Draft에서 Approved로의 전환, Story 시작과 그 이슈, SubTask 1.1, 2.1, QA, Done, Done의 push와 요청이다. **잡히지 않는 일.** 이 수정과 계약 안 비차단 지적의 적용이다.

## 넘겨받은 질문과 SM 메모의 판정

`validate-next-story.md` 섹션 In a run과 step 0대로 각 질문을 리드처럼 확인했다. 막는 질문이 없어 `pending` 지적이 없다.

### N-1, PO1-N1: 정정을 이 Story의 Completion Notes와 `dev-1.1.md`에 두는 읽기

- 답: 맞다. 막지 않는다.
- 항목의 글: "Dev의 기록이 정한 자리는 Completion Notes의 새 항목인데, Story가 병합되어 다시 열리지 않으므로 이 정정을 담을 계획이 따로 필요하다." 앞 절은 Story 1.3 안에서 고치는 경우의 자리(`docs/story-records/1.3/dev-qa-r3.md`의 "필요한 일"과 "결정이 바뀌는 조건")를 말하고, 뒤 절이 그 자리를 쓸 수 없다고 말한다. 새 자리를 정한 글은 없다.
- 트리아지 까닭: "병합된 Story에 정정을 담을 계획이 따로 필요하다는 항목의 필요한 일이 유형 Story가 맡는 모양이다." 커밋 메시지가 이것을 PO의 까닭으로 적고 사용자의 말과 나눈다. 항목의 "필요한 일"을 다시 말한 글이고 자리를 정하는 결정이 아니다. 사용자의 말은 "유형 Story로 배정합니다"이고 자리를 말하지 않는다.
- 다른 읽기를 실행할 수 있는가: 없다. `check-owned.sh`의 `role_owns`는 Dev에게 `"$story_dir"/*`를 거부하고 기록 폴더에서 `"$own_folder/$1"-*`만 허락한다(직접 읽었다). `data/story-paths.md` 섹션 Record documents는 "a correction of an earlier result goes into the next entry's file and the Story's entry"라고 적고, `tasks/verify-delivery.md` 섹션 2는 병합 뒤 "nothing reopens"라고 적으며, `data/workflow-routing.md`의 `reopen-story`는 병합되지 않은 Done Story의 일이다. 항목 자신이 앞선 기록을 고쳐 쓰지 말라고 적는다.
- 3단계: 수용 출처와 모순되지 않는다. 자리를 정한 수용된 글이 없고, Story의 글이 "수용 문서에 적힌 결정이 아니라" SM의 읽기임을 밝힌다.
- 4단계: Story가 읽기 하나만 적어 Task와 합격 판정이 갈리지 않는다. `data/story-slicing.md`의 계획 결정도 아니다. 다른 결과를 고를 수 없어 Task의 내용이 달라지지 않는다.
- 남는 관찰: `docs/story-records/1.3/dev-dod-2.md`, `docs/story-records/1.3/dev-qa-r2.md`만 읽는 사람은 정정으로 가는 링크를 보지 못한다. 확인했다(표 3의 값이 그대로이고 항목이 그대로 두라고 한다). 길은 `docs/stories/1.3.story.md`의 `Post-merge check` 줄의 항목 이름, `Closed items` 줄, Git 이력이다. Story의 범위가 그 파일들을 그대로 두고 어느 기준도 링크를 요구하지 않아 2단계에서 비차단이고, Story가 `coverage_gaps`에 이 틈을 적었다. 비차단 지적 PO1-N1로 남긴다. 계약 밖이다. 답하는 사람은 병합 뒤 점검의 항목을 트리아지하는 사용자다.

### N-2: `Closed items` 줄과 그 이름을 든 글

- 답: 충분하다. 막지 않는다. 지적이 아니다.
- 확인: `git grep -n`으로 이 항목의 제목은 20256e4에서 재발 항목의 "더한 출처" 줄, `docs/stories/1.3.story.md`의 `Post-merge check` 줄, `Closed items` 줄에만 있다. 재발 항목의 글은 "정정할 일은 항목 "[Tech-Debt] Story 1.3 Dev 기록의 두 문장"이 든다"이다.
- CC-DOC-009의 "verify affected incoming references resolve and still support their claims": 이름이 `Closed items` 줄 "[Tech-Debt] Story 1.3 Dev 기록의 두 문장: 유형 Story `tech-debt-3`(`docs/stories/tech-debt/tech-debt-3.story.md`)에 배정, 2026-11-07"로 풀리고, 그 Story가 정정할 일을 맡으므로 주장이 맞다.
- 꼴: `data/future-work-planning.md`의 "its title, its destination or the reason, and the date"와 같고 목록이 파일 끝에 있다. 이 두 곳은 링크가 아니라 이름이어서 규칙이 꼭 요구한 줄은 아니지만, 그 글이 `Closed items` 목록이 담는 "entries that left it with a line under the rules above"를 벗어나지 않고 드롭처럼 읽히지 않는다("배정"). `check-stage.sh future --story tech-debt-3`는 종료 상태 0이고 `Revisit:` 알림 둘만 낸다.
- 그 글을 고치지 않은 것: 재발 항목의 글을 고치면 `data/future-work-planning.md`의 "any change to an entry's text other than its state, `Plan:` and `Revisit:` lines is a new finding"대로 트리아지로 돌아가 다음 Story의 시작을 잡는다. `Post-merge check` 줄은 저장 줄이고 그때의 기록이다(CC-DOC-004).

### N-3: Story 1.3의 DOC-001과 그 gate

- 답: 그때의 기록으로 둔다. 막지 않는다. 지적이 아니다.
- 근거: `CL-GLD-OPS-004`의 "Preserve existing schema 1/2 gates and their original results", `tasks/load-project-rules.md`의 "Keep existing Story and QA records as historical inputs", 병합 뒤 다시 열리지 않음(N-1의 근거). `tasks/qa-gate.md`는 한 Story의 gate가 그 Story의 회차를 담는다고 적고, 다른 Story의 Done이 앞선 gate를 닫는 절차가 없다. `docs/qa/gates/1.3.yml`은 PASS이고 DOC-001은 Optional이어서 이 gate에 열린 차단이 없다.
- 이 Story와의 관계: `docs/qa/gates/1.3.yml`과 처리 줄을 Story가 "그때의 기록으로 남는다"고 적고, tech-debt-3-INSP-004가 그 경로의 변경을 실패로 본다. 정정의 결과는 이 Story의 QA가 이 Story의 gate에서 판정한다.

## PO가 새로 낸 비차단 지적

모두 다음 단계를 막지 않는다. PO1-N2 ~ PO1-N5는 계약 안이어서 SM이 PO1-B1을 고칠 때 값어치가 있다고 보면 함께 적용한다.

### PO1-N2: Story가 적은 gate 이름이 절차의 이름과 다르다

Dev Notes "QA의 gate `docs/qa/gates/tech-debt-3.yml`". `tasks/qa-gate.md`의 "`{qa.qaLocation}/gates/{story_key}-{slug}.yml`"과 `data/story-paths.md` 섹션 Slug에 따르면 제목 "Story 1.3 Dev 기록의 두 문장 정정"의 slug는 `story-1-3-dev`이고 gate는 `docs/qa/gates/tech-debt-3-story-1-3-dev.yml`이다. 앞선 `1.3.yml`, `bug-2.yml`은 제목에 ASCII 글자가 없어 slug가 빠진 경우다. 3단계: gate의 이름은 QA의 뒤 단계 일이어서 이 계획의 기준이 아니고, Story의 다른 문장과 모순되지 않는다(INSP-004는 "QA의 gate"라고만 적는다). 4단계: `data/local-git-workflow.md`대로 스테이징 점검이 gate를 `Gate:` 줄의 경로로 찾으므로 어느 이름이든 점검의 결과가 틀리지 않고, QA는 자기 절차의 이름을 쓴다. 비차단이다. 값어치: QA가 자기 절차와 Story 사이에서 고르지 않게 하고 QA의 Optional 지적을 미리 막는다. 계약 안. 시점: SM의 다음 수정. 이름을 고치거나 경로 없이 "QA의 gate"로 적는다.

### PO1-N3: tech-debt-3-INSP-004가 Git이 보지 않는 경로를 재지 않는다

"파일 위치"의 "바꾸지 않음" 행이 `.bmad-core/`를 든다. 이 checkout의 `.git/info/exclude`에 `/.bmad-core/`가 있고 `git ls-files .bmad-core`는 0개여서 `git diff`와 `git status`에 나오지 않는다. "그대로 둔다"는 규칙은 다른 경로에서 INSP-004가 판정하므로 이 경로는 그 규칙 안의 사례이고, 틀린 일이 통과할 수 있다는 것은 step 4의 끝 문장대로 막지 않는다. 비차단이다. 값어치: Dev의 기록이 INSP-004의 통과를 `.bmad-core/`까지 말하면 이 Story가 고치는 꼴, 잰 범위 밖까지 말하는 문장을 되풀이한다. 계약 안. 시점: SM의 다음 수정. `coverage_gaps`나 시나리오에 잰 범위가 Git이 보는 경로라고 적는다.

### PO1-N4: 줄 번호의 거부가 첫째 문장의 기준에만 있다

"판정 방법" 첫째 문장의 거부하는 글에 "자리를 줄 번호로 적는 글"이 있고 둘째 문장의 거부하는 글에 없다. Dev Notes는 "줄 번호를 쓰지 않는다"고 적고 둘째 문장의 항목은 네 곳의 "자리"를 적어야 하므로 닿는 경우다. 규칙을 INSP-003이 읽는 범위 안의 사례여서 비차단이다. 값어치: 낮다. 두 기준의 판정을 같게 한다. 계약 안. 시점: SM의 다음 수정. 그 거부를 "두 기준에 공통으로"의 문단으로 옮긴다.

### PO1-N5: ref가 없을 때의 결과가 두 곳에서 다르다

"미결 항목과 선행 조건": "그 ref가 없으면 tech-debt-3-INSP-001의 비교가 돌지 않고, 그 시나리오는 미완료 점검으로 남으며". tech-debt-3-INSP-001: "실패: 값이 표와 다르거나 명령이 돌지 않는다." 이 checkout에는 ref가 있고 Story가 그 ref가 있는 checkout을 실행 조건으로 두어 계획된 쓰임이 닿지 않는다. 어느 쪽이든 SubTask 1.1이 끝나지 않고 값을 적지 않으므로 Task가 갈리지 않는다. 비차단이다. 값어치: 낮다. 계약 안. 시점: SM의 다음 수정. 시나리오의 실패에서 ref가 없는 경우를 뺀다.

## SM의 실행 어긋남 F-1

- 사건과 기준: SM이 읽기 전용 진단 스크립트 파일을 프로젝트 임시 영역에 만들어 돌렸다. `.bmad-core/agents/sm.md`의 글 "Do not implement Stories or create or modify executable code, including temporary diagnostic probes and reusable test support"가 있음을 확인했다(원문은 줄을 나누어 적혔다).
- 멈춤: 그 폴더의 파일이 하나이고 수정 시각이 SM의 재측정 전이다. 그 뒤의 파일이 없다.
- 영향: 파일을 읽었다. `git show`와 `awk`로 읽고 출력만 한다. 저장소를 바꾸지 않으며 Story와 `sm-1`은 그 파일을 말하지 않는다. 이어가기 로그에 일회용으로 적혀 있다.
- 다시 낸 값: 이 회차가 같은 검색을 파일 없는 명령으로 세 개정에서 다시 내어 같은 네 곳을 얻었다(아래 표).
- 판정: 복구가 확인되어 범주는 PASS다. 실행이 처음부터 규칙에 맞았다는 뜻이 아니고 어긋남의 기록은 SM Draft Checklist와 `sm-1`에 그대로 남는다. 이 회차 입력의 Story에 영향이 남지 않았다.

## 값의 재측정

Windows x64, Node.js v24.22.1, `main` 20256e4, 2026-11-07 06:23 +0900까지. Story의 표 1 ~ 3과 모두 같다.

| 잰 것 | 명령 | 결과 |
| --- | --- | --- |
| 커밋의 자리 | `git for-each-ref --contains e71238d`, 같은 꼴로 `6701dcd`, `8579e5a` | 모두 `refs/archive/story/1.3`만 |
| 지운 줄 | `git diff e71238d 6701dcd -- docs/stories/1.3.story.md`의 `-` 줄에서 머리 줄을 뺌 | 4줄. 글이 표 1 아래의 코드 블록과 같다 |
| 더한 줄의 고쳐 쓴 글 | 같은 비교의 `+` 줄 | 앞의 둘에 "QA 수정 단위" 설명이 붙었고 셋째는 "바뀌지 않음(기준 tip `d90c99e`와 차이 없음을 `git diff`로 확인)"이다 |
| 줄 수 | `git diff --numstat e71238d 6701dcd -- docs/stories/1.3.story.md` | 29, 4 |
| 섹션 | 두 커밋의 Story를 `## ` 제목마다 나누어 `git hash-object --stdin`으로 비교 | 다름 3(Status, Change Log, Dev Agent Record), 같음 8, 합계 11 |
| 앞선 기록 문서 | `git ls-tree --name-only e71238d docs/story-records/1.3/`, `git diff --name-status e71238d 6701dcd -- docs/story-records/1.3` | 11개, `A` 5개(`dev-3.1.md`, `dev-3.2.md`, `dev-3.3.md`, `dev-dod-2.md`, `dev-qa-r2.md`) |
| 40의 줄과 곳 | 표 2의 명령과 그 끝을 `grep -oE`로 바꾼 명령, `8579e5a`, `6701dcd`, `6188a27`, HEAD | 네 줄, 줄마다 하나, 곳의 글이 P-1 ~ P-4와 같다 |
| 범위의 글 | 세 개정의 구간을 `git hash-object --stdin` | 세 개정이 같다. 표 2의 구간 `c714acbdf173`, 제목 줄을 넣은 구간 `57b4a0bffca5`(`sm-1`의 값) |
| 표 2의 자리 | Story 1.3의 Dev Notes 제목 | `### 폭 결정을 코드에 옮기는 일`, `### Testing`이 그 구간 안에 있다 |
| 범위 밖의 40 | 같은 검색을 `## ` 섹션별로 셈 | Scope 6, SM Draft Checklist 2, PO Validation 3, Dev Agent Record 8, QA Results 5. Tasks와 AC에 없다 |
| 문장의 자리 | `docs/story-records/1.3/dev-dod-2.md`, `docs/story-records/1.3/dev-qa-r2.md`의 제목과 그 줄 | 표 1, 표 2의 자리와 글이 같다 |
| 폭의 값 | `grep` | `EXPECTED_WIDTH = 48`, `SCREEN_WIDTH = 48` |
| 앞선 기록의 해시 | `git hash-object`, `git rev-parse` | 작업 트리, HEAD, 6188a27이 `18eb39bc4ecb`, `058eb6c45a1f`로 표 3과 같다 |
| 회귀 | `node --test`, `node ci/screen-rule.check.mjs` | 76개 통과, 실패 0, 종료 상태 0과 0, 작업 트리 변화 없음 |
| 선행 | `sh .bmad-core/utils/checks/check-merge.sh status 1.3 main` | 종료 상태 0, Story의 인용과 같다 |
| 유형 Story 키 | `git ls-tree -r --name-only`로 `main`, `story/bug-2`, `origin/main`, 작업 트리 | `bug-2`, `tech-debt-1`, 초안 `tech-debt-3`. 6188a27의 `Closed items` 0개. 다음 번호 3이 맞다 |
| future-work의 개수 | 6188a27의 제목과 상태 줄 | 제목 46(문서 제목 1, 항목 45), `Planning: unplanned` 44, `Planning: undecided` 1, `Plan:` 1 |
| 다른 항목의 이름 | 6188a27에서 `dev-dod-2`, `dev-qa-r2` | 이 항목의 두 줄과 Story 1.2의 같은 이름 문서를 든 항목 셋 |
| 시나리오 행 | `^\| tech-debt-3-` 행을 열로 나눔 | 6행, 모두 8열. inspection 5, integration 1. P1 2, P2 3, P3 1. automated 3, agent-review 3. Overview, 실행 맵과 같다 |
| SubTask의 시나리오 | SubTask 줄에서 ID를 뽑음 | 1.1은 INSP-001, 002, 003, 004, INT-001. 2.1은 INSP-005, 004. 표의 모든 ID가 쓰이고 각 시나리오의 점검이 그 SubTask의 결과를 덮는다 |

## 사실 주장 대조

맞음으로 확인한 주장: 항목의 다섯 줄과 배정 줄, `Source Story:` 값, 사용자의 답과 PO의 까닭의 글자, 실행 요청과 조사 면제의 글자, gate의 `failure_scenario`의 글자, DOC-001의 분류가 `docs/story-records/1.3/qa-r3.md`, `docs/story-records/1.3/dev-qa-r3.md`, `docs/story-records/1.3/qa-done-2.md`에서 같음, 표 1의 "글을 놓친 까닭"이 `docs/story-records/1.3/dev-qa-r3.md`의 글과 같음, File List의 고침이 Dev의 권한 안이라는 gate의 글, Completion Notes의 항목 "정정(DEV-1, 단위 3.2 뒤)", 재발 항목의 글과 Story bug-2에서의 되풀이, `tech-debt-1`의 Status Done과 씨앗의 글, `bug-2`의 Status Done과 병합, `check-owned.sh`의 `role_owns`, `data/story-paths.md`와 `tasks/verify-delivery.md`의 인용, `data/development-quality.md`의 CRAP check와 Independent Cleaner review의 인용, D-1, D-2의 내용, `docs/research`와 `docs/domain-glossary.md`가 없음, `package.json`의 0.1.0, `git.projectVersionFile`이 없음, `core.hooksPath`와 `.githooks`가 없음, `testing.propertyCommands`와 `testing.mutationCommands`가 비어 있음, `docs/architecture.md`에 Change Log 절이 없음, `.github/workflows/ci.yml`의 job `test`와 두 명령, 20256e4의 변경이 그 항목의 제거와 `Closed items` 줄뿐임(더한 줄 4, 지운 줄 12).

어긋나는 주장: Dev Notes의 gate 이름(PO1-N2)과 AC 3이 가리키는 경로 집합(PO1-B1)이다. 둘 다 Story의 계획에 관한 문장이다.

## 리드와 기각한 관찰

### 리드

- 원격에 `refs/archive/story/1.3`이 있는가: 이 역할 작업은 원격을 읽지 않는다. Story도 보지 않았다고 적는다. 확인하는 것: 원격을 읽을 권한이 있는 작업의 `git ls-remote`. Dev와 QA는 이 checkout에서 돌아 막는 다음 단계가 없다.
- `test`가 서비스의 필수 점검인가: 회귀 기준의 "요청의 필수 점검"은 `.github/workflows/ci.yml`의 job `test`를 들고, 저장소 설정은 읽지 않았다. 이어가기 로그의 계획 브랜치 게시 기록이 필수 점검 대기를 적는다. 확인하는 것: 게시 작업의 요청 상태 읽기. 합격 판정은 두 명령이어서 막는 다음 단계가 없다.

### 기각한 관찰

- "`sm-1`의 구간 값 `57b4a0b`가 틀렸다": 기각. 표 2의 명령은 제목 줄을 빼서 다른 값이 나오고, 제목 줄을 넣으면 `sm-1`의 값이 나온다. 세 개정에서 같다는 주장은 어느 쪽으로도 맞다.
- "두 파일의 값이 `6701dcd`, `8579e5a`와 달라 두 문장이 나중에 바뀌었다": 기각. 커밋 b764e00이 머리의 시각 줄 하나씩을 바꾸었고 `git diff`에 두 문장이 나오지 않는다. 표 3은 `main`의 값이다.
- "기록 문서 11개가 `6701dcd` 뒤에 바뀌어 '11개에는 맞다'가 틀리다": 기각. `git diff --name-status 6701dcd refs/archive/story/1.3 -- docs/story-records/1.3`의 `M`은 `dev-3.2.md`, `dev-3.3.md`, `dev-dod-2.md`, `dev-qa-r2.md`이고 11개에 없다.
- "제목의 'Story 1.3'이 `check-merge.sh status 1.3`의 후보를 늘린다": 기각. 찾는 글자는 괄호까지 든 `[Story 1.3]`이고(`tag="[$tag]"`) 이 Story의 squash 제목은 `[Tech-Debt 3]`로 시작한다.
- "제목의 ASCII 글자가 Story 키를 흔든다": 기각. `check-stage.sh deps`가 `story tech-debt-3 story 1.3`을 내고 `records`가 통과한다.
- "이 Story가 잘못 분류된 유형이다": 기각. 코드와 동작이 맞고 기록의 글만 고치는 일회성 일이어서 `data/future-work-planning.md`의 Tech-Debt 뜻 "Non-defect one-off work"에 든다.
- "`Depends on: 1.3`이 이름뿐인 의존이다": 기각. AC 1, 2가 그 Story의 기록을 정정하고 대조하며 `Source Story:`와 별개로 표가 까닭을 든다.
- "'메인 세션'이 호스트의 표기다(CC-DOC-011)": 기각. 호스트의 접두어나 단축키가 아니라 방법론의 역할 이름이고 이 Story는 run의 요청에서 만들어졌다.
- "`verification-only`가 맞지 않다": 기각. 제품과 시험 지원의 동작을 바꾸지 않는다.
- "P1 시나리오에 실패 경우가 없다": 기각. INSP-004와 INT-001의 실패 기준이 든다. `src/`, `test/`의 변경, 새 파일, 값의 차이를 이름 대어 적는다.

## 미완료 점검

없다. 모든 필수 점검을 끝냈다.

## Anti-Hallucination

꾸며낸 사실을 찾지 못했다. 근거 없는 주장으로는 Dev Notes의 gate 이름 하나가 있고(PO1-N2) 계획의 문장이다. PO1-B1은 근거의 문제가 아니라 두 문장의 어긋남이다. 한 항목을 두 번 세지 않는다.

## 취합과 승인 전 감사

수집 응답은 실행 요청이고 추가 검토는 없다(`validate-next-story.md` 섹션 In a run). 합칠 문서가 없어 이 회차의 지적이 전부다. 판정이 NO-GO이므로 승인 전 감사의 전환을 하지 않았고 Status는 Draft 그대로다. 필요한 수정과 재확인은 SM 피드백 문서로 넘겼다. 이 문서는 이 회차의 PO 자료이고 Story와 이 기록은 그 경로를 적지 않는다. 이 회차가 읽은 Story의 사본은 프로젝트 임시 영역에 있고 이어가기 로그에 적었다.

## 실행한 명령과 결과

| 명령 | 결과 |
| --- | --- |
| `sh .bmad-core/utils/checks/check-instructions.sh` | 종료 상태 0 |
| `git status --short`, `git rev-parse HEAD`, `node --version` | Story와 기록 폴더만 추적되지 않음, 20256e4defbc36ab3d1e7cbce224a265e4121034, v24.22.1 |
| `git show 20256e4`, `git diff --stat 6188a27 HEAD`의 PRD, Architecture, 결정 기록, 코드, 시험, CI, `README.md`, `package.json` 경로 | `docs/planning/future-work.md`의 변경뿐, 나머지 출력 없음 |
| `node --test`, 프로젝트 루트 | 종료 상태 0, 76개 통과, 실패 0 |
| `node ci/screen-rule.check.mjs` | 종료 상태 0 |
| `sh .bmad-core/utils/checks/check-merge.sh status 1.3 main` | 종료 상태 0, `merged 937f21c5a4d5cc5623f90caefa08dd3e137d89f5` |
| `sh .bmad-core/utils/checks/check-merge.sh pending main` | 종료 상태 0, 목록 없음 |
| `sh .bmad-core/utils/checks/check-stage.sh deps` | 종료 상태 1. `story tech-debt-3 story 1.3`은 유효하고 `missing tech-debt-1 story`는 이 Story가 아닌 씨앗의 줄이며 순환이 없다 |
| `sh .bmad-core/utils/checks/check-stage.sh future --story tech-debt-3` | 종료 상태 0. `Revisit:` 알림 둘 |
| `sh .bmad-core/utils/checks/check-stage.sh records`, Story | 저장 전 종료 상태 0. 저장 뒤의 결과는 이 회차의 보고에 있다 |
| `sh .bmad-core/utils/checks/check-stage.sh approve`, Story, 이 항목을 저장하기 전 | 종료 상태 1, "PO Validation: must end with" 저장 줄의 메시지 하나. 임시 경로와 기록의 지적은 없다. 전환에 쓰지 않았다 |
| 항목의 줄과 인용의 글자 대조(`grep -xF`, `grep -cF`) | 다섯 줄 모두 같음, 사용자의 답과 PO의 까닭, `failure_scenario` 각 1건씩 |
| 보이지 않는 글자, 임시 경로, 저장 줄 꼴의 줄, 줄 좌표 꼴의 검색 | 앞의 둘과 넷째는 일치 없음, 저장 줄 꼴은 `Depends on: 1.3` 하나 |
| 값의 재측정 | 위의 표 |

한 번은 시스템 임시 위치로 보내는 리디렉션이 든 대조 명령을 프로젝트의 훅이 막았다. 명령이 실행되지 않아 파일이 생기지 않았고 같은 대조를 리디렉션 없이 다시 실행했다. 위 결과는 그 재실행의 값이다.

## 한계

- 이 Story는 시작하지 않아 tech-debt-3-INSP-004를 돌릴 수 없다. PO1-B1의 입력은 시작 절차의 글과 Story bug-2의 커밋에서 얻었다.
- Story 1.3의 기록은 위 표의 범위만 읽었고, 두 문장 말고 다른 문장을 다시 판정하지 않았다. Story가 범위 밖에 둔 일이다.
- 재기는 Windows x64의 Node.js v24.22.1에서만 했다. 다른 운영체제와 서비스의 CI는 보지 않았다.
- 외부 자료를 읽지 않았고 원격을 읽지 않았다.
- `quality` 종류의 규칙 본문은 PO의 규칙 종류가 아니어서 읽지 않았다.
