# dev-qa-r1 — QA 1회차 지적의 분석과 처리 결정

- Story: [tech-debt-3](../../stories/tech-debt/tech-debt-3.story.md)
- Entry: Dev `review-qa`(`tasks/apply-qa-fixes.md`)의 QA 라운드 1 분석과 결정 목록. 구현이 없는 기록 인계다
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story tech-debt-3 remote to Done` run의 역할 작업. effort는 설정의 이름(`xhigh`)과의 대응을 이 세션이 확인할 수 없다
- 시각: 2026-11-07, 07:33 +0900에 기록을 쓰기 시작했다. 마지막 저장 시각은 파일과 커밋이 말한다
- 입력 기준: 브랜치 `story/tech-debt-3-story-1-3-dev`, HEAD `421a7c1`(QA 1회차 기록 커밋), 기준선 `main`의 `20256e4`, 작업 트리 깨끗(`git status --porcelain` 출력 없음), Status Review. 입력은 gate `docs/qa/gates/tech-debt-3-story-1-3-dev.yml`(회차 1, PASS), Story의 QA Results와 Dev Agent Record, 기록 문서 [qa-r1](qa-r1.md)이다. 별도 평가 문서는 없고(`docs/qa/assessments`가 없다), 추가 검토도 없다(qa-r1의 Extra Reviews가 없다고 적는다)

## 읽은 규칙과 절차

`tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문(Dev의 규칙 종류 `operations`, `design`, `documentation`과 Story의 Convention Sections): `golden-rules`, `documentation`, `testing-tdd`. 읽지 않은 본문: `comments`, `coding-principles`, `crap`(Dev의 규칙 종류가 아니고 Story가 review-sections로 둔다), `javascript-language`, `javascript-crap`(이 라운드는 코드와 코드 주석을 쓰지 않는다).
- 끝까지 읽은 절차: `agents/dev.md`, `project-map.md`, `core-config.yaml`, `tasks/load-project-rules.md`, `tasks/apply-qa-fixes.md`와 하위 작업 collect, extract, validate(구현이 없어 CP-5/6의 implement는 실행하지 않았고 읽지 않았다), `data/agent-context.md`, `data/story-paths.md`, `data/future-work-planning.md`, `data/finding-classification.md`, `data/verification-ownership.md`, `data/domain-language.md`.
- 일부만 읽은 절차: `tasks/run-story.md`(Purpose, Inputs and authorization, Next task), `data/local-git-workflow.md`(Development branches부터 Base branch commits의 시작까지와 In a run), `templates/story-tmpl.yaml`(Completion Notes의 지시), `utils/checks/story-rules.awk`(머리말, 처리 줄을 읽는 부분), `utils/checks/check-done.sh`(머리말).
- 읽지 않은 절차: `tasks/local-story-review.md`와 `tasks/develop-story.md`(처리가 모두 deferral이어서 Review 인계를 다시 하지 않는다), `data/development-quality.md`와 `data/defect-diagnosis.md`(코드를 쓰거나 결함을 고치지 않았다), `data/workflow-routing.md`. 설정된 용어집 `docs/domain-glossary.md`는 없어 불러오지 않았다.
- 앞선 Story의 처리 기록(`docs/story-records/bug-2/dev-qa-r1.md`)은 꼴의 참고로만 보았고 규칙으로 읽지 않았다.
- 프로젝트 밖 원문 조사: 사용자의 말로 이 호출에서 면제되었고 이 라운드는 프로젝트 밖 자료를 읽지 않았다. 이 면제는 `AGENTS.md`의 조사 요건을 채운 것이 아니며 이 라운드에 핵심 기술 결정이 없다.

## 처리 결정의 권한

Story의 PO Validation 1회 항목에 저장된 실행 요청 줄(단계 `through Done remote`, 사용자, 2026-11-07 05:31 +0900)이 `tasks/run-story.md` 섹션 Inputs and authorization에 따라 이 run이 답하는 결정을 정한다. 그 글은 "recording the Optional and future findings that the Story does not apply as future records in the Story"를 답하고, 요구사항이나 범위의 변경, 면제, Story 작업의 drop은 사용자에게 남긴다. 메인 세션이 이 역할 작업에 전달한 지시도 같은 범위다. 이 라운드에 `contract`나 `pending`으로 분류된 지적과 면제 요청은 없고(gate의 `top_issues`는 활성 Optional 넷뿐이고 QA Results의 Finding Routes가 활성 Required와 Recommended는 없다고 적는다), 사용자가 drop한 지적도 없다.

