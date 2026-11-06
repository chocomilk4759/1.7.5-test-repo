# dev-1.1 — Story 1.3 Dev 기록의 두 문장 정정

- Story: [tech-debt-3](../../stories/tech-debt/tech-debt-3.story.md)
- Entry: Dev SubTask 1.1
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story tech-debt-3 remote to Done` run의 역할 작업
- 시각: 2026-11-07, Story 시작 커밋 06:49:16 +0900, 회귀 점검(INT-001) 실행 06:52:33 +0900, 이 SubTask의 커밋 06:56:11 +0900(`git log`의 커밋 시각과 실행 출력에서 읽은 값)
- 입력 기준: 브랜치 `story/tech-debt-3-story-1-3-dev`, 시작 커밋 `2e86847`(`Approved -> InProgress`), 기준선 `main`의 `20256e4defbc36ab3d1e7cbce224a265e4121034`. 시작 커밋은 Story 파일과 `sm-`, `po-` 기록 문서만 더해서 `src/`와 `test/`는 기준선과 같다. 이 SubTask가 바꾸는 파일은 Story 파일과 이 기록 문서뿐이다.
- 환경: Node.js v24.22.1, Windows x64, Git 2.51.0, Git Bash의 `awk`와 `grep`. 포매터와 린터는 설정되어 있지 않다(`core-config.yaml`의 `testing.lintCommands`가 비어 있음).

## 읽은 규칙

`.bmad-core/tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`(Dev의 규칙 종류 `operations`, `design`, `documentation`). `comments`, `crap`, `javascript-crap`은 완료 점검(`develop-story.md` Completion 4.5)의 몫이어서 그때 읽는다.
- 절차 문서: `develop-story.md`, `local-story-start.md`, `local-task-done.md`, `local-story-review.md`, `data/development-quality.md`, `data/local-git-workflow.md`, `data/story-paths.md`, `data/defect-diagnosis.md`, `data/verification-ownership.md`, `data/workflow-routing.md`, `data/agent-context.md`, `data/domain-language.md`, `tasks/publish-story.md`, `tasks/architecture-align.md`, `tasks/execute-checklist.md`, `checklists/story-dod-checklist.md`, `checklists/comment-hygiene-checklist.md`, `templates/story-tmpl.yaml`을 끝까지 읽었다.
- 조사 요건: 프로젝트 밖 원문 조사는 사용자의 말(`*run-story tech-debt-3 remote to Done` 요청)로 이 호출에서 면제되었다. 이 SubTask에는 핵심 기술 결정이 없고 기록의 글을 저장소의 값으로 정정하는 일뿐이다. 이 면제는 `AGENTS.md`의 조사 요건을 채웠다는 뜻이 아니다.

## 접근과 시나리오

접근은 `verification-only`다(Story의 Task 1). 제품과 시험 지원의 동작을 더하거나 바꾸지 않고 기록의 글만 더하므로 RED가 없다. 그래서 `testing-tdd`의 RED, GREEN 순서를 기록하지 않고 시나리오의 실행 결과를 기록한다. 시나리오: tech-debt-3-INSP-001(automated), tech-debt-3-INSP-002(agent-review), tech-debt-3-INSP-003(agent-review), tech-debt-3-INSP-004(automated), tech-debt-3-INT-001(automated). 기록만 바꾸는 SubTask여서 Independent Cleaner review 없이 Dev 자신의 점검을 기록한다(`data/development-quality.md` 섹션 Independent Cleaner review).

실행 순서는 Story의 Recommended Execution Order를 따랐다. 값을 다시 낸 뒤(INSP-001) 정정 항목을 저장했고, 저장된 글을 읽었으며(INSP-002, INSP-003), 그 뒤에 경로와 해시(INSP-004)와 회귀(INT-001)를 돌렸다.

## tech-debt-3-INSP-001: 표 1과 표 2의 값을 다시 냄

`refs/archive/story/1.3`이 이 checkout에 있다(`git for-each-ref --contains e71238d`가 그 ref 하나를 냈다). 그래서 이 시나리오는 미완료 점검이 아니라 실행되었다. 비교하는 두 커밋: `e71238d`(`[story-1.3] DOCS: PO 재검증 2회 GO(SCREEN_WIDTH 48 수정)`), `6701dcd`(`[story-1.3] Story Status: InProgress -> Review`). 표 2의 셋째 개정 `8579e5a`는 `[story-1.3] DOCS: QA 라운드 2의 지적 분석과 결정 목록`이다.

### 표 1의 값

| 항목 | 명령 | 낸 값 | 표 1 |
| --- | --- | --- | --- |
| 줄 수 | `git diff --numstat e71238d 6701dcd -- docs/stories/1.3.story.md` | `29`, `4` (더한 줄 29, 지운 줄 4) | 같다 |
| 지운 줄 | 같은 `git diff`에서 `-`로 시작하는 줄 가운데 머리 줄 `--- a/...`를 뺌 | 넷. 첫 줄 `InProgress`, 나머지 셋은 `src/screen.js`의 `(새 파일)` 줄, `test/screen.test.js`의 `(새 파일)` 줄, "바꾸지 않음(기준 `40e1a6b`와 차이 없음을 `git diff`로 확인)"으로 시작하는 줄 | 같다 |
| 섹션 | 두 커밋의 Story를 `## ` 제목으로 나누어 줄마다 섹션 이름을 붙여 `diff`한 뒤 섹션별로 센 결과 | 11개 섹션 가운데 글이 다른 섹션은 Status, Change Log, Dev Agent Record 셋이고 다른 여덟 섹션은 같다. `e71238d` 쪽에서 달라진 줄은 Status 1, Dev Agent Record 3이고 `6701dcd` 쪽은 Status 1, Change Log 1, Dev Agent Record 27이다(지운 4, 더한 29로 줄 수와 맞는다) | 같다 |
| 지운 줄의 소제목 | 지운 세 줄이 있는 `###` 소제목을 찾음 | 세 줄 모두 Dev Agent Record의 `### File List` 아래다 | 같다 |
| 더한 줄 | `6701dcd`의 File List | 앞의 둘은 같은 경로에 "QA 수정 단위" 설명이 붙은 줄이고, 셋째는 "바뀌지 않음(기준 tip `d90c99e`와 차이 없음을 `git diff`로 확인)"으로 시작하는 줄이다 | 같다 |
| 기록 문서 | `git ls-tree --name-only e71238d docs/story-records/1.3/` | 11개: `dev-1.1.md`, `dev-2.1.md`, `dev-dod-1.md`, `dev-qa-r1.md`, `po-r1.md`, `po-r2.md`, `qa-done.md`, `qa-r1.md`, `qa-r2.md`, `sm-1.md`, `sm-2.md` | 같다 |
| 기록 문서의 변화 | `git diff --name-status e71238d 6701dcd -- docs/story-records/1.3` | 더한 문서(`A`) 다섯 `dev-3.1.md`, `dev-3.2.md`, `dev-3.3.md`, `dev-dod-2.md`, `dev-qa-r2.md`뿐이고 위 11개는 나오지 않는다. `6701dcd`의 기록 문서는 16개다 | 같다 |

