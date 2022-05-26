$(document).ready(function () {
    var ido = $('.title-tabs li a.active').attr('href');
    $('' + ido + '').fadeIn()


    $('.title-tabs li a').on('click', function () {
        event.preventDefault();
        $('.title-tabs li a').removeClass('active')
        $('.tab-object').hide();
        $(this).addClass('active')
        var id = $(this).attr('href')
        $('' + id + '').fadeIn()
    })



    var swiper = new Swiper('.gallery-slider', {
        slidesPerView: 4,
        spaceBetween: 10,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1
            },
            // when window width is >= 480px
            360: {
                slidesPerView: 2
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 3
            },
            991: {
                slidesPerView: 4
            }
        }
    });

    var swiper = new Swiper('.slider-review', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        initialSlide: 2,
        loop: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 0,
            stretch: 230,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });


    $('.mobile-button').on('click', function () {
        $('.mobile-button .line').toggleClass('active')
        $('.mobile-button').next().toggleClass('active')
    })


    // $('input[name="tel"]').inputmask({
    //     mask: "+7(999)999-99-99",
    //     clearIfNotMatch: true
    // });
    $('input[name="tel"]').inputmask({
        mask: "+7(999)999-99-99",
        "clearIncomplete": true,
        "oncleared": function () {
            alert('inputmask cleared');
        }
    });
    $('input[name="time"]').inputmask({
        mask: "Дата 99/99/9999 Время 99:99"
    });



    $('.recall-button').on('click', function () {
        event.preventDefault()
        $('.layer, .popup-recall').fadeIn()
        $('.popup form label:first-of-type').focus()
    })

    $('.gauge-button').on('click', function () {
        event.preventDefault()
        $('.layer, .popup-gauge').fadeIn()
        $('.popup form label:first-of-type input').focus()
    })

    $('.close-popup, .layer').on('click', function () {
        $('.layer, .popup').fadeOut()
    })






    // проверяем, что заполнены все поля. Если да - отправляем форму
    $('form').submit(function (event) {
        // отменяем отправку формы по событию submit
        event.preventDefault();

        // записываем конкретно эту форму в переменную
        var form = $(this).parent();
        // убираем возможные предыдущие сообщения об успехе/ошибках
        // form.parent().find('.success').hide();
        form.parent().find('.error-field').hide();

        // сначала ошибок нет
        var error = 0;
        var inputarr = []
        // ищем инпуты, которые должны быть заполнены, в форме и перебираем их
        form.find('input[type="text"], input[type="email"], input[type="date"], input[type="checkbox"]').each(function (i, elem) {
            // текущий инпут в цикле
            var input = $(this);

            input.removeClass('error-input');

            if ((input.val() == '')) {
                input.addClass('error-input');
                input.next().addClass('active');

                inputarr.push($(this))
                // нашли ошибку
                error = 1;
            } else if (input.attr('type') == 'checkbox' && input.prop('checked') === false) {
                input.next().next().addClass('active');
                error = 1;
            } else {
                input.next().removeClass('active');
                input.next().next().removeClass('active');
            }
        });
        // console.log(error)
        for (i = 0; i < inputarr.length; i++) {
            inputarr[0].focus()
        }

        // есть ошибка
        if (error == 1) {
            form.parent().find('.error').fadeIn();

            // нет ошибок
        } else {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/www/js/mail.php', // путь к обработчику
                data: form.serialize(),
                success: function (message) {
                    if (message == 'ok') {
                        form.trigger('reset'); // очищаем поля формы

                        // здесь делаем что-то на свое усмотрение
                        $('.popup').fadeOut();
                        $('.popup-thank').fadeIn();
                        setTimeout(function () {
                            $('.popup-thank').fadeOut();
                            $('.layer').fadeOut();
                        }, 2000)
                        // здесь делаем что-то на свое усмотрение

                        // ошибка отправки формы
                    } else if (message == 'err') {
                        alert('Не отправилось сообщение!');
                    }
                },
                // ошибка json
                error: function () {
                    alert('Ошибка данных!');
                },
            });
        }
    });






})
$("input").on('input', function () {
    $(this).removeClass('error-input')
    $(this).next().removeClass('active')
});

$("input[type='checkbox']").on('change', function () {
    $(this).next().next().removeClass('active')
})

var wrapI = document.getElementById("tab-gauge");
catchTheTab(wrapI);

var wrapIt = document.getElementById("tab-rc");
catchTheTab(wrapIt);

var wrapIt2 = document.getElementById("form-5-minut");
catchTheTab(wrapIt2);


//готовые проекты

//Обработка клика на стрелку вправо
jQuery(document).on('click', ".s3 .carousel-button-right", function () {
    var carusel = jQuery(this).parents('.carousel');
    right_carusel(carusel);
    return false;
});
//Обработка клика на стрелку влево
jQuery(document).on('click', ".s3 .carousel-button-left", function () {
    var carusel = jQuery(this).parents('.carousel');
    left_carusel(carusel);
    return false;
});

