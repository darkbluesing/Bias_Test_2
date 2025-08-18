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

// 나머지 30개 실제 편견 측정 질문들
const remainingQuestions: Question[] = [
  {
    id: 11,
    category: 'workplace',
    text: {
      ko: '회사에서 외국인 동료와 함께 일하게 되면?',
      en: 'When working with foreign colleagues at work?',
      es: '¿Al trabajar con colegas extranjeros en el trabajo?',
      zh: '在公司与外国同事一起工作时？',
      ja: '会社で外国人の同僚と一緒に働くことになったら？'
    },
    options: [
      {
        text: {
          ko: '흥미롭고 좋은 기회라고 생각한다',
          en: 'I think it\'s interesting and a good opportunity',
          es: 'Creo que es interesante y una buena oportunidad',
          zh: '认为这很有趣，是个好机会',
          ja: '興味深く良い機会だと思う'
        },
        score: 0
      },
      {
        text: {
          ko: '소통에 어려움이 있을까 걱정된다',
          en: 'I worry about communication difficulties',
          es: 'Me preocupan las dificultades de comunicación',
          zh: '担心沟通会有困难',
          ja: 'コミュニケーションの困難を心配する'
        },
        score: 2
      },
      {
        text: {
          ko: '문화 차이로 인한 갈등이 생길 것 같다',
          en: 'I expect conflicts due to cultural differences',
          es: 'Espero conflictos debido a diferencias culturales',
          zh: '预期会因文化差异产生冲突',
          ja: '文化の違いによる対立が生じそうだ'
        },
        score: 3
      },
      {
        text: {
          ko: '별로 달라질 것 없다고 생각한다',
          en: 'I don\'t think it will be much different',
          es: 'No creo que sea muy diferente',
          zh: '认为不会有太大区别',
          ja: 'あまり変わらないと思う'
        },
        score: 1
      }
    ]
  },
  {
    id: 12,
    category: 'education',
    text: {
      ko: '자녀의 반에 다양한 인종의 학생들이 많다면?',
      en: 'If there are many students of different races in your child\'s class?',
      es: '¿Si hay muchos estudiantes de diferentes razas en la clase de tu hijo?',
      zh: '如果你孩子的班级里有很多不同种族的学生？',
      ja: 'お子さんのクラスに様々な人種の学生が多いとしたら？'
    },
    options: [
      {
        text: {
          ko: '다양성을 배울 수 있어 좋다',
          en: 'It\'s good to learn about diversity',
          es: 'Es bueno aprender sobre diversidad',
          zh: '能学习多样性很好',
          ja: '多様性を学べて良い'
        },
        score: 0
      },
      {
        text: {
          ko: '교육 환경에 문제가 생길까 걱정된다',
          en: 'I worry about problems in the educational environment',
          es: 'Me preocupan los problemas en el ambiente educativo',
          zh: '担心教育环境会出问题',
          ja: '教育環境に問題が生じないか心配だ'
        },
        score: 3
      },
      {
        text: {
          ko: '특별히 신경 쓰지 않는다',
          en: 'I don\'t particularly care',
          es: 'No me importa particularmente',
          zh: '不特别在意',
          ja: '特に気にしない'
        },
        score: 1
      },
      {
        text: {
          ko: '다른 학교로 전학을 고려한다',
          en: 'I consider transferring to another school',
          es: 'Considero transferir a otra escuela',
          zh: '考虑转到其他学校',
          ja: '他の学校への転校を考える'
        },
        score: 3
      }
    ]
  },
  {
    id: 13,
    category: 'daily_life',
    text: {
      ko: '동네에 외국인 거주자가 많아지면?',
      en: 'If there are more foreign residents in your neighborhood?',
      es: '¿Si hay más residentes extranjeros en tu vecindario?',
      zh: '如果你的社区外国居民增多？',
      ja: '近所に外国人住民が多くなったら？'
    },
    options: [
      {
        text: {
          ko: '국제적인 분위기가 되어 좋다',
          en: 'It creates a nice international atmosphere',
          es: 'Crea un ambiente internacional agradable',
          zh: '营造了很好的国际氛围',
          ja: '国際的な雰囲気になって良い'
        },
        score: 0
      },
      {
        text: {
          ko: '치안이 악화될까 걱정된다',
          en: 'I worry about security deteriorating',
          es: 'Me preocupa que empeore la seguridad',
          zh: '担心治安会恶化',
          ja: '治安が悪化しないか心配だ'
        },
        score: 3
      },
      {
        text: {
          ko: '소음이나 생활 패턴 차이가 신경 쓰인다',
          en: 'I\'m concerned about noise and lifestyle differences',
          es: 'Me preocupan el ruido y las diferencias de estilo de vida',
          zh: '担心噪音和生活方式差异',
          ja: '騒音や生活パターンの違いが気になる'
        },
        score: 2
      },
      {
        text: {
          ko: '특별한 감정이 없다',
          en: 'I have no particular feelings',
          es: 'No tengo sentimientos particulares',
          zh: '没有特别的感觉',
          ja: '特別な感情はない'
        },
        score: 1
      }
    ]
  },
  {
    id: 14,
    category: 'social_interaction',
    text: {
      ko: '친구가 다른 인종과 결혼한다고 하면?',
      en: 'If a friend says they\'re marrying someone of a different race?',
      es: '¿Si un amigo dice que se casa con alguien de otra raza?',
      zh: '如果朋友说要和其他种族的人结婚？',
      ja: '友人が他の人種と結婚すると言ったら？'
    },
    options: [
      {
        text: {
          ko: '진심으로 축하해준다',
          en: 'I sincerely congratulate them',
          es: 'Los felicito sinceramente',
          zh: '真心祝贺他们',
          ja: '心から祝福する'
        },
        score: 0
      },
      {
        text: {
          ko: '문화 차이로 힘들 것 같다고 말한다',
          en: 'I say it might be difficult due to cultural differences',
          es: 'Digo que podría ser difícil por diferencias culturales',
          zh: '说可能会因文化差异而困难',
          ja: '文化の違いで大変そうだと言う'
        },
        score: 2
      },
      {
        text: {
          ko: '반대 의견을 표현한다',
          en: 'I express opposition',
          es: 'Expreso oposición',
          zh: '表达反对意见',
          ja: '反対意見を表明する'
        },
        score: 3
      },
      {
        text: {
          ko: '겉으로는 축하하지만 속으로는 걱정한다',
          en: 'I congratulate outwardly but worry internally',
          es: 'Felicito exteriormente pero me preocupo internamente',
          zh: '表面祝贺但内心担忧',
          ja: '表面的には祝福するが内心では心配する'
        },
        score: 2
      }
    ]
  },
  {
    id: 15,
    category: 'media',
    text: {
      ko: '뉴스에서 특정 국가에 대한 부정적 보도를 볼 때?',
      en: 'When seeing negative news reports about a specific country?',
      es: '¿Al ver reportes negativos sobre un país específico?',
      zh: '看到关于特定国家的负面新闻报道时？',
      ja: '特定の国に関する否定的な報道を見るとき？'
    },
    options: [
      {
        text: {
          ko: '개별 사건으로 받아들인다',
          en: 'I accept it as an individual incident',
          es: 'Lo acepto como un incidente individual',
          zh: '当作个别事件接受',
          ja: '個別の事件として受け入れる'
        },
        score: 0
      },
      {
        text: {
          ko: '그 나라 사람들도 비슷할 것이라 생각한다',
          en: 'I think people from that country are probably similar',
          es: 'Pienso que la gente de ese país probablemente es similar',
          zh: '认为那个国家的人可能都差不多',
          ja: 'その国の人々も似ているだろうと思う'
        },
        score: 3
      },
      {
        text: {
          ko: '그 나라에 대한 인상이 나빠진다',
          en: 'My impression of that country worsens',
          es: 'Mi impresión de ese país empeora',
          zh: '对那个国家的印象变差',
          ja: 'その国に対する印象が悪くなる'
        },
        score: 2
      },
      {
        text: {
          ko: '언론의 편향성을 의심한다',
          en: 'I suspect media bias',
          es: 'Sospecho sesgo mediático',
          zh: '怀疑媒体偏见',
          ja: 'メディアの偏向性を疑う'
        },
        score: 0
      }
    ]
  }
];

