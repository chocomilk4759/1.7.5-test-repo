# qa-r1 — Story 1.3 Dev 기록의 두 문장 정정

- Story: [tech-debt-3](../../stories/tech-debt/tech-debt-3.story.md)
- Entry: QA review round 1
- Reviewer and time: Quinn(QA 하위 세션, 모델 `claude-opus-5-5`, effort `max`는 실행 계획의 값이고 이 세션이 따로 확인하지 못했다), `*run-story tech-debt-3 remote to Done` run의 역할 작업. 구현을 쓰지 않은 검토자의 실제 LLM 검토이고 추가 검토자는 없다. 2026-11-07, 회귀 점검 07:06 +0900, 후보 검색 07:25 +0900, 기록 저장 07:28 +0900
- Reviewed inputs: 브랜치 `story/tech-debt-3-story-1-3-dev`, 기준 브랜치 `main`, 기준선 `20256e4`, HEAD `a676f8e`, 커밋하지 않은 변경 없음(`git status --porcelain` 출력 없음). 바뀐 경로는 Story 파일과 이 Story의 기록 문서 일곱이고 제품과 시험의 변경이 없다. Story 파일의 blob은 쓰기 직전에 `7e25c4f50143`이었다

## 읽은 입력과 규칙

- Story 파일 전체, 기록 문서 `dev-1.1`, `dev-2.1`, `dev-dod-1` 전체. `sm-`, `po-` 문서는 Story의 항목을 읽었고 기록 문서에서는 서수와 `CC-DOC-009`를 찾은 줄만 읽었다. 앞선 SM과 PO의 결과는 판정의 근거가 아니라 입력으로 읽었다.
- 대조한 원천: 커밋 6188a27의 메시지와 `docs/planning/future-work.md` 항목 "[Tech-Debt] Story 1.3 Dev 기록의 두 문장", 커밋 20256e4의 메시지, `docs/story-records/1.3/dev-dod-2.md`의 섹션 "프로젝트 정책 점검", `docs/story-records/1.3/dev-qa-r2.md`의 REQ-002 절, `docs/story-records/1.3/dev-qa-r3.md`의 DOC-001 절, `docs/story-records/1.3/qa-r3.md`의 섹션 "분류의 근거: DOC-001", `docs/qa/gates/1.3.yml`의 DOC-001, `docs/stories/1.3.story.md`의 네 개정.
- 설계와 코드: `docs/architecture.md`, `README.md`, `docs/planning/decisions.md`, `package.json`, `.github/workflows/ci.yml` 전체, `docs/planning/future-work.md`의 해당 항목. `src/`와 `test/`는 바뀌지 않아 본문을 읽지 않았고 파일 목록과 후보 검색, 상수 두 줄만 보았다.
- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`. `check-instructions.sh` 종료 상태 0.
- 끝까지 읽은 본문(QA의 규칙 종류 `operations`, `design`, `quality`, `documentation`): `golden-rules`, `coding-principles`, `comments`, `documentation`, `testing-tdd`, `crap`, `javascript-language`, `javascript-crap`.
- 끝까지 읽은 절차: `agents/qa.md`, `project-map.md`, `core-config.yaml`, `tasks/load-project-rules.md`, `tasks/review-story.md`, `tasks/qa-gate.md`, `tasks/trace-requirements.md`, `tasks/nfr-assess.md`, `tasks/architecture-align.md`, `tasks/develop-story.md`, `tasks/local-task-done.md`, `tasks/local-story-review.md`, `tasks/local-story-done.md`, `tasks/code-comment-style.md`, `tasks/in-flight-comment-lifecycle.md`, `templates/qa-gate-tmpl.yaml`, `checklists/comment-hygiene-checklist.md`, `checklists/story-dod-checklist.md`, `data/agent-context.md`, `data/story-paths.md`, `data/finding-classification.md`, `data/verification-ownership.md`, `data/development-quality.md`, `data/local-git-workflow.md`, `data/workflow-routing.md`, `data/future-work-planning.md`, `data/domain-language.md`, `utils/checks/gate-rules.awk`, `utils/checks/story-rules.awk`, `utils/checks/check-gate.sh`, `utils/checks/check-stage.sh`, `utils/checks/owned-rules.awk`.
- 일부만 읽은 파일: `tasks/run-story.md`(섹션 Rounds, Checks after each task, Stop, hold and carry on의 앞부분), `tasks/apply-qa-fixes.md`(처리 줄의 부분), `templates/story-tmpl.yaml`(Dev Agent Record, QA Results), `utils/checks/lib.sh`, `utils/checks/check-owned.sh`(`role_owns`), `utils/checks/record-rules.awk`(앞부분).
- 앞선 gate와 QA Results(`docs/qa/gates/bug-2.yml`, Story bug-2)는 꼴의 참고로만 보았다.
- 프로젝트 밖 원문 조사: 사용자의 말로 이 호출에서 면제되었고 이 회차는 프로젝트 밖 자료를 읽지 않았다. 이 면제는 `AGENTS.md`의 조사 요건을 채운 것이 아니며 이 리뷰에 핵심 기술 결정이 없다.

## Spec Review

### AC 대조

| AC | 관찰과 근거 | 판정 |
| --- | --- | --- |
| AC 1 | 표 1의 값을 이 회차에 다시 냈고 같다(아래 INSP-001). 저장된 항목이 "판정 방법"의 첫째 문장 기준을 채운다(아래 INSP-002) | 충족 |
| AC 2 | 표 2의 값을 세 개정에서 다시 냈고 같다. 저장된 항목이 둘째 문장 기준을 채운다(아래 INSP-003). 재지 않은 곳의 목록의 틈은 DOC-004이고 AC의 기준이 아니다 | 충족 |
| AC 3 | 기준선과 비교해 바뀐 여덟 경로가 모두 "바꾸는 경로" 행에 있고 표 3의 해시가 같다(아래 INSP-004). 잰 범위는 Git이 보는 경로다 | 충족 |

회귀 기준(tech-debt-3-INT-001)과 Architecture 정렬(tech-debt-3-INSP-005)도 충족한다.

### 시나리오와 증거의 대응

전체 6개를 이 회차에 직접 실행하거나 읽었다. 합계와 소계가 Testing의 실행 맵과 같다(inspection 5, integration 1, P1 2, P2 3, P3 1, automated 3, agent-review 3, user-only 0). 범위 분류는 `tasks/trace-requirements.md`대로 AC 1 ~ 3 모두 `full`이고 실행 결과는 모두 통과다.

| ID | 수준과 모드 | 방법 | 요건 | 결과 |
| --- | --- | --- | --- | --- |
| tech-debt-3-INSP-001 | inspection, automated | 아래 명령과 출력 | AC 1, AC 2의 값 | 통과 |
| tech-debt-3-INSP-002 | inspection, agent-review | 저장된 항목을 표 1과 판정 방법에 하나씩 댐 | AC 1의 글 | 통과 |
| tech-debt-3-INSP-003 | inspection, agent-review | 저장된 항목을 표 2와 판정 방법에 하나씩 댐 | AC 2의 글 | 통과 |
| tech-debt-3-INSP-004 | inspection, automated | 아래 명령과 출력 | AC 3 | 통과 |
| tech-debt-3-INT-001 | integration, automated | 프로젝트 루트의 `node --test`, `node ci/screen-rule.check.mjs` | 회귀 기준 | 76개 통과, 종료 상태 0 |
| tech-debt-3-INSP-005 | inspection, agent-review | 누적 변경을 설계 문서와 대조 | Architecture 정렬 | 통과 |

조건으로 적으면 다음과 같다. 주어진 상태는 HEAD `a676f8e`와 `refs/archive/story/1.3`이 있는 이 checkout이고, 위 명령을 돌리거나 저장된 글을 읽을 때, 값이 표와 같고 글이 받는 글의 요소를 채우며 거부하는 글에 들지 않으면 통과다.

### tech-debt-3-INSP-001의 실행

`refs/archive/story/1.3`이 이 checkout에 있어(`git for-each-ref --contains`가 `e71238d`, `6701dcd`, `8579e5a` 각각에 그 ref 하나를 낸다) 미완료 점검이 아니다. 세 커밋은 `main`의 조상이 아니다(`git merge-base --is-ancestor` 종료 상태 1).

| 값 | 명령 | 출력 | 표 |
| --- | --- | --- | --- |
| 줄 수 | `git diff --numstat e71238d 6701dcd -- docs/stories/1.3.story.md` | 29, 4 | 같다 |
| 지운 줄 | 같은 `git diff`에서 머리 줄을 뺀 `-` 줄 | `InProgress`, `src/screen.js` (새 파일), `test/screen.test.js` (새 파일), 기준 `40e1a6b`의 바꾸지 않음 줄. 뒤의 셋은 `### File List` 아래다 | 같다 |
| 대신한 줄 | 같은 `git diff`의 `+` 줄 | 같은 경로에 "QA 수정 단위" 설명이 붙은 두 줄, "바뀌지 않음(기준 tip `d90c99e`와 차이 없음을 `git diff`로 확인)"으로 시작하는 줄 | 같다 |
| 섹션 | `## ` 제목을 줄마다 붙여 `diff`하고 셈 | 왼쪽 Dev Agent Record 3, Status 1, 오른쪽 Change Log 1, Dev Agent Record 27, Status 1. 두 커밋 모두 제목 11개이고 나머지 여덟 섹션은 같다 | 같다 |
| 기록 문서 | `git ls-tree --name-only e71238d docs/story-records/1.3/` | 11개 | 같다 |
| 기록 문서의 변화 | `git diff --name-status e71238d 6701dcd -- docs/story-records/1.3` | A 다섯(`dev-3.1.md`, `dev-3.2.md`, `dev-3.3.md`, `dev-dod-2.md`, `dev-qa-r2.md`)뿐. 11개는 나오지 않는다 | 같다 |
| 값 40 | Story의 표 2의 명령, `8579e5a`, `6701dcd`, `6188a27` | 셋 모두 네 줄, 줄마다 하나 | 같다 |
| 범위의 같음 | 범위의 글을 `git hash-object --stdin`에 넣음 | 셋 모두 `c714acbdf17392b22bc35469ce018646fee87894`. Story 1.3 파일은 6188a27과 HEAD가 같다 | 같다 |
| 네 곳의 자리 | 줄마다 가장 가까운 앞 제목 | `### 폭 결정을 코드에 옮기는 일` 둘, `### Testing` 하나, `###### AC 밖의 의무와 고정하지 않는 입력` 아래 1.3-INT-001 행 하나 | P-1 ~ P-4와 같다 |
| 48 | `ci/screen-rule.check.mjs`, `src/screen.js` | `const EXPECTED_WIDTH = 48;`, `export const SCREEN_WIDTH = 48;` | 같다 |

