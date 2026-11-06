# qa-done — 단위 변환

- Story: [1.2](../../stories/1.2.story.md)
- Entry: QA completion check, 첫 완료 점검
- Reviewer and time: Quinn(QA 하위 세션, 모델 `claude-opus-5-5`, effort `max`, 둘 다 시스템이 알려 준 값), `*run-story 1.2 1.3 remote to Done` run의 역할 작업, 회차 2와 다른 새 세션. 2026-11-06, 점검 실행 16:52 ~ 17:00 +0900, 기록 작성 17:01 +0900부터. 점검은 이 세션이 직접 실행했다.
- Reviewed inputs: 브랜치 `story/1.2`, HEAD fc4b3cd(Dev의 기록 커밋), 커밋하지 않은 변경 없음, 기준 `main` 40e1a6b. 회차 2가 검토한 head는 546c2d0이다.

## 결과

`tasks/local-story-done.md`의 완료 조건을 모두 현재 파일과 실행 결과로 확인했고 Status를 Review에서 Done으로 바꾼다. 앞선 기록의 서술은 근거로 삼지 않고 대조 대상으로 읽었다.

끝까지 읽은 입력은 QA 페르소나, `tasks/load-project-rules.md`, `tasks/local-story-done.md`, `tasks/qa-gate.md`, `tasks/apply-qa-fixes.md`, `tasks/verify-delivery.md`, `data/local-git-workflow.md`, `data/story-paths.md`, `data/finding-classification.md`, `data/future-work-planning.md`, `data/verification-ownership.md`, `data/development-quality.md`, `data/workflow-routing.md`, `data/agent-context.md`, `checklists/comment-hygiene-checklist.md`, 설정, Hub와 Common, JavaScript 색인, QA의 규칙 종류에 드는 본문 전부(golden-rules, coding-principles, comments, documentation, testing-tdd, crap, javascript-language, javascript-crap), Story, gate, qa-r2, dev-qa-r2, `src/units.js`, `test/units.test.js`, `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`, `docs/planning/future-work.md`, `README.md`, `.github/workflows/ci.yml`이다. `tasks/run-story.md`, `tasks/publish-story.md`, `tasks/local-story-merge.md`, `tasks/develop-story.md`, `tasks/review-story.md`는 이 작업에 닿는 절만 읽었다.

## 조건별 확인

