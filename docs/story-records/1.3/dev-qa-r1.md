# dev-qa-r1 — QA 1회차 지적의 분석과 처리 결정

- Story: [1.3](../../stories/1.3.story.md)
- Entry: Dev `review-qa`(`tasks/apply-qa-fixes.md`)의 QA 라운드 1 분석과 결정 목록. 구현이 없는 기록 인계다
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.2 1.3 remote to Done` run의 역할 작업. effort는 시스템이 숫자 30으로만 알려 주어 설정의 이름(`xhigh`)과의 대응을 확인하지 못했다
- 시각: 2026-11-06, 분석과 결정 19:01 ~ 19:08 +0900(이 기록의 마지막 저장 19:08, 커밋 19:09)
- 입력 기준: 브랜치 `story/1.3`, HEAD `479029d`(QA 1회차 기록 커밋), 작업 트리 깨끗, Status Review. 입력은 gate `docs/qa/gates/1.3.yml`(라운드 1, PASS), Story의 QA Results와 Dev Agent Record, 기록 문서 qa-r1이다. 별도 평가 문서와 추가 검토는 없다(QA Results와 qa-r1이 추가 검토자가 없다고 적는다). `src/screen.js`와 `test/screen.test.js`의 `git hash-object` 값은 `bbd96bea4be3`, `3ed20611195c`로 QA 라운드 1이 적은 값과 같다

## 읽은 규칙과 절차

`tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문(Dev의 규칙 종류 `operations`, `design`, `documentation`과 Story의 Convention Sections): `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`. 읽지 않은 본문: `comments`, `coding-principles`, `crap`, `javascript-crap`(`quality` 종류). 이 라운드는 코드와 코드 주석을 쓰지 않아 구현 뒤의 주석 위생 검사와 완료 점검의 주석, CRAP 항목이 닿지 않는다.
- 절차: `agents/dev.md`, `project-map.md`, `core-config.yaml`, `tasks/apply-qa-fixes.md`와 하위 작업 collect, extract, validate(구현이 없어 CP-5/6의 implement는 실행하지 않았고 읽지 않았다), `tasks/develop-story.md`, `tasks/resume-story.md`, `tasks/local-story-done.md`, `tasks/run-story.md`의 Inputs and authorization와 Next task, `data/agent-context.md`, `data/finding-classification.md`, `data/future-work-planning.md`, `data/story-paths.md`, `data/local-git-workflow.md`, `data/development-quality.md`, `data/verification-ownership.md`, `data/domain-language.md`, `data/workflow-routing.md`의 Story temporary material. `data/defect-diagnosis.md`는 결함을 고치는 일이 아니어서 읽지 않았다. 설정된 용어집 `docs/domain-glossary.md`는 없어 불러오지 않았고 수용된 문서의 뜻을 썼다.

## 처리 결정의 권한

Story의 PO Validation에 저장된 실행 요청 줄(단계 `through Done`과 단어 `remote`, 프로젝트 소유자, 2026-11-06)이 `tasks/run-story.md`의 Inputs and authorization에 따라 "Story가 적용하지 않는 Optional과 future 지적을 Story의 future 기록으로 남기는 것"을 답한다. 메인 세션이 이 역할 작업에 전달한 지시는 이 라운드가 코드를 고치지 않고 TEST-001을 시험을 더하지 않고 future로 기록하게 한다. 근거는 gate가 이미 PASS이고 코드 변경은 새 QA 회차를 부른다는 것이다. 제품과 시험 코드, QA 기록, gate, `docs/planning/future-work.md`는 바꾸지 않는다. 이 요청은 요구사항이나 범위의 변경, 면제를 허락하지 않는다. 이 라운드에 `contract`나 `pending`으로 분류된 지적과 면제 요청은 없고 사용자가 drop한 지적도 없다.

## 결정 목록

활성 지적은 gate의 `top_issues`(라운드 1)에 TEST-001 하나다. 나머지 대상은 gate의 `recommendations.immediate` 하나와 `recommendations.future` 넷, `risk_summary.recommendations.monitor` 여섯, 회차 `note`의 리드와 QA Results의 "넘겨받은 질문"이다. 아래 둘째 표가 이 항목을 모두 어디에 보관하는지 대조한다.

