# qa-r2 — 계산 엔진

- Story: [1.1](../../stories/1.1.story.md)
- Entry: QA review round 2
- Reviewer and time: Quinn(QA 하위 세션, 모델 `claude-opus-5-5`, effort `max`, 둘 다 시스템이 알려 준 값), `*run-story 1.1` run의 역할 작업, 1회차와 같은 검토자 세션. 2026-11-06, 입력 확인 11:16 +0900, 점검 실행 11:22 +0900, 기록 저장 11:27 +0900. 실제 LLM 검토이며 추가 검토자는 없다.
- Reviewed inputs: 브랜치 `story/1.1`, 비교 기준 50347a4(1회차 head), HEAD a9b841d, 커밋하지 않은 변경 없음. `test/engine.test.js`는 `git hash-object` 값 `9c393cf547edc9`, `src/engine.js`는 `5e7c584b21900d`(1회차와 같다).

## 범위와 읽은 입력

회차의 범위는 `data/finding-classification.md` 섹션 Later rounds와 `tasks/review-story.md` 섹션 1.5를 따랐다. 열린 차단 지적 TEST-001, TEST-002를 확인하고, 1회차 뒤 바뀐 내용과 그 변경이 닿는 점검을 보았다. 전체 검토 조건에 해당하는 것이 없어 같은 세션을 이었다. Dev의 요약을 믿지 않고 코드, 원시 출력, 실행으로 판정했다.

- 끝까지 읽은 새 입력: `test/engine.test.js`의 차이, Story의 차이(Status, Change Log, Dev Agent Record), dev-qa-r1, dev-3.1, dev-3.2, dev-dod-2, Dev의 변형 명세와 요약과 실패 메시지, 1회차 게이트와 qa-r1.
- 재확인: `check-instructions.sh` 종료 상태 0. `.bmad-core`, `docs/conventions`, `AGENTS.md`에 1회차 게이트보다 새로운 파일이 없어 규칙 본문을 다시 읽을 필요가 없었다. 이번에 더 읽은 절차는 `tasks/apply-qa-fixes.md`의 나머지, `tasks/apply-qa-fixes-extract.md`, `tasks/review-loop.md`, `tasks/develop-story.md`의 record-only 절이다.

## Spec Review

### 열린 지적의 판정

| 지적 | 판정 | 확인한 것 |
| --- | --- | --- |
| TEST-001 | RESOLVED | 시험 "parentheses override the default grouping"에 `["8 - 3 - 2", 3]`이 있다. 입력 수집 복사본에서 Story 표 116행 가운데 닿지 않는 행이 0개다. 오른쪽 결합 변이가 "operators of equal precedence are evaluated from the left"와 이 시험에서 함께 실패한다 |
| TEST-002 | RESOLVED | dev-3.2의 변형 여섯(`007` 거부, 소수 한 자리, 0인 피제수 거부, 1보다 작은 제수 거부, 1e307보다 큰 수 글자 거부, 넘친 몫 거부)이 요구사항에 근거를 두고 세 시험을 실패시킨다. 표의 시험 이름과 메시지를 Dev의 저장 출력과 대조했고, 같은 뜻의 QA 변이를 현재 시험에 돌려 같은 시험이 실패함을 보았다. Completion Notes의 3.2 항목이 앞선 1.1 줄을 고쳐 쓰지 않고 정정한다. 사후 점검이라고 적었고 RED로 적지 않았다 |
| TEST-003 | RESOLVED | 행 `7 * 0` → 0, `8 / -2 * 3` → -12와 새 시험 "does not treat an ordinary Error as a CalculationError"가 있다. 1회차에 통과한 세 변이가 각각 "evaluates a single number and each of the four operations", "accepts a unary minus before a number, a parenthesis or another minus", 새 시험에서 실패한다 |
| MNT-001 | 활성 Optional로 유지 | 코드가 그대로다. Completion Notes의 future 기록에 지적과 출처, 적용하지 않는 까닭, 필요한 일이 있고 `Treatment: MNT-001 future` 줄이 있다. Dev의 "계약 밖" 판단이 맞다. 수용 문서에 오류의 `name`이 없다 |

