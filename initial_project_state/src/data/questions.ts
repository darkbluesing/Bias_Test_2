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
    id: 'marital_status',
    text: {
      ko: '혼인 상태를 선택해주세요',
      en: 'Please select your marital status',
      es: 'Por favor selecciona tu estado civil',
      zh: '请选择您的婚姻状况',
      ja: '結婚歴を選択してください'
    },
    options: [
      { ko: '미혼', en: 'Single', es: 'Soltero/a', zh: '未婚', ja: '独身' },
      { ko: '기혼', en: 'Married', es: 'Casado/a', zh: '已婚', ja: '既婚' },
      { ko: '이혼', en: 'Divorced', es: 'Divorciado/a', zh: '离婚', ja: '離婚' },
      { ko: '사별', en: 'Widowed', es: 'Viudo/a', zh: '丧偶', ja: '死別' }
    ]
  },
  {
    id: 'ethnicity',
    text: {
      ko: '인종을 선택해주세요',
      en: 'Please select your ethnicity',
      es: 'Por favor selecciona tu etnia',
      zh: '请选择您的种族',
      ja: '人種を選択してください'
    },
    options: [
      { ko: '아시아계', en: 'Asian', es: 'Asiático', zh: '亚裔', ja: 'アジア系' },
      { ko: '백인', en: 'White', es: 'Blanco', zh: '白人', ja: '백人' },
      { ko: '아프리카계', en: 'Black/African', es: 'Negro/Africano', zh: '黑人/非洲裔', ja: '黒人/アフリカ系' },
      { ko: '히스패닉', en: 'Hispanic/Latino', es: 'Hispano/Latino', zh: '西班牙裔/拉丁裔', ja: 'ヒスパニック/ラテン系' },
      { ko: '혼혈', en: 'Mixed race', es: 'Raza mixta', zh: '混血', ja: '混血' }
    ]
  },
  {
    id: 'age',
    text: {
      ko: '나이를 선택해주세요',
      en: 'Please select your age range',
      es: 'Por favor selecciona tu rango de edad',
      zh: '请选择您的年龄范围',
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
  },
  {
    id: 'religion',
    text: {
      ko: '종교를 선택해주세요',
      en: 'Please select your religion',
      es: 'Por favor selecciona tu religión',
      zh: '请选择您的宗教',
      ja: '宗教を選択してください'
    },
    options: [
      { ko: '기독교', en: 'Christianity', es: 'Cristianismo', zh: '基督教', ja: 'キリスト教' },
      { ko: '불교', en: 'Buddhism', es: 'Budismo', zh: '佛教', ja: '仏教' },
      { ko: '이슬람', en: 'Islam', es: 'Islam', zh: '伊斯兰教', ja: 'イスラム教' },
      { ko: '힌두교', en: 'Hinduism', es: 'Hinduismo', zh: '印度教', ja: 'ヒンドゥー教' },
      { ko: '유대교', en: 'Judaism', es: 'Judaísmo', zh: '犹太教', ja: 'ユダヤ教' },
      { ko: '무종교', en: 'No religion', es: 'Sin religión', zh: '无宗教', ja: '無宗教' }
    ]
  },
  {
    id: 'education',
    text: {
      ko: '최종 학력을 선택해주세요',
      en: 'Please select your highest education level',
      es: 'Por favor selecciona tu nivel educativo más alto',
      zh: '请选择您的最高学历',
      ja: '最終学歴を選択してください'
    },
    options: [
      { ko: '초등학교 졸업 이하', en: 'Elementary or below', es: 'Primaria o inferior', zh: '小学毕业及以下', ja: '小学校卒業以下' },
      { ko: '중학교 졸업', en: 'Middle school', es: 'Secundaria', zh: '初中毕业', ja: '中学校卒業' },
      { ko: '고등학교 졸업', en: 'High school', es: 'Bachillerato', zh: '高中毕业', ja: '高等学校卒業' },
      { ko: '대학교 졸업', en: 'University degree', es: 'Título universitario', zh: '大学毕业', ja: '大学卒業' },
      { ko: '대학원 이상', en: 'Graduate degree or higher', es: 'Posgrado o superior', zh: '研究生及以上', ja: '大学院以上' }
    ]
  },
  {
    id: 'income',
    text: {
      ko: '현재 본인의 소득 수준은 어느 정도인가요?',
      en: 'What is your current income level?',
      es: '¿Cuál es tu nivel de ingresos actual?',
      zh: '您目前的收入水平如何？',
      ja: '現在の収入レベルはどの程度ですか？'
    },
    options: [
      { ko: '낮음', en: 'Low', es: 'Bajo', zh: '低', ja: '低い' },
      { ko: '중간', en: 'Middle', es: 'Medio', zh: '中等', ja: '中間' },
      { ko: '높음', en: 'High', es: 'Alto', zh: '高', ja: '高い' },
      { ko: '매우 높음', en: 'Very high', es: 'Muy alto', zh: '很高', ja: '非常に高い' }
    ]
  },
  {
    id: 'occupation',
    text: {
      ko: '현재 직업을 선택해주세요',
      en: 'Please select your current occupation',
      es: 'Por favor selecciona tu ocupación actual',
      zh: '请选择您目前的职业',
      ja: '現在の職業を選択してください'
    },
    options: [
      { ko: '학생', en: 'Student', es: 'Estudiante', zh: '学生', ja: '学生' },
      { ko: '직장인', en: 'Employee', es: 'Empleado', zh: '职工', ja: '会社員' },
      { ko: '자영업', en: 'Self-employed', es: 'Autónomo', zh: '自营业', ja: '自営業' },
      { ko: '종교인', en: 'Religious worker', es: 'Trabajador religioso', zh: '宗教工作者', ja: '宗教従事者' },
      { ko: '무직', en: 'Unemployed', es: 'Desempleado', zh: '无业', ja: '無職' }
    ]
  },
  {
    id: 'residence',
    text: {
      ko: '주로 거주하는 지역은 어디인가요?',
      en: 'Where do you primarily reside?',
      es: '¿Dónde resides principalmente?',
      zh: '您主要居住在哪里？',
      ja: '主にどこに住んでいますか？'
    },
    options: [
      { ko: '도시', en: 'Urban', es: 'Urbana', zh: '城市', ja: '都市' },
      { ko: '교외', en: 'Suburban', es: 'Suburbana', zh: '郊区', ja: '郊外' },
      { ko: '농촌', en: 'Rural', es: 'Rural', zh: '农村', ja: '農村' }
    ]
  },
  {
    id: 'family_size',
    text: {
      ko: '함께 사는 가족 구성 수는 몇 명인가요?',
      en: 'How many family members do you live with?',
      es: '¿Con cuántos miembros de la familia vives?',
      zh: '您与多少家庭成员一起生活？',
      ja: '何人の家族と一緒に住んでいますか？'
    },
    options: [
      { ko: '혼자', en: 'Alone', es: 'Solo', zh: '独自', ja: '一人' },
      { ko: '2~3명', en: '2-3 people', es: '2-3 personas', zh: '2-3人', ja: '2-3人' },
      { ko: '4~6명', en: '4-6 people', es: '4-6 personas', zh: '4-6人', ja: '4-6人' },
      { ko: '7명 이상', en: '7 or more people', es: '7 o más personas', zh: '7人以上', ja: '7人以上' }
    ]
  }
];

