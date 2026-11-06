# dev-qa-r2 — QA 2회차 지적의 분석과 처리 결정

- Story: [1.2](../../stories/1.2.story.md)
- Entry: Dev `review-qa`(`tasks/apply-qa-fixes.md`)의 QA 라운드 2 분석과 결정 목록. 구현이 없는 기록 인계다
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.2 1.3 remote to Done` run의 역할 작업. effort는 시스템이 숫자 30으로만 알려 주어 설정의 이름(`xhigh`)과의 대응을 확인하지 못했다
- 시각: 2026-11-06, 분석과 결정 16:37 ~ 16:45 +0900(이 기록의 저장과 커밋 16:45)
- 입력 기준: 브랜치 `story/1.2`, HEAD `c1160ee`(QA 2회차 기록 커밋), 작업 트리 깨끗, Status Review. 입력은 gate `docs/qa/gates/1.2.yml`(라운드 2, PASS), Story의 QA Results와 Dev Agent Record, 기록 문서 qa-r2다. 별도 평가 문서와 추가 검토는 없다(QA Results에 추가 검토자가 없다고 적혀 있다). `src/units.js`와 `test/units.test.js`의 `git hash-object` 값은 `950789b1dc7`, `ab84c5f25f6`으로 QA 라운드 2가 적은 값과 같다

## 읽은 규칙과 절차

`tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`(Dev의 규칙 종류 `operations`, `design`, `documentation`). 읽지 않은 본문: `comments`, `coding-principles`, `crap`, `javascript-crap`. 이 라운드는 코드와 코드 주석을 쓰지 않아 구현 뒤의 주석 위생 검사(CP-6.5)와 완료 점검의 주석 항목이 닿지 않는다.
- 절차: `agents/dev.md`, `tasks/apply-qa-fixes.md`와 하위 작업 collect, extract, validate(구현이 없어 CP-5/6의 `apply-qa-fixes-implement.md`는 실행하지 않았고 읽지 않았다), `tasks/develop-story.md`, `tasks/resume-story.md`, `tasks/local-story-done.md`, `tasks/run-story.md`의 Inputs and authorization, Next task, Instructions and reports, Role sessions, Rounds, `data/finding-classification.md`, `data/future-work-planning.md`, `data/story-paths.md`, `data/local-git-workflow.md`(Planning changes 앞까지), `data/agent-context.md`, `data/development-quality.md`, `data/verification-ownership.md`, `data/defect-diagnosis.md`, `data/domain-language.md`. 설정된 용어집 `docs/domain-glossary.md`는 없어 불러오지 않았고 수용된 문서의 뜻을 썼다.

## 처리 결정의 권한

Story의 PO Validation에 저장된 실행 요청 줄(단계 `through Done`과 단어 `remote`, 프로젝트 소유자, 2026-11-06)이 `tasks/run-story.md`의 Inputs and authorization에 따라 "Story가 적용하지 않는 Optional과 future 지적을 Story의 future 기록으로 남기는 것"을 답한다. 메인 세션이 이 역할 작업에 전달한 지시는 이 라운드가 코드를 고치지 않고, TEST-003을 시험을 더하지 않고 future로 기록하게 한다. 근거는 gate가 이미 PASS이고 코드 변경은 새 QA 회차를 부른다는 것이다. 제품과 시험 코드, QA 기록, gate, `docs/planning/future-work.md`는 바꾸지 않는다. 이 요청은 요구사항이나 범위의 변경, 면제를 허락하지 않는다. 이 라운드에 `contract`나 `pending`으로 분류된 지적과 면제 요청은 없고 사용자가 drop한 지적도 없다.

## 결정 목록

활성 지적은 gate의 `top_issues`(라운드 2)에 TEST-003 하나다. 나머지 대상은 gate의 `recommendations.future` 넷, `risk_summary.recommendations.monitor` 다섯, 회차 `note`의 리드와 QA Results의 "넘겨받은 Dev 질문"이다. 아래 둘째 표가 이 항목을 모두 어디에 보관하는지 대조한다.

| ID | QA 처분 | 심각도, 확신 | 경로와 소유자 | 증거 확인 | 처리 | 줄 |
| --- | --- | --- | --- | --- | --- | --- |
| TEST-003 | optional | low, high | 계약 안, 소유자 Dev | 사본에서 재현함 | 적용하지 않고 future 기록 | `Treatment: TEST-003 future` |
| DEV-2 | 지적 아님(리드 12, QA 처분 없음) | 해당 없음 | 프로젝트 소유자(PO1-N4) | 사본에서 재현함 | future 기록 | `Treatment: DEV-2 future` |
| DEV-3 | 지적 아님(리드 13, QA 처분 없음) | 해당 없음 | PM 또는 프로젝트 소유자(PO1-N1) | 정확한 값으로 재현함 | future 기록 | `Treatment: DEV-3 future` |

DEV-2와 DEV-3은 Dev가 개발하면서 찾은 범위 밖의 문제에 Dev가 주는 ID다(`apply-qa-fixes.md`). 둘 다 Dev가 Review 인계(QA 수정 1회차)의 한계에 적은 질문 2, 3이고 QA가 리드로 받아 게이트의 `recommendations.future`에 둔 것이다. 병합 뒤 점검은 `Treatment:` 줄이 `future`인 Dev 기록과 PO Validation의 비차단 지적을 옮기고 게이트의 권고와 리드는 옮기지 않으므로, 줄과 기록이 없으면 PO1-N4와 PO1-N1을 정할 때 함께 정할 이 두 일이 future-work 파일에 닿지 않는다. 이의를 낸 지적은 없다.

## 지적별 분석

### TEST-003 먼저 나누는 변이를 시험이 잡지 못한다

- 확인: `src/units.js`의 `scaledUnits`는 `convertTo`를 `value * (size / target.size)`로 둔다. 목표 크기가 1보다 작은 단위는 `mm`(0.001), `cm`(0.01), `in`(0.0254), `ft`(0.3048)뿐이다. 시험 "converts a pressure that is out of range in pascals"의 목표 크기는 모두 1 이상이다(`Pa` 1, `kPa` 1000, `MPa` 1e6, `bar` 1e5, `psi` 6894.757293168). 시험 "converts between all pairs of length units"의 값은 작아서 `value / target.size`가 넘치지 않는다.
- 재현: 두 파일을 사본에 복사해 `convertTo`를 `(value / target.size) * size`로 바꾼 사본에서 `node --test test/units.test.js`가 20개 모두 통과한다. 같은 사본에서 `convert(1e307, "mm", "cm")`와 `convert(1e306, "cm", "mm")`는 `Infinity`이고 전달된 모듈은 `1e+306`과 `1e+307`을 돌려준다. QA의 관찰과 같다.
- 분류: QA의 분류(Optional, 비차단, 계약 안, 소유자 Dev, 확신 high)에 동의한다. 전달된 코드는 맞고 틀린 변형이 통과할 가능성만 남는다.
- 처리: 적용하지 않고 future로 기록한다. 이 라운드는 Required나 Recommended를 고치는 라운드가 아니어서 `apply-qa-fixes.md` CP-4의 "Dev가 값어치 있는 Optional을 함께 적용한다"가 닿지 않는다. 시험 파일을 바꾸면 QA가 검토한 구현 개정이 바뀌어 `local-story-done.md`에 따라 Done 전에 새 QA 회차가 필요하다. 메인 세션이 이 지시로 시험을 더하지 않고 future로 기록하게 했다.
- 필요한 일(사본에서 확인): 길이 행을 시험에 더한다. 행 `{ mm: 1e307, cm: 1e306 }`은 전달된 모듈에서 통과하고 먼저 나누는 사본에서 4쌍 가운데 `mm→cm`, `cm→mm` 둘이 틀려 실패한다. 행 `{ mm: 1e308, cm: 1e307, in: 1e308 / 25.4, ft: 1e308 / 304.8 }`은 16쌍 모두 전달된 모듈에서 통과하고 먼저 나누는 사본에서 `mm→cm`, `mm→in`, `mm→ft`, `cm→mm`, `cm→in`, `in→mm`, `in→cm`, `ft→mm`의 8쌍이 틀려 목표 크기가 1보다 작은 네 단위를 모두 겨눈다. 두 행을 더한 사본의 시험 22개는 전달된 모듈에서 모두 통과하고 먼저 나누는 사본에서 둘이 `convert(1e+307, "mm", "cm"): expected 1e+306, got Infinity`와 `convert(1e+308, "mm", "cm"): expected 1e+307, got Infinity`로 실패한다. 제품 코드는 바꿀 일이 없다.
- 결정이 바뀌는 조건: 이 Story가 다른 까닭으로 InProgress로 돌아와 이 항목이 수용된 범위 안에서 고칠 수 있게 되면 같은 Story에서 고치고, 그때의 `Treatment: TEST-003 fix` 줄이 이 future 결정을 대신한다(`apply-qa-fixes.md`).

### DEV-2 같은 단위 반환의 분기를 지키는 시험이 없다

- 출처: Dev의 질문 2(Completion Notes의 Review 인계(QA 수정 1회차)의 한계), QA 라운드 2의 리드 12(qa-r2의 "넘겨받은 질문" 2), gate의 `recommendations.future` 셋째와 `risk_summary.recommendations.monitor` 둘째.
- 재현: `convert`의 `if (source === target)` 분기를 지운 사본에서 시험 20개가 모두 통과한다. 같은 사본의 값은 `convert(0.1, "K", "K")`가 `0.10000000000002274`, `convert(1e-20, "K", "K")`가 `0`, `convert(0.0015, "F", "F")`가 `0.0015000000000036096`이고 `convert(1e308, "km", "km")`는 그대로다. 전달된 모듈은 모두 입력을 그대로 돌려준다. 길이, 압력, `C`는 분기가 없어도 값이 바뀌지 않는다. QA는 분기를 지웠을 때 값이 상대 오차 1e-12를 넘게 바뀌는 입력이 K 0.023 이하와 F 0.0015 이하뿐이라고 측정했고, 위의 `1e-20 K`와 `0.0015 F`가 그 구간에 든다. `0.1 K`는 상대 오차가 약 2.3e-13이어서 허용 폭 안이다.
- 이 Story가 적용하지 않는 까닭: 분기를 지키는 시험 행은 결과가 0에 가까운 구간에서만 만들 수 있고, Dev Notes가 그 구간의 행을 쓰지 않는다고 정한다(N-4). 분기를 둔 구현과 지운 구현 모두 계획이 허용한 읽기여서(po-r1) 그 행을 두면 허용한 읽기를 떨어뜨린다. 지킬지는 PO1-N4를 정하는 소유자의 결정이고, 어느 쪽도 잘못된 결과가 아니라고 QA가 판정했다.
- 필요한 일: PO1-N4(0에 가까운 결과의 정밀도)를 정할 때 같은 단위 반환을 계약으로 유지할지 함께 정한다. 유지하면 지운 구현이 틀리는 입력(예: `1e-20 K`)의 행을 시험에 더하고, 유지하지 않으면 분기를 지워도 된다. 책임은 프로젝트 소유자다.

### DEV-3 범위 끝의 1 ulp 안에서 결과가 갈린다

- 출처: Dev의 질문 3(Review 인계(QA 수정 1회차)의 한계), QA 라운드 2의 리드 13(qa-r2의 "넘겨받은 질문" 3), gate의 `recommendations.future` 넷째와 `risk_summary.recommendations.monitor` 첫째.
- 재현: 입력의 정확한 이진 값과 D-2와 SI 접두어의 유리수로 참값을 구해 가장 큰 double(`Number.MAX_VALUE`)과 비교했다(1 ulp는 그 근처 두 수의 간격 2의 971제곱이고, 올바른 한 번의 반올림은 가장 큰 double에서 반 ulp 위 미만의 값을 가장 큰 double로 만든다). `convert(1.2394657852469996e306, "MPa", "psi")`는 참값이 가장 큰 double보다 0.244 ulp 아래인데 `Infinity`다. `convert(4.566140562550282e303, "km", "in")`는 참값이 0.067 ulp 위(올바른 반올림이면 가장 큰 double)인데 `Infinity`다. `convert(5.479368675060339e307, "m", "ft")`는 참값이 1.454 ulp 위(올바른 반올림이면 `Infinity`)인데 `1.7976931348623157e+308`이다. 이 셋은 QA가 범위 끝 쓸기에서 찾은 다섯 건에 든다. 올바른 반올림이 `Infinity`가 되는 문턱(가장 큰 double에서 반 ulp 위)까지의 거리는 0.744, 0.433, 0.954 ulp로 QA가 적은 값과 같다.
- 이 Story가 적용하지 않는 까닭: 수용된 문서는 이 경계에서 유한과 무한을 가르는 정확한 반올림을 정하지 않는다. D-2는 배정밀도 계산의 반올림 오차를 상대 오차 1e-12로 허용하고, 표 3과 N-1이 넘치는 결과를 정하지 않는다. 맞다 틀리다 하려면 계약에 없는 요구를 가정해야 한다(QA 라운드 2). `convert`의 JSDoc이 이 동작을 "within a rounding error of that limit the result can be an infinity or the largest double"로 적어 현재 동작과 맞다.
- 필요한 일: PO1-N1(참값이 범위를 넘는 변환의 결과)을 정할 때 범위 끝의 1 ulp 안에서 `Infinity`와 가장 큰 double 가운데 무엇을 약속할지, 또는 약속하지 않을지도 함께 정한다. 정확한 반올림을 요구하는 답이면 `src/units.js`의 환산과 JSDoc을 바꾸고 시험을 더한다. 책임은 PM 또는 프로젝트 소유자다.

## 처리 줄이 없는 나머지 항목의 보관 위치

각 항목의 보관 위치를 직접 열어 확인했다. 줄이 없는 까닭은 새 지적이 아니거나, 이미 보관된 곳이 있거나, 활성 지적이 아닌 리드이기 때문이다. 처리 줄은 활성 지적과 Dev의 결정에 쓰인다.

| 항목 | 출처 | 보관 위치와 확인 | 줄 |
| --- | --- | --- | --- |
| 저작권과 SPDX 값 | gate `recommendations.future` 첫째, `monitor` 넷째, 라운드 1의 리드 9 | `docs/planning/future-work.md`의 항목 "[Tech-Debt] 새 파일의 저작권과 SPDX 값"(`Planning: unplanned`, Source Story 1.1)이 "Story 1.2와 1.3이 만드는 파일도 같은 입력을 기다린다"고 이미 적는다. 이 Story의 새 파일 둘도 같은 사정이고 새 정보가 없다 | 없음. 새 줄은 이미 결정된 항목을 triage로 되돌린다 |
| PO1-N1 ~ PO1-N7, PO2-N1 | gate `recommendations.future` 둘째, 리드 1 ~ 8 | 이 Story의 PO Validation 1회, 2회 항목에 있고, 병합 뒤 점검이 PO Validation의 적용하지 않은 비차단 지적을 future-work 항목으로 옮긴다(`future-work-planning.md`). PO1-N1이 더한 관찰(참값이 유한한 입력)은 REL-001이 흡수해 단위 3.1이 고쳤고(gate 라운드 1 `note`의 합친 후보), 남은 것은 참값이 범위를 넘는 입력의 결과뿐이다 | 없음. PO의 지적이고 처리 줄이 닿지 않는다 |
| 참값이 범위를 넘는 변환(N-1, PO1-N1), 범위 끝의 반올림 오차 | `monitor` 첫째, 리드 1, 13 | PO1-N1과 위의 DEV-3 | DEV-3 |
| 0에 가까운 결과(N-4, PO1-N4), 같은 단위 반환의 유지 | `monitor` 둘째, 리드 4, 12 | PO1-N4와 위의 DEV-2 | DEV-2 |
| `ConversionError`의 `name`(N-5, PO1-N5) | `monitor` 셋째, 리드 5 | PO1-N5와 `docs/planning/future-work.md`의 항목 "[Tech-Debt] CalculationError의 name"이 "같은 결정이 `ConversionError`에도 닿는다"고 이미 적는다 | 없음 |
| CRAP 측정 안 함 | `monitor` 넷째 | 항목 "[Tech-Debt] CRAP 측정 경로". `data/development-quality.md`의 CRAP check는 제안이 이미 future-work 파일에 있으면 Story가 다시 제안하지 않는다고 정한다 | 없음 |
| TEST-003 | `monitor` 다섯째, `recommendations.immediate` | 위의 TEST-003. `immediate`가 말한 Done 전의 처리 줄이 이 기록과 Completion Notes에 있다 | TEST-003 |
| 라운드 1의 리드 10(도구 관찰) | 라운드 1 `note` | Story의 항목이 아니라 방법론 소유자의 도구 관찰이고, 기록에 드러난 부분은 DOC-001로 이미 닫혔다 | 없음 |
| 라운드 1의 리드 11(세션 정체) | 라운드 1 `note` | Agent Identity가 확인하지 못한 값을 그대로 적는다. 판정을 막지 않는다고 QA가 판단했다 | 없음 |
| 닫힌 지적 REL-001, TEST-001, TEST-002, DOC-001, DOC-002 | gate `resolved_issues` | 각 `Treatment: ... fix` 줄이 있고 QA가 RESOLVED로 닫았다 | 변경 없음 |

입력 항목과 대조 항목이 모두 맞는다: 활성 지적 1, gate `recommendations.future` 4, `monitor` 5, `immediate` 1, 라운드 2의 리드 12와 13, 라운드 1의 리드 1 ~ 11, 닫힌 지적 5.

## 점검

Node.js v24.22.1, 프로젝트 루트, HEAD `c1160ee`. 아래 스크립트와 사본은 프로젝트 임시 영역에 두었고 저장소 파일은 읽기만 했다.

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 전체 시험 | `node --test` | 55개 통과, 실패 0(단위 변환 20, 기존 35) |
| 전달된 모듈 | 사본에서 `node --test test/units.test.js` | 20개 통과 |
| 먼저 나누는 변이 | 같은 사본에서 `convertTo`를 `(value / target.size) * size`로 바꿈 | 20개 통과(TEST-003 재현) |
| 같은 단위 반환을 지운 사본 | 분기를 지움 | 20개 통과(DEV-2 재현) |
| 길이 행 둘을 더한 시험을 전달된 모듈에 실행 | 사본에서 `node --test test/units.test.js` | 22개 통과 |
| 같은 시험을 먼저 나누는 사본에 실행 | 사본에서 `node --test test/units.test.js` | 22개 중 20개 통과, 2개 실패 |
| 쌍별 비교 | 두 행의 20쌍을 두 사본에 실행 | 전달된 모듈은 틀린 쌍 0, 먼저 나누는 사본은 행 1에서 2쌍, 행 2에서 8쌍 |
| 직접 호출 | `convert(1e307, "mm", "cm")` 등 | 위 재현 절의 값 |
| 범위 끝 | 세 입력의 참값을 BigInt의 유리수 산술로 구해 비교 | 위 DEV-3의 값 |
| 제품과 시험 파일 | `git hash-object`, `git diff 546c2d0 HEAD -- src test` | 두 파일의 값이 QA 라운드 2와 같고 차이 없음 |
| 변경 없음 | `git diff --quiet 40e1a6b -- src/engine.js src/number-format.js test/engine.test.js test/number-format.test.js` | 종료 상태 0 |
| 저장한 Story와 게이트 | `sh .bmad-core/utils/checks/check-gate.sh docs/qa/gates/1.2.yml docs/stories/1.2.story.md` | 종료 상태 0 |
| QA Results의 줄 | `check-stage.sh qa-record docs/stories/1.2.story.md` | 종료 상태 0, 최근 항목이 `Gate: PASS`, `Round: 2` |
| 기록 문서 | `check-stage.sh records docs/stories/1.2.story.md` | 종료 상태 0 |
| future-work 파일 | `check-stage.sh future --story 1.2` | 종료 상태 0 |
| Done 전 감사 | `sh .bmad-core/utils/checks/check-done.sh docs/stories/1.2.story.md` | 종료 상태 0. 이 기록을 저장하기 전의 Story 사본에는 `TEST-003: an active Optional issue has no "Treatment:" line in Completion Notes`로 종료 상태 1 |

## 한계

- 사본 실험은 손으로 고른 변이 둘과 입력 몇 개이고 전수가 아니다. 변이 도구는 설정되어 있지 않다.
- 길이 행 둘은 사본에서만 실행했고 저장소의 시험 파일에 더하지 않았다. 더한다면 행의 표기(`in`, `ft` 값을 식으로 쓸지 리터럴로 쓸지)는 그 변경 때 정한다.
- DEV-2와 DEV-3의 소유자 결정은 열려 있고 이 기록이 정하지 않는다.
- 이 라운드는 코드를 바꾸지 않아 Cleaner 검토자를 시작하지 않았다.
