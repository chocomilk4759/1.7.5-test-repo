# po-r1 — 단위 변환

- Story: [1.2](../../stories/1.2.story.md)
- Entry: PO 검증 1회, 첫 회차의 전체 검토와 `validate-next-story.md` step 12의 취합
- 작성자와 실제 검토자: PO 하위 세션 Sarah, 모델 `claude-opus-5-5`, effort `max`(둘 다 시스템이 알려 준 값), `*run-story 1.2 1.3 remote to Done` run의 역할 작업. 추가 검토자는 없다
- 시각: 2026-11-06, 입력 확인 13:50 +0900, 기록 작성 14:01 +0900 이후
- 입력 기준: `main` 40e1a6b. Story와 SM 기록은 커밋하지 않은 초안이다

## 범위와 입력

범위는 Story 전체이고 제외한 범주는 없다. SM의 판단을 받아들이지 않고 아래 입력으로 직접 판정했다.

| 입력 | 정체 | 읽은 범위 |
| --- | --- | --- |
| `docs/stories/1.2.story.md` | 커밋하지 않은 초안. PO 기록을 더하기 전 `git hash-object --no-filters` 값 `d78deb0d492818ea819f81ef3000f4780e43532c`, 396줄 | 끝까지 |
| `docs/story-records/1.2/sm-1.md` | 커밋하지 않은 SM 기록, 같은 값 `a2a6c7a4b99d4db068eaba59019c6cc8b8d56bbd` | 끝까지 |
| `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`, `docs/planning/future-work.md` | 40e1a6b와 같음(`git diff --stat HEAD` 출력 없음) | 끝까지 |
| 계획 검토 기록 | `docs/prd.md#계획-검토-기록`과 `docs/architecture.md#검토-기록`의 2026-10-29 프로젝트 소유자(시험 운영자) 승인. 대상이 Story의 인용과 같다 | 끝까지 |
| 실행 요청 | 프로젝트 소유자(시험 운영자), 2026-11-06, `*run-story 1.2 1.3 remote to Done`. 단계 Done, 단어 `remote`. 수집 응답이며 단계가 Approved 이상이다 | 지시문 전체 |
| SM 질문 Q1 ~ Q7 | SM 보고의 섹션 "질문"과 Story의 비차단 메모 N-1 ~ N-7. 메인 세션은 답하지 않았다 | 끝까지 |

코드와 설정은 `src/engine.js`, `src/number-format.js`, `test/number-format.test.js`, `ci/screen-rule.check.mjs`, `.github/workflows/ci.yml`, `package.json`, `README.md`, `.bmad-core/core-config.yaml`을 끝까지 읽었고, `test/engine.test.js`는 머리글과 도우미 함수를 읽었다. 앞선 Story는 `docs/stories/1.1.story.md`의 SM Draft Checklist와 PO Validation, Dev Agent Record, `docs/story-records/1.1/po-r1.md`를 읽었고, `docs/qa/gates/1.1.yml`, `docs/story-records/1.1/qa-r1.md`, `qa-r2.md`, `dev-1.1.md`는 Story가 인용한 지적을 찾아 읽었다.

## 읽은 규칙

`.bmad-core/tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문(PO의 규칙 종류 `operations`, `design`, `documentation`): `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`.
- 읽지 않은 본문: `coding-principles`, `comments`, `crap`은 `quality` 종류이고, `javascript-crap`은 Common `crap`과 함께 읽는 섹션이다. Story의 CC-CMT 인용은 `CL-GLD-OPS-001`, `load-project-rules.md`의 문장과 색인으로만 대조했다.
- 끝까지 읽은 절차와 자료: `agents/po.md`, `agents/sm.md`, `project-map.md`, `tasks/validate-next-story.md`, `tasks/validate-loop.md`, `tasks/create-next-story.md`, `tasks/create-next-story-style.md`, `tasks/test-design.md`, `tasks/execute-checklist.md`, `tasks/architecture-align.md`, `checklists/story-draft-checklist.md`, `templates/story-tmpl.yaml`, `data/agent-context.md`, `data/finding-classification.md`, `data/story-paths.md`, `data/story-slicing.md`, `data/verification-ownership.md`, `data/development-quality.md`, `data/domain-language.md`, `data/future-work-planning.md`, `data/test-levels-framework.md`, `data/test-priorities-matrix.md`, `data/workflow-routing.md`, `data/terms.md`, `utils/checks/check-stage.sh`, `utils/checks/lib.sh`, `utils/checks/story-rules.awk`, `utils/checks/record-rules.awk`.
- 일부만 읽은 파일: `tasks/run-story.md`(Role sessions, Rounds, Checks after each task, Stop hold and carry on), `data/local-git-workflow.md`(Branch and commit grouping, Commit messages and evidence, Read-only work), `checklists/comment-hygiene-checklist.md`(§3), `tasks/local-task-done.md`(기록이 단위의 제목을 받는 문장), `utils/checks/check-owned.sh`(`role_owns`), `utils/checks/owned-rules.awk`(머리).

## 범주 결과

| 범주 | 결과 | 근거 |
| --- | --- | --- |
| Project policy checks | PASS | 아래 "Project policy 항목별 근거". 비차단 PO1-N9 |
| 1. Goal & Context Clarity | PASS | Story 문장과 "결과와 범위": "`src/units.js`가 `convert`, `units`, `ConversionError`를 내보내고". PRD Epic 1의 둘째 Story이고 Story 1.1, 1.3과의 방향을 `docs/architecture.md#설계-원칙`으로 적었다. 저장 줄 `Depends on: none`이 Epic 항목, 글 "선행 Story가 없다"와 같다. AC에 다른 Story의 산출물이 없어 선행 관계가 실제로 없음을 확인했다 |
| 2. Technical Implementation Guidance | PASS | "인터페이스와 파일 위치"의 경로와 심볼이 `docs/architecture.md#소스-트리`의 `src/units.js`, `test/{모듈}.test.js` 행과 맞는다. "기술 제약"의 문장을 Architecture의 "기술 구성"과 "설계 원칙"에 하나씩 대조했고 어긋남이 없다. 환경 변수는 쓰지 않는다. 사용자에게 보이는 동작은 라이브러리 함수뿐이고 `src/`에 내장 도움말이 없다. 비차단 PO1-N9 |
| 3. Reference Effectiveness | PASS | Story가 인용한 제목 7개(`목표`, `Story 1.2: 단위 변환`, `계획 검토 기록`, `기술 구성`, `소스 트리`, `설계 원칙`, `검토 기록`)가 대상 문서에 있고 앵커 꼴이 맞다. 각 참조에 까닭이 적혀 있다. D-2는 적용, D-1은 영향이 Story 1.1이라 미적용이라 적었고 결정 기록의 영향 칸과 같다. `docs/research`는 없다. Story 1.1의 기록은 Dev Notes "이전 Story"에 요약되어 있고 아래 "사실 주장 대조"에서 맞음을 확인했다 |
| 4. Self-Containment Assessment | PASS | AC, D-2 원문, 입력별 기대 결과가 Story 안에 있다. 부모가 지정한 Canonical Implementation Source가 없어 그 항목은 N/A다. D-2의 내용을 "결정 D-2의 추적"이 SubTask와 시나리오로 잇고, 표 1, 표 2, 표 3이 합격과 거부를 정한다. 해석이 AC의 합격 판정을 바꾸는지는 아래 Q2, Q3, Q6에서 따로 판정했고 바꾸지 않는다 |
| 4.5. Comment Contract | PASS | Tasks, Dev Notes, Testing 전체를 읽었다. "Story, Task, AC, 시나리오, 표의 행, 결정의 번호는 코드, 주석, 테스트 이름, 오류 메시지에 넣지 않는다", "AC와 케이스의 대응은 Testing과 기록 문서에 둔다", "IN-FLIGHT 표시는 만들지 않는다". 머리글에 시나리오 목록을 두라는 지시와 새 IN-FLIGHT 지시가 없고, 기존 항목도 없다. 정책 ID는 Dev Notes의 글에만 있다 |
| 5. Testing Guidance | FAIL | PO1-B1. 1.2-INSP-001의 검색이 Story가 정한 `convert` 선언에 일치한다. 그 밖의 항목은 아래 "계획 점검"과 "개수와 추적 재측정"대로 맞다. 비차단 PO1-N8, PO1-N10 |

