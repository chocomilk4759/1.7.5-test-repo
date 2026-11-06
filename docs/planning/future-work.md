# 추후 작업

아직 계획하지 않은 일을 적는다. 항목마다 출처, 내용, 책임 역할과 계획 상태를 둔다.

## 결과 복사

- 출처: 2026-10-29 프로젝트 소유자 메모
- 내용: 계산 결과를 클립보드로 복사하는 기능. 화면이 생기는 뒤 Epic에서 다룬다.
- 책임: PM

Planning: unplanned
Revisit: 2026-10-15

## 압력 단위 별칭

- 출처: 2026-10-29 프로젝트 소유자 메모
- 내용: `psi` 말고 `lbf/in2` 같은 별칭도 받을지. 지금 PRD의 Story 1.2 범위 밖이다.
- 책임: PM

Planning: unplanned

## 오류 위치의 글자

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N1, SM N-1. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "Q1, SM N-1, PO1-N1"
- 내용: AC 3의 "문제가 된 위치"와 D-1의 "식의 0부터 센 글자 위치"는 세는 법만 정한다. 0으로 나누기, 짝 없는 `(`, 공백만 있는 식, 피연산자 없이 끝나는 식, 유한하지 않은 값, 문제가 여럿인 식에서 어느 글자인지는 정하지 않는다.
- 병합 결과: `src/engine.js`는 `docs/story-records/1.1/dev-1.1.md`의 섹션 "선택한 해석과 구현 결정"대로 위치를 고른다. `7 / 0`은 2, `(7`은 0, `7 +`는 3, 공백 세 개는 3이다. 이 규칙은 수용된 결정이 아니다.
- 처리와 까닭: Story는 적용하지 않았다. Testing 표 2가 후보를 모두 받아 합격 판정이 같고, 규칙 하나를 정하려면 새 결정이 필요해 계약 밖이다.
- 필요한 일: 위치 규칙을 결정 기록에 적는다. 문법 오류와 계산 오류가 함께 있는 식(`7 / 0 + a`)에서 어느 쪽이 먼저인지도 함께 정한다. 답이 엔진의 선택과 다르면 `src/engine.js`와 `test/engine.test.js`의 시험 "names the stray character when a closing parenthesis was expected"를 바꾼다. 시험이 정한 규칙을 고정하면 끝난다.
- 책임: 프로젝트 소유자

Planning: undecided
Source Story: 1.1

## AC 3의 목록에 없는 문법 오류

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N2, SM N-2. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "Q2, SM N-2, PO1-N2"
- 내용: AC 3의 목록은 `* 7`, `7 8`, `7(8)`, `()`, `7 +`, `-` 같은 문법 오류를 이름으로 들지 않는다. Story는 Dev Notes의 근거로 이 입력을 `CalculationError`로 계획했다(Testing 표 2의 E-7, E-8).
- 병합 결과: 엔진이 이 입력에 `CalculationError`를 던지고, `test/engine.test.js`의 시험 "rejects tokens that are in the wrong place", "rejects an expression that ends without an operand"가 이를 고정한다.
- 처리와 까닭: Story는 계획대로 구현했고, 이 해석을 수용 문서에 적는 일은 적용하지 않았다. 수용 문서를 바꾸는 일이어서 계약 밖이다.
- 필요한 일: AC 보강이나 D-1과 같은 해석 결정으로 "문법에 맞지 않는 식은 `CalculationError`"를 수용 문서에 적는다(po-r1의 제안). 답이 다르면 Testing 표 2의 E-7, E-8과 시험, 엔진을 그 답에 맞춘다.
- 책임: PM

Planning: undecided
Source Story: 1.1

