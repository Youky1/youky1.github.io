const path = require("path");
const simpleGit = require("simple-git");
const fs = require("fs").promises;

console.log("\n---------------Start deploy---------------\n");

const baseDir = path.join(__dirname, "/docs/.vuepress/dist");

const git = simpleGit({
  baseDir,
  binary: "git",
});

git
  .init()
  .addRemote("origin", "git@github.com:Youky1/Youky1.github.io.git")
  .add(".")
  .commit(`Deploy at ${new Date().toLocaleDateString()}`)
  .branch("gh-page")
  .checkoutLocalBranch("gh-page")
  .push(["-f", "origin", "gh-page"])
  .then(() => {
    console.log("finish");
  });

(async function rmdirAsync(root) {
  const stat = await fs.stat(root);
  if (stat.isFile()) {
    await fs.unlink(root);
  } else {
    let dirs = await fs.readdir(root);
    dirs = dirs.map((dir) => rmdirAsync(path.join(root, dir)));
    await Promise.all(dirs);
    await fs.rmdir(root);
  }
})(baseDir);

console.log("\n---------------Deploy successfully!---------------\n");
