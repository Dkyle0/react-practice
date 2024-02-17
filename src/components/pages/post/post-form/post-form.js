import styled from 'styled-components';
import { Input } from '../../../input/input';
import { SpecialPanel } from '../components/components/special-panel';
import { Icon } from '../../../Icon';
import { useRef } from 'react';
import { sanitizeContent } from './utils/sanitize-content';
import { useDispatch } from 'react-redux';
import { savePostAsync } from '../../../../actions';
import { useNavigate } from 'react-router-dom';
import { useServerRequest } from '../../../../hooks';

const EditButton = () => <Icon id="fa-floppy-o" margin="0 10px 0 0" size="21px" />;

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	const onSave = () => {
		const newImage = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = sanitizeContent(contentRef.current.innerHTML);
		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: newImage,
				title: newTitle,
				content: newContent,
			}),
		).then(() => {
			navigate(`/post/${id}`);
		});
	};
	return (
		<div className={className}>
			<Input ref={imageRef} defaultValue={imageUrl} placeholder="Изображение..." />
			<Input ref={titleRef} defaultValue={title} placeholder="Заголовок..." />
			<SpecialPanel
				publishedAt={publishedAt}
				margin="20px 0"
				EditButton={EditButton}
				onEdit={onSave}
			/>
			<div
				ref={contentRef}
				className="post-text"
				contentEditable={true}
				suppressContentEditableWarning={true}
				placeholder="Статья..."
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`;
