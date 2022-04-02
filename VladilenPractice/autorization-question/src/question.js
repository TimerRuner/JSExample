export class Question{
  static create(question){
    return fetch('https://questions-list-b7377-default-rtdb.firebaseio.com/questions.json', {
      method: 'POST',
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(response => {
      question.id = response.name;
      return question;
    })
    .then(addToLocalStorage)
    .then(Question.renderList())
  }

  static listToHtml(questions){
    return questions.length ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>` : `<p>Питань поки немає</p>`
  }
  static fetch(token){

    if(!token){
      return Promise.resolve('<p class="error">У вас немає токена</p>')
    }

    return fetch(`https://questions-list-b7377-default-rtdb.firebaseio.com/questions.json?auth=${token}`)
      .then(response => response.json())
      .then(data => {
        if( data && data.error){
          return `<p class="error">${data.error}</p>`;
        }

        return data ? Object.keys(data).map(key => ({
          ...data[key],
          id: key
        })) : []
      });
  }

  static renderList(){
    const questions = getQuestionFromLocalStorage();

    const html = questions.length
      ? questions.map(toCard).join('')
      : `<div class="mui--text-headline">Ви поки нічого не питали</div>`;

    const list = document.getElementById('list');

    list.innerHTML = html;
  }
}

function addToLocalStorage(question){
  const all = getQuestionFromLocalStorage();
  all.push(question);
  localStorage.setItem('questions', JSON.stringify(all));
}

function getQuestionFromLocalStorage(){
  return JSON.parse(localStorage.getItem('questions') || '[]');
}

function toCard(question){
  return `
  <div class="mui--text-black-54">
    ${new Date(question.data).toLocaleDateString()}
    ${new Date(question.data).toLocaleTimeString()}
  </div>
  <div>${question.text}</div>
  <br>
  `;
}