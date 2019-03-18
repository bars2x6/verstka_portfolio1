const COUNT_SHOW_MORE_NEWS = 9;
const select = document.querySelector('.select-cat');
const moreNews = document.querySelector('.more-news');

// функция FadeIn на Native Javascript
function fadeIn(elem, ms = 500) {
  if (!elem)
    return;
  elem.style.opacity = 0;
  elem.style.filter = "alpha(opacity=0)";
  elem.style.display = "inline-block";
  elem.style.visibility = "visible";
  if (ms) {
    var opacity = 0;
    var timer = setInterval (function() {
      opacity += 50 / ms;
      if (opacity >= 1) {
        clearInterval(timer);
        opacity = 1;
      }
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, 50 );
  }
  else {
    elem.style.opacity = 1;
    elem.style.filter = "alpha(opacity=1)";
  }
}
// функция показа скрытие кнопки "показать еще"
function hideShowButMoreNews(selectorCatNews) {
	const countHiddenNews = document.querySelectorAll(selectorCatNews + '.hidden').length;
	countHiddenNews === 0 ? moreNews.style.display = 'none' : moreNews.style.display = 'block';
}

// функция показа доп. новостей из активной категории
function showMoreNews(countVisibleNews, selectorCatNews) {
	const news = Array.from(document.querySelectorAll(selectorCatNews)).slice(countVisibleNews, countVisibleNews + COUNT_SHOW_MORE_NEWS);
	news.forEach((item) => {
		fadeIn(item);
		item.classList.remove('hidden');
	});
	hideShowButMoreNews(selectorCatNews);
}

// функция скрытия текущей категории новостей и показа нажатой
function hideShowSelectCat(newsVisible, selectorCatNews) {
	// устанавливаем для каждого элемента текущего категории новостей 
	newsVisible.forEach((item) => {
		item.style.display = 'none'; // css-стиль display = 'none'
		item.classList.add('hidden'); // и добавляем класс hidden
	});
	// преобразуем в массив объект нужной категории новостей и оставляем в нем первые COUNT_SHOW_MORE_NEWS элемета(ов)
	const news = Array.from(document.querySelectorAll(selectorCatNews)).slice(0, COUNT_SHOW_MORE_NEWS);
	// устанавливаем для каждого элемента нужной категории новости  
	news.forEach((item) => {
		fadeIn(item); // функция FadeIn как в jquery
		item.classList.remove('hidden'); // и удаляем класс hidden
	});
	hideShowButMoreNews(selectorCatNews);
}

// добавляем обработчик событий click на кнопку блок выбора категории новостей (.select-cat)
select.addEventListener('click', (e) => {
	e.preventDefault();
	if (!e.target.classList.contains('active')) {
		const active = document.querySelector('.active');
		active.classList.remove('active'); // удаляем класс на активной категории
		e.target.classList.add('active'); // переключаем класс на нажатую категорию
		// преобразуем в массив объект текущие видимые новости
		const newsVisible = Array.from(document.querySelectorAll('.news-item:not(.hidden)'));
		if (e.target.classList.contains('news-cat')) {
			hideShowSelectCat(newsVisible, '.news-item:not(.anons)');
		} else if (e.target.classList.contains('anons-cat')) {
			hideShowSelectCat(newsVisible, '.anons');
		} else {
			hideShowSelectCat(newsVisible, '.news-item');
		}
	}
});
// добавляем обработчик событий click на кнопку "показать еще"
moreNews.addEventListener('click', (e) => {
	e.preventDefault();
	const active = document.querySelector('.active');
	const newsVisibleCount = document.querySelectorAll('.news-item:not(.hidden)').length; // количество видимых новостей
	if (active.classList.contains('news-cat')) { // если активна категория "Новости", то показываем еще COUNT_SHOW_MORE_NEWS новостей
		showMoreNews(newsVisibleCount, '.news-item:not(.anons)');
	} else if (active.classList.contains('anons-cat')) { // если активна категория "Анонсы", то показываем еще COUNT_SHOW_MORE_NEWS анонсов
		showMoreNews(newsVisibleCount, '.anons');
	} else { // иначе = активна категория "Все", показываем еще COUNT_SHOW_MORE_NEWS из категории все
		showMoreNews(newsVisibleCount, '.news-item');
	}
});
