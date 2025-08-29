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
    // 네비게이션
    nav: {
      title: '나의 인종차별적 성향 테스트',
      subtitle: '무의식적 편견을 발견하고 개선해보세요'
    },
    
    // 시작 화면
    welcome: {
      title: '나의 인종차별적 성향 테스트',
      subtitle: '당신의 숨겨진 편견을 발견하고 더 포용적인 사고를 기르세요',
      description: '이 테스트는 일상에서 무의식적으로 가질 수 있는 편견을 측정합니다. 솔직하게 답변해 주시면 개인맞춤 개선 방안을 제공합니다.',
      startButton: '테스트 시작',
      nameInput: '이름을 입력해주세요',
      namePlaceholder: '예: 홍길동'
    },
    
    // 테스트 진행
    test: {
      progress: '진행률',
      question: '질문',
      of: '/',
      next: '다음',
      previous: '이전',
      submit: '제출',
      skip: '건너뛰기'
    },
    
    // 결과 화면
    result: {
      title: '테스트 결과',
      yourScore: '편견 지수',
      yourScoreWithName: '{name}님의 편견 지수',
      analysis: '분석 결과',
      solutions: '맞춤 솔루션',
      shareButton: '결과 공유하기',
      downloadButton: '결과 다운로드',
      retakeTest: '다시 테스트하기',
      // 결과 상세 텍스트
      biasRange: '편향성 범위',
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
    
    // 공유 기능
    share: {
      title: '결과 공유',
      copyLink: '링크 복사',
      downloadImage: '이미지 다운로드',
      socialShare: 'SNS 공유'
    },
    
    // 에러 메시지
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
      description: 'This test measures unconscious biases you may have in daily life. Answer honestly and we\'ll provide personalized improvement recommendations.',
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
      // 결과 상세 텍스트
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
      description: 'Este test mide los sesgos inconscientes que puedes tener en la vida diaria. Responde honestamente y te proporcionaremos recomendaciones de mejora personalizadas.',
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
      // 결과 상세 텍스트
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
      description: '此测试测量您在日常生活中可能存在的无意识偏见。请诚实回答，我们将提供个性化的改进建议。',
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
      // 결과 상세 텍스트
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
      description: 'このテストは日常生活で無意識に持つ可能性のあるバイアスを測定します。正直に答えていただければ、個人に合った改善案を提供します。',
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
      // 결과 상세 텍스트
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