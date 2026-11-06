# po-r1 — 계산 엔진

- Story: [1.1](../../stories/1.1.story.md)
- Entry: PO 검증 1회, 첫 회차의 전체 검토와 `validate-next-story.md` step 12의 취합
- 작성자와 실제 검토자: PO 하위 세션 Sarah, 모델 `claude-opus-5-5`, effort `max`(둘 다 시스템이 알려 준 값), `*run-story 1.1` run의 역할 작업. 추가 검토자는 없다
- 시각: 2026-11-06, 입력 확인 09:49 +0900, 승인 전 감사 10:01 +0900
- 입력 기준: `main` 862f5fd. Story와 SM 기록은 커밋하지 않은 초안이다

## 범위와 입력

범위는 Story 전체이고 제외한 범주는 없다. SM의 판단을 받아들이지 않고 아래 입력으로 직접 판정했다.

| 입력 | 정체 | 읽은 범위 |
| --- | --- | --- |
| `docs/stories/1.1.story.md` | 커밋하지 않은 초안. PO 기록을 더하기 전 `git hash-object --no-filters` 값 `f5e5add3b3eefd632a60c8d6ce8b2f4e776fca85`, 386줄 | 끝까지 |
| `docs/story-records/1.1/sm-1.md` | 커밋하지 않은 SM 기록, 같은 값 `cebcc3fa02f4cf11127369b3a3a1c03fbe82e9e3` | 끝까지 |
| `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`, `docs/planning/future-work.md` | 862f5fd와 같음(`git diff --stat HEAD` 출력 없음) | 끝까지 |
| 계획 검토 기록 | `docs/prd.md#계획-검토-기록`과 `docs/architecture.md#검토-기록`의 2026-10-29 프로젝트 소유자(시험 운영자) 승인. 대상이 Story의 인용과 같다 | 끝까지 |
| 실행 요청 | 사용자, 2026-11-06 09:11 +0900. Epic 범위와 AC, 의존 줄, Architecture, 결정 기록이 승인된 상태이며 GO면 Approved로 바꾸는 것을 허락한다 | 지시문 전체 |
| SM 질문 Q1 ~ Q7 | SM 보고의 섹션 "질문"과 Story의 비차단 메모 N-1 ~ N-7. 메인 세션의 조사(Q7 영향 없음, Q1 ~ Q6 미답)도 받았으나 그대로 믿지 않고 다시 확인했다 | 끝까지 |

코드와 설정은 `src/number-format.js`, `test/number-format.test.js`, `ci/screen-rule.check.mjs`, `.github/workflows/ci.yml`, `package.json`, `README.md`, `.bmad-core/core-config.yaml`을 끝까지 읽었다. 이 Story가 첫 Story이므로 이전 Story의 기록은 없다.

## 읽은 규칙

`.bmad-core/tasks/load-project-rules.md`의 순서를 따랐고 `check-instructions.sh`는 종료 상태 0이다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문(PO의 규칙 종류 `operations`, `design`, `documentation`): `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`.
- 읽지 않은 본문: `coding-principles`, `comments`, `crap`은 `quality` 종류이고, `javascript-crap`은 Common `crap`과 함께 읽는 섹션이다. Story의 CC-CMT 인용은 `CL-GLD-OPS-001`, `load-project-rules.md`의 문장과 색인으로만 대조했다.
- 끝까지 읽은 절차와 자료: `agents/po.md`, `tasks/validate-next-story.md`, `tasks/validate-loop.md`, `tasks/create-next-story.md`, `tasks/create-next-story-style.md`, `tasks/test-design.md`, `tasks/execute-checklist.md`, `tasks/architecture-align.md`, `checklists/story-draft-checklist.md`, `templates/story-tmpl.yaml`, `data/finding-classification.md`, `data/story-paths.md`, `data/story-slicing.md`, `data/verification-ownership.md`, `data/development-quality.md`, `data/domain-language.md`, `data/future-work-planning.md`, `data/test-levels-framework.md`, `data/test-priorities-matrix.md`, `data/agent-context.md`, `data/terms.md`.
- 일부만 읽은 파일: `tasks/run-story.md`(Next task의 첫 부분, Role sessions, Rounds, Checks after each task, Stop hold and carry on, Final report), `data/workflow-routing.md`(Story temporary material, In a run), `data/local-git-workflow.md`(Branch and commit grouping, Commit messages and evidence, Read-only work, In a run), `tasks/local-task-done.md`(no-change 단위의 커밋 문단), `checklists/comment-hygiene-checklist.md`(§3의 머리), `utils/checks/check-owned.sh`(`role_owns`).

## 범주 결과

