import styled from 'styled-components';
import { Icon } from '../../../../Icon';
import { useDispatch } from 'react-redux';
import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../actions';
import { useServerRequest } from '../../../../../hooks';

const CommentContainer = ({ className, id, author, content, publishedAt, postId }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon
							id="fa-user-circle-o"
							margin="0 5px 0 10px"
							size="18px"
							cursor="auto"
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon
							id="fa-calendar-o"
							margin="0 5px 0 10px"
							size="18px"
							cursor="auto"
						/>
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			<Icon
				id="fa-trash-o"
				margin="10px 0 0 10px"
				size="21px"
				onClick={() => onCommentRemove(id)}
			/>
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;

	& .comment {
		border: 1px solid black;
		width: 550px;
		padding: 10px 5px;
	}
	& .information-panel {
		display: flex;
		width: 100%;
		justify-content: space-between;
	}
	& .author,
	.published-at {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	& .comment-text {
		margin: 10px;
	}
`;