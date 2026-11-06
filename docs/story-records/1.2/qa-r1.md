# qa-r1 — 단위 변환

- Story: [1.2](../../stories/1.2.story.md)
- Entry: QA review round 1
- Reviewer and time: Quinn(QA 하위 세션, 모델 `claude-opus-5-5`, effort `max`), `*run-story 1.2 1.3 remote to Done` run의 역할 작업. 2026-11-06, 메인 세션의 시작 스냅샷 15:01 +0900 뒤에 시작, 점검 실행 15:09 ~ 15:25 +0900, 기록 저장은 gate의 `updated`와 같다. 실제 LLM 검토이며 추가 검토자는 없다.
- Reviewed inputs: 브랜치 `story/1.2`, 기준 `main` 40e1a6b, HEAD b7cf162, 커밋하지 않은 변경 없음. 구현 개정은 53267c9이고 `src/units.js`와 `test/units.test.js`는 그 뒤 바뀌지 않았다(`git hash-object` 값 `92fb71af25f`, `a74655cc732`, dev-1.1의 최종 상태와 같다).

## 읽은 입력과 규칙

- Story 파일 전체, 기록 문서 dev-1.1, dev-2.1, dev-dod-1 전체, sm-1과 po-r1의 N-1 부분. 부모와 설계: `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`, `docs/planning/future-work.md`. 코드: `src/units.js`, `test/units.test.js`, `package.json`, `README.md`, `.github/workflows/ci.yml`, `ci/screen-rule.check.mjs`. 앞 Story의 gate와 qa-r1은 형식과 판단의 비교로 읽었고 이 회차의 근거로 쓰지 않았다.
- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`. `check-instructions.sh` 종료 상태 0.
- 끝까지 읽은 본문(QA의 규칙 종류 `operations`, `design`, `quality`, `documentation`): `golden-rules`, `coding-principles`, `comments`, `documentation`, `testing-tdd`, `crap`, `javascript-language`, `javascript-crap`.
- 끝까지 읽은 절차: `agents/qa.md`, `project-map.md`, `core-config.yaml`, `tasks/load-project-rules.md`, `tasks/review-story.md`, `tasks/qa-gate.md`, `templates/qa-gate-tmpl.yaml`, `tasks/trace-requirements.md`, `tasks/nfr-assess.md`, `tasks/risk-profile.md`, `tasks/code-comment-style.md`, `tasks/in-flight-comment-lifecycle.md`, `checklists/comment-hygiene-checklist.md`, `tasks/local-story-review.md`, `tasks/architecture-align.md`, `tasks/apply-qa-fixes-extract.md`, `data/finding-classification.md`, `data/story-paths.md`, `data/agent-context.md`, `data/development-quality.md`, `data/verification-ownership.md`, `data/domain-language.md`, `data/quality-tooling.md`, `data/story-slicing.md`, `data/terms.md`, `data/local-git-workflow.md`, `data/future-work-planning.md`, `utils/checks/gate-rules.awk`, `utils/checks/story-rules.awk`, `utils/checks/record-rules.awk`, `utils/checks/owned-rules.awk`, `utils/checks/check-stage.sh`, `utils/checks/check-gate.sh`, `utils/checks/lib.sh`.
- 일부만 읽은 파일: `tasks/run-story.md`(Instructions and reports, Ownership across slots, Role sessions, Rounds, Checks after each task, Stop hold and carry on), `tasks/develop-story.md`(Order Of Execution부터 Completion 앞부분), `tasks/apply-qa-fixes.md`(`Treatment` 줄의 설명), `data/workflow-routing.md`(Story temporary material), `templates/story-tmpl.yaml`(Status, Dev Agent Record, QA Results), `utils/checks/check-owned.sh`(앞부분과 규칙 `qa`).

## Spec Review

### AC 대조

| 요구 | 시나리오와 시험 | 수준, 방식 | 관찰 | 범위 |
| --- | --- | --- | --- | --- |
| AC 1 같은 종류의 변환, 단위 목록 | 1.2-UNIT-001, 002, 003, 008 | unit, automated | 표 L-1 ~ L-4, P-1 ~ P-4의 모든 순서쌍이 같은 값이다. 참값이 범위 안이고 중간 값이 넘치는 입력에 시험이 없고 결과가 틀리다(REL-001) | partial: 빠진 것은 그 입력 |
| AC 2 원점이 다른 온도 | 1.2-UNIT-004 | unit, automated | 표 T-1 ~ T-4의 모든 순서쌍이 같은 값이다 | full |
| AC 3 오류 | 1.2-UNIT-005, 006, 007, 008, 009 | unit, automated | 표 2의 입력이 모두 `ConversionError`이고 Z-1은 던지지 않는다 | full |
| AC 4 단위 목록과 모르는 종류 | 1.2-UNIT-010, 011, 012 | unit, automated | U-1이 순서까지 같고 E-5가 모두 `ConversionError`이며 돌려준 목록을 바꿔도 다음 호출에 남지 않는다 | full |
| 결정 D-2 | 1.2-UNIT-001 ~ 006, 008 | unit, automated | 단위 값, 온도 식, 정확히 0 K의 수용, 대소문자, 값의 형, 상대 오차 1e-12가 시험과 실행으로 맞다 | full |
| Architecture 설계 원칙, 소스 트리 | 1.2-UNIT-009, 1.2-INSP-001, 002, 003 | unit과 inspection | 순수 함수, `Error`를 잇는 자기 모듈의 오류 클래스, 가져오기 없음, 정해진 파일 위치 | full |
| 기존 모듈 회귀 | 1.2-UNIT-014 | unit, automated | 기존 시험 35개 통과, 네 파일의 `git diff` 빈 결과 | full |

AC 집계: 4개 가운데 full 3, partial 1, none 0. 위 범위는 시험의 설계 범위이고 실행 결과는 아래 표에 따로 적었다. AC 1, AC 2, AC 3, AC 4의 글은 `docs/prd.md`의 Story 1.2와 같고, D-2 인용은 `docs/planning/decisions.md`와 같다(프로그램으로 대조).

### 시나리오와 시험 이름의 대응

시나리오 17개 모두 실행했다. 실행 맵의 방식(automated 15, agent-review 2, user-only 0)을 바꾸지 않았다. 단위 변환 시험 18개가 모두 아래에 한 번 이상 나온다.

| 시나리오 | 시험 이름 또는 방법 | 결과 |
| --- | --- | --- |
| 1.2-UNIT-001 | "converts between all pairs of length units" | 통과 |
| 1.2-UNIT-002 | "converts between all pairs of pressure units" | 통과 |
| 1.2-UNIT-003 | "converts negative and zero lengths and pressures" | 통과 |
| 1.2-UNIT-004 | "converts between temperature units with their different origins" | 통과 |
| 1.2-UNIT-005 | "accepts absolute zero written in each temperature unit", "rejects a temperature below absolute zero in every unit" | 통과 |
| 1.2-UNIT-006 | "rejects a value that is not a finite number" | 통과 |
| 1.2-UNIT-007 | "rejects a conversion between units of different kinds" | 통과 |
| 1.2-UNIT-008 | "rejects a unit that is not listed, in either position", "rejects a call with missing arguments" | 통과 |
| 1.2-UNIT-009 | "throws a ConversionError that is also an Error with a text message", "keeps no state between calls, also after an error", "exports exactly the conversion function, the list function and the error class" | 통과 |
| 1.2-UNIT-010 | "lists the units of each kind in their listed order" | 통과 |
| 1.2-UNIT-011 | "rejects a kind that is not listed" | 통과 |
| 1.2-UNIT-012 | "keeps its lists unchanged when a caller changes a returned list" | 통과 |
| 1.2-UNIT-013 | "answers a result that overflows with an infinity or a ConversionError" | 통과. 세 입력 모두 `Infinity` |
| 1.2-UNIT-014 | `test/engine.test.js`, `test/number-format.test.js`의 35개와 `git diff --quiet 40e1a6b -- src/engine.js src/number-format.js test/engine.test.js test/number-format.test.js` | 통과, 종료 상태 0 |
| 1.2-INSP-001 | Story의 "가져오기 검색" 명령을 `src/units.js`에 실행 | 통과, 일치 없음, 종료 상태 1 |
| 1.2-INSP-002 | `src/units.js`를 끝까지 읽음 | 통과. 가져오기, 입출력, 전역 접근이 없다. 모듈 변수는 표와 상수이고 선언 뒤 바뀌지 않는다. 단위는 AC 1의 14개뿐이다 |
| 1.2-INSP-003 | 누적 변경을 `docs/architecture.md`의 기술 구성, 소스 트리, 설계 원칙, D-2, `README.md`와 다시 대조 | 통과. dev-2.1의 no-change 결론과 같다 |
| 계획 밖 | "returns a value unchanged when both units are the same" | 통과. Cleaner 지적 F4로 더한 시험이다. 주석은 TEST-001 |

### 실행한 점검

Node.js v24.22.1, Git 2.51.0, 프로젝트 루트, HEAD b7cf162. 아래 스크립트는 프로젝트 임시 영역에 두었고 제품 파일을 바꾸지 않았다. 변이, 입력 수집, 수정 후보는 사본에서 했다.

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 전체 시험 | `node --test` | 53개 통과, 실패 0(단위 변환 18, 기존 35) |
| 표의 닿음 | 저장된 Story의 글에서 표 1, 2, 3을 읽어 기대 호출을 만들고, 호출을 기록하는 사본에서 전달 시험을 실행해 비교 | 기대 643개, 기록 655개, 빠진 호출 0. 기대 밖 12개는 Z-2의 나머지 6, 같은 단위 4, `units("x")`, `convert(1, "m", "cm")` |
| 표의 값 | 값 행 13개의 289호출을 실제 모듈에 돌려 Story의 같은 값 판정으로 비교 | 어긋남 0 |
| 표 자체 | 표 1의 값 행 228쌍을 D-2와 SI 접두어의 유리수로 대조 | 가장 큰 상대 차이 1.096e-16 |
| 독립 오라클 | 제품과 코드를 나누지 않는다. 입력의 정확한 이진 값과 유리수 산술로 참값을 구해 비교. 70쌍, 쌍마다 4000 표본, 28만 호출 | 아래 "오라클 결과" |
| 절대 영도 경계 | 각 단위의 하한부터 위로 배정밀도 수 넷을 세 단위로 변환 | 목표 단위의 하한 아래인 결과 0건. 연산이 단조이므로 더 위의 입력도 같다. `-273.15000000000003`, `-459.67000000000007`은 각 하한 바로 아래의 수다 |
| 변이 | 손으로 쓴 변이 83개를 전달 시험에 실행 | 잡힘 75, 통과 8. 아래 "변이 결과" |
| 적대 입력 | `Symbol`, `Date`, 함수, `valueOf`와 `toString`을 가진 객체, `String` 객체, 종류의 0, `false`, `NaN` 등 17개 | 모두 `ConversionError` |
| Dev Notes의 값 | 배정밀도 식 여덟 개를 다시 실행 | 모두 Story와 같다 |
| 같은 단위 주석 | 같은 단위 반환을 지운 사본에서 네 행 실행 | 1e308 km, MPa, F는 `Infinity`, `Number.MAX_VALUE` C는 같은 값(TEST-001) |
| 수정 후보 | 사본에서 배율 단위는 비율을 먼저 구해 곱하고 온도는 1.8로 곱하고 나누도록 바꿈 | 전달 시험 18개 통과. 오라클의 같은 표본에서 범위 안의 `Infinity` 0건, 범위 밖의 `Infinity` 1329건 그대로. `-459.67` F는 0 K, `convert(1e303, "MPa", "kPa")`는 1e+306, `convert(1e308, "F", "C")`는 5.555555555555556e+307 |
| CI 규칙 | `node ci/screen-rule.check.mjs` | 종료 상태 0. `src/screen.js`가 없어 판정 없음이고 이 Story의 필수 점검이 아니다 |
| 기록 | `check-stage.sh records`, `po-record`, `future --story 1.2` | 모두 종료 상태 0 |

### 오라클 결과

| 분류 | 호출 수 | 판단 |
| --- | --- | --- |
| 상대 오차 1e-12 안 | 276860 | 맞다 |
| 참값이 범위를 넘고 결과가 `Infinity` | 1329 | 표 3이 받는 결과와 같은 쪽이다(N-1) |
| 참값이 범위 안인데 결과가 `Infinity` | 984 | REL-001. 모두 kPa, MPa, bar, psi 사이의 12쌍과 C→F, K→F, F→C, F→K의 4쌍이다 |
| 참값이 정규 범위 아래이고 허용 폭을 넘음 | 817 | 비정규 수의 자릿수 한계다. 예: `convert(5e-322, "mm", "cm")`는 0, 참값은 약 4.99e-323. N-4의 범위에 든다 |
| 온도에서 허용 폭을 넘음 | 10 | 절대 영도 입력에서 결과 0과 입력의 이진 오차의 차이뿐이다 |
| 그 밖의 어긋남, 예기치 않은 오류 | 0 | |

표본은 일상 크기, 모든 지수 범위, 범위의 위쪽 끝을 섞었다. 길이 쌍에 범위 안의 `Infinity`가 없는 까닭은 기준 단위 m보다 큰 단위가 km뿐이고 같은 단위 반환이 km→km을 처리하기 때문이다.

### 변이 결과

통과한 변이 8개는 모두 계약이 허용하는 구현이다.

| 변이 | 판정 | 근거 |
| --- | --- | --- |
| `psi`를 상대 2.9e-13만큼 바꿈, 결과를 유효 숫자 14자리로 반올림 | 계획이 허용 | D-2의 상대 오차 1e-12 안이다. 1.7e-12의 `psi`와 12자리 반올림은 잡힌다 |
| F→C를 1.8로 나눔, C→F를 1.8로 곱함 | 계획이 허용 | Dev Notes가 `/ 1.8` 순서의 값을 들고 T-5가 통과한다. REL-001의 수정 방향이다 |
| 얼린 공유 목록 | 계획이 허용 | Dev Notes "복사본을 돌려줄지 얼린 배열을 돌려줄지는 구현 선택" |
| `TypeError`를 잇는 오류, `name`을 가진 오류 | 계획이 허용 | `Error`를 잇고, `name`은 시험하지 않는다(N-5) |
| 넘침에 `ConversionError` | 계획이 허용 | 표 3이 받는다 |

나머지 75개는 시험이 잡았다. 시험마다 잡은 수는 "converts negative and zero lengths and pressures" 21, "accepts absolute zero written in each temperature unit" 19, "converts between temperature units with their different origins" 14, "converts between all pairs of pressure units" 12, "converts between all pairs of length units" 11, "rejects a temperature below absolute zero in every unit" 10, 그 밖의 시험 2 ~ 8이다. 18개 시험 모두 하나 이상을 잡았다. 한 변이를 여러 시험이 잡으면 각각 세었다.

### 분류의 근거

- REL-001: 1단계, 실행과 오라클로 확인. 2단계, 이 Story가 만든 코드. 3단계, 어떤 시나리오도 이 사례를 이름 붙이지 않는다. 1.2-UNIT-013과 표 3은 참값이 범위를 넘는 세 입력만 들므로 `data/finding-classification.md`의 "A case that none of them names is judged at step 4"에 따라 4단계로 간다. 4단계, 입력은 수용된 부류다. Testing "지원 입력"은 "`value`: number 형이고 유한한 수만 받는다"이고, AC 1은 `MPa`와 `kPa`를 든다. "받는 입력 가운데 결과가 유한하지 않은 경우만 표 3이 두 결과를 받는다"이고 참값 1e306은 유한하므로 표 3의 자리가 아니다. 결과 `Infinity`는 AC 1의 "값을 바꿔 돌려준다"에 틀린 값이고, D-2의 같은 값 판정으로도 다르다. 구현 선택이나 이름 없는 부류를 가정하지 않는다. 그래서 차단이다. 보안, 데이터 손실, 큰 영향의 결함이 아니므로 Required가 아니라 Recommended다. 경로는 `rework`, 소유자 Dev다. Dev가 수용된 AC 안에서 고를 수 있는 일이고, 위 수정 후보가 시험과 표 3과 T-5를 그대로 두고 고침을 보였다. 심각도는 입력의 크기가 실무의 값에 닿지 않아 low로 두었다.
- TEST-001: 1단계, 사본 실행으로 확인. 2단계, 이 Story가 만든 시험. 3단계, CC-CMT-010 표 아래의 "Test names, headers and comments must describe what the test actually reaches and asserts"가 기준이다. 주석 "Converting these through the reference unit of their kind would overflow"가 네 행을 말하고 그중 하나가 넘치지 않는다. 기준이 이름 붙었으므로 Required다. 심각도는 시험의 단언 자체는 맞아 low다.
- TEST-002: 1단계, 시험 파일의 숫자 리터럴을 모두 읽어 분류. 2단계, 이 Story가 만든 시험. 3단계, CL-GLD-001의 Numeric literals 1단계가 기준이다. 세 호출의 `1`은 같은 입력이고 뒤의 두 호출이 첫 결과와 비교하므로 함께 바뀌어야 한다. 같은 파일의 다른 반복은 독립된 호출이어서 1단계에서 빠진다. 기준이 이름 붙었으므로 Required이고, 다른 읽기(시험의 입력 값이므로 3단계)가 있어 확신은 medium이다. Dev는 근거를 들어 이의를 남길 수 있고 다음 회차가 판단한다.
- DOC-001: 1단계, dev-1.1의 해당 문장과 시험 파일을 읽어 확인. 3단계, 사실은 맞고 표현만 부정확하다("imprecise but not false"). 4단계, 잘못된 결과가 없다. 비차단이고 계약 안이다.
- DOC-002: 1단계, dev-1.1과 Completion Notes에 재확인의 기록이 없고 같은 값이 나오는 출력은 구현 뒤의 것임을 확인. 3단계, 그 문장은 결과의 기록을 요구하지 않고 시나리오가 아니다. 4단계, QA가 값을 다시 실행해 모두 같아 잘못된 결과가 없다. 비차단이고 계약 안이다.

### 넘겨받은 질문

모두 리드처럼 직접 확인했다. 질문 자체가 막는 다음 단계는 없고 `pending` 지적이 없다. DEV-1이 담은 관찰만 지적 REL-001이 되었고, 나머지는 게이트의 회차 `note`에 리드로 두었다.

| 질문 | 소유자 | 확인 | 분류 |
| --- | --- | --- | --- |
| PO1-N1 결과가 유한하지 않은 변환 | PM 또는 프로젝트 소유자 | 표 3의 세 입력이 `Infinity`이고 받는 결과 안이다 | 참값이 범위를 넘는 입력은 리드. 두 읽기의 합격 판정이 같다. 더한 관찰(참값이 유한한 입력)은 REL-001 |
| PO1-N2 기대 값 0 | 프로젝트 소유자 | T-1, T-5, L-4, P-4의 0 결과가 모두 0이나 -0이다 | 리드 |
| PO1-N3 절대 영도의 엄밀함 | 프로젝트 소유자 | Z-2 전부 거부, Z-1 전부 수용 | 리드 |
| PO1-N4 0에 가까운 결과 | 프로젝트 소유자 | `convert(-273.149, "C", "K")`는 0.0009999999999763531, `convert(273.16, "K", "C")`는 0.010000000000047748 | 리드. D-2의 식을 배정밀도로 계산한 결과이고 Story가 범위 밖에 두었다. REL-001과 달리 올바른 구현이 쉽게 피할 수 없다 |
| PO1-N5 오류의 `name` | Dev, PM | `name`은 "Error", `String`은 "Error: x" | 리드. 수용 문서에 없고 기존 future-work 항목이 닿는다 |
| PO1-N6 수용된 글의 해석 | PM | 음수 길이와 압력, 글자가 아닌 단위와 종류, SI 접두어, 배열 | 리드 |
| PO1-N7 Architecture의 절 없음 | Architect | 코딩 표준 절과 Change Log 절이 없고 이 Story는 문서를 바꾸지 않았다 | 리드 |
| PO2-N1 검색의 한계 | SM | `const a = 1 / require("./engine.js");`에 검색이 종료 상태 1이고 `src/units.js`에 그런 줄이 없다 | 리드 |
| DEV-1 | Dev(REL-001) | 위 "분류의 근거". 질문은 N-1을 정할 때 함께 정할지 묻지만 참값이 유한한 입력의 답은 AC 1과 D-2가 이미 정하고, 수정은 N-1의 어떤 답과도 충돌하지 않는다 | Recommended, `rework`. `Treatment: DEV-1 future`의 일정 표시는 현재 Story의 의무를 빼지 않는다(`tasks/qa-gate.md`) |
| Dev 질문 2 저작권과 SPDX | 프로젝트 소유자 | 두 파일의 머리글이 요약 한 줄이고 dev-1.1이 빠진 입력을 적었으며 기존 future-work 항목이 들고 있다 | 리드. CC-CMT-001의 처리와 같아 위반이 아니다 |
| Dev 질문 4 도구 관찰 | 방법론 소유자 | 이 세션의 Write 도구도 이스케이프를 문자로 저장했다(바이트로 확인). 시험 파일에는 이스케이프가 남아 있다. `check-stage.sh`에 Story 키를 주면 종료 상태 2, 파일 경로를 주면 동작한다 | 리드. 기록에 드러난 부분만 DOC-001 |

PO의 비차단 분류와 다르게 본 까닭: PO1-N1의 판단은 계획 단계의 것이다. 계획에서는 "합격 판정이 같고 구현 선택만 다르다"가 맞고 그 입력이 어떤 점검에도 없다. 이 회차는 전달된 결과를 보며 그 입력에서 틀린 값을 관찰했다. 앞 Story의 깊은 중첩과 다른 점은, 그 입력은 Story가 N-6으로 범위 밖에 두었으나 이 입력은 "지원 입력"이 받는 유한한 수라는 것이다. Dev도 같은 까닭으로 같은 단위 사이는 이미 고쳤다.

## Standards Review

- 접근과 TDD 증거: Task 1은 `TDD`, Task 2는 `verification-only`로 계획과 같다. dev-1.1의 조각 표를 Dev의 원시 출력과 대조했다. 조각 1 ~ 13과 Cleaner 뒤 조각의 시험 수와 실패 수, 첫 실패 메시지가 표와 같고, 파일 시각의 순서가 RED, GREEN, Cleaner, 재점검이다. 조각 순서는 Recommended Execution Order와 같다. 조각 3의 RED는 `TypeError`, 조각 10의 RED는 `Error: unknown kind`인데 둘 다 그 조각의 빠진 동작 때문이어서 CC-TDD-002에 맞고 Dev가 적었다. 처음부터 통과한 시험("converts negative and zero lengths and pressures", "accepts absolute zero written in each temperature unit", "rejects a kind that is not listed", "keeps its lists unchanged when a caller changes a returned list", "answers a result that overflows with an infinity or a ConversionError", "keeps no state between calls, also after an error", "exports exactly the conversion function, the list function and the error class")은 모두 Dev의 사후 변형 표에 실패가 기록되어 있다. 변형 요약(최종 48 잡힘, 1 통과, Cleaner 전 45 잡힘)과 도달 요약(643, 누락 0)도 기록과 같다.
- Cleaner: dev-1.1의 기록과 검토자의 작업 폴더(파일 18개)로 보아 마지막 GREEN 뒤, 최종 점검 전에 Dev가 아닌 하위 세션이 검토했고, 지적 8건의 처분과 재점검이 있다. F4(가)는 RED `1e+308 km`를 본 뒤 고쳤다. F4(나)가 REL-001이다. 같은 단위 시험은 Cleaner 뒤에 더해져 검토를 거치지 않았고 그 주석이 TEST-001이다.
- 시험 구조: 공개 인터페이스만 쓰고 테스트 대역이 없다. `testing-tdd`가 빼는 세 형태에 해당하는 시험이 없다. `assert.equal`과 `assert.deepEqual`은 strict 모듈의 것이다. 기대 값은 Story의 표에서 글자 그대로 왔고 시험 안에서 다시 계산하지 않는다. 허용 오차로 비교한 값을 "정확히 같다"고 말하는 이름과 주석이 없다.
- CC-JS-001 ~ CC-JS-006: 두 칸 들여쓰기, 세미콜론, 큰따옴표, camelCase, PascalCase, UPPER_SNAKE_CASE, `var` 없음, 탭 없음을 검색과 읽기로 확인했다. 80칸을 넘는 줄은 시험 이름 줄 3개이고 CC-JS-002의 80칸은 권장값이다. 경계 검증은 `Number.isFinite`, `Map`, `===`로 하고 진위 검사가 없다. 포매터와 린터는 설정되어 있지 않다.
- CL-GLD-001 숫자 리터럴: 제품의 크기 표와 온도 상수는 2단계, `symbols.length === 0`은 3단계다. 시험의 표 값은 3단계다. 찾은 위반은 TEST-002 하나다. 버린 후보와 결정한 단계는 게이트 `note`에 있다.
- CL-GLD-003, 004, 005, 006, 007, 010: 지적 없음. `convert`는 보호 절로 시작하고 잘못된 입력을 바로 거부한다. 단위 정의와 온도 상수는 한 곳에 있다. `[...UNITS].filter().map()`은 자기 값의 변환이다.
- 도메인 용어: `docs/domain-glossary.md`가 없고 PRD, Architecture, D-2의 뜻을 쓴다. `convert`, `units`, `ConversionError`, 단위, 종류, 기호가 그 뜻과 맞다.
- Architecture 정렬: dev-2.1의 표를 코드와 문서에 다시 대조했다. 문서를 고치지 않은 결론이 맞다. Architecture에 코딩 표준 절과 Change Log 절이 없는 점은 N-7(PO1-N7)로 열려 있다.
- 계획 대비 Dev의 변경: 시험 "returns a value unchanged when both units are the same"을 더한 것은 AC 1의 같은 단위 행과 어긋나지 않는다. `node:util`의 `inspect`는 내장 모듈이어서 Architecture에 맞다. File List가 sm-1, sm-2, po-r1, po-r2를 들지 않는 점은 DoD 체크리스트가 구현과 필수 동반 파일을 요구하고 이 넷이 계획 기록이어서 지적이 아니다.
- CRAP: `quality.crap.commands`가 비어 측정하지 않음이다. `data/development-quality.md` 섹션 CRAP check대로 통과도 차단도 아니고, 제안은 기존 future-work 항목 "[Tech-Debt] CRAP 측정 경로"가 들고 있어 되풀이하지 않는다. 다른 수치로 대신 재지 않았다.

### 위험 평가

프로젝트에 정한 위험 척도가 없어 결과의 크기와 가능성을 글로 판단했다. 가장 큰 위험은 R1이다.

| ID | 사건 | 결과 | 가능성의 근거 | 통제 | 수준 | 소유자 |
| --- | --- | --- | --- | --- | --- | --- |
| R1 | 범위 안의 변환이 `Infinity`를 돌려준다 | 호출자가 틀린 값을 오류 없이 받는다 | 입력이 약 1.8e302 이상이어야 해서 실무에서 낮다 | REL-001 | low | Dev |
| R2 | N-1의 답이 구현의 `Infinity`와 다르다 | 코드와 시험을 바꾼다 | 답이 아직 없다 | PO1-N1, 표 3 | low | PM, 프로젝트 소유자 |
| R3 | 0에 가까운 결과를 정밀한 값으로 믿는다 | 유효 숫자가 줄어든 값을 쓴다 | 어는점 근처의 K→C에서 나올 수 있고 상대 오차는 1e-11 수준이다 | PO1-N4, 표가 이 입력을 쓰지 않음 | low | 프로젝트 소유자 |
| R4 | 오류 이름으로 구별하는 소비자 | 일반 `Error`로 보인다 | 현재 소비자가 없다 | PO1-N5 | low | Dev, PM |
| R5 | 복잡도를 모른 채 함수가 자란다 | 시험이 어려워진다 | 함수가 짧다 | 기존 future-work 항목 | low | 프로젝트 소유자 |
| R6 | 새 파일의 법적 값이 비어 있다 | 배포 표기가 빠진다 | 프로젝트에 값이 없다 | 기존 future-work 항목 | low | 프로젝트 소유자 |

수준 집계: critical 0, high 0, medium 0, low 6.

## Code Quality Assessment

구현은 작은 공개 인터페이스(`convert`, `units`, `ConversionError`) 뒤에 단위 표, 검사 순서, 절대 영도 판정, 환산을 숨긴 모듈이다. 모든 단위를 기준 단위 하나를 거치게 한 설계는 단순하지만 그 중간 값이 REL-001의 원인이다. 값의 판정, 기호 조회, 경계 비교는 Story가 경고한 함정을 모두 피했고 오라클과 변이가 이것을 뒷받침한다. 주석은 이유와 계약을 설명하고 시험은 표를 빠짐없이 덮는다. 남은 것은 극단 크기의 환산과 시험 안의 작은 어긋남 둘이다.

## Implementation Recommendations

| 지적 | 제안 | 까닭 | 소유자 | 점검 |
| --- | --- | --- | --- | --- |
| REL-001 | CC-TDD-005대로 재현 시험을 먼저 더하고, 배율 단위는 비율을 먼저 구해 곱하며 온도는 1.8로 곱하고 나눈다. `convert`의 JSDoc과 온도 상수의 주석을 맞추고 DEV-1의 기록과 처리 줄을 갱신한다 | 참값이 범위 안인데 `Infinity`다 | Dev | 재현 시험의 RED와 GREEN, 표 1과 표 3의 행, T-5, `node --test` |
| TEST-001 | C 행을 빼거나 주석을 실제로 넘치는 행으로 한정한다. REL-001 뒤의 코드에 맞춰 함께 다시 쓴다 | 주석이 실제 동작과 다르다 | Dev | 같은 단위 반환을 지운 변형에서 남긴 행이 주석대로 실패, `node --test` |
| TEST-002 | 시험 안에서 입력에 이름을 주거나 호출을 지역 함수로 모은다. 접근은 `verification-only` | 함께 바뀌어야 하는 리터럴이 세 곳이다 | Dev | 오류 뒤 상태가 남는 변형이 이 시험에서 실패, `node --test` |
| DOC-001 | 다음 Dev 기록에서 앞 문장을 고쳐 쓰지 않고 바로잡는다 | 비차단, 계약 안. 수정 회차에 함께 적용할 수 있다 | Dev | 기록 읽기 |
| DOC-002 | 다음 Dev 기록에 재확인을 했는지 사실대로 적는다 | 비차단, 계약 안 | Dev | 기록 읽기 |

## Compliance Check

- Coding Standards: fail. TEST-001(CC-CMT-010), TEST-002(CL-GLD-001). 그 밖의 위반 없음.
- Project Structure: pass. 새 파일 둘이 소스 트리와 맞고 그 밖의 제품 파일을 만들지 않았다.
- Testing Strategy: pass. TDD 증거와 사후 점검의 기록이 계획과 맞다. 빠진 시험은 REL-001의 입력이다.
- All ACs Met: fail. AC 2, AC 3, AC 4는 충족한다. AC 1은 표의 입력에서 충족하고 REL-001의 입력에서 틀린 값을 돌려준다.

## Improvements Checklist

- [ ] REL-001 범위 안의 `Infinity`(Dev)
- [ ] TEST-001 같은 단위 시험의 주석(Dev)
- [ ] TEST-002 상태 시험의 반복 리터럴(Dev)
- [ ] DOC-001 dev-1.1의 이스케이프 문장의 처리 결정(Dev)
- [ ] DOC-002 구현 전 재확인 기록의 처리 결정(Dev)

## Security Review

신뢰할 수 없는 입력은 호출자의 인자뿐이다. 값은 `Number.isFinite`, 기호는 `Map`의 정확한 키, 종류는 `===`로 판정해 형 변환과 프로토타입 조회가 일어나지 않는다. `constructor`, `__proto__`, `Symbol`, `valueOf`를 가진 객체가 모두 `ConversionError`다. 가져오는 모듈, 입출력, `eval`, 비밀, 환경 변수가 없고 오류 메시지가 입력을 되풀이하지 않는다. 지적 없음.

## Performance Considerations

수용된 성능 기준과 이 변경에 닿는 실행 비용 규칙이 없어 측정 기준이 없다. 산술과 작은 `Map` 조회뿐이고 `units`는 호출마다 표 14행을 돈다. 측정하지 않았다.

## Review Record Changes

- 새 파일: `docs/qa/gates/1.2.yml`, 이 기록 문서.
- Story: QA Results 항목을 더하고 Status를 Review에서 InProgress로 바꿨다. 다른 섹션은 바꾸지 않았다.
- 구현 수정은 없다. Dev의 일이다.

## Comment Hygiene Report

- 방법과 범위: 체크리스트 §1.1(추적 번호), §1.2(QA 접두와 이 Story에 선언된 ID: `PO1-`, `PO2-`, `N-`, `Q`, `DEV-`, `F`, `D-`, `B`, 표의 행 `L-`, `P-`, `T-`, `Z-`, `E-`, `U-`, 시나리오 ID), §1.3(기계 고유 경로), §1.4(`IN-FLIGHT`), §1.7(편집 표시와 날짜), 작업 태그, 저자와 저작권 표시, 비ASCII, 탭, `var`를 `src/units.js`, `test/units.test.js`에 검색했다. 모두 일치 없음(종료 상태 1). 보조 조사로 `src`, `test` 전체를 §1.1로 검색했고 일치 없음이다.
- 기준선: 두 파일은 40e1a6b에 없는 새 파일이어서 기존 잔여물이 없다. `tests_directory_findings`는 0이다.
- 문맥 검토: 두 파일의 주석과 시험 이름을 모두 읽었다. 머리 주석은 한 줄 요약이다. 저작권과 SPDX 값은 프로젝트에 없고 Dev가 빠진 입력을 기록했다(CC-CMT-001, 소유자는 프로젝트 소유자). 공개 API의 JSDoc이 계약과 실패를 말한다. "the closest number below it"는 세 단위 모두 실행으로 맞다. 어긋난 곳은 "Converting these through the reference unit of their kind would overflow" 하나다(TEST-001).
- 수명: 원장이 비어 있고 표시가 없다. `pending_at_review` 0, `pending_after_story_done` 0, 앞선 Story의 의무 없음.
- 화이트리스트: `commentHygiene.preservedComments`가 비어 있어 기대 0, 관찰 0.
- 적용 안 됨: 빌드 가드, 핫스팟 짝 커밋, 접근 지정자(JavaScript 새 파일, 대상 없음).
- 결정: FAIL. 체크리스트 섹션 7의 "New test findings"에서 Required 지적이 있기 때문이다. 추적 번호와 금지 패턴은 0건이다.

## Extra Reviews

없다. 오케스트레이션 스위치가 꺼져 있어 이 회차에 추가 검토자가 없다.

## 한계

- 변이는 손으로 고른 83개이고 전수가 아니다. 변이 도구와 속성 점검 도구는 설정되어 있지 않다.
- 오라클의 입력은 씨앗을 고정한 표본이며 모든 입력을 덮지 않는다.
- 수정 후보는 고칠 수 있음을 보이는 사본이고 제품에 넣지 않았다. Dev가 다른 방법을 고를 수 있다.
- Dev의 실행 순서는 저장된 출력과 파일 시각으로만 확인했다. 그 출력을 만든 실행을 다시 보지는 못한다.
- Cleaner 검토자가 실제로 쓴 모델과 Dev 세션의 effort는 확인하지 못했다. 소유자는 메인 세션이고 절차가 특정 모델을 요구하지 않는다.
- sm-1, sm-2, po-r1, po-r2는 N-1 부분 말고 읽지 않았다. 첫 회차의 절차가 요구하는 기록은 `dev-` 기록이고, PO와 SM의 지적은 Story의 글로 확인했다.