function left_carusel(carusel) {
    var block_width = jQuery(carusel).find('.carousel-block').outerWidth();
    /* по 1 */
    /*
    jQuery(carusel).find(".carousel-items .carousel-block").eq(-1).clone().prependTo(jQuery(carusel).find(".carousel-items")); 
    jQuery(carusel).find(".carousel-items").css({"left":"-"+block_width+"px"});
    jQuery(carusel).find(".carousel-items .carousel-block").eq(-1).remove();    
    jQuery(carusel).find(".carousel-items").animate({left: "0px"}, 200); 
    */
    /* по 3 */
    jQuery(carusel).find(".carousel-items .carousel-block").eq(-1).clone().prependTo(jQuery(carusel).find(".carousel-items"));
    jQuery(carusel).find(".carousel-items .carousel-block").eq(-1).remove();
    jQuery(carusel).find(".carousel-items .carousel-block").eq(-1).clone().prependTo(jQuery(carusel).find(".carousel-items"));
    jQuery(carusel).find(".carousel-items .carousel-block").eq(-1).remove();
    jQuery(carusel).find(".carousel-items .carousel-block").eq(-1).clone().prependTo(jQuery(carusel).find(".carousel-items"));
    jQuery(carusel).find(".carousel-items .carousel-block").eq(-1).remove();

    jQuery(carusel).find(".carousel-items").css({
        "left": "-" + block_width * 3 + "px"
    });


    jQuery(carusel).find(".carousel-items").animate({
        left: "0px"
    }, 200);

}

function right_carusel(carusel) {
    var block_width = jQuery(carusel).find('.carousel-block').outerWidth();
    /*
    jQuery(carusel).find(".carousel-items").animate({left: "-"+ block_width +"px"}, 200, function(){
       jQuery(carusel).find(".carousel-items .carousel-block").eq(0).clone().appendTo(jQuery(carusel).find(".carousel-items")); 
       jQuery(carusel).find(".carousel-items .carousel-block").eq(0).remove(); 
       jQuery(carusel).find(".carousel-items").css({"left":"0px"}); 
    }); 
    */
    jQuery(carusel).find(".carousel-items").animate({
        left: "-" + block_width * 3 + "px"
    }, 200, function () {


        jQuery(carusel).find(".carousel-items .carousel-block").eq(0).clone().appendTo(jQuery(carusel).find(".carousel-items"));
        jQuery(carusel).find(".carousel-items .carousel-block").eq(0).remove();
        jQuery(carusel).find(".carousel-items .carousel-block").eq(0).clone().appendTo(jQuery(carusel).find(".carousel-items"));
        jQuery(carusel).find(".carousel-items .carousel-block").eq(0).remove();
        jQuery(carusel).find(".carousel-items .carousel-block").eq(0).clone().appendTo(jQuery(carusel).find(".carousel-items"));
        jQuery(carusel).find(".carousel-items .carousel-block").eq(0).remove();

        jQuery(carusel).find(".carousel-items").css({
            "left": "0px"
        });
    });

}

jQuery(function () {
    //Раскомментируйте строку ниже, чтобы включить автоматическую прокрутку карусели
    auto_right('.s3 .carousel:first');
})

// Автоматическая прокрутка
function auto_right(carusel) {
    setInterval(function () {
        if (!jQuery(carusel).is('.hover'))
            right_carusel(carusel);
    }, 5000)
}
// Навели курсор на карусель
jQuery(document).on('mouseenter', '.carousel', function () {
    jQuery(this).addClass('hover')
})
//Убрали курсор с карусели
jQuery(document).on('mouseleave', '.carousel', function () {
    jQuery(this).removeClass('hover')
})


///////////////////////////////////


//Обработка клика на стрелку вправо
jQuery(document).on('click', ".s4 .carousel-button-right", function () {
    var carusel = jQuery(this).parents('.carousel');
    right_carusel_s4(carusel);
    return false;
});
//Обработка клика на стрелку влево
jQuery(document).on('click', ".s4 .carousel-button-left", function () {
    var carusel = jQuery(this).parents('.carousel');
    left_carusel_s4(carusel);
    return false;
});

function left_carusel_s4(carusel) {
    var block_width = jQuery(carusel).find('.carousel-block').outerWidth();
    /* по 1 */

    jQuery(carusel).find(".carousel-items .carousel-block").eq(-1).clone().prependTo(jQuery(carusel).find(".carousel-items"));
    jQuery(carusel).find(".carousel-items").css({
        "left": "-" + block_width + "px"
    });
    jQuery(carusel).find(".carousel-items .carousel-block").eq(-1).remove();
    jQuery(carusel).find(".carousel-items").animate({
        left: "0px"
    }, 200);

}

function right_carusel_s4(carusel) {
    var block_width = jQuery(carusel).find('.carousel-block').outerWidth();

    jQuery(carusel).find(".carousel-items").animate({
        left: "-" + block_width + "px"
    }, 200, function () {
        jQuery(carusel).find(".carousel-items .carousel-block").eq(0).clone().appendTo(jQuery(carusel).find(".carousel-items"));
        jQuery(carusel).find(".carousel-items .carousel-block").eq(0).remove();
        jQuery(carusel).find(".carousel-items").css({
            "left": "0px"
        });
    });


}

