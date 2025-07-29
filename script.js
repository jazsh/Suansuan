// BaZi calculator script for "建洪算算"

// Arrays for stems and branches with English and Chinese names
const stems = [
  { en: 'Jia', zh: '甲', element: 'Wood', yinYang: 'Yang' },
  { en: 'Yi', zh: '乙', element: 'Wood', yinYang: 'Yin' },
  { en: 'Bing', zh: '丙', element: 'Fire', yinYang: 'Yang' },
  { en: 'Ding', zh: '丁', element: 'Fire', yinYang: 'Yin' },
  { en: 'Wu', zh: '戊', element: 'Earth', yinYang: 'Yang' },
  { en: 'Ji', zh: '己', element: 'Earth', yinYang: 'Yin' },
  { en: 'Geng', zh: '庚', element: 'Metal', yinYang: 'Yang' },
  { en: 'Xin', zh: '辛', element: 'Metal', yinYang: 'Yin' },
  { en: 'Ren', zh: '壬', element: 'Water', yinYang: 'Yang' },
  { en: 'Gui', zh: '癸', element: 'Water', yinYang: 'Yin' }
];

const branches = [
  { en: 'Zi', zh: '子', element: 'Water' },
  { en: 'Chou', zh: '丑', element: 'Earth' },
  { en: 'Yin', zh: '寅', element: 'Wood' },
  { en: 'Mao', zh: '卯', element: 'Wood' },
  { en: 'Chen', zh: '辰', element: 'Earth' },
  { en: 'Si', zh: '巳', element: 'Fire' },
  { en: 'Wu', zh: '午', element: 'Fire' },
  { en: 'Wei', zh: '未', element: 'Earth' },
  { en: 'Shen', zh: '申', element: 'Metal' },
  { en: 'You', zh: '酉', element: 'Metal' },
  { en: 'Xu', zh: '戌', element: 'Earth' },
  { en: 'Hai', zh: '亥', element: 'Water' }
];

// Mapping from year stem index to first month stem index
const firstMonthStemMap = {
  0: 2, // Jia
  5: 2, // Ji
  1: 4, // Yi
  6: 4, // Geng
  2: 6, // Bing
  7: 6, // Xin
  3: 8, // Ding
  8: 8, // Ren
  4: 0, // Wu
  9: 0 // Gui
};

// Personality descriptions keyed by element and yin/yang
const personalityTexts = {
  Wood: {
    Yang: {
      en: 'You are independent and determined like a sturdy tree. You value principles and are a natural leader but may be critical and slow to adapt.',
      zh: '您像参天大树般独立坚定，重视原则，是天生的领导者；但可能批判性强、不善于适应变化。'
    },
    Yin: {
      en: 'Charming and adaptable, you enjoy variety and short‑term projects. You are witty and meticulous, though sometimes manipulative or indecisive.',
      zh: '您富有魅力且适应力强，喜新厌旧，擅长短期计划；机智细腻，但有时会操控或犹豫不决。'
    }
  },
  Fire: {
    Yang: {
      en: 'Warm, generous and passionate like the sun. You persevere towards goals but can be impatient or restless.',
      zh: '如太阳般热情慷慨、激情四射，做事有毅力，但可能急躁或坐立不安。'
    },
    Yin: {
      en: 'Energetic and articulate with a love for knowledge. You shine on stage and in conversation. Watch out for hypersensitivity or mood swings.',
      zh: '您精力充沛、表达力强，爱好学习，擅长在舞台和交谈中发光；需注意敏感或情绪波动。'
    }
  },
  Earth: {
    Yang: {
      en: 'Trustworthy and stable, you provide solid support. You are reserved and value tradition, though procrastination may be a weakness.',
      zh: '诚信可靠，稳重踏实，是他人依靠的支柱；为人内敛守旧，拖延是弱点。'
    },
    Yin: {
      en: 'Flexible and creative, you adapt to change easily and enjoy teamwork. You may hesitate when making decisions.',
      zh: '灵活而富有创造力，适应变化，乐于合作，但做决定时可能摇摆不定。'
    }
  },
  Metal: {
    Yang: {
      en: 'Decisive and adventurous, you value justice and have a competitive spirit. Holding grudges and being overly critical can trip you up.',
      zh: '果断勇敢，重视公义，充满竞争精神；易记仇，对人要求高。'
    },
    Yin: {
      en: 'Elegant and charismatic, you seek refinement and admire beauty. You are persuasive but may become manipulative or vain.',
      zh: '精致迷人，追求高雅，欣赏美丽；善于说服，但可能虚荣或喜欢操控他人。'
    }
  },
  Water: {
    Yang: {
      en: 'Active, entrepreneurial and analytical. You move like a river, seizing opportunities quickly. Beware of volatility and moodiness.',
      zh: '主动进取、富有商业和分析头脑，像江河般抓住机会；需警惕情绪波动和急躁。'
    },
    Yin: {
      en: 'Intuitive and philosophical, you enjoy exploring the unseen. Your imagination is rich but overthinking may cause anxiety or impulsive actions.',
      zh: '直觉敏锐、富于哲理，喜欢探索玄妙；想象力丰富，但过度思虑易引发焦虑或冲动。'
    }
  }
};

