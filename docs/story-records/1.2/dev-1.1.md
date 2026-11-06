# dev-1.1 — 단위 변환 구현

- Story: [1.2](../../stories/1.2.story.md)
- Entry: Dev SubTask 1.1
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.2 1.3 remote to Done` run의 역할 작업
- 시각: 2026-11-06, 시작 14:34 +0900, 조각 실행 14:36 ~ 14:41, Cleaner 위임 14:43, Cleaner 반환 14:49, 정리와 최종 점검 완료 14:55
- 입력 기준: 브랜치 `story/1.2`, 시작 커밋 `8fbdd51`(`Approved -> InProgress`), 기준선 `main`의 `40e1a6b`. 이 SubTask는 새 파일 `src/units.js`와 `test/units.test.js`만 더한다. 기준에 두 파일이 없다.
- 환경: Node.js v24.22.1, Git 2.51.0. 점검 명령은 프로젝트 루트의 `node --test`(전체)와 `node --test test/units.test.js`(조각 실행)다. 외부 패키지와 테스트 대역은 쓰지 않았다.

## 읽은 규칙

`.bmad-core/tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`(Dev의 규칙 종류 `operations`, `design`, `documentation`). 완료 점검(`develop-story.md` Completion 4.5)을 위해 `comments`, `javascript-crap`, Common `crap`도 읽었다. `quality` 종류의 `coding-principles`는 Dev의 규칙 종류가 아니어서 읽지 않았고, 그 기준의 검토는 Cleaner 검토자가 맡았다.
- 절차 문서: `develop-story.md`, `local-story-start.md`, `local-task-done.md`, `local-story-review.md`, `data/development-quality.md`, `data/local-git-workflow.md`, `data/verification-ownership.md`, `data/defect-diagnosis.md`, `data/story-paths.md`, `data/workflow-routing.md`, `data/domain-language.md`, `data/agent-context.md`, `tasks/code-comment-style.md`, `tasks/publish-story.md`, `tasks/architecture-align.md`, `tasks/execute-checklist.md`, `checklists/comment-hygiene-checklist.md`, `checklists/story-dod-checklist.md`를 끝까지 읽었다.

## 접근과 시나리오

접근은 `TDD`다. Story의 Recommended Execution Order대로 조각마다 RED → GREEN을 마쳤다. 뼈대(모듈과 세 심볼만 있고 `convert`가 `NaN`, `units`가 빈 배열을 돌려주는 파일)를 먼저 만들어, 가져오기 실패가 아닌 값 단언 실패로 첫 RED를 보았다. 시나리오 ID는 Story의 Testing을 그대로 쓴다.

## 조각별 실행 기록

명령은 모두 `node --test test/units.test.js`이고, 코드 상태는 직전 GREEN 뒤의 `src/units.js`에 그 조각의 시험을 더한 것이다. "기준 통과"는 시험을 더한 뒤 처음 실행에서 이미 통과했다는 뜻이며 RED가 아니다. 그런 조각은 아래 민감도 점검으로 시험이 해당 동작에 닿는지 보였다. 조각 3의 RED는 기대 값이 틀린 것이 아니라 알려진 단위 `C`가 없어 예외가 난 것이다. 첫 증상이 값 불일치가 아니라 `TypeError`라는 점을 기록한다.

| 조각 | 시나리오 | 결과(처음 실행) | 구현(최소 변경) | GREEN |
| --- | --- | --- | --- | --- |
| 1 | 1.2-UNIT-001 | RED: 1개 실패. `convert(304.8, "mm", "mm")` 기대 304.8, 실제 NaN | 길이 단위의 크기 표와 `값 * 크기 / 크기` | 1/1 |
| 2 | 1.2-UNIT-002 | RED: 1개 실패. `convert(6894.757293168, "Pa", "Pa")` 기대 6894.757293168, 실제 NaN | 압력 단위의 크기를 표에 더함 | 2/2 |
| (구조) | | 단위를 기준 단위로 바꾸고 되돌리는 두 함수로 정의하도록 구조를 바꿈. 동작은 그대로이며 시험 2/2 통과를 확인한 뒤 다음 RED를 시작했다 | | 2/2 |
| 3 | 1.2-UNIT-004 | RED: 1개 실패. 온도 시험이 `TypeError: Cannot read properties of undefined (reading 'fromReference')`로 실패(단위 `C`를 모름) | 섭씨를 기준으로 `C`, `F`, `K` 세 단위 | 3/3 |
| 4 | 1.2-UNIT-007 | RED: 1개 실패. `Missing expected exception (ConversionError): convert(1, mm, Pa) must throw` | 단위가 종류를 갖고 종류가 다르면 `ConversionError` | 4/4 |
| 5 | 1.2-UNIT-006 | RED: 1개 실패. `Missing expected exception (ConversionError): convert(NaN, m, cm) must throw` | `Number.isFinite`로 값을 검사 | 5/5 |
| 6 | 1.2-UNIT-005 | 절대 영도를 받는 시험은 기준 통과. 거부 시험 RED: `Missing expected exception (ConversionError): convert(-1, K, K) must throw` | 온도 단위마다 절대 영도 상수와 비교해 `ConversionError` | 7/7 |
| 7 | 1.2-UNIT-003 | 기준 통과(8/8) | 없음 | 8/8 |
| 8 | 1.2-UNIT-008 | RED: 2개 실패. `convert(1, 'M', 'm')`이 `ConversionError` 대신 `TypeError`, 인자를 뺀 호출도 `Received "TypeError"` | 모르는 단위를 `ConversionError`로 | 10/10 |
| 9 | 1.2-UNIT-009 | 오류 정체 시험 RED: `Missing expected exception`(`units("x")`가 빈 배열을 돌려줌). 상태 시험과 내보내기 시험은 기준 통과 | `units`가 `ConversionError`를 던지는 가장 작은 구현 | 13/13 |
| 10 | 1.2-UNIT-010 | RED: 단위 목록 시험이 `Error: unknown kind`로 실패 | 종류별 기호를 순서대로 돌려주고, 목록이 비면 `ConversionError` | 14/14 |
| 11 | 1.2-UNIT-011 | 기준 통과(15/15) | 없음 | 15/15 |
| (구조) | | 시험의 종류별 단위 표를 하나로 모음. 시험만 바뀌고 15/15 통과를 확인했다 | | 15/15 |
| 12 | 1.2-UNIT-012 | 기준 통과(16/16) | 없음 | 16/16 |
| 13 | 1.2-UNIT-013 | 기준 통과(17/17) | 없음 | 17/17 |

13개 조각을 마친 상태(Cleaner 위임 전)의 프로젝트 루트 `node --test`는 52개 통과(기존 35개와 새 17개)였다.

## 민감도 점검(사후 점검)

기준 통과 조각(UNIT-003, UNIT-011, UNIT-012, UNIT-013, 그리고 UNIT-005의 절대 영도 수용, UNIT-009의 상태와 내보내기)은 RED가 없으므로, 시험이 해당 동작에 닿는지 `src/units.js`의 사본에 Story의 실패 기준에서 나온 틀린 변형을 한 번에 하나씩 넣고 같은 시험 파일을 돌려 보였다. 이 점검은 GREEN 뒤에 한 사후 점검이며 RED가 아니다. RED를 본 조각의 시험에도 같은 방법으로 실패 기준의 변형을 걸어 값 하나하나에 반응하는지 보았다. "같은 값 판정" 표의 다섯 줄은 해당 변형(`(5 / 9)` 순서, `psi` 6894.757293, `ft`→`in`에 `NaN`, `Infinity`, 글자 `"12"`)으로 점검했고, 같은 값으로 판정하는 줄(-459.66999999999996 대 -459.67, 0과 -0 대 0)은 표 1의 T-5, L-4, P-4 시험이 통과하는 것으로 보았다.

Cleaner 검토 전의 소스에서 45개 변형을 걸어 모두 걸렸다. 정리를 마친 최종 소스에서는 변형의 편집 대상이 바뀌어 같은 방법으로 다시 짜 49개를 걸었고, 그 결과가 아래 표다. 48개가 시험에 걸리고, 올바른 구현인 변형 하나(얼린 배열을 돌려주는 공유 목록)는 기대대로 통과했다.

| 시나리오 | 틀린 변형 | 결과 | 걸린 시험 | 첫 증상 |
| --- | --- | --- | --- | --- |
| 1.2-UNIT-001 | `ft`를 미국 측량 피트(0.3048006 m)로 둠 | 걸림 | converts between all pairs of length units; converts negative and zero lengths and pressures | convert(304.8, "mm", "ft"): expected 1, got 0.9999980314999382 |
| 1.2-UNIT-001 | 곱셈과 나눗셈이 뒤바뀜 | 걸림 | converts between all pairs of length units; converts between all pairs of pressure units; converts negative and zero lengths and pressures; answers a result that overflows with an infinity or a ConversionError; keeps no state between calls, also after an error | convert(304.8, "mm", "cm"): expected 30.48, got 3048 |
| 1.2-UNIT-002 | `psi`를 6894.76 Pa로 둠 | 걸림 | converts between all pairs of pressure units; converts negative and zero lengths and pressures | convert(6894.757293168, "Pa", "psi"): expected 1, got 0.9999996074073644 |
| 1.2-UNIT-002 | `psi`를 6894.757293 Pa로 둠 | 걸림 | converts between all pairs of pressure units; converts negative and zero lengths and pressures | convert(6894.757293168, "Pa", "psi"): expected 1, got 1.0000000000243663 |
| 1.2-UNIT-002 | `bar`를 101.325 kPa로 둠 | 걸림 | converts between all pairs of pressure units; converts negative and zero lengths and pressures | convert(6894.757293168, "Pa", "bar"): expected 0.06894757293168, got 0.06804596390987416 |
| 1.2-UNIT-003 | 음수 길이와 음수 압력을 거부 | 걸림 | converts negative and zero lengths and pressures | Error: negative |
| 1.2-UNIT-003 | 부호를 잃음(절댓값을 씀) | 걸림 | converts negative and zero lengths and pressures; answers a result that overflows with an infinity or a ConversionError | convert(-457.2, "mm", "cm"): expected -45.72, got 45.72 |
| 1.2-UNIT-003 | 0을 거부 | 걸림 | converts negative and zero lengths and pressures | Error: zero |
| 1.2-UNIT-003 | 길이와 압력의 최소값을 0으로 둠 | 걸림 | converts negative and zero lengths and pressures | Error: value is below absolute zero |
| 1.2-UNIT-004 | 화씨의 원점 32를 무시 | 걸림 | converts between temperature units with their different origins; accepts absolute zero written in each temperature unit | convert(0, "C", "F"): expected 32, got 0 |
| 1.2-UNIT-004 | 273.15 대신 273을 씀 | 걸림 | converts between temperature units with their different origins; accepts absolute zero written in each temperature unit | convert(0, "C", "K"): expected 273.15, got 273 |
| 1.2-UNIT-004 | 9 / 5와 5 / 9가 뒤바뀜 | 걸림 | converts between temperature units with their different origins; accepts absolute zero written in each temperature unit | convert(100, "C", "F"): expected 212, got 87.55555555555556 |
| 1.2-UNIT-004 | 32를 더하고 빼는 자리가 틀림 | 걸림 | converts between temperature units with their different origins; accepts absolute zero written in each temperature unit | convert(32, "F", "C"): expected 0, got 35.55555555555556 |
| 1.2-UNIT-005 | `(F - 32) * (5 / 9)` 순서로 계산 | 걸림 | accepts absolute zero written in each temperature unit | convert(-459.67, "F", "K"): expected 0, got -5.684341886080802e-14 |
| 1.2-UNIT-005 | `F`의 경계를 식으로 계산한 값(-459.66999999999996)으로 둠 | 걸림 | accepts absolute zero written in each temperature unit | Error: value is below absolute zero |
| 1.2-UNIT-005 | 경계에 허용 오차를 둠 | 걸림 | rejects a temperature below absolute zero in every unit | Missing expected exception (ConversionError): convert(-273.15000000000003, 'C', 'C') must throw |
| 1.2-UNIT-005 | 섭씨로 바꾼 뒤에 절대 영도를 판정 | 걸림 | rejects a temperature below absolute zero in every unit | Missing expected exception (ConversionError): convert(-5e-324, 'K', 'C') must throw |
| 1.2-UNIT-005, 1.2-UNIT-008 | 같은 단위 사이에서는 검사를 모두 건너뜀 | 걸림 | rejects a temperature below absolute zero in every unit; rejects a unit that is not listed, in either position; rejects a call with missing arguments | Missing expected exception (ConversionError): convert(-1, 'K', 'K') must throw |
| 1.2-UNIT-006 | 전역 `isFinite`로 판정 | 걸림 | rejects a value that is not a finite number | Missing expected exception (ConversionError): convert('5', 'm', 'cm') must throw |
| 1.2-UNIT-006 | `Number(value)`로 바꾼 뒤에 판정 | 걸림 | rejects a value that is not a finite number | Missing expected exception (ConversionError): convert('5', 'm', 'cm') must throw |
| 1.2-UNIT-006 | 같은 단위 사이에서는 값 검사를 건너뜀 | 걸림 | rejects a temperature below absolute zero in every unit; rejects a value that is not a finite number; rejects a unit that is not listed, in either position; rejects a call with missing arguments | Missing expected exception (ConversionError): convert(-1, 'K', 'K') must throw |
| 1.2-UNIT-007 | 종류를 구별하지 않음 | 걸림 | rejects a conversion between units of different kinds | Missing expected exception (ConversionError): convert(1, 'mm', 'Pa') must throw |
| 1.2-UNIT-007 | 한 방향의 종류 검사가 빠짐 | 걸림 | rejects a conversion between units of different kinds | Missing expected exception (ConversionError): convert(1, 'Pa', 'mm') must throw |
| 1.2-UNIT-008 | 기호의 대소문자를 접음 | 걸림 | rejects a unit that is not listed, in either position | Missing expected exception (ConversionError): convert(1, 'M', 'm') must throw |
| 1.2-UNIT-008 | 기호의 공백을 다듬음 | 걸림 | rejects a unit that is not listed, in either position | Missing expected exception (ConversionError): convert(1, ' m', 'm') must throw |
| 1.2-UNIT-008 | 기호를 보통 객체에서 찾음 | 걸림 | rejects a unit that is not listed, in either position | Missing expected exception (ConversionError): convert(1, 'constructor', 'constructor') must throw |
| 1.2-UNIT-008 | 배열 `["m"]`을 글자 `m`으로 읽음 | 걸림 | rejects a unit that is not listed, in either position | Missing expected exception (ConversionError): convert(1, [ 'm' ], 'm') must throw |
| 1.2-UNIT-009 | `ConversionError`가 `Error`의 다른 이름 | 걸림 | throws a ConversionError that is also an Error with a text message | The expression evaluated to a falsy value |
| 1.2-UNIT-009 | 단위 표를 더 내보냄 | 걸림 | exports exactly the conversion function, the list function and the error class | Expected values to be strictly deep-equal |
| 1.2-UNIT-009 | `default`를 더 내보냄 | 걸림 | exports exactly the conversion function, the list function and the error class | Expected values to be strictly deep-equal |
| 1.2-UNIT-009 | 일반 `Error`를 던짐 | 걸림 | rejects a unit that is not listed, in either position; rejects a call with missing arguments; keeps its lists unchanged when a caller changes a returned list; throws a ConversionError that is also an Error with a text message; keeps no state between calls, also after an error | convert(1, 'M', 'm') must throw |
| 1.2-UNIT-009 | 오류 뒤에 모듈 상태가 남음 | 걸림 | keeps no state between calls, also after an error | convert(1, "m", "cm"): expected 100, got 101 |
| 1.2-UNIT-010 | 목록을 정렬해 돌려줌 | 걸림 | lists the units of each kind in their listed order; keeps its lists unchanged when a caller changes a returned list | Expected values to be strictly deep-equal |
| 1.2-UNIT-010 | 목록에서 기호 하나가 빠짐 | 걸림 | lists the units of each kind in their listed order; keeps its lists unchanged when a caller changes a returned list | Expected values to be strictly deep-equal |
| 1.2-UNIT-010 | 배열이 아닌 값을 돌려줌 | 걸림 | lists the units of each kind in their listed order; keeps its lists unchanged when a caller changes a returned list | Expected values to be strictly deep-equal |
| 1.2-UNIT-011 | 종류의 대소문자를 접음 | 걸림 | rejects a kind that is not listed | Missing expected exception (ConversionError): units('Length') must throw |
| 1.2-UNIT-011 | 배열 `["length"]`을 글자 `length`로 읽음 | 걸림 | rejects a kind that is not listed | Missing expected exception (ConversionError): units([ 'length' ]) must throw |
| 1.2-UNIT-011 | 모르는 종류에 빈 목록을 돌려줌 | 걸림 | rejects a kind that is not listed; throws a ConversionError that is also an Error with a text message | Missing expected exception (ConversionError): units('Length') must throw |
| 1.2-UNIT-011 | 모르는 종류에 `ConversionError`가 아닌 오류를 던짐 | 걸림 | rejects a kind that is not listed; throws a ConversionError that is also an Error with a text message | units('Length') must throw |
| 1.2-UNIT-012 | 모듈 안의 배열을 그대로 돌려줌 | 걸림 | keeps its lists unchanged when a caller changes a returned list | Expected values to be strictly deep-equal |
| 1.2-UNIT-012 | 모듈 안의 배열을 봉인해(`Object.seal`) 돌려줌 | 걸림 | keeps its lists unchanged when a caller changes a returned list | Expected values to be strictly deep-equal |
| 1.2-UNIT-012 | 모듈 안의 배열을 얼려(`Object.freeze`) 돌려줌: 올바른 구현 | 통과(올바른 구현이라 기대한 결과) | | |
| 1.2-UNIT-013 | 넘친 결과를 가장 큰 유한한 수로 자름 | 걸림 | answers a result that overflows with an infinity or a ConversionError | convert(1.7976931348623157e+308, "km", "mm") gave 1.7976931348623157e+308 |
| 1.2-UNIT-013 | 넘친 결과에 `NaN`을 돌려줌 | 걸림 | answers a result that overflows with an infinity or a ConversionError | convert(1.7976931348623157e+308, "km", "mm") gave NaN |
| 1.2-UNIT-013 | 넘친 결과에 `ConversionError`가 아닌 오류를 던짐 | 걸림 | answers a result that overflows with an infinity or a ConversionError | convert(1.7976931348623157e+308, "km", "mm") gave RangeError: out of range |
| 추가 점검(Cleaner 지적 4) | 같은 단위 사이에서도 기준 단위를 거쳐 계산 | 걸림 | returns a value unchanged when both units are the same | 1e+308 km |
| 같은 값 판정 | `ft`→`in`에 `NaN`을 돌려줌 | 걸림 | converts between all pairs of length units; converts negative and zero lengths and pressures | convert(1, "ft", "in"): expected 12, got NaN |
| 같은 값 판정 | `ft`→`in`에 `Infinity`를 돌려줌 | 걸림 | converts between all pairs of length units; converts negative and zero lengths and pressures | convert(1, "ft", "in"): expected 12, got Infinity |
| 같은 값 판정 | `ft`→`in`에 글자 `"12"`를 돌려줌 | 걸림 | converts between all pairs of length units; converts negative and zero lengths and pressures | convert(1, "ft", "in"): expected 12, got '12' |

변형은 입력 하나하나가 아니라 실패 기준마다 대표 하나씩이다. 표의 모든 입력이 시험 호출에 들어가는지는 다음 절이 따로 본다.

## 표의 입력이 시험에 닿는지의 점검

Testing은 표 1, 2, 3의 모든 행과 값이 시험에 닿을 것을 요구한다. 시험 파일과 구현 사본을 작업 폴더에 복사하고 구현의 공개 함수를 호출을 기록하는 래퍼로 바꾼 뒤 시험을 돌려, Story의 표에서 다시 옮겨 적은 기대 호출 목록과 기록을 대조했다. 기대 호출 목록은 L-1 ~ L-4, P-1 ~ P-4, T-1 ~ T-5의 모든 순서쌍(같은 단위 포함), Z-1의 셋과 Z-2의 열둘, E-1의 값 12개와 단위 쌍 5개의 곱 60개, E-2의 모든 종류 사이 순서쌍, E-3의 값 각각을 `from`과 `to`와 둘 다에 넣은 호출, E-4의 세 호출, E-5의 17개와 인자를 뺀 `units()`, U-1의 셋, 표 3의 셋이다.

최종 상태에서 서로 다른 기대 호출 643개 중 기록에 없는 것은 0이고, 시험 종료 상태는 0이다. 시험은 Z-2에서 기대 목록보다 많은 호출(여섯 값을 세 단위 모두로)과 그 밖의 호출을 더 한다. 이 점검은 호출이 시험 안에서 일어났음을 보이며, 호출 결과에 단언이 걸려 있음은 위 민감도 점검이 보인다.

## 선택한 해석과 구현 결정

수용된 문서가 하나로 정하지 않은 부분은 Story의 Testing이 후보를 모두 받는다. 구현이 고른 규칙은 다음과 같다.

- 검사 순서는 값, `from`, `to`, 종류, 최소값(절대 영도)이다. 문제가 여럿이어도 모두 `ConversionError`다.
- 값은 `Number.isFinite`로 판정해 number 형의 유한한 수만 받는다. 전역 `isFinite`와 달리 글자와 `null`, `5n`을 변환하지 않는다.
- 단위와 종류는 `Map`의 키로 정확히 같은 값만 찾는다. 대소문자와 공백을 접거나 다듬지 않고, `constructor`나 `__proto__` 같은 이름과 배열 `["m"]`은 찾지 못해 모르는 단위다.
- 절대 영도는 단위마다 상수(-273.15 C, -459.67 F, 0 K)로 두고 입력의 단위에서 `<`로 비교한다. -0 K와 정확히 0 K는 받고 바로 아래의 배정밀도 수는 거부한다. 환산해서 비교하지 않는 까닭은 환산 값이 경계에서 반올림 오차만큼 떨어질 수 있어서다.
- 온도 식은 D-2의 식 그대로이고 곱한 뒤 나눈다(`(F - 32) * 5 / 9`, `C * 9 / 5 + 32`). `(F - 32) * (5 / 9)` 순서는 -459.67 F를 0 K 아래로 만든다.
- 같은 단위 사이의 변환은 모든 검사를 마친 뒤 값을 그대로 돌려준다. Cleaner 검토자의 지적 4로 더한 동작이며, 기준 단위를 거치면 `convert(1e308, "km", "km")`가 `Infinity`가 되기 때문이다.
- 결과가 배정밀도의 범위를 넘으면 다른 단위 사이의 변환은 `Infinity`나 `-Infinity`를 돌려준다. 표 3이 받는 두 결과 가운데 이 쪽을 골랐다. N-1은 열려 있다.
- `units`는 호출마다 새 배열을 돌려준다. 단위 표를 바꿀 수 없다.
- 오류 메시지는 입력 값을 되풀이하지 않는 고정된 영어 문구이고 계약이 아니다. `ConversionError`는 `Error`를 잇는 빈 클래스이며 `name`이나 다른 속성을 더하지 않았다(N-5).
- 파일 머리 주석은 한 줄 요약만 있다. 프로젝트에 라이선스 파일, 저작권 표기, `package.json`의 `license` 키가 없어 저작권과 SPDX 값을 만들지 않았다. 빠진 입력은 저작권 보유자와 연도, 라이선스 식별자이고 소유자는 프로젝트 소유자다. 기존 `future-work.md`의 "새 파일의 저작권과 SPDX 값" 항목이 이미 이 입력을 든다.

## Cleaner 결과

- 검토자: Cleaner 검토자 하위 세션 하나(이름 없음). Dev 하위 세션이 Agent 도구로 직접 시작했다. 요청한 모델은 별칭 `opus`(설정 `workflow.run.sessions.cleaner`의 `claude-opus-5-5`)이고 effort는 `high`다. 검토자가 자기 세션 정보에서 읽어 보고한 모델 ID는 `claude-opus-5-5`이고 effort는 숫자 30으로만 보인다고 했다(검토자의 자기 보고). 시각은 14:43 ~ 14:49 +0900이다.
- 위임한 입력: 프로젝트 루트, 프로젝트 지침과 프로젝트 임시 영역의 절대 경로, Story 경로, SubTask 1.1, 접근 `TDD`와 시나리오 ID, 비교 기준(브랜치 `story/1.2`의 HEAD `8fbdd51`, 기준에 두 파일이 없음), 변경 경로 `src/units.js`와 `test/units.test.js`(둘 다 새 파일), 시험 명령과 그 결과(전체 52개 통과), CRAP 측정 안 함, 검토자의 작업 폴더 하나, 저장해 둔 점검 출력. Dev의 판단과 결론은 넘기지 않았다. 위임 시점의 두 파일 상태는 `git hash-object` 값 `b4ea398d7b0`(구현)과 `f01b944a1d3`(시험)이다.
- 검토자가 읽은 규칙 본문: `golden-rules`, `coding-principles`, `comments`, `crap`, `testing-tdd`, `javascript-language`, `javascript-crap`과 Hub, 두 색인, `data/development-quality.md`, `tasks/code-comment-style.md`, `checklists/comment-hygiene-checklist.md`, `data/local-git-workflow.md`의 Read-only work. `documentation`은 검토자의 규칙 종류가 아니어서 읽지 않았다.
- 검토자가 쓴 파일: 실험 스크립트와 제안 파일 2개와 변형 작업 사본 16개, 모두 검토자가 만든 새 파일이며 Dev가 지정한 작업 폴더 안에만 있다. 폴더 밖에 쓴 파일은 없다. Dev는 폴더의 파일 수(18개)를 보고와 대조했다.
- 위임 뒤 확인: 반환 뒤 HEAD, 두 파일의 `git hash-object`, `git ls-files --stage`의 해시, `git status --porcelain=v1`의 해시가 위임 때의 값과 모두 같았다. 작업 트리와 인덱스는 변하지 않았다.
- 검토자의 점검: `node --test` 52개 통과, 가져오기 검색 종료 상태 1, 추적 번호 검색 일치 없음, 기존 네 파일의 diff 없음, 표 1, 2, 3의 값을 시험과 하나씩 대조해 빠진 항목 없음. 공유 목록 변형(얼린, 봉인한, 확장을 막은 배열)과 자기가 제안한 꼴을 작업 폴더에서 돌렸다.

### 지적과 처분

지적 8건이 모두 심각도 낮음이었다. 같은 검토자의 재검토는 하지 않았다. 높음으로 분류된 지적이 없다.

| 지적 | 위치와 기준 | 처분 | 근거와 조치 |
| --- | --- | --- | --- |
| F1 낮음 | `UNITS`의 온도 항목, 반복된 숫자 273.15(세 곳), 32, 5, 9 | 받아들임 | 이름 있는 상수 `KELVIN_AT_ZERO_CELSIUS`, `FAHRENHEIT_AT_ZERO_CELSIUS`, `FAHRENHEIT_SPAN`, `CELSIUS_SPAN`으로 한 번씩 선언했다. 곱한 뒤 나누는 순서는 그대로 두고 그 까닭을 상수 곁에 적었다. 시험 17개 통과, 변형 `(5 / 9)` 순서는 그대로 걸린다 |
| F2 낮음(확신 중간) | `scaled(...)`의 이름 없는 계수와 `-459.67` | 받아들임 | 리터럴만 담은 `METERS_PER_UNIT`, `PASCALS_PER_UNIT`, `ABSOLUTE_ZERO_*` 상수로 바꿨다. 검토자가 만든 제안 파일의 꼴을 쓰되 이름과 주석은 Dev가 정했다 |
| F3 낮음 | 시험 "keeps its lists unchanged when a caller changes a returned list", 한 `try`에 두 변경 | 받아들임 | 재현: 검토자가 만든 봉인한 공유 목록 변형을 이전 시험이 통과시켰다(Dev가 그 변형과 이전 시험으로 다시 돌려 17/17 통과를 확인, 소급 점검이다). 두 변경을 각각의 `try`로 나눈 뒤 같은 변형이 걸린다(위 표) |
| F4 낮음(동작은 높음, 수정 필요는 중간) | `convert`, 기준 단위를 거치며 유한한 답이 넘치거나 줄어드는 입력 | 일부 받아들임 | (가) 같은 단위 사이는 검사 뒤 값을 그대로 돌려준다. 재현 시험을 먼저 더해 RED를 본 뒤(`1e+308 km` 기대 `1e+308`, 실제 `Infinity`) 한 줄로 고쳐 GREEN. (나) 다른 단위 사이의 넘침(`convert(1e303, "MPa", "kPa")`, `convert(1e308, "F", "C")`가 `Infinity`)은 결과가 유한하지 않을 때의 동작을 정하지 않은 N-1(PO1-N1)의 영역이어서 고치지 않았다. 증거와 함께 Dev Agent Record의 future 기록 DEV-1로 남겼다. 0에 가까운 결과의 정밀도는 N-4(PO1-N4)가 이미 든다 |
| F5 낮음(확신 중간) | `temperature`의 `toReference`가 던짐 | 받아들임 | 단위마다 `minimum`을 두고(길이와 압력은 `Number.NEGATIVE_INFINITY`) `convert`의 보호 절에서 비교한다. `toReference`는 순수 변환만 남는다. F4의 같은 단위 반환이 이 검사 뒤에 와야 해서 함께 필요했다 |
| F6 낮음(확신 중간) | `convert`, `units`의 공개 계약, `UNITS`의 순서 불변식 | 받아들임 | 두 함수에 JSDoc을, `UNITS`와 크기 표 주석에 순서 불변식 한 문장을 더했다. 넘침은 현재 동작으로만 적었다 |
| F7 낮음(확신 중간) | 시험의 반복된 값 `-1`, `-273.16`, `-459.68`, `100` | 받아들임 | 절대 영도 아래 값을 단위별 표 하나로 줄이고 세 단위 모두로 변환한다(기대 호출 12개를 덮고 6개를 더함). 상태 시험의 `100` 비교는 첫 호출의 결과와 비교하는 꼴로 바꿨다 |
| F8 낮음 | 시험의 `sourceKind`, `targetKind`가 단위 목록을 담음 | 받아들임 | `sourceUnits`, `targetUnits`로 바꿨다 |

Dev가 함께 한 정리: 시험 파일의 도우미 `assertRejected`를 도우미 자리로 옮기고 시험을 변환, 거부, 단위 목록, 모듈 계약 순으로 다시 늘어놓았다. 시험 이름과 단언은 바꾸지 않았다. 시험 파일의 문자 `°`를 이스케이프(`°`)로 바꿔 파일을 ASCII로 유지했다.

### 정리 뒤 재점검

| 점검 | 방법과 결과 |
| --- | --- |
| 정리 단계의 GREEN | 소스 구조 정리 뒤와 시험 정리 뒤 모두 시험 17개 통과, 같은 단위 반환의 RED와 GREEN 뒤 시험 18개 통과 |
| 전체 시험 | 프로젝트 루트의 `node --test`: 53개 통과(기존 35개와 새 18개), 실패 0 |
| 민감도 변형 | 위 표: 최종 소스에서 49개 중 48개가 걸리고 올바른 구현 1개는 통과 |
| 표 입력 도달 | 기대 호출 643개 중 기록에 없는 것 0 |
| 1.2-INSP-001 | 아래 최종 점검 |
| 주석 위생 | 아래 주석 위생 |

## 최종 점검

정리 뒤의 최종 상태(구현 `git hash-object` 값 `92fb71af25f`, 시험 `a74655cc732`)에서 실행했다. 기준은 `main`의 `40e1a6b`다.

| 시나리오 | 방법 | 결과 |
| --- | --- | --- |
| 1.2-UNIT-001 ~ 1.2-UNIT-013 | 프로젝트 루트의 `node --test`에 든 `test/units.test.js`의 시험 18개(조각별 대응은 위 표, 하나는 Cleaner 지적 4로 더한 시험) | 통과 |
| 1.2-UNIT-014 | `git diff --quiet 40e1a6b -- src/engine.js src/number-format.js test/engine.test.js test/number-format.test.js`(종료 상태 0, 차이 없음)와 `node --test`에서 기존 `test/engine.test.js`와 `test/number-format.test.js`의 35개 | 통과. 전체 53개 통과, 실패 0 |
| 1.2-INSP-001 | Story의 "가져오기 검색" 명령을 `src/units.js`에 실행 | 종료 상태 1(일치하는 줄 없음)로 통과. 제품 코드에 처음 돌린 결과이며 Cleaner 전과 후에 같다 |
| 1.2-INSP-002 | `src/units.js`를 끝까지 읽음(agent-review) | 통과. 가져오기가 없다. 입출력과 전역 접근이 없다(`console`, `process`, `globalThis`, `require`, 파일과 네트워크 호출이 없다). 모듈 변수는 `METERS_PER_UNIT`, `PASCALS_PER_UNIT`, 온도 상수, `UNITS`뿐이고 모두 선언 뒤에 바뀌지 않는다. 함수는 이들을 읽기만 하고 `units`는 펼친 새 배열을 돌려준다. 단위는 AC 1의 14개(길이 6, 압력 5, 온도 3)뿐이고 별칭과 AC 1에 없는 단위가 없다 |

`node ci/screen-rule.check.mjs`는 `src/screen.js`가 없어 판정하지 않고 종료 상태 0이다. 이 Story의 필수 점검은 아니다.

### 주석 위생(`checklists/comment-hygiene-checklist.md`)

- 섹션 2(비교 기준): 기준 `40e1a6b`에 두 대상 파일이 없어 기존 후보가 없다. 둘 다 새 파일이다.
- 섹션 3과 4(최종 상태의 두 파일): 추적 번호(§1.1), QA ID 접두(§1.2), 이 Story의 지적과 시나리오와 표 행 번호(`PO1-`, `PO2-`, `N-`, `D-`, `1.2-UNIT-`, `1.2-INSP-`, `DEV-`, `L-`, `P-`, `T-`, `Z-`, `E-`, `U-`), 편집 표시와 날짜(§1.7), `IN-FLIGHT`(§1.4)를 검색해 모두 일치 없음(종료 상태 1). 비ASCII와 제어 문자도 없다. 새 추적 번호 누출 0, IN-FLIGHT 0(새 표시를 만들지 않았고 기존 항목이 없다), 화이트리스트 해당 없음(`commentHygiene.preservedComments`가 비어 있다).
- 문맥 검토: 두 파일을 끝까지 읽었다. 주석은 영어이고 이유, 계약, 불변식만 설명한다. 시험 이름과 주석은 실제 단언과 맞는다. 예를 들어 넘침 시험은 두 결과를 모두 받는다고 말하고, 목록 변경 시험은 얼린 배열이 변경을 거부해도 실패가 아니라고 말한다. 같은 값 판정의 허용 오차는 도우미 이름과 주석에 그대로 있다.

### CRAP

측정하지 않았다. `quality.crap.commands`가 비어 있어 `src/units.js`를 측정할 명령이 없다. 이것은 통과도 차단도 아니다. 이 측정 제안은 `docs/planning/future-work.md`의 "[Tech-Debt] CRAP 측정 경로" 항목이 이미 들고 있어 새로 하지 않는다.

### 한계

- 함수 하나라도 CRAP 한도를 넘는지는 모른다. `convert`의 결정은 다섯 개로 적지만 계산하지 않았다.
- 결과가 배정밀도의 범위를 넘는 경우의 동작과 0에 가까운 결과의 정밀도는 정해지지 않은 부분이며 N-1, N-4로 열려 있다. 같은 단위가 아닌 변환의 이 구간은 보증하지 않는다(DEV-1).
- 민감도 점검은 실패 기준마다 대표 변형 하나씩이고 변이 도구가 없다. 입력 하나하나에 맞춘 변형은 만들지 않았다. 표 입력이 시험에 닿는지는 호출 기록으로, 단언이 걸려 있는지는 대표 변형으로 보았다.
- 소급 점검: 봉인한 공유 목록 변형이 이전 시험을 통과한다는 확인은 정리 뒤에 한 것이며, 그때의 실행 순서를 증명하지 않는다.
- 저작권과 SPDX 값은 프로젝트에 값이 없어 비어 있다. 소유자는 프로젝트 소유자다.
- 오류 메시지의 낱말과 언어, `ConversionError`의 `name`은 수용된 문서에 없어 시험하지 않았다(N-5).
- 선택한 해석(검사 순서, 넘침의 `Infinity`, 같은 단위의 값 그대로 반환)은 수용된 결정이 아니다.
