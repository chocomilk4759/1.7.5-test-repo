# qa-r3 — 계산 엔진

- Story: [1.1](../../stories/1.1.story.md)
- Entry: QA review round 3
- Reviewer and time: Quinn(QA 하위 세션, 모델 `claude-opus-5-5`, effort `max`, 둘 다 시스템이 알려 준 값), `*run-story 1.1` run의 역할 작업, 앞 회차와 같은 검토자 세션. 2026-11-06, 입력 확인 11:46 +0900, 점검 실행 11:47 ~ 11:48 +0900, 기록 저장 11:52 +0900. 실제 LLM 검토이며 추가 검토자는 없다.
- Reviewed inputs: 브랜치 `story/1.1`, 비교 기준 a9b841d(2회차 head), HEAD 0b806b3, 커밋하지 않은 변경 없음. `src/engine.js`는 `git hash-object` 값 `5e7c584b21900d`, `test/engine.test.js`는 `9c393cf547edc9`로 2회차와 같다.

## 범위와 읽은 입력

회차의 범위는 `data/finding-classification.md` 섹션 Later rounds와 `tasks/review-story.md` 섹션 1.5를 따랐다. 열린 차단 지적 DOC-001을 확인하고, 2회차 뒤 바뀐 내용과 그 변경이 닿는 점검을 보았다. 전체 검토 조건에 해당하는 것이 없어 같은 세션을 이었다. Dev의 요약을 믿지 않고 저장 출력, Git, 실행으로 판정했다.

- 끝까지 읽은 새 입력: Story의 차이(Status, Change Log, Dev Agent Record), dev-qa-r2, dev-4.1, dev-dod-3, 게이트 2회차와 qa-r2. Dev의 점검 스크립트는 읽기만 했고 재검산은 QA 스크립트로 했다.
- 재확인: `check-instructions.sh` 종료 상태 0. `.bmad-core`, `docs/conventions`, `AGENTS.md`에 1회차 기록보다 새로운 파일이 없어 규칙 본문을 다시 읽을 필요가 없었다.

## Spec Review

### 열린 지적의 판정

| 지적 | 판정 | 확인한 것 |
| --- | --- | --- |
| DOC-001 | RESOLVED | 아래 대조 표. 앞선 기록 문서를 고쳐 쓰지 않고 새 단위 4.1의 기록 문서와 Completion Notes 항목에서 정정했다 |
| MNT-001 | 활성 Optional로 유지 | 코드와 처리 결정이 그대로다. `Treatment: MNT-001 future`와 future 기록이 있다 |

### DOC-001 정정문의 대조

| 정정문의 사실 | 방법 | 결과 |
| --- | --- | --- |
| "divides by a number that is not zero"와 셋째 시험이 공백을 먼저 지우는 변형에서 실패 | QA 스크립트로 Dev 폴더의 저장 출력을 시험의 현재 이름과 당시 이름으로 검색 | 맞다. 실패 표시가 있는 파일은 그 변형의 요약 사본과 전체 출력 둘뿐이다 |
| 두 파일이 한 실행 | 요약 줄과 시험 시간 비교 | 맞다. 둘 다 `tests 27`, `pass 6`, `fail 21`이고 두 시험의 시간이 0.0366ms, 0.1032ms로 같다 |
| 메시지 `unexpected character at position 5`와 `position 621` | 전체 출력 읽기, 변형 사본 실행 | 맞다. `7 / 0.5`의 공백을 뺀 길이가 5이고 `1 / B / B`는 621이다 |
| "accepts digits with an optional fractional part"는 실패한 적이 없음 | 같은 검색 | 맞다. 실패 표시가 없고 변형을 건 전체 출력 11개에서 모두 통과다 |
| 그 밖의 변형에서 둘은 통과 | 전체 출력 11개의 상태 | 맞다. 위치를 1부터 세는 변형과 F3, F4의 변형에서 통과다. 나머지 변형 실행 때는 두 시험이 아직 없었다 |
| 변형은 공백이 든 식을 모두 거부 | 변형 사본의 코드 읽기와 실행 | 맞다. 파서에는 공백을 지운 글자를 주고 끝 검사는 원래 길이와 비교한다. `1+2`는 3이고 `1 + 2`, ` 1`, `7 / 0.5`, `0 / 7`은 표의 위치에서 던진다 |
| QA 1회차의 관찰과 같음 | 게이트의 닫힌 TEST-002 `verification` | 맞다 |
| 틀린 표기 "QA 라운드 1이 검토한 `68aee70`" | 게이트 1회차의 `head_commit`, `git show --stat 68aee70` | 맞다. head는 50347a4이고 68aee70은 게이트, Story, qa-r1만 바꾼 QA 기록 커밋이다 |
| `src/engine.js`가 두 커밋에서 같음 | `git show`와 `git hash-object` | 맞다. 둘 다 `5e7c584b21900d` |
| 같은 표기가 있는 곳 | `git grep`으로 `68aee70`과 "검토한"을 찾아 문맥 읽기 | 맞다. Story의 'Review 인계(QA 수정 1회차)'와 dev-dod-2의 입력 기준 두 곳뿐이다. 다른 일치는 시작 HEAD와 비교 기준이라는 맞는 표기다 |
| 앞선 기록을 고쳐 쓰지 않음 | `git diff --quiet d79cd25 HEAD`에 앞선 기록 문서 열한 개 | 종료 상태 0 |