| 범주 | 결과 | 근거 |
| --- | --- | --- |
| Project policy checks | PASS | 아래 "Project policy 항목별 근거" |
| 1. Goal & Context Clarity | PASS | Story 문장과 "결과와 범위": "`src/engine.js`가 `evaluate`와 `CalculationError`를 내보내고". PRD Epic 1의 첫 Story이며 Story 1.3과의 방향을 적었다. 저장 줄은 `Depends on: none`이고 Epic 항목, 글 "선행 Story가 없다"와 같다. AC에 다른 Story의 산출물이 없어 선행 관계가 실제로 없음을 확인했다. 비차단 PO1-N10 |
| 2. Technical Implementation Guidance | PASS | "인터페이스와 파일 위치"의 경로와 심볼이 `docs/architecture.md#소스-트리`의 `src/engine.js`, `test/{모듈}.test.js` 행과 맞는다. "기술 제약"의 문장을 Architecture의 "기술 구성"과 "설계 원칙"에 하나씩 대조했고 어긋남이 없다. 환경 변수는 쓰지 않는다. 사용자에게 보이는 동작은 라이브러리 함수뿐이고 `src/`에 내장 도움말이 없다 |
| 3. Reference Effectiveness | PASS | Story가 인용한 제목 7개(`목표`, `Story 1.1: 계산 엔진`, `계획 검토 기록`, `기술 구성`, `소스 트리`, `설계 원칙`, `검토 기록`)가 대상 문서에 있고 앵커 꼴이 맞다. 각 참조에 까닭이 적혀 있다. D-1은 적용, D-2는 영향이 Story 1.2라 미적용이라 적었고 결정 기록의 영향 칸과 같다. `docs/research`는 없다 |
| 4. Self-Containment Assessment | PASS | AC, D-1 원문, 문법과 입력별 기대 결과가 Story 안에 있다. 부모가 지정한 Canonical Implementation Source가 없어 그 항목은 N/A다. D-1의 다섯 내용을 "결정 D-1의 추적"이 SubTask와 시나리오로 잇고, 표 1, 표 2, 표 3이 합격과 거부를 정한다. 해석이 AC의 합격 판정을 바꾸는지는 아래 Q2, Q3에서 따로 판정했고 바꾸지 않는다 |
| 4.5. Comment Contract | PASS | Tasks, Dev Notes, Testing 전체를 읽었다. "Story, Task, AC, 시나리오, 결정의 번호는 코드, 주석, 테스트 이름, 오류 메시지에 넣지 않는다", "AC와 케이스의 대응은 Testing과 기록 문서에 둔다", "IN-FLIGHT 표시는 만들지 않는다". 머리글에 시나리오 목록을 두라는 지시와 새 IN-FLIGHT 지시가 없고, 기존 항목도 없다. 정책 ID는 Dev Notes의 글에만 있다 |
| 5. Testing Guidance | PASS | 수준과 실행 방식은 시나리오 표에, 접근은 Task에 따로 있다. 아래 "계획 점검"과 "개수와 추적 재측정". 비차단 PO1-N8, PO1-N9, PO1-N11 |

### Project policy 항목별 근거

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 새 주석의 언어와 쓸모 | PASS | "새 주석은 영어로 쓴다(CC-CMT-009)", "테스트 이름과 주석은 기존 테스트 파일처럼 영어로 쓴다". `test/number-format.test.js`의 테스트 이름이 영어임을 확인했다. 다른 파일의 언어 예외를 옮기는 지시가 없다 |
| 현재 작업과 사실, 편집 이력 | PASS | Tasks와 기술 제목에 날짜와 회차가 없다. "Draft 때 커밋 862f5fd에서 관찰한 사실"은 관찰임을 밝히고 "Dev는 시작할 때 다시 확인한다"고 적었다. 날짜는 수용 기록의 인용, SM 기록, Change Log에만 있다 |
| PRD 정체성과 승인된 뜻 | PASS | `docs/prd.md`는 862f5fd와 같다 |
| AC 일치 | PASS | PRD의 Story 1.1 항목과 Story AC의 번호 줄을 떼어 `diff`: 차이 없음, 4개. 들여쓴 `Source:` 줄 4개. 부모에 머리글과 표, 하위 항목이 없다. Task 1이 AC 1 ~ 4를 받는다 |
| 위반과 기존 잔여물 구분 | PASS | "주석 위생의 비교 기준은 Story 브랜치가 갈라진 기준 커밋", "바꾸지 않는 파일의 기존 내용은 대상이 아니다" |
| 기존 Story와 QA 기록 | N/A | `git ls-files`에 Story와 QA 기록이 없고 `docs/qa`가 없다 |
| 임시 자료 | PASS | 프로젝트 임시 영역의 목록을 직접 보았다. SM 몫은 보고 파일 하나이며 이어가기 로그의 Story 1.1 섹션에 적혀 있다. 프로젝트 밖의 쓰기는 이 세션에서 확인할 수 없어 리드로 남겼다 |
| Story의 임시 자료 지시 | PASS | "Done까지 필요한 근거를 보존하고, 지우는 일은 병합이 확인된 뒤에 이 Story의 일회용 자료에만 한다". 경로가 없고 `BMAD_TEMP_PATTERN` 검색은 일치 0건이다 |
| 주석 위생 기준 | PASS | 비교 기준, 대상 경로 `src/engine.js`, `test/engine.test.js`, `.bmad-core/checklists/comment-hygiene-checklist.md` §3. 그 절("3. Post-Implementation Check")이 있음을 확인했다 |
| 승인 주장 | PASS | "Epic 1의 Story 1.1, 1.2, 1.3 범위, AC와 의존 줄을 승인한다", "기술 구성, 소스 트리, 설계 원칙을 승인한다"를 원문과 Story 양쪽에서 `grep -F`로 찾았다. D-1 칸의 글이 Story 인용과 한 줄로 일치한다. 주체와 일시가 같고 인접 결정으로 넓히지 않았다 |
| 측정 합계와 소계 | PASS | 아래 "개수와 추적 재측정" |
| 작업 경계 | PASS | 파일은 경로로, 인터페이스는 심볼로 적었다 |
| 출처와 위치 표기 | PASS | 줄 번호나 줄 좌표 꼴의 표기를 찾아 0건이다. 파일과 섹션, 심볼, 설정 키, 테스트 이름으로 적었다 |
| 실행 가능성 주장 | PASS | 속성과 변이 점검을 뺀 까닭이 `testing.propertyCommands`, `testing.mutationCommands`, Architecture의 외부 패키지 금지에 묶여 있고, 설정 값과 `node_modules` 부재를 확인했다 |
| Task 문구 | PASS | SubTask는 심볼, 시나리오, 명령, 커밋 제목만 적고 구현식이 없다. 커밋 제목은 `git.taskCommitPattern`에 맞다 |
| 선택지 비교 표 없음 | PASS | 표 2의 후보 집합은 검증 표이고, N-1의 제안 규칙은 Dev Notes의 글이다 |
| Convention Sections 목록 | PASS | 두 목록의 이름이 모두 색인에 있다. `convention-sections`는 Dev의 규칙 종류와 `testing-tdd`, `javascript-language`이고, `review-sections`는 `quality` 종류와 `javascript-crap`이다 |
| 실행 비용 | PASS | "실행 비용: 설치된 JavaScript 규칙에 이 변경에 닿는 실행 비용 규칙이 없고". `javascript-language` 본문과 PRD, Architecture에 해당 규칙과 성능 기준이 없다 |

