# qa-r2 — 계산기 화면

- Story: [1.3](../../stories/1.3.story.md)
- Entry: QA review round 2, `tasks/reopen-story.md`의 다시 열기
- Reviewer and time: Quinn(QA 하위 세션, 모델 `claude-opus-5-5`, effort `max`, 둘 다 시스템이 알려 준 값), `*run-story 1.2 1.3 remote` run의 역할 작업. 2026-11-06, 조건 확인과 재현 20:29 ~ 20:32 +0900, 사용자의 답을 받은 뒤 기록 작성 20:45 +0900부터. 점검은 이 세션이 직접 실행했다.
- Reviewed inputs: 브랜치 `story/1.3`, HEAD `f5aea95cd2d05ad0535c45a7c97a3373f45754ed`(Done 커밋), 커밋하지 않은 변경 없음. 기준 tip `d90c99e2f6e4d94e17d755fd4b4a5ac672f0b685`(로컬 `main`과 `origin/main`이 같고 fetch하지 않았다). 앞 회차의 head `5ca0d47`. `src/screen.js`, `test/screen.test.js`는 구현 개정 `aac1c5a`와 같다. 새 입력은 아래 사용자의 답 하나다.

## 이 회차의 성격

Done 뒤의 점검이 Done의 조건을 깨서 Story를 다시 여는 회차다. 입력이 바뀌지 않았으므로 전체 리뷰가 아니고 깊이는 `standard`다. 이 기록은 실패의 증거, 분류, 사용자의 답, 다음 일을 담는다. 회차 1의 검토 근거는 [qa-r1](qa-r1.md)과 [qa-done](qa-done.md)에 그대로 있다.

Story의 QA Results 항목은 이 회차의 `Reopen:` 줄을 저장한다.

```text
Reopen: 병합 작업의 사본 검증 — node ci/screen-rule.check.mjs 종료 상태 1, 규칙은 SCREEN_WIDTH 48을 요구하고 Story는 40을 내보낸다 — *run-story 1.2 1.3 remote
```

## 읽은 입력과 규칙

- 끝까지 읽음: `agents/qa.md`, `tasks/load-project-rules.md`, `core-config.yaml`, `project-map.md`, Hub, Common 색인, JavaScript README와 색인, 본문 `golden-rules`, `testing-tdd`, `coding-principles`, `comments`, `crap`, `documentation`, `javascript-language`, `javascript-crap`, `tasks/reopen-story.md`, `data/finding-classification.md`, `tasks/review-story.md`, `tasks/qa-gate.md`, `data/local-git-workflow.md`, `data/agent-context.md`, `data/story-paths.md`, `tasks/local-story-merge.md`, `tasks/review-loop.md`, `tasks/apply-qa-fixes-extract.md`, `templates/qa-gate-tmpl.yaml`, `utils/checks/gate-rules.awk`, `utils/checks/owned-rules.awk`, `utils/checks/record-rules.awk`, Story 전체, gate 전체, Dev의 병합 보고.
- 일부만 읽음: `tasks/run-story.md`(Purpose, Inputs and authorization, Next task, Stories of a call의 계획 순서, Merges, Places의 수정 문단, Rounds, Checks after each task, Stop hold and carry on), `tasks/apply-qa-fixes.md`(CP-1, CP-3, CP-4와 수정 기록), `tasks/create-next-story.md`(Creation and explicit revision modes, Final Summary, In a run), `tasks/validate-next-story.md`(재검증 문단, In a run), `tasks/develop-story.md`(계획 요소 보류 문단), `data/workflow-routing.md`(Story temporary material과 In a run), `templates/story-tmpl.yaml`(PO Validation 이후), `utils/checks/story-rules.awk`(QA Results 읽기), `utils/checks/check-staged.sh`(다시 열기 점검).
- 읽지 않음: 리뷰 회차의 체크리스트와 평가 절차(`comment-hygiene-checklist.md`, `development-quality.md`, `verification-ownership.md`, `trace-requirements.md`, `nfr-assess.md`). 이 회차는 제품과 시험을 다시 검토하지 않고 회차 1의 결과를 잇는다.
- `check-instructions.sh` 종료 상태 0.

