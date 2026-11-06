# dev-qa-r2 — QA 2회차 지적의 분석과 결정 목록, 수정 계획

- Story: [1.3](../../stories/1.3.story.md)
- Entry: Dev `review-qa`(`tasks/apply-qa-fixes.md`)의 QA 라운드 2(다시 열기, gate FAIL) 분석과 결정 목록, 수정 계획
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.2 1.3 remote` run의 역할 작업. effort는 시스템이 숫자 30으로만 알려 주어 설정의 이름(`xhigh`)과의 대응을 확인하지 못했다
- 시각: 2026-11-06, 시작 21:40 +0900, 분석과 결정 21:40 ~ 21:50 +0900
- 입력 기준: 브랜치 `story/1.3`, 시작 HEAD `e71238d`, 작업 트리 깨끗, Status InProgress. 입력은 gate `docs/qa/gates/1.3.yml`(라운드 2, FAIL), Story의 QA Results와 Dev Agent Record와 PO Validation 2회, 기록 문서 qa-r2, sm-2, po-r2이다. 별도 평가 문서와 추가 검토는 없다(QA Results와 qa-r2가 추가 검토자가 없다고 적는다). 이 기록을 저장할 때 HEAD는 `12da9b3`(`Story Base` 병합 커밋, 아래 "수정 순서")이고 작업 트리에는 단위 3.1의 `src/screen.js` 값 변경이 커밋 전으로 있다

## 읽은 규칙과 절차

`tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문(Dev의 규칙 종류 `operations`, `design`, `documentation`과 Story의 Convention Sections): `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`, 그리고 CRAP 본문과 같이 읽는 `javascript-crap`. 완료 점검 단계에서만 읽는 `comments`와 `crap`도 읽었다. 읽지 않은 본문: `coding-principles`(`quality` 종류, Cleaner 검토자가 읽는다).
- 절차: `agents/dev.md`, `project-map.md`, `core-config.yaml`, `tasks/apply-qa-fixes.md`와 하위 작업 collect, extract, implement, validate, `tasks/reopen-story.md`, `tasks/develop-story.md`, `tasks/local-task-done.md`, `tasks/local-story-review.md`, `tasks/architecture-align.md`, `data/agent-context.md`, `data/development-quality.md`, `data/finding-classification.md`, `data/defect-diagnosis.md`, `data/verification-ownership.md`, `data/story-paths.md`, `data/future-work-planning.md`, `data/workflow-routing.md`의 Story temporary material, `data/domain-language.md`, `data/local-git-workflow.md`(Development branches, Commit messages and evidence, Base branch moved, Story integration, In a run), `Installer.md`의 Host versions, `checklists/story-dod-checklist.md`, `checklists/comment-hygiene-checklist.md`. 설정된 용어집 `docs/domain-glossary.md`는 없어 불러오지 않았고 수용된 문서의 뜻을 썼다.

## 처리 결정의 권한

- Required와 Recommended 지적의 수정은 실행 요청이 결정으로 준다(`tasks/apply-qa-fixes.md` CP-4). Story의 QA Results 회차 2 항목에 저장된 실행 요청 줄은 단계 `through Merged`와 단어 `remote`이고, 사용자 결정 원문은 "Story를 48로 (Recommended)"다. 요구사항과 범위의 변경, 면제는 이 요청이 주지 않는다. 이 라운드에 `contract`나 `pending`으로 분류된 지적과 면제 요청은 없고 사용자가 drop한 지적도 없다.
- `SCREEN_WIDTH`와 이 다시 열기에 대한 사용자의 결정(2026-11-06, "Story를 48로 (Recommended)")은 Story의 Scope and Dependencies "사용자의 결정(SCREEN_WIDTH)"에 원문이 있다.
- Optional 지적은 값어치 있고 수용된 계약 안이면 Dev가 적용한다(`apply-qa-fixes.md` CP-4, `data/finding-classification.md` 7단계). 그 선택이 해당 지적의 처리 결정이고 이유는 아래 분석에 적었다.
- 이 Story의 계획(AC, Task, Dev Notes, Testing)은 SM의 것이고 Dev는 고치지 않는다. 계획이 Dev의 수정에 필요한 만큼 이미 있고(SM 수정 c1a9468, PO 재검증 GO e71238d) 더 필요한 계획 변경은 찾지 못했다.

