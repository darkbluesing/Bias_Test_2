import { LocalizedText } from '@/types';

export interface BiasCategory {
  range: [number, number]; // percentage range
  category: 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';
  title: LocalizedText;
  description: LocalizedText;
  solutions: LocalizedText;
}

export const biasSolutions: BiasCategory[] = [
  {
    range: [0, 20],
    category: 'very_low',
    title: {
      ko: '매우 낮은 편향성 (0-20%)',
      en: 'Very Low Bias (0-20%)',
      es: 'Sesgo Muy Bajo (0-20%)',
      zh: '偏见程度很低 (0-20%)',
      ja: '非常に低いバイアス (0-20%)'
    },
    description: {
      ko: '축하합니다! 당신은 매우 개방적이고 포용적인 사고를 가지고 있습니다.',
      en: 'Congratulations! You have a very open and inclusive mindset.',
      es: '¡Felicitaciones! Tienes una mentalidad muy abierta e inclusiva.',
      zh: '恭喜您！您拥有非常开放和包容的思维。',
      ja: 'おめでとうございます！あなたは非常にオープンで包括的な考え方を持っています。'
    },
    solutions: {
      ko: `• 현재의 포용적인 태도를 유지하세요
• 다른 사람들이 편견을 극복할 수 있도록 도움을 주세요  
• 다양성과 포용성 증진 활동에 참여해보세요
• 계속해서 다양한 문화와 배경을 가진 사람들과 교류하세요
• 당신의 긍정적인 영향력을 주변에 퍼뜨려주세요`,
      en: `• Maintain your current inclusive attitude
• Help others overcome their biases
• Participate in diversity and inclusion activities
• Continue interacting with people from diverse cultures and backgrounds
• Spread your positive influence to those around you`,
      es: `• Mantén tu actitud inclusiva actual
• Ayuda a otros a superar sus prejuicios
• Participa en actividades de diversidad e inclusión
• Continúa interactuando con personas de diversas culturas y orígenes
• Difunde tu influencia positiva a quienes te rodean`,
      zh: `• 保持您目前的包容态度
• 帮助他人克服偏见
• 参与多元化和包容性活动
• 继续与来自不同文化和背景的人交流
• 将您的积极影响传播给周围的人`,
      ja: `• 現在の包括的な態度を維持してください
• 他の人が偏見を克服できるよう手助けしてください
• 多様性と包括性の活動に参加してみてください
• 様々な文化や背景を持つ人々との交流を続けてください
• あなたのポジティブな影響を周りに広めてください`
    }
  },
  {
    range: [21, 40],
    category: 'low',
    title: {
      ko: '낮은 편향성 (21-40%)',
      en: 'Low Bias (21-40%)',
      es: 'Sesgo Bajo (21-40%)',
      zh: '偏见程度较低 (21-40%)',
      ja: '低いバイアス (21-40%)'
    },
    description: {
      ko: '좋습니다! 대체로 공정한 시각을 가지고 있으나, 일부 영역에서 개선의 여지가 있습니다.',
      en: 'Good! You generally have a fair perspective, but there is room for improvement in some areas.',
      es: '¡Bien! Generalmente tienes una perspectiva justa, pero hay espacio para mejorar en algunas áreas.',
      zh: '很好！您总体上有公正的观点，但在某些领域还有改进空间。',
      ja: '良いですね！全般的に公正な視点をお持ちですが、いくつかの分野で改善の余地があります。'
    },
    solutions: {
      ko: `• 무의식적 편견을 인식하는 훈련을 받아보세요
• 다양한 관점의 뉴스와 미디어를 접하세요
• 편견에 대한 교육 프로그램에 참여해보세요
• 자신의 반응을 정기적으로 성찰해보세요
• 다양한 배경의 사람들과 더 많은 대화를 나누세요`,
      en: `• Take training to recognize unconscious biases
• Consume news and media from diverse perspectives
• Participate in bias education programs
• Regularly reflect on your own reactions
• Engage in more conversations with people from diverse backgrounds`,
      es: `• Recibe entrenamiento para reconocer sesgos inconscientes
• Consume noticias y medios de perspectivas diversas
• Participa en programas de educación sobre sesgos
• Reflexiona regularmente sobre tus propias reacciones
• Participa en más conversaciones con personas de diversos orígenes`,
      zh: `• 接受识别无意识偏见的培训
• 接触来自不同观点的新闻和媒体
• 参加偏见教育项目
• 定期反思自己的反应
• 与来自不同背景的人进行更多对话`,
      ja: `• 無意識のバイアスを認識する訓練を受けてください
• 多様な視点のニュースやメディアに触れてください
• バイアスに関する教育プログラムに参加してみてください
• 自分の反応を定期的に振り返ってください
• 様々な背景を持つ人々とより多くの対話をしてください`
    }
  },
  {
    range: [41, 60],
    category: 'moderate',
    title: {
      ko: '보통 편향성 (41-60%)',
      en: 'Moderate Bias (41-60%)',
      es: 'Sesgo Moderado (41-60%)',
      zh: '偏见程度中等 (41-60%)',
      ja: '中程度のバイアス (41-60%)'
    },
    description: {
      ko: '일반적인 수준의 편향성을 보입니다. 의식적인 노력을 통해 충분히 개선할 수 있습니다.',
      en: 'You show a typical level of bias. This can be significantly improved through conscious effort.',
      es: 'Muestras un nivel típico de sesgo. Esto puede mejorarse significativamente con esfuerzo consciente.',
      zh: '您显示出典型的偏见水平。通过有意识的努力可以显著改善。',
      ja: '典型的なレベルのバイアスを示しています。意識的な努力により大幅に改善できます。'
    },
    solutions: {
      ko: `• 편견의 근본 원인을 이해하기 위한 학습을 시작하세요
• 다문화 환경에서 더 많은 시간을 보내세요
• 편견 관련 도서나 다큐멘터리를 시청해보세요
• 자신의 편견을 인정하고 개선하려는 의지를 다져보세요
• 전문적인 다양성 교육 프로그램을 찾아보세요
• 다른 문화의 축제나 행사에 참여해보세요`,
      en: `• Start learning to understand the root causes of bias
• Spend more time in multicultural environments
• Read books or watch documentaries about bias
• Acknowledge your biases and strengthen your will to improve
• Look for professional diversity education programs
• Participate in festivals or events from other cultures`,
      es: `• Comienza a aprender para entender las causas raíz del sesgo
• Pasa más tiempo en entornos multiculturales
• Lee libros o mira documentales sobre sesgo
• Reconoce tus sesgos y fortalece tu voluntad de mejorar
• Busca programas profesionales de educación en diversidad
• Participa en festivales o eventos de otras culturas`,
      zh: `• 开始学习了解偏见的根本原因
• 在多元文化环境中花更多时间
• 阅读关于偏见的书籍或观看纪录片
• 承认您的偏见并坚定改善的意志
• 寻找专业的多元化教育项目
• 参加其他文化的节日或活动`,
      ja: `• バイアスの根本原因を理解するための学習を始めてください
• 多文化環境でより多くの時間を過ごしてください
• バイアスに関する書籍やドキュメンタリーを見てください
• 自分のバイアスを認め、改善する意志を固めてください
• 専門的な多様性教育プログラムを探してください
• 他の文化の祭りやイベントに参加してみてください`
    }
  },
  {
    range: [61, 80],
    category: 'high',
    title: {
      ko: '높은 편향성 (61-80%)',
      en: 'High Bias (61-80%)',
      es: 'Sesgo Alto (61-80%)',
      zh: '偏见程度较高 (61-80%)',
      ja: '高いバイアス (61-80%)'
    },
    description: {
      ko: '상당한 편향성이 감지되었습니다. 적극적인 개선 노력이 필요합니다.',
      en: 'Significant bias has been detected. Active improvement efforts are needed.',
      es: 'Se ha detectado un sesgo significativo. Se necesitan esfuerzos de mejora activos.',
      zh: '检测到显著的偏见。需要积极的改善努力。',
      ja: '顕著なバイアスが検出されました。積極的な改善努力が必要です。'
    },
    solutions: {
      ko: `• 전문적인 편견 극복 상담이나 교육을 받으세요
• 자신의 편견이 다른 사람에게 미치는 영향을 깊이 생각해보세요
• 다양한 배경의 사람들과의 직접적인 교류를 늘려보세요
• 편견에 대한 자기성찰을 정기적으로 실시하세요
• 포용적인 커뮤니티나 단체에 가입해보세요
• 편견을 줄이기 위한 구체적인 행동 계획을 세워보세요
• 신뢰할 만한 사람에게 피드백을 요청해보세요`,
      en: `• Seek professional bias reduction counseling or education
• Think deeply about how your bias affects others
• Increase direct interactions with people from diverse backgrounds
• Regularly practice self-reflection on bias
• Join inclusive communities or organizations
• Create a specific action plan to reduce bias
• Ask for feedback from trusted people`,
      es: `• Busca asesoramiento o educación profesional para reducir sesgos
• Piensa profundamente sobre cómo tu sesgo afecta a otros
• Aumenta las interacciones directas con personas de diversos orígenes
• Practica regularmente la autoreflexión sobre sesgo
• Únete a comunidades u organizaciones inclusivas
• Crea un plan de acción específico para reducir el sesgo
• Pide comentarios a personas de confianza`,
      zh: `• 寻求专业的偏见减少咨询或教育
• 深入思考您的偏见如何影响他人
• 增加与来自不同背景的人的直接交流
• 定期进行关于偏见的自我反思
• 加入包容性社区或组织
• 制定减少偏见的具体行动计划
• 向值得信赖的人寻求反馈`,
      ja: `• 専門的なバイアス軽減カウンセリングや教育を受けてください
• あなたのバイアスが他人に与える影響を深く考えてください
• 様々な背景を持つ人々との直接的な交流を増やしてください
• バイアスについて定期的に自己反省を行ってください
• 包括的なコミュニティや団体に参加してみてください
• バイアスを減らすための具体的な行動計画を立ててください
• 信頼できる人にフィードバックを求めてください`
    }
  },
  {
    range: [81, 100],
    category: 'very_high',
    title: {
      ko: '매우 높은 편향성 (81-100%)',
      en: 'Very High Bias (81-100%)',
      es: 'Sesgo Muy Alto (81-100%)',
      zh: '偏见程度很高 (81-100%)',
      ja: '非常に高いバイアス (81-100%)'
    },
    description: {
      ko: '심각한 편향성이 감지되었습니다. 즉시 전문적인 도움과 체계적인 개선이 필요합니다.',
      en: 'Serious bias has been detected. Immediate professional help and systematic improvement is needed.',
      es: 'Se ha detectado un sesgo serio. Se necesita ayuda profesional inmediata y mejora sistemática.',
      zh: '检测到严重的偏见。需要立即的专业帮助和系统性改善。',
      ja: '深刻なバイアスが検出されました。即座に専門的な助けと体系的な改善が必要です。'
    },
    solutions: {
      ko: `• 즉시 전문적인 다양성 및 포용성 교육을 받으세요
• 심층적인 편견 극복 프로그램에 참여하세요
• 자신의 편견이 사회에 미치는 부정적 영향을 진지하게 검토하세요
• 다문화 환경에서 자원봉사 활동을 시작하세요
• 편견에 대한 책임감을 가지고 적극적으로 변화하려 노력하세요
• 정기적인 전문 상담을 받으세요
• 포용적인 가치를 실천하는 롤모델을 찾아 배우세요
• 일상에서 편견적 행동을 자각하고 즉시 수정하세요`,
      en: `• Immediately seek professional diversity and inclusion education
• Participate in in-depth bias reduction programs
• Seriously examine the negative impact of your bias on society
• Start volunteer work in multicultural environments
• Take responsibility for your bias and actively work to change
• Receive regular professional counseling
• Find and learn from role models who practice inclusive values
• Be aware of biased behaviors in daily life and correct them immediately`,
      es: `• Busca inmediatamente educación profesional en diversidad e inclusión
• Participa en programas profundos de reducción de sesgos
• Examina seriamente el impacto negativo de tu sesgo en la sociedad
• Comienza trabajo voluntario en entornos multiculturales
• Toma responsabilidad por tu sesgo y trabaja activamente para cambiar
• Recibe asesoramiento profesional regular
• Encuentra y aprende de modelos a seguir que practican valores inclusivos
• Sé consciente de comportamientos sesgados en la vida diaria y corrígelos inmediatamente`,
      zh: `• 立即寻求专业的多元化和包容性教育
• 参加深入的偏见减少项目
• 认真审视您的偏见对社会的负面影响
• 在多元文化环境中开始志愿工作
• 对您的偏见负责并积极努力改变
• 接受定期专业咨询
• 寻找并学习实践包容性价值观的榜样
• 在日常生活中意识到偏见行为并立即纠正`,
      ja: `• 即座に専門的な多様性と包括性の教育を受けてください
• 深層的なバイアス軽減プログラムに参加してください
• あなたのバイアスが社会に与える負の影響を真剣に検討してください
• 多文化環境でボランティア活動を始めてください
• 自分のバイアスに責任を持ち、積極的に変化しようと努力してください
• 定期的な専門カウンセリングを受けてください
• 包括的な価値観を実践するロールモデルを見つけて学んでください
• 日常生活で偏見的な行動を自覚し、即座に修正してください`
    }
  }
];

export const getBiasCategory = (percentage: number): BiasCategory => {
  return biasSolutions.find(solution => 
    percentage >= solution.range[0] && percentage <= solution.range[1]
  ) || biasSolutions[2]; // fallback to moderate
};