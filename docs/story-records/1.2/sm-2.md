# sm-2 — 단위 변환

- Story: [1.2](../../stories/1.2.story.md)
- Entry: SM Draft Checklist 2회, PO 검증 1회차 피드백의 explicit revision
- 작성자와 실제 검토자: SM 하위 세션 Bob, 모델 `claude-opus-5-5`, `*run-story 1.2 1.3 remote to Done` run의 역할 작업
- 시각: 2026-11-06, 수정 전 입력 확인 14:14 +0900, 저장한 수정의 점검 14:16 +0900 이후
- 입력 기준: `main` 40e1a6b. `docs/prd.md`, `docs/architecture.md`, `docs/planning/`, `src/`, `test/`, `package.json`, `README.md`는 그 커밋과 차이가 없다(`git diff --stat HEAD` 출력 없음). 수정 전 Story는 `git hash-object --no-filters` 값 `d097432ea0ad`이고, PO 항목을 더한 뒤의 커밋하지 않은 초안이다.
- 범위: Story 전체를 끝까지 다시 읽었다. 실행한 체크리스트는 `.bmad-core/checklists/story-draft-checklist.md`이고 이 호출에서 한 번 실행했다. 고칠 대상은 PO 검증 1회차의 PO1-B1과 계약 안의 비차단 지적이다.

## 지적별 처리

| 지적 | 처리 | 바꾼 곳 |
| --- | --- | --- |
| PO1-B1 `rework`, SM | 고침 | Testing의 새 섹션 "가져오기 검색", 1.2-INSP-001 행, Dev Notes "이전 Story"의 문장 |
| PO1-N8 | 적용 | 1.2-INSP-002 행에서 내보내기 목록과 `Error` 상속을 뺐다. 1.2-UNIT-009 행에 모듈 이름공간의 키 단언과 실패 기준, 출처 `docs/architecture.md#소스-트리`를 더했다 |
| PO1-N9 | 적용 | Dev Notes "기술 제약"의 단위 정의 문장. 1회 항목의 N-6은 기록이어서 고치지 않고 2회 항목에서 읽는 법을 적었다 |
| PO1-N10 | 적용 | "가져오기 검색"의 까닭 문단과 Dev Notes "구현할 때 놓치기 쉬운 점"의 한 항목. `node:` 지정자를 허용하는 길은 택하지 않았다. 표의 어떤 행도 가져오기를 요구하지 않고 패턴만 복잡해진다 |
| PO1-N1 ~ PO1-N7 | 적용하지 않음 | 계약 밖이고 답이 오지 않았다. 실행 지시도 고치지 말라고 정했다. 피드백이 고를 수 있다고 한 N-1 문장의 `convert(1e308, "F", "C")` 사례도 같은 지시에 따라 더하지 않았다. 그 관찰은 PO Validation의 PO1-N1에 있다 |

이의 제기는 없다. PO의 재현은 맞다. 고치기 전 명령을 Story의 통과할 줄에 돌리면 `export function convert(value, from, to) {`에 일치한다.

## 읽은 입력과 규칙

`.bmad-core/tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`, `javascript-crap`.
- 읽지 않은 본문: `coding-principles`, `comments`, `crap`. SM의 규칙 종류가 아니다.
- 끝까지 읽은 절차와 자료: `agents/sm.md`, `tasks/create-next-story.md`, `tasks/create-next-story-style.md`, `tasks/test-design.md`, `tasks/execute-checklist.md`, `checklists/story-draft-checklist.md`, `templates/story-tmpl.yaml`, `data/agent-context.md`, `data/finding-classification.md`, `data/story-paths.md`, `data/story-slicing.md`, `data/verification-ownership.md`, `data/development-quality.md`, `data/test-priorities-matrix.md`, `project-map.md`.
- 일부만 읽은 파일: `data/workflow-routing.md`(Story temporary material과 그 In a run). 점검 도구 `utils/checks/check-stage.sh`, `utils/checks/record-rules.awk`는 끝까지 읽었다.
- 프로젝트 입력: Story 전체, `sm-1`, `po-r1`, PO의 피드백, `docs/architecture.md`, `docs/planning/decisions.md`를 끝까지 읽었고, `docs/prd.md`는 Story 1.2 항목을, `src/engine.js`는 머리를, `docs/story-records/1.1/dev-1.1.md`는 F1과 1.1-INSP-001의 줄을 읽었다.

