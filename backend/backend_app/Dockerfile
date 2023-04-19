FROM python

WORKDIR /usr/src

EXPOSE 8000

RUN pip install Django djangorestframework

COPY . .

RUN cd backend_app

RUN python manage.py makemigrations
RUN python manage.py migrate


CMD ["python", "manage.py", "runserver 0.0.0.0:8000"]