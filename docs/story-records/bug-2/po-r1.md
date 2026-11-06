# po-r1 — 아주 깊은 중첩을 계산 오류로 돌려주기

- Story: [bug-2](../../stories/bug/bug-2.story.md)
- Entry: PO 검증 1회, 첫 회차의 전체 검토와 `validate-next-story.md` step 12의 취합
- 작성자와 실제 검토자: PO 하위 세션 Sarah, 모델 `claude-opus-5-5`, effort `max`(지시와 시스템이 알려 준 값), `*run-story bug-2 remote to Done` run의 역할 작업. 이 Story를 쓰지 않았다. 추가 검토자는 없다
- 시각: 2026-11-07, 읽은 Story의 사본 저장 01:12 +0900, 기록 작성 01:24 +0900 이후
- 입력 기준: `main` 9aea191. Story와 SM 기록은 커밋하지 않은 초안이다

## 범위와 입력

범위는 Story 전체이고 제외한 범주는 없다. 이 Story의 첫 회차이고 full review다. SM의 판단을 받아들이지 않고 아래 입력으로 직접 판정했다.

| 입력 | 정체 | 읽은 범위 |
| --- | --- | --- |
| `docs/stories/bug/bug-2.story.md` | 커밋하지 않은 초안. PO 기록을 더하기 전 `git hash-object --no-filters` 값 `120703ae723a7d0d86d8e66339047237b47103d4`, 468줄 | 끝까지 |
| `docs/story-records/bug-2/sm-1.md` | 커밋하지 않은 SM 기록, 같은 값 `429da3e39109b9ef1a5c7f29a4fbd2ba7b2913b8` | 끝까지 |
| 원천 항목 | 커밋 21a78f7의 `docs/planning/future-work.md` 항목 "아주 깊은 중첩". 커밋 9aea191의 `git show`가 지운 19줄로 읽었다 | 항목 전체 |
| 사용자의 결정 | 커밋 2c44760과 21a78f7의 메시지 | 끝까지 |
| 실행 요청 | 사용자, 2026-11-06 23:52 +0900, `*run-story bug-2 remote to Done`. 단계 Done, 단어 `remote`. 수집 응답이며 단계가 Approved 이상이다 | 지시문 전체 |
| `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md` | 21a78f7과 9aea191에서 같다(`git diff --stat 21a78f7 HEAD`의 그 경로들 출력 없음). 각 검토 기록의 2026-10-29 프로젝트 소유자(시험 운영자) 승인과 실행 요청의 글이 Story의 인용과 같다 | 끝까지 |
| `src/engine.js`, `src/screen.js`, `src/number-format.js`, `test/engine.test.js`, `test/screen.test.js`, `ci/screen-rule.check.mjs`, `.github/workflows/ci.yml`, `package.json`, `README.md` | 9aea191 | 끝까지 |
| `docs/planning/future-work.md` | 9aea191 | 앞부분과 `##` 제목 전체, 21a78f7의 상태 줄 수 |
| 메인 세션이 넘긴 질문 Q1 ~ Q6과 사실 | 지시문의 섹션 "SM이 넘긴 질문"과 "메인 세션이 더하는 사실". SM의 평가는 넘어오지 않았다 | 끝까지 |
| 앞선 기록 | `docs/story-records/1.1/qa-r1.md`의 섹션 "넘겨받은 질문(Dev의 메모 네 건)", `docs/story-records/1.1/po-r1.md`와 `docs/story-records/1.3/po-r1.md`의 섹션 Q6, `docs/qa/gates/1.1.yml`, `docs/qa/gates/1.3.yml`의 `risk_summary`, `docs/stories/1.2.story.md`, `docs/stories/1.3.story.md`의 PO Validation, `docs/stories/1.3.story.md`의 1.3-UNIT-006 행과 T-2 행, `docs/stories/tech-debt/tech-debt-1.story.md` | 그 절과 찾은 줄 |

## 읽은 규칙

`.bmad-core/tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문(PO의 규칙 종류 `operations`, `design`, `documentation`): `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`, `javascript-crap`.
- 읽지 않은 본문: `coding-principles`, `comments`, `crap`은 `quality` 종류여서 읽지 않았다. Story의 CC-CMT-009, CC-CMT-018은 `.bmad-core/tasks/load-project-rules.md`, `.bmad-core/tasks/create-next-story.md`, `CL-GLD-OPS-001`의 글로, CC-CMT-010은 색인과 `docs/story-records/1.3/dev-1.1.md`의 F-6으로 대조했고 본문과 대조하지 않았다.
- 끝까지 읽은 절차와 자료: `agents/po.md`, `project-map.md`, `tasks/validate-next-story.md`, `tasks/validate-loop.md`, `tasks/run-story.md`, `tasks/create-next-story.md`, `tasks/create-next-story-style.md`, `tasks/brownfield-create-story.md`, `tasks/test-design.md`, `tasks/research-decision.md`, `tasks/architecture-align.md`, `tasks/execute-checklist.md`, `tasks/code-comment-style.md`, `checklists/story-draft-checklist.md`, `templates/story-tmpl.yaml`, `data/agent-context.md`, `data/custom-story-flow.md`, `data/finding-classification.md`, `data/story-paths.md`, `data/story-slicing.md`, `data/verification-ownership.md`, `data/development-quality.md`, `data/defect-diagnosis.md`, `data/domain-language.md`, `data/future-work-planning.md`, `data/workflow-routing.md`, `data/test-levels-framework.md`, `data/test-priorities-matrix.md`, `data/terms.md`, `utils/checks/check-stage.sh`, `utils/checks/check-instructions.sh`, 프로젝트의 `AGENTS.md`.
- 일부만 읽은 파일: `data/local-git-workflow.md`(앞부분), `checklists/comment-hygiene-checklist.md`(§3), `agents/sm.md`(핵심 원칙), `Installer.md`(섹션 Merge an existing project or update의 step 2와 그 앞의 수령 기록 문단), `utils/checks/owned-rules.awk`와 `utils/checks/record-rules.awk`(앞부분).

## 범주 결과

| 범주 | 결과 | 근거 |
| --- | --- | --- |
| Project policy checks | PASS | 아래 "Project policy 항목별 근거". 비차단 PO1-N12 |
| 1. Goal & Context Clarity | PASS | Story 문장과 "결과와 범위": "처리할 수 없는 깊이로 중첩된 식의 결과가 `RangeError`에서 `CalculationError`로 바뀌는 것이다". Epic이 없는 유형 Story이므로 Epic 항목은 식별된 출처(원천 항목과 사용자의 결정)로 판정했다. 저장 줄 `Depends on: 1.1, 1.3`이 글과 표에 맞고 두 Story가 `check-merge.sh status`로 병합되어 있으며 `src/engine.js`와 `src/screen.js`를 공급한다. 값어치는 사용자의 말을 그대로 인용했다 |
| 2. Technical Implementation Guidance | PASS | "인터페이스와 파일 위치"의 경로와 심볼이 `docs/architecture.md#소스-트리`와 맞는다. "기술 제약"의 문장을 Architecture의 "기술 구성", "설계 원칙"에 하나씩 대조했다. Architecture 본문을 끝까지 읽었다. 환경 변수가 없고, 문서 대조 대상이 `docs/architecture.md`, `README.md`이며 `src/`에 내장 도움말이 없다. 설계의 문장은 실행으로 확인했다(아래 "계획 점검"). 기술 결정의 조사는 범주 3에서 본다 |
| 3. Reference Effectiveness | FAIL | PO1-B1. "기술 제약"의 "외부 자료를 조사하지 않았다(N-5)"와 체크리스트의 "Relevant prior research and decisions were checked". 그 밖의 참조는 섹션을 가리키고 앞선 기록을 "이전 Story"에 요약했으며 인용을 원문과 대조했다(아래 "사실 주장 대조") |
| 4. Self-Containment Assessment | PASS | 기대와 실제 동작, 재현, 어긋나는 기대, 측정 표, 사용자의 결정 원문이 Story에 있다. 합격 판정을 바꾸는 해석 둘은 Q6의 판정대로 수용된 출처가 뒷받침한다. 사용자의 결정을 Scope, Tasks, Testing으로 따라갔고 어긋나지 않는다. 비차단 PO1-N6, PO1-N8 |
| 4.5. Comment Contract | PASS | Tasks, Dev Notes, Testing을 읽었다. "Story, Task, AC, 시나리오, 표의 행, 결정의 번호는 코드, 주석, 시험 이름, 오류 메시지에 넣지 않는다", "IN-FLIGHT 표시는 만들지 않는다". 새 IN-FLIGHT 지시와 기존 항목이 없다. 정책 ID는 Tasks, Dev Notes, Testing의 글에만 있고 코드에 옮기라는 지시가 없다. 새 파일이 없어 머리글 지시도 없다 |
| 5. Testing Guidance | FAIL | PO1-B2. 그 밖의 항목은 맞다: 수준과 접근이 따로 있고, 11행이 실행 맵과 같으며 합계와 소계가 잰 값과 같고, 시나리오마다 시험 지점이 있고 대역이 없다. RED → GREEN → Cleaner → 재점검이 SubTask 1.1 안에 있고 Architecture 정렬이 마지막이다. 비차단 PO1-N7, PO1-N9, PO1-N10, PO1-N11 |