## 공백의 종류와 자리, 숫자의 범위

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N3, SM N-3. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "Q3, SM N-3, PO1-N3"
- 내용: AC 2는 "수와 연산자 사이의 공백"만 말한다. 탭, 줄바꿈, U+00A0, 식 앞뒤, 괄호 안쪽, 단항 마이너스와 `(` 사이는 정하지 않고, D-1의 "숫자"에 ASCII라는 말이 없다. Testing 표 3은 값과 `CalculationError`를 모두 받는다.
- 병합 결과: 엔진은 U+0020만 공백으로 보고 수 안이 아니면 어디서든 건너뛴다. ` 1 + 2 `, `( 1 + 2 )`, `- (2 + 1)`은 값을 돌려주고, `1\t+ 2`, `1\n+ 2`, `1`과 `+` 사이의 U+00A0는 `CalculationError`다. 숫자는 ASCII `0`~`9`만 읽는다. 이 선택은 수용된 결정이 아니다.
- 처리와 까닭: Story는 적용하지 않았다. 표 3이 두 결과를 받아 합격 판정이 같고, 하나로 정하려면 새 결정이 필요해 계약 밖이다.
- 필요한 일: 공백의 종류와 자리, 숫자의 범위를 해석 결정이나 AC 보강으로 정한다. po-r1의 제안은 공백을 U+0020, `\t`, `\n`, `\r`로 하고 숫자를 ASCII로 하는 것이다. 답이 엔진의 선택과 다르면 `src/engine.js`를 바꾸고, 표 3의 결과를 하나로 줄인 시험을 둔다.
- 책임: PM

Planning: undecided
Source Story: 1.1

## 문자열이 아닌 입력

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N4, SM N-4. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "Q4, SM N-4, PO1-N4"
- 내용: `evaluate(42)`, `evaluate(null)`, `evaluate()`, `evaluate(["1"])`를 수용 문서가 정하지 않는다. D-2의 "값이 number 형이 아니거나"는 영향 범위가 Story 1.2다.
- 병합 결과: 엔진은 `TypeError`("expression must be a string")를 던지고, 시험 "throws an Error for input that is not a string"은 `Error`의 인스턴스인지만 본다. `docs/prd.md`의 Story 1.3 AC 2 "다른 오류는 그대로 던진다"에 따라 화면에서도 이 오류가 그대로 나간다.
- 처리와 까닭: Story는 적용하지 않았다. 1.1-UNIT-014가 두 읽기를 모두 받고, 오류 클래스를 정하려면 새 결정이 필요해 계약 밖이다.
- 필요한 일: 오류 클래스를 해석 결정으로 정한다. po-r1의 제안은 D-2와 같은 방향의 `CalculationError`, 위치 0이다. 답이 `TypeError`가 아니면 엔진을 바꾸고 시험이 그 클래스를 고정한다.
- 책임: PM

Planning: undecided
Source Story: 1.1

## 오류 메시지의 언어와 꼴

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N5, SM N-5. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "Q5, SM N-5, PO1-N5"
- 내용: AC 3은 메시지가 까닭과 위치를 담는다고만 말한다. `docs/prd.md`의 Story 1.3 AC 2는 이 메시지를 `오류: {메시지}`로 사용자에게 보여 준다.
- 병합 결과: 엔진의 메시지는 영어 까닭과 `at position {n}`이다. 그대로 보이면 `오류: division by zero at position 2`가 된다. 시험은 낱말을 고정하지 않는다.
- 처리와 까닭: Story는 적용하지 않았다. 1.1-UNIT-012와 1.1-INSP-003이 두 언어를 모두 받고, 언어를 정하려면 새 결정이 필요해 계약 밖이다.
- 필요한 일: Story 1.3 초안 전에 메시지의 언어와 꼴을 정한다. 답이 영어가 아니면 `src/engine.js`의 까닭 글자를 바꾼다.
- 책임: PM

Planning: undecided
Source Story: 1.1

## 아주 깊은 중첩

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N6, SM N-6. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "Q6, SM N-6, PO1-N6", `docs/story-records/1.1/qa-r1.md`의 넘겨받은 질문 3, `docs/qa/gates/1.1.yml`의 `risk_summary.recommendations.monitor`
- 내용: 재귀 파서는 아주 깊은 중첩에서 콜 스택이 넘쳐 `CalculationError`가 아닌 `RangeError`를 던진다. 수용 문서에 한도가 없고, `evaluate`의 JSDoc도 이 오류를 말하지 않는다.
- 병합 결과: 새 프로세스에서 괄호는 깊이 2000을 통과하고 3000부터 `RangeError`이며, 단항 마이너스는 8000을 통과하고 10000부터 `RangeError`다(Node.js v24.22.1, 이 기기의 기본 스택 크기). 다음 호출은 정상이다. `docs/prd.md`의 Story 1.3 AC 2 "다른 오류는 그대로 던진다"에 따라 화면도 이 입력에서 던진다.
- 처리와 까닭: Story는 적용하지 않았다. 이 입력의 점검이 계획에 없고 검증을 더하면 범위가 넓어져 계약 밖이다. QA는 차단이 아닌 위험(medium)으로 두었다.
- 필요한 일: Story 1.3 초안 전에 처리할 수 없는 깊이의 결과를 정한다. po-r1의 제안은 숫자 한도 없이 "처리할 수 없는 깊이면 `CalculationError`"다. 정해지면 엔진과 JSDoc을 맞추고, 값 또는 그 결과를 받는 시험을 둔다.
- 책임: PM

