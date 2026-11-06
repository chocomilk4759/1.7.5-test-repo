# qa-done — 계산기 화면

- Story: [1.3](../../stories/1.3.story.md)
- Entry: QA completion check, 첫 완료 점검
- Reviewer and time: Quinn(QA 하위 세션, 모델 `claude-opus-5-5`, effort `max`, 둘 다 시스템이 알려 준 값), `*run-story 1.2 1.3 remote to Done` run의 역할 작업, 회차 1과 다른 새 세션. 2026-11-06, 메인 세션의 시작 스냅샷 19:12 +0900 뒤에 시작, 점검 실행 19:15 ~ 19:22 +0900, 기록 작성 19:23 +0900부터. 점검은 이 세션이 직접 실행했다.
- Reviewed inputs: 브랜치 `story/1.3`, HEAD 3bda984(Dev의 기록 커밋), 커밋하지 않은 변경 없음, 기준 `main` 40e1a6b. 회차 1이 검토한 head는 5ca0d47이다.

## 결과

`tasks/local-story-done.md`의 완료 조건을 모두 현재 파일과 실행 결과로 확인했고 Status를 Review에서 Done으로 바꾼다. 앞선 기록의 서술은 근거로 삼지 않고 대조 대상으로 읽었다.

끝까지 읽은 입력은 QA 페르소나, `tasks/load-project-rules.md`, `tasks/local-story-done.md`, `tasks/qa-gate.md`, `tasks/apply-qa-fixes.md`, `tasks/develop-story.md`, `tasks/verify-delivery.md`, `project-map.md`, `data/agent-context.md`, `data/local-git-workflow.md`, `data/story-paths.md`, `data/finding-classification.md`, `data/future-work-planning.md`, `data/verification-ownership.md`, `data/development-quality.md`, `data/workflow-routing.md`, `checklists/comment-hygiene-checklist.md`, 설정, Hub와 Common, JavaScript 색인, QA의 규칙 종류에 드는 본문 전부(golden-rules, coding-principles, comments, documentation, testing-tdd, crap, javascript-language, javascript-crap), Story, gate, qa-r1, dev-qa-r1, dev-1.1, dev-2.1, dev-dod-1, `src/screen.js`, `test/screen.test.js`, `src/engine.js`, `src/number-format.js`, `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`, `docs/planning/future-work.md`, `README.md`, `.github/workflows/ci.yml`, `ci/screen-rule.check.mjs`, `package.json`, 점검 스크립트 `check-done.sh`, `check-staged.sh`, `check-owned.sh`, `owned-rules.awk`, `story-rules.awk`, `record-rules.awk`, `key-lines.awk`, `invisible-chars.awk`, `lib.sh`이다. `tasks/run-story.md`, `tasks/publish-story.md`, `tasks/local-story-merge.md`, `tasks/review-story.md`, `tasks/sync-bmad-commands.md`, `templates/story-tmpl.yaml`, `utils/checks/merge-message.sh`, `utils/checks/check-merge.sh`는 이 작업에 닿는 절만 읽었다. 기록 문서 sm-1과 po-r1은 회차 1 뒤 바뀌지 않았고 이번에 다시 읽지 않았으며, Story의 SM Draft Checklist와 PO Validation은 읽었다.

## 조건별 확인