## Spec Review

### 다시 열기의 조건

`tasks/reopen-story.md` 섹션 Confirm의 조건이다.

| 조건 | 확인한 것 | 결과 |
| --- | --- | --- |
| Status가 Done(Story 브랜치에서 읽음) | `git show story/1.3:docs/stories/1.3.story.md`의 섹션 Status가 `Done` | 맞다 |
| Git 사용 | `core-config.yaml`의 `git.enabled: true` | 맞다 |
| Story가 병합되지 않음 | `check-merge.sh done docs/stories/1.3.story.md story/1.3`가 `f5aea95...`를 출력. `check-merge.sh status --done f5aea95... --issue 8 1.3 main`이 `not merged`, 종료 상태 1. `git merge-base --is-ancestor f5aea95... main` 종료 상태 1. 메인 세션의 읽기 `state 9 behind f5aea95cd2d05ad0535c45a7c97a3373f45754ed auto-merge off` | 맞다 |
| 실패가 Done 뒤의 점검에서 옴 | `data/local-git-workflow.md` 섹션 Base branch moved의 실패한 재실행이다. 아래 재현으로 확인했다 | 맞다 |
| 요청이 다시 열기를 덮음 | `*run-story 1.2 1.3 remote`(`tasks/run-story.md` 섹션 Inputs and authorization) | 맞다 |
| 고치는 일이 수용된 결정을 바꿈 | 바꾼다. 사용자에게 물었고 아래 답을 받았다 | 답을 받음 |
| 두 Story의 동작이 충돌함 | Story 1.2의 스쿼시 f6f690b는 `ci/`, `.github/`, `src/screen.js`, `test/screen.test.js`를 바꾸지 않았고 `src/units.js`, `test/units.test.js`에 `SCREEN_WIDTH`가 없다. 규칙을 바꾼 커밋은 `[Chore]` cb50c3c다 | 해당하지 않음 |

### 재현

Node.js v24.22.1, Git 2.51.0, 프로젝트 루트, Story의 작업 트리의 detached HEAD, 2026-11-06 20:29:20 ~ 20:29:25 +0900. 전환마다 먼저 `ignored-aside.sh list {대상}`을 돌렸고 모두 출력이 없었다. 전환은 `git switch --no-overwrite-ignore`로 했다.

| 사본 | 만든 명령 | `SCREEN_WIDTH` / `EXPECTED_WIDTH` | `node --test` | `node ci/screen-rule.check.mjs` |
| --- | --- | --- | --- | --- |
| Done 커밋 f5aea95 | `git switch --no-overwrite-ignore --detach f5aea95...` | 40 / 40 | 종료 상태 0, 48개 통과 | 종료 상태 0, 출력 없음 |
| rebase 사본 552b97d | 이어서 `git rebase d90c99e...`. 커밋 9개, 충돌 경로 없음, 기준 tip과의 차이는 Story의 새 파일 12개 | 40 / 48 | 종료 상태 0, 68개 통과 | **종료 상태 1** |
| merge 사본 5f0520b | f5aea95에서 `git merge --no-edit d90c99e...`. 충돌 경로 없음, 트리가 rebase 사본과 같음 | 40 / 48 | 종료 상태 0, 68개 통과 | **종료 상태 1** |
| 기준 tip d90c99e | `git switch --no-overwrite-ignore --detach d90c99e...` | 파일 없음 / 48 | 종료 상태 0, 55개 통과 | 종료 상태 0, 파일이 없어 판정하지 않음 |

두 사본의 출력 원문은 같다.

```text
src/screen.js must export SCREEN_WIDTH = 48, got 40
```

