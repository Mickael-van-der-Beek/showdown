/* jshint node:true, browser:true */

// Part of Ghost GFM

(function () {
    var image = function () {
        return [
            // Ghost image replacement
            //
            // Has better URL support, but no title support
            // Lang extension = happens BEFORE showdown
            // TODO: make this even better
            {
                type: 'lang',
                extract: ['code'],
                filter: function (text) {
                    console.log('+++++0+++++');

                    var imageMarkdownRegex = /^(?:\{(.*?)\})?!(?:\[([^\n\]]*)\])(?:\(([^\n\]]*)\))?(?:\[([^\n\]]*)\])?$/gim;

                    text = text.replace(imageMarkdownRegex, function (match, key, alt, src, positioningClass) {
                        console.log('+++++1+++++');
                        console.log('match=', match);
                        console.log('key=', key);
                        console.log('alt=', alt);
                        console.log('src=', src);
                        console.log('positioningClass=', positioningClass);

                        positioningClass = (
                            positioningClass &&
                            positioningClass
                                .toLowerCase()
                                .trim()
                        );

                        var imgTag = '<img';

                        if (!src) {
                            return '';
                        }

                        imgTag += ' src="' + src + '"';

                        if (alt) {
                            imgTag += ' alt="' + alt + '" title="' + alt + '"';
                        }

                        if (
                            positioningClass &&
                            !!~['left', 'right'].indexOf(positioningClass)
                        ) {
                            imgTag += ' class="' + positioningClass + '"';
                        }

                        console.log('+++++2+++++');
                        console.log(imgTag + ' />');

                        return imgTag + ' />';
                    });

                    return text;
                }
            }
        ];
    };

    // Client-side export
    if (typeof window !== 'undefined' && window.Showdown && window.Showdown.extensions) {
        window.Showdown.extensions.image = image;
    }
    // Server-side export
    if (typeof module !== 'undefined') {
        module.exports = image;
    }
}());
