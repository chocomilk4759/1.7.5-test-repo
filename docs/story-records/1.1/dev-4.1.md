# dev-4.1 — 변형 실행 출력 서술과 커밋 표기의 정정

- Story: [1.1](../../stories/1.1.story.md)
- Entry: Dev QA 수정 단위 4.1, QA 라운드 2의 DOC-001(Required). 결정 목록은 [dev-qa-r2](dev-qa-r2.md)
- 작성자와 실제 실행자: Dev 하위 세션 James, 모델 `claude-sonnet-5-5`(시스템이 알려 준 값), `*run-story 1.1` run의 역할 작업. effort는 시스템이 숫자 30으로만 알려 주어 설정의 이름(`xhigh`)과의 대응을 확인하지 못했다
- 시각: 2026-11-06, 대조와 직접 실행 11:37 ~ 11:38 +0900, 기록 11:38 ~ 11:41 +0900
- 입력 기준: 브랜치 `story/1.1`, 시작 HEAD `d79cd25`. 시험 파일 `test/engine.test.js`는 `git hash-object` 값 `9c393cf547edc9`, 엔진 `src/engine.js`는 `5e7c584b21900d`이고 이 단위는 두 파일을 바꾸지 않는다. Node.js v24.22.1, Git 2.51.0. 이 단위는 이 기록 문서와 Story의 Dev 기록만 더한다

## 접근과 근거

접근은 `verification-only`다. 제품과 시험의 동작을 바꾸지 않고 앞선 Dev 기록의 사실 서술을 정정한다. `testing-tdd`의 `verification-only`는 "Use relevant document, configuration, structural, or assertion-sensitivity checks"라고 정하고, 여기서는 정정문의 모든 사실을 Dev가 저장한 원시 출력, Git, 직접 실행과 하나씩 대조했다. 이 단위에는 RED가 없다. 새 실행 가능한 동작이 없고, 기록의 서술이 원시 출력과 어긋났다는 QA의 관찰을 같은 원시 출력으로 확인한 것이 이 단위의 시작이다. 시나리오: 1.1-UNIT-003(첫째 시험), 1.1-UNIT-006(둘째 시험), 1.1-UNIT-010(셋째 시험). 정정 대상이 말하는 시험 셋이다.

앞선 기록 문서(dev-3.2, dev-qa-r1, dev-dod-2)와 Story의 앞선 Completion Notes 항목은 고쳐 쓰지 않았다. 정정은 이 기록 문서와 Story의 Completion Notes 새 항목에 있다.

## 정정 1: 변형 실행 출력 서술

### 정정 대상

dev-3.2의 섹션 '앞선 서술의 정정'의 '확인' 항목:

> 확인: Dev가 남긴 변형 실행 출력 전부에서 실패한 시험 이름을 찾으면 "divides by a number that is not zero"는 공백을 먼저 지우는 거친 변형에서만 실패했고(공백이 든 식을 모두 거부하는 변형이다), 나머지 둘은 어떤 변형에서도 실패하지 않았다. QA 라운드 1의 관찰과 같다.

dev-qa-r1의 'TEST-002 이미 통과한 시험 셋에 닿음 확인의 기록이 없다'의 '확인' 항목도 같은 주장이다.

> Dev가 남긴 변형 실행 출력 전부에서 실패한 시험 이름을 찾으면 "divides by a number that is not zero"는 공백을 먼저 지우는 거친 변형에서만 실패했고 나머지 둘은 어떤 변형에서도 실패하지 않았다.

### 정정문

