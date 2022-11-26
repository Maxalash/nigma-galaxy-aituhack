FROM python:3.6
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code/
COPY requirements /code/
RUN pip install -r requirements
COPY . .
