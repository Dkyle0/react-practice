import styled from 'styled-components';
import { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostContent, Comments } from './components';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../../hooks';
import { RESET_POST_DATA, loadPostAsync } from '../../../actions';
import { selectPost } from '../../../selectors';
import { PostForm } from './post-form/post-form';

const PostConatainer = ({ className }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);
	const params = useParams();
	const isCreating = useMatch('/post');
	const isEditing = useMatch('/post/:id/edit');

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			return;
		}

		dispatch(loadPostAsync(params.id, requestServer));
	}, [params.id, requestServer, dispatch, isCreating]);

	return (
		<div className={className}>
			{isEditing || isCreating ? (
				<PostForm post={post} />
			) : (
				<>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</>
			)}
		</div>
	);
};

export const Post = styled(PostConatainer)`
	margin: 40px 0;
	padding: 0px 80px;
`;
