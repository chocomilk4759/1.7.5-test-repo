# dev-3.2 — 이미 통과한 시험 셋의 사후 민감도 점검

- Story: [1.1](../../stories/1.1.story.md)
- Entry: Dev QA 수정 단위 3.2, QA 라운드 1의 TEST-002(Required). 결정 목록은 [dev-qa-r1](dev-qa-r1.md)
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.1` run의 역할 작업
- 시각: 2026-11-06, 변형 실행 11:12, 기록 11:13 +0900
- 입력 기준: 브랜치 `story/1.1`, 단위 3.1의 커밋 직후 상태. 시험 파일 `test/engine.test.js`는 `git hash-object` 값 `9c393cf547edc9`, 엔진 `src/engine.js`는 `5e7c584b21900d`다. 이 단위는 파일을 바꾸지 않고 이 기록 문서와 Story의 기록만 더한다. Node.js v24.22.1, 점검 명령은 프로젝트 루트의 `node --test`다

## 접근과 근거

접근은 `verification-only`다. 제품과 시험의 동작을 바꾸지 않는다. `testing-tdd`의 "If a planned test already passes"에 따라, 처음 실행에서 이미 통과한 시험이 의도한 동작에 닿는지 보인다. 닿음은 요구사항에서 나온 틀린 구현 하나가 그 시험을 실패시키는 것으로 보인다. 이 점검은 시험을 더한 직후의 실행이 아니라 나중에 한 사후 점검이고 RED가 아니다. 이 점검은 Dev가 처음 실행한 순서를 증명하지 않으며, 계획이 요구한 기록의 빈자리를 채울 뿐이다. 시나리오: 1.1-UNIT-003(첫째 시험), 1.1-UNIT-006(둘째 시험), 1.1-UNIT-010(셋째 시험).

## 앞선 서술의 정정

앞선 기록은 고쳐 쓰지 않고 여기서 정정한다.

- dev-1.1의 조각 표는 조각 5의 값 시험 "accepts digits with an optional fractional part", 조각 11의 "divides by a number that is not zero", 조각 12a의 유한한 경계값 시험(현재 이름 "accepts the largest finite power of ten and a quotient that underflows")을 "기준 통과"로 적었다. 같은 문서의 "민감도 점검" 표에는 이 셋의 동작을 노린 변형이 없다. 표 아래 문장이 RED를 본 조각(1, 3, 4, 5의 거부 시험, 9a, 9b, 11, 12, 14, 15)을 이 점검에서 뺐는데, 조각 5, 11, 12는 같은 조각의 다른 시험이 RED였을 뿐 위의 세 시험은 처음부터 통과했으므로 이 문장 때문에 점검에서 빠졌다. 그 조각들에서 처음 통과한 시험은 점검이 필요했다.
- Completion Notes의 1.1 줄은 "UNIT-003, UNIT-006, UNIT-007, UNIT-010의 일부 시험"을 "기준 통과와 사후 민감도 점검으로 기록했다"고 쓴다. UNIT-007의 일부(짝 없는 `)` 시험)는 위치를 1부터 세는 변형에서 실패한 출력이 있어 맞다. UNIT-003, UNIT-006, UNIT-010의 위 세 시험에는 사후 점검이 없었으므로 그 서술이 맞지 않았다. 이 단위가 그 점검을 더한다.
- 확인: Dev가 남긴 변형 실행 출력 전부에서 실패한 시험 이름을 찾으면 "divides by a number that is not zero"는 공백을 먼저 지우는 거친 변형에서만 실패했고(공백이 든 식을 모두 거부하는 변형이다), 나머지 둘은 어떤 변형에서도 실패하지 않았다. QA 라운드 1의 관찰과 같다.

## 사후 점검

세 시험 각각에 요구사항에서 나온 틀린 변형을 `src/engine.js`의 사본에 한 번에 하나씩 넣고 현재 시험 파일을 걸었다. 사본은 프로젝트 임시 영역에서만 만들고 실행했으며 추적 파일을 바꾸지 않았다. 변형이 없는 엔진은 엔진 시험 31개를 모두 통과해(기준) 실행기가 올바르게 동작함을 보였다.

| 시험(시나리오) | 변형(틀린 구현) | 요구사항 근거 | 기준 | 변형에서 실패한 시험과 증상 |
| --- | --- | --- | --- | --- |
| accepts digits with an optional fractional part (1.1-UNIT-003) | 맨 앞이 0이고 뒤에 숫자가 오는 수를 거부 | D-1 "수는 숫자 하나 이상", Testing 표 1 V-5의 `007` → 7, `00.50` → 0.5 | 통과 | 이 시험 하나. `007`에서 "unexpected end of expression at position 3" |
| accepts digits with an optional fractional part (1.1-UNIT-003) | 소수 부분을 숫자 한 개로 제한 | D-1 "소수점과 숫자 하나 이상", V-5의 `3.14`, `00.50` | 통과 | 이 시험과 "returns the double-precision result without rounding". 이 시험은 `00.50`에서 "unexpected character at position 4" |
| divides by a number that is not zero (1.1-UNIT-006) | 0인 피제수를 거부 | AC 3은 0으로 나누기만 오류로 정한다. 표 1 V-10의 `0 / 7` → 0 | 통과 | 이 시험 하나. `0 / 7`에서 "division by zero at position 2" |
| divides by a number that is not zero (1.1-UNIT-006) | 크기가 1보다 작은 제수를 0처럼 거부 | AC 3, V-10의 `7 / 0.5` → 14 | 통과 | 이 시험 하나. `7 / 0.5`에서 "division by zero at position 2" |
| accepts the largest finite power of ten and a quotient that underflows (1.1-UNIT-010) | 1e307보다 큰 수 글자를 거부 | D-1 "유한한 수", Testing 표 1 V-9의 `B` → 1e308 | 통과 | 이 시험과 "gives one reason for every division by zero"(식에 `B`가 든다). 이 시험은 `B`에서 "number out of range at position 0" |
| accepts the largest finite power of ten and a quotient that underflows (1.1-UNIT-010) | 0이 아닌 피제수의 몫이 0으로 넘치면 거부 | D-1 "유한한 수가 아니게 되면"만 오류, V-9의 `1 / B / B` → 0 | 통과 | 이 시험과 "gives one reason for every division by zero". 이 시험은 `1 / B / B`에서 "result out of range at position 314" |

세 시험 모두 요구사항에서 나온 틀린 변형에서 실패하고, 변형이 없는 엔진에서는 통과한다. 따라서 각 시험은 가리키는 동작에 닿는다. 변형이 다른 시험도 함께 실패시키는 경우는 그 표에 이름을 적었다.

## 점검

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 변형 실행 | 위 표의 6개 변형과 변형 없는 기준을 현재 시험 파일(`9c393cf547edc9`)에 한 번에 하나씩 실행 | 기준은 31개 통과, 6개 변형은 위 표대로 실패 |
| 파일 불변 | `git status --porcelain=v1`, 이 단위 시작 전 | 작업 트리에 이 단위가 바꾼 제품이나 시험 파일이 없다 |
| 전체 시험 | 프로젝트 루트의 `node --test` | 35개 통과, 실패 0(단위 3.1의 최종 점검과 같은 입력) |

## Independent Cleaner review

이 단위는 코드와 시험을 바꾸지 않고 증거를 모아 기록한다. `data/development-quality.md` 섹션 Independent Cleaner review에 따라 별도 검토자 없이 Dev 자신의 점검을 적는다. Dev 점검: 각 변형이 한 가지만 바꾸고, 요구사항(D-1, AC 3, Testing 표 1)에 근거를 두며, 실제 엔진이 아닌 사본에서만 실행했음을 변형 명세와 출력으로 확인했다. 변형을 설명한 표가 변형 명세와 일치한다.

## 한계

- 변형은 손으로 고른 몇 개이며 변이 도구는 설정되어 있지 않다. 이 점검은 시험이 해당 동작에 닿는다는 증거이지 모든 틀린 구현을 잡는다는 증거가 아니다.
- 이 점검은 사후 점검이다. 처음 통과한 순간의 실행 순서는 증명하지 못하고, 그 순서는 dev-1.1의 저장된 출력이 보여 주는 만큼만 알려진다.
- QA 라운드 1의 사후 변이(맨 앞 0 거부, 0인 피제수 거부, 가장 큰 수 글자 거부, 넘친 몫 거부)는 같은 시험의 민감도를 이미 보였다. 이 단위는 그 결과를 쓰지 않고 Dev의 변형으로 다시 보였다.
