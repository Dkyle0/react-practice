import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostContent, Comments } from './components';
import { useParams } from 'react-router-dom';
import { useServerRequest } from '../../../hooks';
import { loadPostAsync } from '../../../actions';
import { selectPost } from '../../../selectors';

const PostConatainer = ({ className }) => {
	const post = useSelector(selectPost);
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();

	useEffect(() => {
		dispatch(loadPostAsync(params.id, requestServer));
	}, [params.id, requestServer, dispatch]);

	return (
		<div className={className}>
			<PostContent post={post} />
			<Comments comments={post.comments} postId={post.id} />
		</div>
	);
};

export const Post = styled(PostConatainer)`
	margin: 40px 0;
	padding: 0px 80px;
`;