## 단계별 결과

| `validate-next-story.md` 단계 | 결과 | 근거 |
| --- | --- | --- |
| 1 Template | PASS | 템플릿의 섹션이 모두 있고 Convention Sections 뒤에 Testing이 온다. PO Validation, Dev Agent Record, QA Results는 제목만 있었다. `{{`, `_TBD_` 검색 0건 |
| 2 File structure | PASS | 새 파일 둘의 경로가 소스 트리와 맞다. 등록할 곳이 없다는 주장은 `package.json`에서 확인했다 |
| 3 UI | N/A | 이 Story에 화면이 없다. 브라우저 화면은 뒤 Epic, `renderScreen`은 Story 1.3이다 |
| 4 AC | PASS | 문구, 순서, 번호 일치. 각 AC의 행동이 시나리오로 이어진다(AC 1: 001, 002, 003, 008, AC 2: 004, 005, AC 3: 003, 006 ~ 009, 011 ~ 013, INSP-003, AC 4: 015, D-1: 003, 004, 008, 010, 011). 값 56행, 오류 60행이 판정 가능하다 |
| 5 Testing | PASS | `testing-tdd`의 접근이 맞다. Task 1은 새 동작이라 TDD, Task 2는 동작을 더하지 않아 `verification-only`다. RED 기준과 뼈대 처리가 Recommended Execution Order에 있고, 기대 값은 손 계산과 IEEE 754 값이다. 테스트 대역은 없다. 시나리오의 수준, 우선순위, 실행 방식은 근거와 맞다 |
| 6 Security | PASS | 해당하는 것은 신뢰할 수 없는 식의 실행 금지다. 1.1-INSP-001과 1.1-INSP-002가 맡는다. 인증, 저장 데이터, 규제 요구는 N/A다 |
| 7 Tasks | PASS | 순서가 논리적이고 Architecture 정렬이 마지막이다. Cleaner와 재점검이 SubTask 1.1 안에 있다. 의존 줄이 글, Epic 항목과 같다. 미결 항목의 판정은 아래 질문별 판정에 있다 |
| 8 Anti-Hallucination | PASS | 아래 "사실 주장 대조"와 "Anti-Hallucination" |
| 9 Dev readiness | PASS | Story와 지정된 출처만으로 구현과 판정이 가능하다. 아래 계획 점검이 이를 실제로 보였다 |

## 계획 점검

SM은 시나리오의 기대 값을 실행하지 않았다고 적었으므로, PO가 직접 확인했다. 프로젝트 임시 영역의 점검 스크립트가 저장한 Story의 표 1과 표 2를 그대로 읽고, 제품 밖의 참조 평가기에 돌렸다. 이것은 계획의 일관성을 본 것이며 구현 결과나 Dev TDD RED가 아니다.

| 측정 | 방법 | 결과 |
| --- | --- | --- |
| 읽은 행 | 표 1의 값 행과 표 2의 오류 행을 규칙별로 세어 Story의 글과 대조 | 값 56행(V-1 7, V-2 3, V-3 5, V-4 5, V-5 5, V-6 13, V-7 5, V-8 9, V-9 2, V-10 2), 오류 60행(E-1 6, E-2 3, E-3 4, E-4 11, E-5 6, E-6 4, E-7 9, E-8 5, E-9 2, E-10 5, E-11 4, E-12 1) |
| Story가 허용한 읽기 | 공백 종류 3, 공백 자리 엄격 여부 2, 0으로 나누기 위치 2, 짝 없는 `(` 위치 2, 끝난 식 위치 2, 읽으며 계산 또는 읽은 뒤 계산 2, 공백만 있는 식의 위치 2, 곱하여 192조합을 표 1, 표 2, 표 3, 1.1-UNIT-012의 판정에 돌림 | 공백 자리를 엄격히 보지 않는 96조합은 모든 행 통과. 엄격한 96조합은 E-11의 "공백 두 개 뒤의 `a`" 한 행에서만 실패(PO1-N9) |
| N-1의 제안 규칙 | 연산자 위치, 짝 없는 `(` 위치, 식 길이, 0을 쓰는 조합 | 실패 0행 |
| 틀린 구현이 잡히는가 | 최종 결과만 유한성 검사, 우선순위 없음, 오른쪽 결합, 공백을 지우고 위치 세기, 1부터 세기, 느슨한 수 변환, `-0`을 0으로 바꿈, 까닭이 모두 같음, 문자열이 아닌 입력을 변환, 위치 없이 식만 되풀이 | 10종 모두 실패 행이 있다. 각 1개 이상의 실패가 Story의 실패 기준과 같은 꼴이다 |
| 숫자와 위치 후보의 겹침 | 표 2 각 행의 식에서 `\d+`로 뽑은 정수를 후보와 비교 | 후보를 든 행은 겹침 0건. `{범위}` 행 가운데 `1 / (1 / B / B)`의 1, `B * 10`의 10, `1 / (B * 10)`의 1과 10이 범위 안이다(PO1-N8) |
| JavaScript 값 | `node`로 V-8, V-9, V-10의 값과 Dev Notes의 수 변환 사례를 실행 | 표와 모두 같다 |