### Project policy 항목별 근거

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 새 주석의 언어와 쓸모 | PASS | Dev Notes "새 주석은 영어로 쓰고, 왜 `RangeError`를 잡는지처럼 코드만으로 드러나지 않는 까닭을 적는다(CC-CMT-009)" |
| 현재 작업과 사실, 편집 이력 없음 | PASS | Tasks와 제목에 날짜나 회차가 없다. "결함의 사실"은 앞선 기록의 측정임을 밝혔고 Testing의 "Draft 때 관찰한 사실"은 Dev가 다시 확인한다. 날짜는 수용 기록의 인용, SM 기록, Change Log에만 있다 |
| PRD 정체성과 승인된 뜻 | PASS | `docs/prd.md`를 바꾸지 않았고(21a78f7과 같음) Story가 바꾸지 말라고 적는다 |
| AC와 출처 | PASS | 부모 AC가 없는 유형 Story다. AC 5개가 고쳐진 동작과 "확인 조건:"을 적고 들여쓴 `Source:` 줄이 5개다. 회귀와 호환 기준은 번호 없이 따로 있고 출처가 있다. 인용을 커밋 메시지와 항목에 글자로 대조했다 |
| 위반과 기존 잔여물 구분 | PASS | "주석 위생의 비교 기준은 Story 시작의 기준선 HEAD이고, 대상은 ... 바뀐 줄이다", "바뀌지 않은 줄의 기존 내용은 대상이 아니다" |
| 기존 Story와 QA 기록 | PASS | "병합된 Story 1.1, 1.3의 파일과 기록은 고치지 않는다" |
| 임시 자료 | PASS | SM의 메시지 파일이 이어가기 로그의 Story bug-2 섹션에 있고 프로젝트 임시 영역의 커밋 메시지 위치다. Story와 `sm-1`에 임시 경로가 없다(`BMAD_TEMP_PATTERN`이 잡을 글자를 찾아 일치 없음, `check-stage.sh records` 종료 상태 0) |
| Story의 임시 자료 지시 | PASS | "임시 자료는 프로젝트 임시 파일 정책(CL-GLD-OPS-008)을 따른다. Done까지 필요한 근거를 보존하고, 지우는 일은 병합이 확인된 뒤에 이 Story의 일회용 자료에만 한다" |
| 주석 위생 기준 | PASS | 비교 기준과 경로가 있고 `.bmad-core/checklists/comment-hygiene-checklist.md` §3("3. Post-Implementation Check")을 가리킨다. 그 절이 있음을 읽어 확인했다 |
| 승인 주장 | PASS | 결정마다 결정자가 있고, 사용자의 결정을 위치 규칙이나 메시지 언어로 넓히지 않았다. 글자로 대조했다(인용 1건이 커밋 메시지와 Story에 각각 1번) |
| 측정 합계와 소계 | PASS | 아래 "개수와 추적 재측정" |
| 작업 경계 | PASS | 파일은 경로로, 공개 인터페이스는 심볼로 적었다. 목록의 빠짐은 PO1-N11 |
| 출처와 위치 표기 | PASS | 파일과 섹션, 심볼, 설정 키, 시험 이름으로 적었고 줄 번호가 없다(찾은 일치는 `sm-1`의 낱말 "줄 번호" 하나) |
| 실행 가능성 주장 | PASS | "Node.js v24.22.1의 관찰이고 다른 런타임은 확인하지 않았으며". 속성과 변이 점검을 계획하지 않은 까닭을 설정과 Architecture에 묶었다. 넓은 문장 하나는 PO1-N12 |
| Task 문구 | PASS | SubTask는 심볼, 시나리오, 명령, 커밋 제목만 적고 구현식이 없다 |
| 선택지 비교 표 없음 | PASS | 설계의 다른 길은 "설계"의 글로 적었다 |
| Convention Sections 목록 | PASS | 두 목록의 이름이 모두 색인에 있다. `review-sections`의 `javascript-crap`은 `crap`과 함께 읽는 섹션이다 |
| 실행 비용 | PASS | "설치된 JavaScript 규칙에 이 변경에 닿는 실행 비용 규칙이 없고, 수용된 요구사항에 성능 기준이 없다". `javascript-language` 본문과 맞는다 |
| 보이지 않는 글자(CC-DOC-013) | PASS | `invisible-chars.awk`를 Story와 `sm-1`에 돌려 일치 없음 |

## 단계별 결과