## 결정 목록

| ID | QA 처분 | 심각도, 확신 | 경로와 소유자 | 증거 확인 | 처리 | 줄 |
| --- | --- | --- | --- | --- | --- | --- |
| REQ-001 | required | medium, high | `rework`, Dev | 병합 커밋 뒤 트리에서 재현함 | 고침: 단위 3.1(값)과 3.2(시험) | `Treatment: REQ-001 fix` |
| REQ-002 | required | medium, high | `rework`, SM(수정), PO(재검증) | 저장된 Story를 읽어 대조함 | SM이 고쳤고 PO가 GO로 재검증함. Dev가 할 일 없음 | `Treatment: REQ-002 fix` |
| TEST-001 | optional | low, high | 계약 안, Dev | 사본에서 재현함 | Dev가 적용을 고름: 단위 3.3. 앞선 `future` 결정을 대신함 | `Treatment: TEST-001 fix` |
| DEV-1 | 지적 아님(Dev가 준 ID) | 해당 없음 | PM(PO1-N4의 소유자), 시험은 Dev | 엔진 사본에서 다시 재현함 | future 유지, 기록의 글을 계획 변경에 맞게 다시 적음 | `Treatment: DEV-1 future` |

REQ-002의 줄은 현재 Story가 이 지적을 고친다는 처분을 적으며, 고친 일을 한 역할은 SM이다. Dev는 SM의 글을 고치지 않았고 닫는 일은 QA의 몫이다.

PO Validation 2회의 비차단 지적은 아래 표가 처리한다. QA의 결정 목록과 따로 두며 `Treatment:` 줄을 받지 않는다(QA 지적이 아니다).

| 지적 | 처리 | 근거 |
| --- | --- | --- |
| PO2-N1 1.3-UNIT-011이 병합으로 들어온 파일을 덮지 않음 | 계획 글을 고치지 않는다(SM의 글). 같은 점검의 값을 Dev가 재확인할 때 기준 tip과 전체 트리를 비교해 Story의 경로만 다름을 확인한다 | 병합 커밋 뒤 `git diff d90c99e HEAD`가 든 경로는 Story의 파일뿐이고 `src/units.js`와 `test/units.test.js`를 포함한 여덟 파일은 `git diff --quiet`가 종료 상태 0이었다. 지적 자체는 PO Validation에 남아 병합 뒤 점검이 읽는다 |
| PO2-N2 QA 수정의 순서에 Independent Cleaner review의 자리가 없음 | Dev가 적용한다. 코드나 시험을 바꾸는 단위 3.1, 3.2, 3.3 각각이 `apply-qa-fixes-implement.md`와 `data/development-quality.md` 섹션 Independent Cleaner review의 검토를 받는다 | 결과는 각 단위의 기록 문서에 있다 |
| PO2-N3 저작권과 SPDX 문장이 규칙 개정보다 앞선 글임 | 적용하지 않는다(SM의 글, 계획 변경). Dev는 새 파일의 머리글을 바꾸지 않는다 | PO Validation에 남아 병합 뒤 점검이 읽는다 |
| PO2-N4 E-6의 전제 문장이 위치 규칙을 들지 않음 | 적용하지 않는다(SM의 글, 계획 변경) | PO Validation에 남아 병합 뒤 점검이 읽는다 |

## 지적별 분석

### REQ-001 필수 점검 1.3-INT-001이 기준 tip에서 실패한다

