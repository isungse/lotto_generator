// 페이지 로드 시 기본으로 무작위 번호 생성
document.addEventListener('DOMContentLoaded', () => {
  generateNumbers('/generate_random');
});

// 각 버튼에 이벤트 리스너 추가
document.getElementById('generate-random-button').addEventListener('click', () => {
  generateNumbers('/generate_random');
});

document.getElementById('generate-frequent-button').addEventListener('click', () => {
  generateNumbers('/generate_frequent');
});

function generateNumbers(endpoint) {
  const container = document.getElementById('numbers-container');
  container.innerHTML = ''; // 기존 번호 초기화

  fetch(endpoint)
    .then(response => response.json())
    .then(numbers => {
      numbers.forEach((number, index) => {
        setTimeout(() => {
          const ball = document.createElement('div');
          ball.className = 'number-ball';
          ball.textContent = number;
          ball.style.animationDelay = `${index * 0.3}s`; // 애니메이션 딜레이
          ball.style.backgroundColor = getColor(number); // 색상 설정
          container.appendChild(ball);
        }, index * 300); // 번호 생성 딜레이
      });
    })
    .catch(error => console.error('Error:', error));
}

function getColor(number) {
  if (number <= 10) return '#fbc400'; // 노란색
  else if (number <= 20) return '#69c8f2'; // 하늘색
  else if (number <= 30) return '#ff7272'; // 빨간색
  else if (number <= 40) return '#aaaaaa'; // 회색
  else return '#b0d840'; // 초록색
}