1. 세 시험 가운데 둘이 Dev가 1회차 전에 저장한 변형 실행 출력에서 실패했다. 변형은 하나이고, 공백을 먼저 지우고 파싱하는 변형(dev-1.1 민감도 점검 표의 조각 13 행)을 건 같은 실행이다. 실패한 시험은 "divides by a number that is not zero"와 셋째 시험이다. 셋째 시험의 당시 이름은 "accepts the largest literal and a product that underflows to zero"이고 현재 이름은 "accepts the largest finite power of ten and a quotient that underflows"다(dev-1.1의 Cleaner 지적 F6이 이름을 바꾸었다).
2. 어떤 변형 출력에서도 실패하지 않은 시험은 "accepts digits with an optional fractional part" 하나뿐이다.
3. 1과 2는 QA 라운드 1의 관찰과 같다. 라운드 1의 gate는 TEST-002의 verification에 "accepts digits with an optional fractional part"는 어떤 변형에서도 실패하지 않았고 "다른 둘은 공백을 먼저 지우는 거친 변형에서만 실패했는데 그 변형은 공백이 든 식을 모두 거부한다"고 적었다. 위 인용의 "QA 라운드 1의 관찰과 같다"는 dev-3.2가 그 앞에 쓴 문장이 아니라 이 정정문 1과 2에 맞는다.
4. 공백을 먼저 지우는 변형은 공백이 든 식을 모두 거부한다. 변형 사본의 `evaluate`는 공백을 지운 글자를 파서에 주면서 끝 검사는 원래 식의 길이와 비교하므로, 공백이 하나라도 있으면 파서가 멈춘 위치가 원래 길이보다 작아 "unexpected character"로 던진다. 아래 직접 실행이 이를 보인다. 그래서 두 시험의 이 실패는 해당 동작(0이 아닌 수로 나누기, 가장 큰 유한 수 글자와 0으로 넘치는 몫)에 닿는다는 확인이 아니다. 두 시험이 쓰는 값 식에 공백이 있어 그 변형이 식을 거부했을 뿐이다. dev-1.1의 표 행 13이 이 변형을 "많은 값 시험도 함께 실패하는 거친 변형"이라 적은 것과 같다. 같은 실행에서 시험 27개 가운데 21개가 실패했다.
5. 결론은 바뀌지 않는다. dev-1.1의 민감도 점검 표에는 세 시험의 동작을 겨냥한 변형이 없었고, 닿음 확인은 사후 점검인 dev-3.2의 변형 여섯이 처음 보였다. TEST-002의 처리, dev-3.2의 변형 표와 결과, 제품, 시험은 이 정정의 영향을 받지 않는다.

### 직접 실행으로 확인한 공백 제거 변형의 동작

변형 사본의 `evaluate`에 입력 다섯 개를 하나씩 넣었다. 사본은 변형 실행 때 만든 것이고 이 실행은 파일을 바꾸지 않는다.

| 입력 | 결과 |
| --- | --- |
| `1+2` | 3 |
| `1 + 2` | 던짐, `unexpected character at position 3` |
| ` 1` | 던짐, `unexpected character at position 1` |
| `7 / 0.5` | 던짐, `unexpected character at position 5` |
| `0 / 7` | 던짐, `unexpected character at position 3` |

던진 위치는 공백을 지운 식의 길이와 같다. 두 시험이 실패할 때의 메시지도 같은 꼴이다. "divides by a number that is not zero"는 `unexpected character at position 5`로, 셋째 시험은 `unexpected character at position 621`로 실패했다. 변형이 공백이 든 값 식을 거부했다는 설명과 맞는다.

### 정정문의 사실과 원시 출력의 대조

| 사실 | 근거 |
| --- | --- |
| "divides by a number that is not zero"가 공백 제거 변형에서 실패 | 변형 폴더의 전체 출력과 실패 목록만 남긴 사본에서 같은 시험 시간으로 ✖ 줄이 있다. 메시지 `unexpected character at position 5` |
| 셋째 시험(당시 이름)이 같은 변형에서 실패 | 같은 두 출력에 ✖ 줄이 있다. 메시지 `unexpected character at position 621` |
| 그 밖의 변형 출력에서 둘은 통과 | 위치를 1부터 세는 변형(조각 13)의 출력에 두 시험이 통과로 나온다. Cleaner 지적 F3과 F4의 변형 출력에는 "divides by a number that is not zero"와 현재 이름의 셋째 시험이 통과로 나온다 |
| "accepts digits with an optional fractional part"는 실패한 적이 없음 | 저장된 출력 61개 어디에도 이 이름의 ✖ 줄이 없고, 변형을 건 전체 출력 11개에 모두 통과로 나온다 |
| 공백 제거 변형의 시험 27개 가운데 21개 실패 | 전체 출력의 요약 줄 `tests 27`, `pass 6`, `fail 21` |
| QA 라운드 1의 관찰 | `68aee70`의 gate에서 TEST-002의 verification |

