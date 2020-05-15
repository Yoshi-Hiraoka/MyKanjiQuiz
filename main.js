'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: 'あそこにおおきな（やま）があります。', c: ['山', '雨', '川']},
    {q: 'この（犬）のなまえはトムです。', c: ['いぬ', 'ねこ', 'とり']},
    {q: '（あたらしい）がっこうができました。', c: ['新しい', '親しい', '美しい']},
    {q: 'きょうは（ごご）から友だちとえいがをみます。', c: ['午後', '牛後', '牛前']},
    {q: 'きょうは（そら）があおいですね。', c: ['空', '海', '顔']},
    {q: 'あのりんごは（みっつ）で400円です。', c: ['三つ', '二つ', '五つ']},
    {q: 'バスのまどからふじさんが（はんぶん）みえました。', c: ['半分', '新聞', '当分']},
    {q: 'スーパーの（みぎ）にほんやがあります。', c: ['右', '左', '石']},
    {q: 'リーさんは（あし）がながいです。', c: ['足', '手', '肘']},
    {q: 'わたしの（ちち）は５３さいです。', c: ['父', '乳', '母']},
    {q: 'あの木の（した）でやすみましょう。', c: ['下', '中', '左']},
    {q: 'どうぞ（はいって）ください。', c: ['入って', '人って', '太って']},
    {q: '（でぐち）はあちらです。', c: ['出口', '入口', '山口']},
    {q: '（あかい）くるまがほしいです。', c: ['赤い', '青い', '高い']},
    {q: 'このビルは（ふるい）です。', c: ['古い', '吉い', '苦い']},
    {q: '（来週）きょうとにいきます。', c: ['らいしゅう', 'せんしゅう', 'こんしゅう']},
    {q: 'まいにちおんがくを（聞き）ます。', c: ['きき', 'かき', 'むき']},
    {q: 'あのせんせいは（人気）があります。', c: ['にんき', 'ひとけ', 'じんぎ']},
    {q: 'このくるまは（安い）ですよ。', c: ['やすい', 'おもい', 'ひろい']},
    {q: 'たなかさんはテニスが（上手）ですね。', c: ['じょうず', 'じょおず', 'じょず']},
    {q: '（毎日）ねるまえになにをしますか。', c: ['まいにち', 'まいばん', 'まいあさ']},
    {q: 'プールでおよぐと（目）がいたくなります。', c: ['め', 'はな', 'くち']},
    {q: 'あしたはともだちとプールで（泳ぎ）ます。', c: ['およぎ', 'おおぎ', 'よよぎ']},
    {q: 'きょうは（少し）さむいですね。', c: ['すこし', 'うまし', 'しょうし']},
    {q: 'さくらがきれいな（公園）にいきましょう。', c: ['こうえん', 'こうばん', 'こうだん']},

  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function answerCheck(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoice = shuffle([...quizSet[currentNum].c]);
    shuffledChoice.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        answerCheck(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = '採点する';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      result.classList.remove('hidden');
      scoreLabel.textContent = `点数 : ${score} / ${quizSet.length}`;
    } else {
      currentNum++;
      setQuiz();
    }
  });
}
