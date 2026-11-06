# 추후 작업

아직 계획하지 않은 일을 적는다. 항목마다 출처, 내용, 책임 역할과 계획 상태를 둔다.

### [Bug] 엔진이 CI 규칙을 어겨 필수 점검 test가 실패함

- 출처: Story bug-2의 요청 18에서 실패한 필수 CI 점검과 QA 회차 2(2026-11-07, `.bmad-core/tasks/reopen-story.md`의 다시 열기). 점검의 이름은 `test`이고 링크는 <https://github.com/chocomilk4759/1.7.5-test-repo/actions/runs/42273621186/job/128084214029>다. QA의 기록은 `git show story/bug-2:docs/story-records/bug-2/qa-r2.md`, `git show story/bug-2:docs/qa/gates/bug-2.yml`의 회차 2, `git show story/bug-2:docs/stories/bug/bug-2.story.md`의 QA Results 회차 2이고 `main`에는 없다.
- 내용: 실패한 단계는 `Run node ci/engine-rule.check.mjs`이고 출력은 `src/engine.js must not name RangeError: count the nesting depth instead`이며 종료 상태 1이다. 규칙은 `main`의 `[Chore]` 커밋 0528169가 Done 커밋 9c52693 뒤에 `ci/engine-rule.check.mjs`와 `.github/workflows/ci.yml`의 단계로 더했다. 규칙 파일의 첫 줄은 "the engine does not rest on the host's stack overflow error"이고 점검은 `src/engine.js`에서 글자 `RangeError`를 찾는다. Story bug-2의 `evaluate`는 `error instanceof RangeError`로 스택 넘침을 번역한다. QA의 판정 작업이 기준 tip을 합친 사본에서 같은 글과 종료 상태 1을 재현했고, Story의 변경이 없는 0528169에서는 두 규칙이 종료 상태 0이었다.
- 병합의 사실: QA가 Story 브랜치에서 다시 열기 커밋을 만든 04:27:32 +0900과 거의 같은 때인 2026-11-07 04:27:38 +0900에 요청 18이 head f853bd1(Done 커밋 위의 서비스 갱신)로 병합되었고 병합 커밋은 1c91705다. 실패한 점검은 그대로였고 auto-merge는 03:48에 꺼져 있었다. 이 병합은 `*run-story bug-2 remote` 실행 밖에서 일어났고 누가 병합했는지 그 실행은 확인하지 않았다. 보관 ref `refs/archive/story/bug-2`는 Done 커밋 9c52693을 가리키고 원격 Story 브랜치는 지워졌다. 다시 연 커밋 둘 e9d79ff(`Done -> InProgress`), 3690604(회차 2 기록의 글 정정)는 로컬 브랜치 `story/bug-2`에만 있고 `main`에 없다. QA 회차 2의 기록은 이 커밋들에만 있다.
- 지금 상태: `main`의 Story는 Status Done, gate WAIVED 회차 1이고 로컬 Story 브랜치의 Story는 InProgress, gate FAIL 회차 2다. `main` 1c91705의 `src/engine.js`의 `evaluate`가 `RangeError`를 이름으로 쓴다. 이 점검이 `main`에서 돌린 `node ci/engine-rule.check.mjs`는 같은 글로 종료 상태 1이고, `node --test`는 76개 통과, `node ci/screen-rule.check.mjs`는 종료 상태 0이다(Windows x64, Node.js v24.22.1). 병합 커밋의 트리 7ae7f4f는 QA의 합친 사본의 트리와 같다. `.github/workflows/ci.yml`은 `on: pull_request`에 경로 조건이 없으므로 고칠 때까지 `main`으로 가는 요청의 필수 점검 `test`는 문서만 바꾸는 요청까지 이 단계에서 실패할 것이다. 이 문장은 워크플로의 글과 위 실행에서 온 추론이고 이 점검은 호스팅 서비스를 읽지 않았다.
- 사용자의 답 1(다시 열기의 질문): 결정자는 사용자이고, 2026-11-07 04:05 +0900 뒤에 메인 세션의 질문에 대한 선택으로 답했으며, 범위는 Story bug-2다. Q1(어느 쪽을 바꿀까요)의 답은 "규칙대로 깊이 세기 (QA 권고)"이고 선택지의 설명은 "고정된 수를 넘으면 CalculationError. AC 2, 범위 밖 문장, 사용자의 결정 2건을 바꿉니다. QA가 다시 열고 SM 수정, PO 재검증, Dev TDD, 전체 QA 리뷰, 새 Done 후 병합합니다. 지금 값이 나오는 P(2000), M(8000)은 거부되고, 호출자가 스택을 많이 쓰면 RangeError가 그대로 나갑니다."다. Q2(깊이 한도 수)의 답은 "1000 (QA 측정 근거)"이고 선택지의 설명은 "Story 표 2가 값을 요구하는 깊이(P(1000), M(1000), A(500))를 그대로 통과하고, 호출자 6000프레임까지 값을 돌려주었습니다. 7000프레임부터 RangeError입니다. P(2000), M(8000)은 거부합니다."다. `P(n)`, `M(n)`, `A(n)`은 Story bug-2 Testing의 "입력의 정의"의 표기다.
- 사용자의 답 2(`merged while reopened`의 질문): 결정자는 사용자이고 2026-11-07 04:32 +0900 뒤다. 답은 "병합 유지, 이어 가기"이고 선택지의 설명은 "되돌리지 않습니다. Dev가 main을 fast-forward하고 병합을 확인해 archive ref를 9c52693에 만들고 원격 브랜치를 지웁니다. 로컬 Story 브랜치는 다시 연 커밋 둘과 함께 남습니다. QA가 이 실패를 [Bug] 항목(undecided, 답 '깊이 세기 1000' 포함)으로 적고 PO 병합 뒤 점검이 듭니다. 고치는 일은 그 항목의 계획으로 넘어가고, 그때까지 main의 규칙 위반은 남습니다."다. 설명은 QA가 항목을 적는다고 하지만 QA는 이 파일을 소유하지 않아 `.bmad-core/tasks/run-story.md` 섹션 Stop, hold and carry on대로 PO의 이 점검이 적었다.
- 되돌리기: 사용자는 되돌리지 않았고 되돌리기(기준 브랜치의 되돌리기 커밋이나 호스팅 서비스의 되돌리기 요청)는 여전히 사용자의 결정이다. Story의 병합 위험 줄의 값은 revertible이고 되돌리면 그 식에서 `RangeError`가 돌아온다. 이 점검의 커밋 뒤의 되돌리기는 Story 파일 하나의 충돌을 풀어야 하고 이 점검의 항목은 남는다(`docs/story-records/bug-2/qa-done.md`의 섹션 "병합 위험 판단").
- QA 회차 2의 지적: REQ-001(Required, 소유자 SM, 재검증 PO)은 Story의 수용된 결정과 계획의 글이 답과 어긋난다는 것이다. ARCH-002(Required, 소유자 Dev, 늦은 지적)는 이 실패이고 회차 1의 WAIVED와 완료 점검의 통과를 뒤집어 다음 리뷰는 새 세션의 전체 리뷰라고 적었다. Optional TEST-001, DOC-001은 처리 줄이 `future`이고 항목 "[Tech-Debt] 까닭이 빈 글자인 변형을 시험이 가리지 못함", "[Tech-Debt] Story bug-2 Dev 기록의 두 문장"이 든다. Optional TEST-002, DOC-002는 범위 밖이고 항목 "[Tech-Debt] 엔진 규칙의 점검이 글자 검색임", "CI 규칙이 계획 문서에 없음"이 든다. 면제 ARCH-001은 앞선 설계의 조사 요건만 덮어 이 실패를 덮지 않는다.
- 고칠 글의 목록의 요점(qa-r2의 같은 이름 섹션, 완전함을 보증하지 않는다): 바뀌는 글은 Story의 범위 밖 문장 "깊이나 식 길이의 숫자 한도를 두지 않는다", AC 2의 "깊이의 숫자 한도는 두지 않는다"와 경계 부근의 확인 조건, 수용된 결정의 "숫자 한도 없이"와 스택 넘침을 번역하는 설계, Dev Notes "설계"의 잡는 곳과 `RangeError`, `cause`, Testing의 "필수 점검 명령은 둘이다"(셋이 된다), "100000과 1000은 입력을 고른 값이지 제품 코드의 한도가 아니다", G-5와 시험 `keeps the overflow of the call stack as the cause of the error for an expression nested too deeply`, 표 3과 bug-2-UNIT-003, bug-2-INSP-001의 "깊이를 세는 변수나 숫자 한도", bug-2-INT-001, bug-2-INSP-002의 기준선, `coverage_gaps`다. 답이 정하지 않아 계획이 정할 것은 세는 단위, 경계의 글(1000은 값, 1001부터 오류로 읽을 수 있다), 새 오류의 위치와 까닭(N-1, N-2는 미결), 수의 이름과 자리다.
- 잰 값: QA의 판정 작업(2026-11-07, Windows x64, Node.js v24.22.1)이 합친 사본에 고정된 수 1000을 걸고 `catch`를 지운 사본은 `node --test` 76개 가운데 75개 통과이고 실패는 위 시험 하나이며 두 규칙 종료 상태 0이다. `P(1000)`, `M(1000)`은 값 1이고 `P(1001)`, `M(1001)`, `P(2000)`, `M(8000)`, `P(100000)`은 깊이 오류다. 호출자 6000프레임까지 `P(1000)`은 값 1이고 7000프레임부터 `RangeError`이며 호출자 10000프레임의 `P(1)`도 `RangeError`다. 지금 시험은 수 1000과 2000을 가리지 못한다(표 2는 깊이 1000까지, 표 3은 2000부터다). CI의 Linux에서는 재지 않았다. 사본은 결과를 재는 시험감이고 제안하는 구현이 아니다.
- 조사: 새 설계에 `AGENTS.md` 섹션 Research for uncertainty and core implementation decisions의 참고 자료 다섯 개 조사가 없다. 메인 세션의 답은 `*run-story bug-2 remote` 호출의 프로젝트 밖 조사가 사용자의 말 "이 시험은 네트워크를 막아 두었으므로 프로젝트 밖 원문 조사는 면제하며, 면제 사실을 기록합니다."로 면제라는 것이고 조사 요건을 채운 것이 아니다. 항목 "조사 없이 받은 설계의 남은 일"을 함께 본다.
- 처리와 까닭: Story는 병합되어 다시 열리지 않는다(`.bmad-core/tasks/verify-delivery.md` 섹션 2). 이 점검은 기록만 하고 제품 코드, 시험, CI 규칙을 바꾸지 않았다.
- 필요한 일: 답대로 `Parser`가 중첩을 세어 고정된 수 1000을 넘으면 `CalculationError`를 던지게 하고 `evaluate`의 `try`와 `catch`를 지우며 JSDoc과 시험을 맞춘다. 결함 수정이므로 RED를 먼저 보인다(CC-TDD-005). `src/engine.js`에 글자 `RangeError`를 주석까지 남기지 않고, 글자만 피하는 고침(TEST-002의 세 변형)은 수정으로 받지 않는다. 어느 Story로 할지는 트리아지가 정한다. `node --test`, `node ci/screen-rule.check.mjs`, `node ci/engine-rule.check.mjs`가 통과하고 요청의 필수 점검 `test`가 통과하면 끝난다.
- 책임: 사용자(계획, 되돌리기), SM(계획의 글), Dev(구현), QA(리뷰), PO(새 계획의 검증)

Planning: unplanned
Source Story: bug-2

## 결과 복사

- 출처: 2026-10-29 프로젝트 소유자 메모
- 내용: 계산 결과를 클립보드로 복사하는 기능. 화면이 생기는 뒤 Epic에서 다룬다.
- 책임: PM

Planning: unplanned

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
- 더한 출처: Story 1.3 PO 검증 2회(2026-11-06)의 PO2-N4. `docs/stories/1.3.story.md`의 PO Validation, `docs/story-records/1.3/po-r2.md`의 섹션 "PO2-N4: E-6의 전제 문장이 위치 규칙을 들지 않는다", `docs/qa/gates/1.3.yml`의 회차 3 `adversarial_checks`
- 더한 내용: Story 1.3 Testing 표 2 머리의 "이 길이는 엔진의 까닭 글자에 기댄다"는 위치 규칙을 들지 않는다. 표의 `W`(`7 +` 뒤에 U+0020이 997개 오는 식)의 오류 줄 49글자는 엔진이 끝 위치 1000을 말한다는 데에도 기댄다.
- 더한 병합 결과: `test/screen.test.js`의 시험 `returns a line longer than the display whole`이 그 줄의 길이를 단언한다. QA 회차 3의 엔진 사본에서 끝 위치의 뒤 공백을 빼면 이 시험 하나가 길이 단언에서 실패해 조용히 지나가지 않는다.
- 더한 처리: Story는 적용하지 않았다. SM의 다음 수정이 없었다. 계약 안이다.
- 더한 일: po-r2의 수정안은 그 문장을 "엔진의 까닭 글자와 위치 규칙에 기댄다"로 적는 것이다. 위치 규칙의 답이 끝 위치를 바꾸면 그 변경에서 위 시험의 입력과 길이 단언을 함께 고친다.
- 더한 출처: Story bug-2 PO 검증 1회(2026-11-07)의 PO1-N1, SM N-1. `docs/stories/bug/bug-2.story.md`의 PO Validation, `docs/story-records/bug-2/po-r1.md`의 섹션 "Q1, SM N-1, PO1-N1: 새 오류의 메시지 위치", `docs/qa/gates/bug-2.yml`의 `risk_summary.recommendations.monitor`
- 더한 내용: 처리할 수 없는 깊이의 오류도 이 미결의 한 사례이고 이 항목은 그 오류를 들지 않았다. Story는 위치를 0부터 식 길이까지 받고 "가장 단순한 값은 식의 시작 0"을 구현 선택으로 적는다.
- 더한 병합 결과: `src/engine.js`의 `evaluate`는 이 오류의 위치를 0으로 쓴다. `(` 100000개, `1`, `)` 100000개의 메시지는 `expression nested too deeply at position 0`이고, 그 앞에 `1 + `이 와도 같아서 위치 0은 `1`을 가리킨다(이 점검이 `main` 1c91705에서 실행). `test/engine.test.js`의 시험 `names a position inside an expression that is nested too deeply`는 0부터 식 길이까지 받는다. 이 선택은 수용된 결정이 아니다.
- 더한 처리: Story는 적용하지 않았다. PO 검증 1회의 사본에서 위치 0, 첫 `(`나 `-`, 식 길이가 모두 통과해 합격 판정이 같고, 어느 글자인지 정하려면 새 결정이 필요해 계약 밖이다.
- 더한 일: 위치 규칙을 정할 때 이 오류도 함께 정한다. 항목 "[Bug] 엔진이 CI 규칙을 어겨 필수 점검 test가 실패함"의 일이 이 위치의 코드를 없애고, 그 답을 잰 사본은 수를 넘은 자리의 커서를 위치로 썼으므로(`P(100000)`의 위치 1001) 그 계획과 함께 본다.

