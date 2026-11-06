# dev-2.1 — Architecture 정렬

- Story: [1.2](../../stories/1.2.story.md)
- Entry: Dev SubTask 2.1
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.2 1.3 remote to Done` run의 역할 작업
- 시각: 2026-11-06, 14:57 ~ 14:58 +0900
- 입력 기준: 브랜치 `story/1.2`, SubTask 1.1의 커밋 `53267c9`(`src/units.js`, `test/units.test.js`), 기준선 `main`의 `40e1a6b`. 누적 변경은 이 두 새 파일뿐이다.
- 접근: `verification-only`. 제품과 시험의 동작을 바꾸지 않는다. 시나리오 1.2-INSP-003.

## 대조한 문서와 결과

`tasks/architecture-align.md`를 따라 누적 변경과 `docs/architecture.md`의 기술 구성, 소스 트리, 설계 원칙, `docs/planning/decisions.md`의 결정 D-2, `README.md`를 대조했다. 대조에 쓴 명령과 그 출력은 아래 절에 있다.

| 대상 | 문서의 내용 | 실제 코드와 시험 | 결과 |
| --- | --- | --- | --- |
| 기술 구성: 언어 | JavaScript, ES 모듈(`package.json`의 `"type": "module"`) | `package.json`에 `"type": "module"`이 있고 두 새 파일이 `import`와 `export`를 쓴다 | 부합 |
| 기술 구성: 실행 환경 | Node.js 24, 내장 모듈만 쓰고 외부 패키지는 쓰지 않는다 | `src/units.js`는 아무것도 가져오지 않는다. `test/units.test.js`는 `node:test`, `node:assert/strict`, `node:util`과 `../src/units.js`만 가져온다. `package.json`에 `dependencies`와 `devDependencies` 키가 없다. 시험은 Node.js v24.22.1에서 돌렸다 | 부합 |
| 기술 구성: 테스트 | `node:test`와 `node:assert/strict`, 명령 `node --test` | 같은 두 모듈과 프로젝트 루트의 `node --test`로 53개 통과 | 부합 |
| 소스 트리 | `src/units.js`는 단위 변환(`convert`, `units`, `ConversionError`), `test/{모듈}.test.js`는 같은 이름 모듈의 공개 함수 테스트 | `src/units.js`의 내보내기는 `ConversionError`, `convert`, `units` 셋이고, 시험은 `../src/units.js`의 공개 심볼로만 시험한다. 새 파일은 `src/units.js`와 `test/units.test.js` 둘이며 Architecture에 없는 파일이 없다 | 부합 |
| 설계 원칙: 순수 함수 | 공개 함수는 입출력이나 전역 상태를 쓰지 않는다 | `convert`와 `units`가 입출력과 전역 접근(`process`, `console`, `globalThis`, 파일과 네트워크 호출)을 쓰지 않는다. 모듈 수준 값은 선언 뒤 바뀌지 않는 표와 상수이고 `units`는 새 배열을 돌려준다 | 부합 |
| 설계 원칙: 오류 클래스 | `Error`를 잇고 자기 모듈에서 내보낸다 | `ConversionError`가 `Error`를 잇고 `src/units.js`가 내보낸다 | 부합 |
| 설계 원칙: 모듈 사이 | `src/engine.js`와 `src/units.js`는 서로 가져다 쓰지 않는다 | 두 파일에 Story의 가져오기 검색을 돌려 모두 종료 상태 1(가져오기 없음) | 부합 |
| 설계 원칙: `eval`과 `Function` | 계산 엔진에 해당한다 | `src/units.js`에도 쓰지 않는다(검색 일치 없음) | 부합 |
| 설계 원칙: 화면 | `src/screen.js`는 `src/engine.js`와 `src/number-format.js`만 가져다 쓴다 | 이 Story가 `src/screen.js`를 만들지 않고 `src/units.js`를 가져오는 파일도 없다 | 해당 없음 |
| 결정 D-2 | 1 in = 25.4 mm, 1 ft = 0.3048 m, 1 bar = 100 kPa, 1 psi = 6894.757293168 Pa, 온도 식, 절대 영도 0 K와 정확히 0 K 수용, 대소문자 구분, 값이 number 형이 아니거나 유한하지 않으면 `ConversionError`, 상대 오차 1e-12 | 결정문에서 다시 옮긴 값을 공개 함수에 넣어 상대 오차 0으로 일치했고, 오류 입력은 모두 `ConversionError`였다. 시험의 같은 값 판정은 상대 오차 1e-12다 | 부합 |
| `README.md` | 시험 저장소의 목적과 `node --test` 실행 | 함수 수준의 서술이 없고 단위 변환을 만든다는 목적과 시험 명령이 그대로 맞는다 | 부합, 바꿀 곳 없음 |

도메인 용어는 설정된 용어집 `docs/domain-glossary.md`가 없어 PRD, Architecture, D-2의 뜻을 썼다(단위, 종류, 기호). 코드의 이름 `convert`, `units`, `ConversionError`는 Architecture의 소스 트리와 같다. 새 용어 제안은 없다.

모듈 설계 기준(`data/development-quality.md`)으로 본 누적 변경: 공개 인터페이스는 셋뿐이고 그 뒤에 단위 표, 검사 순서, 절대 영도 판정, 기준 단위를 거치는 환산이 숨어 있어 호출자가 순서나 설정을 알 필요가 없다. 의존은 없다. 같은 지식(단위 정의, 온도 상수)은 한 곳에 있다. 시험은 공개 인터페이스로만 동작을 본다.

## 결론

어긋난 곳이 없다. 고칠 문서와 코드가 없어 바꾼 파일이 없다(no-change). 검토 범위는 위 표의 문서 다섯과 누적 변경 두 파일이다. 코드를 고치지 않았으므로 시험을 다시 돌릴 영향은 없지만, 이 단위를 시작할 때 프로젝트 루트의 `node --test` 53개 통과를 다시 확인했다. 기록 문서 이외의 변경이 없어 이 단위의 커밋은 Story와 이 기록만 담는다.

`docs/architecture.md`에는 개정 이력 절과 코딩 표준 절이 없다. 이번 대조에서 고칠 곳이 없어 이력을 둘 일이 생기지 않았고, 이 틈은 `docs/planning/future-work.md`의 "CI 규칙이 계획 문서에 없음" 항목이 이미 든다(N-7).

## 증거 명령과 출력

프로젝트 루트에서 실행했다. 종료 상태 1은 일치하는 줄이 없다는 뜻이다.

| 명령 | 출력 요약 |
| --- | --- |
| `git diff --name-status 40e1a6b HEAD -- src test package.json README.md docs/architecture.md docs/planning/decisions.md` | `A src/units.js`, `A test/units.test.js`만 나온다 |
| `ls src test` | `src`에 `engine.js`, `number-format.js`, `units.js`, `test`에 `engine.test.js`, `number-format.test.js`, `units.test.js` |
| `grep -nE '"type"\|"dependencies"\|"devDependencies"' package.json` | `"type": "module"`만 나온다 |
| Story의 "가져오기 검색" 명령을 `src/units.js`와 `src/engine.js`에 각각 실행 | 둘 다 종료 상태 1 |
| `grep -nE '^[[:space:]]*import\b' test/units.test.js` | 다섯 줄: `node:test`, `node:assert/strict`, `node:util`, `../src/units.js`의 이름공간과 이름 가져오기 |
| `grep -nE '\beval\b\|\bFunction\b' src/units.js` | 종료 상태 1 |
| `grep -nE '\b(process\|console\|globalThis\|require\|fetch\|fs)\b\|Date\.now\|Math\.random' src/units.js` | 종료 상태 1 |
| 결정 D-2의 값을 공개 함수에 넣어 상대 오차를 재는 스크립트 | 값 9줄이 모두 상대 오차 0으로 일치, `ConversionError` 6줄 일치, `exactly 0 K accepted: true`, 종료 상태 0 |
| `node --test` | 53개 통과, 실패 0 |
