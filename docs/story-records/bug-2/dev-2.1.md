# dev-2.1 — Architecture 정렬

- Story: [bug-2](../../stories/bug/bug-2.story.md)
- Entry: Dev SubTask 2.1
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story bug-2 remote to Done` run의 역할 작업
- 시각: 2026-11-07, 02:23 +0900 시작
- 입력 기준: 브랜치 `story/bug-2`, HEAD `4a69ac7`(SubTask 1.1), 기준선 `main`의 `9aea1916e47d8d677fd0b4c291af260fa355c0a8`. 누적 변경은 기준선에서 HEAD까지 `src/engine.js`, `test/engine.test.js`, `test/screen.test.js` 셋의 수정이고 새 파일과 지운 파일이 없다.
- 접근: `verification-only`(`.bmad-core/tasks/architecture-align.md`). 제품과 시험의 동작을 바꾸지 않는다. 시나리오: bug-2-INSP-003(agent-review).
- 환경: Node.js v24.22.1, Windows x64.

## 읽은 입력

`docs/architecture.md`의 기술 구성, 소스 트리, 설계 원칙, 검토 기록을 끝까지 읽었다. `README.md`(저장소 설명과 시험 명령 `node --test`뿐이고 `src/`에 내장 도움말은 없음), `package.json`, 결정 기록 `docs/planning/decisions.md`의 D-1(식의 꼴과 오류 위치의 세는 법)과 D-2, 그리고 누적 변경의 `git diff`와 변경된 세 파일의 현재 내용이다. 용어집 `docs/domain-glossary.md`는 없어 PRD와 Architecture의 뜻을 썼다. `docs/architecture.md`에 Change Log 절은 없다.

## 항목별 대조

| 항목(출처) | 대조한 사실 | 결과 |
| --- | --- | --- |
| 기술 구성: JavaScript ES 모듈 | `package.json`의 `"type": "module"`이 그대로이고 세 파일 모두 `import`/`export` 문법이다 | 부합 |
| 기술 구성: Node.js 24, 내장 모듈만 | 세 변경 파일의 가져오기는 `node:test`, `node:assert/strict`와 프로젝트 모듈(`../src/engine.js`, `../src/screen.js`)뿐이다. `src/engine.js`에는 가져오기가 없다. 실행 환경 Node.js v24.22.1 | 부합 |
| 기술 구성: 테스트 `node:test`, `node:assert/strict`, `node --test` | 새 시험도 같은 프레임워크와 명령이고 프로젝트 루트의 `node --test` 76개와 `node ci/screen-rule.check.mjs`(종료 상태 0)를 다시 돌렸다 | 부합 |
| 소스 트리: 모듈의 책임 | `src/engine.js`의 책임은 "계산 엔진(`evaluate`, `CalculationError`)"이다. 내보내기는 `CalculationError`, `evaluate` 둘 그대로이고(`import`한 모듈의 키 목록으로 확인), 새 함수 `calculationErrorAt`은 모듈 안에서만 쓰는 비공개다. 새 경로와 새 내보내기가 없다 | 부합 |
| 소스 트리: `test/{모듈}.test.js`는 같은 이름 모듈의 공개 함수 테스트 | 바꾼 시험 파일은 `engine.test.js`와 `screen.test.js`이고 공개 심볼(`evaluate`, `CalculationError`, `renderScreen`)만 부른다. 도우미는 시험 파일 안에 있다 | 부합 |
| 설계 원칙: 공개 함수는 순수 함수, 입출력과 전역 상태 없음 | `evaluate`와 `calculationErrorAt`에 입출력, 모듈 수준의 바뀌는 변수, 전역 접근이 없다(`console`, `process`, `globalThis`, 파일, 난수, 날짜를 찾은 검색에 일치가 없다). 호출마다 새 `Parser`를 만들고 `try`/`catch`는 상태를 남기지 않는다. 한 가지를 따로 적는다: 호출 스택이 모자라 번역되는 식은 스택 상태에 따라 값일 수도 오류일 수도 있다(경계 부근). 이것은 코드가 쓰는 전역 상태가 아니라 실행 환경의 성질이고, Architecture의 글 "입출력이나 전역 상태를 쓰지 않는다"는 어겨지지 않는다. 같은 입력의 결과가 항상 같아야 하는지는 글이 말하지 않으며 Story의 N-4로 소유자 Architect에게 열려 있다 | 부합. 글의 해석은 열려 있고 이 SubTask가 고치거나 정하지 않는다 |
| 설계 원칙: `eval`이나 `Function`을 쓰지 않고 식을 직접 해석 | `src/engine.js`에서 `eval(`, `new Function`, `Function(`를 찾은 검색에 일치가 없다. 번역은 파서 호출을 감쌀 뿐 해석 방식을 바꾸지 않는다 | 부합 |
| 설계 원칙: 오류 클래스는 `Error`를 잇고 자기 모듈에서 내보낸다 | `CalculationError extends Error`이고 `src/engine.js`가 내보낸다(`prototype instanceof Error`가 true). 새 오류도 같은 클래스이며 `ConversionError`는 건드리지 않았다 | 부합 |
| 설계 원칙: `src/engine.js`와 `src/units.js`는 서로 가져다 쓰지 않는다 | `src/engine.js`에서 `units`를, `src/units.js`에서 `engine`을 찾은 검색에 일치가 없다. `src/units.js`는 바뀌지 않았다 | 부합 |
| 설계 원칙: `src/screen.js`는 `src/engine.js`와 `src/number-format.js`만 가져다 쓴다 | `src/screen.js`의 가져오기는 `./engine.js`와 `./number-format.js` 둘이다. 파일은 바뀌지 않았다(기준선과 같음을 `git diff --quiet`로 확인) | 부합 |
| 결정 D-1: 오류 위치는 식의 0부터 센 글자 위치 | 새 오류의 위치는 0, 곧 식의 첫 글자이고 0부터 센 글자 위치의 한 값이다. 어느 글자를 가리키는지는 열린 N-1이어서 정하지 않았다. D-1의 다른 글(수의 꼴, 유한한 수 판정)에 닿는 변경이 없다 | 부합 |
| `README.md` | 저장소 설명과 시험 실행 명령뿐이고 이 변경과 어긋나는 글이 없다 | 부합, 바꿀 것 없음 |
| 도메인 용어 | `docs/domain-glossary.md`가 없다. 새 시험과 코드의 말(`CalculationError`, 식, 위치)은 PRD와 Architecture의 뜻을 쓴다. 새 용어 제안은 없다 | 부합 |

모듈 설계 점검(`data/development-quality.md`의 Architect 절): `calculationErrorAt`은 메시지의 꼴이라는 한 가지 지식을 두 호출자(`Parser.fail`, `evaluate`)에서 한 곳으로 모은 작은 함수이고, 지우면 그 지식이 두 곳에 적힌다. `evaluate`의 인터페이스(인자와 값)는 그대로이며 변하는 것은 이 입력에서 던지는 오류의 클래스뿐이다. 책임은 한 파일에 모여 있고 의존 방향은 그대로다. 실행 비용 규칙은 설치된 JavaScript 규칙에 이 변경에 닿는 것이 없다.

## 결론

어긋난 곳이 없고 바꾼 문서가 없다(no-change). `docs/architecture.md`, `README.md`, `docs/planning/decisions.md`를 고치지 않았다(기준선과 같음을 `git diff --quiet`로 확인, 종료 상태 0). 규칙을 고쳐 위반을 덮은 일이 없다. 코드 위반이 없어 코드를 고치지 않았고 영향받은 점검을 다시 돌릴 필요가 없었다. 그래도 프로젝트 루트의 `node --test`는 76개 통과, 실패 0이고 `node ci/screen-rule.check.mjs`는 종료 상태 0이다(HEAD `4a69ac7`).

고칠 문서가 나오지 않았으므로 Architect에게 보고할 문서 수정은 없다. `docs/architecture.md`에 Change Log 절이 없는 틈은 future-work 항목 "CI 규칙이 계획 문서에 없음"이 이미 든다. 열려 있는 것은 N-4(같은 식의 결과가 경계 부근에서 스택 상태에 달림과 "순수 함수"의 관계), N-5(스택 크기를 바꾼 실행과 다른 런타임)이며 소유자는 Architect이고 이 SubTask가 정하지 않았다.
