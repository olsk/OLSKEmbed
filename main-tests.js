const { throws, deepEqual } = require('assert');

const mod = require('./main.js');
import { JSDOM } from 'jsdom';

describe('OLSKEmbedEndpointURL', function test_OLSKEmbedEndpointURL () {

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKEmbedEndpointURL(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns null', function () {
		deepEqual(mod.OLSKEmbedEndpointURL(''), null);
	});

	it('matches youtube', function () {
		deepEqual(mod.OLSKEmbedEndpointURL('https://youtube.com/watch?v=oUFJJNQGwhk'), Object.keys(mod._OLSKEmbedPatterns()).filter(function (e) {
			return e.match('youtube');
		}).shift());
	});

	it('matches soundcloud', function () {
		deepEqual(mod.OLSKEmbedEndpointURL('https://soundcloud.com/tycho/tycho-awake'), Object.keys(mod._OLSKEmbedPatterns()).filter(function (e) {
			return e.match('soundcloud');
		}).shift());
	});

	it('matches facebook', function () {
		deepEqual(mod.OLSKEmbedEndpointURL('https://facebook.com/facebook/videos/10153231379946729'), Object.keys(mod._OLSKEmbedPatterns()).filter(function (e) {
			return e.match('facebook');
		}).pop());
	});

	it('matches vimeo', function () {
		deepEqual(mod.OLSKEmbedEndpointURL('https://vimeo.com/90509568'), Object.keys(mod._OLSKEmbedPatterns()).filter(function (e) {
			return e.match('vimeo');
		}).shift());
	});

	it('matches instagram', function () {
		deepEqual(mod.OLSKEmbedEndpointURL('https://www.instagram.com/p/CN4V2ksHAyE/'), Object.keys(mod._OLSKEmbedPatterns()).filter(function (e) {
			return e.match('instagram');
		}).shift());
	});

});

describe('OLSKEmbedFetchURL', function test_OLSKEmbedFetchURL () {

	it('throws if param1 not string', function () {
		throws(function () {
			mod.OLSKEmbedFetchURL(null, '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod.OLSKEmbedFetchURL('', null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns string', function () {
		deepEqual(mod.OLSKEmbedFetchURL('', ''), '?url=');
	});

	it('url encodes param2', function () {
		const param1 = Math.random().toString();
		const param2 = 'https://example.com?alfa=bravo';
		deepEqual(mod.OLSKEmbedFetchURL(param1, param2), param1 + '?url=' + encodeURIComponent(param2));
	});

});

describe('OLSKEmbedGenerateProperties', function test_OLSKEmbedGenerateProperties () {

	it('returns input', function () {
		const item = {
			html: Math.random().toString(),
		};
		deepEqual(mod.OLSKEmbedGenerateProperties(item), item);
	});

	it('sets OLSKEmbedFrameURL', function () {
		const url = Math.random().toString();
		const item = {
			html: `<iframe width="200" height="113" src="${ url }" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="${ Math.random().toString() }"></iframe>`,
		};
		deepEqual(mod.OLSKEmbedGenerateProperties(item).OLSKEmbedFrameURL, url);
	});

	context('YouTube', function () {
		
		it('sets OLSKEmbedFrameURL', function () {
			const id = Math.random().toString();
			const url = `https://www.youtube.com/embed/${ id }?feature=oembed`;
			const item = {
				provider_name: 'YouTube',
				html: `<iframe width="200" height="113" src="${ url }" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="${ Math.random().toString() }"></iframe>`,
			};
			deepEqual(mod.OLSKEmbedGenerateProperties(item).OLSKEmbedFrameURL, url.replace('youtube.com', 'youtube-nocookie.com'));
		});

		it('sets OLSKEmbedHeight', function () {
			const item = {
				provider_name: 'YouTube',
				html: `<iframe width="200" height="113" src="${ Math.random().toString() }" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="${ Math.random().toString() }"></iframe>`,

			};
			deepEqual(mod.OLSKEmbedGenerateProperties(item).OLSKEmbedHeight, 250);
		});
	
	});

	context('TikTok', function () {
		
		it('sets OLSKEmbedFrameURL', function () {
			const item = {
				provider_name: 'TikTok',
				embed_product_id: Math.random().toString(),
				html: Math.random().toString(),
			};
			deepEqual(mod.OLSKEmbedGenerateProperties(item).OLSKEmbedFrameURL, 'https://www.tiktok.com/embed/v2/' + item.embed_product_id);
		});
		
		it('sets OLSKEmbedHeight', function () {
			const item = {
				provider_name: 'TikTok',
				embed_product_id: Math.random().toString(),
				html: Math.random().toString(),
			};
			deepEqual(mod.OLSKEmbedGenerateProperties(item).OLSKEmbedHeight, 500);
		});
	
	});

});