최종 판정: NO-GO. 모든 필수 점검을 끝냈고 차단 지적 하나가 열려 있다.

### Project policy 항목별 근거

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 새 주석의 언어와 쓸모 | PASS | "새 주석은 영어로 쓴다(CC-CMT-009)", "테스트 이름과 주석은 기존 테스트 파일처럼 영어로 쓰고". `test/number-format.test.js`의 테스트 이름이 영어임을 확인했다. 다른 파일의 언어 예외를 옮기는 지시가 없다 |
| 현재 작업과 사실, 편집 이력 | PASS | Tasks와 기술 제목에 날짜와 회차가 없다. "Draft 때 커밋 40e1a6b에서 관찰한 사실"과 "Draft 때 Node.js v24.22.1에서 계산한 배정밀도 값"은 관찰임을 밝히고 Dev가 다시 확인하도록 적었다. 날짜는 수용 기록의 인용, SM 기록, Change Log에만 있다 |
| PRD 정체성과 승인된 뜻 | PASS | `docs/prd.md`는 40e1a6b와 같다 |
| AC 일치 | PASS | PRD의 Story 1.2 항목과 Story AC의 번호 줄을 떼어 `diff`: 차이 없음, 4개. 들여쓴 `Source:` 줄 4개. 부모에 머리글과 표, 하위 항목이 없다. Task 1이 AC 1 ~ 4를 받는다 |
| 위반과 기존 잔여물 구분 | PASS | "주석 위생의 비교 기준은 Story 브랜치가 갈라진 기준 커밋", "바꾸지 않는 파일의 기존 내용은 대상이 아니다" |
| 기존 Story와 QA 기록 | PASS | Story 1.1의 파일과 gate는 40e1a6b와 같고, 이 Draft가 그것을 다시 만들거나 옮기라고 지시하지 않는다 |
| 임시 자료 | PASS | 프로젝트 임시 영역의 목록을 직접 보았다. SM 몫은 보고 파일 하나이며 이어가기 로그의 Story 1.2 섹션에 적혀 있다. 프로젝트 밖의 쓰기는 이 세션에서 확인할 수 없어 리드로 남겼다 |
| Story의 임시 자료 지시 | PASS | "Done까지 필요한 근거를 보존하고, 지우는 일은 병합이 확인된 뒤에 이 Story의 일회용 자료에만 한다". 경로가 없고 `BMAD_TEMP_PATTERN` 검색은 일치 0건이다 |
| 주석 위생 기준 | PASS | 비교 기준, 대상 경로 `src/units.js`, `test/units.test.js`, `.bmad-core/checklists/comment-hygiene-checklist.md` §3. 그 절("3. Post-Implementation Check")이 있음을 확인했다 |
| 승인 주장 | PASS | "Epic 1의 Story 1.1, 1.2, 1.3 범위, AC와 의존 줄을 승인한다", "기술 구성, 소스 트리, 설계 원칙을 승인한다"를 원문과 Story 양쪽에서 `grep -F`로 찾았다. D-2 칸의 글이 Story 인용과 `diff`로 같다. 실행 요청의 원문이 지시문과 같다. 주체와 일시가 같고 인접 결정으로 넓히지 않았다 |
| 측정 합계와 소계 | PASS | 아래 "개수와 추적 재측정" |
| 작업 경계 | PASS | 파일은 경로로, 인터페이스는 심볼로 적었다 |
| 출처와 위치 표기 | PASS | 줄 번호나 줄 좌표 꼴의 표기를 찾아 0건이다. 파일과 섹션, 심볼, 설정 키로 적었다 |
| 실행 가능성 주장 | PASS | 속성과 변이 점검을 뺀 까닭이 `testing.propertyCommands`, `testing.mutationCommands`, Architecture의 외부 패키지 금지에 묶여 있고, 설정 값과 `node_modules` 부재를 확인했다 |
| Task 문구 | PASS | SubTask는 심볼, 시나리오, 명령, 커밋 제목만 적고 구현식이 없다. 커밋 제목은 `git.taskCommitPattern`에 맞다 |
| 선택지 비교 표 없음 | PASS | 표 3의 받는 결과는 검증 표이고, 제안은 비차단 메모의 글이다 |
| Convention Sections 목록 | PASS | 두 목록의 이름이 모두 색인에 있다. `convention-sections`는 Dev의 규칙 종류와 `testing-tdd`, `javascript-language`이고, `review-sections`는 `quality` 종류와 `javascript-crap`이다 |
| 실행 비용 | PASS | "실행 비용: 설치된 JavaScript 규칙에 이 변경에 닿는 실행 비용 규칙이 없고". `javascript-language` 본문과 PRD, Architecture에 해당 규칙과 성능 기준이 없다 |

## 단계별 결과

