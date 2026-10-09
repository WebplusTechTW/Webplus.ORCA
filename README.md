<h1 align="center">
  <img src="resources/build/icon.png" alt="Orca" width="64" valign="middle" /> Webplus.ORCA
</h1>

<p align="center">
  <a href="https://github.com/stablyai/orca">stablyai/orca</a> 的 Webplus 分支（fork），加上<strong>正體中文（台灣用語）</strong>介面。
</p>

<p align="center">
  <img src="docs/assets/readme-hero.jpg" alt="Orca 桌面應用程式在多個 worktree 中平行執行代理" width="960" />
</p>

Orca 是一套 AI 代理協作工具：可以同時執行 Codex、Claude Code、OpenCode 等代理，每個代理在自己的 worktree 中工作，並集中管理。功能介紹請見[原專案 README](https://github.com/stablyai/orca#readme)。

## 與原專案的差異

| 項目 | 說明 |
| --- | --- |
| 正體中文介面 | 設定 › 外觀 › 語言 選「中文（繁體）」。系統語言為 zh-TW／zh-HK／zh-MO／zh-Hant 時會自動套用。 |
| 翻譯來源 | `zh-TW.json` 由簡體 `zh.json` 經 OpenCC（台灣用語）轉換，再套用 [`locale-zh-tw-overrides.mjs`](config/scripts/locale-zh-tw-overrides.mjs) 的台灣用語修正表產生，不需手動維護。 |

## 從 GitHub clone 後安裝

### 1. 事前準備

| 工具 | 版本 | 備註 |
| --- | --- | --- |
| [Git](https://git-scm.com/) | 2.25 以上 | |
| [Node.js](https://nodejs.org/) | 24 | 版本需與 `package.json` 的 `engines.node` 一致 |
| [pnpm](https://pnpm.io/installation) | 12 | 執行 `corepack enable` 即會依 `packageManager` 使用正確版本 |
| [Bun](https://bun.sh/) | 見 [`config/.bun-version`](config/.bun-version) | 用於執行測試 |

編譯原生模組另外需要：

- **Windows**：[Python 3](https://www.python.org/downloads/)，以及 [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/)（勾選「使用 C++ 的桌面開發」）。
- **macOS**：`xcode-select --install`。
- **Linux**：`build-essential`、`python3`。

### 2. Clone 並設定上游

```bash
git clone https://github.com/WebplusTechTW/Webplus.ORCA.git
cd Webplus.ORCA

# 加入原作者的 repo 作為 upstream，之後用來取得更新
git remote add upstream https://github.com/stablyai/orca.git
git fetch upstream

# 避免不小心 push 到原作者的 repo
git remote set-url --push upstream DISABLE

# 合併上游時保留本專案的 README（只需設定一次）
git config merge.ours.driver true
```

設定完成後的對應關係：

| 本機參照 | 對應遠端 | 用途 |
| --- | --- | --- |
| `origin/main` | `WebplusTechTW/Webplus.ORCA` 的 `main` | 本專案（含正體中文） |
| `upstream/main` | `stablyai/orca` 的 `main` | 原作者的最新版本 |

### 3. 安裝相依套件並啟動

```bash
pnpm install
pnpm dev        # 開發模式啟動
```

### 4. 打包安裝檔（選用）

```bash
pnpm build:win     # Windows
pnpm build:mac     # macOS（會同時打包 x64 與 arm64，請先執行 pnpm install:release）
pnpm build:linux   # Linux
```

產出的安裝檔在 `dist/` 目錄。

## 同步原作者的更新

原作者更新後，依下列步驟把更新合併進本專案。

### 方法一：命令列（建議）

```bash
git checkout main
git pull origin main          # 先取得本專案最新狀態
git fetch upstream
git merge upstream/main       # 合併原作者的更新

pnpm install                  # 上游可能更新了相依套件
pnpm run sync:localization-zh-tw   # 依最新的簡體翻譯重新產生正體中文

git add src/renderer/src/i18n/locales/zh-TW.json
git commit -m "chore(i18n): 同步上游後重新產生 zh-TW 語系"   # zh-TW 沒有變動時會顯示 nothing to commit，可略過
git push origin main
```

### 方法二：GitHub 網頁

1. 到 [Webplus.ORCA](https://github.com/WebplusTechTW/Webplus.ORCA) 頁面，點 **Sync fork** › **Update branch**。
2. 網頁同步不會重新產生正體中文，所以要在本機再做一次：

   ```bash
   git pull origin main
   pnpm install
   pnpm run sync:localization-zh-tw
   git add src/renderer/src/i18n/locales/zh-TW.json
   git commit -m "chore(i18n): 同步上游後重新產生 zh-TW 語系"
   git push origin main
   ```

也可以用 GitHub CLI 取代步驟 1：`gh repo sync WebplusTechTW/Webplus.ORCA -b main`。

### 發生衝突時

- **README.md**：已透過 `.gitattributes` 設定自動保留本專案版本。若仍出現衝突（代表沒有執行 `git config merge.ours.driver true`），執行 `git checkout --ours README.md && git add README.md`。
- **`locales/*.json` 的 `chineseTraditional` 那一行**：保留雙方內容，也就是上游的變更加上這一行。
- **`zh-TW.json`**：不要手動合併，直接執行 `pnpm run sync:localization-zh-tw` 重新產生。
- 其他檔案：依一般 Git 衝突處理方式解決後，執行 `git commit`。

### 確認同步結果

```bash
pnpm run verify:localization-zh-tw   # 確認 zh-TW 與 zh 同步
pnpm test                            # 執行測試
```

## 調整正體中文翻譯

覺得某個詞不夠台灣用語時，修改 [`config/scripts/locale-zh-tw-overrides.mjs`](config/scripts/locale-zh-tw-overrides.mjs)，再執行 `pnpm run sync:localization-zh-tw`。這個檔案有三種修正方式：

- `ZH_TW_TERM_OVERRIDES`：詞彙對照，依順序套用（例如 `['倉庫', '儲存庫']`）。較長的片語要放在它包含的通用詞前面。
- `ZH_TW_CONTEXT_RULES`：依英文原文判斷翻譯（例如英文是 item 時用「項目」，是 project 時用「專案」）。
- `ZH_TW_KEY_OVERRIDES`：直接指定某個 key 的翻譯，例如 `{ 'settings.appearance.language.title': '介面語言' }`。

**不要直接修改 `zh-TW.json`**，重新產生時會被覆蓋。

## 授權

本專案沿用原專案的 [MIT License](LICENSE)。原專案：[stablyai/orca](https://github.com/stablyai/orca)。
