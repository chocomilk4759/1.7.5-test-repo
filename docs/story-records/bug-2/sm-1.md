# sm-1 — 아주 깊은 중첩을 계산 오류로 돌려주기

- Story: [bug-2](../../stories/bug/bug-2.story.md)
- Entry: SM Draft Checklist 1회
- 작성자와 실제 검토자: SM 하위 세션 Bob, 모델 `claude-opus-5-5`, `*run-story bug-2 remote to Done` run의 역할 작업
- 시각: 2026-11-07, 입력 확인 00:50 +0900, 초안 저장과 재측정 00:55 +0900 이후
- 입력 기준: `main` 21a78f7. 로컬의 `origin/main`과 같고 fetch하지 않았다. Story와 이 기록은 커밋하지 않은 초안이다.
- 범위: Story 전체. 실행한 체크리스트는 `.bmad-core/checklists/story-draft-checklist.md`이고, 이 호출에서 한 번 실행했다. 절차는 SM `*draft-standalone 아주 깊은 중첩`이다(`.bmad-core/tasks/brownfield-create-story.md`, `.bmad-core/tasks/create-next-story.md`의 Typed source).

## 범주 결과

| 범주 | 결과 | 근거 |
| --- | --- | --- |
| Project policy checks | PASS | 아래 "Project policy 항목별 근거" |
| 1. Goal & Context Clarity | PASS | Story 문장과 "결과와 범위": "처리할 수 없는 깊이로 중첩된 식의 결과가 `RangeError`에서 `CalculationError`로 바뀌는 것이다". 이 Story는 Epic이 없어 Epic에 관한 항목은 식별된 출처(원천 항목과 사용자의 결정)로 판정했다. 의존은 저장 줄 하나로 있고 표가 선행과 까닭, 근거를 든다. 값어치는 사용자의 말을 인용했다 |
| 2. Technical Implementation Guidance | PASS | Dev Notes "인터페이스와 파일 위치"가 경로와 심볼을 표로 들고 "설계"가 구현 조건을 적는다. Architecture 본문을 끝까지 읽었다(아래 "설계 입력 읽기"). 환경 변수는 쓰지 않는다. 사용자에게 보이는 동작이 라이브러리 함수뿐이라 문서 대조 대상을 `docs/architecture.md`, `README.md`로 적었고, 내장 도움말이 없음을 `src/` 목록으로 확인했다 |
| 3. Reference Effectiveness | PASS | 참조는 `docs/architecture.md#설계-원칙`, `docs/prd.md#story-13-계산기-화면`처럼 섹션을 가리키고, 앞선 기록은 파일과 섹션 이름을 든다. Story 1.1, 1.3의 기록은 "이전 Story"에 요약했다. D-1, D-2의 적용 범위를 적었다. `docs/research`는 없다. 지운 항목의 내용은 Story에 옮겼고 커밋 21a78f7로 찾을 수 있다 |
| 4. Self-Containment Assessment | PASS | 기대와 실제 동작, 재현, 어긋나는 기대, 측정 표, 사용자의 결정 원문이 Story에 있다. 입력별 기대 결과가 Testing에 있다. 부모가 미리 정하라고 한 매개변수는 없다. 사용자의 결정을 "추적" 표에서 SubTask와 시나리오로 이었다. 합격 판정을 바꾸는 해석은 아래 "해석과 합격 판정"에서 따로 판정했다. Canonical Implementation Source: 지정한 절이 없어 N/A |
| 4.5. Comment Contract | PASS | Tasks, Dev Notes, Testing을 읽었다. Dev Notes: "Story, Task, AC, 시나리오, 표의 행, 결정의 번호는 코드, 주석, 시험 이름, 오류 메시지에 넣지 않는다", "IN-FLIGHT 표시는 만들지 않는다". 새 IN-FLIGHT 지시와 기존 항목은 없다. 정책 ID는 Dev Notes의 글에만 있고 코드에 옮기라는 지시가 없다. 머리글에 시나리오 목록을 두라는 지시도 없다 |
| 5. Testing Guidance | PASS | 수준과 실행 방식은 시나리오 표에, 접근은 Task에 따로 있다. 시나리오마다 시험 지점을 적었고 대역이 없다. 비교와 분류는 표 1 ~ 4와 "판정 방법"이 받는 입력, 다른 결과, 거부를 든다. 아래 "개수와 추적 재확인" |

