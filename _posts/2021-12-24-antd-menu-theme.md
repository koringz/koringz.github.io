---
title: "antd-menu-theme"
tags:
  - Articles
---

### 菜单 sty 样式修改

主要是设置箭头的样式和效果

```scss
// 菜单
.ant-menu {
  .ant-menu-submenu-open,
  .ant-menu-submenu-active {
    &:hover {
      .ant-menu-submenu-arrow {
        &:hover {
          color: #999 !important;
        }
        color: #999;
      }
    }
  }
  .ant-menu-submenu:not(.ant-menu-submenu-open) {
    .ant-menu-submenu-title {
      .ant-menu-submenu-arrow {
        &::before {
          width: 12px;
          transform: rotate(-45deg) translateX(4.5px) !important;
        }
        &::after {
          width: 12px;
          transform: rotate(-45deg) translateX(4.5px) !important;
        }
      }
    }
  }
  .ant-menu-submenu.ant-menu-submenu-open {
    .ant-menu-submenu-title[aria-expended="true"] {
      .ant-menu-submenu-arrow {
        &::before {
          width: 12px;
          transform: rotate(45deg) translateX(4.5px) !important;
        }
        &::after {
          width: 12px;
          transform: rotate(-45deg) translateX(4.5px) !important;
        }
      }
    }
  }
}
```
