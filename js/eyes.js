document.addEventListener('DOMContentLoaded', function () {
    var portraitElement = document.querySelector('.portrait.hungry');

    if (portraitElement) {
        document.addEventListener('mousemove', function (e) {
            var docW = window.innerWidth;
            var docH = window.innerHeight;

            var diffX1 = (docW / 2) - e.clientX - 200;
            if (diffX1 < -260) { diffX1 = -260; }
            var diffX2 = (docW / 2) - e.clientX + 200;
            if (diffX2 > 260) { diffX2 = 260; }
            var diffY1 = (docH / 2) - e.clientY;
            var diffY2 = (docH / 2) - e.clientY + 20;

            // eye
            var eyeBackground1 = Math.floor(diffX1 / (-30)) + 'px ' + Math.floor(diffY1 / (-25)) + 'px';
            var eyeTranslate1 = Math.floor(diffX1 / (-70)) + 'px, ' + Math.floor(diffY1 / (-160)) + 'px';
            portraitElement.querySelector('.portrait1 .eye').style.backgroundPosition = eyeBackground1;
            portraitElement.querySelector('.portrait1 .eye').style.transform = 'translate(' + eyeTranslate1 + ') var(--eye-scale)';

            var eyeBackground2 = Math.floor(diffX2 / (-30)) + 'px ' + Math.floor(diffY2 / (-25)) + 'px';
            var eyeTranslate2 = Math.floor(diffX2 / (-70)) + 'px, ' + Math.floor(diffY2 / (-160)) + 'px';
            portraitElement.querySelector('.portrait2 .eye').style.backgroundPosition = eyeBackground2;
            portraitElement.querySelector('.portrait2 .eye').style.transform = 'translate3d(' + eyeTranslate2 + ',0) var(--eye-scale)';
        });
    }
});