| 단계 | 결과 | 근거 |
| --- | --- | --- |
| 1 템플릿 | PASS | 템플릿의 섹션이 모두 있고 자리표시자가 없다(`_TBD_`, `{{` 일치 없음). PO Validation, Dev Agent Record, QA Results는 제목만 있었다 |
| 2 파일과 소스 트리 | PASS | "바꾸지 않음" 행의 14개 경로가 모두 9aea191에 있고(`git cat-file -e`) 바꾸는 파일이 `docs/architecture.md#소스-트리`와 맞는다. 새 파일이 없다 |
| 3 UI | N/A | 브라우저 화면은 뒤 Epic이고 `renderScreen`은 글자를 돌려주는 순수 함수다 |
| 4 AC | PASS | 부모 AC가 없고, 각 AC의 조건과 시나리오가 있다. Task-AC 대응이 있다. 비차단 PO1-N8 |
| 5 시험 | FAIL | PO1-B2. 판정 방법과 표의 기대는 독립 오라클(산술)이고 시나리오 표와 실행 맵이 같다 |
| 6 보안 | N/A | 인증, 데이터, 입출력이 없고, 식을 실행하지 않는다는 기준을 바꾸지 않는다(`src/engine.js`의 직접 해석이 그대로다) |
| 7 Task 순서 | FAIL | PO1-B1. 절차의 "No unresolved planning decisions"에 "N-3 ~ N-6은 ... 바꾸지 않는다"가 N-5에서 맞지 않는다. 그 밖의 항목은 맞다: Task 1 뒤에 Task 2(Architecture 정렬)이고, Coder, Cleaner, 재점검이 SubTask 1.1 안에 있다. `Depends on:` 줄이 글, 표와 같고 `check-stage.sh deps`의 줄이 `story bug-2 story 1.1,1.3`이다. 커밋 제목이 `git.taskCommitPattern`에 맞고, 제목에 ASCII 글자가 없어 `story/bug-2`, 범주 `[Bug 2]`가 `data/story-paths.md`와 맞는다 |
| 8 근거 | FAIL | PO1-B1. 그 밖의 기술 주장은 아래 대조에서 맞다 |
| 9 구현 준비 | FAIL | PO1-B1이 열려 있어 아직 준비되지 않았다. 지식의 빈틈은 아니다: 설계대로 고친 사본이 표의 모든 행과 기존 시험을 통과했고(아래) 지시가 분명하다 |

## 차단 지적 PO1-B1: 핵심 기술 결정의 조사가 없고 이 호출에서 얻을 수 없다

Q5와 메인 세션이 더한 사실을 함께 가린 결과다.

**결정 질문.** 사용자의 결정이 정한 결과("처리할 수 없는 깊이면 `CalculationError`")를 어떤 수단으로 낼 것인가. Story의 답은 Dev Notes "설계"의 "재귀 파서를 그대로 두고, 스택이 넘친 결과를 공개 함수의 경계에서 `CalculationError`로 바꾼다"이고, 받지 않은 길은 숫자 깊이 한도, 반복문으로 다시 쓰기, `src/screen.js`에서 잡기다. 사용자의 결정은 결과와 "숫자 한도 없이"를 정하고 수단은 정하지 않는다.

**요건이 이 결정에 적용되는가: 적용된다.**

- `AGENTS.md` 섹션 Research for uncertainty and core implementation decisions: "Before deciding an uncertain fact or a core technical, design, or behavioral question needed for implementation, investigate relevant industry standards and good practice using **at least five distinct references**." `tasks/research-decision.md` step 2가 같은 수를 요구하고, `tasks/validate-next-story.md` step 8이 "Required research follows `research-decision.md`"를 이 회차의 점검으로 둔다. `agents/sm.md`의 "use verified primary research for needed technical decisions"도 같은 방향이다.
- 핵심 기술 결정이다. 이 Story의 제품 변경 전부가 이 결정이고, AC 1의 `D`, `M`의 기대, 표 1 ~ 3의 기대, 범위 밖의 "파서를 반복문으로 다시 쓰지 않고"가 여기서 나온다. Architecture에는 없다(`docs/architecture.md`, `docs/prd.md`, `docs/planning/decisions.md`에서 스택, `RangeError`, 재귀를 찾아 일치 없음). `tasks/research-decision.md` step 6은 기술 설계의 소유자를 Architect로 두고, `tasks/architecture-align.md` step 3은 "A new design decision still needs its owning decision process"라고 적는다.
- 불확실한 사실이 들어 있다. Story의 글: "스택 넘침이 `RangeError`로 온다는 것은 Node.js v24.22.1의 관찰이고 다른 런타임은 확인하지 않았으며 외부 자료를 조사하지 않았다(N-5)". 이 회차의 실행(아래 "런타임 근거")도 이 동작이 "engine-specific"이라는 Node.js 자체의 글, 스택 크기와 호출자의 스택에 달린 결과를 보였다.
- 낮은 영향이 수를 줄이지 않는다. 되돌리기가 쉽다는 Story의 글은 맞지만 `AGENTS.md`의 항목 4는 영향이 크면 수를 늘리라고 할 뿐 줄이라고 하지 않는다. 실제 실행도 대신하지 않는다. 항목 4는 "official and independent evidence and actual verification"을 함께 든다.
- 재사용할 조사가 없다. `docs/research`가 없고, 앞선 PO와 QA 기록에는 측정만 있으며 앞선 Story의 "외부 자료 조사는 하지 않았다"는 이 결정의 조사가 아니다. 앞선 사례는 규칙을 바꾸지 못한다.

**방법론과의 차이(`load-project-rules.md` 섹션 Authority and output boundaries가 보고하라는 차이).** `tasks/create-next-story.md` 섹션 In a run은 SM에게 조사 대신 Architecture의 틈으로 보고하라고 하고, `tasks/run-story.md` 섹션 Stop, hold and carry on은 조사를 메인 세션의 읽기 전용 PO 작업으로 옮긴다. 조사가 다른 역할로 옮겨 갈 뿐 없어지지 않으므로 SM의 보고 자체는 어긋나지 않는다. 다만 이 절차들만 따르면 PO가 비차단으로 가려 개발로 넘길 수 있는데, `AGENTS.md`는 결정 전에 조사하고 자료가 없으면 잡아 두라고 한다. `check-instructions.sh`가 종료 상태 0이어서 이 글은 소유자가 검토한 그대로이고, 그 절은 어긋나는 경우 그 글을 따르라고 한다. 그래서 이 회차는 `AGENTS.md`를 따른다.

**자료를 얻을 수 없다.** 실행 요청의 조건이 네트워크를 모델 호출과 이 저장소의 원격으로 한정하고, 이 회차의 지시가 "외부 자료를 읽지 않는다"고 한다. 사용자의 조건은 조사를 면제하지 않는다. `AGENTS.md`의 항목 6이 이 경우를 바로 정한다: "If necessary material cannot be obtained, do not claim the requirement is met. Record the evidence obtained and the missing material. Hold work dependent on that decision and continue independent work."

**얻은 근거(요건을 채웠다고 말하지 않는다).** 아래 "계획 점검"과 "런타임 근거"의 실행, Node.js 실행 파일에 든 자체 소스 `internal/errors`의 `isStackOverflowError` 하나, `node --v8-options`의 `--stack-size` 설명 하나, 프로젝트 규칙 CC-JS-006("Catch an error where recovery, translation, or necessary context is possible. Preserve its cause")과 CL-GLD-OPS-006이다. 앞의 둘은 같은 구현에서 나온 자료이고, 뒤의 둘은 번역과 범위의 일반 규칙이어서 스택 넘침을 말하지 않는다. 수를 맞추려고 세지 않는다. 이 항목의 어느 것도 항목 2가 든 표준이나 공식 문서를 읽은 것이 아니다.

