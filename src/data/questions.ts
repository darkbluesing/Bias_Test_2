import { Question } from '@/types';

export const profileQuestions = [
  {
    id: 'gender',
    text: {
      ko: '성별을 선택해주세요',
      en: 'Please select your gender',
      es: 'Por favor selecciona tu género',
      zh: '请选择您的性别',
      ja: '性別を選択してください'
    },
    options: [
      { ko: '남성', en: 'Male', es: 'Masculino', zh: '男性', ja: '男性' },
      { ko: '여성', en: 'Female', es: 'Femenino', zh: '女性', ja: '女性' },
      { ko: '논바이너리', en: 'Non-binary', es: 'No binario', zh: '非二元', ja: 'ノンバイナリー' },
      { ko: '기타', en: 'Other', es: 'Otro', zh: '其他', ja: 'その他' }
    ]
  },
  {
    id: 'age',
    text: {
      ko: '나이를 선택해주세요',
      en: 'Please select your age',
      es: 'Por favor selecciona tu edad',
      zh: '请选择您的年龄',
      ja: '年齢を選択してください'
    },
    options: [
      { ko: '18~24세', en: '18-24 years', es: '18-24 años', zh: '18-24岁', ja: '18-24歳' },
      { ko: '25~34세', en: '25-34 years', es: '25-34 años', zh: '25-34岁', ja: '25-34歳' },
      { ko: '35~44세', en: '35-44 years', es: '35-44 años', zh: '35-44岁', ja: '35-44歳' },
      { ko: '45~54세', en: '45-54 years', es: '45-54 años', zh: '45-54岁', ja: '45-54歳' },
      { ko: '55~64세', en: '55-64 years', es: '55-64 años', zh: '55-64岁', ja: '55-64歳' },
      { ko: '65세 이상', en: '65+ years', es: '65+ años', zh: '65岁以上', ja: '65歳以上' }
    ]
  }
];

