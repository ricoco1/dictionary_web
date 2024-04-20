from flask import Flask, request, render_template, redirect, url_for, jsonify
from pymongo import MongoClient
import requests
import os
from os.path import join, dirname
from dotenv import load_dotenv
from datetime import datetime


dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

MONGODB_URI = os.environ.get("MONGODB_URI")
DB_NAME =  os.environ.get("DB_NAME")

client = MongoClient(MONGODB_URI)
db = client[DB_NAME] 
app = Flask(__name__)

@app.route('/')
def practice():
    return render_template('index.html')

@app.route('/detail/<keyword>')
def detail(keyword):
    api_key = 'e43e9f3e-2cae-449b-966f-df151e857a6f'
    url = f'https://www.dictionaryapi.com/api/v3/references/collegiate/json/{keyword}?key={api_key}'
    response = requests.get(url)
    definitions = response.json()
    return render_template(
        'detail.html',
        word=keyword,
        definitions=definitions,
        status=request.args.get('status_give', 'new')
    )

@app.route('/api/save_word', methods=['POST'])
def save_word():
    return jsonify({
        'result': 'success',
        'msg': 'the word was save'
    })

@app.route('/api/delete_word', methods=['POST'])
def delete_word():
    return jsonify({
        'result': 'success',
        'msg': 'the word was delete'
    })

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)