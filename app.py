from flask import Flask, jsonify, render_template
import random

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# 완전히 무작위로 번호 생성
@app.route('/generate_random')
def generate_random():
    numbers = random.sample(range(1, 46), 6)
    numbers.sort()
    return jsonify(numbers)

# 자주 나온 번호를 조합하여 번호 생성
@app.route('/generate_frequent')
def generate_frequent():
    frequent_numbers = [43, 34, 12, 23, 17, 33]
    # 포함할 가장 많이 나온 번호의 수
    num_frequent = 2  # 원하는 대로 조절 가능
    # 가장 많이 나온 번호 중에서 num_frequent 개 선택
    selected_frequent = random.sample(frequent_numbers, num_frequent)
    # 나머지 번호들 (1~45에서 이미 선택된 번호 제외)
    remaining_numbers = [n for n in range(1, 46) if n not in selected_frequent]
    # 나머지 번호 중에서 (6 - num_frequent) 개 선택
    selected_remaining = random.sample(remaining_numbers, 6 - num_frequent)
    # 선택된 번호 합치기
    final_numbers = selected_frequent + selected_remaining
    # 번호를 랜덤하게 섞기
    final_numbers.sort()
    return jsonify(final_numbers)

if __name__ == '__main__':
    app.run()