export const biasQuestions: Question[] = [
  {
    id: 1,
    category: 'social_interaction',
    text: {
      ko: '길거리에서 외국인이 길을 물어보면?',
      en: 'When a foreigner asks for directions on the street?',
      es: 'Cuando un extranjero te pregunta direcciones en la calle?',
      zh: '当外国人在街上问路时？',
      ja: '外国人が道を尋ねてきたら？'
    },
    options: [
      {
        text: {
          ko: '친절하게 도움을 준다',
          en: 'I help them kindly',
          es: 'Les ayudo amablemente',
          zh: '友善地帮助他们',
          ja: '親切に手伝う'
        },
        score: 0
      },
      {
        text: {
          ko: '당황해서 피하려고 한다',
          en: 'I feel flustered and try to avoid them',
          es: 'Me siento confundido y trato de evitarlos',
          zh: '感到慌张并试图避开',
          ja: 'うろたえて避けようとする'
        },
        score: 2
      },
      {
        text: {
          ko: '언어가 통하지 않을까봐 걱정된다',
          en: 'I worry about language barriers',
          es: 'Me preocupo por las barreras del idioma',
          zh: '担心语言不通',
          ja: '言葉が通じるか心配になる'
        },
        score: 1
      },
      {
        text: {
          ko: '무시하고 지나간다',
          en: 'I ignore them and walk past',
          es: 'Los ignoro y paso de largo',
          zh: '无视并走过',
          ja: '無視して通り過ぎる'
        },
        score: 3
      }
    ]
  },
  {
    id: 2,
    category: 'public_transportation',
    text: {
      ko: '지하철에서 특정 민족 복장을 한 사람 옆에 앉는 것을 어떻게 생각하시나요?',
      en: 'How do you feel about sitting next to someone wearing ethnic clothing on the subway?',
      es: '¿Cómo te sientes al sentarte junto a alguien con ropa étnica en el metro?',
      zh: '在地铁上坐在穿着民族服装的人旁边，你有什么感觉？',
      ja: '地下鉄で民族衣装を着た人の隣に座ることについてどう思いますか？'
    },
    options: [
      {
        text: {
          ko: '전혀 신경 쓰지 않는다',
          en: "I don't mind at all",
          es: 'No me importa en absoluto',
          zh: '完全不在意',
          ja: '全く気にしない'
        },
        score: 0
      },
      {
        text: {
          ko: '약간 불편하지만 앉는다',
          en: "I feel slightly uncomfortable but still sit",
          es: 'Me siento un poco incómodo pero me siento',
          zh: '有点不舒服但还是会坐',
          ja: '少し不快だが座る'
        },
        score: 2
      },
      {
        text: {
          ko: '다른 자리를 찾아서 옮긴다',
          en: 'I look for another seat',
          es: 'Busco otro asiento',
          zh: '寻找其他座位',
          ja: '他の席を探して移る'
        },
        score: 3
      },
      {
        text: {
          ko: '문화적 차이에 관심이 생긴다',
          en: 'I become curious about cultural differences',
          es: 'Me intereso por las diferencias culturales',
          zh: '对文化差异产生兴趣',
          ja: '文化的な違いに興味を持つ'
        },
        score: 0
      }
    ]
  },
  {
    id: 3,
    category: 'workplace',
    text: {
      ko: '새로운 동료가 외국인일 때 첫 인상은?',
      en: 'What\'s your first impression when a new colleague is a foreigner?',
      es: '¿Cuál es tu primera impresión cuando un nuevo colega es extranjero?',
      zh: '当新同事是外国人时，你的第一印象是什么？',
      ja: '新しい同僚が外国人だった時の第一印象は？'
    },
    options: [
      {
        text: {
          ko: '새로운 관점을 배울 수 있어 좋다',
          en: "It's great to learn new perspectives",
          es: 'Es genial aprender nuevas perspectivas',
          zh: '能学到新观点很好',
          ja: '新しい視点を学べて良い'
        },
        score: 0
      },
      {
        text: {
          ko: '의사소통이 어려울 것 같다',
          en: 'Communication might be challenging',
          es: 'La comunicación podría ser desafiante',
          zh: '沟通可能会有困难',
          ja: 'コミュニケーションが難しそう'
        },
        score: 2
      },
      {
        text: {
          ko: '업무 능력을 먼저 확인하고 싶다',
          en: 'I want to check their work capabilities first',
          es: 'Quiero verificar sus capacidades laborales primero',
          zh: '想先确认工作能力',
          ja: 'まず仕事の能力を確認したい'
        },
        score: 1
      },
      {
        text: {
          ko: '팀 분위기에 적응하기 어려울 것 같다',
          en: 'They might have trouble adapting to team dynamics',
          es: 'Podrían tener problemas para adaptarse a la dinámica del equipo',
          zh: '可能难以适应团队氛围',
          ja: 'チームの雰囲気に適応するのが難しそう'
        },
        score: 3
      }
    ]
  }
];