다른 엔진으로 다시 셌다. 이 재계산은 Dev의 방법을 되풀이하지 않으려는 적대적 점검이다.

- 지운 줄: `e71238d`의 Story 줄의 다중집합에서 `6701dcd`의 줄을 Node.js로 빼면 넷이 남고 글이 표의 넷과 같다. `--diff-algorithm`을 default, minimal, patience, histogram으로 바꿔도 numstat은 29와 4다. 비교 도구의 선택에 기대지 않는 값이다.
- 값 40: 앞에 숫자와 점이 없고 뒤에 숫자와 영문자가 없는 40을 Node.js 정규식으로 `## Dev Notes`부터 다음 `## ` 앞까지 세면 `8579e5a`, `6701dcd`, `6188a27`, HEAD에서 네 곳, 네 줄이다. 범위 안의 토큰 가운데 40을 담은 것은 네 곳과 커밋 이름 `40e1a6b` 둘뿐이다.
- 패턴의 민감도: 표본을 표 2의 패턴에 넣으면 `40e1a6b`, `140자`, `400`, `4.40`, `v0.40`은 들지 않고 `40`, `got 40`, `폭 40,`, 시각 `21:40`은 든다. 잰 범위에 시각이 없어 수에 섞이지 않았다.

### tech-debt-3-INSP-002의 읽기