## 개수와 추적 재측정

저장한 Story를 스크립트로 다시 세었다. 첫 실행은 내 스크립트가 Task 줄의 낱말을 제목으로 잘못 잡아 실행 순서 측정에서 멈췄고, Story의 문제가 아니어서 제목 기준으로 고쳐 다시 측정했다. 아래는 다시 측정한 값이다.

| 측정 | 결과 |
| --- | --- |
| 시나리오 행 | 20개, ID 중복 없음, 모든 행 8열, 모든 행에 실패 기준 있음 |
| 수준, 우선순위, 실행 방식 | unit 16, inspection 4. P0 5, P1 12, P2 3. automated 17, agent-review 3 |
| 실행 맵 | 20개, 표의 방식과 어긋남 없음. `user_only`는 비어 있음 |
| 요약 | Test Strategy Overview, `scenarios_total`, `by_level`, `by_priority`, `by_execution`이 측정값과 같다 |
| SubTask와 시나리오 | SubTask 1.1의 범위 표기가 표의 19행과 같고 SubTask 2.1은 1.1-INSP-004 하나다. SubTask 1.1의 결과는 UNIT-001 ~ 016과 INSP-001 ~ 003이, 2.1의 결과는 INSP-004가 덮는다 |
| 시험 지점(seam) | 실행 수준 16행 모두 모듈 인터페이스(`evaluate`, `CalculationError`, `formatNumber`)이고 inspection 4행은 해당 없음이다 |
| 실행 순서 | ID 20개, 중복과 누락 없음. SubTask 경계 안에 있다 |
| 규칙 참조 | V-1 ~ V-10, E-1 ~ E-12의 시나리오 열이 시나리오 행의 글과 맞다. UNIT-001, 002, 005가 E-7, E-8을 더 말하는 것은 다른 시나리오가 맡는다는 안내다 |
| 커밋 제목 | `[story-1.1] Task 1.1: 계산 엔진 구현`, `[story-1.1] Task 2.1: Architecture 정렬`이 패턴에 맞다 |
| 버전 | 설정에 프로젝트 버전 키가 없고 패턴에 `{project_version}`이 없으며 문서에 버전 정책이 없다. 변경 없음이 맞다 |

## 사실 주장 대조

| Story의 주장 | 확인 | 결과 |
| --- | --- | --- |
| `src/number-format.js`의 `export function formatNumber` | 파일을 읽음 | 일치 |
| `test/number-format.test.js`의 "prints negative zero as zero", `formatNumber(-0)`은 `"0"` | 파일을 읽음 | 일치 |
| `Number("")`는 0, `Number("0x55")`는 85, `parseFloat("5.")`는 5 | `node` 실행 | 일치 |
| 최종 결과만 검사하면 `1 / (B * 10)`이 0 | `node` 실행 | 일치 |
| `assert.equal`이 strict 모드에서 `-0`과 `0`을 구별 | `node:assert/strict`로 `-0`, `0` 비교, `ERR_ASSERTION` | 일치 |
| `package.json`에 `main`, `exports` 없음, 버전 0.1.0 | 파일을 읽음 | 일치 |
| `testing.lintCommands`, `testing.propertyCommands`, `testing.mutationCommands`, `quality.crap.commands`가 비어 있음 | `.bmad-core/core-config.yaml` | 일치 |
| `docs/research`, `docs/domain-glossary.md` 없음, `src/`에 내장 도움말 없음 | 목록 | 일치 |
| `ci.yml`이 `node --test`와 `node ci/screen-rule.check.mjs`를 실행하고, 뒤의 점검은 `src/screen.js`가 있을 때만 판정 | 두 파일을 읽고 실행, 종료 상태 0 | 일치 |
| `test/`에 `number-format.test.js`뿐, `node --test` 4개 통과, Node.js v24.22.1 | 목록과 실행 | 일치 |
| 1.1-INSP-001의 `grep` 명령 | 네 표본에 실행. `export function evaluate`, `export class CalculationError`는 종료 1, `eval(x)`, `new Function`은 종료 0 | 의도대로 동작 |
| 요청이 Story 파일이 없을 때의 초안 생성을 승인 | `tasks/run-story.md` 섹션 Next task의 "No Story file: SM drafts the Story" | 절차와 일치. 메인 세션의 SM 지시 원문은 보지 않음 |

## SM 질문과 비차단 메모의 판정

