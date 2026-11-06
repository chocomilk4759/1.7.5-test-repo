# dev-qa-r1 — QA 1회차 지적의 분석과 처리 결정

- Story: [bug-2](../../stories/bug/bug-2.story.md)
- Entry: Dev `review-qa`(`tasks/apply-qa-fixes.md`)의 QA 라운드 1 분석과 결정 목록. 구현이 없는 기록 인계다
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story bug-2 remote to Done` run의 역할 작업. effort는 설정의 이름(`xhigh`)과의 대응을 이 세션이 확인할 수 없다
- 시각: 2026-11-07, 02:58 +0900에 기록을 쓰기 시작했다. 마지막 저장 시각은 파일과 커밋이 말한다
- 입력 기준: 브랜치 `story/bug-2`, HEAD `e0d6507`(QA 1회차 기록 커밋), 작업 트리 깨끗, Status Review. 입력은 gate `docs/qa/gates/bug-2.yml`(라운드 1, WAIVED), Story의 QA Results와 Dev Agent Record, 기록 문서 qa-r1이다. 별도 평가 문서(`docs/qa/assessments`는 없다)와 추가 검토는 없다(qa-r1의 Extra Reviews가 없다고 적는다). `src/engine.js`, `test/engine.test.js`, `test/screen.test.js`의 `git hash-object` 값은 `0e36604857b9`, `51193b926986`, `06fedf3f30bf`로 Story의 Review 인계가 적은 값과 같고, 세 파일은 QA가 검토한 구현 개정 `4a69ac7`과 같다(`git diff --quiet 4a69ac7 HEAD -- src test` 종료 상태 0)

## 읽은 규칙과 절차

`tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문(Dev의 규칙 종류 `operations`, `design`, `documentation`과 Story의 Convention Sections): `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`. 읽지 않은 본문: `comments`, `coding-principles`, `crap`, `javascript-crap`. Story가 review-sections로 두었고, 이 라운드는 코드와 코드 주석을 쓰지 않아 구현 뒤의 주석 위생 검사와 완료 점검의 CRAP 비교가 닿지 않는다.
- 끝까지 읽은 절차: `agents/dev.md`, `project-map.md`, `core-config.yaml`, `tasks/load-project-rules.md`, `tasks/apply-qa-fixes.md`와 하위 작업 collect, extract, validate(구현이 없어 CP-5/6의 implement는 실행하지 않았고 읽지 않았다), `tasks/local-story-review.md`, `data/finding-classification.md`, `data/future-work-planning.md`, `data/local-git-workflow.md`, `data/agent-context.md`, `data/verification-ownership.md`.
- 일부만 읽은 절차: `tasks/run-story.md`(Purpose, Inputs and authorization, Next task), `data/story-paths.md`(Story key의 표, Type Stories, Record documents, Run authorization line의 첫 부분), `templates/story-tmpl.yaml`(Dev Agent Record), `utils/checks/check-done.sh`, `story-rules.awk`, `record-rules.awk`, `key-lines.awk`(저장 줄과 처리 줄의 읽는 법).
- 읽지 않은 절차: `tasks/develop-story.md`(기록만 하는 인계는 CP-1이 QA가 Dev 기록만 요청한 경우로 두는데 이 라운드는 그 경우가 아니다), `data/development-quality.md`(코드를 쓰지 않았다), `data/defect-diagnosis.md`(결함을 고치지 않았다), `data/domain-language.md`, `data/workflow-routing.md`. 설정된 용어집 `docs/domain-glossary.md`는 없어 불러오지 않았다.

## 처리 결정의 권한

Story의 PO Validation에 저장된 실행 요청 줄(단계 `through Done remote`, 사용자)이 `tasks/run-story.md` 섹션 Inputs and authorization에 따라 이 run이 답하는 결정을 정한다. 그 글은 "fixing the Required and Recommended findings, recording the Optional and future findings that the Story does not apply as future records in the Story"를 답하고, 요구사항이나 범위의 변경, 면제, Story 작업의 drop은 사용자에게 남긴다. 메인 세션이 이 역할 작업에 전달한 지시도 같은 범위다. 이 라운드에 `contract`나 `pending`으로 분류된 지적과 면제 요청은 없고(ARCH-001의 면제는 QA가 이미 사용자의 앞선 글로 기록했다), 사용자가 drop한 지적도 없다.