DOC-002 ~ DOC-005의 처리를 `apply-qa-fixes.md`의 글에서 다음과 같이 읽었다. 메인 세션이 지시에 적은 읽기와 같고 글이 다르게 말하는 곳은 없었다.

- 현재 Story의 일로 적용하는 Optional은 둘뿐이다. 하나는 Required나 Recommended를 고치는 라운드에서 Dev가 값어치 있다고 고르는 Optional(CP-4 "During a round that fixes Required or Recommended findings, Dev also applies the Optional findings that it judges worthwhile"), 다른 하나는 사용자가 명시로 정한 처리다. 이 라운드의 활성 Required와 Recommended는 0이어서 앞의 길이 닿지 않고, 사용자의 결정도 없다. 실행 요청 줄은 Optional의 적용을 답하지 않는다.
- 그 밖의 Optional은 CP-4가 정한 대로 "each one that the Story does not apply, and that the user does not drop, is recorded as a future record in Dev Agent Record for the post-merge PO check"다. 처리 줄은 `future`다. `none`은 사용자가 drop한 지적에만 쓰고 사용자만 drop한다. 사용자는 넷 가운데 어느 것도 drop하지 않았으므로 `none`은 닿지 않는다.
- 이 처리는 `InProgress`로의 복귀를 허락하지 않는다. CP-4는 복귀를 "user-selected current-Story changes while Status is Review"에 두고 "Analysis or the presence of Optional findings alone does not authorize this transition"이라고 적는다. 이 라운드의 결정이 모두 deferral이므로 "preserve the starting Story Status during this pipeline and skip implementation checkpoints"를 따른다. "A future Optional deferral alone needs no status transition or new review."
- `fix`로 두었을 때의 결과도 확인했다. `utils/checks/story-rules.awk`는 활성 Optional의 처리 줄이 `fix`이면 "a fix needs a QA review that closes the issue before Done"를 보고한다. 곧 `fix`는 Review에서 InProgress로의 복귀, 새 SubTask, 새 QA 회차를 모두 부른다. 그 어느 것도 이 run의 요청이 답한 결정이 아니다.
- 이 run의 Next task 항목 "Review with a PASS gate"는 QA의 `local-story-done.md` 앞에 Dev의 `apply-qa-fixes.md`가 "each Optional and future finding that the Story does not apply as a future record in Dev Agent Record with its `Treatment:` line"을 남기는 것으로 쓴다. 이 라운드가 하는 일이 그것이다.
- 네 지적은 모두 이 Story가 쓴 Dev 기록의 표현이다. 아래에서 각각을 이 Story의 수용된 완료 의무(AC 1 ~ 3, 회귀 기준, Architecture 정렬)와 대었고, 어느 것도 그 의무에 닿지 않는다. 그래서 `future`라는 이름이 현재 의무를 가리지 않는다(`apply-qa-fixes.md` CP-4의 "A future scheduling label does not exempt a current obligation").

## 결정 목록

활성 지적은 gate의 `top_issues`(라운드 1)에 DOC-002, DOC-003, DOC-004, DOC-005 넷이다. 그 밖의 대상은 `resolved_issues`(비어 있음), `recommendations.immediate` 둘, `recommendations.future` 둘, `risk_summary.recommendations.monitor` 셋, 회차 `note`의 기각한 후보 다섯, `adversarial_checks` 둘, `deviations` 하나, 넘겨받은 질문과 리드(없음)다. 아래 둘째 표가 이 항목을 모두 어디에 보관하는지 대조한다.

| ID | QA 처분 | 심각도, 확신 | 경로와 소유자 | 증거 확인 | 처리 | 줄 |
| --- | --- | --- | --- | --- | --- | --- |
| DOC-002 | optional | low, high | 계약 안, 소유자 Dev | Git의 변경 경로와 Story의 글을 대어 재현함 | 적용하지 않고 future 기록 | `Treatment: DOC-002 future` |
| DOC-003 | optional | low, high | 계약 안, 소유자 Dev | 소스 트리 표, `git ls-files`, future-work 항목의 글에서 재현함 | 적용하지 않고 future 기록 | `Treatment: DOC-003 future` |
| DOC-004 | optional | low, high | 계약 안, 소유자 Dev | Story 1.3의 세 개정을 섹션별로 세어 재현함 | 적용하지 않고 future 기록 | `Treatment: DOC-004 future` |
| DOC-005 | optional | low, medium | 계약 안, 소유자 Dev | 새 기록과 Story에서 서수와 둘레 글을 찾아 재현함 | 적용하지 않고 future 기록 | `Treatment: DOC-005 future` |