저장된 항목(Completion Notes의 "정정(Story 1.3 Dev 기록의 두 문장, 단위 1.1)"의 첫째 문장 부분)을 표 1과 판정 방법에 댔다.

| 받는 글 | 저장된 글 | 결과 |
| --- | --- | --- |
| 표 1의 자리 | `docs/story-records/1.3/dev-dod-2.md`의 섹션 "프로젝트 정책 점검", 행 "현재 작업과 사실, 편집 이력은 지정된 기록에" | 충족. 원문의 행과 같다 |
| 정정할 글 | "Story를 이 라운드 시작 전의 `e71238d`와 섹션별로 비교해 바뀐 섹션이 Change Log와 Dev Agent Record뿐이고 지운 줄이 없음을 확인했다." | 충족. 원문과 글자대로 같다 |
| 지운 줄 넷 | "지운 줄은 넷이다", "하나는 Status의 `InProgress`이고 셋은 File List의 줄이다"와 세 줄 | 충족 |
| Status 줄의 처리 | "그 행이 다음 문장 "Status는 Review 전환에서 바꾼다"로 따로 말한 곳이어서 어긋남이 아니다" | 충족 |
| 참인 범위 | 기록 문서 11개가 하나도 바뀌지 않았고, "Story에서는 위 넷(Status의 한 줄과 File List의 세 줄)을 뺀 범위에서 참이다" | 충족 |

