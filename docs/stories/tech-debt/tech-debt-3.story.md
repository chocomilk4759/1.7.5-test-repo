# Story tech-debt-3: Story 1.3 Dev 기록의 두 문장 정정

## Status

Review

## Story

**As a** Story 1.3의 Dev 기록을 근거로 읽는 뒤의 검토자,

**I want** 저장된 Story와 다른 두 문장, `dev-dod-2`의 "지운 줄이 없음"과 `dev-qa-r2`의 "40이 없다"를 사실로 정정한 항목을,

**so that** File List의 세 줄을 앞선 글 그대로라고 읽거나 옛 값 40이 남은 곳을 찾을 범위를 잘못 좁히지 않는다.

## Scope and Dependencies

### 결과와 범위

이 Story의 결과는 이 Story의 Completion Notes에 두 문장을 정정한 새 항목이 있고, 기록 문서 `docs/story-records/tech-debt-3/dev-1.1.md`가 그 값의 근거를 드는 것이다. 정정할 두 문장이 있는 파일과 코드, 시험은 그대로다.

이 Story는 Epic에 속하지 않는 `[Tech-Debt]` 유형 Story다. 제품 코드와 시험을 바꾸지 않는다.

범위 밖은 다음과 같다.

- `docs/stories/1.3.story.md`, `docs/story-records/1.3/` 아래 파일, `docs/qa/gates/1.3.yml`은 고치지 않는다. 그 gate의 `top_issues`에 있는 DOC-001과 Story 1.3의 처리 줄 `DOC-001 future`는 그때의 기록으로 남는다(N-3).
- `src/`, `test/`, `ci/`, `.github/workflows/ci.yml`, `package.json`, `README.md`는 바꾸지 않는다.
- `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`의 글은 바꾸지 않는다. 사용자가 이 문서들을 승인된 상태라고 했다(아래 "실행 요청의 결정").
- 두 문장 말고 Story 1.3 기록의 다른 문장을 다시 판정하지 않는다.
- 같은 꼴의 항목 "[Tech-Debt] Story bug-2 Dev 기록의 두 문장"은 가져오지 않는다. 커밋 6188a27의 트리아지가 `unplanned`로 두었다.
- 항목 "[Tech-Debt] 재발: 기록의 서술이 실제와 다름"의 완료 조건을 채우지 않는다. 같은 트리아지가 `unplanned`로 두었다.

### 출처

- 유형과 키: `[Tech-Debt]`, 키 `tech-debt-3`, 파일 `docs/stories/tech-debt/tech-debt-3.story.md`, 기록 폴더 `docs/story-records/tech-debt-3/`. `.bmad-core/data/story-paths.md` 섹션 Type Stories대로 작업 트리와 로컬 브랜치(`main`, `story/bug-2`), 원격 추적 브랜치(`origin/main`)의 유형 Story를 읽었다. 키는 `tech-debt-1`, `bug-2`이고 커밋 6188a27의 future-work 파일에 `Closed items`가 없어 다음 번호가 3이다.
- 중복 확인: 열린 유형 Story가 없다. `tech-debt-1`은 코드를 바꾸지 않은 씨앗이고 `bug-2`는 다른 일이다. future-work 파일의 다른 항목 가운데 이 두 문장을 정정하는 일을 맡은 항목이 없다. 항목 "[Tech-Debt] 재발: 기록의 서술이 실제와 다름"은 이 지적을 재발의 한 사례로 들고 "정정할 일은" 이 항목이 든다고 적는다. 항목 "[Tech-Debt] Story bug-2 Dev 기록의 두 문장"은 다른 Story의 다른 문장이다. 이 일을 끝낸 Done Story가 없어 재발이 아니다.
- 원천 항목: 커밋 6188a27의 `docs/planning/future-work.md` 항목 "[Tech-Debt] Story 1.3 Dev 기록의 두 문장". 이 Story의 초안이 계획 커밋으로 그 항목을 지우므로 글을 아래에 그대로 옮긴다.

  > - 출처: Story 1.3 QA 회차 3(2026-11-06)의 DOC-001(Optional, 계약 안). `docs/qa/gates/1.3.yml`의 `top_issues`, `docs/stories/1.3.story.md`의 Completion Notes와 처리 줄 `DOC-001 future`, `docs/story-records/1.3/qa-r3.md`의 섹션 "분류의 근거: DOC-001", `docs/story-records/1.3/dev-qa-r3.md`의 섹션 "DOC-001 Dev 기록의 두 문장이 저장된 Story와 다르다"
  > - 내용: `docs/story-records/1.3/dev-dod-2.md`의 프로젝트 정책 점검 행 "현재 작업과 사실, 편집 이력은 지정된 기록에"는 Story를 e71238d와 비교해 "지운 줄이 없음을 확인했다"고 적는데, `git diff e71238d 6701dcd -- docs/stories/1.3.story.md`의 지운 줄은 Status의 `InProgress`와 File List의 세 줄이다. `docs/story-records/1.3/dev-qa-r2.md`의 REQ-002 분석은 "현재 계획의 글(Dev Notes, Testing, 표)에는 40이 없다"고 적는데, Dev Notes의 "폭 결정을 코드에 옮기는 일"과 Testing에 옛 규칙의 값이나 실패 메시지의 40이 네 곳 있다. 두 문장이 말하려는 사실(앞선 기록을 고쳐 쓰지 않았다, 계획이 요구하는 값은 48이다)은 맞고 제품, 시험, 필수 점검에 닿지 않는다.
  > - 처리와 까닭: Dev가 적용하지 않고 future로 기록했다. QA가 비차단(심각도 low)으로 분류했고, 그 라운드는 메인 세션의 지시로 코드와 시험을 바꾸지 않았으며, `fix`로 두면 `check-done.sh`가 QA 회차의 닫음을 Done 전에 요구한다.
  > - 필요한 일: 두 문장을 위 사실로 정정한다. 앞선 기록(dev-dod-2, dev-qa-r2)은 고쳐 쓰지 않고 코드와 시험은 바꾸지 않는다. Dev의 기록이 정한 자리는 Completion Notes의 새 항목인데, Story가 병합되어 다시 열리지 않으므로 이 정정을 담을 계획이 따로 필요하다.
  > - 책임: Dev

  항목의 배정 줄의 값은 "[Tech-Debt] 유형 Story, docs/stories/tech-debt/ 아래(키는 SM의 draft-standalone가 정한다) — SM — 2026-11-07"이고, `Source Story:` 줄의 값은 1.3이다.
- PO의 트리아지: 커밋 6188a27이 이 항목을 `[Tech-Debt]` 유형 Story로 배정했다(아래 "사용자의 결정").
- 재발: 이 항목과 일치하는 Done 유형 Story가 없어 잇는 Story가 없다.
- 원격 트래커: 항목에 트래커 번호가 없어 적을 참조가 없다.

### 영향받는 기록과 그대로 둘 때의 비용

- 영향받는 기록: `docs/story-records/1.3/dev-dod-2.md`의 섹션 "프로젝트 정책 점검"의 행 "현재 작업과 사실, 편집 이력은 지정된 기록에", `docs/story-records/1.3/dev-qa-r2.md`의 섹션 "REQ-002 Story의 수용된 결정과 계획의 글이 사용자의 결정과 어긋난다"의 `확인`. 값은 Testing의 표 1, 표 2에 있다.
- 그대로 둘 때의 비용은 `docs/qa/gates/1.3.yml`의 DOC-001의 `failure_scenario`가 적는다: "뒤의 검토자가 이 문장을 믿으면 File List의 세 줄을 앞선 글 그대로라고 읽거나, 옛 값 40이 남은 곳을 찾을 범위를 잘못 좁힌다. 제품, 시험, 필수 점검의 결과에는 닿지 않는다."

### 선행 Story와 입력

Depends on: 1.3

Story 1.3이 정정할 두 기록과 그 값을 내는 커밋을 공급한다. `Source Story:` 줄이 있어서가 아니라 아래 표의 입력이 없으면 Task를 할 수 없어서 선행이다. Story 1.3은 `main`에 병합되어 있어 기다릴 것이 없다.

| 선행 또는 입력 | 공급하는 것 | 막는 까닭 | 확인한 근거 |
| --- | --- | --- | --- |
| Story 1.3, `docs/stories/1.3.story.md` | `docs/story-records/1.3/dev-dod-2.md`, `docs/story-records/1.3/dev-qa-r2.md`, Story 1.3의 Dev Notes와 Testing | AC 1, 2가 이 글을 정정하고 대조한다 | `sh .bmad-core/utils/checks/check-merge.sh status 1.3 main`의 출력 "merged 937f21c5a4d5cc5623f90caefa08dd3e137d89f5 (the archive ref records its confirmed merge)" |
| ref `refs/archive/story/1.3` | 커밋 `e71238d`, `6701dcd`, `8579e5a` | 표 1의 비교와 표 2의 개정이 이 커밋을 쓴다. 이 커밋들은 `main`에 없다 | 이 checkout의 `git for-each-ref --contains e71238d`가 이 ref만 낸다. 원격에 이 ref가 있는지는 보지 않았다 |
| `docs/architecture.md` | 기술 구성, 소스 트리, 설계 원칙 | SubTask 2.1의 대조 기준 | `docs/architecture.md#검토-기록`의 2026-10-29 승인, 아래 "실행 요청의 결정" |

Story 1.1, 1.2, `bug-2`, `tech-debt-1`은 선행이 아니다. 이 일은 그 Story의 파일이나 기록을 읽지도 바꾸지도 않는다.

### 수용된 결정

**사용자의 결정(이 항목의 배정).** 결정자는 사용자이고 날짜는 2026-11-07이며(PO `*future-work`의 호출 인자), 범위는 그 트리아지의 항목들이다. 근거는 커밋 6188a27의 메시지다.

> "지금 `undecided`인 항목은 모두 `unplanned`로 둡니다. 다만 `[Tech-Debt] Story 1.3 Dev 기록의 두 문장` 항목은 지금 처리할 일이니 `unplanned`에서 꺼내 유형 Story로 배정합니다. 이 답으로 제안과 질문을 대신합니다."

같은 메시지의 PO의 까닭은 다음과 같고, 사용자의 말이 아니다.

> "항목이 일의 범위(두 문장의 정정, 코드와 시험은 그대로)를 담고 있고, 병합된 Story에 정정을 담을 계획이 따로 필요하다는 항목의 필요한 일이 유형 Story가 맡는 모양이다."

**실행 요청의 결정.** 출처는 메인 세션이 이 역할 작업에 전달한 `*run-story tech-debt-3 remote to Done` 요청이고, 결정자는 사용자이며, 범위는 이 호출이다.

> "`docs/prd.md`의 Epic 범위와 AC, 의존 줄, `docs/architecture.md`, 결정 기록 `docs/planning/decisions.md`는 승인된 상태입니다. `tech-debt-3`은 future-work의 `[Tech-Debt] Story 1.3 Dev 기록의 두 문장` 항목을 처리하는 유형 Story입니다. 이번 호출은 이 Story의 Done과 요청까지이고 Story는 병합하지 않습니다."

