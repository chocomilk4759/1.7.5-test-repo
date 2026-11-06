# dev-2.1 — Architecture 정렬

- Story: [1.3](../../stories/1.3.story.md)
- Entry: Dev SubTask 2.1
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.2 1.3 remote to Done` run의 역할 작업
- 시각: 2026-11-06 18:27 ~ 18:30 +0900
- 입력 기준: 브랜치 `story/1.3`, SubTask 1.1의 커밋 `aac1c5a`. 비교 기준선은 `main`의 `40e1a6b`다. 이 SubTask는 접근 `verification-only`이며 제품과 시험의 동작을 바꾸지 않았다.

## 범위와 읽은 입력

`tasks/architecture-align.md`와 `data/development-quality.md`의 섹션 Architect in the final planned Task를 따랐다. 누적 변경은 기준선에서 현재까지 `src/screen.js`와 `test/screen.test.js`가 새 파일로 더해진 것이 전부이고(`git diff 40e1a6b --name-status`의 나머지는 Story와 기록 문서), 두 파일을 끝까지 읽었다. 대조한 문서는 `docs/architecture.md` 전체(기술 구성, 소스 트리, 설계 원칙, 검토 기록), `README.md` 전체, `docs/planning/decisions.md`의 결정 D-1(오류 위치, 이 Story는 `evaluate`를 통해 그 결과를 쓴다)이다. 설정된 Architecture는 단일 파일 `docs/architecture.md`다.

## 대조 결과

| 대상 | 문서가 말하는 것 | 실제 변경과 증거 | 결과 |
| --- | --- | --- | --- |
| 기술 구성: 언어 | JavaScript, ES 모듈(`package.json`의 `"type": "module"`) | 새 파일이 `import`와 `export`를 쓰고 `package.json`은 기준선과 차이가 없다(`git diff --quiet`) | 일치 |
| 기술 구성: 실행 환경 | Node.js 24, 내장 모듈만, 외부 패키지 없음 | `node -p process.version`이 v24.22.1. `src/screen.js`는 `./engine.js`와 `./number-format.js`만, 시험은 `node:test`, `node:assert/strict`와 프로젝트 모듈만 가져온다. `package.json`에 `dependencies`와 `devDependencies` 키가 없다 | 일치 |
| 기술 구성: 테스트 | `node:test`, `node:assert/strict`, 명령 `node --test` | 같은 방식. 프로젝트 루트의 `node --test`가 48개 통과(기존 35개와 화면 13개) | 일치 |
| 소스 트리: `src/screen.js` | 계산기 화면(`renderScreen`) | 실행 시 내보내기가 `renderScreen`과 `SCREEN_WIDTH` 둘이다(1.3-UNIT-010이 확인). 행은 `renderScreen`이 이 파일에 있다는 점에서 여전히 맞다. `SCREEN_WIDTH`가 이 행에 없는 것은 Story가 N-8로 밝힌 문서의 틈이며 이 SubTask는 고치지 않는다 | 일치(`renderScreen`), 알려진 틈 하나는 그대로 둠 |
| 소스 트리: `test/{모듈}.test.js` | 같은 이름 모듈의 공개 함수 테스트 | `test/screen.test.js`는 `../src/screen.js`의 공개 심볼로 시험한다. 기대 메시지와 기대 오류만 `../src/engine.js`의 `evaluate`와 `CalculationError`에서 얻으며, 이것은 Story의 "인터페이스와 파일 위치" 표가 정한 대로다. 소스 트리에 없는 파일은 만들지 않았다 | 일치 |
| 설계 원칙: 순수 함수 | 공개 함수는 입출력이나 전역 상태를 쓰지 않는다 | 1.3-INSP-002의 판단(SubTask 1.1의 기록)과 같다. 입출력이 없고 호출 사이에 바뀌는 모듈 변수가 없다. 내보내기 `SCREEN_WIDTH`는 상수다 | 일치 |
| 설계 원칙: 직접 해석 | `eval`이나 `Function`을 쓰지 않는다 | `grep -nE -e "\beval\b" -e "\bFunction\b" src/screen.js test/screen.test.js`에 일치 없음(종료 상태 1). 식 해석은 엔진이 한다 | 일치 |
| 설계 원칙: 오류 클래스 | `Error`를 잇고 자기 모듈에서 내보낸다 | 이 변경은 오류 클래스를 만들지 않는다. `CalculationError`는 엔진에서 가져와 판정에만 쓴다 | 해당 없음, 위반 없음 |
| 설계 원칙: 모듈 간 가져오기 | `src/engine.js`와 `src/units.js`는 서로 가져오지 않는다. `src/screen.js`는 `src/engine.js`와 `src/number-format.js`만 가져온다 | `src/screen.js`의 가져오기는 그 둘뿐이다(1.3-INSP-001과 위 `grep`의 import 줄). `src/engine.js`는 바뀌지 않았다. `src/units.js`는 이 브랜치에 없고 건드리지 않았다 | 일치 |
| 결정 D-1: 오류 위치 | 식의 0부터 센 글자 위치 | 화면은 `evaluate`에 받은 글자를 그대로 넘기고 메시지를 그대로 보여 위치가 받은 글자의 위치다. 1.3-UNIT-005의 시험이 앞 공백이 있는 입력에서 확인한다 | 일치 |
| `README.md` | 저장소를 소개하고 시험 실행 명령 `node --test`를 알린다 | 명령이 그대로 동작한다. 화면 모듈을 서술하지 않아 어긋나는 곳이 없다 | 일치, 고칠 곳 없음 |
| CI | `node --test`와 `node ci/screen-rule.check.mjs`를 실행 | 로컬에서 두 명령 모두 통과(`node --test` 48개, 두 번째는 종료 상태 0). 이 변경은 `ci/`와 `.github/`를 바꾸지 않았다 | 일치 |

## 결론

문서와 코드가 어긋난 곳이 없고 규칙을 고치지도 않았다. 고칠 문서가 없어 `docs/architecture.md`, `README.md`, 결정 기록은 바꾸지 않았다(no-change). 기준선과 비교해 `package.json`, `README.md`, `docs/architecture.md`, `docs/prd.md`, `docs/planning`, `ci`, `.github`, `src/engine.js`, `src/number-format.js`, `test/engine.test.js`, `test/number-format.test.js`에 차이가 없음을 `git diff --quiet 40e1a6b -- ...`의 종료 상태 0으로 확인했다. 코드 위반이 나오지 않아 코드를 고치지 않았고 영향받은 점검은 없지만, 대조의 증거로 프로젝트 루트의 `node --test`(48개 통과)와 `node ci/screen-rule.check.mjs`(종료 상태 0)를 다시 돌렸다.

## 한계

- Architecture에 `SCREEN_WIDTH`, 폭을 넘는 줄의 처리, 코딩 표준 절과 Change Log 절이 없다. Story의 N-8과 메인 세션의 답에 따라 이 SubTask는 그 틈을 고치지 않으며 future-work 항목 "CI 규칙이 계획 문서에 없음"에 남는다.
- 이 SubTask는 코드를 바꾸지 않아 Independent Cleaner review 대상이 아니다. 코드와 시험은 SubTask 1.1의 Cleaner 결과가 덮는다.
- Architecture에 성능 기준이나 실행 비용 결정이 없고, 설치된 JavaScript 규칙에 이 변경에 닿는 실행 비용 규칙이 없어 그에 대한 대조는 하지 않았다.
