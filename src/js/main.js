(function ($) {
    $(document).ready(function () {
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o), m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-102365445-1', 'auto');
        ga('send', 'pageview');
        /*----------------------*/

        AOS.init({
            easing: 'ease-in-out-sine'
        });
        /*-----------------------------*/
        $('#menu-main-menu a').click(function (event) {
            var visibleSubmenu = $('#menu-main-menu ul.sub-menu:visible');
            var submenu = $(this).next('ul.sub-menu');
            if (submenu.length >= 1) {
                event.preventDefault();
                submenu.slideToggle();
            }
        });
        /*---------------------------*/
        $("#contact-submit").on('click', function (event) {
            var timer = null;
            var self = $(".submitwrap button");
            var clicked = false;
            var formStatus = true;
            var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            if ($("#user_name").val().trim() === "") {
                formStatus = false;
                $("#name-error").text("Please enter name.").show().fadeOut(5000);
            }
            if ($("#email").val().trim() === "") {
                formStatus = false;
                $("#email-error").text("Please enter email").show().fadeOut(5000);
            }
            if (!emailReg.test($("#email").val())) {
                formStatus = false;
                $("#email-error").text("Please enter valid email").show().fadeOut(5000);
            }
            if ($("#message").val().trim() === "") {
                formStatus = false;
                $("#message-error").text("Please enter message").show().fadeOut(5000);
            }
            if (!formStatus) {
                event.preventDefault();
            } else {
                var url = "https://www.fifium.com/footerform.php";
                var data = {};
                data.user_fullname = $("#user_name").val();
                data.user_email = $("#email").val();
                data.user_message = $('textarea[name=user_message]').val();
                data.bot = $("#bot").val();
                $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    cache: false,
                    dataType: 'text',
                    success: function (res) {

                        console.log(res);
                        if (res == 1) {

                            self.removeClass("filled");
                            self.addClass("circle");
                            self.html("");
                            clicked = true;
                            $("svg").css("display", "block");
                            $(".circle_2").attr("class", "circle_2 fill_circle");
                            timer = setInterval(
                                function tick() {
                                    self.removeClass("circle");
                                    self.addClass("filled");
                                    $('.submitwrap button.filled + img').css('display', 'block');
                                    setTimeout(function () {
                                        $('.submitwrap button.filled + img').css('display', 'none');
                                        self.append("<span class='bg'></span><span class='textbx'>Send</span>");
                                    }, 2000);
                                    $(".wrap img").css("display", "block");
                                    $("svg").css("display", "none");
                                    clearInterval(timer);
                                }, 2500);
                            $('input[name=name]').val('');
                            $('textarea[name=user_message]').val('');
                            $('input[type=email]').val('');
                            $("#success-msg").text('Thanks for Contacting').show().fadeOut(5000);
                            window.location.replace("https://www.fifium.com/thanks/");
                        } else {
                            $("#error-msg").text('Sorry something went wrong.').show().fadeOut(5000);
                        }
                    }
                });
            }
        });


        //Automatic Height Increase Textarea
        var textarea = document.querySelector('textarea');

        textarea.addEventListener('keydown', autosize);

        function autosize() {
            var el = this;
            setTimeout(function () {
                el.style.cssText = 'height:auto; padding:0';
                // for box-sizing other than "content-box" use:
                // el.style.cssText = '-moz-box-sizing:content-box';
                el.style.cssText = 'height:' + el.scrollHeight + 'px';
            }, 0);
        }
        /*-----------------------------------------------------*/
    });
})(jQuery);