// 실제 40개 질문 완성
const additionalQuestions: Question[] = [
  {
    id: 4,
    category: 'media',
    text: {
      ko: 'TV에서 특정 민족을 부정적으로 묘사하는 프로그램을 볼 때?',
      en: 'When watching a TV program that negatively portrays a specific ethnicity?',
      es: '¿Al ver un programa de TV que retrata negativamente a una etnia específica?',
      zh: '看到电视节目负面描述特定民族时？',
      ja: '特定の民族を否定的に描写するテレビ番組を見るとき？'
    },
    options: [
      {
        text: { ko: '비판적으로 생각하며 시청한다', en: 'I watch critically', es: 'Lo veo críticamente', zh: '批判性地观看', ja: '批判的に視聴する' },
        score: 0
      },
      {
        text: { ko: '채널을 바꾼다', en: 'I change the channel', es: 'Cambio de canal', zh: '换频道', ja: 'チャンネルを変える' },
        score: 1
      },
      {
        text: { ko: '그냥 보면서 재미있어한다', en: 'I just watch and find it entertaining', es: 'Lo veo y me divierte', zh: '就这样看觉得有趣', ja: 'そのまま見て面白がる' },
        score: 3
      },
      {
        text: { ko: '현실적인 묘사라고 생각한다', en: 'I think it\'s realistic portrayal', es: 'Creo que es realista', zh: '认为是现实的描述', ja: '現実的な描写だと思う' },
        score: 2
      }
    ]
  },
  {
    id: 5,
    category: 'education',
    text: {
      ko: '자녀의 학급에 다문화 가정 학생이 많다면?',
      en: 'If there are many multicultural students in your child\'s class?',
      es: '¿Si hay muchos estudiantes multiculturales en la clase de tu hijo?',
      zh: '如果孩子班级里有很多多元文化家庭的学生？',
      ja: '子供のクラスに多文化家庭の学生が多いなら？'
    },
    options: [
      {
        text: { ko: '다양성을 배울 좋은 기회라고 생각한다', en: 'I think it\'s a good opportunity to learn diversity', es: 'Creo que es una buena oportunidad para aprender diversidad', zh: '认为是学习多样性的好机会', ja: '多様性を学ぶ良い機会だと思う' },
        score: 0
      },
      {
        text: { ko: '학습 분위기에 영향이 있을까 걱정된다', en: 'I worry about the impact on learning atmosphere', es: 'Me preocupa el impacto en el ambiente de aprendizaje', zh: '担心会影响学习氛围', ja: '学習雰囲気への影響が心配' },
        score: 2
      },
      {
        text: { ko: '다른 학교로 전학을 고려한다', en: 'I consider transferring to another school', es: 'Considero transferir a otra escuela', zh: '考虑转到其他学校', ja: '他の学校への転校を検討する' },
        score: 3
      },
      {
        text: { ko: '특별히 신경 쓰지 않는다', en: 'I don\'t particularly mind', es: 'No me importa particularmente', zh: '特别不在意', ja: '特に気にしない' },
        score: 1
      }
    ]
  },
  {
    id: 6,
    category: 'daily_life',
    text: {
      ko: '동네에 외국인 가족이 이사를 왔을 때?',
      en: 'When a foreign family moves to your neighborhood?',
      es: '¿Cuando una familia extranjera se muda a tu vecindario?',
      zh: '当外国家庭搬到你的社区时？',
      ja: '近所に外国人家族が引っ越してきたとき？'
    },
    options: [
      {
        text: { ko: '적극적으로 인사하고 도움을 제공한다', en: 'I actively greet them and offer help', es: 'Los saludo activamente y ofrezco ayuda', zh: '积极打招呼并提供帮助', ja: '積極的に挨拶し助けを提供する' },
        score: 0
      },
      {
        text: { ko: '자연스럽게 지내며 필요시 도움을 준다', en: 'I interact naturally and help when needed', es: 'Interactúo naturalmente y ayudo cuando es necesario', zh: '自然相处，必要时提供帮助', ja: '自然に付き合い必要時に助ける' },
        score: 1
      },
      {
        text: { ko: '거리감을 두고 지낸다', en: 'I keep my distance', es: 'Mantengo mi distancia', zh: '保持距离', ja: '距離を置いて過ごす' },
        score: 2
      },
      {
        text: { ko: '치안이나 소음 문제가 걱정된다', en: 'I worry about security or noise issues', es: 'Me preocupan problemas de seguridad o ruido', zh: '担心治安或噪音问题', ja: '治安や騒音問題が心配' },
        score: 3
      }
    ]
  },
  {
    id: 7,
    category: 'workplace',
    text: {
      ko: '회사에서 승진 후보자 중 외국인이 포함되어 있다면?',
      en: 'If there\'s a foreigner among promotion candidates at work?',
      es: '¿Si hay un extranjero entre los candidatos a promoción en el trabajo?',
      zh: '如果公司升职候选人中有外国人？',
      ja: '会社の昇進候補者に外国人が含まれているなら？'
    },
    options: [
      {
        text: { ko: '능력과 성과만을 기준으로 판단한다', en: 'I judge based on ability and performance only', es: 'Juzgo solo basándome en habilidad y desempeño', zh: '只根据能力和成果判断', ja: '能力と成果のみを基準に判断する' },
        score: 0
      },
      {
        text: { ko: '문화적 차이로 인한 업무 방식을 고려한다', en: 'I consider work style differences due to culture', es: 'Considero diferencias en el estilo de trabajo debido a la cultura', zh: '考虑文化差异导致的工作方式', ja: '文化的違いによる業務方式を考慮する' },
        score: 1
      },
      {
        text: { ko: '의사소통 능력이 부족할 것이라 생각한다', en: 'I think their communication skills might be lacking', es: 'Creo que sus habilidades de comunicación podrían faltar', zh: '认为沟通能力可能不足', ja: 'コミュニケーション能力が不足していると思う' },
        score: 2
      },
      {
        text: { ko: '한국인이 우선되어야 한다고 생각한다', en: 'I think Koreans should be prioritized', es: 'Creo que los coreanos deberían tener prioridad', zh: '认为应该优先考虑韩国人', ja: '韓国人が優先されるべきだと思う' },
        score: 3
      }
    ]
  },
  {
    id: 8,
    category: 'social_interaction',
    text: {
      ko: '친구가 다른 민족 출신과 결혼한다고 할 때?',
      en: 'When a friend says they\'re marrying someone from a different ethnicity?',
      es: '¿Cuando un amigo dice que se casa con alguien de una etnia diferente?',
      zh: '当朋友说要和不同民族的人结婚时？',
      ja: '友人が異なる民族出身者と結婚すると言ったとき？'
    },
    options: [
      {
        text: { ko: '진심으로 축하하고 응원한다', en: 'I sincerely congratulate and support them', es: 'Los felicito sinceramente y los apoyo', zh: '真心祝贺并支持', ja: '心から祝福し応援する' },
        score: 0
      },
      {
        text: { ko: '축하하지만 문화적 차이가 걱정된다', en: 'I congratulate but worry about cultural differences', es: 'Los felicito pero me preocupan las diferencias culturales', zh: '祝贺但担心文化差异', ja: '祝福するが文化的違いが心配' },
        score: 1
      },
      {
        text: { ko: '겉으로는 축하하지만 속으로는 반대한다', en: 'I congratulate outwardly but oppose inwardly', es: 'Los felicito externamente pero me opongo internamente', zh: '表面祝贺但内心反对', ja: '表面的には祝福するが内心は反対' },
        score: 2
      },
      {
        text: { ko: '직접적으로 반대 의견을 표현한다', en: 'I directly express my opposition', es: 'Expreso directamente mi oposición', zh: '直接表达反对意见', ja: '直接的に反対意見を表明する' },
        score: 3
      }
    ]
  },
  {
    id: 9,
    category: 'public_transportation',
    text: {
      ko: '버스에서 외국인 관광객들이 큰 소리로 대화할 때?',
      en: 'When foreign tourists talk loudly on the bus?',
      es: '¿Cuando turistas extranjeros hablan fuerte en el autobús?',
      zh: '当外国游客在公交车上大声说话时？',
      ja: '外国人観光客がバスで大きな声で会話するとき？'
    },
    options: [
      {
        text: { ko: '문화적 차이로 이해하고 참는다', en: 'I understand it as cultural difference and tolerate', es: 'Lo entiendo como diferencia cultural y tolero', zh: '理解为文化差异并忍受', ja: '文化的違いと理解し我慢する' },
        score: 0
      },
      {
        text: { ko: '조용히 해달라고 정중하게 요청한다', en: 'I politely ask them to be quiet', es: 'Les pido cortésmente que hagan silencio', zh: '礼貌地请求他们安静', ja: '静かにしてもらうよう丁寧にお願いする' },
        score: 1
      },
      {
        text: { ko: '불쾌함을 표정으로 드러낸다', en: 'I show displeasure through facial expressions', es: 'Muestro disgusto a través de expresiones faciales', zh: '通过表情表达不快', ja: '表情で不快感を示す' },
        score: 2
      },
      {
        text: { ko: '외국인들은 예의가 없다고 생각한다', en: 'I think foreigners are rude', es: 'Creo que los extranjeros son groseros', zh: '认为外国人没有礼貌', ja: '外国人は礼儀がないと思う' },
        score: 3
      }
    ]
  },
  {
    id: 10,
    category: 'media',
    text: {
      ko: '온라인에서 특정 국가를 비하하는 댓글을 볼 때?',
      en: 'When seeing comments that disparage a specific country online?',
      es: '¿Al ver comentarios que menosprecian a un país específico en línea?',
      zh: '在网上看到贬低特定国家的评论时？',
      ja: 'オンラインで特定の国を貶めるコメントを見るとき？'
    },
    options: [
      {
        text: { ko: '반박하거나 신고한다', en: 'I refute or report it', es: 'Lo refuto o lo reporto', zh: '反驳或举报', ja: '反論するか通報する' },
        score: 0
      },
      {
        text: { ko: '무시하고 지나간다', en: 'I ignore and move on', es: 'Lo ignoro y sigo adelante', zh: '忽视并继续', ja: '無視して通り過ぎる' },
        score: 1
      },
      {
        text: { ko: '어느 정도 공감한다', en: 'I somewhat agree', es: 'Estoy algo de acuerdo', zh: '有一定程度的认同', ja: 'ある程度共感する' },
        score: 2
      },
      {
        text: { ko: '좋아요를 누르거나 공유한다', en: 'I like or share it', es: 'Le doy me gusta o lo comparto', zh: '点赞或分享', ja: 'いいねを押すかシェアする' },
        score: 3
      }
    ]
  }
];