섹션 비교의 명령은 다음과 같다. `A`는 줄마다 가장 가까운 앞 `## ` 제목을 붙이는 awk 프로그램이다.

```sh
S=docs/stories/1.3.story.md
A='/^## /{n=$0} {print n "\t" $0}'
diff <(git show e71238d:$S | awk "$A") <(git show 6701dcd:$S | awk "$A") \
  | grep -E '^[<>]' | awk -F'\t' '{print substr($1,1,1) " " substr($1,3)}' | sort | uniq -c
```

출력은 `3 < ## Dev Agent Record`, `1 < ## Status`, `1 > ## Change Log`, `27 > ## Dev Agent Record`, `1 > ## Status`다. 두 커밋의 Story는 모두 `## ` 제목이 11개다.

### 표 2의 값

재는 명령은 Story의 표 2와 같다. `{개정}`을 `8579e5a`, `6701dcd`, `6188a27`(`main`)로 바꾸어 세 번 돌렸다.

```sh
git show {개정}:docs/stories/1.3.story.md | awk '/^## Dev Notes/{on=1;next} /^## /{on=0} on' | grep -E '(^|[^0-9.])40($|[^0-9A-Za-z])'
```

| 개정 | 낸 줄 수 | 줄마다 40의 수 | 범위의 글을 `git hash-object --stdin`에 넣은 값 |
| --- | --- | --- | --- |
| `8579e5a` | 4 | 합계 4(줄마다 하나) | `c714acbdf17392b22bc35469ce018646fee87894` |
| `6701dcd` | 4 | 합계 4 | `c714acbdf17392b22bc35469ce018646fee87894` |
| `6188a27` | 4 | 합계 4 | `c714acbdf17392b22bc35469ce018646fee87894` |

