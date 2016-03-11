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
                    var imageMarkdownRegex = /^(?:\{(.*?)\})?!(?:\[([^\n\]]*)\])(?:\(([^\n\]]*)\))?(?:\[([^\n\]]*)\])?$/gim;

                    text = text.replace(imageMarkdownRegex, function (match, key, alt, src, positioningClass) {
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