| ID | QA 처분 | 심각도, 확신 | 경로와 소유자 | 증거 확인 | 처리 | 줄 |
| --- | --- | --- | --- | --- | --- | --- |
| TEST-001 | optional | low, high | 계약 안, 소유자 Dev | 사본에서 재현함 | 적용하지 않고 future 기록 | `Treatment: TEST-001 future` |
| DEV-1 | 지적 아님(gate `recommendations.future` 둘째, QA 처분 없음) | 해당 없음 | PM(PO1-N4의 소유자), 시험은 Dev | 엔진 사본에서 재현함 | future 기록 | `Treatment: DEV-1 future` |

DEV-1은 Dev가 개발하면서 찾은 범위 밖의 문제에 Dev가 주는 ID다(`apply-qa-fixes.md`). gate의 `recommendations.future` 둘째는 finding ID가 없어 처리 줄을 줄 수 없었다. SubTask 1.1의 Cleaner 결과가 같은 후보를 받아들이지 않은 후보로 적었고(dev-1.1), QA가 "기각과 합침"에서 PO1-N4에 합치며 gate의 권고에 두었다. 병합 뒤 점검이 옮기는 대상은 PO Validation의 적용하지 않은 비차단 지적과 `Treatment:` 줄이 `future`인 Dev 기록이며(`future-work-planning.md`) gate의 권고 문구는 대상으로 이름 대지 않는다. PO Validation의 PO1-N4와 기존 future-work 항목 "오류 메시지의 언어와 꼴"은 이 시험의 길이 단언을 말하지 않으므로, 기록과 줄이 없으면 PO1-N4의 답과 함께 고칠 이 일이 future-work 파일에 닿지 않는다. 이 Story에 앞선 DEV 번호는 없다(Definition of Done 점검이 새로 가려낸 범위 밖 발견이 없다고 적었다). 이의를 낸 지적은 없다.

## 지적별 분석

### TEST-001 받은 글자를 그대로 넘긴다는 규칙의 시험이 틀린 변형 둘을 놓친다

- 확인: `src/screen.js`의 `renderScreen`은 `evaluate(expression)`에 받은 글자를 그대로 넘긴다. 시험 `reports an error at its position in the expression as received`의 뒤 공백이 있는 행 `7 + a  `는 `a`의 위치가 4로 뒤 공백이 있든 없든 같아서 끝의 U+0020을 지우고 넘기는 변형을 가리지 못한다. 시험 `does not take white space other than a space for a space`의 목록에는 탭, LF, U+00A0이 있으나 CR(U+000D)이 든 식이 없고, 줄바꿈이 없음을 보는 단언도 LF만 본다.
- 재현: 사본 셋에서 전달된 `test/screen.test.js`를 돌렸다. 하나는 전달된 모듈이고, 둘째는 문자열일 때 `evaluate`에 넘기기 전에 끝의 U+0020을 지우는 변형이며, 셋째는 CR을 지우는 변형이다. 시험 13개가 셋 모두 통과한다. 뒤 공백 둘이 있는 `7 +`의 줄은 변형에서 `오류: unexpected end of expression at position 3`이고 전달된 모듈에서 `position 5`다. `1`과 `+ 2` 사이에 CR이 있는 식의 줄은 변형에서 CR이 든 값 줄 `1`, CR, `+ 2 = 3`이고 전달된 모듈에서 `오류: unexpected character at position 1`이다. QA의 관찰과 같다.
- 분류: QA의 분류(Optional, 비차단, 계약 안, 소유자 Dev, 심각도 low, 확신 high)에 동의한다. 전달된 코드는 맞고 틀린 변형이 시험을 통과할 가능성만 남는다. E-4, E-5의 이름 붙은 행은 모두 전달 시험에 닿고, 뒤 공백을 지우는 입력과 CR이 든 식은 어느 필수 점검도 이름 붙이지 않아 `finding-classification.md` 3단계의 기준이 아니다.
- 처리: 적용하지 않고 future로 기록한다. 이 라운드는 Required나 Recommended를 고치는 라운드가 아니어서 `apply-qa-fixes.md` CP-4의 "Dev가 값어치 있는 Optional을 함께 적용한다"가 닿지 않는다. 시험 파일을 바꾸면 QA가 검토한 구현 개정이 바뀌어 `local-story-done.md`에 따라 Done 전에 새 QA 회차가 필요하다. 메인 세션이 이 지시로 시험을 더하지 않고 future로 기록하게 했다.
- 필요한 일(사본에서 확인): 시험 `reports an error at its position in the expression as received`의 오류 줄 목록에 뒤 공백 둘이 있는 `7 +`를, 시험 `does not take white space other than a space for a space`의 식 목록에 `1`과 `+ 2` 사이에 CR이 있는 식(JavaScript 탈출 표기)을 더한다. 두 행을 더한 시험 사본은 전달된 모듈에서 13개 모두 통과한다. 끝 공백을 지우는 변형에서는 앞 시험이 `renderScreen("7 +  ")`에서 실패하고(실제 `position 3`, 기대 `position 5`), CR을 지우는 변형에서는 뒤 시험이 CR이 든 식에서 실패한다(실제 값 줄, 기대 `position 1`의 오류 줄). 제품 코드는 바꿀 일이 없다.
- 결정이 바뀌는 조건: 이 Story가 다른 까닭으로 InProgress로 돌아와 이 항목이 수용된 범위 안에서 고칠 수 있게 되면 같은 Story에서 고치고, 그때의 `Treatment: TEST-001 fix` 줄이 이 future 결정을 대신한다(`apply-qa-fixes.md`).

