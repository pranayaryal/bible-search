from flask import Flask
import psycopg2
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask import request
from sentence_transformers import SentenceTransformer
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

model = SentenceTransformer('all-MiniLM-L6-v2', device='cpu')
print(model)



@app.route('/')
@cross_origin()
def hello_world():
    return jsonify({'message': 'You reached index page'})


@app.route("/search", methods = ['POST'])
def search():
    data = request.get_json()
    limit_no = 10 if data['verses'] == '' else data['verses']
    print(limit_no)

    connection = psycopg2.connect(user=os.getenv("POSTGRES_USER"),
                                password=os.getenv("POSTGRES_CRED"),
                                host="127.0.0.1",
                                port="5432",
                                database="mydb")
    cursor = connection.cursor()
    embds = model.encode(data['searchTerm']).tolist()
    my_query = f"SELECT citation, text FROM bible ORDER BY embedding <-> '{embds}' LIMIT {limit_no};"
    cursor.execute(my_query)
    collect = [{'citation': a, 'text': b} for (a, b) in cursor.fetchall()]

    connection.close()
    return jsonify(collect)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