이의를 낸 지적은 없다. 네 지적의 QA 분류(Optional, 비차단, 계약 안, 소유자 Dev)에 동의한다. DOC-005의 확신 medium과 그 갈림은 아래 해당 분석에 적었다.

## 지적별 분석

### DOC-002 Review 인계의 나열이 변경 경로 넷을 덜 든다

- 확인, Story의 글: Completion Notes의 항목 "Review 인계"는 "이 Story의 변경은 Story 파일과 이 Story의 기록 문서(`dev-1.1.md`, `dev-2.1.md`, `dev-dod-1.md`)뿐이고"라고 적는다.
- 확인, Git: Dev의 마지막 커밋 `a676f8e`까지 `git diff --name-status 20256e4 a676f8e`는 A 여덟 줄이다. Story 파일, `dev-1.1.md`, `dev-2.1.md`, `dev-dod-1.md`, `po-r1.md`, `po-r2.md`, `sm-1.md`, `sm-2.md`다. 시작 커밋 `2e86847`이 Story 파일과 `sm-1.md`, `sm-2.md`, `po-r1.md`, `po-r2.md`를 더했다(`git diff --name-status 20256e4 2e86847`: A 다섯). 그래서 괄호의 나열이 `sm-`, `po-` 문서 넷을 들지 않는다. 지금의 HEAD `421a7c1`까지는 A 열 줄이고, 위 여덟에 QA가 더한 gate와 `qa-r1.md`가 늘었다.
- 확인, 같은 Story의 다른 기록: 같은 섹션의 File List와 [dev-dod-1](dev-dod-1.md)의 항목 "File List가 모든 바뀐 파일과 필요한 동반 파일을 담는다"는 `sm-`, `po-` 넷과 `dev-` 셋의 일곱 문서를 모두 든다.
- 분류: QA의 결정 순서에 동의한다. "뿐"이 말하는 사실(코드와 시험이 아니라 Story 파일과 이 Story의 기록 문서만 바뀌었다)은 여덟 경로 모두에 맞고 괄호의 나열만 넷을 덜 든다. 이 나열에 기대는 Task, 점검, 기록이 없다. tech-debt-3-INSP-004는 나열이 아니라 Dev Notes "파일 위치"의 "바꾸는 경로" 행을 받는 경로로 삼는다.
- 완료 의무와의 대조: AC 3의 확인 조건은 그 행의 경로와 표 3의 해시이고 이 나열을 받는 조건이 없다. 시험 증거와 Architecture 정렬에도 닿지 않는다. 현재 의무가 아니다.
- 처리: 적용하지 않고 future로 기록한다. 근거는 위 "처리 결정의 권한"이다.
- 필요한 일: 새 항목에서 변경 집합을 Story 파일과 이 Story의 기록 문서 일곱(`sm-1`, `sm-2`, `po-r1`, `po-r2`, `dev-1.1`, `dev-2.1`, `dev-dod-1`)으로 적는다. 앞선 항목은 고쳐 쓰지 않는다.
- 제안하는 자리: 같은 기준의 기존 항목 `[Tech-Debt] 재발: 기록의 서술이 실제와 다름`이다(QA의 제안과 같다). 대조는 병합 뒤 점검의 일이다. 이 라운드는 `docs/planning/future-work.md`를 바꾸지 않았다.
- 결정이 바뀌는 조건: 이 Story가 다른 까닭으로 InProgress로 돌아와 이 항목이 수용된 범위 안에서 고칠 수 있게 되면 같은 Story에서 고치고, 그때의 `Treatment: DOC-002 fix` 줄이 이 future 결정을 대신한다(`apply-qa-fixes.md`).

### DOC-003 소스 트리 틈의 출처가 덜 정확하다