| 완료 조건 | 확인한 것 | 결과 |
| --- | --- | --- |
| Status가 Review | Story의 Status 섹션, `check-done.sh` | 맞다 |
| 실제 LLM QA 검토가 현재 구현과 입력을 덮음 | gate 회차 2의 `head_commit` 546c2d0과 HEAD 사이에 바뀐 경로는 gate, Story, qa-r2, dev-qa-r2뿐이다. Story를 섹션으로 나눠 비교하면 Status, Story, Scope and Dependencies, Acceptance Criteria, Tasks / Subtasks, Dev Notes(Testing 포함), SM Draft Checklist, PO Validation이 두 커밋에서 같고, c1160ee 대비 차이는 더한 줄뿐이며 지운 줄이 없다. `src/units.js`, `test/units.test.js`는 작업 트리, HEAD, 546c2d0에서 같은 객체다. 규칙 파일(`.bmad-core`, `docs/conventions`, `AGENTS.md`)은 Git이 추적하지 않아 수정 시각으로 보았고 gate의 저장 시각보다 새로운 파일이 없다 | 맞다 |
| gate가 PASS | schema 2, `gate: "PASS"`, `round: 2`, `waiver: { active: false }`, `check-gate.sh` 종료 상태 0 | 맞다 |
| 활성 Required, Recommended 지적 없음 | `top_issues`는 Optional TEST-003 하나다. REL-001, TEST-001, TEST-002, DOC-001, DOC-002는 `resolved_issues`에 있고 그 수정 커밋 9ede139, 3009f33, f66d51f가 Git에 있다 | 맞다 |
| Task와 수정 단위 완료 | Tasks / Subtasks와 Dev Agent Record에 열린 체크박스가 없다. Completion Notes의 1.1, 2.1, 3.1, 3.2, 3.3 커밋 53267c9, 18a58c5, 9ede139, 3009f33, f66d51f의 제목이 각 단위와 맞다 | 맞다 |
| 필수 점검 완료 | 아래 표. 시나리오 17개 가운데 자동 점검은 이번에 다시 실행했고, 판단 점검 둘은 아래 표대로 다시 확인했다 | 맞다 |
| File List 완전 | `git diff --name-status 40e1a6b...HEAD`의 19개 경로 가운데 Dev의 경로 12개와 File List의 파일 12개가 같다. 나머지 일곱은 sm-1, sm-2, po-r1, po-r2와 QA의 gate, qa-r1, qa-r2다 | 맞다 |
| 주석 위생 | gate의 `comment_hygiene.status`가 PASS이고, 위생 입력과 규칙 본문이 회차 2 뒤 바뀌지 않았으며, 후보 검색을 다시 실행해 모두 일치가 없다. 두 파일의 주석과 시험 이름을 끝까지 읽었다. 원장은 비어 있고 표시가 없다 | 맞다 |
| 기록만의 인계 | QA Results에 File List나 실행 기록의 수리 요청이 없고 File List에 빠진 파일이 없다. Dev의 기록 커밋은 아래 "Dev 기록 커밋의 대조"대로 맞다 | 끝남 |
| 사용자 허락이 Done을 덮음 | 저장된 실행 요청 줄은 PO Validation에 하나이고 단계는 `through Done`이며 단어 `remote`가 있다. Scope and Dependencies에 저장된 사용자 결정 원문에 "QA gate가 PASS면 Done으로 바꾸는 것을 허락합니다"가 있고, 이 작업의 지시가 같은 글을 전달했다 | 맞다 |
| Optional과 future의 처리 결정 | TEST-003, DEV-2, DEV-3의 마지막 처리 줄이 `future`이고, 지적과 출처, 적용하지 않는 까닭, 필요한 일을 적은 future 기록이 Completion Notes에 있다. 실행 요청이 이 기록을 맡기며(`tasks/run-story.md` 섹션 Inputs and authorization), 바뀌지 않은 결정이어서 다시 묻지 않는다. DEV-1은 앞선 `future`를 `fix`가 대신했고 REL-001과 같은 입력으로 닫혔다 | 맞다 |
| 설치된 BMAD 원본의 변경 | 이 Story의 변경 경로에 없고 수정 시각도 run의 Story 1.2 작업 전이어서 `tasks/sync-bmad-commands.md`를 적용할 일이 없다 | 할 일 없음 |

## 실행한 점검