- 확인: `Story Base` 병합 커밋(`12da9b3`) 뒤 트리에서 `node ci/screen-rule.check.mjs`가 `src/screen.js must export SCREEN_WIDTH = 48, got 40`을 출력하고 종료 상태 1이다. 같은 트리에서 프로젝트 루트의 `node --test`는 68개 통과다(기존 55개, 화면 13개). QA의 관찰과 같다. 병합 커밋은 충돌 해결이 없다(`git log --remerge-diff`가 비어 있음).
- 원인: `src/screen.js`의 `SCREEN_WIDTH`가 이전 수용 결정의 값 40이고 기준 tip의 CI 규칙은 값 48을 요구한다. 원인은 상수 하나의 값이다(`data/defect-diagnosis.md` 1 ~ 3단계, 하나뿐인 설명이고 한 요인만 바꾸어 확인한다).
- 분류: QA의 분류(Required, 늦은 지적, `rework`, 소유자 Dev)에 동의한다. 회차 1과 완료 점검의 통과를 뒤집으므로 다음 리뷰는 새 세션의 전체 리뷰다(QA가 정했다).
- 처리: 고친다. 수정은 Story의 Dev Notes "폭 결정을 코드에 옮기는 일"의 순서와 Testing의 Recommended Execution Order 4번대로 한다.
  - 단위 3.1: `SCREEN_WIDTH`를 48로 바꾼다. 접근 `TDD`. RED는 병합 커밋 뒤의 1.3-INT-001이고 GREEN은 값을 바꾼 뒤의 종료 상태 0이다. 코드 변경이므로 Independent Cleaner review를 받는다.
  - 단위 3.2: `test/screen.test.js`의 시험 `returns a line longer than the display whole`에서 길이의 비교 값 `DISPLAY_WIDTH`를 48로 하고 오류 줄의 입력을 `7 +`에서 표 2 E-6의 `W`로 바꾼다. 제품 동작이 바뀌지 않으므로 접근은 `verification-only`다. 줄을 48글자에서 자르는 변형을 값 줄과 오류 줄에 하나씩 걸어 이 시험이 실패함을 보인다. `7 +`는 시험 `returns an error line instead of throwing for a rejected expression`의 행으로 그대로 남는다(E-2). 시험 변경이므로 Cleaner 검토를 받는다.
- 영향받은 재점검: 프로젝트 루트의 `node --test` 전체, `node ci/screen-rule.check.mjs`, 1.3-INSP-001, 1.3-INSP-002, 1.3-UNIT-011, 1.3-INSP-003.
- 사본에서 미리 본 것(결과의 예측이 아니라 변경 전 시험에 대한 실행): 변경 전 시험 파일을 값 줄을 48글자에서 자르는 사본에 돌리면 시험 하나가 실패하고, 오류 줄을 48글자에서 자르는 사본에는 13개 모두 통과한다(`7 +`의 줄이 46글자라서 자르기에 닿지 않는다). 그래서 입력이 `W`로 바뀌어야 오류 줄 쪽의 변형을 가린다. 이는 계획의 까닭과 같다.

### REQ-002 Story의 수용된 결정과 계획의 글이 사용자의 결정과 어긋난다

- 확인: 저장된 Story를 끝까지 읽어 값 40과 46이 적힌 곳을 찾았다. 남은 40은 사용자의 결정 질문과 근거의 인용, 메인 세션의 답(값이 역사라고 머리 문장이 적음), SM Draft Checklist와 PO Validation과 QA Results의 그때의 기록, 커밋 `40e1a6b`의 이름뿐이고 현재 계획의 글(Dev Notes, Testing, 표)에는 40이 없다. 46도 N-8의 기록에만 남는다.
- 계획의 숫자를 코드로 확인했다: `W`는 `7 +` 뒤에 U+0020 997개로 1000글자이고, 지금 엔진에서 `renderScreen(W)`의 줄은 `오류: unexpected end of expression at position 1000`으로 49글자다. 값 줄 `1 + 2 + ... + 12 = 78`은 53글자, `7 +`의 줄은 46글자다. 표 2의 E-6, 1.3-UNIT-003, Dev Notes의 서술과 같다.
- 처리: SM이 고쳤고(커밋 `c1a9468`) PO가 GO로 재검증했다(커밋 `e71238d`, po-r2). Dev가 할 일이 없다. 닫는 일은 QA의 다음 리뷰다.