- 확인, 글: [dev-2.1](dev-2.1.md)의 "기존에 있던 어긋남" 문단, Completion Notes의 2.1 항목, [dev-dod-1](dev-dod-1.md)의 섹션 "최종 확인"의 "기술 부채와 남은 일"이 같은 틈을 적는다. 소스 트리 표가 `ci/`와 워크플로(`ci/screen-rule.check.mjs`, `.github/workflows/ci.yml`)를 말하지 않는 틈이고, future-work 항목 "CI 규칙이 계획 문서에 없음"이 이미 든다는 것이다.
- 확인, 표: `docs/architecture.md`의 섹션 "소스 트리"는 `src/number-format.js`, `src/engine.js`, `src/units.js`, `src/screen.js`, `test/{모듈}.test.js` 다섯 행이다. 이 브랜치의 HEAD에서 `git ls-files ci .github`는 `ci/screen-rule.check.mjs`와 `.github/workflows/ci.yml`을 내고 둘 다 표에 없다. 틈은 맞다.
- 확인, 항목: 항목 "CI 규칙이 계획 문서에 없음"에서 소스 트리를 말하는 곳은 둘뿐이다. 하나는 `src/screen.js` 행이 내보내기 `SCREEN_WIDTH`를 덜 적는다는 문장이고, 다른 하나는 끝나는 조건 "문서의 값이 `EXPECTED_WIDTH`와 같고 `src/screen.js` 행이 내보내기를 모두 들면 끝난다"다. 항목의 나머지는 `ci/screen-rule.check.mjs`와 `ci/engine-rule.check.mjs`의 규칙과 값과 까닭이 계획 문서에 없다는 것을 말하고, `.github/workflows/ci.yml`은 단계가 더해졌다는 문장에서 한 번 나온다. 두 경로를 소스 트리 표에 더한다는 일은 항목 어디에도 없다.
- 분류: QA의 결정 순서에 동의한다. 표의 틈은 항목 제목이 말하는 넓은 틈 안에 있어 출처를 덜 정확하게 댄 글이고 거짓이 아니다. 틈 자체는 이 Story가 만들지 않았다.
- 완료 의무와의 대조: tech-debt-3-INSP-005의 실패 기준은 "어긋남이 있는데 기록이나 보고가 없거나, 대조 없이 no-change라고 적는다"이다. 이 어긋남은 dev-2.1에 기록되어 있고 no-change 결론은 변경 집합이 닿는 문서가 없다는 대조에서 나온다. 출처가 덜 정확해도 그 결론과 합격 판정은 그대로다. 현재 의무가 아니다.
- 처리: 적용하지 않고 future로 기록한다. 근거는 위 "처리 결정의 권한"이다. `fix`로 두어도 소스 트리 표를 고치지는 못한다. 그 표는 Architect의 문서이고 이 Story의 범위 밖이다.
- 필요한 일: 병합 뒤 PO 점검이 이 기록을 옮길 때 항목 "CI 규칙이 계획 문서에 없음"에 `ci/screen-rule.check.mjs`와 `.github/workflows/ci.yml`이 소스 트리 표에 없다는 사실을 이름 들어 더한다. 더하면 그 항목은 트리아지로 돌아간다. 소스 트리 표를 고치는 일은 이 Story의 일이 아니고 `docs/architecture.md`를 바꾸지 않았다.
- 결정이 바뀌는 조건: 위 DOC-002와 같다. 그때의 `Treatment: DOC-003 fix` 줄은 dev-2.1과 Completion Notes의 출처 표현을 새 항목에서 바로잡는 일에 닿는다.

### DOC-004 재지 않은 곳의 목록이 Dev Agent Record를 들지 않는다

- 확인, 글: 정정 항목의 둘째 문장 부분은 "Scope and Dependencies, SM Draft Checklist, PO Validation, QA Results는 재지 않았다"고 적고, 이 목록은 Story 1.3의 Dev Agent Record를 들지 않는다. 글은 Story의 표 2 `잰 범위` 행과 같다.
- 확인, 실행: 표 2의 패턴(앞에 숫자와 점이 없고 뒤에 숫자나 영문자가 없는 40)으로 `git show {개정}:docs/stories/1.3.story.md`의 줄을 `## ` 제목별로 센 결과다. 명령은 `awk '/^## /{s=$0} {print s "\t" $0}'`로 줄마다 가장 가까운 앞 제목을 붙이고 `grep -E`로 패턴에 드는 줄을 골라 제목별로 센 것이다.

| 개정 | Scope and Dependencies | Dev Notes | SM Draft Checklist | PO Validation | Dev Agent Record | QA Results |
| --- | --- | --- | --- | --- | --- | --- |
| `8579e5a` | 6 | 4 | 2 | 3 | 2 | 3 |
| `6701dcd` | 6 | 4 | 2 | 3 | 7 | 3 |
| `6188a27` | 6 | 4 | 2 | 3 | 8 | 5 |