`validate-next-story.md`의 step 0과 섹션 "In a run"대로 각 질문을 리드처럼 확인하고 `data/finding-classification.md`의 결정 순서로 분류했다. 일곱 개 모두 관찰은 확인되었고 비차단이다. 막는 질문이 없어 `pending` 지적은 없다.

`story-slicing.md`의 정의로 보면 Q1, Q3은 계획 결정이다. 표 3의 머리말이 "질문의 답이 오면 SM 수정에서 기대 결과를 하나로 줄인다"고 적었기 때문이다. Q2, Q4, Q5, Q6도 답에 따라 합격 점검이 바뀔 수 있다. 결정 순서는 이런 항목을 step 3의 기준으로 삼지 않고 step 4의 두 읽기로 판정한다(같은 문서의 "This paragraph alone decides a finding about the undecided item itself").

### Q1, SM N-1, PO1-N1: 오류 위치가 어느 글자인가

- 확인: AC 3 "오류 메시지는 까닭과 문제가 된 위치를 담는다", D-1 "오류 위치는 식의 0부터 센 글자 위치다". 세는 법만 정하고 `7 / 0`, `(7 + 8`, `7 +`, 공백 세 개, `B * 10`, `7 / 0 + a`에서 어느 글자인지 정하지 않는다.
- 이 Story의 책임: 그렇다. 표 2의 시나리오가 이 입력을 포함한다.
- 미충족 기준: 없다. "문제가 된 위치"의 경계를 수용된 문서가 값이나 사례로 정하지 않아 그 경계에서는 기준이 아니다.
- 두 읽기: `7 / 0`은 `/`의 2 또는 `0`의 4다. 표 2의 `{2, 4}`가 둘 다 통과시키므로 Task 내용, 순서, 합격 판정이 같고 구현 선택만 다르다. 위치 규칙 조합이 위 계획 점검에서 모두 통과했다.
- 분류: 비차단. 계약 밖이다(새 결정이 필요하다).
- 무엇이 답하는가: 프로젝트 소유자의 결정 기록. 제안: SM의 제안 규칙을 D-1과 같은 해석 결정으로 두되, 문법 오류와 계산 오류가 함께 있는 식(`7 / 0 + a`)에서 어느 쪽이 먼저인지도 함께 정한다. 그 답이 읽으며 계산할지 읽은 뒤 계산할지를 가른다.

### Q2, SM N-2, PO1-N2: AC 3의 목록에 없는 문법 오류

- 확인: AC 3의 목록은 `* 7`, `7 8`, `7(8)`, `()`, `7 +`, `-`를 이름으로 들지 않는다.
- 이 Story의 책임: 그렇다. 표 2의 E-7, E-8이 이 입력을 포함한다.
- 미충족 기준: 없다. AC 1은 "수, `+` `-` `*` `/`, 괄호로 된 식의 값"만 말하므로 이 입력에 값을 요구하는 수용 문장이 없다. Story는 이 입력을 `CalculationError`로 고정하고 다른 읽기를 허용하지 않으므로 Dev에게 열린 선택이 아니다. AC 1 ~ 4가 이름으로 든 입력의 합격 판정도 바뀌지 않는다.
- 직접 확인한 근거: D-1은 `.5`, `5.`, `1e3`, 단항 `+`를 받지 않는다고 정한다. `.`와 `+`는 다른 자리에서는 받는 글자이므로, AC 3의 "받지 않는 글자"는 이미 자리를 따져 읽힌다. E-7은 이 읽기의 범위 안이다. E-8(`7 +`)은 글자가 없어 그 범위를 조금 넘지만, 거부 자체는 `test-design.md`의 "reject unsupported input", CC-JS-004, CC-JS-006이 요구하고, 오류 클래스는 `docs/architecture.md#소스-트리`가 이 모듈에 둔 하나뿐이다. PRD Story 1.3 AC 2("다른 오류는 그대로 던진다")와도 이 읽기가 맞는다. 수용된 AC, Architecture, 규칙 안의 선택이다.
- 분류: 비차단. AC나 결정에 적는 일은 계약 밖이고, Story의 계획은 그대로 둔다.
- 무엇이 답하는가: PM의 AC 보강이나 해석 결정 기록. 제안: D-1처럼 "AC 문구를 바꾸지 않는 해석 결정"으로 "문법에 맞지 않는 식은 `CalculationError`"를 적는다.

### Q3, SM N-3, PO1-N3: 공백의 종류와 자리, 숫자의 범위

- 확인: AC 2는 "수와 연산자 사이의 공백"만 말한다. 탭, 줄바꿈, U+00A0, 식 앞뒤, 괄호 안쪽, 단항 마이너스와 `(` 사이는 정하지 않는다. D-1의 "숫자"에 ASCII라는 말이 없다.
- 미충족 기준: 없다. "공백"의 경계를 수용된 문서가 정하지 않았다.
- 두 읽기(공백): `1\t+ 2`, `( 1 + 2 )`, `- (2 + 1)`은 값 또는 `CalculationError`다. 표 3이 둘 다 받으므로 합격 판정이 같고 구현 선택만 다르다. 다만 E-11의 한 행은 표 3의 거부 쪽 읽기를 좁힌다(PO1-N9).
- 숫자: Story가 ASCII로 고정했고(E-4의 U+FF11), 수용된 문장과 충돌하지 않는다.
- 분류: 비차단. 계약 밖이다(새 결정이 필요하다).
- 무엇이 답하는가: PM. 제안: SM의 제안과 같이 공백은 U+0020, `\t`, `\n`, `\r`로 하고 토큰 사이와 식 앞뒤에서 무시하며 수 안에서는 무시하지 않는다. 숫자는 ASCII `0` ~ `9`만이다.