| 완료 조건 | 확인한 것 | 결과 |
| --- | --- | --- |
| Status가 Review | Story의 Status 섹션, `check-done.sh` | 맞다 |
| 실제 LLM QA 검토가 현재 구현과 입력을 덮음 | gate 회차 1의 `head_commit` 5ca0d47과 HEAD 사이에 바뀐 경로는 gate, Story, qa-r1, dev-qa-r1뿐이다. Story를 섹션으로 나눠 비교하면 제목, Status, Story, Scope and Dependencies, Acceptance Criteria, Tasks / Subtasks, Dev Notes(Testing 포함), SM Draft Checklist, PO Validation이 두 커밋에서 같고, 더한 줄은 QA Results 41줄, Change Log 1줄, Dev Agent Record 10줄이며 지운 줄이 없다. `src/screen.js`, `test/screen.test.js`는 작업 트리, HEAD, 구현 개정 aac1c5a에서 같다. 규칙 파일(`.bmad-core`, `docs/conventions`, `AGENTS.md`)은 Git이 추적하지 않아 수정 시각으로 보았고 gate의 저장 시각보다 새로운 파일이 없다 | 맞다 |
| gate가 PASS | schema 2, `gate: "PASS"`, `round: 1`, `waiver: { active: false }`, `check-gate.sh` 종료 상태 0 | 맞다 |
| 활성 Required, Recommended 지적 없음 | `top_issues`는 Optional TEST-001 하나이고 `resolved_issues`는 비어 있다 | 맞다 |
| Task와 수정 단위 완료 | Tasks / Subtasks와 Dev Agent Record에 열린 체크박스가 없다. Completion Notes의 1.1, 2.1 커밋 aac1c5a, 8ece8d7의 제목이 각 SubTask와 같다. 이 Story에 QA 수정 단위는 없다 | 맞다 |
| 필수 점검 완료 | 아래 표. 시나리오 15개 가운데 자동 13개는 이번에 다시 실행했고, 판단 점검 둘은 아래 표대로 다시 확인했다 | 맞다 |
| File List 완전 | `git diff --name-status main...HEAD`의 11개 경로 가운데 QA의 gate와 qa-r1을 뺀 9개가 File List의 파일 9개와 같다 | 맞다 |
| 주석 위생 | gate의 `comment_hygiene.status`가 PASS이고, 위생 입력과 규칙 본문이 회차 1 뒤 바뀌지 않았으며, 후보 검색을 다시 실행해 모두 일치가 없다. 두 파일의 주석 전부와 시험 이름 13개를 끝까지 읽었다. 원장은 비어 있고 표시가 없으며, `commentHygiene.preservedComments`가 비어 보존 대상이 없다 | 맞다 |
| 기록만의 인계 | QA Results에 File List나 실행 기록의 수리 요청이 없고 File List에 빠진 파일이 없다. Dev의 기록 커밋은 아래 "Dev 기록 커밋의 대조"대로 맞다 | 끝남 |
| 사용자 허락이 Done을 덮음 | 저장된 실행 요청 줄은 PO Validation에 하나이고 단계는 `through Done`이며 단어 `remote`가 있다. Scope and Dependencies에 저장된 사용자 결정 원문에 "QA gate가 PASS면 Done으로 바꾸는 것을 허락합니다"가 있고, 이 작업의 지시가 같은 글을 전달했다 | 맞다 |
| Optional과 future의 처리 결정 | TEST-001, DEV-1의 마지막 처리 줄이 `future`이고, 지적과 출처, 적용하지 않는 까닭, 필요한 일을 적은 future 기록이 Completion Notes에 있다. 실행 요청이 이 기록을 맡기며(`tasks/run-story.md` 섹션 Inputs and authorization), 바뀌지 않은 결정이어서 다시 묻지 않는다 | 맞다 |
| 설치된 BMAD 원본의 변경 | 이 Story의 변경 경로에 없고 수정 시각도 Story 시작 전이어서 `tasks/sync-bmad-commands.md`를 적용할 일이 없다 | 할 일 없음 |

## 실행한 점검