TEST-001과 DOC-001의 처리를 `apply-qa-fixes.md`의 글에서 다음과 같이 읽었다. 메인 세션이 지시에 적은 읽기와 같고 글이 다르게 말하는 곳은 없었다.

- 현재 Story의 일로 적용하는 Optional은 둘뿐이다. 하나는 Required나 Recommended를 고치는 라운드에서 Dev가 값어치 있다고 고르는 Optional(CP-4 "During a round that fixes Required or Recommended findings, Dev also applies the Optional findings that it judges worthwhile"), 다른 하나는 사용자가 명시로 정한 처리다. 이 라운드의 활성 Required와 Recommended는 0이어서 앞의 길이 닿지 않고(gate의 `top_issues`는 Optional 둘뿐), 사용자의 결정도 없다. 실행 요청 줄은 Optional의 적용을 답하지 않는다.
- 그 밖의 Optional은 CP-4가 정한 대로 "each one that the Story does not apply, and that the user does not drop, is recorded as a future record in Dev Agent Record for the post-merge PO check"다. 처리 줄은 `future`다. `none`은 "a finding the user dropped"에만 쓰고 사용자만 drop한다(같은 task의 "only the user drops it"). 사용자는 둘 가운데 어느 것도 drop하지 않았으므로 `none`은 닿지 않는다.
- 이 처리는 `InProgress`로의 복귀를 허락하지 않는다. CP-4는 복귀를 "user-selected current-Story changes while Status is Review"에 두고 "Analysis or the presence of Optional findings alone does not authorize this transition"이라고 적는다. CP-1은 `Review`가 "feedback analysis, including Optional-only feedback"를 허용하고 "current-Story implementation requires an authorized return to `InProgress`"라고 적는다. 이 라운드의 결정이 모두 deferral이므로 "preserve the starting Story Status during this pipeline and skip implementation checkpoints"를 따른다. "A future Optional deferral alone needs no status transition or new review."
- `fix`로 두었을 때의 결과도 확인했다. `utils/checks/story-rules.awk`는 활성 Optional의 처리 줄이 `fix`이면 "a fix needs a QA review that closes the issue before Done"를 보고한다. 곧 `fix`는 Review에서 InProgress로의 복귀, 새 SubTask(단언만 강화하는 변경이면 `testing-tdd`의 `verification-only`와 그 민감도 점검, 그리고 Cleaner), 구현 개정의 변화, 새 QA 회차를 모두 부른다. 그 어느 것도 이 run의 요청이 답한 결정이 아니다.
- 이 run의 Next task 항목 "Review with a PASS gate, or WAIVED under an approved waiver"는 QA의 `local-story-done.md` 앞에 Dev의 `apply-qa-fixes.md`가 "each Optional and future finding that the Story does not apply as a future record in Dev Agent Record with its `Treatment:` line"을 남기는 것으로 쓴다. 이 라운드가 하는 일이 그것이다.

## 결정 목록

활성 지적은 gate의 `top_issues`(라운드 1)에 TEST-001, DOC-001 둘이다. 그 밖의 대상은 `resolved_issues`의 ARCH-001 하나, `recommendations.immediate` 둘, `recommendations.future` 셋, `risk_summary.recommendations.monitor` 여덟, 회차 `note`의 합친 후보와 기각 후보, 넘겨받은 질문(없음)이다. 아래 둘째 표가 이 항목을 모두 어디에 보관하는지 대조한다.

| ID | QA 처분 | 심각도, 확신 | 경로와 소유자 | 증거 확인 | 처리 | 줄 |
| --- | --- | --- | --- | --- | --- | --- |
| TEST-001 | optional | low, high | 계약 안, 소유자 Dev | 저장소의 시험과 엔진 사본에서 재현함 | 적용하지 않고 future 기록 | `Treatment: TEST-001 future` |
| DOC-001 | optional | low, high | 계약 안, 소유자 Dev | 저장된 출력 파일의 수정 시각과 변형 요약에서 재현함 | 적용하지 않고 future 기록 | `Treatment: DOC-001 future` |

