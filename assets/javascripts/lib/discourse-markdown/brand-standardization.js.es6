import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
	opts.features['brand-standardization'] = true;
});

function brandStandardization (text) {
	return text
		.replace(/\b(crit ?cola)\b/ig, "<span class=\"brand-standardization\"><span class=\"brand-standardization-prepend\"></span><span class=\"brand-standardization-name\">Crit Cola</span><span class=\"brand-standardization-append\"></span></span>");
}

export function setup(helper) {
	helper.postProcessText(function (text) {
		text = [].concat(text);
		for (var i = 0; i < text.length; i++) {
			if (text[i].length > 0 && text[i][0] !== "<") {
				text[i] = brandStandardization(text[i]);
			}
		}
		return text;
	});

	helper.whiteList([
		'span.brand-standardization',
		'span.brand-standardization-prepend',
		'span.brand-standardization-name',
		'span.brand-standardization-append'
	]);
}