Node.js v24.22.1, Git 2.51.0, 프로젝트 루트, HEAD fc4b3cd, Status Review에서 실행했다. 제품 파일과 추적 파일을 바꾸지 않았고, 스크립트, 출력, 사본은 프로젝트 임시 영역에 두었다.

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| Status 변경 전 감사 | `sh .bmad-core/utils/checks/check-done.sh docs/stories/1.2.story.md` | 종료 상태 0, 출력 없음 |
| gate와 Story | `check-gate.sh docs/qa/gates/1.2.yml docs/stories/1.2.story.md` | 종료 상태 0 |
| 기록 문서 | `check-stage.sh records docs/stories/1.2.story.md` | 종료 상태 0 |
| 저장 줄 | `check-stage.sh qa-record`, `check-stage.sh po-record` | 종료 상태 0. 회차 2의 PASS와 PO 2회차의 GO, `complete`를 출력 |
| future-work 파일 | `check-stage.sh future --story 1.2` | 종료 상태 0, 출력 없음 |
| 지침 | `check-instructions.sh` | 종료 상태 0 |
| 병합 상태 | `check-merge.sh unmerged main`, `check-merge.sh pending main` | 종료 상태 0, 목록 없음 |
| 전체 시험 | `node --test` | 55개 통과, 실패 0(단위 변환 20, 기존 35) |
| CI의 둘째 명령 | `node ci/screen-rule.check.mjs` | 종료 상태 0. `src/screen.js`가 없어 판정하지 않는 명령이고 Story의 필수 점검이 아니다 |
| 1.2-INSP-001 | Story의 "가져오기 검색" 명령을 `src/units.js`에 실행 | 일치 없음, 종료 상태 1 |
| 1.2-INSP-002 | `src/units.js`를 끝까지 읽음 | 가져오기, 입출력, 전역 접근이 없다. 모듈 변수는 크기 표, 상수, `UNITS`이고 선언 뒤 바뀌지 않는다. 단위는 AC 1의 14개뿐이고 별칭이 없다 |
| 1.2-INSP-003 | 두 파일을 `docs/architecture.md`의 기술 구성, 소스 트리, 설계 원칙, 결정 D-2, `README.md`와 다시 대조 | 어긋난 곳이 없다. 시험이 가져오는 `node:test`, `node:assert/strict`, `node:util`은 내장 모듈이다. 단위 값과 온도 식이 D-2와 같고 고칠 문서가 없다 |
| 1.2-UNIT-014 | 기존 35개와 `git diff --quiet 40e1a6b -- src/engine.js src/number-format.js test/engine.test.js test/number-format.test.js` | 통과, 종료 상태 0 |
| 주석 위생 후보 | 체크리스트 §1.1, §1.2(QA 접두, 이 Story에 선언된 ID), §1.3, §1.4, §1.7, 작업 태그, 비ASCII, 탭, `var` 검색을 `src/units.js`, `test/units.test.js`에, `eval`과 입출력 검색을 `src/units.js`에, §1.1 검색을 `src`, `test` 전체에 | 모두 일치 없음, 종료 상태 1 |
| 검토 뒤 변경 | `git diff --name-status 546c2d0 HEAD`, `git diff --quiet 546c2d0 HEAD -- src test package.json README.md docs/prd.md docs/architecture.md docs/planning ci .github` | 경로 넷(gate, Story, qa-r2, dev-qa-r2), 종료 상태 0 |
| Story 섹션 비교 | 546c2d0과 c1160ee의 Story를 HEAD와 섹션별로 비교 | 위 "조건별 확인"의 결과. Dev의 커밋이 더한 줄은 Change Log 1행, Agent Identity 1문단, Debug Log References 1행, Completion Notes의 항목과 처리 줄, File List 1행이다 |
| 인용된 이름 | Story, gate, 기록 문서의 16진수 낱말 50개를 `git cat-file`로 확인 | 27개가 Git 객체다. 없는 23개는 배정밀도 값의 조각 12개와, PO, SM, Dev가 적은 커밋 전 초안과 작업 파일의 내용 값 11개다. 커밋을 가리키는 이름은 모두 있다 |

이어 쓴 결과: 표 대조(기대 호출 643개), 값 행 289호출, 유리수 오라클 28만 호출, 범위 끝 쓸기 10425호출, 변이 91개, 절대 영도 경계, 적대 입력 17개는 회차 2가 546c2d0의 두 파일과 같은 Testing, 같은 Node.js로 실행했다. 그 뒤 이 입력은 바뀌지 않았고, 이 점검들은 Dev의 기록을 읽지 않는다.

## Dev 기록 커밋의 대조

커밋 388b401은 Story의 Dev 기록과 Change Log와 새 dev-qa-r2를 담고, fc4b3cd는 dev-qa-r2의 끝 시각만 고친다. 회차 2 뒤의 입력이므로 전달된 두 파일의 사본에서 Dev가 적은 값을 직접 다시 냈다. 모두 기록과 같다.

| 기록 | 점검 | 결과 |
| --- | --- | --- |
| TEST-003 변이 | `convertTo`를 `(value / target.size) * size`로 바꾼 사본에서 `node --test test/units.test.js` | 20개 통과. 전달된 모듈도 20개 통과 |
| TEST-003 값 | 두 모듈에서 `convert(1e307, "mm", "cm")`, `convert(1e306, "cm", "mm")` | 전달은 1e+306, 1e+307이고 변이는 둘 다 `Infinity` |
| TEST-003의 행 둘 | 행의 모든 쌍을 상대 오차 1e-12로 비교 | 전달은 틀린 쌍 0. 변이는 첫 행에서 `mm→cm`, `cm→mm`, 둘째 행에서 `mm→cm`, `mm→in`, `mm→ft`, `cm→mm`, `cm→in`, `in→mm`, `in→cm`, `ft→mm` |
| DEV-2 사본 | 같은 단위 반환을 지운 사본에서 `node --test test/units.test.js` | 20개 통과 |
| DEV-2 값 | 그 사본에서 `convert(1e-20, "K", "K")`, `convert(0.0015, "F", "F")`, `convert(0.1, "K", "K")`, `convert(1e308, "km", "km")` | 0, 0.0015000000000036096, 0.10000000000002274, 1e+308. 전달된 모듈은 입력 그대로다 |
| DEV-3 값 | 입력의 정확한 이진 값과 D-2, SI 접두어의 유리수로 참값을 구해 가장 큰 double과 비교 | `convert(1.2394657852469996e306, "MPa", "psi")`는 0.244 ulp 아래인데 `Infinity`, `convert(4.566140562550282e303, "km", "in")`는 0.067 ulp 위인데 `Infinity`, `convert(5.479368675060339e307, "m", "ft")`는 1.454 ulp 위인데 `1.7976931348623157e+308` |
| 기록의 꼴 | dev-qa-r2에 줄 번호 위치와 임시 경로 검색 | 일치 없음, 종료 상태 1 |

