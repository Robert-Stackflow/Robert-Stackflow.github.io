var posts=["2022/08/19/【教程】Windows下安装WSL 2/","2023/02/22/【笔记】数据库系统概论笔记(一)/","2023/02/22/【笔记】数据库系统概论笔记(三)/","2022/08/21/【笔记】算法设计与分析笔记(一)/","2023/02/22/【笔记】数据库系统概论笔记(二)/","2022/08/21/【笔记】算法设计与分析笔记(三)/","2022/08/21/【笔记】算法设计与分析笔记(二)/","2022/08/21/【笔记】算法设计与分析笔记(四)/","2022/11/12/【笔记】计算机网络与通信笔记(一)/","2022/11/12/【笔记】计算机网络与通信笔记(三)/","2022/11/12/【笔记】计算机网络与通信笔记(二)/","2022/11/12/【笔记】计算机网络与通信笔记(五)/","2022/11/12/【笔记】计算机网络与通信笔记(四)/","2023/03/15/【魔改】导入自定义歌单/"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};