jQuery(function () {
    //Раскомментируйте строку ниже, чтобы включить автоматическую прокрутку карусели
    // auto_right_s4('.s4 .carousel:first');
})

{
    /* Автоматическая прокрутка */
}

function auto_right_s4(carusel) {
    setInterval(function () {
        if (!jQuery(carusel).is('.hover'))
            right_carusel(carusel);
    }, 5000)
}





/* Обработка клика на стрелку вправо */
jQuery(document).on('click', ".gal_okna .carousel-button-right", function () {
    var carusel = jQuery(this).parents('.carousel');
    right_carusel_svet(carusel);
    return false;
});
/* Обработка клика на стрелку влево */
jQuery(document).on('click', ".gal_okna .carousel-button-left", function () {
    var carusel = jQuery(this).parents('.carousel');
    left_carusel_svet(carusel);
    return false;
});
/* Обработка клика на стрелку вправо */
jQuery(document).on('click', ".k_gal .carousel-button-right", function () {
    var carusel = jQuery(this).parents('.carousel');
    right_carusel_svet(carusel);
    return false;
});
/* Обработка клика на стрелку влево */
jQuery(document).on('click', ".k_gal .carousel-button-left", function () {
    var carusel = jQuery(this).parents('.carousel');
    left_carusel_svet(carusel);
    return false;
});

/* //Обработка клика на стрелку вправо */
jQuery(document).on('click', ".r_color .carousel-button-right", function () {
    var carusel = jQuery(this).parents('.carousel');
    right_carusel_svet(carusel);
    return false;
});
/* //Обработка клика на стрелку влево */
jQuery(document).on('click', ".r_color .carousel-button-left", function () {
    var carusel = jQuery(this).parents('.carousel');
    left_carusel_svet(carusel);
    return false;
});
/* //Обработка клика на стрелку вправо */
jQuery(document).on('click', ".r_thing .carousel-button-right", function () {
    var carusel = jQuery(this).parents('.carousel');
    right_carusel_svet(carusel);
    return false;
});
/* //Обработка клика на стрелку влево */
jQuery(document).on('click', ".r_thing .carousel-button-left", function () {
    var carusel = jQuery(this).parents('.carousel');
    left_carusel_svet(carusel);
    return false;
});

/* //Обработка клика на стрелку вправо */
jQuery(document).on('click', ".ul_menu_ .carousel-button-right", function () {
    var carusel = jQuery(this).parents('.carousel');
    right_carusel_svet(carusel);
    return false;
});
/* //Обработка клика на стрелку влево */
jQuery(document).on('click', ".ul_menu_ .carousel-button-left", function () {
    var carusel = jQuery(this).parents('.carousel');
    left_carusel_svet(carusel);
    return false;
});


function left_carusel_svet(carusel) {
    var block_width = jQuery(carusel).find('.carousel-block').outerWidth();
    /* по 1 */

    jQuery(carusel).find(".carousel-items .carousel-block").eq(-1).clone().prependTo(jQuery(carusel).find(".carousel-items"));
    jQuery(carusel).find(".carousel-items").css({
        "left": "-" + block_width + "px"
    });
    jQuery(carusel).find(".carousel-items .carousel-block").eq(-1).remove();
    jQuery(carusel).find(".carousel-items").animate({
        left: "0px"
    }, 200);

}

function right_carusel_svet(carusel) {
    var block_width = jQuery(carusel).find('.carousel-block').outerWidth();

    jQuery(carusel).find(".carousel-items").animate({
        left: "-" + block_width + "px"
    }, 200, function () {
        jQuery(carusel).find(".carousel-items .carousel-block").eq(0).clone().appendTo(jQuery(carusel).find(".carousel-items"));
        jQuery(carusel).find(".carousel-items .carousel-block").eq(0).remove();
        jQuery(carusel).find(".carousel-items").css({
            "left": "0px"
        });
    });


}

jQuery(function () {
    //Раскомментируйте строку ниже, чтобы включить автоматическую прокрутку карусели
    // auto_right_svet('.svet .carousel:first');
})

{
    /* // Автоматическая прокрутка */
}

function auto_right_svet(carusel) {
    setInterval(function () {
        if (!jQuery(carusel).is('.hover'))
            right_carusel(carusel);
    }, 5000)
}


jQuery(document).on('click', ".r_color .c_border", function () {
    jQuery('.r_color .c_border').removeClass('selected');
    jQuery(this).addClass('selected');
    var id = jQuery(this).attr("id");
    if (id != "rc") {
        jQuery(".okno .plastik").css("background", "url('img/2019/06/" + id + "_o.png') no-repeat scroll left center");
    } else {
        jQuery(".okno .plastik").css("background", 'none');
    }

})

jQuery(document).on('click', ".r_thing .c_border", function () {
    jQuery('.r_thing .c_border').removeClass('selected');
    jQuery(this).addClass('selected');
    var id = jQuery(this).attr("id");
    if (id != "rc") {
        jQuery(".okno .ruchka").css("background", "url('img/2019/06/" + id + "_o.png') no-repeat scroll left center");
    } else {
        jQuery(".okno .ruchka").css("background", 'none');
    }

})