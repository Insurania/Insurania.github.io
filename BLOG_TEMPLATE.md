# 博客文章模板使用指南

这是一个完整的博客文章模板，包含了所有常用的 Front Matter 字段和 Markdown 格式示例。

---

## Front Matter 字段说明

```toml
+++
# 必填字段
title = '文章标题'                    # 文章标题
date = 2026-03-15T10:00:00+08:00     # 发布日期
draft = false                         # 是否为草稿（true=草稿，false=发布）

# 分类系统
categories = ["技术", "生活"]         # 分类（可多个）
tags = ["Hugo", "博客", "教程"]       # 标签（可多个）
series = ["Hugo 建站系列"]            # 合集（可选，用于系列文章）

# SEO 和摘要
description = "这是一篇关于..."      # 文章描述，用于 SEO 和摘要

# 显示选项
ShowToc = true                        # 是否显示目录
ShowBreadCrumbs = true                # 是否显示面包屑导航
ShowPostNavLinks = true               # 是否显示上一篇/下一篇导航
ShowReadingTime = true                # 是否显示阅读时间

# 封面图片（可选）
[cover]
image = "/images/cover.jpg"           # 封面图片路径
alt = "封面图片描述"                  # 图片 alt 文本
caption = "图片说明"                  # 图片说明文字
relative = false                      # 是否使用相对路径
+++
```

---

## Markdown 格式示例

### 1. 标题

```markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
```

### 2. 文本格式

```markdown
**粗体文本**
*斜体文本*
***粗斜体文本***
~~删除线~~
`行内代码`
```

### 3. 引用

```markdown
> 这是一段引用文本
> 可以多行

> **提示**：这是一个带格式的引用
```

### 4. 列表

```markdown
# 无序列表
- 项目 1
- 项目 2
  - 子项目 2.1
  - 子项目 2.2

# 有序列表
1. 第一项
2. 第二项
3. 第三项
```

### 5. 代码块

````markdown
```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```
````

支持的语言：cpp, python, java, javascript, go, rust, bash, yaml, toml, json 等

### 6. 链接和图片

```markdown
# 链接
[链接文本](https://example.com)
[带标题的链接](https://example.com "鼠标悬停显示的标题")

# 图片
![图片描述](/images/example.jpg)
![图片描述](/images/example.jpg "图片标题")
```

### 7. 表格

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
| 内容4 | 内容5 | 内容6 |

# 对齐方式
| 左对齐 | 居中 | 右对齐 |
|:------|:----:|------:|
| 内容  | 内容 | 内容  |
```

### 8. 分隔线

```markdown
---
或
***
```

### 9. 任务列表

```markdown
- [x] 已完成的任务
- [ ] 未完成的任务
- [ ] 另一个任务
```

### 10. 脚注

```markdown
这是一段文本[^1]，这里有另一个脚注[^2]。

[^1]: 这是第一个脚注的内容
[^2]: 这是第二个脚注的内容
```

---

## 完整文章模板示例

```markdown
+++
title = 'Hugo 博客搭建完全指南'
date = 2026-03-15T10:00:00+08:00
draft = false
categories = ["技术"]
tags = ["Hugo", "博客", "建站"]
series = ["Hugo 建站系列"]
description = "从零开始搭建一个基于 Hugo 和 PaperMod 主题的个人博客"
ShowToc = true
+++

> **导语**：本文将详细介绍如何使用 Hugo 和 PaperMod 主题搭建一个功能完善的个人博客。

## 一、准备工作

在开始之前，你需要准备以下工具：

- Hugo（静态网站生成器）
- Git（版本控制）
- 文本编辑器（VS Code、Sublime Text 等）

### 1.1 安装 Hugo

根据你的操作系统选择合适的安装方式：

**Windows:**
```bash
choco install hugo-extended
```

**macOS:**
```bash
brew install hugo
```

**Linux:**
```bash
sudo apt install hugo
```

## 二、创建博客项目

使用以下命令创建一个新的 Hugo 项目：

```bash
hugo new site my-blog
cd my-blog
```

### 2.1 安装主题

我们使用 PaperMod 主题：

```bash
git submodule add https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
```

## 三、配置博客

编辑 `hugo.yaml` 文件，添加基本配置：

```yaml
baseURL: "https://yourdomain.com/"
title: "我的博客"
theme: PaperMod
languageCode: zh-cn
```

## 四、创建第一篇文章

```bash
hugo new posts/my-first-post.md
```

## 总结

通过以上步骤，你已经成功搭建了一个基于 Hugo 的个人博客。接下来可以：

1. 自定义主题样式
2. 添加评论系统
3. 配置 SEO 优化
4. 部署到 GitHub Pages

---

**参考资料：**
- [Hugo 官方文档](https://gohugo.io/documentation/)
- [PaperMod 主题文档](https://github.com/adityatelange/hugo-PaperMod)
```

---

## 快速创建新文章

使用 Hugo 命令快速创建新文章：

```bash
# 创建新文章（会自动使用 archetypes/default.md 模板）
hugo new posts/文章名.md

# 示例
hugo new posts/my-new-post.md
```

创建后的文章会自动填充基本的 Front Matter 字段，你只需要：
1. 填写 categories、tags、series 等字段
2. 将 draft 改为 false（发布文章）
3. 开始写作！

---

## 常用写作技巧

### 1. 使用导语吸引读者

```markdown
> **导语**：用一两句话概括文章的核心内容，吸引读者继续阅读。
```

### 2. 合理使用标题层级

- 一级标题（#）：文章标题（Front Matter 中的 title）
- 二级标题（##）：主要章节
- 三级标题（###）：子章节
- 四级标题（####）：更细的分类

### 3. 代码高亮

指定语言可以获得更好的代码高亮效果：

````markdown
```python
def hello_world():
    print("Hello, World!")
```
````

### 4. 添加图片

建议将图片放在 `static/images/` 目录下：

```markdown
![图片描述](/images/my-image.jpg)
```

### 5. 使用合集组织系列文章

如果你在写系列教程，使用 series 字段：

```toml
series = ["Python 入门教程"]
```

这样读者可以方便地找到系列中的其他文章。

---

## 预览和发布

### 本地预览

```bash
hugo server -D
```

访问 http://localhost:1313 预览效果。

### 发布文章

1. 将文章的 `draft` 改为 `false`
2. 提交到 Git 仓库
3. 推送到 GitHub（如果使用 GitHub Pages）

```bash
git add .
git commit -m "Add new post"
git push
```

---

祝你写作愉快！🎉