- 확인, 둘레 글: `8579e5a`의 Dev Agent Record 두 줄은 "오류 줄이 40글자를 넘지 않게"(값 `40글자`)와 시각 `21:40`이다. `6188a27`의 여덟 줄에는 그 둘에 더해 실패 메시지의 `got 40`, 옛 폭과 옛 규칙의 값 40, 그리고 고칠 문장 "현재 계획의 글(Dev Notes, Testing, 표)에는 40이 없다"를 인용한 글이 있다. 잰 범위(`## Dev Notes`부터 다음 `## ` 앞까지)의 네 줄은 모든 개정에서 같다. QA가 같은 수를 냈고 내가 직접 다시 셌다.
- 그대로인 것: 잰 범위와 네 곳(P-1 ~ P-4), 값의 뜻, 48은 맞다. 목록에 든 넷을 재지 않았다는 말도 맞다. 고칠 문장 `dev-qa-r2`의 `확인`의 앞 절 "남은 40은 ... 뿐이고"도 Dev Agent Record를 들지 않지만, 그 절은 이 Story의 범위 밖이고 Story가 두 문장 말고 다른 문장을 다시 판정하지 않으므로 판정하지 않았다.
- 분류: QA의 결정 순서에 동의한다. 정정 항목은 "판정 방법"의 받는 글을 채우고 거부하는 글에 들지 않으며 표 2가 이 글을 정한다. 목록은 든 곳마다 "재지 않았다"는 말이 맞아서 틀린 값을 내지 않고, Story가 이 목록을 완전한 목록으로 쓰는 Task나 점검도 없다(`data/finding-classification.md` step 3의 "imprecise").
- 완료 의무와의 대조: AC 2의 확인 조건은 표 2의 명령 값과 "판정 방법"의 둘째 문장 기준이고, 기준의 거부하는 글에 "잰 범위 없이" 적는 글이 든다. 항목은 잰 범위를 적었다. 재지 않은 곳의 목록이 완전해야 한다는 조건은 없다. 현재 의무가 아니다.
- 처리: 적용하지 않고 future로 기록한다. 근거는 위 "처리 결정의 권한"이다.
- 필요한 일: 새 항목에서 재지 않은 곳에 Story 1.3의 Dev Agent Record를 더해, 값 40이 남은 곳을 찾는 뒤의 검토자가 이 목록을 재지 않은 곳의 전부로 읽지 않게 한다. 앞선 항목은 고쳐 쓰지 않는다. 표 2의 글은 SM의 것이어서 Dev가 고치지 않는다.
- 제안하는 자리: 같은 기준의 기존 항목 `[Tech-Debt] 재발: 기록의 서술이 실제와 다름`이다. 대조는 병합 뒤 점검의 일이다.
- 결정이 바뀌는 조건: 위 DOC-002와 같다. 그때의 `Treatment: DOC-004 fix` 줄이 이 future 결정을 대신한다.

### DOC-005 문장 서수가 자리를 가리킨다

- 확인, 위치: [dev-1.1](dev-1.1.md)의 섹션 "tech-debt-3-INSP-003: 둘째 문장의 정정 항목 읽기"에서 "항목은 앞선 기록을 고쳐 쓰지 않고 이 항목에서 정정한다고 적는다"에 괄호로 붙은 "첫 문장"이 정정 항목의 문장 하나를 서수로 가리킨다. Story의 AC 1과 AC 2의 Source 줄도 항목의 `내용`을 서수로 가리킨다.
- 확인, 제외한 것: [dev-dod-1](dev-dod-1.md)의 "AC 2 둘째 문장의 정정"과 "둘째 문장 기준"은 Story의 표 1, 표 2와 "판정 방법"이 쓰는 두 문장의 이름이어서 자리를 가리키는 서수가 아니다. 새 Dev 기록 셋에서 줄 번호와 줄 좌표의 꼴(`줄 N`, `N행`, 파일 뒤의 `:N`)은 찾은 곳이 없다. 시각과 `줄 수` 행의 수는 위치가 아니라 값이다.
- 두 읽기: 하나는 QA의 읽기다. 서수가 같은 곳에 말을 함께 들고 있거나(dev-1.1은 바로 앞에 문장의 말을 든다) 커밋 `6188a27`에 묶여 움직일 수 없는 글을 가리키면(AC의 Source 줄은 그 항목의 글을 가리키고 Scope and Dependencies가 그 글을 그대로 옮긴다) CC-DOC-009가 서수를 막는 까닭인 "an edit elsewhere in the source can move them"이 닿지 않고, 그때 서수가 locator인지를 규칙이 정하지 않아 이 경우의 기준이 아니라고 본다. 다른 하나는 CC-DOC-009의 "Historical evidence ... locating the cited point with the identifiers above"가 묶인 글까지 덮는다고 보는 읽기이고, 그러면 위반이어서 차단이다.
- 분류: QA의 분류(Optional, 확신 medium)를 따른다. 위 둘레 글을 직접 읽어 자리를 잘못 찾는 경우를 만들지 못했고, 다른 읽기가 맞다고 내가 반박할 근거도 없다. Dev는 QA의 분류를 바꾸지 않는다. 다른 읽기가 맞다고 QA나 사용자가 정하면 이 지적은 `rework`가 되어 Story가 InProgress로 돌아가 고친다. `apply-qa-fixes.md`가 말하는 "one that Dev can fix inside the contract is fixed"는 위반으로 확정된 지적에 닿고, QA가 위반이 아니라고 분류한 이 지적에는 닿지 않는다.
- 완료 의무와의 대조: AC 1, AC 2의 확인 조건과 "판정 방법"의 거부하는 글은 줄 번호로 자리를 적는 글만 거부한다. 서수는 거부 목록에 없고 Task와 점검이 서수에 기대지 않는다. 현재 의무가 아니다.
- 처리: 적용하지 않고 future로 기록한다. 근거는 위 "처리 결정의 권한"이다.
- 필요한 일: 뒤의 기록에서 문장을 서수 없이 문장의 말로만 가리킨다. AC의 Source 줄은 SM의 글이고 PO 두 회차가 통과시켰으므로 Dev가 고치지 않는다. 같은 꼴을 규칙이 막는지 분명히 하려면 convention 제안의 일이고, 이 라운드는 제안을 쓰지 않았다.
- 제안하는 자리: 정하는 것은 PO의 트리아지다. 같은 기준의 기존 항목 `[Tech-Debt] 재발: 기록의 서술이 실제와 다름`과 대조하는 것은 병합 뒤 점검의 일이다.
- 결정이 바뀌는 조건: 위 DOC-002와 같다. 그때의 `Treatment: DOC-005 fix` 줄이 이 future 결정을 대신한다.

