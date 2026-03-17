# Excalidraw Reference Specification for Hermos C4 Diagrams

> Build both diagrams in [Excalidraw](https://excalidraw.com). Set canvas background to **#0A0A0A** (dark mode). Export each as SVG with dark background checked.

---

## Design Tokens (Apply in Excalidraw)

| Element | Color | Notes |
|---------|-------|-------|
| Canvas background | `#0A0A0A` | Set in Excalidraw dark mode settings |
| Container box fill | `#141414` | Rounded rectangle, border radius ~8px |
| Container box stroke | `#262626` | 2px stroke width |
| Device group box fill | transparent | Dashed border only |
| Device group box stroke | `#333333` | Dashed, 2px stroke |
| Heading text | `#FAFAFA` | Container name, section titles |
| Description text | `#A0A0A0` | Purpose, summary text |
| Port / detail text | `#666666` | Port numbers, runtime labels |
| Arrows / connections | `#3B82F6` | 2px stroke, arrowhead |
| External system fill | `#1A1A2E` | Slightly different shade for external |
| Font | System sans-serif | Use Excalidraw default font |

---

## 1. Simplified C4 Diagram (c4-simplified.svg)

**Title:** "Hermos Platform" (top center, `#FAFAFA`, large)
**Subtitle:** "Service Architecture" (below title, `#A0A0A0`, medium)

### Layout

- viewBox approximately 600px wide x 500px tall
- 5 layer boxes arranged **vertically**, centered
- Each layer box: ~500px wide, ~60px tall
- 20px vertical gap between layers
- Arrows between layers on the right side or between boxes

### Layer Boxes (top to bottom)

| # | Label (bold, #FAFAFA) | Contents (#A0A0A0, smaller) | Icon hint |
|---|------|-----------|----|
| 1 | AI Layer | Ollama 7b (Mac) + 14b (Windows), Quality Server | brain/cpu |
| 2 | Memory | ChromaDB (13,659 docs) + Mem0 | database |
| 3 | Automation | n8n (29 workflows) + Agent Bridges | workflow/gear |
| 4 | Connectivity | Cloudflare Tunnel (7 endpoints) + Tailscale | globe/network |
| 5 | Monitoring | Datadog Agent + GitHub Actions | chart/eye |

### Arrows (use #3B82F6)

| From | To | Label |
|------|----|-------|
| AI Layer | Memory | "vector queries" |
| AI Layer | Automation | "task execution" |
| Automation | Connectivity | "external access" |
| Monitoring | (all layers) | "observability" (single arrow spanning right side) |

### Style Notes

- Each layer box: `#141414` fill, `#262626` border, rounded corners
- Layer label on the left, contents summary on the right (or centered with label above contents)
- Keep it clean and simple -- 5 boxes, 4 arrows, title + subtitle
- The monitoring "observability" arrow can be a vertical line on the right side spanning all layers

---

## 2. Full-Detail C4 Diagram (c4-full.svg)

**Title:** "Hermos Platform -- Container Diagram" (top center, `#FAFAFA`, large)

### Layout

- viewBox approximately 900px wide x 700px tall
- Two device group boxes side by side at the top
- External services row at the bottom
- Container boxes inside each device group: ~140px wide x 65px tall
- Container box format: Name (bold) / Port / Description (smaller)

### Device Group: Mac (left side)

Dashed border, label: "MacBook Pro" (`#FAFAFA`, top-left corner of dashed box)

| Container | Port | Description |
|-----------|------|-------------|
| Claude Code | -- | CLI development interface |
| MCP Server | stdio | 27 tools |
| Ollama | :11434 | 7b model (fallback) |

3 boxes arranged vertically inside the Mac group box.

### Device Group: Windows PC (right side)

Dashed border, label: "Windows PC (100.84.195.93)" (`#FAFAFA`, top-left corner)

| Container | Port | Runtime | Description |
|-----------|------|---------|-------------|
| Quality Server | :4000 | Docker | Ollama + ChromaDB API |
| ChromaDB | :8000 | Docker | Vector DB, 13,659 docs |
| Caddy | :9443 | Docker | Reverse proxy |
| Ollama | :11434 | Native | 14B, RTX 4060 Ti |
| n8n | :5680 | pm2 | 29 workflows |
| Mem0 | :8010 | pm2 | Long-term memory |
| Windows Claude Bridge | :3200 | pm2 | Agent SDK bridge |

7 boxes arranged in a 2-column or 3-row grid inside the Windows group box.
- Docker containers (top row): Quality Server, ChromaDB, Caddy
- Native services (bottom rows): Ollama, n8n, Mem0, Windows Claude Bridge
- Use a subtle label or divider to distinguish "Docker" vs "pm2" services

### External Services (bottom row)

5 boxes in a horizontal row below both device groups. Use `#1A1A2E` fill (slightly different from containers).

| Service | Description |
|---------|-------------|
| Cloudflare Tunnel | 7 HTTPS endpoints |
| Tailscale | Encrypted LAN |
| GitHub | Actions + CI |
| Datadog | Monitoring + GPU |
| Vercel | Telegram relay |

### Arrows (use #3B82F6, labeled)

| From | To | Label |
|------|----|-------|
| Mac MCP Server | Windows Quality Server | "generate, search, embed" |
| Mac | Windows (general) | "SSH (CF Tunnel)" |
| n8n | Mac (implied bridge) | "webhook tasks" |
| n8n | Windows Claude Bridge | "automation tasks" |
| Quality Server | ChromaDB | "vector queries" |
| Quality Server | Ollama 14b | "inference" |
| Mem0 | ChromaDB | "mem0 collection" |
| Cloudflare Tunnel | (spanning to 7 endpoints) | "HTTPS endpoints" |
| GitHub | (general) | "security scans" |

### Container Box Template

Each container box should follow this format inside the rounded rectangle:

```
+---------------------------+
| Container Name      :PORT |
| Runtime label             |
| Short description         |
+---------------------------+
```

- Name: `#FAFAFA`, bold
- Port: `#666666`, after name
- Runtime: `#666666`, small (e.g., "Docker" or "pm2")
- Description: `#A0A0A0`, small

---

## Export Instructions

1. Open [excalidraw.com](https://excalidraw.com)
2. Set canvas background to `#0A0A0A` (Excalidraw settings > dark mode, then adjust background color)
3. Build each diagram using the specifications above
4. Export: Menu > Export > SVG
   - Check "Dark background" / "Include background"
   - File names: `c4-simplified.svg` and `c4-full.svg`
5. Save exported SVGs to:
   - `hermos-portfolio/public/diagrams/c4-simplified.svg` (replace placeholder)
   - `hermos-portfolio/public/diagrams/c4-full.svg` (replace placeholder)
6. Copy `c4-full.svg` to `dev-os/docs/c4-container-diagram.svg` for README

---

## Verification Checklist

After exporting, verify:

- [ ] Both SVGs have `#0A0A0A` background (or dark equivalent)
- [ ] Simplified: all 5 layer labels visible (AI Layer, Memory, Automation, Connectivity, Monitoring)
- [ ] Simplified: arrows between layers present
- [ ] Full-detail: all containers present with correct ports
- [ ] Full-detail: Mac and Windows device groups clearly labeled
- [ ] Full-detail: external services row at bottom
- [ ] Full-detail: data flow arrows labeled
- [ ] Both SVGs render in browser at reasonable dimensions
- [ ] Text is readable at 100% zoom

---

## Complete Container Inventory (from CLAUDE.md)

This is the authoritative list of every container that must appear in the full-detail diagram:

### Mac Device
1. **Claude Code** (CLI) -- primary development interface
2. **MCP Server** (stdio, 27 tools) -- bridge to all services
3. **Ollama** (:11434) -- qwen2.5-coder:7b, local fallback model

### Windows Device -- Docker (WSL2 Ubuntu)
4. **Quality Server** (:4000) -- Ollama + ChromaDB API, semantic search
5. **ChromaDB** (:8000) -- Vector database, 13,659 docs, E:\chromadb-data NVMe
6. **Caddy** (:9443) -- Funnel reverse proxy (Tailscale TLS termination)
7. **DIUN** (no port) -- Docker Image Update Notifier, Gmail alerts

### Windows Device -- Native/pm2
8. **Ollama** (:11434) -- qwen2.5-coder:14b, RTX 4060 Ti 8GB
9. **n8n** (:5680) -- 29 workflows, 9 prefixes
10. **Mem0** (:8010) -- Semantic long-term memory (qwen2.5:3b extraction)
11. **Windows Claude Bridge** (:3200) -- Agent SDK bridge for Mac delegation
12. **Caddy (n8n TLS)** (:5678) -- TLS termination for n8n
13. **ollama-warmup** (no port) -- Pre-loads 14b into VRAM at boot
14. **cloudflare-health** (no port) -- Pings *.dev-os.dev every 5 min
15. **auto-sync-server** (:3001) -- GitHub push webhook receiver
16. **memory-watcher** (no port) -- File watcher, regenerates MEMORY.md

### External Services
17. **Cloudflare Tunnel** -- 7 permanent HTTPS endpoints: n8n.dev-os.dev, qs.dev-os.dev, chromadb.dev-os.dev, mem0.dev-os.dev, claude-bridge.dev-os.dev, sync.dev-os.dev, ssh.dev-os.dev
18. **Tailscale** -- Encrypted LAN between Mac + Windows
19. **GitHub** -- Version control, GitHub Actions (Semgrep, Trivy, TruffleHog security scans), Renovate Bot
20. **Datadog** -- Host metrics (4 monitors), GPU NVML, APM traces from QS via dd-trace
21. **Vercel** -- Telegram relay (devos-telegram-relay.vercel.app)

### Cloudflare Tunnel Endpoints (all 7)

| Hostname | Service | Internal Port |
|----------|---------|---------------|
| n8n.dev-os.dev | n8n dashboard | :5680 |
| qs.dev-os.dev | Quality Server API | :4000 |
| chromadb.dev-os.dev | ChromaDB | :8000 |
| mem0.dev-os.dev | Mem0 | :8010 |
| claude-bridge.dev-os.dev | Windows Claude Bridge | :3200 |
| sync.dev-os.dev | Git sync webhook | :3001 |
| ssh.dev-os.dev | SSH | :22 |

**Note for diagram clarity:** Not all 16 Windows services need to appear individually in the full-detail diagram. Focus on the 7 primary services (Quality Server, ChromaDB, Caddy, Ollama, n8n, Mem0, Windows Claude Bridge). Supporting services (DIUN, ollama-warmup, cloudflare-health, auto-sync-server, memory-watcher, Caddy n8n TLS) can be mentioned as a footnote or omitted to avoid clutter (per Pitfall 7: max ~15 boxes in full version).