Dev가 QA가 적지 않은 dev-dod-2의 표기까지 찾아 고친 것은 범위 안이다. 2회차의 DOC-001 조치가 그 표기를 함께 바로잡을 수 있다고 적었고, 다른 내용은 바꾸지 않았다.

### 시험 범위

AC 집계: 4개 가운데 full 4, partial 0, none 0. 제품과 시험이 바뀌지 않아 qa-r2의 판단을 잇는다. 시나리오와 시험 이름의 대응은 qa-r1의 표에 qa-r2의 새 시험 하나를 더한 그대로이고 엔진 시험은 31개다.

### 실행한 점검

Node.js v24.22.1, Git 2.51.0, 프로젝트 루트, HEAD 0b806b3. 스크립트는 프로젝트 임시 영역에 두었고 제품 파일을 바꾸지 않았다.

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 전체 시험 | `node --test` | 35개 통과, 실패 0(엔진 31, 기존 4) |
| 변경 범위 | `git diff --quiet d79cd25 HEAD -- src test package.json README.md docs/architecture.md docs/prd.md docs/planning ci .github docs/qa` | 종료 상태 0 |
| 1.1-INSP-001 | 계획된 `grep` 명령 | 일치 없음, 종료 상태 1 |
| 1.1-UNIT-016 | `git diff 862f5fd --quiet -- src/number-format.js test/number-format.test.js` | 종료 상태 0 |
| 저장 출력 재검산 | QA 스크립트 | 위 표 |
| 변형 사본 실행 | QA 스크립트 | 위 표 |
| 주석 위생 | 후보 검색 9종 | 모두 일치 없음 |
| 기록과 지침 | `check-stage.sh records`, `check-instructions.sh`, `check-stage.sh future --story 1.1` | 종료 상태 0. 알림은 이 Story와 무관한 항목 "결과 복사"의 `Revisit` |
| gate 점검 | `check-gate.sh`, 이 회차 저장 전과 저장 뒤 | 저장 전 "Status: must return to InProgress after a FAIL gate, not Review"로 종료 상태 1, 저장 뒤 종료 상태 0 |

이어 쓴 결과: 표 116행 대조와 변이 86개는 2회차에 a9b841d의 `src/engine.js`, `test/engine.test.js`로, 독립 오라클과 깊은 중첩 측정은 1회차에 50347a4의 `src/engine.js`로 실행했다. 그 뒤 해당 파일은 바뀌지 않았고 이 점검들은 기록을 읽지 않는다. 1.1-INSP-002, 1.1-INSP-003, 1.1-INSP-004도 같은 까닭으로 잇는다.

### 넘겨받은 Dev 입력 두 건

모두 직접 확인했다. 막는 것이 없어 `pending` 지적이 없고 게이트의 회차 `note`에 리드로 두었다.