rebase 사본의 트리는 Dev 병합 작업의 사본 d892420과 같다(`ba02161`). 사본의 커밋은 어느 ref도 가리키지 않아 Story 브랜치의 이력에 없다. `git switch --no-overwrite-ignore story/1.3`으로 돌아온 뒤 ref, 색인, 로컬 설정, 무시된 항목의 상태가 시작 전과 같았고, 그 뒤에 이 기록을 썼다.

### 사용자의 답

결정자는 프로젝트 소유자(시험 운영자)이고, 2026-11-06, 범위는 Story 1.3의 `SCREEN_WIDTH`와 이 다시 열기다. 메인 세션이 물었고 이 작업의 지시로 전달받았다.

> 질문: "Story 1.3 서버 병합이 막혔습니다. Story에 저장된 수용 결정은 `SCREEN_WIDTH = 40`인데, Story 1.3의 Done 뒤에 `main`에 병합된 요청 #10(cb50c3c)이 CI 규칙을 48로 올려 `node ci/screen-rule.check.mjs`가 'must export SCREEN_WIDTH = 48, got 40'으로 실패합니다. 어느 쪽을 바꿀까요?"

> 답: "Story를 48로 (Recommended)"

> 선택지의 글: "수용 결정을 48로 바꿉니다. `main`의 규칙과 AC는 그대로 둡니다. QA가 Story를 다시 열고(gate FAIL 회차) SM 수정, PO 재검증, Dev 수정, 새 세션의 전체 QA 리뷰, 새 Done, push, 서버 병합까지 run이 이어 갑니다. 폭은 줄 모양에 쓰이지 않아 `renderScreen`의 결과는 바뀌지 않습니다."

### 분류

`data/finding-classification.md`의 결정 순서다.

**REQ-001, 필수 점검이 기준 tip에서 실패한다.**

- step 1: 위 재현. 규칙의 비교는 `if (SCREEN_WIDTH !== EXPECTED_WIDTH)`로 같음만 받는다.
- step 2: `node ci/screen-rule.check.mjs`는 Story가 이름 댄 필수 점검이다(Testing의 "필수 점검 명령은 둘이다", 1.3-INT-001). 같은 점검이 Story의 변경이 없는 기준 tip에서 통과한다.
- step 3: 1.3-INT-001 "`src/screen.js`가 있는 상태에서 `node ci/screen-rule.check.mjs`가 종료 상태 0으로 끝난다", 그리고 "A mandatory check or scenario whose final required run fails is unmet, whether the product or the test causes the failure." 막는 지적이고 처분은 Required다.
- 경로: 답 전의 판정 작업은 `pending`(결정의 소유자)으로 분류했다. "A change to a recorded accepted decision is `pending` on that decision's owner", 그리고 섹션 In a run의 "An answer of the main session that the Story records is a recorded accepted decision for that Story". 사용자의 답이 결정을 정해 `rework`가 되었다. 코드와 시험의 수정은 Dev의 몫이다.
- 늦은 지적: 회차 1과 완료 점검 때 규칙은 40이었고 이 점검이 통과했다. 규칙이 Done 커밋(19:24:10 +0900) 뒤에 바뀌어(cb50c3c, 19:36:05 +0900) Done 뒤의 점검만 찾을 수 있었다. 회차 1의 통과를 뒤집으므로 다음 리뷰는 새 세션의 전체 리뷰다.

**REQ-002, Story의 수용된 결정과 계획의 글이 사용자의 결정과 어긋난다.**

- step 1: 아래 목록의 문장을 저장된 Story에서 읽었다.
- step 2: Story 자신의 글이다.
- step 3: "a statement that contradicts its accepted source". 사용자의 답이 수용된 결정이고 Story의 글은 앞선 값을 적는다. 막는 지적이고 처분은 Required다.
- 경로: `rework`. 계획의 글은 SM의 소유이고(`tasks/create-next-story.md`의 "SM may correct its Story statement, Scope and Dependencies, ... Dev Notes, ... Testing"), PO가 재검증한다. Dev는 이 글을 고칠 수 없다.
- 늦은 지적이 아니다. 앞 회차가 볼 수 없던 새 입력에서 나왔다.

