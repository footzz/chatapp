# 🚀 前後端部署指南 - GitHub + Render

## 📋 部署架構

```
GitHub Repository
  ├── Frontend (Node.js + Express)
  │   ├── server.js
  │   ├── package.json
  │   └── frontend/
  │       ├── index.html
  │       ├── style.css
  │       └── script.js
  │
  └── Backend (Python + FastAPI)
      ├── main.py
      └── requirements.txt

        ↓ (連結到)

Render Services
  ├── Frontend Service (https://your-frontend.onrender.com)
  └── Backend Service (https://your-backend.onrender.com)
```

---

## 🔧 步驟 1: 推送到 GitHub

### 1.1 初始化 Git（如果還沒做）
```bash
cd simple-fullstack-render-demo
git init
```

### 1.2 添加所有文件
```bash
git add .
git commit -m "Initial commit: frontend and backend setup"
```

### 1.3 添加 GitHub Remote
```bash
# 使用 HTTPS（推薦新手）
git remote add origin https://github.com/YOUR_USERNAME/simple-fullstack-render-demo.git

# 或使用 SSH（如果已設置密鑰）
git remote add origin git@github.com:YOUR_USERNAME/simple-fullstack-render-demo.git
```

### 1.4 推送到 GitHub
```bash
git branch -M main
git push -u origin main
```

✅ 完成後，您的代碼就在 GitHub 上了。

---

## 🌐 步驟 2: 在 Render 部署前端

### 2.1 準備前端文件

✅ 已完成以下配置：
- `server.js` - Node.js + Express 服務器
- `package.json` - 依賴配置
- `render.yaml` - Render 多服務配置

### 2.2 在 Render 上部署

#### 方式 A: 使用 render.yaml（推薦）

1. 登入 [Render Dashboard](https://dashboard.render.com/)
2. 點擊 **New** → **Web Service**
3. 選擇 **Connect a repository**
4. 選擇您的 GitHub 仓库
5. 設置：
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
6. 點擊 **Deploy**

✅ Render 會自動讀取 `render.yaml` 配置

#### 方式 B: 手動配置前端服務

1. 進入 Render Dashboard
2. 新建 Web Service
3. 連接 GitHub 倉庫
4. 設置：
   ```
   Name: simple-fullstack-frontend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

---

## 🔙 步驟 3: 在 Render 部署後端

### 3.1 方式 A: 使用 render.yaml（推薦）

render.yaml 已包含後端配置，Render 會自動部署。

### 3.2 方式 B: 手動配置後端服務

如果之前已經有後端服務，只需確保：

```
Build Command: pip install -r backend/requirements.txt
Start Command: cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

## 🔗 步驟 4: 連接前後端

### 4.1 更新前端 API URL

部署完成後，Render 會給您服務 URL：
- 前端: `https://your-frontend.onrender.com`
- 後端: `https://your-backend.onrender.com`

編輯 `frontend/script.js`，更新 API URL：

```javascript
// 部署前（本機測試）
const API_URL = "http://localhost:8000";

// 部署後（Render）
const API_URL = "https://your-backend.onrender.com";
```

✅ 保存並推送到 GitHub：
```bash
git add frontend/script.js
git commit -m "Update API URL for Render deployment"
git push
```

Render 會自動重新部署。

---

## ✅ 部署檢查清單

- [ ] 代碼推送到 GitHub
- [ ] 前端服務在 Render 上運行
  - [ ] 能打開前端 URL
  - [ ] 頁面能正常顯示
- [ ] 後端服務在 Render 上運行
  - [ ] 能訪問 `/` 返回 "Backend is running!"
  - [ ] 能訪問 `/docs` 看到 FastAPI Docs
- [ ] 前端能成功調用後端 API
  - [ ] 輸入消息能收到回復
  - [ ] 沒有 CORS 錯誤

---

## 🔍 常見問題

### Q1: 部署後頁面顯示空白？
**A:** 檢查瀏覽器 Console (F12)，查看是否有錯誤。通常是 API URL 未更新。

### Q2: 後端返回 CORS 錯誤？
**A:** 檢查 `backend/main.py` 中的 CORS 配置：
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允許所有來源（生產環境應改為具體 URL）
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Q3: Render 上後端無法啟動？
**A:** 檢查日誌：
1. Render Dashboard → 選擇後端服務
2. 點擊 **Logs** 查看錯誤信息

常見原因：
- 缺少 `requirements.txt`
- Python 版本不兼容
- 啟動命令錯誤

### Q4: 如何更新部署代碼？
**A:** 只需推送到 GitHub，Render 會自動檢測並重新部署：
```bash
git add .
git commit -m "Your message"
git push
```

---

## 📱 測試已部署的應用

### 前端
```
打開瀏覽器：https://your-frontend.onrender.com
```

### 後端 API
```
GET https://your-backend.onrender.com/
GET https://your-backend.onrender.com/docs
POST https://your-backend.onrender.com/api/message
```

### 測試訊息發送
1. 打開前端頁面
2. 輸入 "hello"
3. 點擊 Send
4. 應該收到回復："Hello! 很高興認識你！"

---

## 🎯 下一步

- [ ] 自定義前端設計（修改 `frontend/style.css`）
- [ ] 擴展後端功能（修改 `backend/main.py`）
- [ ] 添加數據庫（如 SQLite、PostgreSQL）
- [ ] 實現用戶認證

祝您部署順利！🚀
