# dev-qa-r3 — QA 3회차 지적의 분석과 처리 결정

- Story: [1.3](../../stories/1.3.story.md)
- Entry: Dev `review-qa`(`tasks/apply-qa-fixes.md`)의 QA 라운드 3 분석과 결정 목록. 구현이 없는 기록 인계다
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.2 1.3 remote` run의 역할 작업. effort는 시스템이 숫자 30으로만 알려 주어 설정의 이름(`xhigh`)과의 대응을 확인하지 못했다
- 시각: 2026-11-06, 시작 22:37 +0900. 마지막 저장 시각은 파일과 커밋이 말한다
- 입력 기준: 브랜치 `story/1.3`, HEAD `fb22192`(QA 3회차 기록 커밋), 작업 트리 깨끗, Status Review. 입력은 gate `docs/qa/gates/1.3.yml`(라운드 3, PASS), Story의 QA Results와 Dev Agent Record, 기록 문서 qa-r3이다. 별도 평가 문서(`docs/qa/assessments`는 없다)와 추가 검토는 없다(qa-r3의 Extra Reviews가 없다고 적는다). `src/screen.js`와 `test/screen.test.js`의 `git hash-object` 값은 `4c17930a0090`, `bf965aa51886`으로 QA 라운드 3이 적은 값과 같다

## 읽은 규칙과 절차

`tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문(Dev의 규칙 종류 `operations`, `design`, `documentation`과 Story의 Convention Sections): `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`. 읽지 않은 본문: `comments`, `coding-principles`, `crap`, `javascript-crap`. Story가 review-sections로 두었고, 이 라운드는 코드와 코드 주석을 쓰지 않아 구현 뒤의 주석 위생 검사와 완료 점검의 CRAP 비교가 닿지 않는다.
- 절차: `agents/dev.md`, `project-map.md`, `core-config.yaml`, `tasks/apply-qa-fixes.md`와 하위 작업 collect, extract, validate(구현이 없어 CP-5/6의 implement는 실행하지 않았고 읽지 않았다), `tasks/develop-story.md`, `tasks/run-story.md`의 Inputs and authorization, `data/agent-context.md`, `data/finding-classification.md`, `data/future-work-planning.md`, `data/story-paths.md`, `data/local-git-workflow.md`(Development branches, Branch and commit grouping, Commit messages and evidence, Read-only work), `data/development-quality.md`, `data/verification-ownership.md`, `data/domain-language.md`, `data/workflow-routing.md`의 Story temporary material. `tasks/resume-story.md`는 중단된 작업이 아니어서, `data/defect-diagnosis.md`는 결함을 고치는 일이 아니어서 읽지 않았다. 설정된 용어집 `docs/domain-glossary.md`는 없어 불러오지 않았고 수용된 문서의 뜻을 썼다.

## 처리 결정의 권한

Story의 QA Results에 저장된 실행 요청 줄(단계 `through Merged`와 단어 `remote`, 프로젝트 소유자)이 `tasks/run-story.md`의 Inputs and authorization에 따라 "Story가 적용하지 않는 Optional과 future 지적을 Story의 future 기록으로 남기는 것"을 답한다. 메인 세션이 이 역할 작업에 전달한 지시는 이 라운드가 코드와 시험을 바꾸지 않고 DOC-001을 future 기록과 처리 줄로 남기게 하며, gate의 future 권고에 처리 줄이 필요한 것이 있으면 Dev ID를 주어 같은 방식으로 남기고 다른 곳이 이미 드는 것은 그 까닭을 적게 한다. 제품과 시험 코드, QA 기록, gate, SM과 PO 소유 섹션, `docs/planning/future-work.md`는 바꾸지 않는다. 이 요청은 요구사항이나 범위의 변경, 면제를 허락하지 않는다. 이 라운드에 `contract`나 `pending`으로 분류된 지적과 면제 요청은 없고 사용자가 drop한 지적도 없다.

## 결정 목록