이의를 낸 지적은 없다. 두 지적의 QA 분류(Optional, 비차단, 계약 안, 소유자 Dev)에 동의한다.

## 지적별 분석

### TEST-001 까닭이 빈 글자인 변형을 시험이 가리지 못한다

- 확인, 코드: `test/engine.test.js`의 도우미 `reasonOf`는 메시지에서 수(`\d+`)만 빼고, 시험 `gives a different reason in the message for different problems`는 그 결과의 `trim()`이 빈 글자가 아닌지 본다. 메시지의 꼴은 `src/engine.js`의 `calculationErrorAt`이 `{까닭} at position {위치}`로 만들어서, 까닭이 빈 글자여도 수를 뺀 글자에 ` at position `이 남는다. 이 판정은 판정 방법의 "까닭: 기존 도우미 `reasonOf`로 메시지에서 수를 뺀 글자를 비교한다"를 따른 것이다.
- 확인, 실행: 프로젝트 임시 영역에 코드와 시험의 사본 넷을 만들고 프로젝트 루트의 `node --test`와 같은 명령을 각 사본에서 돌렸다(Node.js v24.22.1). 통제(변경 없음)는 76개 통과. 새 오류의 까닭을 빈 글자로 바꾼 엔진 사본(`calculationErrorAt("", 0, ...)`)도 76개 통과, 실패 0이다. 곧 QA의 관찰과 같다. 같은 사본에 아래 "필요한 일"의 단언을 더한 시험을 돌리면, 통제 엔진에서는 76개 통과, 빈 까닭의 엔진에서는 이 시험 하나가 실패한다(76개 가운데 75개 통과, 실패 1). 추적 파일은 바꾸지 않았다(`git status --short` 출력 없음).
- 분류: QA의 결정 순서(1단계 확인됨, 2단계 이 Story의 단언, 3단계 판정 방법이 까닭을 "메시지에서 수를 뺀 글자"로 정했고 전달 시험이 그 판정대로 G-4에 닿으므로 미충족이 아님, 4단계 전달된 까닭 `expression nested too deeply`가 맞아 잘못된 결과가 없음)에 동의한다. 전달 코드에 이 결과가 없다.
- 처리: 적용하지 않고 future로 기록한다. 근거는 위 "처리 결정의 권한"이다. 고치는 라운드가 아니고, 시험 파일을 바꾸려면 Review에서 InProgress로 돌아와야 하는데 사용자의 결정이 없으며, `fix`는 구현 개정 `4a69ac7`을 바꿔 Done 전에 새 QA 회차를 부른다.
- 필요한 일: 시험 `gives a different reason in the message for different problems`에서 `D`의 까닭을 포함한 각 까닭에서 메시지의 공통 꼬리 ` at position`을 걷어낸 나머지가 비어 있지 않은지 같은 시험에서 본다. 낱말을 시험에 적지 않아 N-2와 어긋나지 않는다. 제품 코드는 바꿀 일이 없다. 한 가지 저울질할 점이 있다. Cleaner F-3([dev-1.1](dev-1.1.md)의 섹션 "Cleaner 결과")은 접미사를 걷어내는 일이 구현을 되풀이하는 기계를 더한다고 보아 단언 문구만 고쳤다. 고칠 때 이 둘과 `testing-tdd`의 "restates the implementation"을 함께 따진다.
- 제안하는 자리: 기존 항목 "오류 메시지의 언어와 꼴"(QA의 제안, 까닭의 낱말이 정해질 때 함께 본다)이나 같은 기준의 기존 항목 `[Tech-Debt] 재발: 전달 시험이 틀린 변형을 잡지 못함`이다. 정하는 것은 PO의 트리아지이고 재발 대조는 병합 뒤 점검의 일이다. 이 라운드는 `docs/planning/future-work.md`를 바꾸지 않았다.
- 결정이 바뀌는 조건: 이 Story가 다른 까닭으로 InProgress로 돌아와 이 항목이 수용된 범위 안에서 고칠 수 있게 되면 같은 Story에서 고치고, 그때의 `Treatment: TEST-001 fix` 줄이 이 future 결정을 대신한다(`apply-qa-fixes.md`).

