set -e

# 进入生成的文件夹
cd docs/.vuepress/dist
echo 'youky.top' > CNAME
# 发布到github
git init
git remote add origin git@github.com:Youky1/Youky1.github.io.git
git add .
git commit -m 'deploy'

git branch gh-page
git checkout gh-page
git push -f origin gh-page

cd -