Node.js v24.22.1, Git 2.51.0, 프로젝트 루트, HEAD 3bda984, Status Review에서 실행했다. 제품 파일과 추적 파일을 바꾸지 않았고, 스크립트, 출력, 사본은 프로젝트 임시 영역에 두었다.

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| Status 변경 전 감사 | `sh .bmad-core/utils/checks/check-done.sh docs/stories/1.3.story.md` | 종료 상태 0, 출력 없음 |
| gate와 Story | `check-gate.sh docs/qa/gates/1.3.yml docs/stories/1.3.story.md` | 종료 상태 0 |
| 기록 문서 | `check-stage.sh records docs/stories/1.3.story.md` | 종료 상태 0 |
| 저장 줄 | `check-stage.sh qa-record`, `check-stage.sh po-record` | 종료 상태 0. 회차 1의 PASS와 PO 1회차의 GO, `complete`를 출력 |
| future-work 파일 | `check-stage.sh future --story 1.3` | 종료 상태 0, 출력 없음 |
| 지침 | `check-instructions.sh` | 종료 상태 0 |
| 의존과 병합 상태 | `check-stage.sh deps`, `check-merge.sh status 1.1 main`, `unmerged main`, `pending main` | 이 Story는 1.1에 기대고 1.1은 병합되었으며(81c547c), 이 Story에 기대는 Story는 없다. `unmerged`는 Story 1.2 하나를 들어 종료 상태 1이고 의존 관계가 없다. `pending`은 목록 없음 |
| 전체 시험, 1.3-UNIT-001 ~ 010 | `node --test` | 48개 통과, 실패 0, 건너뜀 0(화면 13, 기존 35) |
| 1.3-UNIT-011 | 기존 35개와 `git diff --quiet 40e1a6b --` 여섯 파일 | 통과, 종료 상태 0 |
| 1.3-INT-001 | `git ls-files --error-unmatch src/screen.js`, `node ci/screen-rule.check.mjs` | 파일이 있고, 종료 상태 0, 출력 없음 |
| 1.3-INSP-001 | Story의 "가져오기 검색" 명령을 저장된 글에서 그대로 뽑아 실행 | 종료 상태 0, 출력 없음 |
| 1.3-INSP-002 | `src/screen.js`를 끝까지 읽음 | 결과는 `evaluate`와 `formatNumber(value)`로 만든다. 입출력과 전역 접근이 없고, 모듈 수준 바인딩은 상수 `SCREEN_WIDTH`뿐이며, 정규식은 함수 안의 리터럴로 `g`, `y` 플래그가 없다. `SCREEN_WIDTH`는 선언에만 나오고 줄을 자르거나 접는 코드가 없다. 잡은 오류는 `throw error;`다 |
| 1.3-INSP-003 | 두 파일을 `docs/architecture.md`의 기술 구성, 소스 트리, 설계 원칙, 결정 D-1, `README.md`와 다시 대조 | 어긋난 곳이 없다. 시험이 가져오는 `node:test`, `node:assert/strict`는 내장 모듈이고 `eval`, `Function` 검색은 일치 없음(종료 상태 1)이다. `SCREEN_WIDTH`가 소스 트리 행에 없는 틈은 Task 2.1과 메인 세션의 답대로 future-work 항목에 남는다. 고칠 문서가 없다 |
| 주석 위생 후보 | 체크리스트 §1.1, §1.2(QA 접두, 시나리오, PO와 SM 메모, 표의 행, 결정과 Cleaner, DEV 번호), §1.3, §1.4, §1.7, 저작권 검색을 기준 40e1a6b 대비 두 파일의 추가 줄에 | 모두 일치 없음. 비ASCII는 표시 글자 `오류: ` 셋이다. 두 파일에 U+00A0, U+3000의 실제 바이트가 없다. 기준에 두 파일이 없어 기존 잔여물이 없다 |
| 검토 뒤 변경 | `git diff --name-status 5ca0d47 HEAD`, `git diff --quiet 5ca0d47 HEAD -- src test package.json README.md docs/prd.md docs/architecture.md docs/planning ci .github`, `git diff --quiet aac1c5a HEAD -- src test` | 경로 넷(gate, Story, qa-r1, dev-qa-r1), 종료 상태 0, 종료 상태 0. 두 파일의 `git hash-object --no-filters` 값은 `bbd96bea4be3`, `3ed20611195c`로 회차 1과 같다 |
| Story 섹션 비교 | 5ca0d47과 479029d의 Story를 HEAD와 섹션별로 비교 | 위 "조건별 확인"의 결과. 479029d 대비 QA Results는 같고, Dev의 커밋이 더한 줄은 Change Log 1행, Agent Identity 1문단, Debug Log References 1행, Completion Notes의 항목과 처리 줄, File List 1행이다 |
| 기록의 글자 | `invisible-chars.awk`(C 로캘), 임시 경로 패턴을 Story, gate, 기록 문서에 | 일치 없음 |
| 인용된 이름 | Dev 기록이 드는 커밋 7개와 파일 객체 2개를 `git cat-file -t`로 확인 | 모두 있다 |

이어 쓴 결과: 표 대조 64행, 독립 오라클 23행, 변이 67개, 속성 실행 문자열 30만 개는 회차 1이 aac1c5a의 두 파일과 같은 Testing, 같은 Node.js로 실행했다. 그 뒤 이 입력은 바뀌지 않았고, 이 점검들은 Dev의 기록을 읽지 않는다.

## Dev 기록 커밋의 대조

커밋 b80b554는 Story의 Dev 기록과 Change Log와 새 dev-qa-r1을 담고, 3bda984는 dev-qa-r1의 시각 한 문장만 고친다. 회차 1 뒤의 입력이므로 전달된 파일의 사본에서 Dev가 적은 값을 직접 다시 냈다. 모두 기록과 같다.