활성 지적은 gate의 `top_issues`(라운드 3)에 DOC-001 하나다. 나머지 대상은 gate의 `recommendations.immediate` 둘과 `recommendations.future` 넷, `risk_summary.recommendations.monitor` 일곱, 회차 `note`의 넘겨받은 질문 넷과 다른 리드 하나다. 아래 둘째 표가 이 항목을 모두 어디에 보관하는지 대조한다.

| ID | QA 처분 | 심각도, 확신 | 경로와 소유자 | 증거 확인 | 처리 | 줄 |
| --- | --- | --- | --- | --- | --- | --- |
| DOC-001 | optional | low, high | 계약 안, 소유자 Dev | 저장된 Story와 기록에서 재현함 | 적용하지 않고 future 기록 | `Treatment: DOC-001 future` |

gate의 `recommendations.future` 네 항목은 새 Dev ID나 줄이 필요하지 않다. 첫째는 PO의 비차단 지적이어서 Story의 PO Validation이 들고, 둘째는 이미 Dev ID DEV-1과 처리 줄이 있으며, 셋째와 넷째는 기존 future-work 항목이 든다. 근거는 아래 둘째 표에 있다. 이의를 낸 지적은 없다.

## 지적별 분석

### DOC-001 Dev 기록의 두 문장이 저장된 Story와 다르다

- 확인 첫째, dev-dod-2: 프로젝트 정책 점검의 행 `현재 작업과 사실, 편집 이력은 지정된 기록에`는 "Story를 이 라운드 시작 전의 `e71238d`와 섹션별로 비교해 바뀐 섹션이 Change Log와 Dev Agent Record뿐이고 지운 줄이 없음을 확인했다. Status는 Review 전환에서 바꾼다"고 적는다. `git diff e71238d 6701dcd -- docs/stories/1.3.story.md`의 지워진 줄은 Status의 `InProgress`와 File List의 세 줄이다. 세 줄은 `src/screen.js`의 `(새 파일)` 줄, `test/screen.test.js`의 `(새 파일)` 줄, 기준 `40e1a6b`와 차이 없음을 적은 `바뀌지 않음` 줄이고, 모두 다른 글로 고쳐 쓰였다. 그 행이 쓴 비교(Dev의 섹션 비교 스크립트)는 섹션마다 같음과 바뀜만 출력하고 줄을 세지 않는다. Status는 그 행이 Review 전환에서 바꾼다고 적은 곳이어서 어긋남이 아니다.
- 확인 둘째, dev-qa-r2: REQ-002 분석(섹션 `REQ-002 Story의 수용된 결정과 계획의 글이 사용자의 결정과 어긋난다`)의 `확인`은 "현재 계획의 글(Dev Notes, Testing, 표)에는 40이 없다"고 적는다. Dev Notes와 Testing에서 값 40이 적힌 곳(앞에 숫자와 점이 없고 뒤에 숫자나 영문자가 없는 40을 찾은 결과)은 넷이다. Dev Notes의 `폭 결정을 코드에 옮기는 일` 1번(`이 커밋 전의 트리에서는 규칙이 40이어서`)과 2번(`got 40`), Testing의 `기준 tip에서 관찰한 사실`(`got 40`)과 1.3-INT-001 행(`Story Base 병합 커밋 전 트리의 규칙 40으로 낸 결과도 증거가 아니다`)이다. 이 40들은 병합 커밋 전의 규칙이나 실패 메시지를 말하고, 계획이 요구하는 값은 48이다. 검색은 Dev Notes와 Testing의 글을 대상으로 했고(표는 그 안에 있다), Scope and Dependencies의 40은 인용과 역사이며 이 문장의 범위 밖이다.
- 재현: QA의 관찰과 같다. 두 문장이 말하려는 사실(앞선 기록을 고쳐 쓰지 않았다, 계획이 요구하는 값은 48이다)은 맞다. 앞선 기록을 고쳐 쓰지 않았다는 사실은 `git diff --name-status e71238d 6701dcd -- docs/story-records/1.3`가 `e71238d`에 있던 이 Story의 기록 문서 열한 개를 하나도 바꾸지 않고 새 문서 다섯(dev-3.1, dev-3.2, dev-3.3, dev-dod-2, dev-qa-r2)만 더함으로 다시 확인했다. Story의 지워진 줄은 위 넷뿐이어서 그 사실은 File List의 세 줄과 Status를 빼고 맞다.
- 분류: QA의 분류(Optional, 비차단, 계약 안, 소유자 Dev, 심각도 low, 확신 high)에 동의한다. 두 문장은 Story 자신의 기록 구역과 계획에 대한 글이어서 `data/finding-classification.md`의 "a statement about the Story's own plan or record sections is judged as a statement of the Story"에 들고, 다른 행동이나 합격 판정을 정하는 두 문장의 모순이 아니며(step 3), 산출물의 결과가 틀리지 않고 필수 점검에 닿지 않는다(step 4).
- 처리: 적용하지 않고 future로 기록한다. 이 라운드는 Required나 Recommended를 고치는 라운드가 아니어서 `apply-qa-fixes.md` CP-4의 "Dev가 값어치 있는 Optional을 함께 적용한다"가 닿지 않는다. 메인 세션이 지시로 코드와 시험을 바꾸지 않고 DOC-001을 future 기록으로 남기게 했고 실행 요청이 그 권한을 준다. 정정을 `fix`로 두면 `check-done.sh`가 QA 회차의 닫음을 Done 전에 요구한다(메시지 `a fix needs a QA review that closes the issue before Done`). 정정은 코드와 시험을 바꾸지 않는 기록의 글이다.
- 필요한 일: Completion Notes의 새 항목에서 두 문장을 위 사실로 정정한다. 앞선 기록(dev-dod-2, dev-qa-r2)은 고쳐 쓰지 않는다. 코드와 시험은 바꿀 일이 없다.
- 결정이 바뀌는 조건: 이 Story가 다른 까닭으로 InProgress로 돌아와 이 항목이 수용된 범위 안에서 고칠 수 있게 되면 같은 Story에서 정정하고, 그때의 `Treatment: DOC-001 fix` 줄이 이 future 결정을 대신한다(`apply-qa-fixes.md`). 그렇지 않으면 병합 뒤 PO 점검이 이 future 기록을 옮긴다. gate는 같은 기준의 기존 항목 `[Tech-Debt] 재발: 기록의 서술이 실제와 다름`을 들었고, 그 항목과의 대조는 PO 점검의 일이다.