## Project policy 항목별 근거

| 항목 | 결과 | 근거 |
| --- | --- | --- |
| 새 주석의 언어와 쓸모 | PASS | Dev Notes "새 주석은 영어로 쓰고, 왜 `RangeError`를 잡는지처럼 코드만으로 드러나지 않는 까닭을 적는다(CC-CMT-009)" |
| 현재 작업과 사실, 편집 이력 없음 | PASS | Tasks와 제목에 날짜나 회차가 없다. "결함의 사실"은 "앞선 기록의 측정이고 이 Draft에서 다시 재지 않았다"고 밝혔고, Testing의 "Draft 때 관찰한 사실"은 Dev가 다시 확인한다. 날짜는 수용 기록의 인용, SM 기록, Change Log에만 있다 |
| PRD 정체성과 승인된 뜻 | PASS | `docs/prd.md`를 바꾸지 않았고 Story가 바꾸지 말라고 적는다 |
| AC와 출처 | PASS | 부모 AC가 없는 유형 Story다. AC 5개는 모두 고쳐진 동작과 "확인 조건:"을 적고(`create-next-story.md`의 "Each defect AC states the corrected behavior and the condition under which it is checked"), 들여쓴 `Source:` 줄이 5개다. 회귀와 호환 기준은 번호 없이 따로 적었고 출처를 들었다. 인용한 사용자의 말은 커밋 2c44760의 메시지와 글자까지 대조했다 |
| 위반과 기존 잔여물 구분 | PASS | Dev Notes의 주석 위생 항목이 비교 기준과 대상을 정하고 바뀌지 않은 줄을 뺀다 |
| 기존 Story와 QA 기록 | PASS | Story 1.1, 1.3과 gate를 읽기만 했고, Story가 "병합된 Story 1.1, 1.3의 파일과 기록은 고치지 않는다"고 적는다 |
| 임시 자료 | PASS | 이 호출에서 만든 임시 자료는 계획 커밋의 메시지 파일 하나이고, 프로젝트 임시 영역의 커밋 메시지 위치에 두고 이어가기 로그의 Story bug-2 섹션에 적었다. 메인 세션이 지정한 보고 파일은 그 세션의 실행 재료여서 내 임시 자료로 적지 않았다. Story의 점검은 중간 파일 없이 파이프와 프로세스 치환으로 했다 |
| Story의 임시 자료 지시 | PASS | Dev Notes: "임시 자료는 프로젝트 임시 파일 정책(CL-GLD-OPS-008)을 따른다. Done까지 필요한 근거를 보존하고, 지우는 일은 병합이 확인된 뒤에". 경로를 적지 않았다 |
| 주석 위생 기준 | PASS | Dev Notes: 비교 기준은 Story 시작의 기준선 HEAD, 대상은 세 파일의 바뀐 줄, 문맥 검토는 `.bmad-core/checklists/comment-hygiene-checklist.md` §3. 그 절("3. Post-Implementation Check")이 있음을 확인했다 |
| 승인 주장 | PASS | 결정자를 항목마다 적었다. 깊은 중첩의 결과는 사용자(2c44760), 다른 항목은 사용자(21a78f7), 실행 요청은 사용자, PRD와 Architecture의 승인은 각 검토 기록의 주체다. 사용자의 결정을 위치 규칙이나 메시지 언어로 넓히지 않았다 |
| 측정 합계와 소계 | PASS | 아래 "개수와 추적 재확인" |
| 작업 경계 | PASS | 파일은 경로로, 공개 인터페이스는 심볼로 적었다. "바꾸지 않음" 행이 경로를 모두 든다 |
| 출처와 위치 표기 | PASS | 파일과 섹션, 심볼, 설정 키, 시험 이름으로 적었고 줄 번호를 쓰지 않았다 |
| 실행 가능성 주장 | PASS | 스택 넘침의 모습을 Node.js v24.22.1의 관찰로 한정하고 다른 런타임을 확인하지 않았다고 적었다(N-5). 속성과 변이 점검을 계획하지 않은 까닭을 `testing.propertyCommands`, `testing.mutationCommands`, Architecture의 외부 패키지 금지에 묶었다 |
| Task 문구 | PASS | SubTask는 심볼과 시나리오, 명령, 커밋 제목만 적고 구현식이 없다. 구현 조건은 Dev Notes에 있다 |
| 선택지 비교 표 없음 | PASS | 설계의 다른 길은 "설계"의 글로 적었다. 표 3의 받는 결과는 검증 표다 |
| Convention Sections 목록 | PASS | `convention-sections`는 Dev가 읽는 종류와 `testing-tdd`, `javascript-language`이고, `review-sections`는 `quality` 종류의 세 섹션과 그 `crap`과 함께 읽는 `javascript-crap`이다. 모두 두 색인에 있다. 선언이 곧 읽었다는 증거는 아니므로 내가 읽은 본문은 아래에 따로 적었다 |
| 실행 비용 | PASS | Dev Notes에 적용 범위 판단을 적었다: `javascript-language`에 닿는 규칙이 없고 요구사항에 성능 기준이 없다 |