### DOC-001 Dev 기록 dev-1.1의 두 문장이 실제와 다르다

- 확인 첫째, 머리의 시각 줄: [dev-1.1](dev-1.1.md)의 머리 줄은 "첫 RED 02:09"라고 적는다. Dev가 남긴 실행 출력 파일의 수정 시각(프로젝트 임시 영역, 같은 세션이 쓴 파일)은 조각 1의 RED 출력 02:07:12, 조각 1의 GREEN 02:07:20과 02:07:26, 조각 2의 RED 02:08:03, 조각 2의 GREEN 02:08:20, 조각 3 02:08:38, 조각 4 02:09:33, 조각 5 02:09:42, 최종 출력 02:19:47이다. 02:09대는 조각 4와 5의 출력이고 첫 RED는 02:07이다. QA의 관찰과 같다.
- 확인 둘째, 변형의 나열: dev-1.1의 섹션 "Cleaner 결과"는 "검토자의 변형 가운데 76/76을 통과한 것은 위 표의 둘과 Story가 예고한 틈(`position-at-the-end-allowed`는 N-1, 식과 위치를 함께 담은 메시지와 재귀 안에서 잡는 변형은 bug-2-INSP-001, `screen-also-answers-range-error`는 bug-2-INSP-002)이다"라고 적는다. 위 표(섹션 "사후 민감도 점검")의 76/76 행은 `catch-every-other-error`와 `empty-reason` 둘이다. 검토자의 변형 요약(검토자의 작업 폴더)을 읽으면 `catch-every-other-error`는 요약에 없고(Dev가 만든 변형이다), 76개 모두 통과한 변형은 `empty-reason`, `position-at-the-end-allowed`, `expression-and-position-in-message`, `catch-inside-the-recursion-fixed-position`, `screen-also-answers-range-error`, `depth-limit-above-the-fitting-depth` 여섯이다. 괄호의 나열에 `depth-limit-above-the-fitting-depth`가 없고, "위 표의 둘" 가운데 하나(`catch-every-other-error`)는 검토자의 변형이 아니다. 그 변형(적합한 깊이 위의 깊이 한도)도 Story가 예고한 틈(`coverage_gaps`의 숫자 한도의 부재)이어서 일반 문장은 맞고 나열만 덜 정확하다.
- 그대로인 것: RED, GREEN, Cleaner, 재점검의 순서와 시험 수, 실패 수, 첫 실패 메시지는 저장된 출력과 같다(QA가 대조했고, 위 시각 목록의 순서도 같다).
- 분류: QA의 결정 순서(두 문장은 Story 자신의 실행 기록이어서 "description of current content"가 아니고, 나열을 완전한 목록으로 쓰는 곳이 없으며, 잘못된 결과가 없음)에 동의한다. `data/finding-classification.md`의 "a statement about the Story's own plan or record sections is judged as a statement of the Story"에도 든다.
- 처리: 적용하지 않고 future로 기록한다. 근거는 TEST-001과 같다. 정정은 코드와 시험을 바꾸지 않는 기록의 글이지만, `fix`로 두면 `check-done.sh`가 QA 회차의 닫음을 Done 전에 요구하고(위 "처리 결정의 권한"), 사용자의 결정이 없는 Review 중의 현재 Story 작업이다. 이 라운드는 QA가 요청한 Dev 기록 정정이 아니라 Optional의 처리를 정하는 일이다.
- 필요한 일: Completion Notes의 새 항목에서 시각과 나열을 위 사실로 정정한다. 앞선 기록(dev-1.1)은 고쳐 쓰지 않고 코드와 시험은 바꾸지 않는다.
- 제안하는 자리: 같은 기준의 기존 항목 `[Tech-Debt] 재발: 기록의 서술이 실제와 다름`이다(QA의 제안과 같다). 대조는 병합 뒤 점검의 일이다.
- 결정이 바뀌는 조건: TEST-001과 같다. 그때의 `Treatment: DOC-001 fix` 줄이 이 future 결정을 대신한다.