## 1.2-INSP-001의 검색

| 패턴 | 전 | 후 | 까닭 |
| --- | --- | --- | --- |
| 첫째 | `^[[:space:]]*import\b` | 같음 | 줄 머리의 `import`만 본다 |
| 둘째 | `\bimport\(` | `^[^/*]*\bimport\(` | 주석 안의 `import()`에 일치하지 않게 한다 |
| 셋째 | `\brequire\(` | `^[^/*]*\brequire\(` | 주석 안의 `require()`에 일치하지 않게 한다 |
| 넷째 | `^[[:space:]]*export .*\bfrom\b` | `^[[:space:]]*export[[:space:]]*[*{].*from[[:space:]]*[\"']` | PO1-B1. `export *`와 `export {` 뒤에 모듈 지정자가 오는 꼴만 본다 |
| 다섯째 | 없음 | `^[[:space:]]*\}?[[:space:]]*from[[:space:]]*[\"']` | 여러 줄 내보내기의 끝 줄을 잡는다 |

PO가 시험한 후보를 그대로 쓰지 않은 까닭은 세 가지이고 모두 표준 입력으로 돌려 확인했다. 그 후보는 주석 `// Uses no import() or require().`에 일치한다. Story 1.1의 1.1-INSP-001이 요약 주석의 낱말에 일치해 실패한 일과 같은 꼴이다. 한 줄로 쓴 `export function convert(value, from, to) { throw new ConversionError("cannot convert from " + from); }`에도 일치한다(종료 상태 0, 고친 명령은 1). `export{x}from"./engine.js";`와 `from "./engine.js";`는 놓친다(잡을 줄 12개 가운데 10개).

판정을 "일치 없이 끝난다"에서 종료 상태로 바꾼 까닭: `src/units.js`가 없으면 일치가 없어도 grep이 종료 상태 2로 끝난다. 지금 이 저장소에서 그대로 나온다.

남는 한계는 둘이다. 문자열 안의 `import(`와 `require(`는 구별하지 못하며, 이것은 "가져오기 검색"의 문장에 적었다. `/`나 `*`가 같은 줄 앞쪽에 있는 `x / require(y)` 같은 줄은 놓치지만, 계획된 쓰임에 그런 줄이 없다.

## 범주 결과

| 범주 | 결과 | 근거 |
| --- | --- | --- |
| Project policy checks | PASS | 아래 "Project policy 항목별 근거" |
| 1. Goal & Context Clarity | PASS | Story 문장, "결과와 범위", `Depends on: none`을 바꾸지 않았다. `sm-1`의 근거를 잇는다. `check-stage.sh deps`를 다시 돌려 `story 1.2 story none` |
| 2. Technical Implementation Guidance | PASS | 바꾼 문장을 대조했다. "D-2가 관계를 정하지 않는 `mm`, `cm`, `km`, `kPa`, `MPa`"는 D-2의 "1 in = 25.4 mm, 1 ft = 0.3048 m, 1 bar = 100 kPa"와 맞다(세 단위를 다른 단위로 정의할 뿐 `mm`와 `m`, `kPa`와 `Pa`의 관계는 없다). "아무것도 가져오지 않는다"는 `docs/architecture.md#기술-구성`의 "내장 모듈만 사용"보다 좁지만 어긋나지 않는다. 그 문장은 위 한도를 정하고, `docs/architecture.md#설계-원칙`의 금지도 이 안에 든다. 설계 입력은 `docs/architecture.md`를 끝까지 다시 읽었고 저장한 Tasks와 Testing이 닿는 절은 `sm-1`과 같다 |
| 3. Reference Effectiveness | PASS | 새 인용 `docs/architecture.md#소스-트리`, `docs/architecture.md#기술-구성`, `docs/architecture.md#설계-원칙`의 제목이 대상에 있다. Dev Notes의 "가져오기 검색"이 가리키는 제목이 Testing에 있다. 나머지 참조는 바꾸지 않았다 |
| 4. Self-Containment Assessment | PASS | 명령, 판정, 표본, 까닭이 Story 안에 있다. 합격 판정을 바꾸는 새 해석은 없다. PO1-N8은 내보내기의 판정 방법만 옮겼고, PO1-N10의 뜻은 고치기 전 명령도 이미 실패로 치던 입력이다. 수용된 결정의 추적 표는 바꾸지 않았다 |
| 4.5. Comment Contract | PASS | 추가한 글에서 코드, 주석, 테스트 이름에 추적 번호를 넣으라는 지시가 없다. 표본의 주석 `// Converts a value from one unit to another.`, ` * @param {string} from Unit to convert from`, `// Uses no import() or require().`은 검색 입력이고 번호가 없으며 영어다. 새 IN-FLIGHT 지시가 없다. 나머지 Tasks와 Dev Notes는 바꾸지 않았고 전체를 다시 읽어 같음을 확인했다 |
| 5. Testing Guidance | PASS | 아래 "개수와 추적 재확인"과 "검색 표본 실행". `test-design.md`의 "include an accepted valid input that can pass"는 통과할 줄 9개와 실제 파일 `src/engine.js`, `src/number-format.js`가 채운다. 실패 기준의 각 항목은 잡을 줄 12개와 종료 상태 2의 실행으로 관찰했다. 1.2-UNIT-009의 새 단언은 아래 "실행하지 않은 것"에 추적을 적었다 |