### Q4, SM N-4, PO1-N4: 문자열이 아닌 입력

- 확인: `evaluate(42)`, `evaluate(null)`, `evaluate()`, `evaluate(["1"])`를 수용된 문서가 정하지 않는다. D-2의 "값이 number 형이 아니거나"는 영향이 Story 1.2다.
- 두 읽기: `CalculationError` 또는 다른 `Error`(예: `TypeError`)다. 1.1-UNIT-014가 둘 다 받으므로 합격 판정이 같다. 값을 돌려주는 구현은 CC-JS-004의 점검으로 실패하고, 계획 점검의 변환 구현도 실패했다.
- 분류: 비차단. 계약 밖이다.
- 무엇이 답하는가: PM. 제안: D-2와 같은 방향으로 `CalculationError`, 위치 0.

### Q5, SM N-5, PO1-N5: 오류 메시지의 언어와 꼴

- 확인: AC 3은 까닭과 위치만 말한다. PRD Story 1.3 AC 2가 `오류: {메시지}`로 보여 주고, 기존 `formatNumber`의 `RangeError` 메시지는 영어다.
- 두 읽기: 한국어 또는 영어다. 1.1-UNIT-012와 1.1-INSP-003이 둘 다 받으므로 합격 판정이 같다.
- 분류: 비차단. 계약 밖이다.
- 무엇이 답하는가: PM. 제안: 사용자에게 보이는 글이므로 한국어로 하고 꼴은 고정하지 않는다. Story 1.3 초안 전이면 충분하다.

### Q6, SM N-6, PO1-N6: 아주 깊은 중첩

- 확인: 재귀로 만든 작은 평가기에 괄호와 단항 마이너스를 100000겹 주면 `RangeError`다. 수용된 문서에 한도가 없다.
- 미충족 기준과 실패: 없다. 이 입력 종류는 계약에 이름이 없고 재귀는 구현 선택이다. 결정 순서 step 4는 이름 없는 입력과 구현 선택을 가정하지 않는다.
- 분류: 비차단. 이 입력의 검증을 더하면 범위가 넓어지므로 계약 밖이다.
- 무엇이 답하는가: PM. 제안: 숫자 한도를 정하지 말고 "처리할 수 없는 깊이면 `CalculationError`"를 해석 결정이나 AC 보강으로 적고, 시험은 값 또는 `CalculationError`를 받는 꼴로 둔다.

### Q7, SM N-7, PO1-N7: CI 규칙이 계획 문서에 없음

- 확인: `ci/screen-rule.check.mjs`는 `existsSync(SCREEN_MODULE)`일 때만 판정한다. `src/`에 `number-format.js`만 있고 실행 결과는 종료 상태 0이다. `SCREEN_WIDTH`는 `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`에 없다. Architecture에 코딩 표준 절과 Change Log 절이 없다. 메인 세션의 조사와 같은 결론이다.
- 이 Story의 책임: 아니다. 이 Story는 `src/screen.js`를 만들지 않고, 이 점검은 Story가 이름을 든 필수 점검이 아니다.
- 분류: 범위 밖 비차단. 계약 밖이다.
- 무엇이 답하는가: Architect(코딩 표준 절과 Change Log 절), PM(Story 1.3 범위). 제안: SM과 같다. Story 1.1의 어떤 단계도 막지 않고, Story 1.3 초안 전에 답이 필요하다.

## PO가 새로 낸 비차단 지적

### PO1-N8: 위치 판정 방법의 문장과 `{범위}` 행

- 관찰: "식을 메시지에 되풀이해도 판정이 흔들리지 않도록, 식에 든 숫자가 후보 위치와 겹치지 않게 입력을 골랐다." `sm-1.md`도 "겹침 없음"이라 적었다. 그러나 E-1 `1 / (1 / B / B)`의 1, E-10 `B * 10`의 10, `1 / (B * 10)`의 1과 10은 `{범위}` 안의 정수다. 위치 없이 식만 되풀이하는 메시지가 이 세 행을 통과한다.
- 결정 순서: 이 문장은 Story 자신의 계획에 대한 말이라 현재 내용의 서술이 아니다. 같은 입력에 다른 결과를 정하지 않으므로 모순도 아니다. 같은 구현은 60행 가운데 57행에서 실패하고, 1.1-UNIT-010 안의 `A`, `B + B`, `-B - B`도 잡는다. 틀린 작업이 어떤 행을 통과할 가능성은 step 3의 기준 없이는 막지 않는다.
- 분류: 비차단. 시나리오를 더 구체화하는 일이라 계약 안이다.
- 수정안: 세 행의 작은 수를 식 길이보다 큰 수로 바꾸거나(세 식의 길이는 각각 631, 314, 320이다), 문장을 후보를 든 행으로 한정한다. 시점은 SM의 다음 수정이며, 없으면 Dev가 고정 입력을 고를 때다.

### PO1-N9: 공백 자리의 서술과 E-11의 한 행

