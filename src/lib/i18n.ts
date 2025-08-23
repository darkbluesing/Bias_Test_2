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
      yourScore: '무의식적 편견 지수',
      analysis: '분석 결과',
      solutions: '맞춤 솔루션',
      shareButton: '결과 공유하기',
      downloadButton: '결과 다운로드',
      retakeButton: '다시 테스트하기'
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
      title: 'My Racial Bias Test',
      subtitle: 'Discover and improve unconscious biases'
    },
    
    welcome: {
      title: 'My Racial Bias Test',
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
      yourScore: 'Unconscious Bias Index',
      analysis: 'Analysis',
      solutions: 'Personalized Solutions',
      shareButton: 'Share Results',
      downloadButton: 'Download Results',
      retakeButton: 'Retake Test'
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
      title: 'Test de Sesgo',
      subtitle: 'Descubre y mejora los sesgos inconscientes'
    },
    
    welcome: {
      title: 'Test de Sesgo Inconsciente',
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
      analysis: 'Análisis',
      solutions: 'Soluciones Personalizadas',
      shareButton: 'Compartir Resultados',
      downloadButton: 'Descargar Resultados',
      retakeButton: 'Repetir Test'
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
      title: '偏见测试',
      subtitle: '发现并改善无意识偏见'
    },
    
    welcome: {
      title: '无意识偏见测试',
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
      analysis: '分析结果',
      solutions: '个性化解决方案',
      shareButton: '分享结果',
      downloadButton: '下载结果',
      retakeButton: '重新测试'
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
      title: 'バイアステスト',
      subtitle: '無意識のバイアスを発見し改善しましょう'
    },
    
    welcome: {
      title: '無意識のバイアステスト',
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
      analysis: '分析結果',
      solutions: 'パーソナライズドソリューション',
      shareButton: '結果をシェア',
      downloadButton: '結果をダウンロード',
      retakeButton: 'テストを再受験'
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