## 처리 줄이 없는 나머지 항목의 보관 위치

각 항목의 보관 위치를 직접 열어 확인했다. 줄이 없는 까닭은 이미 보관된 곳이 있거나, QA가 자기 기록에서 맡거나, 활성 지적이 아닌 기각 후보이기 때문이다. `docs/planning/future-work.md`의 항목은 HEAD의 파일에서 제목을 읽었고 이 라운드는 그 파일을 바꾸지 않았다.

| 항목 | 출처 | 보관 위치와 확인 | 줄 |
| --- | --- | --- | --- |
| `recommendations.immediate` 첫째 | gate | Dev가 DOC-002 ~ DOC-005의 처리를 정해 처리 줄을 남기라는 일이다. 위 넷이 답한다 | DOC-002 ~ DOC-005 |
| `recommendations.immediate` 둘째 | gate | QA의 완료 점검(`tasks/local-story-done.md`)이 현재 입력을 확인하고 Done 커밋을 만든다는 일이다. QA의 일이다 | 없음 |
| `recommendations.future` 첫째, PO1-N1 | gate | Story의 PO Validation 1회 항목에 있다. 병합 뒤 PO 점검이 Story가 적용하지 않은 PO의 비차단 지적을 future-work 항목으로 옮긴다(`data/future-work-planning.md`). Story는 정정을 Story 1.3의 파일에 두지 않으므로 이 지적을 적용하지 않았다 | 없음. PO의 기록이다 |
| `recommendations.future` 둘째, Story 1.3의 DOC-001 | gate | `docs/qa/gates/1.3.yml`의 DOC-001과 Story 1.3의 처리 줄 `DOC-001 future`는 그때의 기록으로 남는다. 이 Story의 Scope and Dependencies "범위 밖"과 SM Draft Checklist의 N-3이 든다 | 없음 |
| monitor 첫째, 정정으로 가는 길 | `risk_summary.recommendations.monitor` | 위 PO1-N1과 같다. 실행 맵의 `coverage_gaps`도 "정정이 Story 1.3의 파일에 없어 그 기록만 읽는 사람에게 닿는 길을 시험하지 않는다"로 든다 | 없음 |
| monitor 둘째, archive ref | 같은 곳 | 비교한 커밋이 이 checkout의 `refs/archive/story/1.3`에만 닿는다. 값은 Story와 [dev-1.1](dev-1.1.md)에 있고, Scope and Dependencies의 입력 표가 "원격에 이 ref가 있는지는 보지 않았다"고 적는다 | 없음 |
| monitor 셋째, 기록의 서술이 실제와 다른 꼴 | 같은 곳 | DOC-002, DOC-003, DOC-004이고 위 future 기록이 든다. 병합 뒤 점검이 기존 항목 `[Tech-Debt] 재발: 기록의 서술이 실제와 다름`과 대조한다 | DOC-002 ~ DOC-004 |
| 회차 `note`의 기각 후보 다섯 | gate `review_rounds` | Dev 자신의 시각 줄 고침(`a676f8e`, `26a42cd`), 2.1 줄의 "여섯", `dev-dod-1`의 "커밋 메시지 파일 셋", 로컬 로그의 QA 쓰임, 표 2의 패턴이 시각 `21:40`을 잡는 것이다. QA가 각각 까닭과 함께 기각했고 Dev가 다시 열지 않는다. `a676f8e`의 시각 줄 고침은 Change Log 0.6과 앞선 커밋이 까닭과 옛 글을 남긴다 | 없음 |
| `adversarial_checks` 둘 | gate | tech-debt-3-INSP-001의 다른 엔진 재계산(CONFIRMED, 지적 없음)과 DOC-004(CONFIRMED)다. 뒤의 것이 위 분석이 든다 | DOC-004 |
| `deviations` 하나 | gate | QA 세션의 점검 명령 하나가 2,000자를 넘어 훅이 막았고 셋으로 나누어 돌렸다. 저장소를 바꾸지 않았고 이 Story의 기록에 닿지 않는다 | 없음 |
| `resolved_issues`, 넘겨받은 질문, 리드, 미완료 점검 | gate, QA Results, qa-r1 | 모두 없다고 QA가 적는다 | 없음 |