**프로젝트 밖 원문 조사의 면제.** 같은 요청의 사용자의 말이다.

> "이 시험은 네트워크를 막아 두었으므로 프로젝트 밖 원문 조사는 면제하며, 면제 사실을 기록합니다."

이 면제는 `AGENTS.md` 섹션 Research for uncertainty and core implementation decisions의 조사 요건을 채운 것이 아니다. 이 Story에는 프로젝트 밖 자료의 조사가 없다. 이 일에는 핵심 기술 결정이 없다. 저장된 기록의 글을 저장소의 값으로 정정하는 일이고 새 기술이나 설계를 고르지 않는다.

**키와 경로의 지정.** 메인 세션이 이 역할 작업의 지시로 키를 `tech-debt-3`으로 지정했고, 위 "출처"의 번호 규칙과 어긋나지 않음을 SM이 확인했다. 쓰기 전에 Story 파일과 기록 폴더가 없었다.

### 정정을 담는 자리

항목의 글 "Dev의 기록이 정한 자리는 Completion Notes의 새 항목인데, Story가 병합되어 다시 열리지 않으므로 이 정정을 담을 계획이 따로 필요하다."와 위 PO의 까닭은 Story 1.3의 파일에 항목을 더하는 뜻으로도 읽을 수 있다. 이 Story는 그렇게 읽지 않고, 정정을 이 Story의 Completion Notes의 새 항목과 `dev-1.1.md`에 둔다. 까닭은 다음과 같다.

- `.bmad-core/utils/checks/check-owned.sh`의 `role_owns`는 Dev가 `devStoryLocation` 아래의 다른 Story 파일을 바꾸는 것을 거부하고, 기록 폴더에서는 작업의 Story 폴더의 `dev-` 문서만 허락한다. 그래서 Story 1.3의 파일과 기록 폴더에 쓰는 Task는 이 run의 소유권 점검에서 실패한다.
- `.bmad-core/data/story-paths.md` 섹션 Record documents: "a correction of an earlier result goes into the next entry's file and the Story's entry". 항목 자신이 "앞선 기록(dev-dod-2, dev-qa-r2)은 고쳐 쓰지 않고"라고 적는다.
- `.bmad-core/tasks/verify-delivery.md` 섹션 2: 병합 뒤에는 "nothing reopens".

두 읽기에서 정정의 내용과 합격 판정의 값은 같고 다른 읽기는 실행할 수 없으므로 사용자의 결정을 기다리지 않는다. 이 읽기는 수용 문서에 적힌 결정이 아니라 위 규칙에서 온 SM의 읽기이고 PO 검증이 본다. 이 자리에서 남는 불편은 N-1이다.

### 미결 항목과 선행 조건

- 미결 계획 결정: 없다. N-1 ~ N-3은 이 Story의 Task 내용과 순서, 합격 판정을 바꾸지 않는다. 모두 SM Draft Checklist의 비차단 메모에 있다.
- 실행 선행 조건: Story 1.3의 병합은 위 표대로 확인했다. 그 밖에는 Node.js 24와 `refs/archive/story/1.3`이 있는 이 저장소의 checkout이면 된다. 그 ref가 없으면 tech-debt-3-INSP-001의 비교가 돌지 않고, 그 시나리오는 미완료 점검으로 남으며 기록은 실행하지 않은 값을 적지 않는다.
- 사람만 할 수 있는 입력이나 행동: 없다.

## Acceptance Criteria

아래 AC는 원천 항목의 "내용"과 "필요한 일"에서 이 Story가 적은 것이다. 항목에는 번호 있는 AC가 없고 그 글은 위 "출처"에 그대로 옮겼다. 표 1, 표 2, 표 3과 "판정 방법"은 Testing이 정한다.

1. 이 Story의 Completion Notes의 새 항목이 `docs/story-records/1.3/dev-dod-2.md`의 섹션 "프로젝트 정책 점검"의 행 "현재 작업과 사실, 편집 이력은 지정된 기록에"의 "지운 줄이 없음을 확인했다"를 정정한다. 그 항목은 문장의 자리와 글, `git diff e71238d 6701dcd -- docs/stories/1.3.story.md`의 지운 줄이 Status의 `InProgress`와 File List의 세 줄이라는 사실, 말하려던 사실 "앞선 기록을 고쳐 쓰지 않았다"가 참인 범위를 적는다. 확인 조건: 표 1의 명령을 실행한 값이 표 1과 같고, 저장된 항목의 글이 "판정 방법"의 첫째 문장 기준을 채운다.

   Source: 커밋 6188a27의 `docs/planning/future-work.md` 항목 "[Tech-Debt] Story 1.3 Dev 기록의 두 문장"의 "내용" 첫 문장, "내용"의 괄호 "앞선 기록을 고쳐 쓰지 않았다", "필요한 일"의 "두 문장을 위 사실로 정정한다."

2. 같은 항목이 `docs/story-records/1.3/dev-qa-r2.md`의 섹션 "REQ-002 Story의 수용된 결정과 계획의 글이 사용자의 결정과 어긋난다"의 `확인`의 "현재 계획의 글(Dev Notes, Testing, 표)에는 40이 없다"를 정정한다. 그 항목은 문장의 자리와 글, Story 1.3의 Dev Notes의 "폭 결정을 코드에 옮기는 일"과 Testing에 값 40이 네 곳 있다는 사실과 그 네 곳, 그 값이 옛 규칙의 값이거나 실패 메시지의 값이라는 것, 잰 범위, 말하려던 사실 "계획이 요구하는 값은 48이다"를 적는다. 확인 조건: 표 2의 명령을 실행한 값이 표 2와 같고, 저장된 항목의 글이 "판정 방법"의 둘째 문장 기준을 채운다.

   Source: 같은 항목의 "내용" 둘째 문장, "내용"의 괄호 "계획이 요구하는 값은 48이다", "필요한 일"의 "두 문장을 위 사실로 정정한다."

3. 앞선 기록은 고쳐 쓰지 않고 코드와 시험은 바꾸지 않는다. 확인 조건: Story 시작의 기준선 HEAD와 비교해 바뀐 경로가 Dev Notes "파일 위치"의 "바꾸는 경로"뿐이고, 표 3의 두 파일의 `git hash-object` 값이 표 3과 같다.

   Source: 같은 항목의 "필요한 일"의 "앞선 기록(dev-dod-2, dev-qa-r2)은 고쳐 쓰지 않고 코드와 시험은 바꾸지 않는다."

회귀 기준은 다음과 같다. AC가 아니며 Task와 Testing이 덮는다.

- 프로젝트 루트의 `node --test`가 실패 없이 끝나고 `node ci/screen-rule.check.mjs`가 종료 상태 0이다. 출처는 요청의 필수 점검을 돌리는 `.github/workflows/ci.yml`의 job `test`다.

## Tasks / Subtasks

