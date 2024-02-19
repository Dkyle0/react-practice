import { transformPost } from '../transformers';
import { getPageNumber, parseLinkHeader } from '../utils';

// На текущий момент по сравнению с записью выидео последняя версия json server(https://www.npmjs.com/package/json-server/v/1.0.0-alpha.23)
// позволяла лучше работать с пагинацией, но у неё отсутсвовал поиск.
// Сначала использовал её, но чтобы работал поиск пришлось установить более раннюю(https://www.npmjs.com/package/json-server/v/0.17.4) и переделать

export const getPosts = (page, limit, searchPhrase) => {
	const url =
		searchPhrase === ''
			? `http://localhost:3005/posts?_page=${page}&_limit=${limit}`
			: `http://localhost:3005/posts?title_like=${searchPhrase}&_page=${page}&_limit=${limit}`;
	return fetch(url).then((response) => {
		const linkHeader = response.headers.get('Link');
		const links = parseLinkHeader(linkHeader);
		const lastPage = links && links.last ? getPageNumber(links.last) : null;
		return response
			.json()
			.then(
				(loadedPosts) =>
					loadedPosts &&
					loadedPosts.map((post) => transformPost(post, lastPage)),
			);
	});
};