1. **Dev effort.** 숫자 30과 설정 이름의 대응은 QA가 확인할 수 없고 판정에 영향이 없다. 소유자는 메인 세션이다.
2. **새 파일의 저작권과 SPDX 값.** qa-r2의 규칙 대조를 잇는다. `package.json`과 추적 파일이 이 회차에 바뀌지 않았고 CC-CMT-001의 처리대로 비어 있으며 위반이 아니다. 소유자는 프로젝트 소유자이고, 병합 뒤 PO 점검이 옮기는 기록에 없으므로 메인 세션의 최종 보고가 이름을 댄다.

앞선 열린 항목(PO1-N1 ~ PO1-N6, DEV-1)은 `src/engine.js`가 같아 앞 회차의 판단이 유효하다.

### 그 밖의 관찰

- 리드: dev-dod-3 머리의 시각 "11:42 ~ 11:46"은 이 문서를 담은 커밋 0b806b3의 시각 11:44:01과 Dev 로그의 "11:44 완료"보다 끝이 늦다. Dev 보고는 완료 뒤 점검까지 11:46이라 적어 어림으로 보이지만 실제 끝 시각은 확인할 수 없다. 어떤 판단도 이 시각에 기대지 않는다.
- 기각: "시험 실행 출력 61개"는 Dev 폴더의 텍스트 파일 수이고, 시험 실행 줄이 있는 것은 57개이며 나머지 넷은 차이 비교, `grep`, 메시지 출력이다. 61개 전부를 찾아도 결과가 같아 덜 정확한 표현이다.
- 기각: dev-qa-r2의 "QA 라운드 2의 `note`에 있는 리드 4건"은 앞줄에서 따로 다룬 리드 5를 뺀 수이므로 사실이 어긋나지 않는다.

## Standards Review

- 접근: 4.1은 `verification-only`이고 `testing-tdd`의 "No product or reusable test-support behavior is added or changed"에 맞다. RED가 없는 까닭을 dev-4.1이 적었다.
- 수정 단위 기록: Completion Notes에 체크박스, 번호, 지적 ID, 결정, 커밋, 기록 링크가 있고 번호 4.1은 쓰지 않은 번호다. 커밋 제목이 `git.taskCommitPattern`에 맞다. `DoD:`와 `Treatment:` 줄이 Completion Notes 끝에 있다. File List가 `git diff --name-status`와 맞다.
- Cleaner: 코드와 시험을 바꾸지 않는 기록 단위여서 Dev 자신의 점검을 적었고 `data/development-quality.md`에 맞다.
- 범위: Dev는 Story의 Status, Change Log, Dev Agent Record만 바꿨다. 커밋 470678f의 Story 차이에는 Change Log 행이 없고 Review 전환 커밋에서 더해졌으며, dev-4.1과 dev-dod-3의 섹션 비교 서술과 맞다.
- 처리 줄: DEV-1 future, TEST-001 fix, TEST-002 fix, TEST-003 fix, MNT-001 future, DOC-001 fix. `fix`인 지적이 모두 닫혔고, 활성 Optional MNT-001은 `future`다.
- 기록 형식: `check-stage.sh records` 종료 상태 0. 새 기록 문서에 임시 경로와 줄 번호 위치 표기가 없다.

### 위험 평가

프로젝트에 정한 위험 척도가 없어 결과의 크기와 가능성을 글로 판단했다. 가장 큰 위험은 R1이다.

| ID | 사건 | 결과 | 가능성의 근거 | 통제 | 수준 | 소유자 |
| --- | --- | --- | --- | --- | --- | --- |
| R1 | 깊은 중첩의 `RangeError`가 화면까지 올라간다 | Story 1.3의 한 줄 표시가 깨진다 | 약 3000단계의 중첩이 필요해 손으로 친 식에서는 낮다 | 다음 호출은 정상, PO1-N6 | medium | PM |
| R3 | 미결 해석의 답이 구현 선택과 다르다 | 시험과 코드를 바꾼다 | 답이 아직 없다 | PO1-N1 ~ PO1-N5 | low | 프로젝트 소유자, PM |
| R5 | 오류 이름으로 구별하는 소비자 | 일반 `Error`로 보인다 | 현재 소비자가 없다 | MNT-001 | low | 결정 뒤의 소유자 |
| R6 | 복잡도를 모른 채 함수가 자란다 | 시험이 어려워진다 | 메서드가 짧다 | DEV-1 | low | 사용자 승인 뒤 설정 |