폭의 값에 기대는 문장의 목록이다. SM이 고칠 대상을 찾는 출발점이며 완전함을 보증하지 않는다.

| 섹션 | 문장 또는 행 | 내용 |
| --- | --- | --- |
| Scope and Dependencies | 입력 표의 `ci/screen-rule.check.mjs`, `.github/workflows/ci.yml` 행 | "`SCREEN_WIDTH`의 값 40과 그 점검" |
| Scope and Dependencies | `수용된 결정`의 메인 세션의 답과 근거 | "`SCREEN_WIDTH = 40` 을 내보낸다", "`EXPECTED_WIDTH = 40`" |
| Scope and Dependencies | 선행 Story와 입력의 기준 서술 | "입력은 모두 커밋 40e1a6b에 있고", "Story 1.2는 `main`에 없고", "이 Story의 기준은 Story 1.2가 없는 `main`이다" |
| Dev Notes | 인터페이스와 파일 위치의 `SCREEN_WIDTH` 행 | "값이 40인 상수" |
| Dev Notes | 기술 제약의 놓치기 쉬운 점 | "`오류: {메시지}`는 40글자를 넘을 수 있고" |
| Dev Notes | 참고한 기록의 "CI 규칙이 계획 문서에 없음" | 메인 세션의 답이 정한다는 서술 |
| Testing | 표 1 R-4 | "시험은 길이가 40보다 큰 것도 단언한다" |
| Testing | 표 2 E-2 | "`7 +`의 줄은 지금 엔진의 메시지로 46글자여서 자르지 않음도 함께 본다" |
| Testing | 1.3-UNIT-003 | "길이가 40보다 크며", "40글자에서 자르거나" |
| Testing | 1.3-INT-001 | "값이 40이 아니거나", `must export SCREEN_WIDTH = 40` |
| Testing | 추적 | "메인 세션의 답"의 `SCREEN_WIDTH = 40` |
| Testing | 가져오기 검색의 통과할 줄 | `export const SCREEN_WIDTH = 40;` |

SM Draft Checklist의 N-8, PO Validation, Dev Agent Record, 이전 QA Results의 40은 그때의 기록이어서 고칠 대상이 아니다.

**TEST-001.** 처분 `optional`과 처리 줄 `future`를 바꾸지 않았다. Completion Notes의 future 기록이 "이 Story가 다른 까닭으로 InProgress로 돌아와 이 항목이 수용된 범위 안에서 고칠 수 있게 되면 같은 Story에서 고치고"라고 적었고, `tasks/apply-qa-fixes.md`가 run에서 Dev가 고른 future 처리에 같은 길을 둔다. 그래서 `suggested_action`만 새로 적었다.

### AC

AC 1 ~ 3은 바뀌지 않았다. 사본의 `node --test`에 화면 시험 13개가 들어 통과하고, `src/screen.js`와 `test/screen.test.js`는 회차 1이 검토한 파일과 같다. 답은 AC의 글을 바꾸지 않으며 `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`에 폭이 없다(`git grep SCREEN_WIDTH main --` 일치 없음). 세 파일은 Story와 기준 tip 사이에서 같다(`git diff --stat f5aea95 main --` 비어 있음).

## Standards Review