Planning: unplanned
Source Story: 1.1
Source Story: 1.3
Source Story: bug-2

## AC 3의 목록에 없는 문법 오류

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N2, SM N-2. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "Q2, SM N-2, PO1-N2"
- 내용: AC 3의 목록은 `* 7`, `7 8`, `7(8)`, `()`, `7 +`, `-` 같은 문법 오류를 이름으로 들지 않는다. Story는 Dev Notes의 근거로 이 입력을 `CalculationError`로 계획했다(Testing 표 2의 E-7, E-8).
- 병합 결과: 엔진이 이 입력에 `CalculationError`를 던지고, `test/engine.test.js`의 시험 "rejects tokens that are in the wrong place", "rejects an expression that ends without an operand"가 이를 고정한다.
- 처리와 까닭: Story는 계획대로 구현했고, 이 해석을 수용 문서에 적는 일은 적용하지 않았다. 수용 문서를 바꾸는 일이어서 계약 밖이다.
- 필요한 일: AC 보강이나 D-1과 같은 해석 결정으로 "문법에 맞지 않는 식은 `CalculationError`"를 수용 문서에 적는다(po-r1의 제안). 답이 다르면 Testing 표 2의 E-7, E-8과 시험, 엔진을 그 답에 맞춘다.
- 책임: PM

Planning: unplanned
Source Story: 1.1

## 공백의 종류와 자리, 숫자의 범위

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N3, SM N-3. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "Q3, SM N-3, PO1-N3"
- 내용: AC 2는 "수와 연산자 사이의 공백"만 말한다. 탭, 줄바꿈, U+00A0, 식 앞뒤, 괄호 안쪽, 단항 마이너스와 `(` 사이는 정하지 않고, D-1의 "숫자"에 ASCII라는 말이 없다. Testing 표 3은 값과 `CalculationError`를 모두 받는다.
- 병합 결과: 엔진은 U+0020만 공백으로 보고 수 안이 아니면 어디서든 건너뛴다. ` 1 + 2 `, `( 1 + 2 )`, `- (2 + 1)`은 값을 돌려주고, `1\t+ 2`, `1\n+ 2`, `1`과 `+` 사이의 U+00A0는 `CalculationError`다. 숫자는 ASCII `0`~`9`만 읽는다. 이 선택은 수용된 결정이 아니다.
- 처리와 까닭: Story는 적용하지 않았다. 표 3이 두 결과를 받아 합격 판정이 같고, 하나로 정하려면 새 결정이 필요해 계약 밖이다.
- 필요한 일: 공백의 종류와 자리, 숫자의 범위를 해석 결정이나 AC 보강으로 정한다. po-r1의 제안은 공백을 U+0020, `\t`, `\n`, `\r`로 하고 숫자를 ASCII로 하는 것이다. 답이 엔진의 선택과 다르면 `src/engine.js`를 바꾸고, 표 3의 결과를 하나로 줄인 시험을 둔다.
- 책임: PM

Planning: unplanned
Source Story: 1.1

## 문자열이 아닌 입력

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N4, SM N-4. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "Q4, SM N-4, PO1-N4"
- 내용: `evaluate(42)`, `evaluate(null)`, `evaluate()`, `evaluate(["1"])`를 수용 문서가 정하지 않는다. D-2의 "값이 number 형이 아니거나"는 영향 범위가 Story 1.2다.
- 병합 결과: 엔진은 `TypeError`("expression must be a string")를 던지고, 시험 "throws an Error for input that is not a string"은 `Error`의 인스턴스인지만 본다. `docs/prd.md`의 Story 1.3 AC 2 "다른 오류는 그대로 던진다"에 따라 화면에서도 이 오류가 그대로 나간다.
- 처리와 까닭: Story는 적용하지 않았다. 1.1-UNIT-014가 두 읽기를 모두 받고, 오류 클래스를 정하려면 새 결정이 필요해 계약 밖이다.
- 필요한 일: 오류 클래스를 해석 결정으로 정한다. po-r1의 제안은 D-2와 같은 방향의 `CalculationError`, 위치 0이다. 답이 `TypeError`가 아니면 엔진을 바꾸고 시험이 그 클래스를 고정한다.
- 책임: PM
- 더한 출처: Story 1.3 PO 검증 1회(2026-11-06)의 PO1-N5, SM N-5. `docs/stories/1.3.story.md`의 PO Validation, `docs/story-records/1.3/po-r1.md`의 섹션 "Q5, SM N-5, PO1-N5: 문자열이 아닌 입력"
- 더한 내용: 인자 없는 호출과 `null`을 Story 1.3 AC 3의 "빈 식"으로 읽는 길도 수용 문서가 정하지 않는다. Story 1.3은 이것을 식이 아니라고 읽어 AC 2로 보냈고, Story 문장의 "아직 식이 없을 때는 화면이 비어 있다"는 넓은 글로 남는다.
- 더한 병합 결과: `renderScreen(42)`, `renderScreen(null)`, `renderScreen()`, `renderScreen(["1"])`은 `evaluate`의 `TypeError`("expression must be a string")를 그대로 던진다. `test/screen.test.js`의 시험 `throws what evaluate throws when that is not a calculation error`는 클래스 이름과 낱말을 고정하지 않고 `evaluate`와 `constructor`, `message`가 같은지 본다.
- 더한 처리: Story는 적용하지 않았다. 오류 클래스와 인자 없는 호출의 뜻을 정하려면 새 결정이 필요해 계약 밖이다.
- 더한 일: 오류 클래스를 정할 때 인자 없는 호출의 뜻도 함께 정한다. Story 1.3 po-r1의 제안은 지금 동작을 그대로 적는 것이고(호출 쪽의 잘못이므로 `오류:` 줄보다 던진다), 위의 Story 1.1 po-r1 제안과 다르다. 둘 다 제안이다. 답이 `TypeError`가 아니면 `src/engine.js`와 함께 Testing 표 2의 T-1과 위 시험의 기대를 바꾼다.
- 더한 출처: Story bug-2 PO 검증 1회(2026-11-07)의 PO1-N3, SM N-3. `docs/stories/bug/bug-2.story.md`의 PO Validation, `docs/story-records/bug-2/po-r1.md`의 섹션 "Q3, SM N-3, PO1-N3: "다른 오류는 그대로 던진다"에 닿는 입력", `docs/qa/gates/bug-2.yml`의 `risk_summary.recommendations.monitor`
- 더한 내용: Story bug-2 뒤로 `docs/prd.md`의 Story 1.3 AC 2 둘째 문장 "다른 오류는 그대로 던진다"에 시험으로 닿는 입력은 문자열이 아닌 입력뿐이다. 이 항목의 답이 `CalculationError`이면 닿는 시험 입력이 없어진다.
- 더한 병합 결과: `test/screen.test.js`의 시험 `throws what evaluate throws when that is not a calculation error`에서 행 "an expression nested too deeply"가 지워졌고 입력 일곱(`42`, `0`, `null`, 인자 없는 호출, `["1"]`, `[]`, `[" "]`)이 남았다. 글자 입력이 이 문장에 닿는 길은 호출자가 스택을 거의 다 쓴 경우뿐이다(항목 "스택 크기를 바꾼 실행과 스택을 거의 다 쓴 호출").
- 더한 처리: Story는 적용하지 않았다. 지금의 답(`TypeError`)에서 판정이 하나이고 수용되지 않은 뒤의 변경을 가정하지 않았다. 계약 밖이다.
- 더한 일: 오류 클래스를 정할 때 함께 본다. po-r1의 제안은 답이 `CalculationError`이면 그 변경의 계획이 Story bug-2 Testing 표 4의 T-1과 위 시험을 다시 정하는 것이다.

Planning: unplanned
Source Story: 1.1
Source Story: 1.3
Source Story: bug-2

## 오류 메시지의 언어와 꼴

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N5, SM N-5. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "Q5, SM N-5, PO1-N5"
- 내용: AC 3은 메시지가 까닭과 위치를 담는다고만 말한다. `docs/prd.md`의 Story 1.3 AC 2는 이 메시지를 `오류: {메시지}`로 사용자에게 보여 준다.
- 병합 결과: 엔진의 메시지는 영어 까닭과 `at position {n}`이다. 그대로 보이면 `오류: division by zero at position 2`가 된다. 시험은 낱말을 고정하지 않는다.
- 처리와 까닭: Story는 적용하지 않았다. 1.1-UNIT-012와 1.1-INSP-003이 두 언어를 모두 받고, 언어를 정하려면 새 결정이 필요해 계약 밖이다.
- 필요한 일: Story 1.3 초안 전에 메시지의 언어와 꼴을 정한다. 답이 영어가 아니면 `src/engine.js`의 까닭 글자를 바꾼다.
- 책임: PM
- 더한 출처: Story 1.3 PO 검증 1회(2026-11-06)의 PO1-N4, SM N-4와 2회의 갱신, Dev의 DEV-1. `docs/stories/1.3.story.md`의 PO Validation, Completion Notes의 DEV-1 항목과 "정정(DEV-1, 단위 3.2 뒤)" 항목, 처리 줄 `DEV-1 future`, `docs/story-records/1.3/po-r1.md`의 섹션 "Q4, SM N-4, PO1-N4: 오류 메시지의 언어와 꼴", `docs/story-records/1.3/po-r2.md`의 섹션 "앞선 지적의 갱신", `docs/story-records/1.3/dev-3.2.md`, `docs/qa/gates/1.3.yml`의 `recommendations.future` 둘째
- 더한 내용: 화면이 이제 이 메시지를 그대로 보인다. 그리고 `test/screen.test.js`의 시험 `returns a line longer than the display whole`의 오류 줄 길이 단언이 엔진의 까닭 글자에 기댄다(DEV-1). 까닭이 짧아지면 입력을 다시 골라야 한다.
- 더한 병합 결과: `renderScreen("7 / 0")`은 `오류: division by zero at position 2`이고, `renderScreen("7 +".padEnd(1000))`은 `오류: unexpected end of expression at position 1000`으로 49글자다. Dev와 QA의 엔진 사본에서 까닭을 `unexpected end`로 줄이면 그 줄이 35글자가 되고 위 시험 하나만 길이 단언에서 실패해 조용히 지나가지 않는다.
- 더한 처리: PO1-N4는 Story가 적용하지 않았다. 바꾸는 일은 `src/engine.js`의 별도 계획이어서 계약 밖이다. DEV-1은 Dev가 적용하지 않고 future로 기록했다. 메시지를 바꾸는 일은 이 항목의 답이 먼저다.
- 더한 일: 위 필요한 일의 "Story 1.3 초안 전에"는 시점이 지났다. Story 1.3 po-r1의 제안은 사용자에게 보이는 글이므로 까닭을 한국어로 하는 것이고, 그러면 `src/engine.js`의 까닭 글자를 바꾸는 별도 계획이 필요하다. 답이 까닭을 줄이면 그 변경에서 위 시험의 길이 단언을 함께 고친다. 오류 줄의 길이는 `오류: `의 4글자, 까닭, ` at position `의 13글자, 위치의 자릿수를 더한 값이어서 까닭이 14글자이면 48글자를 넘으려면 위치가 18자리여야 한다(계산한 값이고 실행한 것이 아니다). 그때는 입력만 다시 고르는 것으로 끝나지 않을 수 있어 길이 단언의 방식을 그 변경에서 다시 정한다. 시험을 고치는 일은 Dev의 책임이다.
- 더한 출처: Story bug-2 PO 검증 1회(2026-11-07)의 PO1-N2, SM N-2. `docs/stories/bug/bug-2.story.md`의 PO Validation, `docs/story-records/bug-2/po-r1.md`의 섹션 "Q2, SM N-2, PO1-N2: 새 까닭 글자의 언어", `docs/qa/gates/bug-2.yml`의 `risk_summary.recommendations.monitor`
- 더한 내용: 사용자에게 보이는 글자에 영어 까닭이 하나 더 늘었다.
- 더한 병합 결과: `renderScreen`은 처리할 수 없는 깊이의 식에 `오류: expression nested too deeply at position 0`을 돌려준다(이 점검이 `main` 1c91705에서 실행). 시험은 낱말을 고정하지 않고 까닭이 다른 문제의 까닭과 다른지만 본다. 영어 낱말이고 식을 되풀이하지 않는다는 조건은 bug-2-INSP-001의 읽기가 보았다.
- 더한 처리: Story는 적용하지 않았다. 언어를 정하려면 새 결정이 필요해 계약 밖이다.
- 더한 일: 이 항목의 답을 새 까닭에도 적용한다. 낱말이 정해질 때 항목 "[Tech-Debt] 까닭이 빈 글자인 변형을 시험이 가리지 못함"의 단언도 함께 본다(QA의 제안).

Planning: unplanned
Source Story: 1.1
Source Story: 1.3
Source Story: bug-2