## 유형 Story의 조건

| 조건 | 판정 | 근거 |
| --- | --- | --- |
| 키와 경로 | 맞음 | `git for-each-ref`의 `refs/heads/main`, `refs/remotes/origin/HEAD`, `refs/remotes/origin/main`에서 `docs/stories` 아래 폴더의 파일은 `docs/stories/tech-debt/tech-debt-1.story.md`뿐이다. 작업 트리도 같다. `Closed items`는 없다. 다음 번호 2, 키 `bug-2`, 경로 `docs/stories/bug/bug-2.story.md`는 지시와 같고 쓰기 전에 파일과 폴더가 없었다 |
| 중복 | 없음 | 파일의 항목에서 `깊은 중첩`, `RangeError`를 찾으면 이 항목뿐이다. 다른 항목의 `RangeError`는 없다. 유형 Story는 씨앗 하나다 |
| `[Bug]` 출처의 요소 | 모두 있음 | 기대와 실제 동작, 재현, 어긋나는 기대를 "결함의 사실"에 적었다 |
| 항목 제거 | 계획 커밋이 한다 | `git diff`는 `docs/planning/future-work.md`에서 19줄을 지우고 더한 줄이 없다. 이 항목을 가리키는 Markdown 링크와 파일의 앵커가 없어 `Closed items` 줄을 만들지 않는다. 다른 항목의 글에 이 항목의 이름이 없다 |

## 설계 입력 읽기

`docs/architecture.md`는 "기술 구성", "소스 트리", "설계 원칙", "검토 기록"까지 끝까지 읽었다. 저장한 Tasks와 Testing이 닿는 절은 앞의 세 절이고 모두 읽은 범위에 든다. 입출력 없는 순수 함수의 변경이어서 API, 데이터베이스, 브라우저 화면 주제는 Architecture에도 없고 해당하지 않는다. `docs/prd.md`, `docs/planning/decisions.md`, `docs/planning/future-work.md`, `src/engine.js`, `src/screen.js`, `src/number-format.js`, `test/engine.test.js`, `test/screen.test.js`, `.github/workflows/ci.yml`, `ci/screen-rule.check.mjs`, `package.json`, `README.md`도 끝까지 읽었다.