| `validate-next-story.md` 단계 | 결과 | 근거 |
| --- | --- | --- |
| 1 Template | PASS | 템플릿의 섹션이 있고 Convention Sections 뒤에 Testing이 온다. PO Validation, Dev Agent Record, QA Results는 초안에 없었고 이는 허용된다. `{{`, `_TBD_` 검색 0건 |
| 2 File structure | PASS | 새 파일 둘의 경로가 소스 트리와 맞다. 등록할 곳이 없다는 주장은 `package.json`에서 확인했다 |
| 3 UI | N/A | 이 Story에 화면이 없다. `renderScreen`은 Story 1.3, 브라우저 화면은 뒤 Epic이다 |
| 4 AC | PASS | 문구, 순서, 번호 일치. 각 AC의 행동이 시나리오로 이어진다(AC 1: 001, 002, 003, 007, 008, 010, 013, AC 2: 004, AC 3: 003의 대조, 005 ~ 009, 013, AC 4: 010, 011, 012). 값 289쌍과 오류 행이 판정 가능하다 |
| 5 Testing | FAIL | PO1-B1. 그 밖에 `testing-tdd`의 접근이 맞다. Task 1은 새 동작이라 TDD, Task 2는 동작을 더하지 않아 `verification-only`다. RED 기준과 뼈대 처리가 Recommended Execution Order에 있고, 기대 값은 손 계산과 정수 나눗셈이다. 테스트 대역은 없다 |
| 6 Security | PASS | 인증, 저장 데이터, 규제 요구는 N/A다. 해당하는 것은 입력의 경계 검사이고 E-1, E-3, E-5가 맡는다 |
| 7 Tasks | PASS | 순서가 논리적이고 Architecture 정렬이 마지막이다. Cleaner와 재점검이 SubTask 1.1 안에 있다. 의존 줄이 글, Epic 항목과 같다. 미결 항목의 판정은 아래 질문별 판정에 있다 |
| 8 Anti-Hallucination | PASS | 아래 "사실 주장 대조"와 "Anti-Hallucination". 어긋난 문장은 PO1-B1에 묶였다 |
| 9 Dev readiness | FAIL | PO1-B1이 고쳐지기 전에는 SubTask 1.1의 완료 점검이 Story가 정한 꼴의 코드에서 통과하지 못한다. 그 밖에는 Story와 지정된 출처만으로 구현과 판정이 가능하다 |

## 차단 지적 PO1-B1: 1.2-INSP-001의 검색이 `convert` 선언에 일치한다

- 관찰: 시나리오의 명령은 `grep -nE -e "^[[:space:]]*import\b" -e "\bimport\(" -e "\brequire\(" -e "^[[:space:]]*export .*\bfrom\b" src/units.js`이고 판정은 "일치 없이 끝난다. 실패: 일치하는 줄이 있다"다. 넷째 패턴의 `\bfrom\b`이 AC 1의 매개변수 이름 `from`에 일치한다.
- 재현: `export function convert(value, from, to) {`, `export function units(kind) {`, `export class ConversionError extends Error {}`를 담은 표본 파일에 같은 명령을 돌렸다. 종료 상태 0이고 일치한 줄은 `export function convert(value, from, to) {`다.
- 이 꼴이 Story가 정한 꼴이라는 근거: AC 1 "`convert(value, from, to)`는", Dev Notes "인터페이스와 파일 위치"의 "`convert(value, from, to)` | 새 named export", Dev Notes "이전 Story"의 "`src/engine.js`는 `export class CalculationError extends Error {}`와 `export function evaluate`로 내보낸다. ... 같은 꼴을 따른다".
- 결정 순서:
  - step 1, 확인했다. 위 명령과 결과다.
  - step 2, 이 Story의 책임이다. 이 Story가 만든 필수 점검이고 SubTask 1.1의 시나리오다.
  - step 3, 기준이 있다. 첫째, Story의 두 문장이 계획된 쓰임에서 어긋난다. 위 문장들은 `export function convert(value, from, to) {`를 요구하고 1.2-INSP-001은 그 줄이 있으면 실패라고 정한다. 같은 입력에 다른 합격 결과를 정한다. Dev Notes의 "1.2-INSP-001의 검색은 가져오기 구문의 꼴만 본다"도 실측과 다르다. 둘째, `.bmad-core/tasks/test-design.md` "For a checker or comparison tool, include an accepted valid input that can pass"다. 이 검색에서 수용된 올바른 줄이 통과하지 못한다.
  - step 4도 같은 결론이다. Story가 말한 대로 한 작업이 Story 자신의 합격 점검에서 실패한다. Dev가 매개변수 이름을 바꾸거나 `export { ... }` 줄로 따로 내보내면 지나가지만, 그것은 Story가 요구한 꼴에서 벗어나는 일이다.
- 분류: 차단. 경로 `rework`, 소유자 SM. 패턴을 고치는 일은 수용된 AC, Architecture, 규칙 안에서 할 수 있다.
- 영향받는 곳: Testing의 1.2-INSP-001 행. Dev Notes "이전 Story"의 문장은 고친 뒤에는 맞게 된다.
- 수정안: 넷째 패턴을 모듈 지정자가 뒤따르는 꼴로 좁힌다. 프로젝트 임시 영역의 표본으로 시험한 후보는 `-e "^[[:space:]]*export[[:space:]].*[[:space:]]from[[:space:]]*[\"']"`와, 여러 줄 내보내기의 끝 줄을 잡는 `-e "^[[:space:]]*\}[[:space:]]*from[[:space:]]*[\"']"`다. 올바른 모듈의 표본 일곱 줄(위 세 줄과 `from`이 든 주석 둘, `const from = table.get(source);`, `throw new ConversionError("cannot convert from " + from);`)에서 일치 0건이고 종료 상태 1이다. 금지할 표본 아홉 줄(`import` 네 꼴, `require`, `export ... from` 세 꼴, `} from "./engine.js";`)은 아홉 줄 모두 일치한다. 지금 명령은 그 아홉 줄 가운데 여덟 줄에 일치하고 `} from "./engine.js";`를 놓친다. SM이 다른 꼴을 골라도 좋다. 수정 뒤에는 통과해야 할 줄과 잡아야 할 줄을 행이나 기록에 적어 두어야 같은 일이 되풀이되지 않는다.
- 되풀이: Story 1.1의 1.1-INSP-001도 처음 실행에서 요약 주석의 낱말에 일치해 실패했다(`docs/story-records/1.1/dev-1.1.md`의 F1). 이번에도 검색 명령을 올바른 표본에 돌려 보지 않은 채 Draft가 끝났다.

## 계획 점검

