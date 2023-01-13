## tauri uploder 的使用
本项目利用github的action来构建更新

### 1.生成公私钥
``` 
tauri signer generate -w ~/.tauri/[你的密钥名称].key
```
生成公私钥之后把公钥添加在tauri.config.json的`"uploder"`配置项下
``` json
{
  ...
  "tauri": {
    ...
    "updater": {
      "active": true,
      "dialog": true,
      "endpoints": ["https://aidenup.github.io/chatApp/install.json"],
      "pubkey": "dW50cnVzdGVkIGNvbW1lbnQ6IG1pbmlzaWduIHB1YmxpYyBrZXk6IEI4M0JENzE1QkU2MEJCMDYKUldRR3UyQytGZGM3dUE2VjhydnJmRU5tWWE3b1NpZk4zYUhkalpubkJVLzNyMmFJUEJqTldtdGIK"
    }
    ...
  }
  ...
}
```
`endpoints`: 资源地址  
`pubkey`: 公钥


### 2.更新脚本
在项目根路径下创建 scripts 目录，然后在 scripts 下依次创建 release.mjs，updatelog.mjs，updater.mjs 三个 .mjs 文件：

scripts/release.mjs - 版本发布，因发布需涉及多处改动（如版本，版本日志，打 tag 标签等等），故将其写成脚本，减少记忆成本
scripts/updatelog.mjs - 版本更新日志处理，供 scripts/updater.mjs 脚本使用
scripts/updater.mjs - 生成应用更新需要的静态文件

```
npm install -D node-fetch @actions/github 
```

