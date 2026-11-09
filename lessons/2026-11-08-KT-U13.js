L3.add({
  id: '2026-11-08-KT-U13',
  date: '2026-11-08',
  category: 'KT', categoryLabel: '한국인 선생님 수업',
  title: '한국인T · RC Unit 13 The First Shampoo 단어 + 크코센 45-48',
  due: '다음 Review Test 전',
  source: 'https://band.us/band/97376330/post/898',
  note: '1102(월)~1106(금) 수업 자료. RC 단어 리스트(수업용/과제용) + 크코센 구조분석 45-48. 원어민 LC Unit 13과 같은 지문이라 함께 복습하면 좋아요.',
  plan: [
    '1일차: 1 RC 단어, 2 파생어·반의어 (단어장 정리 & 셀테)',
    '2일차: 3 크코센 구조분석, 4 문법 고르기',
    '3일차: 5 영작, 6 말하기',
    '시험 전날: "오늘 다시 풀 문제"로 오답만 다시',
  ],
  checklist: [
    'RC Unit 13 단어 단어장에 정리 (과제용 시트)',
    '크코센 45-48번 과제용 시트에 구조분석 표시하기',
  ],
  sections: [
    {
      id: 'rc-vocab', title: 'RC 단어', guide: 'RC Unit 13 단어 10개', type: 'mc',
      items: [
        { q: 'shiny', answer: '윤기 나는, 빛나는', say: 'shiny' },
        { q: 'experiment', answer: '실험', say: 'experiment' },
        { q: 'liquid', answer: '액체의', say: 'liquid' },
        { q: 'ancient', answer: '고대의', say: 'ancient' },
        { q: 'invention', answer: '발명품', say: 'invention' },
        { q: 'cosmetics', answer: '화장품', say: 'cosmetics' },
        { q: 'soap', answer: '비누', say: 'soap' },
        { q: 'fairly', answer: '꽤, 상당히', say: 'fairly' },
        { q: 'healthy', answer: '건강한', say: 'healthy' },
        { q: 'get better', answer: '나아지다, 좋아지다', say: 'get better' },
      ],
    },
    {
      id: 'rc-rel', title: '파생어·동의어·반의어', guide: '단어 리스트 오른쪽 칸 내용', type: 'mc',
      items: [
        { q: 'shiny 의 동사형 (빛나다, 반짝이다)', answer: 'shine' },
        { q: 'shiny = ?', answer: 'glossy' },
        { q: 'experiment 의 형용사형 (실험적인)', answer: 'experimental' },
        { q: 'liquid ↔ ? (고체의)', answer: 'solid' },
        { q: 'ancient ↔ ? (현대의)', answer: 'modern' },
        { q: 'invention 의 동사형 (발명하다)', answer: 'invent' },
        { q: '발명가 (invention 의 사람 명사)', answer: 'inventor' },
        { q: 'fairly = ?', answer: 'quite' },
        { q: 'healthy ↔ ?', answer: 'unhealthy' },
      ],
    },
    {
      id: 'kcs', title: '크코센 구조분석', guide: '문장의 문법 포인트 고르기', type: 'mc',
      items: [
        { q: 'Humans made soap thousands of years ago.\n→ thousands (of years) ago 의 뜻은?', choices: ['수천 년 전에', '수천 년 동안', '수천 년 후에', '수천 번'], answer: '수천 년 전에' },
        { q: 'They used soap, oil, and perfume to wash their hair.\n→ to wash 는?', choices: ['to부정사 부사적 용법 (목적: ~하기 위해)', 'to부정사 명사적 용법 (~하는 것)', '동명사', '과거분사'], answer: 'to부정사 부사적 용법 (목적: ~하기 위해)' },
        { q: 'They used soap, oil, and perfume ...\n→ A, B, and C 는?', choices: ['병렬 연결', '비교급', '관계대명사', '수동태'], answer: '병렬 연결' },
        { q: 'The scientist kept doing experiments.\n→ kept doing 의 뜻은?', choices: ['계속해서 ~했다 (keep + v-ing)', '~하는 것을 멈췄다', '~하기 위해 지켰다', '~하는 것을 잊었다'], answer: '계속해서 ~했다 (keep + v-ing)' },
        { q: 'It was healthier for hair than other shampoos.\n→ healthier ... than 은?', choices: ['비교급 + than: ~보다 더 ~한', '최상급: 가장 ~한', '원급 비교: ~만큼 ~한', 'too ~ to: 너무 ~해서'], answer: '비교급 + than: ~보다 더 ~한' },
      ],
    },
    {
      id: 'gr', title: '문법 고르기', guide: '시험에 나올 형태', type: 'mc',
      items: [
        { q: 'The scientist kept ( ? ) experiments.', choices: ['doing', 'to do', 'do'], answer: 'doing', explain: 'keep 다음에는 v-ing' },
        { q: 'He created a liquid shampoo ( ? ) 1927.', choices: ['in', 'on', 'at'], answer: 'in', explain: '연도 앞에는 in' },
        { q: 'It was ( ? ) for hair than other shampoos.', choices: ['healthier', 'healthy', 'healthiest'], answer: 'healthier', explain: 'than 이 있으면 비교급' },
        { q: 'They used soap, oil, and perfume ( ? ) their hair.', choices: ['to wash', 'washing', 'washed'], answer: 'to wash', explain: '목적(~하기 위해)은 to부정사' },
        { q: 'Shampoo is a ( ? ) new invention.', choices: ['fairly', 'fair', 'fairy'], answer: 'fairly', explain: '형용사 new 를 꾸미는 부사: fairly (꽤)' },
      ],
    },
    {
      id: 'wr', title: '영작', guide: '단어를 눌러 문장 만들기 (함정 단어 섞여 있음)', type: 'order',
      items: [
        { q: '인류는 수천 년 전에 비누를 만들었다. 하지만 샴푸는 꽤 새로운 발명품이다.', answer: 'Humans made soap thousands of years ago. But shampoo is a fairly new invention.', extra: ['fair'] },
        { q: '그들은 그들의 머리를 감기 위해 비누, 기름, 그리고 향수를 사용하였다.', answer: 'They used soap, oil, and perfume to wash their hair.', extra: ['washing'] },
        { q: '그 과학자는 계속해서 실험을 했다. 그래서 그는 1927년에 액체 샴푸를 만들었다.', answer: 'The scientist kept doing experiments. So he created a liquid shampoo in 1927.', extra: ['to', 'on'] },
        { q: '그것은 다른 샴푸들보다 모발 건강에 더 좋았다.', answer: 'It was healthier for hair than other shampoos.', extra: ['more', 'then'] },
      ],
    },
    {
      id: 'speak', title: '말하기', guide: '한국어를 보고 영어로 말하기 (스스로 채점)', type: 'speak',
      items: [
        { q: '하지만 샴푸는 꽤 새로운 발명품이다.', answer: 'But shampoo is a fairly new invention.' },
        { q: '그 과학자는 계속해서 실험을 했다.', answer: 'The scientist kept doing experiments.' },
        { q: '그것은 다른 샴푸들보다 모발 건강에 더 좋았다.', answer: 'It was healthier for hair than other shampoos.' },
      ],
    },
  ],
});