## 정정 2: QA 라운드 1이 검토한 커밋의 표기

### 정정 대상

Story의 Completion Notes 'Review 인계(QA 수정 1회차)' 항목:

> 제품 파일 `src/engine.js`는 QA 라운드 1이 검토한 `68aee70`과 같다.

dev-dod-2의 입력 기준:

> 비교 기준은 QA 라운드 1이 검토한 HEAD `68aee70`이다.

### 정정문

QA 라운드 1이 검토한 head는 `50347a4`다. gate의 라운드 1 `head_commit`과 Story QA Results의 라운드 1 항목이 `50347a4`를 적는다. `68aee70`은 QA 라운드 1이 남긴 기록 커밋이고 gate, Story, qa-r1 세 파일만 바꾼다. 제품 파일 `src/engine.js`는 `50347a4`와 `68aee70`에서 같다(`git hash-object` 값 `5e7c584b21900d`, 현재 HEAD도 같다). 그래서 "제품 파일이 같다"는 내용은 맞고, 인용한 커밋의 표기만 바로잡는다. dev-dod-2가 `68aee70`과 비교해 얻은 결과(차이 없음 등)는 `68aee70`을 기준으로 한 비교로서 그대로 맞다. dev-qa-r1과 dev-3.1이 `68aee70`을 시작 HEAD, QA 1회차 기록 커밋으로 부른 곳은 처음부터 맞았다.

### 확인

| 사실 | 방법 | 결과 |
| --- | --- | --- |
| QA 라운드 1의 head | gate `docs/qa/gates/1.1.yml`의 `review_rounds` 라운드 1의 `head_commit`, Story QA Results의 라운드 1 | `50347a4532d8f5f6e48e74a71179f05730771fc3` |
| `68aee70`의 내용 | `git show --stat 68aee70`, `git diff --name-only 50347a4 68aee70` | 세 파일: gate, Story, qa-r1 |
| 제품과 시험이 두 커밋에서 같음 | `git diff --stat 50347a4 68aee70 -- src test` | 출력 없음, 종료 상태 0 |
| 엔진 파일 값 | `git hash-object`를 `50347a4`와 `68aee70`의 `src/engine.js`와 현재 파일에 적용 | 셋 모두 `5e7c584b21900d5fcb906b90fbad610a7f126cbb` |
| 같은 표기가 있는 곳 | `docs` 아래 문서에서 "라운드 1이 검토한", "검토한 HEAD" 검색 | Story의 Completion Notes 한 곳과 dev-dod-2 한 곳. 나머지 일치는 gate와 qa-r2가 이 지적을 말하는 곳이다 |

## 정정의 영향

- 제품, 시험, 앞선 Dev 기록 문서, QA 기록과 gate, 계획 본문은 바뀌지 않았다. 아래 점검이 이를 보인다.
- 이 정정은 dev-3.2를 대체하지 않는다. dev-3.2의 변형 표와 결과는 그대로이고, 그 안의 '확인' 항목 한 문장만 이 기록이 바로잡는다.
- QA 소유의 닫음 판단은 하지 않았다. 이 단위의 체크박스는 QA의 RESOLVED 판정이 아니다.

## 점검