::: code-group
``` js [release.mjs]
// scripts/release.mjs

import { createRequire } from 'module';
import { execSync } from 'child_process';
import fs from 'fs';

import updatelog from './updatelog.mjs';

const require = createRequire(import.meta.url);

async function release() {
  const flag = process.argv[2] ?? 'patch';
  const packageJson = require('../package.json');
  let [a, b, c] = packageJson.version.split('.').map(Number);

  if (flag === 'major') {  // 主版本
    a += 1;
    b = 0;
    c = 0;
  } else if (flag === 'minor') {  // 次版本
    b += 1;
    c = 0;
  } else if (flag === 'patch') {  // 补丁版本
    c += 1;
  } else {
    console.log(`Invalid flag "${flag}"`);
    process.exit(1);
  }

  const nextVersion = `${a}.${b}.${c}`;
  packageJson.version = nextVersion;

  const nextTag = `v${nextVersion}`;
  await updatelog(nextTag, 'release');

  // 将新版本写入 package.json 文件
  fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));

  // 提交修改的文件，打 tag 标签（tag 标签是为了触发 github action 工作流）并推送到远程
  execSync('git add ./package.json ./UPDATE_LOG.md');
  execSync(`git commit -m "v${nextVersion}"`);
  execSync(`git tag -a v${nextVersion} -m "v${nextVersion}"`);
  execSync(`git push`);
  execSync(`git push origin v${nextVersion}`);
  console.log(`Publish Successfully...`);
}

release().catch(console.error);
```
``` js [updatelog.mjs]
// scripts/updatelog.mjs

import fs from 'fs';
import path from 'path';

const UPDATE_LOG = 'UPDATE_LOG.md';

export default function updatelog(tag, type = 'updater') {
  const reTag = /## v[\d\.]+/;

  const file = path.join(process.cwd(), UPDATE_LOG);

  if (!fs.existsSync(file)) {
    console.log('Could not found UPDATE_LOG.md');
    process.exit(1);
  }

  let _tag;
  const tagMap = {};
  const content = fs.readFileSync(file, { encoding: 'utf8' }).split('\n');

  content.forEach((line, index) => {
    if (reTag.test(line)) {
      _tag = line.slice(3).trim();
      if (!tagMap[_tag]) {
        tagMap[_tag] = [];
        return;
      }
    }
    if (_tag) {
      tagMap[_tag].push(line);
    }
    if (reTag.test(content[index + 1])) {
      _tag = null;
    }
  });

  if (!tagMap?.[tag]) {
    console.log(
      `${type === 'release' ? '[UPDATE_LOG.md] ' : ''}Tag ${tag} does not exist`
    );
    process.exit(1);
  }

  return tagMap[tag].join('\n').trim() || '';
}
```
``` js [updater.mjs]
// scripts/updater.mjs

import fetch from 'node-fetch';
import { getOctokit, context } from '@actions/github';
import fs from 'fs';

import updatelog from './updatelog.mjs';

const token = process.env.GITHUB_TOKEN;

async function updater() {
  if (!token) {
    console.log('GITHUB_TOKEN is required');
    process.exit(1);
  }

  // 用户名，仓库名
  const options = { owner: context.repo.owner, repo: context.repo.repo };
  const github = getOctokit(token);

  // 获取 tag
  const { data: tags } = await github.rest.repos.listTags({
    ...options,
    per_page: 10,
    page: 1,
  });

  // 过滤包含 `v` 版本信息的 tag
  const tag = tags.find((t) => t.name.startsWith('v'));
  // console.log(`${JSON.stringify(tag, null, 2)}`);

  if (!tag) return;

  // 获取此 tag 的详细信息
  const { data: latestRelease } = await github.rest.repos.getReleaseByTag({
    ...options,
    tag: tag.name,
  });

  // 需要生成的静态 json 文件数据，根据自己的需要进行调整
  const updateData = {
    version: tag.name,
    // 使用 UPDATE_LOG.md，如果不需要版本更新日志，则将此字段置空
    notes: updatelog(tag.name),
    pub_date: new Date().toISOString(),
    platforms: {
      win64: { signature: '', url: '' }, // compatible with older formats
      linux: { signature: '', url: '' }, // compatible with older formats
      darwin: { signature: '', url: '' }, // compatible with older formats
      'darwin-aarch64': { signature: '', url: '' },
      'darwin-x86_64': { signature: '', url: '' },
      'linux-x86_64': { signature: '', url: '' },
      'windows-x86_64': { signature: '', url: '' },
      // 'windows-i686': { signature: '', url: '' }, // no supported
    },
  };

  const setAsset = async (asset, reg, platforms) => {
    let sig = '';
    if (/.sig$/.test(asset.name)) {
      sig = await getSignature(asset.browser_download_url);
    }
    platforms.forEach((platform) => {
      if (reg.test(asset.name)) {
        // 设置平台签名，检测应用更新需要验证签名
        if (sig) {
          updateData.platforms[platform].signature = sig;
          return;
        }
        // 设置下载链接
        updateData.platforms[platform].url = asset.browser_download_url;
      }
    });
  };

  const promises = latestRelease.assets.map(async (asset) => {
    // windows
    await setAsset(asset, /.msi.zip/, ['win64', 'windows-x86_64']);

    // darwin
    await setAsset(asset, /.app.tar.gz/, [
      'darwin',
      'darwin-x86_64',
      'darwin-aarch64',
    ]);

    // linux
    await setAsset(asset, /.AppImage.tar.gz/, ['linux', 'linux-x86_64']);
  });
  await Promise.allSettled(promises);

  if (!fs.existsSync('updater')) {
    fs.mkdirSync('updater');
  }

  // 将数据写入文件
  fs.writeFileSync(
    './updater/install.json',
    JSON.stringify(updateData, null, 2)
  );
  console.log('Generate updater/install.json');
}

updater().catch(console.error);

// 获取签名内容
async function getSignature(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/octet-stream' },
    });
    return response.text();
  } catch (_) {
    return '';
  }
}
```

:::

在根路径下创建 UPDATE_LOG.md 文件，通知用户更新注意事项，格式如下（使用版本号作为标题，具体请查看 scripts/updatelog.mjs）
``` md
# Updater Log

## v0.1.7

- feat: xxx
- fix: xxx

## v0.1.6

test
```

修改 package.json，在 "scripts" 中加入 updater 和 release 命令：
``` json
"scripts": {
  "dev": "vite --port=4096",
  "build": "rsw build && tsc && vite build",
  "preview": "vite preview",
  "tauri": "tauri",
  "rsw": "rsw",
  "updater": "node scripts/updater.mjs", // ✅ 新增
  "release": "node scripts/release.mjs" // ✅ 新增
},
```
### 3.Action配置
将第一步生成的私钥配置到github中 
具体过程如下：  
settings -> Secrets and variables -> actions -> New repository secret
+ Name: `TAURI_PRIVATE_KEY`
+ Value: 你的私钥 xxx.key