SM은 시나리오를 실행하지 않았다고 적었으므로 PO가 직접 확인했다. 프로젝트 임시 영역의 점검 스크립트가 저장한 Story의 표를 그대로 읽어 제품 밖의 참조 평가기에 돌렸다. 이것은 계획의 일관성을 본 것이며 구현 결과나 Dev TDD RED가 아니다.

| 측정 | 방법 | 결과 |
| --- | --- | --- |
| 읽은 행 | 표 1, 표 2, 표 3의 칸을 읽어 입력을 만들고 Story의 글과 대조 | 값 13행의 단위 쌍 289(L 144, P 100, T 45), Z-1 3, Z-2 12, E-1 60(값 12 × 단위 쌍 5), E-2 126, E-3 126(값 42 × 자리 3), E-4 3, E-5 18(값 17과 `units()`), U-1 3, 표 3 3. E-3, E-5의 값 가운데 받는 기호나 종류와 같은 것은 없다 |
| Story가 허용한 읽기 | 길이 기준(m, mm), 압력 기준(Pa, kPa), 곱과 나눗셈의 순서, 온도 경유(C, K), F→C(`* 5 / 9`, `/ 1.8`), C→F(`* 9 / 5`, `* 1.8`), 경계 판정(단위별, K로 바꿔서), 같은 단위 지름길, 넘침(`Infinity`, `ConversionError`), 목록(복사본, 얼린 배열)을 곱한 1024조합을 모든 행에 돌림 | 1024조합 모두 실패 0행 |
| 드문 선택 | F 경유, 그리고 온도 행에서 F를 곧바로 K로 바꾸는 `(F + 459.67) * 5 / 9`와 `K * 9 / 5 - 459.67` | 실패 0행 |
| 틀린 구현이 잡히는가 | 시나리오의 실패 기준에서 나온 변형 41종(측량 피트, 곱과 나눗셈 뒤바꿈, 쌍 빠짐, `psi` 6894.76과 6894.757293, `bar` 101.325 kPa, 음수 거부, 부호 잃음, 0 거부, 비율만, 273, 9 / 5와 5 / 9 뒤바꿈, 32의 부호, `(5 / 9)` 순서, 식으로 구한 `F` 경계, 경계 허용 오차, 같은 단위 건너뜀, C를 거친 판정, 전역 `isFinite`, 값 검사 없음, 한 표, 대소문자 접기, 공백 다듬기, 보통 객체, 배열의 글자 변환, `Error` 별칭, 다른 클래스, 호출 사이 상태, 정렬, 기호 빠짐, 배열 아님, 빈 목록, 공유 배열, 유한한 값으로 고정, `NaN`) | 41종 모두 자기 시나리오에서 실패한다 |
| 같은 값 판정 표 | 표의 입력을 Testing의 식에 돌림 | 표의 같다, 다르다와 모두 같다 |
| 독립 오라클 | D-2와 SI 접두어에서 BigInt 유리수로 정확히 계산해 표 1의 칸과 비교. 부동소수 단계 없음 | L-2의 `in`, `ft`, P-2의 `psi` 셋 말고 모든 칸이 정확히 같다. 가장 큰 상대 차이는 1.1e-16이고 한도는 1e-12다. 25자리 값은 Testing의 39370.07874015748031…, 3280.83989501312335…, 14.50377377302168162…와 맞다 |
| 배정밀도 값 | Dev Notes와 `sm-1`의 식 42개를 다시 실행 | 모두 적힌 값과 같다. `-273.149 + 273.15`의 상대 오차 2.36e-11, `273.151 - 273.15` 3.32e-11, 6894.757293과 6894.757293168의 상대 오차 2.44e-11 |
| 경계의 정확한 값 | `toFixed(25)` | `273.15`는 273.14999999999997726…, `273.15000000000003`은 273.15000000000003410…, `459.67`은 459.67000000000001591…, `459.67000000000007`은 459.67000000000007275…이다. Z-2의 두 입력은 수학적으로도 경계 아래이고, `-459.67000000000007`은 `-459.67 - 2 ** -44`와 같은 수다 |
| 1.2-INSP-001 | 위 PO1-B1 | 올바른 표본에서 일치 |

## 개수와 추적 재측정

저장한 Story를 스크립트로 다시 세었다. 첫 실행은 내 스크립트가 E-1의 "빈 글자"를 코드 칸만 읽어 놓쳤고, 참조 평가기가 공유 배열을 돌려주어 뒤의 변형 결과가 오염되어 있었다. Story의 문제가 아니어서 스크립트를 고쳐 다시 측정했고, 아래와 위의 값은 다시 측정한 값이다.

| 측정 | 결과 |
| --- | --- |
| 시나리오 행 | 17개, ID 중복 없음, 모든 행 8열, 모든 행에 실패 기준 있음 |
| 수준, 우선순위, 실행 방식 | unit 14, inspection 3. P0 6, P1 8, P2 3. automated 15, agent-review 2 |
| 실행 맵 | 17개, 표의 방식과 어긋남 없음. `user_only`는 비어 있음 |
| 요약 | Test Strategy Overview, `scenarios_total`, `by_level`, `by_priority`, `by_execution`이 측정값과 같다 |
| SubTask와 시나리오 | SubTask 1.1의 범위 표기가 표의 16행과 같고 SubTask 2.1은 1.2-INSP-003 하나다. SubTask 1.1의 결과는 UNIT-001 ~ 014와 INSP-001, 002가, 2.1의 결과는 INSP-003이 덮는다 |
| 시험 지점(seam) | 실행 수준 14행 모두 모듈 인터페이스(`convert`, `units`, `ConversionError`, `evaluate`, `formatNumber`)이고 inspection 3행은 해당 없음이다 |
| 실행 순서 | ID 17개, 중복과 누락 없음. TDD 조각은 P0, P1, P2 순이다. 그 뒤의 INSP-001, INSP-002, UNIT-014는 Cleaner 뒤의 완료 점검이어서 우선순위보다 SubTask 경계가 앞선다 |
| 규칙 참조 | L-1 ~ L-4, P-1 ~ P-4, T-1 ~ T-5, Z-1, Z-2, U-1, E-1 ~ E-5의 21개가 하나씩 정의되어 있고 시나리오 열의 행이 그 규칙을 든다 |
| 커밋 제목 | `[story-1.2] Task 1.1: 단위 변환 구현`, `[story-1.2] Task 2.1: Architecture 정렬`이 패턴에 맞다 |
| 버전 | 설정에 프로젝트 버전 키가 없고 패턴에 `{project_version}`이 없으며 PRD, Architecture, 계획 문서, README에 버전 정책이 없다. 변경 없음이 맞다 |

## 사실 주장 대조

