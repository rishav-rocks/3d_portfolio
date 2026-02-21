ssh root@103.49.70.208 << EOF
 docker stop 3d_portfolio
    docker rm 3d_portfolio
    docker rmi 3d_portfolio
    rm -rf 3d_portfolio
    git clone git@github.com:rishav-rocks/3d_portfolio.git
    cd 3d_portfolio
    docker build --no-cache -t 3d_portfolio .
    docker run -d --name 3d_portfolio -p 5665:3000 3d_portfolio
    cd ..
    exit
      EOF