- 관찰: "U+0020 스페이스는 수와 연산자 사이에서 무시한다. 다른 글자와 다른 자리의 공백은 아래 표 3이 다룬다." V-3의 `(2 + 3) * 4`, `2 * (3 + 4)`와 AC 2의 `2 * -3`은 괄호 옆과 연산자 사이의 공백을 값으로 요구하는데 표 3에 없다. 또 표 3의 "`1 + 2`의 앞뒤에 공백"은 `CalculationError`도 받지만, E-11의 "공백 두 개 뒤의 `a` {2}"는 식 앞 공백을 오류로 보고 0을 알리는 구현을 떨어뜨린다. 계획 점검에서 엄격한 96조합이 이 한 행에서만 실패했다.
- 결정 순서: 두 문장의 입력이 달라 같은 입력에 다른 결과를 정하지 않는다. 표의 구체 사례가 넓은 문장을 좁히는 경우다. 표 3은 허용일 뿐이어서 구현 선택이 남고, 식 앞 공백을 무시하는 구현은 모든 행을 통과한다.
- 분류: 비차단. 계약 안이다.
- 수정안: 문장을 "표 1에 없는 자리"로 좁히고, E-11 첫 행을 앞 공백이 없는 식으로 바꾼다. 공백을 지우고 세는 실패는 `7 +  a`가 그대로 잡는다. 시점은 SM의 다음 수정이며, N-3의 답이 오면 함께 해소된다.

### PO1-N10: "미결 계획 결정: 없다"의 표현

- 관찰: Scope and Dependencies "미결 계획 결정: 없다. Task의 내용과 순서, 합격 점검을 바꾸는 미결 항목은 없다." 표 3 머리말 "질문의 답이 오면 SM 수정에서 기대 결과를 하나로 줄인다." 답이 합격 점검을 바꾸므로 `story-slicing.md`의 정의로는 계획 결정이 남아 있다.
- 결정 순서: 같은 문단이 "허용 범위로 두었다"고 잇고 있어 현재 계획의 합격 판정에는 어긋남이 없다. 비차단이라는 결론은 같고 분류의 낱말만 부정확하다.
- 분류: 비차단. 계약 안이다.
- 수정안: "계획 결정 N-1, N-3이 남아 있으나 두 읽기의 합격 판정이 같아 막지 않는다"로 고친다. 시점은 SM의 다음 수정이다.

### PO1-N11: 조각 순서와 우선순위

- 관찰: `tasks/test-design.md` "Order by priority within the eligible work". Recommended Execution Order는 001(P0), 002(P0), 015(P0), 013(P1), 003(P1), 004(P0), 005, 008, 007, 009(P1), 006(P0) 순이다. 오류 꼴을 정하는 013 뒤에는 P0인 004와 006을 먼저 할 수 있다.
- 결정 순서: 같은 SubTask 안의 권고 순서이고 합격 판정이 같다. `data/verification-ownership.md`는 Dev가 계획 수정 없이 조각 순서를 바꾸도록 허용한다.
- 분류: 비차단. 계약 안이며 값어치는 낮다.
- 수정안: 004와 006을 013 바로 뒤로 옮긴다. 시점은 SM의 다음 수정 또는 Dev의 SubTask 1.1이다.

## 리드와 기각한 관찰

### 리드

| 리드 | 확인하거나 답할 것 | 묶인 지적 |
| --- | --- | --- |
| Q1 오류 위치의 글자 | 프로젝트 소유자의 결정 기록 | PO1-N1 |
| Q2 목록 밖 문법 오류 | PM의 AC 보강이나 해석 결정 | PO1-N2 |
| Q3 공백과 숫자 | PM의 해석 결정 | PO1-N3 |
| Q4 문자열이 아닌 입력 | PM의 해석 결정 | PO1-N4 |
| Q5 메시지의 언어와 꼴 | PM의 결정 | PO1-N5 |
| Q6 깊은 중첩 | PM의 AC 보강이나 해석 결정 | PO1-N6 |
| Q7 CI 규칙과 Architecture의 빈 절 | Architect의 Architecture 수정과 PM의 Story 1.3 범위 판단 | PO1-N7 |
| SM이 프로젝트 밖에 쓰지 않았다는 보고 | 이 세션에서 확인할 수 없다. 메인 세션의 사후 점검과 보고 대조가 답한다 | 없음 |

### 기각한 관찰

| 관찰 | 기각한 까닭 |
| --- | --- |
| Task 2의 "제품과 테스트의 동작을 바꾸지 않는다"와 "코드 위반이 나오면 코드를 고치고"의 모순 | 구체 사례가 넓은 문장을 좁힌 경우다. `tasks/architecture-align.md` step 2 "Fix a violation in code", step 4 "Repeat affected checks"와 같고, 코드를 바꾸면 `development-quality.md`의 Cleaner 조건이 그대로 적용된다 |
| 고칠 문서가 없을 때 SubTask 2.1의 커밋이 꾸민 커밋이 된다 | `tasks/local-task-done.md`: "the unit's tracked records take the unit's subject under `git.taskCommitPattern`". `git.storyRecordCommits: true`이므로 기록이 그 제목을 받는다 |
| `-0`을 돌려주라는 기대가 AC 4를 넘는다 | AC 4 "배정밀도 수 그대로"의 범위다. `node`에서 `0 * -1`과 `-(0)`이 `-0`이고, Dev Notes가 이를 적었으며 `formatNumber(-0)`은 이미 `"0"`이다 |
| `A`의 넘침이 D-1의 "계산 중의 값"이 아니다 | 수 글자의 값을 구하는 일도 계산 안이고 값이 유한하지 않게 된다. `Infinity`를 돌려주면 `formatNumber`가 `RangeError`를 던져 PRD Story 1.3 AC 2의 흐름도 어긋난다 |
| `0x55`, `7_000`, `5.`, `7. 5`의 후보가 하나뿐이라 구현을 지나치게 묶는다 | Story가 고정한 값이고 "받지 않는 글자"의 위치와 맞다. 192조합의 어느 위치 규칙도 이 행에서 실패하지 않았다 |
| 1.1-UNIT-012가 까닭을 서로 다르게 요구해 AC를 넘는다 | 다섯 대표식은 AC 3과 D-1이 든 서로 다른 까닭이다. 낱말은 고정하지 않는다 |