### DEV-1 `7 +` 줄의 길이 단언이 엔진의 지금 메시지 길이에 기댄다

- 출처: gate의 `recommendations.future` 둘째, qa-r1의 "기각과 합침"에서 PO1-N4에 합친 행, 이 Story의 Testing 표 2의 E-2("`7 +`의 줄은 지금 엔진의 메시지로 46글자")와 dev-1.1의 "받아들이지 않은 후보".
- 재현: 사본의 `src/engine.js`에서 까닭 `unexpected end of expression`을 `unexpected end`로 줄였다. 화면 시험 13개 가운데 `returns a line longer than the display whole` 하나만 실패하고 12개는 통과한다. 줄은 `오류: unexpected end at position 3`으로 32글자여서 40보다 길다는 단언이 깨진다. 전달된 모듈의 줄은 46글자다. QA의 관찰과 같다.
- 이 Story가 적용하지 않는 까닭: 단언은 틀릴 때 조용히 지나가지 않고 실패한다. 그리고 메시지를 바꾸는 일은 이 Story 밖이다. 엔진의 별도 계획이고 PO1-N4(오류 메시지의 언어와 꼴)의 답이 먼저다. 전달된 시험과 코드는 지금 엔진에서 맞다.
- 필요한 일: PO1-N4의 답이 까닭의 글을 40글자 줄을 넘지 않게 바꾸면 그 변경에서 이 시험을 함께 고친다. 길이 단언이 쓸 입력은 그때의 메시지로 다시 고른다. 기존 future-work 항목 "오류 메시지의 언어와 꼴"의 필요한 일에 함께 적힐 일이다. 책임은 PM(PO1-N4의 답)이고 시험을 고치는 일은 Dev다.

## 처리 줄이 없는 나머지 항목의 보관 위치

각 항목의 보관 위치를 직접 열어 확인했다. 줄이 없는 까닭은 이미 보관된 곳이 있거나, 활성 지적이 아닌 리드이거나, 이 Story의 일이 아니기 때문이다.

