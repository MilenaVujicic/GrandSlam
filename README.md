# Grand Slam

This is the project of the **Grand Slam** team for the [W3 Algorand Hackathon](https://bc.elab.fon.bg.ac.rs/hackathon/).

The project aims to implement a simple model of the **blockchain prevention of money-laundering**.


## Requirements
- Docker/ Docker Compose
- Python 
- Node

## Getting started
Start the database from docker-compose.yml file

'''bash
docker-compose up

Start the client application

'''bash
npm start

Migrate data and start the server-side application

'''bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
