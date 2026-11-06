# qa-done — 계산 엔진

- Story: [1.1](../../stories/1.1.story.md)
- Entry: QA completion check, 첫 완료 점검
- Reviewer and time: Quinn(QA 하위 세션, 모델 `claude-opus-5-5`, effort `max`, 둘 다 시스템이 알려 준 값), `*run-story 1.1` run의 역할 작업, 회차 3과 다른 새 세션. 2026-11-06, 점검 실행 11:57 ~ 12:02 +0900, 기록 작성 12:02 +0900부터. 점검은 이 세션이 직접 실행했다.
- Reviewed inputs: 브랜치 `story/1.1`, HEAD 3f20eac(회차 3의 기록 커밋), 커밋하지 않은 변경 없음, 기준 `main` 862f5fd. 회차 3이 검토한 head는 0b806b3이다.

## 결과

`tasks/local-story-done.md`의 완료 조건을 모두 현재 파일과 실행 결과로 확인했고 Status를 Review에서 Done으로 바꾼다. 앞선 기록의 서술은 근거로 삼지 않고 대조 대상으로 읽었다.

끝까지 읽은 입력은 QA 페르소나, `tasks/load-project-rules.md`, `tasks/local-story-done.md`, `tasks/qa-gate.md`, `data/local-git-workflow.md`, `data/story-paths.md`, `data/finding-classification.md`, `data/future-work-planning.md`, `tasks/apply-qa-fixes.md`, `tasks/verify-delivery.md`, 설정, Hub와 Common, JavaScript 색인, QA의 규칙 종류에 드는 본문 전부(golden-rules, coding-principles, comments, documentation, testing-tdd, crap, javascript-language, javascript-crap), Story, gate, qa-r3, `src/engine.js`, `test/engine.test.js`, `docs/prd.md`, `docs/architecture.md`다.

## 조건별 확인

| 완료 조건 | 확인한 것 | 결과 |
| --- | --- | --- |
| Status가 Review | Story의 Status 섹션, `check-done.sh` | 맞다 |
| 실제 LLM QA 검토가 현재 구현과 입력을 덮음 | gate 회차 3의 `head_commit` 0b806b3와 HEAD 사이에 바뀐 경로는 gate, Story, qa-r3뿐이다. Story의 Status와 QA Results 밖 줄은 두 커밋에서 같고(`story-rules.awk`의 `rest` 출력을 `cmp`로 비교), 0b806b3의 QA Results는 HEAD의 QA Results의 앞부분 그대로다. `src/engine.js`, `test/engine.test.js`는 작업 트리, HEAD, 0b806b3에서 같은 객체다. 규칙 파일(`.bmad-core`, `docs/conventions`, `AGENTS.md`)은 Git이 추적하지 않아 수정 시각으로 보았고 gate보다 새로운 파일이 없다 | 맞다 |
| gate가 PASS | schema 2, `gate: "PASS"`, `round: 3`, `waiver: { active: false }`, `check-gate.sh` 종료 상태 0 | 맞다 |
| 활성 Required, Recommended 지적 없음 | `top_issues`는 Optional MNT-001 하나다. TEST-001, TEST-002, TEST-003, DOC-001은 `resolved_issues`에 있고 그 수정 커밋 6b57dfb, 3cb70d4, 470678f가 Git에 있다 | 맞다 |
| Task와 수정 단위 완료 | Tasks / Subtasks와 Dev Agent Record에 열린 체크박스가 없다. Completion Notes의 1.1, 2.1, 3.1, 3.2, 4.1 커밋 d49a11f, ec1900b, 6b57dfb, 3cb70d4, 470678f의 제목이 각 단위와 맞다 | 맞다 |
| 필수 점검 완료 | 아래 표. 시나리오 20개 가운데 자동 점검은 이번에 다시 실행했고, 판단 점검 셋은 아래 표대로 다시 확인했다 | 맞다 |
| File List 완전 | Dev의 단위 커밋과 Review 전환 커밋이 바꾼 경로 13개와 File List의 파일 13개가 같다. 시작 커밋 d409028이 함께 담은 sm-1, po-r1은 SM과 PO의 기록이고, gate와 qa-r1 ~ qa-r3은 QA의 기록이다 | 맞다 |
| 주석 위생 | gate의 `comment_hygiene.status`가 PASS이고, 후보 검색을 다시 실행해 모두 일치가 없다. 두 파일의 주석과 시험 이름을 끝까지 읽었다. 원장은 비어 있고 표시가 없다 | 맞다 |
| 기록만의 인계 | QA Results에 File List나 실행 기록의 수리 요청이 없고, File List에 빠진 파일이 없다 | 할 일 없음 |
| 사용자 허락이 Done을 덮음 | 저장된 실행 요청 줄은 PO Validation에 하나이고 단계는 `through Merged`이며, 본문에 "QA gate가 PASS면 Done으로 바꾸는 것을 허락합니다"가 있다. 이 호출에는 `remote`가 없다 | 맞다 |
| Optional과 future의 처리 결정 | MNT-001과 DEV-1의 마지막 처리 줄이 `future`이고, 지적과 출처, 적용하지 않는 까닭, 필요한 일을 적은 future 기록이 Completion Notes에 있다. 실행 요청이 이 기록을 맡기며, 바뀌지 않은 결정이어서 다시 묻지 않는다 | 맞다 |
| 설치된 BMAD 원본의 변경 | 이 Story의 변경 경로에 없고 수정 시각도 그대로여서 `tasks/sync-bmad-commands.md`를 적용할 일이 없다 | 할 일 없음 |

