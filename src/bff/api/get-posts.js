import { transformPost } from '../transformers';
import { getPageNumber, parseLinkHeader } from '../utils';

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