수준 집계: critical 0, high 0, medium 1, low 3. 2회차의 R7(DOC-001)은 닫혔다.

## Code Quality Assessment

제품 코드와 시험은 2회차와 같고 평가도 같다. 작은 공개 인터페이스 뒤의 재귀 하강 파서이고, 계획된 116행과 앞 회차에 찾은 시험 틈이 모두 시험에 있다. 결함을 찾지 못했다.

## Implementation Recommendations

이 Story에 남은 수정 제안이 없다. MNT-001은 처리 결정대로 병합 뒤 PO 점검이 future-work 항목으로 옮긴다.

## Compliance Check

- Coding Standards: pass. 지적한 위반 없음.
- Project Structure: pass. 새 파일은 기록 문서뿐이다.
- Testing Strategy: pass. 시험 틈과 닿음 확인이 메워졌고 이 회차에 시험이 바뀌지 않았다.
- All ACs Met: pass. 제품 동작은 AC 1 ~ 4에 맞고 시험 범위도 full이다.
- 기록의 사실: pass. DOC-001이 닫혔다.

## Improvements Checklist

- [x] DOC-001 Dev 기록의 서술 정정(Dev, 이 회차에 확인)
- [x] MNT-001 처리 결정(`future`, 기록 확인)

## Security Review

제품 코드가 그대로여서 qa-r1의 평가를 잇는다. 지적 없음.

## Performance Considerations

제품 코드가 그대로여서 qa-r1의 평가를 잇는다. 수용된 성능 기준이 없고 CRAP은 측정하지 않았다.

## Review Record Changes

- 게이트: 회차 3을 더하고 판정을 PASS로 바꾸고, DOC-001을 `resolved_issues`로 옮겼다. 옮기기 전에 원문을 2회차 `note`와 닫힌 항목의 `verification`에 보존했다.
- 새 파일: 이 기록 문서.
- Story: QA Results에 회차 3 항목을 더했다. Status는 Review 그대로이고 다른 섹션은 바꾸지 않았다.
- 구현 수정은 없다.

## Comment Hygiene Report

- 방법과 범위: 체크리스트 §1.1, §1.2(QA 접두와 이 Story에 선언된 ID), §1.3, §1.4, §1.7, 작업 태그, 비ASCII를 `src/engine.js`, `test/engine.test.js`에 검색했다. 모두 일치 없음(종료 상태 1). 보조 조사로 `src` 전체를 §1.1로 검색했고 일치 없음이다.
- 기준선: 비교 기준 a9b841d와 두 파일이 같다. 새로 들어온 글이 없고 기존 잔여물도 없다.
- 문맥 검토: 두 파일의 주석과 시험 이름은 앞 회차에 모두 읽었고 그대로다. 머리 주석의 저작권과 SPDX는 위 입력 2의 판단대로다.
- 수명: 원장이 비어 있고 표시가 없다. `pending_at_review` 0, `pending_after_story_done` 0.
- 화이트리스트: 기대 0, 관찰 0.
- 적용 안 됨: 빌드 가드, 핫스팟 짝 커밋, 접근 지정자.
- 결정: PASS.

## Extra Reviews

없다. 오케스트레이션 스위치가 꺼져 있어 이 회차에 추가 검토자가 없다.

## 한계

- 변이는 손으로 고른 86개이고 오라클의 입력은 표본이다. 변이 도구와 속성 점검 도구는 설정되어 있지 않다. 이 회차에는 다시 실행하지 않았고 위 근거로 잇는다.
- Dev와 Cleaner의 실행은 저장된 출력과 기록으로만 확인했다. Cleaner 검토자가 자기 폴더에서 돌린 변이의 결과는 출력으로 저장되어 있지 않다.
- Cleaner 검토자의 실제 모델과 Dev 세션의 effort는 확인하지 못했다.
- CRAP은 측정하지 않았다.