| 기록 | 점검 | 결과 |
| --- | --- | --- |
| TEST-001 변형 | 끝의 U+0020을 지우고 넘기는 사본, CR을 지우고 넘기는 사본에서 `node --test test/screen.test.js`와 CI 규칙 | 둘 다 13개 통과, 종료 상태 0. 전달된 모듈도 13개 통과, 종료 상태 0 |
| TEST-001 값 | 세 사본에 뒤 공백 둘이 있는 `7 +`, `1`과 `+ 2` 사이에 CR이 있는 식 | 전달은 `position 5`, `position 1`의 오류 줄이다. 끝 공백 변형은 앞 입력이 `position 3`이고, CR 변형은 뒤 입력이 CR이 든 값 줄이다 |
| TEST-001의 두 행 | 필요한 일에 적힌 두 행을 시험 사본에 더함 | 전달 13개 통과. 끝 공백 변형은 `reports an error at its position in the expression as received` 하나, CR 변형은 `does not take white space other than a space for a space` 하나가 실패 |
| DEV-1 | 엔진 사본의 까닭을 `unexpected end`로 줄임 | 13개 중 `returns a line longer than the display whole` 하나만 실패. `7 +`의 줄은 32글자, 전달된 줄은 46글자 |
| 기록의 꼴 | Completion Notes와 dev-qa-r1을 읽음 | 두 처리 줄이 Completion Notes 끝에 있고, 각 future 기록에 지적과 출처, 적용하지 않는 까닭, 필요한 일이 있다. dev-qa-r1의 대조 표가 gate의 `recommendations`와 `monitor` 항목을 모두 든다 |

두 항목은 전달된 코드의 잘못된 결과가 아니다. TEST-001은 틀린 변형을 시험이 잡지 못하는 틈이고, DEV-1은 엔진 메시지를 바꾸는 뒤의 변경에서 실패로 드러날 단언이다. 회차 1의 분류를 뒤집을 새 사실이 없고 현재 의무를 가리지 않는다. 기록만의 변경이어서 새 회차를 부르지 않는다.

## 병합 위험 판단

저장 줄의 값은 `revertible`이다. 이 Story의 squash 커밋을 되돌리면 그 효과가 없어진다고 판단한 근거는 다음과 같다.

- 바꾼 범위: `git diff --name-status main...HEAD`의 11개 경로가 모두 추가이고 수정과 삭제가 없다. 제품 1개, 시험 1개, Story 1개, gate 1개, 기록 문서 7개이며, 이 완료 점검이 기록 문서 하나를 더한다. 기준 `main`이 곧 갈라진 지점 40e1a6b다.
- 바꾸지 않은 범위: `package.json`, `.github`, `ci`, `README.md`, `docs/prd.md`, `docs/architecture.md`, `docs/planning`, `src/engine.js`, `src/number-format.js`, `test/engine.test.js`, `test/number-format.test.js`. `git diff --quiet`가 종료 상태 0이다.
- 부작용: `src/screen.js`는 `./engine.js`와 `./number-format.js`만 가져오는 입출력 없는 순수 함수이고, 데이터 이전과 제품의 외부 부작용이 없다.
- 쓰는 코드: 두 파일과 문서 밖에서 `screen.js`, `renderScreen`, `SCREEN_WIDTH`를 `git grep`으로 찾으면 `ci/screen-rule.check.mjs`뿐이고, 이 점검은 파일이 있을 때만 판정한다. 브랜치 `story/1.2`의 코드에는 일치가 없고, 두 Story가 함께 바꾸는 경로가 없으며, 이 Story에 기대는 Story가 없다.
- 되돌린 뒤의 상태: 이 저장소의 로컬 clone에서 실행했다. `main`에 이 Story를 squash하면 `node --test` 48개 통과이고, 그 커밋을 되돌리면 기준 커밋과 차이 나는 경로가 0개이며 `node --test` 35개 통과, CI 규칙은 파일이 없어 판정 없이 종료 상태 0이다. Story 1.2와 이 Story를 차례로 squash하고 이 Story만 되돌리면 이 Story의 경로가 0개 남고 `node --test` 55개 통과, CI 규칙 종료 상태 0이다. 사용한 커밋은 3bda984이고 Done 커밋은 기록만 더한다.

되돌려도 남는 것을 판단에 넣었다. Story 시작이 호스팅 서비스에 만든 이슈 #8과 게시가 열 요청은 서비스의 기록으로 남고, 병합의 `Closes` 줄이 닫은 이슈를 되돌리기가 다시 열지 않는다. 트래커는 Story를 잇는 기록일 뿐 제품과 데이터에 닿지 않아(`data/future-work-planning.md`의 "a remote tracker only links") 이 값을 바꾸지 않고, 저장 줄의 범위에 적었다. 병합 뒤 PO 점검의 `Docs` 커밋과 보관 ref도 별도의 계획 기록이어서 squash 커밋의 되돌리기와 무관하다.

## 전달 점검

`docs/prd.md`, `docs/architecture.md`, Story의 Testing에 배포나 환경의 의무가 없어, 완료 뒤 `tasks/verify-delivery.md`로 이어 갈 일이 없다. `.github/workflows/ci.yml`은 요청에서 `node --test`와 `node ci/screen-rule.check.mjs`를 실행하며 두 명령을 위 표대로 로컬에서 실행했다. 호스팅 서비스의 CI 결과는 게시와 서버 병합의 단계가 읽는 것이고, 이 작업은 네트워크를 쓰지 않아 읽지 않았다.