## 미완료 점검

없다. 모든 필수 점검을 이 회차에서 끝냈다.

## Anti-Hallucination

출처 없는 기술 주장, 근거 없는 승인, 꾸며낸 사실은 찾지 못했다. Story의 주장은 위 "사실 주장 대조"로 확인했다. 부정확한 문장은 PO1-N8(겹침 없음)과 PO1-N10(미결 계획 결정 없음)이며 비차단으로 분류했다. SM이 조사하지 않은 항목의 제안은 Story가 수용된 결정이 아니라고 밝혔고, 그 표시가 맞다.

## 취합과 승인 전 감사

- 수집: 실행 요청이 이 run의 회차에 추가 검토가 없다는 수집 응답이다(`validate-next-story.md` 섹션 In a run). 합칠 추가 검토는 없다. 필요한 수정이 없어 SM 수정은 시작되지 않고, 비차단 지적은 임시 SM 피드백 문서로 넘겼다.
- 저장 결과 대조: 저장한 Story의 SM Draft Checklist와 PO Validation을 다시 읽었다. 읽을 때의 Story 사본과 `diff`하니 삭제 0줄, 추가 31줄이고 덩어리는 PO Validation 안의 하나뿐이다. 계획 본문은 검토한 내용 그대로다. AC `diff` 차이 없음, 부모와 설계 입력은 862f5fd와 같다.
- 판정 줄: `check-stage.sh po-record`가 GO, 1, complete를 출력하고 종료 상태 0이다. 경로 줄과 미완료 줄은 없다.
- 승인 전 감사: 2026-11-06 10:01 +0900, `sh .bmad-core/utils/checks/check-stage.sh approve docs/stories/1.1.story.md`, Status `Draft`, 종료 상태 0, 출력 없음. 이 기록을 더한 뒤 같은 명령을 다시 실행한 결과는 PO의 보고에 있다.
- 평가한 범위: Story 전체에 대한 전체 검토이며 모든 범주가 PASS 또는 근거 있는 N/A다. 승인 근거는 Story에 저장한 실행 요청 줄의 단계 `through Merged`다.

## 실행한 명령과 결과

| 명령 | 결과 |
| --- | --- |
| `sh .bmad-core/utils/checks/check-instructions.sh` | 종료 상태 0 |
| `sh .bmad-core/utils/checks/check-stage.sh deps` | 종료 상태 0, `story 1.1 story none`, `story 1.2 epic none`, `story 1.3 epic 1.1` |
| `sh .bmad-core/utils/checks/check-stage.sh records docs/stories/1.1.story.md` (PO 기록 전, 뒤) | 종료 상태 0, 출력 없음 |
| `sh .bmad-core/utils/checks/check-stage.sh po-record docs/stories/1.1.story.md` (PO 기록 전, 뒤) | 종료 상태 0. 기록 뒤 출력은 위와 같다 |
| `sh .bmad-core/utils/checks/check-stage.sh future --story 1.1` | 종료 상태 0, 알림 `결과 복사: Revisit: 2026-10-15 has come; PO triages the entry again`. 재분류는 이 검증의 범위 밖이며 메인 세션이 이미 기록했다 |
| `node --test` | 4개 통과, 실패 0 |
| `node ci/screen-rule.check.mjs` | 종료 상태 0 |
| `node --version` | v24.22.1 |
| 임시 영역의 표 점검 스크립트와 개수 점검 스크립트 | 위 "계획 점검", "개수와 추적 재측정" |
| `lib.sh`의 `BMAD_TEMP_PATTERN` 검색, Story와 `sm-1.md`, `po-r1.md` | 일치 0건 |
| `invisible-chars.awk`, Story와 `sm-1.md`, `po-r1.md` | 일치 없음 |
| `git status --porcelain --untracked-files=all`, `git diff --stat HEAD`, `git rev-parse HEAD` | 추적 안 된 파일은 Story와 기록 문서뿐, 추적 파일 변경 없음, HEAD 862f5fd |

## 한계

- 계획 점검은 제품 밖의 참조 평가기로 표의 일관성을 본 것이다. 구현 결과나 시나리오의 실행 결과가 아니며, 그 결과는 Dev의 SubTask에서 처음 생긴다.
- `quality` 종류의 본문은 PO의 규칙 종류가 아니어서 읽지 않았다.
- 외부 자료 조사는 하지 않았다. 네트워크는 모델 호출에만 쓰라는 run의 경계 때문이다. 이 회차는 새 기술 결정을 내리지 않았고, 제안은 수용된 결정이 아니다. 판정에 쓴 사실은 현재 입력과 실제 실행으로 확인했다.
- 프로젝트 밖의 쓰기 여부는 이 세션에서 확인하지 못했다.
