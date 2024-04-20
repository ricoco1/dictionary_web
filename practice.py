import requests

api_key = 'e43e9f3e-2cae-449b-966f-df151e857a6f'
word = 'large'
root_url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json'
final_url = f'{root_url}/{word}?key={api_key}'
r = requests.get(final_url)
result = r.json()
for result in result:
    print(result)