TEST-002를 PARTIAL로 보지 않았다. 그 지적이 요구한 민감도 증거와 정정은 있고, 아래 DOC-001은 수정이 덧붙인 다른 문장의 오류다.

### 새 지적 DOC-001

- 서술: dev-3.2의 "앞선 서술의 정정"은 "확인: Dev가 남긴 변형 실행 출력 전부에서 실패한 시험 이름을 찾으면 "divides by a number that is not zero"는 공백을 먼저 지우는 거친 변형에서만 실패했고(공백이 든 식을 모두 거부하는 변형이다), 나머지 둘은 어떤 변형에서도 실패하지 않았다. QA 라운드 1의 관찰과 같다."라고 쓴다. dev-qa-r1의 TEST-002 분석에도 같은 주장이 있다.
- 관찰: Dev가 1회차 전에 남긴 변형 출력에서 공백을 먼저 지우는 변형의 실패 목록에 "accepts the largest literal and a product that underflows to zero"가 있다. 이 이름은 "accepts the largest finite power of ten and a quotient that underflows"의 당시 이름이다(dev-1.1의 F6이 바꾸었고, dev-qa-r1도 "당시 이름은 다름"이라 적는다). 어떤 변형에서도 실패하지 않은 것은 "accepts digits with an optional fractional part" 하나뿐이다. QA 1회차의 관찰은 게이트의 닫힌 TEST-002 `verification`에 있고 "다른 둘은 공백을 먼저 지우는 거친 변형에서만 실패"다.
- 분류: 1단계, 출력과 문장을 대조해 확인했다. 2단계, 이 Story의 기록이다. 3단계, `data/finding-classification.md`의 "a description of current content (the repository, code or records) that the content refutes"에 든다. 원시 출력은 Story의 계획이나 기록 섹션 밖의 기록이고, 단언한 사실 일부가 내용과 어긋나며, 인용한 QA 관찰에도 그 내용이 없다. 같은 절이 "A refuted description is an unmet criterion whether or not a planned use relies on it; the role that maintains it corrects it as `rework`"라고 정한다. 그래서 차단이고 Required이며, 고치는 쪽은 Dev다. 심각도는 low다. 세 시험에 겨냥한 변형이 없었다는 TEST-002의 결론, 제품, 시험은 이 문장의 영향을 받지 않는다.
- 이번 회차의 새 내용이므로 늦은 지적이 아니다. 어긋남의 까닭은 현재 시험 이름으로만 찾은 것으로 짐작되나 확인하지 못했다. Dev는 이의를 근거와 함께 남길 수 있다.

### 시험 범위

AC 집계: 4개 가운데 full 4, partial 0, none 0. 1회차의 AC 1 partial은 TEST-001이 닫혀 사라졌다. 다른 AC의 대조는 qa-r1의 표를 잇는다(제품 파일이 같고 시험은 행과 시험 하나가 늘었을 뿐이다).

시나리오와 시험 이름의 대응은 qa-r1의 표에 새 시험 하나를 더한다. 1.1-UNIT-013에 "does not treat an ordinary Error as a CalculationError"가 더해지고, 엔진 시험은 31개다. 실행 맵의 방식은 바뀌지 않았다.

### 실행한 점검

Node.js v24.22.1, Git 2.51.0, 프로젝트 루트, HEAD a9b841d. 스크립트는 프로젝트 임시 영역에 두었고 제품 파일을 바꾸지 않았다.

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 전체 시험 | `node --test` | 35개 통과, 실패 0(엔진 31, 기존 4) |
| 표 대조와 닿음 | 1회차와 같은 방법 | 116행(값 56, 오류 60) 모두 표와 맞고, 전달 시험의 입력 129개가 모든 행을 덮는다 |
| 변이 | 1회차 83개에 Dev 기록의 변형 둘과 `RangeError` 별칭을 더한 86개 | 잡힘 77, 통과 9 |
| 1.1-INSP-001 | 계획된 `grep` 명령 | 일치 없음, 종료 상태 1 |
| 1.1-UNIT-016 | `git diff 862f5fd --quiet -- src/number-format.js test/number-format.test.js` | 종료 상태 0 |
| 주석 위생 | 1회차와 같은 후보 검색과 추가된 줄 읽기 | 모두 일치 없음 |
| 기록과 지침 | `check-stage.sh records`, `check-instructions.sh` | 종료 상태 0 |
| gate 점검 | `check-gate.sh`, 이 회차 저장 전과 저장 뒤 | 저장 전 "Status: must return to InProgress after a FAIL gate, not Review"로 종료 상태 1, 저장 뒤 종료 상태 0 |
| CI 규칙 | `node ci/screen-rule.check.mjs` | 종료 상태 0, 필수 점검이 아니다 |