## 처리 줄이 없는 나머지 항목의 보관 위치

각 항목의 보관 위치를 직접 열어 확인했다. 줄이 없는 까닭은 이미 보관된 곳이 있거나, 활성 지적이 아닌 리드이거나, 이 Story의 일이 아니기 때문이다. 아래 항목 가운데 `docs/planning/future-work.md`의 항목은 기준 tip d90c99e의 파일과 같은 상태(`git diff --quiet d90c99e HEAD -- docs/planning/future-work.md` 종료 상태 0)에서 제목과 `Planning:` 값을 읽었다.

| 항목 | 출처 | 보관 위치와 확인 | 줄 |
| --- | --- | --- | --- |
| PO1-N1 ~ PO1-N8, PO1-N11, PO1-N12, PO2-N1, PO2-N3, PO2-N4 | gate `recommendations.future` 첫째, 회차 `note`의 PO2 질문 | 이 Story의 PO Validation 1회와 2회에 있다. 병합 뒤 PO 점검이 Story가 적용하지 않은 PO의 비차단 지적을 future-work 항목으로 옮긴다(`data/future-work-planning.md`). 열세 개다(PO1 열 개, PO2 셋) | 없음. PO의 기록이다 |
| PO1-N9, PO1-N10, PO2-N2 | gate `recommendations.future` 첫째, 회차 `note` | Dev가 적용했다. PO1-N9와 PO1-N10은 SubTask 1.1(Completion Notes의 1.1 항목과 dev-1.1), PO2-N2는 QA 수정 2회차의 단위마다 Cleaner 검토(Completion Notes의 3.1, 3.2, 3.3 항목)다. QA가 이 회차에서 확인했다(qa-r3) | 없음 |
| DEV-1 | gate `recommendations.future` 둘째 | Completion Notes에 DEV-1의 future 기록과 그 정정이 있고 마지막 처리 줄이 `Treatment: DEV-1 future`다. 이 회차에 새 사실이 없다(gate가 줄 35글자, 시험 하나만 실패를 다시 확인했고 정정 항목의 값과 같다) | 없음. 기존 `Treatment: DEV-1 future`가 마지막 줄이다 |
| 저작권과 SPDX 값 | gate `recommendations.future` 셋째 | `docs/planning/future-work.md`의 항목 `[Tech-Debt] 새 파일의 저작권과 SPDX 값`(`Planning: unplanned`)이 든다. 새 줄은 이미 결정된 항목을 triage로 되돌린다. PO2-N3이 그 항목의 정리를 제안하며 PO Validation 2회에 있다 | 없음 |
| CRAP 측정 | gate `recommendations.future` 넷째 | 항목 `[Tech-Debt] CRAP 측정 경로`(`Planning: unplanned`). `data/development-quality.md`의 CRAP check는 제안이 이미 future-work 파일에 있으면 Story가 다시 제안하지 않는다고 정한다 | 없음 |
| `recommendations.immediate` 첫째 | gate | Dev가 DOC-001의 처리를 정해 처리 줄을 남기라는 일이다. 위 DOC-001 줄이 답한다 | DOC-001 |
| `recommendations.immediate` 둘째 | gate | QA의 완료 점검(`tasks/local-story-done.md`)이 새 Done 커밋을 만든다는 일이다. QA의 일이다 | 없음 |
| monitor, CI만 보는 규칙의 값 | gate `risk_summary.recommendations.monitor` 첫째 | 항목 `CI 규칙이 계획 문서에 없음`(`Planning: undecided`)과 PO1-N8이 든다 | 없음 |
| monitor, 아주 깊은 중첩 | `monitor` 둘째 | PO1-N6과 항목 `아주 깊은 중첩`(`Planning: unplanned`) | 없음 |
| monitor, 공백의 종류와 `{식}`의 앞뒤 공백 | `monitor` 셋째, 넷째 | PO1-N1, PO1-N2와 항목 `공백의 종류와 자리, 숫자의 범위`, `Story 1.3의 공백 판정과 식 표시`(둘 다 `Planning: unplanned`) | 없음 |
| monitor, 오류 메시지의 언어와 긴 오류 줄의 길이 단언 | `monitor` 다섯째 | PO1-N4와 항목 `오류 메시지의 언어와 꼴`(`Planning: unplanned`), DEV-1의 future 기록, PO2-N4와 항목 `오류 위치의 글자`(`Planning: unplanned`) | DEV-1(기존) |
| monitor, 받은 오류의 전달 | `monitor` 여섯째 | PO1-N10을 Dev가 1.3-INSP-002의 판단 목록에 더해 적용했다. 같은 클래스와 메시지로 새 오류를 던지는 변형이 시험을 통과하는 한계는 Completion Notes의 앞선 Review 인계가 적고, QA가 이 변형을 1.3-INSP-002의 읽기가 본다고 판정했다(qa-r3, 자동 판별이 `testing-tdd`가 제외하는 꼴이어서 읽기로 둔다는 근거는 gate의 회차 1 `note`에 있다). 시험으로 잡을 수 있던 부분(끝 공백과 CR)은 TEST-001이 닫혔다 | 없음 |
| monitor, 폭을 넘는 줄 | `monitor` 일곱째 | PO1-N8과 항목 `CI 규칙이 계획 문서에 없음` | 없음 |
| 넘겨받은 질문, `Treatment: REQ-002 fix` | 회차 `note` | `apply-qa-fixes.md`가 `fix`를 현재 Story의 일로 정하고, 이 Story에서 REQ-002를 SM이 고치고 PO가 GO로 재검증했다. QA가 닫는 데 걸리지 않는다고 판정했다. 줄을 바꾸지 않는다(앞선 줄은 고쳐 쓰지 않는다) | 변경 없음 |
| 넘겨받은 질문, effort의 이름과 숫자 30의 대응 | 회차 `note` | 이 세션도 effort를 숫자 30으로만 안다. 확인하려면 호스트의 대응표나 메인 세션의 시작 기록이 필요하고 답할 소유자는 메인 세션이다. 수용된 기준에 세션의 effort가 없고 Story의 산출물에 닿지 않는다. Agent Identity가 이 한계를 이미 적는다 | 없음. 메인 세션의 리드 |
| 넘겨받은 질문, Architecture의 틈 | 회차 `note` | 항목 `CI 규칙이 계획 문서에 없음`과 PO1-N8이 든다. Task 2.1과 N-8이 이 Story에 맡기지 않았다 | 없음 |
| 다른 리드, 서비스 CI의 결과 | 회차 `note` | 필수 점검이 아니다. 같은 두 명령을 로컬에서 돌렸고, 서비스의 결과는 게시와 병합이 읽는다. 이 호출은 네트워크를 쓰지 않는다 | 없음 |
| 닫힌 지적 REQ-001, REQ-002, TEST-001 | gate `resolved_issues` | QA가 RESOLVED로 닫았다. Dev의 앞선 줄(`Treatment: REQ-001 fix`, `Treatment: REQ-002 fix`, `Treatment: TEST-001 fix`)은 그대로다 | 변경 없음 |
| 회차의 적대적 점검 | gate `adversarial_checks` | TEST-001은 REFUTED로 닫혔고, PO1-N10(CONFIRMED)은 위 `monitor` 여섯째, PO2-N4(CONFIRMED)는 위 `monitor` 다섯째가 든다 | 없음 |