## 임시 자료 대조

이어가기 로그의 이 Story 섹션이 적은 임시 경로를 뽑아 프로젝트 임시 영역의 실제 파일과 양쪽으로 대조했다. 경로는 로그에만 둔다. 기록된 자료는 아무것도 지우지 않았다.

- 로그가 적은 경로 가운데 대조 때 없던 것은 메인 세션이 지웠다고 로그에 적은 스냅샷 넷, Dev가 각 커밋 뒤 지웠다고 적은 커밋 메시지 파일, 이 작업이 그 뒤에 만드는 보고 파일과 커밋 메시지 파일뿐이다.
- 항목의 설명도 맞다. 폴더별 파일은 SM 사본 23개, PO 45개, Dev 186개, Cleaner 검토자 123개, Dev의 처리 기록 폴더 18개와 5개와 22개, QA 회차 1의 454개이고, 항목이 이름을 든 스크립트와 출력이 적힌 대로 있다.
- 이 Story의 파일 가운데 항목이 덮지 않던 것은 이 완료 점검의 파일뿐이고, 로그에 더한 뒤 0개다.
- 다른 Story의 자료와 설치 도구가 남긴 다섯 파일은 이 Story의 자료가 아니어서 그대로 둔다.
- 남은 쓰임: 일회용 자료의 QA 쓰임은 이 완료 점검으로 끝나고, 다시 열기가 생기면 다시 읽을 수 있다. 병합이 확인된 뒤의 정리가 일회용 자료를 지운다.

## 처리 결정과 남은 기록

- TEST-001(Optional, 심각도 low, 계약 안, 소유자 Dev)과 DEV-1(범위 밖, 책임은 PO1-N4의 답을 주는 PM, 시험을 고치는 일은 Dev): 처리 `future`. 병합 뒤 PO 점검이 future-work 항목으로 옮긴다.
- PO1-N1 ~ PO1-N8, PO1-N11, PO1-N12: Story가 적용하지 않은 PO의 비차단 지적이고 PO Validation에 있다. 병합 뒤 PO 점검이 옮긴다. PO1-N9, PO1-N10은 SubTask 1.1에서 적용되었고 회차 1이 확인했다.
- 새 파일의 저작권과 SPDX 값, CRAP 측정: 기존 future-work 항목 "[Tech-Debt] 새 파일의 저작권과 SPDX 값", "[Tech-Debt] CRAP 측정 경로"가 이 Story의 파일까지 이미 든다.
- 계획: `docs/planning/future-work.md`의 17개 항목이 모두 `unplanned`이고 `undecided`가 없으며, `check-stage.sh future --story 1.3`이 종료 상태 0이다. 계획을 기다리는 항목이 없어 다음 Story를 막지 않는다.

## 다음 행동

Story는 Done이고, 이 작업은 push, fetch, 요청을 하지 않았다. 다음은 메인 세션이 별도의 Dev 작업으로 시작하는 게시(`tasks/publish-story.md`)로, Done 커밋의 push, upstream, 이슈 #8, ready 요청이다. 병합은 이 호출에 없어 사용자의 지시나 `to` 낱말 없는 `remote` 호출을 기다린다(`tasks/local-story-merge.md` 섹션 Server merge). 그다음은 PO의 병합 뒤 점검(`data/future-work-planning.md`)과 임시 자료 정리다. 완료 점검은 끝난 일이며 새 개발 요청이 아니다.

## 한계

- 표 대조, 오라클, 변이, 속성 실행은 표본이고 이번에 다시 실행하지 않았다. 변이 도구와 속성 점검 도구는 설정되어 있지 않다.
- 규칙 파일의 불변은 Git이 아니라 수정 시각과 `check-instructions.sh`로 보았다.
- 호스팅 서비스를 읽지 않았고, `main`과 `origin/main`은 로컬 ref의 값만 보았다. 이슈 #8의 서비스 상태는 Dev의 기록으로만 안다.
- 되돌리기는 이 기기의 로컬 clone에서 모의한 것이고 호스팅 서비스의 squash나 되돌리기 요청을 실행한 것이 아니다.
- Dev 세션의 effort 이름 대응과 Cleaner 검토자의 실제 모델은 이 세션도 확인할 수 없다. 어떤 판단도 여기에 기대지 않는다.
- CRAP은 측정하지 않았다. `quality.crap.commands`가 비어 있고 이것은 통과도 차단도 아니다.