**빠진 자료.** ECMAScript 명세가 호출 스택의 한계를 정하는지, V8과 Node.js의 공식 문서가 스택 넘침의 오류와 복구를 어떻게 말하는지(`--stack-size`, Worker의 `resourceLimits.stackSizeMb`), 스택 넘침을 잡는 일에 대한 정착된 지침, 재귀 하강 파서의 깊이 처리에 대한 공개 구현이나 지침이다. 이 목록은 읽을 후보이고 그 내용을 이 기록이 안다고 말하지 않는다.

**분류.**

- 1단계, 확인했다. 빠진 근거 자체가 관찰이다. Story의 글이 조사가 없다고 말하고, `tasks/research-decision.md` step 6과 `templates/story-tmpl.yaml`의 "Include essential research conclusions and original supporting sources inline"이 그 결론과 출처를 Story에 두라고 한다.
- 2단계, 이 Story가 만든 결정이다.
- 3단계, 기준은 위의 `AGENTS.md`, `tasks/research-decision.md` step 2와 step 7("Continue dependent work only when the required research and applicable decision authorization are satisfied")이다. `uncertain`, `core`는 정도를 남기는 낱말이어서 3단계만으로 세우지 않고 4단계로도 확인했다.
- 4단계, 계획 결정이다. Story의 "N-3 ~ N-6은 이 Story의 Task 내용과 순서, 합격 판정을 바꾸지 않는다"(읽기 ㄱ: 이미 정해진 Story의 설계다. Task 1.1이 그대로이고 `D`, `M`이 `CalculationError`다)와 SM 메모 N-5의 "소유자: Architect"(읽기 ㄴ: 기술 결정이 소유자에게 남아 있다)가 함께 있다. 답이 잡기를 받지 않으면 AC 1의 `D`, `M`의 합격 판정(반복문이면 값 1), 범위 밖 문장, SubTask 1.1, 표 1 ~ 3이 바뀐다. `data/story-slicing.md`의 "its outcome changes the content, order or acceptance check of a Task"에 든다. 결정 순서로도 차단이고, 다르게 읽더라도 위의 차이 문단대로 일은 `AGENTS.md`를 따른다.
- 해결 경로 `pending`. SM이 자료를 읽을 수 없고 메인 세션도 그렇다. `tasks/run-story.md`의 메인 세션 답은 "without accepting a risk"인 경우인데, 자료 없이 가는 것이 위험을 받아들이는 일이다. 네트워크 조건을 넓히거나 위험을 받아들이는 일은 사용자만 할 수 있고, 실행 요청의 조건이 "위에 적지 않은 사용자 결정을 대신 내리지 않는다"고 한다. `to Done`은 단계의 권한이지 조사의 면제가 아니다. 수용된 요구사항을 바꾸는 일이 아니어서 `contract`가 아니다.

**잡히는 것.** 이 결정의 확정, Draft에서 Approved로의 전환, Story 시작과 그 이슈, SubTask 1.1과 2.1, QA, Done, Done의 push와 요청이다. **잡히지 않는 것.** PO1-B2의 수정과 계약 안 비차단 지적의 적용, 이 기록, 다른 Story의 일이다.

**이 회차의 제안.** 답하는 사람은 사용자다.

1. 권고: 이 결정 하나의 조사에 한해 읽기 전용 PO 작업(`tasks/research-decision.md` 섹션 In a run)이 외부 자료를 읽도록 네트워크 조건을 넓힌다. 결론과 출처를 SM이 Dev Notes에 적고 PO가 영향 범위를 다시 검증한다. 반대 증거가 없으면 지금의 설계가 그대로 가므로 Task의 변경은 작다.
2. 사용자가 조사 없이 이 설계와 그 위험을 받아들인다고 결정한다. SM이 그 글과 결정자, 범위와 함께 빠진 자료를 Scope and Dependencies에 적는다. Story는 요건을 채웠다고 적지 않는다.
3. Story 작업을 버린다(`tasks/local-story-cancel.md`, 사용자만 고른다).

## 차단 지적 PO1-B2: 설계의 구현 조건 둘에 닿는 점검이 없다

- 관찰: Dev Notes "설계"의 구현 조건 "까닭 글자는 엔진의 다른 까닭처럼 영어 낱말로 쓰고 ... 메시지에 식을 되풀이하지 않는다." "추적" 표는 "Dev Notes "설계"의 구현 조건 | 1.1 | bug-2-UNIT-003, bug-2-UNIT-004, bug-2-UNIT-005, bug-2-INSP-001"이라고 적는다. bug-2-INSP-001의 판단 목록에는 두 조건이 없고 "실패: 하나라도 어긋난다"는 그 목록을 말한다. bug-2-UNIT-004의 실패 기준은 "식만 되풀이해 `Z`의 수만 있거나"로 위치가 없는 경우다.
- 재현: 설계대로 고친 사본에 메시지를 `expression {식} nested too deeply at position 0`으로 바꾼 변형과 까닭을 한국어로 바꾼 변형을 걸어 기존 시험과 표 1 ~ 4의 행을 돌렸다. 둘 다 81개 통과, 실패 0이다. 앞의 변형에서 `D`의 오류 줄은 20만 글자가 넘는다.
- 1단계 확인했다. 2단계 이 Story의 계획이다.
- 3단계 기준: `tasks/test-design.md` 섹션 5 "Trace each required behavior, decision rule and output declared in the Story, including Dev Notes, back to its responsible SubTask and to a check whose expectation and failure criterion cover that result." `data/finding-classification.md`의 "unmet only when no planned check of the result of each SubTask responsible for it exercises that rule". 표의 어느 시험의 합격과 실패도 메시지에 식이 들었는지, 까닭이 영어인지에 달려 있지 않다. Cleaner의 점검 목록에도 이 조건이 없다.
- 해결 경로 `rework`, 소유자 SM. 수용된 계약 안에서 고칠 수 있고 PO1-B1의 답에 달리지 않는다.
- 필요한 수정: bug-2-INSP-001의 판단 목록에 "까닭이 엔진의 다른 까닭과 같은 꼴의 영어 낱말이고 메시지에 식을 되풀이하지 않는가"를 더한다. 시험이 낱말을 고정하지 않는다는 결정은 그대로다.
- 넣지 않은 것: 구현 조건 "까닭과 위치를 잇는 꼴 ... 두 곳에 적지 않는다"도 표의 시험으로 가려지지 않는다(그 꼴을 `evaluate`에 다시 적은 변형, 81개 통과). 그러나 Cleaner의 점검 목록 "Unnecessary branches, nesting, duplication"이 SubTask 1.1의 계획 안에서 그 결과에 닿으므로 이 지적이 아니다.

## 계획 점검

Story의 표를 커밋 9aea191의 코드와 시험 사본(`git archive`)에 Story의 글만으로 옮긴 시험 13개와 기존 시험 68개로 돌렸다. 프로젝트 임시 영역의 사본이고 제품 코드가 아니며, 구현 결과나 Dev의 RED가 아니다. Node.js v24.22.1, win32 x64.