- 다시 열기 회차의 꼴: `tasks/qa-gate.md` 섹션 Round Update Procedure의 문단대로 `base_commit`은 앞 회차의 `head_commit`, `head_commit`은 Done 커밋, `depth`는 `standard`, 활성 지적의 처분 유지, 실패는 `first_round`가 새 회차인 활성 지적이다.
- 시험 코드: 이 회차가 바꾸지 않았다. 폭 48에서 시험의 `DISPLAY_WIDTH`와 길이 단언을 어떻게 둘지는 아래 "Implementation Recommendations"의 수정된 계획이 정한다. 시험 이름 `returns a line longer than the display whole`이 실제 단언과 맞아야 한다(CC-CMT-010 아래 문장).
- CRAP: `quality.crap.commands`가 비어 측정하지 않음이고 통과도 차단도 아니다.

### 기각과 리드

| 후보 | 처리 | 까닭 |
| --- | --- | --- |
| 환경의 실패 | 기각 | 결과가 값의 차이로 정해지고 같은 명령이 Done 커밋과 기준 tip에서 통과한다 |
| 두 Story의 동작 충돌 | 기각 | 위 조건 표. Story 1.2는 폭과 무관하다 |
| "답의 근거에 든 사실만 고치면 된다"는 `rework` 읽기(답 전) | 기각 | step 5의 "what the decision chooses". 답의 글과 "값이 40인 상수", 1.3-INT-001의 실패 기준이 값 자체를 고른다. 규칙의 값을 따른다는 조건을 답이 적지 않았다 |
| `contract` | 기각 | AC, PRD, Architecture에 폭이 없고 답은 범위를 바꾸지 않는다. `ci/screen-rule.check.mjs`를 바꾸지 않는다는 범위 문장도 그대로다 |
| 1.3-UNIT-011의 여섯 파일 | 기각 | 사본을 40e1a6b와 비교하면 `ci/screen-rule.check.mjs`가 한 줄 다르다. 기준의 이동이고 Story의 변경이 아니다. 기준 tip과는 같다(`git diff --quiet` 종료 상태 0) |
| Story의 "Story 1.2는 `main`에 없고" | REQ-002에 합침 | 같은 문단이 입력을 커밋 40e1a6b로 묶은 기준 서술이어서 따로 올리지 않는다. 기준 tip을 들여오면 맞지 않게 되므로 SM이 함께 고친다 |
| 면제 | 해당 없음 | `tasks/qa-gate.md` 섹션 Schema when Waived가 필수 점검의 실패를 면제로 닫지 못하게 한다 |

리드: 서비스 CI `test`도 같은 점검에서 실패할 것이다. `.github/workflows/ci.yml`이 같은 두 명령을 돌리고 merge 사본이 실패한다. 확인하려면 요청 #9의 갱신이 필요한데 사본 검증이 실패해 하지 않았다. 수정 뒤의 병합 작업이 서비스의 결과를 읽는다.

### 위험 평가

방법: 회차 1의 위험 표에 이 회차의 관찰을 더했다. 프로젝트에 정한 위험 척도는 없다.

| 위험 | 크기 | 통제 | 남은 불확실성 |
| --- | --- | --- | --- |
| CI만 보는 규칙의 값이 계획 문서 밖에서 바뀌면 같은 어긋남이 되풀이된다 | medium | 병합 작업의 사본 검증이 잡았다. `docs/planning/future-work.md`의 항목 "CI 규칙이 계획 문서에 없음"이 틈을 든다 | Architect, PM의 답. 폭의 뜻이 어디에도 없다 |

나머지 위험은 [qa-r1](qa-r1.md)의 위험 표 그대로다. 폭을 넘는 줄의 처리는 폭이 48이 되어도 정해지지 않았다.

## Code Quality Assessment

제품과 시험이 바뀌지 않아 회차 1의 평가를 잇는다. `SCREEN_WIDTH`는 선언에만 나오고 줄에 쓰이지 않아 값이 바뀌어도 `renderScreen`의 결과는 같다. 일반 사본에서 폭을 48로 한 모듈의 53글자 값 줄과 46글자 오류 줄이 그대로 나왔다.

## Implementation Recommendations

