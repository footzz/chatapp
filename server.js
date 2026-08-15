// 簡單的 Node.js Express 服務器，用來提供前端靜態文件
// 這樣可以在 Render 上部署前端

const express = require('express');
const path = require('path');
const app = express();

// 提供靜態文件（frontend 資料夾）
app.use(express.static(path.join(__dirname, 'frontend')));

// 所有其他路由都返回 index.html（SPA 路由支持）
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// 啟動服務器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Frontend server is running on http://localhost:${PORT}`);
});
