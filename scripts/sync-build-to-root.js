/**
 * react-scripts build 完成后：将 build/ 下全部内容同步到项目根目录。
 * 先删除根目录旧的 static/，避免遗留旧 hash 资源。
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const buildDir = path.join(root, "build");

function rmrf(p) {
  fs.rmSync(p, { recursive: true, force: true });
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const ent of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, ent.name);
    const d = path.join(dest, ent.name);
    if (ent.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

if (!fs.existsSync(buildDir)) {
  console.error("未找到 build/，请先确认 react-scripts build 已成功执行。");
  process.exit(1);
}

for (const ent of fs.readdirSync(buildDir, { withFileTypes: true })) {
  const src = path.join(buildDir, ent.name);
  const dest = path.join(root, ent.name);

  if (ent.isDirectory()) {
    if (ent.name === "static") rmrf(dest);
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log("已将 build/ 内容全部同步到项目根目录。");