## CI 규칙이 계획 문서에 없음

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N7, SM N-7. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "Q7, SM N-7, PO1-N7"
- 내용: `ci/screen-rule.check.mjs`는 `src/screen.js`가 있으면 `SCREEN_WIDTH`가 40이기를 요구하는데, `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`에 `SCREEN_WIDTH`가 없다. `docs/architecture.md`에는 코딩 표준 절과 Change Log 절도 없다.
- 병합 결과: `src/screen.js`가 아직 없어 이 점검은 판정하지 않는다. 폭의 뜻도 문서에 없다. 점검의 주석은 "the width of the display"라고 하는데, 엔진의 메시지 `unexpected end of expression at position 3`에 `오류: `를 붙이면 46글자이고 `{식} = {결과}`도 식이 길면 40글자를 넘는다.
- 처리와 까닭: Story는 `src/screen.js`를 만들지 않아 영향이 없고 이 점검은 필수 점검이 아니다. 이 Story의 범위 밖이고 계약 밖이다.
- 필요한 일: Story 1.3 초안 전에 `docs/architecture.md`에 코딩 표준 절과 Change Log 절을 두고, `SCREEN_WIDTH`와 그 폭을 넘는 줄의 처리를 Story 1.3의 범위에 넣을지 정한다. Story 1.3이 `SCREEN_WIDTH`를 모르면 `node ci/screen-rule.check.mjs`에서 실패한다.
- 책임: Architect, PM
- 더한 출처: Story 1.2 PO 검증 1회(2026-11-06)의 PO1-N7, SM N-7. `docs/stories/1.2.story.md`의 PO Validation, `docs/story-records/1.2/po-r1.md`의 섹션 "Q7, SM N-7, PO1-N7: Architecture의 코딩 표준 절과 Change Log 절"
- 더한 내용: 같은 틈을 Story 1.2도 든다. 문서를 바꿀 일이 생기면 개정 이력을 둘 곳이 없다. Story 1.2는 SubTask 2.1이 no-change여서(`docs/story-records/1.2/dev-2.1.md`의 섹션 "결론") 이 틈에 닿지 않았고 적용하지 않았다. 계약 밖이다.
- 더한 사실: `main`의 `ci/screen-rule.check.mjs`는 커밋 cb50c3c(`[Chore] 화면 폭 규칙을 48로 올림`) 뒤로 `SCREEN_WIDTH`가 48이기를 요구한다. 위 내용의 40은 그 전의 값이다. `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`에 `SCREEN_WIDTH`가 여전히 없고 폭의 뜻도 없다.
- 더한 출처: Story 1.3 PO 검증 1회(2026-11-06)의 PO1-N8, SM N-8과 2회의 메인 세션이 넘긴 질문, QA 회차 2의 REQ-001, REQ-002. `docs/stories/1.3.story.md`의 PO Validation과 Scope and Dependencies의 "사용자의 결정(SCREEN_WIDTH)", `docs/story-records/1.3/po-r1.md`의 섹션 "Q8, SM N-8, PO1-N8: Architecture의 틈", `docs/story-records/1.3/po-r2.md`의 섹션 "메인 세션이 넘긴 질문", `docs/story-records/1.3/qa-r2.md`, `docs/story-records/1.3/qa-r3.md`의 섹션 "넘겨받은 질문", `docs/qa/gates/1.3.yml`의 `resolved_issues`와 `risk_summary.recommendations.monitor`
- 더한 내용: Story 1.3 뒤로 `docs/architecture.md`의 소스 트리에서 `src/screen.js` 행 "계산기 화면(`renderScreen`)"이 내보내기 `SCREEN_WIDTH`를 덜 적는다. 행의 글은 책임을 말하므로 틀리지는 않는다. 폭의 뜻은 아래 사용자의 답도 정하지 않아 여전히 어느 수용 문서에도 없다.
- 더한 사실: 이 틈에서 Story 1.3이 Done 뒤에 다시 열렸다(PO 2회와 QA 회차 3이 그렇게 적는다). 앞선 Done 커밋 f5aea95의 `SCREEN_WIDTH`는 메인 세션의 답대로 40이었고, 그 뒤에 `main`에 들어온 cb50c3c 위에서 병합 작업의 사본 검증이 `src/screen.js must export SCREEN_WIDTH = 48, got 40`으로 실패했다(REQ-001, 늦은 지적). 고치는 일이 Story의 수용 결정을 바꾸어 사용자에게 어느 쪽을 바꿀지 물었고, 답은 2026-11-06의 "Story를 48로 (Recommended)"이며 범위는 Story 1.3의 `SCREEN_WIDTH`와 그 다시 열기다. 이 항목의 필요한 일은 그 답에 들지 않았다.
- 더한 병합 결과: `src/screen.js`는 `SCREEN_WIDTH = 48`을 내보내고 `node ci/screen-rule.check.mjs`는 판정을 내려 종료 상태 0이다. `renderScreen`은 이 폭으로 자르거나 접지 않아 `1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12`의 값 줄 53글자와 `"7 +".padEnd(1000)`의 오류 줄 49글자가 그대로 나오고, `test/screen.test.js`의 시험 `returns a line longer than the display whole`이 이를 본다. 값은 여전히 `docs/prd.md`, `docs/architecture.md`, `docs/planning/decisions.md`에 없어, QA는 Story가 Done인 동안 규칙이 바뀌면 같은 어긋남이 되풀이될 수 있다고 적었다(`monitor`).
- 더한 처리: PO1-N8은 Story가 적용하지 않았다. Task 2.1이 이 일을 맡지 않았고 문서를 바꾸는 일이어서 계약 밖이다. REQ-001, REQ-002는 Story에서 고쳐 QA 회차 3이 닫았다.
- 더한 일: 위 필요한 일의 "Story 1.3 초안 전에"는 시점이 지났다. 남은 일은 `docs/architecture.md`에 코딩 표준 절과 Change Log 절을 두고 `SCREEN_WIDTH`의 값과 뜻, 소스 트리의 내보내기를 적으며(Architect), 폭을 넘는 줄의 처리를 정하는 것이다(PM). 문서의 값이 `EXPECTED_WIDTH`와 같고 `src/screen.js` 행이 내보내기를 모두 들면 끝난다.
- 더한 출처: Story bug-2 QA 회차 2(2026-11-07)의 DOC-002와 그 원인인 ARCH-002, REQ-001. `git show story/bug-2:docs/qa/gates/bug-2.yml`의 `top_issues`와 `risk_summary.recommendations.monitor`, `git show story/bug-2:docs/story-records/bug-2/qa-r2.md`의 섹션 "대조한 글", "위험 평가". 재발 비교의 앞선 지적은 Story 1.3 QA 회차 2의 REQ-001, REQ-002(`docs/qa/gates/1.3.yml`의 `resolved_issues`)다.
- 더한 내용: 같은 틈이 둘째 규칙에서 되풀이되었다. `main`의 `[Chore]` 커밋 0528169가 Story bug-2의 Done 커밋 뒤에 `ci/engine-rule.check.mjs`와 `.github/workflows/ci.yml`의 단계를 더했고, 커밋 메시지에 까닭이 없다. Story 1.3의 `REQ-001`, `REQ-002`와 같은 결함이다: Done 뒤에 들어온 CI만 보는 규칙이 필수 점검으로 병합을 막았고, 그 답이 Story의 수용된 결정을 바꾸었다. Story 1.3의 QA가 적은 위험 "Story가 Done인 동안 규칙이 바뀌면 같은 어긋남이 되풀이될 수 있다"가 새 규칙의 꼴로 일어났다.
- 더한 병합 결과: `git grep -n -i -E 'RangeError|nesting|스택|재귀|깊이|depth' main -- docs/architecture.md docs/planning/decisions.md docs/prd.md README.md`와 `git grep -n engine-rule main -- docs README.md`는 일치가 없다(이 점검이 `main` 1c91705에서 실행). 규칙과 사용자가 고른 수 1000이 수용 문서에 없고, `main`의 Story도 앞선 설계를 적는다. 규칙 위반은 `main`에 남았다(항목 "[Bug] 엔진이 CI 규칙을 어겨 필수 점검 test가 실패함").
- 더한 처리: DOC-002는 Optional이고 범위 밖이다. Story가 다시 열린 채 병합되어 Dev의 처리 줄이 없고 지적은 로컬 브랜치의 gate에만 있다.
- 더한 일: 위 남은 일에 `ci/engine-rule.check.mjs`의 규칙과 까닭, 수 1000의 값과 뜻을 더한다(Architect, PM). 규칙의 까닭은 어디에도 적혀 있지 않아 규칙을 더한 사람의 말이 필요하다. 재발 비교의 처리: 지금도 필수 점검과 병합 작업의 사본 검증이 잡으므로, 막았을 첫 장치는 자동 점검이 아니라 규칙 줄이다. 코딩 표준 절에 "CI에 규칙을 더하는 커밋은 이 절에 규칙과 까닭을 적고 열린 요청과 Done Story에 닿는지 먼저 본다"를 두는 것이 제안이다. 항목 "[Tech-Debt] 엔진 규칙의 점검이 글자 검색임"도 함께 본다.

Planning: unplanned
Source Story: 1.1
Source Story: 1.2
Source Story: 1.3
Source Story: bug-2

## 위치 판정 방법의 문장과 {범위} 행

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N8. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "PO1-N8: 위치 판정 방법의 문장과 `{범위}` 행"
- 내용: Testing의 "식에 든 숫자가 후보 위치와 겹치지 않게 입력을 골랐다"는 E-1의 `1 / (1 / B / B)`, E-10의 `B * 10`, `1 / (B * 10)`에 맞지 않는다. 식의 작은 수가 `{범위}` 안이어서 위치 없이 식만 되풀이한 메시지가 이 세 행을 통과한다. 같은 시나리오의 다른 행은 그런 구현을 잡는다.
- 병합 결과: `test/engine.test.js`에 같은 식이 위치 후보 `null`로 들어갔다. 엔진의 메시지는 식을 되풀이하지 않고 위치를 담는다.
- 처리와 까닭: Story는 적용하지 않았다. SM의 다음 수정이 없었고 Dev는 행을 바꾸지 않았다. 계약 안이다.
- 필요한 일: po-r1의 수정안은 세 행의 작은 수를 식 길이보다 큰 수로 바꾸거나 문장을 후보를 든 행으로 한정하는 것이다.
- 책임: SM, Dev

Planning: unplanned
Source Story: 1.1

## 공백 자리의 서술과 E-11의 한 행

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N9. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "PO1-N9: 공백 자리의 서술과 E-11의 한 행"
- 내용: Testing의 "다른 글자와 다른 자리의 공백은 아래 표 3이 다룬다"와 달리 V-3의 `(2 + 3) * 4`와 AC 2의 `2 * -3`은 괄호 옆과 연산자 사이의 공백을 값으로 요구한다. 표 3이 받는 식 앞 공백의 거부는 E-11의 "공백 두 개 뒤의 `a` {2}"에서 떨어진다.
- 병합 결과: 엔진은 식 앞 공백을 건너뛰어 모든 행을 통과하므로 이 어긋남이 드러나지 않았다. `test/engine.test.js`의 시험 "counts error positions from zero in the original expression"에 같은 행이 있다.
- 처리와 까닭: Story는 적용하지 않았다. SM의 다음 수정이 없었다. 계약 안이다.
- 필요한 일: po-r1의 수정안은 문장을 "표 1에 없는 자리"로 좁히고 E-11 첫 행을 앞 공백이 없는 식으로 바꾸는 것이다. "공백의 종류와 자리, 숫자의 범위"의 답이 오면 함께 해소된다.
- 책임: SM

Planning: unplanned
Source Story: 1.1

## "미결 계획 결정: 없다"의 표현

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N10. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "PO1-N10"
- 내용: Scope and Dependencies의 "미결 계획 결정: 없다"와 Testing 표 3 머리말의 "질문의 답이 오면 SM 수정에서 기대 결과를 하나로 줄인다"가 어긋난다. 답이 합격 점검을 바꾸므로 `.bmad-core/data/story-slicing.md`의 정의로는 계획 결정이 남아 있다. 막지 않는다는 결론은 같고 분류의 낱말만 부정확하다.
- 처리와 까닭: Story는 적용하지 않았다. SM의 다음 수정이 없어 문장이 병합된 그대로다. 계약 안이다.
- 필요한 일: po-r1의 수정안은 문장을 "계획 결정 N-1, N-3이 남아 있으나 두 읽기의 합격 판정이 같아 막지 않는다"로 고치는 것이다.
- 책임: SM

Planning: unplanned
Source Story: 1.1

## 조각 순서와 우선순위

- 출처: Story 1.1 PO 검증 1회(2026-11-06)의 PO1-N11. `docs/stories/1.1.story.md`의 PO Validation, `docs/story-records/1.1/po-r1.md`의 섹션 "PO1-N11: 조각 순서와 우선순위"
- 내용: Recommended Execution Order는 P1인 1.1-UNIT-013, 1.1-UNIT-003 뒤에 P0인 1.1-UNIT-004를, 다른 P1 조각 뒤에 P0인 1.1-UNIT-006을 둔다. `.bmad-core/tasks/test-design.md`의 "Order by priority within the eligible work"와 다르다. 합격 판정은 같고 값어치는 낮다.
- 병합 결과: Dev는 권고 순서 그대로 조각을 진행했다(`docs/story-records/1.1/qa-r1.md`의 Standards Review).
- 처리와 까닭: Story는 적용하지 않았다. SM의 다음 수정이 없었고 Dev는 순서를 바꾸지 않았다. 계약 안이다.
- 필요한 일: po-r1의 수정안은 1.1-UNIT-004와 1.1-UNIT-006을 1.1-UNIT-013 바로 뒤로 옮기는 것이다.
- 책임: SM

Planning: unplanned
Source Story: 1.1

## [Tech-Debt] CalculationError의 name

