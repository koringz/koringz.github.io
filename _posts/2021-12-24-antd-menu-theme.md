---
title: "react antd UI库菜单箭头图标样式"
tags:
  - Articles
---

### 菜单箭头 SCSS 样式

antd 默认菜单箭头图标设置样式和效果

```scss
// 公共菜单样式
.ant-menu {
  // 默认箭头样式
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
  // 箭头展开样式
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
  // 鼠标滑过效果样式
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
}
```