// Monthly fortune data (Aug–Dec 2025) for general guidance in Snake year
const monthlyFortune = [
  {
    month: 'August',
    titleEn: 'Love blossoms',
    textEn: 'A great month for relationships: single people should confess feelings and couples can deepen their bond. Career and wealth are moderate; avoid risky investments and take care of your health.',
    titleZh: '爱情满满',
    textZh: '本月感情运极佳，单身者可表白，有伴侣者适合推进关系；事业财运平平，避免冒险投资，关注身体健康。'
  },
  {
    month: 'September',
    titleEn: 'Challenges arise',
    textEn: 'A turbulent month with obstacles at work and potential financial losses. Communicate calmly with loved ones and beware of food‑borne illnesses.',
    titleZh: '挑战重重',
    textZh: '事业阻力大、财务有风险；与伴侣多沟通，注意饮食卫生，谨慎行事。'
  },
  {
    month: 'October',
    titleEn: 'Mixed blessings',
    textEn: 'Work may be demanding but support from mentors helps. Salary is stable but windfalls are unlikely. Relationships require attention; health is good but travel with caution.',
    titleZh: '吉凶参半',
    textZh: '工作繁重但有贵人相助，薪资稳定；感情需用心维系；健康良好，出行需注意安全。'
  },
  {
    month: 'November',
    titleEn: 'Seize opportunities',
    textEn: 'Use your abilities boldly to earn promotions or expand your business. Investment luck improves but do not rush romance. Health may be fragile; avoid long journeys.',
    titleZh: '把握机会',
    textZh: '勇于发挥能力，争取晋升或扩展事业，投资运上升但感情需慢行；健康欠佳，避免长途旅行。'
  },
  {
    month: 'December',
    titleEn: 'Prosperity with patience',
    textEn: 'Concentration at work declines but financial luck soars. Relationships are sweet though minor quarrels may occur. Maintain good habits to safeguard health.',
    titleZh: '繁荣与耐心',
    textZh: '工作效率下降但财运旺盛；感情顺利偶有小摩擦；保持良好作息确保健康。'
  }
];

