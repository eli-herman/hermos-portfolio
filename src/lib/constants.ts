export const STATS = [
  { value: '13,659', label: 'Documents indexed', icon: 'Database' },
  { value: '29', label: 'Automation workflows', icon: 'Workflow' },
  { value: '27', label: 'AI tools per session', icon: 'Wrench' },
  { value: '7', label: 'Tunnel endpoints', icon: 'Globe' },
  { value: '14B', label: 'Parameter local model', icon: 'Cpu' },
] as const;

export const TIMELINE_ENTRIES = [
  {
    date: '2022',
    title: 'Baylor MIS',
    description: 'Started Management Information Systems at Baylor University. First exposure to building systems, not just using them.',
    tags: [],
  },
  {
    date: 'Summer 2023',
    title: 'Financial Analyst Intern',
    description: 'Data analysis and financial modeling internship. Built tools to automate reporting workflows.',
    tags: ['Excel', 'Python', 'Data Analysis'],
  },
  {
    date: '2023',
    title: 'LumaCharts Pro',
    description: 'Interactive financial dashboard with live market data, custom dark theme, and real-time stock analysis.',
    tags: ['Python', 'Dash', 'Plotly', 'yfinance'],
    link: 'https://financial-dashboard-zwwj.onrender.com',
  },
  {
    date: '2024',
    title: 'U.S. Fiscal Health Dashboard',
    description: 'Federal debt visualization with ML-powered forecasting using U.S. Treasury API data and scikit-learn models.',
    tags: ['Python', 'Dash', 'Plotly', 'Scikit-learn'],
    link: 'https://fiscal-dashboard.onrender.com',
  },
  {
    date: '2024',
    title: 'Market Analysis Tool',
    description: 'Market comparison engine with TensorFlow-powered predictions for financial instrument analysis.',
    tags: ['JavaScript', 'Node.js', 'TensorFlow'],
  },
  {
    date: '2024',
    title: 'Portfolio Optimizer',
    description: 'Mathematical portfolio optimization using modern portfolio theory. Efficient frontier calculation and risk analysis.',
    tags: ['Python', 'NumPy', 'SciPy'],
  },
  {
    date: 'Feb 2026',
    title: 'Hermos v1.0',
    description: 'Shipped the first version: SOPS credential store, authenticated bridge, 6-domain knowledge base with 2,570+ documents, 93-item capability audit.',
    tags: ['TypeScript', 'Express', 'ChromaDB', 'SOPS'],
  },
  {
    date: 'Mar 2026',
    title: 'Hermos v1.1',
    description: 'Global connectivity: Cloudflare Tunnel, Docker Engine in WSL2, Datadog monitoring with GPU metrics, M.2 NVMe migration.',
    tags: ['Docker', 'Cloudflare', 'Datadog', 'WSL2'],
  },
  {
    date: 'Mar 2026',
    title: 'Hermos v1.2',
    description: 'Knowledge pipeline, professional security audit, MCP integrations, Hermos rebrand. 27 AI tools, 13,659 indexed documents.',
    tags: ['MCP', 'Security', 'ChromaDB', 'n8n'],
  },
  {
    date: 'Active',
    title: 'The Vine',
    description: 'React Native family genealogy app. NativeWind v4 design system, Firebase backend, Lucid API diagram generation.',
    tags: ['React Native', 'Expo', 'NativeWind', 'Firebase'],
  },
  {
    date: 'Next',
    title: 'First B2B Client',
    description: 'AI-powered infrastructure consulting. Ship in days what agencies quote in weeks.',
    tags: [],
  },
] as const;

export const PROJECTS = {
  hermos: {
    name: 'Hermos',
    tagline: 'AI Company OS',
    description: 'The operating system for a one-person AI company. 27 AI tools, 13,659 indexed documents, 29 automation workflows, dual-device topology with a 14B parameter local model.',
    tags: ['TypeScript', 'Docker', 'ChromaDB', 'n8n', 'Cloudflare', 'MCP'],
    link: '/hermos',
  },
  vine: {
    name: 'The Vine',
    tagline: 'Family genealogy app',
    description: 'React Native app for building and exploring family trees. NativeWind v4 design system, Firebase backend, Lucid API diagram generation.',
    tags: ['React Native', 'Expo', 'NativeWind', 'Firebase'],
    link: null,
  },
} as const;

export const SECURITY_AUDIT = {
  heading: 'Security-audited from day one',
  description: 'Professional 9-phase security assessment. STRIDE threat model. 5 automated scanners. OWASP Top 10 + SANS Top 25 manual review. Every critical finding fixed.',
  stats: [
    { label: 'Assessment phases', value: '9' },
    { label: 'Threat model', value: 'STRIDE' },
    { label: 'Automated scanners', value: '5' },
    { label: 'Manual review standards', value: 'OWASP + SANS' },
    { label: 'Critical findings', value: 'All fixed' },
    { label: 'Controls verified', value: '15' },
  ],
} as const;

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Hermos', href: '/hermos' },
  { label: 'About', href: '/about' },
] as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/eli-j-herman',
  linkedin: 'https://linkedin.com/in/eli-herman',
  email: 'mailto:eli@hermos.dev',
} as const;

export const SKILLS = [
  { category: 'Languages', items: ['TypeScript', 'Python', 'JavaScript'] },
  { category: 'Frameworks', items: ['React Native', 'Next.js', 'Express', 'NativeWind'] },
  { category: 'Infrastructure', items: ['Docker', 'Cloudflare Tunnel', 'n8n', 'pm2'] },
  { category: 'AI/ML', items: ['Ollama', 'ChromaDB', 'Mem0', 'MCP Protocol'] },
  { category: 'DevOps', items: ['GitHub Actions', 'SOPS/age', 'Trivy', 'Semgrep', 'Datadog'] },
] as const;
