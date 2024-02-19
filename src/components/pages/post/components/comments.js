import { useState } from 'react';
import { Icon } from '../../../Icon';
import { Comment } from './components/';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUserId, selectUserRole } from '../../../../selectors';
import { useServerRequest } from '../../../../hooks';
import { addCommentAsync } from '../../../../actions';
import { ROLE } from '../../../../constants';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (postId, userId, content) => {
		dispatch(addCommentAsync(requestServer, postId, userId, content));
		setNewComment('');
	};

	const isGuest = userRole === ROLE.GUEST;
	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Комментарий..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>

					<Icon
						id="fa-paper-plane-o"
						margin="10px 0 0 10px"
						size="18px"
						onClick={() => onNewCommentAdd(postId, userId, newComment)}
					/>
				</div>
			)}
			<div className="comment">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
						postId={postId}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	width: 580px;
	margin: 20px auto;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
		font-size: 18px;
	}

	& .new-comment textarea {
		width: 550px;
		height: 120px;
		resize: none;
	}
`;