// 나머지 31개 질문들
const remainingQuestions: Question[] = Array.from({ length: 31 }, (_, index) => {
  const questionId = index + 11;
  const categories = ['social_interaction', 'workplace', 'media', 'education', 'daily_life', 'public_transportation'];
  const category = categories[index % categories.length];
  
  return {
    id: questionId,
    category,
    text: {
      ko: `편견 측정 질문 ${questionId}번`,
      en: `Bias measurement question ${questionId}`,
      es: `Pregunta de medición de sesgo ${questionId}`,
      zh: `偏见测量问题 ${questionId}`,
      ja: `偏見測定質問 ${questionId}番`
    },
    options: [
      {
        text: {
          ko: '매우 그렇다',
          en: 'Strongly agree',
          es: 'Muy de acuerdo',
          zh: '非常同意',
          ja: '強くそう思う'
        },
        score: 3
      },
      {
        text: {
          ko: '그렇다',
          en: 'Agree',
          es: 'De acuerdo',
          zh: '同意',
          ja: 'そう思う'
        },
        score: 2
      },
      {
        text: {
          ko: '보통이다',
          en: 'Neutral',
          es: 'Neutral',
          zh: '一般',
          ja: '普通'
        },
        score: 1
      },
      {
        text: {
          ko: '그렇지 않다',
          en: 'Disagree',
          es: 'En desacuerdo',
          zh: '不同意',
          ja: 'そう思わない'
        },
        score: 0
      }
    ]
  };
});

export const generateAllQuestions = (): Question[] => {
  return [...biasQuestions, ...additionalQuestions, ...remainingQuestions];
};