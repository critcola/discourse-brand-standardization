import { registerOption } from 'pretty-text/pretty-text';

registerOption((siteSettings, opts) => {
	opts.features['brand-standardization'] = true;
});

function brandStandardization (text) {
	return text
		.replace(/\b(cr(it|ti)\scoa?l+[ao])\b/ig, "<span class=\"brand-standardization-prepend\"></span><span class=\"brand-standardization-name\">Crit&nbsp;Cola</span><span class=\"brand-standardization-append\"></span>")
		.replace(/\b(Cr(it|ti)?[Cc]oa?l+[ao])\b/g, "<span class=\"brand-standardization-prepend\"></span><span class=\"brand-standardization-name\">Crit&nbsp;Cola</span><span class=\"brand-standardization-append\"></span>");
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
		'span.brand-standardization-prepend',
		'span.brand-standardization-name',
		'span.brand-standardization-append'
	]);
}