앞선 Story의 읽은 범위는 다음과 같다. `docs/stories/1.3.story.md`는 Status부터 Dev Agent Record의 처리 줄까지 읽었고 QA Results는 저장 줄만 읽었다. `docs/story-records/1.3/sm-1.md`는 끝까지, `docs/story-records/1.3/sm-2.md`는 앞부분을 읽었다. `docs/stories/1.1.story.md`는 Dev Notes의 앞부분과 Completion Notes의 앞부분, 낱말로 찾은 줄을 읽었다. `docs/story-records/1.1/po-r1.md`, `docs/story-records/1.3/po-r1.md`는 섹션 Q6과 그 다음 절의 앞을, `docs/story-records/1.1/qa-r1.md`, `docs/story-records/1.3/qa-r1.md`, `docs/qa/gates/1.1.yml`, `docs/qa/gates/1.2.yml`, `docs/qa/gates/1.3.yml`은 낱말 `깊은 중첩`, `RangeError`, `monitor`로 찾은 줄과 그 주변을 읽었다. `docs/stories/tech-debt/tech-debt-1.story.md`는 끝까지 읽었다. 메인 세션이 넘긴 읽기 전용 PO 보고도 읽었고, 의존 줄은 그 보고를 받아 적지 않고 `.bmad-core/data/story-slicing.md`의 기준으로 가렸다.

규칙은 `.bmad-core/tasks/load-project-rules.md`대로 읽었다.

- 끝까지 읽은 Hub와 색인: `docs/conventions/Common/CODING_CONVENTION.md`, `docs/conventions/Common/section-index.yaml`, `docs/conventions/JavaScript/README.md`, `docs/conventions/JavaScript/section-index.yaml`.
- 끝까지 읽은 본문: `golden-rules`, `documentation`, `testing-tdd`, `javascript-language`, `javascript-crap`.
- 읽지 않은 본문: `coding-principles`, `comments`, `crap`. SM의 규칙 종류가 아니다. Cleaner 검토와 QA가 적용한다. Story가 인용한 CC-CMT-009, CC-CMT-018은 `.bmad-core/tasks/code-comment-style.md`와 `.bmad-core/tasks/create-next-story.md`의 글로, CC-CMT-010은 `docs/planning/future-work.md`의 인용으로 보았고 본문을 대조하지 않았다.
- 외부 자료는 조사하지 않았다. 호출의 네트워크 조건이 모델 호출과 이 저장소의 원격으로 한정하고, `.bmad-core/tasks/create-next-story.md` 섹션 In a run이 기술 결정을 조사 대신 보고로 넘긴다. 근거는 이 저장소의 관찰과 앞선 기록이다.

## 해석과 합격 판정

| 항목 | 두 읽기와 각각의 판정 | Story의 처리 |
| --- | --- | --- |
| `D`의 결과 | 읽기 ㄱ(`CalculationError`만): 재귀를 유지한 구현이 통과하고 반복문으로 다시 쓴 구현은 실패한다. 읽기 ㄴ(값도 받음, 항목의 "값 또는 그 결과"): 둘 다 통과한다 | 항목의 재현 입력은 AC 1이 고쳐진 동작으로 정하고, 두 결과를 받는 꼴은 넘치는 깊이가 환경에 달린 표 3에 둔다. 재귀 유지는 SM의 설계이고 "설계"에 까닭을 적었다. 사용자의 결정("처리할 수 없는 깊이면")과 수용된 Architecture를 바꾸지 않는다 |
| 메시지가 호출마다 같은가 | 읽기 ㄱ(같아야 함): 넘친 순간의 커서를 쓰는 구현이 실패한다. 읽기 ㄴ(위치면 충분): 그 구현이 통과한다 | 출처 항목은 말하지 않는다. `docs/architecture.md#설계-원칙`의 "공개 함수는 순수 함수로 두고"와 Story 1.3의 판정 방법(오류 줄은 같은 입력의 `evaluate` 메시지로 만든다)을 근거로 ㄱ로 적었다. ㄴ이면 그 판정 방법을 쓸 수 없다. `renderScreen` 안의 `evaluate` 호출은 시험 안의 호출보다 한 단 깊기 때문이다 |
| 깊이 1000의 값 | 값을 요구하지 않으면 낮은 숫자 한도의 구현이 통과해 "숫자 한도 없이"와 어긋난다 | 표 2가 값으로 고정한다. 1000은 측정한 통과 깊이 아래에서 고른 입력이고 한도가 아니라고 적었다. 그 위의 한도는 bug-2-INSP-001의 읽기가 본다 |
| N-1 위치, N-2 언어 | 답이 어느 쪽이든 시험이 받아 합격 판정과 Task가 같다 | 계획 결정이 남아 있으나 막지 않는다 |
| N-3 다른 오류의 확인 입력 | 지금 답(`TypeError`)에서 판정은 하나다. 답이 `CalculationError`로 오면 그 변경의 계획이 다시 정한다 | 2c44760의 다음 행동이 맡긴 입력 선택은 T-1이다. 글자 입력은 닿지 않고 `evaluate`의 대역은 `testing-tdd`가 제외한다 |
| N-4, N-5, N-6 | Task와 합격 판정을 바꾸지 않는다 | 비차단 메모 |