| 제안 | 근거 | 소유자 | 기대 점검 |
| --- | --- | --- | --- |
| 사용자의 답을 글, 근거, 결정자, 범위와 함께 Scope and Dependencies에 저장하고 위 목록의 글을 고친다 | REQ-002, `tasks/create-next-story.md` 섹션 In a run | SM | SM 점검, PO의 재검증 |
| 폭을 넘는 오류 줄의 입력이나 단언을 정한다 | 아래 사본 시험. E-2의 전제가 깨진다 | SM | 1.3-UNIT-003의 실패 기준이 폭 48에서 성립 |
| 기준 tip을 `[story-1.3] Story Base: main at d90c99e2f6e4d94e17d755fd4b4a5ac672f0b685` 병합 커밋으로 들여온다 | `tasks/reopen-story.md` 단계 5, `data/local-git-workflow.md` 섹션 Base branch moved. 서비스 갱신이 없어 들여올 것은 기준 tip이다 | Dev | merge 사본에서 충돌 없음을 보았다 |
| `SCREEN_WIDTH`를 48로 바꾸고 시험을 수정된 계획대로 맞춘다 | REQ-001 | Dev | `node --test` 전체 통과, `node ci/screen-rule.check.mjs` 종료 상태 0 |
| TEST-001의 두 행을 더한다 | Story의 future 기록 | Dev | 변이 `pass-no-trailing-u0020`, `pass-no-carriage-returns`가 실패하고 전달 코드는 통과 |

일반 사본 시험의 결과다. 제안된 구현이 아니라 결과의 예측이다. 시험 수는 기준 tip의 55개에 화면 13개를 더한 68개다.

| 사본 | `node --test` | 규칙 |
| --- | --- | --- |
| `SCREEN_WIDTH`만 48 | 68개 통과. 시험의 `DISPLAY_WIDTH`는 낡은 40이다 | 종료 상태 0 |
| `SCREEN_WIDTH`와 `DISPLAY_WIDTH`가 48 | 67개 통과, 1개 실패: `returns a line longer than the display whole`의 `assert.ok(longErrorLine.length > DISPLAY_WIDTH)` | 종료 상태 0 |

지금 엔진에서 `오류:` 줄의 길이다. 53글자 값 줄은 폭 48을 넘는다.

| 식 | 줄의 길이 |
| --- | --- |
| `7 +` | 46 |
| `7 +` 뒤에 공백을 두어 위치가 13 | 47 |
| `7 +` 뒤에 공백을 두어 위치가 100 | 48 |
| `7 +` 뒤에 공백을 두어 위치가 1000 | 49 |

`DEV-1`이 걱정한 `7 +` 길이 단언은 다른 까닭으로 같은 자리에서 고치게 된다. Dev가 그 처리 줄을 정한다.

## 다음 일의 순서

1. SM 수정: REQ-002. Status는 InProgress 그대로다(`tasks/create-next-story.md`의 "Retain the current Status during revision"). 변경은 Story 브랜치에 Story의 커밋 제목으로 커밋한다(`tasks/run-story.md` 섹션 Slots의 Places 문단).
2. PO의 재검증: 영향받은 입력(`tasks/validate-next-story.md`의 "For an Approved, InProgress, or Review Story"). 검증 루프의 회차가 아니라 이 리뷰 회차의 수정에 속한다(`tasks/run-story.md` 섹션 Rounds).
3. Dev `*review-qa 1.3`: `Story Base` 병합 커밋이 수정의 첫 커밋이고 그 위에서 고친다. 끝에 `tasks/local-story-review.md`로 Review에 넘긴다.
4. 새 세션의 전체 QA 리뷰, 새 Done(`qa-done-2.md`, 새 `Merge risk:` 줄), 새 Done 커밋의 push, 서버 병합, PO의 병합 뒤 점검.

