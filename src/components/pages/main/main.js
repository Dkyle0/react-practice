import { useEffect, useMemo, useState } from 'react';
import { useServerRequest } from '../../../hooks';
import { PostCard } from './components/post-card';
import { Pagination, Search } from './components/';
import { PAGINATION_LIMIT } from '../../../constants';
import styled from 'styled-components';
import { debounce } from '../../utils';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT, searchPhrase).then(
			(getedPosts) => {
				setPosts(getedPosts.res);
				setLastPage(getedPosts.res[0] ? getedPosts.res[0]?.lastPage : undefined);
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
		setPage(1);
	};

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{posts.length > 0 ? (
					<div className="post-list">
						{posts.map(
							({ id, title, imageUrl, publishedAt, commentsCount }) => {
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
							},
						)}
					</div>
				) : (
					<div className="no-posts-found">Статьи не найдены</div>
				)}
			</div>
			{lastPage > 1 && posts.length > 0 ? (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			) : null}
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .posts-and-search {
		height: calc(100% - 60px);
	}

	& .post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
	}

	& .no-posts-found {
		font-size: 18px;
		margin-top: 40px;
	}
`;