- 출처: Story 1.1 QA 1회(2026-11-06)의 MNT-001(Optional, 계약 밖)과 Cleaner 지적 F13. `docs/qa/gates/1.1.yml`의 `top_issues`, `docs/stories/1.1.story.md`의 Completion Notes와 처리 줄 `MNT-001 future`, `docs/story-records/1.1/dev-1.1.md`의 섹션 "지적과 처분"
- 내용: `CalculationError`의 `name`이 "Error"여서 `String(error)`와 스택의 첫 줄에 클래스 이름이 나오지 않는다. `util.inspect`만 클래스 이름을 보인다. 로그나 소비 코드가 `name` 또는 `String(error)`로 오류를 구별하면 일반 `Error`로 보인다.
- 처리와 까닭: Dev가 적용하지 않고 future로 기록했다. 수용 문서에 오류의 `name`이 없고 Story 1.3은 `message`만 쓰며, 적용하려면 계약이 침묵하는 속성과 시험이 더 필요해 범위를 넓힌다. QA 2회차와 3회차가 이 판단을 받아들였다.
- 필요한 일: `CalculationError`에 이름을 줄지 정하고, 준다면 시험 한 행을 더한다. QA의 제안은 Story 1.3 초안 전에 정하는 것이다. 같은 결정이 `docs/architecture.md`의 소스 트리가 정한 `ConversionError`(Story 1.2)에도 닿는다.
- 책임: Dev(gate의 제안 소유자)
- 더한 출처: Story 1.2 PO 검증 1회(2026-11-06)의 PO1-N5, SM N-5. `docs/stories/1.2.story.md`의 PO Validation, `docs/story-records/1.2/po-r1.md`의 섹션 "Q5, SM N-5, PO1-N5: `ConversionError`의 `name`과 메시지"
- 더한 내용: `new ConversionError("x").name`은 "Error"이고 `String`은 "Error: x"다. 메시지는 입력을 되풀이하지 않는 고정된 영어 문구이고(예: "unknown unit") 수용 문서에 없다. 시험 "throws a ConversionError that is also an Error with a text message"는 클래스와 `message`가 string인지만 본다.
- 더한 처리: Story 1.2는 적용하지 않았다. 속성과 시험을 더하는 일이라 계약 밖이다. po-r1의 제안은 두 오류 클래스를 함께 정하는 것이고 소유자는 Dev와 PM이다. 준다면 `test/units.test.js`에도 한 행을 더한다.
- 더한 출처: Story 1.3 PO 검증 1회(2026-11-06)의 PO1-N7, SM N-7. `docs/stories/1.3.story.md`의 PO Validation, `docs/story-records/1.3/po-r1.md`의 섹션 "Q7, SM N-7, PO1-N7: `CalculationError`의 `name`"
- 더한 내용: Story 1.3에는 값어치가 없다. `src/screen.js`는 `error instanceof CalculationError`로 가리므로 답과 무관하다. `name` 글자로 가리는 변형은 `test/screen.test.js`의 오류 줄 시험에서 실패한다(`docs/story-records/1.3/dev-1.1.md`의 섹션 "사후 민감도 점검").
- 더한 처리: Story 1.3은 적용하지 않았다. 계약 밖이고 po-r1은 제안을 내지 않았다.
- 더한 일: 위 "QA의 제안은 Story 1.3 초안 전에 정하는 것이다"는 시점이 지났다. 어느 답이든 `src/screen.js`와 `test/screen.test.js`를 바꿀 일은 없다.

Planning: unplanned
Source Story: 1.1
Source Story: 1.2
Source Story: 1.3

## [Tech-Debt] CRAP 측정 경로

- 출처: Story 1.1 Dev의 DEV-1. `docs/stories/1.1.story.md`의 Completion Notes와 처리 줄 `DEV-1 future`, `.bmad-core/data/development-quality.md`의 섹션 CRAP check, `docs/qa/gates/1.1.yml`의 `nfr_validation.maintainability`
- 내용: `quality.crap.commands`가 비어 있어 JavaScript 코드(지금은 `src/engine.js`)를 측정할 명령이 없다. CRAP은 측정하지 않음으로 기록했고, 이것은 통과도 차단도 아니다.
- 처리와 까닭: Dev가 적용하지 않고 future로 기록했다. 측정 경로와 한도는 프로젝트 설정의 일이고 이 Story의 요구와 범위에 없으며, 측정 도구가 외부 패키지를 쓰면 `docs/architecture.md`의 "외부 패키지는 쓰지 않는다"와의 조정이 먼저 필요하다.
- 필요한 일: `.bmad-core/data/quality-tooling.md`에 따라 JavaScript의 측정 경로와 한도를 정하고 `quality.crap.commands`를 설정한다. 설정된 명령이 그 코드를 측정하면 끝난다.
- 책임: 프로젝트 소유자(측정 경로와 도구의 승인)

Planning: unplanned
Source Story: 1.1

## [Tech-Debt] 새 파일의 저작권과 SPDX 값

- 출처: Story 1.1 QA의 `recommendations.future` 항목(2026-11-06). QA는 회차 `note`에서 이것을 지적이 아닌 리드로 분류했다. `docs/qa/gates/1.1.yml`의 `recommendations.future`, 그 2회차 `note`의 리드 5와 3회차 `note`의 리드 2, `docs/stories/1.1.story.md`의 QA Results 회차 2와 Completion Notes의 'Review 인계(QA 수정 2회차)', `docs/story-records/1.1/dev-1.1.md`의 섹션 "지적과 처분"의 기록 사항
- 내용: `src/engine.js`와 `test/engine.test.js`에 저작권과 SPDX 값이 없다. 프로젝트에 라이선스 파일, 저작권 표기, `package.json`의 `license` 키가 없어 넣을 값이 없다. 기존 `src/number-format.js`에도 값이 없다.
- 처리와 까닭: Dev가 빠진 입력을 기록하고 값을 만들지 않았으며 요약 줄만 두었다. QA는 이것이 CC-CMT-001의 처리와 같아 위반이 아니고 Story를 막지 않는다고 확인했다.
- 필요한 일: 프로젝트 소유자가 값을 주면 머리글에 넣는다. Story 1.2와 1.3이 만드는 파일도 같은 입력을 기다린다.
- 책임: 프로젝트 소유자
- 더한 출처: Story 1.3 PO 검증 2회(2026-11-06)의 PO2-N3. `docs/stories/1.3.story.md`의 PO Validation, `docs/story-records/1.3/po-r2.md`의 섹션 "PO2-N3: 저작권과 SPDX 문장이 규칙 개정보다 앞선 글이다", `docs/story-records/1.3/qa-r3.md`의 섹션 "넘겨받은 질문", `docs/conventions/Common/CHANGELOG.md`의 2026-11-06 행(Common 3.21, CC-CMT-001), `docs/qa/gates/1.3.yml`의 `recommendations.future` 셋째
- 더한 내용: 그 개정은 라이선스 파일, 기존 머리글, Architecture가 저작권 표기나 라이선스 식별자를 주지 않는 프로젝트에 대해 "takes the file summary alone, with no record and no question"이라고 적는다. 이 프로젝트에는 라이선스 파일, `package.json`의 `license` 키, 저작권 머리글이 없다. Story 1.3 Dev Notes의 "Dev가 빠진 입력을 기록한다"와 이 항목의 "Story 1.2와 1.3이 만드는 파일도 같은 입력을 기다린다"는 개정보다 앞선 글이다.
- 더한 병합 결과: `src/screen.js`와 `test/screen.test.js`의 머리글은 요약 줄만 둔다. QA 회차 3이 CC-CMT-001 본문을 읽어 맞다고 확인했다. 값에 관한 사용자의 답은 이 항목을 `unplanned`로 둔 트리아지의 "저작권자, 연도, SPDX 값은 지금 정하지 않습니다"다.
- 더한 처리: Story는 Dev Notes의 문장을 고치지 않았다. SM의 다음 수정이 없었다. 계약 안이다.
- 더한 일: po-r2의 수정안은 Story 1.3 Dev Notes의 그 문장에서 "Dev가 빠진 입력을 기록한다"를 지우고, 이 항목의 위 문장을 트리아지에서 다시 보는 것이다.

Planning: unplanned
Source Story: 1.1
Source Story: 1.3

## Story 1.3의 공백 판정과 식 표시

- 출처: Story 1.1의 병합 뒤 점검(2026-11-06). 병합 커밋 81c547c의 `src/engine.js`와 `docs/prd.md`의 Story 1.3 AC 1, AC 3의 대조
- 내용: Story 1.3 AC 3은 "빈 식과 공백만 있는 식은 빈 글자를 돌려준다"고 하고, AC 1은 `{식} = {결과}` 꼴의 한 줄을 돌려준다고 한다. 병합된 엔진은 U+0020만 공백으로 본다. 탭 하나, 줄바꿈 하나, U+00A0 하나만 있는 식은 JavaScript의 `trim`으로는 빈 글자이지만 `evaluate`는 `unexpected character at position 0`의 `CalculationError`를 던지므로, "공백"을 어떻게 읽느냐에 따라 AC 3의 빈 글자와 AC 2의 `오류:` 줄로 결과가 갈린다. 앞뒤 공백이 있는 ` 1 + 2 `도 값 3을 돌려주는데, AC 1은 `{식}`을 받은 글자 그대로 쓰는지 다듬어 쓰는지 정하지 않는다. "공백의 종류와 자리, 숫자의 범위"의 답이 줄바꿈을 공백으로 받으면 `{식}`에 줄바꿈이 들어와 "한 줄"과 어긋난다.
- 처리와 까닭: 이 점검은 기록만 한다. `docs/prd.md`와 Story 1.3의 Epic 항목은 바꾸지 않았고, Story 1.3의 파일은 아직 없다.
- 필요한 일: Story 1.3 초안 전에 AC 3의 "공백"과 AC 1의 `{식}`의 꼴을 정한다. Story 1.3의 Testing이 탭, 줄바꿈, U+00A0만 있는 식과 앞뒤 공백이 있는 식의 결과를 하나로 고정하면 끝난다.
- 책임: PM, SM
- 더한 출처: Story 1.3 PO 검증 1회(2026-11-06)의 PO1-N1, SM N-1, PO1-N2, SM N-2, PO1-N12. `docs/stories/1.3.story.md`의 PO Validation, `docs/story-records/1.3/po-r1.md`의 섹션 "Q1, SM N-1, PO1-N1: AC 3의 "공백"", "Q2, SM N-2, PO1-N2: AC 1 `{식}`의 앞뒤 공백", "PO1-N12: future-work 항목의 커밋 표기", `docs/qa/gates/1.3.yml`의 `risk_summary.recommendations.monitor`
- 더한 내용: Story 1.3은 이 두 경계를 정하지 않고 Testing 표 3이 두 결과를 모두 받게 했다(U-1, U-2). 답이 오면 표를 줄이므로 계획 결정이고, 두 읽기의 Task와 합격 판정이 같아 Story를 막지 않았다.
- 더한 병합 결과: `src/screen.js`는 빈 글자와 U+0020만 있는 글자에 빈 글자를 돌려준다. `"\t"`, `"\n"`, `"\r\n"`, U+00A0 하나, U+3000 하나는 `오류: unexpected character at position 0`이고 `" \t "`는 position 1이다. `" 1 + 2 "`는 받은 글자를 그대로 보여 `" 1 + 2  = 3"`처럼 등호 앞 공백이 둘이다. `test/screen.test.js`의 시험 `answers white space other than a space with an empty text or an error line`과 `answers spaces around an expression with the text as received or trimmed`가 두 결과를 받는다. 이 선택은 수용된 결정이 아니다.
- 더한 처리: PO1-N1, PO1-N2는 Story가 적용하지 않았다. 하나로 정하려면 새 결정이 필요해 계약 밖이다. PO1-N12는 이 점검이 적용했다. 위 출처의 커밋을 어느 브랜치에도 없는 a81b56a에서 `main`의 병합 커밋 81c547c로 고쳤고, 두 커밋의 `src/engine.js`는 같은 객체다.
- 더한 일: 위 필요한 일의 "Story 1.3 초안 전에"는 시점이 지났다. AC 3의 "공백"과 AC 1의 `{식}`의 꼴을 해석 결정이나 AC 보강으로 정한다. Story 1.3 po-r1의 제안은 공백을 U+0020으로 하고 `{식}`을 받은 그대로 두는 것이다. 항목 "공백의 종류와 자리, 숫자의 범위"의 답이 엔진의 공백을 넓히면 그 답과 함께 다시 본다. 답이 오면 표 3과 위 두 시험을 한 결과로 줄이고, 지금 동작과 다르면 `src/screen.js`도 바꾼다.

Planning: unplanned
Revisit: 브라우저 화면 Epic을 계획할 때
Source Story: 1.1
Source Story: 1.3

## 변환 결과가 유한하지 않을 때

- 출처: Story 1.2 PO 검증 1회(2026-11-06)의 PO1-N1, SM N-1. `docs/stories/1.2.story.md`의 PO Validation, `docs/story-records/1.2/po-r1.md`의 섹션 "Q1, SM N-1, PO1-N1: 결과가 유한하지 않은 변환"
- 내용: AC 3의 "유한한 수가 아닌 값"과 D-2의 "값이 number 형이 아니거나 유한하지 않으면"은 입력을 말하는 것으로 읽히고, 참값이 배정밀도 범위를 넘는 변환의 결과는 정하지 않는다. Testing 표 3은 무한대와 `ConversionError`를 모두 받는다.
- 병합 결과: `src/units.js`는 무한대를 고른다. `convert(Number.MAX_VALUE, "km", "mm")`는 `Infinity`이고 `convert`의 JSDoc이 이 동작을 적는다. 이 선택은 수용된 결정이 아니다. PO1-N1이 더한 관찰(참값은 유한한데 계산 순서로 넘치는 입력)은 QA의 REL-001로 고쳐져 `convert(1e308, "F", "C")`가 5.555555555555556e+307이다.
- 처리와 까닭: Story는 적용하지 않았다. 표 3이 두 결과를 받아 합격 판정이 같고, 하나로 정하려면 새 결정이 필요해 계약 밖이다.
- 필요한 일: 이 결과를 AC 보강이나 해석 결정으로 정한다. po-r1의 제안은 `ConversionError`다. 항목 "범위 끝의 반올림 오차 안에서 갈리는 결과"도 함께 정한다. 답이 무한대가 아니면 `src/units.js`와 JSDoc을 바꾸고, 시험 "answers a result that overflows with an infinity or a ConversionError"를 한 결과로 줄인다.
- 책임: PM 또는 프로젝트 소유자

Planning: unplanned
Source Story: 1.2

## 기대 값이 0일 때의 같은 값 판정