## 처리 줄이 없는 나머지 항목의 보관 위치

각 항목의 보관 위치를 직접 열어 확인했다. 줄이 없는 까닭은 이미 보관된 곳이 있거나, QA가 자기 기록에서 닫았거나, 활성 지적이 아닌 리드이거나, 이 Story의 일이 아니기 때문이다. `docs/planning/future-work.md`의 항목은 HEAD의 파일에서 제목을 읽었고(`git diff --quiet e0d6507 HEAD -- docs/planning/future-work.md` 종료 상태 0), 이 라운드는 그 파일을 바꾸지 않았다.

| 항목 | 출처 | 보관 위치와 확인 | 줄 |
| --- | --- | --- | --- |
| ARCH-001 | gate `resolved_issues`, QA Results의 Finding Routes | Required, 심각도 medium. QA가 사용자의 글 "조사 없이 이 설계를 수용"을 승인으로 이 Story의 이 설계에 한해 면제하고 `verdict: WAIVED`로 닫았다(`waiver.active` true). QA가 자기 기록에서 닫은 지적이고(Dev는 gate를 바꾸지 않는다), 활성 Optional이 아니어서 처리 줄을 요구하는 검사(`story-rules.awk`는 활성 Optional만 읽는다)에도 들지 않는다. 조사 요건은 채워지지 않았고 Dev는 면제를 다시 쓰지 않았다. 남은 위험(스택 크기를 바꾼 실행, 다른 런타임)은 PO2-N1이 든다 | 없음. QA의 기록이다 |
| PO1-N1 ~ PO1-N6, PO2-N1 | gate `recommendations.future` 첫째 | Story의 PO Validation 1회와 2회에 있다. 병합 뒤 PO 점검이 Story가 적용하지 않은 PO의 비차단 지적을 future-work 항목으로 옮긴다(`data/future-work-planning.md`). 열린 것은 일곱 개다(PO1 여섯, PO2 하나). PO1-N7 ~ PO1-N12는 SM이 적용했다 | 없음. PO의 기록이다 |
| ARCH-001의 빠진 자료 | gate `recommendations.future` 둘째 | 위 PO2-N1이 들고 있다(QA도 그렇게 적는다). Story의 Scope and Dependencies "수용된 결정"이 빠진 자료의 목록을 든다 | 없음 |
| CRAP 측정 | gate `recommendations.future` 셋째 | 항목 `[Tech-Debt] CRAP 측정 경로`(`Planning: unplanned`)가 든다. `data/future-work-planning.md`는 제안이 이미 파일에 있으면 Story가 다시 제안하지 않는다고 정한다 | 없음 |
| `recommendations.immediate` 첫째 | gate | Dev가 TEST-001, DOC-001의 처리를 정해 처리 줄을 남기라는 일이다. 위 두 줄이 답한다 | TEST-001, DOC-001 |
| `recommendations.immediate` 둘째 | gate | QA의 완료 점검(`tasks/local-story-done.md`)이 면제의 범위와 현재 입력을 다시 확인하고 Done 커밋을 만든다는 일이다. QA의 일이다 | 없음 |
| monitor, 조사 없는 설계 | `risk_summary.recommendations.monitor` 첫째 | ARCH-001, N-5, PO2-N1. 위와 같다 | 없음 |
| monitor, 경계 부근의 결과와 순수 함수 | 둘째 | N-4와 PO1-N4가 Story에서 든다(PO Validation 1회). 표 3이 받는다 | 없음 |
| monitor, 호출자가 스택을 거의 다 쓴 호출 | 셋째 | N-6과 PO1-N5가 든다 | 없음 |
| monitor, 새 오류의 위치와 새 까닭의 언어 | 넷째, 다섯째 | N-1, PO1-N1과 N-2, PO1-N2가 든다. 기존 future-work 항목 "오류 위치의 글자"와 "오류 메시지의 언어와 꼴"이 같은 물음을 들고 있고(`Planning: unplanned`), 병합 뒤 점검이 이 Story의 새 사례를 그 항목에 합칠 수 있다 | 없음 |
| monitor, 다른 오류에 닿는 입력 | 여섯째 | N-3, PO1-N3과 기존 항목 "문자열이 아닌 입력"이 든다 | 없음 |
| monitor, 번역의 범위 | 일곱째 | bug-2-INSP-001의 읽기가 판정했다(qa-r1, Dev의 dev-1.1). 시험이 가리지 못한다는 사실은 Story의 `coverage_gaps`가 든다 | 없음 |
| monitor, 시험이 가리지 못하는 변형 | 여덟째 | 빈 까닭은 TEST-001이다. 나머지는 `coverage_gaps`가 든다 | TEST-001 |
| 회차 `note`의 합친 후보 | gate `review_rounds` | `1 + D`의 위치 0은 PO1-N1, 영어 까닭은 PO1-N2, 다른 오류에 닿는 입력은 PO1-N3, 경계 부근의 결과는 PO1-N4, 거의 찬 스택과 큰 스택은 PO1-N5, 결정의 자리는 PO1-N6과 PO2-N1에 합쳤다. 새 지적이 없다 | 없음 |
| 회차 `note`의 기각 후보 | gate `review_rounds` | 숫자 리터럴, 80칸을 넘는 줄 7개, 라벨 글자와 입력 도우미의 되풀이, 시험 이름의 `inside`, `calculationErrorAt`의 `options`, 화면과 `Parser`의 다른 `RangeError` 경로. QA가 각각 이유와 함께 기각했고 Dev가 다시 열지 않는다 | 없음 |
| 적대적 점검 | gate `adversarial_checks` | ARCH-001, TEST-001, DOC-001은 CONFIRMED이고 위 분석이 든다. PO1-N4, PO1-N5도 CONFIRMED이고 위 monitor 둘째와 셋째가 든다 | 없음 |
| 넘겨받은 질문 | QA Results, qa-r1 | Dev와 Cleaner가 넘긴 질문은 없다고 QA가 적는다. 리드와 미완료 점검도 없다 | 없음 |