## 개수와 추적 재확인

저장한 Story를 awk, grep, diff로 측정했다. 중간 파일은 만들지 않았다.

| 측정 | 대상과 방법 | 결과 |
| --- | --- | --- |
| 시나리오 행 | `bug-2-`로 시작하는 표의 행, ID 중복 검사 | 11개, 중복 없음, 모든 행이 8열 |
| 수준 | 표의 Level 열 | unit 7, integration 1, inspection 3 |
| 우선순위 | 표의 Priority 열 | P0 3, P1 7, P2 1 |
| 실행 방식 | 표의 Execution 열 | automated 9, agent-review 2 |
| 실행 맵 | `test_design.execution`의 ID와 값을 표와 `diff` | ID와 방식이 모두 같음 |
| 요약 | Test Strategy Overview, `by_level`, `by_priority`, `by_execution` | 측정값과 같음 |
| SubTask와 시나리오 | SubTask 1.1은 bug-2-UNIT-001 ~ 007, bug-2-INT-001, bug-2-INSP-001, bug-2-INSP-002, SubTask 2.1은 bug-2-INSP-003. 각 점검의 기대와 실패 기준을 읽어 SubTask의 결과를 덮는지 확인했다 | 표의 Task 열이 10행은 1.1, 1행은 2.1로 같음 |
| 규칙 참조 | G-1 ~ G-7, V-1, V-2, B-1 ~ B-3, S-1, T-1이 표에 정의되어 있고 시나리오 행에서 참조되는가 | 모두 있음. G, V, S, T는 이름으로, B는 "표 3"으로 참조한다 |
| 입력의 값 | `Z`의 길이 100000 + 7 + 100000 = 200007, `F`의 값 1 + 199999 = 200000, `S`의 값 1 + 2 = 3, `M(1000)`, `A(500)`은 짝수 번 부호를 뒤집어 1 | 손 계산이고 실행하지 않았다 |
| future-work 항목 | `^## ` 줄과 상태 줄의 수, 커밋 21a78f7 | 38개, `Planning: unplanned` 37개, `Planning: undecided` 1개, 배정 줄 1개 |
| 커밋 제목 | `git.taskCommitPattern`과 비교 | `[story-bug-2] Task 1.1: 처리할 수 없는 깊이를 계산 오류로 돌려줌`, `[story-bug-2] Task 2.1: Architecture 정렬`이 패턴에 맞음 |
| 버전 | `package.json` 0.1.0, 설정에 버전 키 없음, 문서에 버전 정책 없음 | 버전 변경 없음 |
| 시험 지점 | unit과 integration 8행의 Seam 칸 | 모두 모듈 인터페이스를 적었고 대역이 없음 |

SM은 탐침 코드를 만들지 않으므로 표의 입력을 Draft에서 실행하지 않았다. 처음 실행은 Dev의 조각이다. 기존 시험에 관한 주장은 Testing의 "현재 시험에 관한 주장"에 있고 술어를 따라간 것이다. 실행한 것은 기존 `node --test`와 `node ci/screen-rule.check.mjs`뿐이다.

## 실행한 명령과 결과

아래 표는 Story를 쓰기 전의 점검이고, 커밋은 21a78f7이다.