| 항목 | 출처 | 보관 위치와 확인 | 줄 |
| --- | --- | --- | --- |
| 저작권과 SPDX 값 | gate `recommendations.future` 셋째, 회차 `note` | `docs/planning/future-work.md`의 항목 "[Tech-Debt] 새 파일의 저작권과 SPDX 값"(`Planning: unplanned`, Source Story 1.1)이 "Story 1.2와 1.3이 만드는 파일도 같은 입력을 기다린다"고 이미 적는다. 이 Story의 새 파일 둘도 같은 사정이고 새 정보가 없다 | 없음. 새 줄은 이미 결정된 항목을 triage로 되돌린다 |
| CRAP 측정 안 함 | gate `recommendations.future` 넷째, `nfr_validation.maintainability` | 항목 "[Tech-Debt] CRAP 측정 경로". `data/development-quality.md`의 CRAP check는 제안이 이미 future-work 파일에 있으면 Story가 다시 제안하지 않는다고 정한다 | 없음 |
| PO1-N1 ~ PO1-N8(SM N-1 ~ N-8, 질문 Q1 ~ Q8) | gate `recommendations.future` 첫째, `monitor`의 첫째, 둘째, 셋째, 넷째, 여섯째, 회차 `note`의 질문 | 이 Story의 PO Validation 1회와 SM Draft Checklist 1회에 있고, 병합 뒤 점검이 적용하지 않은 비차단 지적을 future-work 항목으로 옮긴다. 기존 항목도 같은 일을 들고 있다: "공백의 종류와 자리, 숫자의 범위"와 "Story 1.3의 공백 판정과 식 표시"(N-1, N-2), "오류 메시지의 언어와 꼴"(N-4), "문자열이 아닌 입력"(N-5), "아주 깊은 중첩"(N-6), "[Tech-Debt] CalculationError의 name"(N-7), "CI 규칙이 계획 문서에 없음"(N-8). N-3은 미결이 아니라 수용된 글을 읽은 것으로 PM의 확인을 구한다고 PO Validation이 적는다 | 없음. PO와 SM의 기록이고 처리 줄이 닿지 않는다 |
| PO1-N9 | gate `recommendations.future` 첫째, 회차 `note` | SubTask 1.1에서 Dev가 적용했다. 1.3-INT-001의 RED를 뼈대와 1.3-UNIT-010의 RED에서 같은 상태로 보았다(Completion Notes의 1.1 항목, dev-1.1). QA가 저장된 출력에서 해소를 확인했다(qa-r1) | 없음 |
| PO1-N10 | gate `recommendations.future` 첫째, `monitor` 다섯째 | 잡은 오류를 그대로 다시 던진다는 판단을 1.3-INSP-002의 목록에 더하는 것이 PO의 제안이었고 SubTask 1.1에서 Dev가 적용했다. 같은 클래스와 메시지로 새 오류를 만드는 변형은 시험이 가리지 못하고 읽기만 판정한다. QA는 이것이 기준이 아니고 자동 판별이 대역이나 V8 스택 글에 기대어 `testing-tdd`가 제외하는 꼴이라고 판정했다. 시험으로 잡을 수 있는 부분(끝 공백과 CR)은 TEST-001이 든다 | 없음. TEST-001 |
| PO1-N11, PO1-N12 | gate `recommendations.future` 첫째, 회차 `note` | 이 Story의 PO Validation 1회에 있다. 적용하지 않았다(SM의 다음 수정이 없었다). 병합 뒤 점검이 옮긴다 | 없음 |
| 받은 글자와 받은 오류의 전달 | `monitor` 다섯째 | TEST-001과 PO1-N10(위) | TEST-001 |
| 메시지 길이에 기댄 단언 | gate `recommendations.future` 둘째, `monitor` 넷째의 끝 | 위의 DEV-1과 PO1-N4 | DEV-1 |
| `recommendations.immediate` | gate | Done 전에 TEST-001의 처리를 정해 Completion Notes에 줄을 남기라는 일이다. 위의 TEST-001 줄이 답한다 | TEST-001 |
| Dev의 `git ls-remote --heads origin` 읽기 | 회차 `note`, qa-r1의 넘겨받은 질문 | 이 Story의 산출물을 바꾸지 않았고 저장소에 흔적이 없다. QA가 메인 세션이 최종 보고에 적는다고 정했다. Story의 지적이 아니다 | 없음 |
| QA가 기각하거나 합친 후보 | qa-r1의 "기각과 합침" | 숫자 리터럴, 기대를 `evaluate`에서 얻는 도우미, 시험 이름, 시각 정정, 표현의 정확도, 80칸 줄, JSDoc의 표시 글자, 공백 정의의 겹침, `let value;`는 QA의 기록에서 닫혔고 일이 아니다. `7 +` 줄의 길이 단언은 DEV-1이다 | 없음, 길이 단언은 DEV-1 |
| 닫힌 지적 | gate `resolved_issues` | 비어 있다 | 변경 없음 |

입력 항목과 대조 항목이 모두 맞는다. 활성 지적 1, `recommendations.immediate` 1, `recommendations.future` 4(첫째는 PO1-N1 ~ PO1-N12를 한 줄로 든 항목이어서 위 표의 세 행에 나뉜다), `monitor` 6(다섯은 PO1-N1 ~ PO1-N8 행에, 받은 글자와 받은 오류의 전달은 TEST-001 행에), 회차 `note`의 질문 Q1 ~ Q8과 PO1-N9 ~ PO1-N12, Dev의 `git ls-remote` 읽기, 합친 후보 1을 모두 세었다.

