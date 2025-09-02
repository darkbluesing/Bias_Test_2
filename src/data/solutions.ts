import { LocalizedText, TestResult } from '@/types';

type MainCategory = TestResult['category'];

export interface BiasCategory {
  range: [number, number]; // percentage range
  category: string; // custom category identifier
  title: LocalizedText;
  description: LocalizedText;
  solutions: LocalizedText;
}

export const biasSolutions: BiasCategory[] = [
  {
    range: [0, 5],
    category: 'extremely_low',
    title: {
      ko: '극도로 낮음 (0-5%)',
      en: 'Extremely Low (0-5%)',
      es: 'Extremadamente Bajo (0-5%)',
      zh: '极低 (0-5%)',
      ja: '極めて低い (0-5%)'
    },
    description: {
      ko: '편견이 거의 없는 상태이며, 매우 포용적인 사고방식을 가지고 있습니다.',
      en: 'You have almost no bias and possess a very inclusive mindset.',
      es: 'Casi no tienes prejuicios y posees una mentalidad muy inclusiva.',
      zh: '几乎没有偏见，拥有非常包容的思维方式。',
      ja: '偏見がほとんどなく、非常に包容的な考え方を持っています。'
    },
    solutions: {
      ko: '높은 포용성을 주변에 전파하세요.\n다문화 모임에서 리더십을 발휘하세요.\n차별 사례를 목격했을 때 적극 개입하세요.\n온라인에서도 포용적 메시지를 공유하세요.',
      en: 'Spread your high inclusiveness to others around you.\nExercise leadership in multicultural groups.\nActively intervene when witnessing discrimination.\nShare inclusive messages online as well.',
      es: 'Difunde tu alta inclusividad a otros a tu alrededor.\nEjerce liderazgo en grupos multiculturales.\nIntervén activamente cuando presencies discriminación.\nComparte mensajes inclusivos también en línea.',
      zh: '将您的高度包容性传播给周围的人。\n在多文化团体中发挥领导作用。\n目睹歧视时积极干预。\n在网上也分享包容性信息。',
      ja: 'あなたの高い包容性を周囲に広めてください。\n多文化グループでリーダーシップを発揮してください。\n差別を目撃した時は積極的に介入してください。\nオンラインでも包容的なメッセージを共有してください。'
    }
  },
  {
    range: [6, 10],
    category: 'very_low',
    title: {
      ko: '매우 낮음 (6-10%)',
      en: 'Very Low (6-10%)',
      es: 'Muy Bajo (6-10%)',
      zh: '很低 (6-10%)',
      ja: '非常に低い (6-10%)'
    },
    description: {
      ko: '열린 태도를 가지고 있으나, 무의식적 편향이 극히 일부 나타날 수 있습니다.',
      en: 'You have an open attitude, but unconscious bias may appear in very few instances.',
      es: 'Tienes una actitud abierta, pero el sesgo inconsciente puede aparecer en muy pocas ocasiones.',
      zh: '您有开放的态度，但无意识偏见可能在极少数情况下出现。',
      ja: 'オープンな態度を持っていますが、無意識の偏見が極わずかに現れる可能性があります。'
    },
    solutions: {
      ko: '고정관념 제거를 위해 자기 성찰을 하세요.\n포용성 관련 책·다큐를 정기적으로 접하세요.\n국제 이슈 토론 모임에 참여하세요.\n주변 사람들에게도 포용적 행동을 실천하세요.',
      en: 'Practice self-reflection to eliminate stereotypes.\nRegularly engage with books and documentaries about inclusivity.\nJoin international issue discussion groups.\nPractice inclusive behavior with people around you.',
      es: 'Practica la autorreflexión para eliminar estereotipos.\nConsumo regularmente libros y documentales sobre inclusividad.\nÚnete a grupos de discusión de temas internacionales.\nPractica comportamientos inclusivos con las personas a tu alrededor.',
      zh: '进行自我反思以消除刻板印象。\n定期接触关于包容性的书籍和纪录片。\n参加国际问题讨论小组。\n对周围的人实践包容性行为。',
      ja: '固定観念を排除するため自己省察をしてください。\n包容性に関する本やドキュメンタリーに定期的に触れてください。\n国際問題の議論グループに参加してください。\n周りの人にも包容的行動を実践してください。'
    }
  },
  {
    range: [11, 15],
    category: 'low',
    title: {
      ko: '낮음 (11-15%)',
      en: 'Low (11-15%)',
      es: 'Bajo (11-15%)',
      zh: '低 (11-15%)',
      ja: '低い (11-15%)'
    },
    description: {
      ko: '대부분 포용적이지만 특정 맥락에서 불편함을 느낄 수 있습니다.',
      en: 'You are mostly inclusive but may feel uncomfortable in specific contexts.',
      es: 'Eres mayormente inclusivo pero puedes sentirte incómodo en contextos específicos.',
      zh: '您大多是包容的，但在特定情境下可能会感到不舒服。',
      ja: 'ほとんど包容的ですが、特定の状況で不快感を感じることがあります。'
    },
    solutions: {
      ko: '불편한 상황을 기록하고 원인을 탐구하세요.\n\'내가 반대 입장이라면?\' 질문을 자주 던지세요.\n다문화 행사나 해외 체험을 늘리세요.\n무의식적 차별적 언행을 발견하면 즉시 수정하세요.',
      en: 'Record uncomfortable situations and explore their causes.\nOften ask yourself "What if I were in the opposite position?"\nIncrease participation in multicultural events or overseas experiences.\nCorrect unconscious discriminatory words and actions immediately when discovered.',
      es: 'Registra situaciones incómodas y explora sus causas.\nPregúntate frecuentemente "¿Qué pasaría si estuviera en la posición opuesta?"\nAumenta la participación en eventos multiculturales o experiencias en el extranjero.\nCorrige inmediatamente palabras y acciones discriminatorias inconscientes cuando las descubras.',
      zh: '记录不舒服的情况并探索其原因。\n经常问自己"如果我处于相反的立场会怎样？"\n增加参与多文化活动或海外体验。\n发现无意识的歧视言行时立即纠正。',
      ja: '不快な状況を記録し、その原因を探求してください。\n「もし私が反対の立場なら？」という質問を頻繁に自分に投げかけてください。\n多文化イベントや海外体験を増やしてください。\n無意識の差別的言動を発見したらすぐに修正してください。'
    }
  },
  {
    range: [16, 20],
    category: 'somewhat_low',
    title: {
      ko: '다소 낮음 (16-20%)',
      en: 'Somewhat Low (16-20%)',
      es: 'Algo Bajo (16-20%)',
      zh: '稍低 (16-20%)',
      ja: 'やや低い (16-20%)'
    },
    description: {
      ko: '편견이 드물게 나타나지만 특정 상황에서 방어적 태도를 보일 수 있습니다.',
      en: 'Bias appears rarely, but you may show defensive attitudes in certain situations.',
      es: 'El sesgo aparece raramente, pero puedes mostrar actitudes defensivas en ciertas situaciones.',
      zh: '偏见很少出现，但在某些情况下可能表现出防御态度。',
      ja: '偏見はめったに現れませんが、特定の状況で防御的態度を示すことがあります。'
    },
    solutions: {
      ko: '자기 점검 체크리스트를 만들어보세요.\n다문화 교육 프로그램에 참가하세요.\n언론 보도를 비판적 시각으로 보세요.\nSNS에서 다양성 관련 계정을 팔로우하세요.',
      en: 'Create a self-assessment checklist.\nParticipate in multicultural education programs.\nView media reports with a critical perspective.\nFollow diversity-related accounts on social media.',
      es: 'Crea una lista de verificación de autoevaluación.\nParticipa en programas de educación multicultural.\nVe los informes de los medios con una perspectiva crítica.\nSigue cuentas relacionadas con la diversidad en las redes sociales.',
      zh: '制作自我检查清单。\n参加多文化教育项目。\n以批判性视角看待媒体报道。\n在社交媒体上关注与多样性相关的账户。',
      ja: '自己点検チェックリストを作成してください。\n多文化教育プログラムに参加してください。\n報道を批判的視点で見てください。\nSNSで多様性関連のアカウントをフォローしてください。'
    }
  },
  {
    range: [21, 25],
    category: 'below_average',
    title: {
      ko: '보통 이하 (21-25%)',
      en: 'Below Average (21-25%)',
      es: 'Por Debajo del Promedio (21-25%)',
      zh: '低于平均水平 (21-25%)',
      ja: '平均以下 (21-25%)'
    },
    description: {
      ko: '대체로 포용적이지만 문화 차이에 불편함이 드러날 수 있습니다.',
      en: 'Generally inclusive, but discomfort with cultural differences may be revealed.',
      es: 'Generalmente inclusivo, pero puede revelarse incomodidad con las diferencias culturales.',
      zh: '总体上包容，但对文化差异的不适可能会显露出来。',
      ja: '全体的に包容的ですが、文化の違いに対する不快感が現れることがあります。'
    },
    solutions: {
      ko: '불편함을 억누르지 말고 대화로 풀어보세요.\n문화 차이를 주제로 열린 대화를 하세요.\n다문화 가정 아이들과 교류 기회를 가지세요.\n무의식적 농담도 차별이 될 수 있음을 인식하세요.',
      en: 'Don\'t suppress discomfort but resolve it through dialogue.\nHave open conversations about cultural differences.\nSeek opportunities to interact with children from multicultural families.\nRecognize that unconscious jokes can also be discriminatory.',
      es: 'No reprimas la incomodidad sino resuélvela a través del diálogo.\nTen conversaciones abiertas sobre las diferencias culturales.\nBusca oportunidades para interactuar con niños de familias multiculturales.\nReconoce que las bromas inconscientes también pueden ser discriminatorias.',
      zh: '不要压抑不适感，而是通过对话来解决。\n就文化差异进行开放对话。\n寻求与多文化家庭孩子互动的机会。\n认识到无意识的玩笑也可能是歧视性的。',
      ja: '不快感を抑えずに対話で解決してください。\n文化の違いについてオープンな対話をしてください。\n多文化家庭の子供たちと交流する機会を持ってください。\n無意識のジョークも差別になり得ることを認識してください。'
    }
  },
  {
    range: [26, 30],
    category: 'average',
    title: {
      ko: '보통 (26-30%)',
      en: 'Average (26-30%)',
      es: 'Promedio (26-30%)',
      zh: '平均水平 (26-30%)',
      ja: '平均 (26-30%)'
    },
    description: {
      ko: '상황에 따라 포용적이기도, 불편함을 드러내기도 합니다.',
      en: 'You are inclusive in some situations and reveal discomfort in others.',
      es: 'Eres inclusivo en algunas situaciones y revelas incomodidad en otras.',
      zh: '有时包容，有时表现出不适。',
      ja: '状況によって包容的だったり、不快感を表したりします。'
    },
    solutions: {
      ko: '불편함이 경험 때문인지 고정관념 때문인지 구분하세요.\n다양한 인종 친구를 직접 만나보세요.\n영화, 문학, 음식 체험 등으로 다문화를 접하세요.\n직장 내 무의식적 편향을 점검하세요.',
      en: 'Distinguish whether discomfort is due to experience or stereotypes.\nMeet friends of various races directly.\nExperience multiculturalism through movies, literature, and food.\nCheck for unconscious bias in the workplace.',
      es: 'Distingue si la incomodidad se debe a la experiencia o a los estereotipos.\nConoce amigos de varias razas directamente.\nExperimenta el multiculturalismo a través de películas, literatura y comida.\nRevisa el sesgo inconsciente en el lugar de trabajo.',
      zh: '区分不适是因为经验还是刻板印象。\n直接结识不同种族的朋友。\n通过电影、文学和美食体验多文化。\n检查工作场所的无意识偏见。',
      ja: '不快感が経験によるものか固定観念によるものかを区別してください。\n様々な人種の友人と直接会ってください。\n映画、文学、料理体験などで多文化に触れてください。\n職場での無意識の偏見を点検してください。'
    }
  },
  {
    range: [31, 35],
    category: 'above_average',
    title: {
      ko: '보통 이상 (31-35%)',
      en: 'Above Average (31-35%)',
      es: 'Por Encima del Promedio (31-35%)',
      zh: '高于平均水平 (31-35%)',
      ja: '平均以上 (31-35%)'
    },
    description: {
      ko: '문화적 이해는 있으나 방어적 반응이 자주 나타납니다.',
      en: 'You have cultural understanding but defensive reactions appear frequently.',
      es: 'Tienes comprensión cultural pero las reacciones defensivas aparecen frecuentemente.',
      zh: '有文化理解，但经常出现防御性反应。',
      ja: '文化的理解はありますが、防御的反応が頻繁に現れます。'
    },
    solutions: {
      ko: '관점을 존중하는 토론 모임에 참여하세요.\n\'다름=배움\' 사고로 전환하세요.\n다문화 자원봉사 활동을 해보세요.\n편견적 표현을 들으면 바로잡으세요.',
      en: 'Participate in discussion groups that respect different perspectives.\nShift to a "difference = learning" mindset.\nTry multicultural volunteer activities.\nCorrect prejudicial expressions when you hear them.',
      es: 'Participa en grupos de discusión que respeten diferentes perspectivas.\nCambia a una mentalidad de "diferencia = aprendizaje".\nPrueba actividades de voluntariado multicultural.\nCorrige las expresiones prejuiciosas cuando las escuches.',
      zh: '参加尊重不同观点的讨论小组。\n转换为"差异=学习"的思维方式。\n尝试多文化志愿活动。\n听到偏见表达时加以纠正。',
      ja: '異なる視点を尊重する議論グループに参加してください。\n「違い=学び」の思考に転換してください。\n多文化ボランティア活動をしてみてください。\n偏見的表現を聞いたら正してください。'
    }
  },
  {
    range: [36, 40],
    category: 'moderate',
    title: {
      ko: '중간 수준 (36-40%)',
      en: 'Moderate Level (36-40%)',
      es: 'Nivel Moderado (36-40%)',
      zh: '中等水平 (36-40%)',
      ja: '中程度 (36-40%)'
    },
    description: {
      ko: '편견이 특정 주제에서 뚜렷하며 무심코 차별적일 수 있습니다.',
      en: 'Bias is evident in specific topics and you may be unconsciously discriminatory.',
      es: 'El sesgo es evidente en temas específicos y puedes ser inconscientemente discriminatorio.',
      zh: '偏见在特定主题上明显，可能会无意中产生歧视。',
      ja: '特定のトピックで偏見が明らかで、無意識に差別的になる可能性があります。'
    },
    solutions: {
      ko: '차별이 사회적 갈등을 키울 수 있음을 인식하세요.\n무의식적 편견 줄이는 심리학적 기법을 연습하세요.\n포용성 워크숍에 참여하세요.\n콘텐츠 속 편견을 비판적으로 분석하세요.',
      en: 'Recognize that discrimination can escalate social conflicts.\nPractice psychological techniques to reduce unconscious bias.\nParticipate in inclusivity workshops.\nCritically analyze bias in content.',
      es: 'Reconoce que la discriminación puede escalar conflictos sociales.\nPractica técnicas psicológicas para reducir el sesgo inconsciente.\nParticipa en talleres de inclusividad.\nAnaliza críticamente el sesgo en el contenido.',
      zh: '认识到歧视可能会加剧社会冲突。\n练习减少无意识偏见的心理技巧。\n参加包容性研讨会。\n批判性地分析内容中的偏见。',
      ja: '差別が社会的対立を深める可能性があることを認識してください。\n無意識の偏見を減らす心理学的技法を練習してください。\n包容性ワークショップに参加してください。\nコンテンツ中の偏見を批判的に分析してください。'
    }
  },
  {
    range: [41, 45],
    category: 'somewhat_high',
    title: {
      ko: '다소 높음 (41-45%)',
      en: 'Somewhat High (41-45%)',
      es: 'Algo Alto (41-45%)',
      zh: '稍高 (41-45%)',
      ja: 'やや高い (41-45%)'
    },
    description: {
      ko: '무의식적 편향이 자주 드러나며 대화에서 불편함이 나타납니다.',
      en: 'Unconscious bias appears frequently and discomfort shows in conversations.',
      es: 'El sesgo inconsciente aparece frecuentemente y la incomodidad se muestra en las conversaciones.',
      zh: '无意识偏见经常出现，在对话中表现出不适。',
      ja: '無意識の偏見が頻繁に現れ、会話で不快感が表れます。'
    },
    solutions: {
      ko: '무심코 쓰는 단어와 농담을 점검하세요.\n내 말과 행동이 상대 자존감을 해치지 않는지 질문하세요.\n포용성 교육을 적극 수강하세요.\nSNS·언론에서 새로운 관점을 접하세요.',
      en: 'Check your casual words and jokes.\nQuestion whether your words and actions harm others\' self-esteem.\nActively take inclusivity education.\nEncounter new perspectives through social media and news.',
      es: 'Revisa tus palabras y bromas casuales.\nPregúntate si tus palabras y acciones dañan la autoestima de otros.\nToma activamente educación sobre inclusividad.\nEncuentra nuevas perspectivas a través de las redes sociales y las noticias.',
      zh: '检查您随意使用的词语和笑话。\n质疑您的言行是否伤害他人的自尊。\n积极接受包容性教育。\n通过社交媒体和新闻接触新观点。',
      ja: '何気なく使う言葉やジョークをチェックしてください。\n自分の言動が相手の自尊心を傷つけていないか質問してください。\n包容性教育を積極的に受講してください。\nSNSや報道で新しい観点に触れてください。'
    }
  },
  {
    range: [46, 50],
    category: 'above_moderate',
    title: {
      ko: '중간 이상 (46-50%)',
      en: 'Above Moderate (46-50%)',
      es: 'Por Encima de Moderado (46-50%)',
      zh: '中等以上 (46-50%)',
      ja: '中程度以上 (46-50%)'
    },
    description: {
      ko: '편향성이 절반 이상 드러나며 불편한 시선을 보낼 수 있습니다.',
      en: 'Bias is revealed more than half the time and you may send uncomfortable glances.',
      es: 'El sesgo se revela más de la mitad del tiempo y puedes enviar miradas incómodas.',
      zh: '偏见在一半以上的时间显露，可能会投以不舒服的目光。',
      ja: '偏向性が半分以上現れ、不快な視線を送ることがあります。'
    },
    solutions: {
      ko: '편견이 반복되는 상황을 기록하세요.\n포용적 롤모델을 삼으세요.\n후배·자녀에게 올바른 교육을 하세요.\n자기 성찰 저널을 작성하세요.',
      en: 'Record situations where bias repeats.\nAdopt inclusive role models.\nProvide proper education to juniors and children.\nWrite self-reflection journals.',
      es: 'Registra situaciones donde el sesgo se repite.\nAdopta modelos a seguir inclusivos.\nProporciona educación adecuada a los jóvenes y niños.\nEscribe diarios de autorreflexión.',
      zh: '记录偏见重复出现的情况。\n采用包容性的榜样。\n为后辈和孩子提供正确的教育。\n写自我反思日记。',
      ja: '偏見が繰り返される状況を記録してください。\n包容的なロールモデルを持ってください。\n後輩や子供に正しい教育をしてください。\n自己省察ジャーナルを書いてください。'
    }
  },
  {
    range: [51, 55],
    category: 'moderately_high',
    title: {
      ko: '중간 이상 (51-55%)',
      en: 'Moderately High (51-55%)',
      es: 'Moderadamente Alto (51-55%)',
      zh: '中等偏高 (51-55%)',
      ja: '中程度から高い (51-55%)'
    },
    description: {
      ko: '편견이 절반 이상 드러나며 사회적 갈등을 유발할 수 있습니다.',
      en: 'Bias is revealed more than half the time and may cause social conflicts.',
      es: 'El sesgo se revela más de la mitad del tiempo y puede causar conflictos sociales.',
      zh: '偏见在一半以上的时间显露，可能引发社会冲突。',
      ja: '偏見が半分以上現れ、社会的対立を引き起こす可能性があります。'
    },
    solutions: {
      ko: '전문가 상담을 정기적으로 받으세요.\n차별적 발언이 나올 수 있는 상황을 피하거나 개선하세요.\n봉사활동으로 다양한 집단을 경험하세요.\n멘토와 함께 사고 전환 학습 계획을 세우세요.',
      en: 'Receive professional counseling regularly.\nAvoid or improve situations where discriminatory remarks might occur.\nExperience diverse groups through volunteer activities.\nCreate a mindset transformation learning plan with a mentor.',
      es: 'Recibe asesoramiento profesional regularmente.\nEvita o mejora situaciones donde pueden ocurrir comentarios discriminatorios.\nExperimenta grupos diversos a través de actividades de voluntariado.\nCrea un plan de aprendizaje de transformación mental con un mentor.',
      zh: '定期接受专业咨询。\n避免或改善可能出现歧视性言论的情况。\n通过志愿活动体验不同群体。\n与导师一起制定思维转变学习计划。',
      ja: '専門家のカウンセリングを定期的に受けてください。\n差別的発言が出る可能性のある状況を避けるか改善してください。\nボランティア活動で様々な集団を経験してください。\nメンターと一緒に思考転換学習計画を立ててください。'
    }
  },
  {
    range: [56, 60],
    category: 'considerably_high',
    title: {
      ko: '상당히 높음 (56-60%)',
      en: 'Considerably High (56-60%)',
      es: 'Considerablemente Alto (56-60%)',
      zh: '相当高 (56-60%)',
      ja: 'かなり高い (56-60%)'
    },
    description: {
      ko: '여러 상황에서 편견이 쉽게 드러나며 행동으로 이어질 수 있습니다.',
      en: 'Bias is easily revealed in various situations and may lead to actions.',
      es: 'El sesgo se revela fácilmente en varias situaciones y puede llevar a acciones.',
      zh: '在各种情况下偏见容易显露，可能导致行动。',
      ja: '様々な状況で偏見が容易に現れ、行動につながる可能性があります。'
    },
    solutions: {
      ko: '반편견 워크숍에 정기적으로 참여하세요.\n일상에서 표현을 교정하세요.\n외국인 친구와의 대화를 반복하세요.\n전문가 피드백을 받으세요.',
      en: 'Regularly participate in anti-bias workshops.\nCorrect your expressions in daily life.\nRepeatedly have conversations with foreign friends.\nReceive professional feedback.',
      es: 'Participa regularmente en talleres anti-sesgo.\nCorrige tus expresiones en la vida diaria.\nTen conversaciones repetidas con amigos extranjeros.\nRecibe retroalimentación profesional.',
      zh: '定期参加反偏见研讨会。\n在日常生活中纠正表达。\n重复与外国朋友对话。\n接受专业反馈。',
      ja: '反偏見ワークショップに定期的に参加してください。\n日常で表現を修正してください。\n外国人の友人との対話を繰り返してください。\n専門家からフィードバックを受けてください。'
    }
  },
  {
    range: [61, 65],
    category: 'high',
    title: {
      ko: '높음 (61-65%)',
      en: 'High (61-65%)',
      es: 'Alto (61-65%)',
      zh: '高 (61-65%)',
      ja: '高い (61-65%)'
    },
    description: {
      ko: '편향성이 뚜렷하며 갈등을 유발할 수 있습니다.',
      en: 'Bias is distinct and may cause conflicts.',
      es: 'El sesgo es distinto y puede causar conflictos.',
      zh: '偏见明显，可能引发冲突。',
      ja: '偏向性が明確で、対立を引き起こす可能性があります。'
    },
    solutions: {
      ko: '불편함을 부정적 행동으로 연결하지 마세요.\n정기적 교육과 상담에 참여하세요.\n공공장소 태도를 관찰하고 피드백을 받으세요.\n언행을 기록·분석하여 교정하세요.',
      en: 'Don\'t connect discomfort to negative actions.\nParticipate in regular education and counseling.\nObserve your public behavior and receive feedback.\nRecord and analyze your words and actions for correction.',
      es: 'No conectes la incomodidad con acciones negativas.\nParticipa en educación y asesoramiento regulares.\nObserva tu comportamiento público y recibe retroalimentación.\nRegistra y analiza tus palabras y acciones para corregir.',
      zh: '不要将不适感与负面行为联系起来。\n参加定期教育和咨询。\n观察您的公共行为并接受反馈。\n记录和分析您的言行以进行纠正。',
      ja: '不快感を否定的行動につなげないでください。\n定期的教育とカウンセリングに参加してください。\n公共の場での態度を観察しフィードバックを受けてください。\n言動を記録・分析して修正してください。'
    }
  },
  {
    range: [66, 70],
    category: 'quite_high',
    title: {
      ko: '꽤 높음 (66-70%)',
      en: 'Quite High (66-70%)',
      es: 'Bastante Alto (66-70%)',
      zh: '相当高 (66-70%)',
      ja: 'かなり高い (66-70%)'
    },
    description: {
      ko: '다양성을 수용하기 어렵다고 느끼며 차별적으로 비칠 수 있습니다.',
      en: 'You find it difficult to accept diversity and may appear discriminatory.',
      es: 'Encuentras difícil aceptar la diversidad y puedes parecer discriminatorio.',
      zh: '您发现难以接受多样性，可能显得有歧视性。',
      ja: '多様性を受け入れることが困難で、差別的に見える可能性があります。'
    },
    solutions: {
      ko: '문화 존중 영화·책을 접하세요.\n피해자 경험담을 경청하세요.\n고정관념 깨는 토론에 참여하세요.\n피드백 멘토를 찾으세요.',
      en: 'Watch movies and read books about cultural respect.\nListen to victim experiences.\nParticipate in discussions that break stereotypes.\nFind feedback mentors.',
      es: 'Ve películas y lee libros sobre respeto cultural.\nEscucha experiencias de víctimas.\nParticipa en discusiones que rompan estereotipos.\nBusca mentores de retroalimentación.',
      zh: '观看文化尊重的电影和书籍。\n倾听受害者经历。\n参与打破刻板印象的讨论。\n寻找反馈导师。',
      ja: '文化尊重の映画や本に触れてください。\n被害者の体験談を聞いてください。\n固定観念を打ち破る議論に参加してください。\nフィードバックメンターを見つけてください。'
    }
  },
  {
    range: [71, 75],
    category: 'very_high',
    title: {
      ko: '매우 높음 (71-75%)',
      en: 'Very High (71-75%)',
      es: 'Muy Alto (71-75%)',
      zh: '很高 (71-75%)',
      ja: '非常に高い (71-75%)'
    },
    description: {
      ko: '편견이 강하게 드러나며 차별로 이어질 가능성이 큽니다.',
      en: 'Bias is strongly evident and likely to lead to discrimination.',
      es: 'El sesgo es fuertemente evidente y es probable que lleve a la discriminación.',
      zh: '偏见强烈明显，很可能导致歧视。',
      ja: '偏見が強く現れ、差別につながる可能性が高いです。'
    },
    solutions: {
      ko: '전문 상담과 교육에 반드시 참여하세요.\n역할 바꾸기 체험을 해보세요.\n피드백을 받아들이고 수정하세요.\n가까운 이에게 정기적 피드백을 구하세요.',
      en: 'Must participate in professional counseling and education.\nTry role-reversal experiences.\nAccept feedback and make corrections.\nSeek regular feedback from close ones.',
      es: 'Debe participar en asesoramiento y educación profesional.\nPrueba experiencias de intercambio de roles.\nAcepta retroalimentación y haz correcciones.\nBusca retroalimentación regular de personas cercanas.',
      zh: '必须参与专业咨询和教育。\n尝试角色互换体验。\n接受反馈并进行修正。\n向身边的人寻求定期反馈。',
      ja: '専門的なカウンセリングと教育に必ず参加してください。\n役割交換体験をしてみてください。\nフィードバックを受け入れて修正してください。\n身近な人に定期的フィードバックを求めてください。'
    }
  },
  {
    range: [76, 80],
    category: 'serious',
    title: {
      ko: '심각한 수준 (76-80%)',
      en: 'Serious Level (76-80%)',
      es: 'Nivel Serio (76-80%)',
      zh: '严重程度 (76-80%)',
      ja: '深刻なレベル (76-80%)'
    },
    description: {
      ko: '편향성이 심각하여 사회적 갈등이 빈번할 수 있습니다.',
      en: 'Bias is serious and social conflicts may be frequent.',
      es: 'El sesgo es serio y los conflictos sociales pueden ser frecuentes.',
      zh: '偏见严重，社会冲突可能频繁发生。',
      ja: '偏向性が深刻で、社会的対立が頻繁に起こる可能性があります。'
    },
    solutions: {
      ko: '장기 상담 프로그램이 필요합니다.\n편견 상황을 일지로 기록하세요.\n다양성을 경험하는 봉사 활동을 하세요.\n언행이 주는 상처를 성찰하세요.',
      en: 'Long-term counseling programs are needed.\nKeep a diary of biased situations.\nVolunteer in activities that experience diversity.\nReflect on the harm your words and actions cause.',
      es: 'Se necesitan programas de asesoramiento a largo plazo.\nMantén un diario de situaciones sesgadas.\nVoluntariza en actividades que experimenten diversidad.\nReflexiona sobre el daño que causan tus palabras y acciones.',
      zh: '需要长期咨询项目。\n记录偏见情况的日记。\n参与体验多样性的志愿活动。\n反思您的言行所造成的伤害。',
      ja: '長期的カウンセリングプログラムが必要です。\n偏見状況を日記に記録してください。\n多様性を体験するボランティア活動をしてください。\n言動が与える傷を省察してください。'
    }
  },
  {
    range: [81, 85],
    category: 'very_serious',
    title: {
      ko: '매우 심각 (81-85%)',
      en: 'Very Serious (81-85%)',
      es: 'Muy Serio (81-85%)',
      zh: '非常严重 (81-85%)',
      ja: '非常に深刻 (81-85%)'
    },
    description: {
      ko: '대부분 상황에서 편향적 반응이 나타납니다.',
      en: 'Biased reactions appear in most situations.',
      es: 'Las reacciones sesgadas aparecen en la mayoría de las situaciones.',
      zh: '在大多数情况下都出现偏见反应。',
      ja: 'ほとんどの状況で偏向的反応が現れます。'
    },
    solutions: {
      ko: '전문가의 지속 개입이 필요합니다.\n다문화 교류 프로그램에 참여하세요.\n차별 발언 후 반드시 교정 피드백을 받으세요.\n가치관 재정립 학습을 하세요.',
      en: 'Continuous professional intervention is needed.\nParticipate in multicultural exchange programs.\nAlways receive corrective feedback after discriminatory remarks.\nLearn to reestablish your values.',
      es: 'Se necesita intervención profesional continua.\nParticipa en programas de intercambio multicultural.\nSiempre recibe retroalimentación correctiva después de comentarios discriminatorios.\nAprende a reestablecer tus valores.',
      zh: '需要专业人士的持续干预。\n参与多文化交流项目。\n在歧视性言论后总是接受纠正性反馈。\n学习重新确立您的价值观。',
      ja: '専門家の継続的介入が必要です。\n多文化交流プログラムに参加してください。\n差別発言後は必ず修正フィードバックを受けてください。\n価値観再構築学習をしてください。'
    }
  },
  {
    range: [86, 90],
    category: 'extremely_serious',
    title: {
      ko: '극도로 심각 (86-90%)',
      en: 'Extremely Serious (86-90%)',
      es: 'Extremadamente Serio (86-90%)',
      zh: '极度严重 (86-90%)',
      ja: '極めて深刻 (86-90%)'
    },
    description: {
      ko: '편향적 사고가 일상 전반에 걸쳐 나타나며 사회적 고립 위험이 큽니다.',
      en: 'Biased thinking appears throughout daily life with high risk of social isolation.',
      es: 'El pensamiento sesgado aparece a lo largo de la vida diaria con alto riesgo de aislamiento social.',
      zh: '偏见思维出现在日常生活中，社会孤立风险很高。',
      ja: '偏向的思考が日常生活全般に現れ、社会的孤立の危険性が高いです。'
    },
    solutions: {
      ko: '사고 전환 교육을 시급히 받으세요.\n강제 환경에서 공감 훈련을 하세요.\n다양성 있는 모임에 참여하세요.\n정기적으로 멘토 피드백을 받으세요.',
      en: 'Urgently receive mindset transformation education.\nUndergo empathy training in controlled environments.\nParticipate in diverse gatherings.\nReceive regular mentor feedback.',
      es: 'Recibe urgentemente educación de transformación mental.\nSométete a entrenamiento de empatía en ambientes controlados.\nParticipa en reuniones diversas.\nRecibe retroalimentación regular de mentores.',
      zh: '紧急接受思维转换教育。\n在受控环境中进行同理心训练。\n参与多样化的聚会。\n定期接受导师反馈。',
      ja: '思考転換教育を緊急に受けてください。\n制御された環境で共感訓練を受けてください。\n多様性のある集まりに参加してください。\n定期的にメンターフィードバックを受けてください。'
    }
  },
  {
    range: [91, 95],
    category: 'dangerous',
    title: {
      ko: '위험 수준 (91-95%)',
      en: 'Dangerous Level (91-95%)',
      es: 'Nivel Peligroso (91-95%)',
      zh: '危险水平 (91-95%)',
      ja: '危険レベル (91-95%)'
    },
    description: {
      ko: '심각한 편향으로 차별적 태도가 고착화될 수 있습니다.',
      en: 'Serious bias may entrench discriminatory attitudes.',
      es: 'El sesgo serio puede atrincherear actitudes discriminatorias.',
      zh: '严重偏见可能使歧视态度根深蒂固。',
      ja: '深刻な偏見により差別的態度が固着化する可能性があります。'
    },
    solutions: {
      ko: '심층 교육이 필요합니다.\n타인의 경험을 접하며 시각을 확장하세요.\n다문화 공동체 활동에 참여하세요.\n상담과 피드백을 지속하세요.',
      en: 'In-depth education is needed.\nExpand your perspective through others\' experiences.\nParticipate in multicultural community activities.\nContinue counseling and feedback.',
      es: 'Se necesita educación en profundidad.\nAmplia tu perspectiva a través de experiencias de otros.\nParticipa en actividades comunitarias multiculturales.\nContinúa el asesoramiento y la retroalimentación.',
      zh: '需要深入教育。\n通过他人的经历扩展您的视野。\n参与多文化社区活动。\n继续咨询和反馈。',
      ja: '深層教育が必要です。\n他人の経験に触れて視野を拡張してください。\n多文化コミュニティ活動に参加してください。\nカウンセリングとフィードバックを継続してください。'
    }
  },
  {
    range: [96, 100],
    category: 'extreme',
    title: {
      ko: '극한 수준 (96-100%)',
      en: 'Extreme Level (96-100%)',
      es: 'Nivel Extremo (96-100%)',
      zh: '极限水平 (96-100%)',
      ja: '極限レベル (96-100%)'
    },
    description: {
      ko: '편견이 극도로 고착화되어 사회적·법적 문제로 이어질 수 있습니다.',
      en: 'Bias is extremely entrenched and may lead to social and legal problems.',
      es: 'El sesgo está extremadamente arraigado y puede llevar a problemas sociales y legales.',
      zh: '偏见极度根深蒂固，可能导致社会和法律问题。',
      ja: '偏見が極度に固着化し、社会的・法的問題につながる可能性があります。'
    },
    solutions: {
      ko: '전문 상담과 장기 치료가 필요합니다.\n법적·사회적 강제 개입이 필요할 수 있습니다.\n관계 회복을 위한 적극적 실천이 요구됩니다.\n즉각적 개선이 없으면 고립이 심화됩니다.',
      en: 'Professional counseling and long-term treatment are needed.\nLegal and social compulsory intervention may be necessary.\nActive practices for relationship recovery are required.\nWithout immediate improvement, isolation will deepen.',
      es: 'Se necesita asesoramiento profesional y tratamiento a largo plazo.\nPuede ser necesaria la intervención obligatoria legal y social.\nSe requieren prácticas activas para la recuperación de relaciones.\nSin mejora inmediata, el aislamiento se profundizará.',
      zh: '需要专业咨询和长期治疗。\n可能需要法律和社会强制干预。\n需要积极实践恢复关系。\n如果没有立即改善，孤立将加深。',
      ja: '専門的カウンセリングと長期治療が必要です。\n法的・社会的強制介入が必要な場合があります。\n関係回復のための積極的実践が求められます。\n即座の改善がなければ孤立が深刻化します。'
    }
  }
];

// 세분화된 카테고리를 5개의 주요 카테고리로 매핑하는 함수
export function mapToMainCategory(granularCategory: string): MainCategory {
  if ([ 'extremely_low', 'very_low'].includes(granularCategory)) return 'very_low';
  if (['low', 'somewhat_low', 'below_average'].includes(granularCategory)) return 'low';
  if (['average', 'above_average', 'moderate'].includes(granularCategory)) return 'moderate';
  if (['somewhat_high', 'moderately_high', 'considerably_high', 'high', 'quite_high'].includes(granularCategory)) return 'high';
  if (['serious', 'very_serious', 'extremely_serious', 'dangerous', 'extreme'].includes(granularCategory)) return 'very_high';
  return 'moderate'; // Fallback
}

export function getBiasCategory(percentage: number): BiasCategory {
  // Find the appropriate category based on percentage
  const category = biasSolutions.find(solution => {
    const [min, max] = solution.range;
    return percentage >= min && percentage <= max;
  });
  
  // Return the found category or the first one as fallback
  return category || biasSolutions[0];
}