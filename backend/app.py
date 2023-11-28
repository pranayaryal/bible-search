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

model = SentenceTransformer('all-MiniLM-L6-v2')



@app.route('/')
@cross_origin()
def hello_world():
    return jsonify({'message': 'You reached hellow world'})


@app.route("/search")
def search():
    search_term = request.args.get('search')
    connection = psycopg2.connect(user=os.getenv("POSTGRES_USER"),
                                password=os.getenv("POSTGRES_CRED"),
                                host="127.0.0.1",
                                port="5432",
                                database="mydb")
    cursor = connection.cursor()
    ps_quer = "Select * from bible limit 5"
    embds = model.encode(search_term).tolist()
    my_query = f"SELECT citation, text FROM bible ORDER BY embedding <-> '{embds}' LIMIT 10;"
    cursor.execute(my_query)
    collect = [{'citation': a, 'text': b} for (a, b) in cursor.fetchall()]
    # for (a, b) in cursor.fetchall():
    #     collection.append({'citation': a, 'text': b})

    connection.close()
    return jsonify(collect)