거부하는 글(지운 줄이 없다를 둠, 값 없이 적음, 세 줄의 일부만 듦, File List의 셋뿐이라고 적음, Status 줄을 위반으로 적음, 범위 없이 다시 말함, `dev-dod-2.md`를 고쳤다고 적음)에 드는 곳이 없다. 값이 위 실행과 같다. 통과.

### tech-debt-3-INSP-003의 읽기

저장된 항목의 둘째 문장 부분을 표 2와 판정 방법에 댔다.

| 받는 글 | 저장된 글 | 결과 |
| --- | --- | --- |
| 표 2의 자리와 글 | `docs/story-records/1.3/dev-qa-r2.md`의 REQ-002 절의 `확인`, "현재 계획의 글(Dev Notes, Testing, 표)에는 40이 없다" | 충족. 원문과 같다 |
| 잰 범위 | `## Dev Notes`부터 다음 `## ` 앞까지, Testing과 그 표가 그 안에 있음, 패턴의 말 | 충족 |
| 네 곳과 자리 | P-1 ~ P-4를 자리와 글로 듦. 네 인용이 6188a27의 글과 같다 | 충족 |
| 값의 뜻 | P-1, P-4 옛 규칙의 값, P-2, P-3 실패 메시지의 값 | 충족 |
| 48 | "계획이 요구하는 값은 48이다"와 두 상수 | 충족 |

거부하는 글(네 곳의 일부나 다섯 곳 이상, 범위 없이 네 곳, 그 40을 요구하는 값으로 읽음, 네 곳을 고쳐야 한다고 적음, 48을 말하지 않음)에 드는 곳이 없다. 통과.

두 기준에 공통: 항목이 Completion Notes에 SubTask 1.1의 줄과 따로 있고 `DoD:` 줄 위에 있으며 `dev-1.1`을 링크한다. 처리 줄은 아직 없다. "앞선 기록 ... 고쳐 쓰지 않고 이 항목에서 정정한다"가 아래 INSP-004의 결과와 같다. 줄 번호로 쓴 자리가 없다.

### tech-debt-3-INSP-004의 실행

`{기준}`은 `20256e4`, `{시작}`은 `2e86847`이다.

| 명령 | 출력 | 판정 |
| --- | --- | --- |
| `git diff --name-only 20256e4` | Story 파일과 `docs/story-records/tech-debt-3/`의 `dev-1.1.md`, `dev-2.1.md`, `dev-dod-1.md`, `po-r1.md`, `po-r2.md`, `sm-1.md`, `sm-2.md` | 모두 "바꾸는 경로" 행에 있다 |
| `git status --porcelain` | 출력 없음(QA의 쓰기 전) | 받음 |
| `git diff --name-only --no-renames --diff-filter=MD 2e86847 -- docs/story-records/tech-debt-3/` | 출력 없음 | `sm-`, `po-` 문서가 고쳐지거나 지워지지 않았다 |
| `git hash-object docs/story-records/1.3/dev-dod-2.md docs/story-records/1.3/dev-qa-r2.md` | `18eb39bc4ecbc7956f3d164bd3990bf739551591`, `058eb6c45a1ffafc2c3d8fc277777e9ab7a08d25` | 표 3과 같고 6188a27, HEAD의 blob도 같다 |
| `git diff --name-only 20256e4 -- docs/story-records/1.3 docs/stories/1.3.story.md docs/qa src test ci .github package.json README.md docs/prd.md docs/architecture.md docs/planning` | 출력 없음 | 그 행 밖의 경로가 없다 |

