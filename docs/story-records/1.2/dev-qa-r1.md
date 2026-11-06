# dev-qa-r1 — QA 1회차 지적의 분석과 처리 결정

- Story: [1.2](../../stories/1.2.story.md)
- Entry: Dev `review-qa`(`tasks/apply-qa-fixes.md`)의 QA 라운드 1 분석과 결정 목록
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.2 1.3 remote to Done` run의 역할 작업. effort는 시스템이 숫자 30으로만 알려 주어 설정의 이름(`xhigh`)과의 대응을 확인하지 못했다
- 시각: 2026-11-06, 분석과 결정 15:35 ~ 15:44 +0900
- 입력 기준: 브랜치 `story/1.2`, HEAD `19daa1d`(QA 1회차 기록 커밋), 작업 트리 깨끗, Status InProgress. 입력은 gate `docs/qa/gates/1.2.yml`(라운드 1, FAIL), Story의 QA Results, 기록 문서 qa-r1이다. 별도 평가 문서와 추가 검토는 없다(QA Results에 추가 검토자가 없다고 적혀 있다)

## 읽은 규칙과 절차

`tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`(Dev의 규칙 종류 `operations`, `design`, `documentation`). 완료 점검과 주석 검사를 위해 `comments`도 읽었다. `coding-principles`와 `crap`은 `quality` 종류여서 Dev의 규칙 종류가 아니고, 지적 TEST-002의 기준은 gate의 인용에 따랐으며 그 기준의 검토는 Cleaner 검토자가 맡는다.
- 절차: `agents/dev.md`, `tasks/apply-qa-fixes.md`와 그 하위 작업 넷(collect, extract, implement, validate), `tasks/review-loop.md`, `tasks/develop-story.md`, `tasks/local-task-done.md`, `tasks/local-story-review.md`, `tasks/architecture-align.md`, `tasks/code-comment-style.md`, `checklists/comment-hygiene-checklist.md`, `checklists/story-dod-checklist.md`, `data/finding-classification.md`, `data/development-quality.md`, `data/defect-diagnosis.md`, `data/verification-ownership.md`, `data/future-work-planning.md`, `data/local-git-workflow.md`, `data/story-paths.md`, `data/agent-context.md`, `data/domain-language.md`.

## 처리 결정의 권한

Story의 PO Validation에 저장된 실행 요청 줄(단계 `through Done`과 단어 `remote`, 프로젝트 소유자, 2026-11-06)과 메인 세션이 이 역할 작업에 전달한 지시가 `apply-qa-fixes.md` CP-4의 처리 결정이다. 지시의 결정: Required TEST-001, TEST-002와 Recommended REL-001은 모두 `rework`, 소유자 Dev이고 각각 고치거나 근거를 든 이의를 기록한다. Optional DOC-001, DOC-002는 수용된 계약 안에서 값어치 있다고 판단하면 Dev가 적용하고, 적용하지 않으면 future 기록과 `Treatment:` 줄로 남긴다. 이 요청은 요구사항이나 범위의 변경, 면제(waiver)를 허락하지 않는다. 참값이 범위를 넘는 입력의 결과(N-1, PO1-N1)는 소유자의 결정이 없으므로 이 작업이 정하지 않는다. `contract`나 `pending`으로 분류된 지적과 면제 요청은 이번 라운드에 없다.

## 결정 목록

다섯 지적 모두 gate의 활성 `top_issues`(라운드 1)에서 왔다. 입력 5건, 결정 목록 5건이고 겹치는 항목이 없다. REL-001은 Dev의 DEV-1(Story의 future 기록)과 PO의 PO1-N1이 더한 관찰과 같은 입력이며, QA가 이 셋을 REL-001 하나로 합쳤다(gate 회차 `note`). 합친 근거와 출처 매핑은 REL-001의 분석에 있다.

| ID | QA 처분 | 심각도, 확신 | 경로와 소유자 | 증거 확인 | 처리 | 단위 |
| --- | --- | --- | --- | --- | --- | --- |
| TEST-001 | required | low, high | rework, Dev | 확인됨 | 고침 (`Treatment: TEST-001 fix`) | 3.2 |
| TEST-002 | required | low, medium | rework, Dev | 확인됨 | 고침 (`Treatment: TEST-002 fix`) | 3.2 |
| REL-001 | recommended | low, high | rework, Dev | 확인됨 | 고침 (`Treatment: REL-001 fix`, DEV-1은 `Treatment: DEV-1 fix`로 바꿈) | 3.1 |
| DOC-001 | optional | low, high | 계약 안 | 확인됨 | Dev가 적용을 골라 고침 (`Treatment: DOC-001 fix`) | 3.3 |
| DOC-002 | optional | low, medium | 계약 안 | 확인됨 | Dev가 적용을 골라 고침 (`Treatment: DOC-002 fix`) | 3.3 |

이의를 낸 지적은 없다.

## 지적별 분석

### REL-001 참값이 범위 안인 변환이 Infinity를 돌려준다

- 재현: 기준 `19daa1d`의 `src/units.js`에서 `convert(1e303, "MPa", "kPa")`와 `convert(1e308, "F", "C")`가 둘 다 `Infinity`다(방법: 프로젝트 임시 영역의 탐침 스크립트, 출력 보관). 참값은 각각 1e306과 약 5.556e307로 배정밀도의 범위 안이다.
- 원인(`data/defect-diagnosis.md` 3단계의 설명 검증): `convert`는 `target.fromReference(source.toReference(value))`로 기준 단위(미터, 파스칼, 섭씨)를 거친다. 첫 단계의 값이 범위를 넘으면 뒤 단계가 되돌려 주지 못한다. `1e303 MPa`는 `1e303 * 1e6 = 1e309 Pa`가 `Infinity`이고, `1e308 F`는 `(1e308 - 32) * 5`가 5e308이어서 `Infinity`다. 이 설명이 맞다면 기준 단위의 값이 범위 안인 입력은 영향이 없어야 한다. 이를 정확한 유리수 산술 오라클(입력의 정확한 이진 값과 결정 D-2의 정의, 제품 코드와 코드를 나누지 않음)로 확인했다: 224000 호출에서 참값이 범위 안인데 `Infinity`인 결과가 12791건이고, 모두 kPa, MPa, bar, psi 사이의 12쌍과 C→F, K→F, F→C, F→K의 4쌍이다. 길이 쌍은 없다(기준 단위 m보다 큰 단위가 km뿐이고 같은 단위 반환이 km→km을 처리한다). QA가 적은 16쌍과 같다.
- 분류: QA의 분류(4단계 차단, Recommended, 경로 rework, 소유자 Dev)에 동의한다. 수용된 계약이 이 입력의 답을 이미 정한다. Testing "지원 입력"이 `value`로 number 형의 유한한 수를 받고, AC 1이 같은 종류의 단위 사이에서 값을 바꿔 돌려준다고 하며, D-2가 값을 정의한다. 표 3은 참값이 범위를 넘는 입력만 든다. 앞선 DEV-1 기록은 "결과가 유한하지 않을 때의 동작을 정하지 않았다"를 근거로 이 입력을 적용하지 않았으나, 이 입력은 결과의 참값이 유한하므로 그 근거에 해당하지 않는다. 앞선 서술은 고쳐 쓰지 않고 새 Completion Notes 항목에서 정정한다.
- N-1과의 경계: 참값이 범위를 한참 넘는 입력(표 3의 세 입력과 같은 부류)의 결과는 이 수정이 바꾸지 않는다. 수정 전후를 같은 오라클로 비교해 그 부류의 결과가 같음을 확인한다. 범위의 끝에서 반올림 오차 하나 안(1 ulp)인 입력은 결과가 무한대와 가장 큰 double 사이에서 달라질 수 있어 이 주장에서 뺀다(단위 3.1의 기록, Cleaner 지적 F3, F4). 이 작업은 N-1과 PO1-N1의 답을 정하지 않는다.
- 처리: 고침. 접근 `TDD`(CC-TDD-005: 재현하는 회귀 시험의 실패를 먼저 보고 고친다). 시험은 이 입력을 이름 붙인 시나리오가 없어서 Story의 값 변환 시나리오(1.2-UNIT-002, 1.2-UNIT-004)에 속하는 추가 시험으로 더한다. 수정: 배율 단위는 두 크기의 비를 먼저 구해 곱하고, 온도는 화씨 도수와 섭씨 도수의 비 9 / 5로 곱하거나 나눈다. 근거는 QA의 수정 후보와 같은 방향이나 직접 확인했다(오라클, 절대 영도 경계, 표의 시험). `convert`의 JSDoc과 온도 상수의 주석을 맞춘다(단위 3.1).

### TEST-001 시험 "returns a value unchanged when both units are the same"의 주석이 거짓이다

- 확인: 시험 파일을 읽었다. 주석 "Converting these through the reference unit of their kind would overflow"가 `cases`의 네 행을 말하고, 행 `[Number.MAX_VALUE, "C"]`의 `C`는 온도의 기준 단위이고 두 환산 함수가 값을 그대로 돌려주므로 넘치지 않는다. QA의 확인(같은 단위 반환을 지운 사본의 네 행 실행)과 같은 결론이다.
- 분류: QA의 분류(3단계, CC-CMT-010 표 아래의 문장, Required, 경로 rework, 소유자 Dev)에 동의한다.
- REL-001과의 관계: 이 수정(단위 3.1)이 배율 단위의 같은 단위 반환을 불필요하게 만든다(크기의 비가 정확히 1이다). 단위 3.1 뒤에 같은 단위 반환을 지운 사본에서 값을 바꾸는 입력을 직접 찾았다: 배율 단위는 바뀌지 않고, 켈빈과 화씨의 작은 값(1e-20 K, 1e-20 F, 가장 작은 양의 수)은 섭씨를 거치며 0이 되며, 화씨 0.1도 같은 값이 바뀐다(증거는 단위 3.2의 기록). 그래서 주석과 행을 함께 다시 쓴다.
- 처리: 고침. 접근 `verification-only`(받아들인 동작은 맞고 시험의 설명과 행만 바로잡는다). 남기는 행마다 같은 단위 반환을 지운 변형에서 주석이 말한 대로 실패함을 보인다(단위 3.2). 이 시험은 Story의 시나리오가 아니라 SubTask 1.1의 Cleaner 지적으로 더한 계획 밖 시험이다.

### TEST-002 시험 "keeps no state between calls, also after an error"가 같은 입력 `1`을 세 번 적는다

- 확인: 시험 파일을 읽었다. `convert(1, "m", "cm")`가 세 곳에 있고 뒤의 두 호출은 첫 호출의 결과 `first`와 비교한다. 입력을 바꾸려면 세 곳을 함께 고쳐야 한다.
- 분류: QA의 분류(CL-GLD-001 숫자 리터럴 1단계, Required, 확신 medium, 경로 rework, 소유자 Dev)를 따른다. 다른 읽기(시험의 입력 값이므로 3단계)가 있다는 QA의 단서가 있으나, 이의를 내는 것보다 입력에 이름을 주는 일이 작고 시험의 단언을 바꾸지 않으므로 고친다.
- 처리: 고침. 접근 `verification-only`(동작을 보존하는 시험 정리). 같은 입력의 호출을 이름 있는 지역 함수 하나로 모은다. 정리 전후의 시험 통과와 오류 뒤에 상태가 남는 변형의 실패를 보인다(단위 3.2).

### DOC-001 dev-1.1의 "시험 파일의 문자" 문장이 이스케이프 자리에도 문자를 적었다

- 확인: dev-1.1.md의 해당 문장 바이트를 읽었다. 괄호 안의 "이스케이프" 자리에 문자 U+00B0(도 기호, UTF-8 바이트 302 260)이 적혀 있다. 시험 파일의 해당 줄은 `degC` 앞의 값에 이스케이프(역슬래시, 소문자 u, 숫자 00b0의 여섯 ASCII 문자)가 있고 파일에 ASCII 밖의 바이트가 없다(`LC_ALL=C grep -c '[^ -~]'`가 0). QA의 관찰이 맞다.
- 분류: QA의 분류(Optional, 계약 안)를 따른다. 사실은 맞고 표현만 부정확하다.
- 처리: Dev가 적용을 고른다. 값어치: 기록만 읽는 사람이 무엇으로 바꿨는지 알 수 있게 한다. 비용은 기록 한 항목이다. 앞선 기록은 고쳐 쓰지 않고 새 Dev 기록(단위 3.3)에서 바로잡는다. 이 기록을 쓰는 도구도 이스케이프를 문자로 저장할 수 있어, 이스케이프를 글자로 풀어 쓰고 저장한 뒤 바이트로 확인한다.

### DOC-002 Dev Notes의 "Dev는 구현 전에 다시 확인한다"에 대응하는 기록이 없다

- 확인: dev-1.1.md와 Completion Notes를 읽었다. 구현 전에 Dev Notes의 값을 다시 실행했다는 기록이 없고, 같은 값이 나오는 Dev의 실행 출력은 구현 뒤의 것이다. 이 세션이 앞선 Dev 세션의 실행을 대신 증명할 수 없으므로 빠진 증거로 적는다.
- 분류: QA의 분류(Optional, 계약 안)를 따른다.
- 처리: Dev가 적용을 고른다. 값어치: 온도 식은 이 라운드의 REL-001 수정이 다시 바꾸는 곳이고, 그 구현 전에 Dev Notes의 값을 다시 실행하는 것이 같은 문장이 요구하는 확인이다. 이 라운드의 구현 전 재실행 결과를 단위 3.1의 기록에 두고, 단위 3.3의 기록은 앞선 SubTask 1.1에 대해 사실을 적는다: 재확인의 기록은 없고 뒤에 만들지 않는다. 이 라운드의 재실행은 앞선 SubTask의 빠진 증거를 채우지 않는다.

## 수정 계획

QA 수정 단위의 번호는 승인된 계획의 Task 1, 2와 앞선 수정 기록에 쓰이지 않은 Task 번호 3을 새로 할당했다. 이 번호는 gate의 지적 ID와 다르다. 승인된 계획의 Task, SubTask 본문과 최종 Architecture Task의 번호는 바꾸지 않았다.

| # | 순서 근거 | ID | QA 처분 | 사용자 결정 | 유형 | 지적 | 조치 | 참조 | 노력 근거 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 3.1 | 먼저. 3.2의 행이 이 수정 뒤의 코드에 달려 있다 | REL-001, DEV-1 | recommended | 실행 요청의 처리 결정(고침) | `code_change`, `test_change` | 참값이 범위 안인 변환의 Infinity | 재현 시험 둘을 먼저 더해 실패를 보고, 배율 단위의 크기 비와 온도의 9 / 5로 고친 뒤 JSDoc과 주석을 맞춤 | `src/units.js`, `test/units.test.js`, 시나리오 1.2-UNIT-002, 1.2-UNIT-004 | 파일 둘, 시험 둘 |
| 3.2 | 3.1 다음. 같은 단위 반환의 행이 3.1 뒤의 코드에 달려 있다 | TEST-001, TEST-002 | required | 실행 요청의 처리 결정(고침) | `test_change` | 시험 주석의 거짓 주장, 시험 안의 반복 리터럴 | 같은 단위 시험의 행과 주석을 다시 쓰고, 상태 시험의 입력에 이름을 줌 | `test/units.test.js`, 시나리오 1.2-UNIT-009 | 시험 파일 하나 |
| 3.3 | 마지막. 기록만 바꿈 | DOC-001, DOC-002 | optional | Dev가 적용을 고름 | 기록 | dev-1.1의 표현 부정확, 구현 전 재확인 기록 없음 | 새 기록에서 사실을 바로잡고 빠진 증거를 적음 | `docs/story-records/1.2/dev-1.1.md`(바꾸지 않음), 이 기록 | 기록 문서 하나 |

단위 3.1과 3.2는 코드를 바꾸므로 각각 Independent Cleaner review 대상이다. 단위 3.3은 기록만 바꾸므로 Dev 자신의 점검을 기록하고 검토자를 시작하지 않는다(`data/development-quality.md`).

## 넘겨받은 질문과 리드

QA가 gate의 회차 `note`에 리드로 둔 질문(PO1-N1 ~ PO1-N7, PO2-N1, Dev 질문 2, 4)은 이 라운드에서 닫지 않았고 막는 것도 없다. 참값이 범위를 넘는 입력의 결과(N-1, PO1-N1)는 소유자의 결정이 없어 이 작업이 정하지 않는다. 표 3의 세 입력은 수정 뒤에도 `Infinity`이며 1.2-UNIT-013의 시험이 그대로 통과한다.