이어 쓴 결과: 독립 오라클(입력 60만 개, 불일치 0)과 깊은 중첩 측정은 1회차에 50347a4의 `src/engine.js`로 실행했다. 그 뒤 바뀐 경로는 `test/engine.test.js`와 기록뿐이고 두 점검은 그것을 읽지 않는다. 1.1-INSP-002, 1.1-INSP-003도 같은 까닭으로 잇는다. 1.1-INSP-004는 시험 파일의 가져오기가 그대로이고 제품과 문서가 같음을 확인해 잇는다.

### 변이에서 통과한 9개

| 변이 | 판정 | 근거 |
| --- | --- | --- |
| 유한하지 않은 값의 위치 변형 4개, 짝 없는 `(`를 식 끝 위치로 알림, 탭도 공백으로 건너뜀, 문자열이 아닌 입력에 `CalculationError` | 계획이 허용 | qa-r1의 표와 같다 |
| 수 변환을 `parseFloat`로 | 동등 | 1회차 비교에서 차이 0 |
| `CalculationError`를 `RangeError`의 별칭으로 | 후보 기각 | 실제 코드는 별도 클래스이고 어떤 기준도 이 구별을 말하지 않는다. Cleaner 검토자도 보았고 dev-3.1의 한계에 시험하지 않은 범위로 적혀 있다 |

### 넘겨받은 Dev 입력 네 건

모두 직접 확인했다. 막는 것이 없어 `pending` 지적이 없고 게이트의 회차 `note`에 리드로 두었다.

1. **Cleaner 모델.** dev-3.1의 `claude-opus-5-5`는 검토자의 자기 보고이고 QA도 호스트로 확인할 수 없다. 절차가 특정 모델을 요구하지 않는다. Cleaner의 지적 0건 결론은 시험 차이 읽기와 변이로 이 회차가 직접 확인했다. 검토자의 파일 수 35개와 폴더도 대조했다. 소유자는 메인 세션이다.
2. **Dev effort.** 숫자 30과 설정 이름의 대응은 QA가 확인할 수 없고 판정에 영향이 없다. 소유자는 메인 세션이다.
3. **`check-gate.sh`.** 재현했다. Dev가 FAIL gate 뒤에 Status를 Review로 옮긴 사이의 상태이며, `data/local-git-workflow.md`의 "Dev may move the Status after a decision is recorded"에 해당한다. 이 회차를 저장한 뒤 종료 상태 0을 확인했다. 지적이 아니다.
4. **앞선 열린 항목.** 오류 위치 규칙, 공백과 숫자 범위, 문자열이 아닌 입력, 메시지 언어, 깊은 중첩은 `src/engine.js`가 같아 qa-r1의 판단(비차단, PO1-N1 ~ PO1-N6)이 유효하다.

   새 파일의 저작권과 SPDX 값은 규칙에 비추어 다시 보았다. CC-CMT-001은 저작권/SPDX 머리글과 요약을 요구하고, 같은 절이 "If a required legal value is unavailable or conflicts with the supplied notices, record the missing input and leave that field unresolved until the owner supplies it; do not invent it. Continue work independent of that decision, including the concise file summary."라고 정한다. 확인 결과: 추적 파일에 라이선스 파일이 없고 저작권과 SPDX 표기가 없으며(`git grep`, Story 기록과 QA 기록 제외) `package.json`에 `license` 키가 없다. dev-1.1이 빠진 입력을 기록했고, 두 새 파일에 값을 만들지 않았으며 요약 줄이 있다. 규칙의 처리대로이므로 위반이 아니고 지적도 아니며 이 Story를 막지 않는다. 기존 `src/number-format.js`도 값이 없고 이 Story의 변경 대상이 아니다. 소유자는 프로젝트 소유자이고 값이 오면 머리글에 넣는 일이 남는다. 이 입력은 병합 뒤 PO 점검이 옮기는 기록(PO 비차단 지적, `Treatment:` 줄)에 없으므로 메인 세션의 최종 보고가 이름을 대야 한다.

