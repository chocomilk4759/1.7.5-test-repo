# dev-3.3 — QA 수정 단위 3.3: 받은 글자를 그대로 넘긴다는 규칙의 시험 두 행

- Story: [1.3](../../stories/1.3.story.md)
- Entry: Dev QA 수정 단위 3.3, QA 라운드 2의 TEST-001(Optional), 결정 목록은 [dev-qa-r2](dev-qa-r2.md)
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.2 1.3 remote` run의 역할 작업. effort는 시스템이 숫자 30으로만 알려 주어 설정의 이름(`xhigh`)과의 대응을 확인하지 못했다
- 시각: 2026-11-06, 편집과 변형 점검 21:55 ~ 21:57 +0900, Cleaner 검토 21:55 ~ 21:58 +0900, 정정과 재점검 21:59 +0900
- 입력 기준: 브랜치 `story/1.3`, 단위의 비교 기준 `a5eade8`(단위 3.2의 커밋). 제품 파일 `src/screen.js`는 이 단위가 바꾸지 않는다

## 범위와 접근

- 지적: TEST-001(Optional, 심각도 low, 확신 high, 계약 안, 소유자 Dev). `evaluate`에 받은 글자를 그대로 넘긴다는 규칙(N-3, 표 2의 E-4, E-5)의 시험이 틀린 변형 둘을 놓친다. 끝의 U+0020을 지우고 넘기는 변형과 CR(U+000D)을 지우고 넘기는 변형이다.
- 결정: Dev가 적용을 골랐다([dev-qa-r2](dev-qa-r2.md)). 앞선 `Treatment: TEST-001 future`를 `fix`가 대신한다. 이 라운드가 Required를 고치는 라운드이고 두 행이 E-4와 E-5를 더 구체적으로 하는 행이어서 수용된 계약 안이다(`data/finding-classification.md` 7단계).
- 접근: `verification-only`. 제품 코드는 맞고 단언만 강화한다. 유효한 기준이 통과함을 확인하고 강화한 단언마다 틀린 변형 하나가 그 단언에 실패함을 보인다. 이 점검은 Dev의 TDD RED가 아니다.
- 시나리오: 1.3-UNIT-005(표 2의 E-4와 E-5), 영향받은 재점검으로 1.3-UNIT-011.
- 바뀐 경로: `test/screen.test.js`. 새 기록 문서는 이 파일이다.
- 변경(Cleaner 검토 전): 시험 `reports an error at its position in the expression as received`의 오류 줄 목록에 뒤 공백 두 개가 있는 `7 +`(`"7 +  "`)와 이유를 적은 영어 주석 두 줄을 더했다. 시험 `does not take white space other than a space for a space`의 식 목록에 `1`과 `+ 2` 사이에 CR이 있는 식(`"1\r+ 2"`, JavaScript 탈출 표기)을 더했다. 저장한 뒤 시험 파일에 CR 바이트가 0이고 U+00A0의 실제 바이트가 0임을 확인했다(탈출 표기가 실제 글자로 바뀌지 않았다). 두 행은 계획의 표 2에 없는 입력이지만 E-4(받은 글자의 위치)와 E-5(U+0020이 아닌 공백이 섞인 식)의 규칙에 속하는 입력이고, 지금 엔진에서 `"7 +  "`의 줄은 `오류: unexpected end of expression at position 5`, `"1\r+ 2"`의 줄은 `오류: unexpected character at position 1`이다.
- 변경(Cleaner 지적 F-1을 받아들인 뒤): 같은 시험의 줄바꿈 없음 단언을 `!renderScreen(expression).includes("\n")`에서 `!/[\r\n]/.test(renderScreen(expression))`로 바꾸었다. 아래 "Cleaner 결과"에 근거가 있다.

## 순서 있는 증거

Node.js v24.22.1, 프로젝트 루트. 변형 점검은 단위 3.2와 같이 작업 트리의 `src/`, `package.json`과 시험 파일을 사본으로 복사해 한 곳만 바꾸고 그 사본에서 `node --test`를 돌렸다(사본의 `node --test`는 화면 시험 13개만 든다).

### 1. 변경 전의 시험(단위 3.2 커밋 상태)

| 사본 | 결과 |
| --- | --- |
| 전달된 모듈 | 13개 통과 |
| 끝의 U+0020을 지우고 `evaluate`에 넘김 | 12개 통과, 1개 실패(`returns a line longer than the display whole`). 단위 3.2의 입력이 뒤 공백을 가져서 우연히 걸린 것이고, 받은 글자의 위치를 보는 시험 `reports an error at its position in the expression as received`는 통과한다 |
| CR을 지우고 `evaluate`에 넘김 | 13개 모두 통과 |

TEST-001의 관찰이 현재 시험에서 그대로 재현된다. 위치 시험은 끝 공백을 지우는 변형을, 공백 시험은 CR을 지우는 변형을 가리지 못한다. 변형은 앞선 Dev 기록(dev-qa-r1)과 QA가 쓴 두 변형과 같은 꼴이다.

### 2. 두 행을 더한 뒤(Cleaner 위임 시점의 시험)

시험 파일의 `git hash-object`는 `291720dff675`(변경 전 `247897755729`)이다.

| 명령 | 결과 |
| --- | --- |
| `node --test` | 종료 상태 0, 68개 통과, 실패 0(기존 55개, 화면 13개) |
| `node ci/screen-rule.check.mjs` | 종료 상태 0, 출력 없음 |

### 3. 두 행의 민감도 점검(Cleaner 위임 시점의 시험)

사후의 민감도 점검이다.

| 사본 | 결과 | 실패한 단언 |
| --- | --- | --- |
| 전달된 모듈(기준) | 13개 통과 | 없음 |
| 끝의 U+0020을 지우고 `evaluate`에 넘김 | 11개 통과, 2개 실패(`reports an error at its position in the expression as received`와 `returns a line longer than the display whole`) | 위치 시험은 새 행 `renderScreen("7 +  ")`: 실제는 `position 3`, 기대는 `position 5`. 긴 줄 시험은 단위 3.2의 입력 때문에 걸린다 |
| CR을 지우고 `evaluate`에 넘김 | 12개 통과, 1개 실패(`does not take white space other than a space for a space`) | 새 행 `renderScreen("1\r+ 2")`: 실제는 CR이 든 값 줄 `1`, CR, `+ 2 = 3`, 기대는 `오류: unexpected character at position 1` |
| 값 줄을 48글자에서 자름 | 12개 통과, 1개 실패(`returns a line longer than the display whole`) | 단위 3.2의 단언 |
| 오류 줄을 48글자에서 자름 | 12개 통과, 1개 실패(같은 시험) | 단위 3.2의 단언 |
| 까닭을 줄인 엔진 | 12개 통과, 1개 실패(같은 시험) | 단위 3.2의 길이 단언 |

새 두 행이 각각 자기 변형을 가린다. 변경 전에는 위치 시험과 공백 시험이 두 변형에 통과했고 변경 뒤에는 새 행이 실패한다.

### 4. Cleaner 검토자에게 넘길 때의 상태

위임 직전 21:55 +0900의 상태: HEAD `a5eade8`, `git status --porcelain=v1`은 ` M test/screen.test.js`와 새 기록 문서 이 파일뿐, 색인은 비어 있음(`git ls-files --stage`와 `git status`의 출력 해시를 저장했다). 시험 파일은 `291720dff675`, 제품 파일은 `4c17930a0090`이다. 검토자가 돌아온 21:58 +0900에 HEAD, 색인, 작업 트리 상태의 해시와 네 파일(제품, 시험, 이 기록, Story)의 해시가 위임 때와 같음을 확인했다.

## Cleaner 결과

- 검토자: Dev 하위 세션이 시작한 하위 세션(`Agent` 도구, 유형 `general-purpose`, 요청 모델 별칭 `opus`, 요청 effort `high`, 이름 없음, 단위 3.1과 3.2의 검토자와 다른 새 세션). 검토자가 자기 세션 정보에서 읽어 보고한 모델 ID는 `claude-opus-5-5`이고 effort는 숫자 30이며 설정의 이름 `high`와의 대응은 확인하지 못했다(검토자의 자기 보고).
- 검토 범위: 바뀐 경로 `test/screen.test.js`의 추가된 줄(주석 두 줄과 목록 줄 둘)과 같은 시험 안의 기존 단언, 기준 사본. 주석 위생 §2와 §3의 후보 검색(§1.1, §1.2, §1.7, `IN-FLIGHT`)을 기준 사본과 추가된 줄에 하고 문맥을 검토해 후보와 위반이 없다고 보고했다. 파일에 CR 바이트와 U+00A0의 실제 바이트가 0임을 확인했다. 프로젝트 전체 `node --test`, `node ci/screen-rule.check.mjs`, 1.3-UNIT-011의 diff는 다시 실행하지 않았다고 밝혔다(지적이 이들에 기대지 않는다).
- 읽은 규칙 본문: `golden-rules`, `testing-tdd`, `javascript-language`, `javascript-crap`, `coding-principles`, `comments`, `crap`과 Hub와 두 색인, `load-project-rules.md`, `code-comment-style.md`, 주석 위생 체크리스트. 읽지 않은 본문은 `documentation`(cleaner의 규칙 종류가 아님)이다. Story는 앞 441줄까지만 읽었다고 보고했다.
- 검토자가 쓴 파일: 모두 검토자가 만든 새 파일이고 지정한 작업 폴더 안에 있다. 변형 실행 스크립트와 제안을 적용하는 스크립트, 추가된 줄과 비교 기준의 사본, 변형 사본 열 곳(각 `src/` 사본, `package.json`, 시험 파일)으로 모두 64개 파일이다. 기존 파일을 바꾼 것과 폴더 밖에 쓴 것은 없다고 보고했다. Dev가 프로젝트 루트에서 위임 시점의 상태 파일보다 새로운 파일을 `.git`과 검토자 폴더를 빼고 찾았고, Dev가 돌아온 뒤에 쓴 상태 파일 하나뿐이었다.
- 지적: 한 건.
  - F-1(낮음, 확신 중간): 위치: 시험 `does not take white space other than a space for a space`의 줄바꿈 없음 단언 `!renderScreen(expression).includes("\n")`와 그 메시지 `has no line break`. 기준: `comments` 본문 Comment Quality의 "시험의 글은 실제로 단언하는 것을 말해야 한다", Cleaner 점검 목록의 "의도한 결함을 잡는 시험", 1.3-UNIT-005의 "줄에 줄바꿈 글자가 없다"와 AC 2의 "한 줄". 문제: 이 단위가 같은 목록에 CR이 든 식을 더해 이 행에도 "줄바꿈 없음" 단언이 걸리는데, 단언은 LF만 본다. 오류 줄의 기대 글자는 `evaluate`의 메시지에서 오므로 메시지에 CR이 들어가도 `assertErrorLines`가 통과한다. 검토자의 사본: 엔진 메시지에 LF가 들어가는 변형은 12개 통과 1개 실패(이 단언), CR이 들어가는 변형은 13개 모두 통과(놓침). 제안: 단언을 `!/[\r\n]/.test(renderScreen(expression))`로 바꾼다. 검토자의 사본에서 기준은 13개 통과이고 CR 변형은 12개 통과 1개 실패다. CR을 줄바꿈 글자로 볼지는 Story가 글자로 정하지 않았고 검토자는 AC 2의 "한 줄"로 읽었다고 밝혔다.
  - 기각한 후보: 주석의 "trailing spaces move the position"이 같은 시험에서 단언되지 않는다는 후보(지금 엔진에서 사실이고, 끝 공백을 위치에서 빼는 사본은 위치 시험이 아닌 `returns a line longer than the display whole`이 걸러서 주석이 소리 없이 낡지 않는다). 표 2에 없는 입력을 더한 것(E-4와 E-5의 규칙에 속하는 강화이고 수용된 기대를 바꾸지 않는다).
- 처분: F-1을 받아들였다. 이 라운드에서 더한 CR 행에 같은 시험의 기존 단언 "has no line break"가 걸리고, 그 단언이 CR을 보지 않아 이름이 단언하는 것보다 많이 말하기 때문이다. 이 정정은 새 행의 단언을 완성하는 것이어서 이 단위 안이고, 계획이 모르는 동작이나 점검을 더하지 않는다. 지적의 사본 결과를 Dev가 다시 얻었다: 변경 전에 엔진 메시지에 LF를 끼운 사본은 13개 중 1개 실패(`does not take white space other than a space for a space`, 단언 메시지 `the line for "1\t+ 2" has no line break`), CR을 끼운 사본은 13개 모두 통과(놓침)이다. 단언을 정정한 뒤 두 사본이 모두 같은 시험의 같은 단언에서 실패한다. 이 정정은 `testing-tdd`에 따라 기존 시험의 틈이고 제품 코드의 결함이 아니어서 이 단위의 `verification-only` 안에서 사후 민감도 점검으로 기록한다(Dev의 TDD RED가 아니다).
- 같은 검토자를 다시 부르지 않았다. 지적이 낮은 심각도이고 정정이 설계 결정을 바꾸지 않으며 Dev가 정정을 점검으로 보였다.

## 정정 뒤 재점검과 최종 점검

정정은 시험 파일 한 줄이다. 시험 파일의 `git hash-object`는 `bf965aa51886`이고 CR 바이트가 0이다. 제품 파일은 바뀌지 않았다(`4c17930a0090`).

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 전체 시험 | 프로젝트 루트의 `node --test` | 종료 상태 0, 68개 통과, 실패 0 |
| 1.3-INT-001 | `node ci/screen-rule.check.mjs` | 종료 상태 0, 출력 없음 |
| 줄바꿈 단언의 민감도(정정 뒤) | 엔진 메시지에 LF를 끼운 사본, CR을 끼운 사본에 정정한 시험을 돌림 | 두 사본 모두 12개 통과, 1개 실패(`does not take white space other than a space for a space`) |
| 두 행의 민감도(정정 뒤) | 끝의 U+0020을 지움, CR을 지움 | 앞은 `reports an error at its position in the expression as received`와 `returns a line longer than the display whole`이 실패, 뒤는 `does not take white space other than a space for a space`가 실패(위 표와 같음) |
| 단위 3.2의 변형(정정 뒤) | 값 줄 자르기, 오류 줄 자르기, 까닭을 줄인 엔진 | 각각 `returns a line longer than the display whole` 하나만 실패(위 표와 같음) |
| 1.3-INSP-001 | Story의 가져오기 검색 명령 | 종료 상태 0(제품 파일이 바뀌지 않음) |
| 1.3-INSP-002 | `src/screen.js`를 끝까지 읽음 | 단위 3.1의 기록과 같은 파일이고 판단이 같다 |
| 1.3-UNIT-011 | 기준 tip과의 `git diff --quiet`, 여덟 파일 | 종료 상태 0 |
| 주석 위생 후보 검색 | `git diff -U0 -- test/screen.test.js`의 추가된 줄(영어 주석 두 줄과 시험 줄 셋)에 §1.1, §1.2의 접두 질의, §1.7, `IN-FLIGHT` | 후보 없음. 검토자의 검색도 0건이다 |
| CRAP | 측정하지 않음 | `quality.crap.commands`가 비어 있다. 통과도 차단도 아니다. 제품 코드가 없고 새 함수가 없다 |

## 한계

- 변형 점검은 손으로 고른 변형 일곱 개이고 변이 도구가 없다. 줄바꿈 단언은 CR과 LF만 본다. 줄바꿈으로 볼 수 있는 다른 글자(U+2028, U+2029)는 이 시험이 보지 않는다.
- 줄바꿈 글자의 범위는 Story가 글자로 정하지 않았다. 검토자가 CR을 줄바꿈으로 읽었고 Dev가 받아들였다.
- `"7 +  "`의 줄 위치 5와 `"1\r+ 2"`의 줄 위치 1은 지금 엔진의 동작이고 수용된 결정이 아니다(표 2의 E-5와 같은 성격). 위치 규칙이 바뀌면 이 행의 기대도 엔진에서 얻으므로 시험이 따라가지만 변형 점검의 값은 달라진다.