| Story의 주장 | 확인 | 결과 |
| --- | --- | --- |
| `src/engine.js`의 `export class CalculationError extends Error {}`, `export function evaluate` | 파일을 읽음 | 일치 |
| `test/engine.test.js`는 공개 심볼만 부르고 같은 파일 안의 도우미 함수로 입력 표를 돈다 | 머리글의 가져오기, `assertValues`, `assertRejected` | 일치 |
| QA 1회차 TEST-001 Required, TEST-002 Required, TEST-003, QA 2회차 DOC-001 Required | `docs/qa/gates/1.1.yml`의 `disposition`, `qa-r1.md`, `qa-r2.md` | 일치. TEST-003은 Optional이고 Story도 Required라 하지 않는다 |
| 1.1-INSP-001이 요약 주석의 낱말에 일치해 처음 실행에서 실패 | `dev-1.1.md`의 F1 | 일치 |
| "1.2-INSP-001의 검색은 가져오기 구문의 꼴만 본다" | 표본 실행 | 다르다. PO1-B1 |
| PO1-N10, PO1-N11의 내용 | `docs/stories/1.1.story.md`의 PO Validation | 일치 |
| Story 1.1 병합 커밋 81c547c, 입력 커밋 40e1a6b | `git log` | 일치 |
| `package.json`에 `main`, `exports` 없음, 버전 0.1.0, `node --test`가 스스로 찾음 | 파일을 읽고 실행 | 일치 |
| `testing.lintCommands`, `testing.propertyCommands`, `testing.mutationCommands`, `quality.crap.commands`가 비어 있음, `git.taskCommitPattern`에 `{project_version}` 없음 | `.bmad-core/core-config.yaml` | 일치 |
| `docs/research`, `docs/domain-glossary.md`, `node_modules` 없음, `src/`에 내장 도움말 없음 | 목록 | 일치 |
| `ci.yml`이 `node --test`와 `node ci/screen-rule.check.mjs`를 실행하고 뒤의 점검은 `src/screen.js`가 있을 때만 판정 | 두 파일을 읽고 실행, 종료 상태 0 | 일치 |
| `src/units.js`, `test/units.test.js` 없음, `node --test` 35개 통과, Node.js v24.22.1 | 목록과 실행 | 일치 |
| `isFinite("5")`는 `true`, `null * 100`은 0, `"5" * 100`은 500 | `node` 실행 | 일치 |
| 보통 객체에서 `constructor`, `toString`, `__proto__`가 찾아지고 `["m"]`이 `m`으로 찾아진다 | `node` 실행 | 일치 |
| future-work에서 이 Story에 닿는 항목 다섯, 모두 계획되지 않음 | 파일을 읽음. 항목 17개 모두 `Planning: unplanned`이고 다섯 항목의 문장이 Story의 인용과 맞다 | 일치 |
| `-273.15 × 9 / 5 + 32 = -491.67 + 32 = -459.67` | 유리수 계산 | 일치 |

## SM 질문과 비차단 메모의 판정

`validate-next-story.md`의 step 0과 섹션 "In a run"대로 각 질문을 리드처럼 확인하고 `data/finding-classification.md`의 결정 순서로 분류했다. 일곱 개 모두 관찰은 확인되었고 비차단이다. 막는 질문이 없어 `pending` 지적은 없다. 이 판정은 SM의 "막는 것 없음" 표시나 READY를 근거로 쓰지 않았다.

### Q1, SM N-1, PO1-N1: 결과가 유한하지 않은 변환

- 확인: AC 3 "유한한 수가 아닌 값", D-2 "값이 number 형이 아니거나 유한하지 않으면". 결과가 넘치는 `convert(Number.MAX_VALUE, "km", "mm")`를 정하지 않는다. `story-slicing.md`의 정의로 계획 결정이다. 답이 표 3의 기대 결과를 바꾸기 때문이다.
- 미충족 기준: 없다. "값"이 입력만 말하는지 결과까지 말하는지 수용된 문서가 정하지 않았고, Story는 입력으로 읽은 뒤 결과를 열어 두었다.
- 두 읽기: `Infinity` 또는 `ConversionError`다. 1.2-UNIT-013이 둘 다 받고 유한한 수, `NaN`, 다른 오류를 떨어뜨리므로 Task 내용, 순서, 합격 판정이 같고 구현 선택만 다르다. 1024조합의 넘침 두 갈래가 모두 통과했다.
- 더한 관찰: 참값은 유한한데 계산 순서로 넘치는 입력이 있다. `convert(1e308, "F", "C")`는 `(F - 32) * 5 / 9` 순서에서 `Infinity`이고 `(F - 32) / 1.8` 순서에서 5.555555555555556e+307이다. Story의 N-1 문장에는 없고 `sm-1`의 표에만 있다. 계획된 점검이 이 입력을 포함하지 않고 같은 까닭으로 합격 판정이 달라지지 않는다.
- 분류: 비차단. 계약 밖이다(새 결정이 필요하다).
- 무엇이 답하는가: PM 또는 프로젝트 소유자의 AC 보강이나 해석 결정. 제안: `ConversionError`로 하고, 참값이 유한한 입력의 처리도 함께 적는다. D-1이 계산 엔진에 정한 방향과 같다. 답이 오면 SM 수정에서 표 3을 하나로 줄인다.

### Q2, SM N-2, PO1-N2: 기대 값이 0일 때의 같은 값 판정

- 확인: D-2 "테스트는 상대 오차 1e-12 이내를 같은 값으로 본다". 상대 오차의 정의로 기대 값이 0이면 허용 폭이 0이다. Testing의 식이 이것을 그대로 쓴다.
- 미충족 기준: 없다. D-2의 글을 그대로 읽은 것이고 다른 값을 정한 수용 문장이 없다.
- 두 읽기와 실패: 절대 허용 폭을 두는 읽기는 수용된 글에 없어 Story가 허용하지 않는다. D-2의 식 순서로 계산한 기대 값 0인 행이 정확히 0임을 1024조합에서 확인했다. 떨어지는 것은 `(F - 32) * (5 / 9)` 순서인데, 이 순서는 정확히 0 K인 입력을 음수 K로 돌려주거나 거부해 AC 3과 D-2 "정확히 0 K는 받는다"에도 어긋난다.
- 분류: 비차단. 결정 기록에 적는 일은 계약 밖이다.
- 무엇이 답하는가: 프로젝트 소유자의 결정 기록 보강. 제안: "기대 값이 0이면 0 또는 -0"을 덧붙인다.

### Q3, SM N-3, PO1-N3: 절대 영도 판정의 엄밀함