Planning: undecided
Source Story: 1.1

## CI 규칙이 계획 문서에 없음

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N7, SM N-7. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "Q7, SM N-7, PO1-N7"
- 내용: `ci/screen-rule.check.mjs`는 `src/screen.js`가 있으면 `SCREEN_WIDTH`가 40이기를 요구하는데, `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`에 `SCREEN_WIDTH`가 없다. `docs/architecture.md`에는 코딩 표준 절과 Change Log 절도 없다.
- 병합 결과: `src/screen.js`가 아직 없어 이 점검은 판정하지 않는다. 폭의 뜻도 문서에 없다. 점검의 주석은 "the width of the display"라고 하는데, 엔진의 메시지 `unexpected end of expression at position 3`에 `오류: `를 붙이면 46글자이고 `{식} = {결과}`도 식이 길면 40글자를 넘는다.
- 처리와 까닭: Story는 `src/screen.js`를 만들지 않아 영향이 없고 이 점검은 필수 점검이 아니다. 이 Story의 범위 밖이고 계약 밖이다.
- 필요한 일: Story 1.3 초안 전에 `docs/architecture.md`에 코딩 표준 절과 Change Log 절을 두고, `SCREEN_WIDTH`와 그 폭을 넘는 줄의 처리를 Story 1.3의 범위에 넣을지 정한다. Story 1.3이 `SCREEN_WIDTH`를 모르면 `node ci/screen-rule.check.mjs`에서 실패한다.
- 책임: Architect, PM

Planning: undecided
Source Story: 1.1

## 위치 판정 방법의 문장과 {범위} 행

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N8. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "PO1-N8: 위치 판정 방법의 문장과 `{범위}` 행"
- 내용: Testing의 "식에 든 숫자가 후보 위치와 겹치지 않게 입력을 골랐다"는 E-1의 `1 / (1 / B / B)`, E-10의 `B * 10`, `1 / (B * 10)`에 맞지 않는다. 식의 작은 수가 `{범위}` 안이어서 위치 없이 식만 되풀이한 메시지가 이 세 행을 통과한다. 같은 시나리오의 다른 행은 그런 구현을 잡는다.
- 병합 결과: `test/engine.test.js`에 같은 식이 위치 후보 `null`로 들어갔다. 엔진의 메시지는 식을 되풀이하지 않고 위치를 담는다.
- 처리와 까닭: Story는 적용하지 않았다. SM의 다음 수정이 없었고 Dev는 행을 바꾸지 않았다. 계약 안이다.
- 필요한 일: po-r1의 수정안은 세 행의 작은 수를 식 길이보다 큰 수로 바꾸거나 문장을 후보를 든 행으로 한정하는 것이다.
- 책임: SM, Dev

Planning: undecided
Source Story: 1.1

## 공백 자리의 서술과 E-11의 한 행

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N9. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "PO1-N9: 공백 자리의 서술과 E-11의 한 행"
- 내용: Testing의 "다른 글자와 다른 자리의 공백은 아래 표 3이 다룬다"와 달리 V-3의 `(2 + 3) * 4`와 AC 2의 `2 * -3`은 괄호 옆과 연산자 사이의 공백을 값으로 요구한다. 표 3이 받는 식 앞 공백의 거부는 E-11의 "공백 두 개 뒤의 `a` {2}"에서 떨어진다.
- 병합 결과: 엔진은 식 앞 공백을 건너뛰어 모든 행을 통과하므로 이 어긋남이 드러나지 않았다. `test/engine.test.js`의 시험 "counts error positions from zero in the original expression"에 같은 행이 있다.
- 처리와 까닭: Story는 적용하지 않았다. SM의 다음 수정이 없었다. 계약 안이다.
- 필요한 일: po-r1의 수정안은 문장을 "표 1에 없는 자리"로 좁히고 E-11 첫 행을 앞 공백이 없는 식으로 바꾸는 것이다. "공백의 종류와 자리, 숫자의 범위"의 답이 오면 함께 해소된다.
- 책임: SM