세 개정에서 `## Dev Notes`부터 다음 `## ` 앞까지의 글이 같다(해시가 같다). 네 줄은 세 개정에서 같고, 줄마다 가장 가까운 앞 소제목과 40의 둘레 글은 다음과 같다.

| 표시 | 가장 가까운 소제목 | 40의 둘레 글 | 값의 뜻 | 표 2 |
| --- | --- | --- | --- | --- |
| P-1 | `### 폭 결정을 코드에 옮기는 일`의 1번 | "이 커밋 전의 트리에서는 규칙이 40이어서 1.3-INT-001이 판정하지 못한다" | `Story Base` 병합 커밋 전 트리의 규칙 값 | 같다 |
| P-2 | 같은 절의 2번 | "`src/screen.js must export SCREEN_WIDTH = 48, got 40`으로 종료 상태 1인 것이고" | 실패 메시지의 값 | 같다 |
| P-3 | `### Testing`의 "기준 tip에서 관찰한 사실" | "규칙은 `src/screen.js must export SCREEN_WIDTH = 48, got 40`으로 종료 상태 1이다" | 실패 메시지의 값 | 같다 |
| P-4 | Testing의 1.3-INT-001 행(소제목 "AC 밖의 의무와 고정하지 않는 입력") | "`Story Base` 병합 커밋 전 트리의 규칙 40으로 낸 결과도 증거가 아니다" | `Story Base` 병합 커밋 전 트리의 규칙 값 | 같다 |

계획이 요구하는 값 48: `ci/screen-rule.check.mjs`의 `const EXPECTED_WIDTH = 48;`와 `src/screen.js`의 `export const SCREEN_WIDTH = 48;`을 `grep`으로 읽어 확인했다.

### 표 3의 값

`git hash-object docs/story-records/1.3/dev-dod-2.md docs/story-records/1.3/dev-qa-r2.md`가 `18eb39bc4ecbc7956f3d164bd3990bf739551591`과 `058eb6c45a1ffafc2c3d8fc277777e9ab7a08d25`를 냈다. 표 3과 같다.

### 정정할 두 문장의 자리

`grep`으로 두 문장이 표가 말하는 자리에 그대로 있음을 읽었다. `dev-dod-2.md`의 섹션 "프로젝트 정책 점검"에 행 "현재 작업과 사실, 편집 이력은 지정된 기록에"가 있고 그 행이 "Story를 이 라운드 시작 전의 `e71238d`와 섹션별로 비교해 바뀐 섹션이 Change Log와 Dev Agent Record뿐이고 지운 줄이 없음을 확인했다. Status는 Review 전환에서 바꾼다"를 적는다. `dev-qa-r2.md`의 섹션 "REQ-002 Story의 수용된 결정과 계획의 글이 사용자의 결정과 어긋난다"에 `확인`이 있고 그 안에 "현재 계획의 글(Dev Notes, Testing, 표)에는 40이 없다"가 있다.

### 결과

