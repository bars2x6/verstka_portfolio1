$(function() {
	// кол-во показаных новостей дополнительно по нажатию кнопки "показать еще"
	const COUNT_SHOW_MORE_NEWS = 9;
	// Добавляем обработчик событий на блок переключения категории новостей ".select-cat"
	$('.select-cat').on('click', function (e) {
		e.preventDefault();
		// проверяем активна ли нажатая категория, если нет, то
		if (!$(e.target).hasClass('active')) {
			$('.active').removeClass('active'); // удаляем класс на активной категории
			$(e.target).addClass('active'); // переключаем класс на нажатую категорию
			let newsVisible = $('.news-item:not(.hidden)');
			/* проверяем если нажатая категория новостей, то скрываем все новости и 
			показываем нужную категорию (кол-во элементов = кол-ву не скрытых элементов)*/
			if ($(e.target).hasClass('news-cat')) {
				newsVisible.hide(0).addClass('hidden');
				$('.news-item:not(.anons)').slice(0, COUNT_SHOW_MORE_NEWS).fadeIn().removeClass('hidden');
			} else if ($(e.target).hasClass('anons-cat')) {
				newsVisible.hide(0).addClass('hidden');
				$('.anons').slice(0, COUNT_SHOW_MORE_NEWS).fadeIn().removeClass('hidden');
			} else {
				newsVisible.hide(0).addClass('hidden');
				$('.news-item').slice(0, COUNT_SHOW_MORE_NEWS).fadeIn().removeClass('hidden');
			}
		}
	});

	// Добавляем обработчик событий на кнопку "Показать еще"
	$('.more-news').on('click', function (e) {
		e.preventDefault();
		let newsVisibleCount = $('.news-item:not(.hidden)').length; // количество видимых новостей
		if ($('.active').hasClass('news-cat')) { // если активна категория "Новости", то показываем еще COUNT_SHOW_MORE_NEWS новостей
			$('.news-item:not(.anons)').slice(newsVisibleCount, newsVisibleCount + COUNT_SHOW_MORE_NEWS).fadeIn().removeClass('hidden');
		} else if ($('.active').hasClass('anons-cat')) { // если активна категория "Анонсы", то показываем еще COUNT_SHOW_MORE_NEWS анонсов
			$('.anons').slice(newsVisibleCount, newsVisibleCount + COUNT_SHOW_MORE_NEWS).fadeIn().removeClass('hidden');
		} else { // иначе = активна категория "Все", показываем еще COUNT_SHOW_MORE_NEWS из категории все
			$('.news-item').slice(newsVisibleCount, newsVisibleCount + COUNT_SHOW_MORE_NEWS).fadeIn().removeClass('hidden');
		}
	});

});
