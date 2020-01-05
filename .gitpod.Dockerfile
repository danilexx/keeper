FROM gitpod/workspace-postgres

USER gitpod

RUN /etc/init.d/postgresql start &&\
    psql --command "CREATE USER keeper WITH SUPERUSER PASSWORD '123';" &&\
    createdb -O keeper keeper

EXPOSE 5432

# Install custom tools, runtime, etc. using apt-get
# For example, the command below would install "bastet" - a command line tetris clone:
#
# RUN sudo apt-get -q update && #     sudo apt-get install -yq bastet && #     sudo rm -rf /var/lib/apt/lists/*
#
# More information: https://www.gitpod.io/docs/42_config_docker/