### TEST-001 받은 글자를 그대로 넘긴다는 규칙의 시험이 틀린 변형 둘을 놓친다

- 확인: `src/screen.js`의 `renderScreen`은 `evaluate(expression)`에 받은 글자를 그대로 넘긴다. 사본 둘에서 변경 전 시험 13개를 돌렸다. 하나는 문자열일 때 `evaluate`에 넘기기 전에 끝의 U+0020을 지우는 변형이고, 다른 하나는 CR(U+000D)을 지우는 변형이다. 둘 다 13개 모두 통과한다. 전달된 모듈의 `7 +`와 뒤 공백 두 개의 줄은 `position 5`이고 CR이 든 `1`과 `+ 2` 사이의 식은 `오류: unexpected character at position 1`이다. QA와 앞선 Dev 기록(dev-qa-r1)의 관찰과 같다.
- 분류: QA의 분류(Optional, 비차단, 계약 안, 소유자 Dev, 심각도 low, 확신 high)에 동의한다.
- 처리: 적용한다. Dev의 앞선 future 기록이 "이 Story가 다른 까닭으로 InProgress로 돌아와 이 항목이 수용된 범위 안에서 고칠 수 있게 되면 같은 Story에서 고친다"고 적었고, 이 다시 열기가 그 때다. 이 라운드는 Required를 고치는 라운드여서 `apply-qa-fixes.md` CP-4에 따라 값어치 있고 계약 안인 Optional을 Dev가 적용한다. 두 행은 표 2의 E-4(받은 글자의 위치)와 E-5(U+0020이 아닌 공백이 섞인 식)를 더 구체적으로 하는 행이어서 계획이 모르는 동작이나 점검을 더하지 않는다. 제품 코드는 바꾸지 않는다. 시험 `reports an error at its position in the expression as received`에 뒤 공백 두 개가 있는 `7 +`를, 시험 `does not take white space other than a space for a space`에 `1`과 `+ 2` 사이에 CR이 있는 식을 더한다.
  - 단위 3.3: 접근 `verification-only`(`testing-tdd`의 단언만 강화하고 대상 동작은 이미 맞는 경우). 강화한 단언마다 계획이 정한 틀린 변형 하나를 사본에 걸어 실패함을 보인다. 이는 Dev의 TDD RED가 아니라 민감도 점검이다. 시험 변경이므로 Cleaner 검토를 받는다.
- 이 처리의 줄은 앞선 `Treatment: TEST-001 future`를 대신하는 새 줄이다.

### DEV-1 `7 +` 줄의 길이 단언이 엔진의 지금 메시지 길이에 기댄다

- 기록의 글과 지금 계획의 어긋남: 앞선 DEV-1 기록(Completion Notes)은 시험 `returns a line longer than the display whole`의 `7 +` 줄(46글자)과 폭 40에 기대고, 까닭을 줄이면 줄이 32글자가 된다고 적는다. 계획이 바뀌어(폭 48, 오류 줄의 입력 `W`) 그 글의 숫자와 입력은 맞지 않게 된다.
- 확인: 변경 전 시험을 까닭을 줄인 엔진 사본(`unexpected end of expression`을 `unexpected end`로)에 돌리면 13개 가운데 `returns a line longer than the display whole` 하나만 실패한다. 이 재현은 앞선 기록과 같다. 단위 3.2 뒤의 시험에서의 결과는 단위 3.2의 기록 문서에 있다.
- 처리: 이 Story가 고치지 않는다. 의존은 `W`로 바뀌어도 남는다. 줄의 길이가 엔진의 까닭 글자에 기대고, 그 글자를 바꾸는 일은 엔진의 별도 계획이며 PO1-N4(오류 메시지의 언어와 꼴)의 답이 먼저다. 계획의 E-6이 이 의존을 이미 전제로 적었다. 따라서 처리 줄은 `future` 그대로이고, 기록의 글은 앞선 기록을 고쳐 쓰지 않고 새 항목으로 정정한다(Completion Notes). 정정의 숫자는 단위 3.2의 실행 결과에서 가져온다.

