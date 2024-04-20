import requests

word = 'large'
root_url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json'
final_url = f'{root_url}/{word}?key={"asa"}'
r = requests.get(final_url)
result = r.json()
for result in result:
    print(result)