Planning: undecided
Source Story: 1.1

## "미결 계획 결정: 없다"의 표현

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N10. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "PO1-N10"
- 내용: Scope and Dependencies의 "미결 계획 결정: 없다"와 Testing 표 3 머리말의 "질문의 답이 오면 SM 수정에서 기대 결과를 하나로 줄인다"가 어긋난다. 답이 합격 점검을 바꾸므로 `.bmad-core/data/story-slicing.md`의 정의로는 계획 결정이 남아 있다. 막지 않는다는 결론은 같고 분류의 낱말만 부정확하다.
- 처리와 까닭: Story는 적용하지 않았다. SM의 다음 수정이 없어 문장이 병합된 그대로다. 계약 안이다.
- 필요한 일: po-r1의 수정안은 문장을 "계획 결정 N-1, N-3이 남아 있으나 두 읽기의 합격 판정이 같아 막지 않는다"로 고치는 것이다.
- 책임: SM

Planning: undecided
Source Story: 1.1

## 조각 순서와 우선순위

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N11. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "PO1-N11: 조각 순서와 우선순위"
- 내용: Recommended Execution Order는 P1인 1.1-UNIT-013, 1.1-UNIT-003 뒤에 P0인 1.1-UNIT-004를, 다른 P1 조각 뒤에 P0인 1.1-UNIT-006을 둔다. `.bmad-core/tasks/test-design.md`의 "Order by priority within the eligible work"와 다르다. 합격 판정은 같고 값어치는 낮다.
- 병합 결과: Dev는 권고 순서 그대로 조각을 진행했다(`docs/story-records/1.1/qa-r1.md`의 Standards Review).
- 처리와 까닭: Story는 적용하지 않았다. SM의 다음 수정이 없었고 Dev는 순서를 바꾸지 않았다. 계약 안이다.
- 필요한 일: po-r1의 수정안은 1.1-UNIT-004와 1.1-UNIT-006을 1.1-UNIT-013 바로 뒤로 옮기는 것이다.
- 책임: SM

Planning: undecided
Source Story: 1.1

## [Tech-Debt] CalculationError의 name

- 출처: Story 1.1 QA 1회(2026-11-06)의 MNT-001(Optional, 계약 밖)과 Cleaner 지적 F13. `docs/qa/gates/1.1.yml`의 `top_issues`, `docs/stories/1.1.story.md`의 Completion Notes와 처리 줄 `MNT-001 future`, `docs/story-records/1.1/dev-1.1.md`의 섹션 "지적과 처분"
- 내용: `CalculationError`의 `name`이 "Error"여서 `String(error)`와 스택의 첫 줄에 클래스 이름이 나오지 않는다. `util.inspect`만 클래스 이름을 보인다. 로그나 소비 코드가 `name` 또는 `String(error)`로 오류를 구별하면 일반 `Error`로 보인다.
- 처리와 까닭: Dev가 적용하지 않고 future로 기록했다. 수용 문서에 오류의 `name`이 없고 Story 1.3은 `message`만 쓰며, 적용하려면 계약이 침묵하는 속성과 시험이 더 필요해 범위를 넓힌다. QA 2회차와 3회차가 이 판단을 받아들였다.
- 필요한 일: `CalculationError`에 이름을 줄지 정하고, 준다면 시험 한 행을 더한다. QA의 제안은 Story 1.3 초안 전에 정하는 것이다. 같은 결정이 `docs/architecture.md`의 소스 트리가 정한 `ConversionError`(Story 1.2)에도 닿는다.
- 책임: Dev(gate의 제안 소유자)

Planning: undecided
Source Story: 1.1

## [Tech-Debt] CRAP 측정 경로