기록 폴더의 파일은 `sm-`, `po-`, `dev-` 문서뿐이다. 잰 범위는 Git이 보는 경로다. 보조로 `.bmad-core`, `AGENTS.md`, `Installer.md`, `RELEASE-NOTES.md`, `docs/conventions`, `.claude`, `.agents`, `.codex`에서 run 시작 05:31 뒤에 바뀐 파일을 수정 시각으로 찾았고 없었다. 수정 시각은 증명이 아니므로 `coverage_gaps`의 틈은 그대로다.

### tech-debt-3-INT-001의 실행

프로젝트 루트, HEAD `a676f8e`, Node.js v24.22.1, Windows x64, Git 2.51.0, 07:06 +0900. `node --test`: tests 76, pass 76, fail 0, cancelled 0, skipped 0, todo 0, 종료 상태 0. `node ci/screen-rule.check.mjs`: 종료 상태 0, 출력 없음. 둘은 `.github/workflows/ci.yml`의 job `test`의 두 단계와 같은 명령이다. 이 점검은 정정 글의 참을 가리지 못한다.

### tech-debt-3-INSP-005의 읽기

누적 변경은 `docs/` 아래의 Story 파일과 기록 문서뿐이다. `docs/architecture.md`의 기술 구성(ES 모듈, Node.js 24, 내장 모듈, `node --test`), 소스 트리(`git ls-files src test`가 표의 네 경로와 `test/{모듈}.test.js` 넷), 설계 원칙 다섯, `README.md`, 결정 D-1, D-2에 닿는 변경이 없어 `dev-2.1`의 항목별 결과와 no-change 결론이 맞다. 문서를 고쳐 위반을 덮은 일이 없다. `docs/architecture.md`에 Change Log 절이 없고 마지막 절이 검토 기록이라는 글도 맞다. 통과. 그 글의 출처 표현의 틈은 DOC-003이다.

### 앞선 항목과 수용 입력의 확인

- 원천 항목의 글: Story의 인용이 커밋 6188a27의 항목과 같다. 커밋 20256e4가 항목을 지우고 `Closed items` 줄을 남겼다.
- 수용된 결정: 사용자의 답과 실행 요청의 글이 커밋 6188a27의 메시지와 지시 입력의 글과 같다.
- 선행 Story: `check-merge.sh status 1.3 main`이 merged 937f21c5a4d5cc5623f90caefa08dd3e137d89f5를 낸다.
- Dev Notes의 수: 6188a27의 future-work 파일에 `Planning: unplanned` 44개, `Planning: undecided` 1개, `Plan:` 1개다.
- 넘겨받은 질문: 없다. PO1-N1은 PO Validation에 그대로 있고 병합 뒤 점검이 옮긴다. N-2, N-3은 PO가 지적이 아니라고 판정했고 이 회차도 다르게 볼 근거를 찾지 못했다.

### 위험 평가

방법: Story의 Risk Coverage와 범위, 실제 변경, 이 회차의 실행을 대어 찾았다. 별도 문서는 없다. 수는 critical 0, high 0, medium 0, low 7이다.

| 위험 | 통제와 근거 | 남은 것 |
| --- | --- | --- |
| 정정 글이 저장소의 값과 다름 | INSP-001 ~ 003 통과, 다른 엔진의 재계산 | 없음 |
| 정정 글이 잰 범위 밖까지 말함 | INSP-002, 003 통과 | DOC-004 |
| 앞선 기록이나 Story 1.3의 파일을 고침 | INSP-004 통과 | 없음 |
| 시작 커밋이 더한 `sm-`, `po-` 문서를 고침 | INSP-004 통과 | 없음 |
| 코드나 시험이 바뀜 | INSP-004, INT-001 통과 | 없음 |
| 정정이 Story 1.3의 파일에 없어 그 기록만 읽는 사람에게 닿지 않음 | PO1-N1, `coverage_gaps` | 병합 뒤 점검 |
| 비교한 커밋이 이 checkout의 archive ref에만 닿음 | 값이 Story와 `dev-1.1`에 있다 | 원격의 ref는 보지 않았다 |

### 한계

- 지시대로 원격을 읽지 않아 이슈 #24와 원격의 archive ref를 확인하지 못했다. 이슈의 번호는 시작 기록과 이어가기 로그의 값이다. 이 Story의 필수 점검이 아니다.
- `dev-1.1`의 INT-001 실행 시각 06:52:33은 다시 잴 수 없다. 시작 커밋 06:49:16과 SubTask 커밋 06:56:11 사이여서 커밋 순서와 모순이 없다.
- 재기는 Windows x64의 Node.js v24.22.1, Git 2.51.0뿐이다.
- 두 문장 말고 Story 1.3 기록의 다른 문장은 판정하지 않았다. DOC-004의 앞 절은 사실만 적었다.

