export const parseLinkHeader = (linkHeader) => {
	if (!linkHeader) return null;
	const linkArray = linkHeader.split(',');
	const links = {};
	linkArray.forEach((link) => {
		const [url, rel] = link.split(';');
		const linkUrl = url.trim().slice(1, -1); // Удаление угловых скобок
		const linkRel = rel.trim().split('=')[1].slice(1, -1); // Удаление кавычек
		links[linkRel] = linkUrl;
	});
	return links;
};