표 1, 표 2, 표 3의 값이 모두 낸 값과 같았다. 표의 값을 옮겨 적지 않았고 실제 출력과 맞춘 것이다. 시나리오 tech-debt-3-INSP-001은 통과다. 잰 범위: Story 1.3의 위 세 개정과 `main` 6188a27에서 위 명령이 보는 글이다.

## 정정 항목의 저장

Story의 Dev Agent Record, Completion Notes List에 정정 항목을 하나 더했다. 항목은 SubTask 1.1의 줄과 따로 있고, 그 섹션을 끝내는 처리 줄과 `DoD:` 줄이 놓일 자리 위에 있으며, 이 기록 문서를 링크한다. 두 문장을 한 항목에서 정정하고 앞선 기록 두 파일은 고쳐 쓰지 않는다.

## tech-debt-3-INSP-002: 첫째 문장의 정정 항목 읽기

저장된 항목을 파일에서 다시 읽어 Story의 "판정 방법" 첫째 문장 기준에 대었다.

| 받는 글의 요소 | 저장된 항목의 글 | 결과 |
| --- | --- | --- |
| 표 1의 자리 | `docs/story-records/1.3/dev-dod-2.md`의 섹션 "프로젝트 정책 점검", 행 "현재 작업과 사실, 편집 이력은 지정된 기록에" | 충족 |
| 표 1의 정정할 글 | "Story를 이 라운드 시작 전의 `e71238d`와 섹션별로 비교해 바뀐 섹션이 Change Log와 Dev Agent Record뿐이고 지운 줄이 없음을 확인했다." 틀린 곳은 "지운 줄이 없음"이라고 적음 | 충족 |
| 지운 줄이 넷이며 Status의 `InProgress`와 File List의 세 줄 | "지운 줄은 넷이다", "하나는 Status의 `InProgress`이고 셋은 File List의 줄이다", 세 줄을 모두 듦(`src/screen.js` 줄, `test/screen.test.js` 줄, "바꾸지 않음(기준 `40e1a6b`...)"으로 시작하는 줄) | 충족 |
| Status 줄은 그 행이 따로 말한 곳 | "그 행이 다음 문장 'Status는 Review 전환에서 바꾼다'로 따로 말한 곳이어서 어긋남이 아니다" | 충족 |
| "앞선 기록을 고쳐 쓰지 않았다"가 기록 문서 11개에는 맞고 Story에서는 그 넷을 뺀 범위에서 맞음 | "기록 문서 11개가 ... 하나도 바뀌지 않았고", "Story에서는 위 넷(Status의 한 줄과 File List의 세 줄)을 뺀 범위에서 참이다" | 충족 |

| 거부하는 글 | 저장된 항목에서 찾은 것 | 결과 |
| --- | --- | --- |
| "지운 줄이 없다"를 그대로 두거나 값 없이 적는 글 | 지운 줄이 없다는 말을 두지 않았다. 문장은 틀린 곳으로만 인용했고 값(넷, 29와 4)을 적었다 | 해당 없음 |
| File List의 세 줄 가운데 일부만 드는 글 | 세 줄을 모두 들었다 | 해당 없음 |
| 지운 줄을 File List의 셋뿐이라고 적는 글 | 넷(Status 하나, File List 셋)이라고 적었다 | 해당 없음 |
| Status 줄을 위반으로 적는 글 | 어긋남이 아니라고 적었다 | 해당 없음 |
| 범위 없이 다시 말하는 글 | 참인 범위(기록 문서 11개, Story에서 위 넷을 뺀 범위)를 함께 적었다 | 해당 없음 |
| `dev-dod-2.md` 자체를 고쳤다고 적는 글 | 고쳐 쓰지 않고 항목에서 정정한다고 적었다. 해시가 표 3과 같다 | 해당 없음 |

저장된 항목의 값(넷, 29와 4, 기록 문서 11개와 5개)은 위 INSP-001의 실행 값과 같다. 줄 번호로 자리를 적은 곳이 없다. 시나리오 tech-debt-3-INSP-002는 통과다.