## Standards Review

### 시험 접근

두 SubTask의 접근은 `verification-only`다. 제품과 시험 지원의 동작을 바꾸지 않아 `testing-tdd`의 표에 맞고 RED가 없는 것이 맞다. Cleaner 검토자가 없는 것도 `data/development-quality.md`의 "A SubTask that changes only records"에 맞고 Dev 자신의 점검이 `dev-1.1`에 있다. 시나리오 ID가 `dev-1.1`, `dev-2.1`, `dev-dod-1`의 증거와 대응한다. 시험 대역과 새 의존성이 없다. 속성과 변이 점검은 실행되는 코드가 없어 대상이 없다. CRAP은 코드를 바꾸지 않아 해당 섹션의 "When a Story changes such code"에 들지 않고 측정 대상과 제안이 없다.

### 기록의 규칙

- CC-DOC-002: 새 글이 한국어이고 코드, 경로, 명령, 인용이 원문이다.
- CC-DOC-010: 정정의 값이 Story의 항목에 있고 명령과 대조가 `dev-1.1`에 있다. 임시 경로 검색에 일치가 없다.
- CC-DOC-013: `utils/checks/invisible-chars.awk`(LC_ALL=C)를 Story와 기록 문서 일곱에 돌려 찾은 글자가 없다. 파일은 UTF-8이고 줄 끝은 LF다.
- CC-DOC-009: 줄 번호와 줄 좌표 꼴의 검색 일치는 `po-r1`, `po-r2`의 "6행"(시나리오 행의 수)뿐이고 위치가 아니다. 서수는 DOC-005다.
- `data/story-paths.md` 섹션 Record documents: `check-stage.sh records` 종료 상태 0. 머리글과 목록, 링크, 저장 줄의 꼴이 맞다.
- Dev 기록의 값: 시작 커밋과 SubTask 커밋의 시각과 해시, 바뀐 섹션(`2e86847`에서 HEAD까지 Status, Tasks / Subtasks 체크박스 네 줄, Change Log, Dev Agent Record, Dev Agent Record에서 지운 줄은 시작 줄 하나), 아홉 파일의 후보 검색, `git ls-files`, `src/`의 `help`, `usage` 검색이 내 실행과 같다.

### 지적

네 건 모두 Dev 기록의 표현이고 Optional, 심각도 low다. Story의 Task, 합격 판정, 제품, 시험에 닿지 않는다. 결정 순서의 단계별 근거는 gate의 `finding`에 있고 아래는 그 판단의 요지다. 이 gate의 ID는 DOC-002부터다. Story와 Dev 기록이 Story 1.3 gate의 DOC-001을 여러 곳에서 들어, 같은 ID를 쓰면 `check-done.sh`의 future 기록 확인이 그 글을 기록으로 읽을 수 있기 때문이다.

