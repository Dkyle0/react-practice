import styled from 'styled-components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostContent, Comments } from './components';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../../hooks';
import { loadPostAsync } from '../../../actions';
import { selectPost } from '../../../selectors';
import { PostForm } from './post-form/post-form';

const PostConatainer = ({ className }) => {
	const post = useSelector(selectPost);
	const dispatch = useDispatch();
	const params = useParams();
	const requestServer = useServerRequest();
	const isEditing = useMatch('/post/:id/edit');

	useEffect(() => {
		dispatch(loadPostAsync(params.id, requestServer));
	}, [params.id, requestServer, dispatch]);

	return (
		<div className={className}>
			{isEditing ? (
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
