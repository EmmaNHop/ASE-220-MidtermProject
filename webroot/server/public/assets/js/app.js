/* Template Name: Wesoon - Creative HTML 5 Template
   Author: Shreethemes
   Email: support@shreethemes.in
   Website: https://shreethemes.in
   Version: 1.0.0
   Created: Feb 2022
   File Description: Main JS file of the template
*/

/*********************************/
/*         INDEX                 */
/*================================
 *     01.  Loader               *
 *     02.  Tooltips & Feather   *
 *     03.  Tobii Lightbox       *
 *     04.  Data Counter         *
 *     05.  Typed Text animation (animation)         *
 *     06.  Particles js              *
 ================================*/


window.addEventListener('load', fn, false)

//=========================================//
/*/*            02) Preloader         */
//=========================================//
function fn() {
  // Preloader
  if (document.getElementById('preloader')) {
    setTimeout(() => {
      document.getElementById('preloader').style.visibility = 'hidden';
      document.getElementById('preloader').style.opacity = '0';
    }, 350);
  }
}

//Feather icon
feather.replace();

//=========================================//
/*/*            02) ToolTips & Feather     */
//=========================================//
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

//Feather icon
feather.replace();

//=========================================//
/*/*            03) Tobii lightbox         */
//=========================================//

try {
  const tobii = new Tobii()
} catch (err) {

}

//=========================================//
/*/*            04) Data Counter           */
//=========================================//

try {
  if(document.getElementById("days")){
      // The data/time we want to countdown to
      var eventCountDown = new Date("February 25, 2025 16:37:52").getTime();

      // Run myfunc every second
      var myfunc = setInterval(function () {

          var now = new Date().getTime();
          var timeleft = eventCountDown - now;

          // Calculating the days, hours, minutes and seconds left
          var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
          var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

          // Result is output to the specific element
          document.getElementById("days").innerHTML = days + "<p class='count-head'>Days</p> "
          document.getElementById("hours").innerHTML = hours + "<p class='count-head'>Hours</p> "
          document.getElementById("mins").innerHTML = minutes + "<p class='count-head'>Mins</p> "
          document.getElementById("secs").innerHTML = seconds + "<p class='count-head'>Secs</p> "

          // Display the message when countdown is over
          if (timeleft < 0) {
              clearInterval(myfunc);
              document.getElementById("days").innerHTML = ""
              document.getElementById("hours").innerHTML = ""
              document.getElementById("mins").innerHTML = ""
              document.getElementById("secs").innerHTML = ""
              document.getElementById("end").innerHTML = "00:00:00:00";
          }
      }, 1000);
  }
} catch (err) {

}


//=========================================//
/*/* 05) Typed Text animation (animation) */
//=========================================//

try {
  var TxtType = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
  };

  TxtType.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];
      if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
      var that = this;
      var delta = 200 - Math.random() * 100;
      if (this.isDeleting) { delta /= 2; }
      if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 500;
      }
      setTimeout(function () {
          that.tick();
      }, delta);
  };

  function typewrite() {
      if (toRotate === 'undefined') {
          changeText()
      }
      else
          var elements = document.getElementsByClassName('typewrite');
      for (var i = 0; i < elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-type');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
          }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid transparent}";
      document.body.appendChild(css);
  };
  window.onload(typewrite());
} catch(err) {

}

//=========================================//
/*/* 06) Particles Inir JS                 */
//=========================================//

