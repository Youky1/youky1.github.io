const path = require("path");
const simpleGit = require("simple-git");

console.log("\n---------------Start deploy---------------\n");

const baseDir = path.join(__dirname, "/docs/.vuepress/dist");

const git = simpleGit({
  baseDir,
  binary: "git"
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
    console.log("\n---------------Deploy successfully!---------------\n");
  });
