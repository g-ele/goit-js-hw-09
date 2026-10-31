const form = document.querySelector('.feedback-form');
const formState = { email: "", message: "" };

const STORAGE_KEY = "feedback-form-state";

// Підзадача 2: Перевірка локального сховища при завантаженні сторінки
function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  // Якщо дані у сховищі є, заповнюємо форму та об'єкт стану
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      
      // Оновлюємо наш об'єкт стану актуальними значеннями
      formState.email = parsedData.email ?? "";
      formState.message = parsedData.message ?? "";
      
      // Заповнюємо поля в інтерфейсі (використовуємо trim, щоб прибрати зайві пробіли)
      form.elements.email.value = formState.email;
      form.elements.message.value = formState.message;
    } catch (error) {
      console.error("Помилка парсингу даних з localStorage:", error);
    }
  }
}

// Запускаємо перевірку сховища одразу при завантаженні скрипта
populateForm();

// Підзадача 3: Відстеження змін через делегування подій (input)
form.addEventListener('input', (event) => {
  const key = event.target.name; // Отримуємо 'email' або 'message'
  const value = event.target.value.trim(); // Очищаємо введене значення від пробілів по краях

  // Зберігаємо актуальні дані в об'єкт стану
  formState[key] = value;

  // Записуємо оновлений об'єкт у локальне сховище
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
});

// Підзадача 4: Обробка відправлення форми (submit) та валідація
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Скасовуємо перезавантаження сторінки

  // Перевіряємо, чи обидва поля заповнені (без урахування випадкових пробілів)
  if (!formState.email || !formState.message) {
    alert('Fill please all fields');
    return; // Зупиняємо виконання функції, якщо хоча б одне поле порожнє
  }

  // Якщо все заповнено, виводимо об'єкт у консоль
  console.log(formState);

  // Повне очищення після успішного відправлення
  localStorage.removeItem(STORAGE_KEY); // Видаляємо дані зі сховища
  formState.email = "";                 // Скидаємо значення в об'єкті
  formState.message = "";
  form.reset();                         // Очищаємо поля форми в інтерфейсі
});