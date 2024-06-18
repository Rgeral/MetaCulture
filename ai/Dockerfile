FROM debian:bookworm

# Define environment variables
ENV DEBIAN_FRONTEND=noninteractive
ARG PREDIBASE_API_KEY=;

RUN apt-get -yqq update
RUN apt-get -yqq upgrade;

RUN apt-get -yqq install python3 python3-pip python3.11-venv;

WORKDIR /app

COPY requirements.txt .

RUN pip install --break-system-packages -r requirements.txt

CMD ["python3", "run.py"]