try {
  particlesJS("particles-snow", {
      "particles": {
          "number": {
              "value": 250,
              "density": {
                  "enable": false,
                  "value_area": 800
              }
          },
          "color": {
              "value": "#ffffff"
          },
          "shape": {
              "type": "circle",
              "stroke": {
                  "width": 0,
                  "color": "#000000"
              },
              "polygon": {
                  "nb_sides": 36
              },
              "image": {
                  "src": "",
                  "width": 1000,
                  "height": 1000
              }
          },
          "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                  "enable": false,
                  "speed": 0.5,
                  "opacity_min": 1,
                  "sync": false
              }
          },
          "size": {
              "value": 3.2,
              "random": true,
              "anim": {
                  "enable": false,
                  "speed": 80,
                  "size_min": 0.1,
                  "sync": false
              }
          },
          "line_linked": {
              "enable": false,
              "distance": 100,
              "color": "#ffffff",
              "opacity": 0.4,
              "width": 2
          },
          "move": {
              "enable": true,
              "speed": 11,
              "direction": "bottom",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                  "enable": false,
                  "rotateX": 800,
                  "rotateY": 1200
              }
          }
      },
      "interactivity": {
          "detect_on": "canvas",
          "events": {
              "onhover": {
                  "enable": false,
                  "mode": "repulse"
              },
              "onclick": {
                  "enable": false,
                  "mode": "push"
              },
              "resize": true
          },
          "modes": {
              "grab": {
                  "distance": 200,
                  "line_linked": {
                      "opacity": 1
                  }
              },
              "bubble": {
                  "distance": 400,
                  "size": 40,
                  "duration": 2,
                  "opacity": 8,
                  "speed": 3
              },
              "repulse": {
                  "distance": 71,
                  "duration": 0.4
              },
              "push": {
                  "particles_nb": 4
              },
              "remove": {
                  "particles_nb": 2
              }
          }
      },
      "retina_detect": true
  });
} catch (error) {
  
}


try {
  particlesJS('particles-js', {
              "particles": {
                  "number": {
                      "value": 80,
                      "density": {
                          "enable": true,
                          "value_area": 800
                      }
                  },
                  "color": {
                      "value": "#6c757d"
                  },
                  "shape": {
                      "type": "circle",
                      "stroke": {
                          "width": 0,
                          "color": "#000000"
                      },
                      "polygon": {
                          "nb_sides": 5
                      },
                      "image": {
                          "src": "img/github.svg",
                          "width": 100,
                          "height": 100
                      }
                  },
                  "opacity": {
                      "value": 0.5,
                      "random": false,
                      "anim": {
                          "enable": false,
                          "speed": 1,
                          "opacity_min": 0.1,
                          "sync": false
                      }
                  },
                  "size": {
                      "value": 5,
                      "random": true,
                      "anim": {
                          "enable": false,
                          "speed": 40,
                          "size_min": 0.1,
                          "sync": false
                      }
                  },
                  "line_linked": {
                      "enable": true,
                      "distance": 150,
                      "color": "#6c757d",
                      "opacity": 0.4,
                      "width": 1
                  },
                  "move": {
                      "enable": true,
                      "speed": 6,
                      "direction": "none",
                      "random": false,
                      "straight": false,
                      "out_mode": "out",
                      "attract": {
                          "enable": false,
                          "rotateX": 600,
                          "rotateY": 1200
                      }
                  }
              },
              "interactivity": {
                  "detect_on": "canvas",
                  "events": {
                      "onhover": {
                          "enable": true,
                          "mode": "repulse"
                      },
                      "onclick": {
                          "enable": true,
                          "mode": "push"
                      },
                      "resize": true
                  },
                  "modes": {
                      "grab": {
                          "distance": 400,
                          "line_linked": {
                              "opacity": 1
                          }
                      },
                      "bubble": {
                          "distance": 400,
                          "size": 40,
                          "duration": 2,
                          "opacity": 8,
                          "speed": 3
                      },
                      "repulse": {
                          "distance": 200
                      },
                      "push": {
                          "particles_nb": 4
                      },
                      "remove": {
                          "particles_nb": 2
                      }
                  }
              },
              "retina_detect": true,
              "config_demo": {
                  "hide_card": false,
                  "background_color": "#b61924",
                  "background_image": "",
                  "background_position": "50% 50%",
                  "background_repeat": "no-repeat",
                  "background_size": "cover"
              }
          }

  );
} catch (error) {
  
}