## 처리 줄이 없는 나머지 항목의 보관 위치

각 항목의 보관 위치를 직접 열어 확인했다. 줄이 없는 까닭은 이미 보관된 곳이 있거나, 활성 지적이 아닌 리드이거나, 이 Story의 일이 아니기 때문이다.

| 항목 | 출처 | 보관 위치와 확인 | 줄 |
| --- | --- | --- | --- |
| PO1-N1 ~ PO1-N8, PO1-N11, PO1-N12 | gate `recommendations.future` 첫째, `risk_summary.recommendations.monitor` | 이 Story의 PO Validation 1회에 있고 병합 뒤 점검이 옮긴다. 기존 future-work 항목이 같은 일을 든다(공백의 종류와 자리, 오류 메시지의 언어와 꼴, 문자열이 아닌 입력, 아주 깊은 중첩, CI 규칙이 계획 문서에 없음 등) | 없음 |
| PO1-N9, PO1-N10 | gate `recommendations.future` 첫째, `risk_summary.recommendations.monitor` 여섯째(받은 글자와 받은 오류의 전달) | SubTask 1.1에서 Dev가 적용했다(Completion Notes의 1.1 항목). 이번 수정이 바꾸지 않는다. 시험이 가릴 수 있는 부분(끝 공백과 CR)은 TEST-001이 들고 단위 3.3이 적용한다 | 없음(TEST-001은 위 표) |
| PO2-N1 ~ PO2-N4 | PO Validation 2회 | 위 표 | 없음 |
| CI만 보는 규칙의 값 | gate `monitor` 첫째 | future-work 항목 "CI 규칙이 계획 문서에 없음"이 폭의 값 48과 문서의 틈을 든다(그 항목의 "더한 사실"). 폭의 뜻은 어디에도 없고 이 수정이 정하지 않았다 | 없음 |
| 저작권과 SPDX 값 | gate `recommendations.future` 셋째 | future-work 항목 "[Tech-Debt] 새 파일의 저작권과 SPDX 값" | 없음 |
| CRAP 측정 안 함 | gate `recommendations.future` 넷째 | future-work 항목 "[Tech-Debt] CRAP 측정 경로". `quality.crap.commands`가 비어 있어 측정하지 않음이다 | 없음 |
| 서비스 CI `test`도 같은 점검에서 실패할 것(리드) | 회차 `note` | 요청 #9의 갱신이 필요한 확인이어서 Dev는 하지 않는다(이 호출은 네트워크를 쓰지 않는다). 수정 뒤의 병합 작업이 서비스의 결과를 읽는다 | 없음 |
| QA가 기각한 후보(환경의 실패, 두 Story의 충돌, `contract`, 1.3-UNIT-011의 차이, 면제) | 회차 `note`, qa-r2의 "기각과 리드" | QA의 기록에서 닫혔고 일이 아니다. 1.3-UNIT-011은 기준이 이제 d90c99e이다(Testing이 이미 적는다) | 없음 |
| 앞선 통과한 회차 1의 결과 | gate `review_rounds` | QA가 다음 리뷰를 새 세션의 전체 리뷰로 정했다. Dev가 정하지 않는다 | 없음 |

입력 항목과 대조 항목을 모두 세었다. 활성 지적 3, `recommendations.immediate` 2(SM과 PO의 계획 수정, Dev의 수정과 TEST-001), `recommendations.future` 4, `monitor` 7, 회차 `note`의 리드 하나와 기각 후보, PO Validation 2회의 비차단 지적 4.

