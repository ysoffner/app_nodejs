# Comandos
```
<!-- Build Dockerfiles -->
ansible-playbook docker_start.yml
<!-- Delete containers/images -->
ansible-playbook docker_delete.yml
<!-- Build another images -->
ansible-playbook docker_others.yml
```

# Testes
```
<!-- Testes de build -->
docker build -f Dockerfiles/Dockerfile_node -t ysoffner/app_nodejs .
docker build -f Dockerfiles/Dockerfile_nginx -t ysoffner/app_nginx .

<!-- Teste Config Nginx -->
docker run --rm --name some-nginx -v ${PWD}/roles/nginx/files/nginx.conf:/etc/nginx/nginx.conf  nginx
```
# Output Server
docker exec -ti app_nodejs pm2 logs

docker logs -f app_nginx

<!-- NGINX Balanceador
round-robin: las peticiones son distribuidas entre los servidores de forma cíclica. Cabe la posibilidad de que las peticiones más pesadas sean procesadas por el mismo servidor, distribuye las peticiones de forma ecuánime pero la carga no.

least-connected: la siguiente petición es atendida por el servidor con menos conexiones activas.

ip-hash: se selecciona el servidor que atenderá la petición en base a algún dato como la dirección IP, de esta forma todas las peticiones de un usuario son atendidas por el mismo servidor.
-->
# Melhorias
* Utilizar Alpine como imagem no Dockerfile
* Automatizar as tarefas com o Ansible
* Criar esquema de deploy/rollback
* No NodeJS Cluster, balancear automaticamente pelos nós criados
* Criar um script que rode um teste de carga e demostre qual o Throughput máximo que seu servidor consegue atingir
<!-- Obtain the number of CPUs/cores
num_cpu=$(grep -c ^processor /proc/cpuinfo)
 -->
# Referencias
https://docs.ansible.com/ansible/2.6/modules/docker_image_module.html
https://github.com/nodesource/distributions/blob/master/README.md
http://expressjs.com/pt-br/starter/installing.html
https://puppet.com/docs/pipelines-for-apps/free/docker-nodejs.html#before-you-begin
https://picodotdev.github.io/blog-bitix/2016/07/configurar-nginx-como-balanceador-de-carga/
http://pm2.keymetrics.io/docs/usage/cluster-mode/
http://www.acuriousanimal.com/2017/08/20/using-pm2-to-manage-cluster.html
https://medium.com/bigpanda-engineering/using-ansible-to-compile-nginx-from-sources-with-custom-modules-f6e6c6a42493
https://medium.com/@ahmadfarag/ansible-in-action-f2f17706931

# PM2.IO
Gerar chave no site https://app.pm2.io, e executa-la com o container rodando
```docker exec -ti app_nodejs pm2 link xxxxxxx yyyyyyyyy app_nodejs```

# STRESS
```
Bombardier: ansible-playbook docker_others.yml
docker run --rm -i --network=ysoffner_net ysoffner/app_bombardier -c 200 -d 10s -l http://{{ $IP_app_nginx }}

k6: https://docs.k6.io/docs/running-k6
docker run --rm -i --network=ysoffner_net loadimpact/k6 run - <scripts/extress_k6.js
docker run --rm -i --network=ysoffner_net loadimpact/k6 run --vus 10 --duration 30s - <scripts/extress_k6.js
```

<!-- 
# Projeto de rollback, precisa gerar um push com a imagem atual, e voltar a versão
# Projeto de CI, acho que pelo ansible tem, mas da pra fazer por github / travis / hub.docker
# deve reiniciar os processos sem afetar a disponibilidade
# A aplicação Node deverá ser acessada via server Web com um Proxy Reverso, intermediando http(s) e processos nodes
# Fazer um script para teste de carga, demostrando o Throughput maximo do servidorchkconfig --list ntpdate -->