- 출처: Story 1.2 PO 검증 1회(2026-11-06)의 PO1-N2, SM N-2. `docs/stories/1.2.story.md`의 PO Validation, `docs/story-records/1.2/po-r1.md`의 섹션 "Q2, SM N-2, PO1-N2: 기대 값이 0일 때의 같은 값 판정"
- 내용: D-2의 "상대 오차 1e-12 이내"는 기대 값이 0이면 허용 폭이 0이다. Testing의 "같은 값 판정"은 이것을 그대로 읽어 0이나 -0을 요구하고, 수용 문서는 이 경우를 따로 말하지 않는다.
- 병합 결과: `test/units.test.js`의 `isSameValue`가 허용 폭 0으로 본다. `convert(32, "F", "C")`와 `convert(-459.67, "F", "K")`는 정확히 0이어서 통과한다.
- 처리와 까닭: Story는 적용하지 않았다. 글을 그대로 읽은 것이고 결정 기록에 적는 일은 계약 밖이다.
- 필요한 일: 결정 기록을 고칠 때 이 읽기를 적는다. po-r1의 제안은 "기대 값이 0이면 0 또는 -0"이다. 절대 허용 폭을 두기로 하면 `isSameValue`를 바꾼다.
- 책임: 프로젝트 소유자

Planning: unplanned
Source Story: 1.2

## 절대 영도 판정의 엄밀함

- 출처: Story 1.2 PO 검증 1회(2026-11-06)의 PO1-N3, SM N-3. `docs/stories/1.2.story.md`의 PO Validation, `docs/story-records/1.2/po-r1.md`의 섹션 "Q3, SM N-3, PO1-N3: 절대 영도 판정의 엄밀함"
- 내용: D-2의 허용 오차가 절대 영도 경계의 판정에도 적용되는지 글로 정해져 있지 않다. Story는 그 문장을 시험의 값 비교로 읽어 경계에 허용 오차를 두지 않았다.
- 병합 결과: `convert(-273.15000000000003, "C", "K")`, `convert(-459.67000000000007, "F", "K")`, `convert(-Number.MIN_VALUE, "K", "K")`는 `ConversionError`이고 -273.15 C, -459.67 F, 0 K는 받는다. 시험 "rejects a temperature below absolute zero in every unit"와 "accepts absolute zero written in each temperature unit"가 고정한다.
- 처리와 까닭: Story는 적용하지 않았다. 수용 문서에 적는 일은 계약 밖이다.
- 필요한 일: 이 읽기를 확인해 결정 기록에 적는다. 허용 폭을 두기로 하면 수용된 결정의 변경이고 `convert`와 위 시험을 바꾼다.
- 책임: 프로젝트 소유자

Planning: unplanned
Source Story: 1.2

## 결과가 0에 가까울 때의 정밀도

- 출처: Story 1.2 PO 검증 1회(2026-11-06)의 PO1-N4, SM N-4. `docs/stories/1.2.story.md`의 PO Validation, `docs/story-records/1.2/po-r1.md`의 섹션 "Q4, SM N-4, PO1-N4: 결과가 0에 가까울 때의 정밀도"
- 내용: 결과가 0에 가까우면 D-2의 식 그대로도 상대 오차 1e-12를 넘는다. 입력을 배정밀도로 나타낼 때의 오차가 뺄셈으로 드러난 것이고, 수용 문서는 이 구간의 정밀도를 말하지 않는다.
- 병합 결과: `convert(-273.149, "C", "K")`는 0.0009999999999763531이다(0.001과의 상대 오차 약 2.4e-11). Testing 표 1과 `test/units.test.js`는 이런 입력을 쓰지 않는다.
- 처리와 까닭: Story는 적용하지 않았다. 합격 판정에 닿지 않고 정밀도를 정하는 일은 계약 밖이다.
- 필요한 일: 이 구간의 정밀도를 약속할지 정한다. po-r1의 제안은 약속하지 않는다고 적는 것이고, 약속하려면 정밀 계산이 필요한 요구사항 변경이다. 항목 "같은 단위 반환을 지키는 시험이 없음"도 함께 정한다.
- 책임: 프로젝트 소유자

Planning: unplanned
Source Story: 1.2

## 수용된 글을 그대로 읽은 해석

- 출처: Story 1.2 PO 검증 1회(2026-11-06)의 PO1-N6, SM N-6. `docs/stories/1.2.story.md`의 PO Validation, `docs/story-records/1.2/po-r1.md`의 섹션 "Q6, SM N-6, PO1-N6: 수용된 글을 그대로 읽은 해석"
- 내용: Story는 AC 1, AC 3, AC 4를 이렇게 읽었고 수용 문서에 이 문장들은 없다. 음수 길이와 압력은 변환한다. 글자가 아닌 단위와 종류는 모르는 단위와 종류다. D-2가 관계를 정하지 않는 `mm`, `cm`, `km`, `kPa`, `MPa`는 SI 접두어를 쓴다. `units`의 "목록"은 배열이다.
- 병합 결과: 구현이 이대로이고 Testing의 L-3, P-3, U-1, E-3, E-5를 시험이 고정한다.
- 처리와 까닭: Story는 적용하지 않았다. 수용 문서에 적는 일은 계약 밖이다.
- 필요한 일: 이 읽기를 확인해 AC 보강이나 해석 결정으로 적는다. 다르게 정하면 수용된 결정의 변경이고 `src/units.js`와 `test/units.test.js`를 그 답에 맞춘다.
- 책임: PM

Planning: unplanned
Source Story: 1.2

## 가져오기 검색이 놓치는 줄의 한계

- 출처: Story 1.2 PO 검증 2회(2026-11-06)의 PO2-N1. `docs/stories/1.2.story.md`의 PO Validation, `docs/story-records/1.2/po-r2.md`의 섹션 "PO2-N1: 검색이 놓치는 줄의 한계가 Story에 없다"
- 내용: Testing "가져오기 검색"의 패턴 앞머리 `^[^/*]*`는 같은 줄 앞쪽의 `/`와 `*`를 막는다. 그래서 `const a = 1 / require("./engine.js");`와 `/* lazy */ import("./engine.js");`는 종료 상태 1로 지나간다. `docs/story-records/1.2/sm-2.md`는 이 한계를 적었지만 Story의 섹션은 문자열의 한계만 적는다.
- 병합 결과: `src/units.js`에 그런 줄이 없고 검색은 종료 상태 1이다. 1.2-INSP-002의 읽기에서도 보인다.
- 처리와 까닭: Story는 적용하지 않았다. SM의 다음 수정이 없었다. 계약 안이다.
- 필요한 일: po-r2의 수정안은 섹션 끝 문단에 "같은 줄 앞쪽에 `/`나 `*`가 있는 줄의 `import(`, `require(`는 보지 못한다"를 더하는 것이다.
- 책임: SM

Planning: unplanned
Source Story: 1.2

## [Tech-Debt] 먼저 나누는 변형을 잡는 길이 행

- 출처: Story 1.2 QA 2회(2026-11-06)의 TEST-003(Optional, 계약 안). `docs/qa/gates/1.2.yml`의 `top_issues`, `docs/stories/1.2.story.md`의 Completion Notes와 처리 줄 `TEST-003 future`, `docs/story-records/1.2/dev-qa-r2.md`의 섹션 "TEST-003 먼저 나누는 변이를 시험이 잡지 못한다"
- 내용: `src/units.js`의 `convertTo`를 `(value / target.size) * size`로 바꾼 변형이 `test/units.test.js`의 시험 20개를 모두 통과한다. 이 변형은 `convert(1e307, "mm", "cm")`에서 `Infinity`인데 전달 코드는 1e+306이다. 시험 "converts a pressure that is out of range in pascals"는 목표 크기가 1보다 작은 단위(`mm`, `cm`, `in`, `ft`)를 들지 않는다.
- 처리와 까닭: Dev가 적용하지 않고 future로 기록했다. 전달 코드는 맞고, gate PASS 뒤에 시험을 바꾸면 Done 전에 새 QA 회차가 필요했다.
- 필요한 일: 길이 행 `{ mm: 1e307, cm: 1e306 }`과 `{ mm: 1e308, cm: 1e307, in: 1e308 / 25.4, ft: 1e308 / 304.8 }`을 시험에 더한다. 제품 코드는 바꿀 일이 없다. 변형이 그 행에서 실패하면 끝난다.
- 책임: Dev

Planning: unplanned
Source Story: 1.2

## 같은 단위 반환을 지키는 시험이 없음

- 출처: Story 1.2 Dev의 DEV-2. `docs/stories/1.2.story.md`의 Completion Notes와 처리 줄 `DEV-2 future`, `docs/story-records/1.2/dev-qa-r2.md`의 섹션 "DEV-2 같은 단위 반환의 분기를 지키는 시험이 없다", `docs/qa/gates/1.2.yml`의 `recommendations.future`
- 내용: `convert`의 `if (source === target)` 분기를 지운 사본에서 시험 20개가 모두 통과한다. 그 사본의 `convert(1e-20, "K", "K")`는 0, `convert(0.0015, "F", "F")`는 0.0015000000000036096이어서 상대 오차 1e-12를 넘고, 전달 코드는 입력을 그대로 돌려준다. 어느 쪽도 잘못된 결과가 아니라고 QA가 판정했다.
- 처리와 까닭: Dev가 적용하지 않고 future로 기록했다. 분기를 지키는 행은 결과가 0에 가까운 구간에서만 만들 수 있고 Dev Notes가 그 구간의 행을 쓰지 않는다고 정한다.
- 필요한 일: 항목 "결과가 0에 가까울 때의 정밀도"를 정할 때 같은 단위 반환을 계약으로 유지할지 함께 정한다. 유지하면 지운 구현이 틀리는 입력의 행을 더하고, 유지하지 않으면 분기를 지워도 된다.
- 책임: 프로젝트 소유자

Planning: unplanned
Source Story: 1.2

## 범위 끝의 반올림 오차 안에서 갈리는 결과

- 출처: Story 1.2 Dev의 DEV-3. `docs/stories/1.2.story.md`의 Completion Notes와 처리 줄 `DEV-3 future`, `docs/story-records/1.2/dev-qa-r2.md`의 섹션 "DEV-3 범위 끝의 1 ulp 안에서 결과가 갈린다", `docs/qa/gates/1.2.yml`의 `recommendations.future`
- 내용: 참값이 범위 끝의 1 ulp 안인 입력은 결과가 `Infinity`와 가장 큰 double 사이에서 올바른 반올림과 달라진다. `convert(1.2394657852469996e306, "MPa", "psi")`는 참값이 가장 큰 double보다 아래인데 `Infinity`이고, `convert(5.479368675060339e307, "m", "ft")`는 올바른 반올림이 `Infinity`인데 1.7976931348623157e+308이다. `convert`의 JSDoc이 이 동작을 적는다.
- 처리와 까닭: Dev가 적용하지 않고 future로 기록했다. 수용 문서는 이 경계의 정확한 반올림을 정하지 않아 맞다 틀리다 할 수 없다.
- 필요한 일: 항목 "변환 결과가 유한하지 않을 때"를 정할 때 이 구간에서 무엇을 약속할지도 함께 정한다. 정확한 반올림을 요구하는 답이면 `src/units.js`의 환산과 JSDoc을 바꾸고 시험을 더한다.
- 책임: PM 또는 프로젝트 소유자

Planning: unplanned
Source Story: 1.2

## [Tech-Debt] 재발: 전달 시험이 틀린 변형을 잡지 못함

- 출처: Story 1.2의 병합 뒤 점검(2026-11-06)이 앞선 병합 Story 1.1과 대조한 재발. Story 1.1의 QA TEST-003, Cleaner F3, F4(`docs/qa/gates/1.1.yml`, `docs/story-records/1.1/dev-1.1.md`의 섹션 "지적과 처분"). Story 1.2의 QA TEST-003, Cleaner F3(`docs/qa/gates/1.2.yml`, `docs/story-records/1.2/dev-1.1.md`의 같은 섹션)
- 내용: 기준은 `.bmad-core/data/development-quality.md`의 Cleaner 점검 목록 줄 "Tests that detect the intended defect and remain useful after an internal refactor"이고, gate 범주 TEST에서 결함도 같다. 제품은 맞는데 틀린 변형이 전달 시험을 통과한다.
- 필요한 일: 막았을 첫 장치는 자동 점검이다. `testing.mutationCommands`가 비어 있어 두 Story 모두 Cleaner 검토자와 QA의 손 변이에서야 드러났다. `.bmad-core/data/quality-tooling.md`의 섹션 Mutation testing이 드는 도구는 외부 패키지여서 `docs/architecture.md`의 기술 구성과 먼저 조정한다. 설정된 명령이 `src/`의 변이를 돌리면 끝난다.
- 책임: 프로젝트 소유자(도구의 승인), Architect
- 더한 출처: Story 1.3의 병합 뒤 점검(2026-11-06)이 앞선 병합 Story 1.1, 1.2와 대조한 재발. Story 1.3의 QA TEST-001(`docs/qa/gates/1.3.yml`의 `resolved_issues`), Cleaner F-1(`docs/story-records/1.3/dev-3.3.md`의 섹션 "Cleaner 결과")
- 더한 내용: 같은 기준이고 결함도 같다. 끝의 U+0020이나 CR을 지우고 `evaluate`에 넘기는 변형이 QA 회차 1의 시험 13개를 통과했고(TEST-001), 엔진 메시지에 CR을 끼운 변형이 단위 3.3의 시험 13개를 통과했다(F-1). 둘 다 제품은 맞았고 Story에서 시험을 고쳤다. `testing.mutationCommands`가 여전히 비어 있어 이번에도 QA와 Cleaner 검토자의 손 변이에서야 드러났으므로 막았을 첫 장치와 필요한 일은 그대로다.
- 더한 출처: Story bug-2의 병합 뒤 점검(2026-11-07)이 앞선 병합 Story 1.1, 1.2, 1.3과 대조한 재발. Story bug-2의 QA TEST-001(`docs/qa/gates/bug-2.yml`의 `top_issues`), Cleaner F-3(`docs/story-records/bug-2/dev-1.1.md`의 섹션 "Cleaner 결과"), QA 회차 2의 TEST-002(`git show story/bug-2:docs/qa/gates/bug-2.yml`의 `top_issues`)
- 더한 내용: 같은 기준이고 결함도 같다. 까닭을 빈 글자로 쓴 변형이 시험 76개를 통과한다(TEST-001, F-3). 제품은 맞고 고칠 일은 항목 "[Tech-Debt] 까닭이 빈 글자인 변형을 시험이 가리지 못함"이 든다. TEST-002는 같은 gate 범주의 같은 꼴이고 대상이 CI 규칙이다. 글자만 피한 사본 셋이 시험 76개와 두 규칙을 통과하고, 고칠 일은 항목 "[Tech-Debt] 엔진 규칙의 점검이 글자 검색임"이 든다. `testing.mutationCommands`가 여전히 비어 있어 이번에도 Cleaner 검토자와 QA의 손 변이(회차 1은 30개 가운데 21개를 시험이 잡았다)에서야 드러났으므로 막았을 첫 장치와 필요한 일은 그대로다. TEST-002는 `src/`의 변이로 드러나지 않으므로 그 도구를 고를 때 따로 본다.