세 항목은 전달된 코드의 잘못된 결과가 아니다. TEST-003은 틀린 변형을 시험이 잡지 못하는 틈이고, DEV-2와 DEV-3은 수용된 문서가 정하지 않은 경계로 PO1-N4와 PO1-N1을 정할 때 함께 정할 일이다. 회차 2의 분류를 뒤집을 새 사실이 없고 현재 의무를 가리지 않는다. 기록만의 변경이어서 새 회차를 부르지 않는다.

## 병합 위험 판단

저장 줄의 값은 `revertible`이다. 이 Story의 squash 커밋을 되돌리면 그 효과가 없어진다고 판단한 근거는 다음과 같다.

- 바꾼 범위: `git diff --name-status main...HEAD`의 19개 경로가 모두 추가이고 수정과 삭제가 없다. 제품 1개, 시험 1개, Story 1개, gate 1개, 기록 문서 15개이며, 이 완료 점검이 기록 문서 하나를 더한다. 기준 `main`이 곧 갈라진 지점 40e1a6b다.
- 바꾸지 않은 범위: `package.json`, `.github`, `ci`, `README.md`, `docs/prd.md`, `docs/architecture.md`, `docs/planning`, `src/engine.js`, `src/number-format.js`, `test/engine.test.js`, `test/number-format.test.js`. `git diff --quiet`가 종료 상태 0이다.
- 부작용: `src/units.js`는 가져오는 모듈과 입출력이 없는 순수 함수이고, 데이터 이전과 제품의 외부 부작용이 없다.
- 쓰는 코드: 문서와 두 파일 밖에서 `units.js`, `convert(`, `ConversionError`, `units(`를 `git grep`으로 찾아 일치가 없다. `docs/prd.md`에서 Story 1.3은 Story 1.1에만 기대고, `docs/architecture.md`는 `src/screen.js`가 `src/engine.js`와 `src/number-format.js`만 가져다 쓴다고 정한다.
- 되돌린 뒤의 상태: 기준 커밋 40e1a6b의 트리 복사본에서 `node --test`가 35개 통과하고 `src`와 `test`에 이 Story의 파일이 없다.

되돌려도 남는 것을 판단에 넣었다. Story 시작이 호스팅 서비스에 만든 이슈 #6과 게시가 열 요청은 서비스의 기록으로 남고, 병합의 `Closes` 줄이 닫은 이슈를 되돌리기가 다시 열지 않는다. 트래커는 Story를 잇는 기록일 뿐 제품과 데이터에 닿지 않아(`data/future-work-planning.md`의 "a remote tracker only links") 이 값을 바꾸지 않고, 저장 줄의 범위에 적었다. 병합 뒤 PO 점검의 `Docs` 커밋과 보관 ref도 별도의 계획 기록이어서 squash 커밋의 되돌리기와 무관하다.

## 전달 점검

`docs/prd.md`, `docs/architecture.md`, Story의 Testing에 배포나 환경의 의무가 없어, 완료 뒤 `tasks/verify-delivery.md`로 이어 갈 일이 없다. `.github/workflows/ci.yml`은 요청에서 `node --test`와 `node ci/screen-rule.check.mjs`를 실행하며 두 명령을 위 표대로 로컬에서 실행했다. 호스팅 서비스의 CI 결과는 게시와 서버 병합의 단계가 읽는 것이고, 이 작업은 네트워크를 쓰지 않아 읽지 않았다.

