# dev-2.1 — Architecture 정렬

- Story: [tech-debt-3](../../stories/tech-debt/tech-debt-3.story.md)
- Entry: Dev SubTask 2.1
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story tech-debt-3 remote to Done` run의 역할 작업
- 시각: 2026-11-07, 06:55 ~ 06:58 +0900
- 입력 기준: 브랜치 `story/tech-debt-3-story-1-3-dev`, HEAD `26a42cd`(SubTask 1.1), 기준선 `main`의 `20256e4defbc36ab3d1e7cbce224a265e4121034`. 누적 변경은 기준선에서 HEAD까지 이 Story의 Story 파일과 기록 문서 여섯의 추가뿐이다(`git diff --name-status 20256e4 HEAD`: `A` 여섯 줄, 곧 `docs/stories/tech-debt/tech-debt-3.story.md`, `docs/story-records/tech-debt-3/`의 `dev-1.1.md`, `po-r1.md`, `po-r2.md`, `sm-1.md`, `sm-2.md`). 수정과 삭제가 없다.
- 접근: `verification-only`(`.bmad-core/tasks/architecture-align.md`). 제품과 시험의 동작을 바꾸지 않는다. 시나리오: tech-debt-3-INSP-005(agent-review), tech-debt-3-INSP-004(automated, 다시 실행).
- 환경: Node.js v24.22.1, Windows x64, Git 2.51.0.

## 읽은 입력

`docs/architecture.md`의 기술 구성, 소스 트리, 설계 원칙, 검토 기록을 끝까지 읽었다. `README.md`(저장소 설명과 시험 명령 `node --test`뿐이고 `src/`에 내장 도움말은 없음), `package.json`, 결정 기록 `docs/planning/decisions.md`의 D-1(식의 꼴과 오류 위치의 세는 법)과 D-2(단위 값), 그리고 누적 변경의 `git diff --name-status`와 `git ls-files src test ci .github package.json`이다. 용어집 `docs/domain-glossary.md`는 없어 Story 1.3의 기록과 PRD, Architecture의 뜻을 썼다. `docs/architecture.md`에는 Change Log 절이 없고 마지막 절은 검토 기록이다.

## 항목별 대조

| 항목(출처) | 대조한 사실 | 결과 |
| --- | --- | --- |
| 기술 구성: JavaScript ES 모듈 | `package.json`의 `"type": "module"`이 그대로이고 누적 변경에 코드 파일이 없다 | 부합 |
| 기술 구성: Node.js 24, 내장 모듈만 | 누적 변경에 가져오기가 있는 파일이 없고 `package.json`의 의존성이 없다. 실행 환경 Node.js v24.22.1 | 부합 |
| 기술 구성: 테스트 `node:test`, `node:assert/strict`, `node --test` | 시험 파일을 더하거나 바꾸지 않았다. 명령 `node --test`가 그대로 76개 통과한다(SubTask 1.1의 tech-debt-3-INT-001) | 부합 |
| 소스 트리: 경로와 책임 | `git ls-files src test`가 `src/engine.js`, `src/number-format.js`, `src/screen.js`, `src/units.js`와 `test/{모듈}.test.js` 넷(`engine`, `number-format`, `screen`, `units`)을 낸다. 표의 네 경로와 시험 규칙에 맞고 누적 변경이 이 파일들을 바꾸지 않았다(`git diff --name-only 20256e4 -- src test`가 출력 없음) | 부합 |
| 소스 트리: 새 경로와 새 내보내기 | 누적 변경은 `docs/` 아래 문서뿐이고 새 코드 경로와 새 내보내기가 없다 | 부합 |
| 설계 원칙: 공개 함수는 순수 함수, 입출력과 전역 상태 없음 | 실행되는 코드를 바꾸지 않았다. 이 변경이 닿는 공개 함수가 없다 | 닿지 않음 |
| 설계 원칙: `eval`이나 `Function` 없이 식을 직접 해석 | 위와 같다 | 닿지 않음 |
| 설계 원칙: 오류 클래스는 `Error`를 잇고 자기 모듈에서 내보냄 | 위와 같다 | 닿지 않음 |
| 설계 원칙: `src/engine.js`와 `src/units.js`는 서로 가져다 쓰지 않음 | 위와 같다 | 닿지 않음 |
| 설계 원칙: `src/screen.js`는 `src/engine.js`와 `src/number-format.js`만 가져다 씀 | 위와 같다 | 닿지 않음 |
| 결정 기록 D-1, D-2 | 식의 꼴, 오류 위치, 단위 값의 결정이어서 기록의 글을 정정하는 이 변경에 닿지 않는다. 정정 항목이 말하는 값 48은 결정 기록이 아니라 Story 1.3의 사용자 결정(`SCREEN_WIDTH`)과 코드의 상수다 | 닿지 않음 |
| `README.md` | 저장소 설명과 시험 실행 명령뿐이고 이 변경과 어긋나는 글이 없다. `src/`에서 `help`, `usage`를 찾은 검색에 일치가 없어 내장 도움말도 없다 | 부합, 바꿀 것 없음 |
| 도메인 용어 | `docs/domain-glossary.md`가 없다. 정정 항목의 말(`SCREEN_WIDTH`, 옛 규칙, 실패 메시지)은 Story 1.3의 기록과 코드 이름의 뜻을 썼다. 새 용어 제안은 없다 | 부합 |

모듈 설계 점검(`data/development-quality.md`의 Architect 절): 코드를 바꾸지 않아 모듈 책임, 의존 방향, 인터페이스 소유, 자료의 흐름이 그대로다. 실행 비용 규칙은 설치된 JavaScript 규칙에 이 변경에 닿는 것이 없다.

기존에 있던 어긋남(이 Story의 변경이 만든 것이 아니다): 소스 트리 표가 `ci/screen-rule.check.mjs`와 `.github/workflows/ci.yml`을 말하지 않는다. 이 틈은 future-work 파일의 항목 "CI 규칙이 계획 문서에 없음"이 이미 든다. 이 SubTask가 정하거나 고치지 않았다.

## tech-debt-3-INSP-005 결과

누적 변경을 `docs/architecture.md`의 기술 구성, 소스 트리, 설계 원칙, `README.md`와 위 대로 대었다. 어긋난 곳이 없고 바꾼 문서가 없다(no-change). 규칙을 고쳐 위반을 덮은 일이 없다. 코드 위반이 없어 코드를 고치지 않았고 영향받은 점검을 다시 돌릴 필요가 없었다. 시나리오는 대조 없이 no-change라고 적지 않았고, 검토 범위는 위 "읽은 입력"과 "항목별 대조"다. 고칠 문서가 나오지 않았으므로 메인 세션에 돌려줄 문서 수정 질문은 없다.

## tech-debt-3-INSP-004 다시 실행

`{기준}`은 `20256e4`, `{시작}`은 시작 커밋 `2e86847`이다. 이 기록 문서와 Story의 SubTask 2.1 갱신을 저장한 뒤, 커밋하기 전에 돌렸다.

| 명령 | 낸 값 | 받는 경우 |
| --- | --- | --- |
| `git diff --name-only 20256e4` | `docs/stories/tech-debt/tech-debt-3.story.md`, `docs/story-records/tech-debt-3/dev-1.1.md`, `po-r1.md`, `po-r2.md`, `sm-1.md`, `sm-2.md` (여섯 경로) | 모두 "바꾸는 경로" 행의 경로(Story 파일, `sm-`, `po-`, `dev-` 문서)다 |
| `git status --porcelain` | ` M docs/stories/tech-debt/tech-debt-3.story.md`, `?? docs/story-records/tech-debt-3/dev-2.1.md` | 둘 다 그 행의 경로다 |
| `git diff --name-only --no-renames --diff-filter=MD 2e86847 -- docs/story-records/tech-debt-3/` | 출력 없음 | 시작 커밋 뒤에 `sm-`, `po-` 문서가 고쳐지거나 지워지지 않았다 |
| `git hash-object docs/story-records/1.3/dev-dod-2.md docs/story-records/1.3/dev-qa-r2.md` | `18eb39bc4ecbc7956f3d164bd3990bf739551591`, `058eb6c45a1ffafc2c3d8fc277777e9ab7a08d25` | 표 3과 같다 |
| `git diff --name-only 20256e4 -- docs/story-records/1.3 docs/stories/1.3.story.md docs/qa src test ci .github package.json README.md docs/prd.md docs/architecture.md docs/planning` | 출력 없음 | 그 행에 없는 경로가 나오지 않는다 |

기준선과 비교해 바뀐 경로가 모두 "바꾸는 경로" 행에 있고 표 3의 해시가 같아 통과다. 잰 범위는 Git이 보는 경로이고, 이 checkout의 `.git/info/exclude`에 있는 경로(`.bmad-core/` 등)는 재지 않는다.

## 결론

어긋난 곳이 없고 바꾼 문서가 없다(no-change). `docs/architecture.md`, `README.md`, `docs/planning/decisions.md`를 고치지 않았다(기준선과 같음을 `git diff --name-only`로 확인, 출력 없음). 이 SubTask는 기록만 바꾸므로 Independent Cleaner review를 시작하지 않았다. 한계는 SubTask 1.1의 기록과 같고, INSP-005의 대조는 agent-review여서 설계 부합의 판정은 이 Dev의 읽기다.