| 명령 | 결과 |
| --- | --- |
| `sh .bmad-core/utils/checks/check-instructions.sh` | 종료 상태 0 |
| `git status --short`, `git rev-parse HEAD` | 깨끗함, `21a78f729d8bff12889c10a9d7dcab1056040f86`, 브랜치 `main` |
| `node --test` | 68개 통과, 실패 0 |
| `node --version` | v24.22.1 |
| `node ci/screen-rule.check.mjs` | 종료 상태 0 |
| `sh .bmad-core/utils/checks/check-merge.sh status 1.1 main` | 종료 상태 0, "merged 81c547c94a4e2dcbbf64e375909f3721b2933146 (the archive ref records its confirmed merge)" |
| `sh .bmad-core/utils/checks/check-merge.sh status 1.3 main` | 종료 상태 0, "merged 937f21c5a4d5cc5623f90caefa08dd3e137d89f5 (the archive ref records its confirmed merge)" |

아래 표는 Story와 이 기록을 저장하고 항목을 지운 뒤의 점검이다.

| 명령 | 결과 |
| --- | --- |
| `sh .bmad-core/utils/checks/check-stage.sh deps` | 종료 상태 1, `story 1.1 story none`, `story 1.2 story none`, `story 1.3 story 1.1`, `story bug-2 story 1.1,1.3`, `missing tech-debt-1 story`. 이 Story의 줄은 유효하고 순환은 없다. `missing`은 이 Story가 아닌 씨앗의 줄이고 초안 전에도 같았다 |
| `sh .bmad-core/utils/checks/check-stage.sh records docs/stories/bug/bug-2.story.md` | 종료 상태 0, 출력 없음 |
| `sh .bmad-core/utils/checks/check-stage.sh future --story bug-2` | 종료 상태 0. `Revisit:` 알림 6줄은 다른 항목의 것이다 |
| `git diff --numstat -- docs/planning/future-work.md` | 더한 줄 0, 지운 줄 19 |
| `BMAD_TEMP_PATTERN` 검색, Story와 이 기록 | 일치 없음 |
| `invisible-chars.awk`, Story와 이 기록 | 일치 없음 |
| 저장 줄 검색, Story와 이 기록 | Story에 `Depends on: 1.1, 1.3` 한 줄이고, 이 기록에는 없음 |
| 줄 수 | 저장한 Story 468줄. `.bmad-core/tasks/create-next-story-style.md`의 구조 검토 기준 600줄 아래 |

## 수정과 재확인

같은 호출 안에서 저장한 글을 읽고 다음을 고쳤다. 고친 뒤 해당 부분을 다시 읽고 측정을 다시 했다.

- 배정 줄의 인용: 처음에 `[Bug]`에 코드 표시를 더해 적어 원문과 달랐다. 원문대로 고쳤다.
- 시험에 관한 주장의 첫 행: "가장 깊은 입력"이 단항 마이너스 세 개를 빠뜨려 괄호 두 겹과 `---3`을 함께 들도록 고쳤다.
- "참고한 기록": "[Tech-Debt] 새 파일의 저작권과 SPDX 값"의 처리를 더했다. "나머지 항목"의 설명에 맞지 않았다.
- "결함의 사실": 지운 항목의 "처리와 까닭"과 "더한 병합 결과"에 있던 처리 사실과 QA의 위험 수준을 옮기지 않아 더했다.
- "기술 제약": 외부 자료를 조사하지 않았다는 한계를 더했다.
- "설계": 호출 스택이 깊으면 메시지가 달라진다는 문장이 실행하지 않은 추론임을 밝혔다. "이전 Story"의 "끝 문장"을 Recommended Execution Order 3번으로 고쳤다.
- "바꾸지 않음" 행: 범위 밖 문장과 맞도록 `README.md`, `docs/architecture.md`를 더했다.

체크리스트의 Execution deviations에 해당하는 일은 없었다.

## 비차단 메모의 근거

메모는 Story의 SM Draft Checklist에 있고, 각 메모의 판정은 위 "해석과 합격 판정"에 있다. N-1, N-2, N-3의 항목은 사용자가 `unplanned`로 둔 future-work 항목이고 메인 세션이 답하지 않았다. N-4, N-5, N-6은 이 Story의 설계에서 드러난 Architecture의 틈이고 어느 항목에도 없다.