## 임시 자료 대조

이어가기 로그의 run과 이 Story 섹션이 적은 임시 경로를 뽑아 프로젝트 임시 영역의 실제 파일과 양쪽으로 대조했다. 경로는 로그에만 둔다. 아무것도 지우지 않았다.

- 로그가 적은 경로 가운데 대조 때 없던 것은 메인 세션이 지웠다고 로그에 적은 스냅샷 아홉과, 이 작업이 그 뒤에 만드는 보고 파일과 커밋 메시지 파일과 출력뿐이다.
- 항목의 설명도 맞다. Cleaner 검토자의 파일은 세 폴더에 각각 18개, 35개, 123개이고, Dev의 처리 기록 폴더에 사본 다섯과 출력이 있으며, QA 회차 1, 2의 출력과 사본이 적힌 대로 있다.
- 항목이 덮지 않던 실제 파일은 넷이었다. 모두 Dev의 일회용 파일이다(커밋 546c2d0과 fc4b3cd의 메시지 파일, 로그 글 조각, 커밋 546c2d0의 Story 갱신 스크립트). 내용으로 소유자를 확인했고 병합 뒤 정리가 찾도록 로그에 더했다.
- 항목이 덮지 않는 나머지 다섯은 방법론과 규약의 설치 도구가 2026-11-06 09:00에 남긴 갱신 자료로, 이 run보다 이르고 Story의 자료가 아니다. 지우지 않고 보고한다.
- 남은 쓰임: 일회용 자료의 QA 쓰임은 이 완료 점검으로 끝나고, 다시 열기가 생기면 다시 읽을 수 있다. 병합이 확인된 뒤의 정리가 일회용 자료를 지운다.

## 처리 결정과 남은 기록

- TEST-003(Optional, 계약 안), DEV-2, DEV-3: 처리 `future`. 병합 뒤 PO 점검이 future-work 항목으로 옮긴다.
- PO1-N1 ~ PO1-N7, PO2-N1: Story가 적용하지 않은 PO의 비차단 지적이고 PO Validation에 있다. 병합 뒤 PO 점검이 옮긴다.
- 새 파일의 저작권과 SPDX 값, `ConversionError`의 `name`, CRAP 측정: 기존 future-work 항목 "[Tech-Debt] 새 파일의 저작권과 SPDX 값", "[Tech-Debt] CalculationError의 name", "[Tech-Debt] CRAP 측정 경로"가 이 Story의 파일까지 이미 든다.
- 계획: `docs/planning/future-work.md`의 17개 항목이 모두 `unplanned`이고 `undecided`가 없으며, `check-stage.sh future --story 1.2`가 종료 상태 0이다. 계획을 기다리는 항목이 없어 다음 Story를 막지 않는다.

## 다음 행동

Story는 Done이고, 이 작업은 push, fetch, 요청을 하지 않았다. 다음은 메인 세션이 별도의 Dev 작업으로 시작하는 게시(`tasks/publish-story.md`)로, Done 커밋의 push, upstream, 이슈 #6, ready 요청이다. 병합은 이 호출에 없어 사용자의 지시나 `to` 낱말 없는 `remote` 호출을 기다린다(`tasks/local-story-merge.md` 섹션 Server merge). 그다음은 PO의 병합 뒤 점검(`data/future-work-planning.md`)과 임시 자료 정리다. 완료 점검은 끝난 일이며 새 개발 요청이 아니다.

## 한계

- 변이, 오라클, 쓸기는 표본이고 이번에 다시 실행하지 않았다. 변이 도구와 속성 점검 도구는 설정되어 있지 않다.
- 규칙 파일의 불변은 Git이 아니라 수정 시각과 `check-instructions.sh`로 보았다.
- 호스팅 서비스를 읽지 않았고, `main`과 `origin/main`은 로컬 ref의 값만 보았다. 이슈 #6의 서비스 상태는 Dev의 기록으로만 안다.
- Dev 세션의 effort 이름 대응과 Cleaner 검토자의 실제 모델은 이 세션도 확인할 수 없다. 어떤 판단도 여기에 기대지 않는다.
- CRAP은 측정하지 않았다. `quality.crap.commands`가 비어 있고 이것은 통과도 차단도 아니다.
