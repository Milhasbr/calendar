from flask import Flask, render_template, request
import requests

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    origin = request.form.get('origin')  # REC como valor padrão
    destination = request.form.get('destination')  # FEN como valor padrão

    return render_template('calendar.html', origin=origin, destination=destination)

@app.route('/api/points')
def get_points():
    origin = request.args.get('origin')
    destination = request.args.get('destination')

    if not origin or not destination:
        return {"error": "Both 'origin' and 'destination' parameters are required"}, 400

    api_url = f'http://172.21.1.253:8000/search?origin={origin}&destination={destination}'

    response = requests.get(api_url)
    if response.ok:
        return response.json()
    else:
        return {"error": "Unable to fetch data"}, response.status_code

if __name__ == '__main__':
    app.run(debug=True)