- 확인: Z-2가 -273.15000000000003 C, -459.67000000000007 F, -`Number.MIN_VALUE` K를 거부한다. D-2의 허용 오차가 경계 판정에도 적용되는지 글로 정해져 있지 않다.
- 미충족 기준: 없다. D-2의 문장은 "테스트는"으로 시작해 시험의 값 비교를 말한다. AC 3 "낮은 온도"와 D-2 "정확히 0 K는 받는다"는 엄밀한 읽기에 가장 가깝고, 위 "경계의 정확한 값"대로 두 입력은 수학적으로도 경계 아래다. Story는 이 읽기로 고정하고 다른 읽기를 허용하지 않으므로 Dev에게 열린 선택이 아니다.
- 분류: 비차단. 수용 문서에 적는 일은 계약 밖이다.
- 무엇이 답하는가: 프로젝트 소유자의 확인. 제안: 이 읽기를 확인한다. 허용 폭을 두기로 하면 수용된 결정의 변경이고 Z-2의 세 입력이 표 3으로 옮겨 간다.

### Q4, SM N-4, PO1-N4: 결과가 0에 가까울 때의 정밀도

- 확인: `-273.149 + 273.15`는 0.0009999999999763531로 0.001과의 상대 오차가 2.36e-11이고 1e-12를 넘는다. 입력의 표현 오차가 뺄셈으로 드러난 것이다.
- 미충족 기준과 실패: 없다. 표 1이 이런 입력을 쓰지 않고, 1024조합의 289쌍이 1e-12 안에서 통과했다. Testing은 Dev가 행을 더할 때도 이런 입력을 쓰지 않는다고 적었다.
- 분류: 비차단. 계약 밖이다.
- 무엇이 답하는가: 프로젝트 소유자의 확인. 제안: 이 구간의 정밀도를 약속하지 않는다고 적는다. 약속하려면 정밀 계산이 필요한 요구사항 변경이다.

### Q5, SM N-5, PO1-N5: `ConversionError`의 `name`과 메시지

- 확인: 수용된 문서에 없다. `docs/planning/future-work.md`의 "[Tech-Debt] CalculationError의 name"이 "`ConversionError`(Story 1.2)에도 닿는다"고 적고 상태는 `unplanned`다.
- 미충족 기준과 실패: 없다. 1.2-UNIT-009는 `instanceof`와 `message`가 string인지만 보므로 어느 쪽이든 합격 판정이 같다.
- 분류: 비차단. 속성과 시험을 더하는 일이라 계약 밖이다. 병합 뒤 점검에서 그 항목에 합친다.
- 무엇이 답하는가: 그 항목의 트리아지(Dev, PM). 제안: 두 오류 클래스를 함께 정한다.

### Q6, SM N-6, PO1-N6: 수용된 글을 그대로 읽은 해석

- 확인: 음수 길이와 압력은 변환하고, 글자가 아닌 단위와 종류는 모르는 단위와 종류이며, `cm`, `km`, `kPa`, `MPa`는 SI 접두어를 쓰고, `units`의 "목록"은 배열이다.
- 미충족 기준: 없다. AC 3의 목록에 음수 길이와 음수 압력이 없고 AC 1은 값을 돌려준다고 한다. AC 1, AC 4는 기호와 종류를 글자로 열거한다. AC의 합격 판정을 바꾸는 해석이 아니라 글을 적용한 것이다. L-3, P-3, E-3, E-5, U-1이 이 읽기를 고정한다.
- 분류: 비차단. 수용 문서에 적는 일은 계약 밖이다.
- 무엇이 답하는가: PM의 확인. 다르게 정하면 수용된 결정의 변경이고 SM 수정과 PO 재검증을 거친다.

### Q7, SM N-7, PO1-N7: Architecture의 코딩 표준 절과 Change Log 절

- 확인: `docs/architecture.md`의 절은 기술 구성, 소스 트리, 설계 원칙, 검토 기록뿐이다. `docs/planning/future-work.md`의 "CI 규칙이 계획 문서에 없음"이 이미 들고 있다. `ci/screen-rule.check.mjs`는 `src/screen.js`가 있을 때만 판정하고 지금 종료 상태 0이다.
- 이 Story의 책임: 아니다. `src/units.js`와 `test/units.test.js`는 소스 트리에 이미 있어 SubTask 2.1은 no-change가 예상되고, 문서를 바꿀 일이 생길 때만 개정 이력을 둘 곳이 문제가 된다.
- 분류: 범위 밖 비차단. 계약 밖이다.
- 무엇이 답하는가: Architect(두 절), PM(Story 1.3 범위). Story 1.2의 어떤 단계도 막지 않는다. 그 항목은 필요한 일을 "Story 1.3 초안 전에"라고 적으므로 다음 Story의 초안 전에 다시 판단이 필요하다.

## PO가 새로 낸 비차단 지적

### PO1-N8: 1.2-INSP-002의 기계적 판정 항목

- 관찰: agent-review인 이 행이 "내보내기가 `convert`, `units`, `ConversionError`뿐이고, `ConversionError`가 `Error`를 잇고"까지 판단하는데, 실행 근거는 "상태와 입출력 여부는 코드의 뜻을 읽어야 판단할 수 있다"뿐이다. `Error`를 잇는 일은 1.2-UNIT-009가 이미 `instanceof`로 보고, 내보내기 목록은 모듈 이름공간의 키로 프로그램이 판정할 수 있다.
- 결정 순서: `.bmad-core/tasks/test-design.md`의 "A diff or assertion does not become agent-review because its output is read by an agent. Split mechanical checks from content judgments when a scenario combines them."를 기준으로 볼 수 있는지 따졌다. 이 행은 도구의 출력을 읽는 것이 아니라 파일을 읽어 판단하는 항목들이고, 어느 항목을 프로그램으로 옮겨야 하는지는 `data/verification-ownership.md`의 "can and should"처럼 정도를 남긴다. 수용된 문장이 이 경우를 값이나 목록으로 정하지 않아 이 경계에서는 기준이 아니다. step 4에서, 읽기와 프로그램이 같은 파일에서 같은 합격 결과를 내므로 틀린 결과가 없다.
- 분류: 비차단. 시나리오를 더 구체화하는 일이라 계약 안이다.
- 수정안: 내보내기 목록을 1.2-UNIT-009나 새 단언으로 옮기고 이 행에서 뺀다. 개수가 바뀌면 요약과 실행 맵을 함께 고친다. 시점은 SM의 다음 수정이다.

### PO1-N9: 단위 정의 문장의 표현