## Standards Review

- 접근: 3.1, 3.2 모두 `verification-only`다. `testing-tdd`의 "When only assertions are strengthened and the accepted behavior under test is already correct"에 맞다. 강화한 단언마다 요구사항에서 나온 변형이 실패하고, 기준 통과와 시험하지 않은 범위를 적었다.
- 수정 단위 기록: `tasks/apply-qa-fixes.md`의 QA fix execution records대로 Completion Notes에 체크박스, 번호, 지적 ID, 결정, 커밋, 기록 링크가 있고, 번호 3.1, 3.2는 쓰지 않은 번호다. 커밋 제목이 `git.taskCommitPattern`에 맞다. `DoD:`와 `Treatment:` 줄이 Completion Notes 끝에 있다. File List가 `git diff --name-status`와 맞다.
- Cleaner: 3.1은 시험 코드를 바꿔 대상이고 위임 입력과 위임 뒤 확인이 기록에 있다. 3.2는 코드를 바꾸지 않아 Dev 자신의 점검을 적었고 `data/development-quality.md`에 맞다.
- 시험 구조: 새 행과 새 시험은 공개 내보내기만 쓰고, 기대 값이 손 계산이다. `testing-tdd`가 빼는 세 형태에 해당하지 않는다. 새 시험의 이름이 단언과 맞다.
- CC-JS-001, CC-JS-002, CL-GLD-001: 더한 줄은 두 칸 들여쓰기, 큰따옴표, 세미콜론이고 최대 70칸이다. 새 숫자 리터럴은 사례 표의 입력과 기대 값이다(3단계 분류). 지적 없음.
- 범위: Dev는 Story의 Status, Change Log, Dev Agent Record만 바꿨다. gate, QA Results, 계획 본문, 앞선 기록 문서는 그대로다.

### 위험 평가

프로젝트에 정한 위험 척도가 없어 결과의 크기와 가능성을 글로 판단했다. 가장 큰 위험은 R1이다.

| ID | 사건 | 결과 | 가능성의 근거 | 통제 | 수준 | 소유자 |
| --- | --- | --- | --- | --- | --- | --- |
| R1 | 깊은 중첩의 `RangeError`가 화면까지 올라간다 | Story 1.3의 한 줄 표시가 깨진다 | 약 3000단계의 중첩이 필요해 손으로 친 식에서는 낮다 | 다음 호출은 정상, PO1-N6 | medium | PM |
| R3 | 미결 해석의 답이 구현 선택과 다르다 | 시험과 코드를 바꾼다 | 답이 아직 없다 | PO1-N1 ~ PO1-N5 | low | 프로젝트 소유자, PM |
| R5 | 오류 이름으로 구별하는 소비자 | 일반 `Error`로 보인다 | 현재 소비자가 없다 | MNT-001 | low | 결정 뒤의 소유자 |
| R6 | 복잡도를 모른 채 함수가 자란다 | 시험이 어려워진다 | 메서드가 짧다 | DEV-1 | low | 사용자 승인 뒤 설정 |
| R7 | 기록의 잘못된 서술을 믿는다 | 뒤의 판단이 틀린 근거에 기댄다 | 한 문장이고 결론은 같다 | DOC-001 | low | Dev |

수준 집계: critical 0, high 0, medium 1, low 4. 1회차의 R2(TEST-001, TEST-002)와 R4(TEST-003)는 닫혔다.

## Code Quality Assessment

제품 코드는 1회차와 같고 평가도 같다. 시험은 지적한 틈이 메워졌다. 남은 것은 Dev 기록의 문장 하나다.

## Implementation Recommendations

