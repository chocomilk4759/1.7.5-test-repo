# dev-2.1 — Architecture 정렬

- Story: [1.1](../../stories/1.1.story.md)
- Entry: Dev SubTask 2.1
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.1` run의 역할 작업
- 시각: 2026-11-06 10:27 ~ 10:28 +0900
- 입력 기준: 브랜치 `story/1.1`, SubTask 1.1의 커밋 `d49a11f`. 비교 기준선은 `main`의 `862f5fd`다. 이 SubTask는 접근 `verification-only`이며 제품과 시험의 동작을 바꾸지 않았다.

## 범위와 읽은 입력

`tasks/architecture-align.md`와 `data/development-quality.md`의 섹션 Architect in the final planned Task를 따랐다. 누적 변경은 기준선에서 현재까지 `src/engine.js`와 `test/engine.test.js`가 새 파일로 더해진 것이 전부이고(`git diff 862f5fd --name-status`의 나머지는 Story와 기록 문서), 두 파일을 끝까지 읽었다. 대조한 문서는 `docs/architecture.md` 전체(기술 구성, 소스 트리, 설계 원칙, 검토 기록), `README.md` 전체, `docs/planning/decisions.md`의 D-1, `package.json`, `.github/workflows/ci.yml`, `ci/screen-rule.check.mjs`다. 용어집 파일은 설정에 있으나 존재하지 않아, 용어는 PRD, Architecture, D-1의 뜻을 썼다.

## 대조 결과

| 대상 | 문서가 말하는 것 | 실제 변경과 증거 | 결과 |
| --- | --- | --- | --- |
| 기술 구성: 언어 | JavaScript, ES 모듈(`package.json`의 `"type": "module"`) | 새 파일이 `export`와 `import`를 쓰고 `package.json`은 바뀌지 않았다 | 일치 |
| 기술 구성: 실행 환경 | Node.js 24, 내장 모듈만, 외부 패키지 없음 | `node -p process.version`이 v24.22.1. 엔진은 가져오는 모듈이 없고 시험은 `node:test`, `node:assert/strict`만 가져온다. `package.json`에 `dependencies`가 없다 | 일치 |
| 기술 구성: 테스트 | `node:test`, `node:assert/strict`, 명령 `node --test` | 같은 방식. 프로젝트 루트의 `node --test`가 34개 통과(기존 4개와 엔진 30개) | 일치 |
| 소스 트리 | `src/engine.js`: 계산 엔진(`evaluate`, `CalculationError`). `test/{모듈}.test.js`: 같은 이름 모듈의 공개 함수 테스트 | 실행 시 내보내기가 `CalculationError`, `evaluate` 둘뿐이다. 시험 파일 `test/engine.test.js`는 `../src/engine.js`의 공개 심볼만 가져온다. 소스 트리에 없는 파일은 만들지 않았다 | 일치 |
| 설계 원칙: 순수 함수 | 공개 함수는 입출력이나 전역 상태를 쓰지 않는다 | 1.1-INSP-002의 판단(SubTask 1.1의 기록)과 같다. 가져오기, 입출력, 전역 접근, 모듈 변수가 없다 | 일치 |
| 설계 원칙: 직접 해석 | `eval`이나 `Function`을 쓰지 않는다 | `grep -nE -e "\beval\b" -e "\bFunction\b" src/engine.js`를 다시 실행해 일치 없음(종료 상태 1) | 일치 |
| 설계 원칙: 오류 클래스 | `Error`를 잇고 자기 모듈에서 내보낸다 | `CalculationError extends Error`이고 `src/engine.js`에서 내보낸다. 시험이 `instanceof CalculationError`와 `instanceof Error`를 확인한다 | 일치 |
| 설계 원칙: 모듈 간 가져오기 | `src/engine.js`와 `src/units.js`는 서로 가져오지 않는다. `src/screen.js`는 엔진과 `src/number-format.js`만 가져온다 | 엔진은 아무것도 가져오지 않는다. `src/units.js`와 `src/screen.js`는 아직 없다 | 일치, 나머지 둘은 해당 없음 |
| 결정 D-1: 수의 꼴과 거부 | 숫자 하나 이상, 또는 숫자 하나 이상, 점, 숫자 하나 이상. `.5`, `5.`, 지수 표기, 단항 `+` 거부 | 시험 "accepts digits with an optional fractional part", "rejects a number without digits on both sides of the point or with an exponent", "rejects a unary plus"가 통과 | 일치 |
| 결정 D-1: 단항 마이너스 | 수, 여는 괄호, 다른 단항 마이너스 앞에 올 수 있다(`--3`은 3) | 시험 "accepts a unary minus before a number, a parenthesis or another minus"가 통과 | 일치 |
| 결정 D-1: 유한성 | 계산 중의 값이 유한한 수가 아니게 되면 `CalculationError` | 시험 "rejects a number literal that is not finite", "rejects an intermediate or final result that is not finite"가 통과 | 일치 |
| 결정 D-1: 오류 위치 | 식의 0부터 센 글자 위치 | 시험 "counts error positions from zero in the original expression"과 위치를 말하는 모든 거부 시험이 통과 | 일치 |
| `README.md` | 저장소를 소개하고 시험 실행 명령 `node --test`를 알린다. 엔진의 공개 함수나 동작을 서술하지 않는다 | 명령이 그대로 동작한다. 서술과 어긋나는 곳이 없다 | 일치, 고칠 곳 없음 |
| CI | `node --test`와 `node ci/screen-rule.check.mjs`를 실행 | 두 번째 점검은 `src/screen.js`가 있을 때만 판정하며, 이 변경은 그 파일을 만들지 않는다. 로컬에서 실행해 종료 상태 0 | 영향 없음 |

## 결론

문서와 코드가 어긋난 곳이 없고 규칙을 고치지도 않았다. 고칠 문서가 없어 `docs/architecture.md`, `README.md`, 결정 기록은 바꾸지 않았다(no-change). 기준선과 비교해 `package.json`, `README.md`, `docs/architecture.md`, `docs/prd.md`, `docs/planning`, `ci`, `.github`, `src/number-format.js`, `test/number-format.test.js`에 차이가 없음을 `git diff 862f5fd --stat`의 빈 출력으로 확인했다.

## 한계

- Architecture에 코딩 표준 절과 Change Log 절이 없어 그 절에 대한 대조는 하지 않았다. 이 SubTask는 그 틈을 고치지 않는다(이미 Story의 비차단 지적으로 열려 있다).
- 이 SubTask는 코드를 바꾸지 않아 Independent Cleaner review 대상이 아니다. 코드와 시험은 SubTask 1.1의 Cleaner 결과가 덮는다.