Planning: unplanned
Source Story: 1.2
Source Story: 1.3
Source Story: bug-2

## [Tech-Debt] 재발: 주석과 시험 이름이 실제와 다름

- 출처: Story 1.2의 병합 뒤 점검(2026-11-06)이 앞선 병합 Story 1.1과 대조한 재발. Story 1.1의 Cleaner F5, F6, F9(`docs/story-records/1.1/dev-1.1.md`의 섹션 "지적과 처분"). Story 1.2의 QA TEST-001(`docs/qa/gates/1.2.yml`의 `resolved_issues`), Cleaner F2, F3(`docs/story-records/1.2/dev-3.1.md`의 같은 섹션)
- 내용: 기준은 CC-CMT-010 아래 문장 "Test names, headers and comments must describe what the test actually reaches and asserts"(Story 1.2 QA Results의 TEST-001이 든다)와 Cleaner 점검 목록의 주석 줄이다. 시험 이름이나 주석, JSDoc이 실제 단언이나 동작과 달랐다. 모두 각 Story에서 고쳤다.
- 필요한 일: 막았을 첫 장치는 탐색 포인터다. 글의 참은 자동 점검이 가리지 못하고 규칙은 이미 있다. Dev는 `comments` 본문을 마지막 SubTask 뒤에야 읽으므로(`.bmad-core/tasks/develop-story.md`의 COMMENT HYGIENE COMPLETION CHECK) SM이 Dev Notes의 프로젝트 규칙 적용에 이 문장을 둔다.
- 책임: SM
- 더한 출처: Story 1.3의 병합 뒤 점검(2026-11-06)이 앞선 병합 Story 1.1, 1.2와 대조한 재발. Story 1.3의 Cleaner F-6(`docs/story-records/1.3/dev-1.1.md`의 섹션 "Cleaner 결과"), Cleaner F-1(`docs/story-records/1.3/dev-3.3.md`의 섹션 "Cleaner 결과")
- 더한 내용: 같은 기준이다. 시험 이름 "keeps no state between calls, also after an error"가 단언보다 강했고(F-6), 단언의 메시지 "has no line break"가 LF만 보았다(F-1). 둘 다 Story에서 고쳤다. Story 1.3은 Dev Notes의 "이전 Story"에 "시험 주석이 단언의 실제 범위와 맞지 않았고(CC-CMT-010)"를 두었다. 프로젝트 규칙 적용의 자리는 아니었고, 위 지적은 Cleaner 검토에서 나왔으며 QA 회차 1과 3은 주석과 시험 이름의 위반을 찾지 못했다. 막았을 첫 장치를 고를 때 이 결과를 함께 본다.
- 더한 출처: Story bug-2의 병합 뒤 점검(2026-11-07)이 앞선 병합 Story 1.1, 1.2, 1.3과 대조한 재발. Story bug-2의 Cleaner F-1, F-3(`docs/story-records/bug-2/dev-1.1.md`의 섹션 "Cleaner 결과")
- 더한 내용: 같은 기준이다. 시험 이름 `gives the same message for an expression nested too deeply on every call and whatever the call stack holds`가 단언보다 강했고(F-1), 단언의 글 `the message holds more than a position`이 실제 판정과 달랐다(F-3). 둘 다 Story에서 고쳤다. Story bug-2의 Dev Notes의 프로젝트 규칙 적용에 이 항목의 제안과 같은 문장 "시험 이름과 주석은 시험이 실제로 닿고 단언하는 것을 말해야 하고(CC-CMT-010)"가 있었는데도 Cleaner 검토에서 나왔다. QA 회차 1은 고친 뒤의 시험에서 위반을 찾지 못했다. 그 탐색 포인터는 Dev가 쓸 때 막지 못했고 Cleaner 검토가 잡았으므로, 막았을 첫 장치를 고를 때 이 결과를 함께 본다.

Planning: unplanned
Source Story: 1.2
Source Story: 1.3
Source Story: bug-2

## [Tech-Debt] 재발: 함께 바뀌어야 할 숫자를 여러 곳에 적음

- 출처: Story 1.2의 병합 뒤 점검(2026-11-06)이 앞선 병합 Story 1.1과 대조한 재발. Story 1.1의 Cleaner F7(`docs/story-records/1.1/dev-1.1.md`의 섹션 "지적과 처분"). Story 1.2의 QA TEST-002(`docs/qa/gates/1.2.yml`의 `resolved_issues`), Cleaner F1, F2, F7(`docs/story-records/1.2/dev-1.1.md`의 같은 섹션)
- 내용: 기준은 CL-GLD-001의 Numeric literals 1단계다(Story 1.2 QA Results의 TEST-002가 든다). `308`과 `309`, 273.15 세 곳, 같은 입력 `1` 세 곳처럼 함께 바뀌어야 할 값을 따로 적었다. 모두 각 Story에서 고쳤다.
- 필요한 일: 막았을 첫 장치는 자동 점검이다. 같은 파일에서 되풀이되는 숫자 리터럴을 후보로 내는 명령을 내장 모듈로 만들어 `testing.lintCommands`에 두면 Dev가 Cleaner와 QA 전에 본다. QA가 같은 파일의 다른 반복을 독립된 값으로 버렸듯이 후보의 판단은 사람이 한다.
- 책임: Architect, 프로젝트 소유자(도구의 승인)
- 더한 출처: Story 1.3의 병합 뒤 점검(2026-11-06)이 앞선 병합 Story 1.1, 1.2와 대조한 재발. Story 1.3의 Cleaner F-1(`docs/story-records/1.3/dev-1.1.md`의 섹션 "Cleaner 결과")
- 더한 내용: 같은 기준이다(Cleaner가 CL-GLD-001을 들었다). 시험의 깊이 `100000`을 두 번 적었고 이름 있는 상수 `NESTING_LEVELS` 하나로 고쳤다. Story 1.3은 Dev Notes의 "이전 Story"에 "같은 입력 글자를 여러 번 적어 함께 고쳐야 했다(CL-GLD-001)"를 두었는데도 Cleaner 검토에서 나왔다. 그 포인터는 막지 못했고 막았을 첫 장치는 그대로 자동 점검이다.

Planning: unplanned
Source Story: 1.2
Source Story: 1.3

## [Tech-Debt] 재발: 기록의 서술이 실제와 다름

- 출처: Story 1.2의 병합 뒤 점검(2026-11-06)이 앞선 병합 Story 1.1과 대조한 재발. Story 1.1의 QA DOC-001(`docs/qa/gates/1.1.yml`의 `resolved_issues`). Story 1.2의 Cleaner F4(`docs/story-records/1.2/dev-3.1.md`의 섹션 "지적과 처분"), QA DOC-001(`docs/qa/gates/1.2.yml`의 `resolved_issues`)
- 내용: 기준은 CL-GLD-OPS-005와 CC-DOC-009, gate 범주 DOC이다. Dev 기록의 문장이 저장된 출력이나 실행과 달랐다. Story 1.1의 DOC-001은 Required였고, Story 1.2의 F4는 커밋 전에 고쳤으며 DOC-001은 사실은 맞고 표현만 부정확한 Optional이다.
- 필요한 일: 막았을 첫 장치는 탐색 포인터다. 사실 주장의 참은 자동 점검이 가리지 못하고 규칙은 이미 있다. Story 1.2 Dev Notes "이전 Story"에 "기록은 실제 출력과 대조해 적는다"가 있었는데도 F4는 잰 범위 밖까지 말한 문장이었다. SM이 그 줄에 "모든 입력을 말하는 문장에는 잰 범위를 함께 적는다"를 더한다.
- 책임: SM
- 더한 출처: Story 1.3의 병합 뒤 점검(2026-11-06)이 앞선 병합 Story 1.1, 1.2와 대조한 재발. Story 1.3의 QA DOC-001(`docs/qa/gates/1.3.yml`의 `top_issues`). 정정할 일은 항목 "[Tech-Debt] Story 1.3 Dev 기록의 두 문장"이 든다
- 더한 내용: 같은 기준과 gate 범주 DOC이다. DOC-001은 사실은 맞고 표현이 넓은 Optional이다. "지운 줄이 없음"은 섹션마다 같음과 바뀜만 내는 비교에서 말했고, "현재 계획의 글에는 40이 없다"는 옛 규칙의 값을 적은 문장을 빠뜨렸다. Story 1.3은 Dev Notes의 "이전 Story"에 "기록은 실제 출력과 대조해 적는다"를 두었는데도 되풀이되었다. 앞 문장이 위 필요한 일의 "잰 범위"와 같은 꼴이고 그 제안은 아직 어느 Story에도 적히지 않았으므로 막았을 첫 장치는 그대로 탐색 포인터다.
- 더한 출처: Story bug-2의 병합 뒤 점검(2026-11-07)이 앞선 병합 Story 1.1, 1.2, 1.3과 대조한 재발. Story bug-2의 QA DOC-001(`docs/qa/gates/bug-2.yml`의 `top_issues`). 정정할 일은 항목 "[Tech-Debt] Story bug-2 Dev 기록의 두 문장"이 든다
- 더한 내용: 같은 기준과 gate 범주 DOC이다. DOC-001은 순서와 값은 맞고 시각 하나와 나열 하나가 다른 Optional이다. Story bug-2의 Dev Notes의 "이전 Story"에 위 제안과 같은 문장 "기록은 실제 출력과 대조해 적고, 모든 입력을 말하는 문장에는 잰 범위를 함께 적는다"가 있었는데도 되풀이되었다. 그 탐색 포인터는 막지 못했다. 위 필요한 일의 끝을 포인터로 둘지 트리아지가 다시 본다. 사실 주장의 참은 자동 점검이 가리지 못하고 규칙(CL-GLD-OPS-005, CC-DOC-009)은 이미 있다.

Planning: unplanned
Source Story: 1.2
Source Story: 1.3
Source Story: bug-2

## [Tech-Debt] 재발: 죽은 코드

- 출처: Story 1.2의 병합 뒤 점검(2026-11-06)이 앞선 병합 Story 1.1과 대조한 재발. Story 1.1의 Cleaner F2(`docs/story-records/1.1/dev-1.1.md`의 섹션 "지적과 처분"). Story 1.2의 Cleaner F1(`docs/story-records/1.2/dev-3.1.md`의 같은 섹션)
- 내용: 기준은 Cleaner 점검 목록 줄 "Unnecessary branches, nesting, duplication, dead code and speculative abstractions"의 죽은 코드다. `skipSpaces` 호출 4곳과 `temperature`의 `toCelsius` 속성은 지워도 시험이 모두 통과했다. 둘 다 Cleaner에서 고쳤다.
- 필요한 일: 막았을 첫 장치는 자동 점검이다. 문장이나 속성을 지우는 변이를 내는 점검이면 항목 "[Tech-Debt] 재발: 전달 시험이 틀린 변형을 잡지 못함"의 명령으로 함께 드러난다. 그 도구를 고를 때 이 변이를 내는지 확인한다.
- 책임: 프로젝트 소유자(도구의 승인), Architect

Planning: unplanned
Source Story: 1.2

## [Tech-Debt] 재발: 담은 것을 말하지 않는 이름

- 출처: Story 1.2의 병합 뒤 점검(2026-11-06)이 앞선 병합 Story 1.1과 대조한 재발. Story 1.1의 Cleaner F6, F12(`docs/story-records/1.1/dev-1.1.md`의 섹션 "지적과 처분"). Story 1.2의 Cleaner F8(`docs/story-records/1.2/dev-1.1.md`의 같은 섹션)
- 내용: 기준은 Cleaner 점검 목록 줄 "Names that express domain meaning and functions with a coherent responsibility"다. 상수 이름이 사실과 달랐고, `open`은 위치를, `sourceKind`와 `targetKind`는 단위 목록을 담았다. 모두 Cleaner에서 고쳤다.
- 필요한 일: 막았을 첫 장치는 탐색 포인터다. 이름의 뜻은 자동 점검이 가리지 못하고 기준은 이미 있다. SM이 Dev Notes의 프로젝트 규칙 적용에 이 줄을 가리키는 문장을 둔다.
- 책임: SM
- 더한 출처: Story bug-2의 병합 뒤 점검(2026-11-07)이 앞선 병합 Story 1.1, 1.2, 1.3과 대조한 재발. Story bug-2의 Cleaner F-4(`docs/story-records/bug-2/dev-1.1.md`의 섹션 "Cleaner 결과")
- 더한 내용: 같은 기준이다. 위치 시험의 지역 상수 `widened`가 뜻을 말하지 않았고 Cleaner에서 이름을 지웠다. Story bug-2의 Dev Notes의 프로젝트 규칙 적용에 이 항목의 제안과 같은 문장 "이름은 담은 것을 말해야 한다(`.bmad-core/data/development-quality.md`의 Cleaner 점검 목록)"가 있었는데도 Cleaner 검토에서 나왔다. 그 탐색 포인터는 막지 못했으므로 위 필요한 일을 트리아지가 다시 본다.

Planning: unplanned
Source Story: 1.2
Source Story: bug-2

## evaluate에 넘기는 글자의 확인