## tech-debt-3-INSP-003: 둘째 문장의 정정 항목 읽기

| 받는 글의 요소 | 저장된 항목의 글 | 결과 |
| --- | --- | --- |
| 표 2의 자리 | `docs/story-records/1.3/dev-qa-r2.md`의 섹션 "REQ-002 Story의 수용된 결정과 계획의 글이 사용자의 결정과 어긋난다"의 `확인` | 충족 |
| 표 2의 정정할 글 | "현재 계획의 글(Dev Notes, Testing, 표)에는 40이 없다" | 충족 |
| 잰 범위 안의 40이 P-1 ~ P-4의 네 곳, 자리와 함께 | 범위 `## Dev Notes`부터 다음 `## ` 앞까지, 네 곳을 P-1 ~ P-4로 자리와 글을 들어 적음 | 충족 |
| 옛 규칙의 값(P-1, P-4)이거나 실패 메시지의 값(P-2, P-3) | P-1과 P-4는 병합 커밋 전 트리의 옛 규칙의 값, P-2와 P-3은 실패 메시지의 값이라고 적음 | 충족 |
| 계획이 요구하는 값은 48 | "계획이 요구하는 값은 48이다" 그리고 `EXPECTED_WIDTH`와 `SCREEN_WIDTH`가 48이라고 적음 | 충족 |

| 거부하는 글 | 저장된 항목에서 찾은 것 | 결과 |
| --- | --- | --- |
| 네 곳 가운데 일부만 들거나 다섯 곳 이상을 드는 글 | 정확히 네 곳이다 | 해당 없음 |
| 잰 범위 없이 "Story에 40이 네 곳"이라고 적는 글 | 잰 범위와 재지 않은 섹션(Scope and Dependencies, SM Draft Checklist, PO Validation, QA Results)을 적었다 | 해당 없음 |
| 그 40을 계획이 요구하는 값으로 읽는 글 | 네 곳의 40은 요구하는 값이 아니라고 적었다 | 해당 없음 |
| 네 곳을 고쳐야 한다고 적는 글 | 고쳐야 한다는 말이 없다 | 해당 없음 |
| 48을 말하지 않는 글 | 48을 적었다 | 해당 없음 |

저장된 항목의 값(네 곳, 세 개정에서 같음)은 위 INSP-001의 실행 값과 같다. 줄 번호로 자리를 적은 곳이 없다. 시나리오 tech-debt-3-INSP-003은 통과다.

두 기준에 공통으로, 항목은 앞선 기록을 고쳐 쓰지 않고 이 항목에서 정정한다고 적는다(첫 문장). 항목의 자리는 SubTask 1.1의 줄과 따로 Completion Notes이고, 이 기록 문서를 링크한다. 아래 INSP-004의 결과가 이 말과 같다.

## tech-debt-3-INSP-004: 바뀐 경로와 앞선 기록의 해시

`{기준}`은 Story 시작의 기준선 HEAD `20256e4`, `{시작}`은 시작 커밋 `2e86847`(`[story-tech-debt-3] Story Status: Approved -> InProgress`)이다. 정정 항목과 이 기록 문서를 저장한 뒤, 커밋하기 전에 돌렸다.

