# 공업용 계산기 Architecture

## 기술 구성

| 항목 | 선택 |
| --- | --- |
| 언어 | JavaScript, ES 모듈(`package.json`의 `"type": "module"`) |
| 실행 환경 | Node.js 24, 내장 모듈만 사용하고 외부 패키지는 쓰지 않는다 |
| 테스트 | `node:test`와 `node:assert/strict`, 실행 명령 `node --test` |

## 소스 트리

| 경로 | 책임 |
| --- | --- |
| `src/number-format.js` | 결과 표시 규칙 |
| `src/engine.js` | 계산 엔진(`evaluate`, `CalculationError`) |
| `src/units.js` | 단위 변환(`convert`, `units`, `ConversionError`) |
| `src/screen.js` | 계산기 화면(`renderScreen`) |
| `test/{모듈}.test.js` | 같은 이름 모듈의 공개 함수 테스트 |

## 설계 원칙

- 공개 함수는 순수 함수로 두고 입출력이나 전역 상태를 쓰지 않는다.
- 계산 엔진은 `eval`이나 `Function`을 쓰지 않고 식을 직접 해석한다.
- 오류 클래스는 `Error`를 잇고 자기 모듈에서 내보낸다.
- `src/engine.js`와 `src/units.js`는 서로 가져다 쓰지 않는다.
- `src/screen.js`는 `src/engine.js`와 `src/number-format.js`만 가져다 쓴다.

## 검토 기록

| 일시 | 검토 | 결과 |
| --- | --- | --- |
| 2026-10-29 | 프로젝트 소유자(시험 운영자) 승인 | 기술 구성, 소스 트리, 설계 원칙을 승인한다 |