| 사본 | 결과 | 뜻 |
| --- | --- | --- |
| 고치지 않은 엔진 | G-1, G-2, G-3, G-5, G-7, B-1, B-2, B-3, S-1 실패, 72개 통과 | Order 1의 RED가 뜻대로 실패한다 |
| Story의 설계, 행 "an expression nested too deeply" 지움 | 81개 통과, 실패 0 | 표가 서로 맞고 설계로 통과한다 |
| Story의 설계, 그 행 남김 | `throws what evaluate throws when that is not a calculation error`만 실패 | "현재 시험에 관한 주장" 둘째 행이 맞다 |
| 넘친 순간의 커서를 위치로 | G-6만 실패 | bug-2-UNIT-005의 변형이 맞다 |
| `cause` 없음 | G-5만 실패 | 맞다 |
| 위치 없음, 식만 되풀이 | 각각 G-3만 실패 | 맞다(`Z`의 뜻) |
| 다른 까닭 재사용 `unclosed parenthesis` | G-4만 실패 | 맞다 |
| 다른 까닭 재사용 `number out of range` | 실패 없음 | PO1-N7 |
| 재귀 안(`parseFactor`의 두 갈래)에서 잡고 위치 0 | 실패 없음 | PO1-N9 |
| `Parser.parseAll`에서 잡고 위치 0 | 실패 없음 | 재귀 밖의 다른 자리이고 "설계"의 조건에 맞는다 |
| 넘치면 값 0을 돌려줌 | G-1 ~ G-7, B-1 ~ B-3, S-1 실패 | bug-2-UNIT-003의 민감도는 이 변형으로 보일 수 있다 |
| `evaluate`에서 `CalculationError` 말고 모두 번역 | 실패 없음 | 닿는 입력으로 구별되지 않는다. bug-2-INSP-001이 맡고 Story가 그렇게 적었다 |
| `TypeError`도 `CalculationError`로 | T-1의 시험만 실패 | "현재 시험에 관한 주장" 넷째 행이 맞다 |
| 깊이 한도 1500 / 500, 길이 한도 10만 | 실패 없음 / V-1 실패 / V-2 실패 | 1500은 `coverage_gaps`와 bug-2-INSP-001이 든 틈이다. 맞다 |
| 클래스를 가리지 않는 `renderScreen` | T-1의 시험만 실패 | "현재 시험에 관한 주장" 셋째 행이 맞다 |
| `RangeError`도 받는 `renderScreen` | 실패 없음 | Story가 든 틈이고 bug-2-INSP-002가 지킨다. 맞다 |
| `src/screen.js`만 고침 | 고치지 않은 엔진과 같은 9개 실패 | "설계"의 셋째 까닭이 맞다 |
| 식을 되풀이한 메시지, 한국어 까닭 | 실패 없음 | PO1-B2 |
| 위치를 식 길이로, 위치를 첫 `(`나 `-`로 | 실패 없음 | 위치가 구현 선택이라는 Story의 글이 맞다(Q1) |

`RED` 출력: 고치지 않은 엔진에서 기존 도우미 `errorLineOf`에 `D`를 넣은 시험 하나의 `node --test` 출력은 201024바이트다(PO1-N10).

프로젝트 루트의 `node --test`는 68개 통과, 실패 0이고 임시 영역의 사본을 집어 가지 않는다. `node ci/screen-rule.check.mjs`는 종료 상태 0이다.

### 런타임 근거

표의 값은 Story 설계의 사본에서 잰 것이다. 괄호 안은 지금 엔진의 값이다.

| 재기 | 결과 |
| --- | --- |
| 새 프로세스, 호출 하나 | `P(2000)` 값 1, `P(3000)` `CalculationError`(`RangeError`), `O(2000)` `unclosed parenthesis at position 1999`, `O(3000)` 깊이 오류(`RangeError`), `M(8000)` 값 1, `M(10000)` 깊이 오류(`RangeError`). 지금 엔진은 `P(2500)` 값 1, `M(9000)` `RangeError`. 앞선 측정 표와 어긋나지 않는다 |
| 한 프로세스의 같은 식 | `P(3000)`: 첫 호출 `CalculationError`(`RangeError`), 예열 뒤 값 1. `O(3000)`: 새 프로세스의 첫 호출은 깊이 오류이고, 앞선 호출로 예열된 프로세스에서는 `unclosed parenthesis at position 2999`다 |
| 예열된 한계(이분 탐색, 넘침이 단조롭지 않아 어림) | 지금 엔진: 괄호 3118, 6243, 닫지 않은 괄호 4687, 8341, 단항 마이너스 12493, 7824. Story의 입력 100000보다 훨씬 작다 |
| 호출자가 스택을 거의 다 쓴 호출(재귀로 스택을 채우고 풀면서 층마다 호출) | `D`: 깊이 오류 6317번, `RangeError` 2번. `1 + 2`: 값 3 6313번, `RangeError` 2번, 깊이 오류 4번. 자리가 없어 재기 함수 자체가 `RangeError`로 끝난 층이 271번 |
| Worker의 `resourceLimits.stackSizeMb` | 0.25: `P(1000)`, `M(1000)`도 `CalculationError`. 4: 1000은 값, 100000은 `CalculationError`. 64와 512: `P(100000)`, `M(100000)`도 값 1 |
| Node.js 자체의 글 | v24.22.1(V8 13.6.233.17-node.58)의 내장 `internal/errors`: "Returns true if `err.name` and `err.message` are equal to engine-specific values indicating max call stack size has been exceeded. "Maximum call stack size exceeded" in V8." |
| V8 옵션 | `node --v8-options`: `--stack-size (default size of stack region v8 is allowed to use (in kBytes))`, 기본값 984 |
| 아주 긴 글자 | `"1"` 뒤에 U+0020이 와서 길이가 `2 ** 29 - 24`인 글자에서 `renderScreen`은 `RangeError: Invalid string length`를 던진다(701 ms). U+0020 1억 개 뒤에 `1`이 오는 글자는 줄을 돌려준다(186 ms) |

## 개수와 추적 재측정

| 측정 | 방법 | 결과 |
| --- | --- | --- |
| 시나리오 행 | `^\| bug-2-` 행을 열로 나누어 셈 | 11행, 모두 8열, 중복 없음 |
| 수준 | Level 열 | unit 7, integration 1, inspection 3. Overview, `by_level`과 같다 |
| 우선순위 | Priority 열 | P0 3, P1 7, P2 1. Overview, `by_priority`와 같다 |
| 실행 방식 | Execution 열 | automated 9, agent-review 2. Overview, `by_execution`과 같다 |
| 실행 맵 | `test_design.execution`과 표를 `diff` | 같다 |
| SubTask와 시나리오 | 1.1의 10개와 2.1의 1개를 표의 Task 열과 대조. 각 행의 기대와 실패 기준을 읽어 SubTask의 결과를 덮는지 봤다 | 같다. 빠진 것은 PO1-B2의 둘 |
| 입력의 값 | `Z` 길이 200007, `F` 200000, `S` 3, `M(1000)`, `A(500)`은 1 | 실행으로 맞다 |
| future-work 항목 | `git show 21a78f7:`의 줄 수 | `##` 38, `Planning: unplanned` 37, `Planning: undecided` 1, `Plan:` 1 |
| 줄 수 | `wc -l` | 468 |