- 관찰: Dev Notes "`cm`, `km`, `kPa`, `MPa`는 D-2에 없고 SI 접두어의 정의(centi 1e-2, kilo 1e3, mega 1e6)를 쓴다". D-2에는 "1 bar = 100 kPa"가 있어 낱말 `kPa`는 D-2에 있다. `mm`와 `m`의 관계(milli 1e-3)도 D-2에 없고 접두어에 기대는데 목록에 없다. N-6의 문장도 같다.
- 결정 순서: 이 문장이 단언한 사실, D-2가 이 단위들의 관계를 정하지 않는다는 것은 맞다(`kPa`와 `Pa`의 관계는 D-2에 없다). 표현이 덜 정확할 뿐이다. 목록의 누락도 Task나 점검이 이 목록의 완전함에 기대지 않는다. step 4에서, L-1과 P-1이 값을 고정하므로 작업과 합격 판정이 같다.
- 분류: 비차단. 계약 안이다.
- 수정안: "D-2가 관계를 정하지 않는 `mm`, `cm`, `km`, `kPa`, `MPa`는 SI 접두어(milli 1e-3, centi 1e-2, kilo 1e3, mega 1e6)를 쓴다"로 고친다. 시점은 SM의 다음 수정이다.

### PO1-N10: 1.2-INSP-001이 내장 모듈의 가져오기도 실패로 친다

- 관찰: `docs/architecture.md#기술-구성`과 Dev Notes는 "내장 모듈만 쓰고 외부 패키지는 쓰지 않는다"인데 이 검색은 `node:`로 시작하는 가져오기에도 일치한다. 행의 출처는 Architecture뿐이고 "아무것도 가져오지 않는다"는 문장은 없다.
- 결정 순서: 계획된 쓰임이 이 경우에 닿지 않는다. 순수 함수 모듈에 내장 모듈이 필요하지 않고 표의 어떤 행도 그것을 요구하지 않는다. 두 문장의 차이는 그런 입력에서만 나타나므로 모순이 아니고, 틀린 결과도 없다.
- 분류: 비차단. 계약 안이다.
- 수정안: 행에 이 모듈은 아무것도 가져오지 않는다고 까닭과 함께 적거나 `node:` 지정자를 허용한다. 시점은 PO1-B1을 고칠 때다.

## SM의 `node -p` 사용에 대한 판단

- 사실: SM은 D-2 온도 식의 배정밀도 값과 끝나지 않는 소수의 자리를 파일 없는 `node -p` 한 줄 산술식으로 구했다고 보고했다. `sm-1`의 "기대 값과 판정의 확인"에 식과 값이 모두 있다. 프로젝트 임시 영역의 스크립트, 요청, 커밋 메시지 폴더는 이 회차 시작 때 비어 있었고 SM의 파일이 없었다.
- 관련 문장: `agents/sm.md` "Do not implement Stories or create or modify executable code, including temporary diagnostic probes and reusable test support. For planning verification, use existing checks within the authorized scope."
- 판단: 막지 않는다. 지적으로 올리지 않고 아래 기각한 관찰에 둔다. 까닭은 다음과 같다.
  - 이 문장이 파일을 만들지 않는 한 줄 산술식까지 금지하는지는 글이 정하지 않는다. `CL-GLD-OPS-010`이 `-e` 같은 인라인 코드를 프로그램이라 부르므로 넓게 읽을 수도 있지만, 금지의 대상은 "create or modify"이고 뒤 문장의 대체 절차는 코드를 고쳐야 반례를 돌릴 수 있는 경우를 말한다. 이 산술은 숫자 리터럴만 쓰고 제품 코드에 닿지 않으며 만들어진 파일이 없다. 경계가 정해지지 않은 문장은 그 경계의 사례에서 기준이 아니다.
  - 결과에 틀린 것이 없다. PO가 식 42개를 다시 실행해 모두 같은 값을 얻었다.
  - 시험의 기대 값이 이 실행에 기대지 않는다. 표 1은 손 계산과 정수 나눗셈이고 PO의 유리수 오라클과 맞는다. "같은 값 판정" 표의 -459.66999999999996, -5.684341886080802e-14는 실제 값의 예이지 기대 값이 아니다. Dev Notes는 Draft의 계산임을 밝히고 "Dev는 구현 전에 다시 확인한다"고 적었고, `sm-1`은 구현의 실행 증거가 아니라고 적었다.
  - 넓게 읽어 실행 편차로 보더라도 `checklists/story-draft-checklist.md`의 회복 조건에 든다. 행위는 끝났고, 남은 파일이 없으며, 영향받은 값을 PO가 다시 확인했고, 남은 결정이 없다.
- 남는 질문: 방법론의 문장을 이런 산술까지 금지하도록 좁힐지는 방법론 소유자의 일이다. 어떤 단계도 막지 않는다.

## 리드와 기각한 관찰

### 리드

| 리드 | 확인하거나 답할 것 | 묶인 지적 |
| --- | --- | --- |
| Q1 결과가 유한하지 않은 변환 | PM 또는 프로젝트 소유자의 AC 보강이나 해석 결정 | PO1-N1 |
| Q2 기대 값 0의 같은 값 판정 | 프로젝트 소유자의 결정 기록 보강 | PO1-N2 |
| Q3 절대 영도 판정의 엄밀함 | 프로젝트 소유자의 확인 | PO1-N3 |
| Q4 0에 가까운 결과의 정밀도 | 프로젝트 소유자의 확인 | PO1-N4 |
| Q5 `ConversionError`의 `name` | future-work 항목의 트리아지(Dev, PM) | PO1-N5 |
| Q6 수용된 글을 읽은 해석 | PM의 확인 | PO1-N6 |
| Q7 Architecture의 빈 절 | Architect의 Architecture 수정과 PM의 Story 1.3 범위 판단 | PO1-N7 |
| SM이 프로젝트 밖에 쓰지 않았다는 보고 | 이 세션에서 확인할 수 없다. 메인 세션의 사후 점검과 보고 대조가 답한다 | 없음 |

### 기각한 관찰