- 출처: Story 1.1 Dev의 DEV-1. `docs/stories/1.1.story.md`의 Completion Notes와 처리 줄 `DEV-1 future`, `.bmad-core/data/development-quality.md`의 섹션 CRAP check, `docs/qa/gates/1.1.yml`의 `nfr_validation.maintainability`
- 내용: `quality.crap.commands`가 비어 있어 JavaScript 코드(지금은 `src/engine.js`)를 측정할 명령이 없다. CRAP은 측정하지 않음으로 기록했고, 이것은 통과도 차단도 아니다.
- 처리와 까닭: Dev가 적용하지 않고 future로 기록했다. 측정 경로와 한도는 프로젝트 설정의 일이고 이 Story의 요구와 범위에 없으며, 측정 도구가 외부 패키지를 쓰면 `docs/architecture.md`의 "외부 패키지는 쓰지 않는다"와의 조정이 먼저 필요하다.
- 필요한 일: `.bmad-core/data/quality-tooling.md`에 따라 JavaScript의 측정 경로와 한도를 정하고 `quality.crap.commands`를 설정한다. 설정된 명령이 그 코드를 측정하면 끝난다.
- 책임: 프로젝트 소유자(측정 경로와 도구의 승인)

Planning: undecided
Source Story: 1.1

## [Tech-Debt] 새 파일의 저작권과 SPDX 값

- 출처: Story 1.1 QA의 `recommendations.future` 항목(2026-11-06). QA는 회차 `note`에서 이것을 지적이 아닌 리드로 분류했다. `docs/qa/gates/1.1.yml`의 `recommendations.future`, 그 2회차 `note`의 리드 5와 3회차 `note`의 리드 2, `docs/stories/1.1.story.md`의 QA Results 회차 2와 Completion Notes의 'Review 인계(QA 수정 2회차)', `docs/story-records/1.1/dev-1.1.md`의 섹션 "지적과 처분"의 기록 사항
- 내용: `src/engine.js`와 `test/engine.test.js`에 저작권과 SPDX 값이 없다. 프로젝트에 라이선스 파일, 저작권 표기, `package.json`의 `license` 키가 없어 넣을 값이 없다. 기존 `src/number-format.js`에도 값이 없다.
- 처리와 까닭: Dev가 빠진 입력을 기록하고 값을 만들지 않았으며 요약 줄만 두었다. QA는 이것이 CC-CMT-001의 처리와 같아 위반이 아니고 Story를 막지 않는다고 확인했다.
- 필요한 일: 프로젝트 소유자가 값을 주면 머리글에 넣는다. Story 1.2와 1.3이 만드는 파일도 같은 입력을 기다린다.
- 책임: 프로젝트 소유자

Planning: undecided
Source Story: 1.1

## Story 1.3의 공백 판정과 식 표시

- 출처: Story 1.1의 병합 뒤 점검(2026-11-06). 병합 커밋 a81b56a의 `src/engine.js`와 `docs/prd.md`의 Story 1.3 AC 1, AC 3의 대조
- 내용: Story 1.3 AC 3은 "빈 식과 공백만 있는 식은 빈 글자를 돌려준다"고 하고, AC 1은 `{식} = {결과}` 꼴의 한 줄을 돌려준다고 한다. 병합된 엔진은 U+0020만 공백으로 본다. 탭 하나, 줄바꿈 하나, U+00A0 하나만 있는 식은 JavaScript의 `trim`으로는 빈 글자이지만 `evaluate`는 `unexpected character at position 0`의 `CalculationError`를 던지므로, "공백"을 어떻게 읽느냐에 따라 AC 3의 빈 글자와 AC 2의 `오류:` 줄로 결과가 갈린다. 앞뒤 공백이 있는 ` 1 + 2 `도 값 3을 돌려주는데, AC 1은 `{식}`을 받은 글자 그대로 쓰는지 다듬어 쓰는지 정하지 않는다. "공백의 종류와 자리, 숫자의 범위"의 답이 줄바꿈을 공백으로 받으면 `{식}`에 줄바꿈이 들어와 "한 줄"과 어긋난다.
- 처리와 까닭: 이 점검은 기록만 한다. `docs/prd.md`와 Story 1.3의 Epic 항목은 바꾸지 않았고, Story 1.3의 파일은 아직 없다.
- 필요한 일: Story 1.3 초안 전에 AC 3의 "공백"과 AC 1의 `{식}`의 꼴을 정한다. Story 1.3의 Testing이 탭, 줄바꿈, U+00A0만 있는 식과 앞뒤 공백이 있는 식의 결과를 하나로 고정하면 끝난다.
- 책임: PM, SM

Planning: undecided
Source Story: 1.1