## Project policy 항목별 근거

바꾼 글에 닿는 항목만 다시 판정했고, 나머지는 아래 "이어 쓰는 근거"대로 `sm-1`의 결과를 잇는다.

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 현재 작업과 사실, 편집 이력 | PASS | "가져오기 검색"은 현재의 명령과 판정을 적는다. "Draft 때 이 명령에서 파일 인자를 빼고"는 관찰임을 밝혔고 "제품 코드에 돌린 결과가 아니며"로 한계를 적었다. 회차와 지적 번호는 SM Draft Checklist와 Change Log에만 있다 |
| AC 일치 | PASS | AC를 바꾸지 않았다. PRD와 `diff` 차이 없음 |
| 승인 주장 | PASS | 인용을 바꾸지 않았다. D-2 인용과 결정 기록의 칸이 `diff`로 같다 |
| 측정 합계와 소계 | PASS | 아래 "개수와 추적 재확인" |
| 출처와 위치 표기 | PASS | 새 글은 파일과 섹션, 시나리오 ID, 심볼로 적었고 줄 번호를 쓰지 않았다 |
| 임시 자료 | PASS | 이 호출에서 만든 임시 파일은 메인 세션이 지정한 보고 파일 하나다. 점검은 중간 파일 없이 파이프와 표준 입력으로 했다. 이어가기 로그의 Story 1.2 섹션에 이 사실을 적었다 |
| Story의 임시 자료 지시 | PASS | `BMAD_TEMP_PATTERN` 검색 일치 없음. 추가한 글에 임시 경로가 없다 |
| Task 문구 | PASS | Tasks를 바꾸지 않았다. 명령과 표본은 Testing에 있다 |
| 선택지 비교 표 없음 | PASS | 이 기록의 패턴 표는 수정의 전후이고 Story에는 없다. Story의 추가분은 명령과 목록이다 |
| Convention Sections 목록 | PASS | 바꾸지 않았다 |

## 개수와 추적 재확인

저장한 Story를 grep, awk, diff로 다시 측정했다. 중간 파일은 만들지 않았다.

| 측정 | 대상과 방법 | 결과 |
| --- | --- | --- |
| 시나리오 행 | `1.2-`로 시작하는 표의 행, ID 중복 검사 | 17개, 중복 없음, 모든 행이 8열. 고친 두 행과 1.2-UNIT-009도 8열이다 |
| 수준 | 표의 Level 열 | unit 14, inspection 3 |
| 우선순위 | 표의 Priority 열 | P0 6, P1 8, P2 3 |
| 실행 방식 | 표의 Execution 열 | automated 15, agent-review 2 |
| 실행 맵 | `test_design.execution`의 ID와 값을 표와 `diff` | 차이 없음 |
| 요약 | Test Strategy Overview, `scenarios_total`, `by_level`, `by_priority`, `by_execution` | 측정값과 같음. 시나리오를 더하지 않아 값이 그대로다 |
| 실행 순서 | Recommended Execution Order의 ID | 17개가 한 번씩 |
| SubTask와 시나리오 | SubTask 1.1, 2.1의 범위 | 바꾸지 않았다. 1.2-UNIT-009와 1.2-INSP-001, 1.2-INSP-002는 SubTask 1.1의 행이고, 옮긴 내보내기 단언도 SubTask 1.1의 결과를 덮는다 |
| 코드 펜스 | Story의 펜스 줄 | 10개, 짝이 맞다(Convention Sections, 명령, 표본 둘, 실행 맵) |
| AC | PRD의 Story 1.2와 Story의 번호 줄을 `diff` | 차이 없음, 4개 |
| D-2 원문 | Story의 인용과 `docs/planning/decisions.md`의 칸을 `diff` | 차이 없음 |