## 사실 주장 대조

맞음으로 확인한 주장: 유형 Story의 키(`git ls-tree`의 `origin/main`과 작업 트리에 `tech-debt-1`뿐, `Closed items` 없음), `tech-debt-1`의 Status Done과 씨앗의 글, 다른 future-work 항목에 `RangeError`나 "중첩"이 없음, 원천 항목의 배정 줄, 사용자의 말과 다음 행동의 인용, 측정 표와 `docs/story-records/1.1/qa-r1.md`의 표, `docs/qa/gates/1.1.yml`, `docs/qa/gates/1.3.yml`의 monitor 줄, `check-merge.sh status 1.1 main`과 `status 1.3 main`의 출력, Story 1.1 PO1-N8, TEST-001, TEST-002, DOC-001, Story 1.3 Cleaner F-1, F-6, PO1-N10, PO1-N11, PO2-N1의 요약, `Parser.fail`의 꼴, 도우미 이름, `test/engine.test.js`의 가장 깊은 입력, `returns a line longer than the display whole`의 기댐(49글자), `formatNumber`의 `RangeError`가 닿지 않음(`checkFinite`, `parseNumber`), `docs/research`와 `docs/domain-glossary.md`가 없음, `README.md`의 내용, `package.json`의 버전, `.github/workflows/ci.yml`의 두 명령, 1.3-UNIT-006의 "`D`가 이것을 잡는다", 표 2의 T-2.

어긋나는 주장: "N-3 ~ N-6은 ... 바꾸지 않는다"와 "사람만 할 수 있는 입력이나 행동: 없다"는 PO1-B1에 맞지 않는다. 둘 다 Story의 계획에 관한 문장이고 PO1-B1의 답이 오면 SM이 고친다.

## 넘겨받은 질문과 SM 메모의 판정

### Q1, SM N-1, PO1-N1: 새 오류의 메시지 위치

- 확인: 항목 "오류 위치의 글자"는 이 오류를 들지 않는다. Story는 위치를 0부터 식 길이까지 받고 "가장 단순한 값은 식의 시작 0"을 구현 선택으로 적는다. `1 + D`에서 0은 `1`을 가리킨다.
- 3단계: `CalculationError` JSDoc의 "of the problem"과 PRD Story 1.1 AC 3의 "문제가 된 위치"는 세는 법을 넘어 어느 글자인지를 정하지 않아 이 경계의 기준이 아니다. D-1은 세는 법이다.
- 4단계: 0, 첫 `(`나 `-`, 식 길이를 쓴 사본이 모두 81개를 통과해 Task와 합격 판정이 같다. 다른 구현 선택일 뿐이다. bug-2-INSP-001의 "JSDoc이 새 오류에도 맞는가"는 Story의 더 구체적인 문장이 0을 허용하므로 다른 판정을 낳지 않는다.
- 분류: 비차단. 계약 밖. 막는 다음 단계 없음. 답하는 사람: 프로젝트 소유자. 제안: 위치 규칙을 정할 때 이 오류도 함께 정한다.

### Q2, SM N-2, PO1-N2: 새 까닭 글자의 언어

- 확인: 다른 까닭이 영어이고 항목 "오류 메시지의 언어와 꼴"이 `unplanned`다. 사용자에게 보이는 글자에 영어 까닭이 하나 더 는다.
- 3단계, 4단계: 수용된 언어가 없고 낱말을 고정하지 않아 판정이 같다. 구현 조건에 닿는 점검의 빈자리는 PO1-B2이고 언어의 답과 별개다.
- 분류: 비차단. 계약 밖. 막는 다음 단계 없음. 답하는 사람: PM. 제안: 그 항목의 답을 따른다.

### Q3, SM N-3, PO1-N3: "다른 오류는 그대로 던진다"에 닿는 입력

- 확인: 사본에서 글자 입력의 `D`, `M`, `O`가 오류 줄이고, 일곱 입력의 T-1은 그대로 던진다. 글자 입력이 이 문장에 닿는 길은 호출자가 스택을 거의 다 쓴 경우뿐이다(`D`와 `1 + 2`의 `RangeError` 각 2번).
- 3단계: AC 2의 문장은 거짓이 되지 않는다. 항목의 답이 `CalculationError`이면 닿는 시험 입력이 없어지지만 그것은 뒤의 변경이다.
- 4단계: 지금의 답(`TypeError`)에서 판정이 하나다. 수용되지 않은 뒤의 변경을 가정하지 않는다.
- 분류: 비차단. 계약 밖. 막는 다음 단계 없음. 답하는 사람: PM. 제안: 항목 "문자열이 아닌 입력"을 정할 때 함께 보고, 답이 `CalculationError`이면 그 변경의 계획이 T-1과 그 시험을 다시 정한다.

### Q4, SM N-4, PO1-N4: 경계 부근의 같은 식

- 확인: 같은 프로세스에서 `P(3000)`이 첫 호출은 오류이고 예열 뒤 값이다. 지금 엔진도 같은 꼴이어서(`RangeError` 뒤 값) 이 Story가 만든 성질이 아니다.
- 3단계: "공개 함수는 순수 함수로 두고 입출력이나 전역 상태를 쓰지 않는다"의 구체적인 부분은 지켜진다. 스택 한계에 달린 결과를 "순수 함수"가 금하는지는 수용된 글이 정하지 않는다. 그리고 사용자가 "항목의 제안대로"라고 받은 항목의 "값 또는 그 결과를 받는 시험을 둔다"가 이 경우를 직접 말한다. 넓은 문장을 구체적인 문장이 좁히므로 모순이 아니다.
- 4단계: 표 3의 합격 판정이 하나다.
- 분류: 받아들인다. 비차단. 계약 밖. 막는 다음 단계 없음. 답하는 사람: Architect. 제안: 설계 원칙에 스택 한계에 달린 결과의 예외를 적는다. AC 3의 출처로 쓴 "순수 함수"와 표 3이 어떻게 함께 서는지가 글로 남는다.

### Q5, SM N-5, N-6: 잡아 번역하는 결정과 보지 않은 실행

세 부분으로 나누어 판정했다.

- 잡아 번역하는 수단: 위 PO1-B1. 막는 질문이다.
- 다른 런타임: Architecture가 실행 환경을 Node.js 24로 정해 이름 없는 입력이다. 확인할 런타임이 이 기기에 없어 리드로 둔다.
- 스택 크기를 바꾼 실행과 호출자가 스택을 거의 다 쓴 호출, PO1-N5: 실행으로 확인했다(위 "런타임 근거"). AC의 머리가 "Node.js 24의 기본 스택 크기"로 한정하고 Dev Notes가 "호출자가 스택을 거의 다 쓴 상태의 호출은 이 Story의 입력이 아니다"라고 적어 수용된 쓰임이 아니다. 4단계에서 이름 없는 입력이므로 비차단이다. 다만 N-6의 글은 `RangeError`만 말하고, 짧은 식 `1 + 2`가 깊이 오류로 번역되는 경우를 말하지 않는다. 계약 밖. 막는 다음 단계 없음. 답하는 사람: Architect. 제안: PO1-B1의 조사에서 함께 보고, 까닭 글자가 깊이만 말하게 둘지 정한다.