- 출처: Story 1.3 PO 검증 1회(2026-11-06)의 PO1-N3, SM N-3. `docs/stories/1.3.story.md`의 PO Validation, `docs/story-records/1.3/po-r1.md`의 섹션 "Q3, SM N-3, PO1-N3: `evaluate`에 받은 글자를 그대로 넘기는가"
- 내용: Story는 Story 1.3 AC 1의 `renderScreen(expression)`과 "`evaluate`로 계산", AC 2의 "식이 `CalculationError`를 던지면"을 그대로 읽어 받은 글자를 `evaluate`에 그대로 넘긴다고 정했다(Dev Notes, Testing 표 2의 E-4, E-5). 수용 문서에 이 문장은 없다. 다듬어 넘기는 읽기는 수용 문서에 없는 전제가 필요해 미결로 두지 않았고, 합격 판정을 가르는 읽기여서 확인을 요청했다.
- 병합 결과: `src/screen.js`는 `evaluate(expression)`이다. `"  a"`의 줄은 `오류: unexpected character at position 2`이고 `"\t1 + 2"`의 줄은 `오류: unexpected character at position 0`이다. `test/screen.test.js`의 시험 `reports an error at its position in the expression as received`와 `does not take white space other than a space for a space`가 이를 고정한다.
- 처리와 까닭: Story는 적용하지 않았다. 수용 문서에 적는 일은 계약 밖이다.
- 필요한 일: 이 읽기를 확인해 AC 보강이나 D-1과 같은 해석 결정으로 "식은 `renderScreen`이 받은 글자이고 `evaluate`에 그대로 넘긴다"를 적는다. 이렇게 확인하면 항목 "Story 1.3의 공백 판정과 식 표시"의 `{식}`도 받은 그대로로 함께 정해진다. 다르게 정하면 수용된 결정의 변경이고 `src/screen.js`와 위 시험을 그 답에 맞춘다.
- 책임: PM

Planning: unplanned
Revisit: 브라우저 화면 Epic을 계획할 때
Source Story: 1.3

## 1.3-UNIT-011의 수준

- 출처: Story 1.3 PO 검증 1회(2026-11-06)의 PO1-N11. `docs/stories/1.3.story.md`의 PO Validation, `docs/story-records/1.3/po-r1.md`의 섹션 "PO1-N11: 1.3-UNIT-011의 수준"
- 내용: Testing의 1.3-UNIT-011은 Level이 `unit`인데 점검의 한 부분이 기준 커밋과의 `git diff`다. `.bmad-core/tasks/test-design.md`의 "Use `inspection` for an artifact check outside the three executable test levels"와 다르다. 실행 방식 `automated`는 맞고 합격 판정은 같으며 값어치는 낮다.
- 병합 결과: Dev와 QA는 행 그대로 기존 시험과 `git diff`를 실행했다(`docs/story-records/1.3/qa-r3.md`의 섹션 "시나리오와 시험 이름의 대응").
- 처리와 까닭: Story는 적용하지 않았다. SM의 2회 수정은 범위가 REQ-002여서 이 행의 수준을 고치지 않았다. 계약 안이다.
- 필요한 일: po-r1의 수정안은 `git diff` 부분을 inspection 행으로 나누고 합계를 고치는 것이다.
- 책임: SM

Planning: unplanned
Source Story: 1.3

## 1.3-UNIT-011이 병합으로 들어온 파일을 덮지 않음

- 출처: Story 1.3 PO 검증 2회(2026-11-06)의 PO2-N1. `docs/stories/1.3.story.md`의 PO Validation, `docs/story-records/1.3/po-r2.md`의 섹션 "PO2-N1: 1.3-UNIT-011의 "바꾸지 않음"이 병합으로 들어온 파일을 덮지 않는다"
- 내용: 1.3-UNIT-011의 시험 지점은 `src/units.js`의 공개 심볼을 들고 기존 시험은 `test/units.test.js`를 드는데, 기준 커밋과의 `git diff`는 "인터페이스와 파일 위치"의 "바꾸지 않음" 행의 여섯 파일만 본다. 두 파일이 잘못 바뀌면 `git diff`로 보이지 않고 시험이 지키는 동작만 잡힌다. 값어치는 낮다.
- 병합 결과: Dev의 단위 3.1과 QA 회차 3이 두 파일을 더해 여덟 파일의 `git diff --quiet`를 보았고 종료 상태 0이며, 기준 tip d90c99e와 다른 경로는 모두 이 Story의 파일이다. Story의 행과 "바꾸지 않음" 행의 글은 그대로다.
- 처리와 까닭: Story는 적용하지 않았다. SM의 다음 수정이 없었고 Dev는 계획의 글이어서 고치지 않았다. 계약 안이다.
- 필요한 일: po-r2의 수정안은 그 행과 시나리오에 두 파일을 더하거나, 기준 tip과 다른 경로가 Story의 파일뿐임을 보게 적는 것이다.
- 책임: SM

Planning: unplanned
Source Story: 1.3

## [Tech-Debt] 재발: 같은 코드와 글자를 여러 곳에 적음

- 출처: Story 1.3의 병합 뒤 점검(2026-11-06)이 앞선 병합 Story 1.1, 1.2와 대조한 재발. Story 1.1의 Cleaner F10, F11(`docs/story-records/1.1/dev-1.1.md`의 섹션 "지적과 처분"). Story 1.3의 Cleaner F-2, F-3(`docs/story-records/1.3/dev-1.1.md`의 섹션 "Cleaner 결과")
- 내용: 기준은 `.bmad-core/data/development-quality.md`의 Cleaner 점검 목록 줄 "Unnecessary branches, nesting, duplication, dead code and speculative abstractions"의 중복이고, Story 1.3의 Cleaner는 CL-GLD-005를 들었다. Story 1.1은 까닭 글자 "unexpected character"를 세 곳에 적었고 커서 읽기를 되풀이했다. Story 1.3은 비교와 실패 메시지의 꼴이 같은 반복문 둘(`assertErrorLines`, `assertLines`)을 두었고 한 시험 안에 같은 입력(`7 +`, `7 + a`)을 두 번 적었다. 모두 Cleaner에서 고쳤다. 숫자 리터럴은 항목 "[Tech-Debt] 재발: 함께 바뀌어야 할 숫자를 여러 곳에 적음"이 든다.
- 필요한 일: 막았을 첫 장치는 자동 점검이다. 그 항목이 제안한 후보 명령을 같은 파일에서 되풀이되는 글자 리터럴과 같은 토큰 열까지 넓혀 `testing.lintCommands`에 두면 Dev가 Cleaner 전에 본다. 외부 패키지는 쓰지 않으므로 내장 모듈로 만들고 후보의 판단은 사람이 한다. 설정된 명령이 `src/`와 `test/`의 이런 반복을 후보로 내면 끝난다.
- 책임: Architect, 프로젝트 소유자(도구의 승인)
- 더한 출처: Story bug-2의 병합 뒤 점검(2026-11-07)이 앞선 병합 Story 1.1, 1.2, 1.3과 대조한 재발. Story bug-2의 Cleaner F-4(`docs/story-records/bug-2/dev-1.1.md`의 섹션 "Cleaner 결과")
- 더한 내용: 같은 기준이다. 위치 시험이 `parenthesized`와 같은 꼴의 입력을 따로 만들었고(지역 상수 `widened`), Cleaner에서 그 도우미의 선택 인자로 줄였다. `testing.lintCommands`가 여전히 비어 있어 Cleaner 검토에서야 드러났으므로 막았을 첫 장치와 필요한 일은 그대로다.

Planning: unplanned
Source Story: 1.3
Source Story: bug-2

## [Tech-Debt] 재발: 공개 함수의 계약이 선언에 없음

- 출처: Story 1.3의 병합 뒤 점검(2026-11-06)이 앞선 병합 Story 1.1, 1.2와 대조한 재발. Story 1.2의 Cleaner F6(`docs/story-records/1.2/dev-1.1.md`의 섹션 "지적과 처분"). Story 1.3의 Cleaner F-4(`docs/story-records/1.3/dev-1.1.md`의 섹션 "Cleaner 결과")
- 내용: 기준은 Cleaner 점검 목록의 주석 줄 "Comments that explain needed reasons or constraints"이고, Story 1.3의 Cleaner는 CC-CMT-012, CC-CMT-003을 들었다. Story 1.2의 `convert`, `units`와 Story 1.3의 `renderScreen`은 호출자가 알아야 할 결과를 선언에 적지 않았다. 둘 다 Cleaner에서 JSDoc을 더했다.
- 필요한 일: 막았을 첫 장치는 자동 점검이다. `src/`에서 내보내는 함수 바로 위에 문서 주석이 있는지 보는 명령을 내장 모듈로 만들어 `testing.lintCommands`에 두면 Dev가 Cleaner 전에 본다. 주석이 계약을 다 말하는지는 사람이 본다. 설정된 명령이 문서 주석 없는 공개 함수에서 실패하면 끝난다.
- 책임: Architect, 프로젝트 소유자(도구의 승인)

Planning: unplanned
Source Story: 1.3

## 경계 부근의 결과와 순수 함수

- 출처: Story bug-2 PO 검증 1회(2026-11-07)의 PO1-N4, SM N-4. `docs/stories/bug/bug-2.story.md`의 PO Validation, `docs/story-records/bug-2/po-r1.md`의 섹션 "Q4, SM N-4, PO1-N4: 경계 부근의 같은 식", `docs/qa/gates/bug-2.yml`의 회차 1 `adversarial_checks`와 `risk_summary.recommendations.monitor`
- 내용: `docs/architecture.md#설계-원칙`의 "공개 함수는 순수 함수로 두고 입출력이나 전역 상태를 쓰지 않는다"가 스택 한계에 달린 결과를 금하는지 수용된 글이 정하지 않는다. Story bug-2가 AC 3의 출처로 쓴 이 문장과 Testing 표 3이 어떻게 함께 서는지가 수용 문서에 없다. 구체적인 글 "입출력이나 전역 상태를 쓰지 않는다"는 어겨지지 않는다.
- 병합 결과: `(` 3000개, `1`, `)` 3000개의 식은 같은 프로세스에서 첫 호출은 깊이 오류이고 얕은 호출로 예열한 뒤에는 값 1이다. `(` 4000개 뒤에 `1`이 오는 식은 새 프로세스에서 깊이 오류이고 예열한 프로세스에서 `unclosed parenthesis at position 3999`다. 이 값은 이 점검이 `main` 1c91705에서 잰 것이고(Windows x64, Node.js v24.22.1), QA 회차 1의 탐침과 같은 꼴이다. 시험 `answers an expression near the depth the recursion can hold with its value or a CalculationError`가 두 결과를 받는다. 고치기 전의 엔진도 `RangeError` 뒤에 값을 돌려주어 Story bug-2가 만든 성질은 아니다.
- 처리와 까닭: Story는 적용하지 않았다. 표 3의 합격 판정이 하나이고 수용 문서에 적는 일은 계약 밖이다.
- 필요한 일: po-r1의 제안은 설계 원칙에 스택 한계에 달린 결과의 예외를 적는 것이다. 항목 "[Bug] 엔진이 CI 규칙을 어겨 필수 점검 test가 실패함"의 답(깊이를 세어 1000을 넘으면 오류)이 구현되면, 호출자 스택이 잰 범위 안인 동안 결과가 스택 상태에 달리지 않아(잰 범위와 카운터의 구조에서 온 QA의 추론) 이 항목의 전제가 바뀐다. 그 일 뒤에 남는 것을 정하면 끝난다.
- 책임: Architect

Planning: unplanned
Source Story: bug-2

## 스택 크기를 바꾼 실행과 스택을 거의 다 쓴 호출

- 출처: Story bug-2 PO 검증 1회(2026-11-07)의 PO1-N5, SM N-5, N-6과 2회의 갱신. `docs/stories/bug/bug-2.story.md`의 PO Validation, `docs/story-records/bug-2/po-r1.md`의 섹션 "Q5, SM N-5, N-6: 잡아 번역하는 결정과 보지 않은 실행"과 "런타임 근거", `docs/story-records/bug-2/po-r2.md`의 섹션 "앞선 비차단 지적", `docs/qa/gates/bug-2.yml`의 회차 1 `adversarial_checks`와 `risk_summary.recommendations.monitor`
- 내용: Story bug-2의 AC 머리는 "Node.js 24의 기본 스택 크기"로 한정하고 Dev Notes는 "호출자가 스택을 거의 다 쓴 상태의 호출은 이 Story의 입력이 아니다"라고 적는다. 메모 N-6의 글은 `RangeError`만 말하고 짧은 식 `1 + 2`가 깊이 오류로 번역되는 경우를 말하지 않는다.
- 병합 결과: 이 점검이 `main` 1c91705의 Worker에서 쟀다(`resourceLimits.stackSizeMb`, Windows x64, Node.js v24.22.1). 0.25는 `P(1000)`도 깊이 오류, 4는 `P(1000)` 값 1과 `P(100000)` 깊이 오류, 64는 `P(100000)`도 값 1이다. PO 검증 1회의 사본에서 스택을 채우고 풀면서 층마다 부른 호출은 `P(100000)`이 깊이 오류 6317번과 `RangeError` 2번, `1 + 2`가 값 3 6313번과 `RangeError` 2번, 깊이 오류 4번이다. QA 회차 1이 전달 모듈에서 같은 꼴을 확인했다. 시험은 이 호출을 보지 않고 화면을 쓰는 호출자는 아직 없다. `P(n)`은 Story bug-2 Testing의 "입력의 정의"의 표기다.
- 처리와 까닭: Story는 적용하지 않았다. 수용된 쓰임이 아니어서 비차단이고 수용 문서에 적는 일은 계약 밖이다. 사용자가 설계를 조사 없이 받아 po-r1의 "PO1-B1의 조사에서 함께 보고"는 없어졌다.
- 필요한 일: po-r1의 제안은 짧은 식이 깊이 오류로 번역되는 경우까지 수용 문서에 적고 까닭 글자가 깊이만 말하게 둘지 정하는 것이다. 항목 "[Bug] 엔진이 CI 규칙을 어겨 필수 점검 test가 실패함"의 답이 구현되면 `catch`가 없어져 결과가 바뀐다. 사용자가 고른 선택지의 설명은 "호출자가 스택을 많이 쓰면 RangeError가 그대로 나갑니다"이고, QA가 잰 사본은 호출자 6000프레임까지 `P(1000)` 값 1, 7000프레임부터 `RangeError`, 호출자 10000프레임의 `P(1)`도 `RangeError`다. 그 일 뒤의 결과를 수용 문서에 적을지 정하면 끝난다.
- 책임: Architect