## 검색 표본 실행

저장한 Story에서 명령 줄과 두 표본 블록을 sed와 awk로 뽑아 그대로 돌렸다. 파일 인자를 뺀 실행은 표준 입력을 읽는다.

| 입력 | 결과 |
| --- | --- |
| 통과할 줄 9개 | 일치 0건, 종료 상태 1 |
| 잡을 줄 12개 | 12개 모두 일치, 종료 상태 0 |
| PO의 표본 일곱 줄(통과) | 일치 0건, 종료 상태 1 |
| PO의 표본 아홉 줄(금지) | 아홉 줄 모두 일치 |
| 실제 파일 `src/engine.js` | 일치 없음, 종료 상태 1 |
| 실제 파일 `src/number-format.js` | 일치 없음, 종료 상태 1 |
| 실제 파일 `test/engine.test.js`(가져오기가 있는 파일) | 일치, 종료 상태 0 |
| 저장한 명령 그대로, `src/units.js`가 없는 지금 | 종료 상태 2, "No such file or directory" |
| 고치기 전 명령, 통과할 줄 9개 | 종료 상태 0. `export function convert(value, from, to) {`와 `// Uses no import() or require().`에 일치 |

Markdown 표의 구분자와 겹치는 일은 없다. 명령과 표본을 표 밖의 코드 블록에 두었고, 고친 1.2-INSP-001 행에는 `|`가 든 인용이 없으며 8열로 재었다.

## 실행하지 않은 것

- 1.2-UNIT-009의 새 단언은 실행하지 않았다. `src/units.js`가 없고 SM은 탐침을 만들지 않는다. 추적은 다음과 같다. 입력은 `../src/units.js`의 모듈 이름공간이고 키는 내보낸 이름이다. `export function`, `export class`로 내보내거나 `export { convert, units, ConversionError };`로 내보내면 키가 세 개여서 통과한다. 도우미나 단위 표를 더 내보내면 키가 늘고, `export default`면 키 `default`가 생겨 실패한다. 판정은 Dev의 SubTask 1.1에서 처음 나온다.
- `node -p`와 그 밖의 산술 실행은 이 호출에서 하지 않았다. Dev Notes의 배정밀도 값은 바꾸지 않았고 PO가 다시 실행해 같음을 확인한 값이다.

## 이어 쓰는 근거

`sm-1` 전체와 PO 검증 1회차 기록 `po-r1`의 "계획 점검", "개수와 추적 재측정", "사실 주장 대조"를 다음 비교로 잇는다.

- 입력: 부모와 설계 문서, 코드는 40e1a6b와 같아 그 기록의 입력과 같다.
- 내용: 저장한 Story를 PO 검증 1회차가 읽은 사본과 `git diff --no-index -U0`로 비교했다. 사본은 PO 항목을 더하기 전의 내용이다. 달라진 덩어리는 Dev Notes "이전 Story"의 한 줄, 단위 정의의 한 줄, "구현할 때 놓치기 쉬운 점"에 더한 한 줄, Testing에 더한 "가져오기 검색" 섹션, 1.2-UNIT-009 행, 1.2-INSP-001과 1.2-INSP-002 행, SM Draft Checklist의 2회 항목, Change Log의 한 행, PO가 더한 PO Validation이다.
- 그래서 표 1, 표 2, 표 3, 같은 값 판정, D-2 추적, 나머지 14개 시나리오 행, 실행 맵, 실행 순서, 위 Project policy 표에 없는 항목은 글이 그대로이고 그 판정의 입력도 그대로다. 값 289쌍과 오류 행, 틀린 변형 41종의 PO 점검은 내 실행이 아니며, 그 표들이 바뀌지 않았으므로 PO의 다음 회차에 그대로 쓸 수 있다는 뜻으로만 든다.

