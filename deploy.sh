set -e

# 进入生成的文件夹
cd docs/.vuepress/dist

# 发布到github
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:Youky1/Youky1.github.io.git master

cd -