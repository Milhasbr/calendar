FROM debian

WORKDIR /app

COPY . /app/

RUN \
    apt-get update && \
    apt-get install -y \
        python3 python3-venv python3-pip && \
    python3 -m venv venv && \
    venv/bin/pip install -r requirements.txt

# Expor a porta 5000
EXPOSE 5000
ENTRYPOINT ["venv/bin/flask", "run", "--port", "5000", "--host", "0.0.0.0"]