# dev-qa-r2 — QA 2회차 지적의 분석과 처리 결정

- Story: [1.1](../../stories/1.1.story.md)
- Entry: Dev `review-qa`(`tasks/apply-qa-fixes.md`)의 QA 라운드 2 분석과 결정 목록
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.1` run의 역할 작업. effort는 시스템이 숫자 30으로만 알려 주어 설정의 이름(`xhigh`)과의 대응을 확인하지 못했다
- 시각: 2026-11-06, 분석과 결정 11:35 ~ 11:39 +0900
- 입력 기준: 브랜치 `story/1.1`, HEAD `d79cd25`(QA 2회차 기록 커밋), 작업 트리 깨끗, Status InProgress. 입력은 gate `docs/qa/gates/1.1.yml`(schema 2, 라운드 2, FAIL), Story의 QA Results(라운드 1과 2), 기록 문서 qa-r2다. 라운드 1의 관찰을 확인하려고 `68aee70`의 gate와 기록 문서 qa-r1도 읽었다. 별도 평가 문서(`docs/qa/assessments`)는 없고 추가 검토도 없다

## 읽은 규칙과 절차

`tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`(Dev의 규칙 종류 `operations`, `design`, `documentation`과 Story의 Convention Sections). 완료 점검을 위해 `comments`, Common `crap`, `javascript-crap`도 읽었다. `coding-principles`는 읽지 않았다. 이 라운드는 코드를 바꾸지 않고 Cleaner 위임도 없다.
- 절차: `agents/dev.md`, `project-map.md`, `core-config.yaml`, `data/agent-context.md`, `tasks/apply-qa-fixes.md`와 하위 작업 넷(collect, extract, implement, validate), `tasks/develop-story.md`, `tasks/local-task-done.md`, `tasks/local-story-review.md`, `tasks/review-loop.md`, `tasks/architecture-align.md`, `data/development-quality.md`, `data/finding-classification.md`, `data/local-git-workflow.md`, `data/story-paths.md`, `data/verification-ownership.md`, `data/defect-diagnosis.md`, `data/future-work-planning.md`, `checklists/story-dod-checklist.md`, `checklists/comment-hygiene-checklist.md`(섹션 1 ~ 4), `templates/story-tmpl.yaml`의 Dev Agent Record 절, `tasks/run-story.md`의 Role sessions, Rounds, Checks after each task, Stop, hold and carry on 절.

## 처리 결정의 권한

Story의 PO Validation에 저장된 실행 요청 줄(단계 `through Merged`, 사용자, 2026-11-06 09:11 +0900, `remote` 없음)과 메인 세션이 이 역할 작업에 전달한 지시가 `apply-qa-fixes.md` CP-4의 처리 결정이다. 범위는 현재 Required와 Recommended 지적을 수용된 범위 안에서 고치거나 근거 있는 이의로 기록하는 것이다. 요구사항이나 범위의 변경, 면제(waiver), Done은 허락하지 않는다. 이번 라운드에는 `contract`로 분류된 지적, `pending`인 지적, 면제 요청이 없다.

## 입력 수집과 합계

- gate 파일은 `docs/qa/gates/1.1.yml` 하나이고 Story 식별(`story: "1.1"`)이 맞다. 평가 문서는 없다.
- 활성 `top_issues` 둘: DOC-001(required, low, 확신 high, 소유자 dev), MNT-001(optional, low, 확신 high, 소유자 dev). `resolved_issues` 셋(TEST-001, TEST-002, TEST-003)은 라운드 2에 RESOLVED로 닫혔고 맥락으로만 읽었다. 다시 고치지 않는다.
- `risk_summary.recommendations.must_fix`는 DOC-001 하나이고 `monitor`의 네 항목(PO1-N6 깊은 중첩, PO1-N1 ~ N5 선택한 해석, MNT-001, DEV-1)은 지적이 아니라 이미 열려 있는 기록이다. `recommendations.future`의 MNT-001은 아래 결정 목록에 있다. 새 파일의 저작권과 SPDX 값은 QA의 리드이고 지적이 아니며, 소유자는 프로젝트 소유자다(QA 라운드 2의 `note`, 리드 5).
- `evidence.trace`는 AC 1 ~ 4가 모두 covered이고 gap과 partial이 없다. `nfr_validation`의 네 범주에 막는 상태가 없다.
- QA 라운드 2의 `note`에 있는 리드 4건(Cleaner 모델의 자기 보고, Dev effort의 이름 대응, `check-gate.sh`의 종료 상태 1, 앞선 열린 항목)과 버린 후보 셋은 지적이 아니고 막는 것이 없다. 이 라운드에서 바꾼 것이 없다. 버린 후보 가운데 '68aee70' 표기는 DOC-001과 같은 항목이어서 아래에서 다룬다.

입력 활성 지적 2건, 결정 목록 2건, 누락 없음.

## 결정 목록

| ID | QA 처분 | 심각도, 확신 | 경로와 소유자 | 증거 확인 | 처리 | 단위 |
| --- | --- | --- | --- | --- | --- | --- |
| DOC-001 | required | low, high | rework, Dev | 확인됨(아래 분석) | 고침, 이의 없음 (`Treatment: DOC-001 fix`) | 4.1 |
| MNT-001 | optional | low, high | 계약 밖 | 확인됨 | 변경 없음. QA 라운드 1의 처리 결정 그대로 `Treatment: MNT-001 future`와 future 기록이 Completion Notes에 있다 | 없음 |

## 지적별 분석

### DOC-001 앞선 Dev 기록의 변형 실행 출력 서술이 사실과 다르다

- 1단계, 확인. QA의 관찰을 믿지 않고 Dev가 1회차 전에 저장한 시험 실행 출력 전부를 시험 이름으로 다시 대조했다. 저장된 출력 61개(조각의 RED와 GREEN과 기준 실행, 변형 실행, 최종 점검)에서 줄 머리가 실패 표시(✖)인 줄을 세 시험의 이름으로 찾았다. 방법은 읽기 전용 스크립트 하나이고 출력을 바꾸지 않는다. 결과는 다음과 같다.

  | 시험(현재 이름) | 변형 실행에서의 결과 |
  | --- | --- |
  | accepts digits with an optional fractional part | 어떤 출력에서도 실패하지 않았다. 변형을 건 전체 출력 11개 모두에서 통과로 나온다 |
  | divides by a number that is not zero | 실패한 출력은 공백을 먼저 지우고 파싱하는 변형(dev-1.1 민감도 점검 표의 조각 13 행) 하나이고, 메시지는 `unexpected character at position 5`다. 같은 조각의 위치를 1부터 세는 변형과 Cleaner 지적 F3, F4의 변형에서는 통과한다 |
  | accepts the largest finite power of ten and a quotient that underflows(당시 이름 "accepts the largest literal and a product that underflows to zero") | 실패한 출력은 같은 공백 제거 변형의 같은 실행 하나이고, 메시지는 `unexpected character at position 621`이다. 위치를 1부터 세는 변형(당시 이름)과 F3, F4의 변형(현재 이름)에서는 통과한다 |

  공백 제거 변형의 출력은 두 곳에 있다. 하나는 변형 폴더의 전체 출력(27개 가운데 21개 실패, 통과 6개)이고 다른 하나는 같은 실행에서 실패 목록만 남긴 사본이다. 두 곳의 시험 시간까지 같아 한 번의 실행이다. 당시 이름과 현재 이름의 대응은 dev-1.1의 Cleaner 지적 F6(이름 바꿈)과 dev-qa-r1의 "당시 이름은 다름"이 말한다.
- 대조한 문장. dev-3.2의 섹션 '앞선 서술의 정정'의 '확인' 항목은 "divides by a number that is not zero"는 공백을 먼저 지우는 거친 변형에서만 실패했고 나머지 둘은 어떤 변형에서도 실패하지 않았다고 쓰고 "QA 라운드 1의 관찰과 같다"를 덧붙인다. dev-qa-r1의 TEST-002 분석 '확인' 항목도 같은 주장이다. 위 결과와 비교하면 "나머지 둘은 어떤 변형에서도 실패하지 않았다"가 맞지 않는다. 둘 가운데 셋째 시험이 공백 제거 변형에서 실패했다.
- QA 라운드 1의 관찰. `68aee70`의 gate에서 TEST-002의 verification은 "accepts digits with an optional fractional part"는 어떤 변형에서도 실패하지 않았고 "다른 둘은 공백을 먼저 지우는 거친 변형에서만 실패했는데 그 변형은 공백이 든 식을 모두 거부한다"고 쓴다. 위 결과와 같다. 그래서 두 Dev 기록이 QA의 관찰로 인용한 내용이 QA 기록과 다르다는 QA의 지적도 맞다.
- 분류. QA의 분류(3단계, `data/finding-classification.md`의 "a description of current content ... that the content refutes", 경로 rework, 소유자 Dev, 심각도 low)에 동의한다. 이의를 내지 않는다. 어긋난 서술은 Story의 계획이 아니라 Dev 기록이 현재 기록의 내용에 대해 한 말이어서 계획된 쓰임이 기대지 않아도 기준이다. 세 시험에 겨냥한 변형이 없었다는 TEST-002의 결론, 제품, 시험은 이 문장의 영향을 받지 않는다는 QA의 판단도 맞다. 결론은 dev-1.1의 민감도 점검 표에 이 셋의 동작을 노린 변형이 없다는 사실에 기대고, 그 표 행 13은 공백 제거 변형을 "많은 값 시험도 함께 실패하는 거친 변형"이라 적었다.
- 같은 항목의 'QA 라운드 1이 검토한 68aee70'. 확인한 사실은 다음과 같다. gate의 라운드 1 `head_commit`은 `50347a4`이고 Story QA Results의 라운드 1도 HEAD `50347a4`다. `68aee70`은 QA 라운드 1이 남긴 기록 커밋이고 `git diff --name-only 50347a4 68aee70`은 gate, Story, qa-r1 세 파일이다. `src/engine.js`의 `git hash-object` 값은 `50347a4`와 `68aee70`에서 같다(`5e7c584b21900d`). 그래서 "제품 파일은 같다"는 내용은 맞고 인용한 커밋의 표기만 틀렸다. 이 표기는 Story Completion Notes의 'Review 인계(QA 수정 1회차)' 항목과 dev-dod-2의 입력 기준에 있다. dev-qa-r1과 dev-3.1이 `68aee70`을 "시작 HEAD", "QA 1회차 기록 커밋"으로 부른 곳은 맞다.
- 처리. 고친다. 앞선 기록 문서(dev-3.2, dev-qa-r1, dev-dod-2)와 Completion Notes의 앞선 항목은 고쳐 쓰지 않고, 새 수정 단위 4.1의 기록 문서 [dev-4.1](dev-4.1.md)와 Story의 Completion Notes 항목에서 정정한다. 제품과 시험은 바꾸지 않는다. 접근 `verification-only`, 시나리오는 정정 대상 기록이 말하는 시험 셋의 1.1-UNIT-003, 1.1-UNIT-006, 1.1-UNIT-010이다.

### MNT-001 `CalculationError`의 `name`이 "Error"다

- 확인. `Treatment: MNT-001 future` 줄과 future 기록(지적과 출처, 이 Story가 적용하지 않는 까닭, 필요한 일)이 Story의 Dev Agent Record에 그대로 있다. `src/engine.js`는 QA 라운드 1이 검토한 `50347a4` 이후 바뀌지 않았다(`git hash-object` 값 `5e7c584b21900d`).
- 처리. QA 라운드 2가 Dev의 판단(계약 밖)을 받아들였고 지시도 변경 없음이다. 새 기록을 더하지 않고 Story 브랜치에서 future-work 파일을 바꾸지 않는다. 병합 뒤 PO 점검이 옮긴다.

## 수정 계획

실행 단위 번호는 수용된 계획의 Task 1 ~ 2와 앞선 수정 단위 3.1, 3.2에서 쓰지 않은 Task 4를 쓴다. 이 번호는 QA 지적 ID와 다르다.

| # | 순서 근거 | ID | QA 처분 | 사용자 결정 | 종류 | 지적 | 조치 | 참조 | 노력의 근거 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 하나뿐인 Required이고 다른 항목에 기대지 않음 | DOC-001 | required | 실행 요청의 처리 결정 | 기록(문서) | 변형 실행 출력 서술과 커밋 표기의 사실 오류 | 4.1: 새 기록 문서와 Completion Notes 항목에서 정정, 앞선 기록은 그대로 | dev-3.2, dev-qa-r1, dev-dod-2, Completion Notes의 앞선 항목 | 대조와 기록 |
| - | 적용하지 않음 | MNT-001 | optional | 변경 없음(라운드 1의 결정) | 해당 없음 | `name`이 "Error" | 변경 없음 | `src/engine.js`의 `CalculationError` | 해당 없음 |

4.1은 코드와 시험을 바꾸지 않는 기록 단위여서 `data/development-quality.md` 섹션 Independent Cleaner review의 "A SubTask that changes only records ... records Dev's own inspection and needs no reviewer"에 든다. Cleaner 검토자를 시작하지 않고 Dev 자신의 점검을 [dev-4.1](dev-4.1.md)에 적는다.

## 그 밖의 확인

- 새 요구, 범위 변경, 계획 본문(AC, Task, Testing)의 수정이 필요한 지적이 없다. SM의 정정과 PO의 재검증이 필요하지 않다.
- 미결 결정과 면제 요청이 없어 멈춘 항목이 없다. 반복 실패 계수: DOC-001은 이 라운드가 첫 교정이고 이전 교정 시도가 없어 0이다.
- gate 파일과 QA Results는 QA 소유이므로 바꾸지 않았다. 수정 단위의 체크박스는 QA의 RESOLVED 판정이 아니다. future-work 파일은 Story 브랜치에서 바꾸지 않았다.
- 현재 Story가 적용하지 않는 지적은 MNT-001 하나이고 그 future 기록이 이미 있다. 새 future 기록은 없다.

## 한계

- 이 문서는 분석과 결정의 기록이다. 정정문과 점검 결과는 dev-4.1에, Definition of Done 점검은 dev-dod-3에 있다.
- 원시 출력 대조는 Dev가 저장한 출력 61개에 대한 것이다. Cleaner 검토자가 자기 폴더에서 돌린 변이의 결과는 출력으로 저장되어 있지 않아 이 대조에 들어 있지 않고, dev-1.1은 그 결과를 검토자의 보고로만 적었다.