Planning: unplanned
Source Story: bug-2

## 깊은 입력의 결정을 둘 자리

- 출처: Story bug-2 PO 검증 1회(2026-11-07)의 PO1-N6과 2회의 갱신. `docs/stories/bug/bug-2.story.md`의 PO Validation, `docs/story-records/bug-2/po-r1.md`의 섹션 "Q6, PO1-N6: 결정의 자리와 Story의 두 해석", `docs/story-records/bug-2/po-r2.md`의 섹션 "앞선 비차단 지적"
- 내용: 깊은 입력의 결과를 정한 사용자의 결정과 Story bug-2의 두 해석("같은 식의 메시지는 호출마다 같다", "`D`는 값이 아니라 `CalculationError`다")은 그 Story의 Scope and Dependencies와 커밋 2c44760의 메시지에 있고 `docs/planning/decisions.md`와 `docs/prd.md`의 Story 1.1 AC 3에는 없다. `D`는 그 Story의 Testing의 표기로 `(` 100000개, `1`, `)` 100000개다. `.bmad-core/tasks/research-decision.md` step 6과 `.bmad-core/data/future-work-planning.md`에 맞는 자리여서 빠진 것이 아니고, 다른 Story가 공유 근거로 쓸 때의 일이다.
- 병합 결과: `docs/planning/decisions.md`는 D-1, D-2뿐이다. `main`의 Story는 앞선 결정 "숫자 한도 없이"와 스택 넘침을 번역하는 설계를 적는다. 사용자의 새 답은 로컬 브랜치 `story/bug-2`의 QA Results와 항목 "[Bug] 엔진이 CI 규칙을 어겨 필수 점검 test가 실패함"에 있다.
- 처리와 까닭: Story는 적용하지 않았다. 그 문서들을 바꾸지 않는다고 적어 계약 밖이다.
- 필요한 일: po-r1의 제안은 후보 D-3으로 결정 기록에 옮길지 정하는 것이다. 설계 수용의 결정을 공유 근거로 쓰려면 항목 "조사 없이 받은 설계의 남은 일"이 먼저다(po-r2의 갱신). 위 새 답이 결정의 내용을 바꾸므로 옮길 글은 그 일의 결과로 정한다.
- 책임: PM

Planning: unplanned
Source Story: bug-2

## 조사 없이 받은 설계의 남은 일

- 출처: Story bug-2 PO 검증 2회(2026-11-07)의 PO2-N1. `docs/stories/bug/bug-2.story.md`의 PO Validation과 Scope and Dependencies의 "수용된 결정", `docs/story-records/bug-2/po-r2.md`의 섹션 "PO2-N1: 조사 없이 받은 설계의 남은 일", `docs/qa/gates/bug-2.yml`의 `waiver`, `resolved_issues`의 ARCH-001, `recommendations.future`, `AGENTS.md` 섹션 Research for uncertainty and core implementation decisions
- 내용: 설계 "재귀 파서를 그대로 두고, 스택 넘침의 `RangeError`를 `evaluate` 경계에서 잡아 `CalculationError`로 바꿈"을 사용자가 "조사 없이 이 설계를 수용"으로 그 Story에 한해 받았고 참고 자료 다섯 개의 조사가 없다. 조사 요건은 채워지지 않았다. 사용자가 받은 남는 위험은 "스택 크기를 바꾼 실행과 다른 런타임의 동작이 확인되지 않습니다."다. 읽을 후보로 든 빠진 자료는 ECMAScript 명세가 호출 스택의 한계를 정하는지, V8과 Node.js의 공식 문서가 스택 넘침의 오류와 복구를 어떻게 말하는지(`--stack-size`, Worker의 `resourceLimits.stackSizeMb`), 스택 넘침을 잡는 일에 대한 정착된 지침, 재귀 하강 파서의 깊이 처리에 대한 공개 구현이나 지침이다.
- 병합 결과: `main`의 `evaluate`가 이 설계이고 gate WAIVED 회차 1의 면제 ARCH-001의 범위는 이 설계뿐이다. 사용자가 뒤에 고른 깊이 세기 1000에도 조사가 없다. 메인 세션의 답은 `*run-story bug-2 remote` 호출의 프로젝트 밖 조사가 사용자의 말 "이 시험은 네트워크를 막아 두었으므로 프로젝트 밖 원문 조사는 면제하며, 면제 사실을 기록합니다."로 면제라는 것이고 조사 요건을 채운 것이 아니다.
- 처리와 까닭: Story는 적용하지 않았다. 외부 자료의 조사는 그 Story의 일이 아니고 네트워크 조건이 막아 계약 밖이다.
- 필요한 일: 이 설계를 다른 Story나 결정 기록의 공유 근거로 쓸 때, 또는 외부 자료를 읽을 수 있는 호출에서 빠진 자료를 읽을지 사용자가 정한다. 항목 "[Bug] 엔진이 CI 규칙을 어겨 필수 점검 test가 실패함"의 일을 맡는 계획이 새 설계의 조사 요건을 어떻게 다룰지도 정한다.
- 책임: Architect(조사), 사용자(읽을지의 결정)

Planning: unplanned
Source Story: bug-2

## [Tech-Debt] 까닭이 빈 글자인 변형을 시험이 가리지 못함

- 출처: Story bug-2 QA 회차 1(2026-11-07)의 TEST-001(Optional, 계약 안)과 Cleaner F-3. `docs/qa/gates/bug-2.yml`의 `top_issues`, `docs/stories/bug/bug-2.story.md`의 Completion Notes와 처리 줄 `TEST-001 future`, `docs/story-records/bug-2/qa-r1.md`, `docs/story-records/bug-2/dev-qa-r1.md`의 섹션 "TEST-001 까닭이 빈 글자인 변형을 시험이 가리지 못한다", `docs/story-records/bug-2/dev-1.1.md`의 섹션 "Cleaner 결과"
- 내용: Story bug-2 Testing 표 1의 G-4 "`D`의 까닭이 빈 글자가 아니고"를 보는 단언이 빈 까닭을 가리지 못한다. `test/engine.test.js`의 시험 `gives a different reason in the message for different problems`의 `reason.trim()`은 도우미 `reasonOf`가 메시지에서 수만 뺀 글자를 보는데, 까닭이 빈 글자여도 ` at position `이 남아 통과한다. 새 오류의 까닭을 빈 글자로 쓴 엔진 사본에서 `node --test` 76개가 모두 통과한다. 전달된 까닭은 `expression nested too deeply`여서 제품은 맞다.
- 처리와 까닭: Dev가 적용하지 않고 future로 기록했다. 잘못된 결과가 없고, 고칠 Required와 Recommended가 없는 라운드였으며, `fix`로 두면 구현 개정이 바뀌어 Done 전에 QA 회차의 닫음이 필요했다. QA 회차 2는 Story가 InProgress로 돌아와 같은 Story에서 고칠 수 있게 되었다고 적었으나, 다시 열린 채 병합되어 Dev에 닿지 않았고 `main`의 처리 줄은 `future`다.
- 필요한 일: 각 까닭에서 공통 꼬리 ` at position`을 걷어낸 나머지가 비어 있지 않은지 같은 시험에서 본다. 낱말을 시험에 적지 않고 제품 코드는 바꾸지 않는다. 이 단언을 더한 사본은 전달된 엔진에서 76개 통과, 빈 까닭의 엔진에서 이 시험 하나가 실패한다. 저울질할 점은 Cleaner F-3이 접미사를 걷어내는 일을 구현을 되풀이하는 기계로 보아 단언의 글만 고친 것이고, `testing-tdd`의 "restates the implementation"과 함께 따진다. 항목 "[Bug] 엔진이 CI 규칙을 어겨 필수 점검 test가 실패함"의 일이 같은 시험 파일을 바꾸고, 항목 "오류 메시지의 언어와 꼴"의 답이 낱말을 정한다. 변형이 그 시험에서 실패하면 끝난다.
- 책임: Dev

Planning: unplanned
Source Story: bug-2

## [Tech-Debt] Story bug-2 Dev 기록의 두 문장

- 출처: Story bug-2 QA 회차 1(2026-11-07)의 DOC-001(Optional, 계약 안). `docs/qa/gates/bug-2.yml`의 `top_issues`, `docs/stories/bug/bug-2.story.md`의 Completion Notes와 처리 줄 `DOC-001 future`, `docs/story-records/bug-2/qa-r1.md`, `docs/story-records/bug-2/dev-qa-r1.md`의 섹션 "DOC-001 Dev 기록 dev-1.1의 두 문장이 실제와 다르다"
- 내용: `docs/story-records/bug-2/dev-1.1.md` 머리의 시각 줄 "첫 RED 02:09"는 조각 1의 RED 출력 수정 시각 02:07:12와 다르고 02:09:42는 조각 5의 출력이다. 섹션 "Cleaner 결과"의 "검토자의 변형 가운데 76/76을 통과한 것은 위 표의 둘과 Story가 예고한 틈"과 그 괄호의 나열에서, 위 표의 `catch-every-other-error`는 Dev의 변형이어서 검토자의 요약에 없고 요약에서 76개를 통과한 `depth-limit-above-the-fitting-depth`가 괄호에 없다. RED, GREEN, Cleaner, 재점검의 순서와 그 밖의 값은 저장된 출력과 같고 제품, 시험, 필수 점검에 닿지 않는다.
- 처리와 까닭: Dev가 적용하지 않고 future로 기록했다. 고칠 Required와 Recommended가 없는 라운드였고 `fix`로 두면 Done 전에 QA 회차의 닫음이 필요했다. QA 회차 2는 같은 Story에서 고칠 수 있게 되었다고 적었으나 다시 열린 채 병합되어 Dev에 닿지 않았다.
- 필요한 일: 두 문장을 위 사실로 정정한다. 앞선 기록(dev-1.1)은 고쳐 쓰지 않고 코드와 시험은 바꾸지 않는다. Dev의 기록이 정한 자리는 Completion Notes의 새 항목인데, Story가 병합되어 다시 열리지 않으므로 이 정정을 담을 계획이 따로 필요하다.
- 책임: Dev

Planning: unplanned
Source Story: bug-2

## [Tech-Debt] 엔진 규칙의 점검이 글자 검색임

- 출처: Story bug-2 QA 회차 2(2026-11-07)의 TEST-002(Optional, 범위 밖). `git show story/bug-2:docs/qa/gates/bug-2.yml`의 `top_issues`, `git show story/bug-2:docs/story-records/bug-2/qa-r2.md`의 섹션 "분류", "고치는 길의 측정". Story가 다시 열린 채 병합되어 Dev의 처리 줄이 없고 지적은 로컬 브랜치의 gate에만 있다.
- 내용: `ci/engine-rule.check.mjs`의 첫 줄의 뜻 "the engine does not rest on the host's stack overflow error"를 점검이 지키지 못한다. 점검은 `src/engine.js`에서 글자 `RangeError`를 `includes`로 찾을 뿐이다. `evaluate`의 조건만 `!(error instanceof CalculationError)`, `error.name === "Range" + "Error"`, `/call stack/.test(error.message)`로 바꾼 사본 셋이 `node --test` 76개와 두 규칙을 모두 통과했다(QA의 판정 작업, 2026-11-07, Windows x64, Node.js v24.22.1).
- 처리와 까닭: 규칙 파일은 Story가 만들거나 바꾼 내용이 아니고 필수 점검의 실패가 아니어서 범위 밖이고 비차단이다. CI 규칙은 그대로 두었다.
- 필요한 일: 규칙을 남기고 뜻까지 지키려면 규칙의 소유자가 점검의 방법을 정한다. 항목 "[Bug] 엔진이 CI 규칙을 어겨 필수 점검 test가 실패함"의 일에서는 점검이 못 가리므로 글자만 피하는 고침을 읽기로 막는다. 정해진 방법이 위 세 사본을 잡거나, 잡지 않기로 한 까닭이 코딩 표준 절에 적히면 끝난다.
- 책임: 규칙의 소유자를 적은 글이 없다. Architect(`docs/conventions/Common/CODING_CONVENTION.md`의 "A rule that fits only this project goes into the Architecture's coding standards section, which the Architect owns"), 프로젝트 소유자(규칙을 더한 커밋 0528169의 까닭과 점검 방법의 승인)

Planning: unplanned
Source Story: bug-2

## Closed items

- [Tech-Debt] Story 1.3 Dev 기록의 두 문장: 유형 Story `tech-debt-3`(`docs/stories/tech-debt/tech-debt-3.story.md`)에 배정, 2026-11-07
- Story `tech-debt-3` "Story 1.3 Dev 기록의 두 문장 정정" 취소: 사용자의 결정, 사유 "이 기록 정정은 지금 가치가 없어 더 하지 않는다", 다시 정렬할 Story를 만들지 않음, 2026-11-07
- Story tech-debt-3의 PO1-N1 병합된 기록에서 정정으로 가는 길: 사용자가 버림, 사유는 위 취소와 같음, 2026-11-07
- Story tech-debt-3의 DOC-002 Review 인계가 기록 문서 넷을 덜 듦: 사용자가 버림, 사유는 위 취소와 같음, 2026-11-07
- Story tech-debt-3의 DOC-003 소스 트리 표의 `ci/`와 워크플로 틈의 출처 표현: 사용자가 버림, 사유는 위 취소와 같음, 2026-11-07
- Story tech-debt-3의 DOC-004 정정 항목이 재지 않은 곳에 Story 1.3의 Dev Agent Record를 들지 않음: 사용자가 버림, 사유는 위 취소와 같음, 2026-11-07
- Story tech-debt-3의 DOC-005 문장 서수로 자리를 가리킴: 사용자가 버림, 사유는 위 취소와 같음, 2026-11-07
- Story tech-debt-3의 QA monitor 비교 커밋이 이 checkout의 `refs/archive/story/1.3`에만 닿음: 사용자가 버림, 사유는 위 취소와 같음, 2026-11-07