- [x] Task 1: Story 1.3 Dev 기록의 두 문장 정정 (AC: #1, #2, #3, 그리고 회귀 기준)
  - 접근: `verification-only`. 제품과 시험 지원의 동작을 바꾸지 않고 기록만 더하므로 TDD RED가 없다. 기록만 바꾸는 SubTask여서 Independent Cleaner review 없이 Dev 자신의 점검을 기록한다(`.bmad-core/data/development-quality.md` 섹션 Independent Cleaner review).
  - [x] 1.1 표 1, 표 2의 값을 저장소에서 다시 내어 확인하고, 이 Story의 Completion Notes에 두 문장의 정정 항목을, `docs/story-records/tech-debt-3/dev-1.1.md`에 그 근거를 적는다. 시나리오: tech-debt-3-INSP-001, tech-debt-3-INSP-002, tech-debt-3-INSP-003, tech-debt-3-INSP-004, tech-debt-3-INT-001. 완료 점검: 다섯 시나리오의 기대 결과. 커밋 제목: `[story-tech-debt-3] Task 1.1: Story 1.3 Dev 기록의 두 문장 정정`
- [x] Task 2: Architecture 정렬 (의무 출처: `.bmad-core/tasks/architecture-align.md`, `docs/architecture.md`)
  - 접근: `verification-only`. 제품과 시험의 동작을 바꾸지 않는다. 기록만 바꾸는 SubTask다.
  - [x] 2.1 누적 변경을 `docs/architecture.md`의 기술 구성, 소스 트리, 설계 원칙, `README.md`와 대조하고, 고칠 문서가 없으면 검토 범위와 까닭을 no-change로 `docs/story-records/tech-debt-3/dev-2.1.md`에 기록한다. 시나리오: tech-debt-3-INSP-005, tech-debt-3-INSP-004. 커밋 제목: `[story-tech-debt-3] Task 2.1: Architecture 정렬`

## Dev Notes

### 이전 Story

Story 1.3(병합 커밋 937f21c)의 기록에서 이 Story에 쓸 내용은 다음과 같다.

- DOC-001의 분류: Optional, 심각도 low, 계약 안, 소유자 Dev(`docs/story-records/1.3/qa-r3.md`의 섹션 "분류의 근거: DOC-001", `docs/story-records/1.3/dev-qa-r3.md`의 섹션 "DOC-001 Dev 기록의 두 문장이 저장된 Story와 다르다"). QA 회차 3, Dev의 처리 라운드, QA 완료 점검(`docs/story-records/1.3/qa-done-2.md`)이 각자 같은 값을 냈다.
- 정정의 꼴: `docs/stories/1.3.story.md`의 Completion Notes의 항목 "정정(DEV-1, 단위 3.2 뒤)"이 앞선 기록을 고쳐 쓰지 않고 새 항목에서 정정한다. 이 Story의 정정 항목도 같은 꼴이고, 자리만 이 Story다(Scope and Dependencies의 "정정을 담는 자리").
- 되풀이의 위험: 두 문장의 결함은 잰 범위 밖까지 말한 것이다. 첫째 문장은 섹션마다 같음과 바뀜만 내는 비교에서 "지운 줄이 없음"을 말했고, 둘째 문장은 옛 규칙의 값을 적은 문장을 빠뜨렸다. 항목 "[Tech-Debt] 재발: 기록의 서술이 실제와 다름"이 이 꼴을 모은다. 기록은 실제 출력과 대조해 적고, 모든 입력을 말하는 문장에는 잰 범위를 함께 적는다. 그 항목이 적듯이 Story bug-2에서는 같은 문장이 있었는데도 되풀이되었으므로 tech-debt-3-INSP-002와 tech-debt-3-INSP-003이 저장된 글을 읽어 본다.

### 파일 위치

| 구분 | 경로 | 내용 |
| --- | --- | --- |
| 바꾸는 경로 | `docs/stories/tech-debt/tech-debt-3.story.md` | Story 시작 커밋이 더한다. Dev는 Dev Agent Record, Tasks의 체크박스, Change Log, Status를 바꾼다. QA 단계의 QA Results와 Status는 QA의 것이다 |
| 바꾸는 경로 | `docs/story-records/tech-debt-3/`의 `sm-`, `po-` 문서 | Story 시작 커밋이 Story 파일과 함께 더한다(`.bmad-core/tasks/local-story-start.md`). SM과 PO의 기록이고 Dev가 고치지 않는다 |
| 바꾸는 경로 | `docs/story-records/tech-debt-3/`의 `dev-` 문서 | 새 파일. `dev-1.1.md`, `dev-2.1.md`와 `.bmad-core/data/story-paths.md` 섹션 Record documents의 Definition of Done 기록 `dev-dod-1.md`. QA 수정 라운드가 있으면 그 단위의 기록과 처리 기록이 더해진다 |
| 바꾸는 경로 | `docs/story-records/tech-debt-3/`의 `qa-` 문서, QA의 gate `docs/qa/gates/tech-debt-3-story-1-3-dev.yml` | QA 단계에서 더해진다. QA의 것이고 Dev가 쓰지 않는다. gate의 이름은 `.bmad-core/tasks/qa-gate.md`의 규칙대로 Story 키와 제목의 slug `story-1-3-dev`(`.bmad-core/data/story-paths.md` 섹션 Slug)를 잇는다 |
| 읽기만 함 | `docs/story-records/1.3/dev-dod-2.md`, `docs/story-records/1.3/dev-qa-r2.md`, `docs/stories/1.3.story.md`, `docs/qa/gates/1.3.yml`, `docs/story-records/1.3/dev-qa-r3.md`, `docs/story-records/1.3/qa-r3.md` | 정정할 문장과 대조할 값 |
| 바꾸지 않음 | `docs/story-records/1.3/` 아래 모든 파일, `docs/stories/1.3.story.md`, `docs/qa/gates/1.3.yml`, `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`, `docs/planning/future-work.md`, `src/`, `test/`, `ci/`, `.github/workflows/ci.yml`, `package.json`, `README.md`, `.bmad-core/` | 그대로 둔다 |

정정 항목은 Completion Notes에서 SubTask 1.1의 한 줄과 따로 두고, 그 섹션을 끝내는 처리 줄과 `DoD` 줄 위에 둔다(`.bmad-core/templates/story-tmpl.yaml`의 `completion-notes`). 값의 전체와 실행 결과는 `dev-1.1.md`에 두고 Completion Notes의 항목이 그 문서를 링크한다. 적을 값과 받는 글은 Testing의 표 1, 표 2, "판정 방법"이 정한다.

AC 3과 tech-debt-3-INSP-004가 받는 경로는 위 표의 "바꾸는 경로" 행의 경로이고, Dev가 돌릴 때와 QA가 돌릴 때가 같다. 시작 커밋이 Story 파일과 `sm-`, `po-` 문서를 더하므로 기준선 HEAD와의 비교에 그 경로가 늘 나온다. 아직 쓰지 않은 `dev-`, `qa-` 문서와 gate는 나오지 않아도 된다.

### 기술 제약

프로젝트 구조는 `docs/architecture.md#소스-트리`와 충돌하지 않는다. 새 코드 경로와 새 내보내기가 없다.

위험과 되돌리기는 다음과 같다. 주된 위험은 정정 글이 같은 결함, 잰 범위 밖까지 말하는 문장을 되풀이하는 것이고, 표 1, 표 2와 "판정 방법"으로 막는다. API, 데이터, 화면의 호환성에 닿는 변경이 없다. 이 Story의 변경은 Story 파일, 그 기록 폴더, QA의 gate뿐이어서, 병합 전에는 Story 일을 버리면 되고(사용자의 결정) 병합 뒤에는 squash 커밋을 되돌리면 된다(사용자의 결정). 어느 쪽도 Story 1.3의 기록에 닿지 않는다.

프로젝트 규칙의 적용은 다음과 같다.

- 위치는 파일과 섹션 이름, 행 이름, 시나리오 ID, 짧은 인용으로 적고 줄 번호를 쓰지 않는다. `git diff`의 줄 좌표를 옮겨 적지 않는다(CC-DOC-009). 값은 실행한 명령의 출력과 대조해 적고, 잰 방법과 범위를 함께 적는다(CL-GLD-OPS-005, CC-DOC-009).
- 앞선 결과를 지우거나 고쳐 쓰지 않는다(CC-DOC-004). 정정은 새 항목이고, 앞선 문장과 그 Story의 처리 줄은 그대로 남는다.
- 글은 한국어로 쓰고 코드, 경로, 인용은 원문대로 둔다(CC-DOC-002). 파일은 UTF-8로 저장하고 보이지 않는 글자를 넣지 않는다(CC-DOC-013, CL-GLD-OPS-011).
- 이 Story는 코드와 시험을 바꾸지 않아 새 주석과 머리글을 쓸 일이 없고, IN-FLIGHT 표시를 만들지 않는다. 주석 위생의 비교 기준은 Story 시작의 기준선 HEAD이고 대상은 `src/`와 `test/`의 바뀐 줄인데 그 줄이 없다. 문맥 검토의 기준은 `.bmad-core/checklists/comment-hygiene-checklist.md` §3이다.
- CRAP: 코드를 바꾸지 않아 `.bmad-core/data/development-quality.md` 섹션 CRAP check의 "When a Story changes such code"에 들지 않는다. 측정 대상이 없고 제안도 새로 하지 않는다.
- 실행 비용: 실행되는 코드를 바꾸지 않아 닿는 규칙이 없고 성능 측정을 계획하지 않는다.
- 버전: `package.json`의 `version`은 0.1.0이고, `core-config.yaml`에 `git.projectVersionFile`이 없으며 이 프로젝트의 문서에 버전 정책이 없다. 버전을 바꾸지 않는다.
- 커밋: `git.taskCommitPattern`을 따른다. 이 checkout에는 `core.hooksPath` 설정과 `.githooks`가 없고, 스테이징 뒤의 `sh .bmad-core/utils/checks/check-staged.sh`는 `.bmad-core/data/local-git-workflow.md`대로 돌린다.
- 임시 자료는 프로젝트 임시 파일 정책(CL-GLD-OPS-008)을 따르고 이어가기 로그의 이 Story 섹션에 적는다. Done까지 필요한 근거를 보존하고, 지우는 일은 병합이 확인된 뒤에 이 Story의 일회용 자료에만 한다. Story와 기록 문서에는 그 경로를 적지 않는다(CC-DOC-010).

참고한 기록은 다음과 같다.

- `docs/planning/decisions.md`의 D-1, D-2는 식의 꼴과 단위 값의 결정이어서 이 일에 닿지 않는다.
- `docs/planning/future-work.md`(커밋 6188a27)는 항목 45개이고 `unplanned` 44개, 이 항목 하나가 `undecided`와 배정 줄이다. 이 Story의 계획 커밋은 이 항목만 지우고 `Closed items` 줄 하나를 남긴다(N-2). 항목 "[Tech-Debt] 재발: 기록의 서술이 실제와 다름", "[Tech-Debt] Story bug-2 Dev 기록의 두 문장"은 위 범위 밖이고, 나머지 항목은 제품과 시험, 수용 문서, 다른 Story의 글에 관한 것이어서 이 Story의 Task에 닿지 않는다.
- `workflow.researchLocation`의 `docs/research`와 `domainGlossary`의 `docs/domain-glossary.md`는 없다. 용어는 Story 1.3의 기록의 뜻을 쓴다. 새 용어 제안은 없다.
- 문서 대조 대상은 `docs/architecture.md`와 `README.md`다. 사용자에게 보이는 동작이 바뀌지 않고 `src/`에 내장 도움말이 없어 고칠 문서가 나올 것으로 보지 않는다. 나오면 고치지 말고 메인 세션의 질문으로 돌려준다. `docs/architecture.md`에는 Change Log 절이 없다.

### Convention Sections

```yaml
convention-sections: [documentation, golden-rules, testing-tdd]
review-sections: [coding-principles, comments, crap]
auto-detected-keywords: [documentation, record, testing, SubTask]
```

### Testing

시험 파일을 더하거나 바꾸지 않는다. 필수 점검 명령은 프로젝트 루트의 `node --test`와 `node ci/screen-rule.check.mjs` 둘이고 다른 넓은 실행은 필수로 두지 않는다. 시험 대역은 쓰지 않는다. 표 1, 표 2, 표 3의 값은 Draft 때 이 checkout에서 잰 관찰이고, Dev가 다시 내어 확인한 값만 기록한다. 아래는 계획이며 실행 결과가 아니다.

Draft 때 관찰한 사실(커밋 6188a27, Windows x64, Node.js v24.22.1): `node --test`는 76개 통과했고 `node ci/screen-rule.check.mjs`는 종료 상태 0이다. Dev는 시작할 때 다시 확인하고 기록한다.

이 Story는 현재 시험이 무엇을 잡거나 놓친다는 주장에 기대지 않는다.

#### Test Design

##### Test Strategy Overview

- Total: 6 | Unit: 0 | Integration: 1 | E2E: 0 | Inspection: 5
- Priority: P0: 0, P1: 2, P2: 3, P3: 1
- Execution: automated: 3 | agent-review: 3 | user-only: 0

##### 표 1: 첫째 문장의 사실

| 항목 | 값 |
| --- | --- |
| 문장의 자리 | `docs/story-records/1.3/dev-dod-2.md`, 섹션 "프로젝트 정책 점검", 행 "현재 작업과 사실, 편집 이력은 지정된 기록에" |
| 정정할 글 | "Story를 이 라운드 시작 전의 `e71238d`와 섹션별로 비교해 바뀐 섹션이 Change Log와 Dev Agent Record뿐이고 지운 줄이 없음을 확인했다." |
| 비교하는 두 커밋 | `e71238d`(`[story-1.3] DOCS: PO 재검증 2회 GO(SCREEN_WIDTH 48 수정)`), `6701dcd`(`[story-1.3] Story Status: InProgress -> Review`) |
| 줄 수 | `git diff --numstat e71238d 6701dcd -- docs/stories/1.3.story.md`: 더한 줄 29, 지운 줄 4 |
| 섹션 | `git show`로 두 커밋의 Story를 `## ` 제목마다 나누어 비교하면 글이 다른 섹션은 Status, Change Log, Dev Agent Record이고 다른 여덟 섹션은 같다. 그 행의 "바뀐 섹션"은 다음 문장이 Status를 따로 말하므로 어긋나지 않는다 |
| 글을 놓친 까닭 | 그 행이 쓴 비교는 섹션마다 같음과 바뀜만 가렸고 줄을 세지 않았다(`docs/story-records/1.3/dev-qa-r3.md`) |
| Status 줄 | 그 행의 다음 문장 "Status는 Review 전환에서 바꾼다"가 말한 곳이어서 지운 줄이지만 어긋남이 아니다 |
| 말하려던 사실이 참인 범위 | `git ls-tree --name-only e71238d docs/story-records/1.3/`의 기록 문서 11개는 `git diff --name-status e71238d 6701dcd -- docs/story-records/1.3`에 나오지 않아 바뀌지 않았고, 그 출력은 더한 문서(`A`) 5개 `dev-3.1.md`, `dev-3.2.md`, `dev-3.3.md`, `dev-dod-2.md`, `dev-qa-r2.md`뿐이다. Story에서 지운 줄은 아래 넷뿐이다. File List의 세 줄의 고침은 Dev의 권한 안이다(`docs/qa/gates/1.3.yml`의 DOC-001) |

`git diff e71238d 6701dcd -- docs/stories/1.3.story.md`에서 `-`로 시작하는 줄 가운데 머리 줄 `--- a/...`를 뺀 줄은 다음 넷이다. 첫 줄은 Status이고 나머지 셋은 File List다.

```text
-InProgress
-- `src/screen.js` (새 파일)
-- `test/screen.test.js` (새 파일)
-- 바꾸지 않음(기준 `40e1a6b`와 차이 없음을 `git diff`로 확인): `src/engine.js`, `src/number-format.js`, `test/engine.test.js`, `test/number-format.test.js`, `ci/screen-rule.check.mjs`, `.github/workflows/ci.yml`
```

File List의 세 줄은 같은 비교의 더한 줄에서 다른 글로 고쳐 쓰였다. 앞의 둘은 같은 경로에 "QA 수정 단위" 설명이 붙었고, 셋째는 "바뀌지 않음(기준 tip `d90c99e`와 차이 없음을 `git diff`로 확인)"으로 시작하는 줄이 대신한다.

##### 표 2: 둘째 문장의 사실

| 항목 | 값 |
| --- | --- |
| 문장의 자리 | `docs/story-records/1.3/dev-qa-r2.md`, 섹션 "REQ-002 Story의 수용된 결정과 계획의 글이 사용자의 결정과 어긋난다", `확인` |
| 정정할 글 | "현재 계획의 글(Dev Notes, Testing, 표)에는 40이 없다." |
| 잰 범위 | `docs/stories/1.3.story.md`의 `## Dev Notes`부터 다음 `## ` 앞까지의 글이다. Testing과 그 표는 이 안에 있다. Scope and Dependencies, SM Draft Checklist, PO Validation, QA Results는 재지 않았고 그 문장도 이 곳들을 따로 말한다 |
| 개정 | 그 문장을 더한 `8579e5a`, `6701dcd`, `main` 6188a27. 세 개정에서 이 범위의 글은 같다 |
| 말하려던 사실 | 계획이 요구하는 값은 48이다. `ci/screen-rule.check.mjs`의 `EXPECTED_WIDTH`와 `src/screen.js`의 `SCREEN_WIDTH`가 48이다 |

재는 명령은 다음과 같고 `{개정}`은 위의 셋이다. 패턴은 앞에 숫자와 점이 없고 뒤에 숫자나 영문자가 없는 40을 찾으므로 커밋 이름 `40e1a6b`는 들지 않는다. 출력은 네 줄이고 줄마다 40이 하나다.

```sh
git show {개정}:docs/stories/1.3.story.md | awk '/^## Dev Notes/{on=1;next} /^## /{on=0} on' | grep -E '(^|[^0-9.])40($|[^0-9A-Za-z])'
```

| 표시 | 자리 | 글 | 값의 뜻 |
| --- | --- | --- | --- |
| P-1 | Dev Notes "폭 결정을 코드에 옮기는 일"의 1번 | "이 커밋 전의 트리에서는 규칙이 40이어서" | `Story Base` 병합 커밋 전 트리의 규칙 값 |
| P-2 | 같은 절의 2번 | "`src/screen.js must export SCREEN_WIDTH = 48, got 40`" | 실패 메시지의 값 |
| P-3 | Testing "기준 tip에서 관찰한 사실" | "`src/screen.js must export SCREEN_WIDTH = 48, got 40`" | 실패 메시지의 값 |
| P-4 | Testing의 1.3-INT-001 행 | "`Story Base` 병합 커밋 전 트리의 규칙 40으로 낸 결과도 증거가 아니다" | `Story Base` 병합 커밋 전 트리의 규칙 값 |

##### 표 3: 그대로 두는 앞선 기록

값은 `main` 6188a27의 `git hash-object`다.

| 파일 | 값 |
| --- | --- |
| `docs/story-records/1.3/dev-dod-2.md` | `18eb39bc4ecbc7956f3d164bd3990bf739551591` |
| `docs/story-records/1.3/dev-qa-r2.md` | `058eb6c45a1ffafc2c3d8fc277777e9ab7a08d25` |

##### 판정 방법

정정 항목의 낱말은 고정하지 않는다. 저장된 항목의 글이 아래를 채우는지 읽어서 판정한다.

첫째 문장의 기준은 다음과 같다.

- 받는 글: 표 1의 자리와 정정할 글을 들고, 지운 줄이 넷이며 Status의 `InProgress`와 File List의 세 줄임을 적고, Status 줄은 그 행이 따로 말한 곳이라고 적으며, "앞선 기록을 고쳐 쓰지 않았다"가 기록 문서 11개에는 맞고 Story에서는 그 넷을 뺀 범위에서 맞다고 적는다.
- 거부하는 글: "지운 줄이 없다"를 그대로 두거나 "표현이 넓었다"처럼 값 없이 적는 글, File List의 세 줄 가운데 일부만 드는 글, 지운 줄을 File List의 셋뿐이라고 적는 글, Status 줄을 위반으로 적는 글, "앞선 기록을 전혀 고쳐 쓰지 않았다"처럼 범위 없이 다시 말하는 글, `dev-dod-2.md` 자체를 고쳤다고 적는 글.

둘째 문장의 기준은 다음과 같다.

- 받는 글: 표 2의 자리와 정정할 글을 들고, 잰 범위 안의 값 40이 P-1 ~ P-4의 네 곳임을 자리와 함께 적고, 그 값이 옛 규칙의 값(P-1, P-4)이거나 실패 메시지의 값(P-2, P-3)이라고 적으며, 계획이 요구하는 값은 48이라고 적는다.
- 거부하는 글: 네 곳 가운데 일부만 들거나 다섯 곳 이상을 드는 글, 잰 범위 없이 "Story에 40이 네 곳"이라고 적는 글, 그 40을 계획이 요구하는 값으로 읽는 글, 네 곳을 고쳐야 한다고 적는 글, 48을 말하지 않는 글.

두 기준에 공통으로, 항목은 앞선 기록을 고쳐 쓰지 않고 이 항목에서 정정한다고 적는다. 그 말은 tech-debt-3-INSP-004의 결과와 같아야 한다. 항목은 이 Story의 Completion Notes에 SubTask 1.1의 줄과 따로 있고, 그 섹션을 끝내는 처리 줄과 `DoD` 줄 위에 있으며, `dev-1.1.md`를 링크한다. 다른 자리에 있거나 링크가 없는 항목은 거부한다. 자리를 줄 번호로 적는 글도 거부한다.

##### Test Scenarios by Acceptance Criteria

###### AC1: 첫째 문장의 정정

| ID | AC / Task | Level | Priority | Execution | Seam | Test and failure criterion | Prerequisites / evidence / execution basis |
| --- | --- | --- | --- | --- | --- | --- | --- |
| tech-debt-3-INSP-001 | AC 1, AC 2 / 1.1 | inspection | P2 | automated | 해당 없음 | 표 1의 비교와 표 2의 명령을 실행해 출력을 표와 맞춘다. 표 1의 지운 줄 넷, 줄 수, 섹션, 기록 문서 11개와 5개, 표 2의 세 개정에서 네 줄이 같으면 통과다. 실패: 값이 표와 다르거나, `refs/archive/story/1.3`이 있는데 명령이 돌지 않는다. 그 ref가 없으면 실패가 아니라 "미결 항목과 선행 조건"대로 미완료 점검이다. 값이 다르면 표의 값을 옮겨 적지 않고 실제 값과 함께 메인 세션의 질문으로 돌려준다 | `refs/archive/story/1.3` / 명령과 출력, `dev-1.1.md` / `git diff`, `git ls-tree`, `grep`의 출력이 판정 |
| tech-debt-3-INSP-002 | AC 1 / 1.1 | inspection | P2 | agent-review | 해당 없음 | 저장된 정정 항목을 표 1과 "판정 방법"의 첫째 문장 기준으로 읽는다. 실패: 거부하는 글의 어느 하나에 들거나 `dev-1.1.md`의 실행 값과 다르다 | tech-debt-3-INSP-001의 결과 / 항목의 글과 대조 기록 / 문장의 참과 잰 범위는 판단이 필요하다 |

###### AC2: 둘째 문장의 정정

| ID | AC / Task | Level | Priority | Execution | Seam | Test and failure criterion | Prerequisites / evidence / execution basis |
| --- | --- | --- | --- | --- | --- | --- | --- |
| tech-debt-3-INSP-003 | AC 2 / 1.1 | inspection | P2 | agent-review | 해당 없음 | 저장된 정정 항목을 표 2와 "판정 방법"의 둘째 문장 기준으로 읽는다. 값의 재현은 tech-debt-3-INSP-001이 맡는다. 실패: 거부하는 글의 어느 하나에 들거나 `dev-1.1.md`의 실행 값과 다르다 | tech-debt-3-INSP-001의 결과 / 항목의 글과 대조 기록 / 문장의 참과 잰 범위는 판단이 필요하다 |

###### AC3: 앞선 기록과 코드를 그대로 둠

| ID | AC / Task | Level | Priority | Execution | Seam | Test and failure criterion | Prerequisites / evidence / execution basis |
| --- | --- | --- | --- | --- | --- | --- | --- |
| tech-debt-3-INSP-004 | AC 3 / 1.1, 2.1 | inspection | P1 | automated | 해당 없음 | Story 시작의 기준선 HEAD를 `{기준}`으로 두고 `git diff --name-only {기준}`과 `git status --porcelain`이 내는 경로가 Dev Notes "파일 위치"의 "바꾸는 경로" 행의 경로뿐이며, 표 3의 두 파일의 `git hash-object` 값이 표 3과 같다. Story 시작 커밋 `[story-tech-debt-3] Story Status: Approved -> InProgress`를 `{시작}`으로 두고 `git diff --name-only --no-renames --diff-filter=MD {시작} -- docs/story-records/tech-debt-3/`의 출력에 `sm-`, `po-` 문서가 없다. 받는 경우: 나오는 경로가 모두 그 행에 있다. 시작 커밋이 더한 Story 파일과 `sm-`, `po-` 문서, `dev-` 문서, QA 단계의 `qa-` 문서와 QA의 gate가 여기에 든다. 실패: 그 행에 없는 경로가 하나라도 나온다. `docs/story-records/1.3/`에 새 파일이 생기거나, `src/`, `test/`가 바뀌거나, 기록 폴더에 `sm-`, `po-`, `dev-`, `qa-` 문서가 아닌 파일이 생긴 경우가 여기에 든다. 표 3의 값이 다른 경우와 시작 커밋 뒤에 `sm-`, `po-` 문서가 고쳐지거나 지워진 경우도 실패다. 잰 범위는 Git이 보는 경로이고, 기록은 통과를 그 범위로 적는다(`coverage_gaps`) | 기준선 HEAD / 명령과 출력 / `git diff`, `git status`, `git hash-object`가 판정 |

###### 회귀 기준

| ID | AC / Task | Level | Priority | Execution | Seam | Test and failure criterion | Prerequisites / evidence / execution basis |
| --- | --- | --- | --- | --- | --- | --- | --- |
| tech-debt-3-INT-001 | 회귀 기준 / 1.1 | integration | P1 | automated | `node --test`가 실행하는 시험 파일의 공개 함수, `ci/screen-rule.check.mjs`가 가져오는 `SCREEN_WIDTH` | 프로젝트 루트의 `node --test`가 실패 없이 끝나고 `node ci/screen-rule.check.mjs`가 종료 상태 0이다. 실패: 시험이 하나라도 실패하거나 종료 상태가 0이 아니다 | 없음 / 명령의 출력과 종료 상태 / 시험과 점검 스크립트가 판정 |

###### Architecture 정렬

| ID | AC / Task | Level | Priority | Execution | Seam | Test and failure criterion | Prerequisites / evidence / execution basis |
| --- | --- | --- | --- | --- | --- | --- | --- |
| tech-debt-3-INSP-005 | `.bmad-core/tasks/architecture-align.md` / 2.1 | inspection | P3 | agent-review | 해당 없음 | 누적 변경을 `docs/architecture.md`의 기술 구성, 소스 트리, 설계 원칙, `README.md`와 대조하고 검토 범위와 결론을 기록한다. 실패: 어긋남이 있는데 기록이나 보고가 없거나, 대조 없이 no-change라고 적는다 | 없음 / `dev-2.1.md`의 검토 범위와 결론 / 설계 부합은 판단이 필요하다 |

##### 추적

| 수용된 내용 | SubTask | 시나리오 |
| --- | --- | --- |
| AC 1의 값 | 1.1 | tech-debt-3-INSP-001 |
| AC 1의 정정 글 | 1.1 | tech-debt-3-INSP-002 |
| AC 2의 값 | 1.1 | tech-debt-3-INSP-001 |
| AC 2의 정정 글 | 1.1 | tech-debt-3-INSP-003 |
| AC 3의 앞선 기록과 코드, 시험, Dev Notes "파일 위치"의 "바꾸는 경로" | 1.1, 2.1 | tech-debt-3-INSP-004 |
| 회귀 기준 | 1.1 | tech-debt-3-INT-001 |
| Dev Notes "파일 위치"의 정정 항목의 자리와 링크 | 1.1 | tech-debt-3-INSP-002, tech-debt-3-INSP-003 |
| Architecture 정렬 | 2.1 | tech-debt-3-INSP-005 |

##### User-only Actions

없다. 모든 시나리오를 에이전트가 실행한다.

##### Risk Coverage

위험 프로필 문서는 없다. Draft에서 본 주요 오동작과 이를 잡는 시나리오는 다음과 같다.

| 오동작 | 시나리오 |
| --- | --- |
| 정정 글이 저장소의 값과 다르다 | tech-debt-3-INSP-001, tech-debt-3-INSP-002, tech-debt-3-INSP-003 |
| 정정 글이 잰 범위 밖까지 말해 같은 결함을 되풀이한다 | tech-debt-3-INSP-002, tech-debt-3-INSP-003 |
| 앞선 기록이나 Story 1.3의 파일을 고쳐 쓴다 | tech-debt-3-INSP-004 |
| 시작 커밋이 더한 이 Story의 `sm-`, `po-` 문서를 고친다 | tech-debt-3-INSP-004 |
| 코드나 시험이 바뀐다 | tech-debt-3-INSP-004, tech-debt-3-INT-001 |

##### Recommended Execution Order

순서는 SubTask의 의존과 저장된 글이 있어야 읽을 수 있다는 조건에서 온다. 그래서 P1인 tech-debt-3-INSP-004와 tech-debt-3-INT-001이 저장 뒤에 온다.

1. SubTask 1.1에서 tech-debt-3-INSP-001로 값을 다시 낸다. 값이 표와 다르면 멈추고 시나리오의 실패 기준대로 한다.
2. 그 값으로 정정 항목과 `dev-1.1.md`를 저장하고, 저장된 글을 tech-debt-3-INSP-002, tech-debt-3-INSP-003으로 읽는다.
3. tech-debt-3-INSP-004, tech-debt-3-INT-001을 실행하고 SubTask 1.1을 커밋한다.
4. SubTask 2.1에서 tech-debt-3-INSP-005를 실행하고 tech-debt-3-INSP-004를 다시 실행한 뒤 커밋한다.

##### 속성 점검과 변이 점검

실행되는 코드를 바꾸지 않아 두 점검의 대상이 없다. `testing.propertyCommands`와 `testing.mutationCommands`는 비어 있다. 판정 방법의 거부하는 글이 이 Story의 틀린 변형이다.

#### 실행 맵

```yaml
test_design:
  scenarios_total: 6
  by_level: { unit: 0, integration: 1, e2e: 0, inspection: 5 }
  by_priority: { p0: 0, p1: 2, p2: 3, p3: 1 }
  execution:
    tech-debt-3-INSP-001: automated
    tech-debt-3-INSP-002: agent-review
    tech-debt-3-INSP-003: agent-review
    tech-debt-3-INSP-004: automated
    tech-debt-3-INT-001: automated
    tech-debt-3-INSP-005: agent-review
  by_execution: { automated: 3, agent_review: 3, user_only: 0 }
  user_only: {}
  coverage_gaps:
    - "정정 글의 참과 잰 범위는 프로그램이 가리지 못하고 tech-debt-3-INSP-002, tech-debt-3-INSP-003의 읽기가 본다"
    - "두 문장 말고 Story 1.3 기록의 다른 문장은 다시 판정하지 않는다"
    - "표 2의 40 검색은 Dev Notes와 Testing의 글만 재고 Scope and Dependencies와 기록 섹션은 재지 않는다"
    - "tech-debt-3-INSP-001은 refs/archive/story/1.3이 있는 checkout에서만 돈다"
    - "tech-debt-3-INSP-004의 잰 범위는 Git이 보는 경로다. 파일 위치 표의 바꾸지 않음 행에 있는 .bmad-core/는 이 checkout의 .git/info/exclude에 있어 git diff와 git status에 나오지 않고 그 시나리오가 재지 않는다"
    - "정정이 Story 1.3의 파일에 없어 그 기록만 읽는 사람에게 닿는 길을 시험하지 않는다 (N-1)"
```

## SM Draft Checklist

### 1회, 2026-11-07

- 결과: READY. PO 검증을 받을 준비가 되었다는 뜻이며, PO 검증이나 Approved가 아니고 개발을 허락하지 않는다.
- 검토자: SM 하위 세션(Bob, `claude-opus-5-5`), `*run-story tech-debt-3 remote to Done` run의 역할 작업.
- 범위: Story 전체. 기준은 `main` 6188a27이고, Story와 기록 문서는 커밋하지 않은 초안이다. 입력은 그 커밋의 `docs/planning/future-work.md` 항목 "[Tech-Debt] Story 1.3 Dev 기록의 두 문장", 커밋 6188a27의 메시지, `docs/architecture.md`, `docs/planning/decisions.md`, 병합된 Story 1.3의 파일과 기록, `docs/qa/gates/1.3.yml`이다.
- 범주 결과: Project policy PASS(실행 어긋남 F-1의 확인된 복구를 포함), 1 PASS, 2 PASS, 3 PASS, 4 PASS, 4.5 PASS, 5 PASS.
- 적용한 PO 비차단 지적과 이의 제기: 없다(첫 초안).
- 차단 지적: 없다.
- 실행 어긋남: F-1. SM이 표 2의 40 검색을 처음에 프로젝트 임시 영역의 일회용 스크립트 파일로 돌렸다. `.bmad-core/agents/sm.md`의 "Do not implement Stories or create or modify executable code, including temporary diagnostic probes"에 어긋난다. 저장소를 바꾸지 않았고, 같은 검색을 파일 없는 명령으로 다시 내어 같은 네 줄을 얻었으며, 그 값만 Story에 썼다. 자세한 것은 기록 문서에 있다.
- 비차단 메모:
  - N-1 정정의 자리: 정정은 이 Story에 있고 Story 1.3의 파일에는 없어, `dev-dod-2.md`나 `dev-qa-r2.md`만 읽는 사람은 그 문장에서 정정으로 가는 링크를 보지 못한다. 길잡이는 future-work 파일의 `Closed items` 줄과 Git 이력이다. 병합된 Story의 파일과 기록을 Dev가 고치지 않는 규칙에서 오는 결과다(Scope and Dependencies의 "정정을 담는 자리"). Task 내용과 합격 판정을 바꾸지 않는다. 소유자: PO.
  - N-2 항목 이름을 든 글: 항목 "[Tech-Debt] 재발: 기록의 서술이 실제와 다름"의 글과 `docs/stories/1.3.story.md`의 `Post-merge check` 줄이 지운 항목의 이름을 든다. 그 재발 항목의 글을 고치면 찾은 내용을 더한 것으로 보아 트리아지로 돌아가므로 고치지 않았고, 대신 계획 커밋이 `Closed items` 줄에 제목, 이 Story, 날짜를 남긴다. 소유자: PO.
  - N-3 Story 1.3의 DOC-001: `docs/qa/gates/1.3.yml`의 `top_issues`의 DOC-001과 처리 줄 `DOC-001 future`는 그대로 남고, 이 Story의 Done이 그 gate를 닫지 않는다. 합격 판정을 바꾸지 않는다. 소유자: QA.
- 기록: [sm-1](../../story-records/tech-debt-3/sm-1.md)

### 2회, 2026-11-07

- 결과: READY. PO 재검증을 받을 준비가 되었다는 뜻이며, PO 검증이나 Approved가 아니고 개발을 허락하지 않는다.
- 검토자: SM 하위 세션(Bob, `claude-opus-5-5`), `*run-story tech-debt-3 remote to Done` run의 역할 작업.
- 범위: PO 검증 1회 뒤의 수정이다. Story 전체를 다시 읽었고, PO1-B1과 PO1-N2 ~ PO1-N5에 따른 수정과 그 영향을 판정했다. 기준은 `main` 20256e4이고 Story와 기록 문서는 커밋하지 않은 초안이다. AC, Scope and Dependencies, Task 구조, 시나리오의 ID와 합계, 표 1 ~ 3의 값은 바꾸지 않았다. 1회에서 이어 쓴 근거와 그 비교는 기록 문서에 있다.
- 범주 결과: Project policy PASS, 1 PASS, 2 PASS, 3 PASS, 4 PASS, 4.5 PASS, 5 PASS.
- 차단 지적의 처리:
  - PO1-B1(`rework`, SM): 고쳤다. Dev Notes "파일 위치"의 "바꾸는 경로"에 `sm-`, `po-` 문서와 QA 단계의 `qa-` 문서, QA의 gate를 더했고, tech-debt-3-INSP-004가 그 행을 받는 경로로 삼게 했다. "Dev가 고치지 않는다"를 재도록 그 시나리오에 시작 커밋 뒤의 `sm-`, `po-` 문서 변경을 찾는 명령을 더했다. PO 피드백이 든 글 밖의 더함이므로 다음 PO 회차가 함께 본다. AC 3의 글은 바꾸지 않았다.
- 적용한 PO 비차단 지적: PO1-N2, PO1-N3, PO1-N4, PO1-N5.
- 적용하지 않은 PO 비차단 지적: PO1-N1. 계약 밖이고 PO Validation에 남으며 병합 뒤 점검이 옮긴다.
- 이의 제기: 없다.
- 새 차단 지적: 없다.
- 실행 어긋남: 이 호출에는 없다. 1회의 F-1은 1회 항목과 `sm-1`에 그대로 남는다.
- 비차단 메모: N-1 ~ N-3의 글은 1회 그대로다. PO 검증 1회가 N-1을 PO1-N1로 옮겼고 N-2, N-3을 지적이 아니라고 판정했다. 새 메모는 없다.
- 기록: [sm-2](../../story-records/tech-debt-3/sm-2.md)

## Change Log

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 2026-11-07 | 0.1 | Story 초안 작성 | SM (Bob) |
| 2026-11-07 | 0.2 | PO 검증 1회 반영: AC 3, "파일 위치", tech-debt-3-INSP-004의 경로 집합을 맞춤(PO1-B1), PO1-N2 ~ PO1-N5 적용 | SM (Bob) |
| 2026-11-07 | 0.3 | Story 1.3 Dev 기록의 두 문장 정정(SubTask 1.1) | Dev (James) |
| 2026-11-07 | 0.4 | Architecture 정렬 no-change(SubTask 2.1) | Dev (James) |
| 2026-11-07 | 0.5 | Definition of Done 점검, Review로 넘김 | Dev (James) |

## PO Validation

### 1회, 2026-11-07

- 판정: NO-GO. 전체 검토이고 모든 필수 점검을 끝냈으나 차단 지적 PO1-B1이 열려 있다.
- 검토자: PO 하위 세션(Sarah, `claude-opus-5-5`), `*run-story tech-debt-3 remote to Done` run의 역할 작업. 이 Story를 쓰지 않았고, SM의 점검이 아닌 실제 LLM 검토이며 추가 검토자는 없다. 시각: 2026-11-07, 읽은 Story의 사본 저장 06:16 +0900, 기록 작성 06:20 +0900 이후.
- 범위와 입력: Story 전체, 이 Story의 첫 회차의 full review. 기준은 `main` 20256e4이고 Story와 기록 문서는 커밋하지 않은 초안이다. 검토한 계획 내용은 이 항목을 더하기 전의 Story(`git hash-object --no-filters` 값 `43722f291fa9`)와 `sm-1`(`87a40c146a8f`)이다. 부모는 커밋 6188a27의 `docs/planning/future-work.md` 항목 "[Tech-Debt] Story 1.3 Dev 기록의 두 문장"과 같은 커밋의 메시지에 있는 사용자의 결정이고, 설계 `docs/architecture.md`와 결정 `docs/planning/decisions.md`는 6188a27과 20256e4에서 같다. 20256e4가 바꾼 경로는 `docs/planning/future-work.md` 하나다.
- 범주 요약: Project policy PASS(SM의 실행 어긋남 F-1의 확인된 복구를 포함), 1 PASS, 2 PASS, 3 PASS, 4 PASS, 4.5 PASS, 5 FAIL(PO1-B1). 앞선 회차에서 이어 쓴 결과는 없다.
- 차단 지적:
  - PO1-B1 AC 3의 확인 조건과 tech-debt-3-INSP-004가 `sm-`, `po-` 기록에서 다른 판정을 낸다. 기준: `.bmad-core/data/finding-classification.md` step 3의 "two statements of the Story that contradict each other in a case that a planned use reaches". AC 3은 "바뀐 경로가 Dev Notes "파일 위치"의 "바꾸는 경로"뿐이고"이고 그 표의 기록 행은 "`docs/story-records/tech-debt-3/`의 `dev-` 문서"인데, INSP-004의 받는 경우는 "`docs/story-records/tech-debt-3/` 아래"다. `.bmad-core/tasks/local-story-start.md`의 시작 커밋이 "adds it and the files of its record folder"이고 기준선 HEAD는 그 전이므로 `git diff --name-only {기준}`에 `sm-1.md`, `po-r1.md`가 늘 나온다. AC 3으로는 실패, INSP-004로는 통과다. 같은 절차를 지난 Story bug-2의 `git diff --name-only 9aea191 refs/archive/story/bug-2`가 그 기록들을 든다. 경로 `rework`, 소유자 SM. 필요한 수정: AC 3, "파일 위치", INSP-004가 같은 경로 집합을 말하게 한다. 가장 작은 길은 "바꾸는 경로"에 그 폴더의 `sm-`, `po-` 문서를 더하고 시작 커밋이 Story 파일과 함께 더하며 Dev가 고치지 않는다고 적는 것이고, INSP-004의 끝 문장도 그 집합에 맞춘다. 잡히는 일: Draft에서 Approved로의 전환, Story 시작, SubTask 1.1, 2.1, QA, Done, 요청. 잡히지 않는 일: 이 수정과 계약 안 비차단 지적의 적용.
- SM 이의 제기, 분류 변경, 늦은 지적, 미완료 점검: 없다.
- SM의 실행 어긋남 F-1: 복구를 직접 확인했다. 그 스크립트를 읽어 읽기 전용임을 확인했고, 같은 검색을 파일 없는 명령으로 세 개정에서 다시 내어 같은 네 곳을 얻었으며, Story와 `sm-1`이 그 파일에 기대지 않는다. 어긋남의 기록은 그대로 남는다.
- 메인 세션이 넘긴 질문 N-1 ~ N-3과 SM 메모: 직접 확인했고 막는 것이 없어 `pending` 지적이 없다. N-1: 정정을 이 Story의 Completion Notes와 `dev-1.1.md`에 두는 읽기가 맞다. 항목의 글은 Story 1.3의 자리를 쓸 수 없다고 말할 뿐 새 자리를 정하지 않고, PO의 트리아지 까닭은 사용자의 말이 아니며, `check-owned.sh`의 `role_owns`, `.bmad-core/data/story-paths.md`의 "a correction of an earlier result goes into the next entry's file and the Story's entry", `.bmad-core/tasks/verify-delivery.md`의 "nothing reopens"로 다른 읽기는 실행되지 않는다. 남는 틈은 PO1-N1이다. N-2: 충분하다. 항목의 이름이 `Closed items` 줄로 풀리고 그 글의 주장이 맞으며, 재발 항목의 글을 고치면 트리아지로 돌아가고 `Post-merge check` 줄은 그때의 기록이다. 지적이 아니다. N-3: 그때의 기록으로 둔다(`CL-GLD-OPS-004`, `.bmad-core/tasks/load-project-rules.md`의 "Keep existing Story and QA records as historical inputs"). 다른 Story의 Done이 앞선 gate를 닫는 절차가 없다. 지적이 아니다. 근거는 기록 문서에 있다.
- 비차단 지적(Story는 아직 적용하지 않았고, 어느 것도 다음 단계를 막지 않는다):
  - PO1-N1 병합된 기록에서 정정으로 가는 길(SM N-1). 출처: Scope and Dependencies "정정을 담는 자리", `coverage_gaps`, `docs/story-records/1.3/dev-dod-2.md`, `docs/story-records/1.3/dev-qa-r2.md`. 값어치: 그 두 문서만 읽는 뒤의 검토자는 정정으로 가는 링크를 보지 못한다. 병합된 Story의 기록에서 뒤의 정정으로 가는 길을 둘지 정할 수 있게 남긴다. 계약 밖(항목과 Story가 그 파일들을 그대로 두라고 하고 Dev가 쓸 수 없다, 답은 트리아지의 사용자). 시점: 병합 뒤 점검에서 새 항목으로 옮긴다.
  - PO1-N2 Story가 적은 gate 이름이 절차의 이름과 다름(PO). 출처: Dev Notes "QA의 gate `docs/qa/gates/tech-debt-3.yml`", `.bmad-core/tasks/qa-gate.md`의 "`{qa.qaLocation}/gates/{story_key}-{slug}.yml`", `.bmad-core/data/story-paths.md` 섹션 Slug. 이 제목의 slug는 `story-1-3-dev`이고 gate는 `docs/qa/gates/tech-debt-3-story-1-3-dev.yml`이다. 값어치: QA가 자기 절차와 Story 사이에서 고르지 않게 한다. 계약 안. 시점: SM의 다음 수정.
  - PO1-N3 tech-debt-3-INSP-004가 Git이 보지 않는 경로를 재지 않음(PO). 출처: "파일 위치"의 "바꾸지 않음" 행의 `.bmad-core/`, 이 checkout의 `.git/info/exclude`의 `/.bmad-core/`. 값어치: INSP-004의 통과를 그 경로까지 말하면 이 Story가 고치는 꼴을 되풀이한다. 계약 안. 시점: SM의 다음 수정. 잰 범위가 Git이 보는 경로라고 적는다.
  - PO1-N4 줄 번호의 거부가 첫째 문장의 기준에만 있음(PO). 출처: "판정 방법"의 두 거부 목록, Dev Notes "줄 번호를 쓰지 않는다". 값어치: 낮다. 두 기준의 판정을 같게 한다. 계약 안. 시점: SM의 다음 수정.
  - PO1-N5 ref가 없을 때의 결과가 두 곳에서 다름(PO). 출처: "미결 항목과 선행 조건"의 "미완료 점검으로 남으며", tech-debt-3-INSP-001의 "명령이 돌지 않는다". 값어치: 낮다. 계획된 쓰임이 닿지 않고 Task가 갈리지 않는다. 계약 안. 시점: SM의 다음 수정.
- 수집: 완료. 실행 요청이 이 run의 회차에 추가 검토가 없다는 수집 응답이다. 필요한 수정 PO1-B1과 계약 안의 비차단 지적을 SM 피드백으로 넘겼다.
- 승인: 하지 않았다. 판정이 NO-GO이므로 Status는 Draft 그대로다.
- 한계: 이 Story는 시작하지 않아 tech-debt-3-INSP-004를 돌릴 수 없고 PO1-B1의 입력은 시작 절차의 글과 Story bug-2의 커밋에서 얻었다. 재기는 Windows x64의 Node.js v24.22.1에서만 했다. 외부 자료와 원격을 읽지 않았다. `quality` 종류의 규칙 본문은 PO의 규칙 종류가 아니어서 읽지 않았다. effort는 이어가기 로그의 값 `max`이고 이 세션에서 따로 확인하지 못했다.
- 기록: [po-r1](../../story-records/tech-debt-3/po-r1.md)

Run authorization: through Done remote — 사용자, 2026-11-07 05:31 +0900, "*run-story tech-debt-3 remote to Done — 이번 호출은 이 Story의 Done과 요청까지이고 Story는 병합하지 않습니다."

Route: PO1-B1 rework SM

Validation: NO-GO
Round: 1
Collection: complete

### 2회, 2026-11-07

- 판정: GO. later round이고, 이 회차에 다시 본 결과와 이어 쓴 1회의 결과가 현재 적용되는 점검을 모두 덮으며, 모든 필수 점검이 끝났고 열린 차단 지적이 없다.
- 검토자: PO 하위 세션(Sarah, `claude-opus-5-5`), `*run-story tech-debt-3 remote to Done` run의 역할 작업. 1회의 검토자 세션을 이었고 이 Story를 쓰지 않았으며, SM의 점검이 아닌 실제 LLM 검토이고 추가 검토자는 없다. 시각: 2026-11-07, 입력 확인 06:37 +0900, 기록 작성 06:43 +0900 이후.
- 범위와 입력: 열린 차단 지적 PO1-B1, 1회 뒤에 바뀐 글, 그 변경이 닿는 점검이다. 기준은 `main` 20256e4로 1회와 같고 Story와 기록 문서는 커밋하지 않은 초안이다. 검토한 계획 내용은 이 항목을 더하기 전의 Story(`git hash-object --no-filters` 값 `ec41cd39fe47`)와 `sm-2`(`db40f226f466`)이고, 비교 기준은 1회가 읽은 사본과 메인 세션의 스냅샷(둘 다 `43722f291fa9`)이다. 바뀐 곳은 Dev Notes의 "파일 위치", "기술 제약", Testing의 "판정 방법", tech-debt-3-INSP-001, tech-debt-3-INSP-004, "추적", Risk Coverage, `coverage_gaps`, SM Draft Checklist 2회, Change Log이고 `sm-2`가 모두 이름 든다. Status, Story 문장, Scope and Dependencies, AC, Tasks / Subtasks, PO Validation 1회 항목은 같다(섹션별 비교와 1회 저장 값의 재구성).
- full review 조건: 해당하지 않아 이 세션이 이었다. AC의 글, 범위, Task 구조가 바뀌지 않았고 설계 결정이 없으며, 고친 지적이 남거나 되살아나지 않았다. 이 세션은 문맥 사용량을 볼 수 없다.
- 범주 요약: Project policy PASS, 1 PASS(이어 씀), 2 PASS, 3 PASS, 4 PASS, 4.5 PASS, 5 PASS.
- 이어 쓴 앞선 결과: 1회의 범주 1, 값의 재측정, 바뀌지 않은 글의 사실 주장 대조, 바뀐 글이 닿지 않는 Project policy 항목, N-1 ~ N-3의 판정, F-1의 복구 확인, 리드 둘과 기각한 관찰이다. HEAD, 코드, 시험, PRD, Architecture, 결정 기록, 규칙 파일이 1회와 같고 해당 글이 같다. 그 밖의 1회 결과는 이 회차의 결과로 대신한다.
- 닫은 차단 지적:
  - PO1-B1 닫음. AC 3의 글은 그대로이고, "파일 위치"의 "바꾸는 경로"가 Story 파일, `sm-`, `po-` 문서, `dev-` 문서, `qa-` 문서와 gate의 네 행이 되었으며, tech-debt-3-INSP-004가 "그 행"을 받는 경로로 삼는다. 저장된 글로 입력마다 판정해 두 문장의 판정이 같다. 같은 절차를 지난 Story bug-2의 `git diff --name-only 9aea191 refs/archive/story/bug-2`에 이 규칙을 대면 코드와 시험 셋만 밖에 남는다.
- 앞선 비차단 지적: PO1-N2 ~ PO1-N5는 SM이 적용했고 저장된 글로 확인했다. PO1-N1은 적용되지 않아 1회 항목에 남고 병합 뒤 점검이 읽는다.
- SM이 PO 피드백 밖에 더한 것: tech-debt-3-INSP-004의 `git diff --name-only --no-renames --diff-filter=MD {시작} -- docs/story-records/tech-debt-3/`. 받아들인다. 표의 "Dev가 고치지 않는다"를 재는 명령이고 계약 안이다. Story bug-2, Story 1.3의 시작 커밋에서 archive ref까지 출력이 없고(시작 뒤의 새 `sm-`, `po-` 문서에 실패하지 않는다), 고쳐진 기록은 잡는다. AC 3의 글보다 좁은 판정은 이 시나리오의 "시작 커밋 뒤에 `sm-`, `po-` 문서가 고쳐지거나 지워진 경우도 실패다"가 그 경우를 좁히는 글이어서 모순이 아니다.
- 새 지적, 열린 차단 지적, SM 이의 제기, 분류 변경, 늦은 지적, 미완료 점검, 넘겨받은 질문: 없다.
- 수집: 완료. 실행 요청이 이 run의 회차에 추가 검토가 없다는 수집 응답이다. 필요한 수정이 없어 SM 피드백 문서를 쓰지 않았다.
- 승인: 평가한 범위는 Story 전체이고, 이 회차의 결과와 이어 쓴 1회의 결과가 함께 덮는다. 저장한 Story, SM Draft Checklist 2회, PO Validation과 수용 출처의 대조를 읽어 맞음을 확인했고 `check-stage.sh approve`가 종료 상태 0이어서, 1회 항목의 실행 요청 줄의 단계 `through Done`에 따라 Status를 Draft에서 Approved로 바꿨다. 이 전환만으로 구현이 허락되지는 않는다.
- 실행 요청 줄: 1회 항목에 있고 단계는 `through Done remote`다. run의 첫 PO 회차가 한 번 저장하므로 새로 적지 않았다.
- 한계: 이 Story는 시작하지 않아 tech-debt-3-INSP-004를 돌릴 수 없고 판정은 저장된 글의 술어와 앞선 Story의 커밋에 대어 본 것이다. 재기는 Windows x64의 Node.js v24.22.1에서만 했다. 외부 자료와 원격을 읽지 않았다. `quality` 종류의 규칙 본문은 PO의 규칙 종류가 아니어서 읽지 않았다. effort는 이어가기 로그의 값 `max`이고 이 세션에서 따로 확인하지 못했다.
- 기록: [po-r2](../../story-records/tech-debt-3/po-r2.md)

Validation: GO
Round: 2
Collection: complete

## Dev Agent Record

### Agent Identity

Dev 하위 세션 James(Full Stack Developer), 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story tech-debt-3 remote to Done` run의 역할 작업. effort는 설정의 이름(`xhigh`)과의 대응을 이 세션이 확인할 수 없다.

### Debug Log References

- 1.1: 표 1, 표 2, 표 3의 값을 다시 낸 명령과 출력, 저장된 정정 항목을 "판정 방법"의 두 기준으로 읽은 대조, 바뀐 경로와 해시, 회귀 점검, Dev 자신의 점검: [dev-1.1](../../story-records/tech-debt-3/dev-1.1.md)
- 2.1: 대조한 문서와 항목별 결과, 바뀐 경로와 해시의 다시 실행: [dev-2.1](../../story-records/tech-debt-3/dev-2.1.md)
- Definition of Done 점검 1회의 항목별 결과와 근거, AC와 시험의 대응: [dev-dod-1](../../story-records/tech-debt-3/dev-dod-1.md)

### Completion Notes List

Issue: #24

- 시작: 2026-11-07 06:49 +0900(시작 커밋 `2e86847`의 시각 06:49:16). `local-story-start.md`를 따랐다. 구현 브랜치 `story/tech-debt-3-story-1-3-dev`, 기준 브랜치 `main`, 기준선 HEAD `20256e4defbc36ab3d1e7cbce224a265e4121034`(`main`의 20256e4이고 `origin/main`과 같다). 슬롯 없는 run이고 원래 checkout에서 시작했다. 이 Story와 기록 문서는 커밋하지 않은 초안이어서 시작 커밋이 Story 브랜치에 더한다. 실행 요청 줄은 PO Validation의 `Run authorization: through Done remote`다. 시작 점검: `check-stage.sh start`, `check-stage.sh records`, `check-stage.sh po-record`(Validation: GO, Round: 2, Collection: complete)가 종료 상태 0이고, 선행 Story 1.3은 `check-merge.sh status 1.3 main`이 `merged`(병합 커밋 937f21c `[Story 1.3] 계산기 화면`, Done 커밋은 archive ref의 6b1b780)를 냈다. 이슈는 `publish.sh issue main story/tech-debt-3-story-1-3-dev`가 새로 만들었다(`issue 24 created`).
- 시작 시 기준 통과: 프로젝트 루트의 `node --test` 76개 통과(실패 0, 취소와 건너뜀 0), `node ci/screen-rule.check.mjs` 종료 상태 0. Draft가 적은 관찰과 같다.
- 1.1: 완료. 접근 `verification-only`(제품과 시험의 동작을 바꾸지 않고 기록만 더해 RED가 없다). tech-debt-3-INSP-001은 `refs/archive/story/1.3`이 있는 이 checkout에서 돌았고 표 1 ~ 표 3의 값이 낸 값과 모두 같았다: 지운 줄 넷과 더한 줄 29, 글이 다른 섹션 셋과 같은 여덟, 기록 문서 11개와 더한 다섯, 세 개정 `8579e5a`, `6701dcd`, `main` 6188a27에서 같은 네 줄(줄마다 40 하나), 48의 두 상수, 앞선 기록 두 파일의 해시. 정정은 아래 별도 항목이다. 저장된 항목을 "판정 방법"의 두 기준으로 읽었고(tech-debt-3-INSP-002, tech-debt-3-INSP-003) 받는 글의 요소를 모두 채웠으며 거부하는 글에 드는 것이 없었다. tech-debt-3-INSP-004는 기준선 `20256e4`와 비교해 바뀐 경로가 모두 Dev Notes "파일 위치"의 "바꾸는 경로" 행의 경로이고, 시작 커밋 뒤 `sm-`, `po-` 문서의 수정과 삭제가 없으며, 표 3의 해시가 같았다(잰 범위는 Git이 보는 경로). tech-debt-3-INT-001은 프로젝트 루트의 `node --test` 76개 통과(실패 0, 취소와 건너뜀 0), `node ci/screen-rule.check.mjs` 종료 상태 0이다. Cleaner 검토자는 기록만 바꾸는 SubTask여서 시작하지 않고 Dev 자신의 점검을 기록했다. 시작 줄의 시각 06:50은 시작 커밋의 시각 06:49:16과 맞지 않아 06:49로 고쳤다. 한계: 정정이 Story 1.3의 파일에 없어 그 두 문장만 읽는 사람은 정정으로 가는 링크를 보지 못한다(N-1, PO1-N1), 정정 글의 참과 잰 범위는 agent-review의 읽기가 판정했다, 표 2의 검색은 Dev Notes부터 다음 `## ` 앞까지만 잰다. 기록: [dev-1.1](../../story-records/tech-debt-3/dev-1.1.md). 커밋 `26a42cd`.
- 정정(Story 1.3 Dev 기록의 두 문장, 단위 1.1): 앞선 기록 `docs/story-records/1.3/dev-dod-2.md`와 `docs/story-records/1.3/dev-qa-r2.md`는 고쳐 쓰지 않고 이 항목에서 정정한다. 이 정정은 Story 1.3의 파일이 아니라 이 Story의 Completion Notes에 있다(Scope and Dependencies의 "정정을 담는 자리"). 두 파일의 `git hash-object` 값은 정정을 쓴 때의 작업 트리에서 `18eb39bc4ecbc7956f3d164bd3990bf739551591`과 `058eb6c45a1ffafc2c3d8fc277777e9ab7a08d25`로 표 3과 같고, 코드와 시험은 바꾸지 않았다. 아래의 값은 `refs/archive/story/1.3`이 가진 커밋 `e71238d`, `6701dcd`, `8579e5a`와 `main` 6188a27에서 이 Story의 Dev가 다시 낸 것이고, 명령과 출력은 [dev-1.1](../../story-records/tech-debt-3/dev-1.1.md)에 있다.
  - 첫째 문장. 자리는 `docs/story-records/1.3/dev-dod-2.md`의 섹션 "프로젝트 정책 점검", 행 "현재 작업과 사실, 편집 이력은 지정된 기록에"다. 그 행은 "Story를 이 라운드 시작 전의 `e71238d`와 섹션별로 비교해 바뀐 섹션이 Change Log와 Dev Agent Record뿐이고 지운 줄이 없음을 확인했다."라고 적고, 이어서 "Status는 Review 전환에서 바꾼다"라고 적는다. 틀린 곳은 "지운 줄이 없음"이다. `git diff e71238d 6701dcd -- docs/stories/1.3.story.md`의 지운 줄은 넷이다(`git diff --numstat`은 더한 줄 29, 지운 줄 4). 하나는 Status의 `InProgress`이고 셋은 File List의 줄이다. 셋은 `src/screen.js`의 `(새 파일)` 줄, `test/screen.test.js`의 `(새 파일)` 줄, 그리고 "바꾸지 않음(기준 `40e1a6b`와 차이 없음을 `git diff`로 확인)"으로 시작하는 줄이며, 각각 다른 글로 고쳐 쓰였다. 앞의 둘은 같은 경로에 "QA 수정 단위" 설명이 붙은 줄이 대신하고 셋째는 "바뀌지 않음(기준 tip `d90c99e`와 차이 없음을 `git diff`로 확인)"으로 시작하는 줄이 대신한다. Status 줄은 그 행이 다음 문장 "Status는 Review 전환에서 바꾼다"로 따로 말한 곳이어서 어긋남이 아니다. 그 행이 쓴 비교는 섹션마다 같음과 바뀜만 가렸고 지운 줄을 세지 않아 File List의 세 줄을 놓쳤다. 섹션 비교로는 글이 다른 섹션이 Status, Change Log, Dev Agent Record 셋이고 다른 여덟 섹션은 같다. 그 행이 말하려던 사실 "앞선 기록을 고쳐 쓰지 않았다"가 참인 범위는 다음과 같다. 기록 문서에서는 `git ls-tree --name-only e71238d docs/story-records/1.3/`의 기록 문서 11개가 `git diff --name-status e71238d 6701dcd -- docs/story-records/1.3`에 나오지 않아 하나도 바뀌지 않았고, 그 출력은 더한 문서(`A`) 다섯 `dev-3.1.md`, `dev-3.2.md`, `dev-3.3.md`, `dev-dod-2.md`, `dev-qa-r2.md`뿐이다. Story에서는 위 넷(Status의 한 줄과 File List의 세 줄)을 뺀 범위에서 참이다. File List의 세 줄의 고침은 Dev의 권한 안이다(`docs/qa/gates/1.3.yml`의 DOC-001).
  - 둘째 문장. 자리는 `docs/story-records/1.3/dev-qa-r2.md`의 섹션 "REQ-002 Story의 수용된 결정과 계획의 글이 사용자의 결정과 어긋난다"의 `확인`이다. 그 `확인`은 "현재 계획의 글(Dev Notes, Testing, 표)에는 40이 없다"라고 적는다. 잰 범위는 `docs/stories/1.3.story.md`의 `## Dev Notes`부터 다음 `## ` 앞까지의 글이고 Testing과 그 표는 이 안에 있다. 이 범위에서 앞에 숫자와 점이 없고 뒤에 숫자나 영문자가 없는 값 40은 네 곳이며 줄마다 하나다. P-1은 Dev Notes "폭 결정을 코드에 옮기는 일"의 1번 "이 커밋 전의 트리에서는 규칙이 40이어서"로 `Story Base` 병합 커밋 전 트리의 옛 규칙의 값이다. P-2는 같은 절의 2번 "`src/screen.js must export SCREEN_WIDTH = 48, got 40`"로 실패 메시지의 값이다. P-3은 Testing "기준 tip에서 관찰한 사실"의 같은 메시지 "`src/screen.js must export SCREEN_WIDTH = 48, got 40`"로 실패 메시지의 값이다. P-4는 Testing의 1.3-INT-001 행 "`Story Base` 병합 커밋 전 트리의 규칙 40으로 낸 결과도 증거가 아니다"로 병합 커밋 전 트리의 옛 규칙의 값이다. 이 범위의 글은 그 문장을 더한 `8579e5a`, `6701dcd`와 `main` 6188a27에서 같다. Scope and Dependencies, SM Draft Checklist, PO Validation, QA Results는 재지 않았다. 계획이 요구하는 값은 48이다. `ci/screen-rule.check.mjs`의 `EXPECTED_WIDTH`와 `src/screen.js`의 `SCREEN_WIDTH`가 48이다. 네 곳의 40은 계획이 요구하는 값이 아니라 옛 규칙의 값이거나 실패 메시지의 값이다.
- 2.1: 완료. 접근 `verification-only`, 시나리오 tech-debt-3-INSP-005, tech-debt-3-INSP-004. 누적 변경(기준선 `20256e4`에서 HEAD까지 이 Story의 Story 파일과 기록 문서 여섯의 추가뿐)을 `docs/architecture.md`의 기술 구성, 소스 트리, 설계 원칙, `README.md`, 결정 기록 `docs/planning/decisions.md`의 D-1, D-2와 대어 어긋난 곳이 없었고 바꾼 문서는 없다(no-change). 설계 원칙 다섯은 실행되는 코드를 바꾸지 않아 이 변경에 닿지 않는다. 소스 트리 표가 `ci/`와 워크플로를 말하지 않는 기존 틈은 이 Story의 변경이 만든 것이 아니고 future-work 파일의 항목 "CI 규칙이 계획 문서에 없음"이 이미 든다. tech-debt-3-INSP-004를 다시 돌려 바뀐 경로가 모두 "바꾸는 경로" 행에 있고 표 3의 해시가 같았다. 기록: [dev-2.1](../../story-records/tech-debt-3/dev-2.1.md). 커밋 `f131d37`.
- Definition of Done: 체크리스트의 적용 항목을 모두 다루었고 [N/A]는 각각 까닭이 있다(코드와 시험을 바꾸지 않음, 빌드와 린트가 설정되어 있지 않음, 범위 기준이 정의되어 있지 않음, 새 의존성과 환경 변수가 없음, 사용자 문서와 기술 문서를 갱신할 필요가 없음). 이 Story가 새로 가려낸 범위 밖 발견은 없다. 기록: [dev-dod-1](../../story-records/tech-debt-3/dev-dod-1.md)
- Review 인계: 구현 범위가 없다. 코드와 시험은 기준선 `20256e4`와 같다(`git diff --name-only 20256e4 -- src test ci .github package.json`이 출력 없음). 이 Story의 변경은 Story 파일과 이 Story의 기록 문서(`dev-1.1.md`, `dev-2.1.md`, `dev-dod-1.md`)뿐이고, 정정한 앞선 기록 두 파일의 Git 해시는 `docs/story-records/1.3/dev-dod-2.md` `18eb39bc4ecbc7956f3d164bd3990bf739551591`, `docs/story-records/1.3/dev-qa-r2.md` `058eb6c45a1ffafc2c3d8fc277777e9ab7a08d25`로 그대로다. SubTask 커밋은 1.1 `26a42cd`, 2.1 `f131d37`이다. 시험 증거: 최종 후보 HEAD `f131d37`에서 프로젝트 루트의 `node --test` 76개 통과(실패 0, 취소와 건너뜀 0), `node ci/screen-rule.check.mjs` 종료 상태 0, tech-debt-3-INSP-004를 최종 상태로 다시 돌려 통과. 한계: 정정 글의 참과 잰 범위는 agent-review의 읽기가 판정했다(QA가 따로 읽는다), 표 2의 40 검색은 Dev Notes부터 다음 `## ` 앞까지만 잰다, tech-debt-3-INSP-004의 잰 범위는 Git이 보는 경로다, 정정이 Story 1.3의 파일에 없어 그 두 문장만 읽는 사람은 정정으로 가는 링크를 보지 못한다(N-1, PO1-N1), CRAP과 성능은 코드를 바꾸지 않아 측정 대상이 없다, 재기는 Windows x64의 Node.js v24.22.1에서만 했고 `refs/archive/story/1.3`은 이 checkout에서 읽었으며 원격의 ref는 보지 않았다, effort의 이름과 이 세션이 받은 값의 대응은 확인하지 못했다. 이 호출은 프로젝트 밖 원문 조사가 사용자의 말로 면제되어 있고 이 Story에는 핵심 기술 결정이 없다(이 면제는 `AGENTS.md`의 조사 요건을 채웠다는 뜻이 아니다). 다음 소유자는 QA의 `review-story.md`다. Dev의 점검은 QA 검토가 아니다.

DoD: READY

### File List

- `docs/stories/tech-debt/tech-debt-3.story.md` (새 파일로 시작 커밋이 더했고, 그 뒤 Tasks / Subtasks 체크박스, Dev Agent Record, Change Log, Status가 바뀜)
- `docs/story-records/tech-debt-3/sm-1.md`, `sm-2.md`, `po-r1.md`, `po-r2.md` (새 파일로 시작 커밋이 더함. SM과 PO의 기록이다)
- `docs/story-records/tech-debt-3/dev-1.1.md` (새 파일. SubTask 1.1의 값 다시 내기, 정정 항목의 읽기, 경로와 해시, 회귀 점검)
- `docs/story-records/tech-debt-3/dev-2.1.md` (새 파일. 바꾼 문서가 없다는 no-change 기록)
- `docs/story-records/tech-debt-3/dev-dod-1.md` (새 파일. Definition of Done 점검 1회)
- 바뀌지 않음(기준선 `20256e4`와 차이 없음을 `git diff --name-only`로 확인): `docs/story-records/1.3/` 아래 모든 파일, `docs/stories/1.3.story.md`, `docs/qa/`, `src/`, `test/`, `ci/`, `.github/`, `package.json`, `README.md`, `docs/prd.md`, `docs/architecture.md`, `docs/planning/`

### In-Flight Comments Ledger

in-flight-comments-ledger: []

## QA Results
