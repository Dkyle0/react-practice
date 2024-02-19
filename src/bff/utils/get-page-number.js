export const getPageNumber = (url) => {
	const pageNumber = url.match(/_page=(\d+)/);
	return pageNumber ? parseInt(pageNumber[1]) : null;
};