### Q6, PO1-N6: 결정의 자리와 Story의 두 해석

- 결정의 자리: 사용자의 결정은 Scope and Dependencies와 커밋 2c44760의 메시지에 있고 `docs/planning/decisions.md`와 PRD Story 1.1 AC 3에는 없다. `tasks/research-decision.md` step 6과 `data/future-work-planning.md`가 이 자리를 정한다: Draft에서 받은 결정은 Story 안에 두고, 항목의 출처와 트리아지 결정은 Story의 Scope and Dependencies가 들고, 결정 기록에 옮기는 일은 다른 Story가 공유 근거로 쓸 때다. 빠진 것이 아니다.
- "같은 식의 메시지는 호출마다 같다": 출처 항목은 말하지 않는다. 근거는 Architecture의 "공개 함수는 순수 함수로 두고"이고, 이 해석 없이는 AC 4의 "같은 식에서 `evaluate`가 던진 `CalculationError`의 `message`"를 시험으로 판정할 수 없다(`renderScreen` 안의 호출이 한 단 깊다. 커서 변형이 G-6에서 실패한다). 합격 판정을 바꾸는 해석이고 수용된 출처가 뒷받침한다. 경계의 예외는 Q4의 문장이 좁힌다.
- "`D`는 값이 아니라 `CalculationError`다": 항목의 "값 또는 그 결과를 받는 시험"보다 좁다. 근거는 지금 엔진에서 `D`가 처리할 수 없다는 실행 사실, 사용자의 말 "처리할 수 없는 깊이면 `CalculationError`입니다", 그 커밋에 적힌 PO 권고의 "범위가 좁다"와 CL-GLD-OPS-006이다. 반복문 구현이면 값이 되는데, 그것은 Story가 범위 밖에 둔 길이다. 이 해석의 뿌리인 수단은 PO1-B1이 잡고 있어 그 답이 바꾸면 함께 바뀐다.
- PRD Story 1.1 AC 1의 "값을 수로 돌려준다"와의 관계: AC 1은 깊이의 경계를 정하지 않아 이 경계의 기준이 아니고, 사용자의 결정이 그 경계를 정한다. 두 요구사항의 모순이 아니다.
- 분류: 비차단. 계약 밖(Story가 그 문서들을 바꾸지 않는다고 적었다). 막는 다음 단계 없음. 답하는 사람: PM. 제안: 후보 D-3으로 결정 기록에 옮길지 정한다.

## PO가 새로 낸 비차단 지적

### PO1-N7: G-4가 `number out of range`의 까닭을 비교하지 않는다

AC 3 "까닭이 다른 문제의 까닭과 다르며", bug-2-UNIT-004 "다른 문제의 까닭을 다시 쓰거나". 엔진의 까닭 여섯 가운데 표의 다섯 입력이 다섯을 덮고 `number out of range`가 빠진다. 그 까닭을 다시 쓴 변형이 81개를 모두 통과했다. 규칙을 시험이 이미 다루므로 3단계의 마지막 문장대로 4단계이고 비차단이다. 값어치: 틈을 닫는다. 계약 안. 시점: SM의 다음 수정. G-4에 `1` 뒤에 0이 309개 오는 수 글자를 더한다.

### PO1-N8: AC 3의 문장과 경계 부근의 `O(n)`

AC 3 "이 `CalculationError`의 메시지는 ... 같은 식이면 호출할 때마다, 호출 스택의 깊이가 달라도 같다", Risk Coverage "같은 식의 메시지가 호출마다 달라 화면의 줄이 흔들린다", Dev Notes "값이거나 오류일 수 있어". 잰 결과 `O(3000)`은 새 프로세스에서 깊이 오류, 예열 뒤 `unclosed parenthesis at position 2999`다. 값과 오류 말고 두 오류 사이에서도 흔들린다. "이 `CalculationError`"로 읽으면 AC 3과 모순되지 않고, 표 3의 B-3은 클래스만 보며 G-6은 `D`, `M`만 봐서 합격 판정이 같다. 비차단. 값어치: Dev와 QA가 넓은 문장으로 읽지 않게 한다. 계약 안. 시점: SM의 다음 수정. 넘쳐서 던지는 오류의 메시지임을 적고 N-4와 `coverage_gaps`에 이 경우를 더한다.

### PO1-N9: bug-2-UNIT-003의 실패 기준이 든 변형은 실패하지 않는다

"실패: 어느 한 깊이에서 `RangeError`가 나가거나(재귀 안에서 잡아 다시 넘친 구현)", Recommended Execution Order 3번 "bug-2-UNIT-003(재귀 안에서 잡는 구현)", Dev Notes "다시 넘칠 수 있다". `parseFactor`의 두 갈래에서 잡고 위치 0을 쓴 변형이 81개를 모두 통과했다. 코드를 따라가면 안쪽에서 다시 넘친 `RangeError`를 바깥 층의 catch가 받아 끝내 `CalculationError`가 된다. 잡는 곳은 bug-2-INSP-001이 읽고, 민감도는 값 0을 돌려주는 변형으로 보일 수 있으며 "예상되는"이라고 적었으니 Dev가 막히지 않는다. 비차단. 값어치: Dev가 실패하지 않을 변형을 걸고 기록하는 일(Story 1.1 TEST-002와 같은 지적)을 막는다. 계약 안. 시점: SM의 다음 수정. 괄호의 변형과 3번의 대상을 값이 틀리는 변형으로 바꾸고, 재귀 안의 구현은 bug-2-INSP-001이 잡는다고 적는다.

### PO1-N10: 이름표 문장과 기존 도우미

Testing "긴 입력을 실패 메시지에 그대로 넣으면 출력이 20만 글자가 되므로 이름표를 쓴다", "판정 방법"의 "기존 도우미 `errorLineOf`로", "기존 도우미 `assertRejected(expression, null)`로". 두 도우미와 `assertLines`는 `JSON.stringify(expression)`을 메시지에 넣고 `assertRejected`는 후보 목록도 넣는다. Order 1의 RED 출력이 201024바이트다. 합격 판정이 같고 도우미를 바꾸는 일은 기법이어서(`data/verification-ownership.md`) 비차단이다. 값어치: RED 기록과 Dev의 읽기 비용. 계약 안. 시점: SM의 다음 수정, 없으면 Dev의 SubTask 1.1. 긴 입력은 도우미에 이름표를 받는 인자를 쓰거나 같은 판정을 이름표로 적는다고 적는다.

### PO1-N11: "바꾸지 않음" 목록의 빠짐

"이전 Story"의 "바꾸지 않는 파일을 모두 든다", 범위 밖 "병합된 Story 1.1, 1.3의 파일과 기록은 고치지 않는다", Dev Notes "버전도 바꾸지 않는다". 목록에 `docs/story-records/1.1/`, `docs/story-records/1.3/`, `docs/qa/gates/1.1.yml`, `docs/qa/gates/1.3.yml`, `package.json`이 없다. bug-2-INSP-002의 규칙 안의 사례이므로 비차단이다. Story 1.3 PO2-N1과 같은 꼴이다. 값어치: 낮다. 계약 안. 시점: SM의 다음 수정.