| 명령 | 낸 값 | 받는 경우 |
| --- | --- | --- |
| `git diff --name-only 20256e4` | `docs/stories/tech-debt/tech-debt-3.story.md`, `docs/story-records/tech-debt-3/po-r1.md`, `po-r2.md`, `sm-1.md`, `sm-2.md` (다섯 경로) | 모두 Dev Notes "파일 위치"의 "바꾸는 경로" 행의 경로(Story 파일, `sm-`과 `po-` 문서)다 |
| `git status --porcelain` | ` M docs/stories/tech-debt/tech-debt-3.story.md`, `?? docs/story-records/tech-debt-3/dev-1.1.md` | 둘 다 그 행의 경로(Story 파일, `dev-` 문서)다 |
| `git diff --name-only --no-renames --diff-filter=MD 2e86847 -- docs/story-records/tech-debt-3/` | 출력 없음, 종료 상태 0 | 시작 커밋 뒤에 `sm-`, `po-` 문서가 고쳐지거나 지워지지 않았다 |
| `git hash-object docs/story-records/1.3/dev-dod-2.md docs/story-records/1.3/dev-qa-r2.md` | `18eb39bc4ecbc7956f3d164bd3990bf739551591`, `058eb6c45a1ffafc2c3d8fc277777e9ab7a08d25` | 표 3과 같다 |
| `git diff --name-only 20256e4 -- docs/story-records/1.3 docs/stories/1.3.story.md docs/qa src test ci .github package.json README.md docs/prd.md docs/architecture.md docs/planning` | 출력 없음 | 그 행에 없는 경로가 나오지 않는다. `docs/story-records/1.3/`에 새 파일이 없고 `src/`, `test/`가 그대로다 |

기준선과 비교해 바뀐 경로가 모두 "바꾸는 경로" 행에 있고 표 3의 해시가 같아 시나리오 tech-debt-3-INSP-004는 통과다. 잰 범위는 Git이 보는 경로다. 이 checkout의 `.git/info/exclude`에 있는 `.bmad-core/`, `docs/conventions/` 같은 경로는 `git diff`와 `git status`에 나오지 않고 이 시나리오가 재지 않는다(Story의 `coverage_gaps`). 위 정정 항목의 "앞선 기록을 고쳐 쓰지 않고"는 이 결과와 같다.

## tech-debt-3-INT-001: 회귀 기준

| 명령 | 낸 값 |
| --- | --- |
| 프로젝트 루트의 `node --test` | 종료 상태 0. `tests 76`, `pass 76`, `fail 0`, `cancelled 0`, `skipped 0`, `todo 0` |
| `node ci/screen-rule.check.mjs` | 종료 상태 0, 출력 없음 |

시작 커밋 전에 돌린 기준 통과와 같은 값이다(76개 통과, 종료 상태 0). 이 SubTask는 코드와 시험을 바꾸지 않아 두 결과는 같을 것으로 보였고, 같았다. 실행 시각은 06:52 +0900, 코드 상태는 HEAD `2e86847`에 정정 항목을 저장한 작업 트리다. 시나리오 tech-debt-3-INT-001은 통과다. 이 점검은 정정 글의 참을 가리지 못한다. 그 판정은 INSP-001 ~ INSP-003이 한다.

## Dev 자신의 점검

이 SubTask는 기록만 바꾸므로 Independent Cleaner review를 시작하지 않았다(`data/development-quality.md`: 기록만 바꾸거나 증거를 모으는 SubTask는 Dev 자신의 점검을 기록한다). Dev가 바뀐 글에 대어 본 것은 다음과 같다. 바뀐 파일은 Story 파일(정정 항목, Debug Log References, Completion Notes의 SubTask 줄, 체크박스, Change Log)과 이 기록 문서다.