## 실행한 점검

Node.js v24.22.1, Git 2.51.0, 프로젝트 루트, HEAD 3f20eac, Status Review에서 실행했다. 제품 파일과 추적 파일을 바꾸지 않았고, 스크립트와 출력은 프로젝트 임시 영역에 두었다.

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| Status 변경 전 감사 | `sh .bmad-core/utils/checks/check-done.sh docs/stories/1.1.story.md` | 종료 상태 0, 출력 없음 |
| gate와 Story | `check-gate.sh docs/qa/gates/1.1.yml docs/stories/1.1.story.md` | 종료 상태 0 |
| 기록 문서 | `check-stage.sh records docs/stories/1.1.story.md` | 종료 상태 0 |
| 저장 줄 | `check-stage.sh qa-record`, `check-stage.sh po-record` | 종료 상태 0. 회차 3의 PASS와 PO 1회차의 GO, `complete`를 출력 |
| 지침 | `check-instructions.sh` | 종료 상태 0 |
| 전체 시험 | `node --test` | 35개 통과, 실패 0 |
| CI의 둘째 명령 | `node ci/screen-rule.check.mjs` | 종료 상태 0. `src/screen.js`가 없어 판정하지 않는 명령이고 Story의 필수 점검이 아니다 |
| 1.1-INSP-001 | 계획된 `grep` 명령 | 일치 없음, 종료 상태 1 |
| 1.1-INSP-002 | `src/engine.js`를 끝까지 읽음 | 가져오기, 입출력, 전역 접근, 모듈 변수가 없고 호출마다 새 `Parser`를 만들며, 내보내기는 `CalculationError`와 `evaluate`뿐이다 |
| 1.1-INSP-003 | 대표식의 메시지를 다시 냄 | "division by zero at position 2", "unclosed parenthesis at position 0", "unexpected character at position 2", "unexpected end of expression at position 0", "result out of range at position 315". 모두 `CalculationError`이고 까닭이 사람의 말이며 추적 번호가 없다 |
| 1.1-INSP-004 | 두 파일을 `docs/architecture.md`의 기술 구성, 소스 트리, 설계 원칙과 다시 대조 | 어긋난 곳이 없다. 문서와 코드가 앞 회차와 같다 |
| 1.1-UNIT-016 | `git diff 862f5fd --quiet -- src/number-format.js test/number-format.test.js` | 종료 상태 0 |
| 표 대조 | QA 1회차의 표 대조 스크립트를 현재 파일로 다시 실행 | Story 표 116행. 표 밖 결과 0행, 전달 시험이 닿지 않는 행 0행 |
| 주석 위생 후보 | 체크리스트 §1.1, §1.2, §1.3, §1.4, §1.7, 작업 태그, 비ASCII 검색을 `src/engine.js`, `test/engine.test.js`에, §1.1 검색을 `src` 전체에 | 모두 일치 없음, 종료 상태 1 |
| 검토 뒤 변경 | `git diff --name-status 0b806b3 HEAD`, `git diff --quiet 0b806b3 HEAD -- src test package.json README.md docs/architecture.md docs/prd.md docs/planning ci .github` | 경로 셋(gate, Story, qa-r3), 종료 상태 0 |
| 인용된 커밋 | Story, gate, qa-r3의 16진수 낱말을 모두 `git cat-file`로 확인 | 커밋과 객체가 모두 있다. 없는 것은 시험 값과 PO 1회차가 적은 커밋 전 초안의 내용 값뿐이다 |

이어 쓴 결과: 변이 86개는 회차 2에 a9b841d의 두 파일로, 독립 오라클과 깊은 중첩 측정은 회차 1에 50347a4의 `src/engine.js`로 실행했다. 그 뒤 해당 파일은 바뀌지 않았고 이 점검들은 기록을 읽지 않는다.

## 병합 위험 판단

저장 줄의 값은 `revertible`이다. 이 Story의 squash 커밋을 되돌리면 그 효과가 모두 없어진다고 판단한 근거는 다음과 같다.

- 바꾼 범위: `git diff --name-status main...HEAD`의 19개 경로가 모두 추가이고 수정과 삭제가 없다. 제품 1개, 시험 1개, Story 1개, gate 1개, 기록 문서 15개이며, 이 완료 점검이 기록 문서 하나를 더한다.
- 바꾸지 않은 범위: `package.json`, `.github`, `ci`, `README.md`, `docs/prd.md`, `docs/architecture.md`, `docs/planning`, `src/number-format.js`, `test/number-format.test.js`.
- 부작용: `src/engine.js`는 가져오는 모듈과 입출력이 없는 순수 함수이고, 데이터 이전과 외부 부작용이 없다. 이 호출은 원격을 바꾸지 않았고 Story에는 이슈 번호를 적은 줄이 없다.
- 쓰는 코드: `git grep engine`을 `src/number-format.js`, `test/number-format.test.js`, `ci`, `.github`, `package.json`, `README.md`에 실행해 일치가 없다.
- 되돌린 뒤의 상태: 기준 커밋 862f5fd의 트리 복사본에서 `node --test`가 4개 통과한다.