바꾼 문장이 기대는 사실은 이 호출에서 다시 확인했다. `src/units.js`와 `test/units.test.js`는 없고 `node --test`는 35개 통과한다.

## 실행한 명령과 결과

| 명령 | 결과 |
| --- | --- |
| `sh .bmad-core/utils/checks/check-instructions.sh` (역할 작업 전) | 종료 상태 0 |
| `sh .bmad-core/utils/checks/check-stage.sh future --story 1.2` | 종료 상태 0, 출력 없음 |
| `sh .bmad-core/utils/checks/check-stage.sh deps` | 종료 상태 0, `story 1.1 story none`, `story 1.2 story none`, `story 1.3 epic 1.1` |
| `sh .bmad-core/utils/checks/check-stage.sh po-record docs/stories/1.2.story.md` | 종료 상태 0. PO의 줄 그대로다: 경로 `PO1-B1 rework SM`, 판정 NO-GO, 회차 1, 수집 complete |
| `node --test` | 35개 통과, 실패 0 |
| `node --version` | v24.22.1 |
| `git status --short`, `git diff --stat HEAD`, `git rev-parse --short HEAD` | 추적 안 된 항목은 Story와 기록 폴더뿐, 추적 파일 변경 없음, HEAD 40e1a6b |
| `sh .bmad-core/utils/checks/check-stage.sh records docs/stories/1.2.story.md` (Story 항목과 이 기록을 저장한 뒤) | 종료 상태 0, 출력 없음 |
| `BMAD_TEMP_PATTERN` 검색, Story와 이 기록 | 일치 없음 |
| `invisible-chars.awk`, Story와 이 기록 | 일치 없음 |
| `story-rules.awk` 모드 `status`, `key`, `title`, `tasks` | `Draft`, `1.2`, `단위 변환`, Task 2개 |
| `sh .bmad-core/utils/checks/check-stage.sh approve docs/stories/1.2.story.md` (참고로 실행) | 종료 상태 1, 메시지 "Validation: must be GO, not NO-GO". 저장된 판정이 PO의 NO-GO이므로 이 단계에서 맞는 결과이고, PO 재검증이 그 줄을 쓴다 |
| 줄 수, `grep -c ''` | Story 495줄. `create-next-story-style.md` §7의 600줄 아래다 |

한 번 실패한 측정이 있다. 측정 명령 하나가 2,001자여서 프로젝트의 명령 길이 규칙(`CL-GLD-OPS-010`)을 지키는 hook이 실행 전에 막았다. 실행되지 않았고, 명령 둘로 나누어 위 값을 쟀다. Story의 문제가 아니다.

체크리스트의 Execution deviations에 해당하는 일은 없었다.

## 수정과 재확인

저장한 Story의 바꾼 곳을 파일에서 다시 읽었고, 같은 호출 안에서 다음을 고친 뒤 해당 부분을 다시 읽고 영향받는 측정을 다시 했다.

- 1.2-INSP-001 행: "그 섹션의 통과할 줄에는 일치하지 않고 잡을 줄에는 일치한다"가 Dev의 판정 단계를 하나 더 시키는 것처럼 읽혀 "통과할 줄과 잡을 줄은 그 섹션이 든다"로 고쳤다. 판정은 `src/units.js`에 돌린 종료 상태 하나다. 8열을 다시 재었다.
- 이 기록: 저장 뒤의 점검 결과를 보고 파일에 미루던 문장을 실제 결과의 행으로 바꾸었다.

PO Validation과 1회 SM 항목, `sm-1`, `po-r1`은 바꾸지 않았다. Status는 Draft 그대로다.

## 한계

- 검색의 판정은 표본과 기존 파일에 돌린 결과이고 `src/units.js`에 돌린 결과가 아니다.
- `quality` 종류의 규칙 본문 `coding-principles`, `comments`, `crap`은 SM의 규칙 종류가 아니어서 읽지 않았다. Story는 그 ID를 인용만 한다.
- 이 작업은 네트워크를 쓰지 않았고 외부 자료 조사는 하지 않았다. 새 기술 결정을 내리지 않았다.
