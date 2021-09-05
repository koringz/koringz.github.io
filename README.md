## 个人博客

将以下内容添加到您的 Gemfile:

>gem "minimal-mistakes-jekyll"

通过运行以下Bundler命令来获取和更新捆绑的 gem:

>bundle
设置theme在项目Jekyll _config.yml文件:

>theme: minimal-mistakes-jekyll

更新主题运行 bundle update

本地运行jekyll服务
>jekyll serve




#### history(更改记录)

@修改所以样式(
font-size: $type-size-6 替换 $type-size-5; 
)

添加样式(
p,li,dl {
    letter-spacing: -0.06px;
})