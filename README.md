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

## 目錄

- [與原專案的差異](#與原專案的差異)
- [安裝](#安裝)
- [維護者：同步原作者的更新](#維護者同步原作者的更新)
- [調整正體中文翻譯](#調整正體中文翻譯)

## 與原專案的差異

- **正體中文介面**：設定 › 外觀 › 語言 選「中文（繁體）」。系統語言為繁體中文（台灣、香港、澳門）時會自動套用。
- **翻譯自動產生**：`zh-TW.json` 由原專案的簡體翻譯轉換成台灣用語產生，原作者更新翻譯時，這裡也會跟著更新。

## 安裝

有兩種方式：**方法一**直接下載建置好的 Windows 安裝檔（建議）；**方法二**下載原始碼自己建置（macOS／Linux 只能用這個方式）。

> ⚠️ 自行建置的版本與官方 Orca 使用相同的應用程式識別碼，**安裝後會取代電腦上已安裝的官方 Orca**。
>
> ⚠️ Orca 內出現「有新版本」的更新提示時**請不要安裝**，那是官方版本，安裝後正體中文會消失。請依下方「之後要更新版本」的方式更新。

### 方法一：下載安裝檔（Windows）

1. 下載安裝檔：<https://github.com/WebplusTechTW/Webplus.ORCA/releases/download/windows-installer/webplus-orca-windows-setup.exe>（也可以到 [Releases](https://github.com/WebplusTechTW/Webplus.ORCA/releases/tag/windows-installer) 頁面查看版本與建置時間）。
2. 執行 `webplus-orca-windows-setup.exe`。
3. 安裝檔沒有數位簽章，Windows 會跳出「Windows 已保護您的電腦」，點 **其他資訊** › **仍要執行**。
4. 開啟 Orca → **設定** → **外觀** → **語言** → 選 **中文（繁體）**。

> 這個連結永遠指向最新的一版，要更新時重新下載安裝即可。

### 方法二：自行建置

以下以 **Windows** 為例，macOS／Linux 的差異列在最後。

#### 步驟 1：安裝必要工具（只需做一次）

依序安裝下列工具，安裝時都使用預設選項即可：

1. **Git**：<https://git-scm.com/download/win>
2. **Node.js 24**：<https://nodejs.org/>，下載「24.x」版本。
3. **Python 3**：<https://www.python.org/downloads/>，安裝時勾選 **Add python.exe to PATH**。
4. **Visual Studio Build Tools**：<https://visualstudio.microsoft.com/visual-cpp-build-tools/>，安裝時勾選 **使用 C++ 的桌面開發（Desktop development with C++）**。

裝好後，**開一個新的 PowerShell 視窗**，執行下列指令啟用 pnpm：

```powershell
corepack enable
```

確認工具都能使用（每行都應該印出版本號）：

```powershell
git --version
node --version     # 應為 v24.x
pnpm --version     # 應為 12.x
python --version
```

#### 步驟 2：下載原始碼

```powershell
cd D:\         # 換成你想放程式碼的資料夾
git clone https://github.com/WebplusTechTW/Webplus.ORCA.git
cd Webplus.ORCA
```

#### 步驟 3：安裝相依套件

```powershell
pnpm install
cd mobile
pnpm install
cd ..
```

`mobile` 資料夾是手機版的部分，打包桌面版時也需要它的相依套件。第一次執行需要幾分鐘。若出現 `node-gyp` 或 `Python` 相關錯誤，代表步驟 1 的 Python 或 Visual Studio Build Tools 沒有裝好。

#### 步驟 4：建置並安裝

```powershell
pnpm build:win
```

完成後執行 `dist\orca-windows-setup.exe`，照畫面完成安裝。

> 只想先試用、不安裝的話，改執行 `pnpm dev`，會直接開啟 Orca（關閉指令視窗即結束）。

#### 步驟 5：切換成正體中文

開啟 Orca → **設定** → **外觀** → **語言** → 選 **中文（繁體）**。

#### 之後要更新版本

在 `Webplus.ORCA` 資料夾執行：

```powershell
git pull
pnpm install
cd mobile
pnpm install
cd ..
pnpm build:win
```

再執行一次 `dist\orca-windows-setup.exe` 覆蓋安裝。

#### macOS／Linux 的差異

| | macOS | Linux |
| --- | --- | --- |
| 步驟 1 | 以 `xcode-select --install` 取代 Python 和 Visual Studio Build Tools | 以 `sudo apt install build-essential python3` 取代 Python 和 Visual Studio Build Tools |
| 步驟 4 | 先執行 `pnpm install:release`，再執行 `pnpm build:mac`，然後開啟 `dist/` 裡的 `.dmg` | `pnpm build:linux`，產出的 AppImage 在 `dist/` |

## 維護者：同步原作者的更新

一般使用者不需要看這一節。

### 分支結構

| 分支 | 內容 |
| --- | --- |
| `upstream/main` | 原作者 `stablyai/orca` 的 `main` 的原樣鏡像，不做任何修改 |
| `zh-tw` | `upstream/main` ＋ 正體中文語系（產生腳本、修正表、`zh-TW.json`） |
| `main` | 本專案的主分支：`zh-tw` ＋ 本專案自己的修改（README、Webplus workflow 等） |

更新方向固定為 `upstream/main` → `zh-tw` → `main`。翻譯相關的修改請做在 `zh-tw`，本專案自己的修改請做在 `main`。

### 自動同步（GitHub Actions）

[`webplus-upstream-sync.yml`](.github/workflows/webplus-upstream-sync.yml) 會在**每週一台灣時間 00:00**：

1. 把原作者最新的 `main` 更新到 `upstream/main`。
2. 把 `upstream/main` 合併到 `zh-tw`，重新產生 `zh-TW.json` 後推送。
3. 把 `zh-tw` 合併到 `main`。
4. `main` 更新後，[`webplus-build-windows.yml`](.github/workflows/webplus-build-windows.yml) 會建置 Windows 安裝檔，覆蓋到 [windows-installer Release](https://github.com/WebplusTechTW/Webplus.ORCA/releases/tag/windows-installer)。這個 Release 只保留最新一版，也不會過期。

注意事項：

- 想立刻同步：到 **Actions** › **Webplus upstream sync** › **Run workflow**。想重新建置安裝檔：到 **Actions** › **Webplus Windows installer** › **Run workflow**。
- **步驟 3 目前需要手動處理。**`main` 受組織規則保護（需要 PR 審核），workflow 沒有權限直接推送，會改成開一個 `zh-tw` → `main` 的 PR。組織目前也不允許 Actions 建立 PR，所以會在執行結果附上「建立 PR」的連結並標示為失敗。用連結建立 PR，並以 **Create a merge commit** 合併（**不要用 Squash 或 Rebase**）後，就會自動建置安裝檔。
- 要讓步驟 3 也自動完成，二選一：
  - 在 repo 的 **Settings › Secrets and variables › Actions** 新增 `WEBPLUS_SYNC_TOKEN`，值為有權限略過 `main` 保護規則的帳號的 token（需要 Contents、Pull requests 寫入權限）。
  - 請組織管理員調整 `main` 的保護規則，允許 GitHub Actions 略過，或允許 Actions 建立 PR（**Organization settings › Actions › General › Allow GitHub Actions to create and approve pull requests**）。
- 合併發生衝突時，workflow 會失敗並在執行結果列出衝突的檔案，請改用下面的手動方式處理。
- workflow 也會停用從原專案帶進來的其他 workflow（它們需要原作者的主機與金鑰，在這裡無法執行）。

### 手動同步

第一次在本機設定（只需做一次）：

```bash
git remote add upstream https://github.com/stablyai/orca.git
git remote set-url --push upstream DISABLE   # 避免不小心 push 到原作者的 repo
git config merge.ours.driver true            # 合併時保留本專案的 README
git fetch origin
git checkout -b zh-tw origin/zh-tw
```

每次同步：

```bash
# 1. 更新 upstream/main 鏡像
git fetch upstream
git push origin refs/remotes/upstream/main:refs/heads/upstream/main

# 2. 合併到 zh-tw 並重新產生正體中文
git checkout zh-tw
git pull origin zh-tw
git merge upstream/main
pnpm install
pnpm run sync:localization-zh-tw
git add src/renderer/src/i18n/locales/zh-TW.json
git commit -m "chore(i18n): 同步上游後重新產生 zh-TW 語系"   # 顯示 nothing to commit 時可略過
git push origin zh-tw

# 3. 合併到 main（main 受保護時，改到 GitHub 開 zh-tw → main 的 PR）
git checkout main
git pull origin main
git merge --no-ff zh-tw
git push origin main
```

發生衝突時：

- **README.md**（合併到 `main` 時）：執行 `git checkout --ours README.md && git add README.md`，保留本專案版本。
- **`locales/*.json` 的 `chineseTraditional` 那一行**（合併到 `zh-tw` 時）：保留雙方內容，也就是上游的變更加上這一行。
- **`zh-TW.json`**：不要手動合併，執行 `pnpm run sync:localization-zh-tw` 重新產生。
- 其他檔案：依一般 Git 衝突處理方式解決後執行 `git commit`。

## 調整正體中文翻譯

請在 **`zh-tw` 分支**修改 [`config/scripts/locale-zh-tw-overrides.mjs`](config/scripts/locale-zh-tw-overrides.mjs)，執行 `pnpm run sync:localization-zh-tw` 後 commit 並推送 `zh-tw`，再合併到 `main`。這個檔案有三種修正方式：

- `ZH_TW_TERM_OVERRIDES`：詞彙對照，依順序套用（例如 `['倉庫', '儲存庫']`）。較長的片語要放在它包含的通用詞前面。
- `ZH_TW_CONTEXT_RULES`：依英文原文判斷翻譯（例如英文是 item 時用「項目」，是 project 時用「專案」）。
- `ZH_TW_KEY_OVERRIDES`：直接指定某個 key 的翻譯，例如 `{ 'settings.appearance.language.title': '介面語言' }`。

**不要直接修改 `zh-TW.json`**，重新產生時會被覆蓋。

## 授權

本專案沿用原專案的 [MIT License](LICENSE)。原專案：[stablyai/orca](https://github.com/stablyai/orca)。