### PO1-N12: "던지는 길은 이 수정으로 없어진다"

Dev Notes "`renderScreen`이 문자열로 받은 입력에서 던지는 길은 이 수정으로 없어진다". 위 "런타임 근거"의 아주 긴 글자에서 `RangeError: Invalid string length`이고 `try` 밖의 글자 잇기에서 나온다. 호출자가 스택을 거의 다 쓴 경우도 있다. Story의 계획에 관한 문장이고 이름 없는 입력이어서 비차단이다. 값어치: 낮다. Story가 앞선 DOC-001에서 옮긴 "모든 입력을 말하는 문장에는 잰 범위를 함께 적는다"와 맞춘다. 계약 안. 시점: SM의 다음 수정.

## 리드와 기각한 관찰

### 리드

- 다른 런타임의 스택 넘침: 이 기기에 Node.js 말고 재볼 런타임이 없다. 확인하는 것: 조사 자료나 그 런타임의 실행. Architecture가 Node.js 24로 정해 계획된 쓰임이 아니다.
- CI 환경의 깊이 1000: `.github/workflows/ci.yml`은 `ubuntu-latest`, `node-version: 24`이고 측정은 Windows x64의 v24.22.1이다. 새 프로세스의 괄호 2000이 통과해 V-1의 여유가 두 배이고 실패의 증거는 없다. 확인하는 것: 요청의 CI 실행. 막는 다음 단계 없음.
- `docs/story-records/1.3/dev-1.1.md`의 F-6이 인용한 CC-CMT-010의 본문: `quality` 종류여서 읽지 않았다. 확인하는 것: Cleaner와 QA의 읽기.

### 기각한 관찰

- "이 Story가 잘못 분류된 유형이다": 기각. 사용자가 결함으로 정했고, PRD Story 1.1 AC 3의 "짝이 맞지 않는 괄호"가 `CalculationError`인데 `O`가 `RangeError`이며 `CalculationError` JSDoc과 어긋나 `data/future-work-planning.md`의 Bug 뜻에 맞는다.
- "AC 2의 표 3이 Architecture의 순수 함수와 모순이어서 `pending`이다": 기각. Q4의 판정대로 사용자의 결정이 받은 문장이 좁힌다.
- "P0 시나리오에 정상 경로가 없다": 기각. bug-2-UNIT-001은 bug-2-UNIT-002를 든다. bug-2-UNIT-006, bug-2-UNIT-007의 정상 경로는 그대로 남는 기존 시험 `renders the expression, an equals sign and the result as one line`이고 bug-2-INT-001이 돌린다.
- "`cause`의 시험이 구현에 묶인다": 기각. `cause`는 호출자가 보는 공개 속성이고 CC-JS-006의 요구다.
- "깊이 한도 1500이 시험을 통과한다": 지적 아님. `coverage_gaps`에 있고 bug-2-INSP-001이 읽는다.
- "넓은 catch가 시험을 통과한다": 지적 아님. `Parser`에서 나올 수 있는 다른 오류가 없어 닿는 입력으로 구별되지 않고 bug-2-INSP-001이 읽는다.
- "PRD Story 1.1 AC 1과 사용자의 결정이 모순이어서 `contract`다": 기각. Q6의 판정대로다.

## 미완료 점검

없다. 모든 필수 점검을 끝냈다. PO1-B1의 조사는 끝내지 못한 점검이 아니라 빠졌음을 확인한 지적이다.

## Anti-Hallucination

꾸며낸 사실은 찾지 못했다. 근거 없는 기술 결정은 PO1-B1이고, 추론임을 밝히지 않은 효과는 PO1-N9의 "다시 넘칠 수 있다"의 결과, 넓은 문장은 PO1-N12다. 한 항목을 두 번 세지 않는다. 메인 세션이 더한 사실은 지시문의 글로 받았고, 네트워크 조건을 이어가기 로그의 사용자 결정 원문과 대조했다.

## 취합과 승인 전 감사

수집 응답은 실행 요청이고 추가 검토는 없다(`validate-next-story.md` 섹션 In a run). 합칠 문서가 없어 이 회차의 지적이 전부다. 판정이 NO-GO이므로 승인 전 감사와 `check-stage.sh approve`의 전환을 하지 않았고 Status는 Draft 그대로다. 필요한 수정과 재확인은 SM 피드백 문서로 넘겼다. 이 문서는 이 회차의 PO 자료이고 Story와 이 기록은 그 경로를 적지 않는다.

## 실행한 명령과 결과

| 명령 | 결과 |
| --- | --- |
| `sh .bmad-core/utils/checks/check-instructions.sh` | 종료 상태 0 |
| `git status --short --untracked-files=all`, `git rev-parse HEAD`, `node --version` | Story와 `sm-1`만 추적되지 않음, 9aea1916e47d8d677fd0b4c291af260fa355c0a8, v24.22.1 |
| `git diff --stat 21a78f7 9aea191`, 같은 범위의 PRD, Architecture, 결정 기록, 코드, 시험 경로 | `docs/planning/future-work.md` 19줄 삭제뿐, 나머지 출력 없음 |
| `node --test`, 프로젝트 루트 | 68개 통과, 실패 0 |
| `node ci/screen-rule.check.mjs` | 종료 상태 0 |
| `sh .bmad-core/utils/checks/check-merge.sh status 1.1 main`, `status 1.3 main` | 종료 상태 0, 각각 `merged 81c547c94a4e2dcbbf64e375909f3721b2933146`, `merged 937f21c5a4d5cc5623f90caefa08dd3e137d89f5` |
| `sh .bmad-core/utils/checks/check-stage.sh deps` | 종료 상태 1. `story bug-2 story 1.1,1.3`은 유효하고 `missing tech-debt-1 story`는 이 Story가 아닌 씨앗의 줄이며 순환은 없다 |
| `sh .bmad-core/utils/checks/check-stage.sh records`, Story | 저장 전 종료 상태 0. 저장 뒤의 결과는 이 회차의 보고에 있다 |
| `sh .bmad-core/utils/checks/check-stage.sh future --story bug-2` | 종료 상태 0. `Revisit:` 알림 6줄 |
| 계획 점검, 런타임 재기, 개수 재측정 | 위의 표들 |

## 한계

- 계획 점검은 프로젝트 임시 영역의 사본에 Story의 글로 시험과 변형을 만든 것이며 구현 결과가 아니고 Dev의 RED나 Cleaner를 대신하지 않는다.
- 재기는 Windows x64의 Node.js v24.22.1에서 했다. 다른 운영체제와 런타임은 보지 않았다.
- 외부 자료를 읽지 않았다(실행 요청의 네트워크 조건). 그래서 PO1-B1의 조사를 하지 않았고 요건을 채웠다고 말하지 않는다.
- `quality` 종류의 규칙 본문은 PO의 규칙 종류가 아니어서 읽지 않았다.
- 호스트가 알려 준 모델과 effort를 적었고 그 밖의 세션 정보는 확인하지 않았다.