SM과 PO가 Dev보다 먼저인 까닭: `tasks/apply-qa-fixes.md`의 CP-4가 "Required current-Story planning edits are complete under the correct owner before implementation"을 요구하고, `tasks/develop-story.md`가 바뀐 계획에 기대는 일을 수정과 재검증이 끝날 때까지 멈추게 하며, `tasks/run-story.md` 섹션 Rounds가 SM을 소유자로 둔 `rework` 지적에 같은 순서를 둔다. `Story Base` 병합 커밋은 같은 파일의 문장대로 Dev의 수정이 시작되는 첫 일이다. 이 순서에 충돌이 없다: SM과 PO가 바꾸는 Story 파일과 기록 문서는 `main`에 없고, merge 사본이 충돌 없이 만들어졌다.

## Compliance Check

- Coding Standards: 이 회차가 바꾼 코드가 없다. 회차 1의 결과를 잇는다
- Project Structure: pass. 회차 1과 같다
- Testing Strategy: fail. 필수 점검 1.3-INT-001이 기준 tip에서 실패한다(REQ-001)
- All ACs Met: pass. AC 1 ~ 3은 바뀌지 않았고 그 시험이 사본에서 통과한다. 결정의 값은 AC가 아니다

## Improvements Checklist

- [ ] REQ-002: 답의 저장과 계획의 글(SM), 재검증(PO)
- [ ] REQ-001: `Story Base` 병합 커밋, `SCREEN_WIDTH`, 시험(Dev)
- [ ] TEST-001: Story의 future 기록대로 같은 Story에서 고치고 처리 줄을 남긴다(Dev)
- [x] 실패를 사본에서 재현했고 사용자의 답을 받았다

## Security Review

이 회차가 새로 본 것이 없고 제품이 바뀌지 않았다. 회차 1의 결과를 잇는다. 폭의 값은 입력 처리에 쓰이지 않는다.

## Performance Considerations

이 회차가 새로 본 것이 없고 제품이 바뀌지 않았다. 수용된 성능 기준이 없다.

## Review Record Changes

- `docs/stories/1.3.story.md`: Status를 Done에서 InProgress로, QA Results 끝에 이 회차의 항목을 더했다. 다른 섹션은 바꾸지 않았다
- `docs/qa/gates/1.3.yml`: 회차 2, FAIL, 활성 지적 REQ-001, REQ-002, TEST-001(`suggested_action`만 새로 적음), 점수 80, 위험 합계와 `must_fix`, `monitor` 한 줄, `recommendations.immediate`, `comment_hygiene.status_reason`에 근거 한 문장, 머리 주석, `review_rounds`, `history`. 회차 1의 항목은 바꾸지 않았다
- `docs/story-records/1.3/qa-r2.md`: 이 기록
- 제품과 시험, 다른 역할의 기록, `docs/planning/future-work.md`는 바꾸지 않았다

## Comment Hygiene Report

- 방법과 범위: 새로 실행하지 않았다. 다시 열기 회차의 규칙대로 회차 1의 결과를 그 근거와 함께 잇는다.
- 근거: `git diff --quiet 5ca0d47 f5aea95 -- src test` 종료 상태 0. 두 파일이 회차 1의 입력과 같다.
- 판정: PASS. `tracking_id_leaks` 0, `forbidden_patterns` 모두 0, `in_flight_lifecycle`의 `pending_at_review` 0, `whitelist_preserved`는 기대 0, 관찰 0이다. 수정 뒤의 전체 리뷰가 새로 본다.

## Extra Reviews

없다. 이 run은 오케스트레이션 스위치가 꺼져 있어 추가 검토자가 없다.

## 한계

- 호스팅 서비스를 읽지 않았고 fetch하지 않았다. 요청 #9의 상태, `publish.sh checks`의 결과, 요청 #10의 본문은 메인 세션이 준 입력으로만 안다.
- 일반 사본 시험은 결과의 예측이며 계획이나 구현이 아니다.
- 폭의 뜻은 어느 수용 문서에도 없다. 이 회차가 정하지 않았고 답도 값만 정한다.
