// Taiwan-terminology fixes applied after OpenCC `cn → twp`. Add a term here
// when OpenCC leaves Mainland phrasing, then run `pnpm run sync:localization-zh-tw`.

// Applied in order, so a specific phrase must come before the general term it contains.
export const ZH_TW_TERM_OVERRIDES = [
  // Phrases that must win before their general term below.
  ['許可協議', '授權合約'],
  ['退出登入', '登出'],
  ['您已退出', '您已登出'],
  ['配置檔案', '設定檔'],
  ['依賴項', '相依套件'],
  ['依賴關係', '相依性'],
  ['系統托盤', '系統匣'],
  ['檔案資源管理器', '檔案總管'],
  ['守護程序', '常駐程式'],
  ['許可權', '權限'],
  ['標籤頁', '分頁'],
  ['選項卡', '分頁'],
  ['文本框', '文字方塊'],
  ['輸入框', '輸入欄位'],
  ['用戶名', '使用者名稱'],
  ['二維碼', 'QR 碼'],
  ['優先級', '優先順序'],
  ['全屏', '全螢幕'],
  ['重命名', '重新命名'],

  // General terms.
  ['智慧體', '代理'],
  ['倉庫', '儲存庫'],
  ['會話', '工作階段'],
  ['令牌', '權杖'],
  ['訪問', '存取'],
  ['當前', '目前'],
  ['響應', '回應'],
  ['丟失', '遺失'],
  ['跟蹤', '追蹤'],
  ['檢出', '簽出'],
  ['計算機', '電腦'],
  ['後臺', '背景'],
  ['前臺', '前景'],
  ['身份', '身分'],
  ['憑據', '憑證'],
  ['臺', '台'],
  ['協議', '協定'],
  ['地址', '位址'],
  ['郵件位址', '郵件地址'],
  ['配置', '設定'],
  ['設定設定', '設定'],
  ['命令', '指令'],
  ['指令列', '命令列'],
  ['指令行', '命令列'],
  ['本地', '本機'],
  ['克隆', '複製'],
  ['模板', '範本'],
  ['構建', '建置'],
  ['示例', '範例'],
  ['賬', '帳'],
  ['運行', '執行'],
  ['文本', '文字'],
  ['圖標', '圖示'],
  ['列表', '清單'],
  ['保存', '儲存'],
  ['打開', '開啟'],
  ['發送', '傳送'],
  ['禁用', '停用'],
  ['頭像', '大頭貼'],
  ['自定義', '自訂'],
  ['視圖', '檢視'],
  ['工具欄', '工具列'],
  ['標題欄', '標題列'],
  ['滾動', '捲動'],
  ['拖拽', '拖曳'],
  ['高亮', '醒目提示'],
  ['回滾', '復原'],
  ['重置', '重設'],
  ['獲取', '取得'],
  ['添加', '新增'],
  ['新建', '新增'],
  ['條目', '項目'],
  ['選中', '選取'],
  ['郵箱', '電子郵件'],
  ['搜索', '搜尋'],
  ['單元格', '儲存格'],
  ['撤消', '復原'],
  ['反饋', '意見回饋'],
  ['打印', '列印'],
  ['掃碼', '掃描'],
  ['快捷方式', '捷徑'],
  ['托盤', '系統匣'],
  ['退出', '結束'],
  ['移動端', '行動裝置'],
  ['拖動', '拖曳'],
  ['回車', 'Enter'],
  ['客戶端', '用戶端'],
  // Taiwan uses corner brackets for quotations.
  ['“', '「'],
  ['”', '」']
]

// Context rules for terms whose Taiwan rendering depends on the English meaning.
export const ZH_TW_CONTEXT_RULES = [
  // OpenCC renders 项目 as 專案 even where the source means "item".
  { english: /\bitems?\b/i, unlessEnglish: /\bprojects?\b/i, from: '專案', to: '項目' },
  // Taiwan uses 分頁 for UI tabs and keeps 標籤 for labels/tags.
  { english: /\btabs?\b/i, unlessEnglish: /\b(labels?|tags?|chips?)\b/i, from: '標籤', to: '分頁' },
  // 通過 means "passed"; "through/via" is 透過 in Taiwan.
  { english: /\b(through|via)\b/i, unlessEnglish: /\bpass(es|ed)?\b/i, from: '通過', to: '透過' }
]

// Exact per-key values for one-off strings the rules above cannot express.
export const ZH_TW_KEY_OVERRIDES = {}
