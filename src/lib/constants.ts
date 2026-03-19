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
    description: 'Started Management Information Systems at Baylor University in Waco. The program sits at the intersection of business and technology — databases, systems design, enterprise software.',
    tags: [],
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
    title: 'Hermos v2',
    description: 'Dual-GPU server, Proxmox virtualization, 70B+ parameter local models. More compute, lower latency, broader deployment — the platform extended for multi-client use.',
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
  heading: 'Security review',
  description: 'Professional 9-phase security assessment. STRIDE threat model. 5 automated scanners. OWASP Top 10 + SANS Top 25 manual review. Every critical finding fixed.',
  stats: [
    { label: 'Findings audited',       value: '59'         },
    { label: 'Fixed',                  value: '45'         },
    { label: 'Critical findings open', value: '0'          },
    { label: 'Accepted risk',          value: '9'          },
    { label: 'Automated scanners',     value: '5'          },
    { label: 'Manual review',          value: 'OWASP + SANS' },
  ],
} as const;

export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Hermos', href: '/hermos' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const SOCIAL_LINKS = {
  github: 'https://github.com/eli-herman',
  linkedin: 'https://www.linkedin.com/in/eli-herman254/',
  email: 'mailto:hermos.dev@gmail.com',
} as const;

export const SKILLS = [
  { category: 'Languages', items: ['TypeScript', 'Python', 'JavaScript'] },
  { category: 'Frameworks', items: ['React Native', 'Next.js', 'Express', 'NativeWind'] },
  { category: 'Infrastructure', items: ['Docker', 'Cloudflare Tunnel', 'n8n', 'pm2'] },
  { category: 'AI/ML', items: ['Ollama', 'ChromaDB', 'Mem0', 'MCP Protocol'] },
  { category: 'DevOps', items: ['GitHub Actions', 'SOPS/age', 'Trivy', 'Semgrep', 'Datadog'] },
] as const;

export const SKILL_DESCRIPTIONS: Record<string, string> = {
  TypeScript:        'Primary language across all Hermos infrastructure, MCP server, and portfolio.',
  Python:            'Automation scripts, mem0 server, data pipelines, and AI tool integrations.',
  JavaScript:        'n8n workflow logic, Windows service wrappers, and utility scripts.',
  'React Native':    'UI layer for The Vine — family genealogy app built with Expo.',
  'Next.js':         'Framework powering this portfolio site with static generation and App Router.',
  Express:           'REST API backing the Quality Server — routes AI generation and vector search requests.',
  NativeWind:        'Tailwind CSS for React Native. Design tokens and spacing system for The Vine.',
  Docker:            'Container runtime for ChromaDB, Quality Server, and Caddy on the Windows home server.',
  'Cloudflare Tunnel':'Zero-trust public access to all 7 services — no port forwarding, works on any network.',
  n8n:               '29 automation workflows: memory sync, GitHub backups, health monitoring, alerts.',
  pm2:               'Process manager keeping 8 Windows services alive across reboots.',
  Ollama:            'Local LLM runtime — 7B on Mac, 14B on Windows GPU. Powers code generation and review.',
  ChromaDB:          'Vector database storing 13,659 documents across 6 knowledge domains.',
  Mem0:              'Persistent AI memory layer — stores facts across sessions for context continuity.',
  'MCP Protocol':    '27 custom tools bridging Claude Code to local models, ChromaDB, n8n, and vision APIs.',
  'GitHub Actions':  'CI/CD pipeline for automated testing, security scans, and Vercel deployments.',
  'SOPS/age':        'All credentials encrypted at rest — age key pair, zero plaintext secrets anywhere.',
  Trivy:             'Container image vulnerability scanner integrated into the security audit pipeline.',
  Semgrep:           'Static analysis with custom rules — part of the 9-phase security assessment.',
  Datadog:           'Infrastructure monitoring with GPU metrics, process tracking, and custom dashboards.',
};
