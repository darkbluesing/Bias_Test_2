import { SupportedLanguage } from '@/types';

export const languages = {
  ko: '한국어',
  en: 'English',
  es: 'Español',
  zh: '中文',
  ja: '日本語'
} as const;

export const translations = {
  ko: {
    nav: {
      title: '나의 인종차별적 편견 테스트',
      subtitle: '무의식적 편견을 발견하고 개선해보세요'
    },
    welcome: {
      title: '나의 인종차별적 편견 테스트',
      subtitle: '인간에 대한 당신의 숨겨진 편견을 발견하고 더 포용적인 사고를 기르세요',
      description: [
        '이 테스트는 당신의 인종에대한 차별적인 편견을 탐색하고, 다양성에 대한 인식을 높이며, 자기 성장을 위한 실질적인 솔루션을 얻을 수 있도록 돕는 교육적 도구입니다.',
        '이 테스트는 심리적 진단이 아니며, 오락 및 교육적 목적으로 제공됩니다. 결과는 당신의 인격을 판단하는 것이 아니며, 자기 성찰과 성장을 위한 도구로 활용되기를 바랍니다.'
      ],
      description_points: [
        '이 테스트는 어떤 개인도 \'인종차별주의자\'로 낙인찍지 않습니다',
        '결과는 심리적 진단이 아닌 성찰의 기회로 제공됩니다',
        '모든 답변은 익명으로 처리되며 개인 정보는 수집하지 않습니다',
        '결과는 브라우저를 닫으면 자동으로 삭제됩니다'
      ],
      startButton: '테스트 시작',
      nameInput: '이름을 입력해주세요',
      namePlaceholder: '예: 홍길동'
    },
    test: {
      progress: '진행률',
      question: '질문',
      of: '/',
      next: '다음',
      previous: '이전',
      submit: '제출',
      skip: '건너뛰기'
    },
    result: {
      title: '테스트 결과',
      yourScore: '편견 지수',
      yourScoreWithName: '{name}님의 차별적 편견 지수',
      analysis: '분석 결과',
      solutions: '맞춤 솔루션',
      shareButton: '결과 공유하기',
      downloadButton: '결과 다운로드',
      retakeTest: '다시 테스트하기',
      biasRange: '편견적 범위',
      veryLow: '매우 낮음',
      low: '낮음',
      moderate: '보통',
      high: '높음',
      veryHigh: '매우 높음',
      biasLabel: '편향성',
      objectivityLabel: '객관성',
      analysisText: '심각한 편향성이 감지되었습니다. 즉시 전문적인 도움과 체계적인 개선이 필요합니다.',
      solutionItems: [
        '즉시 전문적인 다양성 및 포용성 교육을 받으세요',
        '심층적인 편견 극복 프로그램에 참여하세요',
        '자신의 편견이 사회에 미치는 부정적 영향을 인지하게 검토하세요',
        '다문화 환경에서 자원봉사 활동을 시작하세요',
        '편견에 대한 책임감을 가지고 적극적으로 변화하려 노력하세요',
        '정기적인 전문 상담을 받으세요',
        '포용적인 가치를 실천하는 롤모델을 찾아 배우세요',
        '일상에서 편견적 행동을 자각하고 즉시 수정하세요'
      ]
    },
    share: {
      title: '결과 공유',
      copyLink: '링크 복사',
      downloadImage: '이미지 다운로드',
      socialShare: 'SNS 공유'
    },
    error: {
      nameRequired: '이름을 입력해주세요.',
      answerRequired: '답변을 선택해주세요.',
      testIncomplete: '모든 질문에 답변해주세요.',
      networkError: '네트워크 오류가 발생했습니다.'
    }
  },
  
  en: {
    nav: {
      title: 'My Unconscious Bias Test',
      subtitle: 'Discover and improve unconscious biases'
    },
    welcome: {
      title: 'My Unconscious Bias Test',
      subtitle: 'Discover your hidden biases and develop more inclusive thinking',
      description: [
        'This test is an educational tool to help you explore your discriminatory biases about race, raise your awareness of diversity, and get practical solutions for self-growth.',
        'This test is not a psychological diagnosis and is provided for entertainment and educational purposes. The results are not a judgment of your character and are intended to be a tool for self-reflection and growth.'
      ],
      description_points: [
        'This test does not label any individual as a \'racist\'',
        'The results are provided as an opportunity for reflection, not a psychological diagnosis',
        'All answers are treated anonymously and no personal information is collected',
        'The results are automatically deleted when you close your browser'
      ],
      startButton: 'Start Test',
      nameInput: 'Please enter your name',
      namePlaceholder: 'e.g., John Smith'
    },
    test: {
      progress: 'Progress',
      question: 'Question',
      of: 'of',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      skip: 'Skip'
    },
    result: {
      title: 'Test Results',
      yourScore: 'Bias Index',
      yourScoreWithName: '{name}\'s Bias Index',
      analysis: 'Analysis',
      solutions: 'Personalized Solutions',
      shareButton: 'Share Results',
      downloadButton: 'Download Results',
      retakeTest: 'Retake Test',
      biasRange: 'Bias Range',
      veryLow: 'Very Low',
      low: 'Low',
      moderate: 'Moderate',
      high: 'High',
      veryHigh: 'Very High',
      biasLabel: 'Bias',
      objectivityLabel: 'Objectivity',
      analysisText: 'Serious bias has been detected. Immediate professional help and systematic improvement are needed.',
      solutionItems: [
        'Immediately receive professional diversity and inclusion training',
        'Participate in in-depth bias reduction programs',
        'Review and recognize the negative impact of your biases on society',
        'Start volunteering in multicultural environments',
        'Take responsibility for biases and actively work to change',
        'Receive regular professional counseling',
        'Find and learn from role models who practice inclusive values',
        'Recognize biased behaviors in daily life and correct them immediately'
      ]
    },
    share: {
      title: 'Share Results',
      copyLink: 'Copy Link',
      downloadImage: 'Download Image',
      socialShare: 'Share on Social Media'
    },
    error: {
      nameRequired: 'Please enter your name.',
      answerRequired: 'Please select an answer.',
      testIncomplete: 'Please answer all questions.',
      networkError: 'A network error occurred.'
    }
  },
  
  es: {
    nav: {
      title: 'Mi Test de Sesgo Inconsciente',
      subtitle: 'Descubre y mejora los sesgos inconscientes'
    },
    welcome: {
      title: 'Mi Test de Sesgo Inconsciente',
      subtitle: 'Descubre tus sesgos ocultos y desarrolla un pensamiento más inclusivo',
      description: [
        'Esta prueba es una herramienta educativa para ayudarte a explorar tus sesgos discriminatorios sobre la raza, aumentar tu conciencia sobre la diversidad y obtener soluciones prácticas para el autodesarrollo.',
        'Esta prueba no es un diagnóstico psicológico y se proporciona con fines de entretenimiento y educativos. Los resultados no son un juicio de tu carácter y pretenden ser una herramienta para la autorreflexión y el crecimiento.'
      ],
      description_points: [
        'Esta prueba no etiqueta a ningún individuo como \'racista\'',
        'Los resultados se proporcionan como una oportunidad para la reflexión, no como un diagnóstico psicológico',
        'Todas las respuestas se tratan de forma anónima y no se recopila información personal',
        'Los resultados se eliminan automáticamente al cerrar el navegador'
      ],
      startButton: 'Iniciar Test',
      nameInput: 'Por favor ingresa tu nombre',
      namePlaceholder: 'ej: Juan Pérez'
    },
    test: {
      progress: 'Progreso',
      question: 'Pregunta',
      of: 'de',
      next: 'Siguiente',
      previous: 'Anterior',
      submit: 'Enviar',
      skip: 'Saltar'
    },
    result: {
      title: 'Resultados del Test',
      yourScore: 'Tu Índice de Sesgo',
      yourScoreWithName: 'Índice de Sesgo de {name}',
      analysis: 'Análisis',
      solutions: 'Soluciones Personalizadas',
      shareButton: 'Compartir Resultados',
      downloadButton: 'Descargar Resultados',
      retakeTest: 'Repetir Test',
      biasRange: 'Rango de Sesgo',
      veryLow: 'Muy Bajo',
      low: 'Bajo',
      moderate: 'Moderado',
      high: 'Alto',
      veryHigh: 'Muy Alto',
      biasLabel: 'Sesgo',
      objectivityLabel: 'Objetividad',
      analysisText: 'Se ha detectado un sesgo grave. Se necesita ayuda profesional inmediata y mejora sistemática.',
      solutionItems: [
        'Recibe inmediatamente entrenamiento profesional en diversidad e inclusión',
        'Participa en programas profundos de reducción de sesgos',
        'Revisa y reconoce el impacto negativo de tus sesgos en la sociedad',
        'Comienza a hacer voluntariado en ambientes multiculturales',
        'Toma responsabilidad por los sesgos y trabaja activamente para cambiar',
        'Recibe asesoramiento profesional regular',
        'Encuentra y aprende de modelos a seguir que practiquen valores inclusivos',
        'Reconoce comportamientos sesgados en la vida diaria y corrígelos inmediatamente'
      ]
    },
    share: {
      title: 'Compartir Resultados',
      copyLink: 'Copiar Enlace',
      downloadImage: 'Descargar Imagen',
      socialShare: 'Compartir en Redes Sociales'
    },
    error: {
      nameRequired: 'Por favor ingresa tu nombre.',
      answerRequired: 'Por favor selecciona una respuesta.',
      testIncomplete: 'Por favor responde todas las preguntas.',
      networkError: 'Ocurrió un error de red.'
    }
  },
  
  zh: {
    nav: {
      title: '我的无意识偏见测试',
      subtitle: '发现并改善无意识偏见'
    },
    welcome: {
      title: '我的无意识偏见测试',
      subtitle: '发现你隐藏的偏见，培养更包容的思维',
      description: [
        '此测试是一种教育工具，可帮助您探索有关种族的歧视性偏见，提高您对多样性的认识，并获得自我成长的实用解决方案。',
        '此测试不是心理诊断，仅供娱乐和教育目的。结果不是对您性格的判断，旨在作为自我反思和成长的工具。'
      ],
      description_points: [
        '此测试不会将任何个人标记为“种族主义者”',
        '结果是作为反思的机会提供的，而不是心理诊断',
        '所有答案均被匿名处理，不收集任何个人信息',
        '关闭浏览器后，结果将自动删除'
      ],
      startButton: '开始测试',
      nameInput: '请输入您的姓名',
      namePlaceholder: '例如：张三'
    },
    test: {
      progress: '进度',
      question: '问题',
      of: '/',
      next: '下一个',
      previous: '上一个',
      submit: '提交',
      skip: '跳过'
    },
    result: {
      title: '测试结果',
      yourScore: '您的偏见指数',
      yourScoreWithName: '{name}的偏见指数',
      analysis: '分析结果',
      solutions: '个性化解决方案',
      shareButton: '分享结果',
      downloadButton: '下载结果',
      retakeTest: '重新测试',
      biasRange: '偏见范围',
      veryLow: '非常低',
      low: '低',
      moderate: '中等',
      high: '高',
      veryHigh: '非常高',
      biasLabel: '偏见',
      objectivityLabel: '客观性',
      analysisText: '检测到严重偏见。需要立即专业帮助和系统改进。',
      solutionItems: [
        '立即接受专业的多样性和包容性培训',
        '参与深度偏见减少计划',
        '审查并认识到您的偏见对社会的负面影响',
        '开始在多元文化环境中志愿服务',
        '对偏见承担责任并积极努力改变',
        '接受定期专业咨询',
        '寻找并学习实践包容价值观的榜样',
        '识别日常生活中的偏见行为并立即纠正'
      ]
    },
    share: {
      title: '分享结果',
      copyLink: '复制链接',
      downloadImage: '下载图片',
      socialShare: '分享到社交媒体'
    },
    error: {
      nameRequired: '请输入您的姓名。',
      answerRequired: '请选择一个答案。',
      testIncomplete: '请回答所有问题。',
      networkError: '发生网络错误。'
    }
  },
  
  ja: {
    nav: {
      title: '私の無意識バイアステスト',
      subtitle: '無意識のバイアスを発見し改善しましょう'
    },
    welcome: {
      title: '私の無意識バイアステスト',
      subtitle: '隠れたバイアスを発見し、より包括的な思考を育てましょう',
      description: [
        'このテストは、人種に関するあなたの差別的なバイアスを探求し、多様性への意識を高め、自己成長のための実践的な解決策を得るのに役立つ教育ツールです。',
        'このテストは心理的な診断ではなく、娯楽および教育目的で提供されています。結果はあなたの性格を判断するものではなく、自己反省と成長のためのツールとして活用されることを願っています。'
      ],
      description_points: [
        'このテストは個人を「人種差別主義者」と決めつけるものではありません',
        '結果は心理的な診断ではなく、内省の機会として提供されます',
        'すべての回答は匿名で処理され、個人情報は収集されません',
        'ブラウザを閉じると結果は自動的に削除されます'
      ],
      startButton: 'テスト開始',
      nameInput: 'お名前を入力してください',
      namePlaceholder: '例：田中太郎'
    },
    test: {
      progress: '進捗',
      question: '質問',
      of: '/',
      next: '次へ',
      previous: '前へ',
      submit: '送信',
      skip: 'スキップ'
    },
    result: {
      title: 'テスト結果',
      yourScore: 'あなたのバイアス指数',
      yourScoreWithName: '{name}さんのバイアス指数',
      analysis: '分析結果',
      solutions: '個人別解決策',
      shareButton: '結果をシェア',
      downloadButton: '結果をダウンロード',
      retakeTest: 'テストを再受験',
      biasRange: 'バイアス範囲',
      veryLow: '非常に低い',
      low: '低い',
      moderate: '普通',
      high: '高い',
      veryHigh: '非常に高い',
      biasLabel: 'バイアス',
      objectivityLabel: '客観性',
      analysisText: '深刻なバイアスが検出されました。即座に専門的な助けと体系的な改善が必要です。',
      solutionItems: [
        '即座に専門的な多様性と包括性の教育を受けてください',
        '深層的なバイアス克服プログラムに参加してください',
        '自分のバイアスが社会に与える負の影響を認識し検討してください',
        '多文化環境でボランティア活動を始めてください',
        'バイアスに対する責任感を持ち、積極的に変化しようと努力してください',
        '定期的な専門カウンセリングを受けてください',
        '包括的な価値を実践するロールモデルを見つけて学んでください',
        '日常でバイアス的行動を自覚し、即座に修正してください'
      ]
    },
    share: {
      title: '結果をシェア',
      copyLink: 'リンクをコピー',
      downloadImage: '画像をダウンロード',
      socialShare: 'SNSでシェア'
    },
    error: {
      nameRequired: 'お名前を入力してください。',
      answerRequired: '答えを選択してください。',
      testIncomplete: 'すべての質問に答えてください。',
      networkError: 'ネットワークエラーが発生しました。'
    }
  }
} as const;

export function getTranslation(language: SupportedLanguage) {
  return translations[language] || translations.ko;
}

// 브라우저 기반 언어 감지 (클라이언트 사이드)
export function detectLanguageFromBrowser(): SupportedLanguage {
  try {
    // 브라우저의 언어 설정을 확인
    const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
    if (Object.keys(languages).includes(browserLang)) {
      return browserLang;
    }
    
    // 한국어 관련 설정 확인
    if (navigator.language.includes('ko') || navigator.language.includes('KR')) {
      return 'ko';
    }
    
    // 중국어 관련 설정 확인
    if (navigator.language.includes('zh') || navigator.language.includes('CN')) {
      return 'zh';
    }
    
    // 일본어 관련 설정 확인  
    if (navigator.language.includes('ja') || navigator.language.includes('JP')) {
      return 'ja';
    }
    
    // 스페인어 관련 설정 확인
    if (navigator.language.includes('es') || navigator.language.includes('ES')) {
      return 'es';
    }
    
  } catch (error) {
    console.error('Language detection failed:', error);
  }
  
  return 'en'; // 기본값
}