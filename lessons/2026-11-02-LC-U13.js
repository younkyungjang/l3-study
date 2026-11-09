L3.add({
  id: '2026-11-02-LC-U13',
  date: '2026-11-02',
  category: 'LC', categoryLabel: 'LC 수업 (원어민)',
  title: 'LC Unit 13 · The First Shampoo',
  due: '11/6(금) 수업 전',
  source: 'https://band.us/band/97376330/post/885',
  note: 'Reading Voyage Starter 2 Unit 13. 판서 사진(11/3)으로 정답 확인함.',
  plan: [
    '월(수업일) 밤: 1 단어 뜻, 2 영영 뜻',
    '화: 3 동의어, 4 내용 이해',
    '수: 5 Core Sentence 빈칸, 6 문장 만들기 → Booklet에 Core Sentence 다시 쓰기',
    '목: 7 말하기 연습 후 단어·Core Sentence 3번씩 녹음해서 업로드',
    '금 수업 전: 홈 화면의 "오늘 다시 풀 문제"로 오답 마무리',
  ],
  checklist: [
    '단어를 외우고 3번씩 소리 내어 녹음하기',
    'Core Sentence를 LC Booklet에 1번씩 다시 쓰기',
    'Core Sentence를 외우고 3번씩 녹음하기',
    'krassenhomework.com에 녹음 파일 업로드 (파일 제목에 영어·한글 이름)',
  ],
  sections: [
    {
      id: 'vocab', title: '단어 뜻', guide: '영어 단어를 보고 한국어 뜻 고르기', type: 'mc',
      items: [
        { q: 'invention', answer: '발명', say: 'invention' },
        { q: 'cosmetic', answer: '화장품', say: 'cosmetic' },
        { q: 'experiment', answer: '실험', say: 'experiment' },
        { q: 'liquid', answer: '액체', say: 'liquid' },
        { q: 'shiny', answer: '반짝이는', say: 'shiny' },
        { q: 'powder', answer: '가루', say: 'powder' },
        { q: 'popular', answer: '인기 있는', say: 'popular' },
        { q: 'healthy', answer: '건강한', say: 'healthy' },
      ],
    },
    {
      id: 'eng-def', title: '영영 뜻 → 단어 쓰기', guide: '선생님 판서의 영어 뜻을 보고 철자까지 정확히', type: 'type',
      items: [
        { q: 'creating something new (n.)', answer: 'invention' },
        { q: 'a product used to improve your appearance (n.)', answer: 'cosmetic' },
        { q: 'a test to learn something (n.)', answer: 'experiment' },
        { q: 'a substance that flows like water (n.)', answer: 'liquid' },
        { q: 'reflecting light (adj.)', answer: 'shiny' },
        { q: 'something dry in tiny parts (n.)', answer: 'powder' },
        { q: 'liked by many people (adj.)', answer: 'popular' },
        { q: 'good for your body or mind (adj.)', answer: 'healthy' },
      ],
    },
    {
      id: 'syn', title: '동의어 연결', guide: '뜻이 비슷한 단어 고르기', type: 'mc',
      items: [
        { q: 'invention = ?', answer: 'creation' },
        { q: 'cosmetic = ?', answer: 'makeup' },
        { q: 'experiment = ?', answer: 'trial' },
        { q: 'shiny = ?', answer: 'bright' },
        { q: 'powder = ?', answer: 'dust' },
      ],
    },
    {
      id: 'comp', title: '내용 이해', guide: '지문 내용 문제 (워크북 Comprehension Questions)', type: 'mc',
      items: [
        { q: 'What do people use when they take a shower every day?', choices: ['Perfume and oil', 'Cosmetics and powder', 'Soap and shampoo', 'Water only'], answer: 'Soap and shampoo' },
        { q: 'How long ago did the ancient Egyptians have soap?', choices: ['5,000 years ago', '500 years ago', '50 years ago', '100 years ago'], answer: '5,000 years ago' },
        { q: 'What did Dr. John Breck make in 1930?', choices: ['Soap', 'Perfume', 'Liquid soap', 'His own shampoo that was healthier for hair'], answer: 'His own shampoo that was healthier for hair' },
        { q: 'What can shampoos do for hair now?', choices: ['Make it wet', 'Make hair strong and shiny', 'Make it heavy', 'Make it green'], answer: 'Make hair strong and shiny' },
        { q: 'Who made the first shampoo in 1898?', choices: ['Hans Schwarzkopf', 'Dr. John Breck', 'The ancient Egyptians', 'A teacher in Korea'], answer: 'Hans Schwarzkopf', explain: '첫 샴푸는 가루(powder)였고, 1927년에 액체(liquid) 샴푸를 만들었어요.' },
        { q: 'Since then, shampoos have gotten much ______.', type: 'type', answer: 'better' },
      ],
    },
    {
      id: 'core-cloze', title: 'Core Sentence 빈칸', guide: '듣기 버튼으로 문장을 듣고 빈칸 채우기', type: 'type',
      items: [
        { q: 'They used soap, oil, and perfume to ______ their hair.', answer: 'wash', say: 'They used soap, oil, and perfume to wash their hair.' },
        { q: 'His shampoo became very ______.', answer: 'popular', say: 'His shampoo became very popular.' },
        { q: 'People all over Germany ______ using it.', answer: 'started', say: 'People all over Germany started using it.' },
        { q: "They can make people's hair strong and ______ now, too.", answer: 'shiny', say: "They can make people's hair strong and shiny now, too." },
      ],
    },
    {
      id: 'core-order', title: '문장 만들기', guide: '단어를 순서대로 눌러 Core Sentence 완성', type: 'order',
      items: [
        { q: '그들은 머리를 감기 위해 비누, 기름, 그리고 향수를 사용했다.', answer: 'They used soap, oil, and perfume to wash their hair.' },
        { q: '그의 샴푸는 매우 인기가 많아졌다. 독일 전역의 사람들이 그것을 쓰기 시작했다.', answer: 'His shampoo became very popular. People all over Germany started using it.' },
        { q: '이제 샴푸는 사람들의 머리카락을 튼튼하고 윤기 나게도 만들 수 있다.', answer: "They can make people's hair strong and shiny now, too." },
        { q: '[MKE] 소음은 잠을 방해할 수 있다. (interfere with)', answer: 'Noise can interfere with sleep.' },
        { q: '[Target: by] 나는 책을 읽음으로써 이것을 배웠다.', answer: 'I learned this by reading a book.' },
      ],
    },
    {
      id: 'speak', title: '말하기 연습 (녹음 전)', guide: '한국어를 보고 영어로 말하기, 스스로 채점', type: 'speak',
      items: [
        { q: '그들은 머리를 감기 위해 비누, 기름, 그리고 향수를 사용했다.', answer: 'They used soap, oil, and perfume to wash their hair.' },
        { q: '그의 샴푸는 매우 인기가 많아졌다. 독일 전역의 사람들이 그것을 쓰기 시작했다.', answer: 'His shampoo became very popular. People all over Germany started using it.' },
        { q: '이제 샴푸는 사람들의 머리카락을 튼튼하고 윤기 나게도 만들 수 있다.', answer: "They can make people's hair strong and shiny now, too." },
        { q: 'TV를 너무 많이 보는 것은 숙제를 방해할 수 있다.', answer: 'Watching TV too much can interfere with homework.' },
      ],
    },
  ],
});