- DOC-002 "Review 인계"의 나열. 글은 "이 Story의 변경은 Story 파일과 이 Story의 기록 문서(`dev-1.1.md`, `dev-2.1.md`, `dev-dod-1.md`)뿐이고"이고, `git diff --name-status 20256e4 HEAD`에는 `sm-`, `po-` 문서 넷도 있다. "뿐"이 말하는 종류는 여덟 경로 모두에 맞고 괄호가 넷을 덜 든다. 이 글을 저장소의 사실을 뒤집은 글로 읽으면 step 3의 기준이 되므로 그 갈림을 적는다. 사실은 맞고 나열이 덜 정확하며 그 나열에 기대는 Task, 점검, 기록이 없어 `data/finding-classification.md`의 "imprecise"로 읽었다. Dev Notes "이전 Story"의 "기록은 실제 출력과 대조해 적고, 모든 입력을 말하는 문장에는 잰 범위를 함께 적는다"는 "기술 제약"과 Risk Coverage가 정정 글에 대어 읽고 tech-debt-3-INSP-002, tech-debt-3-INSP-003이 그 글을 읽는다. 이 인계 줄까지 덮는지를 계획이 정하지 않아 step 3의 기준으로 읽지 않았고, 정정 항목 자신은 그 문장을 채운다.
- DOC-003 소스 트리 틈의 출처. 세 곳의 글이 항목 "CI 규칙이 계획 문서에 없음"이 그 틈을 든다고 적는다. 항목은 더 넓은 틈을 들고 소스 트리에는 `src/screen.js` 행의 내보내기만 말하며, 끝나는 조건에 두 경로가 없다. 넓은 틈 안에 드는 것이어서 거짓이 아니라 덜 정확한 출처로 읽었다. Dev의 "이 Story가 새로 가려낸 범위 밖 발견은 없다"도 이 읽기에 기대므로, 처리 줄의 `future`가 이 틈을 항목에 더하는 길이 된다.
- DOC-004 재지 않은 곳의 목록. 표 2와 같은 글이고 든 넷을 재지 않은 것은 맞지만 패턴에 드는 줄이 있는 Dev Agent Record를 들지 않는다. 6188a27에서 패턴에 드는 줄은 Scope and Dependencies 6, Dev Notes 4, SM Draft Checklist 2, PO Validation 3, Dev Agent Record 8, QA Results 5다. `8579e5a`의 Dev Agent Record는 2줄로 하나는 "오류 줄이 40글자를 넘지 않게"이고 하나는 시각 `21:40`이다. dev-qa-r2의 앞 절 "남은 40은 ... 커밋 `40e1a6b`의 이름뿐이고"도 Dev Agent Record를 들지 않는다.
- DOC-005 문장 서수. `dev-1.1`의 "이 항목에서 정정한다고 적는다(첫 문장)", AC 1의 Source 줄의 `"내용" 첫 문장`, AC 2의 Source 줄의 `"내용" 둘째 문장`이 서수로 자리를 가리킨다. 같은 꼴이 PO와 SM의 기록의 "끝 문장"에도 있고 대개 따옴표 글과 함께다. 이 회차의 읽기: 서수가 말과 함께 있거나 커밋에 묶여 움직일 수 없는 글을 가리키면 규칙이 든 까닭이 닿지 않고, 그때 locator인지를 규칙이 정하지 않아 step 3의 기준이 아니다. 다른 읽기: CC-DOC-009의 "Historical evidence ... locating the cited point with the identifiers above"가 묶인 글까지 덮는다고 보면 step 3의 기준이 되어 차단이다. 잘못된 자리로 가는 경우를 찾지 못했고 Testing의 거부 글이 줄 번호만 막아 앞의 읽기를 골랐으며, 그래서 확신을 medium으로 적었다.

### 기각한 후보

| 후보 | 기각의 까닭 |
| --- | --- |
| `a676f8e`와 `26a42cd`가 Dev 자신의 시각 줄을 그 자리에서 고친 일 | `data/story-paths.md`의 "a correction of an earlier result"와 CC-DOC-004가 말하는 것은 결과이고 시각은 항목의 정체성이다. 새 값이 `git log`의 커밋 시각과 같고, Change Log 0.6과 1.1 줄, 앞선 커밋이 까닭과 옛 글을 남긴다. `a676f8e`의 차이는 시각 세 줄과 Change Log 한 줄뿐이다 |
| 2.1 줄과 `dev-2.1`의 "Story 파일과 기록 문서 여섯" | `dev-2.1`의 괄호가 A 여섯 줄을 들고 `git diff --name-status 20256e4 26a42cd`가 같다. 둘을 합쳐 여섯으로 읽는 글이어서 수가 틀리지 않았다 |
| `dev-dod-1`의 "커밋 메시지 파일 셋"과 로그의 다섯 | 그 점검을 쓴 때의 수이고 로그가 지금의 목록을 맡는다 |
| 이어가기 로그의 SM, PO 항목에 남은 QA 쓰임의 말이 없음 | 로컬 로그이고 항목이 일회용임을 적으며 이 회차는 그 자료를 쓰지 않았다. 목록은 임시 영역의 파일과 맞고, 항목의 확인은 `tasks/local-story-done.md`의 일이다 |
| 표 2의 패턴이 시각 `21:40`을 잡음 | 잰 범위 안에 시각이 없어 값에 닿지 않는다 |

리드는 없다.

## Code Quality Assessment