// Utility: convert Gregorian date to Julian day number at noon UTC (approx)
function julianDay(date) {
  // Convert to UTC noon
  const y = date.getUTCFullYear();
  let m = date.getUTCMonth() + 1; // 1-12
  const d = date.getUTCDate();
  if (m <= 2) {
    m += 12;
    y -= 1;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  const JD = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
  return JD;
}

// Compute year pillar indices [stemIndex, branchIndex]
function computeYearPillar(year) {
  const stemIndex = (year + 6) % 10;
  const branchIndex = (year + 8) % 12;
  return [stemIndex, branchIndex];
}

// Compute month pillar indices given year pillar and month number (1-12)
function computeMonthPillar(yearStemIndex, month) {
  // Determine first month stem index based on year stem
  const firstStem = firstMonthStemMap[yearStemIndex];
  // In simplified mapping, month 1 (January) corresponds to Yin (寅) which is branch index 2
  const branchIndex = (month + 1) % 12; // month 1->2, 2->3, etc.
  // Month stem increments around the cycle
  const stemIndex = (firstStem + (month - 1)) % 10;
  return [stemIndex, branchIndex];
}

// Compute day pillar indices using Julian date method
function computeDayPillar(date) {
  const jd = julianDay(date);
  const stemIndex = ((Math.floor(jd + 0.5) - 1) % 10 + 10) % 10;
  const branchIndex = ((Math.floor(jd + 0.5) + 1) % 12 + 12) % 12;
  return [stemIndex, branchIndex];
}

// Compute hour pillar indices based on day stem and time
function computeHourPillar(dayStemIndex, hour, minute) {
  const totalHours = hour + minute / 60;
  // Determine hour branch: each 2‑hour block starting at 23:00 is a branch
  let branchIndex = Math.floor(((totalHours + 1) % 24) / 2);
  // Use common formula: hour stem = (dayStemIndex * 2 + branchIndex) % 10
  const stemIndex = (dayStemIndex * 2 + branchIndex) % 10;
  return [stemIndex, branchIndex];
}

// Render chart to the page
function renderChart(pillars, lang) {
  const container = document.getElementById('chartDisplay');
  container.innerHTML = '';
  const labelsEn = ['Hour', 'Day', 'Month', 'Year'];
  const labelsZh = ['时柱', '日柱', '月柱', '年柱'];
  for (let i = 0; i < 4; i++) {
    const div = document.createElement('div');
    const [stemIdx, branchIdx] = pillars[i];
    const stem = stems[stemIdx];
    const branch = branches[branchIdx];
    const label = lang === 'zh' ? labelsZh[i] : labelsEn[i];
    div.innerHTML = `<strong>${label}</strong><br>${stem[lang]}${branch[lang]}`;
    container.appendChild(div);
  }
}

// Determine personality text
function getPersonalityText(dayStemIndex, lang) {
  const stem = stems[dayStemIndex];
  const element = stem.element;
  const yinYang = stem.yinYang;
  const entry = personalityTexts[element][yinYang];
  return entry[lang];
}

// Render monthly fortune
function renderFortune(lang) {
  const container = document.getElementById('fortune');
  container.innerHTML = '';
  monthlyFortune.forEach(item => {
    const div = document.createElement('div');
    const title = lang === 'zh' ? item.titleZh : item.titleEn;
    const text = lang === 'zh' ? item.textZh : item.textEn;
    div.innerHTML = `<strong>${title}</strong>: ${text}`;
    container.appendChild(div);
  });
}

// Language toggle
let currentLang = 'en';
function toggleLanguage() {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  // update button text
  document.getElementById('langToggle').textContent = currentLang === 'zh' ? 'Switch to English' : '切换到中文';
  // update form labels and titles
  document.getElementById('formTitle').textContent = currentLang === 'zh' ? '输入您的出生信息' : 'Enter your birth details';
  document.getElementById('nameLabel').textContent = currentLang === 'zh' ? '姓名（可选）：' : 'Name (optional):';
  document.getElementById('dateLabel').textContent = currentLang === 'zh' ? '出生日期（年‑月‑日）：' : 'Date of birth (YYYY-MM-DD):';
  document.getElementById('timeLabel').textContent = currentLang === 'zh' ? '出生时间（24小时制）：' : 'Time of birth (24h HH:MM):';
  document.getElementById('submitBtn').textContent = currentLang === 'zh' ? '计算' : 'Calculate';
  document.getElementById('resultTitle').textContent = currentLang === 'zh' ? '八字排盘' : 'Your BaZi Chart';
  document.getElementById('personalityTitle').textContent = currentLang === 'zh' ? '性格与兴趣' : 'Personality & Interests';
  document.getElementById('fortuneTitle').textContent = currentLang === 'zh' ? '2025 年 8‑12 月流年' : 'Monthly Fortune (Aug–Dec 2025)';
  // if results already displayed, re-render in new language
  if (!document.getElementById('resultSection').classList.contains('hidden')) {
    const pillars = window.lastPillars;
    renderChart(pillars, currentLang);
    const personality = getPersonalityText(pillars[1][0], currentLang);
    document.getElementById('personality').textContent = personality;
    renderFortune(currentLang);
  }
}

document.getElementById('langToggle').addEventListener('click', toggleLanguage);

// Form submission handler
document.getElementById('baziForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const dateStr = document.getElementById('birthDate').value;
  const timeStr = document.getElementById('birthTime').value;
  if (!dateStr || !timeStr) return;
  const [year, month, day] = dateStr.split('-').map(n => parseInt(n, 10));
  const [hour, minute] = timeStr.split(':').map(n => parseInt(n, 10));
  // Create a date object in UTC
  const date = new Date(Date.UTC(year, month - 1, day));
  // Compute pillars
  const yearPillar = computeYearPillar(year);
  const monthPillar = computeMonthPillar(yearPillar[0], month);
  const dayPillar = computeDayPillar(date);
  const hourPillar = computeHourPillar(dayPillar[0], hour, minute);
  const pillars = [hourPillar, dayPillar, monthPillar, yearPillar];
  window.lastPillars = pillars; // save for re-render
  // Render chart
  renderChart(pillars, currentLang);
  // Personality
  const personality = getPersonalityText(dayPillar[0], currentLang);
  document.getElementById('personality').textContent = personality;
  // Fortune
  renderFortune(currentLang);
  // Show result section
  document.getElementById('resultSection').classList.remove('hidden');
});