| 지적 | 제안 | 까닭 | 소유자 | 점검 |
| --- | --- | --- | --- | --- |
| DOC-001 | 새 수정 단위의 기록 문서와 Completion Notes 항목에서 정정한다. 셋째 시험도 거친 변형에서는 실패했고, 그 변형은 공백이 든 식을 모두 거부하므로 닿음 확인이 아니며, 겨냥한 변형이 없었다는 결론은 같다고 적는다. 앞선 기록은 고쳐 쓰지 않고 제품과 시험은 바꾸지 않는다. 같은 항목에서 "QA 라운드 1이 검토한 `68aee70`"도 바로잡을 수 있다 | 내용이 반박하는 서술이다 | Dev | `check-stage.sh records`, 원시 출력 대조 |

## Compliance Check

- Coding Standards: pass. 지적한 위반 없음.
- Project Structure: pass. 새 파일은 기록 문서뿐이다.
- Testing Strategy: pass. 시험 틈과 닿음 확인이 메워졌다.
- All ACs Met: pass. 제품 동작은 AC 1 ~ 4에 맞고 시험 범위도 full이다.
- 기록의 사실: fail. DOC-001.

## Improvements Checklist

- [x] TEST-001 계획 사례의 시험 행(Dev, 이 회차에 확인)
- [x] TEST-002 이미 통과한 시험 셋의 닿음 확인 기록(Dev, 이 회차에 확인)
- [x] TEST-003 시험 틈 세 가지(Dev, 이 회차에 확인)
- [x] MNT-001 처리 결정(`future`, 이 회차에 기록 확인)
- [ ] DOC-001 Dev 기록의 서술 정정(Dev)

## Security Review

제품 코드가 그대로여서 qa-r1의 평가를 잇는다. 새 시험은 입력 경로를 더하지 않는다. 지적 없음.

## Performance Considerations

제품 코드가 그대로여서 qa-r1의 평가를 잇는다. 수용된 성능 기준이 없고 CRAP은 측정하지 않았다.

## Review Record Changes

- 게이트: 회차 2를 더하고, TEST-001, TEST-002, TEST-003을 `resolved_issues`로 옮기고, DOC-001을 더했다. 옮기기 전에 원문을 1회차 `note`와 닫힌 항목의 `verification`에 보존했다.
- 새 파일: 이 기록 문서.
- Story: QA Results에 회차 2 항목을 더하고 Status를 Review에서 InProgress로 바꿨다. 다른 섹션은 바꾸지 않았다.
- 구현 수정은 없다.

## Comment Hygiene Report

- 방법과 범위: 체크리스트 §1.1, §1.2(QA 접두와 이 Story에 선언된 ID), §1.3, §1.4, §1.7, 작업 태그, 비ASCII를 `src/engine.js`, `test/engine.test.js`에 검색했다. 모두 일치 없음(종료 상태 1). 보조 조사로 `src` 전체를 §1.1로 검색했고 일치 없음이다.
- 기준선: 비교 기준 50347a4. `src/engine.js`는 같고 시험 파일은 추가 7줄, 삭제 0줄이다. 기존 잔여물은 없다.
- 문맥 검토: 추가된 줄을 모두 읽었다. 주석이 없고, 시험 이름은 단언과 맞다. 머리 주석의 저작권과 SPDX는 위 입력 4의 판단대로다.
- 수명: 원장이 비어 있고 표시가 없다. `pending_at_review` 0, `pending_after_story_done` 0.
- 화이트리스트: 기대 0, 관찰 0.
- 적용 안 됨: 빌드 가드, 핫스팟 짝 커밋, 접근 지정자.
- 결정: PASS.

## Extra Reviews

없다. 오케스트레이션 스위치가 꺼져 있어 이 회차에 추가 검토자가 없다.

## 한계

- 변이는 손으로 고른 86개이고 전수가 아니다. 변이 도구와 속성 점검 도구는 설정되어 있지 않다.
- 독립 오라클과 깊은 중첩은 다시 실행하지 않았고 위 근거로 잇는다.
- Dev와 Cleaner의 실행은 저장된 출력과 기록으로만 확인했다. 그 실행 자체를 다시 보지는 못한다.
- Cleaner 검토자의 실제 모델과 Dev 세션의 effort는 확인하지 못했다.