| 점검 | 방법과 결과 |
| --- | --- |
| 글이 값에 기댐(CL-GLD-OPS-005, CC-DOC-009) | 정정 항목의 모든 값은 INSP-001에서 낸 출력과 대었다. 값마다 잰 방법과 범위가 항목에 있다. 표의 값을 옮겨 적은 곳이 없다 |
| 중복(CC-DOC-010) | 항목은 Story에 두 문장의 정정, 값, 잰 범위를 두고 이 기록은 명령과 출력, 읽기의 대조를 둔다. 같은 값이 두 곳에 있는 것은 Story가 정정의 본문을 inline으로 가져야 하기 때문이다 |
| 줄 번호와 임시 경로 | 항목과 이 기록에 줄 번호로 쓴 자리가 없다(자리는 파일, 섹션, 행 이름, 시나리오 표시로 적음). 프로젝트 임시 영역의 폴더 이름을 `grep`으로 찾은 결과 두 파일 모두 0이다 |
| 언어와 보이지 않는 글자(CC-DOC-002, CC-DOC-013) | 새 글은 한국어이고 코드, 경로, 명령, 인용은 원문이다. 두 파일에서 `U+00A0`, 너비 없는 글자, 방향 제어, 한글 채움 글자 등을 PCRE로 찾았고 일치가 없다. 스테이징 뒤 `check-staged.sh`가 한 번 더 본다 |
| 앞선 기록을 고쳐 쓰지 않음(CC-DOC-004) | Story 1.3의 파일과 기록 문서는 바꾸지 않았다. 해시와 `git diff`가 INSP-004에서 같았다. 이 Story의 `sm-`, `po-` 기록도 시작 뒤 고치지 않았다 |
| 구조(CC-DOC-012) | 제목, 표, 목록을 쓰고 빈 줄로 나누었다. 인용 글은 따옴표로 구분했다 |

정정한 기록: Story 시작 때 적은 시작 시각 "06:50"은 시작 커밋 `2e86847`의 시각 06:49:16보다 늦어 맞지 않았다. 이 SubTask의 커밋에서 Completion Notes의 시작 줄을 "06:49 +0900(시작 커밋 `2e86847`의 시각 06:49:16)"로 고쳤다. 시작 커밋에 저장된 앞선 글은 그 커밋에 남아 있다.

## 주석 위생과 그 밖의 규칙

- 주석 위생(`checklists/comment-hygiene-checklist.md`): 비교의 기준은 Story 시작의 기준선 HEAD `20256e4`이고 대상은 `src/`와 `test/`의 바뀐 줄인데 바뀐 줄이 없다(`git diff --name-only 20256e4 -- src test` 출력 없음). §3의 후보 검색을 돌릴 파일 집합이 비어 있다. `git grep -n IN-FLIGHT -- src test`에 일치가 없다(종료 상태 1). Story의 장부는 `[]`이다. 이 SubTask에서 새 주석과 머리글을 쓰지 않았다.
- CRAP: 코드를 바꾸지 않아 측정 대상이 없다. `quality.crap.commands`도 비어 있고 새 제안은 없다.
- 실행 비용: 실행되는 코드를 바꾸지 않아 닿는 규칙이 없다. 성능 측정을 하지 않았다.
- 버전: `package.json`의 `version`을 바꾸지 않았다.
- 테스트 대역과 새 의존성: 없다.

## 한계

- 정정이 Story 1.3의 파일에 없다. `dev-dod-2.md`와 `dev-qa-r2.md`만 읽는 사람은 그 두 문장에서 정정으로 가는 링크를 보지 못한다. 길잡이는 `docs/planning/future-work.md`의 `Closed items` 줄과 Git 이력이다(SM의 N-1, PO의 PO1-N1). 병합된 Story의 파일과 기록을 Dev가 고치지 않는 규칙에서 오는 결과이고, 병합 뒤 점검이 읽는다. 이 SubTask가 정하지 않았다.
- INSP-002와 INSP-003은 agent-review다. 정정 글의 참과 잰 범위는 프로그램이 가리지 못하고 위 대조표를 만든 이 Dev의 읽기가 판정했다. QA가 따로 읽는다.
- 표 2의 40 검색은 `## Dev Notes`부터 다음 `## ` 앞까지만 잰다. Scope and Dependencies, SM Draft Checklist, PO Validation, QA Results는 재지 않았다.
- INSP-004의 잰 범위는 Git이 보는 경로다.
- `refs/archive/story/1.3`은 이 checkout에서 읽었다. 원격에 이 ref가 있는지는 보지 않았다.
- 재기는 Windows x64의 Node.js v24.22.1, Git 2.51.0에서만 했다. effort의 이름(`xhigh`)과 이 세션이 받은 값의 대응은 확인하지 못했다.
- 두 문장 말고 Story 1.3 기록의 다른 문장은 다시 판정하지 않았다.