| 점검 | 방법 | 결과 |
| --- | --- | --- |
| 원시 출력 대조 | 읽기 전용 스크립트로 Dev가 저장한 시험 실행 출력 61개에서 세 시험 이름의 ✖ 줄을 찾음 | ✖ 줄이 있는 출력은 공백 제거 변형의 같은 실행 두 곳뿐이고 둘 다 "divides by a number that is not zero"와 셋째 시험(당시 이름)이다. 첫째 시험의 ✖ 줄은 없다 |
| 공백 제거 변형의 동작 | 위 직접 실행 | 위 표와 같다 |
| 커밋 표기 | 위 확인 표의 Git 명령 | 위 표와 같다 |
| 앞선 기록 문서 불변 | `git diff --quiet d79cd25 --`에 sm-1, po-r1, dev-1.1, dev-2.1, dev-dod-1, dev-qa-r1, dev-3.1, dev-3.2, dev-dod-2, qa-r1, qa-r2의 경로 | 종료 상태 0, 차이 없음 |
| 제품, 시험, 계획, QA 파일 불변 | `git diff --quiet d79cd25 -- src test package.json README.md docs/architecture.md docs/prd.md docs/planning ci .github docs/qa` | 종료 상태 0, 차이 없음. 제품과 시험 파일은 QA 라운드 2가 검토한 `a9b841d`와도 같다 |
| Story의 섹션 보존 | 기준 `d79cd25`의 Story와 현재 Story를 `## ` 섹션별로 비교하는 스크립트 | 바뀐 섹션은 Dev Agent Record(Agent Identity, Debug Log References, Completion Notes List, File List) 하나다. Status, Story, Scope and Dependencies, Acceptance Criteria, Tasks / Subtasks, Dev Notes(Testing 포함), SM Draft Checklist, Change Log, PO Validation, QA Results는 같다 |
| 전체 시험 | 프로젝트 루트의 `node --test`, Node.js v24.22.1 | 35개 통과, 실패 0(엔진 31, 기존 4) |
| 1.1-UNIT-016 | `git diff --quiet 862f5fd -- src/number-format.js test/number-format.test.js` | 종료 상태 0, 차이 없음 |
| 1.1-INSP-001 | `grep -nE -e "\beval\b" -e "\bFunction\b" src/engine.js` | 일치 없음, 종료 상태 1 |
| 주석 위생 | 체크리스트 섹션 3과 4의 대상은 바뀐 제품과 시험 경로이고 `git diff --name-only d79cd25 -- src test`가 비어 있다 | 대상 경로 0개라서 후보 검색을 돌릴 파일이 없다. 새 주석과 새 IN-FLIGHT 표시가 없다 |
| 기록 점검 | `check-stage.sh records` | 종료 상태 0 |

## Independent Cleaner review

이 단위는 코드와 시험을 바꾸지 않고 기록의 서술을 정정한다. `data/development-quality.md` 섹션 Independent Cleaner review에 따라 별도 검토자 없이 Dev 자신의 점검을 적는다. 시작한 하위 세션은 없다. Dev 점검: 정정문의 사실마다 위 대조 표의 원시 출력이나 Git 결과를 가리키는지 하나씩 확인했고, 정정문이 앞선 기록의 결론(세 시험에 겨냥한 변형이 없었다)을 바꾸지 않는지 dev-1.1의 표와 dev-3.2의 변형 표에 비추어 읽었다. 정정문에 새 추적 번호나 편집 이력 표기를 넣지 않았다.

## 한계

- 대조한 범위는 Dev가 저장한 시험 실행 출력 61개다. Cleaner 검토자가 자기 폴더에서 돌린 변이의 결과는 출력으로 저장되어 있지 않아 포함하지 않았고, dev-1.1은 그 결과를 검토자의 보고로만 적었다.
- 앞선 서술이 현재 이름으로만 찾아 생긴 어긋남인지는 확인하지 못했다. QA도 같은 짐작을 적었다. 이 정정은 원인이 아니라 사실을 바로잡는다.
