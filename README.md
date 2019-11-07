## 初始化项目

```bash
react-native init myapp
```

### 安装mobx、mobx-react

```
cd myapp
yarn add mobx mobx-react@5.4.4
```

### 配置mobx装饰器语法

1.安装插件
```
yarn add @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators -D
```

2.配置babel.config.js
```
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "plugins": [
      ["@babel/plugin-proposal-decorators", { "legacy": true}],
      ["@babel/plugin-proposal-class-properties", { "loose": true}]
  ]
};
```

### 安装 react-native-webview 插件

```
yarn add react-native-webview

react-native link react-native-webview
```

### 路由功能

- 1.安装：
```
yarn add react-navigation react-native-reanimated react-native-gesture-handler react-native-screens react-navigation-stack
```
- 2.配置

  + a.修改 android/app/build.gradle 文件：dependencies字段，新增下面2行

  ```
  implementation 'androidx.appcompat:appcompat:1.1.0-rc01'
  implementation 'androidx.swiperefreshlayout:swiperefreshlayout:1.1.0-alpha02'
  ```

  + b.修改MainActivity.java 文件

  ```java
  package com.reactnavigation.example;

  import com.facebook.react.ReactActivity;
  + import com.facebook.react.ReactActivityDelegate;
  + import com.facebook.react.ReactRootView;
  + import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

  public class MainActivity extends ReactActivity {

    @Override
    protected String getMainComponentName() {
      return "Example";
    }

  +  @Override
  +  protected ReactActivityDelegate createReactActivityDelegate() {
  +    return new ReactActivityDelegate(this, getMainComponentName()) {
  +      @Override
  +      protected ReactRootView createRootView() {
  +       return new RNGestureHandlerEnabledRootView(MainActivity.this);
  +      }
  +    };
  +  }
  }
  ```


### 安装storage（缓存）

1. 安装react-native-storage
```
    npm install react-native-storage
    npm install @react-native-community/async-storage 
    
    or 
    
    yarn add react-native-storage
    yarn add @react-native-community/async-storage
```
2. link
```
    react-native link @react-native-community/async-storage
```
3. use

[react-native-storage文档地址](https://github.com/sunnylqm/react-native-storage)



### react-native-navigation
[react-native-navigation文档地址](https://reactnavigation.org/docs/zh-Hans/state-persistence.html)

### 安装ant-design
```
    npm install @ant-design/react-native
    or
    yarn add @ant-design/react-native
    
    react-native link @ant-design/icons-react-native
```
### ant-design-mobile-rn
[antd-design文档地址](https://rn.mobile.ant.design/components/button-cn/)