## 수정 순서와 계획

1. 기준 tip `d90c99e2f6e4d94e17d755fd4b4a5ac672f0b685`를 `[story-1.3] Story Base: main at d90c99e2f6e4d94e17d755fd4b4a5ac672f0b685` 병합 커밋으로 들여온다. 서비스 갱신 머리가 없고(호출의 입력) 요청의 머리는 Done 커밋 `f5aea95`이므로 들여올 것은 기준 tip이다. rebase하지 않는다. 충돌 없이 병합되어 커밋 `12da9b3`이 되었다(부모는 `e71238d`와 `d90c99e`).
2. 이 기록과 Completion Notes의 시작 항목을 저장하고 커밋한다(`DOCS`).
3. 단위 3.1, 3.2, 3.3을 차례로 한다. 각 단위는 구현, Independent Cleaner review, 최종 점검, 기록, 커밋 순서다.
4. 주석 위생 점검(§3, 누적), 검증, Architecture 정렬의 재점검, Definition of Done 점검(`dev-dod-2`), `local-story-review.md`의 Review 인계.

Story의 Status는 InProgress이고 CP-4의 `Review -> InProgress` 전환은 없다.

## 점검(분석 단계)

Node.js v24.22.1, 프로젝트 루트.

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 병합 커밋의 충돌 해결 | `git log -1 --remerge-diff 12da9b3` | 출력 없음 |
| 병합 커밋 직전의 점검 | 스테이지된 병합에 `check-staged.sh` | 종료 상태 0 |
| 기준 tip과의 차이 | `git diff --stat d90c99e HEAD` | Story의 경로 15개뿐(gate, Story, 기록 문서 11개, `src/screen.js`, `test/screen.test.js`) |
| 바꾸지 않는 파일 | `git diff --quiet d90c99e HEAD -- src/engine.js src/number-format.js test/engine.test.js test/number-format.test.js ci/screen-rule.check.mjs .github/workflows/ci.yml src/units.js test/units.test.js` | 종료 상태 0 |
| RED(병합 커밋 뒤, 값 변경 전) | `node ci/screen-rule.check.mjs`, `node --test` | 규칙은 종료 상태 1과 `src/screen.js must export SCREEN_WIDTH = 48, got 40`. 시험은 68개 통과 |
| 변경 전 시험의 민감도 | 값 줄을 48글자에서 자르는 사본, 오류 줄을 48글자에서 자르는 사본, 끝 공백을 지우는 사본, CR을 지우는 사본, 까닭을 줄인 엔진 사본에 변경 전 시험을 돌림 | 전달된 모듈 13개 통과. 값 줄 자르기는 1개 실패(`returns a line longer than the display whole`). 오류 줄 자르기, 끝 공백 지우기, CR 지우기는 13개 통과. 까닭을 줄인 엔진은 1개 실패(같은 시험) |
| 현재 계획의 숫자 | `renderScreen`에 `W`와 값 줄 입력을 직접 호출 | `W` 1000글자, 줄 49글자. 값 줄 53글자. `7 +` 줄 46글자 |
| 시작 점검 | `check-stage.sh records`, `qa-record`, `po-record`, `check-gate.sh` | 종료 상태 0 |

## 한계

- 사본 실험은 손으로 고른 변형 몇 개와 입력 몇 개이고 전수가 아니다. 변이 도구는 설정되어 있지 않다.
- DEV-1의 소유자 결정(PO1-N4)은 열려 있고 이 기록이 정하지 않는다.
- 이 호출은 네트워크를 쓰지 않아 요청 #9의 상태와 서비스 CI의 실행은 보지 않았다.
- 수정 뒤의 결과(RED의 GREEN, 변형 점검, Cleaner 결과, 최종 점검)는 각 단위의 기록 문서와 `dev-dod-2`에 있다.