设置 yml
```
name: Release CI

on:
  push:
    # Sequence of patterns matched against refs/tags
    tags:
      - 'v*' # Push events to matching v*, i.e. v1.0, v20.15.10

jobs:
  create-release:
    runs-on: ubuntu-latest
    outputs:
      RELEASE_UPLOAD_ID: ${{ steps.create_release.outputs.id }}

    steps:
      - uses: actions/checkout@v2
      - name: Query version number
        id: get_version
        shell: bash
        run: |
          echo "using version tag ${GITHUB_REF:10}"
          echo ::set-output name=version::"${GITHUB_REF:10}"

      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: '${{ steps.get_version.outputs.VERSION }}'
          release_name: 'OhMyBox ${{ steps.get_version.outputs.VERSION }}'
          body: 'See the assets to download this version and install.'

  build-tauri:
    needs: create-release
    strategy:
      fail-fast: false
      matrix:
        platform: [macos-latest, ubuntu-latest, windows-latest]

    runs-on: ${{ matrix.platform }}
    steps:
      - uses: actions/checkout@v2

      - name: Setup node
        uses: actions/setup-node@v1
        with:
          node-version: 16

      - name: Install Rust stable
        uses: actions-rs/toolchain@v1
        with:
          toolchain: stable

      # Rust cache
      - uses: Swatinem/rust-cache@v1

      - name: install dependencies (ubuntu only)
        if: matrix.platform == 'ubuntu-latest'
        run: |
          sudo apt-get update
          sudo apt-get install -y libgtk-3-dev webkit2gtk-4.0 libappindicator3-dev librsvg2-dev patchelf

      # Install wasm-pack
      - uses: jetli/wasm-pack-action@v0.3.0
        with:
          # Optional version of wasm-pack to install(eg. 'v0.9.1', 'latest')
          version: v0.9.1

      - name: Install rsw
        run: cargo install rsw

      - name: Get yarn cache directory path
        id: yarn-cache-dir-path
        run: echo "::set-output name=dir::$(yarn config get cacheFolder)"

      - name: Yarn cache
        uses: actions/cache@v2
        id: yarn-cache # use this to check for `cache-hit` (`steps.yarn-cache.outputs.cache-hit != 'true'`)
        with:
          path: ${{ steps.yarn-cache-dir-path.outputs.dir }}
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      - name: Install app dependencies and build it
        run: yarn && yarn build
      - uses: tauri-apps/tauri-action@v0
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          TAURI_PRIVATE_KEY: ${{ secrets.TAURI_PRIVATE_KEY }}
          TAURI_KEY_PASSWORD: ${{ secrets.TAURI_KEY_PASSWORD }}
        with:
          releaseId: ${{ needs.create-release.outputs.RELEASE_UPLOAD_ID }}

  # 生成静态资源并将其推送到 github pages
  updater:
    runs-on: ubuntu-latest
    needs: [create-release, build-tauri]

    steps:
      - uses: actions/checkout@v2
      - run: yarn
      - run: yarn updater
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Deploy install.json
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./updater
          force_orphan: true
```

### 发布应用
功能开发完成，提交代码后，只需执行 yarn release 命令就可以自动进行应用发布了。如果不想借助 github 打包和静态资源存放，也可以参考上面的步骤，自行部署。
> 发布版本之前先将`UPDATE_LOG.md` 中的版本更改，之后再运行下方脚本
```
# 发布主版本，v1.x.x -> v2.x.x
yarn release major

# 发布次版本，v1.0.x -> v1.1.x
yarn release minor

# 发布补丁版本，patch 参数可省略，v1.0.0 -> v1.0.1
yarn release [patch]
```

### 常见问题
添加uploder 后本地构建后报错，~~尚未解决……~~
```
Deriving a key from the password and decrypting the secret key... done
       Error The updater secret key from `TAURI_PRIVATE_KEY` does not match the public key defined in `tauri.conf.json > tauri > updater > pubkey`.
 ELIFECYCLE  Command failed with exit code 1.
```
出现这种情况是由于本地没有配置环境变量导致
> mac 中配置环境变量
1. 终端输入 `sudo vim ~/.bash_profile` 回车打开编辑器
2. 编辑环境变量，将私钥添加到value 中
    ```
    # tauri
    export TAURI_PRIVATE_KEY="dW50cnVzdGVxxxx……"
    ```
3. 配置完成后报错并退出编辑器 
4. 终端运行 `source ~/.bash_profile` 使配置文件生效

执行tauri 构建命令 查看环境变量是否生效  
如果没有生效尝试重启电脑

构建成功后显示
```
Deriving a key from the password and decrypting the secret key... done
        Info 1 updater archive at:
        Info         /Users/allez/myCode/project/tauri/chat/src-tauri/target/release/bundle/macos/chat.app.tar.gz.sig
```