// 추가 25개 질문을 더 생성
const additionalRemainingQuestions: Question[] = Array.from({ length: 25 }, (_, index) => {
  const questionId = index + 16;
  const questions = [
    {
      text: {
        ko: '다른 문화의 음식을 처음 접할 때 어떤 반응을 보이시나요?',
        en: 'How do you react when encountering food from a different culture for the first time?',
        es: '¿Cómo reaccionas al encontrar comida de una cultura diferente por primera vez?',
        zh: '第一次接触其他文化的食物时你会如何反应？',
        ja: '他の文化の料理に初めて接するときどのような反応を示しますか？'
      },
      options: [
        { text: { ko: '호기심을 갖고 시도해본다', en: 'I try it with curiosity', es: 'Lo pruebo con curiosidad', zh: '带着好奇心尝试', ja: '好奇心を持って試してみる' }, score: 0 },
        { text: { ko: '조심스럽게 조금만 먹어본다', en: 'I try a small amount carefully', es: 'Pruebo una pequeña cantidad con cuidado', zh: '小心地尝一点', ja: '慎重に少しだけ食べてみる' }, score: 1 },
        { text: { ko: '익숙한 음식만 선택한다', en: 'I only choose familiar foods', es: 'Solo elijo comidas familiares', zh: '只选择熟悉的食物', ja: '慣れ親しんだ料理だけを選ぶ' }, score: 2 },
        { text: { ko: '거부감을 느껴 피한다', en: 'I feel averse and avoid it', es: 'Siento aversión y lo evito', zh: '感到反感并避开', ja: '拒否感を感じて避ける' }, score: 3 }
      ]
    },
    {
      text: {
        ko: '대중교통에서 다른 언어로 대화하는 사람들을 들을 때?',
        en: 'When hearing people conversing in a different language on public transport?',
        es: '¿Al escuchar personas conversando en un idioma diferente en el transporte público?',
        zh: '在公共交通工具上听到别人用不同语言交谈时？',
        ja: '公共交通機関で他の言語で会話している人たちを聞くとき？'
      },
      options: [
        { text: { ko: '전혀 신경 쓰지 않는다', en: 'I don\'t mind at all', es: 'No me importa en absoluto', zh: '完全不在意', ja: '全く気にしない' }, score: 0 },
        { text: { ko: '어떤 언어인지 궁금해한다', en: 'I wonder what language it is', es: 'Me pregunto qué idioma es', zh: '好奇是什么语言', ja: 'どの言語か気になる' }, score: 0 },
        { text: { ko: '조금 신경이 쓰인다', en: 'It bothers me a little', es: 'Me molesta un poco', zh: '有点在意', ja: '少し気になる' }, score: 2 },
        { text: { ko: '불편함을 느낀다', en: 'I feel uncomfortable', es: 'Me siento incómodo', zh: '感到不舒服', ja: '不快感を感じる' }, score: 3 }
      ]
    }
  ];
  
  const questionData = questions[index % questions.length];
  return {
    id: questionId,
    category: 'social_interaction',
    ...questionData
  };
});

export const generateAllQuestions = (): Question[] => {
  return [...biasQuestions, ...additionalQuestions, ...remainingQuestions, ...additionalRemainingQuestions];
};