입력 항목과 대조 항목이 모두 맞는다. 활성 지적 4, `resolved_issues` 0, `recommendations.immediate` 2, `recommendations.future` 2, `monitor` 3, 기각 후보 5, `adversarial_checks` 2, `deviations` 1을 모두 세었다.

## 점검

Node.js v24.22.1, Windows x64, Git 2.51.0, 프로젝트 루트, HEAD `421a7c1`에서 시작했다. 점검은 파일 없는 명령으로 돌렸고 이 라운드는 스크립트나 출력 파일을 만들지 않았다. 저장소 파일은 읽기만 했다(Story와 이 기록의 저장은 제외한다).

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 지시 점검 | `sh .bmad-core/utils/checks/check-instructions.sh` | 종료 상태 0 |
| 전체 시험 | 프로젝트 루트의 `node --test` | 종료 상태 0, tests 76, pass 76, fail 0, cancelled 0, skipped 0, todo 0 |
| CI 규칙 | `node ci/screen-rule.check.mjs` | 종료 상태 0, 출력 없음 |
| 제품과 시험 파일 | `git diff --name-only 20256e4 -- src test ci .github package.json README.md` | 출력 없음 |
| 앞선 기록의 해시 | `git hash-object docs/story-records/1.3/dev-dod-2.md docs/story-records/1.3/dev-qa-r2.md` | `18eb39bc4ecbc7956f3d164bd3990bf739551591`, `058eb6c45a1ffafc2c3d8fc277777e9ab7a08d25`로 표 3과 같다 |
| Story 1.3의 파일과 수용 문서 | `git diff --name-only 20256e4 -- docs/story-records/1.3 docs/stories/1.3.story.md docs/qa/gates/1.3.yml docs/prd.md docs/architecture.md docs/planning` | 출력 없음 |
| 시작 커밋 뒤 `sm-`, `po-` 문서 | `git diff --name-only --no-renames --diff-filter=MD 2e86847 -- docs/story-records/tech-debt-3/` | 출력 없음. 이 기록과 Story의 저장 전후에 돌려 같다 |
| 바뀐 경로 | 이 기록과 Story를 저장한 뒤 `git diff --name-only 20256e4`와 `git status --porcelain` | Story 파일, `dev-1.1`, `dev-2.1`, `dev-dod-1`, `po-r1`, `po-r2`, `qa-r1`, `sm-1`, `sm-2`, gate와 새 `dev-qa-r1`(아직 추적하지 않음)이다. 모두 Dev Notes "파일 위치"의 "바꾸는 경로" 행의 경로다(gate와 `qa-r1`은 QA 단계의 행). `src/`, `test/`, `docs/story-records/1.3/` 같은 그 행 밖의 경로가 없다 |
| 저장 전의 Done 전 감사 | `sh .bmad-core/utils/checks/check-done.sh docs/stories/tech-debt/tech-debt-3.story.md` | 종료 상태 1. `DOC-002`, `DOC-003`, `DOC-004`, `DOC-005` 각각 `an active Optional issue has no "Treatment:" line in Completion Notes` 넷뿐이다. 읽기만 하는 감사이고 Status를 바꾸지 않았다 |
| DOC-002 재현 | `git diff --name-status 20256e4 a676f8e`, `20256e4 2e86847`, `20256e4 HEAD` | 각각 A 여덟, 다섯, 열 줄. 위 분석의 경로와 같다 |
| DOC-003 재현 | `docs/architecture.md`의 소스 트리 표 읽기, `git ls-files ci .github`, future-work 항목의 `소스 트리`, `ci.yml`, `screen-rule.check.mjs`, `engine-rule.check.mjs` 검색 | 표 다섯 행에 두 경로가 없고, 항목이 소스 트리를 말하는 곳은 둘이며 둘 다 `src/screen.js` 행에 관한 글이다 |
| DOC-004 재현 | Story 1.3의 `8579e5a`, `6701dcd`, `6188a27`을 `## ` 제목별로 센 `awk`와 `grep -E` | 위 표와 같다. `6188a27`은 QA의 수와 같다 |
| DOC-005 재현 | 새 Dev 기록 셋과 Story에서 `첫 문장`, `둘째 문장`, `끝 문장`, `마지막 문장`을 `grep`으로 찾아 둘레 글을 읽고, 새 Dev 기록 셋에서 `줄 N`, `N행`, 파일 뒤의 `:N` 꼴을 `grep`으로 찾음 | dev-1.1의 한 곳과 AC 1, AC 2의 Source 줄이 서수로 가리킨다. 줄 번호 꼴은 시각과 `줄 수` 행의 값뿐이다 |
| 저장 뒤의 Done 전 감사 | 같은 `check-done.sh` 명령을 Story와 이 기록을 저장한 글로 다시 실행 | 종료 상태 0. 저장 전의 종료 상태 1이 처리 줄 넷으로 사라졌다. 읽기만 하는 감사이고 Status를 바꾸지 않았다 |
| 저장 뒤의 Story 기록 | `check-stage.sh records`, `qa-record`, `po-record`, `check-gate.sh docs/qa/gates/tech-debt-3-story-1-3-dev.yml`, `check-stage.sh future --story tech-debt-3` | 모두 종료 상태 0. `qa-record`는 `Gate: PASS`, `Round: 1`, `po-record`는 `Validation: GO`, `Round: 2`, `Collection: complete`다. `future`는 기존 항목 둘의 `Revisit:` 알림만 냈다(이 라운드는 그 파일을 바꾸지 않았다) |
| Story의 변경 | `git diff --numstat`, `git diff -U0`의 변경 구역 읽기 | 더한 줄 16개, 지운 줄 0개. 더한 곳은 Change Log의 행 하나, Agent Identity의 문단, Debug Log References의 항목 하나, Completion Notes의 항목 여섯과 처리 줄 넷, File List의 항목 둘이다. Status는 Review 그대로, QA Results와 gate는 바꾸지 않았다 |
| 저장한 처리 줄 | Completion Notes의 끝 줄 읽기 | `DoD: READY`(앞선 줄 그대로) 뒤에 `Treatment: DOC-002 future`, `Treatment: DOC-003 future`, `Treatment: DOC-004 future`, `Treatment: DOC-005 future`가 이어지고 그 뒤에 다른 글이 없다. 네 ID는 Dev Agent Record의 future 기록에 이름이 있다 |
| 스테이징 뒤 점검 | Story와 이 기록의 두 경로만 `git add`한 뒤 `sh .bmad-core/utils/checks/check-staged.sh` | 종료 상태 0(보이지 않는 문자, 임시 경로, 지켜 보는 기록 규칙). 이 기록의 마지막 저장 뒤 같은 명령을 다시 실행해 종료 상태 0을 확인한 값이다 |

## 한계

- DOC-002 ~ DOC-005의 고침은 이 라운드에 하지 않았다. 위 future 기록이 필요한 일을 든다.
- 이 라운드의 재현은 모두 저장소의 Git 개정과 파일을 읽은 것이다. Story 1.3의 세 개정은 이 checkout의 `refs/archive/story/1.3`이 가진 커밋과 `main`의 `6188a27`에서 읽었고 원격의 ref는 보지 않았다.
- 이 호출은 호스팅 서비스를 읽지 않아 이슈 #24의 실제 상태와 서비스 CI의 실행은 보지 않았다.
- DOC-005의 분류는 QA의 읽기를 따른 것이고, 다른 읽기가 맞는지는 이 라운드가 정하지 않는다.
- 재기는 Windows x64의 Node.js v24.22.1, Git 2.51.0뿐이다.
- effort의 이름과 이 세션이 받은 값의 대응은 확인하지 못했다.