export const biasQuestions: Question[] = [
  {
    id: 'bias_1',
    text: {
      ko: '길거리에서 외국인이 인사를 건네면?',
      en: 'When a foreigner greets you on the street?',
      es: '¿Cuando un extranjero te saluda en la calle?',
      zh: '当外国人在街上向您打招呼时？',
      ja: '道で外国人が挨拶をしてきたら？'
    },
    options: [
      { ko: '자연스럽게 인사한다', en: 'Naturally greet back', es: 'Saludo naturalmente', zh: '自然地回应问候', ja: '自然に挨拶を返す' },
      { ko: '당황스러워 피한다', en: 'Feel flustered and avoid', es: 'Me siento confundido y evito', zh: '感到困惑并避开', ja: '困惑して避ける' },
      { ko: '무시하고 지나친다', en: 'Ignore and pass by', es: 'Ignoro y paso de largo', zh: '忽视并走过', ja: '無視して通り過ぎる' }
    ]
  },
  {
    id: 'bias_2',
    text: {
      ko: '지하철에서 특정 종교 복장을 한 사람이 옆자리에 앉는다면?',
      en: 'If someone in religious attire sits next to you on the subway?',
      es: '¿Si alguien con vestimenta religiosa se sienta a tu lado en el metro?',
      zh: '如果有人穿着宗教服装坐在地铁上您旁边？',
      ja: '地下鉄で宗教的な服装をした人が隣に座ったら？'
    },
    options: [
      { ko: '신경 쓰지 않는다', en: 'Don\'t mind at all', es: 'No me importa', zh: '不在意', ja: '気にしない' },
      { ko: '약간 불편하다', en: 'Feel slightly uncomfortable', es: 'Me siento un poco incómodo', zh: '感到有些不舒服', ja: '少し不快に感じる' },
      { ko: '자리를 옮긴다', en: 'Move to another seat', es: 'Me cambio de asiento', zh: '换个座位', ja: '席を移る' }
    ]
  },
  {
    id: 'bias_3',
    text: {
      ko: '영어가 서툰 외국인과 대화할 때 나는?',
      en: 'When talking with a foreigner who speaks poor English?',
      es: '¿Cuando hablo con un extranjero que habla mal inglés?',
      zh: '与英语不好的外国人交谈时，您？',
      ja: '英語が下手な外国人と話すとき、私は？'
    },
    options: [
      { ko: '최대한 이해하며 대화한다', en: 'Try my best to understand and communicate', es: 'Trato de entender y comunicarme', zh: '尽力理解和交流', ja: '最大限理解しながら会話する' },
      { ko: '귀찮아진다', en: 'Feel bothered', es: 'Me molesta', zh: '感到烦躁', ja: '面倒に感じる' },
      { ko: '대화를 피한다', en: 'Avoid conversation', es: 'Evito la conversación', zh: '避免交谈', ja: '会話を避ける' }
    ]
  },
  {
    id: 'bias_4',
    text: {
      ko: '다문화 가정 아동이 내 아이와 친구라면?',
      en: 'If a child from a multicultural family is friends with your child?',
      es: '¿Si un niño de una familia multicultural es amigo de tu hijo?',
      zh: '如果多元文化家庭的孩子与您的孩子是朋友？',
      ja: '多文化家庭の子供が自分の子供と友達なら？'
    },
    options: [
      { ko: '좋다', en: 'It\'s good', es: 'Es bueno', zh: '很好', ja: '良い' },
      { ko: '걱정된다', en: 'I\'m worried', es: 'Me preocupa', zh: '担心', ja: '心配だ' },
      { ko: '불편하다', en: 'It\'s uncomfortable', es: 'Es incómodo', zh: '不舒服', ja: '不快だ' }
    ]
  },
  {
    id: 'bias_5',
    text: {
      ko: '다른 인종의 사람이 우리 동네에 이사 온다면?',
      en: 'If someone of a different race moves to our neighborhood?',
      es: '¿Si alguien de una raza diferente se muda a nuestro barrio?',
      zh: '如果其他种族的人搬到我们社区？',
      ja: '他の人種の人が私たちの近所に引っ越してきたら？'
    },
    options: [
      { ko: '상관없다', en: 'It doesn\'t matter', es: 'No importa', zh: '无所谓', ja: '関係ない' },
      { ko: '분위기가 달라질 것 같다', en: 'The atmosphere might change', es: 'El ambiente podría cambiar', zh: '气氛可能会改变', ja: '雰囲気が変わりそうだ' },
      { ko: '반갑지 않다', en: 'Not welcome', es: 'No es bienvenido', zh: '不欢迎', ja: '歓迎しない' }
    ]
  },
  {
    id: 'bias_6',
    text: {
      ko: '외국인이 모국어로 질문할 때 발음이 이상하다면?',
      en: 'If a foreigner\'s pronunciation sounds strange when asking in your native language?',
      es: '¿Si la pronunciación de un extranjero suena extraña al preguntar en tu idioma nativo?',
      zh: '如果外国人用母语提问时发音奇怪？',
      ja: '外国人が母国語で質問する際、発音が変だったら？'
    },
    options: [
      { ko: '끝까지 이해하려 한다', en: 'Try to understand until the end', es: 'Trato de entender hasta el final', zh: '努力理解到最后', ja: '最後まで理解しようとする' },
      { ko: '웃음이 난다', en: 'It makes me laugh', es: 'Me da risa', zh: '感到好笑', ja: '笑いが出る' },
      { ko: '무시한다', en: 'Ignore them', es: 'Los ignoro', zh: '忽视他们', ja: '無視する' }
    ]
  },
  {
    id: 'bias_7',
    text: {
      ko: '회사에 외국인 상사가 들어온다면?',
      en: 'If a foreign boss joins your company?',
      es: '¿Si un jefe extranjero se une a tu empresa?',
      zh: '如果公司来了外国老板？',
      ja: '会社に外国人の上司が入ってきたら？'
    },
    options: [
      { ko: '존중한다', en: 'Respect them', es: 'Los respeto', zh: '尊重他们', ja: '尊敬する' },
      { ko: '실력부터 의심한다', en: 'Doubt their abilities first', es: 'Primero dudo de sus habilidades', zh: '首先怀疑他们的能力', ja: '実力をまず疑う' },
      { ko: '받아들이기 어렵다', en: 'Hard to accept', es: 'Es difícil de aceptar', zh: '难以接受', ja: '受け入れるのが難しい' }
    ]
  },
  {
    id: 'bias_8',
    text: {
      ko: '외국인이 내 나라 음식을 먹으며 \'이상한 맛\'이라고 말한다면?',
      en: 'If a foreigner says your country\'s food tastes "strange"?',
      es: '¿Si un extranjero dice que la comida de tu país sabe "extraña"?',
      zh: '如果外国人吃您国家的食物说"味道奇怪"？',
      ja: '外国人が自国の料理を食べて「変な味」と言ったら？'
    },
    options: [
      { ko: '문화 차이라 생각한다', en: 'Think it\'s a cultural difference', es: 'Pienso que es una diferencia cultural', zh: '认为是文化差异', ja: '文化の違いだと思う' },
      { ko: '무례하다 느낀다', en: 'Feel it\'s rude', es: 'Siento que es grosero', zh: '感到无礼', ja: '失礼だと感じる' },
      { ko: '불쾌하다', en: 'Feel offended', es: 'Me ofendo', zh: '感到不快', ja: '不快だ' }
    ]
  },
  {
    id: 'bias_9',
    text: {
      ko: '피부색이 다른 사람과 팀 프로젝트를 한다면?',
      en: 'If you work on a team project with someone of a different skin color?',
      es: '¿Si trabajas en un proyecto de equipo con alguien de diferente color de piel?',
      zh: '如果与不同肤色的人一起做团队项目？',
      ja: '肌の色が違う人とチームプロジェクトをするなら？'
    },
    options: [
      { ko: '차이 없다', en: 'No difference', es: 'No hay diferencia', zh: '没有差别', ja: '違いはない' },
      { ko: '적응이 필요하다', en: 'Need time to adapt', es: 'Necesito tiempo para adaptarme', zh: '需要适应', ja: '適応が必要だ' },
      { ko: '꺼려진다', en: 'Feel hesitant', es: 'Me siento reacio', zh: '感到犹豫', ja: '躊躇する' }
    ]
  },
  {
    id: 'bias_10',
    text: {
      ko: '외국인의 목소리가 크거나 제스처가 많다면?',
      en: 'If a foreigner speaks loudly or uses many gestures?',
      es: '¿Si un extranjero habla fuerte o usa muchos gestos?',
      zh: '如果外国人声音很大或手势很多？',
      ja: '外国人の声が大きかったり、ジェスチャーが多かったら？'
    },
    options: [
      { ko: '문화적 표현일 뿐이다', en: 'It\'s just cultural expression', es: 'Es solo expresión cultural', zh: '只是文化表达', ja: '文化的表現に過ぎない' },
      { ko: '거슬릴 수 있다', en: 'It can be annoying', es: 'Puede ser molesto', zh: '可能会烦人', ja: 'うるさく感じることがある' },
      { ko: '무례하게 느껴진다', en: 'Feels rude', es: 'Se siente grosero', zh: '感觉无礼', ja: '失礼に感じる' }
    ]
  },
  {
    id: 'bias_11',
    text: {
      ko: '직장 동료가 기도 시간을 요구한다면?',
      en: 'If a colleague requests prayer time at work?',
      es: '¿Si un colega solicita tiempo de oración en el trabajo?',
      zh: '如果同事要求祷告时间？',
      ja: '職場の同僚が祈りの時間を要求したら？'
    },
    options: [
      { ko: '존중한다', en: 'Respect it', es: 'Lo respeto', zh: '尊重', ja: '尊重する' },
      { ko: '이해는 하지만 불편하다', en: 'Understand but feel uncomfortable', es: 'Entiendo pero me siento incómodo', zh: '理解但感到不舒服', ja: '理解するが不快だ' },
      { ko: '받아들일 수 없다', en: 'Cannot accept it', es: 'No puedo aceptarlo', zh: '无法接受', ja: '受け入れられない' }
    ]
  },
  {
    id: 'bias_12',
    text: {
      ko: 'TV에 외국인이 자주 등장한다면?',
      en: 'If foreigners frequently appear on TV?',
      es: '¿Si los extranjeros aparecen frecuentemente en TV?',
      zh: '如果外国人经常出现在电视上？',
      ja: 'テレビに外国人がよく登場するなら？'
    },
    options: [
      { ko: '다양성이 좋다', en: 'Diversity is good', es: 'La diversidad es buena', zh: '多样性很好', ja: '多様性が良い' },
      { ko: '조금 많아진 듯하다', en: 'Seems a bit too much', es: 'Parece un poco demasiado', zh: '似乎有点多', ja: '少し多くなったようだ' },
      { ko: '불편하다', en: 'Feel uncomfortable', es: 'Me siento incómodo', zh: '感到不舒服', ja: '不快だ' }
    ]
  },
  {
    id: 'bias_13',
    text: {
      ko: '다른 인종의 연예인이 광고 모델이 되는 것에 대해?',
      en: 'About celebrities of different races becoming advertising models?',
      es: '¿Sobre celebridades de diferentes razas convirtiéndose en modelos publicitarios?',
      zh: '关于不同种族的名人成为广告模特？',
      ja: '他の人種の芸能人が広告モデルになることについて？'
    },
    options: [
      { ko: '환영한다', en: 'Welcome it', es: 'Lo doy la bienvenida', zh: '欢迎', ja: '歓迎する' },
      { ko: '낯설다', en: 'Feels unfamiliar', es: 'Se siente extraño', zh: '感到陌生', ja: '馴染みがない' },
      { ko: '거부감이 든다', en: 'Feel resistance', es: 'Siento resistencia', zh: '感到抗拒', ja: '拒否感がある' }
    ]
  },
  {
    id: 'bias_14',
    text: {
      ko: '다문화 축제가 동네에서 열린다면?',
      en: 'If a multicultural festival is held in your neighborhood?',
      es: '¿Si se celebra un festival multicultural en tu barrio?',
      zh: '如果在社区举办多元文化节？',
      ja: '多文化祭が近所で開催されるなら？'
    },
    options: [
      { ko: '참여하고 싶다', en: 'Want to participate', es: 'Quiero participar', zh: '想参与', ja: '参加したい' },
      { ko: '구경만 한다', en: 'Just watch', es: 'Solo miro', zh: '只是观看', ja: '見物するだけ' },
      { ko: '가지 않는다', en: 'Don\'t go', es: 'No voy', zh: '不去', ja: '行かない' }
    ]
  },
  {
    id: 'bias_15',
    text: {
      ko: '국제결혼을 한 부부가 주변에 있다면?',
      en: 'If there\'s an international marriage couple around you?',
      es: '¿Si hay una pareja de matrimonio internacional cerca de ti?',
      zh: '如果周围有跨国婚姻的夫妇？',
      ja: '国際結婚をした夫婦が周りにいるなら？'
    },
    options: [
      { ko: '자연스럽다', en: 'It\'s natural', es: 'Es natural', zh: '很自然', ja: '自然だ' },
      { ko: '문화 차이로 힘들 것 같다', en: 'Seems difficult due to cultural differences', es: 'Parece difícil por diferencias culturales', zh: '因为文化差异可能会很困难', ja: '文化の違いで大変そうだ' },
      { ko: '어울리지 않는다', en: 'Doesn\'t match', es: 'No coinciden', zh: '不匹配', ja: '似合わない' }
    ]
  },
  {
    id: 'bias_16',
    text: {
      ko: '자녀가 외국인 친구를 집에 데려온다면?',
      en: 'If your child brings a foreign friend home?',
      es: '¿Si tu hijo trae un amigo extranjero a casa?',
      zh: '如果您的孩子带外国朋友回家？',
      ja: '子供が外国人の友達を家に連れてきたら？'
    },
    options: [
      { ko: '반갑게 맞이한다', en: 'Welcome them warmly', es: 'Los recibo calurosamente', zh: '热情欢迎', ja: '温かく迎える' },
      { ko: '조심스러워진다', en: 'Become cautious', es: 'Me vuelvo cauteloso', zh: '变得谨慎', ja: '慎重になる' },
      { ko: '탐탁지 않다', en: 'Don\'t approve', es: 'No lo apruebo', zh: '不赞成', ja: '好ましくない' }
    ]
  },
  {
    id: 'bias_17',
    text: {
      ko: '외국인이 정치적 발언을 한다면?',
      en: 'If a foreigner makes political statements?',
      es: '¿Si un extranjero hace declaraciones políticas?',
      zh: '如果外国人发表政治言论？',
      ja: '外国人が政治的発言をするなら？'
    },
    options: [
      { ko: '표현의 자유다', en: 'It\'s freedom of expression', es: 'Es libertad de expresión', zh: '这是言论自由', ja: '表現の自由だ' },
      { ko: '조심해야 한다', en: 'Should be careful', es: 'Debería ser cuidadoso', zh: '应该小心', ja: '気をつけるべきだ' },
      { ko: '자격 없다', en: 'Not qualified', es: 'No calificado', zh: '没有资格', ja: '资格がない' }
    ]
  },
  {
    id: 'bias_18',
    text: {
      ko: '다른 인종이 같은 국적을 받는다면?',
      en: 'If someone of a different race gets the same nationality?',
      es: '¿Si alguien de una raza diferente obtiene la misma nacionalidad?',
      zh: '如果其他种族的人获得相同国籍？',
      ja: '他の人種が同じ国籍を取得するなら？'
    },
    options: [
      { ko: '문제없다', en: 'No problem', es: 'No hay problema', zh: '没问题', ja: '問題ない' },
      { ko: '혼란스러울 수 있다', en: 'Could be confusing', es: 'Podría ser confuso', zh: '可能会混乱', ja: '混乱するかもしれない' },
      { ko: '반대한다', en: 'Oppose it', es: 'Me opongo', zh: '反对', ja: '反対する' }
    ]
  },
  {
    id: 'bias_19',
    text: {
      ko: '이민자의 자녀가 학교에 다닌다면?',
      en: 'If immigrant children attend school?',
      es: '¿Si los hijos de inmigrantes asisten a la escuela?',
      zh: '如果移民的孩子上学？',
      ja: '移民の子供が学校に通うなら？'
    },
    options: [
      { ko: '당연하다', en: 'It\'s natural', es: 'Es natural', zh: '理所当然', ja: '当然だ' },
      { ko: '잘 적응할 수 있을지 걱정된다', en: 'Worried if they can adapt well', es: 'Me preocupa si pueden adaptarse bien', zh: '担心他们能否适应好', ja: 'うまく適応できるか心配だ' },
      { ko: '문화를 훼손할 수 있다', en: 'Could damage the culture', es: 'Podría dañar la cultura', zh: '可能会损害文化', ja: '文化を損なう可能性がある' }
    ]
  },
  {
    id: 'bias_20',
    text: {
      ko: '외국인 관광객이 예절을 지키지 못하면?',
      en: 'If foreign tourists don\'t follow etiquette?',
      es: '¿Si los turistas extranjeros no siguen la etiqueta?',
      zh: '如果外国游客不遵守礼仪？',
      ja: '外国人観光客がマナーを守らなければ？'
    },
    options: [
      { ko: '문화 차이라 생각한다', en: 'Think it\'s cultural difference', es: 'Pienso que es diferencia cultural', zh: '认为是文化差异', ja: '文化の違いだと思う' },
      { ko: '매너를 지적하고 싶다', en: 'Want to point out the manners', es: 'Quiero señalar los modales', zh: '想指出礼貌问题', ja: 'マナーを指摘したい' },
      { ko: '화가 난다', en: 'Feel angry', es: 'Me enojo', zh: '感到愤怒', ja: '腹が立つ' }
    ]
  },
  {
    id: 'bias_21',
    text: {
      ko: '외국인 유튜버가 한국어 욕설을 사용한다면?',
      en: 'If a foreign YouTuber uses Korean profanity?',
      es: '¿Si un YouTuber extranjero usa palabrotas en coreano?',
      zh: '如果外国YouTube用户使用韩语脏话？',
      ja: '外国人YouTuberが韓国語の悪口を使うなら？'
    },
    options: [
      { ko: '재미있다', en: 'It\'s funny', es: 'Es divertido', zh: '很有趣', ja: '面白い' },
      { ko: '보기 불편하다', en: 'Uncomfortable to watch', es: 'Incómodo de ver', zh: '看着不舒服', ja: '見ていて不快だ' },
      { ko: '존중이 없다고 생각한다', en: 'Think it\'s disrespectful', es: 'Creo que es irrespetuoso', zh: '认为不尊重', ja: '敬意がないと思う' }
    ]
  },
  {
    id: 'bias_22',
    text: {
      ko: '다른 젠더 정체성을 가진 사람이 직장 동료라면?',
      en: 'If someone with a different gender identity is your colleague?',
      es: '¿Si alguien con una identidad de género diferente es tu colega?',
      zh: '如果性别认同不同的人是您的同事？',
      ja: '異なるジェンダーアイデンティティを持つ人が職場の同僚なら？'
    },
    options: [
      { ko: '상관없다', en: 'It doesn\'t matter', es: 'No importa', zh: '无所谓', ja: '関係ない' },
      { ko: '적응 시간이 필요하다', en: 'Need time to adapt', es: 'Necesito tiempo para adaptarme', zh: '需要适应时间', ja: '適応時間が必要だ' },
      { ko: '함께 일하기 불편하다', en: 'Uncomfortable working together', es: 'Incómodo trabajar juntos', zh: '一起工作不舒服', ja: '一緒に働くのが不快だ' }
    ]
  },
  {
    id: 'bias_23',
    text: {
      ko: '외국인에 대한 부정적 기사를 본다면?',
      en: 'If you see negative articles about foreigners?',
      es: '¿Si ves artículos negativos sobre extranjeros?',
      zh: '如果您看到关于外国人的负面文章？',
      ja: '外国人についての否定的な記事を見たら？'
    },
    options: [
      { ko: '전체가 그렇다고 생각한다', en: 'Think all are like that', es: 'Pienso que todos son así', zh: '认为全部都是这样', ja: '全体がそうだと思う' },
      { ko: '일부일 뿐이라고 생각한다', en: 'Think it\'s only some', es: 'Pienso que es solo algunos', zh: '认为只是一部分', ja: '一部だけだと思う' },
      { ko: '관심 두지 않는다', en: 'Don\'t pay attention', es: 'No presto atención', zh: '不关心', ja: '関心を持たない' }
    ]
  },
  {
    id: 'bias_24',
    text: {
      ko: '외국인과의 결혼식을 본다면?',
      en: 'If you see a wedding with a foreigner?',
      es: '¿Si ves una boda con un extranjero?',
      zh: '如果您看到与外国人的婚礼？',
      ja: '外国人との結婚式を見たら？'
    },
    options: [
      { ko: '다양성이 존중된다', en: 'Diversity is respected', es: 'La diversidad es respetada', zh: '多样性受到尊重', ja: '多様性が尊重される' },
      { ko: '거부감이 든다', en: 'Feel resistance', es: 'Siento resistencia', zh: '感到抗拒', ja: '拒否感がある' },
      { ko: '전통을 훼손한다', en: 'Damages tradition', es: 'Daña la tradición', zh: '损害传统', ja: '伝統を損なう' }
    ]
  },
  {
    id: 'bias_25',
    text: {
      ko: '외국인 전용 식당이 생긴다면?',
      en: 'If a restaurant exclusively for foreigners opens?',
      es: '¿Si abre un restaurante exclusivamente para extranjeros?',
      zh: '如果开了一家外国人专用餐厅？',
      ja: '外国人専用レストランができるなら？'
    },
    options: [
      { ko: '문화 다양성', en: 'Cultural diversity', es: 'Diversidad cultural', zh: '文化多样性', ja: '文化の多様性' },
      { ko: '역차별 같다', en: 'Seems like reverse discrimination', es: 'Parece discriminación inversa', zh: '似乎是反向歧视', ja: '逆差別のようだ' },
      { ko: '내국인에게도 개방돼야 한다', en: 'Should be open to locals too', es: 'Debería estar abierto a los locales también', zh: '也应该对本地人开放', ja: '地元の人にも開放すべきだ' }
    ]
  },
  {
    id: 'bias_26',
    text: {
      ko: '외국인 유학생이 역사 지식을 잘못 알고 있다면?',
      en: 'If a foreign student has wrong knowledge about history?',
      es: '¿Si un estudiante extranjero tiene conocimientos erróneos sobre la historia?',
      zh: '如果外国留学生对历史知识有误解？',
      ja: '外国人留学生が歴史知識を間違って知っているなら？'
    },
    options: [
      { ko: '정중히 알려준다', en: 'Politely inform them', es: 'Los informo cortésmente', zh: '礼貌地告诉他们', ja: '丁寧に教える' },
      { ko: '그냥 넘어간다', en: 'Just let it pass', es: 'Solo lo dejo pasar', zh: '就这样过去了', ja: 'そのまま流す' },
      { ko: '대화를 피한다', en: 'Avoid conversation', es: 'Evito la conversación', zh: '避免交谈', ja: '会話を避ける' }
    ]
  },
  {
    id: 'bias_27',
    text: {
      ko: '외국인 노동자가 경제에 기여한다면?',
      en: 'If foreign workers contribute to the economy?',
      es: '¿Si los trabajadores extranjeros contribuyen a la economía?',
      zh: '如果外国工人对经济有贡献？',
      ja: '外国人労働者が経済に貢献するなら？'
    },
    options: [
      { ko: '긍정적이다', en: 'It\'s positive', es: 'Es positivo', zh: '是积极的', ja: '積極的だ' },
      { ko: '일자리를 빼앗는다', en: 'They take away jobs', es: 'Se llevan los trabajos', zh: '抢夺工作机会', ja: '仕事を奪う' },
      { ko: '상관없다', en: 'It doesn\'t matter', es: 'No importa', zh: '无所谓', ja: '関係ない' }
    ]
  },
  {
    id: 'bias_28',
    text: {
      ko: '특정 인종 농담/밈을 본다면?',
      en: 'If you see racial jokes/memes?',
      es: '¿Si ves chistes/memes raciales?',
      zh: '如果您看到种族笑话/迷因？',
      ja: '特定の人種のジョーク/ミームを見たら？'
    },
    options: [
      { ko: '따라한다', en: 'Copy them', es: 'Los copio', zh: '模仿', ja: '真似する' },
      { ko: '불쾌하지만 무시한다', en: 'Uncomfortable but ignore', es: 'Incómodo pero ignoro', zh: '不快但忽视', ja: '不快だが無視する' },
      { ko: '차별적이고 용납 못한다', en: 'Discriminatory and unacceptable', es: 'Discriminatorio e inaceptable', zh: '歧视性且不可接受', ja: '差別的で許せない' }
    ]
  },
  {
    id: 'bias_29',
    text: {
      ko: '외국인 가게 음식이 익숙하지 않다면?',
      en: 'If food from a foreign restaurant is unfamiliar?',
      es: '¿Si la comida de un restaurante extranjero no es familiar?',
      zh: '如果外国餐厅的食物不熟悉？',
      ja: '外国人店の料理が馴染みがないなら？'
    },
    options: [
      { ko: '존중한다', en: 'Respect it', es: 'Lo respeto', zh: '尊重', ja: '尊重する' },
      { ko: '다시 가지 않는다', en: 'Won\'t go again', es: 'No volveré', zh: '不会再去', ja: 'もう行かない' },
      { ko: '비위생적일 것 같다', en: 'Seems unsanitary', es: 'Parece antihigiénico', zh: '似乎不卫生', ja: '不衛生そうだ' }
    ]
  },
  {
    id: 'bias_30',
    text: {
      ko: '외국인 친구와 정치·사회 논의를 할 때?',
      en: 'When discussing politics and society with foreign friends?',
      es: '¿Cuando discutes política y sociedad con amigos extranjeros?',
      zh: '与外国朋友讨论政治社会问题时？',
      ja: '外国人の友人と政治・社会について議論する時？'
    },
    options: [
      { ko: '서로 존중한다', en: 'Respect each other', es: 'Nos respetamos', zh: '互相尊重', ja: 'お互いを尊重する' },
      { ko: '불편하다', en: 'Feel uncomfortable', es: 'Me siento incómodo', zh: '感到不舒服', ja: '不快だ' },
      { ko: '말할 자격 없다', en: 'Not qualified to speak', es: 'No calificado para hablar', zh: '没有资格发言', ja: '発言する資格がない' }
    ]
  }
];

export const generateAllQuestions = (): Question[] => {
  return [...profileQuestions, ...biasQuestions];
};