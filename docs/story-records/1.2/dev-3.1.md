# dev-3.1 — 참값이 범위 안인 변환의 Infinity 수정

- Story: [1.2](../../stories/1.2.story.md)
- Entry: Dev QA 수정 단위 3.1, QA 라운드 1의 REL-001(Recommended, 경로 rework)과 DEV-1(앞선 future 기록, 같은 입력)
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.2 1.3 remote to Done` run의 역할 작업. effort는 시스템이 숫자 30으로만 알려 주어 설정의 이름(`xhigh`)과의 대응을 확인하지 못했다
- 시각: 2026-11-06, 시작 15:35 +0900, 시험과 구현 15:36 ~ 15:44, Cleaner 위임 15:45, Cleaner 반환 15:51, 정리와 최종 점검 완료 15:52
- 입력 기준: 브랜치 `story/1.2`, 시작 HEAD `19daa1d`(QA 1회차 기록 커밋)이고 비교 기준이다. 이 단위는 `src/units.js`와 `test/units.test.js`를 바꾼다. 두 파일은 `19daa1d`에서 QA 라운드 1이 검토한 구현 개정 `53267c9`와 같다(`git hash-object` 값 `92fb71af25f`, `a74655cc732`).
- 환경: Node.js v24.22.1, Git 2.51.0. 점검 명령은 프로젝트 루트의 `node --test`(전체)와 `node --test test/units.test.js`(조각 실행)다. 외부 패키지와 테스트 대역은 쓰지 않았다.

## 접근과 시나리오

접근은 `TDD`다(`testing-tdd`의 CC-TDD-005: 결함은 재현하는 회귀 시험의 실패를 먼저 보고 고친다). 이 입력(참값이 범위 안이고 기준 단위를 거치면 넘치는 값)을 이름 붙인 시나리오가 없어, 추가한 시험 둘은 Story의 값 변환 시나리오 1.2-UNIT-002(압력)와 1.2-UNIT-004(온도)에 속하는 이 지적 고유의 추가 점검이다. Story의 Testing 표와 시나리오 ID는 바꾸지 않았다.

## 구현 전 기준(DOC-002의 이 라운드 재확인)

- Dev Notes의 "Draft 때 Node.js v24.22.1에서 계산한 배정밀도 값" 여덟 개와 "바로 아래의 배정밀도 수" 둘을 온도 식을 바꾸기 전에 다시 실행했다. 모두 Story의 값과 정확히 같았다(`Object.is`). Node.js 버전은 Draft 때와 같은 v24.22.1이다. 앞선 SubTask 1.1에는 구현 전 재확인의 기록이 없다(DOC-002, 단위 3.3의 기록). 이 재실행은 그 빠진 증거를 채우지 않으며, 이 단위가 바꾸는 온도 식에 대한 이 라운드의 구현 전 확인이다.
- 기준 `node --test`: 53개 통과, 실패 0.

## 진단

- 재현(`data/defect-diagnosis.md` 1단계): 수정 전 `src/units.js`에서 `convert(1e303, "MPa", "kPa")`, `convert(1e308, "F", "C")`, `convert(1e304, "bar", "kPa")`, `convert(1e305, "psi", "kPa")`, `convert(5e307, "C", "F")`, `convert(5e307, "K", "F")`, `convert(1e308, "F", "K")`가 모두 `Infinity`다. 참값은 1e306, 약 5.556e307, 1e306, 약 6.895e305, 9e307, 9e307, 약 5.556e307로 모두 범위 안이다.
- 원인(3단계): 변환이 `target.fromReference(source.toReference(value))`로 기준 단위를 거치고, 첫 단계의 값이 범위를 넘으면 `Infinity`가 남는다. 예: `1e303 MPa`는 `1e303 * 1e6`이 `Infinity`, `1e308 F`는 `(1e308 - 32) * 5`가 `Infinity`다. 이 설명이 맞다면 영향받는 쌍은 기준 단위(파스칼, 섭씨)를 거치며 중간 값이 커지는 쌍이다. 입력의 정확한 이진 값과 결정 D-2의 정의를 정확한 유리수로 계산하는 오라클(제품 코드와 코드를 나누지 않음, 224000 호출)로 수정 전 모듈을 재면 참값이 범위 안인데 `Infinity`인 결과가 12791건이고 모두 kPa, MPa, bar, psi 사이의 12쌍과 C→F, K→F, F→C, F→K다. 설명과 맞고 QA의 목록과 같다.
- 수정 방향의 선택: 배율 단위는 두 크기의 비를 먼저 구해 곱한다. 온도는 화씨 도수와 섭씨 도수의 비 9 / 5를 곱하거나 나눈다. 단위의 정의(D-2)는 그대로다. 비 5 / 9를 곱하는 순서는 -459.67 F를 0 K 아래로 만들어(Story Dev Notes의 값) 쓰지 않는다. 9 / 5(= 1.8)로 나누는 식은 Dev Notes가 이미 0 K를 돌려주는 값을 든다. 후보 순서 네 가지(곱한 뒤 나눔, 1.8로 곱하고 나눔, 나눈 뒤 곱함, 5 / 9와 9 / 5를 곱함)를 절대 영도와 그 위 네 개의 수를 세 단위로 변환해 비교했다. 1.8로 곱하고 나누는 순서만 수정 전과 같이 결과가 목표 단위의 하한 아래로 내려가지 않으면서 범위 안의 큰 값에 유한한 결과를 준다. 나눈 뒤 곱하는 순서와 5 / 9를 곱하는 순서는 -459.67 F를 0 K 바로 아래로 만든다.

## 조각별 실행 기록

명령은 모두 `node --test test/units.test.js`다. 처음에는 두 행을 한 시험에 넣었으나 첫 행의 실패에서 시험이 멈춰 온도 행의 실패를 볼 수 없어, 시험 둘로 나누고 RED를 다시 보았다. 그 첫 RED는 압력 행에서 `convert(1e+306, "kPa", "MPa"): expected 1e+303, got Infinity`로 실패했다.

| 조각 | 시험 | 결과(처음 실행) | 구현(최소 변경) | GREEN |
| --- | --- | --- | --- | --- |
| 1 | "converts a pressure that is out of range in pascals" | RED: `convert(1e+306, "kPa", "MPa"): expected 1e+303, got Infinity`. 기존 18개 통과 | 배율 단위가 두 크기의 비를 구해 곱함 | 20/20 |
| 2 | "converts a large temperature in every unit" | RED: `convert(5.555555555555556e+307, "C", "F"): expected 1e+308, got Infinity` | 화씨와 섭씨의 환산이 비 9 / 5를 곱하거나 나눔 | 20/20 |

두 조각의 RED를 모두 본 뒤 두 수정을 한 번에 넣었고 조각별 GREEN은 따로 보지 않았다. 각 시험이 자기 수정에만 반응함은 아래 변형 점검이 사후에 보인다(소급 점검이며 관찰한 실행 순서가 아니다). 시험에 쓴 두 행의 값은 정확한 유리수 산술로 모든 쌍을 대조해 가장 큰 상대 차이가 8.1e-17이다. 기대 값은 구현이 아니라 결정 D-2의 정의에서 나왔다.

## 구현

- `src/units.js`: 단위 항목이 `toReference`, `fromReference` 대신 `convertTo(value, target)`를 갖는다. 배율 단위의 `convertTo`는 `value * (size / target.size)`이고, 온도 단위의 `convertTo`는 섭씨를 거친다. 화씨 상수는 `FAHRENHEIT_SPAN`, `CELSIUS_SPAN` 대신 `FAHRENHEIT_PER_CELSIUS = 9 / 5` 하나가 되었고 환산은 `(value - 32) / FAHRENHEIT_PER_CELSIUS`, `celsius * FAHRENHEIT_PER_CELSIUS + 32`다. 온도 상수의 주석에 곱셈 순서의 까닭을 적었고, 같은 단위 반환 앞에 까닭을 한 줄 주석으로 적었다(배율 단위는 크기의 비가 정확히 1이어서 이 반환이 필요 없어졌으나 켈빈과 화씨의 작은 값은 섭씨를 거치며 0이 된다).
- `test/units.test.js`: 시험 둘을 더했고, 도우미 `assertAllPairs`의 주석을 새 행(파스칼 없음)에 맞췄다.

## Cleaner 결과

- 검토자: Cleaner 검토자 하위 세션 하나(이름 없음). Dev 하위 세션이 Agent 도구로 직접 시작했다. 요청한 모델은 별칭 `opus`(설정 `workflow.run.sessions.cleaner`의 `claude-opus-5-5`)이고 effort는 `high`다. 검토자가 자기 세션 정보에서 읽어 보고한 모델 ID는 `claude-opus-5-5`이고 effort는 숫자 30으로만 보이며 설정의 이름과의 대응은 확인할 수 없다고 했다(검토자의 자기 보고). 시각은 15:45 ~ 15:51 +0900이다.
- 위임한 입력: 프로젝트 루트, 프로젝트 지침과 프로젝트 임시 영역의 절대 경로, Story 경로, 단위 3.1, 접근 `TDD`와 시나리오 ID, 비교 기준(브랜치 `story/1.2`의 HEAD `19daa1d`와 커밋하지 않은 변경), 변경 경로 `src/units.js`와 `test/units.test.js`(새 파일 없음), 시험 명령과 그 결과(전체 55개 통과), CRAP 측정 안 함, 검토자의 작업 폴더 하나, 저장해 둔 점검 출력의 이름. Dev의 판단과 결론은 넘기지 않았다. 위임 시점의 두 파일 상태는 `git hash-object` 값 `d429603f074`(구현)와 `38ee970057d`(시험)다.
- 검토자가 읽은 규칙 본문: `golden-rules`, `testing-tdd`, `javascript-language`, `javascript-crap`, `coding-principles`, `comments`, `crap`과 Hub, 두 색인, `data/development-quality.md`, `tasks/code-comment-style.md`, `checklists/comment-hygiene-checklist.md`. `documentation`은 검토자의 규칙 종류가 아니어서 읽지 않았다.
- 검토자가 쓴 파일: 실험 스크립트 셋, HEAD의 복사본 둘, 변형 열 개의 작업 사본(각각 구현, 시험, `package.json`)으로 모두 35개이고 모두 검토자가 만든 새 파일이며 Dev가 지정한 작업 폴더 안에만 있다. 폴더 밖에 쓴 파일은 없다. Dev는 폴더의 파일 수를 보고와 대조했다.
- 위임 뒤 확인: 반환 뒤 HEAD, 두 파일의 `git hash-object`, `git ls-files --stage`의 해시, `git status --porcelain=v1`의 해시가 위임 때의 값과 모두 같았다. 작업 트리와 인덱스는 변하지 않았다.
- 검토자의 점검: `node --test` 55개 통과, 절대 영도와 그 위 4000개 수를 세 단위로 변환해 목표 단위의 하한 아래 결과 0건, 새 시험의 민감도(기준 단위를 거치는 변형과 먼저 곱하는 변형이 걸림), 33만 6천 호출의 정확도를 HEAD와 비교(현재 코드만 1e-12를 벗어난 3건, HEAD만 벗어난 30건), 주석 위생 후보 0건.

### 지적과 처분

지적 5건이 모두 심각도 낮음이었다. 높음이 없어 같은 검토자의 재검토는 하지 않았다.

| 지적 | 위치와 기준 | 처분 | 근거와 조치 |
| --- | --- | --- | --- |
| F1 낮음(확신 높음) | `src/units.js`, `temperature`가 돌려주는 객체의 `toCelsius` 속성. 죽은 코드, 최소 범위 | 받아들임 | `convertTo`가 닫힌 매개변수를 부르고 속성을 어디서도 읽지 않음을 코드에서 확인했다. 속성 줄을 지웠고 시험 20개가 그대로 통과한다 |
| F2 낮음(확신 높음) | `test/units.test.js`, `assertAllPairs` 위 주석. 시험의 주석은 실제 단언과 맞아야 한다(CC-CMT-010 아래 문장) | 받아들임 | 주석이 "every unit of a kind"라고 하는데 새 압력 행에는 파스칼이 없다. "some units of one kind"로 고쳤다 |
| F3 낮음(확신 높음) | `src/units.js`, `convert`의 JSDoc "only a true result beyond the range ... is an infinity" | 받아들임 | 직접 확인했다. 범위 끝 앞뒤 64 ulp를 쓸어 정확한 결과와 비교하면 참값이 범위 안인데 `Infinity`인 입력이 1건(`convert(1.2394657852469996e306, "MPa", "psi")`)이고 참값이 `Number.MAX_VALUE`로 반올림될 값인데 `Infinity`인 입력이 2건이다(비 `size / target.size`의 반올림 오차). 수정 전에는 같은 구간에서 774건이었다. 코드는 두고 JSDoc을 "범위 끝의 반올림 오차 안에서는 무한대나 가장 큰 double일 수 있다"로 고쳤다 |
| F4 낮음(확신 높음) | `docs/story-records/1.2/dev-qa-r1.md`의 "N-1과의 경계" 문장. 기록의 주장은 사실이어야 한다(CL-GLD-OPS-005) | 받아들임 | 같은 쓸기로 직접 확인했다. 참값이 반올림 한계(`2^1024 - 2^970`) 이상인 입력 가운데 2건(`convert(5.479368675060339e307, "m", "ft")`와 `convert(7.077532027016992e306, "in", "mm")`, 두 호출 모두 직접 실행해 확인)이 수정 전의 `Infinity`에서 `1.7976931348623157e308`로 바뀌었다. 쓸기 1733건 가운데 1731건은 그대로 `Infinity`다. 표 3의 세 입력은 그대로 `Infinity`, `Infinity`, `-Infinity`다. dev-qa-r1의 해당 문장은 커밋 전이어서 같은 범위로 고쳤고 이 기록도 같은 범위를 쓴다: 수정은 참값이 범위를 한참 넘는 입력(표 3의 입력과 표본 29555건)의 결과를 바꾸지 않았고, 범위 끝의 1 ulp 안(쓸기 2건)에서는 결과가 달라질 수 있다. N-1과 PO1-N1은 그대로 열려 있다 |
| F5 낮음(확신 높음) | `src/units.js`의 같은 단위 반환과 시험 "returns a value unchanged when both units are the same"의 주석 | 단위 3.2로 넘김 | 직접 확인했다. 같은 단위 반환을 지운 사본에서도 시험 20개가 모두 통과한다(큰 값의 행이 더는 이 반환에 기대지 않는다). 이 시험과 주석은 지적 TEST-001의 대상이고 단위 3.2가 같은 단위 반환을 지운 변형에서 실패하는 행으로 다시 쓴다. 단위 3.2가 끝나기 전에는 이 지적이 열려 있다 |

### 정리 뒤 재점검

Cleaner의 받아들인 정리(F1, F2, F3)가 닿는 점검을 다시 돌렸다. 구현 `git hash-object` 값은 `8b74cf2eb08`, 시험은 `96280d8778a`이다.

| 점검 | 방법과 결과 |
| --- | --- |
| 전체 시험 | 프로젝트 루트의 `node --test`: 55개 통과, 실패 0 |
| 독립 오라클 | 정리 전과 같은 결과: 참값이 범위 안인데 유한하지 않은 결과 0건(수정 전 12791건), 허용 오차 안 192519건, 참값이 범위를 넘고 부호가 맞는 `Infinity` 29555건(수정 전과 같음) |
| 변형 점검 | 아래 표: 7개 모두 걸림 |
| 절대 영도 경계 | 45회 변환, 목표 단위의 하한 아래 결과 0건 |
| 표 입력 도달 | 기대 호출 643개, 빠진 호출 0 |
| 1.2-INSP-001 | 종료 상태 1(일치 없음) |
| 1.2-UNIT-014 | 기존 네 파일의 `git diff` 없음(종료 상태 0) |
| 주석 위생 | 후보 검색 여섯 가지 모두 일치 없음 |
| 줄 너비 | `src/units.js`에 80칸을 넘는 줄 없음. `test/units.test.js`의 80칸을 넘는 줄 셋은 앞선 시험 이름 줄이다(CC-JS-002의 80칸은 권장값) |

## 변형 점검(소급)

수정한 소스에 틀린 변형을 한 번에 하나씩 걸어 같은 시험 파일을 돌렸다. 변형 사본은 작업 폴더에 두고 제품 파일은 바꾸지 않았다. 7개 모두 시험에 걸렸다. 이 점검은 GREEN 뒤에 한 사후 점검이며 RED가 아니다.

| 변형 | 걸린 시험 | 첫 증상 |
| --- | --- | --- |
| 배율 단위가 크기를 곱한 뒤 목표 크기로 나눔(기준 단위를 거침) | converts a pressure that is out of range in pascals | `convert(1e+306, "kPa", "MPa")`: 기대 1e+303, 실제 Infinity |
| 섭씨에서 화씨로 9를 먼저 곱함 | converts a large temperature in every unit | `convert(5.555555555555556e+307, "C", "F")`: 기대 1e+308, 실제 Infinity |
| 화씨에서 섭씨로 5를 먼저 곱함 | converts a large temperature in every unit | `convert(1e+308, "F", "C")`: 기대 5.555555555555556e+307, 실제 Infinity |
| 화씨에서 섭씨로 5 / 9를 곱함 | accepts absolute zero written in each temperature unit | `convert(-459.67, "F", "K")`: 기대 0, 실제 -5.684341886080802e-14 |
| 배율 단위가 비를 뒤집어 곱함 | 길이, 압력, 음수와 0 시험 등 6개 | `convert(304.8, "mm", "cm")`: 기대 30.48, 실제 3048 |
| `psi`를 6894.757293 Pa로 둠 | 압력 시험 등 3개 | `convert(6894.757293168, "Pa", "psi")`: 기대 1, 실제 1.0000000000243663 |
| 배율 단위가 1e300을 넘는 값에 `Infinity`를 돌려줌 | converts a pressure that is out of range in pascals; answers a result that overflows with an infinity or a ConversionError | `convert(1e+306, "kPa", "MPa")`: 기대 1e+303, 실제 Infinity |

## 최종 점검

| 시나리오 또는 점검 | 방법 | 결과 |
| --- | --- | --- |
| 1.2-UNIT-001 ~ 1.2-UNIT-013와 새 시험 | 프로젝트 루트의 `node --test`에 든 `test/units.test.js`의 시험 20개 | 통과 |
| 1.2-UNIT-014 | 기존 네 파일의 `git diff --quiet 40e1a6b -- ...`(종료 상태 0)와 기존 35개 시험 | 통과. 전체 55개 통과, 실패 0 |
| 1.2-INSP-001 | Story의 "가져오기 검색" 명령 | 종료 상태 1로 통과 |
| 1.2-INSP-002 | `src/units.js`를 끝까지 다시 읽음 | 통과. 가져오기, 입출력, 전역 접근이 없고 모듈 변수는 선언 뒤 바뀌지 않으며 단위는 AC 1의 14개뿐이다. 호출 사이에 바뀌는 상태가 없다 |
| 참값이 범위를 넘는 입력 | 표 3의 세 입력과 오라클의 표본 | 표 3은 그대로 `Infinity`, `Infinity`, `-Infinity`이고 1.2-UNIT-013이 통과한다. 표본 29555건은 수정 전과 같다 |

### 점검한 한계

- 참값이 범위 안인 입력의 개선은 표본과 범위 끝의 쓸기에서 보였다. 범위 끝 1 ulp 안에서는 결과가 무한대와 가장 큰 double 사이에서 바뀔 수 있고 이 경계는 보증하지 않는다(F3, F4).
- 0에 가까운 결과의 정밀도(N-4, PO1-N4)는 그대로다. 오라클의 허용 오차 밖 결과는 모두 C→K와 F→K에서 참 결과가 0.07 K 이하인 입력이며, 수정 전 144건이 수정 뒤 122건이 되었다. 수정 전에만 맞던 입력 3개(F→K, 참 결과 약 0.03 K)가 있다.
- 조각별 GREEN을 따로 보지 않았고 변형 점검은 소급이다. 변이 도구가 없어 틀린 변형은 손으로 고른 7개다.
- CRAP은 측정하지 않았다(`quality.crap.commands`가 비어 있고, 기존 future-work 항목이 측정 제안을 들고 있다).
- 참값이 범위를 넘는 입력의 결과(N-1, PO1-N1)는 정하지 않았다.
