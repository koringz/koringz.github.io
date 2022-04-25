## 个人博客

将以下内容添加到您的 Gemfile:

> gem "minimal-mistakes-jekyll"

通过运行以下 Bundler 命令来获取和更新捆绑的 gem:

> bundle
> 设置 theme 在项目 Jekyll \_config.yml 文件:

> theme: minimal-mistakes-jekyll

更新主题运行 bundle update

本地运行 jekyll 服务

> jekyll serve

#### history(更改记录)

@修改所以样式(
font-size: $type-size-6 替换 $type-size-5;
)

@添加样式 \_sass\minimal-mistakes_page.scss(
p,li,dl {
letter-spacing: -0.06px;
})

@修改样式 \_sass\minimal-mistakes_base.scss(
body {
color: $text-color 替换 rgba(41, 41, 41, 1);
}
)

### 计划

css 样式缩写库

```css
.dn .fz12 .fz14 .fz18 .fz20;
```