입력 항목과 대조 항목이 모두 맞는다. 활성 지적 2, 닫힌 지적 1, `recommendations.immediate` 2, `recommendations.future` 3, `monitor` 8을 모두 세었다.

## 점검

Node.js v24.22.1, 프로젝트 루트, HEAD `e0d6507`에서 시작했다. 이 기록의 점검용 스크립트와 출력은 프로젝트 임시 영역에 두었고 저장소 파일은 읽기만 했다(Story와 이 기록의 저장은 제외한다).

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 지시 점검 | `sh .bmad-core/utils/checks/check-instructions.sh` | 종료 상태 0 |
| 전체 시험 | 프로젝트 루트의 `node --test` | 종료 상태 0, 76개 통과, 실패 0, 취소와 건너뜀 0 |
| CI 규칙 | `node ci/screen-rule.check.mjs` | 종료 상태 0, 출력 없음 |
| 제품과 시험 파일 | `git diff --quiet 4a69ac7 HEAD -- src test`, `git hash-object` | 종료 상태 0, `0e36604857b9`, `51193b926986`, `06fedf3f30bf`로 Story의 Review 인계와 같다 |
| 저장 전의 Done 전 감사 | `sh .bmad-core/utils/checks/check-done.sh docs/stories/bug/bug-2.story.md` | 종료 상태 1. `TEST-001: an active Optional issue has no "Treatment:" line in Completion Notes`와 DOC-001의 같은 메시지 둘뿐이다. 읽기만 하는 감사이고 Status를 바꾸지 않았다 |
| 저장 전의 Story 기록 | `check-stage.sh records`, `qa-record`, `po-record`, `check-gate.sh docs/qa/gates/bug-2.yml` | 모두 종료 상태 0. `qa-record`는 `Gate: WAIVED`, `Round: 1`, `po-record`는 `Validation: GO`, `Round: 2` |
| TEST-001 재현 | 코드와 시험의 사본 넷에 각각 `node --test` | 통제 76개 통과, 빈 까닭의 엔진 76개 통과, 단언을 더한 시험은 통제에서 76개 통과, 빈 까닭의 엔진에서 75개 통과와 실패 1(`gives a different reason in the message for different problems`) |
| DOC-001 재현 | 실행 출력 파일의 수정 시각 나열, 검토자의 변형 요약에서 `exit 0` 행과 `catch-every-other-error` 검색 | 첫 RED 02:07:12, 검토자의 76개 통과 변형 여섯, `catch-every-other-error`는 요약에 없음(검색 일치 0) |
| 저장 뒤의 Done 전 감사 | 같은 명령을 Story와 이 기록을 저장한 글로 다시 실행 | 종료 상태 0. 저장 전의 종료 상태 1이 처리 줄 둘로 사라졌다. Status를 바꾸지 않는 읽기만 하는 감사다 |
| 저장 뒤의 Story 기록 | `check-stage.sh records`, `qa-record`, `po-record`, `check-gate.sh docs/qa/gates/bug-2.yml`, `check-stage.sh future --story bug-2` | 모두 종료 상태 0. `qa-record`는 `Gate: WAIVED`, `Round: 1`, `po-record`는 `Validation: GO`, `Round: 2`. `future`는 기존 항목의 `Revisit:` 알림만 냈다(이 라운드는 그 파일을 바꾸지 않았다) |
| Story의 변경 | `git diff --stat`, `git diff -U0`의 변경 구역 | 더한 줄 11개, 지운 줄 0개. 더한 곳은 Agent Identity의 문단, Debug Log References의 항목, Completion Notes의 항목 넷과 처리 줄 둘, File List의 항목, Change Log의 행이다. Status는 Review 그대로, QA Results와 gate는 바꾸지 않았다 |
| 스테이징 뒤 점검 | Story와 이 기록의 두 경로만 `git add`한 뒤 `sh .bmad-core/utils/checks/check-staged.sh` | 종료 상태 0(보이지 않는 문자, 임시 경로, 지켜 보는 기록 규칙). 이 기록의 마지막 저장 뒤 같은 명령을 다시 실행해 종료 상태 0을 확인한 값이다 |
| 저장한 처리 줄 | Completion Notes의 끝 줄 읽기 | `DoD: READY`(앞선 줄 그대로) 뒤에 `Treatment: TEST-001 future`, `Treatment: DOC-001 future`가 이어지고 그 뒤에 다른 글이 없다. 두 ID는 Dev Agent Record의 future 기록에 이름이 있다 |

`check-stage.sh review`는 요구 조건이 Status InProgress여서 실행하지 않았다. Status는 Review 그대로이고 이 라운드가 InProgress로 가지 않았다. 구현이 없어 CP-5/6, 6.5(주석 위생 검사), Cleaner, 완료 점검의 CRAP 비교는 실행하지 않았다.

## 한계

- TEST-001의 "필요한 일"의 단언은 사본에서 시험한 한 가지 꼴이다. 단언의 꼴은 고칠 때 다시 정한다(Cleaner F-3의 저울질).
- DOC-001의 확인은 Dev가 남긴 출력 파일의 수정 시각과 검토자의 변형 요약에 기댄다. 그 파일들은 병합 뒤 정리에서 지워지는 일회용 자료이고, 이 기록은 그 결과를 인라인으로 적었다.
- TEST-001, DOC-001 모두 이 라운드에 고치지 않았다. 위 future 기록이 필요한 일을 든다.
- 이 호출은 호스팅 서비스를 읽지 않아 이슈 #17의 실제 상태와 서비스 CI의 실행은 보지 않았다.
- 변형 확인은 손으로 만든 사본 하나씩이고 변이 도구가 없다.
- effort의 이름과 이 세션이 받은 값의 대응은 확인하지 못했다.