| 관찰 | 기각한 까닭 |
| --- | --- |
| SM의 `node -p` 사용이 실행 편차이고 Dev Notes의 값을 무효로 한다 | 위 "SM의 `node -p` 사용에 대한 판단". 값 42개가 다시 실행한 결과와 같고 시험의 기대 값은 그 실행에 기대지 않는다 |
| Task 2의 "제품과 테스트의 동작을 바꾸지 않는다"와 "코드 위반이 나오면 코드를 고치고"의 모순 | 구체 사례가 넓은 문장을 좁힌 경우다. `tasks/architecture-align.md` step 2 "Fix a violation in code", step 4 "Repeat affected checks"와 같다 |
| 고칠 문서가 없을 때 SubTask 2.1의 커밋이 꾸민 커밋이 된다 | `tasks/local-task-done.md`의 "unit's tracked records take the unit's subject". `git.storyRecordCommits: true`이므로 기록이 그 제목을 받는다 |
| `(F - 32) * (5 / 9)`를 떨어뜨리는 T-5 행이 D-2의 수학적 역함수를 금지해 구현 선택을 넘는다 | 그 순서는 -459.67 F에서 음수 K를 돌려주거나 거부한다. AC 3과 D-2 "정확히 0 K는 받는다"가 떨어뜨리는 결과이고 Dev Notes가 미리 알린다. `/ 1.8`, `* 5 / 9`, `(F + 459.67) * 5 / 9`는 모두 통과한다 |
| 1.2-UNIT-012가 `units`의 구현을 하나로 정한다 | 복사본과 얼린 배열이 모두 통과한다. 공유 배열만 떨어진다 |
| Z-2의 입력이 표현 오차로 정상 입력을 떨어뜨린다 | 두 입력의 정확한 값이 수학적으로 경계 아래다. T-5의 리터럴은 모두 받는다 |
| P-2의 `psi` 14.503773773021682가 "앞자리"가 아니라 마지막 자리를 반올림한 값이다 | 문장이 덜 정확할 뿐 값의 상대 차이가 2.6e-17이어서 판정이 같고, 정확한 25자리 값도 함께 적혀 있다 |
| 표 1의 값이 한도 1e-12에 걸려 정상 구현을 떨어뜨린다 | 1024조합의 289쌍 모두 통과했다 |

## 미완료 점검

없다. 모든 필수 점검을 이 회차에서 끝냈다.

## Anti-Hallucination

출처 없는 기술 주장, 근거 없는 승인, 꾸며낸 사실은 찾지 못했다. Story의 주장은 위 "사실 주장 대조"로 확인했다. 실측과 다른 문장은 "1.2-INSP-001의 검색은 가져오기 구문의 꼴만 본다"이고 PO1-B1에 묶었다. 부정확한 표현은 PO1-N9이며 비차단이다. SM의 제안은 Story가 수용된 결정이 아니라고 밝혔고 그 표시가 맞다.

## 취합과 승인 전 감사

- 수집: 실행 요청이 이 run의 회차에 추가 검토가 없다는 수집 응답이다(`validate-next-story.md` 섹션 In a run). 합칠 추가 검토는 없다. 필요한 수정 PO1-B1과 계약 안의 비차단 지적은 임시 SM 피드백 문서로 SM에게 돌려보낸다.
- 저장 결과 대조: 저장한 Story의 SM Draft Checklist와 PO Validation을 다시 읽었다. 읽을 때의 Story 사본과 `diff`하니 삭제 0줄, 추가 36줄이고 덩어리는 끝에 더한 PO Validation 하나뿐이다. 계획 본문은 검토한 내용 그대로다. 부모와 설계 입력은 40e1a6b와 같다.
- 판정 줄: `check-stage.sh po-record`가 경로 줄 `PO1-B1 rework SM`, 판정 NO-GO, 회차 1, 수집 complete를 출력하고 종료 상태 0이다.
- 승인 전 감사: 2026-11-06 14:06 +0900, `sh .bmad-core/utils/checks/check-stage.sh approve docs/stories/1.2.story.md`, Status `Draft`, 종료 상태 1, 메시지 "Validation: must be GO, not NO-GO". 판정이 NO-GO이므로 이 메시지가 맞는 결과다. 이 기록을 더한 뒤 같은 명령을 다시 실행한 결과는 PO의 보고에 있다.
- 승인: 하지 않았다. 판정이 NO-GO이므로 Status는 Draft 그대로이고 실행 요청의 단계 `Done`이 허락한 Draft에서 Approved로의 전환은 쓰지 않았다.

## 실행한 명령과 결과

| 명령 | 결과 |
| --- | --- |
| `sh .bmad-core/utils/checks/check-instructions.sh` | 종료 상태 0 |
| `sh .bmad-core/utils/checks/check-stage.sh deps` | 종료 상태 0, `story 1.1 story none`, `story 1.2 story none`, `story 1.3 epic 1.1` |
| `sh .bmad-core/utils/checks/check-stage.sh future --story 1.2` | 종료 상태 0, 출력 없음 |
| `sh .bmad-core/utils/checks/check-stage.sh records docs/stories/1.2.story.md` (PO 기록 전, 뒤) | 종료 상태 0, 출력 없음 |
| `sh .bmad-core/utils/checks/check-stage.sh po-record docs/stories/1.2.story.md` (PO 기록 전, 뒤) | 종료 상태 0. 기록 전에는 출력 없음, 기록 뒤 출력은 위 "판정 줄"과 같다 |
| `sh .bmad-core/utils/checks/check-stage.sh approve docs/stories/1.2.story.md` | 종료 상태 1, 위 "승인 전 감사" |
| `node --test` | 35개 통과, 실패 0 |
| `node ci/screen-rule.check.mjs` | 종료 상태 0 |
| `node --version` | v24.22.1 |
| 임시 영역의 표 점검, 유리수 오라클, 개수 점검, 출처 대조, 검색 표본 스크립트 | 위 "계획 점검", "개수와 추적 재측정", PO1-B1 |
| AC와 D-2의 `diff` | 차이 없음 |
| `lib.sh`의 `BMAD_TEMP_PATTERN` 검색, `invisible-chars.awk`, Story와 `sm-1.md` | 일치 없음 |
| `story-rules.awk` 모드 `status`, `key`, `title`, `tasks` | `Draft`, `1.2`, `단위 변환`, Task 2개 |
| `git status --porcelain --untracked-files=all`, `git diff --stat HEAD`, `git rev-parse HEAD` | 추적 안 된 파일은 Story와 기록 문서뿐, 추적 파일 변경 없음, HEAD 40e1a6b |

## 한계

- 계획 점검은 제품 밖의 참조 평가기로 표의 일관성을 본 것이다. 구현 결과나 시나리오의 실행 결과가 아니며, 그 결과는 Dev의 SubTask에서 처음 생긴다.
- 참조 평가기는 내가 고른 구현 선택의 조합이다. 모든 구현을 뜻하지 않는다.
- `quality` 종류의 본문은 PO의 규칙 종류가 아니어서 읽지 않았다.
- 외부 자료 조사는 하지 않았다. 이 작업은 네트워크를 쓰지 않는다. 이 회차는 새 기술 결정을 내리지 않았고, 제안은 수용된 결정이 아니다. 판정에 쓴 사실은 현재 입력과 실제 실행으로 확인했다.
- 프로젝트 밖의 쓰기 여부는 이 세션에서 확인하지 못했다.