코드와 시험이 바뀌지 않아 구조, 중복, 의존, 시험 설계의 평가 대상이 없다. 기록의 품질은 정정 항목이 값, 잰 범위, 말하려던 사실이 참인 범위를 모두 적어 이 Story의 목적을 이룬다. 낮은 수준의 표현 틈이 넷 남는다.

## Implementation Recommendations

| 지적 | 제안 | 까닭 | 소유자 | 확인 |
| --- | --- | --- | --- | --- |
| DOC-002 | 다음 항목에서 Story 파일과 기록 문서 일곱으로 적는다 | 변경 집합의 글을 File List와 맞춘다 | Dev | `git diff --name-status 20256e4 HEAD`와 대조 |
| DOC-003 | `future` 기록에 표의 두 경로를 이름 들어 병합 뒤 점검이 항목에 더하게 한다 | 항목의 끝나는 조건에 두 경로가 없다 | Dev, 뒤에 PO | 항목의 글을 읽음 |
| DOC-004 | 새 항목에서 재지 않은 곳에 Dev Agent Record를 더한다 | 40이 남은 곳을 찾을 범위를 좁히지 않는다 | Dev | 섹션별 검색 |
| DOC-005 | 뒤의 기록에서 서수 없이 문장의 말로만 가리킨다 | 문장 순서에 기대지 않는다 | Dev | 서수 검색 |

코드와 시험의 수정 제안은 없다. 앞선 항목과 Story 1.3의 기록은 고쳐 쓰지 않는다.

## Compliance Check

- Coding Standards: pass. 바뀐 코드가 없다. 기록의 규칙은 위와 같고 DOC-005가 Optional로 남는다
- Project Structure: pass. 새 코드 경로와 내보내기가 없고 기록은 지정된 폴더에 있다
- Testing Strategy: pass. 접근 `verification-only`와 시나리오 6개의 실행이 맞다
- All ACs Met: pass. AC 1 ~ 3과 회귀 기준을 현재 입력으로 확인했다

## Improvements Checklist

- [ ] DOC-002 Dev의 처리 결정
- [ ] DOC-003 Dev의 처리 결정
- [ ] DOC-004 Dev의 처리 결정
- [ ] DOC-005 Dev의 처리 결정

QA가 고친 것은 없다.

## Security Review

코드, 입력 경로, 비밀, 의존성의 변경이 없다. 새 글을 읽어 비밀과 자격 증명이 없음을 보았다. 찾은 문제가 없다.

## Performance Considerations

실행되는 코드를 바꾸지 않아 닿는 실행 비용 규칙이 없고 측정을 하지 않았다.

## Review Record Changes

Story의 QA Results 한 항목, gate `docs/qa/gates/tech-debt-3-story-1-3-dev.yml`, 이 문서를 더했다. Status는 Review 그대로다. Done으로 바꾸지 않았다.

## Comment Hygiene Report

- 방법과 범위: 체크리스트 §3의 비교 `git diff --name-only 20256e4 HEAD -- src test ci .github package.json README.md`가 출력 없음이어서 바뀐 production과 test의 글이 없다. 보조 조사로 `src/*.js`, `test/*.js`, `ci/*.mjs` 아홉 파일에 §1.1, §1.2(QA 접두와 이 Story와 기록에 적힌 ID), §1.3의 기계 고유 경로, §1.7의 후보를 찾았고 파일마다 일치가 없다. `git grep IN-FLIGHT`는 HEAD와 기준선에서 일치가 없다. `.github/workflows/ci.yml`에도 §1.2의 후보가 없다.
- 기준선: `20256e4`. 시험 파일이 같아 새 위반도 기존 잔여물도 없다(`tests_directory_findings` 0).
- 수명: 표시와 원장 항목이 없어 `pending_at_review` 0, `pending_after_story_done` 0, `orphan_from_prior_stories` 0이다. 원장은 `in-flight-comments-ledger: []`다.
- 보호 항목: `commentHygiene.preservedComments`가 비어 있고 `comments` 본문에 이 프로젝트의 허용 항목이 없어 기대 0, 관찰 0이다.
- 해당 없음: 빌드 가드, hotspot 짝 커밋, 접근 지정자는 바뀐 코드가 없어 닿지 않는다.
- 판정: `comment_hygiene.status` PASS.

## Extra Reviews

없다. 오케스트레이션 스위치가 꺼져 있어 이 run의 회차에 추가 검토자가 없고 이 회차에 들어온 검토도 없다.