## 점검

Node.js v24.22.1, 프로젝트 루트, HEAD `479029d`. 아래 스크립트와 사본은 프로젝트 임시 영역에 두었고 저장소 파일은 읽기만 했다.

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 전체 시험 | `node --test` | 48개 통과, 실패 0(화면 13, 기존 35) |
| CI 규칙 | `src/screen.js`가 있는 상태의 `node ci/screen-rule.check.mjs` | 종료 상태 0, 출력 없음 |
| 바꾸지 않는 파일 | `git diff --quiet 40e1a6b -- src/engine.js src/number-format.js test/engine.test.js test/number-format.test.js ci/screen-rule.check.mjs .github/workflows/ci.yml` | 종료 상태 0 |
| 제품과 시험 파일 | `git hash-object src/screen.js test/screen.test.js` | `bbd96bea4be3`, `3ed20611195c`로 QA 라운드 1과 같다 |
| 전달된 시험을 세 사본에 | 전달된 모듈, 끝의 U+0020을 지우는 변형, CR을 지우는 변형에 `node --test test/screen.test.js` | 셋 모두 13개 통과(TEST-001 재현) |
| 두 행을 더한 시험을 세 사본에 | 시험 사본 두 곳에 행을 하나씩 더함 | 전달된 모듈 13개 통과, 끝 공백 변형 12개 통과 1개 실패(`reports an error at its position in the expression as received`), CR 변형 12개 통과 1개 실패(`does not take white space other than a space for a space`) |
| 직접 호출 | 세 사본의 `renderScreen`에 `7 +`, 뒤 공백 둘이 있는 `7 +`, `1 + 2`, CR이 든 식, LF가 든 식 | 위 재현 절의 값. 전달된 모듈은 `position 5`, `position 1`의 오류 줄을 돌려준다 |
| 짧은 까닭의 엔진 사본 | 사본의 `src/engine.js`에서 까닭을 `unexpected end`로 줄이고 `node --test test/screen.test.js` | 13개 중 12개 통과, `returns a line longer than the display whole` 하나 실패. `7 +`의 줄 32글자, 전달된 줄 46글자(DEV-1 재현) |
| 구현 개정 이후의 차이 | `git diff --quiet aac1c5a HEAD -- src test` | 종료 상태 0. 제품과 시험 파일이 QA가 검토한 구현 개정과 같다 |
| 저장한 Story와 gate | `sh .bmad-core/utils/checks/check-gate.sh docs/qa/gates/1.3.yml docs/stories/1.3.story.md` | 종료 상태 0 |
| QA Results의 줄 | `check-stage.sh qa-record docs/stories/1.3.story.md` | 종료 상태 0, 최근 항목이 `Gate: PASS`, `Round: 1` |
| 기록 문서 | `check-stage.sh records docs/stories/1.3.story.md` | 종료 상태 0 |
| future-work 파일 | `check-stage.sh future --story 1.3` | 종료 상태 0 |
| Done 전 감사 | `sh .bmad-core/utils/checks/check-done.sh docs/stories/1.3.story.md` | 종료 상태 0. 읽기만 하는 감사이고 Status를 바꾸지 않았다. 이 기록을 저장하기 전의 Story에는 `TEST-001: an active Optional issue has no "Treatment:" line in Completion Notes`로 종료 상태 1이었다 |
| 보이지 않는 문자, 임시 경로 | Story와 이 기록에서 불가시 코드 포인트(NBSP, 폭 없는 문자, 방향 제어, 한글 채움 문자, 태그, 변형 선택자)와 CR, 임시 영역과 세션 보관 경로의 이름을 검색 | 일치 없음 |

## 한계

- 사본 실험은 손으로 고른 변형 둘과 입력 몇 개이고 전수가 아니다. 변이 도구는 설정되어 있지 않다.
- 두 시험 행은 사본에서만 실행했고 저장소의 시험 파일에 더하지 않았다. 더한다면 행의 표기는 그 변경 때 정한다.
- DEV-1의 소유자 결정(PO1-N4)은 열려 있고 이 기록이 정하지 않는다.
- 이 라운드는 코드를 바꾸지 않아 Cleaner 검토자를 시작하지 않았다.
- 이 호출은 네트워크를 쓰지 않아 이슈 #8의 실제 상태와 호스팅 서비스의 CI 실행은 보지 않았다.