이 판단은 이 Story의 squash 커밋만 되돌리는 경우에 대한 것이다. `docs/prd.md`에서 Story 1.3은 Story 1.1에 기대므로, 1.3이 병합된 뒤의 되돌리기는 그 Story의 코드까지 함께 보아야 한다. Story 1.3은 아직 Story 파일이 없다.

## 전달 점검

`docs/prd.md`, `docs/architecture.md`, Story의 Testing에 배포나 환경의 의무가 없어, 완료 뒤 `tasks/verify-delivery.md`로 이어 갈 일이 없다. `.github/workflows/ci.yml`은 요청에서 `node --test`와 `node ci/screen-rule.check.mjs`를 실행하며 두 명령을 위 표대로 로컬에서 실행했다. 호스팅 서비스의 CI 결과는 게시와 서버 병합의 단계가 읽는 것이고, 이 호출에는 `remote`가 없어 읽지 않았다.

## 임시 자료 대조

이어가기 로그의 Story 1.1 섹션이 적은 임시 경로를 모두 뽑아 실제 파일과 양쪽으로 대조했다. 경로는 로그에만 둔다. 아무것도 지우지 않았다.

- 로그가 적은 항목 가운데 대조 때 없던 것은 메인 세션이 지웠다고 로그에 적은 스냅샷 일곱과, 이 작업이 끝날 때 만드는 보고 파일과 커밋 뒤 출력뿐이다.
- 항목의 설명도 맞다. Cleaner 검토자의 파일은 두 폴더에 각각 42개와 35개이고, Dev의 저장 출력은 텍스트 파일 61개이며, QA 회차 1, 2, 3의 출력과 사본이 적힌 대로 있다.
- 이 Story의 항목이 덮지 않는 실제 파일은 다섯이다. 모두 방법론과 규약의 설치 도구가 2026-11-06 09:00에 남긴 갱신 자료로, 이 run의 시작인 09:11보다 이르고 Story의 자료가 아니다. 지우지 않고 보고한다.
- 남은 쓰임: 일회용 자료의 QA 쓰임은 이 완료 점검으로 끝나고, 다시 열기가 생기면 다시 읽을 수 있다. 병합이 확인된 뒤의 정리가 일회용 자료를 지운다.

## 처리 결정과 남은 기록

- MNT-001(Optional, 계약 밖)과 DEV-1(CRAP 측정 제안): 처리 `future`. 병합 뒤 PO 점검이 future-work 항목으로 옮긴다.
- PO1-N1 ~ PO1-N11: Story가 적용하지 않은 PO의 비차단 지적이고 PO Validation에 있다. 병합 뒤 PO 점검이 옮긴다.
- 새 파일의 저작권과 SPDX 값: 지적이 아닌 리드다. 프로젝트에 값이 없어 CC-CMT-001대로 비어 있고 소유자는 프로젝트 소유자다. 병합 뒤 PO 점검이 옮기는 기록에 없어 메인 세션의 최종 보고가 이름을 댄다.
- 계획: `docs/planning/future-work.md`에 `undecided` 항목이 없고 두 항목 모두 `unplanned`다. `check-stage.sh future --story 1.1`은 종료 상태 0이고, 항목 "결과 복사"의 재검토 날짜 2026-10-15가 지났다는 알림을 낸다. PO가 다시 분류할 항목이며 이 Story를 막지 않는다.

## 다음 행동

이 호출에 `remote`가 없어 Story는 Done에서 멈추고, push와 병합을 하지 않았다. 다음은 `*run-story 1.1 remote`이며, Dev가 Done 커밋을 게시하고(`tasks/publish-story.md`) 서비스에서 squash 병합한 뒤(`tasks/local-story-merge.md` 섹션 Server merge) 병합을 확인한다. 그다음은 PO의 병합 뒤 점검(`data/future-work-planning.md`)과 임시 자료 정리다. 완료 점검은 끝난 일이며 새 개발 요청이 아니다.

## 한계

- 변이와 독립 오라클은 표본이고, 이번에 다시 실행하지 않았다. 변이 도구와 속성 점검 도구는 설정되어 있지 않다.
- 규칙 파일의 불변은 Git이 아니라 수정 시각과 `check-instructions.sh`로 보았다.
- 호스팅 서비스를 읽지 않았고, `main`과 `origin/main`은 로컬 ref의 값만 보았다.
- Dev 세션의 effort 이름 대응과 Cleaner 검토자의 실제 모델은 이 세션도 확인할 수 없다. 어떤 판단도 여기에 기대지 않는다.
- CRAP은 측정하지 않았다. `quality.crap.commands`가 비어 있고 이것은 통과도 차단도 아니다.
