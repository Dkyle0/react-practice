import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useServerRequest } from '../../../hooks';
import { PostCard } from './components/post-card';
import { Pagination } from './components/';
import { PAGINATION_LIMIT } from '../../../constants';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT).then((getedPosts) => {
			setPosts(getedPosts.res);
			setLastPage(getedPosts.res[0] ? getedPosts.res[0]?.lastPage : undefined);
		});
	}, [requestServer, page]);

	return (
		<div className={className}>
			<div className="post-list">
				{posts.map(({ id, title, imageUrl, publishedAt, commentsCount }) => {
					return (
						<PostCard
							key={id}
							id={id}
							title={title}
							imageUrl={imageUrl}
							publishedAt={publishedAt}
							commentsCount={commentsCount}
						/>
					);
				})}
			</div>
			{lastPage > 1 ? (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			) : null}
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
	}
`;
