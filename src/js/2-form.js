// Пошук форми та оголошення об'єкта стану з НАЛЕЖНИМ ідентифікатором formData
const form = document.querySelector('.feedback-form');
const formData = { email: "", message: "" };

const STORAGE_KEY = "feedback-form-state";

// Перевірка локального сховища при завантаженні сторінки
function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      
      // Оновлюємо об'єкт formData актуальними значеннями
      formData.email = parsedData.email ?? "";
      formData.message = parsedData.message ?? "";
      
      // Заповнюємо поля в інтерфейсі
      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      console.error("Помилка парсингу даних з localStorage:", error);
    }
  }
}

// Запускаємо перевірку сховища одразу
populateForm();

// Відстеження змін через делегування подій (input)
form.addEventListener('input', (event) => {
  const key = event.target.name; 
  const value = event.target.value.trim(); 

  // Зберігаємо актуальні дані в об'єкт formData
  formData[key] = value;

  // Записуємо оновлений об'єкт у локальне сховище
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// Обробка відправлення форми (submit) та валідація
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Скасовуємо перезавантаження сторінки

  // Перевіряємо, чи обидва поля заповнені
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return; 
  }

  // Якщо все заповнено, виводимо об'єкт formData у консоль
  console.log(formData);

  // Повне очищення після успішного відправлення
  localStorage.removeItem(STORAGE_KEY); // Видаляємо дані зі сховища
  formData.email = "";                 // Скидаємо значення в об'єкті
  formData.message = "";
  form.reset();                         // Очищаємо поля форми в інтерфейсі
});