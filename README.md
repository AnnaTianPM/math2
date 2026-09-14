# Math Land 数学小天地

给小朋友用的数学练习网页。纯静态，不需要服务器，直接打开 `index.html` 或用 GitHub Pages 托管。

## 功能

- **学一学**：每个知识点的例题分步讲解（点"下一步"逐步出现，带动画和朗读）
- **练一练**：课本练习题，一屏一题，键盘输入，回车提交，立即判分
- **无限练习**：按同样题型随机出新题，想练多少练多少
- **错题本**：做错的题自动收录，重做连对两次自动移出
- **进度**：每个知识点的星星和完成情况

进度和错题保存在浏览器本地（localStorage），可以在"我的进度"页导出备份。

## 目录

```
index.html          页面骨架
css/style.css       样式
js/store.js         本地存储（进度、错题本）
js/numwords.js      数字 <-> 英文单词
js/blocks.js        百十个方块绘图（SVG）
js/data/units.js    课程数据：单元 -> 知识点 -> 例题 / 练习 / 出题器
js/app.js           页面逻辑
```

## 添加新知识点

在 `js/data/units.js` 里对应单元的 `kps` 数组中加一项，包含 `examples`、`sections`（练习题）和 `generate`（出题器），并把 `available` 设为 `true`。
