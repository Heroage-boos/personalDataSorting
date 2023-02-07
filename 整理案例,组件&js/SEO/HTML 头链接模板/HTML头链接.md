[家](https://www.30secondsofcode.org/)[HTML](https://www.30secondsofcode.org/[lang]/s/null/p/1)[HTML 头链接模板](https://www.30secondsofcode.org/articles/s/html-head-links)

![img](https://www.30secondsofcode.org/assets/icons/blog.svg)

# 推荐的 HTML 头链接

Webdev、HTML、浏览器·2023 年 1 月 26 日

![img](https://www.30secondsofcode.org/assets/blog_images/boutique-home-office-4.jpg)

HTML 文档的`<head>`元素是您可以包含指向外部资源（如 CSS 样式表和 JavaScript 文件）的链接的地方。但是，某些`<link>`元素对于 SEO 和元数据目的很重要。以下是我想包括的一些非常重要的列表：

```html
<head>
  <link rel="canonical" href="https://samplesite.com/page.html">
  <link rel="sitemap" type="application/xml" href="https://samplesite.com/sitemap.xml">
  <link rel="alternate" type="application/rss+xml" title="RSS" href="https://samplesite.com/rss.xml">
  <link rel="search" type="application/opensearchdescription+xml" title="Search" href="https://samplesite.com/search.xml">
</head>
```

- `canonical`link 元素告诉搜索引擎哪个 URL 是页面的规范**版本**。这有助于防止重复内容问题并确保正确的页面被编入索引。
- 链接元素告诉搜索引擎在`sitemap`哪里可以找到**网站**的站点地图。站点地图是 XML 文件，其中包含网站上所有页面及其元数据的列表。搜索引擎使用它们来索引网站并将其显示在搜索结果中。
- 链接元素告诉搜索引擎在`alternate`哪里可以找到网站的**RSS 提要**。RSS 提要是包含网站上最新帖子列表的 XML 文件。搜索引擎使用它们在搜索结果中显示网站内容，RSS 阅读器也使用它们以更方便的格式显示网站内容。
- 浏览器使用`search`link 元素在浏览器的地址栏中显示**搜索框**。这允许用户直接从地址栏搜索网站，而不必导航到搜索页面。



![img](https://www.30secondsofcode.org/assets/icons/blog.svg)

# 推荐的 HTML 头像图标标签

Webdev、HTML、浏览器·2023 年 1 月 24 日

![img](https://www.30secondsofcode.org/assets/blog_images/boutique-home-office-3.jpg)

多年来，我见过许多关于网站图标和哪些标签必不可少的不同且经常相互冲突的指南。如今，我认为您可以使用**极少的元标记集**并根据您的需要定制它们。`<head>`这是我对元素中应包含的最低限度的建议：

```html
<head>
  <link rel="icon" sizes="192x192" href="favicon.png">
  <link rel="apple-touch-icon" href="favicon.png">
  <link rel="mask-icon" href="favicon.svg" color="#000000">
</head>
```

通过创建单个 192x192 PNG 资产，您可以轻松覆盖几乎所有现代设备和浏览器。如果你想更进一步，你可以很容易地加入一些。简单地缩小图像并包含更多`rel="icon"`具有不同`sizes`属性的元标记。



![img](https://www.30secondsofcode.org/assets/icons/blog.svg)

# HTML head 推荐的社交标签

Webdev、HTML、浏览器·2023 年 1 月 22 日

![img](https://www.30secondsofcode.org/assets/blog_images/boutique-home-office-2.jpg)

社交媒体对任何内容的成功都起着重要作用。为确保您的内容在社交媒体上正确共享，您应该在`<head>`元素中包含一些基本标签：

```html
<head>
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Page description. No longer than 155 characters.">
  <meta property="og:image" content="https://samplesite.com/image.jpg">
  <meta property="og:site_name" content="Sample Site">
  <meta property="og:url" content="https://samplesite.com/page.html">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Page Title">
  <meta name="twitter:description" content="Page description. No longer than 155 characters.">
  <meta name="twitter:image" content="https://samplesite.com/image.jpg">
  <meta name="twitter:site" content="@samplesite">
</head>.
```

上面的代码片段包含 OpenGraph 和 Twitter 标签。**Facebook 和其他社交媒体平台使用OpenGraph 标签**在共享页面时显示页面预览。同样，Twitter 使用**Twitter 标签**来获取相同的信息。以下是每一项的细分：

- 和元标记用于在预览中显示页面的标题`og:title`。`twitter:title`

- 和元标记用于在预览中显示页面的简短描述`og:description`。`twitter:description`

- 和元标记用于在预览中显示图像`og:image`。`twitter:image`

- 元`og:site_name`标记用于在预览中显示站点名称。

- 元`og:url`标记用于在预览中显示页面的 URL。

- 元标记用于在`twitter:card`共享页面时显示页面的预览。可用值为`summary`、`summary_large_image`和。`app``player`

- 元`twitter:site`标记用于在预览中显示站点的 Twitter 句柄。

  

![img](https://www.30secondsofcode.org/assets/icons/blog.svg)

# 推荐的 最小的HTML头

Webdev、HTML、浏览器·Webdev, HTML, Browser · 2023 年 1 月 24 日Jan 18, 2023

![img](https://www.30secondsofcode.org/assets/blog_images/boutique-home-office-1.jpg)

HTML 文档的重要组成部分是`<head>`元素，它包含有关文档的元数据。一些重要信息，例如文档的标题和字符编码都存储在该`<head>`元素中。您还可以在其中包含指向外部资源（如 CSS 样式表和 JavaScript 文件）的链接。

通常情况下，这种元数据会随着时间的推移变得越来越复杂。但是，有一些重要的事情绝对不能遗漏。`<head>`以下是您应该包含在元素中的最低限度的列表：

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page Title</title>
  <meta name="description" content="Page description. No longer than 155 characters.">
</head>
```

- 元`charset`标记告诉浏览器在呈现文档时使用什么**字符编码。**
- 元`viewport`标记告诉浏览器如何在**移动设备**上呈现页面。
- 搜索引擎使用该`title`元素在搜索结果中显示页面的**标题。**
- 搜索引擎使用`description`元标记在搜索结果中显示页面的**简短描述**。



### 由 Angelos Chalaris 撰写

我是 Angelos Chalaris，一名住在希腊雅典的 JavaScript 软件工程师。此处发布了我编码冒险中的最佳片段，以帮助其他人学习编码。

如果您想保持联系，请在[GitHub](https://github.com/Chalarangelo)或[Twitter 上](https://twitter.com/chalarangelo)关注我。