입력 항목과 대조 항목이 모두 맞는다. 활성 지적 1, `recommendations.immediate` 2, `recommendations.future` 4, `monitor` 7, 넘겨받은 질문 4와 다른 리드 1, 닫힌 지적 3, 적대적 점검 3을 모두 세었다. PO의 비차단 지적은 PO1이 열둘, PO2가 넷이고 Dev가 셋(PO1-N9, PO1-N10, PO2-N2)을 적용해 열셋이 PO Validation에 남는다.

## 점검

Node.js v24.22.1, 프로젝트 루트, HEAD `fb22192`에서 시작했다. 이 기록의 점검용 스크립트와 출력은 프로젝트 임시 영역에 두었고 저장소 파일은 읽기만 했다(Story와 이 기록의 저장은 제외한다).

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 전체 시험 | 프로젝트 루트의 `node --test` | 종료 상태 0, 68개 통과, 실패 0, 취소와 건너뜀 0 |
| CI 규칙 | `git ls-files --error-unmatch src/screen.js`, `node ci/screen-rule.check.mjs` | 파일이 있고 종료 상태 0, 출력 없음 |
| 제품과 시험 파일 | `git diff --quiet f67f0c5 HEAD -- src`, `git diff --quiet 6bd260f HEAD -- test`, `git hash-object src/screen.js test/screen.test.js` | 종료 상태 0과 0, `4c17930a0090`, `bf965aa51886`으로 QA 라운드 3과 같다 |
| 마지막 DoD 점검 뒤의 변경 경로 | `git diff --name-only 6701dcd HEAD` | gate, Story, 기록 문서 다섯(dev-3.2, dev-3.3, dev-dod-2, dev-qa-r2, qa-r3). 제품과 시험 파일이 없다 |
| DOC-001 둘째 문장의 40 | Dev Notes와 Story의 Testing에서 앞에 숫자와 점이 없고 뒤에 숫자나 영문자가 없는 40을 찾음 | 넷(위 확인 둘째) |
| DOC-001 첫째 문장의 지운 줄 | `git diff e71238d 6701dcd -- docs/stories/1.3.story.md`의 지운 줄 | Status의 `InProgress`와 File List의 세 줄 |
| 앞선 기록 문서의 변경 | `git diff --name-status e71238d 6701dcd -- docs/story-records/1.3`, `git ls-tree --name-only e71238d docs/story-records/1.3/` | `e71238d`에 있던 기록 문서 열한 개는 바뀌지 않았고 추가(A)만 다섯이다(dev-3.1, dev-3.2, dev-3.3, dev-dod-2, dev-qa-r2). `e71238d`와 HEAD의 비교는 여기에 qa-r3 추가 하나를 더한다 |
| 저장한 Story와 gate | `sh .bmad-core/utils/checks/check-gate.sh docs/qa/gates/1.3.yml docs/stories/1.3.story.md` | 종료 상태 0 |
| QA Results의 줄 | `check-stage.sh qa-record docs/stories/1.3.story.md` | 종료 상태 0, 최근 항목이 `Gate: PASS`, `Round: 3` |
| PO Validation의 줄 | `check-stage.sh po-record docs/stories/1.3.story.md` | 종료 상태 0, `Validation: GO`, `Round: 2` |
| 기록 문서 | `check-stage.sh records docs/stories/1.3.story.md` | 종료 상태 0 |
| future-work 파일 | `check-stage.sh future --story 1.3` | 종료 상태 1, `undecided` 17개. 새 Story의 시작을 막는 조건이고 이 Story를 막지 않는다(qa-r3과 같다). 이 라운드는 그 파일을 바꾸지 않았다 |
| Done 전 감사 | `sh .bmad-core/utils/checks/check-done.sh docs/stories/1.3.story.md` | 저장 전의 Story에는 `DOC-001: an active Optional issue has no "Treatment:" line in Completion Notes`로 종료 상태 1이었다. Story와 이 기록을 저장한 뒤 종료 상태 0이다. 읽기만 하는 감사이고 Status를 바꾸지 않았다 |
| Story의 변경 | `git diff -- docs/stories/1.3.story.md`의 지운 줄 | 없음. 더한 글은 Agent Identity의 문단, Debug Log References의 항목, Completion Notes의 항목 셋과 `Treatment: DOC-001 future` 줄, File List의 항목, Change Log의 행이다. Status는 Review 그대로다 |
| 저장 뒤 점검 | `check-gate.sh`, `check-stage.sh qa-record`, `po-record`, `records`를 Story와 이 기록을 저장한 글로 다시 실행 | 모두 종료 상태 0. `qa-record`는 `Gate: PASS`, `Round: 3`, `po-record`는 `Validation: GO`, `Round: 2` |
| 보이지 않는 문자, 임시 경로 | Story와 이 기록에서 불가시 코드 포인트(NBSP, 폭 없는 문자, 방향 제어, 한글 채움 문자, 태그, 변형 선택자)와 CR, 임시 영역과 세션 보관 경로의 이름을 검색(스크립트는 프로젝트 임시 영역) | 일치 없음 |
| 스테이징 뒤 점검 | Story와 이 기록의 두 경로만 `git add`한 뒤 `sh .bmad-core/utils/checks/check-staged.sh` | 종료 상태 0 |

## 한계

- DOC-001의 두 문장은 이 라운드에 정정하지 않았다. 정정은 future 기록의 필요한 일이다.
- 40이 적힌 곳의 검색은 Dev Notes와 Testing의 글에 정규식으로 한 것이고 SM 소유 섹션 전체의 모든 서술을 읽은 목록이 아니다. 정정할 때 그 글을 다시 읽는다.
- 이 라운드는 코드를 바꾸지 않아 Cleaner 검토자를 시작하지 않았고, 마지막 Definition of Done 점검(dev-dod-2)의 `READY`를 잇는다. 제품과 시험 파일이 그 점검 때와 같고 그 뒤의 커밋은 기록과 gate만 바꾼다.
- 이 호출은 네트워크를 쓰지 않아 이슈 #8의 실제 상태, 요청 #9와 호스팅 서비스의 CI 실행은 보지 않았다.
- effort의 이름과 숫자 30의 대응은 확인하지 못했다.
